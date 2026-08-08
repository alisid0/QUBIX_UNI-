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

The active curriculum item is [BB1: Variables and Changing Values](./curriculum/bb/BB1-VARIABLES-AND-CHANGING-VALUES.md). BB2–BB5 remain locked.

No additional curriculum should be generated until these gates are reviewed.

## Production staging mode

The production root is a curriculum-review questionnaire, not a released course. It stores draft answers only in the reviewer's browser and does not update Supabase or curriculum status. The learner-facing *Variables and Rates of Change* lesson is available through `?prototype=variables-and-rates`. The former `?prototype=change-lab` address remains as a compatibility alias. During local development, use `?mode=review` to open the staging workspace.

## Local development

```bash
npm install
npm run dev
```

## Infrastructure

See [Infrastructure Inheritance](./docs/INFRASTRUCTURE.md) before linking Vercel or applying Supabase migrations.

## Private collaboration

See [AI Collaborator Access Checklist](./docs/AI-ACCESS-CHECKLIST.md).
