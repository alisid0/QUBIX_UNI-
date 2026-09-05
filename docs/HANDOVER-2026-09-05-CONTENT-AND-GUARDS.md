# Handover · 5 September 2026 · the floor, the content pass, and the guards

Supersedes the open items in `HANDOVER-2026-09-03-AUTH-AND-DESIGN.md`. That
file is still the right description of how sign-in and consent are built; the
list at the end of it is out of date and this one replaces it.

Everything below is committed, pushed and deployed.

## Where things stand

```
floor          47 steps across 6 stages, 71 live assets
reading        36 sessions across 8 chapters
missions       24
maths          10 boards, 39 floors
guards         48 in prebuild, plus 2 that need a browser
```

## Closed since 3 September

**Google sign-in works.** The provider is enabled and the authorize endpoint
redirects to Google with the right client and callback. Both routes are live:
Google, and email with confirmation required.

**`QUBIX_BUILDER_KEY` is no longer needed.** The Builder became the Draft
Workshop, which makes no API call at all, so there is nothing to gate. `/builder`
is open and works. The old handover lists the missing key as a defect; it is not
one any more.

**Line endings.** `core.autocrlf=true` on a Windows checkout meant Git stored LF
and handed out CRLF. That churned two generated files on every build and blocked
`npm run deploy` three times, and it eventually failed a build outright:
`check-root-entry` asserts a pattern spanning a newline, so the same commit
passed on one machine and failed on another. `.gitattributes` now pins LF, and
that guard normalises before matching. A build leaves the tree clean.

**`/academy` was throwing on load and nobody knew.** `b9de7dd` removed the
definition of `productionFoundationLanding` on 1 September and left one use
behind. The route answered 200, painted the shell, threw a ReferenceError and
rendered an empty page with no links for two days, while all forty guards
passed. Fixed, and see the linter below.

## Still open

**1 · `/privacy` returns 404.** This is the one that blocks a whole feature.
`PRIVACY_POLICY_VERSION` in `src/lib/legal.js` is `null`, so the marketing opt-in
does not render and `grantConsent` refuses. `check-auth` fails the build if the
version is set without a policy being published, so the ordering is enforced
rather than remembered. The policy pages exist only inside `current-app/`, the
nested old Strata app, and are not deployed.

**2 · Migration 0004 has never been run.** `marketing_consent` still answers
`PGRST205`, meaning the table does not exist. Nothing is broken, because the
feature is off, but run it before turning promotional email on.

**3 · Four DSA previews carry a back control labelled "← Authoring"** pointing at
a dev-only route, on live learner URLs. The fix is two words of markup. It was
written and reverted: those files are digest-locked in
`curriculum/APPROVED-DSA.json` and `check-dsa-preview` refused the change. Only
the founder can amend an approved sample. Recorded in `check-navigation.mjs` as a
known defect rather than exempted.

**4 · Chapter 06.01's Play is not Python.** It points at `classify-data`, which is
chapter 3's data-types mission, reused. A Python chapter's first Play should be
Python. Needs either a new mission or a founder decision about the pairing.

**5 · No type checking.** ESLint catches undefined identifiers now. It would not
have caught the null dereference that took the whole floor down on 3 September.
`svelte-check` is the next thing worth adding and has not been.

**6 · Site-wide radius drift.** 23 distinct `border-radius` values across 614
declarations, every integer from 2 to 18 plus 20, 22, 24, 28, 99 and 999. The
floor is now internally consistent; nothing else has been touched. This is the
same drift `check-palette` exists to stop for colour, and wants doing screen
group by screen group with somebody looking.

## What was built

**The floor.** Stages fold and unfold in place, with the stage holding your next
step open by default. Every step shows its time: a declared figure for a reading,
and a tilde for a mission or board, because those are computed from the same
model `check-timing` uses and it under-reads anything whose work lives in code
rather than prose. Mathematics is a sixth stage, ten boards, single-track,
generated from `course.js` so the titles cannot drift.

