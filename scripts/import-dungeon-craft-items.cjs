// Importer: Dungeon Craft items.txt -> weapons JSON for Pixel Realm
// Reads items.txt, extracts non-magical base weapon entries, normalizes to our Weapon schema.
// Usage: node scripts/import-dungeon-craft-items.js

const fs = require('fs');
const path = require('path');

// Paths
const ITEMS_TXT = path.join(__dirname, '..', '2e_databases_for_Dungeon_Craft-main', 'items.txt');
const OUTPUT_DIR = path.join(__dirname, '..', 'src', 'lib', 'data', 'imported');
const OUTPUT_JSON = path.join(OUTPUT_DIR, 'weapons-dungeon-craft.json');

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function parseItemsTxt(text) {
  const lines = text.split(/\r?\n/);
  const items = [];
  let current = null;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('(BEGIN)')) { // sometimes files omit backslash, handle both
      current = {};
      continue;
    }
    if (line.startsWith('\\(BEGIN)')) { // canonical
      current = {};
      continue;
    }
    if (!current) continue;
    if (line.startsWith('(END)') || line.startsWith('\\(END)')) {
      items.push(current);
      current = null;
      continue;
    }
    // skip comments
    if (line.trim().startsWith('//')) continue;
    const m = line.match(/^\s*([^=]+?)\s*=\s*(.*)$/);
    if (!m) continue;
    const key = m[1].trim().toLowerCase();
    const value = m[2].trim();
    // allow multi-value keys
    if (current[key]) {
      if (!Array.isArray(current[key])) current[key] = [current[key]];
      current[key].push(value);
    } else {
      current[key] = value;
    }
  }
  return items;
}

function normalizeWeapon(item) {
  // Only consider items with a weapon type other than 'not weapon'
  const weaponType = (item['weapon type'] || '').toLowerCase();
  if (!weaponType || weaponType === 'not weapon') return null;

  // Skip magical variants using qualifier after '|'
  const rawName = (item['name'] || '').split('|')[0];
  if (!rawName) return null;

  // Skip items explicitly marked magical
  const specials = item['special ability'];
  if (Array.isArray(specials)) {
    if (specials.some(s => /^\s*itemmagicalweapon\s*,/i.test(s))) return null;
  } else if (typeof specials === 'string' && /^\s*itemmagicalweapon\s*,/i.test(specials)) {
    return null;
  }

  // Determine damage type from special ability
  let type = 'Corte';
  const damageTypeLine = Array.isArray(specials) ? specials.find(s => /damageType/i.test(s)) : specials;
  if (damageTypeLine) {
    const dt = damageTypeLine.toLowerCase();
    if (dt.includes('piercing')) type = 'Perfuração';
    else if (dt.includes('blunt')) type = 'Impacto';
    else type = 'Corte';
  }

  // Category mapping
  let category = 'corpo-a-corpo';
  if (weaponType.includes('bow') || weaponType.includes('crossbow') || weaponType.includes('sling')) category = 'a-distancia';
  else if (weaponType.includes('thrown')) category = 'arremesso';

  // Cost in gp -> "X po"
  const cost = item['cost'] ? `${parseInt(item['cost'], 10)} po` : '0';

  // Weight: encumbrance is gp weight; assume 10 gp per pound
  let weight = 0;
  if (item['encumbrance']) {
    const enc = parseInt(item['encumbrance'], 10);
    weight = Math.round((enc / 10) * 10) / 10; // one decimal
  }

  // Size: heuristic
  const hands = parseInt(item['hands to carry'] || '1', 10);
  let size = 'M';
  if (hands >= 2) size = 'L';
  else if (weight > 0 && weight < 2) size = 'S';

  // Damage dice
  function normDice(s) {
    if (!s) return '0d0';
    const t = s.replace(/\s+/g, '').replace(/D/g, 'd');
    return t;
  }
  const smallMedium = normDice(item['small/medium damage dice']);
  const large = normDice(item['large damage dice']);

  const id = rawName.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');

  const weapon = {
    name: rawName,
    cost,
    weight,
    size,
    type,
    speed_factor: 0,
    damage: {
      small_medium: smallMedium,
      large,
    },
    category,
    id,
  };
  return weapon;
}

function main() {
  console.log('Reading', ITEMS_TXT);
  const text = fs.readFileSync(ITEMS_TXT, 'utf8');
  const items = parseItemsTxt(text);
  const weapons = [];
  const seen = new Set();
  for (const it of items) {
    const w = normalizeWeapon(it);
    if (!w) continue;
    if (seen.has(w.name)) continue; // keep base only, ignore duplicates/magical variants
    seen.add(w.name);
    weapons.push(w);
  }
  ensureDir(OUTPUT_DIR);
  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(weapons, null, 2), 'utf8');
  console.log(`Saved ${weapons.length} weapons -> ${OUTPUT_JSON}`);
}

if (require.main === module) {
  try {
    main();
  } catch (e) {
    console.error('Import failed:', e);
    process.exit(1);
  }
}