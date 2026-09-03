// The learning floor may not promise anything it cannot open.
//
// The redesign brief has one rule that outranks the rest of it: unbuilt
// material is shown honestly, greyed out, and never linked. This is that rule
// as a build failure.
//
// It checks both directions, because both fail silently. A disabled asset that
// quietly carries a href becomes an enabled dead link. A live asset whose
// destination was typed rather than resolved becomes a 404 that only a learner
// finds. Every live href here is resolved against the sessions that exist and
// the missions on the roster.
//
//   node scripts/check-learning-flow.mjs

import { SHARED_FOUNDATIONS } from '../src/lib/content/shared-foundations.js';
import { MISSIONS } from '../src/lib/game/progress.js';
import { boards } from '../src/lib/content/course.js';
import { ALL_STAGES, allPairs, allAssets, isAvailable, liveCompletion, CONTENT_STATUS }
  from '../src/lib/content/learning-flow.js';

let bad = 0;
const ok = (label, pass, detail = '') => {
  if (!pass) bad++;
  console.log(`   ${pass ? 'PASS' : '**FAIL**'}  ${label}${detail ? '  ' + detail : ''}`);
};

const pairs = allPairs();
const assets = allAssets();
const slugs = new Set(MISSIONS.map(m => m.slug));

/* What sessions actually exist, by chapter and one-based index. */
const sessions = new Set();
for (const { chapter, book } of SHARED_FOUNDATIONS) {
  book.sessions.forEach((_, i) => sessions.add(`${chapter}/${i + 1}`));
}

/* ── shape ───────────────────────────────────────────────────────────────── */
ok('every stage has pairs', ALL_STAGES.every(s => s.pairs.length > 0),
  ALL_STAGES.map(s => `${s.id}:${s.pairs.length}`).join(' '));
// A single-track stage carries one asset per step rather than two. Mathematics
// is one: a board is three to five floors of text and exercise together, with
// the practice inside it, so there is no second half to name and a permanent
// greyed "not built" beside ten working boards would be a lie the guard forced.
// Every other stage still owes both halves.
const twoTrack = ALL_STAGES.filter(s => !s.singleTrack).flatMap(s => s.pairs);
const oneTrack = ALL_STAGES.filter(s => s.singleTrack).flatMap(s => s.pairs);
ok('every pair on a two-track stage has a read and a play', twoTrack.every(p => p.read && p.play));
ok('every pair on a single-track stage has one asset and no play',
  oneTrack.every(p => p.read && p.play === null),
  `${oneTrack.length} single-track step(s)`);
ok('no two assets share an id', new Set(assets.map(a => a.id)).size === assets.length,
  assets.map(a => a.id).filter((id, i, all) => all.indexOf(id) !== i).join(', '));
ok('every asset declares a known status',
  assets.every(a => CONTENT_STATUS.includes(a.status)));
ok('every pair states its idea', pairs.every(p => p.idea && p.idea.length > 3));

/* ── the rule: nothing unavailable may be linked ─────────────────────────── */
const leaking = assets.filter(a => a.status !== 'live' && a.href);
ok('no unavailable asset carries a destination', leaking.length === 0,
  leaking.map(a => `${a.id} -> ${a.href}`).join(', '));

const silent = assets.filter(a => a.status !== 'live' && !a.note);
ok('every unavailable asset says why it is unavailable', silent.length === 0,
  silent.map(a => a.id).join(', '));

/* ── the other direction: every live destination is real ─────────────────── */
const liveReads = assets.filter(a => a.kind === 'read' && a.status === 'live');
const ghostReads = liveReads.filter(a => !sessions.has(`${a.chapter}/${a.session}`));
ok('every live reading points at a session that exists', ghostReads.length === 0,
  ghostReads.map(a => `${a.id} -> ch${a.chapter}.${a.session}`).join(', '));

const livePlays = assets.filter(a => a.kind === 'play' && a.status === 'live');
const ghostPlays = livePlays.filter(a => !slugs.has(a.slug));
ok('every live mission points at a slug on the roster', ghostPlays.length === 0,
  ghostPlays.map(a => `${a.id} -> ${a.slug}`).join(', '));

// The same resolution the readings and missions get. A board index is an array
// position, which is the easiest kind of reference to get quietly wrong: an
// off-by-one opens the wrong lesson rather than failing, and reordering
// course.js would silently repoint every link on the stage.
const ghostBoards = assets.filter(a => a.kind === 'board' && isAvailable(a))
  .filter(a => !boards[a.boardIndex]);
ok('every live board points at a board that exists', ghostBoards.length === 0,
  ghostBoards.map(a => `${a.id} -> index ${a.boardIndex}`).join(', '));

const misnamed = assets.filter(a => a.kind === 'board' && boards[a.boardIndex])
  .filter(a => a.label !== boards[a.boardIndex].title);
ok('every board label matches the board it opens', misnamed.length === 0,
  misnamed.map(a => `${a.id}: "${a.label}" vs "${boards[a.boardIndex].title}"`).join(' | '));

ok('every live asset has a destination', assets.filter(a => a.status === 'live').every(a => a.href));

/* The reading label should be the session's own title, or the floor is calling
   a lesson something the lesson does not call itself. */
const titleOf = (chapter, session) =>
  SHARED_FOUNDATIONS.find(c => c.chapter === chapter)?.book.sessions[session - 1]?.title || '';
const renamed = liveReads.filter(a => {
  const real = titleOf(a.chapter, a.session).toLowerCase();
  return real && !real.startsWith(a.label.toLowerCase().slice(0, 24));
});
ok('every reading label matches the session it opens', renamed.length === 0,
  renamed.map(a => `${a.id}: "${a.label}" vs "${titleOf(a.chapter, a.session)}"`).join(' | '));

/* ── the denominator ─────────────────────────────────────────────────────── */
// Roadmap and planned material must never lower a learner's percentage, so it
// must never be in the denominator in the first place.
const total = liveCompletion([]).total;
ok('completion counts only available assets', total === assets.filter(isAvailable).length,
  `${total} available of ${assets.length} named`);

const everything = liveCompletion(assets.map(a => a.id));
ok('completing every available asset reaches 100 per cent', everything.percent === 100,
  `${everything.done}/${everything.total}`);

/* ── Shared Data Truths is the start, and Stage 0 is not here ────────────── */
ok('Shared Data Truths is the first stage', ALL_STAGES[0].id === 'shared-data-truths');
ok('Shared Data Truths states its exit outcome', Boolean(ALL_STAGES[0].exitOutcome));
ok('no stage zero is in the live flow',
  !ALL_STAGES.some(s => /stage.?0|digital.?foundation|diagnostic/i.test(s.id + s.title)));

/* ── report ──────────────────────────────────────────────────────────────── */
const unavailable = assets.filter(a => !isAvailable(a));
console.log(`\n  ${pairs.length} pairs across ${ALL_STAGES.length} stages.`);
console.log(`  ${assets.length - unavailable.length} of ${assets.length} halves are live and linked.`);
if (unavailable.length) {
  console.log('\n  Shown, disabled, excluded from completion:');
  for (const a of unavailable) console.log(`    ${a.kind.padEnd(4)} ${a.label.padEnd(30)} ${a.note}`);
}
console.log(`\n${bad ? `${bad} problem(s)` : 'all checks pass'}\n`);
process.exit(bad ? 1 : 0);
