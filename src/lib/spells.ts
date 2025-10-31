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

export const arcaneSpells: Spell[] = [
  {
    name: "Magic Missile",
    level: 1,
    school: "Evocation",
    range: "150 yds",
    duration: "Instantaneous",
    area_of_effect: "1 creature",
    components: "V, S",
    casting_time: "1",
    saving_throw: "None",
    description: "Creates one or more magical missiles that automatically strike a target. For every two levels, the caster gains an additional missile.",
    class: 'wizard',
  },
  {
    name: "Detect Magic",
    level: 1,
    school: "Divination",
    range: "0",
    duration: "1 turn",
    area_of_effect: "60-ft. path",
    components: "V, S",
    casting_time: "1",
    saving_throw: "None",
    description: "The caster can detect the presence and location of magical items or effects within the area of effect.",
    class: 'wizard',
  },
  {
    name: "Fireball",
    level: 3,
    school: "Evocation",
    range: "10 yds + 1 yd/level",
    duration: "Instantaneous",
    area_of_effect: "20-ft. radius sphere",
    components: "V, S, M",
    casting_time: "3",
    saving_throw: "Half",
    description: "A burst of flame that detonates with a low roar and deals 1d6 points of fire damage per level of the caster to all creatures within the area.",
    class: 'wizard',
  },
  {
    name: "Invisibility",
    level: 2,
    school: "Illusion/Phantasm",
    range: "Touch",
    duration: "Special",
    area_of_effect: "1 creature",
    components: "V, S, M",
    casting_time: "2",
    saving_throw: "None",
    description: "The recipient of this spell becomes invisible to sight. The spell ends when the subject attacks any creature.",
    class: 'wizard',
  }
];

export const divineSpells: Spell[] = [
  {
    name: "Cure Light Wounds",
    level: 1,
    school: "Necromancy",
    range: "Touch",
    duration: "Permanent",
    area_of_effect: "1 creature",
    components: "V, S",
    casting_time: "5",
    saving_throw: "None",
    description: "Heals 1d8 points of damage to a creature touched. This spell cannot affect undead.",
    class: 'priest',
  },
  {
    name: "Bless",
    level: 1,
    school: "Conjuration/Summoning",
    range: "50 yds",
    duration: "6 rounds",
    area_of_effect: "50-ft. cube",
    components: "V, S, M",
    casting_time: "1 round",
    saving_throw: "None",
    description: "Allies in the area of effect gain a +1 bonus to their attack rolls and saving throws against fear effects.",
    class: 'priest',
  },
  {
    name: "Hold Person",
    level: 2,
    school: "Enchantment/Charm",
    range: "120 yds",
    duration: "1 turn/level",
    area_of_effect: "1-4 persons in a 20-ft. cube",
    components: "V, S, M",
    casting_time: "5",
    saving_throw: "Neg.",
    description: "This spell causes one or more humanoid creatures to be paralyzed and unable to act. A successful saving throw negates the effect.",
    class: 'priest',
  },
  {
    name: "Spiritual Hammer",
    level: 2,
    school: "Evocation",
    range: "30 yds",
    duration: "3 rounds/level",
    area_of_effect: "1 creature",
    components: "V, S",
    casting_time: "5",
    saving_throw: "None",
    description: "Creates a magical hammer that attacks a foe designated by the caster. It strikes as a magical weapon and deals 1d4+1 damage.",
    class: 'priest',
  }
];