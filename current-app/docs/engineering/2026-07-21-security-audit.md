# Qubix platform security audit — 2026-07-21

Author: Claude (Claude Code)
Responding to: `AGENT-MESSAGE-BOARD.md` MSG-20260721-001
Base examined: local `main` @ `ad2ae2e`, plus `origin/feature/*` branches
Branch: **none created** — see Limitations

> **Status update:** the audit was subsequently committed on
> `claude/platform-security-hardening`, based on `aecdd18`. Claude then added
> lifecycle-test corrections in `a47ccbb`; Codex completed a second review and
> added an independent persisted-row check for insert probes. The original
> limitations below are retained as an audit-trail account of what had and had
> not been verified when the report was written.

**Read the Limitations section before acting on anything here.** This is a
static review. No finding below has been confirmed against a running database.

---

## Limitations — what this audit is not

Three constraints materially reduce the strength of this evidence.

**1. No branch, no commits.** MSG-001 asks for work on
`claude/platform-security-hardening` with per-phase commits. Ali has instructed
me to stop performing git operations (we were both committing to `main` and
colliding on `.git` lock files), and my sandbox has read-only GitHub access —
`git push` fails with `could not read Username for 'https://github.com'`.
Everything here is uncommitted working-tree files. Someone else must branch and
commit.

**2. No database access.** I cannot reach Supabase from this sandbox. Every
claim about RLS behaviour is read from migration SQL, not observed. The
isolation tests in Phase 3 are **written but never executed**. Treat all of
Phase 2 as "the SQL says X", not "the database does X".

**3. No build.** `pnpm`'s store sits outside the mounted folder, so its symlinks
are broken here and `vite build` cannot run. Changed JS passed `node --check`;
Svelte files were checked only for balanced blocks. Codex reports both builds
pass — that is stronger evidence than anything I can produce on this point.

Base-commit ambiguity: MSG-001 says "the latest agreed remote base", but D-001
is still OPEN and local `main` is six commits ahead of `origin/main`. I audited
local `main`. If those six commits do not survive D-001, findings F-04 through
F-09 may describe code that never ships.

---

## Findings, by severity

| ID | Severity | Area | Summary | Status |
|---|---|---|---|---|
| F-01 | **HIGH** | XSS | Supabase card content rendered via `{@html}` with no sanitisation | Open |
| F-02 | **HIGH** | Headers | No CSP or security headers in `vercel.json` | Open |
| F-03 | **MEDIUM** | Privacy | `internal_username` derived from email local-part | Fix drafted |
| F-04 | **MEDIUM** | Access | `issue_reports` accepted unauthenticated inserts | Fix drafted |
| F-05 | **MEDIUM** | Deletion | Storage objects do not cascade on account deletion | Fix drafted |
| F-06 | **MEDIUM** | Deletion | `ON DELETE SET NULL` leaves device fingerprint on reports | Fix drafted |
| F-07 | **LOW** | Policy | `issue_reports_own_update` permits editing every column | Fix drafted |
| F-08 | **LOW** | Schema | `under_13` age band with no consent mechanism | Fix drafted |
| F-09 | **LOW** | Schema | Legacy `progress` table; `quiz_results` referenced but undefined | Fix drafted |
| F-10 | **INFO** | Caching | `/assets/(.*)` set `no-cache`, defeating content hashing | Open |

---

### F-01 — HIGH — Unsanitised HTML from the database

**Evidence**

```
src/views/Reader.svelte:556   {@html formatMath(floorBodyHTML(i, d))}
src/views/Reader.svelte:620   {@html s.layers?.[0] || ''}
src/views/Snippets.svelte:159 {@html current.layers[0]}
```

`grep -rn "sanitiz\|DOMPurify\|escapeHtml" src/` returns only
`sanitizeFilename` in `issueReports.js`. There is no HTML sanitisation anywhere
in the render path.

`cards.layers` is `jsonb` populated from Supabase (`dynamicBoards.js`), and
`src/lib/content/mathFormat.js` explicitly "only touches text *between* tags" —
it passes markup through by design.

**Impact**

Anything in `cards.layers` executes as script in every user's browser. Supabase
sessions use `persistSession: true` (`src/lib/supabase.js:6`), so tokens sit in
`localStorage` and are readable by injected script. With no CSP (F-02), there is
nothing to constrain exfiltration.

