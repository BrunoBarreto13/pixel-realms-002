import { z } from "zod";
import {
  SpellSchema,
  RaceSchema,
  CharacterClassSchema,
  WeaponSchema,
  ArmorSchema,
  AttributesSchema,
  SavingThrowsSchema,
  ArmamentSchema,
  GeneralSkillSchema,
  EquipmentSlotSchema,
  ExperienceSchema,
  CharacterSchema,
} from "@/lib/schemas/adnd";

// Export Zod types
export type Spell = z.infer<typeof SpellSchema>;
export type Race = z.infer<typeof RaceSchema>;
export type CharacterClass = z.infer<typeof CharacterClassSchema>;
export type Weapon = z.infer<typeof WeaponSchema>;
export type Armor = z.infer<typeof ArmorSchema>;
export type Attributes = z.infer<typeof AttributesSchema>;
export type SavingThrows = z.infer<typeof SavingThrowsSchema>;
export type Armament = z.infer<typeof ArmamentSchema>;
export type GeneralSkill = z.infer<typeof GeneralSkillSchema>;
export type Equipment = z.infer<typeof EquipmentSlotSchema>;
export type Experience = z.infer<typeof ExperienceSchema>;
export type Character = z.infer<typeof CharacterSchema>;

// Existing proficiency config (can be moved into CharacterClassSchema later if desired)
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