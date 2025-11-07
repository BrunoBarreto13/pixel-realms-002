import { Character } from "../types";
import { PixelPanel } from "@/components/PixelPanel";
import { Label } from "@/components/ui/label";

export const TurningUndeadSection = ({ character }: { character: Character }) => {
  if (!character.turningTable) return null;

  return (
    <PixelPanel>
      <h3 className="font-pixel text-sm text-accent pixel-text-shadow mb-4">Expulsar Mortos-Vivos</h3>
      <p className="font-pixel text-xs text-muted-foreground mb-4">
        Valores representam o resultado mínimo em 2d6 para expulsar.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center font-pixel text-xs">
        {Object.entries(character.turningTable).map(([undead, value]) => (
          <div key={undead} className="bg-input p-2 pixel-border-inset">
            <Label className="capitalize text-muted-foreground">{undead}</Label>
            <p className="text-lg text-primary">{value >= 20 ? '-' : value}</p>
          </div>
        ))}
      </div>
    </PixelPanel>
  );
};