# Handover · 2026-08-24 · Games and Volume 0

For whichever agent picks this up next. Read `AGENTS.md` and
`00-CURRICULUM-DECLARATION.md` first: they are the law, and nothing here
overrides them. This document is the practical layer underneath: what was
built in this stretch, how to ship it, and the specific traps that cost
me time so they do not cost you the same.

---

## 1. The one thing that will waste your day

**Vercel publishes from `main`. Work happens on `foundation`.**

Pushing to `foundation` alone deploys nothing. The site will keep serving
the previous build and everything will look fine locally, which is
exactly what makes it expensive: it took two separate rounds of "why
isn't this live" before it was understood.

```bash
git push origin foundation
git push origin HEAD:main      # this is the one that publishes
```

Vercel then builds and publishes in roughly one to two minutes. Verify by
content rather than by bundle hash, because Vercel builds independently
and the hash never matches a local `dist/`:

```bash
node scripts/verify-deploy.mjs https://qubix.university
```

A second, unrelated trap in the same area: **the production landing page
is not the page you see locally.** `App.svelte` routes production `/` to
`RoleFoundations`, while local `/` renders `Home`. I spent a session
measuring a page real visitors never see. When checking anything about
the front door, check it against the live domain.

---

## 2. What exists now

Measured, not remembered. Regenerate any time with `npm run state`.

| | |
|---|---|
| Volume 0 | 7 of 7 chapters written · 28 sessions · 28 h 25 min |
| Academy | 10 missions · 870 XP · 117 checked questions |
| Coordinate spine | 681 concepts · 493 drawn · 340 explained and movable |
| Three.js assets | 12, all on one contract |
| Approved by the founder gate | **0** |

### The missions

Eight pre-intern, two Volume I. Every one records its own completion into
`src/lib/game/progress.js`, which is what the hub reads.

| slug | what it teaches |
|---|---|
| `checkout` | lineage: observe, look up, derive |
| `classify-data` | what kind of thing a value is |
| `missing-data` | five kinds of empty cell |
| `table-grain` | what one row represents |
| `duplicate-records` | keys and duplicates |
| `join-grain` | what a join does to the row |
| `data-lineage` | entity, activity, derivation |
| `units-measurement` | what a value measures |
| `analyst-desk` | unit → evidence → chart → sentence, 8 requests |
| `sql-console` | assemble a query clause by clause, 8 tasks |

`sql-console` is the one worth understanding before writing another
mission. It runs a real query engine (`runQuery`) over twelve printed
rows, so the row count and the grain recompute live as the learner picks
clauses. Nothing about it is canned, and the expected row counts are
recomputed by a check from the same function the page calls. That is the
bar new missions should meet: **a book can state that grouping changes
the grain; only this can let somebody watch twelve sales become three
branches.**

### The reading

`src/lib/content/shared-foundations.js` is a registry. A new chapter
becomes clickable everywhere by being added to it, and the contents page
counts what exists rather than being told a number. Do not hardcode
chapter counts or times anywhere; both are summed.

---

## 3. The guards, and what each is actually protecting

These are invariants, not tests. They run in `prebuild`, so a broken one
stops a deploy. Each exists because something specific went wrong.

```bash
npm run check:chapters   # every chapter is really written
npm run check:missions   # every mission is answerable only by understanding it
npm run check:assets     # every Three.js asset answers to one contract
npm run check:book       # 172 arithmetic checks against the book's own prose
```

- **`check-missions`** exists because mission 004 shipped with the
  correct option first in all twelve of its questions. Pressing the top
  button scored 100%. It was fixed, then came straight back in two new
  missions, because the first version of the guard named the two missions
  it knew about. It now discovers questions by convention, and **a
  mission offering choices in a shape it cannot read fails rather than
  passing quietly.** Keep that property. Silence is how the bug returned.
- **`check-chapters`** exists because the pressure is always to add
  chapters, and the cheapest way to add one is to omit the parts nobody
  sees immediately. It also checks that every practice link names a
  mission `App.svelte` actually routes, which caught a link that only
  worked by falling through to a default.
- **`check-assets`** builds every asset headlessly with real `three` and
  asserts geometry, not just shape: a table stack must grow with its row
  count, a join bridge must return `leftRows × matches`.

**Do not weaken a guard to make a change pass.** Twice the guard was
right and my content was wrong; once the guard itself was wrong and I
fixed the guard, and said so in the commit.

---

## 4. Traps, with symptoms

Each of these cost real time.

