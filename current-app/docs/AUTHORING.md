# AUTHORING.md — The Loop: content creation process

This is how every BB gets written. The author (you) does not need to be an expert in the topic. The process is designed so that if *you* can learn it and explain it, a student encountering it for the first time can too.

---

## The Loop

```
Instance 1 → Instance 2 → (Instance 3) → Draft 1 → Draft 2 → Draft 3
                                                                    ↓ if failed
                                                               restart loop
```

Three attempts at drafting. Three loops maximum before a topic is shelved and restarted fresh.

---

## Before you begin: prerequisite check

Every BB sits on top of others. Before running the Loop, flag which BBs must come first (the `buildsOn` list). If those BBs don't exist yet, write them first. Snell's Law, for example, requires BBs on waves, mediums, and the speed of light — without those, the Loop will stall.

---

## Instance 1 — intuition and knowledge probe

**No formula. No textbook definition. No technical terms introduced yet.**

AI asks 3 questions that test:
- What the author already knows or has observed in everyday life
- Where their intuition is right (confirm it)
- Where the gap is (note it, don't fill it yet)

Questions should be grounded in something *observable* — a straw in water, a fish, a marching band. Never open with the abstract. Find the foothold first.

AI marks what's right, what's close, and what's missing — then moves to Instance 2.

---

## Instance 2 — textbook definition + Q&A

AI gives the author the clean, single-sentence textbook definition plus the formula (if
one exists). This is author learning, not permission to put the formula on the learner's
first floor. The author must first be able to explain the relationship without notation.

Author asks any questions until it clicks. AI answers plainly — no hype, no over-explaining.

When the author says **"done"**, both Instance 1 and Instance 2 are marked complete.

### Turning a formula into learner floors

A formula is the compressed ending of an explanation, not the beginning. When notation
may be unfamiliar, draft the BB in this order:

| Stage | Purpose |
|---|---|
| Experience/question | Pose an observable situation the learner can predict |
| Visual model | Show which quantities exist and what changes |
| Plain language | State the relationship without mathematical symbols |
| Notation decode | Reveal one symbol at a time, linked to the visual model |
| Worked example | Substitute small values in visible steps, including units |
| Misconception check | Contrast the correct meaning with the tempting wrong interpretation |
| Transfer/synthesis | Apply the same relationship to a slightly different case |

Stages may share a floor when the idea is genuinely simple, but experience, visual
model, and plain language must precede unfamiliar notation. A formula on Floor 0 or
Floor 1 requires an explicit reason that the target learner already has the intuition.

For every formula BB, record the prerequisite, concrete model, plain-language
relationship, symbol decoding, worked example, likely misconception, and required
interaction. Verify the current live BB and floor first with `pnpm run
audit:live-media`; working exports belong in ignored `.audit-cache/`, not in a
committed draft inventory.

Example: for a limit, animate a point approaching a hole in a graph, then show a small
input/output table, then say “as x gets closer to 2, f(x) gets closer to 4.” Only then
build `lim(x→2) f(x) = 4`. A later floor must show that the value at `x = 2` can differ
from the value being approached.

---

## Instance 3 — deep clarification (optional, author-triggered)

For complex topics only. Author says "trigger Instance 3."

AI goes deeper: edge cases, why the formula works mechanically, what breaks the rule and why.

Not every topic needs this. Most won't.

---

## Draft phase

Once instances are complete, the author gives the first draft — typed or dictated, rough is fine.

### Draft 1
Author's own words. AI notes:
- What works (keep it)
- What's factually off (flag and fix)
- What's editorial/hype (cut it)
- What's missing (the observable hook, usually)

AI proposes Draft 2 based on the feedback.

### Draft 2
AI's polish of the author's words — same structure, tighter language.
Author approves, adjusts, or rejects.

### Draft 3
Final pass if needed. If this still doesn't land, the loop restarts from Instance 1.

---

## Editorial rules (apply to every draft)

These come from `CONTENT.md` and apply without exception:

- **Start with the observable.** The hook is always something the reader can see or has already noticed — the straw, the fish, the crumple zone. Name the law *after* the phenomenon, never before.
- **No hype.** Cut "timeless," "revolutionary," "proven," "fascinating." The mechanism speaks for itself.
- **Plain definitions.** One clean sentence. Not a paragraph.
- **Mechanism over assertion.** Don't say "it works this way." Show the step that makes it work.
- **Minimal bold.** Only the first use of the named term being introduced.
- **No em-dash stacking.** Short sentences over compound clauses.

---

## Snippets

Snippets are short contextual notes, conceptually tied to whichever BB introduces the named law or idea — but they render as their **own standalone card**, not as a box nested inside that BB. They are not a Floor of the BB they reference, and not the BB's swipe card either. Every Snippet is tagged `kind:"snippet"`, with `buildsOn` pointing at the BB it's actually about (so the connection is still traceable, just not visually nested), and positioned as its own card at the end of the tier, immediately before that tier's Recap board.

There are two flavors. A tier can have one of either, both, or neither — never force one just to fill the slot.

### Discovery Snippets

The person, the moment, the twist. Who found it, when, and the irony, rivalry, or gap between discovery and recognition that makes it stick.

**Format:** 3–8 sentences. Who, when, the twist. End on something that reframes the whole thing.

**Tone:** Same editorial voice as the BBs — no hype, no over-dramatising. Let the facts carry it. The author will always polish the raw Snippet before it goes live.

**When to write one:** Every tier that introduces a named law or concept worth a story should have at least one. Anonymous or purely descriptive BBs (e.g. "what a vector is") don't need one.

#### Snell's Law — Discovery Snippet (raw draft for author to polish)

Willebrord Snellius, a Dutch astronomer, worked out the exact relationship between the angles in 1621. He never published it. After his death, Christiaan Huygens found the manuscript and gave him the credit.

The twist: an Arab mathematician named Ibn Sahl had described the exact same law in Baghdad in 984 AD — more than 600 years earlier — in a treatise on how curved mirrors focus light. His work was lost to European science for centuries.

In France they still call it Descartes' Law, after René Descartes who published it in 1637, unaware Snell had it first — and unaware Ibn Sahl had it long before either of them.

Three independent discoveries. One law. The universe kept the same secret until each of them found it on their own.

### Era & Technology Snippets

Where Discovery Snippets zoom in on a person, these zoom out: what the world looked like technologically before this idea existed, and the chain of devices and systems that exist *because* of it — usually landing on something the reader is holding or standing near right now. This is the Vsauce / Sagan / deGrasse Tyson / Veritasium register: scale, surprising causal chains, the "wait, that connects to *this*?" turn.

**The "no hype" rule still applies, it just earns its awe differently.** Hype is a vague adjective standing in for a fact ("incredible," "revolutionary," "game-changing"). The infotainment voice gets its charge from a *concrete, checkable thing* — a number, a comparison, a chain of cause and effect the reader didn't expect — never from an adjective asserting that the thing is impressive. If you can delete a word and lose no information, it was hype; cut it.

**Format:** 4–8 sentences. Open on the *before* (what didn't exist, what people did instead, how primitive the workaround was). Land on the *after* — name the specific modern technology, system, or everyday object downstream of the idea. A good closing move is a twist on the connection itself (the thing that "won" was later overtaken by the thing it replaced, for a different reason; the old method is still secretly in use somewhere surprising; the timeline is far shorter or longer than intuition suggests).

**Tone:** Same precision as Discovery Snippets — every claim must be a fact a curious reader could go verify, not a vibe. Concrete numbers (years, counts, distances, speeds) do the work that adjectives would otherwise be doing.

**When to write one:** Best suited to BBs whose idea has an obvious, traceable technological lineage (an equation that became a device, a law that became an industry) — electromagnetism, thermodynamics, optics, and orbital mechanics are rich in these. A purely abstract or notational BB (e.g. summation notation) usually won't have a good one — don't force it.

#### AC vs DC — Era & Technology Snippet (raw draft for author to polish, ties to the AC generator BB)

In 1880, electric light meant DC run from a generator a few blocks away — current that couldn't survive a journey of more than about a mile before it bled away as heat in the wires. Entire cities would have needed a power station every few streets. Then Faraday's law, run through a rotating coil instead of a sliding magnet, gave the world alternating current — and a transformer that could step its voltage up for transmission and back down for safety, something DC could not do. Edison, who'd built his empire on DC, fought it for the rest of his career, staging public electrocutions of animals with AC current to brand it as lethal. He lost: by 1900, Westinghouse's AC had wired most of a continent, because one power station could now reach customers a hundred miles away instead of one. The twist: AC didn't actually settle the argument forever. Past a few hundred miles, the conversion losses flip back in DC's favor, so the longest power links on Earth today — under the North Sea, across the Amazon, into Beijing — run on high-voltage DC. The war Edison lost in 1900 quietly reopened a century later, at a distance nobody in 1900 was building wires across.

---

## Bridge cards

A Bridge card connects a new tier to something that already exists elsewhere in the deck (a different path, a different subject) — making the link explicit instead of leaving it implicit. Like Snippets and Recaps, it's not CG-numbered, to avoid renumbering the whole path for a connective card.

**Format:** short, 1-2 Floors. Names the existing thing it's bridging from directly (don't paraphrase around it — say "Card 14" or whatever it is), states the new framing plainly, and can forward-flag an exception or wrinkle worth keeping rather than smoothing over.

**Placement:** wherever the connection is most useful — typically between two tiers, not inside one. Tagged `kind:"bridge"`.

**When to write one:** when a new tier's framing genuinely depends on or reframes something already taught elsewhere (e.g. Coordinate Geometry's Tier 1 reframing lines as functions, connecting back to the existing M1 path's "Functions" card). Don't force one just to cross-link for its own sake.

### Bridge — Tier 0 to Tier 1 (example)

Connects to existing Card 14 ("Functions," the vending machine, in path M1). States: a line is a "multiply, then add" machine — f(x) = mx + c. Forward-flags that a circle will break the one-input-one-output rule, which is why it isn't a function — kept as an exception, not glossed over.

---

## Recap boards

A Recap board is a single BB that closes out a tier: a plain bullet list of the key facts and formulas just locked, nothing narrative. No Loop required to write one — it's compiled directly from BBs already locked, not authored fresh.

**Format:** one Floor, a `<ul>` of short `<li>` bullets, one bullet per major fact/formula from the tier. No hook, no story — purely a quick-reference, meant for scanning right before a quiz or a recall check.

**Placement:** last BB in the tier, `buildsOn` the tier's final topic. Tagged `kind:"recap"` so tooling (the review page, future quiz generation) can treat it differently from a normal BB — e.g. never quizzed directly, styled distinctly.

**When to write one:** every tier, once every BB in it is locked. Not before — a Recap is a summary of settled content, not a preview.

### Tier 0 — Recap (example)

- A number line orders every real number — equal spacing means equal difference.
- Zero is the reference point, not the start. Right = positive, left = negative, by convention.
- Between any two numbers there are infinitely many more.
- Distance on a line = |a − b|. Midpoint = (a + b) / 2.
- Two number lines crossed at a right angle make the x-axis (horizontal) and y-axis (vertical).
- A point's address is the ordered pair (x, y) — x first, always.
- The origin (0, 0) is where both axes' zeros meet.
- Distance on the grid: d = √((x₂−x₁)² + (y₂−y₁)²). Midpoint: ((x₁+x₂)/2, (y₁+y₂)/2).
- Four quadrants, I–IV, anticlockwise from top-right: (+,+), (−,+), (−,−), (+,−).

---

## What the final BB looks like

| Floor | Content |
|-------|---------|
| 0 | The swipe card — the hook + one-line statement of what the law/idea is. No formula. |
| 1 | The concrete — a real scenario that shows the idea in action. |
| 2 | The definition — the clean textbook version, formula introduced here if applicable. |
| 3 | In action — where it's applied, what it predicts, what it explains. |
| 4 | The law / bedrock — the full formal statement, edge cases, what breaks it. |
| — | **Snippet** — Discovery (the person/the twist) or Era & Technology (before/after, the device it led to). Not a Floor. Author-polished before publishing. |

Not every BB needs all 5 Floors. Shallow ideas are complete at Floor 1 or 2.

---

## Example — Snell's Law (completed loop)

**Instance 1 findings:**
- Author knew: refraction = bending (not bouncing), fish appears in wrong position, material controls the bend
- Author's gap: didn't know what the refractive index (n) was or what the angles were measured from

**Instance 2 Q&A:**
- Clarified: the normal (imaginary perpendicular line), angle of incidence, angle of refraction, refractive index as "how much the material slows light"
- Flag raised: Snell's Law assumes prior BBs on waves, mediums, speed of light — those are missing prerequisites

**Draft 1 (author):**
> "Like all the other laws of physics we have a timeless and proven law for reflection and refraction. Angle of incidence and angle of refraction have a relationship that can be expressed as their angles. It is called Snell's law."

**Issues found:** mixed in reflection (wrong), used hype ("timeless and proven"), no observable hook.

**Draft 2 (final — Floor 0):**
> A straw in a glass of water looks bent at the surface. A fish underwater isn't where it appears to be. Both are the same thing happening: light bending as it crosses from one material into another.
>
> The angle it comes in at and the angle it bends to have an exact, predictable relationship. That relationship is Snell's Law.
