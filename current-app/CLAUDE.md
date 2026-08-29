# Claude handoff — Qubix

Start with `AGENTS.md`, `DESIGN.md`, and `docs/SOURCE-OF-TRUTH.md`. Do not begin from old
draft inventories or archived handoffs.

## Identity and design

- Strata is the internal codename; Qubix is the public brand.
- The main app and Reader use the Qubix design system in
  `qubix-tokens.css` (`--qx-*`).
- `Quiz.svelte` is the remaining chalk-styled view. Do not extrapolate that
  chalk style to the Reader or new illustrations.

## Current content model

- `paths.js` defines which BB numbers appear in each live course path.
- `dynamicBoards.js` refreshes those BBs from the active environment's
  Supabase `cards` table whenever a topic opens.
- `functionBoards.js`, `matrixBoards.js`, `publishableTopicBoards.js`, and
  `topicExpansionBoards.js` are bundled fallbacks for missing/offline rows.
- `deck.js` contains legacy static low-numbered cards. Do not add all new BBs
  there and do not count it as the live catalogue.
- `content-drafts/` contains authoring material, not production inventory.

Before stating how many BBs/floors are live or planning media, run:

```bash
pnpm run audit:live-media
```

## Media rule

- Raster images/GIFs may show visible real-world actions and narrative
  analogies only.
- Technical visuals—graphs, formulae, geometry, particles, bonds, circuits,
  rays, system diagrams, labels, and quantities—must use deterministic Manim,
  SVG, canvas, or Three.js.
- Never put generated text or exact technical geometry into raster frames.

## Reader contract

- Horizontal movement changes BB; vertical movement changes floor.
- Preserve the depth rail and scoped path navigation.
- A floor image resolves from `layers[floor].img`, then `boardMedia.js`, then
  supported legacy `media.js` mappings.
- A top-level board `img` is the Floor-0 swipe image.

## Environments and release

- Local `pnpm run dev` uses staging.
- Staging and production use separate Supabase projects and user data.
- Supabase BB edits are independent of Git.
- A Git push is not a production release.
- Production deployment is manual via `pnpm run deploy` and should run from a
  clean worktree after staging and production builds pass.

See `docs/ENVIRONMENTS.md`, `docs/RELEASE-MODEL.md`, and
`docs/LAUNCH-HANDOVER.md` for the full operational rules.
