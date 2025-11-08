export interface Spell {
  name: string;
  level: number;
  school: string;
  range: string;
  duration: string;
  area_of_effect: string;
  components: string;
  casting_time: string;
  saving_throw: string;
  description: string;
  class: 'wizard' | 'priest';
}

export interface Race {
  name: string;
  value: string;
  ability_modifiers: { [key: string]: number };
  racial_language?: string;
}

export interface CharacterClass {
  name: string;
  value: string;
  hit_die: number;
}

export interface Weapon {
  name: string;
  cost: string;
  weight: number;
  size: 'S' | 'M' | 'L';
  type: string;
  speed_factor: number;
  damage: {
    small_medium: string;
    large: string;
  };
  category: 'corpo-a-corpo' | 'a-distancia' | 'arremesso';
  id: string;
}

export interface Armor {
  name: string;
  cost: string;
  weight: number;
  armor_class: number;
  id: string;
  type: 'Armadura' | 'Escudo' | 'Elmo';
}

export interface Attributes {
  strength: number;
  strengthPercentile: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export interface SavingThrows {
  poison: number;
  petrification: number;
  rod: number;
  breath: number;
  spell: number;
}

export interface Armament extends Weapon {
  bonus_ataque?: number;
  bonus_dano?: number;
  observacoes?: string;
  num_ataques?: string;
}

export interface GeneralSkill {
  name: string;
  points: number;
  ability: 'strength' | 'dexterity' | 'constitution' | 'intelligence' | 'wisdom' | 'charisma' | '';
  modifier: number;
}

export interface Equipment {
  armor: string | null;
  shield: string | null;
  helm: string | null;
}

export interface ThiefSkillDetail {
  base: number;
  modifiers: number;
  total: number;
}

export interface ThiefSkills {
  pickPockets: ThiefSkillDetail;
  openLocks: ThiefSkillDetail;
  findRemoveTraps: ThiefSkillDetail;
  moveSilently: ThiefSkillDetail;
  hideInShadows: ThiefSkillDetail;
  detectNoise: ThiefSkillDetail;
  climbWalls: ThiefSkillDetail;
  readLanguages: ThiefSkillDetail;
}

export interface SpellSlotInfo {
  current: number;
  max: number;
}

export interface SpellSlots {
  level1: SpellSlotInfo;
  level2: SpellSlotInfo;
  level3: SpellSlotInfo;
  level4: SpellSlotInfo;
  level5: SpellSlotInfo;
  level6: SpellSlotInfo;
  level7: SpellSlotInfo;
  level8?: SpellSlotInfo;
  level9?: SpellSlotInfo;
}

export interface TurningTable {
  skeleton: number;
  zombie: number;
  ghoul: number;
  shadow: number;
  wight: number;
  ghast: number;
  wraith: number;
  mummy: number;
  spectre: number;
  vampire: number;
  ghost: number;
  lich: number;
  special: number;
}

export interface Experience {
  current: number;
  forNextLevel: number;
}

export interface RacialAbility {
  name: string;
  description: string;
  passive: boolean;
  usesPerDay?: number;
}

export interface ClassAbility {
  name: string;
  description: string;
  levelRequired: number;
  passive: boolean;
}

export interface TrackingAbility {
  baseChance: number;
  terrainModifier: number;
  conditionsModifier: number;
  total: number;
}

export interface BardAbilities {
  music: {
    counterSong: boolean;
    fascinateCreatures: boolean;
    inspireCourage: {
      bonus: number;
      duration: string;
    };
  };
  lore: {
    baseChance: number;
  };
  influence: {
    reactionBonus: number;
  };
}

export interface Coinage {
  copper: number;
  silver: number;
  electrum: number;
  gold: number;
  platinum: number;
}

export interface Follower {
  name: string;
  level: number;
  thac0: number;
  ac: number;
  hp: number;
  movement: string;
  notes: string;
}

export interface Character {
  name: string;
  playerName: string;
  race: string;
  class: string;
  level: number;
  avatarUrl: string | null;
  attributes: Attributes;
  hp: number;
  maxHp: number;
  equipment: Equipment;
  initiative: number;
  savingThrows: SavingThrows;
  alignment: string;
  hair: string;
  eyes: string;
  weight: string;
  height: string;
  age: number;
  color: string;
  armaments: Armament[];
  generalSkills: GeneralSkill[];
  languages: string[];

  // New core fields
  experience: Experience;

  // New optional fields
  thiefSkills?: ThiefSkills;
  spellSlots?: SpellSlots;
  preparedSpells?: Spell[];
  knownSpells?: Spell[];
  spellSchool?: string;
  turningTable?: TurningTable;
  trackingAbility?: TrackingAbility;
  enemyType?: string;
  bardAbilities?: BardAbilities;
  racialAbilities?: RacialAbility[];
  classAbilities?: ClassAbility[];
  
  // Inventory and Money
  inventory: string[]; // SEÇÃO 12: EQUIPAMENTO
  scrolls: string[]; // SEÇÃO 16: PERGAMINHOS
  coins: Coinage; // SEÇÃO 13: DINHEIRO
  
  // Notes (used for Magic Items, Potions, Jewels, General, History, Allies, Animals)
  notes: {
    general: string;
    history: string;
    magicItems: string;
    potions: string;
    jewels: string;
    followers?: string; // JSON string of Follower[]
    animals?: string; // JSON string of Follower[]
  };
}

export const proficiencyConfig: { [key: string]: { initial: number; progression: number } } = {
  fighter: { initial: 4, progression: 3 },
  paladin: { initial: 4, progression: 3 },
  ranger: { initial: 3, progression: 3 },
  thief: { initial: 2, progression: 4 },
  bard: { initial: 2, progression: 4 },
  cleric: { initial: 2, progression: 4 },
  druid: { initial: 2, progression: 4 },
  wizard: { initial: 1, progression: 6 },
};

export const calculateProficiencyPoints = (className: string, level: number): number => {
  const config = proficiencyConfig[className];
  if (!config) return 0;
  return config.initial + Math.floor((level - 1) / config.progression);
};