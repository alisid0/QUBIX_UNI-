# Qubix

Qubix is a Svelte/Vite microlearning app organised as Building Blocks (BBs).
Learners move horizontally between BBs and vertically through floors inside a
BB. Qubix University is the canonical repository and product identity.

Production: `https://qubix.university`
Staging: `https://qubix-staging.vercel.app`

## Read first

- `docs/SOURCE-OF-TRUTH.md` — what is actually live and how to verify it.
- `AGENTS.md` — safe working rules for coding agents.
- `docs/ENVIRONMENTS.md` — staging/production isolation.
- `docs/RELEASE-MODEL.md` — how changes reach users.
- `docs/PHASE-1.1-EXPANSION.md` — the Learn → Solve → Recall engagement loop.

Do not use `content-drafts/` or archived exports to count live BBs or floors.
Run `pnpm run audit:live-media` first.

## Run locally

```bash
npm ci
npm run dev
npm run build
npm run preview
```

The default development and build commands use the committed standalone
configuration and bundled lesson fallbacks. They require no cloud credentials.

For connected staging development, copy
`.env.staging.example` to `.env.staging.local` and supply the staging project's
public URL and anon key, then run `npm run dev:staging`. Never place a
service-role key in a `VITE_*` variable.

## Live content architecture

The Reader resolves content in this order:

1. `src/lib/content/paths.js` supplies the BB numbers for each live path.
2. `src/lib/content/dynamicBoards.js` refreshes those dynamic BBs from the
   production or staging Supabase `cards` table when a topic opens.
3. Bundled modules (`functionBoards.js`, `matrixBoards.js`,
   `publishableTopicBoards.js`, `topicExpansionBoards.js`) provide offline or
   missing-row fallbacks.
4. The legacy static `DECK` remains bundled for old low-numbered cards, but it
   is not the inventory for the live Path screen.

Supabase content can change without a Git commit or Vercel deployment. Git can
change without a production deployment. Verify each surface independently.

## Media architecture

For a reading floor, `Reader.svelte` checks:

1. the floor object's `img`;
2. `src/lib/content/boardMedia.js`;
3. legacy `src/lib/content/media.js` where applicable.

A top-level board `img` is the full Floor-0 swipe image.

Raster illustrations and GIFs are reserved for visible real-world scenes and
narrative analogies. Technical diagrams, formulae, graphs, geometry, particles,
bonds, circuits, rays, and labelled structures must be deterministic Manim,
SVG, canvas, or Three.js assets.

## Live audit

```bash
npm run audit:live-catalogue
npm run audit:live-media
```

These are read-only production-public-data audits. Disposable exports go under
ignored `.audit-cache/`; the human-readable snapshot is
`docs/GIF-ELIGIBILITY-AUDIT.md`. Always check its fetched timestamp.

## Release

Pushing `main` updates the current staging deployment. Production remains a
manual release:

```bash
npm run build:production
npm run deploy
```

Deploy from a clean worktree so unrelated local changes cannot be uploaded.
See `docs/RELEASE-MODEL.md` for service-worker and Android-shell considerations.
