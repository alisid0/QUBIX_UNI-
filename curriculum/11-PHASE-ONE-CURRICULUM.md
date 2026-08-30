# Phase One · Working with data in a post-AI world

Status: **`AI_DRAFT`. Nothing here is approved.**
Founder direction: 2026-08-30
Design settled across three rounds with an external reviewer. Provenance in §7.

---

## 1. What Phase One is for

A machine will run the analysis. It will write the query, fit the model, and
produce a confident paragraph explaining the result. What it will not do is tell
you that the number is wrong.

Phase One makes somebody who can look at data, and at an answer drawn from data,
and say whether it can be believed. Not somebody who can calculate. Somebody who
can judge.

**The exit claim.** After Phase One a learner can take a number somebody hands
them, work out what it actually counts, find the two or three ways it could be
wrong, and say plainly what it does and does not show.

**Who it is for.** An adult with no data experience and no programming
experience, who can use a browser and has opened a spreadsheet once or twice.
Not a career changer with a maths degree, and not somebody who needs to be
taught what a file is. That learner is served by phase 0 of
`src/factory/superstore-topics.js`, which stays where it is.

---

## 2. The rules this curriculum is built to

Seven, all settled, all checkable.

1. **One durable idea per session.** A session earns a single claim the learner
   could repeat at dinner. Not a survey of everything the platform can do.
2. **Twenty to thirty minutes.** Every session is one sitting. Beats are timed
   and the times add up.
3. **A tapering ratio.** Recognition to judgement runs 3:1 through modules 1 and
   2, 2:1 through 3 and 4, and 1:1 or judgement-heavy through 5 and 6. Constant
   recognition produces fluency without reasoning.
4. **Classified by what the learner produces**, not by what the designer calls
   it. If the required response is a defensible choice, it is a judgement,
   however the screen presents it.
5. **Real data before any definition.** Superstore rows inside two minutes.
6. **The investigation runs through.** One branch investigation opens in session
   1.1 and is added to in every module. It is not a capstone bolted to the end.
7. **Nothing needs installing.** Browser only. The SQL console exists; there is
   no Python runtime, and Python is not in Phase One.

---

## 3. The shape

Six modules, twenty-six sessions, about eleven hours.

| № | Module | Sessions | Ratio | The module's question |
|---|---|---:|---|---|
| 1 | What one row is | 4 | 3:1 | What is this data actually about? |
| 2 | What a value is | 4 | 3:1 | What does this number mean, and what may I do with it? |
| 3 | What a summary hides | 5 | 2:1 | What did I lose when I summarised? |
| 4 | Asking the data yourself | 5 | 2:1 | How do I get the answer, and what did I actually ask? |
| 5 | Is this real? | 4 | 1:1 | Should I believe this? |
| 6 | Saying it | 4 | 1:1 | What can I honestly claim? |

Python is not here. It begins in Phase Two, once there is something a learner
wants to do that a query cannot do comfortably. SQL is in Phase One because the
console exists and querying is closer to asking a question than programming is.

---

## 4. The sessions

Each carries one idea and one claim. The claim is what the learner can say
afterwards, and it is the test of whether the session worked.

### Module 1 · What one row is · 3:1

**1.1 Twelve rows, seven sales**
Grain, met by getting it wrong safely. The learner is asked for two numbers,
how many rows and how many sales they think those rows represent, so the
contrast teaches without anybody being tricked.
> *A row is not automatically a sale.*

**1.2 Four tables, four meanings**
The same morning recorded in sales, sale lines, payments and customers.
> *Every table decides what one row means, and it decides it once.*

**1.3 The same thing, recorded twice**
Duplicates. Two rows that are one real event, and what that does to a total.
> *Counting one thing twice inflates everything built on the count.*

**1.4 What the till kept**
The record is a selection. The reasons behind a value are not stored with it.
> *A row records what happened, not why.*

### Module 2 · What a value is · 3:1

**2.1 Digits that are not numbers**
Barcodes, employee numbers, branch codes.
> *A barcode has digits in it and averaging two of them means nothing.*

**2.2 Ordered, but not by an amount**
Ordinal data. Poor, Fair, Good.
> *Good is better than Fair, but not by a measurable distance.*

**2.3 Four what?**
Units, and the difference between a true zero and a point on a scale.
> *A number without its unit is not yet a fact.*

**2.4 Blank is not zero**
The same column averaged twice, once skipping the gaps and once treating them
as zero.
> *A missing value and a zero produce different averages, and only one is true.*

### Module 3 · What a summary hides · 2:1

**3.1 Look at the shape first**
Two branches with the same mean and nothing else in common.
> *Two very different sets of numbers can have the same average.*

**3.2 Centre is a choice**
Mean, median, mode, and the one basket that moves only one of them.
> *One large basket moves the mean and leaves the median where it was.*

**3.3 How far apart are they?**
Range, quartiles, spread.
> *Two branches with the same average can be nothing alike.*

**3.4 The strangest row**
Outliers as error, as rare truth, and as the point.
> *The strangest row is either a mistake or the most important thing in the table.*

**3.5 The total that improved while everything got worse**
Simpson's paradox, taught with branch data and no machinery. Included on the
external reviewer's argument, and ours, that the concrete form of this idea is
not theory: it is arithmetic a shopkeeper can check.
> *A total can go up while every group inside it goes down.*

### Module 4 · Asking the data yourself · 2:1

