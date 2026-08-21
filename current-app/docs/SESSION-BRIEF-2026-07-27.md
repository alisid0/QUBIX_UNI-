# Session Brief — 2026-07-27 — Strata / Qubix

> **CURRENT.** Production is live and up to date as of this brief.
> `main` = `origin/main` = `4f1fb6d`, deployed to
> `https://qubix.university`. A git push does **not** deploy;
> production ships manually via `npm run deploy` (done this session).

Handoff for the next working session. Everything below is already on
`main` and live unless it is under "Queue" or "Follow-ups".

---

## Shipped to production today

All verified live by driving the real site in a browser.

| Change | Commit(s) | What it does |
|---|---|---|
| Solve First — own category + Matrices "Warp the Grid" | `00e6042`, `8cfe9b0` | Problem-led discoveries in a dedicated Workshop category; 6th discovery (matrix transforms) |
| **Fix: W-award chime infinite loop** | `5600a42` | The reward "ping" repeated every ~1.4s forever after one W. `WToast` guarded on `visible?.id`, which the hide-timer reset; now tracked via `playedId`. Chimes once. |
| Workshop → Read link | `f343c2b` | Running workshop shows "Read this topic" (only when the topic has boards; hidden during Solve First). Completes the read↔practice loop. |
| Subject hub (UX review #2) | `dda9e88` | A subject door always opens the same per-subject overview (`SubjectView.svelte`, `subject` route). Progress picks the recommended action, never the destination. |
| Unified Home card (UX review #1) | `55e6a1a` | One state-aware "Continue now" card replaces the Daily Workout + Today's Session + Continue trio. Priority: due review → resume → daily workout, with a persistent "5-minute mix" link. |
| Equation Balancer workshop | `cb6c811`, `6aa14a9` | Chemistry balance-scale lab (CPK atoms, 5 reaction stations, per-element balance chips). |

Workshop → Read was UX review item #3; the review also had #1 and #2 (both above).

## Release / environment state

- `main` = `origin/main` = **`4f1fb6d`** (in sync, clean tree).
- Production `qubix.university` serves `4f1fb6d`.
- **No Supabase migrations applied** this session. Production Supabase
  `wmetdmfsniqrshuaoodc` and staging `atmmfkhjsdqqwnhqifxm` unchanged.
- Security headers (CSP **report-only**, HSTS, X-Frame-Options, etc.) are
  live on production. The CSP **enforce flip + report endpoint** are still
  to do.

## Branch cleanup done

- Deleted (merged into `main`): `feature/solve-first-category`,
  `feature/solve-first-matrices`, `feature/workshop-read-link`,
  `feature/subject-hub`, `feature/home-focus`, `fix/wtoast-ping-loop`,
  `feature/equation-balancer` — local + remote.
- **Dropped** `feature/path-subject-scroll`: superseded by the Subject hub
  (its `openDoor → Path tab` contradicts the hub's `openDoor → subject`).
  Force-deleted; not merged.

## Queue — remaining unmerged branches

| Branch | Status / gate |
|---|---|
| `feature/oauth-linking` | Google sign-up/link fix. **Gated:** apply Supabase migration `0008` on staging first, and turn **"Automatically link identities" OFF**. Do not merge before those. |
| `feature/sound-effects` | MP3 layer for reward sounds. Needs real MP3 files dropped in `public/sounds/` (none exist yet). Synth is fine meanwhile — and now bug-free. |
| `feature/math-rendering` | Math typesetting. Review before ship. |
| `feature/legal-accuracy` | Legal/marketing copy corrections. Review before ship. |
| `feature/account-deletion` | Deletion flow + RLS test. Review before ship. |
| `docs/repo-structure-guide` | FILE-GUIDE refresh + `_bin/` reorg (no files moved in prod dirs). |
| `docs/git-governance-reorg` | Governance docs. |

## Tomorrow — suggested order

1. **Gated decisions first:** confirm the two Supabase steps for
   `oauth-linking`; supply MP3s (or defer) for `sound-effects`.
2. **Review-then-ship:** `math-rendering`, `legal-accuracy`,
   `account-deletion` — each needs a read-through, not just a build.
3. Ship via the same flow used all session: branch → verify in-browser →
   `m/d/v` (merge to `main` → `npm run deploy` → drive the live site).

## Follow-ups noted (not blocking)

- Dead `.solve-feature` CSS left in `WorkshopLab.svelte` (from the old
  Solve First hero). Build warns; safe to remove.
- Keyboard / screen-reader fallback for the drag-based Solve First
  discoveries (pointer-only today).
- Cloud sync for Solve First progress: `recordDiscoveryComplete` is
  localStorage-only; add a remote `discoveries` table before wide launch.
- CSP: flip report-only → enforce and add a report-collection endpoint.

## Housekeeping — untracked files in the working tree

- `pnpm-lock.yaml`, `pnpm-workspace.yaml` — appeared from a pnpm install
  attempt. Decide whether to track or delete; a workspace file can change
  build behaviour, so review before committing.
- `scripts/export-live-physics.mjs` — long-standing untracked utility.

---

*Authoritative references remain `AGENTS.md`, `docs/SOURCE-OF-TRUTH.md`,
`docs/RELEASE-MODEL.md`, `docs/ENVIRONMENTS.md`. This brief is a dated
session handoff, not a source of truth.*
