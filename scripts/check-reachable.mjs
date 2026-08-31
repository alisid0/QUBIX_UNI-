// A learner-facing surface must be reachable by clicking.
//
// This exists because the same mistake happened three times in one stretch of
// work. A 54-table dataset was built that nothing queried. A SQL console was
// built over it that nothing linked to. An assistant was mounted on Home.svelte,
// which production does not serve, so the front door had no front door.
//
// Every one of those passed every guard, built cleanly, and worked when opened
// by hand with a URL somebody happened to know. None of them existed for a
// learner. "It works if you know the address" is the failure this catches.
//
// Authoring surfaces are exempt by omission, because they are deliberately
// unreachable: the factory, the parts sheet, the asset showcases and the
// approver are internal, and linking them from a lesson would be the bug.
//
//   node scripts/check-reachable.mjs

import { readFileSync, readdirSync } from 'node:fs';
import { MISSIONS } from '../src/lib/game/progress.js';

const dir = u => new URL(u, import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const VIEWS = dir('../src/views/');

let failed = false;
const check = (condition, label, detail = '') => {
  console.log(`   ${condition ? 'PASS' : '**FAIL**'}  ${label}${detail ? '  ' + detail : ''}`);
  if (!condition) failed = true;
};

const app = readFileSync(dir('../src/App.svelte'), 'utf8');
const markup = readdirSync(VIEWS).filter(n => n.endsWith('.svelte'))
  .map(name => ({ name, source: readFileSync(VIEWS + name, 'utf8') }));
const everything = markup.map(v => v.source).join('\n');

/* ── routes a learner is meant to reach ──────────────────────────────────── */
const LEARNER_ROUTES = [
  { query: '?lab=sql', what: 'the data console', definedIn: 'DataConsole.svelte' },
  { query: '/study', what: 'study rooms', definedIn: 'StudyRooms.svelte' }
];

for (const route of LEARNER_ROUTES) {
  const from = markup
    .filter(v => v.name !== route.definedIn && v.source.includes(route.query))
    .map(v => v.name);
  check(from.length > 0, `${route.what} is linked from somewhere a learner will be`,
    from.length ? from.join(', ') : `nothing links to ${route.query}`);
}

/* ── and once there, a way back ──────────────────────────────────────────── */
const dataConsole = markup.find(v => v.name === 'DataConsole.svelte');
if (dataConsole) {
  check(/href="\?mode=game/.test(dataConsole.source),
    'the data console offers a way back into the course');
}

/* ── a mounted view must be one production actually serves ───────────────────
   Home.svelte is not it. Production renders RoleFoundations at the root, so a
   component that only exists on Home is invisible to everybody who visits. */
const landingIsRoleFoundations = /productionFoundationLanding \? 'foundations'/.test(app)
  && /mission === 'foundations'[\s\S]{0,90}RoleFoundations/.test(app);
check(landingIsRoleFoundations,
  'the production landing is still RoleFoundations, as this guard assumes');

const landing = markup.find(v => v.name === 'RoleFoundations.svelte');
check(Boolean(landing?.source.includes('WorkshopAssistant')),
  'Ask Qubix is on the page production actually serves, not only on Home');

/* ── every mission the roster names has a route ──────────────────────────── */
const routed = new Set([...app.matchAll(/mission === '([a-z-]+)'/g)].map(m => m[1]));
const unrouted = MISSIONS.map(m => m.slug).filter(slug => !routed.has(slug));
check(unrouted.length === 0, 'every rostered mission has a route',
  unrouted.length ? `no route for ${unrouted.join(', ')}` : `${MISSIONS.length} missions`);

/* ── the unlock order must not walk backwards through the course ─────────────
   Missions unlock in roster order, and each declares the reading it belongs to.
   A mission placed after a later chapter's mission is unreachable until long
   after the lesson that explains it, which is how uom ended up at position 15
   teaching chapter 2. Nothing failed: it simply could not be opened when it
   made sense to open it.                                                      */
let deepest = 0;
const backwards = [];
const place = m => (m.reading?.chapter ?? 0) * 100 + (m.reading?.session ?? 0);
const label = m => `ch${m.reading?.chapter}.${m.reading?.session}`;
let deepestMission = null;
for (const m of MISSIONS) {
  if (place(m) < deepest) backwards.push(`${m.slug} (${label(m)} after ${label(deepestMission)})`);
  if (place(m) >= deepest) { deepest = place(m); deepestMission = m; }
}
check(backwards.length === 0, 'the unlock order follows the course rather than doubling back',
  backwards.length ? backwards.join(', ') : `${MISSIONS.length} missions in reading order`);

/* ── links must point at routes that exist ───────────────────────────────── */
const linked = [...new Set([...everything.matchAll(/mission=([a-z-]+)/g)].map(m => m[1]))];
const dead = linked.filter(slug => !routed.has(slug));
check(dead.length === 0, 'no view links to a mission that has no route',
  dead.length ? dead.join(', ') : `${linked.length} distinct targets`);

console.log(failed
  ? '\n  a learner cannot reach something that was built for them\n'
  : '\n  everything built for a learner can be clicked to\n');
process.exit(failed ? 1 : 0);
