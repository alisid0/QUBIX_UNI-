# Phase One · Working with data in a post-AI world

Status: **`AI_DRAFT`. Nothing here is approved.**
Founder direction: 2026-08-30
Design settled across four rounds with an external reviewer. Provenance in §10.

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

Eight, all settled, all checkable.

1. **One durable idea per session.** A session earns a single claim the learner
   could repeat at dinner. Not a survey of everything the platform can do.
2. **One idea is not one explanation.** Twenty-five minutes is six to nine short
   beats around a single claim, not one long passage about it. §8 sets the shape.
3. **Twenty to thirty minutes.** Every session is one sitting. Beats are timed
   and the times add up.
4. **A tapering ratio.** Recognition to judgement runs 3:1 through modules 1 and
   2, 2:1 through 3 and 4, and 1:1 or judgement-heavy through 5 and 6. Constant
   recognition produces fluency without reasoning.
5. **Classified by what the learner produces**, not by what the designer calls
   it. If the required response is a defensible choice, it is a judgement,
   however the screen presents it.
6. **Real data before any definition.** Superstore rows inside two minutes.
7. **The investigation runs through.** One branch investigation opens in session
   1.1 and is added to in every module. It is not a capstone bolted to the end.
8. **Nothing needs installing.** Browser only. The SQL console exists; there is
   no Python runtime, and Python is not in Phase One.

---

## 3. The shape

Six modules, thirty-four sessions, about fourteen hours.

| № | Module | Sessions | Ratio | The module's question |
|---|---|---:|---|---|
| 1 | What one row is | 4 | 3:1 | What is this data actually about? |
| 2 | What a value is | 4 | 3:1 | What does this number mean, and what may I do with it? |
| 3 | Ratios, comparisons, and what summaries hide | 8 | 2:1 | What did I lose when I summarised? |
| 4 | Asking the data yourself | 7 | 2:1 | How do I get the answer, and what did I actually ask? |
| 5 | Is this real, and should I believe it? | 6 | 1:1 | Should I believe this? |
| 6 | Saying it honestly | 5 | 1:1 | What can I honestly claim? |

Module 3 is the largest because ratios were restored to it on review, and
because it is the module where a beginner acquires most of the portable rules
they will use outside the course.

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

### Module 3 · Ratios, comparisons, and what summaries hide · 2:1

**3.1 Part of what?**
Denominators. Restored to Phase One on the reviewer's argument, and accepted
without reservation: a beginner cannot read a conversion rate, a growth figure
or a difference between branches without this, and 3.8 is unteachable without it.
> *A percentage means nothing until you know what it is a percentage of.*

**3.2 The same percentage, different consequences**
Scale. The same proportion of two very different bases.
> *Twelve per cent of fifty and twelve per cent of fifty thousand are not the same problem.*

**3.3 Change compared with what?**
Baselines and periods, and measuring the same way at both ends.
> *Improvement needs a starting point, a period, and the same measurement at both ends.*

**3.4 Look at the shape first**
Two branches with the same mean and nothing else in common.
> *Two very different sets of numbers can have the same average.*

**3.5 Centre is a choice**
Mean, median, mode, and the one basket that moves only one of them.
> *One large basket moves the mean and leaves the median where it was.*

**3.6 How far apart are they?**
Range, quartiles, spread.
> *Two branches with the same average can be nothing alike.*

**3.7 The strangest row**
Recognition only. The learner finds the row and is not yet asked what it means.
The question is left open on purpose and returns in 5.5.
> *One row sits a long way from the others, and noticing it is not the same as explaining it.*

**3.8 The total that improved while everything got worse**
Simpson's paradox, taught with branch data and no machinery. Depends on 3.1:
without denominators it reads as a trick rather than as arithmetic.
> *A total can go up while every group inside it goes down.*

### Module 4 · Asking the data yourself · 2:1

The module opens by reading, not writing. A blank console is the most
intimidating object in the course, so nobody meets one until 4.3.

**4.1 Read a query like a sentence**
A prewritten query with its columns and its source table highlighted. The
learner changes one filter from a controlled choice and watches which result
rows disappear. No typing.
> *A query names the columns it wants and the table it wants them from.*

**4.2 A question, written down**
Two prewritten queries, a row count and a distinct-sale count, and the learner
matches each result to what it counts.
> *The answer to a query is a table too, and it has its own grain.*

**4.3 Choosing rows**
`WHERE`, and what filtering does and does not change.
> *Filtering changes who is in the answer, not what the answer means.*

**4.4 Grouping moves the grain**
`GROUP BY`, and filtering twice at two different grains.
> *After grouping, one row is one group, and the count counts groups.*

**4.5 The join that doubled the money**
4,312 rows becoming 11,983, and a total that doubles.
> *A join can change what one row means, and then every sum is wrong.*

