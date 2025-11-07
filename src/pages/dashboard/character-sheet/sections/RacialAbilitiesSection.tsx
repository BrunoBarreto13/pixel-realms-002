import { Character } from "../types";
import { PixelPanel } from "@/components/PixelPanel";

export const RacialAbilitiesSection = ({ character }: { character: Character }) => {
  if (!character.racialAbilities || character.racialAbilities.length === 0) return null;

  return (
    <PixelPanel>
      <h3 className="font-pixel text-sm text-accent pixel-text-shadow mb-4">Habilidades Raciais</h3>
      <ul className="space-y-2">
        {character.racialAbilities.map(ability => (
          <li key={ability.name} className="font-pixel text-xs">
            <strong className="text-foreground">{ability.name}:</strong>
            <span className="text-muted-foreground ml-2">{ability.description}</span>
          </li>
        ))}
      </ul>
    </PixelPanel>
  );
};