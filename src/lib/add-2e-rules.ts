// AD&D 2nd Edition Rules Engine

// --- ATTRIBUTE TABLES ---

const STRENGTH_TABLE = [
  { valor: 1,  chance_acertar: -5, ajuste_dano: -4, carga_permitida: 1,   sustentacao_max: 3,    abrir_portas: "1",  barras_portais: "0%" },
  { valor: 2,  chance_acertar: -3, ajuste_dano: -2, carga_permitida: 5,   sustentacao_max: 10,   abrir_portas: "1",  barras_portais: "0%" },
  { valor: 3,  chance_acertar: -3, ajuste_dano: -1, carga_permitida: 10,  sustentacao_max: 25,   abrir_portas: "2",  barras_portais: "0%" },
  { valor: 4,  chance_acertar: -2, ajuste_dano: -1, carga_permitida: 20,  sustentacao_max: 55,   abrir_portas: "3",  barras_portais: "0%" },
  { valor: 5,  chance_acertar: -2, ajuste_dano: -1, carga_permitida: 20,  sustentacao_max: 55,   abrir_portas: "3",  barras_portais: "0%" },
  { valor: 6,  chance_acertar: -1, ajuste_dano: 0,  carga_permitida: 30,  sustentacao_max: 70,   abrir_portas: "4",  barras_portais: "0%" },
  { valor: 7,  chance_acertar: -1, ajuste_dano: 0,  carga_permitida: 30,  sustentacao_max: 70,   abrir_portas: "4",  barras_portais: "0%" },
  { valor: 8,  chance_acertar: 0,  ajuste_dano: 0,  carga_permitida: 35,  sustentacao_max: 90,   abrir_portas: "5",  barras_portais: "1%" },
  { valor: 9,  chance_acertar: 0,  ajuste_dano: 0,  carga_permitida: 35,  sustentacao_max: 90,   abrir_portas: "5",  barras_portais: "1%" },
  { valor: 10, chance_acertar: 0,  ajuste_dano: 0,  carga_permitida: 40,  sustentacao_max: 115,  abrir_portas: "6",  barras_portais: "2%" },
  { valor: 11, chance_acertar: 0,  ajuste_dano: 0,  carga_permitida: 40,  sustentacao_max: 115,  abrir_portas: "6",  barras_portais: "2%" },
  { valor: 12, chance_acertar: 0,  ajuste_dano: 0,  carga_permitida: 45,  sustentacao_max: 140,  abrir_portas: "7",  barras_portais: "4%" },
  { valor: 13, chance_acertar: 0,  ajuste_dano: 0,  carga_permitida: 45,  sustentacao_max: 140,  abrir_portas: "7",  barras_portais: "4%" },
  { valor: 14, chance_acertar: 0,  ajuste_dano: 0,  carga_permitida: 55,  sustentacao_max: 170,  abrir_portas: "8",  barras_portais: "7%" },
  { valor: 15, chance_acertar: 0,  ajuste_dano: 0,  carga_permitida: 55,  sustentacao_max: 170,  abrir_portas: "8",  barras_portais: "7%" },
  { valor: 16, chance_acertar: 0,  ajuste_dano: 1,  carga_permitida: 70,  sustentacao_max: 195,  abrir_portas: "9",  barras_portais: "10%" },
  { valor: 17, chance_acertar: 1,  ajuste_dano: 1,  carga_permitida: 85,  sustentacao_max: 220,  abrir_portas: "10", barras_portais: "13%" },
  { valor: 18,
    normal: { chance_acertar: 1, ajuste_dano: 2, carga_permitida: 110, sustentacao_max: 255, abrir_portas: "11", barras_portais: "16%" },
    extraordinaria: [
      { faixa: "18/01-50", chance_acertar: 1, ajuste_dano: 3, carga_permitida: 135, sustentacao_max: 280, abrir_portas: "12", barras_portais: "20%" },
      { faixa: "18/51-75", chance_acertar: 2, ajuste_dano: 3, carga_permitida: 160, sustentacao_max: 305, abrir_portas: "13", barras_portais: "25%" },
      { faixa: "18/76-90", chance_acertar: 2, ajuste_dano: 4, carga_permitida: 185, sustentacao_max: 330, abrir_portas: "14", barras_portais: "30%" },
      { faixa: "18/91-99", chance_acertar: 2, ajuste_dano: 5, carga_permitida: 235, sustentacao_max: 380, abrir_portas: "15", barras_portais: "35%" },
      { faixa: "18/00",    chance_acertar: 3, ajuste_dano: 6, carga_permitida: 335, sustentacao_max: 480, abrir_portas: "16", barras_portais: "40%" }
    ]
  },
  { valor: 19, chance_acertar: 3, ajuste_dano: 7, carga_permitida: 485, sustentacao_max: 640,  abrir_portas: "16(8)",  barras_portais: "50%" },
  { valor: 20, chance_acertar: 3, ajuste_dano: 8, carga_permitida: 535, sustentacao_max: 700,  abrir_portas: "17(10)", barras_portais: "60%" },
  { valor: 21, chance_acertar: 4, ajuste_dano: 9, carga_permitida: 635, sustentacao_max: 810,  abrir_portas: "17(12)", barras_portais: "70%" },
  { valor: 22, chance_acertar: 4, ajuste_dano: 10, carga_permitida: 785, sustentacao_max: 970, abrir_portas: "18(14)", barras_portais: "80%" },
  { valor: 23, chance_acertar: 5, ajuste_dano: 11, carga_permitida: 935, sustentacao_max: 1130, abrir_portas: "18(16)", barras_portais: "90%" },
  { valor: 24, chance_acertar: 6, ajuste_dano: 12, carga_permitida: 1235, sustentacao_max: 1450, abrir_portas: "19(17)", barras_portais: "99%" },
  { valor: 25, chance_acertar: 7, ajuste_dano: 14, carga_permitida: 1535, sustentacao_max: 1750, abrir_portas: "19(18)", barras_portais: "99%" }
];