Nine written readings that had never been placed are now on the map, so every
one of the 36 sessions is reachable. They arrive as reads with no play, marked
`unpaired` rather than `unbuilt`: `unbuilt` means a mission was named and does not
exist, and these were simply never given one. Eight are still unpaired.

**Chapter 05.01, "What a table is, and how to ask it for something"**, with **The
Employee Table** mission. Everything on both is real: six actual Northgate
employees, their own ids, roles, hours and start dates. Inserting a session at
the front of chapter 5 renumbered the four that follow, which moved them in
`learning-flow`, the beginner path, Phase One and the mission roster. Phase One
4.1 had carried no source since it was written; this session is exactly its
claim.

**A reader that can show code.** Chapter 06 taught Python and could not display
any, because a section is prose and the only `<pre>` belonged to the rehearsal.
Sections may now carry a listing. 06.01 has three, and every output in them was
run rather than typed, including the `TypeError`, quoted from CPython.

**The workbook answers back.** It folds shut by default and can be handed to Ask
Qubix, which holds the session's context. Measured before changing it: workbooks
are not duplicates of the missions, because a mission uses Superstore data and a
workbook uses the learner's own. That is the masterplan's Layer 3 transfer and
the only place the course has one. What was true is that nothing marked them.

## The guards, and why there are new kinds

Forty guards read the source and none of them checked that it runs. Three
defects in a row got past all of them and were found by a person opening the
page: the front door would not scroll on a phone, a stage toggle updated its
state and never re-rendered, and the floor threw on load and drew nothing.

| Guard | Catches |
|---|---|
| `npm run lint` | undefined identifiers, duplicate keys, unreachable code. Eight seconds, first in prebuild. Reintroducing the `/academy` bug fails the build. |
| `check-contrast` | every text token against every ground it can sit on, including component-scoped overrides and the ink palette |
| `check-navigation` | every learner-facing view reaches home in one click, and none links into an authoring route |
| `check-rendered` | needs a browser: loads the page, counts the stages, presses a toggle, follows a link |
| `audit:links` | reports repeated destinations. A tool, not a gate. |

`npm run deploy` now opens the built site in a browser and runs `check-rendered`
against it before publishing. It lives there and not in prebuild because Vercel's
build image has no browser. `QUBIX_SKIP_RENDER_CHECK=1` exists for the day one
will not start, and its message says what using it means.

## Two things a new machine needs

`.env.local` is gitignored and `vercel env pull` returns `[SENSITIVE]` for the
Supabase pair, so a fresh checkout gets placeholders. Recreate it with
`VITE_SUPABASE_URL=https://ywrelsjowrfukofsxdbv.supabase.co` and the anon public
key from the dashboard.

Start the agent in `QUBIX_UNI-`, not `strata`. The strata repository has been
dormant since 10 August and describes an older product. Starting here also picks
up `.mcp.json`, so the Supabase MCP server loads; it still needs `/mcp` once per
machine to authorise.

## Worth knowing before changing them

- **The floor builds its stage list by hand** in `LearningFloor.svelte`, because
  the chosen door is lifted above the two a learner did not pick. Mathematics was
  added to `ALL_STAGES`, the guards and progress, and still did not appear,
  because nothing named it there. `check-learning-flow` now asserts every
  exported stage is both imported and rendered.
- **Svelte re-renders from the names a template mentions.** A helper reading
  mutable state hides the dependency: the stage toggle updated its Set correctly
  and the DOM never moved. The markup asks `openStages` directly for that reason.
- **The tutor's scope gate refuses anything that names nothing in its subject
  list**, before any model call. A workbook about receipts and delivery notes
  contains no such word, which is why the handoff question says "data-science
  workbook" out loud. Checked: 36 of 36 clear the gate.
- **`--qx-text-faint` and `--qx-text-dim` are the same value** in the light theme.
  Once 4.5:1 is the floor, paper that light has no room for a fifth grey step.
