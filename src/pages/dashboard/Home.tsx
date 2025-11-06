import PagePanel from "@/components/PagePanel";
import { useAuth } from "@/hooks/useAuth";
import { useCampaignCharacters } from "@/hooks/useCampaignCharacters";
import { PixelPanel } from "@/components/PixelPanel";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";

const CharacterCard = ({ character }: { character: any }) => {
  const hpPercent = character.character_data.maxHp > 0 
    ? Math.max(0, (character.character_data.hp / character.character_data.maxHp) * 100) 
    : 0;

  return (
    <div className="bg-muted/30 p-3 pixel-border flex items-center gap-3">
      <div className="w-12 h-12 pixel-border bg-black flex items-center justify-center flex-shrink-0">
        {character.character_data.avatarUrl ? (
          <img 
            src={character.character_data.avatarUrl} 
            alt={character.character_name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <User className="w-6 h-6 text-muted-foreground" />
        )}
      </div>
      <div className="flex-1 text-xs">
        <p className="font-bold text-primary truncate">{character.character_name}</p>
        <p className="text-muted-foreground truncate">Jogador: {character.player_name}</p>
        <div className="flex justify-between items-baseline mt-1">
          <span className="text-hp-red font-bold">PV</span>
          <span className="text-foreground/80">Lvl {character.level}</span>
        </div>
        <div className="w-full h-3 bg-black pixel-border-inset p-0.5">
          <div 
            className={cn("bg-hp-red h-full transition-all duration-500", hpPercent < 25 && "bg-destructive")} 
            style={{ width: `${hpPercent}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

const DashboardHome = () => {
  const { profile, isMaster } = useAuth();
  const { characters, isLoading } = useCampaignCharacters();

  const campaignName = profile?.campaign_name || "Nenhuma Campanha Ativa";

  return (
    <PagePanel title="Início">
      {isMaster ? (
        <div className="space-y-6">
          <div>
            <h2 className="font-pixel text-xl text-primary pixel-text-shadow mb-4">
              Bem-vindo, Mestre {profile?.full_name}!
            </h2>
            <p className="font-pixel text-sm text-muted-foreground">
              Sua campanha atual é:
            </p>
            <p className="font-pixel text-lg text-accent mt-2">
              {campaignName}
            </p>
          </div>

          <PixelPanel>
            <h3 className="font-pixel text-lg text-accent pixel-text-shadow mb-4">
              JOGADORES NA CAMPANHA
            </h3>
            {isLoading ? (
              <p className="font-pixel text-xs text-muted-foreground text-center py-4">Carregando jogadores...</p>
            ) : characters.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {characters.map(char => (
                  <CharacterCard key={char.id} character={char} />
                ))}
              </div>
            ) : (
              <p className="font-pixel text-xs text-muted-foreground text-center py-4">
                Nenhum personagem encontrado nesta campanha.
              </p>
            )}
          </PixelPanel>
        </div>
      ) : (
        <div>
          <h2 className="font-pixel text-xl text-primary pixel-text-shadow mb-4">
            Bem-vindo, Aventureiro!
          </h2>
          <p className="font-pixel text-sm text-muted-foreground">
            Use o menu à esquerda para navegar e preencher sua ficha de personagem.
          </p>
        </div>
      )}
    </PagePanel>
  );
};

export default DashboardHome;