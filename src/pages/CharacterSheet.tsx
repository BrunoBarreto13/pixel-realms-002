import { useState, useMemo } from "react";
import { PixelCard } from "@/components/PixelCard";
import { PixelInput } from "@/components/PixelInput";
import { PixelButton } from "@/components/PixelButton";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dices, Save, Plus, Minus, FileDown, User, Sword, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import * as Rules from "@/lib/add-2e-rules";

interface Attributes {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

interface SavingThrows {
  poison: number;
  petrification: number;
  rod: number;
  breath: number;
  spell: number;
}

interface Character {
  name: string;
  playerName: string;
  race: string;
  class: string;
  level: number;
  attributes: Attributes;
  hp: number;
  maxHp: number;
  ac: number; // Base AC from armor
  initiative: number;
  savingThrows: SavingThrows;
}

const RACES = [
  { value: "human", label: "Humano", modifiers: {} },
  { value: "elf", label: "Elfo", modifiers: { dexterity: 1, constitution: -1 } },
  { value: "dwarf", label: "Anão", modifiers: { constitution: 1, charisma: -1 } },
  { value: "halfling", label: "Halfling", modifiers: { dexterity: 1, strength: -1 } },
  { value: "gnome", label: "Gnomo", modifiers: { intelligence: 1, wisdom: -1 } },
  { value: "half-elf", label: "Meio-Elfo", modifiers: {} },
  { value: "half-orc", label: "Meio-Orc", modifiers: { strength: 1, charisma: -2, constitution: 1 } },
];

const CLASSES = [
  { value: "fighter", label: "Guerreiro", hitDie: 10 },
  { value: "wizard", label: "Mago", hitDie: 4 },
  { value: "cleric", label: "Clérigo", hitDie: 8 },
  { value: "thief", label: "Ladrão", hitDie: 6 },
  { value: "ranger", label: "Patrulheiro", hitDie: 10 },
  { value: "paladin", label: "Paladino", hitDie: 10 },
  { value: "druid", label: "Druida", hitDie: 8 },
  { value: "bard", label: "Bardo", hitDie: 6 },
];

const tabTriggerClasses = "font-pixel text-xs uppercase px-4 py-2 pixel-border bg-secondary text-secondary-foreground rounded-none shadow-none data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:border-b-card data-[state=active]:-mb-[2px] z-10";

const CharacterSheet = () => {
  const { toast } = useToast();
  const [character, setCharacter] = useState<Character>({
    name: "",
    playerName: "",
    race: "",
    class: "",
    level: 1,
    attributes: {
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
    },
    hp: 0,
    maxHp: 0,
    ac: 10,
    initiative: 0,
    savingThrows: {
      poison: 13,
      petrification: 12,
      rod: 11,
      breath: 14,
      spell: 14,
    },
  });

  const [isEditing, setIsEditing] = useState(true);
  const [damageInput, setDamageInput] = useState("");

  // --- DERIVED STATS CALCULATIONS ---
  const strengthBonuses = useMemo(() => Rules.getStrengthBonuses(character.attributes.strength), [character.attributes.strength]);
  const dexterityBonuses = useMemo(() => Rules.getDexterityBonuses(character.attributes.dexterity), [character.attributes.dexterity]);
  const constitutionBonuses = useMemo(() => Rules.getConstitutionBonuses(character.attributes.constitution), [character.attributes.constitution]);
  const intelligenceBonuses = useMemo(() => Rules.getIntelligenceBonuses(character.attributes.intelligence), [character.attributes.intelligence]);
  const wisdomBonuses = useMemo(() => Rules.getWisdomBonuses(character.attributes.wisdom), [character.attributes.wisdom]);
  const charismaBonuses = useMemo(() => Rules.getCharismaBonuses(character.attributes.charisma), [character.attributes.charisma]);
  
  const calculatedThac0 = useMemo(() => Rules.getThac0(character.class, character.level), [character.class, character.level]);
  const calculatedAc = useMemo(() => character.ac + dexterityBonuses.defense, [character.ac, dexterityBonuses.defense]);

  const getAttributeWithRaceMod = (attr: keyof Attributes): number => {
    const race = RACES.find(r => r.value === character.race);
    const baseStat = character.attributes[attr];
    const modifier = race?.modifiers[attr] || 0;
    return baseStat + modifier;
  };

  const calculateHP = () => {
    const classData = CLASSES.find(c => c.value === character.class);
    if (!classData || character.level < 1) {
      toast({ title: "Erro", description: "Selecione uma classe para calcular o HP.", variant: "destructive" });
      return;
    }

    const conMod = constitutionBonuses.hp;
    let totalHP = classData.hitDie + conMod; // Nível 1 = máximo

    for (let i = 2; i <= character.level; i++) {
      const roll = Math.floor(Math.random() * classData.hitDie) + 1;
      totalHP += Math.max(1, roll + conMod); // Minimum 1 HP per level
    }

    setCharacter({ ...character, maxHp: totalHP, hp: totalHP });
    toast({ title: "HP calculado!", description: `Pontos de vida: ${totalHP}` });
  };

  const handleSave = () => {
    if (!character.name || !character.race || !character.class) {
      toast({ title: "Campos obrigatórios", description: "Preencha nome, raça e classe", variant: "destructive" });
      return;
    }
    setIsEditing(false);
    toast({ title: "Personagem salvo!", description: `${character.name} foi salvo com sucesso.` });
  };

  const handleApplyDamage = () => {
    const damage = parseInt(damageInput);
    if (!isNaN(damage)) {
      setCharacter(prev => ({ ...prev, hp: prev.hp - damage }));
      setDamageInput("");
    }
  };

  const handleRoll = (sides: number, modifier: number = 0, title: string) => {
    const roll = Math.floor(Math.random() * sides) + 1;
    const total = roll + modifier;
    const modifierString = modifier > 0 ? ` + ${modifier}` : (modifier < 0 ? ` - ${Math.abs(modifier)}` : "");
    toast({
      title: `Rolagem de ${title}`,
      description: `D${sides}${modifierString}: ${roll}${modifierString} = ${total}`,
    });
    return total;
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <PixelCard>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 pixel-border bg-muted/50 flex items-center justify-center">
              <User className="w-12 h-12 text-muted-foreground" />
            </div>
            <div>
              <h2 className="font-pixel text-xl text-primary">{character.name || "Novo Personagem"}</h2>
              <p className="font-pixel text-xs text-secondary">
                Nível {character.level} {RACES.find(r => r.value === character.race)?.label || "---"} {CLASSES.find(c => c.value === character.class)?.label || "---"}
              </p>
              <p className="font-pixel text-xs text-muted-foreground">Jogador: {character.playerName || "---"}</p>
            </div>
          </div>
          <div className="flex gap-2">
            {!isEditing ? (
              <PixelButton onClick={() => setIsEditing(true)} variant="outline">Editar</PixelButton>
            ) : (
              <PixelButton onClick={handleSave} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                <span>Salvar</span>
              </PixelButton>
            )}
          </div>
        </div>
      </PixelCard>

      {/* Tabs */}
      <Tabs defaultValue="stats" className="w-full">
        <TabsList className="flex flex-wrap gap-1 bg-transparent p-0 h-auto">
          <TabsTrigger value="stats" className={tabTriggerClasses}>Informações</TabsTrigger>
          <TabsTrigger value="attributes" className={tabTriggerClasses}>Atributos</TabsTrigger>
          <TabsTrigger value="skills" className={tabTriggerClasses}>Perícias</TabsTrigger>
          <TabsTrigger value="combate" className={tabTriggerClasses}>Combate</TabsTrigger>
          <TabsTrigger value="inventory" className={tabTriggerClasses}>Inventário</TabsTrigger>
          <TabsTrigger value="spells" className={tabTriggerClasses}>Magias</TabsTrigger>
          <TabsTrigger value="notes" className={tabTriggerClasses}>Notas</TabsTrigger>
        </TabsList>

        <div className="rpg-panel relative">
          <TabsContent value="stats" className="mt-0 space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-pixel text-sm text-accent">INFORMAÇÕES BÁSICAS</h3>
              <PixelButton onClick={calculateHP} size="sm" variant="secondary">Calcular HP</PixelButton>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <PixelInput label="Nome do Personagem" value={character.name} onChange={(e) => setCharacter({ ...character, name: e.target.value })} disabled={!isEditing} />
              <PixelInput label="Nome do Jogador" value={character.playerName} onChange={(e) => setCharacter({ ...character, playerName: e.target.value })} disabled={!isEditing} />
              <div className="flex flex-col gap-2">
                <Label className="font-pixel text-xs text-foreground">Raça</Label>
                <Select value={character.race} onValueChange={(value) => setCharacter({ ...character, race: value })} disabled={!isEditing}>
                  <SelectTrigger className="pixel-border bg-input backdrop-blur-sm font-pixel text-xs h-12"><SelectValue placeholder="Selecione..." /></SelectTrigger>
                  <SelectContent className="bg-card border-2 border-border z-50">
                    {RACES.map(race => <SelectItem key={race.value} value={race.value} className="font-pixel text-xs">{race.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label className="font-pixel text-xs text-foreground">Classe</Label>
                <Select value={character.class} onValueChange={(value) => setCharacter({ ...character, class: value })} disabled={!isEditing}>
                  <SelectTrigger className="pixel-border bg-input backdrop-blur-sm font-pixel text-xs h-12"><SelectValue placeholder="Selecione..." /></SelectTrigger>
                  <SelectContent className="bg-card border-2 border-border z-50">
                    {CLASSES.map(cls => <SelectItem key={cls.value} value={cls.value} className="font-pixel text-xs">{cls.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label className="font-pixel text-xs text-foreground">Nível</Label>
                <div className="flex items-center gap-2">
                  <PixelButton size="icon" variant="outline" onClick={() => setCharacter({ ...character, level: Math.max(1, character.level - 1) })} disabled={!isEditing}><Minus className="h-4 w-4" /></PixelButton>
                  <input type="number" value={character.level} onChange={(e) => setCharacter({ ...character, level: parseInt(e.target.value) || 1 })} className="flex h-12 w-full pixel-border bg-input backdrop-blur-sm px-3 py-2 font-pixel text-xs text-center text-foreground" min={1} max={20} disabled={!isEditing} />
                  <PixelButton size="icon" variant="outline" onClick={() => setCharacter({ ...character, level: Math.min(20, character.level + 1) })} disabled={!isEditing}><Plus className="h-4 w-4" /></PixelButton>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="attributes" className="mt-0 space-y-2">
            <div className="bg-muted/30 p-4 pixel-border">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-pixel text-sm text-blue-500">FORÇA</h3>
                <input type="number" value={character.attributes.strength} onChange={(e) => setCharacter({ ...character, attributes: { ...character.attributes, strength: parseInt(e.target.value) || 10 } })} className="w-16 h-8 pixel-border bg-input px-2 font-pixel text-xs text-center" min={3} max={20} disabled={!isEditing} />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-2 font-pixel text-xs text-foreground">
                <div>CHANCE ACERTAR: <span className="text-accent">{strengthBonuses.hit > 0 ? '+' : ''}{strengthBonuses.hit}</span></div>
                <div>AJUSTE DE DANO: <span className="text-accent">{strengthBonuses.dmg > 0 ? '+' : ''}{strengthBonuses.dmg}</span></div>
                <div>CARGA PERMITIDA: <span className="text-accent">{strengthBonuses.weight}</span></div>
                <div>ABRIR PORTAS: <span className="text-accent">{strengthBonuses.openDoors}</span></div>
                <div>BARRAS/PORTAIS: <span className="text-accent">{strengthBonuses.bendBars}%</span></div>
              </div>
            </div>
            <div className="bg-muted/30 p-4 pixel-border">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-pixel text-sm text-blue-500">DESTREZA</h3>
                <input type="number" value={character.attributes.dexterity} onChange={(e) => setCharacter({ ...character, attributes: { ...character.attributes, dexterity: parseInt(e.target.value) || 10 } })} className="w-16 h-8 pixel-border bg-input px-2 font-pixel text-xs text-center" min={3} max={18} disabled={!isEditing} />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 font-pixel text-xs text-foreground">
                <div>AJUSTE DE REAÇÃO: <span className="text-accent">{dexterityBonuses.reaction > 0 ? '+' : ''}{dexterityBonuses.reaction}</span></div>
                <div>ATAQUE À DISTÂNCIA: <span className="text-accent">{dexterityBonuses.missile > 0 ? '+' : ''}{dexterityBonuses.missile}</span></div>
                <div>AJUSTE DE DEFESA: <span className="text-accent">{dexterityBonuses.defense > 0 ? '+' : ''}{dexterityBonuses.defense}</span></div>
              </div>
            </div>
            <div className="bg-muted/30 p-4 pixel-border">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-pixel text-sm text-blue-500">CONSTITUIÇÃO</h3>
                <input type="number" value={character.attributes.constitution} onChange={(e) => setCharacter({ ...character, attributes: { ...character.attributes, constitution: parseInt(e.target.value) || 10 } })} className="w-16 h-8 pixel-border bg-input px-2 font-pixel text-xs text-center" min={3} max={19} disabled={!isEditing} />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 font-pixel text-xs text-foreground">
                <div>AJUSTE PV: <span className="text-accent">{constitutionBonuses.hp > 0 ? '+' : ''}{constitutionBonuses.hp}</span></div>
                <div>COLAPSO: <span className="text-accent">{constitutionBonuses.shock}%</span></div>
                <div>CHANCE DE RESSUREIÇÃO: <span className="text-accent">{constitutionBonuses.resurrect}%</span></div>
              </div>
            </div>
            <div className="bg-muted/30 p-4 pixel-border">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-pixel text-sm text-blue-500">INTELIGÊNCIA</h3>
                <input type="number" value={character.attributes.intelligence} onChange={(e) => setCharacter({ ...character, attributes: { ...character.attributes, intelligence: parseInt(e.target.value) || 10 } })} className="w-16 h-8 pixel-border bg-input px-2 font-pixel text-xs text-center" min={3} max={19} disabled={!isEditing} />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-2 font-pixel text-xs text-foreground">
                <div>Nº DE LÍNGUAS: <span className="text-accent">{intelligenceBonuses.languages}</span></div>
                <div>CÍRCULO MAGIA: <span className="text-accent">{intelligenceBonuses.spellLvl}</span></div>
                <div>% DE APRENDER MAGIA: <span className="text-accent">{intelligenceBonuses.learn}%</span></div>
                <div>Nº MAX. MAGIAS: <span className="text-accent">{intelligenceBonuses.maxSpells}</span></div>
              </div>
            </div>
            <div className="bg-muted/30 p-4 pixel-border">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-pixel text-sm text-blue-500">SABEDORIA</h3>
                <input type="number" value={character.attributes.wisdom} onChange={(e) => setCharacter({ ...character, attributes: { ...character.attributes, wisdom: parseInt(e.target.value) || 10 } })} className="w-16 h-8 pixel-border bg-input px-2 font-pixel text-xs text-center" min={3} max={18} disabled={!isEditing} />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 font-pixel text-xs text-foreground">
                <div>DEFESA CONTRA MAGIA: <span className="text-accent">{wisdomBonuses.magicDef > 0 ? '+' : ''}{wisdomBonuses.magicDef}</span></div>
                <div>MAGIAS EXTRAS: <span className="text-accent">{wisdomBonuses.bonusSpells.join(', ')}</span></div>
                <div>CHANCE DE FALHA: <span className="text-accent">{wisdomBonuses.failure}%</span></div>
              </div>
            </div>
            <div className="bg-muted/30 p-4 pixel-border">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-pixel text-sm text-primary">CARISMA</h3>
                <input type="number" value={character.attributes.charisma} onChange={(e) => setCharacter({ ...character, attributes: { ...character.attributes, charisma: parseInt(e.target.value) || 10 } })} className="w-16 h-8 pixel-border bg-input px-2 font-pixel text-xs text-center" min={3} max={18} disabled={!isEditing} />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 font-pixel text-xs text-foreground">
                <div>Nº MAX. DE ALIADOS: <span className="text-accent">{charismaBonuses.henchmen}</span></div>
                <div>FATOR DE LEALDADE: <span className="text-accent">{charismaBonuses.loyalty > 0 ? '+' : ''}{charismaBonuses.loyalty}</span></div>
                <div>AJUSTE DE REAÇÃO: <span className="text-accent">{charismaBonuses.reaction > 0 ? '+' : ''}{charismaBonuses.reaction}</span></div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="skills" className="mt-0">
            <h3 className="font-pixel text-sm text-accent mb-4">PERÍCIAS</h3>
            <p className="font-pixel text-xs text-muted-foreground text-center py-8">Sistema de perícias em desenvolvimento...</p>
          </TabsContent>

          <TabsContent value="combate" className="mt-0 space-y-6">
            <div className="bg-muted/30 p-4 pixel-border">
              <h3 className="font-pixel text-sm text-accent mb-4">ESTATÍSTICAS DE COMBATE</h3>
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
                <PixelButton onClick={handleApplyDamage}>Aplicar Dano</PixelButton>
              </div>
            </div>

            <div className="bg-muted/30 p-4 pixel-border">
              <h3 className="font-pixel text-sm text-accent mb-4">ROLAGEM DE DADOS</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <PixelButton onClick={() => handleRoll(20, strengthBonuses.hit, "Ataque Corpo-a-Corpo")} className="flex items-center gap-2"><Sword className="h-4 w-4" /> Ataque C-a-C</PixelButton>
                <PixelButton onClick={() => handleRoll(20, dexterityBonuses.missile, "Ataque à Distância")} className="flex items-center gap-2"><Target className="h-4 w-4" /> Ataque Dist.</PixelButton>
                <PixelButton onClick={() => handleRoll(20, 0, "d20")}>d20</PixelButton>
                <PixelButton onClick={() => handleRoll(100, 0, "d100")}>d100</PixelButton>
                <PixelButton onClick={() => handleRoll(12, 0, "d12")}>d12</PixelButton>
                <PixelButton onClick={() => handleRoll(10, 0, "d10")}>d10</PixelButton>
                <PixelButton onClick={() => handleRoll(8, 0, "d8")}>d8</PixelButton>
                <PixelButton onClick={() => handleRoll(6, 0, "d6")}>d6</PixelButton>
                <PixelButton onClick={() => handleRoll(4, 0, "d4")}>d4</PixelButton>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="inventory" className="mt-0">
            <h3 className="font-pixel text-sm text-accent mb-4">INVENTÁRIO</h3>
            <p className="font-pixel text-xs text-muted-foreground text-center py-8">Sistema de inventário em desenvolvimento...</p>
          </TabsContent>
          <TabsContent value="spells" className="mt-0">
            <h3 className="font-pixel text-sm text-accent mb-4">MAGIAS</h3>
            <p className="font-pixel text-xs text-muted-foreground text-center py-8">Sistema de magias em desenvolvimento...</p>
          </TabsContent>
          <TabsContent value="notes" className="mt-0">
            <h3 className="font-pixel text-sm text-accent mb-4">NOTAS</h3>
            <textarea className="w-full min-h-[200px] pixel-border bg-input p-4 font-pixel text-xs resize-none" placeholder="Escreva suas anotações sobre o personagem..." />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default CharacterSheet;