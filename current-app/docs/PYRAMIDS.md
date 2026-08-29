# The two pyramids — content & assessment tiers

Status: **model documented, not yet wired into naming/code.** Cards still carry `ground:"g0"`; this defines what that means and where it's going. No renames done yet (deliberately — "name later").

---

## The model

Strata is structured as **two inverted pyramids**, run in parallel:

```
   CONTENT (learning)              ASSESSMENT (quiz / test / recall)
   ────────────────────           ────────────────────────────────
   t3   ▲  apex                    t3   ▲  apex
   t2  ▲▲▲  narrow / advanced      t2  ▲▲▲  fewer, harder, high-stakes
   t1 ▲▲▲▲▲                        t1 ▲▲▲▲▲
   t0▲▲▲▲▲▲▲ BASE (widest)         t0▲▲▲▲▲▲▲ BASE (widest)
```

Both are **inverted: widest at the base.** The base holds the *most*, the apex the *least*.

- **Content pyramid** — the base (t0) is the broadest, most foundational layer: many cards, plain language, **introducing** ideas without naming formulas. Climbing up narrows it: fewer cards, more advanced, more formal, names the formulas, builds on the tiers below. Base = maximum breadth of exposure; apex = specialised depth.
- **Assessment pyramid** — mirrors it. The base has the most assessment too: gentle, frequent, low-stakes checks and recalls across the foundational content. Narrowing upward to fewer, harder, higher-stakes evaluations as the content specialises.

The two are **paired** — every content tier has a matching assessment tier. Quizzes/tests/recalls at tier *n* assess content at tier *n*.

**We are currently at the base of both (t0):** introducing lots of ground-level concepts, plain-language, no formula-naming. The whole 37-card deck is t0. Higher tiers come later as topics deepen.

---

## Tier naming

- The bands are called **tiers**, written **t0, t1, t2, t3, …** (t0 = base).
- **Storage today:** the card metadata field is `ground` (e.g. `ground:"g0"`). Treat **g0 = t0**. So `ground` is currently the storage key holding the tier value.
- **Open rename (later):** either rename the field `ground → tier` and use `t0` values, or keep `ground` as the key. Not done yet. Until then: `ground:"g0"` means "content tier 0 / base."

---

## What "t0 / base" means for writing cards (current rule)

- Introduce the idea in plain language. **Do not name or drill formulas** (a formula may *appear* in a card's deepest layer as a payoff — e.g. F=ma, R²=x²+y² — but the tier's job is exposure and intuition, not formula mastery).
- Concrete scenarios, mechanism over assertion (see the editorial voice in STRATA-BRIEF.md §3).
- Breadth over depth: cover many concepts lightly rather than few concepts deeply. Depth is what higher tiers add.

Higher tiers (t1+) will, when built: name and use formulas, add worked problems, assume the t0 base, and narrow to specialised sub-topics.

---

## How this relates to the other axes

Strata now has several orthogonal axes — keep them distinct:

| Axis | What it is | Field / where |
|------|-----------|---------------|
| **Tier** (this doc) | base→apex difficulty band of the two pyramids | `ground` (g0=t0) |
| **Subject** | physics / maths / chemistry | `tags.subject` |
| **Path** | curated ordered group of cards for mastery (STRATA-BRIEF §7) | (paths manifest, TBD) |
| **Act** | the section label shown in the reader eyebrow | `act` (I–V, provisional) |
| **buildsOn** | per-card prerequisite graph | `tags.buildsOn` |
| **Mastery state** | learner's progress through a path (Wandered→Mastered twice) | (backend, TBD) |

The **assessment pyramid is the home of quizzes** — which the mastery system (STRATA-BRIEF §7) depends on for the "Well read / Mastered" states. So: assessment pyramid → quizzes → mastery states. Three views of the same future feature.

---

## Next (when ready, not now)

1. Decide the `ground → tier` rename (or keep `ground`).
2. As content deepens, start tagging cards t1+ and define what each tier means per subject.
3. Build the assessment pyramid alongside quizzes — tier the quizzes to match content tiers.
4. Keep t0 broad: the base should be the largest tier by far (it's the foundation everyone walks first).
