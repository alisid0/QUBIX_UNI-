# claude.ai/design brief — Qubix Reader motion prototype

**Goal:** design an **interactive, animated** `.dc.html` prototype of the Qubix Reader's core motion — opening a BB, digging down/surfacing through floors, and swiping across BBs. Output is a design prototype (HTML/CSS + light `DCLogic` interactivity), not production code; the dev team ports the transitions into the real Svelte Reader afterward.

Paste this whole brief into the claude.ai/design chat for the existing Qubix project, alongside the other screens (Qubix Board, Strata Map, etc.). Match their conventions exactly.

## What Qubix's Reader is (the thing being animated)

A **two-axis** learning surface:
- **← → horizontal:** swipe across **BBs** (one concept per card).
- **↓ ↑ vertical:** within a BB, **dig down / surface up** through stacked **floors** (Idea → Concrete → Definition → In action). Floor 0 of an image BB is a full-bleed "swipe card"; deeper floors are reading floors.

So the motions to show are: **(1) a BB opening**, **(2) digging down a floor**, **(3) surfacing up**, **(4) swiping to the next/previous BB.**

## Match the real Reader (so the motion ports cleanly)

These are the live values — reuse them so the prototype feels identical to production:
- **Horizontal rail** between BBs: `transform: translateX(-idx*100%)` with `transition: transform 0.62s cubic-bezier(0.16, 0.84, 0.24, 1)`.
- **Dig-hint chevron** bob: `@keyframes digbob { 0%,100% { transform: translateY(0) } 50% { transform: translateY(4px) } }`, `1.8s ease-in-out infinite`.
- **Card slab:** `width: min(420px,100%)`, `border-radius: 18px`, Qubix surface + 1px border + soft shadow.
- **Swipe card (floor 0, image):** full-bleed background image, dark gradient overlay (top + bottom), a frosted chip "subject · topic" top-left, a tier badge top-right, an audio button, and a bottom block (kicker, big title, "Swipe down to dig in" with the bobbing chevron in an accent circle).
- **Reading floor:** header (subject glyph + title + kicker), a thin **depth rail** of dots on the left (current dot larger/accent, passed dots dimmed), the floor label pill (e.g. "DEFINITION · Floor 3 of 4"), the text, optional media, and up/down arrow controls bottom-right.

## Design system (Qubix)

- Font **Mulish** (300–900). Accent **#454ADE**; pink **#FF79AC**; yellow **#FFF05A**; recall periwinkle **#9AA0FF**.
- Render inside a **phone-frame mockup** like the other screens (dark device bezel, ~330×724 screen, notch, "9:41" status bar, home indicator).
- The Reader surface is Qubix-styled; show it on the **light** theme (surface `#ffffff`/`#F1F2F0`, text `#121118`) with the dark swipe-card image card, matching production.
- Use `<dc-import name="SubjectMark" subject="physics" accent="#454ADE" hint-size="..."></dc-import>` for the subject glyph (already a component in the project).

## The animations to build

Make each tappable so the prototype actually moves — drive it with a `DCLogic` state machine (`{ idx, depth }`) and `onClick` handlers; use CSS transitions/keyframes for the motion.

1. **BB open** — entering a topic, the first BB's swipe-card animates in: `opacity 0→1`, `transform: translateY(10px) scale(0.97) → none`, ~360ms ease-out. Then the "Swipe down to dig in" hint fades in with the bobbing chevron.
2. **Dig down (descend a floor)** — tap the down-chevron (or an up-swipe affordance): the current floor content slides up and fades out (`translateY(0 → -100%)`, opacity→0) while the next floor slides in from below (`translateY(100% → 0)`, opacity 0→1), ~450ms `cubic-bezier(0.16,0.84,0.24,1)`. The depth-rail advances (active dot grows to accent, previous dot dims), and the floor-label pill swaps. Give it a clear "going deeper" feel.
3. **Surface up** — the exact reverse of #2 (slides the other direction), via the up-chevron.
4. **Swipe across BBs** — tap side chevrons (or a swipe affordance): the rail translates `±100%` with the `0.62s cubic-bezier(0.16,0.84,0.24,1)` curve; the top progress bar fills accordingly; the entering BB resets to its floor 0.
5. *(Optional, nice-to-have)* a brief **drag-follow** suggestion — the card tracking a finger a few px then snapping — even if simulated by a tap that nudges then settles.

Keep motion **calm and premium**: short durations, ease-out/standard curves, no bounce except the gentle `digbob`. One thing moves at a time.

## Output conventions (match the existing `.dc.html` files)

- A single `.dc.html` document: `<x-dc>` root, a `<helmet>` with the Mulish font `<link>` and a `<style>` block holding the `@keyframes`, then the markup.
- Light interactivity via the project's pattern:
  ```html
  <script type="text/x-dc" data-dc-script data-props="...">
  class Component extends DCLogic {
    state = { idx: 0, depth: 1 };
    renderVals() { return { /* computed transforms + setState handlers */ }; }
  }
  </script>
  ```
- Expose tappable controls (dig down/up, prev/next BB, "open BB") wired to `setState`.
- Name it e.g. **`Reader Motion.dc.html`** and keep it in the same Qubix design project.

## Handoff

When it's done, share the file. The dev team imports it via the design MCP (as with the Strata Map), reads the timings/easings/keyframes, and ports them into the real `Reader.svelte` — where the actual touch gestures (drag-follow, swipe velocity/momentum) are added. The CSS-transition layer should transfer almost directly, since the prototype reuses production values.
