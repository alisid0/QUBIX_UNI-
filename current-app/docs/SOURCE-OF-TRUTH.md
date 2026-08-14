# Qubix source-of-truth contract

Last verified against production: 2026-07-21

This document exists to prevent a draft, local branch, database snapshot, or
old handoff from being mistaken for the application learners currently use.

## The authoritative hierarchy

Use these sources in this order:

1. **Live course membership:** `src/lib/content/paths.js` from the code deployed
   to production. It defines which BB numbers appear in each live subject path.
2. **Live BB titles and floors:** the production Supabase `cards` rows requested
   by those path numbers. `dynamicBoards.js` refreshes these rows whenever a
   topic opens; Git is not the source of truth for their current copy.
3. **Bundled fallback BBs:** `functionBoards.js`, `matrixBoards.js`,
   `publishableTopicBoards.js`, and `topicExpansionBoards.js`, but only when a
   path number has no production Supabase row. This is the app's own fallback
   order.
4. **Media actually resolved by the Reader:** a floor object's `img`, then
   `boardMedia.js`, then legacy `media.js` for supported static cards. A
   top-level board `img` is the Floor-0 swipe image.
5. **Drafts and exports:** `content-drafts/`, archived plans, prompt banks, and
   generated CSV/JSON files are authoring material only. They are never proof
   that a BB or floor is live.

Never calculate production coverage from `_all-publishable-bbs.md`,
`IMAGE-PROMPTS.md`, `VISUAL-MEDIA-PLAN.*`, ingestion batches, or Supabase row
counts alone.

## Required verification before content or media planning

Run:

```bash
pnpm run audit:live-media
```

The command is read-only. It:

- reads the production path manifest;
- fetches only the public production card rows named by those paths;
- applies the same bundled fallback hierarchy as the app;
- measures media the current Reader can resolve;
- writes disposable JSON/CSV working data under ignored `.audit-cache/`; and
- refreshes `docs/GIF-ELIGIBILITY-AUDIT.md`.

The command requires network access and the public production URL/anon key from
`.env.production`. It never uses a service-role key and never reads users,
progress, sessions, or other personal data.

If the command has not been run during the current task, describe any catalogue
or coverage figures as an old snapshot—not as the live app.

## Current verified production baseline

On 2026-07-21 the live Path screen and production export agreed on:

| Subject | Live BBs | Live floors |
|---|---:|---:|
| Physics | 121 | 512 |
| Mathematics | 109 | 517 |
| Chemistry | 99 | 437 |
| Computer Science | 100 | 491 |
| **Total** | **429** | **1,957** |

At that verification point, 50 BBs and 60 floors had Reader-resolvable media:
11.7% of BBs and 3.1% of floors. Treat those numbers as a dated baseline and
rerun the audit for any new decision.

## Git, staging, and production are different states

- `main` on GitHub is the public code branch.
- A local branch may be ahead of or behind GitHub. Fetch before reporting its
  relationship to `origin/main`.
- A Git push updates the current staging deployment, but it does **not** deploy
  production.
- Production is a separate manual Vercel deployment. The current public URL is
  `https://qubix.university`.
- Supabase BB edits are independent of Git and can change live floor text
  without a code commit or Vercel deployment.

Therefore never say “current,” “live,” or “production” from `git log` alone.
Verify the relevant code deployment and, for BB content, production Supabase.

## Visual-production rule

- AI/raster illustrations and GIF frames may depict only visible real-world
  scenes or narrative analogies.
- Technical diagrams—formulae, graphs, geometry, rays, particles, bonds,
  circuits, system architecture, labelled apparatus, and exact comparisons—use
  deterministic Manim, SVG, canvas, Three.js, or equivalent code-native media.
- Generated raster text, labels, quantities, and technical geometry are not
  permitted.
- No floor receives media merely to satisfy a quota.

## Files that are explicitly non-authoritative

- `content-drafts/_all-publishable-bbs.md`
- `content-drafts/IMAGE-PROMPTS.md`
- `content-drafts/VISUAL-MEDIA-PLAN.csv`
- `docs/VISUAL-MEDIA-PLAN.md` (superseded snapshot)
- `draft/` and archived handoffs

These may contain useful ideas, but every BB number, floor, title, and media
recommendation must be reconciled against the live audit before use.
