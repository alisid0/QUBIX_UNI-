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
import { READ_THE_TABLE_MISSION } from './read-the-table-mission.js';
import { MISSING_DATA_MISSION } from './missing-data-mission.js';
import { TABLE_GRAIN_MISSION } from './table-grain-mission.js';
import { DUPLICATE_RECORDS_MISSION } from './duplicate-records-mission.js';
import { JOIN_GRAIN_MISSION } from './join-grain-mission.js';
import { UNITS_MEASUREMENT_MISSION } from './units-measurement-mission.js';
import { DATA_LINEAGE_MISSION } from './data-lineage-mission.js';
import { ANALYST_DESK_MISSION } from './analyst-desk-mission.js';
import { SQL_CONSOLE_MISSION } from './sql-console-mission.js';
import { DISTRIBUTION_DESK_MISSION } from './distribution-desk-mission.js';
import { PYTHON_TRACE_MISSION } from './python-trace-mission.js';
import { FUNCTION_WORKSHOP_MISSION } from './function-workshop-mission.js';
import { DATA_VISUALIZATION_MISSION } from './data-visualization-mission.js';
import { RATE_DESK_MISSION } from './rate-desk-mission.js';
import { SAMPLING_DESK_MISSION } from './sampling-desk-mission.js';
import { RESULT_CHECKPOINT_MISSION } from './result-checkpoint-mission.js';
import { HANDOVER_PACK_MISSION } from './handover-pack-mission.js';
import { REGION_GRAIN_MISSION } from './region-grain-mission.js';
import { ZONE_PRICE_MISSION } from './zone-price-mission.js';
import { UOM_MISSION } from './uom-mission.js';

const KEY = 'qx.superstore.progress.v1';

