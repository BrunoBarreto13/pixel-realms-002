import { PixelInput } from "@/components/PixelInput";
import { PixelButton } from "@/components/PixelButton";
import { Label } from "@/components/ui/label";
import { Sword, Target, Shield } from "lucide-react";
import { Character, Armament, SavingThrows } from "./types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface CombatTabProps {
  character: Character;
  setCharacter: React.Dispatch<React.SetStateAction<Character>>;
  calculatedCaDetails: {
    ca_base: number;
    ajustes: { fonte: string; valor: number; item?: string }[];
    ca_final: number;
  };
  calculatedThac0: number;
  calculatedSaves: SavingThrows;
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
  calculatedCaDetails,
  calculatedThac0,
  calculatedSaves,
  damageInput,
  setDamageInput,
  onApplyDamage,
  onRoll,
  strengthBonuses,
  dexterityBonuses,
}: CombatTabProps) => {

  const getAttackBonus = (weapon: Armament) => {
    if (weapon.categoria === 'corpo-a-corpo') return strengthBonuses.hit;
    if (weapon.categoria === 'a-distancia' || weapon.categoria === 'arremesso') return dexterityBonuses.missile;
    return 0;
  };

  const getDamageBonus = (weapon: Armament) => {
    if (weapon.categoria === 'corpo-a-corpo') return strengthBonuses.dmg;
    return 0;
  };

  return (
    <div className="mt-0 space-y-6">
      <div className="bg-muted/30 p-4 pixel-border">
        <h3 className="font-pixel text-sm text-accent pixel-text-shadow mb-4">ESTATÍSTICAS DE COMBATE</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="bg-input p-4 pixel-border text-center cursor-help">
                  <Label className="font-pixel text-xs text-secondary mb-2 block">CA</Label>
                  <div className="w-full h-12 flex items-center justify-center font-pixel text-lg text-accent">{calculatedCaDetails.ca_final}</div>
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-card border-2 border-border font-pixel text-xs">
                <p>Base: {calculatedCaDetails.ca_base}</p>
                {calculatedCaDetails.ajustes.map((adj, i) => (
                  <p key={i}>{adj.fonte} ({adj.item || 'Bônus'}): {adj.valor > 0 ? `+${adj.valor}` : adj.valor}</p>
                ))}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="bg-input p-4 pixel-border text-center">
            <Label className="font-pixel text-xs text-secondary mb-2 block">THAC0 Base</Label>
            <div className="w-full h-12 flex items-center justify-center font-pixel text-lg text-primary">{calculatedThac0}</div>
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
        <h3 className="font-pixel text-sm text-accent pixel-text-shadow mb-4">JOGADAS DE PROTEÇÃO</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-center font-pixel text-xs">
          <div className="bg-input p-2 pixel-border">
            <p className="text-muted-foreground">Paral./Veneno</p>
            <p className="text-lg text-primary">{calculatedSaves.poison}</p>
          </div>
          <div className="bg-input p-2 pixel-border">
            <p className="text-muted-foreground">Petrif./Polim.</p>
            <p className="text-lg text-primary">{calculatedSaves.petrification}</p>
          </div>
          <div className="bg-input p-2 pixel-border">
            <p className="text-muted-foreground">Bastão/Varinha</p>
            <p className="text-lg text-primary">{calculatedSaves.rod}</p>
          </div>
          <div className="bg-input p-2 pixel-border">
            <p className="text-muted-foreground">Sopro de Dragão</p>
            <p className="text-lg text-primary">{calculatedSaves.breath}</p>
          </div>
          <div className="bg-input p-2 pixel-border">
            <p className="text-muted-foreground">Magia</p>
            <p className="text-lg text-primary">{calculatedSaves.spell}</p>
          </div>
        </div>
      </div>

      <div className="bg-muted/30 p-4 pixel-border">
        <h3 className="font-pixel text-sm text-accent pixel-text-shadow mb-4">ATAQUES</h3>
        <div className="space-y-2">
          {character.armaments.map((weapon, index) => {
            const attackBonus = getAttackBonus(weapon);
            const damageBonus = getDamageBonus(weapon);
            const finalThac0 = calculatedThac0 - attackBonus;
            const damageString = `${weapon.dano}${damageBonus > 0 ? `+${damageBonus}` : damageBonus < 0 ? damageBonus : ''}`;

            return (
              <div key={index} className="bg-input p-3 pixel-border grid grid-cols-3 md:grid-cols-5 gap-x-4 gap-y-2 items-center text-xs">
                <p className="col-span-3 md:col-span-1 font-bold text-foreground">{weapon.nome}</p>
                <p><span className="text-muted-foreground">THAC0:</span> {finalThac0}</p>
                <p><span className="text-muted-foreground">Dano:</span> {damageString}</p>
                <p><span className="text-muted-foreground">Ataques:</span> {weapon.num_ataques}</p>
                <PixelButton size="sm" variant="secondary" onClick={() => onRoll(20, attackBonus, `Ataque com ${weapon.nome}`)}>Atacar</PixelButton>
              </div>
            );
          })}
          {character.armaments.length === 0 && (
            <p className="text-center text-muted-foreground text-xs py-4">Nenhum armamento adicionado.</p>
          )}
        </div>
      </div>
    </div>
  );
};