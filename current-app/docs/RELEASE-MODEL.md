# Qubix release model — shipping changes without app updates

Last updated: 2026-07-21

How a change reaches a Qubix user, why most changes need no Play Store update,
and what actually differs between the staging app and the version end users get.

Companion documents: `docs/SOURCE-OF-TRUTH.md` (live catalogue and media authority),
`docs/ENVIRONMENTS.md` (configuration),
`docs/LAUNCH-HANDOVER.md` (launch checklist), `AGENTS.md` (working defaults).

---

## 1. Why users never have to update

Qubix is a web app. The planned Android package is a **Trusted Web Activity** —
a thin Chrome shell that loads the live production URL. The shell contains no
app logic, no content, and no UI. It is a browser pointed at your site.

The consequence: **what the user runs is whatever your production URL serves at
the moment they open it.** There is no bundled JavaScript on the device to go
stale. Shipping a fix is a web deploy, not a release.

This holds today for the PWA and will hold for the TWA once packaged. It stops
holding only if you migrate to Capacitor, which bundles the web assets into the
APK and reintroduces store-update cycles for every change.

---

## 2. Three tiers of change

Every change falls into one of three tiers. Only the third requires users to
update anything.

### Tier 1 — Content (no deploy at all)

Cards 85+ live as rows in the Supabase `cards` table, not in Git. Editing a row
changes what learners see on their next view of that board.

`src/lib/content/dynamicBoards.js` refetches requested dynamic boards from
Supabase on every topic open. The `localStorage` copy is an offline fallback
only, not a cache that can freeze content. An earlier fetch-once design did
freeze boards mid-authoring and was deliberately removed.

Reaches users: **immediately**, next time they open the topic.
Rollback: edit the row back.

Static cards 1–84 in `deck.js` are bundled into the build and are Tier 2.

### Tier 2 — Code, UI, static content (web deploy)

Anything in `src/`, `public/`, or the static `DECK`. Ship with:

```bash
pnpm run build:production
pnpm run deploy
```

Vercel serves the new build. Users get it on next app launch, because the
service worker handles navigation requests network-first and calls
`skipWaiting()` + `clients.claim()` on install — the new version takes over
without waiting for every tab to close.

Reaches users: **next launch**, no store involvement.
Rollback: redeploy the previous Vercel deployment.

**The one manual step:** `public/sw.js` pins a cache name, currently
`strata-v17`. The `CORE` array (`index.html`, manifest, icons) is cached
first-in-wins. If you change any file in `CORE`, bump the cache version —
`strata-v18` — or returning users keep the old shell. The `activate` handler
deletes every cache whose key does not match, so the bump is the purge.
Hashed build assets and `/videos/` media are unaffected; they are network-first
or content-hashed.

### Tier 3 — The Android shell (Play Store update)

Only the wrapper itself:

- application ID (`uk.co.arcavetech.qubix`)
- app icon, name, splash screen
- target/min SDK, permissions
- the production URL the TWA points at
- signing configuration

Reaches users: **only via Play Store update**, subject to review.

Pick the production URL carefully before first submission. Changing it later
means a new `.aab`, a review cycle, and updated `assetlinks.json` — for a
change that would otherwise be a five-minute DNS edit.

### Summary

| Tier | Example | Mechanism | User sees it |
|---|---|---|---|
| 1 | Fix a typo in card 412 | Supabase row edit | Immediately |
| 2 | Reader layout, new workshop, static deck | `pnpm run deploy` | Next launch |
| 3 | App icon, app ID, target SDK | New `.aab` + Play review | On store update |

---

## 3. The dangerous fourth category

Supabase **schema, RLS policy, and database function** changes are not versioned
by Git, are not deployed, and are not staged. They apply to live users the
instant you run them in the SQL editor.

There is no rollback, no gradual rollout, and no way to serve the old schema to
users on an older client. A migration that removes a column will break every
running session that reads it.

Treat these as the highest-risk change class:

1. Run the migration on staging first and test against it.
2. Prefer additive changes — add a column, backfill, then stop reading the old
   one in a later deploy.
