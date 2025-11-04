import { useState, useEffect, useRef } from 'react';
import { PixelButton } from '@/components/PixelButton';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { PLAYER_HANDBOOK_PAGES } from '@/lib/book-pages';
import { PixelPanel } from '@/components/PixelPanel';
import useSound from '@/hooks/useSound';

interface BookViewerProps {
  onBack: () => void;
}

const BookViewer = ({ onBack }: BookViewerProps) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const playNavigateSound = useSound("/sounds/navigate.mp3");
  const errorRef = useRef<HTMLDivElement | null>(null);

  const goToNextPage = () => {
    playNavigateSound();
    setCurrentPageIndex(prev => Math.min(prev + 1, PLAYER_HANDBOOK_PAGES.length - 1));
  };

  const goToPrevPage = () => {
    playNavigateSound();
    setCurrentPageIndex(prev => Math.max(prev - 1, 0));
  };

  useEffect(() => {
    if (errorRef.current) {
      errorRef.current.remove();
      errorRef.current = null;
    }
  }, [currentPageIndex]);

  return (
    <PixelPanel>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <PixelButton onClick={onBack} variant="outline" size="icon" aria-label="Voltar">
            <ArrowLeft className="h-4 w-4" />
          </PixelButton>
          <h2 className="font-pixel text-lg text-primary pixel-text-shadow">Livro do Jogador</h2>
        </div>
        <div className="flex items-center gap-2">
          <PixelButton onClick={goToPrevPage} variant="secondary" size="icon" aria-label="Página Anterior" disabled={currentPageIndex === 0}>
            <ChevronLeft className="h-4 w-4" />
          </PixelButton>
          <span className="font-pixel text-xs text-foreground w-28 text-center">
            Página {currentPageIndex + 1} / {PLAYER_HANDBOOK_PAGES.length}
          </span>
          <PixelButton onClick={goToNextPage} variant="secondary" size="icon" aria-label="Próxima Página" disabled={currentPageIndex === PLAYER_HANDBOOK_PAGES.length - 1}>
            <ChevronRight className="h-4 w-4" />
          </PixelButton>
        </div>
      </div>

      <div className="bg-black pixel-border-inset p-1 sm:p-2 max-h-[calc(100vh-24rem)] overflow-y-auto">
        <img
          key={currentPageIndex}
          src={PLAYER_HANDBOOK_PAGES[currentPageIndex]}
          alt={`Página ${currentPageIndex + 1} do Livro do Jogador`}
          className="w-full h-auto"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent && !errorRef.current) {
              const errorDiv = document.createElement('div');
              errorDiv.className = 'flex items-center justify-center h-96 bg-muted/20';
              errorDiv.innerHTML = `<p class="font-pixel text-xs text-muted-foreground">Página ${currentPageIndex + 1} não encontrada.</p>`;
              parent.appendChild(errorDiv);
              errorRef.current = errorDiv;
            }
          }}
        />
      </div>
    </PixelPanel>
  );
};

export default BookViewer;