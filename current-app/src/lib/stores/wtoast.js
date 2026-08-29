// W-award toast queue. progress.awardWs() pushes here; App.svelte renders the
// toast and plays the reward sound. Kept as its own tiny store so progress.js
// stays UI-free and there's no circular import.
import { writable } from 'svelte/store';

export const wtoast = writable(null); // { id, amount, bonus } | null

let seq = 0;
let pending = 0;
let flushTimer = null;

/** Coalesce awards landing in the same tick (board open + deepest floor etc.)
 *  into one toast so the user sees "+3 W", not two overlapping chips. */
export function notifyW(amount, { bonus = false } = {}) {
  if (!amount) return;
  pending += amount;
  if (flushTimer) clearTimeout(flushTimer);
  const isBonus = bonus || pending >= 5;
  flushTimer = setTimeout(() => {
    wtoast.set({ id: ++seq, amount: pending, bonus: isBonus });
    pending = 0;
    flushTimer = null;
  }, 80);
}