**Nested scroll.** `global.css` pins `html`, `body` and `#app` to
`height:100%; overflow:hidden`. A full-height view then scrolls inside
itself, `document.scrollHeight` stays at exactly one viewport, and
`fullPage` screenshots silently truncate. Releasing `overflow` is not
enough; height is pinned too, and both need `!important` to beat the
global sheet. Fixed in `RoleFoundations`, `GameHub`, `AnalystDeskMission`
and `SqlConsoleMission`. Any new full-page view needs the same block.

**Nested ternaries in the router.** `App.svelte` deliberately uses flat
`if / else if` branches for its dynamic imports. A nested conditional
caused Vite to preload `GameHub.css` for every mission, so missions
mounted in production without their stylesheet. That was my bug and
somebody else fixed it. Keep the branches flat.

**Option shape.** Missions use `[value, label]` or
`[value, label, hint]`, and the answer names the value. Playwright's
accessible name for such a button includes the hint, so `exact: true`
matching fails. Select by the hint, which is unique.

**Answer position.** Spread correct answers across positions. A constant
rotation is not enough: my first fix turned `000000000000` into
`121212121212`, which a learner notices just as fast. The guard now
rejects both.

**Line endings.** Files on disk are CRLF. Any patch script must match the
file's endings or every anchor misses. Every patch helper in
`scratchpad` does this; copy the pattern.

**Shell heredocs.** Bash heredocs mangle backslashes and apostrophes in
JS regexes and prose. Write the patch to a `.mjs` file and run it. I
relearned this four or five times; do not.

---

## 5. Where things live

```
src/lib/game/*-mission.js     mission content and any engine it needs
src/lib/game/progress.js      the roster, XP, ranks, localStorage
src/views/*Mission.svelte     one view per mission
src/lib/content/shared-*.js   Volume 0 chapters and the registry
src/lib/components/SiteNav.svelte     shared nav, used by hub pages
src/lib/components/SiteFooter.svelte  site map, read from registries
src/lib/three/assets/         12 assets + kit.js, one contract
scripts/check-*.mjs           the guards
scripts/build-state.mjs       npm run state, writes STATE.md
book/                         the books and the coordinate spine
```

Design register, set on 2026-08-24: minimal. One accent, one rule colour,
four background colours, roughly fourteen type styles. Text-only
navigation. Disclosures rather than everything expanded. If you change a
page, measure it: count backgrounds, borders and type styles before and
after, and take a link inventory so you can prove nothing was lost.

---

## 6. What I would do next, in order

1. **`data-lineage` is thin.** Three steps against eight elsewhere. It is
   the obvious next expansion and the pattern is established.
2. **Python has no game.** Chapter 06's four sessions all borrow other
   missions. `check-chapters` prints the borrow list; the target is to
   move `1 chapter with a game of their own` upward. A Python mission
   wants a real runner, which is a bigger job than anything here so far.
3. **Extract the mission shell.** Ten mission views duplicate roughly
   sixty lines of near-identical CSS. Fixing it once fixes ten screens,
   and it is what stands between the missions and the minimal register
   the landing now uses.
4. **Three role games are still plans.** `RoleGameHub` describes four;
   only the analyst one is playable. The other three should either be
   built or stop being advertised.

---

## 7. The thing nobody has dealt with

**Nothing has ever passed the review gate.** Zero boards approved, and
every occurrence of `APPROVED` in the repository is either the vocabulary
definition or an unchecked box. Meanwhile 28 hours of curriculum, ten
missions and 983 figures are live on a public domain under the
university's name, all labelled `AI_DRAFT`.

The declaration allows one board through at a time and requires the
founder to read, test, amend and approve each one. At twenty minutes a
board the spine alone is 227 hours. **The rule was written for a
catalogue a hundredth of this size, and production has routed around it
rather than slowed to it.**

That is the founder's decision to make, not an agent's. But do not add to
the pile without saying plainly that you are adding to it. Every commit
in this stretch that shipped unapproved content said so.

---

## 8. A note on how to verify

The checks catch arithmetic and structure well. They do not catch "this
is wrong to use". Three times in one week a mission passed every guard
and failed the moment it was played:

- the SQL console arrived **showing its own answer**,
- the Decision Desk **crashed past its last case**,
- a median line was **hardcoded to one case's data** and would have drawn
  a false line on any other.

All three survived reading the code. **Play the thing.** Drive it with
Playwright, click the wrong answer as well as the right one, finish it,
and look at the screenshot rather than the assertion count.
