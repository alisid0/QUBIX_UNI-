# Claude Handoff — Yellow UX Issues (Medium Priority)

> Generated: 2026-08-02 | Based on full app UX audit against production

These are the 6 medium-priority UX issues found during the walkthrough. Each
section includes the file(s) to edit, the exact problem, and a suggested fix.

---

## 3. "Wandered" status label is confusing

**Files:** `src/lib/stores/progress.js` (line ~740) and `src/views/PathView.svelte`
(lines 47–66)

**Problem:** After reading just one board in a topic, the topic status displays
"Wandered" instead of "In progress" or a percentage. The word "wandered" implies
aimlessness, which clashes with the app's structured learning framing.

**Where the label is set (`progress.js`):**
```js
// Line ~740 (inside a path-status computation function)
let state = 'wandered', label = 'Wandered';
```

`PathView.svelte` uses these states for styling:
```js
// Line 47
unwandered: 'var(--qx-text-faintest)', wandered: 'var(--qx-text-faint)',
// Line 55
checked: '✓', wandered: '·',
// Line 66
$: nextBoardNumber = cardStates.find(c => c.state === 'unwandered' || c.state === 'wandered')?.number
```

**Suggested fix:** Change the label from `'Wandered'` to `'In progress'` or
`'Reading'`. The internal state key `wandered` can stay for code compatibility
(used in many places), but the user-facing `label` and `labelColor` values
should change.

```js
// In progress.js, change the label only:
let state = 'wandered', label = 'In progress';  // was: 'Wandered'
```

In `PathView.svelte`, the `·` badge for "wandered" could change to `›` or
nothing — or use a small progress bar/dot.

---

## 4. "Snippet mode" name doesn't communicate what it is

**Files:** `src/views/Home.svelte` (line 186) and `src/views/Snippets.svelte`

**Problem:** The button in the home header says "Snippet mode". Users cannot
infer that this is a "Did you know?" trivia feed from the label alone. The
content (e.g., an essay about Newton vs. Leibniz notation) is deep and
interesting but the entry point name undersells it.

**Current code (`Home.svelte` line 186):**
```svelte
<button class="menu-btn icon-btn" on:click={() => onNavigate?.('snippetMode')}
  aria-label="Snippet mode" title="Snippet mode">
```

**Suggested fix:** Rename the button label and aria-label to something
descriptive. Options:
- "Did you know" (simpler, matches content tone)
- "Curiosities" (more elegant)
- "Quick reads" (describes the format)

Change the `title` tooltip to explain it:
```svelte
aria-label="Did you know" title="Bite-sized curiosities from across STEM"
```

The `Snippets.svelte` view already says "Browse, no score — just vibes" which is
good. The entry point is the only problem.

---

## 5. Path tab vs Subject cards are redundant entry points

**Files:** `src/views/Home.svelte`, `src/views/Path.svelte`, and
`src/views/SubjectView.svelte`

**Problem:** Two different UIs reach the same destination:

1. **Subject cards on Home:** Clicking "Mathematics" → opens a Subject page with
   topic list + "Start learning" button + workshop buttons.
2. **Path tab (bottom nav):** Shows all 4 subjects with their topics expanded
   inline, each clickable to open a topic detail.

These are two different layouts for almost identical information. Users may be
confused about which to use.

**Current flow:**
```
Home → [Mathematics card] → SubjectView (topics list + start button)
Home → [Path tab] → Path (all subjects + all topics inline)
```

**Suggested fix:** Pick one approach.

**Option A (simpler):** Remove the subject cards from Home and rely on the Path
tab for subject/topic browsing. Home becomes purely a dashboard (resume,
workshop loop, stats).

**Option B (keep both but differentiate):** Make the Home subject cards jump
directly into the first topic's Reader (like the "Start learning" button does),
giving them a distinct "quick-start" role. The Path tab remains for browsing.

If keeping both, at minimum the Subject page and Path page should share the same
component for topic lists so they don't diverge.

---

## 6. Some Solve First workshops say "Pairs with Learn First" generically

**File:** `src/views/WorkshopLab.svelte` (lines 610–612, 842)

**Problem:** The `pairedLearnTitle` function falls back to `'Learn First'` when
it cannot find a matching Learn First module title. This produces the generic
label "Pairs with Learn First" instead of "Pairs with Plot, build, and measure"
or a specific workshop name.

**Current code:**
```js
const pairedLearnTitle = (item) =>
    TRACKS[item?.track]?.modules?.find((module) => module.id === item?.moduleId)?.title
    || 'Learn First';  // ← fallback when module not found
```

The template renders it at line 842:
```svelte
<small>Pairs with {pairedLearnTitle(item)}</small>
```

This was observed in the browser for workshops like "The Big Wheel",
"Ropeworks", and "Radar Nine" which all showed "Pairs with Learn First".

