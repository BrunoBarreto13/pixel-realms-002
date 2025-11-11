import { PixelPanel } from "@/components/PixelPanel";
import { PixelButton } from "@/components/PixelButton";
import { User, Save, Upload, Edit } from "lucide-react";
import { Character, Race, CharacterClass } from "./types";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface CharacterHeaderProps {
  character: Character;
  isEditing: boolean;
  onSave: () => void;
  onEdit: () => void;
  races: Race[];
  classes: CharacterClass[];
  onAvatarUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CharacterHeader = ({ character, isEditing, onSave, onEdit, races, classes, onAvatarUpload }: CharacterHeaderProps) => {
  const avatarInputRef = useRef<HTMLInputElement>(null);
  
  const currentHP = character.hp;
  const maxHP = character.maxHp;
  const hpPercent = maxHP > 0 ? Math.max(0, (currentHP / maxHP) * 100) : 0;

  const handleAvatarClick = () => {
    if (isEditing) {
      avatarInputRef.current?.click();
    }
  };

  return (
    <PixelPanel>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <div
            className="relative w-20 h-20 pixel-border bg-muted/50 flex items-center justify-center group rounded-lg"
            onClick={handleAvatarClick}
            style={{ cursor: isEditing ? 'pointer' : 'default' }}
          >
            {character.avatarUrl ? (
              <img 
                src={character.avatarUrl} 
                alt={character.name} 
                className="w-full h-full object-cover rounded-lg"
                onError={(e) => {
                  console.error('Erro ao carregar avatar:', character.avatarUrl);
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) : (
              <User className="w-12 h-12 text-muted-foreground" />
            )}
            {isEditing && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                <Upload className="w-8 h-8 text-white" />
              </div>
            )}
            <input
              type="file"
              ref={avatarInputRef}
              onChange={onAvatarUpload}
              className="hidden"
              accept="image/png, image/jpeg, image/gif"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-pixel text-xl text-primary pixel-text-shadow truncate">{character.name || "Novo Personagem"}</h2>
            <p className="font-pixel text-xs text-secondary-foreground truncate">
              Nível {character.level} {races.find(r => r.value === character.race)?.name || "---"} {classes.find(c => c.value === character.class)?.name || "---"}
            </p>
            <p className="font-pixel text-xs text-muted-foreground truncate">Jogador: {character.playerName || "---"}</p>
            
            {/* HP Bar */}
            <div className="mt-2">
              <div className="flex justify-between items-baseline font-pixel text-xs">
                <span className="text-hp-red font-bold">PONTOS DE VIDA</span>
                <span className={cn("text-foreground/80", hpPercent < 25 && "text-destructive")}>{currentHP}/{maxHP}</span>
              </div>
              <div className="w-full h-4 bg-black pixel-border-inset p-0.5 rounded-lg">
                <div 
                  className="bg-hp-red h-full transition-all duration-500 rounded-lg" 
                  style={{ width: `${hpPercent}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          {!isEditing ? (
            <PixelButton onClick={onEdit} variant="outline" className="flex items-center gap-2">
              <Edit className="h-4 w-4" />
              <span>Editar</span>
            </PixelButton>
          ) : (
            <PixelButton onClick={onSave} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              <span>Salvar</span>
            </PixelButton>
          )}
        </div>
      </div>
    </PixelPanel>
  );
};