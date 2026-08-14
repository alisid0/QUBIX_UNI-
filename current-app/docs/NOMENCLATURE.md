# Nomenclature — official terms (locked)

The single source of truth for what we call things. Every file name, instruction to Claude Code, and brief should use these words and no synonyms. Where a term is still being decided, it's marked **TBD** — don't lock those in code yet.

Earlier drafts used "card / board / BB" interchangeably, and "level" for two different things. That's resolved below.

---

## Core structural terms (LOCKED)

| Term | Means | Notes |
|------|-------|-------|
| **BB** | The single swipeable unit a learner moves across. | This is the whole thing on screen. Replaces all prior uses of "card" and "board." Plural: BBs. |
| **Floor** | A depth step *inside* a BB, reached by tapping "dig in." | The arc is: idea → concrete → definition → in-action → formula. You descend through floors; the deepest floor is the bedrock (often the formula). Replaces "layer" and the old "level (inside a card)." |
| **Tier** | A difficulty band of the two pyramids (base → apex). | Written t0, t1, t2… t0 = base = "introduce, plain language, no formula-drilling." Everything built so far is t0. Stored in the `ground` field today (g0 = t0); rename `ground → tier` is an open engineering decision. |
| **Path** | A curated, ordered group of BBs forming one learning journey. | Mastery is tracked per path. **Paths are also the sections** of the deck (see "Act is removed" below). |
| **Subject** | physics / maths / chemistry (biology later). | `tags.subject`. |
| **Topic** | The sub-subject grouping a BB belongs to (e.g. vectors, the atom, fractions). | `tags.topic`. |
| **buildsOn** | A BB's prerequisite list (which BBs should come first). | `tags.buildsOn`. The dependency graph. |

---

## "Act" is REMOVED

"Act" (the Roman-numeral section labels — "Act I · Things move…") is **killed.** It was never agreed to and it collided with "path."

- **Paths are now the sections.** The reader's eyebrow should show the **path name**, not "Act I."
- **Action required (for Claude Code, not yet done):** remove the `act` field's role as a section label; have the reader's eyebrow render the path name instead; clean up the `ACTS` object. This is a code + metadata change, flagged separately — do not assume it's done.

---

## Internal-only terms (NEVER shown to users)

These are how *we* talk about the product. Students never see or hear them.

| Term | Means |
|------|-------|
| **Strata** | The project codename. **Not the public/product name** — that's TBD. Never ship "Strata" to a user-facing surface. |
| **The two pyramids** | Our structuring model: a **content (learning) pyramid** and an **assessment (testing) pyramid**, both widest at the base, mirrored tier-for-tier. Users never need to know this exists. (Full model: PYRAMIDS.md.) |
| **Tier** (the word, in UI) | Fine internally. Whether learners ever see tier labels is TBD. |

---

## Working terms — locked internally, TENTATIVE for the UI

Use these in code and docs now, but they are **not final as user-facing words** — expect them to change before launch.

| Term | Means | Status |
|------|-------|--------|
| **Quiz** | A quick knowledge check on a path. | Working term; UI wording TBD. |
| **Test** | A larger / higher-tier assessment. | Working term; UI wording TBD. May or may not stay distinct from "quiz." |
| **Recall** | A timed return-check (revisiting after a gap, e.g. 7 / 28 / 90 days). | Working term; UI wording TBD. |

(Whether quiz / test / recall are three genuinely distinct things or overlap is itself still being settled.)

---

## PARKED — to finalise later (do NOT lock in code)

**The mastery-state names.** The progression a learner climbs *per path* is agreed in structure but the **names are not final.** Current working structure:

1. Wandered — opened the path once
2. Checked — went through all BBs in the path
3. Well read — took the quiz and passed once
4. Recalled — came back ~7 days later
5. Master — aced the quiz (9/10+)  *(football-scoring theme starts here)*
6. Brace — aced again ~28 days later
7. Hattrick — ~90 days; topic covered and mastered via quizzing + recall *(grand top level)*

Open questions before this locks: whether states 1–4 also get themed; whether **Hattrick** is per-path or a broader subject-level / milestone crown; exact triggers. **Treat all seven names as placeholders until confirmed.**

Also parked: the **public product name** (Strata is only the codename).

---

## Quick rules for anyone using these

- Say **BB**, not card/board. Say **Floor**, not layer/level. Say **Tier** for difficulty, never "level."
- **Paths are sections.** There is no "Act."
- Don't put **Strata**, or any **working/parked** term, on a screen a user will see without checking it's been finalised.
- The mastery-state names are **not done** — if you need them in code, use neutral keys (state0…state6) and keep display names swappable.
