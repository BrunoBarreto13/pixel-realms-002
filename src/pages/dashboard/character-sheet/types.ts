import { WeaponItem } from "@/lib/items";

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

export interface Armament extends WeaponItem {
  bonus_ataque?: number;
  bonus_dano?: number;
  observacoes?: string;
  munition?: number;
}

export interface GeneralSkill {
  name: string;
  category: string;
  level: string;
  notes: string;
}

export interface Equipment {
  armor: string | null; // Stores the ID of the equipped armor
  shield: string | null;
  helm: string | null;
  // We can add slots for rings, cloaks, etc. later
}

export interface Character {
  name: string;
  playerName: string;
  race: string;
  class: string;
  level: number;
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
}

export const RACES = [
  { value: "human", label: "Humano", modifiers: {} },
  { value: "elf", label: "Elfo", modifiers: { dexterity: 1, constitution: -1 } },
  { value: "dwarf", label: "Anão", modifiers: { constitution: 1, charisma: -1 } },
  { value: "halfling", label: "Halfling", modifiers: { dexterity: 1, strength: -1 } },
  { value: "gnome", label: "Gnomo", modifiers: { intelligence: 1, wisdom: -1 } },
  { value: "half-elf", label: "Meio-Elfo", modifiers: {} },
  { value: "half-orc", label: "Meio-Orc", modifiers: { strength: 1, charisma: -2, constitution: 1 } },
];

export const CLASSES = [
  { value: "fighter", label: "Guerreiro", hitDie: 10 },
  { value: "wizard", label: "Mago", hitDie: 4 },
  { value: "cleric", label: "Clérigo", hitDie: 8 },
  { value: "thief", label: "Ladrão", hitDie: 6 },
  { value: "ranger", label: "Patrulheiro", hitDie: 10 },
  { value: "paladin", label: "Paladino", hitDie: 10 },
  { value: "druid", label: "Druida", hitDie: 8 },
  { value: "bard", label: "Bardo", hitDie: 6 },
];

// --- AD&D 2e Proficiency Rules ---
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