# DESIGN-UPGRADE.md — Qubix Design Upgrade Plan

> **Status:** Audit + roadmap, written 2026-07-12.
> **Authority:** This file is the design upgrade companion to `QUBIX-BLUEPRINT.md`.
> Where they conflict on priority, this file wins. Where they conflict on spec,
> `QUBIX-BLUEPRINT.md` wins.
>
> **What this file is:** a holistic design audit of what's built vs. what's
> planned, PLUS new UX-polish items that emerged after the blueprint was written.
> **What this file is not:** a replacement for `QUBIX-BLUEPRINT.md` or `CLAUDE.md`.

---

## 1. Audit: what's already shipped

### 1.1 Surface streamline (Blueprint Phase 1) — ✅ DONE

| Item | Status |
|---|---|
| Tabs: Home / Path / W Score / Workshop | ✅ Live (`BottomNav.svelte`) |
| Path tab with 4 gateway sections, covered + Soon rows | ✅ Live (`Path.svelte`) |
| ROADMAP const in `paths.js` | ✅ Live |
| PHY_FORCES + PHY_INTRO in `unit.paths` | ✅ Live |
| Snippet Mode as full-screen push from Home header | ✅ Live |
| Map tab cut (no route, no import) | ✅ Done |
| W Score tab (boards/streak/consistency/metrics/medals) | ✅ Live |
| Home with four-doors gateway grid | ✅ Live |
| LEGACY_VIEWS redirects (topics→path, stats→wscore, etc.) | ✅ Live |
| Slide transitions between views (`flyIn`/`flyOut` with `slideDirection`) | ✅ Live |
| Leaderboard/OtherUserStats routes still exist but unused | ⚠️ Files exist, not deleted yet |

### 1.2 Quiz.svelte redesign (Blueprint Phase 5) — ✅ ALREADY DONE

Quiz.svelte already uses `--qx-*` tokens, Mulish font, QxButton — it's fully
Qubix-styled. The chalk-to-Qubix migration happened ahead of the blueprint
schedule. The only chalk remnant in Quiz's orbit is ChalkDiagram (used by
Reader, not Quiz).

### 1.3 Chalk remnants still in the codebase

These files still use `--chalk-*` / `--board-*` tokens from `tokens.css`:

| File | Role | Migration priority |
|---|---|---|
| `src/lib/components/ChalkButton.svelte` | Legacy button | P3 — replace with QxButton |
| `src/lib/components/ChalkInput.svelte` | Legacy input | P3 — replace with Qubix-styled input |
| `src/lib/components/ChalkDiagram.svelte` | Diagram renderer | P2 — port to `--qx-*` tokens (used by Reader) |
| `src/lib/components/FormulaBox.svelte` | Math display | P3 — port to `--qx-*` tokens |
| `src/lib/components/VideoPlayer.svelte` | Video embed | P3 — port to `--qx-*` tokens |
| `src/lib/components/AudioPlayer.svelte` | Audio embed | P3 — port to `--qx-*` tokens |
| `src/views/Author.svelte` | Internal BB submission form | P4 — low priority, internal tool |
| `src/lib/styles/tokens.css` | Chalk design tokens | Delete once zero references remain |
| `src/lib/styles/global.css` | Scrollbar uses `--chalk-faint` | Replace with `--qx-*` equivalent |

---

## 2. Remaining blueprint work (Phases 2–6)

### 2.1 Phase 2 — W economy ⭐ HIGH PRIORITY

**What:** Ws ("wins") currency — the motivation spine of the app.

**Scope:**
- `progress.js`: v3 migration (preserve v2 data), `awardWs(type, ref, amount)`,
  `getWs()`, `getWeeklyPoints()`
- `Reader.svelte`: `recordDeepestFloor(bbid)` hook on reaching the last floor
- `CheckpointQuiz.svelte`: award Ws on correct answers + perfect bonus
- Workshop completion: award Ws
- `recordQuizResult`: award Ws on path-quiz results
- `Home.svelte`: **W chip** in header (next to streak chip): `W {total}`
- `WScore.svelte`: **W hero** at top (big number)
- Toast/pulse animation on W award (respect `prefers-reduced-motion`)

**Design notes:**
- W chip on Home: same pill style as streak chip, but use `--qx-green` family
  (Olive) — distinct from the Clay streak chip. Green = wins earned.
- W Score hero: `W 128` in 48px+ bold, centered at top, with "this week: N pts"
  below in `--qx-text-dim`.
