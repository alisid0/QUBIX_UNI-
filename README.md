# Qubix University

Qubix University is being rebuilt slowly from first principles. Its current product is the five-part *Variables and Rates of Change* lesson, and its curriculum remains under founder review.

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

The active curriculum item is [A Letter for a Number](./curriculum/bb/CME-CHANGE-001-A-LETTER-FOR-A-NUMBER.md). The four boards after it remain locked.

Boards are named rather than numbered, because the running order is not settled. The naming note is at the foot of [the main curriculum map](./curriculum/02-MAIN-CURRICULUM-MAP.md).

No additional curriculum should be generated until these gates are reviewed.

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
npm run deploy
```

Builds here, then pushes the compiled output to the public
[`qubix-university-site`](https://github.com/alisid0/qubix-university-site)
repository, which GitHub Pages serves at `qubix.university`. It refuses to run if
the working tree is dirty, if the commit author is not a GitHub account, or if
the bundle carries a gated draft board, an authoring note or a rejection reason.

A push to this repository is **not** a release. Only `npm run deploy` is.

## Infrastructure

See [Infrastructure Inheritance](./docs/INFRASTRUCTURE.md) for hosting, DNS, why
the site is not on Vercel, and the Supabase boundaries.

## Private collaboration

See [AI Collaborator Access Checklist](./docs/AI-ACCESS-CHECKLIST.md).
