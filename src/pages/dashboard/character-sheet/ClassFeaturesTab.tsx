import { Character } from "./types";
import { ClassFeatures } from "@/lib/class-features";
import { PixelPanel } from "@/components/PixelPanel";
import { RacialAbilitiesSection } from "./sections/RacialAbilitiesSection";
import { ThiefSkillsSection } from "./sections/ThiefSkillsSection";
import { BackstabSection } from "./sections/BackstabSection";
import { TurningUndeadSection } from "./sections/TurningUndeadSection";
import { TrackingSection } from "./sections/TrackingSection";
import { BardSkillsSection } from "./sections/BardSkillsSection";
import { ClassAbilitiesSection } from "./sections/ClassAbilitiesSection";

interface ClassFeaturesTabProps {
  character: Character;
  isEditing: boolean;
  classFeatures: ClassFeatures | null;
}

export const ClassFeaturesTab = ({
  character,
  isEditing,
  classFeatures,
}: ClassFeaturesTabProps) => {
  
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
      
      {/* SEÇÃO 2: Habilidades de Classe (Geral) */}
      <ClassAbilitiesSection character={character} />

      {/* SEÇÃO 3: Talentos de Ladino (Ladino, Bardo) */}
      {classFeatures.thiefSkills && character.thiefSkills && (
        <ThiefSkillsSection 
          character={character} 
          isEditing={isEditing}
        />
      )}
      
      {/* SEÇÃO 4: Ataque pelas Costas (Ladino, Bardo) */}
      {classFeatures.backstab && (
        <BackstabSection character={character} />
      )}
      
      {/* SEÇÃO 5: Expulsar Mortos-Vivos (Clérigo, Paladino) */}
      {classFeatures.turningUndead && character.turningTable && (
        <TurningUndeadSection 
          character={character}
        />
      )}
      
      {/* SEÇÃO 6: Rastreamento (Ranger) */}
      {classFeatures.trackingSkills && (
        <TrackingSection 
          character={character}
        />
      )}
      
      {/* SEÇÃO 7: Habilidades Bárdicas (Bardo) */}
      {classFeatures.bardSkills && (
        <BardSkillsSection 
          character={character}
        />
      )}
    </div>
  );
};