import { readFileSync } from 'node:fs';
import { SHARED_FOUNDATIONS_PART_EIGHT } from '../src/lib/content/shared-foundations-part-eight.js';
import { PROBABILITY_COUNTER_MISSION as M, includedInCoffeeEvent } from '../src/lib/game/probability-counter-mission.js';
import { DOORS } from '../src/lib/content/learning-flow.js';
import { MISSIONS } from '../src/lib/game/progress.js';

let bad = 0;
const check = (condition, label, detail = '') => {
  if (!condition) bad += 1;
  console.log(`   ${condition ? 'PASS' : '**FAIL**'}  ${label}${detail ? `  ${detail}` : ''}`);
};

const ids = M.visits.map(([id]) => id);
const coffeeVisits = M.visits.filter(([, outcome]) => includedInCoffeeEvent(outcome));
const counts = Object.fromEntries(['coffee', 'food', 'both', 'neither'].map(outcome => [outcome, M.visits.filter(([, value]) => value === outcome).length]));
const session = SHARED_FOUNDATIONS_PART_EIGHT.sessions[0];
const prose = JSON.stringify(session).toLowerCase();
const pair = DOORS.find(door => door.id === 'concepts').pairs.find(item => item.id === 'c9');
const app = readFileSync(new URL('../src/App.svelte', import.meta.url), 'utf8');

check(M.visits.length === 20 && new Set(ids).size === 20, 'activity has twenty unique visit cards');
check(counts.coffee === 6 && counts.food === 7 && counts.both === 3 && counts.neither === 4,
  'outcome counts match the approved worked example', JSON.stringify(counts));
check(coffeeVisits.length === M.numerator && coffeeVisits.some(([, outcome]) => outcome === 'both'),
  'coffee event contains coffee-only and both', `${coffeeVisits.length} visits`);
check(M.denominator === M.visits.length, 'denominator is the complete twenty-visit sample space');
check(M.numerator / M.denominator === M.decimal && M.percent / 100 === M.decimal,
  'fraction, percentage and decimal are equivalent');
check(session.title === 'A probability belongs to a question', 'reading uses the founder-approved title');
check(!/conditional probability|independen/.test(prose), 'pair one defers conditional probability and independence');
check(session.practice.href.includes('probability-counter'), 'reading opens the dedicated mission');
check(pair?.play?.slug === 'probability-counter' && pair.play.status === 'live', 'learning floor pairs the read and play');
check(MISSIONS.some(item => item.slug === 'probability-counter'), 'mission is on the academy roster');
check(app.includes("mission === 'probability-counter'"), 'application router loads the mission');

console.log(`\n${bad ? `${bad} probability check(s) FAILED` : 'probability read/play pair agrees'}\n`);
process.exit(bad ? 1 : 0);
