import { useState, useMemo, useEffect } from "react";
import { PixelPanel } from "@/components/PixelPanel";
import { PixelInput } from "@/components/PixelInput";
import { PixelButton } from "@/components/PixelButton";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Plus, Minus, User, Sword, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import * as Rules from "@/lib/add-2e-rules";
import PagePanel from "@/components/PagePanel";
import { useAuth } from "@/hooks/useAuth";

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

interface WeaponProficiency {
  name: string;
  proficiency: string;
  notes: string;
}

interface GeneralSkill {
  name: string;
  category: string;
  level: string;
  notes: string;
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
  alignment: string;
  hair: string;
  eyes: string;
  weight: string;
  height: string;
  age: number;
  color: string;
  weaponProficiencies: WeaponProficiency[];
  generalSkills: GeneralSkill[];
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

const tabTriggerClasses = "font-pixel text-xs uppercase px-4 py-2 border-4 border-border bg-secondary text-secondary-foreground rounded-t-lg shadow-none data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:border-b-card data-[state=active]:-mb-[4px] z-10";

const CharacterSheet = () => {
  const { toast } = useToast();
  const { profile, isMaster } = useAuth();
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
    alignment: "",
    hair: "",
    eyes: "",
    weight: "",
    height: "",
    age: 20,
    color: "#4789c7",
    weaponProficiencies: [],
    generalSkills: [],
  });

  const [isEditing, setIsEditing] = useState(true);
  const [damageInput, setDamageInput] = useState("");

  useEffect(() => {
    if (profile) {
      setCharacter(prevCharacter => ({
        ...prevCharacter,
        name: isMaster ? "" : profile.character_or_campaign || "",
        playerName: profile.name || "",
      }));
    }
  }, [profile, isMaster]);

  // --- DERIVED STATS CALCULATIONS ---
  const strengthBonuses = useMemo(() => Rules.getStrengthBonuses(character.attributes.strength), [character.attributes.strength]);
  const dexterityBonuses = useMemo(() => Rules.getDexterityBonuses(character.attributes.dexterity), [character.attributes.dexterity]);
  const constitutionBonuses = useMemo(() => Rules.getConstitutionBonuses(character.attributes.constitution), [character.attributes.constitution]);
  const intelligenceBonuses = useMemo(() => Rules.getIntelligenceBonuses(character.attributes.intelligence), [character.attributes.intelligence]);
  const wisdomBonuses = useMemo(() => Rules.getWisdomBonuses(character.attributes.wisdom), [character.attributes.wisdom]);
  const charismaBonuses = useMemo(() => Rules.getCharismaBonuses(character.attributes.charisma), [character.attributes.charisma]);
  
  const calculatedThac0 = useMemo(() => Rules.getThac0(character.class, character.level), [character.class, character.level]);
  const calculatedAc = useMemo(() => character.ac + dexterityBonuses.defense, [character.ac, dexterityBonuses.defense]);

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

  // --- SKILLS FUNCTIONS ---
  const handleWeaponChange = (index: number, field: keyof WeaponProficiency, value: string) => {
    const updatedWeapons = [...character.weaponProficiencies];
    updatedWeapons[index] = { ...updatedWeapons[index], [field]: value };
    setCharacter({ ...character, weaponProficiencies: updatedWeapons });
  };

  const addWeapon = () => {
    setCharacter({
      ...character,
      weaponProficiencies: [
        ...character.weaponProficiencies,
        { name: "", proficiency: "", notes: "" },
      ],
    });
  };

  const removeWeapon = (index: number) => {
    const updatedWeapons = character.weaponProficiencies.filter((_, i) => i !== index);
    setCharacter({ ...character, weaponProficiencies: updatedWeapons });
  };

  const handleSkillChange = (index: number, field: keyof GeneralSkill, value: string) => {
    const updatedSkills = [...character.generalSkills];
    updatedSkills[index] = { ...updatedSkills[index], [field]: value };
    setCharacter({ ...character, generalSkills: updatedSkills });
  };

  const addSkill = () => {
    setCharacter({
      ...character,
      generalSkills: [
        ...character.generalSkills,
        { name: "", category: "", level: "", notes: "" },
      ],
    });
  };

  const removeSkill = (index: number) => {
    const updatedSkills = character.generalSkills.filter((_, i) => i !== index);
    setCharacter({ ...character, generalSkills: updatedSkills });
  };

  return (
    <PagePanel title="Ficha do Jogador">
      <div className="space-y-6 max-w-5xl mx-auto">
        {/* Header */}
        <PixelPanel>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 pixel-border bg-muted/50 flex items-center justify-center">
                <User className="w-12 h-12 text-muted-foreground" />
              </div>
              <div>
                <h2 className="font-pixel text-xl text-primary pixel-text-shadow">{character.name || "Novo Personagem"}</h2>
                <p className="font-pixel text-xs text-secondary-foreground">
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
        </PixelPanel>

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
                <h3 className="font-pixel text-sm text-accent pixel-text-shadow">INFORMAÇÕES BÁSICAS</h3>
                <PixelButton onClick={calculateHP} size="sm" variant="secondary">Calcular HP</PixelButton>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <PixelInput label="Nome do Personagem" value={character.name} onChange={(e) => setCharacter({ ...character, name: e.target.value })} disabled={!isEditing} />
                <PixelInput label="Nome do Jogador" value={character.playerName} onChange={(e) => setCharacter({ ...character, playerName: e.target.value })} disabled={!isEditing} />
                <div className="flex flex-col gap-2">
                  <Label className="font-pixel text-xs text-foreground">Nível</Label>
                  <div className="flex items-center gap-2">
                    <PixelButton size="icon" variant="outline" onClick={() => setCharacter({ ...character, level: Math.max(1, character.level - 1) })} disabled={!isEditing}><Minus className="h-4 w-4" /></PixelButton>
                    <input type="number" value={character.level} onChange={(e) => setCharacter({ ...character, level: parseInt(e.target.value) || 1 })} className="flex h-12 w-full pixel-border bg-input backdrop-blur-sm px-3 py-2 font-pixel text-xs text-center text-foreground" min={1} max={20} disabled={!isEditing} />
                    <PixelButton size="icon" variant="outline" onClick={() => setCharacter({ ...character, level: Math.min(20, character.level + 1) })} disabled={!isEditing}><Plus className="h-4 w-4" /></PixelButton>
                  </div>
                </div>
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
            </TabsContent>

            <TabsContent value="attributes" className="mt-0 space-y-2">
              {/* Attribute sections */}
            </TabsContent>

            <TabsContent value="skills" className="mt-0 space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-pixel text-sm text-accent pixel-text-shadow">PERÍCIAS COM ARMAS</h3>
                  <PixelButton onClick={addWeapon} size="sm" variant="secondary" disabled={!isEditing} className="flex items-center gap-2">
                    <Plus className="h-4 w-4" /> Adicionar Arma
                  </PixelButton>
                </div>
                <div className="space-y-4">
                  {character.weaponProficiencies.map((weapon, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end bg-muted/30 p-4 pixel-border">
                      <PixelInput label="Nome da Arma" value={weapon.name} onChange={(e) => handleWeaponChange(index, 'name', e.target.value)} disabled={!isEditing} />
                      <PixelInput label="Proficiência" value={weapon.proficiency} onChange={(e) => handleWeaponChange(index, 'proficiency', e.target.value)} disabled={!isEditing} />
                      <div className="md:col-span-2 flex gap-4 items-end">
                        <PixelInput label="Observações" value={weapon.notes} onChange={(e) => handleWeaponChange(index, 'notes', e.target.value)} disabled={!isEditing} className="flex-grow" />
                        <PixelButton onClick={() => removeWeapon(index)} variant="destructive" size="icon" disabled={!isEditing} aria-label="Remover Arma">
                          <Minus className="h-4 w-4" />
                        </PixelButton>
                      </div>
                    </div>
                  ))}
                  {character.weaponProficiencies.length === 0 && (
                    <p className="font-pixel text-xs text-muted-foreground text-center py-4">Nenhuma perícia com arma adicionada.</p>
                  )}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-pixel text-sm text-accent pixel-text-shadow">PERÍCIAS GERAIS</h3>
                  <PixelButton onClick={addSkill} size="sm" variant="secondary" disabled={!isEditing} className="flex items-center gap-2">
                    <Plus className="h-4 w-4" /> Adicionar Perícia
                  </PixelButton>
                </div>
                <div className="space-y-4">
                  {character.generalSkills.map((skill, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end bg-muted/30 p-4 pixel-border">
                      <PixelInput label="Nome da Perícia" value={skill.name} onChange={(e) => handleSkillChange(index, 'name', e.target.value)} disabled={!isEditing} />
                      <PixelInput label="Categoria" value={skill.category} onChange={(e) => handleSkillChange(index, 'category', e.target.value)} disabled={!isEditing} />
                      <PixelInput label="Nível/Valor" value={skill.level} onChange={(e) => handleSkillChange(index, 'level', e.target.value)} disabled={!isEditing} />
                      <div className="md:col-span-2 flex gap-4 items-end">
                        <PixelInput label="Observações" value={skill.notes} onChange={(e) => handleSkillChange(index, 'notes', e.target.value)} disabled={!isEditing} className="flex-grow" />
                        <PixelButton onClick={() => removeSkill(index)} variant="destructive" size="icon" disabled={!isEditing} aria-label="Remover Perícia">
                          <Minus className="h-4 w-4" />
                        </PixelButton>
                      </div>
                    </div>
                  ))}
                  {character.generalSkills.length === 0 && (
                    <p className="font-pixel text-xs text-muted-foreground text-center py-4">Nenhuma perícia geral adicionada.</p>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="combate" className="mt-0 space-y-6">
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
                  <PixelButton onClick={handleApplyDamage}>Aplicar Dano</PixelButton>
                </div>
              </div>
              <div className="bg-muted/30 p-4 pixel-border">
                <h3 className="font-pixel text-sm text-accent pixel-text-shadow mb-4">ROLAGEM DE DADOS</h3>
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
              <h3 className="font-pixel text-sm text-accent pixel-text-shadow mb-4">INVENTÁRIO</h3>
              <p className="font-pixel text-xs text-muted-foreground text-center py-8">Sistema de inventário em desenvolvimento...</p>
            </TabsContent>
            <TabsContent value="spells" className="mt-0">
              <h3 className="font-pixel text-sm text-accent pixel-text-shadow mb-4">MAGIAS</h3>
              <p className="font-pixel text-xs text-muted-foreground text-center py-8">Sistema de magias em desenvolvimento...</p>
            </TabsContent>
            <TabsContent value="notes" className="mt-0">
              <h3 className="font-pixel text-sm text-accent pixel-text-shadow mb-4">NOTAS</h3>
              <textarea className="w-full min-h-[200px] pixel-border bg-input p-4 font-pixel text-xs resize-none" placeholder="Escreva suas anotações sobre o personagem..." />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </PagePanel>
  );
};

export default CharacterSheet;