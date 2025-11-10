import { PixelButton } from "@/components/PixelButton";
import { Character } from "./types";
import { Save } from "lucide-react";

interface NotesTabProps {
  character: Character;
  setCharacter: React.Dispatch<React.SetStateAction<Character>>;
  isEditing: boolean;
  onSave: () => void; // Prop para acionar o salvamento
}

export const NotesTab = ({ character, setCharacter, isEditing, onSave }: NotesTabProps) => {
  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharacter(prev => ({ ...prev, notes: e.target.value }));
  };

  return (
    <div className="mt-0 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-pixel text-sm text-accent pixel-text-shadow">NOTAS</h3>
        <PixelButton 
          onClick={onSave} 
          size="sm" 
          disabled={!isEditing} 
          className="flex items-center gap-2"
        >
          <Save className="h-4 w-4" /> Salvar Notas
        </PixelButton>
      </div>
      <textarea 
        className="w-full min-h-[200px] pixel-border bg-input p-4 font-pixel text-xs resize-none disabled:opacity-70" 
        placeholder="Escreva suas anotações sobre o personagem..." 
        value={character.notes}
        onChange={handleNotesChange}
        disabled={!isEditing}
      />
    </div>
  );
};