**4.6 Three checks before you believe it**
The habit that catches the previous four.
> *Every result needs checking before it leaves your screen.*

**4.7 Where did this number come from?**
Lineage in its beginner form, kept on review because it serves the exit claim
more directly than almost anything else in the course. Not the professional
treatment, which waits.
> *If I cannot trace a number back to its rows, I cannot check it.*

### Module 5 · Is this real, and should I believe it? · 1:1

**5.1 Moving together is not causing**
Correlation, and what it does not license.
> *Two things moving together may share a cause, run the other way, or be coincidence.*

**5.2 What else changed?**
Confounding, concretely, with no equations.
> *Busy stores get more staff, so more staff does not prove more sales.*

**5.3 Is this difference unusual?**
Noise against signal, without the machinery of testing.
> *A gap this small could easily be an ordinary week.*

**5.4 Who is in the data?**
Coverage without formal sampling. Kept on review, in the one form a beginner
can act on immediately.
> *The loyalty-card table describes loyalty-card customers, not every customer.*

**5.5 The strangest row, explained**
The row from 3.7, returned to with two modules of judgement behind it.
> *The strangest row is a mistake, a rare truth, or the thing you were looking for.*

**5.6 What would change your mind?**
The argument you make when you cannot run an experiment, phrased as something
the learner can answer rather than contemplate.
> *If I cannot test it, I can still say what would make me abandon it.*

### Module 6 · Saying it honestly · 1:1

**6.1 A table someone can read**
Kept on review. Charts do not replace tables in operational work, and a table
sent to somebody who was not in the room is the commonest artefact in the job.
> *A table has to survive being sent to somebody who was not in the room.*

**6.2 The axis decides what they see**
Charts that mislead by scale, baseline and ordering.
> *A chart makes its argument before anybody reads the numbers.*

**6.3 Finding, meaning, recommendation**
Three statements with three different burdens of proof.
> *What I found, what I think it means, and what I suggest are three different claims.*

**6.4 The machine's answer**
The session that only exists because of when it is being taught. A tool returns
a confident figure with a fluent explanation, and the figure is wrong for a
reason the learner has already met: the grain moved in a join. It stays at the
end. Opening the course with it would front-load abstraction and anxiety before
the learner has met ordinary data.
> *A confident answer is a claim, and a claim can be checked.*

**6.5 Work somebody else can run**
> *If they cannot get my number without me, it is not yet a result.*

---

## 5. The investigation that runs through

One thread, opened in 1.1 and never closed until 6.5. Each module adds a stage
to a piece of work the learner already owns.

| After | The learner has | The thread left open |
|---|---|---|
| Module 1 | A branch's morning, and what one row of it is | The same receipt ID appears at a second branch |
| Module 2 | Every column classified, gaps found | Two columns disagree about the same sale |
| Module 3 | The branch summarised honestly, and one very strange row | Nobody has said yet what that row means |
| Module 4 | The figures queried rather than eyeballed | A join has quietly changed the total |
| Module 5 | A claim about why, its limits, and the strange row explained | A tempting explanation that does not survive |
| Module 6 | A defensible half-page a manager could act on | (closed) |

The loose thread at the end of each session is a question, never a streak or a
badge. The one that closes module 1 is the reviewer's: the same receipt
identifier at two branches, and whether receipt ID alone identifies a sale. The
one that closes module 3 is the unexplained row, which is the longest thread in
the course and the only one that spans two modules by design.

---

## 6. What exists today

Of the thirty-four, twenty-one have a first draft somewhere in the 35 live
sessions, and none is written to these rules.

| State | Count | Notes |
|---|---:|---|
| Drafted, carried forward as a rewrite | 21 | Every one needs rebuilding to length and to the beat shape in §8 |
| Not written | 13 | 1.3, 2.2, 3.2, 3.7, 3.8, 4.1, 4.3, 5.1, 5.2, 5.3, 5.5, 5.6, 6.4 |
| Live sessions retiring | 14 | Each named with a reason in `LEAVES_PHASE_ONE` |
| Figures approved and usable | 3 | `outlier-pull` in 3.5, `grain-collapse` in 4.4, `join-fanout` in 4.5 |
| Figures approved but off Phase One | 2 | `base-rate`, `sampling-spread`, both probability |

No live session currently runs to twenty-five minutes. The reading is five to
seven minutes and the mission about five. **A rewrite is a rebuild, not a
polish.** Reaching the session length in §2 rule 3 is a build problem as much as
a writing one, and calling twenty-one of these easy wins would be wrong.

---

## 7. The three release gates

Every session is rejected unless it passes all three. These are permanent, they
apply to rewrites and to new sessions equally, and passing a build is not one of
them.