**Suggested fix:** Investigate why `TRACKS[item.track]?.modules` doesn't contain
modules matching those item IDs. These may be new Solve First workshops that
haven't been registered in the TRACKS data structure, or the module IDs don't
match. Check `src/lib/content/workshops2.js` and the TRACKS definition.

If the pairing genuinely doesn't exist yet, use a descriptive fallback like:
```js
|| '(paired workshop coming soon)'
```

---

## 7. Topic check uses free-text input (hard on mobile)

**File:** `src/views/Quiz.svelte` (lines 243–250)

**Problem:** The topic check quiz uses `<input type="text">` / `<input
type="number">` with manual "Check" button. Typing "kilogram" or "metre" on a
phone keyboard is error-prone and slow. The question "The SI base unit for mass
is the ___." expects a free-text answer.

**Current code:**
```svelte
<!-- Numeric type -->
<input id="num-input-{current}" type="number" step="any" class="num-input"
  placeholder="Your answer" ... />

<!-- Fill blank type -->
<input id="fill-input-{current}" type="text" class="num-input"
  placeholder="Type your answer" ... />
```

**Suggested fix:** For known-answer questions (fill-in-the-blank with a specific
correct term like "kilogram"), add a multiple-choice option. Either:

- Change the question type from `'fillblank'` to `'mcq'` (if the question bank
  supports distractors)
- Add an auto-suggest/show-answer toggle after 2 wrong attempts
- Add a "Show hint" button that reveals the first letter

For numeric answers, keep the input but add a numeric keypad and unit
confirmation.

The question bank files are in `src/lib/content/` — you may need to add MCQ
variants for existing fill-in-the-blank questions.

---

## 8. "Audio coming soon" on boards that have audio in Supabase

**Files:** `src/views/Reader.svelte` (lines 503–565) and
`src/lib/content/boardMedia.js`

**Problem:** Board 1000 ("Why we need standard units") shows a working "Play
audio" button because its floors have `audio` URLs from Supabase. But board
1001+ show "Audio coming soon" (disabled) even when they have audio files
uploaded. There's an inconsistency in how audio URLs are resolved.

**Current code flow (`Reader.svelte`):**
```svelte
<!-- Floor 0: -->
<button class="audio-btn" disabled={!audioUrl}
  title={audioUrl ? (playingKey === `${n}-0` ? 'Pause audio' : 'Play audio')
    : 'Audio coming soon'} ...>

<!-- Floor N (depth > 0): -->
{#if floorAudio(i, d)}
  <button class="audio-btn" ...><!-- enabled, shows "Play audio" -->
{:else}
  <button class="audio-btn" disabled title="Audio coming soon">...</button>
{/if}
```

The audio URL comes from `floorAudio(i, d)` which calls `boardMedia.js`.
Investigate whether `boardMedia.js` correctly extracts the `audio` property from
Supabase `layers[n].audio` vs legacy `media.js` mappings.

**In the audit data (`live-production-bbs.json`), board 1000 layers have:**
```json
"audio": "https://xzesbcrlnbesmvxmgotp.supabase.co/storage/v1/object/public/card-audio/1000-..."
```

But board 1001 layers have NO `audio` field — only `text` and `img`. So the
Supabase rows for 1001+ genuinely lack audio URLs. The issue is that these
boards were ingested without audio references.

**Suggested fix:** Re-ingest the boards that should have audio, ensuring the
Supabase `cards.layers[].audio` field is populated. Or, if audio doesn't exist
yet for those boards, the "Audio coming soon" label is accurate and the fix is
to actually produce and upload the audio files.

If audio IS uploaded but not referenced, check the ingestion script at
`scripts/ingest-final-review.mjs` to ensure it maps audio URLs correctly.

---

## Summary table

| # | Issue | Files to edit | Difficulty |
|---|---|---|---|
| 3 | "Wandered" label → "In progress" | `progress.js`, `PathView.svelte` | Trivial |
| 4 | "Snippet mode" → descriptive label | `Home.svelte` | Trivial |
| 5 | Path vs Subject redundancy | `Home.svelte`, `Path.svelte` | Medium |
| 6 | "Pairs with Learn First" fallback | `WorkshopLab.svelte`, `workshops2.js` | Small |
| 7 | Free-text quiz → MCQ option | `Quiz.svelte`, question bank files | Medium |
| 8 | "Audio coming soon" inconsistency | `boardMedia.js`, Supabase re-ingest | Medium |

---

## Suggested order of attack

1. **#3 and #4 first** — trivial string changes, immediate UX win
2. **#6 next** — small code fix, or verify TRACKS data
3. **#8 then** — investigate Supabase vs bundle audio resolution
4. **#7** — more involved, may need question bank refactor
5. **#5 last** — architectural decision about navigation structure
