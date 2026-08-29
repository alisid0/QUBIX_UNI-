# Onboarding — Strata

> **ARCHIVED ARCHITECTURE.** This describes the retired single-file/static
> app. Start with `README.md`, `AGENTS.md`, and
> `docs/SOURCE-OF-TRUTH.md`.

Two briefs below. **Person A** = system design engineer (architecture, data model, decisions). **Person B** = full-stack intern (what's built, how to run it, what to pick up). Read your own first, skim the other.

The canonical reference for everything is **STRATA-BRIEF.md**; this onboarding orients you to it.

---
---

# PERSON A — System Design Engineer

Welcome. You own the architecture and the data model. Here's the shape of the system, what's decided, and what's still open for you to call.

## What we're building

Strata is a STEM **microlearning** product: a swipeable deck of "cards" (we call them boards) that teach physics, maths, and chemistry from the ground up. The signature interaction is two perpendicular axes:
- **Horizontal** — swipe across cards (the next idea).
- **Vertical** — tap to descend through *layers* of the same card (idea → concrete → definition → in-action → the formula). This layering is the core IP, not the swipe.

Long-term vision: ~8,000 cards across four subjects. **The content library is the asset; the renderer is disposable.** Architecture decisions should protect the content and keep the renderer swappable.

## The architecture as it stands

```
Today (MVP):
  index.html  ──  monolithic: content (DECK array) + render engine + CSS, one file
  images/     ──  per-card illustrations (card-NN.png)
  design/     ──  app-shell prototypes (auth, learning map, leaderboard) — not yet built

Target (where you're taking it):
  /content/<subject>/<topic>.json   ──  cards as DATA (layers + tags), Claude-generated, human-reviewed
  index.html (or a real framework)  ──  pure engine: fetch JSON, render. No inline content.
  Supabase                          ──  only once file-count hurts (~500+ cards)
  Stack: Claude Code → GitHub → Vercel → Supabase
```

The immediate architectural move is **decoupling content from the renderer**: lift the `DECK` array out of `index.html` into per-topic JSON files, keeping the existing rich card shape (do NOT flatten it). A one-time converter script does the extraction; the engine changes ~20 lines to `fetch()` instead of reading the inline array. Schema is in STRATA-BRIEF.md §1; the hybrid JSON target preserves layers + tags.

## The data model — six orthogonal axes (don't conflate them)

This is the part that needs an architect's discipline. A card sits in six independent dimensions:

| Axis | Meaning | Stored as |
|------|---------|-----------|
| **Tier** | base→apex difficulty band (the two-pyramid model) | `ground` (g0 = tier 0); rename to `tier` is an open call |
| **Subject** | physics / maths / chemistry | `tags.subject` |
| **Topic** | the card's sub-subject grouping | `tags.topic` |
| **Path** | curated ordered group of cards for mastery tracking | paths manifest (not built) |
| **Act** | section label in the reader eyebrow | `act` (I–V, provisional) |
| **buildsOn** | per-card prerequisite graph | `tags.buildsOn` |

Plus the runtime axis the backend will own: **mastery state** (per learner, per path).

## Two structuring models you need to hold

1. **The two inverted pyramids** (PYRAMIDS.md) — content and assessment, both widest at the base. Tier t0 = broad, plain-language, introduce-without-drilling-formulas. Everything built so far is t0. Higher tiers narrow and formalise. Assessment pyramid mirrors content tier-for-tier and is where quizzes live.
2. **The mastery system** (STRATA-BRIEF.md §7) — six states (Wandered → Checked → Well read → Recalled → Mastered once → Mastered twice) that a learner climbs *per path*. The learning-map UI (in `design/`) is its front-end; quizzes feed the testing states.

## Decisions that are YOURS to make (currently open)

- **Rename `ground → tier`?** Or keep `ground` as the storage key for the tier value.
- **Acts vs paths vs tiers** — acts are provisional and tangled (chemistry sits under "Energy", a kinematics thread sits under Act I). Likely the acts should be restructured to mirror paths. Your call on the information architecture.
- **Can a card belong to >1 path?** (Cards 26 & 27 are foundational to two paths.) This decides whether paths are a manifest (allows overlap) or a per-card field (doesn't).
- **Mastery value formulas** — how the six states roll into the three derived values (reading / testing / recall), and whether states decay over time.
- **When to introduce Supabase** — the threshold and the migration path from JSON files.

## Your first week

1. Read STRATA-BRIEF.md end to end, then PYRAMIDS.md and PATHS.md.
2. Run the reader locally (see Person B's brief) — feel the product before designing for it.
3. Resolve the `ground → tier` and the path-overlap decisions — they unblock the content extraction and the paths manifest.
4. Spec the content extraction: the JSON schema (extend §1's hybrid), the converter, and the engine's fetch change. Hand to Person B to implement.
5. Leave the mastery/backend as a written spec; don't build storage yet. The renderer stays pure until content is decoupled and the schema is stable.

---
---

# PERSON B — Full-Stack Intern

Welcome aboard. Here's what exists, how to run it, and what you can pick up today. You'll work closely with Person A (system design) — they own the schema; you implement against it.

## What this is, in one minute

A swipeable chalkboard-style learning deck. Open it, swipe left/right through cards, tap "dig in" to go deeper into a card's layers. It's a static site right now — one HTML file does everything. No build step, no backend, no dependencies except Google Fonts.

## Run it (2 minutes)

```bash
cd strata-project
python3 -m http.server 8000
# open http://localhost:8000
```
- **Must** serve over http (the command above), not double-click the file — `file://` breaks image and font loading.
- Swipe ← / → (or arrow keys / on-screen arrows) to move across cards. Tap "dig in" / ↓ to descend; ↑ to come back up.

## What's in the repo

```
index.html            the whole reader: content + engine + styling
images/               card-01.png … card-11.png (only cards 1–11 are illustrated)
design/               app-shell prototypes (auth, map, leaderboard) — design refs, NOT built yet
  *.dc.html             open in a browser to preview; keep folder intact (they need support.js)
draft/index.html      old unedited content — ignore
*.md                  docs. Start with STRATA-BRIEF.md.
```

## How the content works (you'll touch this most)

Every card is a `C(...)` entry in the `DECK` array inside `index.html`:

```js
C(act, kicker, title, [layer0, layer1, ...], img, tags)
```
- `layers` = array of HTML strings (the depth levels). `null` skips a level.
- `img` = `"images/card-NN.png"` **or `null`**. ⚠️ If there's no image you MUST pass `null` explicitly — leaving it out shoves the tags object into the image slot and the card renders a broken `[object Object]` image with no text. (This bug already bit us once on 6 cards. Always pass `null`.)
- `tags` = `{subject, topic, concept, ground, buildsOn}`. Metadata.
- After adding/removing a card, renumber the `"Card NN"` kickers so they stay continuous, and update the hardcoded counter (`01 / NN`) in the HTML.

37 cards exist today, numbered continuously, verified rendering clean.

## House rules (don't trip these)

- **Use the CSS variables in `:root`** for colour — never raw hex. Never add a new font. (Design system is STRATA-BRIEF.md §4.)
- **Match the editorial voice** for any card text (STRATA-BRIEF.md §3): plain, concrete, no hype, minimal bold.
- **Don't re-add deleted cards** — there's a "cut/merged" list in §3.
- **Keep `index.html` a pure content+render layer** — no progress/state/storage hard-coded in the browser. That waits for the backend.
- Verify your change actually renders (open it in the browser; if you want, the repo has been smoke-tested with jsdom — ask Person A).

## Tasks you can pick up now (roughly easiest → meatiest)

1. **Deploy the current deck to Vercel.** It's a static site; this is mostly config. Goal: swipe the real thing on your phone. (Highest-value quick win.)
2. **Illustrations for cards 12–37.** 26 cards are text-only. Generate chalkboard images per the prompt + conventions in STRATA-BRIEF.md §4/§9, name them `card-NN.png`, drop in `images/`, and add the path to each card (remember: the path replaces the `null` in the img slot).
3. **Content extraction (with Person A's schema).** Write the converter that lifts `DECK` out of `index.html` into `/content/<subject>/<topic>.json`, and change the engine to `fetch()` those files. This is the big architectural step — do it against Person A's finalised schema, not freehand.
4. **Build the app-shell screens** from `design/` (auth, learning map, leaderboard) in the chosen framework — only after the design tokens and the content layer are settled.

## Where to ask

- Schema / data-model / "which axis does this belong to" → **Person A**.
- "How does the reader render X" → read the engine in `index.html` (`renderColumn`, `buildDescend`, the `DECK` array) and STRATA-BRIEF.md §1.

Start with task 1 or 2 — both are self-contained and get you familiar with the codebase without needing the schema locked.
