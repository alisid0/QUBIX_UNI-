# DSA opening edition

Status: AI_DRAFT. Drafting requested by the founder on 2026-09-05.

## Scope and authority

The founder explicitly requested expansion of the existing introduction and completion of the first few DSA modules, with an emphasis on independent reasoning in a world with AI. This authorises the four-module drafting scope despite the older default of one board at a time. It does not assert that the new text has been read or approved.

The four original approved samples and their digest register remain unchanged. This edition builds on their instructional progression in a separate review surface at `/dsa/course-preview`, available in development or workshop builds. No Academy XP, account progress, roster placement or release status changes. The new edition remains excluded from the normal production route.

## Prerequisites and assessment alignment

| Module | Dependency | Evidence of understanding |
|---|---|---|
| Data structures and algorithms | Read short lists and follow steps | State a contract; distinguish stack/queue behaviour; produce a minimal counterexample |
| Sequences, indexed access and linear search | Module 1; zero-based indexing repair included | Trace duplicates, absence and empty inputs; explain first-match invariant and termination; count comparisons |
| Array insertion and invariants | Module 2 | Shift in the correct direction; preserve values and order; distinguish length/capacity and moves/writes |
| Dynamic arrays and amortised cost | Module 3; addition and doubling | Compare computed policies; derive aggregate cost; distinguish worst-case latency from amortised cost |

Each module contains five explanatory sections, a worked example, an executable model, four feedback-bearing questions, hints, a written reasoning exercise, a self-review guide and delayed-recall work. The final module adds an integrated design-review case. Estimated times are editorial estimates, not measured completion times.

The checkpoint record indicates completed practice, not mastery or accreditation. Written work is explicitly self-reviewed, never classified correct by text length or keyword matching. Progress is device-local and storage failure is reported. Practice traces reset when leaving the experiment; checked answers and reflection notes persist when browser storage is available.

## Originality and concept cross-checks

All added explanations, cases, questions, diagrams and code are original Qubix material written for this edition. No historical passage, source exercise, illustration or wording is adapted. No claim of a historical work's public-domain status is needed or made.

Reference-only concept checks on 2026-09-05:

- Pat Morin, *Open Data Structures*, online Python edition, chapter 2, “Array-Based Lists”: https://opendatastructures.org/ods-python/2_Array_Based_Lists.html . Used to cross-check array access, shifting and aggregate resize costs. Not reproduced or adapted.
- Python Software Foundation, *Python 3.14.7 documentation*, tutorial chapter 5, §§5.1, 5.1.1, 5.1.2: https://docs.python.org/3/tutorial/datastructures.html . Used to cross-check list operations and distinguish stack/queue interfaces from mechanisms. Not reproduced or adapted.

The teaching model uses equal-sized array slots, an append-only workload from capacity 1, and explicit doubling. It counts value copies and new-item writes, excluding allocation and machine overhead. It does not promise Python's actual capacity policy or worst-case real-time behaviour.

## Review focus

Read one module, operate the model with changed inputs, deliberately answer incorrectly, then inspect the reasoning guide. Check whether the five reading sections should be split into shorter sessions after learner testing. Founder approval, public pathway placement and learner release remain undecided. No claim that this is the “greatest” course is made without evidence from learners.
