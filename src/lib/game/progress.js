// What the learner has done, and what that makes them.
//
// Until now the missions were five polished set-pieces with nothing joining
// them: no record of what had been completed, no way in, and no ending. Closing
// the tab lost everything. This is the joining.
//
// It stores in localStorage on purpose. A backend would need accounts before a
// single person could try the thing, and the first question worth answering is
// whether anyone wants to play it at all. Moving to Supabase later means
// changing load and save and nothing else.

import { CHECKOUT_MISSION } from './checkout-mission.js';
import { CLASSIFICATION_MISSION } from './data-classification-mission.js';
import { MISSING_DATA_MISSION } from './missing-data-mission.js';
import { TABLE_GRAIN_MISSION } from './table-grain-mission.js';
import { DUPLICATE_RECORDS_MISSION } from './duplicate-records-mission.js';
import { JOIN_GRAIN_MISSION } from './join-grain-mission.js';
import { UNITS_MEASUREMENT_MISSION } from './units-measurement-mission.js';
import { DATA_LINEAGE_MISSION } from './data-lineage-mission.js';
import { ANALYST_DESK_MISSION } from './analyst-desk-mission.js';
import { SQL_CONSOLE_MISSION } from './sql-console-mission.js';

const KEY = 'qx.superstore.progress.v1';

// The roster reads its titles from the missions themselves, so a renamed
// mission cannot leave a stale name on the hub. `slug` is the route.
export const MISSIONS = Object.freeze([
  { slug: 'checkout', mission: CHECKOUT_MISSION, xp: 40,
    teaches: 'Where a number comes from: observe, look up, derive.' },
  { slug: 'classify-data', mission: CLASSIFICATION_MISSION, xp: 50,
    teaches: 'What kind of thing a value is, and what that permits.' },
  { slug: 'missing-data', mission: MISSING_DATA_MISSION, xp: 60,
    teaches: 'Five kinds of empty cell, and why none of them is zero.' },
  { slug: 'table-grain', mission: TABLE_GRAIN_MISSION, xp: 70,
    teaches: 'What one row represents, stated precisely enough to count.' },
  { slug: 'duplicate-records', mission: DUPLICATE_RECORDS_MISSION, xp: 70,
    teaches: 'Which columns make a row unique, and what a duplicate is.' },
  { slug: 'join-grain', mission: JOIN_GRAIN_MISSION, xp: 90,
    teaches: 'What a join does to the row before you run it.' },
  { slug: 'data-lineage', mission: DATA_LINEAGE_MISSION, xp: 60,
    teaches: 'Where a reported number came from, and what changed it.' },
  { slug: 'units-measurement', mission: UNITS_MEASUREMENT_MISSION, xp: 70,
    teaches: 'What a value measures, and converting it without losing the original.' },
  { slug: 'analyst-desk', mission: ANALYST_DESK_MISSION, xp: 120,
    teaches: 'Turning an unclear question into a unit, evidence, a chart and a defensible sentence.' },
  { slug: 'sql-console', mission: SQL_CONSOLE_MISSION, xp: 110,
    teaches: 'Building a query clause by clause, and reading what it did to the grain.' }
].map(Object.freeze));

export const TOTAL_XP = MISSIONS.reduce((n, m) => n + m.xp, 0);

// Earned, not given. Each rank needs the work below it done.
export const RANKS = Object.freeze([
  { at: 0, title: 'Pre-Intern Candidate', note: 'No assumed technical or mathematical knowledge.' },
  { at: 90, title: 'Pre-Intern', note: 'Can trace a value from event to record.' },
  { at: 220, title: 'Pre-Intern, Data Quality', note: 'Can tell an absence from a zero.' },
  { at: 290, title: 'Pre-Intern, Senior', note: 'Can state a table’s grain.' },
  { at: 380, title: 'Pre-Intern, Lead', note: 'Can predict what a join does before running it.' },
  { at: 510, title: 'Data Intern', note: 'Can trace a number to its source and state its unit.' },
  { at: TOTAL_XP, title: 'Analyst, Volume I', note: 'Can answer an unclear question without outrunning the evidence.' }
].map(Object.freeze));

const blank = () => ({ completed: [], started: null });

export function load() {
  if (typeof localStorage === 'undefined') return blank();
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (!raw || !Array.isArray(raw.completed)) return blank();
    // Only slugs that still exist. A removed mission must not keep paying XP.
    const known = new Set(MISSIONS.map(m => m.slug));
    return { completed: raw.completed.filter(s => known.has(s)), started: raw.started || null };
  } catch { return blank(); }
}

function save(state) {
  if (typeof localStorage === 'undefined') return state;
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* private mode */ }
  return state;
}

/** Called by a mission when its last case is answered. Idempotent. */
export function recordCompletion(slug) {
  const state = load();
  if (!MISSIONS.some(m => m.slug === slug)) return state;
  if (state.completed.includes(slug)) return state;
  return save({ completed: [...state.completed, slug], started: state.started || new Date().toISOString() });
}

export function reset() { return save(blank()); }

export const xpOf = state => MISSIONS
  .filter(m => state.completed.includes(m.slug))
  .reduce((n, m) => n + m.xp, 0);

export const rankOf = xp => RANKS.reduce((best, r) => (xp >= r.at ? r : best), RANKS[0]);

/** The next rank up, or null once there is nothing left to earn. */
export const nextRankOf = xp => RANKS.find(r => r.at > xp) || null;

/**
 * Missions unlock in order, because each one assumes the last. The next
 * incomplete mission is always available even if earlier ones were skipped by
 * URL, so nobody can be locked out by a link someone sent them.
 */
export function statusOf(state) {
  let reached = false;
  return MISSIONS.map(m => {
    const done = state.completed.includes(m.slug);
    const open = done || !reached;
    if (!done && !reached) reached = true;
    return { ...m, done, open };
  });
}
