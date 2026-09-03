// What the learner has actually done, expressed in learning-floor terms.
//
// The floor is one thing to a learner and two stores underneath: readings are
// recorded per chapter in the reader's own key, missions in the roster's. This
// reads both and answers one question per asset: is it done?
//
// Nothing is written here. The floor is a view over progress the existing
// pages already keep, so a learner who has never opened the floor still
// arrives at it with everything they have finished already showing. That is
// the point of mapping rather than migrating: no new store, no schema change,
// nothing to lose.

import { SHARED_FOUNDATIONS } from './shared-foundations.js';
import { ALL_STAGES, isAvailable } from './learning-flow.js';
import { boards } from './course.js';

const MISSION_KEY = 'qx.superstore.progress.v1';
// The mathematics course's own key, owned by src/lib/stores/progress.js. Read
// here and never written, like the other two.
const MATHS_KEY = 'qubix-university-progress-v1';
const bookKeyFor = chapter => {
  const book = SHARED_FOUNDATIONS.find(c => c.chapter === chapter)?.book;
  return book ? `qubix-shared-foundations-${book.id}-v1` : null;
};

const read = key => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    // A blocked or full store is not a reason to fail the page.
    console.warn(`Could not read ${key}.`, error);
    return null;
  }
};

/** The session id the reader records against, for a chapter and position. */
const sessionIdFor = (chapter, session) =>
  SHARED_FOUNDATIONS.find(c => c.chapter === chapter)?.book.sessions[session - 1]?.id || null;

/**
 * Every asset id the learner has finished.
 *
 * A reading counts once the reader has saved its study step, which already
 * requires the check answered and any applied exercise done. A mission counts
 * once it has recorded its own completion. Unavailable assets can never be
 * completed, so they are never in this list and never in a denominator.
 */
export function completedAssetIds() {
  const done = [];
  const missions = read(MISSION_KEY)?.completed || [];
  const maths = read(MATHS_KEY)?.completed || {};

  // One read per chapter rather than one per session.
  const study = new Map();
  for (const { chapter } of SHARED_FOUNDATIONS) {
    const key = bookKeyFor(chapter);
    const saved = key ? read(key) : null;
    study.set(chapter, Array.isArray(saved?.study) ? saved.study : []);
  }

  for (const stage of ALL_STAGES) {
    for (const pair of stage.pairs) {
      for (const asset of [pair.read, pair.play]) {
        if (!isAvailable(asset)) continue;
        if (asset.kind === 'read') {
          const id = sessionIdFor(asset.chapter, asset.session);
          if (id && study.get(asset.chapter)?.includes(id)) done.push(asset.id);
        } else if (asset.kind === 'board') {
          // A third store, because the mathematics course had one before the
          // floor knew it existed. It records a floor at a time, so a board is
          // finished only when every floor of it is, and a learner who worked
          // through it last month sees that on the floor without doing anything.
          const board = boards[asset.boardIndex];
          if (board && board.floors.every((_, floor) => maths[`${asset.boardIndex}:${floor}`])) {
            done.push(asset.id);
          }
        } else if (missions.includes(asset.slug)) {
          done.push(asset.id);
        }
      }
    }
  }
  return done;
}

/**
 * The state of every asset on one stage, and which pair the learner is on.
 *
 * `current` is the first pair with anything left to do. Everything before it is
 * behind the learner, everything after is ahead, and nothing is locked: a
 * learner who wants to read ahead may. The floor says where they are, it does
 * not stand in the doorway.
 */
export function stageState(stage, done = []) {
  const pairs = stage.pairs.map(pair => {
    const state = asset => {
      if (!isAvailable(asset)) return asset.status === 'live' ? 'unavailable' : 'not-built';
      return done.includes(asset.id) ? 'done' : 'todo';
    };
    const read = state(pair.read);
    const play = state(pair.play);
    const finished = [read, play].every(s => s === 'done' || s === 'not-built');
    return { ...pair, readState: read, playState: play, finished };
  });

  const currentIndex = pairs.findIndex(p => !p.finished);
  const available = stage.pairs.flatMap(p => [p.read, p.play]).filter(isAvailable);
  const doneCount = available.filter(a => done.includes(a.id)).length;

  return {
    id: stage.id,
    title: stage.title,
    lede: stage.lede,
    exitOutcome: stage.exitOutcome,
    standard: stage.standard,
    pairs: pairs.map((p, i) => ({ ...p, current: i === currentIndex })),
    current: currentIndex === -1 ? null : pairs[currentIndex],
    done: doneCount,
    total: available.length,
    percent: available.length ? Math.round((doneCount / available.length) * 100) : 0,
    complete: currentIndex === -1
  };
}

/**
 * The single next thing to do, across the whole floor.
 *
 * Shared Data Truths first, then the chosen door, then the Analyst floor. The
 * other two doors are required before Analyst but are not what the floor puts
 * in front of somebody who has just sat down, so they come after the door they
 * chose and before the merge.
 */
export function nextStep(done = [], selectedDoor = 'concepts') {
  const order = [
    ALL_STAGES.find(s => s.id === 'shared-data-truths'),
    ALL_STAGES.find(s => s.id === selectedDoor),
    ...ALL_STAGES.filter(s => ['concepts', 'python', 'sql'].includes(s.id) && s.id !== selectedDoor),
    ALL_STAGES.find(s => s.id === 'analyst')
  ].filter(Boolean);

  for (const stage of order) {
    const state = stageState(stage, done);
    if (state.complete) continue;
    const pair = state.current;
    const asset = pair.readState === 'todo' ? pair.read
      : pair.playState === 'todo' ? pair.play
        : null;
    if (asset) return { stage: state, pair, asset, kind: asset.kind };
  }
  return null;
}
