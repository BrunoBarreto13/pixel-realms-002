import { useState, useMemo, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import * as Rules from "@/lib/add-2e-rules";
import { initializeCharacterByClass, updateCharacterLevel } from "@/lib/character-initialization";
import PagePanel from "@/components/PagePanel";
import { useAuth } from "@/hooks/useAuth";
import { useClassFeatures } from "@/hooks/useClassFeatures";
import { Character, Armament, GeneralSkill } from "./character-sheet/types";
import { CharacterHeader } from "./character-sheet/CharacterHeader";
import { InfoTab } from "./character-sheet/InfoTab";
import { AttributesTab } from "./character-sheet/AttributesTab";
import { ClassAbilitiesTab } from "./character-sheet/ClassAbilitiesTab";
import { CombatTab } from "./character-sheet/CombatTab";
import { InventoryTab } from "./character-sheet/InventoryTab";
import { SpellsTab } from "./character-sheet/SpellsTab";
import { NotesTab } from "./character-sheet/NotesTab";
import { ArmamentModal } from "./character-sheet/ArmamentModal";
import { PHB_RACES, PHB_CLASSES, PHB_ARMOR_LIST, PHB_SHIELD_LIST, PHB_HELM_LIST, PHB_WEAPONS } from "@/lib/players-handbook";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { Json } from "@/integrations/supabase/types";

const initialCharacterState: Character = {
  name: "", playerName: "", race: "", class: "", level: 1, avatarUrl: null,
  attributes: { strength: 10, strengthPercentile: 0, dexterity: 10, constitution: 10, intelligence: 10, wisdom: 10, charisma: 10 },
  hp: 1, maxHp: 1, equipment: { armor: null, shield: null, helm: null }, initiative: 0,
  savingThrows: { poison: 0, petrification: 0, rod: 0, breath: 0, spell: 0 },
  alignment: "", hair: "", eyes: "", weight: "", height: "", age: 20, color: "#4789c7",
  armaments: [], generalSkills: [], languages: [],
};

const tabTriggerClasses = "font-pixel text-xs uppercase px-4 py-2 border-4 border-border bg-secondary text-secondary-foreground rounded-t-lg shadow-none data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:border-b-card data-[state=active]:-mb-[4px] z-10";

const CharacterSheet = () => {
  const { toast } = useToast();
  const { profile, user, loading: authLoading } = useAuth();
  const [character, setCharacter] = useState<Character>(initialCharacterState);
  const [characterId, setCharacterId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [isArmamentModalOpen, setIsArmamentModalOpen] = useState(false);
  const [editingArmamentIndex, setEditingArmamentIndex] = useState<number | null>(null);

  const classFeatures = useClassFeatures(character);

  useEffect(() => {
    if (authLoading || !user) return;
    const fetchCharacter = async () => {
      setDataLoading(true);
      const { data, error } = await supabase.from('characters').select('*').eq('user_id', user.id).limit(1).single();
      if (error && error.code !== 'PGRST116') {
        toast({ title: "Erro ao carregar ficha", description: error.message, variant: "destructive" });
      }
      if (data) {
        setCharacterId(data.id);
        const loadedCharacter = data.character_data as unknown as Character;
        setCharacter({ ...initialCharacterState, ...loadedCharacter });
        setIsEditing(false);
      } else {
        const newChar = initializeCharacterByClass({
          ...initialCharacterState,
          playerName: profile?.full_name || "", name: profile?.character_name || "", avatarUrl: profile?.avatar_url || null,
        }, '', 1);
        setCharacter(newChar);
        setIsEditing(true);
      }
      setDataLoading(false);
    };
    fetchCharacter();
  }, [user, authLoading, profile, toast]);

  useEffect(() => {
    if (!character.class) return;
    setCharacter(prev => initializeCharacterByClass(prev, prev.class, prev.level));
  }, [character.class]);

  useEffect(() => {
    if (!character.class) return;
    setCharacter(prev => updateCharacterLevel(prev, prev.level));
  }, [character.level]);

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
    const ajustes = [{ fonte: "Destreza", valor: dexterityBonuses.defense }];
    const armor = PHB_ARMOR_LIST.find(a => a.id === character.equipment.armor);
    if (armor && armor.id !== 'nenhuma') ajustes.push({ fonte: "Armadura", valor: armor.armor_class - 10, item: armor.name });
    const shield = PHB_SHIELD_LIST.find(s => s.id === character.equipment.shield);
    if (shield && shield.id !== 'nenhum') ajustes.push({ fonte: "Escudo", valor: shield.armor_class - 10, item: shield.name });
    const ca_final = ajustes.reduce((sum, adj) => sum + adj.valor, ca_base);
    return { ca_base, ajustes, ca_final };
  }, [character.equipment, dexterityBonuses.defense]);

  const totalWeight = useMemo(() => {
    let weight = 0;
    const { armor, shield, helm } = character.equipment;
    [PHB_ARMOR_LIST, PHB_SHIELD_LIST, PHB_HELM_LIST].forEach((list, i) => {
      const item = list.find(it => it.id === [armor, shield, helm][i]);
      if (item) weight += item.weight;
    });
    character.armaments.forEach(weapon => { weight += weapon.weight; });
    return weight;
  }, [character.equipment, character.armaments]);

  const handleSave = async () => {
    if (!user) return;
    const characterDataToSave: Omit<Tables<'characters'>['Insert'], 'id' | 'created_at' | 'updated_at'> & { character_data: Json } = {
      user_id: user.id, character_name: character.name, player_name: character.playerName,
      level: character.level, campaign_name: profile?.campaign_name || null,
      character_data: character as unknown as Json,
    };
    try {
      if (characterId) {
        const { error } = await supabase.from('characters').update(characterDataToSave).eq('id', characterId);
        if (error) throw error;
        toast({ title: "Ficha atualizada!" });
      } else {
        const { data, error } = await supabase.from('characters').insert(characterDataToSave).select('id').single();
        if (error) throw error;
        setCharacterId(data.id);
        toast({ title: "Ficha salva!" });
      }
      setIsEditing(false);
    } catch (error: any) {
      toast({ title: "Erro ao salvar", description: error.message, variant: "destructive" });
    }
  };

  const handleCalculateHP = () => {
    const classData = PHB_CLASSES.find(c => c.value === character.class);
    if (!classData) return;
    const conMod = constitutionBonuses.hp;
    let totalHP = classData.hit_die + conMod;
    for (let i = 2; i <= character.level; i++) totalHP += Math.max(1, Math.floor(Math.random() * classData.hit_die) + 1 + conMod);
    setCharacter(prev => ({ ...prev, maxHp: totalHP, hp: totalHP }));
    toast({ title: "HP calculado!", description: `Total: ${totalHP}` });
  };

  const handleSaveArmament = (armament: Armament) => {
    if (editingArmamentIndex !== null) {
      const updated = [...character.armaments];
      updated[editingArmamentIndex] = armament;
      setCharacter(prev => ({ ...prev, armaments: updated }));
    } else {
      setCharacter(prev => ({ ...prev, armaments: [...prev.armaments, armament] }));
    }
  };

  if (authLoading || dataLoading) {
    return <PagePanel title="Ficha do Jogador"><p className="text-center font-pixel text-sm text-muted-foreground">CARREGANDO...</p></PagePanel>;
  }

  return (
    <PagePanel title="Ficha do Jogador">
      <div className="space-y-6 max-w-5xl mx-auto">
        <CharacterHeader character={character} isEditing={isEditing} onSave={handleSave} onEdit={() => setIsEditing(true)} races={PHB_RACES} classes={PHB_CLASSES} onAvatarUpload={() => {}} />
        <Tabs defaultValue="info" className="w-full">
          <TabsList className="flex flex-wrap gap-1 bg-transparent p-0 h-auto">
            <TabsTrigger value="info" className={tabTriggerClasses}>Informações</TabsTrigger>
            <TabsTrigger value="attributes" className={tabTriggerClasses}>Atributos</TabsTrigger>
            <TabsTrigger value="abilities" className={tabTriggerClasses}>Habilidades</TabsTrigger>
            <TabsTrigger value="combat" className={tabTriggerClasses}>Combate</TabsTrigger>
            {classFeatures && (classFeatures.arcaneSpells || classFeatures.divineSpells) && (
              <TabsTrigger value="spells" className={tabTriggerClasses}>Magias</TabsTrigger>
            )}
            <TabsTrigger value="inventory" className={tabTriggerClasses}>Inventário</TabsTrigger>
            <TabsTrigger value="notes" className={tabTriggerClasses}>Notas</TabsTrigger>
          </TabsList>
          <div className="rpg-panel relative">
            <TabsContent value="info"><InfoTab character={character} setCharacter={setCharacter} isEditing={isEditing} onCalculateHP={handleCalculateHP} races={PHB_RACES} classes={PHB_CLASSES} /></TabsContent>
            <TabsContent value="attributes"><AttributesTab character={character} setCharacter={setCharacter} isEditing={isEditing} {...{ strengthBonuses, dexterityBonuses, constitutionBonuses, intelligenceBonuses, wisdomBonuses, charismaBonuses }} /></TabsContent>
            <TabsContent value="abilities"><ClassAbilitiesTab character={character} isEditing={isEditing} /></TabsContent>
            <TabsContent value="combat"><CombatTab character={character} setCharacter={setCharacter} calculatedCaDetails={calculatedCaDetails} calculatedThac0={calculatedThac0} calculatedSaves={calculatedSaves} damageInput="" setDamageInput={() => {}} onApplyDamage={() => {}} onRoll={() => {}} strengthBonuses={strengthBonuses} dexterityBonuses={dexterityBonuses} /></TabsContent>
            <TabsContent value="inventory"><InventoryTab character={character} setCharacter={setCharacter} isEditing={isEditing} totalWeight={totalWeight} allowedWeight={strengthBonuses.weight} armorList={PHB_ARMOR_LIST} shieldList={PHB_SHIELD_LIST} helmList={PHB_HELM_LIST} /></TabsContent>
            <TabsContent value="spells"><SpellsTab character={character} /></TabsContent>
            <TabsContent value="notes"><NotesTab /></TabsContent>
          </div>
        </Tabs>
      </div>
      <ArmamentModal isOpen={isArmamentModalOpen} onClose={() => setIsArmamentModalOpen(false)} onSave={handleSaveArmament} armament={editingArmamentIndex !== null ? character.armaments[editingArmamentIndex] : null} weaponList={PHB_WEAPONS} />
    </PagePanel>
  );
};

export default CharacterSheet;