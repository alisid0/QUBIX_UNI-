# DeepSeek brief — three fixes from the design-review of your last push

Your redesign + animation push is good (builds clean, SEO pages still generate, motion is tasteful). Three issues surfaced in review. Please fix all three. Each is small and additive — **don't undo the redesign or the animations**, just patch these.

Return your work as **per-file blocks labelled with the exact path** (or unified diffs). You can't run the build or deploy — the Qubix dev (Claude) integrates, verifies, and ships.

---

## Fix 1 — Stats screen is orphaned AND a dead-end (must-fix)

**Problem:** the redesigned Stats looks great but fell out of the navigation graph:
- **No entry:** `Home.svelte` now only navigates to `topicDetail`/`topics`. The old "Your stats" tile is gone and the Map tab replaced the Stats tab, so nothing opens Stats anymore (except `Author.svelte`'s back button, which targets `'stats'`).
- **No exit:** the redesigned `Stats.svelte` has **no back control** at all (every other push view — Leaderboard, OtherUserStats, PathView, Author — has one). A user who lands on Stats is stuck.

**Do this:**

**(a) Entry point — make the Home header avatar open Stats.** In `src/views/Home.svelte`, the header has a non-interactive avatar:
```svelte
<div class="avatar">{$displayName.charAt(0).toUpperCase()}</div>
```
Make it a button that navigates to Stats (keep the circular look):
```svelte
<button class="avatar" on:click={() => onNavigate?.('stats')} aria-label="Your stats">{$displayName.charAt(0).toUpperCase()}</button>
```
Add `cursor: pointer; border: none; font-family: var(--qx-font);` to the `.avatar` style so the button matches the old div.

**(b) Exit — add a back-chevron to Stats.** In `src/views/Stats.svelte`, the top row is currently:
```svelte
<div class="top-row">
  <div><h1>Your stats</h1></div>
  <div class="avatar">{$displayName.charAt(0).toUpperCase()}</div>
</div>
```
Put a back-chevron at the far left (keep the avatar on the right), matching the chevron used elsewhere in the app:
```svelte
<div class="top-row">
  <div class="top-left">
    <button class="back-chev" on:click={() => onNavigate?.('home')} aria-label="Back">‹</button>
    <h1>Your stats</h1>
  </div>
  <div class="avatar">{$displayName.charAt(0).toUpperCase()}</div>
</div>
```
And add the styles (copied from `Leaderboard.svelte`):
```css
.top-left { display: flex; align-items: center; gap: 10px; }
.back-chev {
  width: 34px; height: 34px; border-radius: 50%; border: 1.5px solid var(--qx-border-2); background: var(--qx-surface);
  color: var(--qx-text-dim); font-size: 19px; cursor: pointer; display: flex; align-items: center; justify-content: center;
}
```

**Acceptance:** tapping the Home avatar opens Stats; Stats' back-chevron returns to Home; Author's "‹ back" still returns to Stats.

---

## Fix 2 — Remove the unused KaTeX (should-fix)

**Problem:** `katex` was added but is wired into nothing. `src/lib/components/qubix/Math.svelte` (which imports `katex`) is **imported by zero files**, and the real math rendering in the Reader/Quiz is still `formatMath`/`formatMathText` from `src/lib/content/mathFormat.js`. So `katex/dist/katex.min.css` (~37 KB) + KaTeX web-fonts ship to every user for no effect.

**Do this:**
1. `package.json` — remove the `"katex": "^0.17.0"` dependency line.
2. `src/lib/styles/global.css` — remove the line `@import 'katex/dist/katex.min.css';`. **Keep** `@import './animations.css';` and the token imports.
3. Delete `src/lib/components/qubix/Math.svelte`.
4. **Do not touch** `src/lib/content/mathFormat.js` — that is the working math renderer (Unicode subscripts/superscripts/vectors).

**Acceptance:** `npm install && npm run build` passes; no KaTeX CSS/fonts in `dist`; math in Reader/Quiz still renders via `formatMath`.

> If you actually want typeset LaTeX later, that's a separate, larger task — it needs the BB/quiz content rewritten into LaTeX and `<Math>` wired into the Reader/Quiz. Not now.

---

## Fix 3 — Page-transition wrappers can collapse view height (should-fix)

**Problem:** in `src/App.svelte`, each push view is wrapped in a **bare** `<div in:fly … out:fly …>` with no height, e.g.:
```svelte
{:else if currentView === 'stats'}
  <div in:fly={{ x: 100, … }} out:fly={{ x: -60, … }}>
    <Stats onNavigate={navigate} />
  </div>
```
The views inside use `height: 100%; overflow-y: auto`. A wrapper with auto height can collapse the child's height and break its internal scroll. (The tab block is fine — it keeps `class="qx-shell tabbed-view"`, which is full-height.)

**Do this:** give every push-view fly wrapper full height. Simplest — add `style="height:100%"` (or a shared class with `height:100%`) to each of the 7 push wrappers (`topicDetail`, `stats`, `leaderboard`, `otherUserStats`, `reader`, `quiz`, `author`). `.app-shell` is already `height:100%; position:relative`. The `Reader` uses `position:fixed` internally, so confirm it's unaffected.

**Optional (nice-to-have, not required):**
- Position the transitioning views `absolute; inset:0` during the transition so the outgoing/incoming screens overlap instead of stacking in flow (removes a brief vertical jump).
- The slide is a Svelte JS `fly` transition, so the existing `@media (prefers-reduced-motion)` CSS rule (which only zeroes CSS animations/transitions) does **not** disable it. If easy, skip/shorten `fly` when reduced motion is requested.

**Acceptance:** Stats/Leaderboard/PathView fill the screen and scroll internally; no layout collapse during or after a transition.

---

## Handoff
Return the changes as labelled per-file blocks. Claude will integrate, run `npm install && npm run build`, verify the three acceptance criteria, and deploy.
