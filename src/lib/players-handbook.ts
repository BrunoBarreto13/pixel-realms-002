import handbookData from './players-handbook.json';
import type { Spell, Race, CharacterClass, Weapon, Armor } from '@/pages/dashboard/character-sheet/types';

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