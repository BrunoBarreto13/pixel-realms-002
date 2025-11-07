import { Character } from "../types";
import { PixelPanel } from "@/components/PixelPanel";

export const BardSkillsSection = ({ character }: { character: Character }) => {
  return (
    <PixelPanel>
      <h3 className="font-pixel text-sm text-accent pixel-text-shadow mb-2">Habilidades de Bardo</h3>
      <p className="font-pixel text-xs text-muted-foreground text-center py-4">
        (Em desenvolvimento)
      </p>
    </PixelPanel>
  );
};