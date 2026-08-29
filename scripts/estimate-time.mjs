// How long does Volume 0 actually take?
//
// Every session declares studyMinutes and playMinutes by hand, and the landing
// page adds them up and tells a newcomer 28 h 25 min. Nobody ever checked those
// numbers against the content, so this measures it: words of prose at real
// reading speeds, and decisions at a real per-decision cost.
//
// The number a learner cares about is time on the site. The declared study
// minutes also include the workbook, which is an offline exercise with a
// stopwatch in its own title ("Fifteen-minute blank hunt"), done away from the
// screen with your own data, and most people skip it. Counting that as time to
// read the course is the single biggest reason the figure is too high, so it is
// measured separately here rather than folded in.
//
//   node scripts/estimate-time.mjs

import { SHARED_FOUNDATIONS, volumeMinutes } from '../src/lib/content/shared-foundations.js';
import { MISSIONS } from '../src/lib/game/progress.js';

const words = s => (typeof s === 'string' ? s.trim().split(/\s+/).filter(Boolean).length : 0);
const deep = v => {
  if (typeof v === 'string') return words(v);
  if (Array.isArray(v)) return v.reduce((n, x) => n + deep(x), 0);
  if (v && typeof v === 'object') return Object.values(v).reduce((n, x) => n + deep(x), 0);
  return 0;
};

// Careful technical reading, not skimming a novel. Published ranges for
// non-fiction comprehension sit around 180 to 260 wpm; 220 is the middle.
const SLOW = 180, MID = 220, FAST = 280;

let prose = 0, workbook = 0, declaredStudy = 0, declaredPlay = 0, sessions = 0;

for (const { book } of SHARED_FOUNDATIONS) {
  for (const s of book.sessions) {
    sessions += 1;
    declaredStudy += s.studyMinutes;
    declaredPlay += s.playMinutes;
    // Everything a learner reads on screen.
    prose += deep(s.objective) + deep(s.opening) + deep(s.sections)
      + deep(s.example) + deep(s.rehearsal) + deep(s.check) + deep(s.figure);
    workbook += deep(s.workbook);
  }
}

// A mission is read too: a brief, a theory line, options with hints, and an
// explanation after every answer.
//
// Decisions are counted by walking the whole mission rather than its top-level
// cases, because the missions do not share a shape. Four of them keep their
// decisions somewhere else entirely: checkout in `order`, classify-data in
// `variations`, data-lineage in `steps`, missing-data in a pair of fields per
// case. Counting only `cases` missed all four and undercounted by a quarter.
let mWords = 0, questions = 0;
const countDecisions = v => {
  if (Array.isArray(v)) { v.forEach(countDecisions); return; }
  if (!v || typeof v !== 'object') return;
  for (const [k, val] of Object.entries(v)) {
    // An options list is an array of [value, label] or [value, label, hint].
    const isOptionList = Array.isArray(val) && val.length > 1
      && val.every(o => Array.isArray(o) && o.length >= 2 && typeof o[0] === 'string');
    if (isOptionList && (k.endsWith('Options') || k === 'options')) questions += 1;
    countDecisions(val);
  }
};
for (const m of MISSIONS) {
  mWords += deep(m.mission);
  countDecisions(m.mission);
}

// Thinking and clicking, on top of reading the words. A multiple-choice decision
// with three options you have to weigh is not instant, and a wrong answer means
// reading the feedback and choosing again.
const THINK = 12;   // seconds per decision, including some retries
const hm = m => `${Math.floor(m / 60)} h ${String(Math.round(m % 60)).padStart(2, '0')} min`;
const row = (label, a, b, c) =>
  console.log(`   ${label.padEnd(34)}${hm(a).padStart(11)}${hm(b).padStart(11)}${hm(c).padStart(11)}`);

console.log(`\nmeasured from the content itself\n`);
console.log(`   reading prose        ${prose.toLocaleString()} words across ${sessions} sessions`);
console.log(`   mission prose        ${mWords.toLocaleString()} words across ${MISSIONS.length} missions`);
console.log(`   decisions            ${questions} questions`);
console.log(`   workbook prompts     ${workbook.toLocaleString()} words (offline exercises, timed in their own titles)\n`);

console.log(`   ${''.padEnd(34)}${'slow'.padStart(11)}${'typical'.padStart(11)}${'fast'.padStart(11)}`);
console.log(`   ${''.padEnd(34)}${`${SLOW} wpm`.padStart(11)}${`${MID} wpm`.padStart(11)}${`${FAST} wpm`.padStart(11)}`);
console.log(`   ${'-'.repeat(67)}`);

const readOnly = [SLOW, MID, FAST].map(r => prose / r);
row('Reading the chapters', ...readOnly);

const missionRead = [SLOW, MID, FAST].map(r => mWords / r);
const thinking = (questions * THINK) / 60;
const playing = missionRead.map(r => r + thinking);
row(`Playing the missions`, ...playing);

const total = readOnly.map((r, i) => r + playing[i]);
row('Both, on screen', ...total);

// The workbook exercises put their own duration in their titles, so the offline
// time is declared rather than guessed. This is the honest figure for it.
const SPELLED = { ten: 10, fifteen: 15, twenty: 20, thirty: 30, forty: 40, five: 5 };
let workbookMinutes = 0, timedWorkbooks = 0;
for (const { book } of SHARED_FOUNDATIONS) {
  for (const s of book.sessions) {
    const m = /(\w+)-minute/i.exec(s.workbook?.title || '');
    const mins = m ? SPELLED[m[1].toLowerCase()] : null;
    if (mins) { workbookMinutes += mins; timedWorkbooks += 1; }
  }
}

console.log('');
console.log(`   ${'Workbook, away from the screen'.padEnd(34)}${hm(workbookMinutes).padStart(11)}`
  + `   ${timedWorkbooks} of ${sessions} sessions state their own duration`);

console.log(`\n   ${'-'.repeat(67)}`);
console.log(`   declared on the site               ${hm(volumeMinutes).padStart(11)}`);
console.log(`   measured on screen, typical pace   ${hm(total[1]).padStart(11)}`
  + `   ${Math.round((total[1] / volumeMinutes) * 100)}% of it`);
console.log(`   measured plus the workbook         ${hm(total[1] + workbookMinutes).padStart(11)}`
  + `   ${Math.round(((total[1] + workbookMinutes) / volumeMinutes) * 100)}% of it`);
const unexplained = volumeMinutes - total[1] - workbookMinutes;
console.log(`   unaccounted for                    ${hm(unexplained).padStart(11)}`
  + `   ${Math.round((unexplained / volumeMinutes) * 100)}% with nothing behind it\n`);
