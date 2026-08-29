# Qubix agent handoff

Read `docs/SOURCE-OF-TRUTH.md` before inspecting, planning, or changing BB
content or media. Its hierarchy overrides old draft inventories and handoffs.

Then read:

1. `docs/ENVIRONMENTS.md` before authentication, Supabase, Vercel, staging, or
   release work.
2. `docs/LAUNCH-HANDOVER.md` for the public-launch checklist.
3. `docs/RELEASE-MODEL.md` for how code, Supabase content, schema, and the
   Android shell reach users.

## Non-negotiable source rules

- `src/lib/content/paths.js` defines live course membership in a deployed
  build.
- Production Supabase defines the current text/floors for those dynamic BBs.
- Bundled topic-board modules are fallbacks, not a second live inventory.
- `content-drafts/`, prompt banks, old exports, and archived plans are never a
  production inventory.
- Before reporting catalogue or media coverage, run `pnpm run
  audit:live-media`. If it was not run in the current task, call the numbers a
  dated snapshot.
- Do not infer the production deployment from Git. Fetch before comparing local
  and remote branches; verify production separately.

## Current environment state

- Public code branch: `main`.
- Public production URL: `https://qubix.university`.
- Production Supabase: `Qubix Production`, ref `wmetdmfsniqrshuaoodc`, London.
  This is the only production database authority. The legacy project ref
  `xzesbcrlnbesmvxmgotp` is retired and must not be restored in runtime config.
- Staging URL: `https://qubix-staging.vercel.app`.
- Staging Supabase project ref: `atmmfkhjsdqqwnhqifxm`.
- Staging uses isolated auth and user data. Never copy production users,
  progress, sessions, or other personal data into it.
- Staging currently follows `main`; a dedicated `staging` branch remains a
  release-process improvement.
- Production deploy is manual. Pushing Git does not update the public app.
- Dynamic Supabase BB content is independent of Git and Vercel deployment.
- Production was rebuilt cleanly on 2026-07-21 with the reviewed schema,
  explicit API grants, account-deletion Edge Function, and 1,145 public cards.
  No legacy users or private learning data were migrated.

Never commit `.env.staging.local`, Supabase service-role keys, Vercel tokens, or
other secrets. `VITE_*` values are public client configuration and must never
contain a service-role key.

## Safe commands

```bash
pnpm run dev
pnpm run build:staging
pnpm run build:production
pnpm run audit:live-media
```

`pnpm run dev` uses staging. Treat `pnpm run dev:production` as exceptional
because it connects local code to production services.

## Release flow

1. Work on a feature branch.
2. Build and test against staging.
3. Merge approved code into `main`.
4. Run `pnpm run build:production`.
5. Run `pnpm run deploy` from a clean worktree.
6. Smoke-test the public URL and affected media URLs.

Supabase content changes do not follow this Git flow; verify them directly in
the live app. Schema/RLS changes are higher risk and must be tested on staging
first.

## Visual-media rule

- Raster illustrations/GIFs: visible real-world scenes and narrative analogies
  only.
- Technical visuals: deterministic Manim, SVG, canvas, or Three.js only.
- Never generate raster formulae, graphs, particle diagrams, bonds, circuits,
  labels, quantities, or exact technical geometry.

Preserve unrelated working-tree changes. Existing build warnings about Svelte
accessibility and large chunks are known but should not be silently treated as
new failures.
