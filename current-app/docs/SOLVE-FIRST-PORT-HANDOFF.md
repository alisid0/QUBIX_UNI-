# Solve First port — ready to build, review and deploy

The port is **done in the working tree** of `strata-github-live`. Nothing is
committed, pushed or deployed. Every change is visible in `git diff`, so it is
fully revertible.

## Why I could not deploy it myself

Verified, not assumed:

- `api.vercel.com` is **network-blocked** from my sandbox (`curl` → `000`). No
  credential changes that; deploying from here is impossible.
- `git push` fails with `could not read Username for 'https://github.com'` — no
  credentials reach the sandbox. (`github.com` itself is reachable.)
- No `pnpm` and no Vercel CLI in the sandbox.

So the build, push and deploy have to run in your terminal. Everything else is
finished.

## What changed

**14 files copied in** (were only in the untracked `Strata` folder):

`solveFirst.js`, `SolveFirst.svelte`, `SolveFirstForces.svelte`,
`SolveFirstCoordinates.svelte`, `SolveFirstLimits.svelte`,
`SolveFirstNetworks.svelte`, `NetworkTopology.svelte`, `SignalGrid.svelte`,
`ForceEvidence.svelte`, `LimitPlot.svelte`, `LogicTruthMini.svelte`,
`SecurityEvidence.svelte`.

**2 hand-merged files** — ghlive kept as the base so nothing was lost:

`src/lib/stores/progress.js`
- added `discoveries: {}` to `emptyState()` and `normalizeState()` (defensive,
  so pre-existing saved progress loads unchanged — storage key `strata-progress-v2`
  is identical on both sides, so no migration is needed);
- added `recordDiscoveryComplete()` next to `recordWorkshopComplete()`, using
  ghlive's `normalizeState`/`persist`/`grantWs` conventions;
- added `discoveries` to `hasProgress()`;
- added a discoveries branch to the remote-merge function that takes the
  strongest record per field, so a cloud pull can never erase local Solve First
  progress (there is no remote discoveries table yet).

`src/views/WorkshopLab.svelte`
- kept **all** of ghlive's Series II modules, Test mode and challenge logic;
- added the five Solve First imports, `solveFirst` state, `FEATURED_SOLVE_FIRST`,
  `hasSolveFirst`, `startSolveFirst`/`finishSolveFirst`/`exitSolveFirst`;
- Solve First now takes priority in `workshopTitle`/`workshopSub`/`workshopRunKey`;
- added the `kind` render branch and a `.solve-active` card style;
- `openModule`/`backToGrid` clear `solveFirst` alongside `challenge`/`test`.

**Untouched:** the other 19 differing files. ghlive's versions stand — they carry
the security and auth hardening. `paths.js` was **not** merged; both sides edited
it (+8/−8) and it needs a human eye. `Leaderboard.svelte` and
`OtherUserStats.svelte` were not copied: ghlive's `App.svelte` has no route to
them.

## Verification done

- All 12 ported components **plus** the merged `WorkshopLab` compile at **0
  warnings**, 0 failures (Svelte 4.2.20).
- `progress.js` passes `node --check`.
- Every relative import in the ported files resolves on disk.
- All five Solve First `moduleId`s resolve to real modules
  (`logic-gates`, `forces-waves`, `line-core`, `limits`, `networks-cloud`).
- All five `pathId`s exist in ghlive's `paths.js`.

Not verified: the Vite build, and anything requiring a browser.

## Your commands

```bash
cd "C:\Users\info\OneDrive\Documents\Strata\strata-github-live"

# 1. Build. This is the real gate, and it also closes Codex's networks check 12.
pnpm run build:staging
pnpm run build:production

# 2. Review the port.
git status
git diff --stat

# 3. Commit on a branch (do not commit straight to staging).
git checkout -b claude/solve-first-port
git add src/lib/content/solveFirst.js src/lib/components/assessments src/lib/stores/progress.js src/views/WorkshopLab.svelte docs/SOLVE-FIRST-PORT-HANDOFF.md
git commit -m "Port Solve First discovery workshops into the tracked repo

Adds the five Solve First experiences and their support components, and
merges the discovery reward contract into progress.js without losing
Supabase sync. WorkshopLab keeps Series II modules and Test mode."
git push -u origin claude/solve-first-port

# 4. Only after Codex reviews and both builds pass:
pnpm run deploy
```

## Before you deploy — the alias collision

This still needs fixing and is **more urgent than the port**:

`Strata/scripts/deploy.mjs` and `strata-github-live/scripts/deploy.mjs` both end
with `vercel alias set <url> qubix.university`, but they belong to two
different Vercel projects (`strata` vs `strata-github-live`). Whoever runs
deploy last silently owns production.

Running `pnpm run deploy` from the **`Strata`** folder would put live users on a
build with no HTML sanitiser (the F-01 fix), no `environment.js`, no
account-deletion dialog and no issue reporting.

Pick one project to own the alias and change the other script to a distinct
hostname before anyone deploys again. Given the port, `strata-github-live` should
be the owner.
