import { PixelInput } from "@/components/PixelInput";
import { PixelButton } from "@/components/PixelButton";
import { Label } from "@/components/ui/label";
import { Plus, Minus, Edit } from "lucide-react";
import { Character, GeneralSkill } from "./types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SkillsTabProps {
  character: Character;
  isEditing: boolean;
  totalWeaponProficiencyPoints: number;
  usedWeaponProficiencyPoints: number;
  proficiencyRuleText: string;
  onAddArmament: () => void;
  onEditArmament: (index: number) => void;
  onRemoveArmament: (index: number) => void;
  onAddSkill: () => void;
  onRemoveSkill: (index: number) => void;
  onSkillChange: (index: number, field: keyof GeneralSkill, value: string | number) => void;
  automaticLanguages: string[];
  remainingLanguageSlots: number;
  onAddLanguage: () => void;
  onRemoveLanguage: (index: number) => void;
  onLanguageChange: (index: number, value: string) => void;
  totalGeneralSkillPoints: number;
  usedGeneralSkillPoints: number;
}

const abilityOptions = [
  { value: 'strength', label: 'Força' },
  { value: 'dexterity', label: 'Destreza' },
  { value: 'constitution', label: 'Constituição' },
  { value: 'intelligence', label: 'Inteligência' },
  { value: 'wisdom', label: 'Sabedoria' },
  { value: 'charisma', label: 'Carisma' },
];

