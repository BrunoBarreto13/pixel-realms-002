import { useState, useMemo, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import * as Rules from "@/lib/add-2e-rules";
import PagePanel from "@/components/PagePanel";
import { useAuth } from "@/hooks/useAuth";
import { Character, Armament, GeneralSkill, calculateProficiencyPoints, proficiencyConfig } from "./character-sheet/types";
import { CharacterHeader } from "./character-sheet/CharacterHeader";
import { InfoTab } from "./character-sheet/InfoTab";
import { AttributesTab } from "./character-sheet/AttributesTab";
import { SkillsTab } from "./character-sheet/SkillsTab";
import { CombatTab } from "./character-sheet/CombatTab";
import { InventoryTab } from "./character-sheet/InventoryTab";
import { SpellsTab } from "./character-sheet/SpellsTab";
import { NotesTab } from "./character-sheet/NotesTab";
import { ArmamentModal } from "./character-sheet/ArmamentModal";
import { PHB_RACES, PHB_CLASSES, PHB_ARMOR_LIST, PHB_SHIELD_LIST, PHB_HELM_LIST, PHB_WEAPONS } from "@/lib/players-handbook";
import { supabase } from "@/integrations/supabase/client";

const tabTriggerClasses = "font-pixel text-xs uppercase px-4 py-2 border-4 border-border bg-secondary text-secondary-foreground rounded-t-lg shadow-none data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:border-b-card data-[state=active]:-mb-[4px] z-10";

const CharacterSheet = () => {
  const { toast } = useToast();
  const { profile, isMaster, user } = useAuth();
  const [character, setCharacter] = useState<Character>({
    name: "",
    playerName: "",
    race: "",
    class: "",
    level: 1,
    avatarUrl: null,
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
    equipment: { armor: null, shield: null, helm: null },
    initiative: 0,
    savingThrows: { poison: 0, petrification: 0, rod: 0, breath: 0, spell: 0 }, // Will be calculated
    alignment: "",
    hair: "",
    eyes: "",
    weight: "",
    height: "",
    age: 20,
    color: "#4789c7",
    armaments: [],
    generalSkills: [],
    languages: [],
  });

  const [isEditing, setIsEditing] = useState(true);
  const [damageInput, setDamageInput] = useState("");
  const [isArmamentModalOpen, setIsArmamentModalOpen] = useState(false);
  const [editingArmamentIndex, setEditingArmamentIndex] = useState<number | null>(null);

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
  const constitutionBonuses = useMemo(() => Rules.getConstitutionBonuses(character.attributes.constitution, character.class), [character.attributes.constitution, character.class]);
  const intelligenceBonuses = useMemo(() => Rules.getIntelligenceBonuses(character.attributes.intelligence), [character.attributes.intelligence]);
  const wisdomBonuses = useMemo(() => Rules.getWisdomBonuses(character.attributes.wisdom), [character.attributes.wisdom]);
  const charismaBonuses = useMemo(() => Rules.getCharismaBonuses(character.attributes.charisma), [character.attributes.charisma]);
  const calculatedThac0 = useMemo(() => Rules.getThac0(character.class, character.level), [character.class, character.level]);
  const calculatedSaves = useMemo(() => Rules.getSavingThrows(character.class, character.level), [character.class, character.level]);
  
  const calculatedCaDetails = useMemo(() => {
    const ca_base = 10;
    const ajustes = [];
    
    ajustes.push({ fonte: "Destreza", valor: dexterityBonuses.defense });

    const equippedArmor = PHB_ARMOR_LIST.find(a => a.id === character.equipment.armor);
    if (equippedArmor && equippedArmor.id !== 'nenhuma') {
      ajustes.push({ fonte: "Armadura", valor: equippedArmor.armor_class - 10, item: equippedArmor.name });
    }

    const equippedShield = PHB_SHIELD_LIST.find(s => s.id === character.equipment.shield);
    if (equippedShield && equippedShield.id !== 'nenhum') {
      ajustes.push({ fonte: "Escudo", valor: equippedShield.armor_class - 10, item: equippedShield.name });
    }

    const equippedHelm = PHB_HELM_LIST.find(h => h.id === character.equipment.helm);
    if (equippedHelm && equippedHelm.id !== 'nenhum') {
      ajustes.push({ fonte: "Elmo", valor: equippedHelm.armor_class - 10, item: equippedHelm.name });
    }

    const ca_final = ajustes.reduce((sum, adj) => sum + adj.valor, ca_base);

    return { ca_base, ajustes, ca_final };
  }, [character.equipment, dexterityBonuses.defense]);

  const totalWeight = useMemo(() => {
    let weight = 0;
    const { armor, shield, helm } = character.equipment;
    
    const equippedArmor = PHB_ARMOR_LIST.find(a => a.id === armor);
    if (equippedArmor) weight += equippedArmor.weight;

    const equippedShield = PHB_SHIELD_LIST.find(s => s.id === shield);
    if (equippedShield) weight += equippedShield.weight;

    const equippedHelm = PHB_HELM_LIST.find(h => h.id === helm);
    if (equippedHelm) weight += equippedHelm.weight;

    character.armaments.forEach(weapon => {
      weight += weapon.weight;
    });

    return weight;
  }, [character.equipment, character.armaments]);

  // --- PROFICIENCIES & SKILLS ---
  const totalWeaponProficiencyPoints = useMemo(() => calculateProficiencyPoints(character.class, character.level), [character.class, character.level]);
  const usedWeaponProficiencyPoints = character.armaments.length;
  const proficiencyRuleText = useMemo(() => {
    const classData = PHB_CLASSES.find(c => c.value === character.class);
    if (!classData) return "Selecione uma classe para ver as regras de perícia.";
    const config = proficiencyConfig[classData.value];
    if (!config) return "Classe sem regras de perícia definidas.";
    return `Você possui ${config.initial} pontos de perícia inicial em armas. +1 ponto a cada ${config.progression} níveis.`;
  }, [character.class, character.level]);

  const automaticLanguages = useMemo(() => {
    const languages = ["Comum"];
    const raceData = PHB_RACES.find(r => r.value === character.race);
    if (raceData?.racial_language) {
      languages.push(raceData.racial_language);
    }
    return languages;
  }, [character.race]);

  const totalLanguageSlots = useMemo(() => intelligenceBonuses.languages, [intelligenceBonuses]);
  const usedLanguageSlots = character.languages.length;
  const remainingLanguageSlots = totalLanguageSlots - usedLanguageSlots;

  const baseGeneralSkillPoints = useMemo(() => Rules.calculateGeneralSkillPoints(character.class, character.level), [character.class, character.level]);
  const totalGeneralSkillPoints = baseGeneralSkillPoints + remainingLanguageSlots;
  const usedGeneralSkillPoints = character.generalSkills.reduce((sum, skill) => sum + (skill.points || 0), 0);

  // --- HANDLERS ---
  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }
    if (!user) {
        toast({ title: "Erro", description: "Você precisa estar logado para fazer upload.", variant: "destructive" });
        return;
    }

    const file = event.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    toast({ title: "Enviando avatar...", description: "Aguarde um momento." });

    try {
        const { error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(filePath, file, {
              cacheControl: '3600',
              upsert: false
            });

        if (uploadError) {
            throw uploadError;
        }

        const { data } = supabase.storage
            .from('avatars')
            .getPublicUrl(filePath);

        if (!data.publicUrl) {
            throw new Error("Não foi possível obter a URL pública do avatar.");
        }

        setCharacter(prev => ({ ...prev, avatarUrl: data.publicUrl }));
        toast({ title: "Sucesso!", description: "Avatar atualizado." });

    } catch (error: any) {
        toast({ title: "Erro no Upload", description: error.message, variant: "destructive" });
    }
  };

  const handleSave = () => {
    if (!character.name || !character.race || !character.class) {
      toast({ title: "Campos obrigatórios", description: "Preencha nome, raça e classe", variant: "destructive" });
      return;
    }
    setIsEditing(false);
    toast({ title: "Personagem salvo!", description: `${character.name} foi salvo com sucesso.` });
  };

  const handleCalculateHP = () => {
    const classData = PHB_CLASSES.find(c => c.value === character.class);
    if (!classData || character.level < 1) {
      toast({ title: "Erro", description: "Selecione uma classe para calcular o HP.", variant: "destructive" });
      return;
    }
    const conMod = constitutionBonuses.hp;
    let totalHP = classData.hit_die + conMod;
    for (let i = 2; i <= character.level; i++) {
      const roll = Math.floor(Math.random() * classData.hit_die) + 1;
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

  const handleAddArmamentClick = () => {
    if (usedWeaponProficiencyPoints >= totalWeaponProficiencyPoints) {
      toast({ title: "Pontos insuficientes!", description: "Você não tem pontos de perícia com arma disponíveis.", variant: "destructive" });
      return;
    }
    setEditingArmamentIndex(null);
    setIsArmamentModalOpen(true);
  };

  const handleEditArmamentClick = (index: number) => {
    setEditingArmamentIndex(index);
    setIsArmamentModalOpen(true);
  };

  const handleSaveArmament = (armament: Armament) => {
    if (editingArmamentIndex !== null) {
      const updatedArmaments = [...character.armaments];
      updatedArmaments[editingArmamentIndex] = armament;
      setCharacter(prev => ({ ...prev, armaments: updatedArmaments }));
    } else {
      setCharacter(prev => ({ ...prev, armaments: [...prev.armaments, armament] }));
    }
  };

  const handleRemoveArmament = (index: number) => {
    setCharacter(prev => ({ ...prev, armaments: prev.armaments.filter((_, i) => i !== index) }));
  };

  const handleAddSkill = () => {
    if (usedGeneralSkillPoints >= totalGeneralSkillPoints) {
      toast({ title: "Pontos insuficientes!", description: "Você não tem pontos de perícia geral disponíveis.", variant: "destructive" });
      return;
    }
    setCharacter(prev => ({ ...prev, generalSkills: [...prev.generalSkills, { name: "", points: 1, ability: "", modifier: 0, notes: "" }] }));
  };

  const handleRemoveSkill = (index: number) => {
    setCharacter(prev => ({ ...prev, generalSkills: prev.generalSkills.filter((_, i) => i !== index) }));
  };

  const handleSkillChange = (index: number, field: keyof GeneralSkill, value: string | number) => {
    const updated = [...character.generalSkills];
    updated[index] = { ...updated[index], [field]: value };
    setCharacter(prev => ({ ...prev, generalSkills: updated }));
  };

  const handleAddLanguage = () => {
    if (remainingLanguageSlots > 0) {
      setCharacter(prev => ({ ...prev, languages: [...prev.languages, ""] }));
    }
  };

  const handleRemoveLanguage = (index: number) => {
    setCharacter(prev => ({ ...prev, languages: prev.languages.filter((_, i) => i !== index) }));
  };

  const handleLanguageChange = (index: number, value: string) => {
    const updated = [...character.languages];
    updated[index] = value;
    setCharacter(prev => ({ ...prev, languages: updated }));
  };

  return (
    <PagePanel title="Ficha do Jogador">
      <div className="space-y-6 max-w-5xl mx-auto">
        <CharacterHeader 
          character={character} 
          isEditing={isEditing} 
          onSave={handleSave} 
          onEdit={() => setIsEditing(true)}
          races={PHB_RACES}
          classes={PHB_CLASSES}
          onAvatarUpload={handleAvatarUpload}
        />

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
            <TabsContent value="stats"><InfoTab character={character} setCharacter={setCharacter} isEditing={isEditing} onCalculateHP={handleCalculateHP} races={PHB_RACES} classes={PHB_CLASSES} /></TabsContent>
            <TabsContent value="attributes"><AttributesTab character={character} setCharacter={setCharacter} isEditing={isEditing} strengthBonuses={strengthBonuses} dexterityBonuses={dexterityBonuses} constitutionBonuses={constitutionBonuses} intelligenceBonuses={intelligenceBonuses} wisdomBonuses={wisdomBonuses} charismaBonuses={charismaBonuses} /></TabsContent>
            <TabsContent value="skills">
              <SkillsTab 
                character={character} 
                isEditing={isEditing} 
                totalWeaponProficiencyPoints={totalWeaponProficiencyPoints} 
                usedWeaponProficiencyPoints={usedWeaponProficiencyPoints} 
                proficiencyRuleText={proficiencyRuleText} 
                onAddArmament={handleAddArmamentClick} 
                onEditArmament={handleEditArmamentClick} 
                onRemoveArmament={handleRemoveArmament} 
                onAddSkill={handleAddSkill} 
                onRemoveSkill={handleRemoveSkill} 
                onSkillChange={handleSkillChange}
                automaticLanguages={automaticLanguages}
                remainingLanguageSlots={remainingLanguageSlots}
                onAddLanguage={handleAddLanguage}
                onRemoveLanguage={handleRemoveLanguage}
                onLanguageChange={handleLanguageChange}
                totalGeneralSkillPoints={totalGeneralSkillPoints}
                usedGeneralSkillPoints={usedGeneralSkillPoints}
              />
            </TabsContent>
            <TabsContent value="combate"><CombatTab character={character} setCharacter={setCharacter} calculatedCaDetails={calculatedCaDetails} calculatedThac0={calculatedThac0} calculatedSaves={calculatedSaves} damageInput={damageInput} setDamageInput={setDamageInput} onApplyDamage={handleApplyDamage} onRoll={handleRoll} strengthBonuses={strengthBonuses} dexterityBonuses={dexterityBonuses} /></TabsContent>
            <TabsContent value="inventory"><InventoryTab character={character} setCharacter={setCharacter} isEditing={isEditing} totalWeight={totalWeight} allowedWeight={strengthBonuses.weight} armorList={PHB_ARMOR_LIST} shieldList={PHB_SHIELD_LIST} helmList={PHB_HELM_LIST} /></TabsContent>
            <TabsContent value="spells"><SpellsTab /></TabsContent>
            <TabsContent value="notes"><NotesTab /></TabsContent>
          </div>
        </Tabs>
      </div>
      <ArmamentModal
        isOpen={isArmamentModalOpen}
        onClose={() => setIsArmamentModalOpen(false)}
        onSave={handleSaveArmament}
        armament={editingArmamentIndex !== null ? character.armaments[editingArmamentIndex] : null}
        weaponList={PHB_WEAPONS}
      />
    </PagePanel>
  );
};

export default CharacterSheet;