// The roster reads its titles from the missions themselves, so a renamed
// mission cannot leave a stale name on the hub. `slug` is the route.
export const MISSIONS = Object.freeze([
  { slug: 'checkout', mission: CHECKOUT_MISSION, xp: 40,
    teaches: 'Where a number comes from: observe, look up, derive.',
    reading: { chapter: 1, session: 1, label: 'Data is a record, not reality' } },
  { slug: 'read-the-table', mission: READ_THE_TABLE_MISSION, xp: 50,
    teaches: 'What one row contains, and what one column records across every row.',
    reading: { chapter: 1, session: 2, label: 'Rows and columns' } },
  { slug: 'table-grain', mission: TABLE_GRAIN_MISSION, xp: 70,
    teaches: 'What one row represents, stated precisely enough to count.',
    reading: { chapter: 1, session: 3, label: 'One row means one thing' } },
  { slug: 'missing-data', mission: MISSING_DATA_MISSION, xp: 60,
    teaches: 'Five kinds of empty cell, and why none of them is zero.',
    reading: { chapter: 1, session: 4, label: 'A value needs context' } },
  { slug: 'units-measurement', mission: UNITS_MEASUREMENT_MISSION, xp: 70,
    teaches: 'What a value measures, and converting it without losing the original.',
    reading: { chapter: 2, session: 1, label: 'A number needs a unit' } },
  { slug: 'uom', mission: UOM_MISSION, xp: 100,
    teaches: 'Checking a column means one thing before aggregating it, and confirming by a second route.',
    reading: { chapter: 2, session: 1, label: 'A number needs a unit' } },
  { slug: 'rate-desk', mission: RATE_DESK_MISSION, xp: 150,
    teaches: 'Naming the denominator under a figure before comparing anything with it.',
    reading: { chapter: 2, session: 2, label: 'Ratios, rates and percentages' } },
  // Still the mission after ch03.02, where data types are actually taught.
  { slug: 'classify-data', mission: CLASSIFICATION_MISSION, xp: 50,
    teaches: 'What kind of thing a value is, and what that permits.',
    reading: { chapter: 3, session: 2, label: 'A postcode and a price' } },
  { slug: 'duplicate-records', mission: DUPLICATE_RECORDS_MISSION, xp: 70,
    teaches: 'Which columns make a row unique, and what a duplicate is.',
    reading: { chapter: 3, session: 3, label: 'One row, one thing' } },
  { slug: 'data-lineage', mission: DATA_LINEAGE_MISSION, xp: 60,
    teaches: 'Where a reported number came from, and what changed it.',
    reading: { chapter: 3, session: 4, label: 'Where did this number come from?' } },
  { slug: 'distribution-desk', mission: DISTRIBUTION_DESK_MISSION, xp: 150,
    teaches: 'Reading the shape of a set of values before choosing a summary for it.',
    reading: { chapter: 4, session: 1, label: 'Look at the shape before the summary' } },
  { slug: 'zone-price', mission: ZONE_PRICE_MISSION, xp: 110,
    teaches: 'Giving a price the grain it needs, and weighting an average to match the question.',
    reading: { chapter: 4, session: 3, label: 'Centre is a choice' } },
  { slug: 'sampling-desk', mission: SAMPLING_DESK_MISSION, xp: 170,
    teaches: 'Setting the population boundary from the sample frame before making a claim.',
    reading: { chapter: 4, session: 3, label: 'Who is in the data, and who is not' } },
  { slug: 'sql-console', mission: SQL_CONSOLE_MISSION, xp: 160,
    teaches: 'Building a query clause by clause, and reading what it did to the grain.',
    reading: { chapter: 5, session: 1, label: 'Asking a table a question' } },
  { slug: 'region-grain', mission: REGION_GRAIN_MISSION, xp: 120,
    teaches: 'Establishing which hierarchy a grouping column belongs to before reporting by it.',
    reading: { chapter: 5, session: 2, label: 'Grouping changes the grain on purpose' } },
  { slug: 'join-grain', mission: JOIN_GRAIN_MISSION, xp: 90,
    teaches: 'What a join does to the row before you run it.',
    reading: { chapter: 5, session: 3, label: 'Joining without changing what a row is' } },
  { slug: 'result-checkpoint', mission: RESULT_CHECKPOINT_MISSION, xp: 180,
    teaches: 'Testing grain, boundaries, NULL behaviour and control totals before releasing a query result.',
    reading: { chapter: 5, session: 4, label: 'Checking a result before believing it' } },
  { slug: 'python-trace', mission: PYTHON_TRACE_MISSION, xp: 170,
    teaches: 'Predicting what a program leaves in each name, then stepping through to see it happen.',
    reading: { chapter: 6, session: 1, label: 'Telling a machine what to do' } },
  { slug: 'function-workshop', mission: FUNCTION_WORKSHOP_MISSION, xp: 175,
    teaches: 'Naming a rule as a function, and stating what it returns when the input is missing.',
    reading: { chapter: 6, session: 3, label: 'Giving a piece of work a name' } },
  { slug: 'data-visualization', mission: DATA_VISUALIZATION_MISSION, xp: 180,
    teaches: 'Choosing a chart from the question, then auditing its scale, labels and accessibility.',
    reading: { chapter: 7, session: 2, label: 'A chart that does not flatter' } },
  { slug: 'analyst-desk', mission: ANALYST_DESK_MISSION, xp: 200,
    teaches: 'Turning an unclear question into a unit, evidence, a chart and a defensible sentence.',
    reading: { chapter: 7, session: 3, label: 'Separating what you found from what you think' } },
  { slug: 'handover-pack', mission: HANDOVER_PACK_MISSION, xp: 190,
    teaches: 'Packaging inputs, versions, commands and checks so somebody else can run the work.',
    reading: { chapter: 7, session: 4, label: 'Work somebody else can run' } }
].map(Object.freeze));

export const TOTAL_XP = MISSIONS.reduce((n, m) => n + m.xp, 0);

// Earned, not given. Each rank needs the work below it done.
export const RANKS = Object.freeze([
  { at: 0, title: 'Pre-Intern Candidate', note: 'No assumed technical or mathematical knowledge.' },
  { at: 90, title: 'Pre-Intern', note: 'Can trace a value from event to record.' },
  { at: 220, title: 'Pre-Intern, Data Quality', note: 'Can state a table’s grain and tell an absence from a zero.' },
  { at: 440, title: 'Pre-Intern, Quantitative', note: 'Can state units, denominators and rates.' },
  { at: 570, title: 'Data Intern', note: 'Can test uniqueness and trace a number to its source.' },
  { at: 1320, title: 'Data Intern, Advanced', note: 'Can sample, query, join and verify without outrunning the evidence.' },
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

/** One access rule for the hub, store map and direct mission URLs. */
export function missionIsOpen(state, slug) {
  return statusOf(state).find(m => m.slug === slug)?.open ?? false;
}
