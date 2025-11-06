import { useState, useEffect, useRef } from 'react';
import { PixelButton } from '@/components/PixelButton';
import { ArrowLeft, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import { PLAYER_HANDBOOK_PAGES } from '@/lib/book-pages';
import { PixelPanel } from '@/components/PixelPanel';
import useSound from '@/hooks/useSound';
import { cn } from '@/lib/utils';

interface BookViewerProps {
  onBack: () => void;
}

const Page = ({ pageIndex }: { pageIndex: number }) => {
  const errorRef = useRef<HTMLDivElement | null>(null);
  const imgSrc = PLAYER_HANDBOOK_PAGES[pageIndex];

  useEffect(() => {
    if (errorRef.current) {
      errorRef.current.remove();
      errorRef.current = null;
    }
  }, [pageIndex]);

  if (!imgSrc) {
    return <div className="w-full aspect-[8.5/11] bg-muted/20" />;
  }

  return (
    <div className="w-full h-full bg-black flex items-center justify-center">
      <img
        key={pageIndex}
        src={imgSrc}
        alt={`Página ${pageIndex + 1} do Livro do Jogador`}
        className="h-full w-auto object-contain"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          const parent = target.parentElement;
          if (parent && !errorRef.current) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'flex items-center justify-center h-full w-full p-8';
            errorDiv.innerHTML = `<p class="font-pixel text-xs text-muted-foreground text-center">Página ${pageIndex + 1} não encontrada.</p>`;
            parent.appendChild(errorDiv);
            errorRef.current = errorDiv;
          }
        }}
      />
    </div>
  );
};

const BookViewer = ({ onBack }: BookViewerProps) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const playNavigateSound = useSound("/sounds/navigate.mp3");
  const imageContainerRef = useRef<HTMLDivElement | null>(null);

  const goToNextPage = () => {
    playNavigateSound();
    setCurrentPageIndex(prev => (prev === 0 ? 1 : prev + 2));
  };

  const goToPrevPage = () => {
    playNavigateSound();
    setCurrentPageIndex(prev => (prev === 1 ? 0 : prev - 2));
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5));

  useEffect(() => {
    setZoom(1);
    if (imageContainerRef.current) {
      imageContainerRef.current.scrollTop = 0;
      imageContainerRef.current.scrollLeft = 0;
    }
  }, [currentPageIndex]);

  const isCover = currentPageIndex === 0;
  const isLastPage = isCover ? PLAYER_HANDBOOK_PAGES.length <= 1 : currentPageIndex + 2 >= PLAYER_HANDBOOK_PAGES.length;
  
  const rightPageIndex = currentPageIndex + 1;
  const rightPageExists = rightPageIndex < PLAYER_HANDBOOK_PAGES.length;

  return (
    <PixelPanel>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <PixelButton onClick={onBack} variant="outline" size="icon" aria-label="Voltar">
            <ArrowLeft className="h-4 w-4" />
          </PixelButton>
          <h2 className="font-pixel text-lg text-primary pixel-text-shadow">Livro do Jogador</h2>
        </div>
        
        <div className="flex items-center gap-x-4 gap-y-2 flex-wrap">
          <div className="flex items-center gap-2">
            <PixelButton onClick={goToPrevPage} variant="secondary" size="icon" aria-label="Página Anterior" disabled={currentPageIndex === 0}>
              <ChevronLeft className="h-4 w-4" />
            </PixelButton>
            <span className="font-pixel text-xs text-foreground w-32 text-center">
              {isCover 
                ? `Página 1 / ${PLAYER_HANDBOOK_PAGES.length}`
                : `Páginas ${currentPageIndex + 1}${rightPageExists ? `-${rightPageIndex + 1}` : ''} / ${PLAYER_HANDBOOK_PAGES.length}`
              }
            </span>
            <PixelButton onClick={goToNextPage} variant="secondary" size="icon" aria-label="Próxima Página" disabled={isLastPage}>
              <ChevronRight className="h-4 w-4" />
            </PixelButton>
          </div>

          <div className="flex items-center gap-2">
            <PixelButton onClick={handleZoomOut} variant="secondary" size="icon" aria-label="Diminuir Zoom">
              <ZoomOut className="h-4 w-4" />
            </PixelButton>
            <span className="font-pixel text-xs text-foreground w-16 text-center">
              {Math.round(zoom * 100)}%
            </span>
            <PixelButton onClick={handleZoomIn} variant="secondary" size="icon" aria-label="Aumentar Zoom">
              <ZoomIn className="h-4 w-4" />
            </PixelButton>
          </div>
        </div>
      </div>

      <div 
        ref={imageContainerRef}
        className="bg-black pixel-border-inset p-1 sm:p-2 h-[calc(100vh-24rem)] overflow-auto"
      >
        <div 
          className="flex justify-center items-start transition-transform duration-200 w-full h-full"
          style={{ transform: `scale(${zoom})`, transformOrigin: 'top center' }}
        >
          <div className={cn(
            "grid grid-cols-2 gap-2 w-full h-full",
            isCover && "grid-cols-1 max-w-[50%]"
          )}>
            {isCover ? (
              <Page pageIndex={0} />
            ) : (
              <>
                <Page pageIndex={currentPageIndex} />
                <Page pageIndex={currentPageIndex + 1} />
              </>
            )}
          </div>
        </div>
      </div>
    </PixelPanel>
  );
};

export default BookViewer;