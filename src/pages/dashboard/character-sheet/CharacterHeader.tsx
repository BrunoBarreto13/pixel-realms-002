import { PixelPanel } from "@/components/PixelPanel";
import { PixelButton } from "@/components/PixelButton";
import { User, Save, Upload } from "lucide-react";
import { Character, Race, CharacterClass } from "./types";
import { useRef } from "react";

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

  const handleAvatarClick = () => {
    if (isEditing) {
      avatarInputRef.current?.click();
    }
  };

  return (
    <PixelPanel>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div
            className="relative w-20 h-20 pixel-border bg-muted/50 flex items-center justify-center group"
            onClick={handleAvatarClick}
            style={{ cursor: isEditing ? 'pointer' : 'default' }}
          >
            {character.avatarUrl ? (
              <img src={character.avatarUrl} alt={character.name} className="w-full h-full object-cover" />
            ) : (
              <User className="w-12 h-12 text-muted-foreground" />
            )}
            {isEditing && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
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
          <div>
            <h2 className="font-pixel text-xl text-primary pixel-text-shadow">{character.name || "Novo Personagem"}</h2>
            <p className="font-pixel text-xs text-secondary-foreground">
              Nível {character.level} {races.find(r => r.value === character.race)?.name || "---"} {classes.find(c => c.value === character.class)?.name || "---"}
            </p>
            <p className="font-pixel text-xs text-muted-foreground">Jogador: {character.playerName || "---"}</p>
          </div>
        </div>
        <div className="flex gap-2">
          {!isEditing ? (
            <PixelButton onClick={onEdit} variant="outline">Editar</PixelButton>
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