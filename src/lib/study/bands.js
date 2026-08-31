// Skill is stored per topic atom, not as "I'm good at data science".
//
// Three fields: performance band, intent (on the room, not here), and role.
// Time spent studying is a weak prior only. Demonstrated work wins.

const KEY = 'qx.study.bands.v1';

export const BANDS = Object.freeze([
  Object.freeze({ id: 'L0', rank: 0, label: 'Terms unknown' }),
  Object.freeze({ id: 'L1', rank: 1, label: 'Can follow an explanation' }),
  Object.freeze({ id: 'L2', rank: 2, label: 'Standard items with nudges' }),
  Object.freeze({ id: 'L3', rank: 3, label: 'Fluent on the standard set' }),
  Object.freeze({ id: 'L4', rank: 4, label: 'Can teach or stretch' })
]);

export const bandById = id => BANDS.find(item => item.id === id) || BANDS[1];

export function bandFromProbeScore(correct, total = 3) {
  if (total <= 0) return 'L1';
  if (correct <= 0) return 'L0';
  if (correct === 1) return 'L1';
  if (correct === 2) return 'L2';
  return 'L3';
}

export function adjacentBands(a, b) {
  return Math.abs(bandById(a).rank - bandById(b).rank) <= 1;
}

export function bandSpread(bands) {
  const ranks = bands.map(id => bandById(id).rank);
  return Math.max(...ranks) - Math.min(...ranks);
}

export function loadBands() {
  if (typeof localStorage === 'undefined') return {};
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || '{}');
    return raw && typeof raw === 'object' ? raw : {};
  } catch {
    return {};
  }
}

export function bandForAtom(atomId) {
  const row = loadBands()[atomId];
  return row?.band || 'L1';
}

export function roleForAtom(atomId) {
  const row = loadBands()[atomId];
  return row?.role || 'learner';
}

export function saveBand(atomId, patch) {
  const all = loadBands();
  const current = all[atomId] || { band: 'L1', role: 'learner' };
  all[atomId] = {
    ...current,
    ...patch,
    updatedAt: new Date().toISOString()
  };
  if (typeof localStorage !== 'undefined') {
    try { localStorage.setItem(KEY, JSON.stringify(all)); } catch { /* private mode */ }
  }
  return all[atomId];
}

export function nudgeBand(atomId, { exitCorrect, taughtSuccessfully }) {
  const current = bandById(bandForAtom(atomId));
  let rank = current.rank;
  if (taughtSuccessfully && rank < 4) rank += 1;
  else if (exitCorrect === true && rank < 3) rank += 1;
  else if (exitCorrect === false && rank > 0) rank -= 1;
  const next = BANDS[rank].id;
  return saveBand(atomId, { band: next });
}
