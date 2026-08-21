# Strata Migration Finalization Review

Status: `AI_DRAFT`, authoring-only

Standalone route: `?mode=strata-factory`

Audit date: 2026-08-11

Audited Strata revision: `origin/main` at `77d077b`

## Purpose

This is the evidence record behind the standalone Strata Migration Factory. It
is a migration decision surface, not an addition to the present Factory and not
curriculum approval. It lets the founder finalize what should be migrated,
adapted, deferred, rejected or retained only as infrastructure evidence.

## Audit boundary and method

The review used a clean archive of the latest Strata `origin/main`, not the
dirty historical checkout. Strata's own source-of-truth hierarchy was followed:

1. path membership and order in `src/lib/content/paths.js`;
2. live production board and floor rows, with bundled content used only where
   the live source did not provide a row;
3. workshop routing in `src/lib/content/workshopCatalog.js` and exercises in
   `src/lib/content/workshops.js`;
4. rendered interaction types in `src/routes/Workshop.svelte` and assessment
   components under `src/lib/components/assessment`;
5. board-media bindings, media components and public assets;
6. application shells, stores, services, deployment files and dependencies.

Non-authoritative drafts and uncommitted files in the old checkout were not
treated as published curriculum evidence.

## Completeness ledger

| Audited layer | Count | Representation in the factory |
|---|---:|---|
| Live curriculum paths | 40 | One decision record per path |
| Live path boards | 429 | Counted and traced through path membership |
| Live path floors | 1,957 | Counted from production/fallback resolution |
| Workshop routes | 99 | Listed on their owning path records |
| Rendered interaction engines | 36 | One decision record per engine type |
| Application/system families | 19 | One decision record per system boundary |
| Media groups | 5 | One decision record per asset family |
| Finalization decisions | 100 | Persisted locally in the standalone sheet |

The 429 boards and 1,957 floors are not individually approved by this review.
Their migration unit is the owning curriculum path, while reusable mechanics
are reviewed separately as interaction engines. This avoids silently importing
an entire subject merely because one of its mechanics is useful.

## Subject coverage

| Subject | Paths | Boards | Floors | Current Qubix relationship |
|---|---:|---:|---:|---|
| Physics | 12 | 121 | 512 | Motion, vectors and forces align now; later mechanics remain sequenced |
| Mathematics | 10 | 109 | 517 | Functions, coordinates and gradients align now; trigonometry follows geometry prerequisites |
| Chemistry | 11 | 99 | 437 | Subject content deferred; selected engines may be reusable |
| Computing | 7 | 100 | 491 | Subject content deferred; selected engines may be reusable |

## Decision meanings

- `Migrate`: carry the underlying material forward with provenance intact.
- `Adapt`: retain the learning purpose or mechanic but rebuild it in the current
  Qubix board contract, visual system and prerequisite order.
- `Defer`: preserve the evidence for a later curriculum stage or subject strand.
- `Reject`: do not transfer the old implementation or data boundary.
- `Infrastructure`: retain only as technical evidence or a reusable capability,
  not as learner content.

## Required safeguards

- Founder review is the only action that can approve curriculum or placement.
- Old Supabase rows, authentication, profiles, progress, league data and user
  records must not be copied into Qubix by a migration decision.
- The five-colour Qubix design system and current board contract remain the
  target; old pages are evidence, not templates to reproduce wholesale.
- Every adopted interaction still requires a title, prompt, labelled controls,
  explanatory readout, reset, usage hint, phone-width testing and accessibility
  review.
- A decision in local storage is a review note. It does not change source files,
  generate learner boards, commit, deploy or publish.

## Media evidence

The audit found 620 existing media bindings across 249 of 429 path boards and
620 of 1,957 floors. Candidate media classifications were: 333 technical
animations, 475 technical statics, 12 archive photographs, 8 scene GIFs, 24
static scenes and 485 floors with no candidate. These figures overlap where a
floor has more than one candidate and are used to judge migration workload, not
to assert licensing clearance.

The repository contains 85 public media files: 25 GIFs, 53 raster images, one
SVG and six videos. Licensing, provenance and relevance must be checked before
any file is transferred.

## Finalization gate

The standalone sheet begins with evidence-based recommendations, but all 100
records remain unreviewed until the founder marks them. A useful first pass is
to review items aligned `now`, followed by prerequisite-sensitive `next` items,
then deferred subject strands and finally rejected/infrastructure boundaries.

No migration should be implemented until the resulting manifest has been
reviewed for dependency order, provenance, accessibility, technical ownership
and learner placement.