export const getStrengthBonuses = (score: number, percentile: number = 0) => {
  const defaultBonuses = { hit: 0, dmg: 0, weight: 0, press: 0, openDoors: "0", bendBars: "0%" };

  const clampedScore = Math.max(1, Math.min(25, score));
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
  if (score === 1) return { reaction: -6, missile: -6, defense: 5 };
  if (score === 2) return { reaction: -4, missile: -4, defense: 5 };
  if (score === 3) return { reaction: -3, missile: -5, defense: 4 };
  if (score === 4) return { reaction: -2, missile: -4, defense: 3 };
  if (score === 5) return { reaction: -1, missile: -3, defense: 2 };
  if (score === 6) return { reaction: 0, missile: 0, defense: 1 };
  if (score <= 14) return { reaction: 0, missile: 0, defense: 0 };
  if (score === 15) return { reaction: 0, missile: 0, defense: -1 };
  if (score === 16) return { reaction: 1, missile: 1, defense: -2 };
  if (score === 17) return { reaction: 2, missile: 2, defense: -3 };
  if (score === 18) return { reaction: 2, missile: 2, defense: -4 };
  if (score === 19) return { reaction: 3, missile: 3, defense: -4 };
  if (score === 20) return { reaction: 3, missile: 3, defense: -4 };
  if (score === 21) return { reaction: 4, missile: 4, defense: -5 };
  if (score === 22) return { reaction: 4, missile: 4, defense: -5 };
  if (score === 23) return { reaction: 4, missile: 4, defense: -6 };
  if (score === 24) return { reaction: 5, missile: 5, defense: -6 };
  if (score >= 25) return { reaction: 5, missile: 5, defense: -6 };
  return { reaction: 0, missile: 0, defense: 0 };
};