**Mitigating factor**

`cards` has no anon or authenticated write policy — only `service_role` can
write (`schema.sql:47`). This is not exploitable by an ordinary user. It
requires a compromised service key or SQL-editor access.

**Why it still matters**

Ten scripts write to `cards.layers`, including `ingest-bbs.mjs`,
`sync-bbs-from-md.mjs` and `ingest-snippets.mjs`, and `authoring-tools/`
contains AI drafting pipelines. Content authored by a model and ingested
unreviewed becomes executable JavaScript in production. A stray `<script>` or
`onerror=` in a draft is a live XSS, with no attacker required.

**Recommendation**

Sanitise at render — an allowlist covering the tags the curriculum actually
needs (`sub`, `sup`, `span`, `em`, `strong`, `br`, `p`, `ul`, `ol`, `li`) and
nothing else. Sanitising at ingest instead leaves existing rows unprotected and
depends on every future pipeline remembering. Do both if practical; render-side
is the one that must exist.

**Not verified:** I have not confirmed what is actually in production
`cards.layers` today. Checking for existing `<script`, `onerror=`, `onload=` or
`javascript:` in that column should be the first action.

---

### F-02 — HIGH — No security headers

**Evidence** — `vercel.json` defines only `Cache-Control` and
`Service-Worker-Allowed`. Absent: `Content-Security-Policy`,
`X-Frame-Options` / `frame-ancestors`, `Strict-Transport-Security`,
`X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`.

**Impact** — No CSP means F-01 has unbounded blast radius. No frame-ancestors
means the auth screen can be framed for clickjacking. For a TWA whose
Digital Asset Links bind to this origin, header hygiene is also part of the
Play review surface.

**Recommendation** — a starting CSP is drafted in
`docs/engineering/proposed-vercel-headers.json`. It needs testing against the
real asset graph: the app loads Google Fonts, Supabase, Vercel Analytics, and
CDN-hosted three.js/pixi.js. **Do not deploy it unreviewed** — a wrong CSP
breaks the app silently in production, and staging has no service worker to
mimic production caching.

---

### F-03 to F-09 — see migration

These are documented in full in `supabase/migrations/0005_launch_hardening.sql`
and its runbook `0005_APPLY.md`, with the reasoning for each. Summary:

- **F-03** `create_private_user_profile()` uses
  `split_part(new.email, '@', 1)`, so `someone@example.com` becomes
  `someone_a1b2c3d4` and survives data deletion. Contradicts 0004's own header
  claiming no public table stores email addresses.
- **F-04** `issue_reports` insert policy permits `user_id IS NULL` — an
  unauthenticated write endpoint reachable with the public anon key.
- **F-05** `storage.objects` has no FK to `auth.users`, so issue screenshots
  orphan rather than delete. Screenshots can show anything on a user's screen.
- **F-06** `ON DELETE SET NULL` nulls only `user_id`, leaving `user_agent`,
  `viewport`, `screenshot_path` and `metadata` — a device fingerprint attached
  to a report.
- **F-07** `issue_reports_own_update` comment claims details are immutable after
  submission; the policy permits updating every column.
- **F-08** `under_13` accepted in `age_band` and selectable in onboarding, with
  no parental-consent mechanism. Ali has decided 13+.
- **F-09** `public.progress` superseded by 0004's tables and its state
  constraint no longer matches PATHS.md; `quiz_results` is referenced in
  `src/lib/supabase.js` but **defined in no migration** — it may not exist.

**Note on F-05/F-06:** these apply to the `feature/account-deletion` approach.
That branch's cascade-based `delete_my_account()` is a better mechanism than my
Edge Function and I have withdrawn mine — see `docs/AGENT-RELAY.md` [001].

---

### F-10 — INFO — Asset caching

`vercel.json` sets `Cache-Control: no-cache` on `/assets/(.*)`. Vite emits
content-hashed filenames there, which are safe to cache immutably. This forces
revalidation of every asset on every load. Not a security issue; a real
performance one, especially on mobile.

---

## What was checked and found sound

Recording these so the negative results are on record too.

- **Service-role key never reaches the browser.** All seven uses are Node
  scripts reading `process.env.SUPABASE_SERVICE_ROLE_KEY`. No `service_role`
  string in `src/`. `dist/` contains the anon key only, which is correct.
