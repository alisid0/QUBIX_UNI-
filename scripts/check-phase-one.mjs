// Phase One must account for every session that already exists.
//
// Why this exists: a rebuild is where work quietly disappears. Thirty-five
// sessions are live. Thirty-four are planned. Without a check, a session can
// stop being pointed at by anything and nobody notices for months, because the
// old file still sits in the repository looking finished.
//
// So every live session must be either the source of a Phase One session or
// named in LEAVES_PHASE_ONE with a reason. There is no third state.
//
//   node scripts/check-phase-one.mjs

import { SHARED_FOUNDATIONS } from '../src/lib/content/shared-foundations.js';
import { PHASE_ONE, MODULES, RATIO_BY_MODULE, LEAVES_PHASE_ONE, PROTOTYPES, rewrites, blanks } from '../src/lib/content/phase-one.js';

let bad = 0;
const ok = (label, pass, detail = '') => {
  if (!pass) bad++;
  console.log(`   ${pass ? 'PASS' : '**FAIL**'}  ${label}${detail ? '  ' + detail : ''}`);
};
const key = (c, s) => `ch${String(c).padStart(2, '0')}.${String(s).padStart(2, '0')}`;

/* What exists today. */
const live = new Set();
for (const { chapter, book } of SHARED_FOUNDATIONS) {
  book.sessions.forEach((_, i) => live.add(key(chapter, i + 1)));
}

ok('Phase One has sessions', PHASE_ONE.length > 0,
  `${PHASE_ONE.length} sessions across ${MODULES.length} modules`);

/* ── the design holds together ───────────────────────────────────────────── */
ok('every session has an id, a title and a claim',
  PHASE_ONE.every(s => s.id && s.title && s.claim));

// The claim is the test of whether a session worked, so it has to be a claim:
// something stated about the world, not a topic name.
ok('every claim is a sentence, not a label',
  PHASE_ONE.every(s => /[.!?]$/.test(s.claim) && s.claim.split(/\s+/).length >= 6),
  `shortest ${Math.min(...PHASE_ONE.map(s => s.claim.split(/\s+/).length))} words`);

ok('no two sessions share an id',
  new Set(PHASE_ONE.map(s => s.id)).size === PHASE_ONE.length);

ok('every session belongs to a real module',
  PHASE_ONE.every(s => MODULES.some(m => m.n === s.module)));

ok('no module is empty',
  MODULES.every(m => PHASE_ONE.some(s => s.module === m.n)),
  MODULES.map(m => `${m.n}:${PHASE_ONE.filter(s => s.module === m.n).length}`).join(' '));

ok('sessions are in module order',
  PHASE_ONE.every((s, i) => i === 0 || s.module >= PHASE_ONE[i - 1].module));

/* The taper is the design rule most likely to be forgotten, so it is asserted
   rather than remembered: recognition must never become more dominant later. */
const asNumber = r => Number(r.split(':')[0]) / Number(r.split(':')[1]);
const ratios = MODULES.map(m => asNumber(RATIO_BY_MODULE[m.n]));
ok('every module declares a ratio', MODULES.every(m => RATIO_BY_MODULE[m.n]),
  MODULES.map(m => `${m.n}=${RATIO_BY_MODULE[m.n]}`).join(' '));
ok('the ratio tapers and never rises', ratios.every((r, i) => i === 0 || r <= ratios[i - 1]),
  ratios.join(' → '));

/* ── it agrees with what exists ──────────────────────────────────────────── */
const sources = rewrites().map(s => key(s.from.chapter, s.from.session));
const ghosts = sources.filter(k => !live.has(k));
ok('every rewrite points at a session that exists', ghosts.length === 0, ghosts.join(', '));

ok('no live session is the source of two Phase One sessions',
  new Set(sources).size === sources.length,
  sources.filter((k, i) => sources.indexOf(k) !== i).join(', '));

const left = LEAVES_PHASE_ONE.map(x => key(x.chapter, x.session));
const ghostsLeft = left.filter(k => !live.has(k));
ok('every departure names a session that exists', ghostsLeft.length === 0, ghostsLeft.join(', '));

ok('nothing is both carried forward and left behind',
  sources.filter(k => left.includes(k)).length === 0,
  sources.filter(k => left.includes(k)).join(', '));

ok('every departure says why',
  LEAVES_PHASE_ONE.every(x => x.why && x.why.length > 15));

/* The one that matters. */
const accounted = new Set([...sources, ...left]);
const orphans = [...live].filter(k => !accounted.has(k)).sort();
ok('every live session is accounted for', orphans.length === 0,
  orphans.length
    ? `${orphans.length} unaccounted: ${orphans.join(', ')}. Make each the source of a Phase One session or name it in LEAVES_PHASE_ONE.`
    : `${live.size} live: ${sources.length} carried forward, ${left.length} left behind with reasons`);

/* ── the review's structural rulings ─────────────────────────────────────── */

// Three prototypes get built before the other thirty-one. They were chosen to
// test three different risks, so losing one silently would leave a risk untested.
ok('the prototypes are real sessions',
  PROTOTYPES.every(id => PHASE_ONE.some(s => s.id === id)),
  PROTOTYPES.join(', '));

ok('the prototypes span at least three modules',
  new Set(PROTOTYPES.map(id => PHASE_ONE.find(s => s.id === id).module)).size >= 3);

// 3.7 leaves a row unexplained and 5.5 comes back to it. If one is written and
// the other is not, 3.7 becomes a session that raises a question and drops it.
const paired = ['3.7', '5.5'].map(id => PHASE_ONE.find(s => s.id === id));
ok('the split outlier session keeps both halves',
  paired.every(Boolean) && paired[0].module < paired[1].module,
  paired.every(Boolean) ? `${paired[0].id} module ${paired[0].module} → ${paired[1].id} module ${paired[1].module}` : 'a half is missing');

// Ratios were retired once and restored on review. Simpson at 3.8 is arithmetic
// about denominators, so it cannot precede the session that teaches them.
const at = id => PHASE_ONE.findIndex(s => s.id === id);
ok('denominators are taught before the paradox that needs them',
  at('3.1') > -1 && at('3.8') > at('3.1'),
  '3.1 Part of what? → 3.8 The total that improved');

// A blank console is the single most intimidating thing in the course. The
// reading bridge has to come before anything asks the learner to write a query.
const firstSql = PHASE_ONE.findIndex(s => s.module === 4);
ok('reading a query comes before writing one',
  at('4.1') === firstSql, PHASE_ONE[firstSql] ? PHASE_ONE[firstSql].id : '');

/* Blanks must say what they are, or they are just gaps. */
ok('every unwritten session explains itself or is self-evident',
  blanks().every(s => s.claim && s.claim.length > 20),
  `${blanks().length} to write`);

console.log(`\n${bad ? `${bad} problem(s)` : 'all checks pass'}, ${PHASE_ONE.length} sessions: ${rewrites().length} rewrites, ${blanks().length} to write, ${LEAVES_PHASE_ONE.length} live sessions leaving`);
process.exit(bad ? 1 : 0);
