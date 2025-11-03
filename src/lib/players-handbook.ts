import handbookData from './players-handbook.json';

// --- TYPE DEFINITIONS ---

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

// --- EXPORTED DATA ---

export const PHB_SPELLS: { arcane: Spell[], divine: Spell[] } = handbookData.spells;

export const PHB_RACES: Race[] = handbookData.races.map(race => ({
  ...race,
  value: race.name.toLowerCase().replace(/ /g, '_'),
}));

export const PHB_CLASSES: CharacterClass[] = handbookData.classes.map(cls => ({
  ...cls,
  value: cls.name.toLowerCase().replace(/ /g, '_'),
}));

const equipment = handbookData.equipment;

export const PHB_WEAPONS: Weapon[] = equipment.weapons.map(w => ({
  ...w,
  id: w.name.toLowerCase().replace(/ /g, '_'),
}));

const allArmor: Armor[] = equipment.armor.map((a: any) => ({
  ...a,
  id: a.name.toLowerCase().replace(/ /g, '_'),
  type: a.name.includes('Escudo') ? 'Escudo' : a.name.includes('Elmo') ? 'Elmo' : 'Armadura',
}));

export const PHB_ARMOR_LIST: Armor[] = [
  { name: 'Sem armadura', cost: '0', weight: 0, armor_class: 10, id: 'nenhuma', type: 'Armadura' },
  ...allArmor.filter(a => a.type === 'Armadura')
];

export const PHB_SHIELD_LIST: Armor[] = [
  { name: 'Sem escudo', cost: '0', weight: 0, armor_class: 10, id: 'nenhum', type: 'Escudo' },
  ...allArmor.filter(a => a.type === 'Escudo')
];

export const PHB_HELM_LIST: Armor[] = [
  { name: 'Sem elmo', cost: '0', weight: 0, armor_class: 10, id: 'nenhum', type: 'Elmo' },
  ...allArmor.filter(a => a.type === 'Elmo')
];