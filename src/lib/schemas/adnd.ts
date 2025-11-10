import { z } from "zod";

// --- Sub-schemas ---

export const AttributesSchema = z.object({
  strength: z.number().int().min(1).max(25),
  strengthPercentile: z.number().int().min(0).max(100).optional().default(0),
  dexterity: z.number().int().min(1).max(25),
  constitution: z.number().int().min(1).max(25),
  intelligence: z.number().int().min(1).max(25),
  wisdom: z.number().int().min(1).max(25),
  charisma: z.number().int().min(1).max(25),
});

export const SavingThrowsSchema = z.object({
  poison: z.number().int(),
  petrification: z.number().int(),
  rod: z.number().int(),
  breath: z.number().int(),
  spell: z.number().int(),
});

export const DamageSchema = z.object({
  small_medium: z.string(),
  large: z.string(),
});

export const EquipmentSlotSchema = z.object({
  armor: z.string().nullable(),
  shield: z.string().nullable(),
  helm: z.string().nullable(),
});

export const WeaponCategoryEnum = z.enum(['corpo-a-corpo', 'a-distancia', 'arremesso']);
export const ArmorTypeEnum = z.enum(['Armadura', 'Escudo', 'Elmo']);
export const AbilityNameEnum = z.enum(['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma']);

// --- Core Entity Schemas ---

export const ItemSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  type: z.string(), // e.g., 'potion', 'scroll', 'gem'
  weight: z.number().min(0),
  cost: z.string(), // e.g., "10 po", "5 pp"
  properties: z.array(z.string()).optional(),
  description: z.string().optional(),
  source_page: z.object({
    book: z.string(),
    page: z.number().int().positive(),
  }).optional(),
});

export const WeaponSchema = z.object({
  id: z.string(), // Using string for now, UUID if we generate them
  name: z.string(),
  cost: z.string(),
  weight: z.number().min(0),
  size: z.enum(['S', 'M', 'L']),
  type: z.string(), // e.g., 'Corte', 'Perfuração', 'Impacto'
  speed_factor: z.number().int().min(0),
  damage: DamageSchema,
  category: WeaponCategoryEnum,
  source_page: z.object({
    book: z.string(),
    page: z.number().int().positive(),
  }).optional(),
});

export const ArmorSchema = z.object({
  id: z.string(),
  name: z.string(),
  cost: z.string(),
  weight: z.number().min(0),
  armor_class: z.number().int().min(1).max(10), // AC in AD&D is lower is better
  type: ArmorTypeEnum,
  source_page: z.object({
    book: z.string(),
    page: z.number().int().positive(),
  }).optional(),
});

export const CharacterClassSchema = z.object({
  name: z.string(),
  value: z.string(), // Internal ID like 'fighter', 'wizard'
  hit_die: z.number().int().min(4).max(10),
  group: z.string().optional(), // e.g., "Homens-de-Armas"
  requisitos: z.string().optional(),
  habilidades: z.string().optional(),
  proficiency_config: z.object({
    initial: z.number().int().min(0),
    progression: z.number().int().min(1),
  }).optional(),
});

export const RaceSchema = z.object({
  name: z.string(),
  value: z.string(),
  ability_modifiers: z.record(AbilityNameEnum, z.number().int()).optional(),
  racial_language: z.string().optional(),
});

export const SpellSchema = z.object({
  name: z.string(),
  level: z.number().int().min(0).max(9),
  school: z.string(),
  range: z.string(),
  duration: z.string(),
  area_of_effect: z.string(),
  components: z.string(),
  casting_time: z.string(),
  saving_throw: z.string(),
  description: z.string(),
  class: z.enum(['wizard', 'priest']),
  source_page: z.object({
    book: z.string(),
    page: z.number().int().positive(),
  }).optional(),
});

export const ArmamentSchema = WeaponSchema.extend({
  bonus_ataque: z.number().int().optional().default(0),
  bonus_dano: z.number().int().optional().default(0),
  observacoes: z.string().optional(),
  munition: z.number().int().min(0).optional(),
});

export const GeneralSkillSchema = z.object({
  name: z.string(),
  points: z.number().int().min(0),
  ability: AbilityNameEnum.or(z.literal('')),
  modifier: z.number().int(),
});

export const ExperienceSchema = z.object({
  current: z.number().int().min(0).default(0),
  forNextLevel: z.number().int().min(0).default(0),
});

export const CharacterSchema = z.object({
  name: z.string().min(1, "Nome do personagem é obrigatório."),
  playerName: z.string().min(1, "Nome do jogador é obrigatório."),
  race: z.string().min(1, "Raça é obrigatória."),
  class: z.string().min(1, "Classe é obrigatória."),
  level: z.number().int().min(1).max(20).default(1),
  avatarUrl: z.string().url().nullable().optional(),
  attributes: AttributesSchema,
  hp: z.number().int().min(0).default(1),
  maxHp: z.number().int().min(1).default(1),
  equipment: EquipmentSlotSchema,
  initiative: z.number().int().optional().default(0),
  savingThrows: SavingThrowsSchema.optional(), // Can be calculated
  alignment: z.string().optional(),
  hair: z.string().optional(),
  eyes: z.string().optional(),
  weight: z.string().optional(),
  height: z.string().optional(),
  age: z.number().int().min(0).optional().default(20),
  color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).default("#4789c7"),
  armaments: z.array(ArmamentSchema).optional().default([]),
  generalSkills: z.array(GeneralSkillSchema).optional().default([]),
  languages: z.array(z.string()).optional().default([]),
  experience: ExperienceSchema.optional().default({ current: 0, forNextLevel: 0 }),
});