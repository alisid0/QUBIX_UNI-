# Qubix environments

For live BB membership, floor text, and media authority, read
`docs/SOURCE-OF-TRUTH.md` first. Environment configuration does not make a
draft catalogue authoritative.

Qubix uses one codebase with isolated configuration for the public app and the
test app. Test accounts and test writes must never go to the production
Supabase project.

## Environment map

| Environment | Vite mode | Data | Analytics | Service worker | Search indexing | Author tools |
| --- | --- | --- | --- | --- | --- | --- |
| Production | `production` | Production Supabase | On | On | Allowed | Off |
| Staging/test | `staging` | Separate staging Supabase | Off | Off | Blocked | On |
| Local test | `staging` | Separate staging Supabase | Off | Off | Blocked | On |

Current public URLs:

- Production: `https://qubix.university`
- Staging: `https://qubix-staging.vercel.app`

Current Supabase projects:

- Production: `Qubix Production` (`wmetdmfsniqrshuaoodc`), London (`eu-west-2`)
- Staging: `Qubix Staging` (`atmmfkhjsdqqwnhqifxm`)
- Retired legacy production ref: `xzesbcrlnbesmvxmgotp`; do not use it in
  application configuration, migrations, media URLs, or tests.

Staging builds display a yellow environment badge. The build also refuses to
run if its Supabase URL matches the production URL.

## One-time Supabase setup

1. Use the two projects listed above; do not create another environment unless
   the environment map and this document are updated in the same change.
2. Run `supabase/schema.sql` in its SQL editor, followed by the files in
   `supabase/migrations/` in numeric order. Use `supabase/seed.sql` only for
   disposable sample data.
3. In Authentication > URL Configuration, add the staging Vercel URL and
   `http://localhost:8000` as allowed redirect URLs.
4. Keep staging email/SMS providers in test mode. Do not import real users.
5. Copy `.env.staging.example` to `.env.staging.local` and replace the
   placeholder URL and anon key with the staging project's public API values.

`.env.staging.local` is ignored by Git and must not be committed. Never put a
Supabase `service_role` key in a `VITE_*` variable because client-side Vite
variables are public.

## Local commands

```bash
pnpm run dev                 # staging/test configuration
pnpm run build:staging       # staging build, no production SEO pages
pnpm run build:production    # production build + SEO pages
pnpm run dev:production      # explicit production connection; use carefully
```

## Which URL talks to which database (verified 2026-08-02)

| Surface | URL | Supabase project |
| --- | --- | --- |
| Production app | `qubix.university` | `wmetdmfsniqrshuaoodc` (prod) |
| Staging app | `qubix-staging.vercel.app` | `atmmfkhjsdqqwnhqifxm` (staging) |
| Local `pnpm run dev` | `http://localhost:8000` | `atmmfkhjsdqqwnhqifxm` (staging) |
| Content scripts (CLI) | n/a | whatever `.env.local`'s `SUPABASE_URL` points at |

Only `pnpm run deploy` changes the production app; a `git push` changes nothing
live (see `RELEASE-MODEL.md`). Local dev shows **staging** data, not what
production users see.

## Node scripts (server-side env)

The content-pipeline scripts in `scripts/` (ingest, sync, audio generation,
progress reports) do **not** use the Vite `VITE_*` variables. They read
server-side secrets from `.env.local` and are run with an explicit env file:

```bash
node --env-file=.env.local scripts/ingest-bbs.mjs
```

Required in `.env.local` (see `.env.local.example`):

- `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` — the **service_role** key, which
  bypasses RLS. Point these at the project you intend to write to (staging
  `atmmfkhjsdqqwnhqifxm` or production `wmetdmfsniqrshuaoodc`), **never** the
  retired `xzesbcrlnbesmvxmgotp` ref, and never the anon key.
- `ELEVENLABS_API_KEY`, `GMAIL_APP_PASSWORD`, `REPORT_TO`, `DEEPSEEK_API_KEY` —
  as individual scripts require.

`.env.local` is gitignored and must never be committed. These scripts have **no
`VITE_*` fallback**, so a stale `SUPABASE_URL` here silently points every content
script at the wrong project — check it first if ingest/authoring misbehaves.

## Vercel setup

For a dedicated staging project, add the following variables to both its
Vercel **Production** and **Preview** scopes:

```text
VITE_APP_ENV=staging
VITE_PUBLIC_SITE_URL=<the persistent staging URL>
VITE_SUPABASE_URL=<staging Supabase project URL>
VITE_SUPABASE_ANON_KEY=<staging public anon key>
VITE_ENABLE_TEST_TOOLS=true
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_SERVICE_WORKER=false
VITE_ENABLE_PHONE_AUTH=false
```

The build script detects `VERCEL_ENV=preview` or `VITE_APP_ENV=staging` and
automatically makes a staging build. This supports either branch previews in the
production project or the current dedicated `qubix-staging` Vercel project.
Production deployments keep using `.env.production`; Vercel Production variables
can override those committed public values later.

Use a persistent branch such as `staging` for the test app. Protect its Vercel
deployment with Deployment Protection or a password before sharing it. Merge
tested changes into `main` to release them to users.

Current state: `qubix-staging.vercel.app` is isolated correctly but its Vercel
project still follows `main`. Moving that project to a persistent `staging`
branch is the next release-process improvement. Until then, a push to `main`
updates staging automatically, while the public production deployment remains
manual through `pnpm run deploy`.

## Release workflow

1. Build or edit on a feature branch.
2. Preview it against the staging Supabase project.
3. Test authentication, scripts, content and writes with test accounts.
4. Merge the approved change into `main`.
5. Deploy production and run a short smoke test.

Runtime media is bundled under `public/`; no app media may depend on the retired
legacy Supabase project. Staging authentication, profiles, progress and other
database writes remain isolated.

## Production backend baseline (2026-07-21)

The clean production project has schema/RLS migrations through
`0005_launch_hardening.sql` plus `0007_explicit_api_grants.sql`. Migration 0006
was an incremental repair for databases that had the earlier 0005 and is not
part of a fresh bootstrap. The `delete-account` Edge Function is deployed and
validates the bearer token itself before using server-only privileges.

The production `cards` table contains 1,145 reviewed public rows. Only public
catalogue content was migrated from the retired project; users, identities,
progress, sessions, reports, and screenshots were deliberately not copied.
Production Authentication has Site URL and redirect allowlisting set to
`https://qubix.university`. Production SMTP is configured and email
delivery is confirmed; Google OAuth is configured and sign-in tested end to end.
Obsolete credentials from the setup were revoked. (Verified 2026-07-22.)

## Refreshing public content in staging

Git does not promote dynamic rows stored in Supabase. To produce idempotent SQL
chunks containing public card content only, run:

```bash
pnpm run content:export-staging-sql
```

The command reads the public production catalog and writes reviewed SQL chunks
under the ignored `.playwright-session/staging-content-sync/` directory. It does
not write to either database and never exports users, progress, sessions, or
other personal data. Review the chunks, apply them to the staging SQL editor,
run `chunk-final.sql`, and verify the resulting count before testing the app.
