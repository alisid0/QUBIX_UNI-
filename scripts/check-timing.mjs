// The minutes a session claims must match what the session contains.
//
// They did not. Every session declared studyMinutes and playMinutes by hand,
// nothing ever compared them to the words, and they drifted until the landing
// page told a newcomer that Volume 0 takes 28 h 25 min. Measured, it is about
// five and a half hours: sessions average 508 words, roughly two and a half
// minutes of reading, and were claiming twenty-five to forty-five minutes each.
//
// A learner deciding whether to start reads that number and believes it, so it
// is one of the few figures on the site that has to be true. This keeps it
// honest by recomputing from the content and refusing a big divergence.
//
// The model, stated so it can be argued with:
//   reading   words / 220 wpm, times 2.4 for studying rather than skimming
//   exercise  its own declared minutes, because a learner really spends them
//   doing     the mission's own words, plus 15 seconds a decision, shared
//             between the sessions that link to it
//
//   npm run check:timing

import { SHARED_FOUNDATIONS } from '../src/lib/content/shared-foundations.js';
import { MISSIONS } from '../src/lib/game/progress.js';
// The model moved to src/lib/content/timing.js when the floor started showing
// these minutes to learners. It is imported rather than restated here, because
// a guard checking one arithmetic while the interface displays another is worse
// than no guard at all.
import { WPM, STUDY, THINK, deep, decisionsIn } from '../src/lib/content/timing.js';

const TOLERANCE = 0.5;  // half a session either way

let bad = 0;
const ok = (label, pass, detail = '') => {
  if (!pass) bad++;
  console.log(`   ${pass ? 'PASS' : '**FAIL**'}  ${label}${detail ? '  ' + detail : ''}`);
};

const missionMinutes = new Map(MISSIONS.map(m =>
  [m.slug, deep(m.mission) / WPM + (decisionsIn(m.mission) * THINK) / 60]));

const links = new Map();
for (const { book } of SHARED_FOUNDATIONS)
  for (const s of book.sessions) {
    const slug = (s.practice.href.match(/mission=([a-z-]+)/) || [])[1];
    if (slug) links.set(slug, (links.get(slug) || 0) + 1);
  }

let declaredTotal = 0, measuredTotal = 0, worst = null;

for (const { chapter, book } of SHARED_FOUNDATIONS) {
  let chapterDeclared = 0;
  for (const s of book.sessions) {
    const words = deep(s.objective) + deep(s.opening) + deep(s.sections)
      + deep(s.example) + deep(s.rehearsal) + deep(s.check) + deep(s.figure);
    const study = Math.max(5, Math.round((words / WPM) * STUDY));
    const slug = (s.practice.href.match(/mission=([a-z-]+)/) || [])[1];
    const play = slug && missionMinutes.has(slug)
      ? Math.max(5, Math.round(missionMinutes.get(slug) / links.get(slug))) : 10;

    // The applied exercise is time the learner spends, so it belongs in the
    // measured total. Leaving it out was the hole that let seven sessions
    // declare ten minutes for sixteen minutes of work while this guard passed:
    // it compared reading words against a declared time that also excluded it,
    // so both sides were wrong by the same amount and agreed.
    const exercise = s.exercise?.minutes || 0;
    const declared = s.studyMinutes + s.playMinutes;
    const measured = study + play + exercise;
    declaredTotal += declared; measuredTotal += measured;
    chapterDeclared += declared;

    const off = Math.abs(declared - measured) / measured;
    if (!worst || off > worst.off) worst = { where: `ch${chapter}.${s.number}`, declared, measured, off };
    ok(`ch${String(chapter).padStart(2, '0')}.${s.number} claims a time its content supports`,
      off <= TOLERANCE, `${declared} min declared, ${measured} measured (${words} words)`);
  }
  ok(`ch${String(chapter).padStart(2, '0')} total is the sum of its sessions`,
    chapterDeclared === book.totalMinutes, `${chapterDeclared} against ${book.totalMinutes}`);
}

const hm = m => `${Math.floor(m / 60)} h ${String(Math.round(m % 60)).padStart(2, '0')} min`;
console.log(`\n   declared ${hm(declaredTotal)} · measured ${hm(measuredTotal)}`
  + `   worst session ${worst.where}, ${Math.round(worst.off * 100)}% out`);
console.log(`\n${bad ? `${bad} session(s) claim a time the content does not support` : 'all checks pass'}`
  + `, ${SHARED_FOUNDATIONS.reduce((n, c) => n + c.book.sessions.length, 0)} sessions timed`);
process.exit(bad ? 1 : 0);
