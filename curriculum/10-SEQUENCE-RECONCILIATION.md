# Sequence reconciliation

Status: **Founder rulings recorded. Four conflicts open.**
Founder direction: 2026-08-30
Supersedes nothing. Reconciles: `02-MAIN-CURRICULUM-MAP.md`, `05-DATA-SCIENCE-ROADMAP.md`,
`08-SUPERSTORE-TOPIC-CATALOG.md`, and the canonical list in `src/factory/superstore-topics.js`.

---

## Why this file exists

On 2026-08-30 the founder worked through a topic catalogue and settled a sequence
for a complete beginner: six parts, easy things first, tools late. Those rulings
were made in conversation and existed nowhere in the repository.

Separately, and since 2026-08-21, a **complete 379-topic course already exists**
in `src/factory/superstore-topics.js`: seventeen ordered phases from Pre-Intern
Candidate to Lead Data Scientist, each with a business practical. It is wired
into the Wiki and into `build-state`.

The two do not agree. This file records the rulings, names the disagreements,
and says which decisions are still owed. **It does not resolve them**: only the
founder can.

---

## 1. What the founder ruled on 2026-08-30

Working from a catalogue of 57 candidate topics, the founder kept, deferred and
cut as follows.

**Kept, and ordered into six parts.** Event and record, rows and columns, grain,
missing and absent, units and zero, data types and scales, framing the question.
Then distributions, centre, spread, outliers, looking at data, showing data,
correlation. Then correlation is not cause, and experiments. Then a little
Python. Then SQL, with how data arrives, joining, grouping and reshaping
travelling alongside it. Then data structures, reproducible work, version
control.

**Deferred, not dropped.** Provenance, described as belonging with complex
machine learning later. All nine uncertainty topics, on the grounds that
probability is not for this volume. All ten model topics.

**Dropped as too theoretical.** Confounding, and Simpson's paradox.

**Design rules stated.** Three low-hanging fruits to every one hard fruit, where
a low-hanging unit ends in a small correct answer within minutes and a hard one
ends in a judgement. And no SQL early: `SELECT *` returns something that looks
like success before a beginner can tell a good result from a bad one, so the
reward is counterfeit.

**Framing correction.** Data science is a project workflow, not a topic list:
what data is, its types, the story behind it, how it is collected, how it is
produced, how it updates, then centre, then the correlation matrix, then which
factors matter. Context belongs early. Formal lineage does not.

Built from these rulings: `src/lib/content/beginner-path.js`, 24 steps across
five parts, live and guarded.

---

## 2. What already existed

`src/factory/superstore-topics.js`, 379 topics in 17 phases:

| Phase | Title | Topics |
|---:|---|---:|
| 0 | Pre-Intern academy, starting from zero | 22 |
| 1 | Enterprise and data orientation | 12 |
| 2 | Mathematical foundations | 14 |
| 3 | Data literacy and measurement | 19 |
| 4 | Descriptive statistics and visualisation | 20 |
| 5 | Probability and uncertainty | 24 |
| 6 | Sampling, inference and experimentation | 26 |
| 7 | Relational data and SQL | 23 |
| 8 | Python and analytical computing | 23 |
| 9 | Business intelligence and decision analytics | 21 |
| 10 | Analytics engineering and data modelling | 19 |
| 11 | Data engineering and platform reliability | 22 |
| 12 | Mathematics for machine learning | 19 |
| 13 | Machine learning and data science | 29 |
| 14 | Forecasting, optimisation and advanced science | 22 |
| 15 | Deep learning, AI and production ML | 35 |
| 16 | Lead Data Scientist and data leadership | 29 |

Phase 0 begins further back than any of the recent proposals: keyboard and mouse,
files and folders, opening and saving, browsers and safe downloads, passwords and
multifactor authentication, then plain text and spreadsheets, and only then rows
and columns. Two of its topics exist as library books: *What Data Is and Why
People Use It* and *What a Computer Program Does*.

---

## 3. The four conflicts

Each needs a founder decision. None can be settled by argument from the files.

### 3.1 Where does a beginner actually start?

The catalogue's phase 0 assumes somebody who may not be confident with a computer.
The 2026-08-30 sequence assumes somebody who can already open a spreadsheet and
starts at *a sale is not its record*.

These are two different learners. Both are defensible products. The catalogue's
answer is the more ambitious and the more unusual, and it is also the one that
best matches the founder's own three-to-one pacing rule, because opening a file
and using a calculator are genuinely low-hanging.

### 3.2 SQL before Python, or Python before SQL?

The catalogue puts relational data and SQL at phase 7 and Python at phase 8.
The 2026-08-30 sequence puts Python at part 3 and SQL at part 4. A direct
contradiction, and one that changes which chapter a learner meets fifth.

### 3.3 Is probability early or deferred?

The catalogue puts probability at phase 5, ahead of both SQL and Python, and
sampling and inference at phase 6. The founder deferred all of it on 2026-08-30.
Chapter 8 of the live book is already written against the early position.

### 3.4 Seventeen phases or six parts?

The catalogue is a career ladder ending at data leadership. The sequence is one
volume ending at reading evidence honestly. They are not incompatible: the
sequence could be phases 0 to 4 of the ladder. But nothing currently says so,
and two structures describing the same course will drift.

---

## 4. What is built

- **35 reading sessions**, live, covering roughly phases 3 to 8 at a much lower
  topic count than the catalogue plans for them.
- **24 of those 35** are on the beginner path. Eleven are off it with reasons
  recorded in `beginner-path.js`.
- **2 of phase 0's 22 topics** exist, as library books.
- **19 missions**, 4 approved DSA samples, a 54-table Superstore and a browser
  SQL console.
- **Phases 9 to 16, 196 topics**, have nothing.

Against the catalogue's 379, the built fraction is roughly one in ten.

---

## 5. Recommendation

Do not design a tenth curriculum. Reconcile these two, then build against one.

The cheapest reconciliation that loses nothing: treat the 2026-08-30 sequence as
**the ordering of phases 3 and 4**, keep phase 0 as the true-beginner on-ramp it
already is, and record the SQL-before-Python question as the one real
disagreement to settle. That leaves the career ladder intact, gives the beginner
path a home inside it, and makes the 379 the map with the sequence as the
current leg.

---

## 6. A note on the ChatGPT exchange

A critique document was prepared on 2026-08-30 for a three-round exchange with
ChatGPT about its 150-topic course map. That critique argues from the 160-unit
beginner outline, not from this 379-topic catalogue, because the catalogue was
not found until afterwards.

The pedagogical argument in it still holds: the comparison of first-five-hours
content, and the three-to-one pacing rule, are independent of which catalogue is
canonical. But the line *"what we would put in the same five hours"* describes
the 160-unit outline rather than this repository's actual design, and phase 0
would give a different and arguably better answer. Worth correcting before a
second round.

---

## Amendment history

- 2026-08-30 — Created. Founder rulings from the topic-catalogue pass recorded,
  the existing 379-topic catalogue surfaced, four conflicts named. Nothing
  resolved and nothing approved.