- Toast: a small `+N W` that floats up from the bottom-right and fades, 1.2s,
  `--qx-green` text on `--qx-green-soft` background.

### 2.2 Phase 3 — League (local-first) ⭐ MEDIUM PRIORITY

**What:** Simulated league of ~20–30 learners, ranked by weekly consistency
points. Labeled "Preview league — goes live with accounts."

**Scope:**
- New `src/lib/stores/league.js`: `LocalLeagueProvider` (seeded from user id
  for stability within a week), `getLeague()` → `{ name, resetsAt, members }`
- `WScore.svelte`: league section below consistency bars
- Delete `Leaderboard.svelte` + `OtherUserStats.svelte` files and routes

**Design notes:**
- League card: a ranked list, your row highlighted with `--qx-accent-soft`
  background. Show rank #, name/initial, weekly points.
- League name: cycle through Copper → Bronze → Iron → Silver → Gold → Platinum
  based on total Ws brackets (TBD thresholds).
- "Resets Monday" label at top-right of the section.

### 2.3 Phase 4 — Recall scheduler ⭐ HIGH PRIORITY

**What:** Spaced repetition: 1d → 7d → 21d intervals. Boards come back for
review. "Today's session" on Home.

**Scope:**
- `progress.js`: when board reaches `checked`, stamp `dueAt = +1d`. Each passed
  recall advances the interval (1→7→21d) and mastery state. A miss resets to 1d.
- `Home.svelte`: **Today's session card** — shows due recalls count + a
  "~3 min" estimate. Replaces the empty state where the Continue card isn't
  shown. Either Today's session OR Continue counts as a streak day.
- Recall check: reuse CheckpointQuiz with questions filtered to that board's
  topic. Award +5 W on pass (only when scheduler marked it due).

**Design notes:**
- Today's session card: distinct from Continue card. Use a subtle `--qx-accent-soft-2`
  background, a calendar/clock icon, "Today's session" label, "N boards due for
  review · ~M min" sub. Tapping opens a focused Reader-like flow scoped to due
  boards.
- When nothing is due: show "All caught up ✓" in the same card slot, Olive-toned.

### 2.4 Phase 5 — Kill the last chalk traces ⭐ MEDIUM PRIORITY

**What:** Port the remaining chalk components to `--qx-*` tokens, delete
`tokens.css`, remove the import from `global.css`.

**Scope:**
- Port `ChalkDiagram.svelte` to Qubix tokens (used by Reader for coordinate
  planes, GeoGebra embeds — these need dark/light theme support)
- Port or sunset `ChalkButton`, `ChalkInput` (check if any view still uses them;
  if not, delete)
- Port `FormulaBox`, `VideoPlayer`, `AudioPlayer` to Qubix tokens
- `Author.svelte`: port or leave as-is (internal tool, not user-facing)
- `global.css`: replace `--chalk-faint` scrollbar with `--qx-text-faintest`
- Delete `tokens.css` and its `@import` when zero references remain

### 2.5 Phase 6 — BBID adoption ⭐ LOW PRIORITY (blocked)

Blocked on founder running `supabase/migrations/0003_bbid.sql` in Supabase SQL
editor. No design work here — purely data/infra.

---

## 3. New UX polish items (not in the blueprint)

These are design improvements discovered during the audit that go beyond what
`QUBIX-BLUEPRINT.md` specifies.

### 3.1 Home: "Today's session" empty state (pre-Phase 4) 🟡 QUICK WIN

**Problem:** Before the recall scheduler ships, new users see only the four
doors after onboarding. The Continue card only appears once they've started a
topic. There's no clear "what now?" except the doors grid.

**Fix:** Add a "Start learning" card in the Today's session slot:
- Card with a subtle `--qx-accent-soft` background
- Text: "Pick a door below to begin"
- Icon: downward arrow or sparkle
- Disappears once any board has been opened (replaced by Continue card)

### 3.2 Reader: depth-rail visual refinement 🟡 QUICK WIN

**Current:** The left-edge dot ladder shows depth but is very minimal (by design).
**Problem:** On very short BBs (3 floors), the ladder is almost invisible. On
very deep BBs (5 floors), it's cramped.

**Fix:**
- Dot size: scale with floor count (4 floors = 8px dots, 5 floors = 7px dots)
- Add a subtle connecting line between dots (like a vertical进度 bar)
- Current-floor dot uses `--qx-accent`; other dots use `--qx-text-faintest`
- Already-descended floors: `--qx-green` (Olive) to show "been here"

