import { Spell } from "@/pages/dashboard/character-sheet/types";
import { Label } from "@/components/ui/label";

interface SpellCardProps {
  spell: Spell;
}

const SpellDetailItem = ({ label, value }: { label: string; value: string }) => (
  <div>
    <Label className="text-xs text-muted-foreground font-pixel">{label}</Label>
    <p className="font-pixel text-xs text-foreground">{value || "---"}</p>
  </div>
);

export const SpellCard = ({ spell }: SpellCardProps) => {
  return (
    <div className="bg-muted/30 p-4 pixel-border space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SpellDetailItem label="Escola" value={spell.school} />
        <SpellDetailItem label="Alcance" value={spell.range} />
        <SpellDetailItem label="Duração" value={spell.duration} />
        <SpellDetailItem label="Tempo de Execução" value={spell.casting_time} />
        <SpellDetailItem label="Área de Efeito" value={spell.area_of_effect} />
        <SpellDetailItem label="Componentes" value={spell.components} />
        <SpellDetailItem label="Teste de Resistência" value={spell.saving_throw} />
      </div>
      <div>
        <Label className="text-xs text-muted-foreground font-pixel">Descrição</Label>
        <p className="font-pixel text-xs text-foreground leading-relaxed mt-1">
          {spell.description}
        </p>
      </div>
    </div>
  );
};