// The beginner path must name real sessions, and no session may fall off it
// quietly.
//
// Why this exists: the path is a second ordering laid over the book, and the
// two can drift apart without anything breaking. A session could be renumbered,
// or a new one written, and the path would go on pointing at what used to be
// there or silently skipping what is new. The learner would never meet an idea
// the course claims to teach, and nothing would fail.
//
// So every session in the book must appear either on the path or on the
// explicit not-on-path list with a stated reason. Silence is the failure.
//
//   node scripts/check-beginner-path.mjs

import { SHARED_FOUNDATIONS, bookForChapter } from '../src/lib/content/shared-foundations.js';
import { BEGINNER_PATH, NOT_ON_PATH, pathSteps, nextStep, previousStep } from '../src/lib/content/beginner-path.js';

let bad = 0;
const ok = (label, pass, detail = '') => {
  if (!pass) bad++;
  console.log(`   ${pass ? 'PASS' : '**FAIL**'}  ${label}${detail ? '  ' + detail : ''}`);
};

const key = (c, s) => `ch${String(c).padStart(2, '0')}.${String(s).padStart(2, '0')}`;

/* Every session that exists in the book. */
const inBook = new Set();
for (const { chapter, book } of SHARED_FOUNDATIONS) {
  book.sessions.forEach((_, i) => inBook.add(key(chapter, i + 1)));
}

const steps = pathSteps();
const onPath = steps.map(s => key(s.chapter, s.session));
const excluded = NOT_ON_PATH.map(x => key(x.chapter, x.session));

ok('the path has steps', steps.length > 0, `${steps.length} steps across ${BEGINNER_PATH.length} parts`);

/* Every step points at a session that exists. */
const ghosts = steps.filter(s => !inBook.has(key(s.chapter, s.session)));
ok('every step names a session that exists', ghosts.length === 0,
  ghosts.length ? ghosts.map(s => key(s.chapter, s.session)).join(', ') : `${steps.length} real sessions`);

/* And so does every exclusion, or the reason is protecting nothing. */
const ghostExcl = NOT_ON_PATH.filter(x => !inBook.has(key(x.chapter, x.session)));
ok('every exclusion names a session that exists', ghostExcl.length === 0,
  ghostExcl.length ? ghostExcl.map(x => key(x.chapter, x.session)).join(', ') : `${excluded.length} excluded`);

/* No session appears twice on the path. */
ok('no session appears twice on the path', new Set(onPath).size === onPath.length);

/* No session is both on the path and excluded from it. */
const both = onPath.filter(k => excluded.includes(k));
ok('nothing is both on the path and excluded', both.length === 0, both.join(', '));

/* The one that matters: nothing falls off silently. */
const accounted = new Set([...onPath, ...excluded]);
const orphans = [...inBook].filter(k => !accounted.has(k)).sort();
ok('every session in the book is accounted for', orphans.length === 0,
  orphans.length
    ? `${orphans.length} unaccounted: ${orphans.join(', ')}. Put each on the path or in NOT_ON_PATH with a reason.`
    : `${inBook.size} sessions: ${onPath.length} on the path, ${excluded.length} explained`);

/* Every exclusion states why. A blank reason is how a decision gets forgotten. */
ok('every exclusion says why', NOT_ON_PATH.every(x => x.why && x.why.length > 12),
  NOT_ON_PATH.filter(x => !x.why || x.why.length <= 12).map(x => key(x.chapter, x.session)).join(', '));

/* Parts are numbered in order and each promises something. */
ok('parts run in order', BEGINNER_PATH.every((p, i) => p.part === i + 1),
  BEGINNER_PATH.map(p => p.part).join(', '));
ok('every part promises something', BEGINNER_PATH.every(p => p.title && p.promise && p.promise.length > 20));
ok('no part is empty', BEGINNER_PATH.every(p => p.sessions.length > 0),
  BEGINNER_PATH.map(p => `${p.part}:${p.sessions.length}`).join(' '));

/* Walking it: the chain must be continuous from first to last. */
const first = steps[0];
const last = steps[steps.length - 1];
ok('the path has no previous before its first step', previousStep(first.chapter, first.session) === null);
ok('the path has no next after its last step', nextStep(last.chapter, last.session) === null);

let walked = 1;
let at = first;
while (walked < steps.length + 5) {
  const next = nextStep(at.chapter, at.session);
  if (!next) break;
  at = next;
  walked += 1;
}
ok('the path can be walked end to end', walked === steps.length,
  `walked ${walked} of ${steps.length}`);

/* The point of the path: it crosses chapters, so next must too. */
const crossings = steps.filter((s, i) => i > 0 && s.chapter !== steps[i - 1].chapter).length;
ok('the path crosses chapters, which chapter order could not', crossings > 0,
  `${crossings} crossings`);

console.log(`\n${bad ? `${bad} problem(s)` : 'all checks pass'}, ${steps.length} steps, ${excluded.length} sessions explained off the path`);
process.exit(bad ? 1 : 0);
