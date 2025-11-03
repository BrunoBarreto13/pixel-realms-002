// AD&D 2nd Edition Rules Engine

// --- ATTRIBUTE TABLES ---

const STRENGTH_TABLE = [
  { valor: 3,  chance_acertar: -3, ajuste_dano: -1, carga_permitida: 15,  sustentacao_max: 30,   abrir_portas: "1 em 20",  barras_portais: "0%" },
  { valor: 4,  chance_acertar: -2, ajuste_dano: -1, carga_permitida: 20,  sustentacao_max: 45,   abrir_portas: "1 em 20",  barras_portais: "0%" },
  { valor: 5,  chance_acertar: -2, ajuste_dano: -1, carga_permitida: 25,  sustentacao_max: 60,   abrir_portas: "1 em 20",  barras_portais: "0%" },
  { valor: 6,  chance_acertar: -1, ajuste_dano: 0,  carga_permitida: 30,  sustentacao_max: 70,   abrir_portas: "2 em 20",  barras_portais: "0%" },
  { valor: 7,  chance_acertar: -1, ajuste_dano: 0,  carga_permitida: 35,  sustentacao_max: 85,   abrir_portas: "2 em 20",  barras_portais: "1%" },
  { valor: 8,  chance_acertar: -1, ajuste_dano: 0,  carga_permitida: 40,  sustentacao_max: 100,  abrir_portas: "2 em 20",  barras_portais: "1%" },
  { valor: 9,  chance_acertar: 0,  ajuste_dano: 0,  carga_permitida: 45,  sustentacao_max: 115,  abrir_portas: "3 em 20",  barras_portais: "2%" },
  { valor: 10, chance_acertar: 0,  ajuste_dano: 0,  carga_permitida: 50,  sustentacao_max: 125,  abrir_portas: "3 em 20",  barras_portais: "4%" },
  { valor: 11, chance_acertar: 0,  ajuste_dano: 0,  carga_permitida: 55,  sustentacao_max: 140,  abrir_portas: "4 em 20",  barras_portais: "6%" },
  { valor: 12, chance_acertar: 0,  ajuste_dano: 0,  carga_permitida: 60,  sustentacao_max: 155,  abrir_portas: "4 em 20",  barras_portais: "9%" },
  { valor: 13, chance_acertar: 0,  ajuste_dano: 0,  carga_permitida: 65,  sustentacao_max: 170,  abrir_portas: "5 em 20",  barras_portais: "13%" },
  { valor: 14, chance_acertar: 0,  ajuste_dano: 0,  carga_permitida: 70,  sustentacao_max: 185,  abrir_portas: "5 em 20",  barras_portais: "16%" },
  { valor: 15, chance_acertar: 0,  ajuste_dano: 1,  carga_permitida: 80,  sustentacao_max: 195,  abrir_portas: "6 em 20",  barras_portais: "20%" },
  { valor: 16, chance_acertar: 0,  ajuste_dano: 1,  carga_permitida: 90,  sustentacao_max: 205,  abrir_portas: "7 em 20",  barras_portais: "25%" },
  { valor: 17, chance_acertar: 1,  ajuste_dano: 1,  carga_permitida: 100, sustentacao_max: 220,  abrir_portas: "8 em 20",  barras_portais: "33%" },
  { valor: 18,
    normal: { chance_acertar: 1, ajuste_dano: 2, carga_permitida: 110, sustentacao_max: 255, abrir_portas: "10 em 20", barras_portais: "50%" },
    extraordinaria: [
      { faixa: "18/01-50", chance_acertar: 1, ajuste_dano: 3, carga_permitida: 135, sustentacao_max: 280, abrir_portas: "12 em 20", barras_portais: "60%" },
      { faixa: "18/51-75", chance_acertar: 2, ajuste_dano: 4, carga_permitida: 160, sustentacao_max: 305, abrir_portas: "14 em 20", barras_portais: "70%" },
      { faixa: "18/76-90", chance_acertar: 2, ajuste_dano: 5, carga_permitida: 185, sustentacao_max: 330, abrir_portas: "16 em 20", barras_portais: "80%" },
      { faixa: "18/91-99", chance_acertar: 3, ajuste_dano: 6, carga_permitida: 235, sustentacao_max: 380, abrir_portas: "18 em 20", barras_portais: "90%" },
      { faixa: "18/00", chance_acertar: 3, ajuste_dano: 7, carga_permitida: 335, sustentacao_max: 480, abrir_portas: "20 em 20", barras_portais: "100%" }
    ]
  },
  { valor: 19, chance_acertar: 3, ajuste_dano: 7, carga_permitida: 485, sustentacao_max: 640, abrir_portas: "20 em 20", barras_portais: "100%" },
  { valor: 20, chance_acertar: 3, ajuste_dano: 8, carga_permitida: 535, sustentacao_max: 700, abrir_portas: "20 em 20", barras_portais: "100%" },
  { valor: 21, chance_acertar: 4, ajuste_dano: 9, carga_permitida: 635, sustentacao_max: 810, abrir_portas: "20 em 20", barras_portais: "100%" },
  { valor: 22, chance_acertar: 4, ajuste_dano: 10, carga_permitida: 785, sustentacao_max: 970, abrir_portas: "20 em 20", barras_portais: "100%" },
  { valor: 23, chance_acertar: 5, ajuste_dano: 11, carga_permitida: 935, sustentacao_max: 1130, abrir_portas: "20 em 20", barras_portais: "100%" },
  { valor: 24, chance_acertar: 6, ajuste_dano: 12, carga_permitida: 1235, sustentacao_max: 1450, abrir_portas: "20 em 20", barras_portais: "100%" },
  { valor: 25, chance_acertar: 7, ajuste_dano: 14, carga_permitida: 1535, sustentacao_max: 1770, abrir_portas: "20 em 20", barras_portais: "100%" }
];

