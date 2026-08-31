# Agent Onboarding

Welcome to Qubix University. This repository is both a software product and a deliberately governed curriculum project. Good engineering is necessary, but it is not sufficient: every agent must protect the pace, provenance and founder-review process.

## 1. Mission

Qubix University turns strong classical mathematical teaching into very small modern interactive experiences. It preserves the intellectual structure of the source while using present-day language, manipulable models, responsive design and careful misconception checks.

The objective is not maximum content. The objective is a trustworthy sequence that the founder has personally read, tested, amended and approved.

## 2. Authority and pace

The founder is the sole curriculum authority. An agent may research, draft, critique, implement, test and propose a status change. It may not mark a BB `APPROVED` or `RELEASED`.

Use the snail-speed workflow:

1. select one source passage and record its provenance;
2. verify its prerequisites;
3. draft one very small learning move;
4. let the founder read it;
5. implement and test one interaction;
6. make narrowly requested amendments;
7. wait for the founder's explicit decision;
8. only then consider the next BB.

Do not pre-build later curriculum “for efficiency.” Available source material is a library of choices, not a production queue.

## 3. Required reading

Read these documents before changing curriculum or product behaviour:

| Document | Why it matters |
|---|---|
| `00-CURRICULUM-DECLARATION.md` | Authority, pace, statuses and source rules |
| `curriculum/01-PREREQUISITE-MAP.md` | Dependency structure before calculus |
| `curriculum/02-MAIN-CURRICULUM-MAP.md` | Intended curriculum order |
| `curriculum/STATUS.md` | Current truth about approval and locks |
| `curriculum/03-FOUNDATIONAL-BOOKS.md` | Present anchor shelf |
| `curriculum/04-EXTENDED-CLASSICAL-LIBRARY.md` | Candidate sources and legal gates |
| `docs/REVIEW-PROTOCOL.md` | Founder review procedure |
| `docs/INFRASTRUCTURE.md` | Hosting, DNS, and Supabase safety boundaries |
| `docs/PRODUCT-AND-LAUNCH-PLAN.md` | Fixed product identity, architecture, legal/security gates and priority checklist |

If documents conflict, stop and flag the conflict. Never infer approval from an implemented screen, a merged pull request or a successful deployment.

## 4. Current product state

The current learner experience is the five-part **Variables and Rates of Change** lesson in `src/views/ChangeLab.svelte`. All five BBs are `AI_DRAFT`. The component filename is retained temporarily as an internal compatibility detail and is not the curriculum title.

`src/views/ReviewMode.svelte` is the founder-facing production staging workspace. It tests:

- the learning objective;
- prerequisite assumptions;
- attention and pacing;
- whether the interaction teaches;
- the accuracy and clarity of the explanation;
- the proposed curriculum decision.

The staging workspace must review only the active BB. At present that is BB1; BB2–BB5 must remain visibly locked until the founder approves the preceding work.

Production routing is intentional:

- `/` — data-science foundation landing (production);
- `/study` — matched study-room validation prototype (session layer, not curriculum);
- `/?prototype=variables-and-rates` — learner preview;
- `/?prototype=change-lab` — legacy compatibility alias;
- `/?mode=review` — force review mode during local development.

Questionnaire responses currently live in browser storage only. They do not write to Supabase, change repository files or grant curriculum approval.

## 5. Technical map

- Framework: Svelte 4 with Vite 5.
- App entry: `src/main.js` and `src/App.svelte`.
- Learner prototype: `src/views/ChangeLab.svelte`.
- Review workspace: `src/views/ReviewMode.svelte`.
- Shared design system: `src/lib/styles/`.
- Static/PWA assets: `public/`.
- Deployment: `scripts/deploy.mjs`, publishing to the dedicated Qubix University Vercel project.
- Reference-only data infrastructure: `supabase/`.

The five-colour Qubix UI system in `src/lib/styles/qubix-tokens.css` is locked. New interface states should use the existing semantic tokens rather than introducing additional UI hues.

