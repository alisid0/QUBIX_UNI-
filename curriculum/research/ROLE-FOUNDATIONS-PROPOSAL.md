# Role Foundations Proposal

Status: **AI_DRAFT planning proposal, not approved curriculum**  
Founder direction recorded: 2026-08-22

## Product shape

Qubix should progress like a clear series of books. The learner first completes
one shared foundation, then chooses a role foundation. Role names describe why a
topic matters and which depth is required. They are not cosmetic game ranks.

1. Volume 0: Shared Foundations
2. Volume I: Analyst Foundations
3. Volume II: Data Engineer Foundations
4. Volume III: Data Scientist Foundations
5. Volume IV: Machine Learning Engineer Foundations

The product teaches foundations for these roles. It does not claim that
finishing a volume is equivalent to professional experience or job readiness.

## Shared foundation

Every route begins with data representation, arithmetic and algebra, functions
and graphs, data quality, descriptive statistics and probability language,
foundational SQL, foundational Python, and clear communication. Later volumes
may deepen these ideas without silently assuming them.

## Role emphasis

| Volume | Primary emphasis |
|---|---|
| Analyst | questions, SQL, representation, descriptive statistics, metrics, dashboards and decisions |
| Data Engineer | Python, relational modelling, SQL, storage, pipelines, testing, orchestration and reliability |
| Data Scientist | Python, SQL, probability, inference, vectors, matrices, calculus, modelling and evaluation |
| Machine Learning Engineer | ML mathematics, algorithms, software engineering, training pipelines, serving, MLOps and safety |

## Page contract

Each eventual chapter should:

1. explain one idea in plain language;
2. show one worked example;
3. ask one focused question;
4. explain a misconception when needed;
5. return to the idea later through recall;
6. avoid decorative media that competes with the reasoning task.

Interactive media is justified only when manipulating the representation adds
understanding. A table should remain a table when animation or 3D does not make
the relationship clearer.

## Companion games

Each volume has one companion game. Chapters unlock new scenarios inside that
game, so practice accumulates without fragmenting the course into unrelated mini
games.

| Volume | Companion game | Core loop |
|---|---|---|
| Shared Foundations | Data Quality Rotation | inspect, classify, preserve, trace |
| Analyst Foundations | Analyst Decision Desk | brief, inspect, represent, recommend |
| Data Engineer Foundations | Pipeline Control | observe, trace, repair, verify |
| Data Scientist Foundations | Investigation Lab | question, explore, test, evaluate |
| Machine Learning Engineer Foundations | Model Operations | monitor, diagnose, change, validate |

The book remains the teaching source of record. A companion game may combine
ideas that have already been taught, but it must not become a second unexplained
curriculum.

Every companion game is foundational. It rehearses the vocabulary, mental model
and basic decisions introduced by its volume. It must not imitate senior work,
claim job readiness or require professional tools that the book has not taught.

## First authored block

`SHARED-FOUNDATIONS-PART-ONE` is the first working authoring draft. It contains
235 guided minutes, or 3 hours and 55 minutes, across four sessions. The estimate
includes reading, a worked example, a workbook activity, a focused check and one
existing practice mission per session.

| Session | Guided time | Focused practice |
|---|---:|---|
| Data is a record, not reality | 40 minutes | Process a Sale |
| Observations and variables | 80 minutes | Classify Store Data |
| One row means one thing | 55 minutes | What Does One Row Represent? |
| A value needs context | 60 minutes | Missing Values Are Not Zero |

This block remains `AI_DRAFT · AUTHORING ONLY`. Its saved progress is a usability
aid, not certification. The content and timings still require founder review,
source review and the normal curriculum approval process before release.

## Governance boundary

This proposal reorganises planning only. It does not unlock later boards, change
the current `STAT-DATA-001` drafting gate, approve the listed chapters, or
replace passage-level source and founder review.
