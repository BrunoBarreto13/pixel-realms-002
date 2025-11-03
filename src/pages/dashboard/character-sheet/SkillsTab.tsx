import { PixelInput } from "@/components/PixelInput";
import { PixelButton } from "@/components/PixelButton";
import { Label } from "@/components/ui/label";
import { Plus, Minus } from "lucide-react";
import { Character, Armament, GeneralSkill } from "./types";

interface SkillsTabProps {
  character: Character;
  isEditing: boolean;
  totalWeaponProficiencyPoints: number;
  usedWeaponProficiencyPoints: number;
  proficiencyRuleText: string;
  onAddArmament: () => void;
  onRemoveArmament: (index: number) => void;
  onArmamentChange: (index: number, field: keyof Armament, value: string | number) => void;
  onAddSkill: () => void;
  onRemoveSkill: (index: number) => void;
  onSkillChange: (index: number, field: keyof GeneralSkill, value: string) => void;
}

export const SkillsTab = ({
  character,
  isEditing,
  totalWeaponProficiencyPoints,
  usedWeaponProficiencyPoints,
  proficiencyRuleText,
  onAddArmament,
  onRemoveArmament,
  onArmamentChange,
  onAddSkill,
  onRemoveSkill,
  onSkillChange,
}: SkillsTabProps) => {
  return (
    <div className="mt-0 space-y-6">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-pixel text-sm text-accent pixel-text-shadow">ARMAMENTOS</h3>
          <PixelButton onClick={onAddArmament} size="sm" variant="secondary" disabled={!isEditing} className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Adicionar Arma
          </PixelButton>
        </div>
        <div className="bg-muted/30 p-4 pixel-border mb-4 space-y-2">
          <div className="flex justify-between items-center font-pixel text-xs">
            <Label>Pontos de Perícia com Armas</Label>
            <span className="text-accent font-bold">{usedWeaponProficiencyPoints} / {totalWeaponProficiencyPoints}</span>
          </div>
          <p className="text-muted-foreground text-xs font-pixel">{proficiencyRuleText}</p>
        </div>
        <div className="space-y-4">
          {character.armaments.map((weapon, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end bg-muted/30 p-4 pixel-border">
              <PixelInput label="Nome da Arma" value={weapon.nome} onChange={(e) => onArmamentChange(index, 'nome', e.target.value)} disabled={!isEditing} />
              <PixelInput label="Dano" value={weapon.dano} disabled />
              <div className="md:col-span-2 flex gap-4 items-end">
                <PixelInput label="Tipo" value={weapon.tipo} disabled className="flex-grow" />
                <PixelButton onClick={() => onRemoveArmament(index)} variant="destructive" size="icon" disabled={!isEditing} aria-label="Remover Arma">
                  <Minus className="h-4 w-4" />
                </PixelButton>
              </div>
            </div>
          ))}
          {character.armaments.length === 0 && (
            <p className="font-pixel text-xs text-muted-foreground text-center py-4">Nenhum armamento adicionado.</p>
          )}
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-pixel text-sm text-accent pixel-text-shadow">PERÍCIAS GERAIS</h3>
          <PixelButton onClick={onAddSkill} size="sm" variant="secondary" disabled={!isEditing} className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Adicionar Perícia
          </PixelButton>
        </div>
        <div className="space-y-4">
          {character.generalSkills.map((skill, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end bg-muted/30 p-4 pixel-border">
              <PixelInput label="Nome da Perícia" value={skill.name} onChange={(e) => onSkillChange(index, 'name', e.target.value)} disabled={!isEditing} />
              <PixelInput label="Categoria" value={skill.category} onChange={(e) => onSkillChange(index, 'category', e.target.value)} disabled={!isEditing} />
              <PixelInput label="Nível/Valor" value={skill.level} onChange={(e) => onSkillChange(index, 'level', e.target.value)} disabled={!isEditing} />
              <div className="md:col-span-2 flex gap-4 items-end">
                <PixelInput label="Observações" value={skill.notes} onChange={(e) => onSkillChange(index, 'notes', e.target.value)} disabled={!isEditing} className="flex-grow" />
                <PixelButton onClick={() => onRemoveSkill(index)} variant="destructive" size="icon" disabled={!isEditing} aria-label="Remover Perícia">
                  <Minus className="h-4 w-4" />
                </PixelButton>
              </div>
            </div>
          ))}
          {character.generalSkills.length === 0 && (
            <p className="font-pixel text-xs text-muted-foreground text-center py-4">Nenhuma perícia geral adicionada.</p>
          )}
        </div>
      </div>
    </div>
  );
};