3. Deploy client code that tolerates both shapes *before* migrating production.
4. Never run an untested migration against production during a release.

---

## 4. Staging vs production

One codebase, one `main` branch, two configurations selected by Vite mode. The
difference is entirely environment variables plus a few build-time guards.

| | Production | Staging |
|---|---|---|
| URL | `qubix.university` | `qubix-staging.vercel.app` |
| Vite mode | `production` | `staging` |
| Supabase project | `Qubix Production` (`wmetdmfsniqrshuaoodc`) | `Qubix Staging` (`atmmfkhjsdqqwnhqifxm`) |
| Users & progress | Real | Isolated test accounts only |
| Service worker | On | **Off** |
| Analytics | On | Off |
| Search indexing | Allowed | `noindex, nofollow` |
| Page title | `Qubix` | `[STAGING] Qubix` |
| Author/test tools | Off | On |
| Env badge | None | Yellow |
| Deploy trigger | Manual `pnpm run deploy` | Auto on push to `main` |

### What this actually means

**They share no user data.** A staging account does not exist in production.
Testing sign-up, deletion, or progress sync in staging touches nothing real.
This is the entire point of the split — never copy production users into it.

**Staging has no service worker.** `src/lib/environment.js` gates registration
on `environment === 'production' && VITE_ENABLE_SERVICE_WORKER === 'true'`, and
`src/main.js` actively *unregisters* any existing worker when that gate is
false. So staging always shows the newest build, with no cache layer.

The trade-off: **you cannot test offline behaviour or cache-update behaviour on
staging.** Those are production-only code paths. Before a release that touches
`sw.js`, the shell files, or offline handling, test against a production build
locally with `pnpm run build:production && pnpm run preview` — not staging.

**The build refuses to cross the streams.** `vite.config.js` throws if a staging
build is pointed at the production Supabase URL, and throws if `mode=staging`
without `VITE_APP_ENV=staging`. Misconfiguration fails the build rather than
silently writing test data to production.

**Content is not shared.** Git does not promote Supabase rows. Staging holds a
snapshot — 1,145 production cards as of 2026-07-18 — refreshed manually via
`pnpm run content:export-staging-sql`. Staging content drifts from production
between refreshes. Staging is not a preview of live content.

**Media ships with the app.** Runtime assets must not be read from the retired
legacy Supabase project. Public assets can be bundled under `public/` or, after
an explicit storage review, read from the current production project.
production Storage CDN. Only database writes are isolated.

---

## 5. Known gap in the current setup

Staging follows `main`, which is also the production source branch. So a merge
to `main` updates staging *after* the code is already on the release branch —
staging validates what you have already committed to ship, rather than gating
it.

The intended flow, per `docs/LAUNCH-HANDOVER.md`:

```text
feature branch → staging branch → staging web QA → Android internal test
→ main → production deploy
```

Fix: create a persistent `staging` branch and repoint the `qubix-staging`
Vercel project at it. This is item 2 in the launch handover's ordered actions.

Production deploys stay manual by design — pushing Git alone does not release
to users. Keep it that way. It is the only gate between a merge and the public
app.

---

## 6. Release checklist

**Content change**
1. Edit the Supabase row.
2. Open the board in the app and confirm.

**Code change**
1. Feature branch.
2. `pnpm run dev` (staging config) and test.
3. If `sw.js` or shell files changed, bump the `CACHE` version.
4. If offline or caching behaviour changed, test `pnpm run build:production && pnpm run preview` locally.
5. Merge to `main`; verify on `qubix-staging.vercel.app`.
6. `pnpm run build:production` then `pnpm run deploy`.
7. Smoke-test the public URL: load, sign in, open a board, run a workshop.

**Schema change**
1. Apply to staging Supabase; test.
2. Deploy tolerant client code to production first.
3. Apply to production Supabase.
4. Verify RLS isolation immediately after.

**Shell change**
1. Bump version name and version code.
2. Signed `.aab` to Play internal testing.
3. Clear the pre-launch report.
4. Promote through closed testing before production review.
