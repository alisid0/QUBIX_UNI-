# Qubix University Agent Instructions

These instructions apply to every file in this repository and to every coding or curriculum agent, including Codex, Claude, Cursor and future systems.

## Start here

Before changing anything, read in this order:

1. `00-CURRICULUM-DECLARATION.md`
2. `curriculum/01-PREREQUISITE-MAP.md`
3. `curriculum/02-MAIN-CURRICULUM-MAP.md`
4. `curriculum/STATUS.md`
5. `docs/AGENT-ONBOARDING.md`
6. `docs/REVIEW-PROTOCOL.md`

For source work, also read `curriculum/03-FOUNDATIONAL-BOOKS.md` and `curriculum/04-EXTENDED-CLASSICAL-LIBRARY.md`.

## Non-negotiable rules

- The founder is the only authority who may mark curriculum `APPROVED` or `RELEASED`.
- Work at snail speed: one Bite-sized Board (BB), one narrow decision and one review cycle at a time.
- Do not generate future BBs merely because their source material is available.
- Production opens in curriculum staging/dummy mode. Do not make an AI draft look like a released course.
- Dummy-mode answers record review intent only. They do not update curriculum status.
- Record the exact edition and passage provenance before adapting historical material.
- “Old” does not automatically mean public domain. Audit text, translation, annotations, diagrams and launch territories separately.
- Never apply inherited Supabase schema or connect the old Strata Vercel project without explicit founder approval.
- Never place service-role keys, tokens, passwords or private credentials in the repository or client bundle.
- Preserve unrelated user changes and keep every change small, attributable and reversible.

## Before handing work back

- Run the production build.
- Test changed interactions at desktop and mobile widths.
- Report exactly which files changed, what remains unapproved and whether anything was pushed or deployed.
- Leave a concise next action; do not silently continue into the next BB.

The canonical workflow and architecture notes live in `docs/AGENT-ONBOARDING.md`.
