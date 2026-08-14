#!/usr/bin/env node
/**
 * Transform seed.sql kickers from "Card XX" to topic-based format.
 * Run: node scripts/rename-seed-kickers.mjs
 */
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SEED_PATH = join(__dirname, '..', 'supabase', 'seed.sql');

// Old→New kicker map for seed.sql (cards 1-37)
const oldToNew = {};

// Physics · Mechanics 3.x
const mech = {1:0, 2:1, 3:2, 4:3, 5:4, 6:5, 7:6, 8:7, 9:8, 25:9, 28:10, 29:11};
for (const [n, i] of Object.entries(mech)) {
  oldToNew[`Card ${String(n).padStart(2, '0')}`] = `Mechanics 3.${i}`;
}
// Energy 3.x
oldToNew['Card 10'] = 'Energy 3.0';
oldToNew['Card 11'] = 'Energy 3.1';
// Gravity 3.0
oldToNew['Card 16'] = 'Gravity 3.0';
// Vectors 3.x
[21,22,23].forEach((n, i) => oldToNew[`Card ${String(n).padStart(2, '0')}`] = `Vectors 3.${i}`);

// Chemistry · Atomic Chemistry 2.x
[33,34,35,36,37].forEach((n, i) => {
  oldToNew[`Card ${String(n).padStart(2, '0')}`] = `Atomic Chemistry 2.${i}`;
});

// Maths · Coordinate Geometry 1.x
[26,27,30,31,32].forEach((n, i) => {
  oldToNew[`Card ${String(n).padStart(2, '0')}`] = `Coordinate Geometry 1.${i}`;
});

// Maths · Trigonometry 1.x
[17,18,19,20,24].forEach((n, i) => {
  oldToNew[`Card ${String(n).padStart(2, '0')}`] = `Trigonometry 1.${i}`;
});

// Maths · Calculus 1.x
[12,13,14,15].forEach((n, i) => {
  oldToNew[`Card ${String(n).padStart(2, '0')}`] = `Calculus 1.${i}`;
});

let content = readFileSync(SEED_PATH, 'utf-8');

for (const [oldK, newK] of Object.entries(oldToNew)) {
  const escapedOld = oldK.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // Replace kicker in SQL: ,'Card XX', → ,'NewName',
  const sqlRegex = new RegExp(
    `,'${escapedOld}',`,
    'g'
  );
  content = content.replace(sqlRegex, `,'${newK}',`);

  // Replace in buildsOn references within JSON
  const buildRegex = new RegExp(
    `"${escapedOld}"`,
    'g'
  );
  content = content.replace(buildRegex, `"${newK}"`);
}

writeFileSync(SEED_PATH, content, 'utf-8');
console.log('✅ seed.sql kickers and buildsOn references transformed.');
console.log(`   ${Object.keys(oldToNew).length} mappings applied.`);
