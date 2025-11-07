import { Character } from "../types";
import { PixelPanel } from "@/components/PixelPanel";

export const BackstabSection = ({ character }: { character: Character }) => {
  const multiplier = Math.floor(character.level / 4) + 1;
  return (
    <PixelPanel>
      <h3 className="font-pixel text-sm text-accent pixel-text-shadow mb-2">Ataque pelas Costas</h3>
      <p className="font-pixel text-xs text-muted-foreground">
        Multiplicador de Dano: <span className="font-bold text-lg text-accent">x{multiplier}</span>
      </p>
    </PixelPanel>
  );
};