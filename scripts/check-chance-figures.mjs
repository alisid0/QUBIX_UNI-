// Chapter 8 session 1 and its playable mission use one small fictional set.
// Keep the prose, worked example and activity arithmetic in agreement.

import { SHARED_FOUNDATIONS } from '../src/lib/content/shared-foundations.js';
import { PROBABILITY_COUNTER_MISSION as M } from '../src/lib/game/probability-counter-mission.js';

let failed = false;
const check = (condition, label, detail = '') => {
  console.log(`   ${condition ? 'PASS' : '**FAIL**'}  ${label}${detail ? `  ${detail}` : ''}`);
  if (!condition) failed = true;
};

const book = SHARED_FOUNDATIONS.find(item => item.chapter === 8)?.book;
const session = book?.sessions?.[0];
const table = Object.fromEntries((session?.example?.rows || []).map(row => [row[0], row]));
const counts = Object.fromEntries(['coffee', 'food', 'both', 'neither']
  .map(outcome => [outcome, M.visits.filter(([, value]) => value === outcome).length]));

check(Boolean(book), 'chapter 8 is in the volume');
check(session?.id === 'probability-as-proportion', 'its first session is the probability question');
check(Number(table['Coffee only']?.[1]) === counts.coffee, 'coffee-only count agrees', `${counts.coffee}`);
check(Number(table['Food only']?.[1]) === counts.food, 'food-only count agrees', `${counts.food}`);
check(Number(table.Both?.[1]) === counts.both, 'both count agrees', `${counts.both}`);
check(Number(table.Neither?.[1]) === counts.neither, 'neither count agrees', `${counts.neither}`);
check(Number(table.Total?.[1]) === M.denominator, 'worked total is the mission denominator', `${M.denominator}`);
check((counts.coffee + counts.both) === M.numerator, 'event count includes coffee-only and both', `${M.numerator}`);
check(M.numerator / M.denominator === M.decimal && M.percent === M.decimal * 100,
  'fraction, decimal and percentage agree', `${M.numerator}/${M.denominator} = ${M.percent}% = ${M.decimal}`);

console.log(failed
  ? '\n  chapter 8 and the probability mission disagree\n'
  : '\n  chapter 8 and the probability mission agree\n');
process.exit(failed ? 1 : 0);