- **`.env.staging.local` is untracked.** `git ls-files | grep staging.local`
  returns nothing.
- **Author tools double-gated.** `App.svelte:124` and `:219` both require
  `appEnvironment.testToolsEnabled`, which requires
  `environment !== 'production'` **and** the flag. Note the code is still
  bundled into the production build even though unreachable.
- **Phone auth gated** behind `VITE_ENABLE_PHONE_AUTH`, false in all committed
  env files. *Unverified:* that the Supabase phone provider is disabled
  server-side.
- **No cross-user reads.** `league.js` is a local deterministic simulation with
  no Supabase calls. `leaderboard` and `otherUserStats` are legacy view names
  mapped to `wscore` in `App.svelte:41` — dead routes.
- **All user-table writes carry an explicit `user_id`** and are covered by RLS
  `WITH CHECK`. Reads in `progress.js` filter on `user_id` in addition to RLS.
- **Build-time environment guards.** `vite.config.js` throws if a staging build
  points at production Supabase, and if `mode=staging` without
  `VITE_APP_ENV=staging`.
- **No token logging** in `auth.js`, `supabase.js` or `profile.js`.

---

## Phase 3 — isolation tests

`scripts/test-rls-isolation.mjs` already exists on
`origin/feature/account-deletion`, written by Codex. **I have not duplicated
it.** Reviewing and extending that file is the right move; this repo otherwise
has no test tooling (`package.json` has no test script; no vitest, playwright or
jest config).

Suggested additions, based on the findings above:

1. Anonymous insert into `issue_reports` must fail (F-04 regression test).
2. After `delete_my_account()`, assert zero rows remain in every `user_*` table
   **and** zero objects under `issue-screenshots/<uid>/` (F-05).
3. After deletion, assert surviving `issue_reports` rows have null `user_agent`
   and `screenshot_path`, not merely null `user_id` (F-06).
4. User A attempts update of user B's `issue_reports` row — must fail.
5. `export_my_user_data()` as user A must contain no user B identifiers.
6. Assert no `user_profiles.internal_username` matches its owner's email
   local-part (F-03).

**Production guard.** Any destructive test must refuse to run against
production. Assert the target URL is not the production ref and require an
explicit `--staging` flag; fail closed if either check is ambiguous.

---

## Phases 4 and 5 — proposed, not executed

MSG-001 asks for the target layout to be proposed before broad moves, and warns
against cosmetic churn obscuring the security diff. Agreed — I have moved
nothing.

Observations for a later proposal:

- Root holds 8 loose `.md` files (`QUBIX-BLUEPRINT`, `FOUR-STARTING-POINTS`,
  `DEEPSEEK-COLLAB`, `final-draft-*.md`, …) that appear to be authoring
  material, not operational documentation.
- `legacy/`, `1945_BBs/`, `content-drafts/` and `docs/archive/` are four
  distinct archive-like locations with no stated distinction.
- `src/lib/content/` mixes bundled curriculum data with runtime logic
  (`dynamicBoards.js`, `mathFormat.js`).
- `scripts/` mixes build tooling, one-off migrations, and content pipelines.
- `.playwright-session/` holds generated SQL and is gitignored — reasonable, but
  it is an odd home for content-sync artefacts.

CI gates worth adding, in priority order: secret scanning on push; a check that
`.env*.local` is never staged; migration filename-collision detection (this
audit exists partly because two files both claimed `0005`); RLS isolation tests
against staging.

---

## Open items requiring a decision

| Item | Needs |
|---|---|
| D-001 — publish the six local commits | Ali |
| Which `privacy.html` wins: `main` or `feature/legal-accuracy` | Ali / Codex |
| Reconciling the two `0005` migrations | Codex (owns the better mechanism) |
| Whether to sanitise card HTML at render, ingest, or both | Codex + Ali |
| CSP contents, given the CDN and font dependencies | Codex to review draft |

---

## Files added by this audit

- `docs/engineering/2026-07-21-security-audit.md` (this file)
- `docs/engineering/proposed-vercel-headers.json` (draft, untested)
- `docs/AGENT-RELAY.md` (relay channel, entry [001])

Nothing committed. Nothing applied to any database. Nothing deployed.
