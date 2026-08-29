# Build spec — floor layouts (image-led floor 0 + textbook deeper floors)

A change to how floors render and how a BB stores images. Written for Claude Code. Status: **spec, not built.** Decided by the author; implement against this.

---

## The decision

A BB's floors should render in two different layouts:

- **Floor 0 (the swipe face)** — **image-led, full card.** The illustration fills the board (as it does today); no body text on floor 0. This is the striking "scene" image.
- **Deeper floors (1, 2, 3, …)** — **textbook-style.** A floor may show a diagram *inline with* its explanation text, so the picture and the words about it are visible together (like a figure in a textbook). A deeper floor may also be text-only (no image) — that's fine.
- **Image position within a textbook floor** — **flexible, decided per floor by whoever builds the card** (above the text, below it, or beside it on wider screens). Not fixed in the engine; the engine should support image-above and image-below at minimum, and may do side-by-side on wide screens.

This matches the earlier decisions: floor 0 stays punchy for swiping; the *teaching* floors get the textbook layout where a labelled diagram beside the words actually helps (e.g. naming the sides of a triangle while looking at it).

---

## What needs to change

### 1. Schema — images must be per-FLOOR, not just per-BB

**Today:** one image per BB (`img`), shown only on floor 0.
**Needed:** each floor can optionally carry its own image (and a position hint).

Today's card shape:
```js
C(act, kicker, title, [floor0, floor1, ...], img, tags)
//   layers are plain HTML strings; img is a single card-level image
```

Proposed shape — a floor can be either a plain string (text-only, as now) **or** an object that carries text + image + position:

```js
C(act, kicker, title, [
  // floor 0: image-led. Either keep the card-level img, OR express it as an object:
  { img: "images/card-21.png", text: null },          // floor 0: image only, full-bleed
  // deeper floors: textbook-style
  { text: "<p>…explanation…</p>", img: "images/card-21-b.png", imgPos: "above" },
  { text: "<p>…just text, no diagram…</p>" },          // text-only floor is fine
  "<p>…a plain string still works too (back-compat)…</p>"
], null, tags)
```

Rules:
- A floor that is a **plain string** = text-only (current behaviour, keep supported).
- A floor that is an **object** may have: `text` (HTML or null), `img` (path or null), `imgPos` (`"above"` | `"below"` | `"side"`, default `"above"`).
- **Floor 0**: if it has an `img` and no `text`, render the existing full-bleed image-led layout.
- Keep the old card-level `img` arg working for back-compat (treat it as floor 0's image) so the existing 11 illustrated BBs don't break.

> Implementation note: don't force a big-bang migration. Support BOTH the old shape (string floors + card-level `img`) and the new shape (object floors). Migrate cards to the new shape only as they gain deeper-floor images.

### 2. Engine — render a textbook floor

`renderColumn` currently does: floor 0 with image → full-bleed; everything else → text. Extend it:

- If the floor is image-led (floor 0, image + no text) → full-bleed image (as now).
- If the floor has **both text and image** → textbook layout:
  - `imgPos:"above"` → image block, then the text block beneath it.
  - `imgPos:"below"` → text block, then the image beneath it.
  - `imgPos:"side"` → on wide screens (tablet/desktop), image and text side by side; on phone, stack (image above) — never crush them side-by-side on a narrow screen.
- If the floor is text-only → text (as now).

Sizing for textbook floors:
- The inline image should be **constrained, not full-bleed** — it shares the view with text. Cap its height (e.g. it should never take more than ~half the visible card height on a phone) so the explanation is visible without scrolling where possible.
- Keep `background-size:contain` behaviour (whole diagram visible, no cropping of labels).
- Respect the existing board/frame styling and the depth-based board colour.

### 3. Images — naming for per-floor

- Floor 0 scene: `images/card-NN.png` (as today), or `card-NN-a.png`.
- Deeper-floor diagrams: `images/card-NN-b.png`, `-c.png`, … one per illustrated floor.
- This matches IMAGE-PROMPTS.md, where each BB has an **a** (floor-0 scene) and **b** (deeper diagram) prompt.

---

## Why this layout split (the reasoning, so it isn't "improved" away)

- **Floor 0 image-led** keeps the swipe experience punchy and phone-friendly — the picture gets the whole screen.
- **Deeper floors textbook-style** is where a labelled diagram beside the words genuinely aids learning (you read "opposite is across from θ" while seeing the triangle). The picture and its explanation belong together on the *teaching* floors, not split apart.
- **Flexible image position** because some diagrams read better above the text (see it, then read), others below (read, then see) — let the card author choose per floor.

---

## Acceptance check (how to know it's done)

1. The existing 11 illustrated BBs still render exactly as before (floor 0 image-led), no regressions.
2. A BB can have a deeper floor showing a diagram inline with its text, image above OR below, controlled per floor.
3. On a phone, a textbook floor shows image + text without the image swallowing the whole screen; on a wide screen, `side` position can place them side by side.
4. Text-only floors and the old card shape still work (back-compat).
5. No raw hex / new fonts; uses the existing design tokens (see DESIGN.md / STRATA-BRIEF §4).

---

## Note on the new images just received

The latest batch (BBs 1–9, 1:1 square, fixed orientation) are **floor-0 scene images** — they're the image-led floor for those BBs and slot in as `images/card-NN.png`. The textbook deeper-floor diagrams are the **b** images from IMAGE-PROMPTS.md, still to be generated. So: floor-0 art for 1–9 is in hand; deeper-floor diagrams and floors 10–37 are the remaining image work.
