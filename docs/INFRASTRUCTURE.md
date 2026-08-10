# Infrastructure Inheritance

## Hosting

The site is served by **GitHub Pages**, not Vercel. Changed 2026-08-10.

- Live at `https://qubix.university/`
- Source: `alisid0/QUBIX_UNI-`, private, this repository
- Published output: `alisid0/qubix-university-site`, **public**, built files only
- Publish with `npm run deploy`, which builds here and pushes to that repository

There are two repositories because GitHub Pages will not serve a private
repository on a free account, and the source must stay private: it carries the
Factory, the gated draft boards and the records. The public repository holds the
compiled bundle and nothing else, and `scripts/deploy.mjs` asserts before every
push that no gated board, authoring note or rejection reason is in it. Never
commit source to the public repository, and never make this one public to avoid
the split.

### Why not Vercel

On 2026-08-10 the Vercel project stopped completing deployments. Eight in a row
hung at status `UNKNOWN` with no logs and no error. That included prebuilt
deployments, which have no build step that could fail, and a deployment to a
newly created project, which had no configuration that could be wrong. The cause
was never established from the CLI.

Two real faults were found and fixed along the way, and both are worth knowing
because they were invisible from the command line:

- Every commit was authored `ALIhertgit <148879113+ALIhertgit@…>` while the
  repository, the `gh` session and the Vercel team are all `alisid0`. Vercel
  blocks a deployment whose commit email it cannot match to an account, and it
  does so silently. `scripts/deploy.mjs` now checks this before doing anything.
- Deployment Protection was enabled team-wide, so every deployment URL redirected
  to `vercel.com/sso-api`. This is also why the CLI could not read deployment
  status. Since disabled.

Nothing was deleted. The Vercel project, its history and `vercel.json` are all
still there, so returning is a matter of removing four DNS records.

### DNS

`qubix.university` is registered with Vercel and uses Vercel's nameservers, so
its records are managed with `vercel dns`.

- Four `A` records at the apex point to GitHub Pages: `185.199.108-111.153`
- The project's default `ALIAS` records still exist and are overridden by those
- The `CAA` records already permit `letsencrypt.org`, which is what GitHub Pages
  uses to issue its certificate

The domain was **not** removed from the Vercel team. `vercel domains remove`
gives up ownership of a domain Vercel is the registrar for, which is not a thing
to run to change where a site is hosted. Strata's project and deployments are
untouched; it simply no longer answers on this domain.

### Inherited from Strata

- `vercel.json`, retained
- Vite production build
- Vercel Analytics integration, which now 404s since the site is not on Vercel
- PWA assets and service worker

`.vercel/project.json` was deliberately not inherited. The Strata copy pointed at
the Strata project and would have deployed this application over the old product.

## Supabase

Inherited for review:

- `supabase/schema.sql`
- `supabase/seed.sql`
- existing migrations

These files are reference infrastructure from Strata. Do not apply them to a new or live database until their tables, policies and storage rules have been audited against the new curriculum model.

The app expects these environment variables when Supabase is activated:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

No service-role key belongs in the app, repository or Vercel client environment.
