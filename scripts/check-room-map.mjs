// The floor map must describe the missions that are actually in each room.
//
// Written after the Academy showed "Aisles · 02 · Classify Store Data" for a
// day, while the route, the roster and the session all said Read the Table.
// The room list carried its own copy of the numbers and the names, so moving a
// mission updated everything except the picture of the shop.
//
//   node scripts/check-room-map.mjs

import { readFileSync } from 'node:fs';
import { MISSIONS } from '../src/lib/game/progress.js';
import { ROOMS as FLOOR_ROOMS } from '../src/lib/game/store-map.js';

let bad = 0;
const ok = (label, pass, detail = '') => {
  if (!pass) bad++;
  console.log(`   ${pass ? 'PASS' : '**FAIL**'}  ${label}${detail ? '  ' + detail : ''}`);
};

const hub = readFileSync(new URL('../src/views/GameHub.svelte', import.meta.url), 'utf8');

/* The plan is read out of the source rather than imported, because a Svelte
   component cannot be imported here without a compiler. */
const plan = [...hub.matchAll(
  /\{\s*id:\s*'([a-z-]+)',[^}]*?name:\s*'([^']+)',\s*slugs:\s*\[([^\]]+)\](?:,\s*theme:\s*'([^']*)')?\s*\}/g
)].map(m => ({
  id: m[1], name: m[2],
  slugs: m[3].split(',').map(s => s.trim().replace(/'/g, '')).filter(Boolean),
  theme: m[4] || null
}));

ok('the room plan can be read', plan.length >= 5, `${plan.length} rooms`);

/* ── the numbers are not written by hand any more ────────────────────────── */
ok('room numbers are derived, not typed',
  /numbersFor\(room\.slugs\)/.test(hub) && !/missions: '\d/.test(hub));

/* ── every room names missions that exist ────────────────────────────────── */
const slugs = new Set(MISSIONS.map(m => m.slug));
const ghosts = plan.flatMap(r => r.slugs.filter(s => !slugs.has(s)).map(s => `${r.id}→${s}`));
ok('every room names missions that exist', ghosts.length === 0, ghosts.join(', '));

/* ── no mission is in two rooms, and none is homeless ────────────────────── */
const placed = plan.flatMap(r => r.slugs);
const twice = placed.filter((s, i) => placed.indexOf(s) !== i);
ok('no mission is in two rooms', twice.length === 0, twice.join(', '));

// The hub shows six rooms and the floor map shows every one, so a mission need
// not be on the hub. It must be somewhere.
const onFloor = new Set(FLOOR_ROOMS.flatMap(r => (r.spots || []).map(s => s.slug)));
const invisible = MISSIONS.map(m => m.slug).filter(s => !placed.includes(s) && !onFloor.has(s));
ok('no mission is invisible on both maps', invisible.length === 0,
  invisible.length ? invisible.join(', ') : `${placed.length} on the hub, ${onFloor.size} on the floor`);

/* ── the check that would have caught this one ───────────────────────────── */
// A room's written theme must not name a mission that lives in another room.
for (const room of plan.filter(r => r.theme)) {
  const trespass = MISSIONS.filter(m =>
    room.theme.toLowerCase().includes(m.mission.title.toLowerCase()) && !room.slugs.includes(m.slug));
  ok(`${room.name} does not name a mission from another room`,
    trespass.length === 0, trespass.map(m => m.mission.title).join(', '));
}

/* ── the floor map agrees with the hub ───────────────────────────────────── */
// Both draw the same shop. A mission pinned to one room here and another there
// is the same class of bug one layer down.
const spots = FLOOR_ROOMS.flatMap(room => (room.spots || []).map(s => [s.slug, room.id]));
ok('every floor-map spot is a real mission',
  spots.every(([slug]) => slugs.has(slug)),
  spots.filter(([s]) => !slugs.has(s)).map(([s]) => s).join(', '));

// The two maps use different ids for a few of the same places.
const SAME_PLACE = { checkout: 'tills', 'board-room': 'boardroom' };
const disagreed = spots
  .map(([slug, floorRoom]) => {
    const hubRoom = plan.find(r => r.slugs.includes(slug));
    if (!hubRoom) return null;
    const expected = SAME_PLACE[hubRoom.id] || hubRoom.id;
    return expected === floorRoom ? null : `${slug}: ${hubRoom.id} on the hub, ${floorRoom} on the floor`;
  })
  .filter(Boolean);
ok('a mission is in the same room on both maps', disagreed.length === 0, disagreed.join(' | '));

ok('read-the-table is on the floor map',
  spots.some(([slug]) => slug === 'read-the-table'),
  spots.map(([s, r]) => `${s}@${r}`).join(', '));

console.log(`\n${bad ? `${bad} problem(s)` : 'all checks pass'}, ${plan.length} rooms, ${placed.length} missions placed`);
process.exit(bad ? 1 : 0);