export const getConstitutionBonuses = (score: number, className: string) => {
  const isWarrior = ["fighter", "paladin", "ranger"].includes(className);
  if (score === 1) return { hp: -3, shock: 25, resurrect: 30, poison: -2, regen: 0 };
  if (score === 2) return { hp: -2, shock: 30, resurrect: 35, poison: -1, regen: 0 };
  if (score === 3) return { hp: -2, shock: 35, resurrect: 40, poison: 0, regen: 0 };
  if (score <= 6) return { hp: -1, shock: 50, resurrect: 55, poison: 0, regen: 0 };
  if (score <= 14) return { hp: 0, shock: 90, resurrect: 95, poison: 0, regen: 0 };
  if (score === 15) return { hp: 1, shock: 95, resurrect: 98, poison: 0, regen: 0 };
  if (score === 16) return { hp: 2, shock: 97, resurrect: 99, poison: 0, regen: 0 };
  if (score === 17) return { hp: isWarrior ? 3 : 2, shock: 99, resurrect: 100, poison: 0, regen: 0 };
  if (score === 18) return { hp: isWarrior ? 4 : 2, shock: 99, resurrect: 100, poison: 1, regen: 0 };
  if (score === 19) return { hp: isWarrior ? 5 : 2, shock: 99, resurrect: 100, poison: 2, regen: 0 };
  if (score === 20) return { hp: isWarrior ? 5 : 2, shock: 99, resurrect: 100, poison: 2, regen: 1 };
  if (score === 21) return { hp: isWarrior ? 6 : 2, shock: 99, resurrect: 100, poison: 3, regen: 2 };
  if (score === 22) return { hp: isWarrior ? 6 : 2, shock: 99, resurrect: 100, poison: 3, regen: 3 };
  if (score === 23) return { hp: isWarrior ? 7 : 2, shock: 99, resurrect: 100, poison: 4, regen: 4 };
  if (score === 24) return { hp: isWarrior ? 7 : 2, shock: 99, resurrect: 100, poison: 4, regen: 5 };
  if (score >= 25) return { hp: isWarrior ? 7 : 2, shock: 99, resurrect: 100, poison: 4, regen: 6 };
  return { hp: 0, shock: 0, resurrect: 0, poison: 0, regen: 0 };
};

export const getIntelligenceBonuses = (score: number) => {
  if (score === 1) return { languages: 0, spellLvl: 0, learn: 0, maxSpells: 0, illusionImmunity: "" };
  if (score <= 7) return { languages: 1, spellLvl: 0, learn: 0, maxSpells: 0, illusionImmunity: "" };
  if (score === 8) return { languages: 1, spellLvl: 4, learn: 35, maxSpells: 6, illusionImmunity: "" };
  if (score === 9) return { languages: 2, spellLvl: 4, learn: 35, maxSpells: 6, illusionImmunity: "" };
  if (score === 10) return { languages: 2, spellLvl: 5, learn: 45, maxSpells: 7, illusionImmunity: "" };
  if (score === 11) return { languages: 2, spellLvl: 5, learn: 45, maxSpells: 7, illusionImmunity: "" };
  if (score === 12) return { languages: 3, spellLvl: 6, learn: 55, maxSpells: 7, illusionImmunity: "" };
  if (score === 13) return { languages: 3, spellLvl: 6, learn: 55, maxSpells: 7, illusionImmunity: "" };
  if (score === 14) return { languages: 4, spellLvl: 7, learn: 65, maxSpells: 9, illusionImmunity: "" };
  if (score === 15) return { languages: 4, spellLvl: 7, learn: 75, maxSpells: 11, illusionImmunity: "" };
  if (score === 16) return { languages: 5, spellLvl: 8, learn: 85, maxSpells: 11, illusionImmunity: "" };
  if (score === 17) return { languages: 6, spellLvl: 8, learn: 95, maxSpells: 14, illusionImmunity: "" };
  if (score === 18) return { languages: 7, spellLvl: 9, learn: 99, maxSpells: 18, illusionImmunity: "" };
  if (score === 19) return { languages: 8, spellLvl: 9, learn: 100, maxSpells: 99, illusionImmunity: "1º Círculo" };
  if (score === 20) return { languages: 9, spellLvl: 9, learn: 100, maxSpells: 99, illusionImmunity: "1º e 2º Círculo" };
  if (score === 21) return { languages: 10, spellLvl: 9, learn: 100, maxSpells: 99, illusionImmunity: "1º ao 3º Círculo" };
  if (score === 22) return { languages: 11, spellLvl: 9, learn: 100, maxSpells: 99, illusionImmunity: "1º ao 4º Círculo" };
  if (score === 23) return { languages: 12, spellLvl: 9, learn: 100, maxSpells: 99, illusionImmunity: "1º ao 5º Círculo" };
  if (score === 24) return { languages: 15, spellLvl: 9, learn: 100, maxSpells: 99, illusionImmunity: "1º ao 6º Círculo" };
  if (score >= 25) return { languages: 20, spellLvl: 9, learn: 100, maxSpells: 99, illusionImmunity: "1º ao 7º Círculo" };
  return { languages: 0, spellLvl: 0, learn: 0, maxSpells: 0, illusionImmunity: "" };
};

