# The media rule

Status: standing constraint. Applies to every visual in the product.
Last updated: 2026-08-28

`store-map.js` and `Figure.svelte` both cite "the media rule in CLAUDE.md" and
this repository's `CLAUDE.md` is a five-line pointer that does not contain one.
The rule was real and was written down somewhere else. This is it, written down
here, in the repository that follows it.

---

## The rule

**Raster images and GIFs may show visible real-world action and narrative
analogy only.** A colleague at a till, a delivery arriving, a room in the shop.

**Technical visuals must be deterministic.** Graphs, formulae, geometry,
particles, circuits, rays, system diagrams, labels and quantities are drawn with
SVG, canvas, Manim or Three.js, computed at render time from the same data the
lesson uses.

**Never put generated text or exact technical geometry into a raster frame.**

---

## Why, specifically here

This is not a stylistic preference. A raster figure breaks five things this
product depends on.

**It cannot be checked.** Every quoted figure in the course is recomputed from
the sample database by a guard before the site can deploy. Chapter 8 shipped a
draft with four invented numbers and `check-chance-figures` caught it. A number
baked into a PNG freezes at the moment somebody exported it and drifts silently
from then on, and the console is two clicks away for a learner to notice.

**It cannot theme.** The site ships light and dark. A raster ships one.

**It cannot respect `prefers-reduced-motion`.** That is an accessibility
requirement, and an animated GIF has no way to honour it.

**Its text stops being text.** Labels in pixels cannot be selected, searched,
translated, read by a screen reader, or scaled without blurring.

**It is heavy.** A smooth ten-second join animation is megabytes as a GIF and
kilobytes as SVG.

---

## What this means for motion

Motion follows the same split. Animating a technical idea is still a technical
visual, so it is SVG or canvas, not a GIF.

In order of cost, use the cheapest that works:

1. **CSS transitions on SVG.** A row sliding between tables, a bar growing, a
   highlight sweeping. No JavaScript, themed through `--qx-*`, and reduced
   motion handled by one media query.
2. **Svelte transitions and `tweened`.** When the motion is driven by the
   learner rather than by a timeline.
3. **Canvas.** Only when hundreds of elements move at once.
4. **Three.js.** Only when the subject is genuinely three-dimensional.

Every animated figure must:

- compute its numbers from the same source the mission uses, so a guard can
  check them;
- render a complete, readable final state with motion disabled;
- offer a replay control, because a learner who missed it will want it again;
- carry an `aria-label` that states what the figure shows, in words.

---

## Where raster is right

Narrative art. The nine room images of the Superstore are photographs of a
fiction: a stock room, a goods-in bay, a customer desk. They carry no
quantities, no axes and no labels, and nothing is computed from them.

That is the test. If removing every number and label from the image would lose
nothing, it can be raster. If the image is carrying a fact, it cannot.

---

## Enforcement

- `check-figures` requires reading figures to be computed rather than pasted.
- `check-overlays` keeps covering surfaces opaque in both themes.
- `check-motion` requires every animated figure to respect reduced motion and to
  state what it shows.

Guards catch what they can see. A raster figure with a wrong number in it is
still invisible to all of them, which is the reason for the rule rather than an
argument against it.
