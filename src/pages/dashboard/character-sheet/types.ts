import { Weapon } from "@/lib/players-handbook";

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
  category: string;
  level: string;
  notes: string;
}

export interface Equipment {
  armor: string | null; // Stores the ID of the equipped armor
  shield: string | null;
  helm: string | null;
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