## 6. Curriculum statuses

Use only the declared statuses:

- `SOURCE_SELECTED`
- `AI_DRAFT`
- `FOUNDER_READING`
- `AMENDMENTS_REQUIRED`
- `FOUNDER_TESTING`
- `APPROVED`
- `RELEASED`

An app control labelled “ready for formal approval” remains a candidate decision. It is not equivalent to `APPROVED`.

## 7. Source and copyright protocol

Before adapting any passage, record:

1. title and author;
2. exact edition, publisher and year;
3. stable scan or text record;
4. chapter and page range;
5. legal evidence for intended launch territories;
6. which idea is retained;
7. which language, notation or claims are modernised;
8. the founder's permission to use that passage.

Check translations, editorial notes, illustrations and typographical editions independently. A Project Gutenberg US record is useful evidence, but is not automatic worldwide clearance. Do not copy modern covers, annotations or diagrams from commercial reprints.

## 8. Design principles

Optimise for very short attention units without making the mathematics shallow.

Use clear textbook-style nomenclature. Course, unit and BB titles should identify the mathematical concept directly. Do not invent branded metaphors, quests or “laboratory” names for ordinary technical topics. Visual presentation and interaction may be distinctive, but naming must remain grounded and academically recognisable.

One learner screen should normally contain:

1. one question or prediction;
2. one manipulable object;
3. one visible mathematical consequence;
4. one short explanation;
5. one misconception check or act of recall.

An interaction must expose a relationship. Decoration, unearned animation and clicks that do not change understanding should be removed.

Use plain language, accessible controls, keyboard-operable actions, generous touch targets and both light and dark themes. Verify phone and desktop layouts.

## 9. Infrastructure boundaries

### Hosting

The site is served from the dedicated `qubix-university` Vercel project. This
source repository stays private because it carries the Factory, gated drafts and
curriculum records. Publish only with `npm run deploy`; the release script checks
the linked project and generated learner bundle before deployment. Never link
this checkout to or deploy over the separate Strata project.

### Supabase

The `supabase/` directory is inherited reference material. Do not apply schemas, migrations, seeds or policies to any database until they have been audited for this curriculum model and the founder has authorised the target project.

Only public client variables may use the `VITE_` prefix. A Supabase service-role key must never enter source code, browser storage, Vercel client variables or chat transcripts.

## 10. Working procedure

Before editing:

- inspect the working tree and preserve unrelated changes;
- identify the exact BB, component or infrastructure item in scope;
- state assumptions that could change the outcome;
- read the relevant curriculum and source records.

While editing:

- keep changes narrow and reversible;
- do not silently rewrite approved learner-facing text;
- use the existing design tokens and component language;
- update documentation when routes, gates or infrastructure behaviour change.

Before handoff:

- run the production build;
- test the changed path at desktop and mobile widths;
- check the learner-preview route when modifying staging;
- report files changed and verification performed;
- state whether changes are local, committed, pushed or deployed;
- stop rather than moving into the next BB without a founder instruction.

## 11. Git and collaboration

- Use small descriptive commits.
- Do not mix unrelated Strata or personal files into this repository.
- Do not force-push, rewrite shared history or delete branches without explicit permission.
- Never commit `.env`, `.vercel/`, credentials or generated dependency directories.
- Keep the existing draft pull request as the review surface until the founder requests otherwise.

For private-repository access, follow `docs/AI-ACCESS-CHECKLIST.md`. Each AI should receive only the permissions it needs. Repository access and infrastructure access are separate grants.

## 12. Handoff template

Every agent should end substantive work with:

```text
Outcome:
Files changed:
Curriculum status affected:
Source/provenance affected:
Tests performed:
Deployment state:
Unresolved risks or decisions:
One recommended next action:
```

This makes work legible across Claude, Cursor, Codex and any later system without granting any of them curriculum authority.