### Engaging

- Real Superstore evidence on screen inside two minutes.
- The learner acts early rather than reading for several minutes first.
- Their choice visibly changes or explains something.
- The session contains a question, a surprise, or an unresolved thread.
- Engagement comes from curiosity and consequence. Not badges, not streaks, and
  not manufactured failure.

### Built from small steps

- One durable claim per session.
- Six to nine short beats rather than one long explanation.
- Each step depends on something the learner already understands.
- At least one task retrieves an earlier idea.
- The final task transfers the idea to a different case.
- Modules culminate in a larger investigation rather than merely stopping.

### Non-intimidating

- No unexplained terminology.
- No blank coding console.
- No wall of instructions.
- Wrong answers get a specific explanation, not a red failure message.
- The learner can retry without penalty.
- Complexity appears only when it becomes useful.
- The interface never treats speed as ability.

---

## 8. What twenty-five minutes is made of

One idea does not mean one explanation. It means several small experiences
around a single claim.

| № | Beat | What the learner does |
|---:|---|---|
| 1 | Notice | Something in real rows that does not fit |
| 2 | Choose | A small decision, with consequences they cannot yet predict |
| 3 | See | The consequence of that choice, on the same data |
| 4 | Learn | The explanation, arriving after the experience rather than before |
| 5 | Vary | The same idea, one variable changed |
| 6 | Transfer | A new example, different surface, same idea |
| 7 | State | The rule, in the learner's own words |
| 8 | Open | An unresolved next case |

Worked example, 2.3 *Four what?*: inspect quantities, prices, weights, durations
and rates; find the ones missing a unit; correct a report that misleads because
of it; apply the rule to a branch not yet seen. One durable idea, varied
activity, no second concept added as padding.

---

## 9. Build order

Three prototypes before the other thirty-one, chosen to test three different
risks rather than three sessions.

| Order | Session | The risk it tests |
|---:|---|---|
| 1 | **1.1** Twelve rows, seven sales | Onboarding and engagement, on the session everybody meets |
| 2 | **2.3** Four what? | Whether a seemingly thin idea sustains twenty-five minutes |
| 3 | **5.2** What else changed? | Whether judgement-heavy design stays friendly and concrete |

Only after those three pass learner testing does module 1 get completed and the
rest of the queue begin. Building sixteen rewrites to an untested format was the
plan before this review, and it was the wrong plan.

---

## 10. Provenance

Settled over four rounds between Qubix and an external reviewer, from an
initial 150-topic map.

**Adopted from the reviewer.** The tapering ratio, replacing a flat three-to-one
across the whole course. Classification by what the learner must produce rather
than by what the screen shows. One durable idea per session, which is the single
most useful correction either side made. Asking for both quantities rather than
manufacturing a wrong answer. Prewritten queries before written ones, and then
in round four a whole reading session before any of them. A loose thread that
stays on the session's own subject. Restoring concrete causal caution and
concrete Simpson's paradox to the beginner volume. In round four: restoring
ratios as a module rather than a retirement, keeping coverage and lineage in
beginner form, keeping a readable table as a session, splitting the outlier
across two modules so the same row returns, retitling module 5 as questions, and
replacing a plan to build sixteen rewrites with a plan to build three prototypes.

**Adopted from us.** SQL before Python, and Python out of Phase One entirely.
Real data before any definition. The project running through rather than a
capstone at the end. Concrete descriptions that state something true rather than
learning objectives. Deferring probability, inference and modelling.

**Errors we made and the reviewer caught.** A fifteen-minutes-per-topic figure
we invented and attributed. A recognition-to-judgement count we stated as 8:3
when our own table read 7:3, and which by a stricter classification was nearer
1.5:1: we failed our own constraint and misreported it. A first session carrying
nine concepts and calling it one lesson. Retiring ratios, which would have left
3.8 as a conjuring trick and left a beginner unable to read a percentage.

**Still open.** Whether Phase One nests inside the 379-topic catalogue as its
phases 3 and 4, or replaces that structure. Recorded in
`curriculum/10-SEQUENCE-RECONCILIATION.md` and not settled here. Also open:
`ch02.04`, table to rule to graph, which is retiring for want of a ruling rather
than for a reason.

---

## Amendment history

- 2026-08-30 — Created after three rounds of external review. `AI_DRAFT`.
  Nothing approved, nothing built, no live session changed.
- 2026-08-30 — Round four. Twenty-six sessions to thirty-four. Ratios restored
  as module 3, a SQL reading bridge added at 4.1, coverage and lineage kept, the
  outlier split across 3.7 and 5.5, module 5 retitled, the three release gates
  and the beat shape written down, and the build order replaced with three
  prototypes. Still `AI_DRAFT`. Nothing approved.
