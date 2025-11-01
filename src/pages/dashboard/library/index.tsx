import { useState } from "react";
import { PixelPanel } from "@/components/PixelPanel";
import { arcaneSpells, divineSpells } from "@/lib/spells";
import SpellListView from "./SpellListView";
import PagePanel from "@/components/PagePanel";

const LibraryIndex = ({ onNavigate }: { onNavigate: (view: 'arcane' | 'divine') => void }) => {
  const linkStyle = "text-left text-foreground hover:underline hover:text-accent transition-colors";
  
  return (
    <PixelPanel>
      <h2 className="font-pixel text-2xl text-primary pixel-text-shadow mb-6">Livro do Jogador</h2>
      <div className="space-y-8 font-pixel text-xs leading-relaxed">
        
        {/* Capítulo 1: Pontuações de habilidade */}
        <div>
          <h3 className="font-pixel text-base text-accent border-b-2 border-border pb-2 mb-4">Cap. 1: Atributos do Personagem Jogador</h3>
          <p className="mb-4 text-muted-foreground">
            Para se aventurar nos mundos do jogo AD&D, primeiro você precisa criar um personagem. O personagem que você cria é o seu alter ego nos reinos fantásticos deste jogo, uma pessoa fictícia que está sob o seu controle e através da qual você explora indiretamente o mundo criado pelo Mestre de Jogo (MJ).
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mb-4">
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Força (For)</li>
              <li>Destreza (Des)</li>
              <li>Constituição (Con)</li>
            </ul>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Inteligência (Int)</li>
              <li>Sabedoria (Sab)</li>
              <li>Carisma (Car)</li>
            </ul>
          </div>
          <p className="text-muted-foreground">
            Os três primeiros atributos representam a natureza física do personagem, enquanto os três últimos quantificam seus traços mentais e de personalidade. Em vários trechos destas regras, as abreviações acima são usadas.
          </p>
        </div>

        {/* Capítulo 3: Classes */}
        <div>
          <h3 className="font-pixel text-base text-accent border-b-2 border-border pb-2 mb-4">Cap. 3: Classes de personagens do jogador</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Classes de personagens</li>
              <li>Guerreiro: Lutador • Paladino • Guarda-florestal</li>
              <li>Mago: Mago • Ilusionista • Magos Especialistas</li>
            </ul>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Sacerdote: Clérigo • Druida</li>
              <li>Ladino: Ladrão • Bardo</li>
              <li>Personagens multiclasse e dupla classe</li>
            </ul>
          </div>
        </div>

        {/* Capítulo 7: Magia */}
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

        {/* Capítulo 9: Combate */}
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
  const [activeView, setActiveView] = useState<'index' | 'arcane' | 'divine'>('index');

  if (activeView === 'arcane') {
    return <PagePanel title="Biblioteca"><SpellListView spells={arcaneSpells} title="Magias Arcanas" onBack={() => setActiveView('index')} /></PagePanel>;
  }

  if (activeView === 'divine') {
    return <PagePanel title="Biblioteca"><SpellListView spells={divineSpells} title="Magias Divinas" onBack={() => setActiveView('index')} /></PagePanel>;
  }

  return <PagePanel title="Biblioteca"><LibraryIndex onNavigate={setActiveView} /></PagePanel>;
};

export default Library;