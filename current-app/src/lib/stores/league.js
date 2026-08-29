// League — local-first. A deterministic simulated cohort (seeded from the user
// id + ISO week, so it's stable within a week and reshuffles Monday 00:00),
// with member points drawn to bracket the user's own weekly points. The
// provider interface is the contract: a Supabase-backed provider drops in
// later without any UI change. Always label this "Preview league".
import { progress } from './progress.js';
import { user } from './auth.js';
import { get } from 'svelte/store';

const FIRST_NAMES = [
  'Aarav', 'Bea', 'Chen', 'Dara', 'Emil', 'Farah', 'Gita', 'Hugo', 'Ines',
  'Jonas', 'Kofi', 'Lena', 'Mateo', 'Nia', 'Omar', 'Priya', 'Quinn', 'Rosa',
  'Sami', 'Tara', 'Umut', 'Vera', 'Wren', 'Yara', 'Zane', 'Alba', 'Boris',
  'Cleo', 'Dmitri', 'Esme'
];

/** Ws-total → league tier name. Thresholds per DESIGN-UPGRADE §7 open Q4. */
export function leagueName(wsTotal) {
  if (wsTotal >= 1000) return 'Platinum League';
  if (wsTotal >= 500) return 'Gold League';
  if (wsTotal >= 300) return 'Silver League';
  if (wsTotal >= 150) return 'Iron League';
  if (wsTotal >= 50) return 'Bronze League';
  return 'Copper League';
}

/** Deterministic PRNG from a string seed (mulberry32 over a simple hash). */
function rng(seedStr) {
  let h = 1779033703;
  for (let i = 0; i < seedStr.length; i++) {
    h = Math.imul(h ^ seedStr.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  let a = h >>> 0;
  return () => {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function mondayKey(dt = new Date()) {
  const d = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

function nextMonday(dt = new Date()) {
  const d = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
  d.setDate(d.getDate() + (7 - ((d.getDay() + 6) % 7)));
  return d;
}

/** getLeague() -> { name, resetsAt, members: [{ name, points, isYou }] } */
export function getLeague() {
  const you = get(user);
  const seed = `${you?.id || 'guest'}::${mondayKey()}`;
  const rand = rng(seed);

  const yourPoints = progress.getWeeklyPoints();
  const size = 22 + Math.floor(rand() * 6); // 22–27 members

  // Cohort points bracket the user: some ahead, most behind, floor at 0.
  // Anchor keeps the league lively even at 0 user points.
  const anchor = Math.max(yourPoints, 30);
  const names = [...FIRST_NAMES].sort(() => rand() - 0.5).slice(0, size);
  const members = names.map(name => ({
    name,
    points: Math.max(0, Math.round(anchor * (0.2 + rand() * 1.5))),
    isYou: false,
  }));
  members.push({ name: 'You', points: yourPoints, isYou: true });
  members.sort((a, b) => b.points - a.points);

  return {
    name: leagueName(progress.getWs()),
    resetsAt: nextMonday().toISOString(),
    members,
  };
}
