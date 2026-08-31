// Dumb matcher: intent, topic atom, band, then weaker fields.
//
// No chat embeddings. No "I'm good at maths". Reject mixed goals and lopsided
// rooms. Partial fill with same-band bots beats a bad five.

import { adjacentBands, bandById, bandSpread } from './bands.js';
import { adjacentAtomIds, atomById } from './atoms.js';
import { intentById } from './intents.js';

export const HUMAN_CAP = 5;
export const MIN_HUMANS_BEFORE_BOT_FILL = 1;

export function sameIntent(seats) {
  const ids = [...new Set(seats.map(seat => seat.intent))];
  return ids.length === 1 && Boolean(intentById(ids[0]));
}

export function compatibleAtoms(seats) {
  if (!seats.length) return false;
  const ids = [...new Set(seats.map(seat => seat.atomId))];
  if (ids.length === 1) return Boolean(atomById(ids[0]));
  if (ids.length !== 2) return false;
  const [a, b] = ids.map(atomById);
  if (!a || !b) return false;
  return adjacentAtomIds(a).includes(b.id) || adjacentAtomIds(b).includes(a.id);
}

export function compatibleBands(seats, intentId) {
  const intent = intentById(intentId);
  if (!intent) return false;
  const bands = seats.map(seat => seat.band);
  const spread = bandSpread(bands);
  if (intent.skillMix === 'same') return spread === 0;
  if (intent.skillMix === 'adjacent' || intent.skillMix === 'medium') return spread <= 1;
  return spread <= 2;
}

export function explainerCount(seats) {
  return seats.filter(seat => seat.role === 'explainer').length;
}

export function beginnerHeavy(seats) {
  return seats.filter(seat => bandById(seat.band).rank <= 1).length >= Math.ceil(seats.length / 2);
}

export function rejectReason(seats) {
  if (!seats.length) return 'empty';
  if (seats.filter(seat => seat.kind !== 'bot').length > HUMAN_CAP) return 'too-many-humans';
  if (!sameIntent(seats)) return 'mixed-intents';
  if (!compatibleAtoms(seats)) return 'mixed-atoms';
  const intentId = seats[0].intent;
  if (!compatibleBands(seats, intentId)) return 'band-spread';

  const humans = seats.filter(seat => seat.kind !== 'bot');
  const l0 = humans.filter(seat => seat.band === 'L0').length;
  const l4 = humans.filter(seat => seat.band === 'L4').length;
  if (l4 >= 2 && l0 >= 3) return 'two-l4-three-l0';
  if (humans.length >= 3 && l4 === humans.length && atomById(seats[0].atomId) && bandById('L0')) {
    const atom = atomById(seats[0].atomId);
    if (atom?.sessionNumber === 1 && atom.chapter === 1 && l4 === humans.length) return 'all-l4-intro';
  }

  const beginners = humans.filter(seat => bandById(seat.band).rank <= 1);
  const advancedExplainers = humans.filter(seat =>
    seat.role === 'explainer' && bandById(seat.band).rank >= 3);
  if (beginners.length && advancedExplainers.length > 1) return 'too-many-explainers';
  if (beginners.length && advancedExplainers.length === 1) {
    const extras = humans.filter(seat => bandById(seat.band).rank >= 3 && seat.role !== 'explainer');
    if (extras.length) return 'advanced-without-explainer-opt-in';
  }

  return null;
}

export function pairScore(a, b) {
  if (a.intent !== b.intent) return -100;
  if (a.atomId !== b.atomId) {
    const atom = atomById(a.atomId);
    if (!atom || !adjacentAtomIds(atom).includes(b.atomId)) return -80;
  }
  if (!adjacentBands(a.band, b.band)) return -40;
  let score = 100;
  if (a.atomId === b.atomId) score += 20;
  if (a.band === b.band) score += 10;
  if (a.language && b.language && a.language === b.language) score += 5;
  if (a.modality && b.modality && a.modality === b.modality) score += 5;
  if (a.role === 'explainer' && bandById(b.band).rank <= 1) score += 8;
  if (a.role === 'explainer' && b.role === 'explainer') score -= 6;
  return score;
}

export function rankCandidates(seat, waiting) {
  return waiting
    .map(other => ({ seat: other, score: pairScore(seat, other) }))
    .filter(row => row.score > 0)
    .sort((a, b) => b.score - a.score);
}

export function canSeatTogether(seats) {
  return rejectReason(seats) === null;
}
