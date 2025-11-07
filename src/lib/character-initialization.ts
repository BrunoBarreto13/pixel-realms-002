import { Character, ThiefSkills, SpellSlots, TurningTable, Experience, RacialAbility, ClassAbility, TrackingAbility, BardAbilities, Coinage } from '@/pages/dashboard/character-sheet/types';
import { getClassFeatures } from './class-features';

const THIEF_SKILL_BASE_BY_LEVEL: Record<number, any> = {
  1: { pickPockets: 30, openLocks: 25, findRemoveTraps: 20, moveSilently: 15, hideInShadows: 10, detectNoise: 15, climbWalls: 60, readLanguages: 0 },
  2: { pickPockets: 35, openLocks: 29, findRemoveTraps: 25, moveSilently: 21, hideInShadows: 15, detectNoise: 15, climbWalls: 62, readLanguages: 0 },
  3: { pickPockets: 40, openLocks: 33, findRemoveTraps: 30, moveSilently: 27, hideInShadows: 20, detectNoise: 20, climbWalls: 64, readLanguages: 0 },
  4: { pickPockets: 45, openLocks: 37, findRemoveTraps: 35, moveSilently: 33, hideInShadows: 25, detectNoise: 20, climbWalls: 66, readLanguages: 0 },
  5: { pickPockets: 50, openLocks: 42, findRemoveTraps: 40, moveSilently: 40, hideInShadows: 31, detectNoise: 25, climbWalls: 68, readLanguages: 0 },
  6: { pickPockets: 55, openLocks: 47, findRemoveTraps: 45, moveSilently: 47, hideInShadows: 37, detectNoise: 25, climbWalls: 70, readLanguages: 0 },
  7: { pickPockets: 60, openLocks: 52, findRemoveTraps: 50, moveSilently: 55, hideInShadows: 43, detectNoise: 30, climbWalls: 73, readLanguages: 0 },
  8: { pickPockets: 65, openLocks: 57, findRemoveTraps: 55, moveSilently: 62, hideInShadows: 49, detectNoise: 30, climbWalls: 76, readLanguages: 0 },
  9: { pickPockets: 70, openLocks: 62, findRemoveTraps: 60, moveSilently: 70, hideInShadows: 56, detectNoise: 35, climbWalls: 79, readLanguages: 0 },
  10: { pickPockets: 75, openLocks: 67, findRemoveTraps: 65, moveSilently: 78, hideInShadows: 63, detectNoise: 35, climbWalls: 82, readLanguages: 25 },
  11: { pickPockets: 80, openLocks: 72, findRemoveTraps: 70, moveSilently: 86, hideInShadows: 70, detectNoise: 40, climbWalls: 85, readLanguages: 30 },
  12: { pickPockets: 85, openLocks: 77, findRemoveTraps: 75, moveSilently: 94, hideInShadows: 77, detectNoise: 40, climbWalls: 88, readLanguages: 35 },
  13: { pickPockets: 90, openLocks: 82, findRemoveTraps: 80, moveSilently: 99, hideInShadows: 85, detectNoise: 50, climbWalls: 91, readLanguages: 40 },
};

const getDexterityThiefModifiers = (dexterity: number) => ({
  pickPockets: dexterity >= 18 ? 15 : dexterity >= 17 ? 10 : dexterity >= 16 ? 5 : 0,
  openLocks: dexterity >= 18 ? 15 : dexterity >= 17 ? 10 : dexterity >= 16 ? 5 : 0,
  findRemoveTraps: dexterity >= 18 ? 15 : dexterity >= 17 ? 10 : dexterity >= 16 ? 5 : 0,
  moveSilently: dexterity >= 18 ? 15 : dexterity >= 17 ? 10 : dexterity >= 16 ? 5 : 0,
  hideInShadows: dexterity >= 18 ? 15 : dexterity >= 17 ? 10 : dexterity >= 16 ? 5 : 0,
  detectNoise: 0,
  climbWalls: dexterity >= 18 ? 15 : dexterity >= 17 ? 10 : dexterity >= 16 ? 5 : 0,
  readLanguages: dexterity >= 16 ? 5 : 0,
});

