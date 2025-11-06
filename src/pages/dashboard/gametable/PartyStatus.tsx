import { PixelPanel } from "@/components/PixelPanel";
import { useCampaignCharacters } from "@/hooks/useCampaignCharacters";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";

const PartyStatus = () => {
  const { characters, isLoading } = useCampaignCharacters();

  if (isLoading) {
    return (
      <PixelPanel className="flex-shrink-0">
        <h3 className="text-lg text-accent w-full sm:w-auto mb-2 sm:mb-0">GRUPO</h3>
        <p className="font-pixel text-xs text-muted-foreground">Carregando status do grupo...</p>
      </PixelPanel>
    );
  }

  if (characters.length === 0) {
    return (
      <PixelPanel className="flex-shrink-0">
        <h3 className="text-lg text-accent w-full sm:w-auto mb-2 sm:mb-0">GRUPO</h3>
        <p className="font-pixel text-xs text-muted-foreground">Nenhum personagem na campanha.</p>
      </PixelPanel>
    );
  }

  return (
    <PixelPanel className="flex-shrink-0">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
        <h3 className="text-lg text-accent w-full sm:w-auto mb-2 sm:mb-0">GRUPO</h3>
        {characters.map(member => {
          const hp = member.character_data.hp;
          const maxHp = member.character_data.maxHp;
          const hpPercent = maxHp > 0 ? (hp / maxHp) * 100 : 0;

          return (
            <div key={member.id} className="flex items-center gap-3">
              <div className="w-12 h-12 pixel-border bg-black flex items-center justify-center flex-shrink-0">
                {member.character_data.avatarUrl ? (
                  <img 
                    alt={`Pixel art portrait of ${member.character_name}.`} 
                    className="w-full h-full object-cover" 
                    src={member.character_data.avatarUrl} 
                  />
                ) : (
                  <User className="w-6 h-6 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1 text-xs w-32">
                <div className="flex justify-between items-baseline">
                  <p>{member.character_name}</p>
                  <p className="text-foreground/80">Lvl {member.level}</p>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-hp-red font-bold">PV</span>
                  <span className={cn("text-foreground/80", hpPercent < 25 && "text-destructive")}>{hp}/{maxHp}</span>
                </div>
                <div className="w-full h-4 bg-black pixel-border-inset p-0.5">
                  <div 
                    className={cn("h-full transition-all duration-500", hpPercent < 25 ? "bg-destructive" : "bg-hp-red")} 
                    style={{ width: `${hpPercent}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </PixelPanel>
  );
};

export default PartyStatus;