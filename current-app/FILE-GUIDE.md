# FILE-GUIDE.md — what's where

The root used to have ~70 loose files from every phase of this project. Reorganized 2026-06-23. This is the map.

## Live app (untouched)

- `src/` — the real Svelte app. Everything that actually runs.
- `public/` — the real static assets (images, icons, videos, manifest, service worker) the Vite build serves. If you're looking for a card image, it's here, not at the root.
- `supabase/` — schema, seed, and the storage-bucket migration for the `cards` table.
- `scripts/` — `ingest-bbs.mjs`, the BB ingestion script.
- `manim_anims/` — Manim source for the generated card animations/GIFs.
- `CLAUDE.md`, `README.md`, `package.json`, `vite.config.js`, `svelte.config.js`, `vercel.json`, `.gitignore` — standard project root files, left in place.

## `docs/`

Planning and reference docs — read these to understand *why* the app is shaped the way it is, not how to run it. Mix of still-accurate specs (`DESIGN.md`, `PATHS.md`, `NOMENCLATURE.md`, `AUTHORING.md`, `BB-TEMPLATE.md`, `CONTENT.md`) and curriculum-planning docs of varying staleness (`CONTENT-MAP.md`, `CURRICULUM.md`, `HUBS.md`, `BRIDGES.md`, `PYRAMIDS.md`, `GROUND-ZERO.md`, `FLOOR-LAYOUT-SPEC.md`, `IMAGE-PROMPTS.md`, `MECHANICS.md`, `COORDINATE-GEOMETRY.md`, `ELECTRICITY.md`, `MATRICES.md`, `CTO-BRIEF.md`, `STRATA-BRIEF.md`, `ONBOARDING.md`). The two `_deepseek_completion_*.md` files are a recorded disagreement between the author and DeepSeek over build order — historical, not a live spec.

## `content-drafts/`

BB batches that exist but haven't been ingested yet, in two different formats:

- **Old format** (`COORDINATE-GEOMETRY-DRAFT.js`, `ELECTRICITY-DRAFT.js`, `MATRICES-DRAFT.js`, `deepseek-drafts-electricity-*.md`) — drafted before the Supabase pipeline existed, in the pre-Svelte DECK-array shape. Real content (200+ BBs between them), but needs reformatting into the JSON shape `scripts/ingest-bbs.mjs` expects before it's usable.
- **Current format** (`verma-batch-01.md`, `verma-batch-01.json`, `verma-batch-02.md`) — the live pipeline's shape. `verma-batch-01` is converted and ready to ingest once `.env.local` exists; `verma-batch-02` is still a draft, not yet converted.

## `source-material/`

Textbooks fed into the content pipeline. `verma_vol1.pdf` (H.C. Verma, *Concepts of Physics Vol 1*) lives here now — gitignored, never committed (copyrighted scan). Future books go here too.

## `authoring-tools/`

Scripts that help generate or publish content, separate from the app itself:

- `deepseek-helper.py`, `deepseek-batch-draft.py`, `deepseek-cli.py` — DeepSeek API tooling for drafting BBs.
- `strata-sheets-script.js` — a Google Apps Script (Forms → Sheet → "Publish to Supabase" menu) that writes to the same `cards` table `scripts/ingest-bbs.mjs` does. Older, manual, still functional, not part of the JSON pipeline.

## `legacy/`

Dead code and superseded prototypes from before the Svelte rewrite. Nothing here is imported by `src/` — kept for reference only, safe to ignore or delete wholesale if you never need it:

- `draft/`, `index-legacy.html` — the old single-file DECK app.
- `replace_deck.py` — wrote BBs into that old DECK array.
- `progress-store.js`, `paths-manifest.js`, `subject-mark.js`, `quiz-engine.js`, `quiz-style.css` — pre-Svelte equivalents of what's now `src/lib/stores/progress.js`, `src/lib/content/paths.js`, `SubjectMark.svelte`, `src/lib/content/questions.js`.
- `graph-data.js`, `graph-layout.js`, `graph-render.js`, `graph-style.css`, `map-style.css`, `MAP.html` — a curriculum-graph visualizer, never wired into the live app.
- `diagram-engine.js`, `diagram-specs.js`, `interactive-specs.js`, `COORDINATE-GEOMETRY-REVIEW.html` — the review tool for the old-format Coordinate Geometry draft batch (see `content-drafts/`).
- `architecture.html`, `unit-circle-prototype.html`, `QUIZ-TIER0.html`, `QUIZ-TIER1.html` — standalone prototypes/diagrams from earlier phases.
- `content-database.csv` — a CSV export of the 84-card deck, gitignored, not regenerated.
- `design/` — old `.dc.html` design mockups (Auth, Map, SubjectMark) that predate the Qubix redesign.

## Deleted in this cleanup (not moved anywhere)

- Root `images/`, `icons/`, `videos/`, `manifest.webmanifest`, `sw.js` — exact, stale duplicates of what `public/` already has. The app never read these; `public/` is what actually ships.
- `elevenlabs-session.json`, `.tmp_strata_menu_design.html`, `bb-preview.html`, `bb-sample.json` — gitignored scratch/reference files with no remaining use.