export const getWisdomBonuses = (score: number) => {
  if (score === 1) return { magicDef: -6, bonusSpells: [], failure: 80, immunity: "" };
  if (score === 2) return { magicDef: -4, bonusSpells: [], failure: 60, immunity: "" };
  if (score === 3) return { magicDef: -3, bonusSpells: [], failure: 50, immunity: "" };
  if (score === 4) return { magicDef: -2, bonusSpells: [], failure: 45, immunity: "" };
  if (score === 5) return { magicDef: -1, bonusSpells: [], failure: 40, immunity: "" };
  if (score === 6) return { magicDef: -1, bonusSpells: [], failure: 35, immunity: "" };
  if (score === 7) return { magicDef: -1, bonusSpells: [], failure: 30, immunity: "" };
  if (score === 8) return { magicDef: 0, bonusSpells: [], failure: 25, immunity: "" };
  if (score === 9) return { magicDef: 0, bonusSpells: [], failure: 20, immunity: "" };
  if (score === 10) return { magicDef: 0, bonusSpells: [], failure: 15, immunity: "" };
  if (score === 11) return { magicDef: 0, bonusSpells: [], failure: 10, immunity: "" };
  if (score === 12) return { magicDef: 0, bonusSpells: [], failure: 5, immunity: "" };
  if (score === 13) return { magicDef: 0, bonusSpells: ["1º"], failure: 0, immunity: "" };
  if (score === 14) return { magicDef: 0, bonusSpells: ["1º", "1º"], failure: 0, immunity: "" };
  if (score === 15) return { magicDef: 1, bonusSpells: ["2º"], failure: 0, immunity: "" };
  if (score === 16) return { magicDef: 2, bonusSpells: ["2º", "2º"], failure: 0, immunity: "" };
  if (score === 17) return { magicDef: 3, bonusSpells: ["3º"], failure: 0, immunity: "" };
  if (score === 18) return { magicDef: 4, bonusSpells: ["4º"], failure: 0, immunity: "" };
  if (score === 19) return { magicDef: 4, bonusSpells: ["1º, 4º"], failure: 0, immunity: "Causar Medo, Encantar Pessoa, Comando, Amigos, Hipnose" };
  if (score === 20) return { magicDef: 4, bonusSpells: ["2º, 4º"], failure: 0, immunity: "Imobilizar, Esquecimento, Raio de Enfraquecimento, Assustar" };
  if (score === 21) return { magicDef: 4, bonusSpells: ["3º, 5º"], failure: 0, immunity: "Símbolo de Dor, Sugestão" };
  if (score === 22) return { magicDef: 4, bonusSpells: ["4º, 5º"], failure: 0, immunity: "Encantar Monstro, Confusão, Emoção, Falha" };
  if (score === 23) return { magicDef: 4, bonusSpells: ["5º, 5º"], failure: 0, immunity: "Imobilizar Monstro, Jarro Arcano, Busca" };
  if (score === 24) return { magicDef: 4, bonusSpells: ["6º, 6º"], failure: 0, immunity: "Missão, Confusão em Massa, Cetro do Poder" };
  if (score >= 25) return { magicDef: 4, bonusSpells: ["6º, 7º"], failure: 0, immunity: "Antipatia/Simpatia, Morte, Enxame de Meteoros" };
  return { magicDef: 0, bonusSpells: [], failure: 0, immunity: "" };
};