export const getStrengthBonuses = (score: number, percentile: number = 0) => {
  const defaultBonuses = { hit: 0, dmg: 0, weight: 0, press: 0, openDoors: "0 em 20", bendBars: "0%" };

  const clampedScore = Math.max(3, Math.min(25, score));
  const entry = STRENGTH_TABLE.find(e => e.valor === clampedScore);

  if (!entry) return defaultBonuses;

  let bonuses;
  if (clampedScore === 18) {
    if (percentile > 0 && entry.extraordinaria) {
      if (percentile <= 50) bonuses = entry.extraordinaria[0];
      else if (percentile <= 75) bonuses = entry.extraordinaria[1];
      else if (percentile <= 90) bonuses = entry.extraordinaria[2];
      else if (percentile <= 99) bonuses = entry.extraordinaria[3];
      else bonuses = entry.extraordinaria[4]; // 18/00
    } else {
      bonuses = entry.normal;
    }
  } else {
    bonuses = entry;
  }

  return {
    hit: bonuses.chance_acertar,
    dmg: bonuses.ajuste_dano,
    weight: bonuses.carga_permitida,
    press: bonuses.sustentacao_max,
    openDoors: bonuses.abrir_portas,
    bendBars: bonuses.barras_portais,
  };
};

export const getDexterityBonuses = (score: number) => {
  if (score <= 3) return { reaction: -3, missile: -3, defense: 4 };
  if (score === 4) return { reaction: -2, missile: -2, defense: 3 };
  if (score === 5) return { reaction: -1, missile: -1, defense: 2 };
  if (score === 6) return { reaction: 0, missile: 0, defense: 1 };
  if (score <= 14) return { reaction: 0, missile: 0, defense: 0 };
  if (score === 15) return { reaction: 0, missile: 0, defense: -1 };
  if (score === 16) return { reaction: 1, missile: 1, defense: -2 };
  if (score === 17) return { reaction: 2, missile: 2, defense: -3 };
  if (score >= 18) return { reaction: 2, missile: 2, defense: -4 };
  return { reaction: 0, missile: 0, defense: 0 };
};

export const getConstitutionBonuses = (score: number) => {
  if (score === 1) return { hp: -3, shock: 25, resurrect: 30, poison: -2, regen: 0 };
  if (score === 2) return { hp: -2, shock: 30, resurrect: 35, poison: -1, regen: 0 };
  if (score === 3) return { hp: -2, shock: 35, resurrect: 40, poison: 0, regen: 0 };
  if (score <= 6) return { hp: -1, shock: 50, resurrect: 55, poison: 0, regen: 0 };
  if (score <= 14) return { hp: 0, shock: 90, resurrect: 95, poison: 0, regen: 0 };
  if (score === 15) return { hp: 1, shock: 95, resurrect: 98, poison: 0, regen: 0 };
  if (score === 16) return { hp: 2, shock: 97, resurrect: 99, poison: 0, regen: 0 };
  if (score === 17) return { hp: 2, shock: 99, resurrect: 100, poison: 0, regen: 0 }; // +3 for fighters
  if (score === 18) return { hp: 2, shock: 99, resurrect: 100, poison: 0, regen: 0 }; // +4 for fighters
  if (score >= 19) return { hp: 2, shock: 99, resurrect: 100, poison: 1, regen: 1 }; // +5 for fighters
  return { hp: 0, shock: 0, resurrect: 0, poison: 0, regen: 0 };
};

