import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Character, Equipment } from "./types";
import { cn } from "@/lib/utils";
import { Armor } from "@/lib/players-handbook";

interface InventoryTabProps {
  character: Character;
  setCharacter: React.Dispatch<React.SetStateAction<Character>>;
  isEditing: boolean;
  totalWeight: number;
  allowedWeight: number;
  armorList: Armor[];
  shieldList: Armor[];
  helmList: Armor[];
}

export const InventoryTab = ({
  character,
  setCharacter,
  isEditing,
  totalWeight,
  allowedWeight,
  armorList,
  shieldList,
  helmList,
}: InventoryTabProps) => {
  const handleEquipmentChange = (slot: keyof Equipment, itemId: string) => {
    setCharacter(prev => ({
      ...prev,
      equipment: {
        ...prev.equipment,
        [slot]: itemId === 'nenhum' || itemId === 'nenhuma' ? null : itemId,
      },
    }));
  };

  const isOverburdened = totalWeight > allowedWeight;

  return (
    <div className="mt-0 space-y-6">
      <div>
        <h3 className="font-pixel text-sm text-accent pixel-text-shadow mb-4">EQUIPAMENTO DE PROTEÇÃO</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col gap-2">
            <Label className="font-pixel text-xs text-foreground">Armadura</Label>
            <Select
              value={character.equipment.armor || 'nenhuma'}
              onValueChange={(value) => handleEquipmentChange('armor', value)}
              disabled={!isEditing}
            >
              <SelectTrigger className="pixel-border bg-input backdrop-blur-sm font-pixel text-xs h-12">
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent className="bg-card border-2 border-border z-50">
                {armorList.map(item => <SelectItem key={item.id} value={item.id} className="font-pixel text-xs">{item.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="font-pixel text-xs text-foreground">Escudo</Label>
            <Select
              value={character.equipment.shield || 'nenhum'}
              onValueChange={(value) => handleEquipmentChange('shield', value)}
              disabled={!isEditing}
            >
              <SelectTrigger className="pixel-border bg-input backdrop-blur-sm font-pixel text-xs h-12">
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent className="bg-card border-2 border-border z-50">
                {shieldList.map(item => <SelectItem key={item.id} value={item.id} className="font-pixel text-xs">{item.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="font-pixel text-xs text-foreground">Elmo</Label>
            <Select
              value={character.equipment.helm || 'nenhum'}
              onValueChange={(value) => handleEquipmentChange('helm', value)}
              disabled={!isEditing}
            >
              <SelectTrigger className="pixel-border bg-input backdrop-blur-sm font-pixel text-xs h-12">
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent className="bg-card border-2 border-border z-50">
                {helmList.map(item => <SelectItem key={item.id} value={item.id} className="font-pixel text-xs">{item.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div>
        <h3 className="font-pixel text-sm text-accent pixel-text-shadow mb-4">CARGA</h3>
        <div className="bg-muted/30 p-4 pixel-border text-center">
          <Label className="font-pixel text-xs text-muted-foreground">Peso Carregado / Permitido</Label>
          <p className={cn("font-pixel text-lg mt-2", isOverburdened ? "text-destructive" : "text-primary")}>
            {totalWeight.toFixed(1)} / {allowedWeight} kg
          </p>
          {isOverburdened && (
            <p className="font-pixel text-xs text-destructive mt-2">
              SOBRECARREGADO! (Penalidades de movimento podem ser aplicadas)
            </p>
          )}
        </div>
      </div>
      <div>
        <h3 className="font-pixel text-sm text-accent pixel-text-shadow mb-4">ITENS MÁGICOS E OUTROS</h3>
        <p className="font-pixel text-xs text-muted-foreground text-center py-8">Em desenvolvimento...</p>
      </div>
    </div>
  );
};