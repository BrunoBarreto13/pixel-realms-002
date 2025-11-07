import { Character } from "../types";
import { PixelPanel } from "@/components/PixelPanel";
import { PixelButton } from "@/components/PixelButton";
import { Plus, Trash2 } from "lucide-react";
import { PixelInput } from "@/components/PixelInput";

interface LanguagesSectionProps {
  character: Character;
  isEditing: boolean;
  automaticLanguages: string[];
  remainingSlots: number;
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (index: number, value: string) => void;
}

export const LanguagesSection = ({ character, isEditing, automaticLanguages, remainingSlots, onAdd, onRemove, onChange }: LanguagesSectionProps) => {
  return (
    <PixelPanel>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-pixel text-sm text-accent pixel-text-shadow">Idiomas</h3>
        <p className="font-pixel text-xs">Slots Adicionais: <span className="font-bold text-lg text-accent">{remainingSlots}</span></p>
      </div>
      <div className="space-y-2">
        {automaticLanguages.map(lang => (
          <p key={lang} className="font-pixel text-xs bg-input p-2 pixel-border-inset">{lang} (Automático)</p>
        ))}
        {character.languages.map((lang, index) => (
          <div key={index} className="flex items-center gap-2">
            <PixelInput value={lang} onChange={(e) => onChange(index, e.target.value)} disabled={!isEditing} />
            {isEditing && <PixelButton size="icon" variant="ghost" onClick={() => onRemove(index)}><Trash2 className="h-4 w-4 text-destructive" /></PixelButton>}
          </div>
        ))}
      </div>
      {isEditing && remainingSlots > 0 && (
        <PixelButton size="sm" variant="outline" className="mt-4 w-full" onClick={onAdd}>
          <Plus className="h-4 w-4 mr-2" /> Adicionar Idioma
        </PixelButton>
      )}
    </PixelPanel>
  );
};