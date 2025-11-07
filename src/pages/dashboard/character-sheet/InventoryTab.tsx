import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Character, Equipment, Armor, Coinage } from "./types";
import { cn } from "@/lib/utils";
import { PixelInput } from "@/components/PixelInput";
import { PixelPanel } from "@/components/PixelPanel";

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

const CoinageSection = ({ coins, isEditing, onChange }: { coins: Coinage, isEditing: boolean, onChange: (coin: keyof Coinage, value: number) => void }) => {
  const coinTypes: { key: keyof Coinage, label: string }[] = [
    { key: 'copper', label: 'P.C (Cobre)' },
    { key: 'silver', label: 'P.P (Prata)' },
    { key: 'electrum', label: 'P.E (Electrum)' },
    { key: 'gold', label: 'P.O (Ouro)' },
    { key: 'platinum', label: 'P.Pl (Platina)' },
  ];

  return (
    <PixelPanel>
      <h3 className="font-pixel text-sm text-accent pixel-text-shadow mb-4">DINHEIRO</h3>
      <div className="grid grid-cols-2 gap-4">
        {coinTypes.map(({ key, label }) => (
          <PixelInput
            key={key}
            label={label}
            type="number"
            value={coins[key] || 0}
            onChange={(e) => onChange(key, parseInt(e.target.value) || 0)}
            disabled={!isEditing}
            min="0"
          />
        ))}
      </div>
    </PixelPanel>
  );
};

const InventoryListSection = ({ inventory, isEditing, onChange }: { inventory: string[], isEditing: boolean, onChange: (newInventory: string[]) => void }) => {
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Simple implementation: treat each line as an item
    const lines = e.target.value.split('\n').filter(line => line.trim() !== '');
    onChange(lines);
  };

  return (
    <PixelPanel>
      <h3 className="font-pixel text-sm text-accent pixel-text-shadow mb-4">EQUIPAMENTO E ITENS</h3>
      <textarea
        className={cn(
          "w-full min-h-[200px] pixel-border bg-input p-2 font-pixel text-xs resize-y",
          !isEditing && "opacity-70 cursor-default"
        )}
        placeholder="Liste seus itens, um por linha..."
        value={inventory.join('\n')}
        onChange={handleTextareaChange}
        disabled={!isEditing}
      />
    </PixelPanel>
  );
};

const ItemNotesSection = ({ title, notes, isEditing, onChange }: { title: string, notes: string[], isEditing: boolean, onChange: (newNotes: string[]) => void }) => {
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const lines = e.target.value.split('\n').filter(line => line.trim() !== '');
    onChange(lines);
  };

  return (
    <PixelPanel>
      <h3 className="font-pixel text-sm text-accent pixel-text-shadow mb-4">{title}</h3>
      <textarea
        className={cn(
          "w-full min-h-[100px] pixel-border bg-input p-2 font-pixel text-xs resize-y",
          !isEditing && "opacity-70 cursor-default"
        )}
        placeholder={`Liste seus ${title.toLowerCase()}...`}
        value={notes.join('\n')}
        onChange={handleTextareaChange}
        disabled={!isEditing}
      />
    </PixelPanel>
  );
};


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

  const handleCoinChange = (coin: keyof Coinage, value: number) => {
    setCharacter(prev => ({
      ...prev,
      coins: {
        ...prev.coins!,
        [coin]: value,
      },
    }));
  };

  const handleInventoryListChange = (newInventory: string[]) => {
    setCharacter(prev => ({ ...prev, inventory: newInventory }));
  };

  const handleScrollsChange = (newScrolls: string[]) => {
    setCharacter(prev => ({ ...prev, scrolls: newScrolls }));
  };

  const handleNotesChange = (key: 'magicItems' | 'potions' | 'jewels', newNotes: string[]) => {
    setCharacter(prev => ({
      ...prev,
      notes: {
        ...prev.notes,
        [key]: newNotes.join('\n'), // Store as a single string for simplicity in the notes object
      }
    }));
  };

  const getNotesArray = (key: 'magicItems' | 'potions' | 'jewels'): string[] => {
    const noteString = character.notes?.[key] || '';
    return noteString.split('\n').filter(line => line.trim() !== '');
  };

  const isOverburdened = totalWeight > allowedWeight;

  return (
    <div className="mt-0 space-y-6">
      <PixelPanel>
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
      </PixelPanel>

      {/* SEÇÃO 13: DINHEIRO */}
      <CoinageSection coins={character.coins!} isEditing={isEditing} onChange={handleCoinChange} />

      {/* SEÇÃO 12: EQUIPAMENTO */}
      <InventoryListSection inventory={character.inventory!} isEditing={isEditing} onChange={handleInventoryListChange} />

      {/* SEÇÃO 14, 15, 16, 17: ITENS ESPECIAIS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ItemNotesSection 
          title="ITENS MÁGICOS" 
          notes={getNotesArray('magicItems')} 
          isEditing={isEditing} 
          onChange={(notes) => handleNotesChange('magicItems', notes)} 
        />
        <ItemNotesSection 
          title="POÇÕES" 
          notes={getNotesArray('potions')} 
          isEditing={isEditing} 
          onChange={(notes) => handleNotesChange('potions', notes)} 
        />
        <ItemNotesSection 
          title="PERGAMINHOS" 
          notes={getNotesArray('scrolls')} 
          isEditing={isEditing} 
          onChange={(notes) => handleNotesChange('scrolls', notes)} 
        />
        <ItemNotesSection 
          title="JOIAS" 
          notes={getNotesArray('jewels')} 
          isEditing={isEditing} 
          onChange={(notes) => handleNotesChange('jewels', notes)} 
        />
      </div>

      {/* CARGA */}
      <PixelPanel>
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
      </PixelPanel>
    </div>
  );
};