export const getIntelligenceBonuses = (score: number) => {
  if (score <= 1) return { languages: 0, spellLvl: 0, learn: 0, maxSpells: 0, illusionImmunity: 0 };
  if (score <= 8) return { languages: 1, spellLvl: 4, learn: 35, maxSpells: 6, illusionImmunity: 0 };
  if (score === 9) return { languages: 2, spellLvl: 5, learn: 45, maxSpells: 7, illusionImmunity: 0 };
  if (score <= 11) return { languages: 3, spellLvl: 6, learn: 55, maxSpells: 7, illusionImmunity: 0 };
  if (score <= 13) return { languages: 4, spellLvl: 7, learn: 65, maxSpells: 9, illusionImmunity: 0 };
  if (score === 14) return { languages: 5, spellLvl: 7, learn: 75, maxSpells: 11, illusionImmunity: 0 };
  if (score === 15) return { languages: 6, spellLvl: 8, learn: 85, maxSpells: 11, illusionImmunity: 0 };
  if (score === 16) return { languages: 7, spellLvl: 8, learn: 95, maxSpells: 14, illusionImmunity: 0 };
  if (score === 17) return { languages: 8, spellLvl: 9, learn: 99, maxSpells: 14, illusionImmunity: 0 };
  if (score === 18) return { languages: 9, spellLvl: 9, learn: 100, maxSpells: 18, illusionImmunity: 0 };
  if (score >= 19) return { languages: 10, spellLvl: 9, learn: 100, maxSpells: 99, illusionImmunity: 1 };
  return { languages: 0, spellLvl: 0, learn: 0, maxSpells: 0, illusionImmunity: 0 };
};

export const getWisdomBonuses = (score: number) => {
  if (score <= 3) return { magicDef: -3, bonusSpells: [], failure: 50, immunity: 0 };
  if (score === 4) return { magicDef: -2, bonusSpells: [], failure: 45, immunity: 0 };
  if (score === 5) return { magicDef: -1, bonusSpells: [], failure: 40, immunity: 0 };
  if (score === 8) return { magicDef: 0, bonusSpells: [], failure: 20, immunity: 0 };
  if (score <= 12) return { magicDef: 0, bonusSpells: [], failure: 0, immunity: 0 };
  if (score === 13) return { magicDef: 0, bonusSpells: [1], failure: 0, immunity: 0 };
  if (score === 14) return { magicDef: 0, bonusSpells: [2], failure: 0, immunity: 0 };
  if (score === 15) return { magicDef: 1, bonusSpells: [2, 1], failure: 0, immunity: 0 };
  if (score === 16) return { magicDef: 2, bonusSpells: [2, 2], failure: 0, immunity: 0 };
  if (score === 17) return { magicDef: 3, bonusSpells: [2, 2, 1], failure: 0, immunity: 0 };
  if (score >= 18) return { magicDef: 4, bonusSpells: [2, 2, 1, 1], failure: 0, immunity: 0 };
  return { magicDef: 0, bonusSpells: [], failure: 0, immunity: 0 };
};

export const getCharismaBonuses = (score: number) => {
  if (score === 1) return { henchmen: 0, loyalty: -8, reaction: -7 };
  if (score === 2) return { henchmen: 1, loyalty: -7, reaction: -6 };
  if (score <= 4) return { henchmen: 1, loyalty: -6, reaction: -5 };
  if (score === 5) return { henchmen: 2, loyalty: -5, reaction: -4 };
  if (score === 6) return { henchmen: 2, loyalty: -4, reaction: -3 };
  if (score === 7) return { henchmen: 3, loyalty: -3, reaction: -2 };
  if (score === 8) return { henchmen: 3, loyalty: -2, reaction: -1 };
  if (score <= 12) return { henchmen: 4, loyalty: 0, reaction: 0 };
  if (score === 13) return { henchmen: 5, loyalty: 0, reaction: 1 };
  if (score === 14) return { henchmen: 6, loyalty: 1, reaction: 2 };
  if (score === 15) return { henchmen: 7, loyalty: 3, reaction: 3 };
  if (score === 16) return { henchmen: 8, loyalty: 4, reaction: 5 };
  if (score === 17) return { henchmen: 10, loyalty: 6, reaction: 6 };
  if (score >= 18) return { henchmen: 15, loyalty: 8, reaction: 7 };
  return { henchmen: 0, loyalty: 0, reaction: 0 };
};

// --- THAC0 ---

const WARRIOR_THAC0 = [20, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
const WIZARD_THAC0 = [20, 20, 20, 20, 20, 19, 19, 19, 19, 19, 18, 18, 18, 18, 18, 17, 17, 17, 17, 17, 16];
const PRIEST_THAC0 = [20, 20, 20, 20, 19, 19, 19, 18, 18, 18, 17, 17, 17, 16, 16, 16, 15, 15, 15, 14, 14];
const ROGUE_THAC0 = [20, 20, 20, 20, 19, 19, 19, 19, 18, 18, 18, 18, 17, 17, 17, 17, 16, 16, 16, 16, 15];

export const getThac0 = (className: string, level: number): number => {
  const lvlIndex = Math.min(level, WARRIOR_THAC0.length - 1);
  switch (className) {
    case "fighter":
    case "paladin":
    case "ranger":
      return WARRIOR_THAC0[lvlIndex];
    case "wizard":
      return WIZARD_THAC0[lvlIndex];
    case "cleric":
    case "druid":
      return PRIEST_THAC0[lvlIndex];
    case "thief":
    case "bard":
      return ROGUE_THAC0[lvlIndex];
    default:
      return 20;
  }
};