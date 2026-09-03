// How long a step takes, computed once.
//
// check-timing.mjs already owned this model and owned it well:
//
//   reading   words / 220 wpm, times 2.4 for studying rather than skimming
//   exercise  its own declared minutes, because a learner really spends them
//   doing     the mission's own words, plus 15 seconds a decision
//
// The floor now shows those numbers to learners, and a second implementation of
// the same arithmetic is how the guard and the interface start disagreeing. So
// the model lives here and both import it. If the model is wrong, it is wrong
// in one place.
//
// A displayed minute count is one of the few figures on this site a learner
// acts on: they read it and decide whether to start now or later. check-timing
// exists because these numbers had drifted badly enough to tell a newcomer that
// Volume 0 takes 28 hours when it takes about five and a half.

import { SHARED_FOUNDATIONS } from './shared-foundations.js';
import { MISSIONS } from '../game/progress.js';

export const WPM = 220;
export const STUDY = 2.4;
export const THINK = 15;

/** Words in anything: a string, a list, or a nested record. */
export const deep = value =>
  typeof value === 'string' ? value.trim().split(/\s+/).filter(Boolean).length
    : Array.isArray(value) ? value.reduce((n, x) => n + deep(x), 0)
      : value && typeof value === 'object' ? Object.values(value).reduce((n, x) => n + deep(x), 0)
        : 0;

/** Choices a learner has to make, which cost thinking time rather than reading time. */
export const decisionsIn = root => {
  let n = 0;
  const walk = x => {
    if (Array.isArray(x)) return x.forEach(walk);
    if (!x || typeof x !== 'object') return;
    for (const [key, value] of Object.entries(x)) {
      const isOptionList = Array.isArray(value) && value.length > 1
        && value.every(o => Array.isArray(o) && o.length >= 2 && typeof o[0] === 'string');
      if (isOptionList && (key.endsWith('Options') || key === 'options')) n += 1;
      walk(value);
    }
  };
  walk(root);
  return n;
};

const missionMinutes = new Map(MISSIONS.map(entry =>
  [entry.slug, deep(entry.mission) / WPM + (decisionsIn(entry.mission) * THINK) / 60]));

const sessionMinutes = new Map();
for (const { chapter, book } of SHARED_FOUNDATIONS) {
  for (const session of book.sessions) {
    // Sessions declare their own minutes and check-timing keeps that honest
    // against the words, so the declared figure is the one to show.
    sessionMinutes.set(`${chapter}.${Number(session.number)}`, session.studyMinutes);
  }
}

/**
 * Minutes for one floor asset, or null when nothing declares or implies a
 * duration. Null is a real answer: a step nobody has timed should say nothing
 * rather than claim a number somebody invented.
 */
export function assetMinutes(asset) {
  if (!asset) return null;
  if (asset.kind === 'read') {
    const declared = sessionMinutes.get(`${asset.chapter}.${Number(asset.session)}`);
    return Number.isFinite(declared) ? Math.max(1, Math.round(declared)) : null;
  }
  const computed = missionMinutes.get(asset.slug);
  return Number.isFinite(computed) ? Math.max(1, Math.round(computed)) : null;
}

/** "12 min", or "1 h 05 min" once a number stops being scannable as minutes. */
export function formatMinutes(minutes) {
  if (!Number.isFinite(minutes) || minutes <= 0) return null;
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest ? `${hours} h ${String(rest).padStart(2, '0')} min` : `${hours} h`;
}
