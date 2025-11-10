import { z } from "zod";

// Helper schemas for nested objects
const AttributesSchema = z.object({
  strength: z.number().int().min(1).max(25),
  strengthPercentile: z.number().int().min(0).max(100).optional(),
  dexterity: z.number().int().min(1).max(25),
  constitution: z.number().int().min(1).max(25),
  intelligence: z.number().int().min(1).max(25),
  wisdom: z.number().int().min(1).max(25),
  charisma: z.number().int().min(1).max(25),
});

const SavingThrowsSchema = z.object({
  poison: z.number().int(),
  petrification: z.number().int(),
  rod: z.number().int(),
  breath: z.number().int(),
  spell: z.number().int(),
});

const EquipmentSchema = z.object({
  armor: z.string().nullable(),
  shield: z.string().nullable(),
  helm: z.string().nullable(),
});

const DamageSchema = z.object({
  small_medium: z.string(),
  large: z.string(),
});

const CoinageSchema = z.object({
  copper: z.number().int().min(0),
  silver: z.number().int().min(0),
  electrum: z.number().int().min(0),
  gold: z.number().int().min(0),
  platinum: z.number().int().min(0),
});

const GeneralSkillSchema = z.object({
  name: z.string().min(1, "Nome da perícia é obrigatório"),
  points: z.number().int().min(0),
  ability: z.enum(['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma', '']).optional(),
  modifier: z.number().int().optional(),
});

const ArmamentSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Nome do armamento é obrigatório"),
  cost: z.string(),
  weight: z.number().min(0),
  size: z.enum(['S', 'M', 'L']),
  type: z.string(),
  speed_factor: z.number().int(),
  damage: DamageSchema,
  category: z.enum(['corpo-a-corpo', 'a-distancia', 'arremesso']),
  bonus_ataque: z.number().int().optional(),
  bonus_dano: z.number().int().optional(),
  observacoes: z.string().optional(),
  num_ataques: z.string().optional(),
});

const ExperienceSchema = z.object({
  current: z.number().int().min(0),
  forNextLevel: z.number().int().min(0),
});

const RacialAbilitySchema = z.object({
  name: z.string(),
  description: z.string(),
  passive: z.boolean(),
  usesPerDay: z.number().int().optional(),
});

const ClassAbilitySchema = z.object({
  name: z.string(),
  description: z.string(),
  levelRequired: z.number().int().min(1),
  passive: z.boolean(),
});

const ThiefSkillDetailSchema = z.object({
  base: z.number().int(),
  modifiers: z.number().int(),
  total: z.number().int(),
});

const ThiefSkillsSchema = z.object({
  pickPockets: ThiefSkillDetailSchema,
  openLocks: ThiefSkillDetailSchema,
  findRemoveTraps: ThiefSkillDetailSchema,
  moveSilently: ThiefSkillDetailSchema,
  hideInShadows: ThiefSkillDetailSchema,
  detectNoise: ThiefSkillDetailSchema,
  climbWalls: ThiefSkillDetailSchema,
  readLanguages: ThiefSkillDetailSchema,
});

const SpellSlotInfoSchema = z.object({
  current: z.number().int().min(0),
  max: z.number().int().min(0),
});

const SpellSlotsSchema = z.object({
  level1: SpellSlotInfoSchema.optional(),
  level2: SpellSlotInfoSchema.optional(),
  level3: SpellSlotInfoSchema.optional(),
  level4: SpellSlotInfoSchema.optional(),
  level5: SpellSlotInfoSchema.optional(),
  level6: SpellSlotInfoSchema.optional(),
  level7: SpellSlotInfoSchema.optional(),
  level8: SpellSlotInfoSchema.optional(),
  level9: SpellSlotInfoSchema.optional(),
});

const TurningTableSchema = z.object({
  skeleton: z.number().int(),
  zombie: z.number().int(),
  ghoul: z.number().int(),
  shadow: z.number().int(),
  wight: z.number().int(),
  ghast: z.number().int(),
  wraith: z.number().int(),
  mummy: z.number().int(),
  spectre: z.number().int(),
  vampire: z.number().int(),
  ghost: z.number().int(),
  lich: z.number().int(),
  special: z.number().int(),
});

const FollowerSchema = z.object({
  name: z.string(),
  level: z.number().int().min(1),
  thac0: z.number().int(),
  ac: z.number().int(),
  hp: z.number().int(),
  movement: z.string(),
  notes: z.string(),
});

