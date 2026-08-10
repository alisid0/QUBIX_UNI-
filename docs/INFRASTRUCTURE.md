# Infrastructure Inheritance

## Hosting

The site is served by the dedicated **Vercel** project `qubix-university`.
Changed back from GitHub Pages on 2026-08-10 by founder instruction.

- Live at `https://qubix.university/`
- Source: `alisid0/QUBIX_UNI-`, private, this repository
- Vercel team: `ali-s-projectz`
- Custom domain: `qubix.university`
- Publish with `npm run deploy`, which verifies the bundle and deploys to Vercel

The source repository remains private because it carries the Factory, gated
drafts and authoring records. `scripts/deploy.mjs` asserts before every release
that no gated board, authoring note or rejection reason enters the learner
bundle, and refuses to deploy if the checkout is linked to another Vercel project.

### Earlier Vercel incident

On 2026-08-10 the Vercel project stopped completing deployments. Eight in a row
hung at status `UNKNOWN` with no logs. That included prebuilt deployments, which
have no build step that could fail, and a deployment to a newly created project,
which had no configuration that could be wrong.

**The cause was probably this machine's network path to Vercel, not Vercel.** One
CLI invocation eventually returned, long after it had been abandoned, carrying
the only concrete error of the evening:

```
"status": "error", "reason": "deploy_failed", "message": "fetch failed"
```

`fetch failed` is a connection-level failure in Node: the CLI could create a
deployment through the API but could not complete the upload or build handshake.
Every other symptom fits that, including the 180-byte upload on the first
attempt. GitHub Pages published from the same machine without trouble, so the
network is not broadly broken, and the likeliest explanation is egress
restriction on the specific endpoint the Vercel CLI uploads to.

This matters for anyone deciding where to host later: **Vercel was not shown to
be at fault, and would very likely deploy normally from a different machine or
network.** The move to GitHub Pages was the right call under the constraint of
the evening; it is not a verdict on the platform.

Two real faults were found and fixed along the way, and both are worth knowing
because they were invisible from the command line:

- Every commit was authored `ALIhertgit <148879113+ALIhertgit@…>` while the
  repository, the `gh` session and the Vercel team are all `alisid0`. Vercel
  blocks a deployment whose commit email it cannot match to an account, and it
  does so silently. `scripts/deploy.mjs` now checks this before doing anything.
- Deployment Protection was enabled team-wide, so every deployment URL redirected
  to `vercel.com/sso-api`. This is also why the CLI could not read deployment
  status. Since disabled.

The original eight stuck deployments remain in project history. A later
deployment reached `READY`, the commit-author mismatch and team-wide deployment
protection had been corrected, and the founder instructed the project to return
to Vercel. Do not treat an `UNKNOWN` deployment as successful; verify both the
deployment status and the live domain after every release.

### DNS

`qubix.university` is registered with Vercel and uses Vercel's nameservers, so
its records are managed with `vercel dns`.

- The four temporary GitHub Pages `A` records must remain absent.
- The apex uses Vercel's default `ALIAS` record.
- The domain must be assigned to `qubix-university`, never `strata`.

The domain stays registered to the Vercel team. `vercel domains remove` gives up
ownership and must not be used to move it between projects; project assignment
uses `vercel domains add --force` with the exact destination project.

### Inherited from Strata

- `vercel.json`, active security and cache headers
- Vite production build
- Vercel Analytics integration
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
