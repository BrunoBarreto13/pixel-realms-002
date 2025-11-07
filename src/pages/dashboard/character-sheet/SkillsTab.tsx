import { Character, GeneralSkill } from "./types";
import { WeaponProficiencySection } from "./sections/WeaponProficiencySection";
import { GeneralSkillsSection } from "./sections/GeneralSkillsSection";
import { LanguagesSection } from "./sections/LanguagesSection";

interface SkillsTabProps {
  character: Character;
  isEditing: boolean;
  
  // Weapon Proficiencies
  totalWeaponProficiencyPoints: number;
  usedWeaponProficiencyPoints: number;
  proficiencyRuleText: string;
  onAddArmament: () => void;
  onEditArmament: (index: number) => void;
  onRemoveArmament: (index: number) => void;

  // General Skills
  totalGeneralSkillPoints: number;
  usedGeneralSkillPoints: number;
  onAddSkill: () => void;
  onRemoveSkill: (index: number) => void;
  onSkillChange: (index: number, field: keyof GeneralSkill, value: string | number) => void;

  // Languages
  automaticLanguages: string[];
  remainingLanguageSlots: number;
  onAddLanguage: () => void;
  onRemoveLanguage: (index: number) => void;
  onLanguageChange: (index: number, value: string) => void;
}

export const SkillsTab = ({
  character,
  isEditing,
  totalWeaponProficiencyPoints,
  usedWeaponProficiencyPoints,
  proficiencyRuleText,
  onAddArmament,
  onEditArmament,
  onRemoveArmament,
  totalGeneralSkillPoints,
  usedGeneralSkillPoints,
  onAddSkill,
  onRemoveSkill,
  onSkillChange,
  automaticLanguages,
  remainingLanguageSlots,
  onAddLanguage,
  onRemoveLanguage,
  onLanguageChange,
}: SkillsTabProps) => {
  return (
    <div className="space-y-6">
      {/* Perícias com Armas */}
      <WeaponProficiencySection
        character={character}
        isEditing={isEditing}
        totalPoints={totalWeaponProficiencyPoints}
        usedPoints={usedWeaponProficiencyPoints}
        proficiencyRuleText={proficiencyRuleText}
        onAdd={onAddArmament}
        onEdit={onEditArmament}
        onRemove={onRemoveArmament}
      />
      
      {/* Perícias Gerais */}
      <GeneralSkillsSection
        character={character}
        isEditing={isEditing}
        totalPoints={totalGeneralSkillPoints}
        usedPoints={usedGeneralSkillPoints}
        onAdd={onAddSkill}
        onRemove={onRemoveSkill}
        onChange={onSkillChange}
      />
      
      {/* Idiomas */}
      <LanguagesSection
        character={character}
        isEditing={isEditing}
        automaticLanguages={automaticLanguages}
        remainingSlots={remainingLanguageSlots}
        onAdd={onAddLanguage}
        onRemove={onRemoveLanguage}
        onChange={onLanguageChange}
      />
    </div>
  );
};