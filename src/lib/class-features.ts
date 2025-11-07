export interface ClassFeatures {
  thiefSkills?: boolean;
  arcaneSpells?: boolean;
  divineSpells?: boolean;
  spellSchools?: boolean;
  turningUndead?: boolean;
  trackingSkills?: boolean;
  bardSkills?: boolean;
}

export const CLASS_FEATURES: Record<string, ClassFeatures> = {
  fighter: {},
  paladin: { divineSpells: true, turningUndead: true },
  ranger: { trackingSkills: true },
  wizard: { arcaneSpells: true, spellSchools: true },
  cleric: { divineSpells: true, turningUndead: true },
  druid: { divineSpells: true },
  thief: { thiefSkills: true },
  bard: { thiefSkills: true, arcaneSpells: true, bardSkills: true },
};

export const getClassFeatures = (className: string): ClassFeatures | null => {
  return CLASS_FEATURES[className] || null;
};