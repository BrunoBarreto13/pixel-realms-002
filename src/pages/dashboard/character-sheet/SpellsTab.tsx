import { Character } from "./types";
import { PixelPanel } from "@/components/PixelPanel";
import { Label } from "@/components/ui/label";

interface SpellsTabProps {
  character: Character;
}

export const SpellsTab = ({ character }: SpellsTabProps) => {
  if (!character.spellSlots) {
    return (
      <div className="mt-0 text-center py-8">
        <p className="font-pixel text-xs text-muted-foreground">Esta classe não utiliza magias.</p>
      </div>
    );
  }

  return (
    <div className="mt-0 space-y-6">
      <PixelPanel>
        <h3 className="font-pixel text-sm text-accent pixel-text-shadow mb-4">Slots de Magia</h3>
        <div className="grid grid-cols-3 md:grid-cols-7 gap-2 text-center font-pixel text-xs">
          {Object.entries(character.spellSlots).map(([level, slots]) => slots && (
            <div key={level} className="bg-input p-2 pixel-border-inset">
              <Label className="capitalize text-muted-foreground">Círculo {level.replace('level', '')}</Label>
              <p className="text-lg text-primary">{slots.current}/{slots.max}</p>
            </div>
          ))}
        </div>
      </PixelPanel>
      <p className="font-pixel text-xs text-muted-foreground text-center py-8">Gerenciamento de magias em desenvolvimento...</p>
    </div>
  );
};