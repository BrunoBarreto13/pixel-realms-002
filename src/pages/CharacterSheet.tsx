import { useState } from "react";
import { PixelCard } from "@/components/PixelCard";
import { PixelInput } from "@/components/PixelInput";
import { PixelButton } from "@/components/PixelButton";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dices, Save, Plus, Minus, FileDown, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

interface WeaponSkill {
  weapon: string;
  points: number;
  ability: number;
  modifier: number;
  d20: number;
}

interface GeneralSkill {
  skill: string;
  points: number;
  ability: number;
  modifier: number;
  d20: number;
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
  ac: number;
  thac0: number;
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

const CharacterSheet = () => {
  const { toast } = useToast();
  const [character, setCharacter] = useState<Character>({
    name: "",
    playerName: "",
    race: "",
    class: "",
    level: 10,
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
    thac0: 20,
    initiative: 0,
    savingThrows: {
      poison: 13,
      petrification: 12,
      rod: 11,
      breath: 14,
      spell: 14,
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [weaponSkills, setWeaponSkills] = useState<WeaponSkill[]>([]);
  const [generalSkills, setGeneralSkills] = useState<GeneralSkill[]>([]);

  const rollAttribute = () => {
    const rolls = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1);
    rolls.sort((a, b) => b - a);
    return rolls[0] + rolls[1] + rolls[2];
  };

  const rollAllAttributes = () => {
    const newAttributes = {
      strength: rollAttribute(),
      dexterity: rollAttribute(),
      constitution: rollAttribute(),
      intelligence: rollAttribute(),
      wisdom: rollAttribute(),
      charisma: rollAttribute(),
    };
    setCharacter({ ...character, attributes: newAttributes });
    toast({
      title: "Atributos rolados!",
      description: "Novos valores gerados (4d6, descartar menor)",
    });
  };

  const getModifier = (value: number): number => {
    return Math.floor((value - 10) / 2);
  };

  const getAttributeWithRaceMod = (attr: keyof Attributes): number => {
    const race = RACES.find(r => r.value === character.race);
    const baseStat = character.attributes[attr];
    const modifier = race?.modifiers[attr] || 0;
    return baseStat + modifier;
  };

  const calculateHP = () => {
    const classData = CLASSES.find(c => c.value === character.class);
    if (!classData || character.level < 1) return;

    const conMod = getModifier(getAttributeWithRaceMod("constitution"));
    let totalHP = classData.hitDie; // Nível 1 = máximo

    for (let i = 2; i <= character.level; i++) {
      const roll = Math.floor(Math.random() * classData.hitDie) + 1;
      totalHP += roll + conMod;
    }

    setCharacter({ ...character, maxHp: totalHP, hp: totalHP });
    toast({
      title: "HP calculado!",
      description: `Pontos de vida: ${totalHP}`,
    });
  };

  const handleSave = () => {
    if (!character.name || !character.race || !character.class) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha nome, raça e classe",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Personagem salvo!",
      description: `${character.name} foi salvo com sucesso.`,
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(character, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${character.name || "personagem"}.json`;
    link.click();
    toast({
      title: "Ficha exportada!",
      description: "Arquivo JSON baixado com sucesso.",
    });
  };

  const addWeaponSkill = () => {
    setWeaponSkills([
      ...weaponSkills,
      { weapon: "", points: 0, ability: 0, modifier: 0, d20: 0 }
    ]);
  };

  const removeWeaponSkill = (index: number) => {
    setWeaponSkills(weaponSkills.filter((_, i) => i !== index));
  };

  const updateWeaponSkill = (index: number, field: keyof WeaponSkill, value: string | number) => {
    const updated = [...weaponSkills];
    updated[index] = { ...updated[index], [field]: value };
    setWeaponSkills(updated);
  };

  const addGeneralSkill = () => {
    setGeneralSkills([
      ...generalSkills,
      { skill: "", points: 0, ability: 0, modifier: 0, d20: 0 }
    ]);
  };

  const removeGeneralSkill = (index: number) => {
    setGeneralSkills(generalSkills.filter((_, i) => i !== index));
  };

  const updateGeneralSkill = (index: number, field: keyof GeneralSkill, value: string | number) => {
    const updated = [...generalSkills];
    updated[index] = { ...updated[index], [field]: value };
    setGeneralSkills(updated);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header com Avatar e Ações */}
      <PixelCard>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 pixel-border bg-muted/50 flex items-center justify-center">
              <User className="w-12 h-12 text-muted-foreground" />
            </div>
            <div>
              <h2 className="font-pixel text-xl text-primary pixel-glow">
                {character.name || "Novo Personagem"}
              </h2>
              <p className="font-pixel text-xs text-secondary">
                Nível {character.level} {RACES.find(r => r.value === character.race)?.label || "---"}{" "}
                {CLASSES.find(c => c.value === character.class)?.label || "---"}
              </p>
              <p className="font-pixel text-xs text-muted-foreground">
                Jogador: {character.playerName || "---"}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            {!isEditing ? (
              <PixelButton onClick={handleEdit} variant="outline" className="flex items-center gap-2">
                <FileDown className="h-4 w-4" />
                <span>Editar</span>
              </PixelButton>
            ) : (
              <>
                <PixelButton onClick={handleCancel} variant="outline" className="flex items-center gap-2">
                  <span>Cancelar</span>
                </PixelButton>
                <PixelButton onClick={() => { handleSave(); setIsEditing(false); }} className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  <span>Salvar</span>
                </PixelButton>
              </>
            )}
          </div>
        </div>
      </PixelCard>

      {/* Tabs */}
      <Tabs defaultValue="stats" className="w-full">
        <TabsList className="grid w-full grid-cols-7 pixel-border bg-card/50">
          <TabsTrigger value="stats" className="font-pixel text-xs">Info</TabsTrigger>
          <TabsTrigger value="attributes" className="font-pixel text-xs">Atributos</TabsTrigger>
          <TabsTrigger value="combate" className="font-pixel text-xs">Combate</TabsTrigger>
          <TabsTrigger value="pericias" className="font-pixel text-xs">Perícias</TabsTrigger>
          <TabsTrigger value="inventory" className="font-pixel text-xs">Inventário</TabsTrigger>
          <TabsTrigger value="spells" className="font-pixel text-xs">Magias</TabsTrigger>
          <TabsTrigger value="notes" className="font-pixel text-xs">Notas</TabsTrigger>
        </TabsList>

        <TabsContent value="stats" className="space-y-6 mt-6">

          {/* Informações Básicas */}
          <PixelCard>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-pixel text-sm text-accent">INFORMAÇÕES BÁSICAS</h3>
              <PixelButton onClick={calculateHP} size="sm" variant="secondary">
                Calcular HP
              </PixelButton>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <PixelInput
                label="Nome do Personagem"
                value={character.name}
                onChange={(e) => setCharacter({ ...character, name: e.target.value })}
                placeholder="Digite o nome..."
                disabled={!isEditing}
              />

              <PixelInput
                label="Nome do Jogador"
                value={character.playerName}
                onChange={(e) => setCharacter({ ...character, playerName: e.target.value })}
                placeholder="Digite o nome do jogador..."
                disabled={!isEditing}
              />
          
              <div className="flex flex-col gap-2">
                <Label className="font-pixel text-xs text-foreground">Raça</Label>
                <Select value={character.race} onValueChange={(value) => setCharacter({ ...character, race: value })} disabled={!isEditing}>
                  <SelectTrigger className="pixel-border bg-card/50 backdrop-blur-sm font-pixel text-xs h-12">
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-2 border-border z-50">
                    {RACES.map(race => (
                      <SelectItem key={race.value} value={race.value} className="font-pixel text-xs">
                        {race.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <Label className="font-pixel text-xs text-foreground">Classe</Label>
                <Select value={character.class} onValueChange={(value) => setCharacter({ ...character, class: value })} disabled={!isEditing}>
                  <SelectTrigger className="pixel-border bg-card/50 backdrop-blur-sm font-pixel text-xs h-12">
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-2 border-border z-50">
                    {CLASSES.map(cls => (
                      <SelectItem key={cls.value} value={cls.value} className="font-pixel text-xs">
                        {cls.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <Label className="font-pixel text-xs text-foreground">Nível</Label>
                <div className="flex items-center gap-2">
                  <PixelButton
                    size="icon"
                    variant="outline"
                    onClick={() => setCharacter({ ...character, level: Math.max(1, character.level - 1) })}
                    disabled={!isEditing}
                  >
                    <Minus className="h-4 w-4" />
                  </PixelButton>
                  <input
                    type="number"
                    value={character.level}
                    onChange={(e) => setCharacter({ ...character, level: parseInt(e.target.value) || 1 })}
                    className="flex h-12 w-full pixel-border bg-card/50 backdrop-blur-sm px-3 py-2 font-pixel text-xs text-center text-foreground"
                    min={1}
                    max={20}
                    disabled={!isEditing}
                  />
                  <PixelButton
                    size="icon"
                    variant="outline"
                    onClick={() => setCharacter({ ...character, level: Math.min(20, character.level + 1) })}
                    disabled={!isEditing}
                  >
                    <Plus className="h-4 w-4" />
                  </PixelButton>
                </div>
              </div>
            </div>
          </PixelCard>

          {/* Modificadores de Raça */}
          {character.race && (
            <PixelCard>
              <h3 className="font-pixel text-sm text-accent mb-4">MODIFICADORES DE RAÇA</h3>
              <div className="font-pixel text-xs text-foreground">
                {Object.entries(RACES.find(r => r.value === character.race)?.modifiers || {}).map(([attr, mod]) => (
                  <div key={attr} className="flex justify-between py-1">
                    <span className="text-secondary">{attr.toUpperCase()}:</span>
                    <span className={mod > 0 ? "text-accent" : "text-destructive"}>
                      {mod > 0 ? '+' : ''}{mod}
                    </span>
                  </div>
                ))}
                {Object.keys(RACES.find(r => r.value === character.race)?.modifiers || {}).length === 0 && (
                  <p className="text-muted-foreground">Nenhum modificador</p>
                )}
              </div>
            </PixelCard>
          )}
        </TabsContent>

        <TabsContent value="attributes" className="space-y-2 mt-6">
          {/* FORÇA */}
          <div className="bg-card/80 backdrop-blur-sm p-4 pixel-border">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary"></div>
                <h3 className="font-pixel text-sm text-blue-500 pixel-glow">FORÇA</h3>
              </div>
              <input
                type="number"
                value={character.attributes.strength}
                onChange={(e) => setCharacter({
                  ...character,
                  attributes: { ...character.attributes, strength: parseInt(e.target.value) || 10 }
                })}
                className="w-16 h-8 pixel-border bg-muted/50 px-2 font-pixel text-xs text-center"
                min={3}
                max={18}
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-2 font-pixel text-xs text-foreground">
              <div>CHANCE ACERTAR: <span className="text-accent">0</span></div>
              <div>AJUSTE DE DANO: <span className="text-accent">0</span></div>
              <div>CARGA PERMITIDA: <span className="text-accent">40</span></div>
              <div>SUSTENTAÇÃO MAX.: <span className="text-accent">115</span></div>
              <div>ABRIR PORTAS: <span className="text-accent">5</span></div>
              <div>BARRAS/PORTAIS: <span className="text-accent">2%</span></div>
            </div>
          </div>

          {/* DESTREZA */}
          <div className="bg-card/80 backdrop-blur-sm p-4 pixel-border">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary"></div>
                <h3 className="font-pixel text-sm text-blue-500 pixel-glow">DESTREZA</h3>
              </div>
              <input
                type="number"
                value={character.attributes.dexterity}
                onChange={(e) => setCharacter({
                  ...character,
                  attributes: { ...character.attributes, dexterity: parseInt(e.target.value) || 10 }
                })}
                className="w-16 h-8 pixel-border bg-muted/50 px-2 font-pixel text-xs text-center"
                min={3}
                max={18}
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 font-pixel text-xs text-foreground">
              <div>AJUSTE DE REAÇÃO: <span className="text-accent">0</span></div>
              <div>ATAQUE À DISTÂNCIA: <span className="text-accent">0</span></div>
              <div>AJUSTE DE DEFESA: <span className="text-accent">0</span></div>
            </div>
          </div>

          {/* CONSTITUIÇÃO */}
          <div className="bg-card/80 backdrop-blur-sm p-4 pixel-border">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary"></div>
                <h3 className="font-pixel text-sm text-blue-500 pixel-glow">CONSTITUIÇÃO</h3>
              </div>
              <input
                type="number"
                value={character.attributes.constitution}
                onChange={(e) => setCharacter({
                  ...character,
                  attributes: { ...character.attributes, constitution: parseInt(e.target.value) || 10 }
                })}
                className="w-16 h-8 pixel-border bg-muted/50 px-2 font-pixel text-xs text-center"
                min={3}
                max={18}
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-2 font-pixel text-xs text-foreground">
              <div>AJUSTE PV: <span className="text-accent">0</span></div>
              <div>COLAPSO: <span className="text-accent">70%</span></div>
              <div>CHANCE DE RESSUREIÇÃO: <span className="text-accent">75%</span></div>
              <div>RESISTÊNCIA A VENENO: <span className="text-accent">0</span></div>
              <div>REGENERAÇÃO: <span className="text-accent">--</span></div>
            </div>
          </div>

          {/* INTELIGÊNCIA */}
          <div className="bg-card/80 backdrop-blur-sm p-4 pixel-border">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary"></div>
                <h3 className="font-pixel text-sm text-blue-500 pixel-glow">INTELIGÊNCIA</h3>
              </div>
              <input
                type="number"
                value={character.attributes.intelligence}
                onChange={(e) => setCharacter({
                  ...character,
                  attributes: { ...character.attributes, intelligence: parseInt(e.target.value) || 10 }
                })}
                className="w-16 h-8 pixel-border bg-muted/50 px-2 font-pixel text-xs text-center"
                min={3}
                max={18}
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-2 font-pixel text-xs text-foreground">
              <div>Nº DE LÍNGUAS: <span className="text-accent">2</span></div>
              <div>CÍRCULO MAGIA: <span className="text-accent">5TH</span></div>
              <div>% DE APRENDER MAGIA: <span className="text-accent">45%</span></div>
              <div>Nº MAX. MAGIAS: <span className="text-accent">7</span></div>
              <div>IMUNIDADE A MAGIAS: <span className="text-accent">--</span></div>
            </div>
          </div>

          {/* SABEDORIA */}
          <div className="bg-card/80 backdrop-blur-sm p-4 pixel-border">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary"></div>
                <h3 className="font-pixel text-sm text-blue-500 pixel-glow">SABEDORIA</h3>
              </div>
              <input
                type="number"
                value={character.attributes.wisdom}
                onChange={(e) => setCharacter({
                  ...character,
                  attributes: { ...character.attributes, wisdom: parseInt(e.target.value) || 10 }
                })}
                className="w-16 h-8 pixel-border bg-muted/50 px-2 font-pixel text-xs text-center"
                min={3}
                max={18}
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 font-pixel text-xs text-foreground">
              <div>DEFESA CONTRA MAGIA: <span className="text-accent">0</span></div>
              <div>MAGIAS EXTRAS: <span className="text-accent">-</span></div>
              <div>CHANCE DE FALHA: <span className="text-accent">15%</span></div>
              <div>IMUNIDADE A MAGIAS: <span className="text-accent">--</span></div>
            </div>
          </div>

          {/* CARISMA */}
          <div className="bg-card/80 backdrop-blur-sm p-4 pixel-border">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary"></div>
                <h3 className="font-pixel text-sm text-primary pixel-glow">CARISMA</h3>
              </div>
              <input
                type="number"
                value={character.attributes.charisma}
                onChange={(e) => setCharacter({
                  ...character,
                  attributes: { ...character.attributes, charisma: parseInt(e.target.value) || 10 }
                })}
                className="w-16 h-8 pixel-border bg-muted/50 px-2 font-pixel text-xs text-center"
                min={3}
                max={18}
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 font-pixel text-xs text-foreground">
              <div>Nº MAX. DE ALIADOS: <span className="text-accent">4</span></div>
              <div>FATOR DE LEALDADE: <span className="text-accent">0</span></div>
              <div>AJUSTE DE REAÇÃO: <span className="text-accent">0</span></div>
            </div>
          </div>
        </TabsContent>

        {/* Aba Combate */}
        <TabsContent value="combate" className="space-y-6 mt-6">
          {/* Combat Stats */}
          <PixelCard>
            <h3 className="font-pixel text-sm text-accent mb-4">COMBATE</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-muted/30 p-4 pixel-border text-center">
                <Label className="font-pixel text-xs text-secondary mb-2 block">CA</Label>
                <input
                  type="number"
                  value={character.ac}
                  onChange={(e) => setCharacter({ ...character, ac: parseInt(e.target.value) || 10 })}
                  className="w-full h-12 pixel-border bg-card/50 px-2 font-pixel text-lg text-center text-accent"
                />
              </div>
              <div className="bg-muted/30 p-4 pixel-border text-center">
                <Label className="font-pixel text-xs text-secondary mb-2 block">THAC0</Label>
                <input
                  type="number"
                  value={character.thac0}
                  onChange={(e) => setCharacter({ ...character, thac0: parseInt(e.target.value) || 20 })}
                  className="w-full h-12 pixel-border bg-card/50 px-2 font-pixel text-lg text-center text-primary"
                />
              </div>
              <div className="bg-muted/30 p-4 pixel-border text-center">
                <Label className="font-pixel text-xs text-secondary mb-2 block">Iniciativa</Label>
                <input
                  type="number"
                  value={character.initiative}
                  onChange={(e) => setCharacter({ ...character, initiative: parseInt(e.target.value) || 0 })}
                  className="w-full h-12 pixel-border bg-card/50 px-2 font-pixel text-lg text-center text-foreground"
                />
              </div>
              <div className="bg-muted/30 p-4 pixel-border text-center">
                <Label className="font-pixel text-xs text-secondary mb-2 block">HP</Label>
                <div className="flex items-center justify-center gap-1">
                  <input
                    type="number"
                    value={character.hp}
                    onChange={(e) => setCharacter({ ...character, hp: parseInt(e.target.value) || 0 })}
                    className="w-16 h-12 pixel-border bg-card/50 px-1 font-pixel text-sm text-center text-destructive"
                  />
                  <span className="font-pixel text-foreground">/</span>
                  <span className="font-pixel text-lg text-primary">{character.maxHp || 0}</span>
                </div>
              </div>
            </div>
          </PixelCard>

          {/* Saving Throws */}
          <PixelCard>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-pixel text-sm text-accent">TESTES DE RESISTÊNCIA</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-muted/30 p-3 pixel-border text-center">
                <Label className="font-pixel text-xs text-secondary mb-2 block">Veneno</Label>
                <input
                  type="number"
                  value={character.savingThrows.poison}
                  onChange={(e) => setCharacter({
                    ...character,
                    savingThrows: { ...character.savingThrows, poison: parseInt(e.target.value) || 13 }
                  })}
                  className="w-full h-10 pixel-border bg-card/50 px-2 font-pixel text-sm text-center"
                />
              </div>
              <div className="bg-muted/30 p-3 pixel-border text-center">
                <Label className="font-pixel text-xs text-secondary mb-2 block">Petrificação</Label>
                <input
                  type="number"
                  value={character.savingThrows.petrification}
                  onChange={(e) => setCharacter({
                    ...character,
                    savingThrows: { ...character.savingThrows, petrification: parseInt(e.target.value) || 12 }
                  })}
                  className="w-full h-10 pixel-border bg-card/50 px-2 font-pixel text-sm text-center"
                />
              </div>
              <div className="bg-muted/30 p-3 pixel-border text-center">
                <Label className="font-pixel text-xs text-secondary mb-2 block">Bastão</Label>
                <input
                  type="number"
                  value={character.savingThrows.rod}
                  onChange={(e) => setCharacter({
                    ...character,
                    savingThrows: { ...character.savingThrows, rod: parseInt(e.target.value) || 11 }
                  })}
                  className="w-full h-10 pixel-border bg-card/50 px-2 font-pixel text-sm text-center"
                />
              </div>
              <div className="bg-muted/30 p-3 pixel-border text-center">
                <Label className="font-pixel text-xs text-secondary mb-2 block">Sopro</Label>
                <input
                  type="number"
                  value={character.savingThrows.breath}
                  onChange={(e) => setCharacter({
                    ...character,
                    savingThrows: { ...character.savingThrows, breath: parseInt(e.target.value) || 14 }
                  })}
                  className="w-full h-10 pixel-border bg-card/50 px-2 font-pixel text-sm text-center"
                />
              </div>
              <div className="bg-muted/30 p-3 pixel-border text-center">
                <Label className="font-pixel text-xs text-secondary mb-2 block">Magia</Label>
                <input
                  type="number"
                  value={character.savingThrows.spell}
                  onChange={(e) => setCharacter({
                    ...character,
                    savingThrows: { ...character.savingThrows, spell: parseInt(e.target.value) || 14 }
                  })}
                  className="w-full h-10 pixel-border bg-card/50 px-2 font-pixel text-sm text-center"
                />
              </div>
            </div>
          </PixelCard>
        </TabsContent>

        {/* Aba Perícias */}
        <TabsContent value="pericias" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Perícias com Armas */}
            <PixelCard>
              <div className="bg-accent/20 pixel-border p-3 mb-4">
                <h3 className="font-pixel text-sm text-accent text-center">PERÍCIAS COM ARMAS</h3>
              </div>
              
              <div className="space-y-4 mb-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <Label className="font-pixel text-xs text-accent">PONTOS INICIAIS</Label>
                    <input
                      type="number"
                      defaultValue={0}
                      className="h-8 pixel-border bg-card/50 px-2 font-pixel text-xs text-center"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label className="font-pixel text-xs text-accent">ADICIONAR / NÍVEL</Label>
                    <input
                      type="text"
                      className="h-8 pixel-border bg-card/50 px-2 font-pixel text-xs text-center"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1">
                    <Label className="font-pixel text-xs text-accent">PENALIDADE</Label>
                    <input
                      type="number"
                      defaultValue={0}
                      className="h-8 pixel-border bg-card/50 px-2 font-pixel text-xs text-center"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label className="font-pixel text-xs text-accent">BÔNUS INTELIGÊNCIA</Label>
                    <input
                      type="number"
                      defaultValue={0}
                      className="h-8 pixel-border bg-card/50 px-2 font-pixel text-xs text-center"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label className="font-pixel text-xs text-accent">ADD / NÍVEL</Label>
                    <input
                      type="text"
                      className="h-8 pixel-border bg-card/50 px-2 font-pixel text-xs text-center"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="grid grid-cols-12 gap-2 font-pixel text-xs text-accent mb-2">
                  <div className="col-span-4">ARMA</div>
                  <div className="col-span-2 text-center">PONT</div>
                  <div className="col-span-2 text-center">HAB</div>
                  <div className="col-span-2 text-center">MOD</div>
                  <div className="col-span-2 text-center">D20</div>
                </div>
                
                <div className="min-h-[100px] space-y-2">
                  {weaponSkills.map((skill, index) => (
                    <div key={index} className="grid grid-cols-12 gap-2 items-center">
                      <input
                        type="text"
                        value={skill.weapon}
                        onChange={(e) => updateWeaponSkill(index, 'weapon', e.target.value)}
                        placeholder="Nome da arma"
                        className="col-span-4 h-8 pixel-border bg-card/50 px-2 font-pixel text-xs"
                      />
                      <input
                        type="number"
                        value={skill.points}
                        onChange={(e) => updateWeaponSkill(index, 'points', parseInt(e.target.value) || 0)}
                        className="col-span-2 h-8 pixel-border bg-card/50 px-1 font-pixel text-xs text-center"
                      />
                      <input
                        type="number"
                        value={skill.ability}
                        onChange={(e) => updateWeaponSkill(index, 'ability', parseInt(e.target.value) || 0)}
                        className="col-span-2 h-8 pixel-border bg-card/50 px-1 font-pixel text-xs text-center"
                      />
                      <input
                        type="number"
                        value={skill.modifier}
                        onChange={(e) => updateWeaponSkill(index, 'modifier', parseInt(e.target.value) || 0)}
                        className="col-span-2 h-8 pixel-border bg-card/50 px-1 font-pixel text-xs text-center"
                      />
                      <div className="col-span-1 h-8 pixel-border bg-muted/30 flex items-center justify-center font-pixel text-xs">
                        {skill.d20}
                      </div>
                      <button
                        onClick={() => removeWeaponSkill(index)}
                        className="col-span-1 h-8 pixel-border bg-destructive/20 hover:bg-destructive/40 flex items-center justify-center transition-colors"
                      >
                        <Minus className="h-3 w-3 text-destructive" />
                      </button>
                    </div>
                  ))}
                </div>

                <PixelButton size="sm" variant="outline" className="w-full" onClick={addWeaponSkill}>
                  <Plus className="h-3 w-3 mr-1" />
                  Adicionar Linha
                </PixelButton>
              </div>
            </PixelCard>

            {/* Perícias Gerais */}
            <PixelCard>
              <div className="bg-accent/20 pixel-border p-3 mb-4">
                <h3 className="font-pixel text-sm text-accent text-center">PERÍCIAS GERAIS</h3>
              </div>
              
              <div className="space-y-4 mb-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <Label className="font-pixel text-xs text-accent">PONTOS INICIAIS</Label>
                    <input
                      type="number"
                      defaultValue={0}
                      className="h-8 pixel-border bg-card/50 px-2 font-pixel text-xs text-center"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label className="font-pixel text-xs text-accent">ADICIONAR / NÍVEL</Label>
                    <input
                      type="text"
                      className="h-8 pixel-border bg-card/50 px-2 font-pixel text-xs text-center"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1">
                    <Label className="font-pixel text-xs text-accent">PENALIDADE</Label>
                    <input
                      type="number"
                      defaultValue={0}
                      className="h-8 pixel-border bg-card/50 px-2 font-pixel text-xs text-center"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label className="font-pixel text-xs text-accent">BÔNUS INTELIGÊNCIA</Label>
                    <input
                      type="number"
                      defaultValue={0}
                      className="h-8 pixel-border bg-card/50 px-2 font-pixel text-xs text-center"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label className="font-pixel text-xs text-accent">ADD / NÍVEL</Label>
                    <input
                      type="text"
                      className="h-8 pixel-border bg-card/50 px-2 font-pixel text-xs text-center"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="grid grid-cols-12 gap-2 font-pixel text-xs text-accent mb-2">
                  <div className="col-span-4">PERÍCIA</div>
                  <div className="col-span-2 text-center">PONT</div>
                  <div className="col-span-2 text-center">HAB</div>
                  <div className="col-span-2 text-center">MOD</div>
                  <div className="col-span-2 text-center">D20</div>
                </div>
                
                <div className="min-h-[100px] space-y-2">
                  {generalSkills.map((skill, index) => (
                    <div key={index} className="grid grid-cols-12 gap-2 items-center">
                      <input
                        type="text"
                        value={skill.skill}
                        onChange={(e) => updateGeneralSkill(index, 'skill', e.target.value)}
                        placeholder="Nome da perícia"
                        className="col-span-4 h-8 pixel-border bg-card/50 px-2 font-pixel text-xs"
                      />
                      <input
                        type="number"
                        value={skill.points}
                        onChange={(e) => updateGeneralSkill(index, 'points', parseInt(e.target.value) || 0)}
                        className="col-span-2 h-8 pixel-border bg-card/50 px-1 font-pixel text-xs text-center"
                      />
                      <input
                        type="number"
                        value={skill.ability}
                        onChange={(e) => updateGeneralSkill(index, 'ability', parseInt(e.target.value) || 0)}
                        className="col-span-2 h-8 pixel-border bg-card/50 px-1 font-pixel text-xs text-center"
                      />
                      <input
                        type="number"
                        value={skill.modifier}
                        onChange={(e) => updateGeneralSkill(index, 'modifier', parseInt(e.target.value) || 0)}
                        className="col-span-2 h-8 pixel-border bg-card/50 px-1 font-pixel text-xs text-center"
                      />
                      <div className="col-span-1 h-8 pixel-border bg-muted/30 flex items-center justify-center font-pixel text-xs">
                        {skill.d20}
                      </div>
                      <button
                        onClick={() => removeGeneralSkill(index)}
                        className="col-span-1 h-8 pixel-border bg-destructive/20 hover:bg-destructive/40 flex items-center justify-center transition-colors"
                      >
                        <Minus className="h-3 w-3 text-destructive" />
                      </button>
                    </div>
                  ))}
                </div>

                <PixelButton size="sm" variant="outline" className="w-full" onClick={addGeneralSkill}>
                  <Plus className="h-3 w-3 mr-1" />
                  Adicionar Linha
                </PixelButton>
              </div>
            </PixelCard>
          </div>
        </TabsContent>

        {/* Outras abas vazias por enquanto */}
        <TabsContent value="inventory" className="mt-6">
          <PixelCard>
            <h3 className="font-pixel text-sm text-accent mb-4">INVENTÁRIO</h3>
            <p className="font-pixel text-xs text-muted-foreground text-center py-8">
              Sistema de inventário em desenvolvimento...
            </p>
          </PixelCard>
        </TabsContent>

        <TabsContent value="spells" className="mt-6">
          <PixelCard>
            <h3 className="font-pixel text-sm text-accent mb-4">MAGIAS</h3>
            <p className="font-pixel text-xs text-muted-foreground text-center py-8">
              Sistema de magias em desenvolvimento...
            </p>
          </PixelCard>
        </TabsContent>

        <TabsContent value="notes" className="mt-6">
          <PixelCard>
            <h3 className="font-pixel text-sm text-accent mb-4">NOTAS</h3>
            <textarea
              className="w-full min-h-[200px] pixel-border bg-card/50 p-4 font-pixel text-xs resize-none"
              placeholder="Escreva suas anotações sobre o personagem..."
            />
          </PixelCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CharacterSheet;