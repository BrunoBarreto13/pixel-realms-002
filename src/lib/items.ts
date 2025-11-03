// AD&D 2nd Edition Item Lists

export interface ArmorItem {
  id: string;
  name: string;
  mod_ca: number;
  peso: number;
  tipo: 'Armadura' | 'Escudo' | 'Elmo';
}

export interface WeaponItem {
  id: string;
  nome: string;
  num_ataques: string;
  dano: string; // e.g., "1d6/1d8"
  tipo: string; // e.g., "P" (Piercing), "C" (Cutting), "B" (Bludgeoning)
  alcance?: string; // "50/100/180"
  peso: number;
  tam: 'P' | 'M' | 'G';
  vel: number;
  categoria: 'corpo-a-corpo' | 'a-distancia' | 'arremesso';
}

export const ARMOR_LIST: ArmorItem[] = [
  { id: 'nenhuma', name: 'Sem armadura', mod_ca: 0, peso: 0, tipo: 'Armadura' },
  { id: 'couro_batido', name: 'Couro Batido', mod_ca: -2, peso: 7.5, tipo: 'Armadura' },
  { id: 'cota_malha', name: 'Cota de Malha', mod_ca: -5, peso: 15, tipo: 'Armadura' },
  { id: 'placas_completas', name: 'Placas Completas', mod_ca: -7, peso: 25, tipo: 'Armadura' },
];

export const SHIELD_LIST: ArmorItem[] = [
  { id: 'nenhum', name: 'Sem escudo', mod_ca: 0, peso: 0, tipo: 'Escudo' },
  { id: 'broquel', name: 'Broquel', mod_ca: -1, peso: 1.5, tipo: 'Escudo' },
  { id: 'escudo_pequeno', name: 'Escudo Pequeno', mod_ca: -1, peso: 2, tipo: 'Escudo' },
  { id: 'escudo_medio', name: 'Escudo Médio', mod_ca: -1, peso: 4, tipo: 'Escudo' },
];

export const HELM_LIST: ArmorItem[] = [
  { id: 'nenhum', name: 'Sem elmo', mod_ca: 0, peso: 0, tipo: 'Elmo' },
  { id: 'elmo_aberto', name: 'Elmo Aberto', mod_ca: -1, peso: 1, tipo: 'Elmo' },
  { id: 'elmo_grande', name: 'Elmo Grande', mod_ca: -1, peso: 2.5, tipo: 'Elmo' },
];

export const WEAPON_LIST: WeaponItem[] = [
  { id: 'espada_curta', nome: 'Espada Curta', num_ataques: '1/1', dano: '1d6/1d8', tipo: 'P/C', peso: 1.5, tam: 'P', vel: 3, categoria: 'corpo-a-corpo' },
  { id: 'espada_longa', nome: 'Espada Longa', num_ataques: '1/1', dano: '1d8/1d12', tipo: 'P/C', peso: 2, tam: 'M', vel: 5, categoria: 'corpo-a-corpo' },
  { id: 'arco_curto', nome: 'Arco Curto', num_ataques: '2/1', dano: '1d6/1d6', tipo: 'P', alcance: '50/100/150', peso: 1, tam: 'M', vel: 7, categoria: 'a-distancia' },
  { id: 'adaga', nome: 'Adaga', num_ataques: '1/1', dano: '1d4/1d3', tipo: 'P', alcance: '10/20/30', peso: 0.5, tam: 'P', vel: 2, categoria: 'arremesso' },
];