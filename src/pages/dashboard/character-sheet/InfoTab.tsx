import { PixelInput } from "@/components/PixelInput";
import { PixelButton } from "@/components/PixelButton";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Minus, Plus } from "lucide-react";
import { Character, Race, CharacterClass } from "./types";

interface InfoTabProps {
  character: Character;
  setCharacter: React.Dispatch<React.SetStateAction<Character>>;
  isEditing: boolean;
  onCalculateHP: () => void;
  onLevelChange: (newLevel: number) => void;
  races: Race[];
  classes: CharacterClass[];
}

export const InfoTab = ({ character, setCharacter, isEditing, onCalculateHP, onLevelChange, races, classes }: InfoTabProps) => {
  return (
    <div className="mt-0 space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-pixel text-sm text-accent pixel-text-shadow">INFORMAÇÕES BÁSICAS</h3>
        <PixelButton onClick={onCalculateHP} size="sm" variant="secondary">Calcular HP</PixelButton>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <PixelInput label="Nome do Personagem" value={character.name} onChange={(e) => setCharacter({ ...character, name: e.target.value })} disabled={!isEditing} />
        <PixelInput label="Nome do Jogador" value={character.playerName} onChange={(e) => setCharacter({ ...character, playerName: e.target.value })} disabled={!isEditing} />
        <div className="flex flex-col gap-2">
          <Label className="font-pixel text-xs text-foreground">Nível</Label>
          <div className="flex items-center gap-2">
            <PixelButton size="icon" variant="outline" onClick={() => onLevelChange(Math.max(1, character.level - 1))} disabled={!isEditing}><Minus className="h-4 w-4" /></PixelButton>
            <input type="number" value={character.level} onChange={(e) => onLevelChange(parseInt(e.target.value) || 1)} className="flex h-12 w-full pixel-border bg-input backdrop-blur-sm px-3 py-2 font-pixel text-xs text-center text-foreground" min={1} max={20} disabled={!isEditing} />
            <PixelButton size="icon" variant="outline" onClick={() => onLevelChange(Math.min(20, character.level + 1))} disabled={!isEditing}><Plus className="h-4 w-4" /></PixelButton>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label className="font-pixel text-xs text-foreground">Raça</Label>
          <Select value={character.race} onValueChange={(value) => setCharacter({ ...character, race: value })} disabled={!isEditing}>
            <SelectTrigger className="pixel-border bg-input backdrop-blur-sm font-pixel text-xs h-12"><SelectValue placeholder="Selecione..." /></SelectTrigger>
            <SelectContent className="bg-card border-2 border-border z-50">
              {races.map(race => <SelectItem key={race.value} value={race.value} className="font-pixel text-xs">{race.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <Label className="font-pixel text-xs text-foreground">Classe</Label>
          <Select value={character.class} onValueChange={(value) => setCharacter({ ...character, class: value })} disabled={!isEditing}>
            <SelectTrigger className="pixel-border bg-input backdrop-blur-sm font-pixel text-xs h-12"><SelectValue placeholder="Selecione..." /></SelectTrigger>
            <SelectContent className="bg-card border-2 border-border z-50">
              {classes.map(cls => <SelectItem key={cls.value} value={cls.value} className="font-pixel text-xs">{cls.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <PixelInput label="Tendência" value={character.alignment} onChange={(e) => setCharacter({ ...character, alignment: e.target.value })} disabled={!isEditing} />
        <PixelInput label="Idade" type="number" value={character.age} onChange={(e) => setCharacter({ ...character, age: parseInt(e.target.value) || 0 })} disabled={!isEditing} />
        <PixelInput label="Altura" value={character.height} onChange={(e) => setCharacter({ ...character, height: e.target.value })} disabled={!isEditing} />
        <PixelInput label="Peso" value={character.weight} onChange={(e) => setCharacter({ ...character, weight: e.target.value })} disabled={!isEditing} />
        <PixelInput label="Cabelos" value={character.hair} onChange={(e) => setCharacter({ ...character, hair: e.target.value })} disabled={!isEditing} />
        <PixelInput label="Olhos" value={character.eyes} onChange={(e) => setCharacter({ ...character, eyes: e.target.value })} disabled={!isEditing} />
        <div className="flex flex-col gap-2">
          <Label className="font-pixel text-xs text-foreground">Cor do Jogador</Label>
          <div className="flex items-center gap-2">
            <input type="color" value={character.color} onChange={(e) => setCharacter({ ...character, color: e.target.value })} disabled={!isEditing} className="w-12 h-12 p-1 bg-input pixel-border cursor-pointer disabled:cursor-not-allowed" />
            <span className="font-pixel text-xs text-muted-foreground">Cor para o chat</span>
          </div>
        </div>
      </div>
    </div>
  );
};