export const getCharismaBonuses = (score: number) => {
  if (score === 1) return { henchmen: 0, loyalty: -8, reaction: -7 };
  if (score === 2) return { henchmen: 1, loyalty: -7, reaction: -6 };
  if (score === 3) return { henchmen: 1, loyalty: -6, reaction: -5 };
  if (score === 4) return { henchmen: 1, loyalty: -6, reaction: -5 };
  if (score === 5) return { henchmen: 2, loyalty: -5, reaction: -4 };
  if (score === 6) return { henchmen: 2, loyalty: -4, reaction: -3 };
  if (score === 7) return { henchmen: 3, loyalty: -3, reaction: -2 };
  if (score === 8) return { henchmen: 3, loyalty: -2, reaction: -1 };
  if (score === 9) return { henchmen: 4, loyalty: 0, reaction: 0 };
  if (score === 10) return { henchmen: 4, loyalty: 0, reaction: 0 };
  if (score === 11) return { henchmen: 4, loyalty: 0, reaction: 0 };
  if (score === 12) return { henchmen: 5, loyalty: 0, reaction: 0 };
  if (score === 13) return { henchmen: 5, loyalty: 0, reaction: 1 };
  if (score === 14) return { henchmen: 6, loyalty: 1, reaction: 2 };
  if (score === 15) return { henchmen: 7, loyalty: 3, reaction: 3 };
  if (score === 16) return { henchmen: 8, loyalty: 4, reaction: 5 };
  if (score === 17) return { henchmen: 10, loyalty: 6, reaction: 6 };
  if (score === 18) return { henchmen: 15, loyalty: 8, reaction: 7 };
  if (score === 19) return { henchmen: 20, loyalty: 10, reaction: 8 };
  if (score === 20) return { henchmen: 20, loyalty: 10, reaction: 8 };
  if (score === 21) return { henchmen: 25, loyalty: 12, reaction: 9 };
  if (score === 22) return { henchmen: 30, loyalty: 14, reaction: 10 };
  if (score === 23) return { henchmen: 35, loyalty: 16, reaction: 11 };
  if (score === 24) return { henchmen: 40, loyalty: 18, reaction: 12 };
  if (score >= 25) return { henchmen: 50, loyalty: 20, reaction: 14 };
  return { henchmen: 0, loyalty: 0, reaction: 0 };
};

// --- THAC0 ---