Session 4.1 shows prewritten queries and asks the learner to match a result to
its meaning. Writing SQL starts in 4.2. Nobody meets `SELECT *` as unexplained
theatre.

**4.1 A question, written down**
Two prewritten queries, a row count and a distinct-sale count, and the learner
matches each result to what it counts.
> *The answer to a query is a table too, and it has its own grain.*

**4.2 Choosing rows**
`WHERE`, and what filtering does and does not change.
> *Filtering changes who is in the answer, not what the answer means.*

**4.3 Grouping moves the grain**
`GROUP BY`, and filtering twice at two different grains.
> *After grouping, one row is one group, and the count counts groups.*

**4.4 The join that doubled the money**
4,312 rows becoming 11,983, and a total that doubles.
> *A join can change what one row means, and then every sum is wrong.*

**4.5 Three checks before you believe it**
The habit that catches the previous four.
> *Every result needs checking before it leaves your screen.*

### Module 5 · Is this real? · 1:1

**5.1 Two things moving together**
Correlation, and what it does not license.
> *Association is not cause.*

**5.2 The third thing**
Confounding, concretely. Restored to the beginner volume on the reviewer's
argument that it needs no equations.
> *Busy stores get more staff, so more staff does not prove more sales.*

**5.3 Different, or different this week?**
Noise against signal, without the machinery of testing.
> *A gap this small could easily be an ordinary week.*

**5.4 What would have to be true**
The argument you make when you cannot run an experiment.
> *If I cannot test it, I can still say what would have to be true for it to hold.*

### Module 6 · Saying it · 1:1

**6.1 The machine's answer**
The Phase One session that only exists because of when it is being taught. A
tool returns a confident figure with a fluent explanation, and the figure is
wrong for a reason the learner has already met: the grain moved in a join.
> *A confident answer is a claim, and a claim can be checked.*

**6.2 Finding, meaning, recommendation**
Three statements with three different burdens of proof.
> *What I found, what I think it means, and what I suggest are three different claims.*

**6.3 The axis decides what they see**
Charts that mislead by scale, baseline and ordering.
> *A chart makes its argument before anybody reads the numbers.*

**6.4 Work somebody else can run**
> *If they cannot get my number without me, it is not yet a result.*

---

## 5. The investigation that runs through

One thread, opened in 1.1 and never closed until 6.4. Each module adds a stage
to a piece of work the learner already owns.

| After | The learner has | The thread left open |
|---|---|---|
| Module 1 | A branch's morning, and what one row of it is | The same receipt ID appears at a second branch |
| Module 2 | Every column classified, gaps found | Two columns disagree about the same sale |
| Module 3 | The branch summarised honestly | The summary hides a group that is getting worse |
| Module 4 | The figures queried rather than eyeballed | A join has quietly changed the total |
| Module 5 | A claim about why, and its limits | A tempting explanation that does not survive |
| Module 6 | A defensible half-page a manager could act on | — |

The loose thread at the end of each session is a question, never a streak or a
badge. The one that closes module 1 is the reviewer's: the same receipt
identifier at two branches, and whether receipt ID alone identifies a sale.

---

## 6. What exists today

Of the twenty-six, roughly half have a first draft somewhere in the 35 live
sessions, and none is written to these rules.

| State | Count | Notes |
|---|---:|---|
| Drafted and on the beginner path | 13 | Needs rewriting to one-idea-per-session and to length |
| Drafted, currently off the path | 4 | Ratios, change, tables, finding-against-interpretation |
| Not written | 9 | 1.3, 2.2, 3.1, 3.5, 4.1, 5.1, 5.2, 5.3, 5.4, 6.1 |
| Figures approved and usable | 3 | `outlier-pull` in 3.2, `grain-collapse` in 4.3, `join-fanout` in 4.4 |
| Figures approved but off Phase One | 2 | `base-rate`, `sampling-spread`, both probability |

No live session currently runs to twenty-five minutes. The reading is five to
seven minutes and the mission about five. Reaching the session length in §2 rule
2 is a build problem as much as a writing one.

---

## 7. Provenance

Settled over three rounds between Qubix and an external reviewer, from an
initial 150-topic map.

**Adopted from the reviewer.** The tapering ratio, replacing a flat three-to-one
across the whole course. Classification by what the learner must produce rather
than by what the screen shows. One durable idea per session, which is the single
most useful correction either side made. Asking for both quantities rather than
manufacturing a wrong answer. Prewritten queries before written ones. A loose
thread that stays on the session's own subject. Restoring concrete causal
caution and concrete Simpson's paradox to the beginner volume.

**Adopted from us.** SQL before Python, and Python out of Phase One entirely.
Real data before any definition. The project running through rather than a
capstone at the end. Concrete descriptions that state something true rather than
learning objectives. Deferring probability, inference and modelling.

**Errors we made and the reviewer caught.** A fifteen-minutes-per-topic figure
we invented and attributed. A recognition-to-judgement count we stated as 8:3
when our own table read 7:3, and which by a stricter classification was nearer
1.5:1: we failed our own constraint and misreported it. A first session carrying
nine concepts and calling it one lesson.

**Still open.** Whether Phase One nests inside the 379-topic catalogue as its
phases 3 and 4, or replaces that structure. Recorded in
`curriculum/10-SEQUENCE-RECONCILIATION.md` and not settled here.

---

## Amendment history

- 2026-08-30 — Created after three rounds of external review. `AI_DRAFT`.
  Nothing approved, nothing built, no live session changed.
