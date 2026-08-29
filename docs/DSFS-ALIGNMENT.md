# Aligning Volume 0 with *Data Science from Scratch*

Status: working map, not a commitment. Nothing here is approved curriculum.
Last updated: 2026-08-27

Joel Grus's *Data Science from Scratch* (O'Reilly, 2nd edition) is the reference
we are aligning the topic progression to. What is borrowed is the **order the
ideas arrive in**, which is the book's real contribution: probability before
inference, inference before models, linear algebra before anything that needs a
gradient.

Nothing else is borrowed. Every session in Qubix is written from scratch, set in
the Superstore, and cites its own open sources. The book teaches by implementing
things in Python; Qubix teaches by making a learner query and defend figures from
a fictional supermarket. Where DSFS would build a function, Qubix builds a
mission.

---

## What Volume 0 covers today

| Qubix chapter | Sessions | Nearest DSFS chapters |
|---|---:|---|
| 1 · How Data Represents the World | 4 | 1, 10 (working with data) |
| 2 · Numbers, Ratios and Change | 4 | 5 (statistics, descriptive half) |
| 3 · Quality and Evidence | 4 | 9, 10 (getting and cleaning data) |
| 4 · Statistics Before Models | 4 | 5 |
| 5 · SQL Foundations | 4 | 24 (databases and SQL) |
| 6 · Python Foundations | 4 | 2 (crash course in Python) |
| 7 · Explain What You Found | 7 | 3 (visualizing data), 26 (ethics) |
| **8 · Chance and Inference** | **4** | **6 (probability), 7 (hypothesis and inference)** |

Chapter 8 is new. It is the first chapter written deliberately against the
book's ordering rather than arrived at independently.

---

## Chapter 8, session by session

| Session | DSFS topic | The Superstore case it is taught through |
|---|---|---|
| 01 · A probability is a proportion of something named | 6 — probability, independence | Cash payment: 0.19 across the chain, 0.25 at staffed tills, 0.00 at self-service |
| 02 · What you already know changes the number | 6 — conditional probability, Bayes | A 95% accurate cold-chain alarm of which 9% of alarms are real |
| 03 · What a sample can and cannot say | 7 — sampling, confidence intervals | Competitor price checks, where two thirds of branch-weeks were never walked |
| 04 · Different, or different this week? | 7 — hypothesis testing, p-values | Self-service against staffed scan speed, and a two-pence basket difference on 850,000 sales |

The chapter's applied exercise is a reading test rather than a calculation.
Every mistake it exists to prevent is a sentence somebody says out loud and
nobody queries: inverting a conditional, forgetting the base rate, reading a
p-value as a probability of being wrong, and treating *significant* as
*important*. None of those are arithmetic errors, so an arithmetic exercise
would not catch any of them.

---

## What DSFS covers that Volume 0 still does not

Ordered by how much the rest of the curriculum depends on them.

| DSFS chapter | Topic | Why it matters here | Proposed home |
|---|---|---|---|
| 4 | Linear Algebra | Vectors and matrices are the vocabulary every later model is written in | Volume 1 |
| 11 | Machine Learning | Overfitting, train/test split, the bias-variance trade | Volume 1 |
| 8 | Gradient Descent | The one optimisation idea the rest reuse | Volume 1 |
| 9 | Getting Data | Files, APIs, encodings, rate limits | Volume 3 (The Toolkit) |
| 10 | Working with Data | Rescaling, dimensionality, exploration | Volume 2 (Evidence) |
| 12-19 | kNN, Naive Bayes, regression, trees, networks | The models themselves | Volumes 1-2 |
| 20-23 | Clustering, NLP, network analysis, recommenders | Applications | Later volumes |
| 25 | MapReduce | Largely of historical interest now | Probably skip |
| 26 | Data Ethics | Partly in chapter 7; deserves its own chapter | Volume 0, chapter 9 |

Three of these are worth arguing about rather than scheduling:

**Linear algebra before or after models.** DSFS puts it fourth, before anything
uses it. That is honest and it is also where a lot of readers stop. An
alternative is to introduce vectors at the point a model needs them, which
trades tidiness for momentum.

**MapReduce.** The book's chapter 25 is a period piece. The underlying idea,
splitting work and combining results, is better taught through the Superstore's
own depot-to-branch aggregation than through a word count.

**Ethics last or throughout.** DSFS ends with it. Qubix already threads it
through chapter 7 and through every mission that asks what a figure is allowed
to claim. A dedicated chapter 9 would collect that rather than introduce it.

---

## What we deliberately do differently

**Probability is taught through a shop, not through coins.** A coin is
independent, fair and memoryless, which is exactly what makes it a bad first
example: nothing a learner will ever meet at work behaves like that. Cash
payment and till kind are not independent, and the dependence is structural
rather than statistical, which is the more common case.

**Inference arrives before models rather than beside them.** The most expensive
mistakes in commercial analysis are not modelling errors, they are claims made
from samples that could not support them. Chapter 8 sits immediately after the
descriptive statistics chapter and before any volume that fits anything.

**Every quoted figure is checked against the data.** `check-chance-figures.mjs`
recomputes chapter 8's example table from the sample database on every build.
This is not pedantry: the chapter was first drafted with invented figures and
every one of them was wrong, in a way a learner could have caught in the data
console two clicks away.

---

## Sources

Volume 0 cites open, reusable material rather than the book: OpenStax
Introductory Statistics (CC BY 4.0), the NIST/SEMATECH e-Handbook (US Government
work), ONS methodology (Open Government Licence) and the PostgreSQL manual.
*Data Science from Scratch* informs the sequence and is not quoted.
