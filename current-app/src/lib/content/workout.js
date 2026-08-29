// workout.js — the Daily Workout composer.
//
// Turns the workshop library into a coach: composes a ~6-item session from
// what the learner's own data says they need right now —
//   1. recall  — items from topics whose boards are due in the recall
//                scheduler (answering them grades the recall, coarsely)
//   2. weak    — items from the lowest-scoring tested topic
//   3. fresh   — one item from a topic never touched
//   4. top-up  — random topics fill any remaining slots (so brand-new users
//                with zero history still get a full session)
//
// Items are pulled from the module test banks via getTestForModule, which
// reshuffles per call — so every workout differs. They run in the normal
// (non-assess) Workshop, so feedback teaches as it goes.
import { getWorkshopsForPath } from './workshopCatalog.js';
import { getTestForModule } from './tests.js';
import { PATHS, pathsForCard } from './paths.js';

const WORKOUT_SIZE = 6;

/** First `count` items from the first module of `pathId` that has a bank. */
function pullItems(pathId, count) {
  for (const mod of getWorkshopsForPath(pathId)) {
    const bank = getTestForModule(mod.id) || [];
    if (bank.length) return bank.slice(0, count);
  }
  return [];
}

/**
 * Compose today's workout from the progress store.
 * Returns { items, parts: {recall, weak, fresh}, weakName, recallBoards }.
 */
export function composeWorkout(progress) {
  const items = [];
  const parts = { recall: 0, weak: 0, fresh: 0 };
  const usedPaths = new Set();
  const recallBoards = [];
  let weakName = null;

  // 1) Recall: up to 2 items from the topics of due boards.
  for (const due of progress.getDueBoards(8)) {
    if (parts.recall >= 2) break;
    const pathId = pathsForCard(due.cardNumber)[0];
    if (!pathId || usedPaths.has(pathId)) continue;
    const got = pullItems(pathId, 1);
    if (got.length) {
      items.push(...got);
      parts.recall += got.length;
      usedPaths.add(pathId);
      recallBoards.push(due.cardNumber);
    }
  }

  // 2) Weakest tested topic: 3 items from the lowest best-score ratio.
  const ranked = Object.entries(PATHS)
    .map(([id, manifest]) => ({ id, manifest, state: progress.getPathState(id, manifest) }))
    .filter((p) => p.state?.bestTotal > 0 && !usedPaths.has(p.id))
    .sort((a, b) =>
      (a.state.bestScore / Math.max(a.state.bestTotal, 1)) -
      (b.state.bestScore / Math.max(b.state.bestTotal, 1)));
  if (ranked[0]) {
    const got = pullItems(ranked[0].id, 3);
    if (got.length) {
      items.push(...got);
      parts.weak = got.length;
      usedPaths.add(ranked[0].id);
      weakName = ranked[0].manifest.name;
    }
  }

  // 3) Something new: 1 item from an untouched topic.
  for (const [id, manifest] of Object.entries(PATHS)) {
    if (usedPaths.has(id)) continue;
    if ((progress.getPathState(id, manifest)?.boardsRead || 0) > 0) continue;
    const got = pullItems(id, 1);
    if (got.length) {
      items.push(...got);
      parts.fresh = got.length;
      usedPaths.add(id);
      break;
    }
  }

  // 4) Top up to a full session from any remaining topics (random order, so
  //    the filler varies day to day).
  const rest = Object.keys(PATHS).filter((id) => !usedPaths.has(id));
  for (let i = rest.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [rest[i], rest[j]] = [rest[j], rest[i]];
  }
  for (const id of rest) {
    if (items.length >= WORKOUT_SIZE) break;
    const got = pullItems(id, 1);
    if (got.length) { items.push(...got); usedPaths.add(id); }
  }

  return { items: items.slice(0, WORKOUT_SIZE), parts, weakName, recallBoards };
}
