import { Character } from "./types";
import { useClassFeatures } from "@/hooks/useClassFeatures";
import { ThiefSkillsSection } from "./sections/ThiefSkillsSection";
import { TurningUndeadSection } from "./sections/TurningUndeadSection";
import { RacialAbilitiesSection } from "./sections/RacialAbilitiesSection";
import { ClassAbilitiesSection } from "./sections/ClassAbilitiesSection";

interface ClassAbilitiesTabProps {
  character: Character;
  isEditing: boolean;
}

export const ClassAbilitiesTab = ({ character, isEditing }: ClassAbilitiesTabProps) => {
  const classFeatures = useClassFeatures(character);

  if (!classFeatures) {
    return (
      <div className="text-center py-12">
        <p className="font-pixel text-sm text-muted-foreground">Selecione uma classe para ver as habilidades.</p>
      </div>
    );
  }

  return (
    <div className="mt-0 space-y-6">
      <RacialAbilitiesSection character={character} />
      <ClassAbilitiesSection character={character} />

      {/* Conditional Sections */}
      {classFeatures.thiefSkills && (
        <ThiefSkillsSection character={character} isEditing={isEditing} />
      )}
      
      {classFeatures.turningUndead && (
        <TurningUndeadSection character={character} />
      )}
    </div>
  );
};