const getArmorThiefPenalty = (armorId: string | null) => {
  const penalties: Record<string, any> = {
    'couro-acolchoado': { pickPockets: 5, openLocks: 5, findRemoveTraps: 5, moveSilently: 10, hideInShadows: 10, climbWalls: 10 },
    'couro-batido': { pickPockets: 10, openLocks: 10, findRemoveTraps: 10, moveSilently: 20, hideInShadows: 20, climbWalls: 20 },
  };
  return penalties[armorId || ''] || { pickPockets: 0, openLocks: 0, findRemoveTraps: 0, moveSilently: 0, hideInShadows: 0, climbWalls: 0 };
};

export const calculateThiefSkills = (character: Character): ThiefSkills => {
  const level = Math.min(character.level, 13);
  const baseSkills = THIEF_SKILL_BASE_BY_LEVEL[level] || THIEF_SKILL_BASE_BY_LEVEL[1];
  const racialMods = {
    pickPockets: character.race === 'halfling' ? 5 : 0, hideInShadows: character.race === 'halfling' ? 5 : 0, detectNoise: character.race === 'halfling' ? 5 : 0,
  };
  const dexMods = getDexterityThiefModifiers(character.attributes.dexterity);
  const armorPenalty = getArmorThiefPenalty(character.equipment.armor);

  const calculate = (key: keyof ThiefSkills, hasArmorPenalty = true) => {
    const base = baseSkills[key] || 0;
    const mod = (racialMods[key as keyof typeof racialMods] || 0) + (dexMods[key as keyof typeof dexMods] || 0) - (hasArmorPenalty ? (armorPenalty[key as keyof typeof armorPenalty] || 0) : 0);
    return { base, modifiers: mod, total: Math.max(0, base + mod) };
  };

  return {
    pickPockets: calculate('pickPockets'),
    openLocks: calculate('openLocks'),
    findRemoveTraps: calculate('findRemoveTraps'),
    moveSilently: calculate('moveSilently'),
    hideInShadows: calculate('hideInShadows'),
    detectNoise: calculate('detectNoise', false),
    climbWalls: calculate('climbWalls'),
    readLanguages: calculate('readLanguages', false),
  };
};

export const calculateSpellSlots = (className: string, level: number): SpellSlots => {
  const wizardSlots: Record<number, number[]> = { 1: [1], 2: [2], 3: [2, 1], 4: [3, 2], 5: [4, 2, 1] };
  const clericSlots: Record<number, number[]> = { 1: [1], 2: [2], 3: [2, 1], 4: [3, 2], 5: [3, 3, 1] };
  let slots: number[] = [];
  if (['wizard', 'bard'].includes(className)) slots = wizardSlots[Math.min(level, 5)] || [];
  else if (['cleric', 'druid', 'paladin'].includes(className)) slots = clericSlots[Math.min(level, 5)] || [];
  return {
    level1: { current: slots[0] || 0, max: slots[0] || 0 }, level2: { current: slots[1] || 0, max: slots[1] || 0 },
    level3: { current: slots[2] || 0, max: slots[2] || 0 }, level4: { current: slots[3] || 0, max: slots[3] || 0 },
    level5: { current: slots[4] || 0, max: slots[4] || 0 }, level6: { current: slots[5] || 0, max: slots[5] || 0 },
    level7: { current: slots[6] || 0, max: slots[6] || 0 },
  };
};

export const getTurningTable = (className: string, level: number): TurningTable => {
  const effectiveLevel = className === 'paladin' ? Math.max(1, level - 2) : level;
  const table: Record<number, any> = {
    1: { skeleton: 10, zombie: 13, ghoul: 16 }, 2: { skeleton: 7, zombie: 10, ghoul: 13, shadow: 16 },
    3: { skeleton: 4, zombie: 7, ghoul: 10, shadow: 13, wight: 16 },
  };
  const turn = table[Math.min(effectiveLevel, 3)] || {};
  return {
    skeleton: turn.skeleton || 20, zombie: turn.zombie || 20, ghoul: turn.ghoul || 20, shadow: turn.shadow || 20,
    wight: turn.wight || 20, ghast: turn.ghast || 20, wraith: turn.wraith || 20, mummy: turn.mummy || 20,
    spectre: turn.spectre || 20, vampire: turn.vampire || 20, ghost: turn.ghost || 20, lich: turn.lich || 20, special: 20,
  };
};

