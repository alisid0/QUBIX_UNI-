// How much of Qubix a signed-out visitor may open.
//
// Founder decision, 2026-09-03: learning requires an account after a taste of
// it. Three items, then the wall. Before this, everything was open and the
// account only carried progress between devices; the sign-in page and
// DATA-INVENTORY.md were rewritten in the same change, because a promise that
// nothing is locked cannot survive locking things.
//
// What this is and is not. The site is a static bundle: every mission ships to
// the browser whether or not it is displayed, so this is a registration wall
// and not a security boundary. It will stop essentially everyone and it will
// not stop someone reading the bundle, which is true of every registration
// wall and is fine as long as nobody mistakes it for encryption.
//
// The tutor is the opposite case and is enforced server-side in api/tutor.js,
// because there the cost of an unauthenticated request is real money.

const KEY = 'qubix.free-items.v1';

export const FREE_ITEMS = 3;

// Routes that are a way of getting somewhere rather than something to learn.
// Walling the floor map or the Superstore plan would spend one of the three on
// a page that teaches nothing, and a visitor who cannot see where they are
// going has no reason to make an account.
//
// An exclusion list rather than a roster check, so a mission added tomorrow is
// gated by default. Getting that wrong in this direction leaves content open;
// getting it wrong the other way walls a signpost.
const HUBS = Object.freeze(['foundations', 'store', 'role-game']);

/**
 * The identity of the thing a learner is looking at, or null when the route is
 * navigation rather than content.
 *
 * @param {URLSearchParams} params
 */
export function itemIdFor(params) {
  if (params.get('mode') !== 'game') return null;
  const mission = params.get('mission');
  if (!mission || HUBS.includes(mission)) return null;

  // The reader is one route carrying thirty-five sessions. Counting it as a
  // single item would give away the whole book for one of the three.
  if (mission === 'shared-book') {
    const chapter = params.get('chapter');
    const session = params.get('session');
    return chapter && session ? `read:${chapter}.${session}` : null;
  }

  return `mission:${mission}`;
}

/** The distinct items this browser has already opened. */
export function openedItems() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || '[]');
    return Array.isArray(raw) ? raw.filter(item => typeof item === 'string') : [];
  } catch (_) {
    // Blocked storage means we cannot count. Failing open is the right way to
    // fail: a private window should read a lesson, not meet a wall it cannot
    // get past by signing in either.
    return [];
  }
}

export function remainingItems() {
  return Math.max(0, FREE_ITEMS - openedItems().length);
}

/**
 * Whether this item may be opened. Returning to something already opened is
 * always free, so a learner who reloads or comes back tomorrow is not charged
 * twice for the same lesson.
 */
export function canOpen(itemId) {
  if (!itemId) return true;
  const opened = openedItems();
  return opened.includes(itemId) || opened.length < FREE_ITEMS;
}

/** Record an open. Idempotent, so a reload does not consume a second item. */
export function recordOpen(itemId) {
  if (!itemId) return;
  const opened = openedItems();
  if (opened.includes(itemId) || opened.length >= FREE_ITEMS) return;
  try {
    localStorage.setItem(KEY, JSON.stringify([...opened, itemId]));
  } catch (_) { /* blocked storage: nothing to record against */ }
}

/**
 * Called once after a learner signs in. The count stops applying the moment
 * there is an account, and clearing it means signing out later returns them to
 * a fresh allowance rather than a wall they cannot explain.
 */
export function clearAllowance() {
  try {
    localStorage.removeItem(KEY);
  } catch (_) { /* nothing to clear */ }
}
