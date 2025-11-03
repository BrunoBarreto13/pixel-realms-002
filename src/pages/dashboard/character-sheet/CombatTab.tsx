import { PixelInput } from "@/components/PixelInput";
import { PixelButton } from "@/components/PixelButton";
import { Label } from "@/components/ui/label";
import { Sword, Target } from "lucide-react";
import { Character } from "./types";

interface CombatTabProps {
  character: Character;
  setCharacter: React.Dispatch<React.SetStateAction<Character>>;
  isEditing: boolean;
  calculatedAc: number;
  calculatedThac0: number;
  damageInput: string;
  setDamageInput: React.Dispatch<React.SetStateAction<string>>;
  onApplyDamage: () => void;
  onRoll: (sides: number, modifier: number, title: string) => void;
  strengthBonuses: any;
  dexterityBonuses: any;
}

export const CombatTab = ({
  character,
  setCharacter,
  isEditing,
  calculatedAc,
  calculatedThac0,
  damageInput,
  setDamageInput,
  onApplyDamage,
  onRoll,
  strengthBonuses,
  dexterityBonuses,
}: CombatTabProps) => {
  return (
    <div className="mt-0 space-y-6">
      <div className="bg-muted/30 p-4 pixel-border">
        <h3 className="font-pixel text-sm text-accent pixel-text-shadow mb-4">ESTATÍSTICAS DE COMBATE</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-input p-4 pixel-border text-center">
            <Label className="font-pixel text-xs text-secondary mb-2 block">CA</Label>
            <div className="w-full h-12 flex items-center justify-center font-pixel text-lg text-accent">{calculatedAc}</div>
          </div>
          <div className="bg-input p-4 pixel-border text-center">
            <Label className="font-pixel text-xs text-secondary mb-2 block">THAC0</Label>
            <div className="w-full h-12 flex items-center justify-center font-pixel text-lg text-primary">{calculatedThac0}</div>
          </div>
          <div className="bg-input p-4 pixel-border text-center">
            <Label className="font-pixel text-xs text-secondary mb-2 block">Iniciativa</Label>
            <input type="number" value={character.initiative} onChange={(e) => setCharacter({ ...character, initiative: parseInt(e.target.value) || 0 })} className="w-full h-12 pixel-border bg-input px-2 font-pixel text-lg text-center text-foreground" disabled={!isEditing} />
          </div>
          <div className="bg-input p-4 pixel-border text-center">
            <Label className="font-pixel text-xs text-secondary mb-2 block">HP</Label>
            <div className="flex items-center justify-center gap-1">
              <input type="number" value={character.hp} onChange={(e) => setCharacter({ ...character, hp: parseInt(e.target.value) || 0 })} className="w-16 h-12 pixel-border bg-input px-1 font-pixel text-sm text-center text-destructive" />
              <span className="font-pixel text-foreground">/</span>
              <span className="font-pixel text-lg text-primary">{character.maxHp || 0}</span>
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <PixelInput placeholder="Dano sofrido..." value={damageInput} onChange={(e) => setDamageInput(e.target.value)} type="number" />
          <PixelButton onClick={onApplyDamage}>Aplicar Dano</PixelButton>
        </div>
      </div>
      <div className="bg-muted/30 p-4 pixel-border">
        <h3 className="font-pixel text-sm text-accent pixel-text-shadow mb-4">ROLAGEM DE DADOS</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <PixelButton onClick={() => onRoll(20, strengthBonuses.hit, "Ataque Corpo-a-Corpo")} className="flex items-center gap-2"><Sword className="h-4 w-4" /> Ataque C-a-C</PixelButton>
          <PixelButton onClick={() => onRoll(20, dexterityBonuses.missile, "Ataque à Distância")} className="flex items-center gap-2"><Target className="h-4 w-4" /> Ataque Dist.</PixelButton>
          <PixelButton onClick={() => onRoll(20, 0, "d20")}>d20</PixelButton>
          <PixelButton onClick={() => onRoll(100, 0, "d100")}>d100</PixelButton>
          <PixelButton onClick={() => onRoll(12, 0, "d12")}>d12</PixelButton>
          <PixelButton onClick={() => onRoll(10, 0, "d10")}>d10</PixelButton>
          <PixelButton onClick={() => onRoll(8, 0, "d8")}>d8</PixelButton>
          <PixelButton onClick={() => onRoll(6, 0, "d6")}>d6</PixelButton>
          <PixelButton onClick={() => onRoll(4, 0, "d4")}>d4</PixelButton>
        </div>
      </div>
    </div>
  );
};