export const SkillsTab = ({
  character,
  isEditing,
  totalWeaponProficiencyPoints,
  usedWeaponProficiencyPoints,
  proficiencyRuleText,
  onAddArmament,
  onEditArmament,
  onRemoveArmament,
  onAddSkill,
  onRemoveSkill,
  onSkillChange,
  automaticLanguages,
  remainingLanguageSlots,
  onAddLanguage,
  onRemoveLanguage,
  onLanguageChange,
  totalGeneralSkillPoints,
  usedGeneralSkillPoints,
}: SkillsTabProps) => {
  return (
    <div className="mt-0 space-y-6">
      {/* Languages Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-pixel text-sm text-accent pixel-text-shadow">IDIOMAS ({remainingLanguageSlots} pontos)</h3>
          <PixelButton onClick={onAddLanguage} size="sm" variant="secondary" disabled={!isEditing || remainingLanguageSlots <= 0} className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Adicionar Idioma
          </PixelButton>
        </div>
        <div className="bg-muted/30 p-4 pixel-border space-y-4">
          <div>
            <Label className="font-pixel text-xs text-muted-foreground">Idiomas Automáticos</Label>
            <p className="font-pixel text-xs text-foreground mt-1">{automaticLanguages.join(', ')}</p>
          </div>
          <div>
            <Label className="font-pixel text-xs text-muted-foreground">Idiomas Adicionais</Label>
            <div className="space-y-2 mt-2">
              {character.languages.map((lang, index) => (
                <div key={index} className="flex items-center gap-2">
                  <PixelInput 
                    value={lang} 
                    onChange={(e) => onLanguageChange(index, e.target.value)} 
                    disabled={!isEditing} 
                    placeholder="Digite um idioma..."
                    className="flex-grow"
                  />
                  <PixelButton onClick={() => onRemoveLanguage(index)} variant="destructive" size="icon" disabled={!isEditing} aria-label="Remover Idioma">
                    <Minus className="h-4 w-4" />
                  </PixelButton>
                </div>
              ))}
              {character.languages.length === 0 && (
                <p className="font-pixel text-xs text-foreground/50 text-center py-2">Nenhum idioma adicional escolhido.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Weapon Proficiencies Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-pixel text-sm text-accent pixel-text-shadow">PERÍCIAS COM ARMAS</h3>
          <PixelButton onClick={onAddArmament} size="sm" variant="secondary" disabled={!isEditing} className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Adicionar Perícia
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
              <PixelInput label="Nome da Arma" value={weapon.name} disabled />
              <PixelInput label="Dano" value={weapon.damage.small_medium} disabled />
              <div className="md:col-span-2 flex gap-4 items-end">
                <PixelInput label="Tipo" value={weapon.type} disabled className="flex-grow" />
                <PixelButton onClick={() => onEditArmament(index)} variant="outline" size="icon" disabled={!isEditing} aria-label="Editar Perícia">
                  <Edit className="h-4 w-4" />
                </PixelButton>
                <PixelButton onClick={() => onRemoveArmament(index)} variant="destructive" size="icon" disabled={!isEditing} aria-label="Remover Perícia">
                  <Minus className="h-4 w-4" />
                </PixelButton>
              </div>
            </div>
          ))}
          {character.armaments.length === 0 && (
            <p className="font-pixel text-xs text-muted-foreground text-center py-4">Nenhuma perícia com arma adicionada.</p>
          )}
        </div>
      </div>

      {/* General Skills Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-pixel text-sm text-accent pixel-text-shadow">PERÍCIAS GERAIS</h3>
          <PixelButton onClick={onAddSkill} size="sm" variant="secondary" disabled={!isEditing || usedGeneralSkillPoints >= totalGeneralSkillPoints} className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Adicionar Perícia
          </PixelButton>
        </div>
        <div className="bg-muted/30 p-4 pixel-border mb-4 space-y-2">
          <div className="flex justify-between items-center font-pixel text-xs">
            <Label>Pontos de Perícia Geral</Label>
            <span className="text-accent font-bold">{usedGeneralSkillPoints} / {totalGeneralSkillPoints}</span>
          </div>
          <p className="text-muted-foreground text-xs font-pixel">Pontos base de classe + pontos de idiomas não utilizados.</p>
        </div>
        <div className="space-y-2">
          {character.generalSkills.map((skill, index) => {
            const targetValue = skill.ability && character.attributes[skill.ability]
              ? character.attributes[skill.ability] + skill.modifier
              : 'N/A';

            return (
              <div key={index} className="bg-muted/30 p-4 pixel-border space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-12 gap-4 items-end">
                  <div className="col-span-2 md:col-span-3"><PixelInput label="Nome da Perícia" value={skill.name} onChange={(e) => onSkillChange(index, 'name', e.target.value)} disabled={!isEditing} /></div>
                  <div className="col-span-1"><PixelInput label="Pontos" type="number" value={skill.points} onChange={(e) => onSkillChange(index, 'points', parseInt(e.target.value) || 0)} disabled={!isEditing} /></div>
                  <div className="col-span-2">
                    <Label className="font-pixel text-xs text-foreground">Habilidade</Label>
                    <Select value={skill.ability} onValueChange={(value) => onSkillChange(index, 'ability', value)} disabled={!isEditing}>
                      <SelectTrigger className="pixel-border bg-input backdrop-blur-sm font-pixel text-xs h-10 mt-2"><SelectValue placeholder="Selecione..." /></SelectTrigger>
                      <SelectContent className="bg-card border-2 border-border z-50">
                        {abilityOptions.map(opt => <SelectItem key={opt.value} value={opt.value} className="font-pixel text-xs">{opt.label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-1"><PixelInput label="Mod." type="number" value={skill.modifier} onChange={(e) => onSkillChange(index, 'modifier', parseInt(e.target.value) || 0)} disabled={!isEditing} /></div>
                  <div className="col-span-1"><PixelInput label="Alvo" value={targetValue} disabled /></div>
                  <div className="col-span-2 md:col-span-3"><PixelInput label="Observações" value={skill.notes} onChange={(e) => onSkillChange(index, 'notes', e.target.value)} disabled={!isEditing} /></div>
                  <div className="col-span-2 md:col-span-1 flex justify-end">
                    <PixelButton onClick={() => onRemoveSkill(index)} variant="destructive" size="icon" disabled={!isEditing} aria-label="Remover Perícia">
                      <Minus className="h-4 w-4" />
                    </PixelButton>
                  </div>
                </div>
              </div>
            );
          })}
          {character.generalSkills.length === 0 && (
            <p className="font-pixel text-xs text-muted-foreground text-center py-4">Nenhuma perícia geral adicionada.</p>
          )}
        </div>
      </div>
    </div>
  );
};