// The chapter route must be one number, and it must be true.
//
// This exists because the chapter reported its own length two ways at once for
// months and nobody noticed: 12 in the header, 24 in the footer, neither of
// them the number of things a learner does in chapter one. A count that is
// computed from whatever is on the page will drift again the moment a session
// gains an exercise, so the route is declared and checked instead.
//
//   node scripts/check-route-steps.mjs

import { readFileSync } from 'node:fs';
import { SHARED_FOUNDATIONS } from '../src/lib/content/shared-foundations.js';
import { CHAPTER_ONE_ROUTE, ROUTE_LENGTH, briefingSteps, missionSteps,
  stepForSession } from '../src/lib/content/chapter-route.js';
import { ROUTED_MISSION_SLUGS } from './site-routes.mjs';

let bad = 0;
const ok = (label, pass, detail = '') => {
  if (!pass) bad++;
  console.log(`   ${pass ? 'PASS' : '**FAIL**'}  ${label}${detail ? '  ' + detail : ''}`);
};

const sessions = SHARED_FOUNDATIONS.find(c => c.chapter === 1).book.sessions;

ok('the route is ten steps', ROUTE_LENGTH === 10, `${ROUTE_LENGTH} steps`);

ok('steps are numbered 1 to 10 with no gaps',
  CHAPTER_ONE_ROUTE.every((s, i) => s.step === i + 1));

ok('briefings and missions alternate',
  CHAPTER_ONE_ROUTE.every((s, i) => s.kind === (i % 2 === 0 ? 'briefing' : 'mission')),
  CHAPTER_ONE_ROUTE.map(s => s.kind[0]).join(''));

ok('five briefings and five missions',
  briefingSteps().length === 5 && missionSteps().length === 5,
  `${briefingSteps().length} briefings, ${missionSteps().length} missions`);

/* Every briefing is a session that exists, and every session is on the route.
   This is the check that catches a session being renamed or dropped. */
const ghosts = briefingSteps().filter(s => !sessions.some(x => x.id === s.id));
ok('every briefing step is a real session', ghosts.length === 0,
  ghosts.map(g => g.id).join(', '));

const offRoute = sessions.filter(s => !stepForSession(s.id));
ok('every chapter one session is on the route', offRoute.length === 0,
  offRoute.map(s => s.id).join(', '));

/* A step may promise a mission that is not built yet, but it may not promise a
   slug the router has never heard of: that is a dead link, not a plan. */
const unknown = missionSteps().filter(s => !ROUTED_MISSION_SLUGS.includes(s.mission));
ok('every mission step names a slug the router implements', unknown.length === 0,
  unknown.map(s => `${s.id}→${s.mission}`).join(', '));

ok('every mission step says whether it is built',
  missionSteps().every(s => typeof s.built === 'boolean'),
  `${missionSteps().filter(s => s.built).length} built, ${missionSteps().filter(s => !s.built).length} to build`);

ok('every step states one learning result',
  CHAPTER_ONE_ROUTE.every(s => s.result && /[.!?]$/.test(s.result)));

ok('no two steps share an id',
  new Set(CHAPTER_ONE_ROUTE.map(s => s.id)).size === ROUTE_LENGTH);

/* The reason this file exists: one denominator, on screen, anywhere. */
const book = readFileSync(new URL('../src/views/SharedFoundationsBook.svelte', import.meta.url), 'utf8');
ok('the book view does not print a second denominator',
  !/PATH_LENGTH/.test(book),
  /PATH_LENGTH/.test(book) ? 'beginner-path step counter is still rendered' : 'one counter only');

ok('the route header counts the route',
  book.includes('routeProgress') || book.includes('ROUTE_LENGTH'),
  'book view reads chapter-route.js');

console.log(`\n${bad ? `${bad} problem(s)` : 'all checks pass'}, `
  + `${ROUTE_LENGTH} steps: ${missionSteps().filter(s => s.built).length} missions built, `
  + `${missionSteps().filter(s => !s.built).length} to build`);
process.exit(bad ? 1 : 0);
