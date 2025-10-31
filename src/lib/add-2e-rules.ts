// AD&D 2nd Edition Rules Engine

// --- ATTRIBUTE TABLES ---

export const getStrengthBonuses = (score: number) => {
  if (score <= 1) return { hit: -5, dmg: -4, weight: 0, press: 0, openDoors: 1, bendBars: 0 };
  if (score === 2) return { hit: -3, dmg: -2, weight: 1, press: 0, openDoors: 1, bendBars: 0 };
  if (score === 3) return { hit: -3, dmg: -1, weight: 5, press: 3, openDoors: 2, bendBars: 0 };
  if (score <= 5) return { hit: -2, dmg: -1, weight: 10, press: 5, openDoors: 3, bendBars: 0 };
  if (score <= 7) return { hit: -1, dmg: 0, weight: 20, press: 10, openDoors: 4, bendBars: 0 };
  if (score <= 9) return { hit: 0, dmg: 0, weight: 35, press: 25, openDoors: 5, bendBars: 1 };
  if (score <= 11) return { hit: 0, dmg: 0, weight: 40, press: 35, openDoors: 6, bendBars: 2 };
  if (score <= 13) return { hit: 0, dmg: 0, weight: 45, press: 45, openDoors: 7, bendBars: 4 };
  if (score === 14) return { hit: 0, dmg: 0, weight: 55, press: 65, openDoors: 8, bendBars: 7 };
  if (score === 15) return { hit: 0, dmg: 0, weight: 60, press: 75, openDoors: 9, bendBars: 10 };
  if (score === 16) return { hit: 0, dmg: 1, weight: 70, press: 95, openDoors: 10, bendBars: 13 };
  if (score === 17) return { hit: 1, dmg: 1, weight: 85, press: 115, openDoors: 11, bendBars: 16 };
  if (score === 18) return { hit: 1, dmg: 2, weight: 110, press: 155, openDoors: 12, bendBars: 20 };
  if (score === 19) return { hit: 3, dmg: 7, weight: 280, press: 480, openDoors: 14, bendBars: 40 };
  if (score >= 20) return { hit: 3, dmg: 8, weight: 320, press: 530, openDoors: 15, bendBars: 45 };
  return { hit: 0, dmg: 0, weight: 0, press: 0, openDoors: 0, bendBars: 0 };
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