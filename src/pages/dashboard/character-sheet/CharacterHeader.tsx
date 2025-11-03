import { PixelPanel } from "@/components/PixelPanel";
import { PixelButton } from "@/components/PixelButton";
import { User, Save } from "lucide-react";
import { Character } from "./types";
import { PHB_RACES, PHB_CLASSES } from "@/lib/players-handbook";

interface CharacterHeaderProps {
  character: Character;
  isEditing: boolean;
  onSave: () => void;
  onEdit: () => void;
}

export const CharacterHeader = ({ character, isEditing, onSave, onEdit }: CharacterHeaderProps) => {
  return (
    <PixelPanel>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 pixel-border bg-muted/50 flex items-center justify-center">
            <User className="w-12 h-12 text-muted-foreground" />
          </div>
          <div>
            <h2 className="font-pixel text-xl text-primary pixel-text-shadow">{character.name || "Novo Personagem"}</h2>
            <p className="font-pixel text-xs text-secondary-foreground">
              Nível {character.level} {PHB_RACES.find(r => r.value === character.race)?.name || "---"} {PHB_CLASSES.find(c => c.value === character.class)?.name || "---"}
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