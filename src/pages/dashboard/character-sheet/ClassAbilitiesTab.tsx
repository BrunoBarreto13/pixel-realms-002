import { Character, GeneralSkill } from "./types";
import { ClassFeatures } from "@/lib/class-features";
import { PixelPanel } from "@/components/PixelPanel";
import { RacialAbilitiesSection } from "./sections/RacialAbilitiesSection";
import { ThiefSkillsSection } from "./sections/ThiefSkillsSection";
import { BackstabSection } from "./sections/BackstabSection";
import { TurningUndeadSection } from "./sections/TurningUndeadSection";
import { TrackingSection } from "./sections/TrackingSection";
import { BardSkillsSection } from "./sections/BardSkillsSection";
import { WeaponProficiencySection } from "./sections/WeaponProficiencySection";
import { GeneralSkillsSection } from "./sections/GeneralSkillsSection";
import { LanguagesSection } from "./sections/LanguagesSection";

interface ClassAbilitiesTabProps {
  character: Character;
  setCharacter: React.Dispatch<React.SetStateAction<Character>>;
  isEditing: boolean;
  classFeatures: ClassFeatures | null;
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

export const ClassAbilitiesTab = ({
  character,
  setCharacter,
  isEditing,
  classFeatures,
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
}: ClassAbilitiesTabProps) => {
  
  if (!classFeatures) {
    return (
      <PixelPanel>
        <p className="font-pixel text-sm text-center text-muted-foreground">
          Selecione uma classe para visualizar as habilidades.
        </p>
      </PixelPanel>
    );
  }

  return (
    <div className="space-y-6">
      {/* SEÇÃO 1: Habilidades Raciais (TODAS as classes) */}
      <RacialAbilitiesSection character={character} />
      
      {/* SEÇÃO 2: Talentos de Ladino (Ladino, Bardo) */}
      {classFeatures.thiefSkills && character.thiefSkills && (
        <ThiefSkillsSection 
          character={character} 
          isEditing={isEditing}
        />
      )}
      
      {/* SEÇÃO 3: Ataque pelas Costas (Ladino, Bardo 10+) */}
      {classFeatures.backstab && (
        <BackstabSection character={character} />
      )}
      
      {/* SEÇÃO 4: Expulsar Mortos-Vivos (Clérigo, Paladino) */}
      {classFeatures.turningUndead && character.turningTable && (
        <TurningUndeadSection 
          character={character}
        />
      )}
      
      {/* SEÇÃO 5: Rastreamento (Ranger) */}
      {classFeatures.trackingSkills && (
        <TrackingSection 
          character={character}
        />
      )}
      
      {/* SEÇÃO 6: Habilidades Bárdicas (Bardo) */}
      {classFeatures.bardSkills && (
        <BardSkillsSection 
          character={character}
        />
      )}
      
      {/* SEÇÃO 7: Perícias com Armas (TODAS as classes) */}
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
      
      {/* SEÇÃO 8: Perícias Gerais (TODAS as classes) */}
      <GeneralSkillsSection
        character={character}
        isEditing={isEditing}
        totalPoints={totalGeneralSkillPoints}
        usedPoints={usedGeneralSkillPoints}
        onAdd={onAddSkill}
        onRemove={onRemoveSkill}
        onChange={onSkillChange}
      />
      
      {/* SEÇÃO 9: Idiomas (TODAS as classes) */}
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