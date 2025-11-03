import { useState, useMemo, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import * as Rules from "@/lib/add-2e-rules";
import PagePanel from "@/components/PagePanel";
import { useAuth } from "@/hooks/useAuth";
import { Character, WeaponProficiency, GeneralSkill, calculateProficiencyPoints, CLASSES } from "./character-sheet/types";
import { CharacterHeader } from "./character-sheet/CharacterHeader";
import { InfoTab } from "./character-sheet/InfoTab";
import { AttributesTab } from "./character-sheet/AttributesTab";
import { SkillsTab } from "./character-sheet/SkillsTab";
import { CombatTab } from "./character-sheet/CombatTab";
import { InventoryTab } from "./character-sheet/InventoryTab";
import { SpellsTab } from "./character-sheet/SpellsTab";
import { NotesTab } from "./character-sheet/NotesTab";

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
      strengthPercentile: 0,
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
    savingThrows: { poison: 13, petrification: 12, rod: 11, breath: 14, spell: 14 },
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
      setCharacter(prev => ({
        ...prev,
        name: isMaster ? "" : profile.character_or_campaign || "",
        playerName: profile.name || "",
      }));
    }
  }, [profile, isMaster]);

  // --- DERIVED STATS & BONUSES ---
  const strengthBonuses = useMemo(() => Rules.getStrengthBonuses(character.attributes.strength, character.attributes.strengthPercentile), [character.attributes.strength, character.attributes.strengthPercentile]);
  const dexterityBonuses = useMemo(() => Rules.getDexterityBonuses(character.attributes.dexterity), [character.attributes.dexterity]);
  const constitutionBonuses = useMemo(() => Rules.getConstitutionBonuses(character.attributes.constitution), [character.attributes.constitution]);
  const intelligenceBonuses = useMemo(() => Rules.getIntelligenceBonuses(character.attributes.intelligence), [character.attributes.intelligence]);
  const wisdomBonuses = useMemo(() => Rules.getWisdomBonuses(character.attributes.wisdom), [character.attributes.wisdom]);
  const charismaBonuses = useMemo(() => Rules.getCharismaBonuses(character.attributes.charisma), [character.attributes.charisma]);
  const calculatedThac0 = useMemo(() => Rules.getThac0(character.class, character.level), [character.class, character.level]);
  const calculatedAc = useMemo(() => character.ac + dexterityBonuses.defense, [character.ac, dexterityBonuses.defense]);
  const totalWeaponProficiencyPoints = useMemo(() => calculateProficiencyPoints(character.class, character.level), [character.class, character.level]);
  const usedWeaponProficiencyPoints = character.weaponProficiencies.length;
  const proficiencyRuleText = useMemo(() => {
    const config = proficiencyConfig[character.class];
    if (!config) return "Selecione uma classe para ver as regras de perícia.";
    return `Você possui ${config.initial} pontos de perícia inicial em armas. +1 ponto a cada ${config.progression} níveis.`;
  }, [character.class]);

  // --- HANDLERS ---
  const handleSave = () => {
    if (!character.name || !character.race || !character.class) {
      toast({ title: "Campos obrigatórios", description: "Preencha nome, raça e classe", variant: "destructive" });
      return;
    }
    setIsEditing(false);
    toast({ title: "Personagem salvo!", description: `${character.name} foi salvo com sucesso.` });
  };

  const handleCalculateHP = () => {
    const classData = CLASSES.find(c => c.value === character.class);
    if (!classData || character.level < 1) {
      toast({ title: "Erro", description: "Selecione uma classe para calcular o HP.", variant: "destructive" });
      return;
    }
    const conMod = constitutionBonuses.hp;
    let totalHP = classData.hitDie + conMod;
    for (let i = 2; i <= character.level; i++) {
      const roll = Math.floor(Math.random() * classData.hitDie) + 1;
      totalHP += Math.max(1, roll + conMod);
    }
    setCharacter(prev => ({ ...prev, maxHp: totalHP, hp: totalHP }));
    toast({ title: "HP calculado!", description: `Pontos de vida: ${totalHP}` });
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
  };

  const handleAddWeapon = () => {
    if (usedWeaponProficiencyPoints >= totalWeaponProficiencyPoints) {
      toast({ title: "Pontos insuficientes!", description: "Você não tem pontos de perícia com arma disponíveis.", variant: "destructive" });
      return;
    }
    setCharacter(prev => ({ ...prev, weaponProficiencies: [...prev.weaponProficiencies, { name: "", proficiency: "", notes: "" }] }));
  };

  const handleRemoveWeapon = (index: number) => {
    setCharacter(prev => ({ ...prev, weaponProficiencies: prev.weaponProficiencies.filter((_, i) => i !== index) }));
  };

  const handleWeaponChange = (index: number, field: keyof WeaponProficiency, value: string) => {
    const updated = [...character.weaponProficiencies];
    updated[index] = { ...updated[index], [field]: value };
    setCharacter(prev => ({ ...prev, weaponProficiencies: updated }));
  };

  const handleAddSkill = () => {
    setCharacter(prev => ({ ...prev, generalSkills: [...prev.generalSkills, { name: "", category: "", level: "", notes: "" }] }));
  };

  const handleRemoveSkill = (index: number) => {
    setCharacter(prev => ({ ...prev, generalSkills: prev.generalSkills.filter((_, i) => i !== index) }));
  };

  const handleSkillChange = (index: number, field: keyof GeneralSkill, value: string) => {
    const updated = [...character.generalSkills];
    updated[index] = { ...updated[index], [field]: value };
    setCharacter(prev => ({ ...prev, generalSkills: updated }));
  };

  return (
    <PagePanel title="Ficha do Jogador">
      <div className="space-y-6 max-w-5xl mx-auto">
        <CharacterHeader character={character} isEditing={isEditing} onSave={handleSave} onEdit={() => setIsEditing(true)} />

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
            <TabsContent value="stats"><InfoTab character={character} setCharacter={setCharacter} isEditing={isEditing} onCalculateHP={handleCalculateHP} /></TabsContent>
            <TabsContent value="attributes"><AttributesTab character={character} setCharacter={setCharacter} isEditing={isEditing} strengthBonuses={strengthBonuses} dexterityBonuses={dexterityBonuses} constitutionBonuses={constitutionBonuses} intelligenceBonuses={intelligenceBonuses} wisdomBonuses={wisdomBonuses} charismaBonuses={charismaBonuses} /></TabsContent>
            <TabsContent value="skills"><SkillsTab character={character} isEditing={isEditing} totalWeaponProficiencyPoints={totalWeaponProficiencyPoints} usedWeaponProficiencyPoints={usedWeaponProficiencyPoints} proficiencyRuleText={proficiencyRuleText} onAddWeapon={handleAddWeapon} onRemoveWeapon={handleRemoveWeapon} onWeaponChange={handleWeaponChange} onAddSkill={handleAddSkill} onRemoveSkill={handleRemoveSkill} onSkillChange={handleSkillChange} /></TabsContent>
            <TabsContent value="combate"><CombatTab character={character} setCharacter={setCharacter} isEditing={isEditing} calculatedAc={calculatedAc} calculatedThac0={calculatedThac0} damageInput={damageInput} setDamageInput={setDamageInput} onApplyDamage={handleApplyDamage} onRoll={handleRoll} strengthBonuses={strengthBonuses} dexterityBonuses={dexterityBonuses} /></TabsContent>
            <TabsContent value="inventory"><InventoryTab /></TabsContent>
            <TabsContent value="spells"><SpellsTab /></TabsContent>
            <TabsContent value="notes"><NotesTab /></TabsContent>
          </div>
        </Tabs>
      </div>
    </PagePanel>
  );
};

export default CharacterSheet;