### 3.3 Path tab: topic-tile hover/active states 🟡 QUICK WIN

**Current:** Tiles have `:hover { border-color: --qx-accent }` but no press
feedback on mobile.

**Fix:** Add `:active { transform: scale(0.97); background: var(--qx-accent-soft-2); }`
for a satisfying tap response. Match the 150ms transition already on `.door`.

### 3.4 W Score: empty-state design 🟡 QUICK WIN

**Current:** A new user's W Score shows zeroes everywhere — correct, but cold.

**Fix:** Add a motivational empty state:
- Hero: "W 0" → "Your journey starts here" subtext
- Consistency: show 7 grey bars with "Start today" label
- Medals: keep the existing "Read a board or pass a check" message

### 3.5 BottomNav: active-indicator animation polish 🟡 QUICK WIN

**Current:** The `::after` pseudo-element has a spring animation on the active
tab. It's good but could be smoother.

**Fix:** Use `cubic-bezier(0.34, 1.56, 0.64, 1)` (already there — good). Add
a subtle icon scale: `transform: scale(1.08)` on the active tab's icon only,
with a 200ms transition. This gives a "bounce" feel without being distracting.

### 3.6 Theme: system-default detection 🔵 MODERATE

**Current:** Theme defaults to light. Users must manually toggle in Settings.
**Problem:** Most users prefer system default. A blinding light-mode flash on
first load for dark-mode users.

**Fix:** In `theme.js`, on first load (no `qubix-theme` in localStorage), detect
`prefers-color-scheme: dark` and default accordingly. Store the auto-detected
choice so the user can still override it.

### 3.7 Auth/Onboarding: visual continuity 🔵 MODERATE

**Current:** Auth screen uses Qubix tokens but feels disconnected from the rest
of the app — no gateway icons, no tagline.

**Fix:**
- Add the four gateway icons as a subtle background row on the auth card
- Add the tagline "Build simple machines. Assemble grand systems." below the
  Qubix wordmark
- Onboarding: add a 3-step mini walkthrough (pick a door → read a board →
  pass a check) instead of the current single-screen flow

### 3.8 Reader: swipe-transition physics 🟡 QUICK WIN

**Current:** Swipe uses Svelte's `fly` transition with `cubicOut` easing.
**Problem:** The transition doesn't feel "sticky" — cards move at constant
velocity rather than springing into place.

**Fix:** Use a custom spring transition:
```js
// Replace cubicOut with a spring-like easing
const springOut = t => 1 - Math.exp(-6 * t) * Math.cos(4 * t * Math.PI);
```
Apply only when `prefers-reduced-motion: reduce` is NOT set.

### 3.9 Snippet Mode: card design refresh 🔵 MODERATE

**Current:** Snippets use a simple card with subject tag + category tag.
**Problem:** The cards feel like shrunken BBs rather than a distinct "browse
mode" experience.

**Fix:**
- Larger, more visual cards: each snippet card is ~70% viewport height with
  generous padding, centered text, and the subject icon as a large watermark
- Swipe-up gesture to advance (matching the "feed" metaphor)
- Add a subtle haptic-like animation on swipe (CSS `@keyframes` pulse)
- Keep the "no pressure" copy: "Snippets — browse, no score" at top

### 3.10 PathView (Topic Detail): board-list visual refresh 🔵 MODERATE

**Current:** Topic detail shows a list of boards with state badges and a
"Start reading" / "Continue reading" CTA.

**Fix:**
- Board list: use horizontal scrollable chips instead of a vertical list
  (like a filmstrip). Each chip = one board, colored by mastery state.
- "Start reading" → "Continue" button: show the next unread board number
  explicitly: "Continue from board 4 of 12"
- Add a "Topic check" button that's always visible (per blueprint: "No reading
  required — jump in")

### 3.11 Workshop tab: empty state 🟡 QUICK WIN

**Current:** Workshop tab shows modules immediately. But what if no workshops
are available for the user's level?

**Fix:** Always show at least the first module per track. If a module is
locked (no boards read in its topic), show a lock icon + "Read N boards in
{topic} to unlock". This turns an empty state into a goal.

### 3.12 Accessibility: focus-visible ring 🔵 MODERATE

