import { Character } from "../types";
import { PixelPanel } from "@/components/PixelPanel";

export const ClassAbilitiesSection = ({ character }: { character: Character }) => {
  if (!character.classAbilities || character.classAbilities.length === 0) return null;

  return (
    <PixelPanel>
      <h3 className="font-pixel text-sm text-accent pixel-text-shadow mb-4">Habilidades de Classe</h3>
      <ul className="space-y-2">
        {character.classAbilities.map(ability => (
          <li key={ability.name} className="font-pixel text-xs">
            <strong className="text-foreground">{ability.name} (Nível {ability.levelRequired}):</strong>
            <span className="text-muted-foreground ml-2">{ability.description}</span>
          </li>
        ))}
      </ul>
    </PixelPanel>
  );
};