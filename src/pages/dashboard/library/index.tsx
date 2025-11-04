import { useState } from "react";
import { PixelPanel } from "@/components/PixelPanel";
import { PHB_SPELLS } from "@/lib/players-handbook";
import SpellListView from "./SpellListView";
import PagePanel from "@/components/PagePanel";
import BookViewer from "./BookViewer";
import { PixelButton } from "@/components/PixelButton";

const LibraryIndex = ({ onNavigate }: { onNavigate: (view: 'arcane' | 'divine' | 'book') => void }) => {
  const linkStyle = "text-left text-foreground hover:underline hover:text-accent transition-colors";
  
  return (
    <PixelPanel>
      <h2 className="font-pixel text-2xl text-primary pixel-text-shadow mb-6">Biblioteca Digital</h2>
      <div className="space-y-8 font-pixel text-xs leading-relaxed">
        
        <div>
          <h3 className="font-pixel text-base text-accent border-b-2 border-border pb-2 mb-4">Livro do Jogador (AD&D 2e)</h3>
          <p className="mb-4 text-muted-foreground">
            Leia o Livro do Jogador página por página. As páginas serão carregadas à medida que forem adicionadas ao sistema.
          </p>
          <PixelButton onClick={() => onNavigate('book')}>
            Abrir Livro do Jogador
          </PixelButton>
        </div>

        <div>
          <h3 className="font-pixel text-base text-accent border-b-2 border-border pb-2 mb-4">Cap. 7: Magia</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
            <ul className="list-disc list-inside space-y-1">
              <li className="text-muted-foreground">Magia</li>
              <li><button className={linkStyle} onClick={() => onNavigate('arcane')}>Lista de feitiços de mago</button></li>
              <li><button className={linkStyle} onClick={() => onNavigate('divine')}>Lista de feitiços de sacerdote</button></li>
              <li className="text-muted-foreground">Escolas de Magia</li>
            </ul>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Lançando feitiços</li>
              <li>Componentes de feitiços</li>
              <li>Pesquisa Mágica</li>
              <li>Descrições de feitiços</li>
            </ul>
          </div>
        </div>

        <div>
          <h3 className="font-pixel text-base text-accent border-b-2 border-border pb-2 mb-4">Cap. 9: Combate</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Combate</li>
              <li>O Rolo de ataque</li>
              <li>Calculando THAC0</li>
              <li>A Rodada de Combate</li>
              <li>A Sequência de Combate</li>
            </ul>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Defesas Especiais</li>
              <li>O Lançamento de Salvamento</li>
              <li>Resistência Mágica</li>
              <li>Ferimentos e Morte</li>
            </ul>
          </div>
        </div>

      </div>
    </PixelPanel>
  );
};

const Library = () => {
  const [activeView, setActiveView] = useState<'index' | 'arcane' | 'divine' | 'book'>('index');

  if (activeView === 'arcane') {
    return <PagePanel title="Biblioteca"><SpellListView spells={PHB_SPELLS.arcane} title="Magias Arcanas" onBack={() => setActiveView('index')} /></PagePanel>;
  }

  if (activeView === 'divine') {
    return <PagePanel title="Biblioteca"><SpellListView spells={PHB_SPELLS.divine} title="Magias Divinas" onBack={() => setActiveView('index')} /></PagePanel>;
  }

  if (activeView === 'book') {
    return <PagePanel title="Biblioteca"><BookViewer onBack={() => setActiveView('index')} /></PagePanel>;
  }

  return <PagePanel title="Biblioteca"><LibraryIndex onNavigate={setActiveView} /></PagePanel>;
};

export default Library;