**Current:** Buttons and interactive elements have no visible focus ring for
keyboard navigation.

**Fix:** Add a global `:focus-visible` style:
```css
:focus-visible {
  outline: 2px solid var(--qx-accent);
  outline-offset: 2px;
  border-radius: 4px;
}
```
Ensure all interactive elements have a reasonable border-radius for the ring.

---

## 4. Visual hierarchy of the Qubix palette (reference)

The 5-colour system is locked. Here's the *semantic* intent of each colour —
use this when deciding which token to apply:

| Token family | Semantic role | Examples |
|---|---|---|
| **Ink** (`--qx-text*`) | Readable text, hierarchy | Headings, body, captions |
| **Canvas** (`--qx-bg`, `--qx-surface*`) | Surfaces, depth | Page bg, cards, elevated panels |
| **Clay** (`--qx-accent*`) | Brand, action, attention | Buttons, active states, streak, links |
| **Olive** (`--qx-green*`) | Positive, completion, success | Correct answers, mastery, Ws earned, "Done ✓" |
| **Red** (`--qx-danger*`) | Alert, error, destructive | Wrong answers, delete confirmations |

**Rule of thumb:** If a new UI element needs a colour and you're unsure which
family to use, ask: is it an action (Clay), a success state (Olive), an error
(Red), or just content (Ink/Canvas)?

---

## 5. Implementation order (recommended)

### Wave A — Quick wins (1–2 sessions, high user impact)
1. Home: "Start learning" empty state (§3.1)
2. W Score: empty-state design (§3.4)
3. Path tab: tap-active states (§3.3)
4. Reader: depth-rail polish (§3.2)
5. BottomNav: icon bounce (§3.5)
6. Accessibility: focus-visible ring (§3.12)
7. Theme: system-default detection (§3.6)

### Wave B — W economy (1–2 sessions, core motivation)
8. Phase 2: W economy (§2.1) — W chip on Home, W hero on W Score, award hooks

### Wave C — Recall + League (2–3 sessions, learning loop closure)
9. Phase 4: Recall scheduler (§2.3) — Today's session, spaced repetition
10. Phase 3: League (§2.2) — local-first league on W Score

### Wave D — Polish + cleanup (1–2 sessions)
11. Phase 5: Kill chalk traces (§2.4) — port remaining components, delete tokens.css
12. Reader: swipe-transition physics (§3.8)
13. Snippet Mode: card redesign (§3.9)
14. PathView: board-list refresh (§3.10)
15. Workshop tab: locked-module states (§3.11)
16. Auth/Onboarding: visual continuity (§3.7)

### Wave E — Future (post-launch)
17. Phase 6: BBID adoption (when unblocked)
18. Real league backend (Supabase tables + RLS)
19. Custom domain + public launch switch

---

## 6. Guardrails (carried over from blueprint + CLAUDE.md)

- Use `--qx-*` tokens ONLY for UI chrome. Never hard-code hex values.
- Never introduce a new font — Mulish is the only Qubix font.
- Never add a sixth colour to the palette. The five families cover everything.
- Content illustrations are exempt from the palette (they have their own).
- Don't break the two-axis Reader interaction (←→ BBs, ↑↓ floors).
- Don't add "Strata" to any user-facing screen — it's "Qubix" everywhere.
- No exam framing in any copy. The audience is curious learners, not test-takers.
- Quiz.svelte stays Qubix-styled (it already is). Don't reintroduce chalk.
- `SUPABASE_SERVICE_ROLE_KEY` never client-side.
- Deploy with `npm run deploy` — no git-push auto-deploy.

---

## 7. Open design questions

1. **W Score hero placement:** Should the W hero be at the very top of W Score
   (above boards-read/streak cards), or should those cards stay top and W hero
   be the second section? _Recommendation: W hero at very top — it's the new
   primary metric._

2. **Today's session vs. Continue priority:** When both are present (due recalls
   exist AND a topic is in progress), which card goes first on Home?
   _Recommendation: Today's session first (time-sensitive), Continue second._

3. **Snippet Mode gesture:** Swipe-up vs. tap "Next" button? _Recommendation:
   both — swipe-up as primary, a subtle "Next ↓" label as affordance._

4. **League name thresholds:** What Ws totals map to which league names?
   _Recommendation: Copper 0–49, Bronze 50–149, Iron 150–299, Silver 300–499,
   Gold 500–999, Platinum 1000+. Revisit after 90 days of real data._
