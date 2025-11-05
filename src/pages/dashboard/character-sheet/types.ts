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
  munition?: number;
}

export interface GeneralSkill {
  name: string;
  points: number;
  ability: 'strength' | 'dexterity' | 'constitution' | 'intelligence' | 'wisdom' | 'charisma' | '';
  modifier: number;
  notes: string;
}

export interface Equipment {
  armor: string | null;
  shield: string | null;
  helm: string | null;
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