#!/usr/bin/env node
/**
 * Transform deck.js kickers from "BB XX"/"Card XX" to topic-based format.
 * Run: node scripts/rename-kickers.mjs
 *
 * Mapping:
 *   Maths (1.x):   Coordinate Geometry 1.0-1.37, Trigonometry 1.0-1.4, Calculus 1.0-1.3
 *   Chemistry (2.x): Atomic Chemistry 2.0-2.4
 *   Physics (3.x):  Mechanics 3.0-3.25, Energy 3.0-3.1, Gravity 3.0, Vectors 3.0-3.2
 */
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DECK_PATH = join(__dirname, '..', 'src', 'lib', 'content', 'deck.js');

// Build the old→new kicker map
const oldToNew = {};

// Physics · Mechanics 3.0: cards 1-9, 25, 28-29, 71-84
const mechCards = [1,2,3,4,5,6,7,8,9,25,28,29,71,72,73,74,75,76,77,78,79,80,81,82,83,84];
mechCards.forEach((n, i) => {
  oldToNew[`BB ${String(n).padStart(2, '0')}`] = `Mechanics 3.${i}`;
  oldToNew[`BB ${n}`] = `Mechanics 3.${i}`;
  oldToNew[`Card ${String(n).padStart(2, '0')}`] = `Mechanics 3.${i}`;
  oldToNew[`Card ${n}`] = `Mechanics 3.${i}`;
});

// Physics · Energy 3.1: cards 10-11
[10,11].forEach((n, i) => {
  oldToNew[`Card ${String(n).padStart(2, '0')}`] = `Energy 3.${i}`;
  oldToNew[`Card ${n}`] = `Energy 3.${i}`;
});

// Physics · Gravity 3.2: card 16
oldToNew['Card 16'] = 'Gravity 3.0';
oldToNew['Card 16'] = 'Gravity 3.0';

// Physics · Vectors 3.3: cards 21-23
[21,22,23].forEach((n, i) => {
  oldToNew[`Card ${String(n).padStart(2, '0')}`] = `Vectors 3.${i}`;
  oldToNew[`Card ${n}`] = `Vectors 3.${i}`;
});

// Chemistry · Atomic Chemistry 2.0: cards 33-37
[33,34,35,36,37].forEach((n, i) => {
  oldToNew[`Card ${String(n).padStart(2, '0')}`] = `Atomic Chemistry 2.${i}`;
  oldToNew[`Card ${n}`] = `Atomic Chemistry 2.${i}`;
});

// Maths · Coordinate Geometry 1.0: cards 26-27, 30-32, 38-70
const cgCards = [26,27,30,31,32,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70];
cgCards.forEach((n, i) => {
  oldToNew[`Card ${String(n).padStart(2, '0')}`] = `Coordinate Geometry 1.${i}`;
  oldToNew[`Card ${n}`] = `Coordinate Geometry 1.${i}`;
});

// Maths · Trigonometry 1.1: cards 17-20, 24
[17,18,19,20,24].forEach((n, i) => {
  oldToNew[`Card ${String(n).padStart(2, '0')}`] = `Trigonometry 1.${i}`;
  oldToNew[`Card ${n}`] = `Trigonometry 1.${i}`;
});

// Maths · Calculus 1.2: cards 12-15
[12,13,14,15].forEach((n, i) => {
  oldToNew[`Card ${String(n).padStart(2, '0')}`] = `Calculus 1.${i}`;
  oldToNew[`Card ${n}`] = `Calculus 1.${i}`;
});

// Read the file
let content = readFileSync(DECK_PATH, 'utf-8');

// Replace kicker strings in C() calls — match the second argument.
// Cards use either single or double quotes: C('act','KICKER',...  or  C("act","KICKER",...
for (const [oldK, newK] of Object.entries(oldToNew)) {
  const escapedOld = oldK.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // Double-quoted kickers: C("act", "KICKER", "title", ...
  const dqRegex = new RegExp(
    `(C\\("[^"]*",\\s*")${escapedOld}(",)`,
    'g'
  );
  content = content.replace(dqRegex, `$1${newK}$2`);

  // Single-quoted kickers: C('act', 'KICKER', 'title', ...
  const sqRegex = new RegExp(
    `(C\\('[^']*',\\s*')${escapedOld}(')`,
    'g'
  );
  content = content.replace(sqRegex, `$1${newK}$2`);

  // Also replace in buildsOn arrays: ["Card XX"] or ["BB XX"]
  const buildRegex = new RegExp(
    `"${escapedOld}"`,
    'g'
  );
  content = content.replace(buildRegex, `"${newK}"`);
}

writeFileSync(DECK_PATH, content, 'utf-8');
console.log('✅ deck.js kickers and buildsOn references transformed.');
console.log(`   ${Object.keys(oldToNew).length} mappings applied.`);