const NotesSchema = z.object({
  general: z.string().optional(),
  history: z.string().optional(),
  magicItems: z.string().optional(),
  potions: z.string().optional(),
  jewels: z.string().optional(),
  followers: z.string().optional(), // Stored as JSON string
  animals: z.string().optional(),   // Stored as JSON string
});

// Main Character Schema
export const CharacterSchema = z.object({
  name: z.string().min(1, "Nome do personagem é obrigatório"),
  playerName: z.string().min(1, "Nome do jogador é obrigatório"),
  race: z.string().min(1, "Raça é obrigatória"),
  class: z.string().min(1, "Classe é obrigatória"),
  level: z.number().int().min(1).max(20),
  avatarUrl: z.string().url().nullable(),
  attributes: AttributesSchema,
  hp: z.number().int().min(0),
  maxHp: z.number().int().min(1),
  equipment: EquipmentSchema,
  initiative: z.number().int(),
  savingThrows: SavingThrowsSchema,
  alignment: z.string(),
  hair: z.string().optional(),
  eyes: z.string().optional(),
  weight: z.string().optional(),
  height: z.string().optional(),
  age: z.number().int().min(0).optional(),
  color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/), // Hex color
  armaments: z.array(ArmamentSchema),
  generalSkills: z.array(GeneralSkillSchema),
  languages: z.array(z.string()),
  inventory: z.array(z.string()),
  scrolls: z.array(z.string()).optional(),
  coins: CoinageSchema,
  notes: NotesSchema,
  experience: ExperienceSchema,

  // Optional class-specific fields
  thiefSkills: ThiefSkillsSchema.optional(),
  spellSlots: SpellSlotsSchema.optional(),
  preparedSpells: z.array(z.any()).optional(), // Placeholder, can be more specific later
  knownSpells: z.array(z.any()).optional(),    // Placeholder, can be more specific later
  spellSchool: z.string().optional(),
  turningTable: TurningTableSchema.optional(),
  trackingAbility: z.any().optional(), // Placeholder
  enemyType: z.string().optional(),
  bardAbilities: z.any().optional(),   // Placeholder
  racialAbilities: z.array(RacialAbilitySchema).optional(),
  classAbilities: z.array(ClassAbilitySchema).optional(),
});

// Weapon Schema (already covered by ArmamentSchema, but can be used for base weapons)
export const WeaponSchema = z.object({
  id: z.string(),
  name: z.string(),
  cost: z.string(),
  weight: z.number().min(0),
  size: z.enum(['S', 'M', 'L']),
  type: z.string(),
  speed_factor: z.number().int(),
  damage: DamageSchema,
  category: z.enum(['corpo-a-corpo', 'a-distancia', 'arremesso']),
});

// Armor Schema
export const ArmorSchema = z.object({
  id: z.string(),
  name: z.string(),
  cost: z.string(),
  weight: z.number().min(0),
  armor_class: z.number().int().min(1).max(10),
  type: z.enum(['Armadura', 'Escudo', 'Elmo']),
});

// Generic Item Schema (for inventory items not covered by Weapon/Armor)
export const ItemSchema = z.object({
  id: z.string().optional(), // ID might be generated or not present for generic items
  name: z.string().min(1, "Nome do item é obrigatório"),
  description: z.string().optional(),
  weight: z.number().min(0).optional(),
  value: z.string().optional(), // e.g., "10 po", "5 pp"
  properties: z.array(z.string()).optional(),
  source: z.object({
    book: z.string(),
    page: z.number().int().positive()
  }).optional(),
});

// Spell Schema (as provided in your example, with minor adjustments for consistency)
export const SpellSchema = z.object({
  id: z.string().optional(), // Can be UUID or simple string
  name: z.string().min(1, "Nome da magia é obrigatório"),
  level: z.number().int().min(0).max(9),
  school: z.string().optional(),
  casting_time: z.string().optional(),
  range: z.string().optional(),
  duration: z.string().optional(),
  area_of_effect: z.string().optional(),
  components: z.string().optional(), // Changed to string as per existing data, can be array if needed
  description: z.string().optional(),
  class: z.enum(['wizard', 'priest']).optional(), // Added class restriction
  source: z.object({
    book: z.string(),
    page: z.number().int().positive()
  }).optional()
});