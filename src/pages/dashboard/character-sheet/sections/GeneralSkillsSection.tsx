import { Character, GeneralSkill } from "../types";
import { PixelPanel } from "@/components/PixelPanel";
import { PixelButton } from "@/components/PixelButton";
import { Plus, Trash2 } from "lucide-react";
import { PixelInput } from "@/components/PixelInput";

interface GeneralSkillsSectionProps {
  character: Character;
  isEditing: boolean;
  totalPoints: number;
  usedPoints: number;
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (index: number, field: keyof GeneralSkill, value: string | number) => void;
}

export const GeneralSkillsSection = ({ character, isEditing, totalPoints, usedPoints, onAdd, onRemove, onChange }: GeneralSkillsSectionProps) => {
  return (
    <PixelPanel>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-pixel text-sm text-accent pixel-text-shadow">Perícias Gerais</h3>
        <p className="font-pixel text-xs">Pontos: <span className="font-bold text-lg text-accent">{totalPoints - usedPoints}</span> / {totalPoints}</p>
      </div>
      <div className="space-y-2">
        {character.generalSkills.map((skill, index) => (
          <div key={index} className="grid grid-cols-2 md:grid-cols-4 items-center gap-2 bg-input p-2 pixel-border-inset">
            <PixelInput placeholder="Nome da Perícia" value={skill.name} onChange={(e) => onChange(index, 'name', e.target.value)} disabled={!isEditing} />
            <PixelInput type="number" value={skill.points} onChange={(e) => onChange(index, 'points', parseInt(e.target.value) || 0)} disabled={!isEditing} />
            <PixelInput placeholder="Atributo" value={skill.ability} onChange={(e) => onChange(index, 'ability', e.target.value)} disabled={!isEditing} />
            {isEditing && <PixelButton size="icon" variant="ghost" onClick={() => onRemove(index)}><Trash2 className="h-4 w-4 text-destructive" /></PixelButton>}
          </div>
        ))}
      </div>
      {isEditing && (
        <PixelButton size="sm" variant="outline" className="mt-4 w-full" onClick={onAdd}>
          <Plus className="h-4 w-4 mr-2" /> Adicionar Perícia
        </PixelButton>
      )}
    </PixelPanel>
  );
};