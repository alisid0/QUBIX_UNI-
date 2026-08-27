# Qubix

Qubix is a general interactive-learning product for curious people, including
but not limited to students. It begins with separate Maths and Physics subject
areas and is not a school, examination board or prescribed syllabus. Its current
pilot content remains under founder review.

The fixed public identity is **Qubix**, published by **Arcave Technologies** at
`https://qubix.university/`, with mobile identifier `university.qubix.app`.

## Read first

1. [Agent Instructions](./AGENTS.md)
2. [Agent Onboarding](./docs/AGENT-ONBOARDING.md)
3. [Curriculum Declaration](./00-CURRICULUM-DECLARATION.md)
4. [Prerequisite Map](./curriculum/01-PREREQUISITE-MAP.md)
5. [Main Curriculum Map](./curriculum/02-MAIN-CURRICULUM-MAP.md)
6. [Foundational Mathematics Books](./curriculum/03-FOUNDATIONAL-BOOKS.md)
7. [Extended Classical Mathematics Library](./curriculum/04-EXTENDED-CLASSICAL-LIBRARY.md)
8. [Current Status](./curriculum/STATUS.md)
9. [Founder Review Protocol](./docs/REVIEW-PROTOCOL.md)
10. [Product and Launch Plan](./docs/PRODUCT-AND-LAUNCH-PLAN.md)
11. [Current Working To-Do List](./TODO.md)

The active curriculum item is [A Letter for a Number](./curriculum/bb/CME-CHANGE-001-A-LETTER-FOR-A-NUMBER.md). The four boards after it remain locked.

Boards are named rather than numbered, because the running order is not settled. The naming note is at the foot of [the main curriculum map](./curriculum/02-MAIN-CURRICULUM-MAP.md).

No additional curriculum should be generated until these gates are reviewed.

## Repository layout

This repository is the standalone source of truth for the governed Qubix
foundation and the latest complete application:

- The repository root contains the canonical curriculum, review process, mobile
  shells, and the currently deployed pilot.
- [`current-app/`](./current-app/) is the latest interactive application,
  its product and design plans, lesson content, authoring tools, tests, media,
  promotional advert, and the Shorts mascot animation studio. See the
  [current application guide](./docs/CURRENT-APP.md) for the fresh-clone setup.
- [`current-app/shorts/functions/`](./current-app/shorts/functions/) contains the
  Aron and Qubix mascot assets and the Three.js animation work.
- [`current-app/promo-video/`](./current-app/promo-video/) contains the advert
  project and exported promotional videos.

No other source checkout is required. Local and production credentials,
generated dependencies, caches, and deployment state remain intentionally
untracked and must be supplied for the relevant environment.

## What production serves

The live site at `https://qubix.university/` is **the course**. Until 2026-08-10
the production root was a curriculum-review questionnaire and the lesson was
hidden behind `?prototype=variables-and-rates`; anyone opening the site got a
review form. That was right while the deployed site existed to be reviewed rather
than used, and wrong once it did not.

| Address | What it opens |
|---|---|
| `/` | the course: Home, then the boards |
| `?mode=review` | the Approver, a review questionnaire, answers kept in the browser only |
| `?mode=factory` | the Factory, **local development only**, never built into production |

Nine boards are live: three on variables, four built from Factory selections
(*What a Button Does*, *A Number In, A Number Out*, *Area on the Grid*,
*The Coordinate Plane*), and two on rates. Nothing here is approved curriculum.

## Local development

```bash
npm install
npm run dev
```

`predev` and `prebuild` run `scripts/build-pilot.mjs`, which writes the learner's
copy of the Factory-built boards from the founder's selections. It cannot fall
behind, and its output is committed so a fresh checkout builds without it.

## Deployment

```bash
git push origin main
```

Vercel is connected to this GitHub repository. Every push to `main` builds and
publishes the dedicated `qubix-university` production project at
`qubix.university`. Other branches create preview deployments. The optional
`npm run deploy` command remains available for a verified manual release from a
linked local checkout.

## Infrastructure

See [Infrastructure Inheritance](./docs/INFRASTRUCTURE.md) for hosting, DNS, the
deployment incident of 2026-08-10, and the Supabase boundaries.

## Private collaboration

See [AI Collaborator Access Checklist](./docs/AI-ACCESS-CHECKLIST.md).
