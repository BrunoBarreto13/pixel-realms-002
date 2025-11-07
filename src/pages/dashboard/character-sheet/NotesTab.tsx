import { Character } from "./types";

interface NotesTabProps {
  character: Character;
  setCharacter: React.Dispatch<React.SetStateAction<Character>>;
}

export const NotesTab = ({ character, setCharacter }: NotesTabProps) => {
  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharacter(prev => ({
      ...prev,
      notes: { ...prev.notes, general: e.target.value }
    }));
  };

  return (
    <div className="mt-0">
      <h3 className="font-pixel text-sm text-accent pixel-text-shadow mb-4">NOTAS</h3>
      <textarea 
        className="w-full min-h-[400px] pixel-border bg-input p-4 font-pixel text-xs resize-y" 
        placeholder="Escreva suas anotações sobre o personagem, história, etc..."
        value={character.notes?.general || ''}
        onChange={handleNotesChange}
      />
    </div>
  );
};