# Current state and what's left

Last updated: 2026-07-29.
Current release actions are below. The remainder of this document is retained
as the archived 2026-07-25 Solve First port record.

---

## Current release state

| | Status |
|---|---|
| Solve First port and deeper mechanism pass | ✅ integrated |
| Phase 1.1 Learn → Solve → Recall loop | ✅ on `main` |
| Current paired Solve First journeys | ✅ 15 |
| Production and staging builds | ✅ passing |
| Expansion, Solve First and arcade regression suites | ✅ passing |
| Production stable URL | ✅ tracked build verified 2026-07-29 |
| F-01 sanitiser | ✅ tracked and live |
| F-02 report-only security headers | ✅ tracked and live |
| F-10 immutable asset caching | ✅ tracked and live |
| CSP reporting endpoint and enforcement decision | ⬜ still open |

The production regression described by local commit `beeb166` is resolved.
Live Terms contains the real support address, the expected security headers are
present, and the current hashed application asset is served as immutable.

Local staging commit `5308752` was audited before release. Its five assessment
patches are identical to tracked commit `c84831d`; subsequent production work
replaced the old limits and network implementations and expanded the catalogue.
Replaying `5308752` would therefore regress the current app rather than add new
work.

The local image `public/images/card-34-floor0-v1.png` is deliberately not part
of this release: no live content or media resolver references it. Connect it
through the authoritative Reader media path in a separately reviewed content
change if it is still wanted.

---

## Archived 2026-07-25 session record

| | Status |
|---|---|
| Solve First port into the tracked repo | ✅ done |
| Networks blockers 1 & 2 | ✅ fixed and verified |
| Production build | ✅ **passes** — I ran it |
| Staging build | ✅ passes |
| Automated playthrough test | ✅ passes, zero console errors |
| Commit `1e05d61` on `claude/solve-first-port` | ✅ created locally |
| **Pushed to GitHub** | ❌ **not yet — one click** |
| Deployed | ❌ not yet, and correctly gated |

---

## Step 1 · Publish the branch ← **you are here**

The commit exists locally. GitHub Desktop is installed and the repo is added.

In GitHub Desktop:

1. Confirm the branch selector (top-left) reads **`claude/solve-first-port`**.
2. Click **`Publish branch`** (top-right). If it says `Push origin`, that's the
   same thing.

Nothing is being committed — the commit is already made. This only uploads it.

I cannot do this myself: GitHub Desktop's window renders as a blank rectangle to
screen capture (an Electron/GPU quirk), so I can't see its buttons, and I won't
click blind inside a git client.

---

## Step 2 · Playtest in a browser (10 min)

The only correctness check I could not run. Everything else is verified.

```bash
pnpm install
pnpm run dev
```

Open a Computer Science → Networks workshop → **Solve First**. Confirm:

- it mounts with no console errors;
- the workshop grid shows the "Solve First · New" card and 🔍 tile markers;
- **clinic:** 2 town / 3 hill leaves Dispatch **disabled** with the launch-plan
  panel; 3 town / 2 hill strands a segment and reaches the reveal;
- **resilience:** no route selector exists, and the policy choice stays locked
  until a locked run strands *and* an open run reroutes;
- readable in light and dark, no sideways scrolling at phone width.

The logic behind all of this is already proven by an automated playthrough
(`pnpm run test:solve-first`). What needs human eyes is pixels and legibility.

---

## Step 3 · Merge and deploy

Only after Steps 1 and 2.

```bash
git checkout staging
git merge claude/solve-first-port
git status                 # must be clean
pnpm run deploy
```

`deploy.mjs` now builds production explicitly, so it can no longer ship a
staging bundle to the live alias.

**Never run `pnpm run deploy` from the parent `Strata` folder.** It is guarded
and will refuse, but the rule stands.

---

## Step 4 · Verify live (2 min)

Open `https://qubix.university`, devtools → Network, check the Supabase
host:

- `wmetdmfsniqrshuaoodc` = production ✅
- `atmmfkhjsdqqwnhqifxm` = staging ❌ stop and rebuild

---

## What I completed this session

- Ported the five Solve First games into the tracked repo (they existed only in
  an untracked working copy — unversioned and undeployable).
- Merged the discovery reward contract into `progress.js` without losing
  Supabase sync; added defensive normalisation so existing saved progress loads
  unchanged.
- Merged `WorkshopLab.svelte`, keeping Series II modules and Test mode.
- Fixed both Networks blockers; proved them with an exhaustive sweep of all 32
  clinic route configurations (0 deadlocks) and an automated playthrough.
- Found and fixed three of my own defects on review: a dropped grid entry point,
  wrong visual language on the Solve First bar, and an unclamped reward.
- **Ran the production and staging builds** — the check that had been open
  since the Networks work began.
- Added `pnpm run test:solve-first`, the first automated test for these games.
- Fixed two release hazards: the duplicate production alias, and `deploy.mjs`
  inferring its build mode (which could have shipped a staging bundle, pointed
  at the staging database, to live users).

---

## Two things worth knowing

**Git was never installed on this PC.** That was discovered late and explains a
lot of earlier friction. The `.git` folder existed only because sandboxed agents
created it through the mounted folder. Installing GitHub Desktop fixed this — you
now have git locally for the first time, which is what makes Steps 2 and 3
possible at all.

**The parent `Strata` folder is redundant and risky.** No git, a second Vercel
project, and it is where the code split originated. Once this merges, rename it
to something like `Strata-legacy-DO-NOT-DEPLOY` so no future session edits the
untracked copy again.

---

## Still uncommitted (yours, deliberately untouched)

- `docs/PUBLIC-BETA-CHECKLIST.md` (modified)
- `public/images/card-34-floor0-v1.png` (untracked)

Neither belonged in a port commit. Decide whether they ride the next one.