export const getRacialAbilities = (race: string): RacialAbility[] => {
  const abilities: Record<string, RacialAbility[]> = {
    elf: [{ name: 'Infravisão', description: 'Enxerga no escuro até 18m.', passive: true }, { name: 'Resistência a Sono/Charme', description: '90% de resistência.', passive: true }],
    dwarf: [{ name: 'Infravisão', description: 'Enxerga no escuro até 18m.', passive: true }, { name: 'Detectar Construções', description: 'Bônus para detectar armadilhas de pedra, etc.', passive: true }],
    halfling: [{ name: 'Infravisão', description: 'Enxerga no escuro até 18m.', passive: true }, { name: 'Bônus com Fundas/Arcos', description: '+1 para acertar.', passive: true }],
  };
  return abilities[race] || [];
};

export const getClassAbilitiesByLevel = (className: string, level: number): ClassAbility[] => {
  const abilities: Record<string, ClassAbility[]> = {
    thief: [{ name: 'Ataque pelas Costas', description: `Multiplicador de dano x${Math.floor(level / 4) + 1}.`, levelRequired: 1, passive: false }],
    ranger: [{ name: 'Inimigo Predileto', description: '+4 para acertar o tipo de criatura escolhido.', levelRequired: 1, passive: true }],
  };
  return (abilities[className] || []).filter(ability => ability.levelRequired <= level);
};

export const getXpForLevel = (className: string, targetLevel: number): number => {
  const xpTables: Record<string, number[]> = {
    fighter: [0, 2000, 4000, 8000, 16000], thief: [0, 1250, 2500, 5000, 10000],
    wizard: [0, 2500, 5000, 10000, 20000], cleric: [0, 1500, 3000, 6000, 13000],
  };
  const table = xpTables[className] || xpTables.fighter;
  return table[targetLevel - 1] || 0;
};

export const initializeCharacterByClass = (baseCharacter: Partial<Character>, className: string, level: number): Character => {
  const features = getClassFeatures(className);
  if (!features) throw new Error(`Classe inválida: ${className}`);
  
  const character: Character = { ...baseCharacter, class: className, level: level } as Character;
  
  if (features.thiefSkills) character.thiefSkills = calculateThiefSkills(character); else delete character.thiefSkills;
  if (features.arcaneSpells || features.divineSpells) {
    character.spellSlots = calculateSpellSlots(className, level);
    character.preparedSpells = character.preparedSpells || [];
    character.knownSpells = character.knownSpells || [];
  } else {
    delete character.spellSlots; delete character.preparedSpells; delete character.knownSpells;
  }
  if (features.turningUndead) character.turningTable = getTurningTable(className, level); else delete character.turningTable;
  
  character.racialAbilities = getRacialAbilities(character.race);
  character.classAbilities = getClassAbilitiesByLevel(className, level);
  character.experience = { current: character.experience?.current || 0, forNextLevel: getXpForLevel(className, level + 1) };
  character.inventory = character.inventory || [];
  character.coins = character.coins || { copper: 0, silver: 0, electrum: 0, gold: 0, platinum: 0 };
  character.notes = character.notes || {};
  
  return character;
};

export const updateCharacterLevel = (character: Character, newLevel: number): Character => {
  const features = getClassFeatures(character.class);
  if (!features) return character;
  
  const updated = { ...character, level: newLevel };
  
  if (features.thiefSkills) updated.thiefSkills = calculateThiefSkills(updated);
  if (features.arcaneSpells || features.divineSpells) updated.spellSlots = calculateSpellSlots(updated.class, newLevel);
  if (features.turningUndead) updated.turningTable = getTurningTable(updated.class, newLevel);
  
  updated.classAbilities = getClassAbilitiesByLevel(updated.class, newLevel);
  if (updated.experience) updated.experience.forNextLevel = getXpForLevel(updated.class, newLevel + 1);
  
  return updated;
};