const WARRIOR_THAC0 = [20, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
const WIZARD_THAC0 =  [20, 20, 20, 20, 20, 19, 19, 19, 19, 19, 18, 18, 18, 18, 18, 17, 17, 17, 17, 17, 16];
const PRIEST_THAC0 =  [20, 20, 20, 19, 19, 19, 18, 18, 18, 16, 16, 16, 15, 15, 15, 14, 14, 14, 12, 12, 12];
const ROGUE_THAC0 =   [20, 20, 20, 20, 19, 19, 19, 19, 18, 18, 18, 18, 17, 17, 17, 17, 16, 16, 16, 16, 15];

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

// --- SAVING THROWS ---

const SAVING_THROW_TABLES = {
  warrior: [
    { level: 0, poison: 14, petrification: 16, rod: 15, breath: 17, spell: 17 },
    { level: 1, poison: 14, petrification: 16, rod: 15, breath: 17, spell: 17 },
    { level: 2, poison: 13, petrification: 15, rod: 14, breath: 16, spell: 16 },
    { level: 3, poison: 13, petrification: 15, rod: 14, breath: 16, spell: 16 },
    { level: 4, poison: 13, petrification: 15, rod: 14, breath: 16, spell: 16 },
    { level: 5, poison: 11, petrification: 13, rod: 12, breath: 14, spell: 14 },
    { level: 6, poison: 11, petrification: 13, rod: 12, breath: 14, spell: 14 },
    { level: 7, poison: 11, petrification: 13, rod: 12, breath: 14, spell: 14 },
    { level: 8, poison: 10, petrification: 12, rod: 11, breath: 13, spell: 13 },
    { level: 9, poison: 10, petrification: 12, rod: 11, breath: 13, spell: 13 },
    { level: 10, poison: 10, petrification: 12, rod: 11, breath: 13, spell: 13 },
    { level: 11, poison: 8, petrification: 10, rod: 9, breath: 11, spell: 11 },
    { level: 12, poison: 8, petrification: 10, rod: 9, breath: 11, spell: 11 },
    { level: 13, poison: 8, petrification: 10, rod: 9, breath: 11, spell: 11 },
    { level: 14, poison: 7, petrification: 9, rod: 8, breath: 10, spell: 10 },
  ],
  priest: [
    { level: 0, poison: 10, petrification: 13, rod: 12, breath: 14, spell: 15 },
    { level: 1, poison: 10, petrification: 13, rod: 12, breath: 14, spell: 15 },
    { level: 2, poison: 10, petrification: 13, rod: 12, breath: 14, spell: 15 },
    { level: 3, poison: 10, petrification: 13, rod: 12, breath: 14, spell: 15 },
    { level: 4, poison: 9, petrification: 12, rod: 11, breath: 13, spell: 14 },
    { level: 5, poison: 9, petrification: 12, rod: 11, breath: 13, spell: 14 },
    { level: 6, poison: 9, petrification: 12, rod: 11, breath: 13, spell: 14 },
    { level: 7, poison: 7, petrification: 10, rod: 9, breath: 11, spell: 12 },
    { level: 8, poison: 7, petrification: 10, rod: 9, breath: 11, spell: 12 },
    { level: 9, poison: 7, petrification: 10, rod: 9, breath: 11, spell: 12 },
    { level: 10, poison: 6, petrification: 9, rod: 8, breath: 10, spell: 11 },
  ],
  rogue: [
    { level: 0, poison: 13, petrification: 12, rod: 14, breath: 16, spell: 15 },
    { level: 1, poison: 13, petrification: 12, rod: 14, breath: 16, spell: 15 },
    { level: 2, poison: 13, petrification: 12, rod: 14, breath: 16, spell: 15 },
    { level: 3, poison: 13, petrification: 12, rod: 14, breath: 16, spell: 15 },
    { level: 4, poison: 13, petrification: 12, rod: 14, breath: 16, spell: 15 },
    { level: 5, poison: 12, petrification: 11, rod: 13, breath: 15, spell: 14 },
    { level: 6, poison: 12, petrification: 11, rod: 13, breath: 15, spell: 14 },
    { level: 7, poison: 12, petrification: 11, rod: 13, breath: 15, spell: 14 },
    { level: 8, poison: 12, petrification: 11, rod: 13, breath: 15, spell: 14 },
    { level: 9, poison: 11, petrification: 10, rod: 12, breath: 14, spell: 13 },
  ],
  wizard: [
    { level: 0, poison: 14, petrification: 13, rod: 11, breath: 15, spell: 12 },
    { level: 1, poison: 14, petrification: 13, rod: 11, breath: 15, spell: 12 },
    { level: 2, poison: 14, petrification: 13, rod: 11, breath: 15, spell: 12 },
    { level: 3, poison: 14, petrification: 13, rod: 11, breath: 15, spell: 12 },
    { level: 4, poison: 14, petrification: 13, rod: 11, breath: 15, spell: 12 },
    { level: 5, poison: 14, petrification: 13, rod: 11, breath: 15, spell: 12 },
    { level: 6, poison: 13, petrification: 11, rod: 9, breath: 13, spell: 10 },
  ],
};

export const getSavingThrows = (className: string, level: number) => {
  let group: keyof typeof SAVING_THROW_TABLES;

  switch (className) {
    case "fighter":
    case "paladin":
    case "ranger":
      group = "warrior";
      break;
    case "cleric":
    case "druid":
      group = "priest";
      break;
    case "thief":
    case "bard":
      group = "rogue";
      break;
    case "wizard":
      group = "wizard";
      break;
    default:
      // Default to warrior for unselected class
      group = "warrior";
  }

  const table = SAVING_THROW_TABLES[group];
  const saves = table.slice().reverse().find(row => level >= row.level) || table[0];
  
  return {
    poison: saves.poison,
    petrification: saves.petrification,
    rod: saves.rod,
    breath: saves.breath,
    spell: saves.spell,
  };
};

// --- GENERAL SKILLS (NON-WEAPON PROFICIENCIES) ---

const GENERAL_SKILL_PROGRESSION: { [key: string]: { initial: number; progression: number } } = {
  warrior: { initial: 3, progression: 3 },
  wizard: { initial: 4, progression: 3 },
  priest: { initial: 4, progression: 3 },
  rogue: { initial: 4, progression: 4 },
};

export const calculateGeneralSkillPoints = (className: string, level: number): number => {
  let group: keyof typeof GENERAL_SKILL_PROGRESSION;

  switch (className) {
    case "fighter":
    case "paladin":
    case "ranger":
      group = "warrior";
      break;
    case "wizard":
      group = "wizard";
      break;
    case "cleric":
    case "druid":
      group = "priest";
      break;
    case "thief":
    case "bard":
      group = "rogue";
      break;
    default:
      return 0; // No class selected, no points
  }

  const config = GENERAL_SKILL_PROGRESSION[group];
  if (!config) return 0;

  const levelBonus = Math.floor((level - 1) / config.progression);
  return config.initial + levelBonus;
};