# Reading and Learn-by-Doing Modes

Status: **Product rationale; no curriculum approval implied**

Recorded: 2026-08-24

## Decision

Qubix presents two equally valid entrances to the same Shared Foundations:

1. **Reading mode** — a short explanation, a worked example, a focused retrieval
   question and a link to practice.
2. **Learn by doing** — a guided Superstore decision with feedback and a link
   back to the reading that explains the idea.

The modes are not separate catalogues. Every academy mission names one related
reading session, and every reading session names one activity. A learner can
switch whenever another representation would help.

This release changes navigation and product framing only. It does not add a
board, rewrite learner-facing curriculum, or change any `AI_DRAFT`, founder
review or approval status.

## Evidence used

### Organising study

The US Institute of Education Sciences practice guide *Organizing Instruction
and Study to Improve Student Learning* recommends interleaving worked examples
with problem solving, combining verbal and graphical representations, connecting
concrete and abstract representations, using active retrieval, and asking deep
explanatory questions. Qubix's reading sessions already contain those parts; the
mode bridge makes the worked example and the corresponding activity visibly one
route rather than two unrelated destinations.

- Institute of Education Sciences, What Works Clearinghouse, released September
  2007: https://ies.ed.gov/ncee/wwc/PracticeGuide/1
- Full practice guide: https://ies.ed.gov/ncee/wwc/Docs/PracticeGuide/20072004.pdf

### Data-science breadth and pathways

The National Academies report *Data Science for Undergraduates: Opportunities
and Options* treats data science as spanning collection, storage, integration,
analysis, inference, communication and ethics, and recommends a range of
educational pathways. Qubix's Shared Foundations and role volumes already cover
that breadth. This release does not expand those outlines; it gives a newcomer a
clear first action within them.

- National Academies of Sciences, Engineering, and Medicine (2018), DOI
  10.17226/25104: https://nap.nationalacademies.org/catalog/25104/data-science-for-undergraduates-opportunities-and-options

### Statistics through active work

The American Statistical Association's GAISE reports emphasise conceptual
understanding, real data, active learning and technology in introductory
statistics. Qubix keeps its examples in one synthetic Superstore so that the
activity can expose grain, missingness, joins and evidence without transmitting
personal or production data.

- American Statistical Association, GAISE reports:
  https://www.amstat.org/education/guidelines-for-assessment-and-instruction-in-statistics-education-%28gaise%29-reports

## Source boundary

These modern works inform product sequencing and terminology only. No wording,
example, diagram, question or interaction has been adapted from them. Curriculum
sources remain governed by `00-CURRICULUM-DECLARATION.md`, the passage-level
provenance rules, and founder review.

The existing declared shelf in `curriculum/03-FOUNDATIONAL-BOOKS.md` remains the
authority for source selection. In particular, Lane et al.'s *Introduction to
Statistics (Online Edition)* is only a proposed statistics anchor and does not
enter a board through this product change.
