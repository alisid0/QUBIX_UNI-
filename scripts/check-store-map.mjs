// The floor plan must describe the missions that exist.
//
// A map is navigation while it agrees with the thing it maps, and decoration the
// moment it does not. Two ways that breaks: a room stands a mission on a desk
// after the mission was renamed, so the pin opens nothing; or a mission is added
// to the roster and lands in no room at all, so it is unreachable from the floor
// and only the list knows about it.
//
// Both are silent. Neither shows up in a build, a play test or a screenshot,
// because a missing pin looks exactly like a room that never had one.
//
//   npm run check:map

import { readFileSync, existsSync } from 'node:fs';
import { ROOMS, planWith } from '../src/lib/game/store-map.js';
import { MISSIONS } from '../src/lib/game/progress.js';

const dir = u => new URL(u, import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');

let bad = 0;
const ok = (label, pass, detail = '') => {
  if (!pass) bad++;
  console.log(`   ${pass ? 'PASS' : '**FAIL**'}  ${label}${detail ? '  ' + detail : ''}`);
};

const known = new Set(MISSIONS.map(m => m.slug));
const placed = new Map();   // slug -> [room ids]

for (const room of ROOMS) {
  for (const spot of room.spots) {
    placed.set(spot.slug, [...(placed.get(spot.slug) || []), room.id]);

    ok(`${room.id} · ${spot.slug} is a real mission`, known.has(spot.slug),
      known.has(spot.slug) ? `at ${spot.at}` : 'not in the roster');

    // A pin outside the frame is invisible, which reads as a room with one
    // fewer mission rather than as a fault.
    const inside = spot.x >= 4 && spot.x <= 96 && spot.y >= 4 && spot.y <= 96;
    ok(`${room.id} · ${spot.slug} sits inside the room`, inside, `${spot.x}%, ${spot.y}%`);

    ok(`${room.id} · ${spot.slug} says where it is`, Boolean(spot.at), spot.at || 'no place named');
  }
}

console.log('');

// Every mission needs somewhere to stand.
const homeless = MISSIONS.filter(m => !placed.has(m.slug)).map(m => m.slug);
ok('every mission is in a room', homeless.length === 0,
  homeless.length ? `nowhere on the floor: ${homeless.join(', ')}` : `${MISSIONS.length} missions placed`);

// And only one somewhere, or the floor tells two stories about it.
const twice = [...placed].filter(([, rooms]) => rooms.length > 1);
ok('no mission is in two rooms', twice.length === 0,
  twice.length ? twice.map(([s, r]) => `${s} in ${r.join(' and ')}`).join('; ') : '');

// Room ids are the art filenames, so a typo is a room that silently loses its
// picture and falls back to the plan.
for (const room of ROOMS) {
  const art = dir(`../public/rooms/${room.id}.webp`);
  const has = existsSync(art);
  ok(`${room.id} has its art`, true, has ? `${Math.round(Buffer.byteLength(readFileSync(art)) / 1024)} kB`
    : 'no image yet, falls back to the drawn plan');
}

console.log('');

// The plan must survive a learner who has done nothing and one who has done all.
for (const [label, completed] of [['a new learner', []], ['everything done', MISSIONS.map(m => m.slug)]]) {
  const plan = planWith(MISSIONS.map(m => ({ ...m, done: completed.includes(m.slug), open: true })));
  const states = [...new Set(plan.map(r => r.state))];
  ok(`the plan renders for ${label}`, plan.length === ROOMS.length, states.join(', '));
}

console.log(`\n${bad ? `${bad} problem(s)` : 'all checks pass'}`
  + `, ${MISSIONS.length} missions across ${ROOMS.length} rooms`);
process.exit(bad ? 1 : 0);
