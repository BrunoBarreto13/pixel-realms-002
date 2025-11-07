import { Character } from "../types";
import { PixelPanel } from "@/components/PixelPanel";
import { PixelButton } from "@/components/PixelButton";
import { Plus, Edit, Trash2 } from "lucide-react";

interface WeaponProficiencySectionProps {
  character: Character;
  isEditing: boolean;
  totalPoints: number;
  usedPoints: number;
  proficiencyRuleText: string;
  onAdd: () => void;
  onEdit: (index: number) => void;
  onRemove: (index: number) => void;
}

export const WeaponProficiencySection = ({ character, isEditing, totalPoints, usedPoints, proficiencyRuleText, onAdd, onEdit, onRemove }: WeaponProficiencySectionProps) => {
  return (
    <PixelPanel>
      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
        <h3 className="font-pixel text-sm text-accent pixel-text-shadow">Perícias com Armas</h3>
        <div className="font-pixel text-xs text-right">
          <p>Pontos: <span className="font-bold text-lg text-accent">{totalPoints - usedPoints}</span> / {totalPoints}</p>
          <p className="text-muted-foreground max-w-xs">{proficiencyRuleText}</p>
        </div>
      </div>
      <div className="space-y-2">
        {character.armaments.map((weapon, index) => (
          <div key={index} className="bg-input p-2 pixel-border-inset flex items-center justify-between gap-2 text-xs">
            <span className="font-pixel font-bold">{weapon.name}</span>
            {isEditing && (
              <div className="flex gap-1">
                <PixelButton size="icon" variant="ghost" onClick={() => onEdit(index)}><Edit className="h-4 w-4" /></PixelButton>
                <PixelButton size="icon" variant="ghost" onClick={() => onRemove(index)}><Trash2 className="h-4 w-4 text-destructive" /></PixelButton>
              </div>
            )}
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