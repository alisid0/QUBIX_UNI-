# Data Science Reference Alignment

Status: **AI_DRAFT · founder review required**  
Recorded: 2026-08-27  
Purpose: make the Qubix pathway traceable against recognised data-science,
statistics, visualisation, machine-learning and career references.

This is a coverage audit, not permission to reproduce a book. A reference may
shape sequencing, terminology or a quality check without supplying Qubix prose,
examples, diagrams or exercises. Every learner-facing item still needs its own
source and licence record.

## Why this audit was needed

The current seven-part Shared Foundations volume was organised around Superstore
missions. Its individual sessions are coherent, but its contents page does not
show the full intellectual route found in established data-science texts. Some
topics are present under weak labels, while many others were placed in future
roadmap stages without an explicit bridge from the current volume.

As a result, a learner can see SQL, Python and “statistics before models” but
cannot yet see a credible route through inference, linear algebra, exploratory
analysis, model evaluation, core algorithms, visual reasoning, projects and
career practice.

## Reference roles and reuse boundary

| Reference | What Qubix should learn from it | Reuse boundary |
|---|---|---|
| Joel Grus, *Data Science from Scratch*, 2e | End-to-end breadth; Python-to-maths-to-models sequence; implementing ideas to understand them | Commercial publication. Use its public contents as a coverage check. Do not copy explanations, code, examples or exercises. |
| Allen B. Downey, *Think Stats*, 3e | Empirical distributions first; statistics through computation; cumulative examples | Text is CC BY-NC-SA 4.0. Non-commercial and ShareAlike terms require an explicit product/licence decision before adapting passages. Until then, use it only as a structural comparator and cite independently sourced facts. |
| Alberto Cairo, *The Functional Art* | Visualisation as a functional tool; presentation versus exploration; cognition and communication | Commercial publication. Use high-level principles as a review lens; create original Qubix visuals and wording. |
| Andriy Burkov, *The Hundred-Page Machine Learning Book* | Compact ML concept spine; notation; supervised/unsupervised distinction; essential algorithms | No open-content licence is recorded here. Use the public contents as a coverage check only. |
| Aurélien Géron, *Hands-On Machine Learning*, 3e | Project workflow; train/validation/test discipline; preprocessing, evaluation and deployment | Commercial publication. Do not copy prose, notebooks, diagrams or exercises. Rebuild examples from the synthetic Superstore. |
| Emily Robinson and Jacqueline Nolis, *Build a Career in Data Science* | Role diversity, skill acquisition, project lifecycle, communication, interviews and career progression | Commercial publication. Use as a career-path checklist; write original Qubix scenarios and advice. |
| OpenStax, *Introductory Statistics*, 2e | Definitions and conventional introductory statistics sequence | CC BY 4.0. May be adapted with attribution and a passage-level record. |
| OpenIntro, *Introduction to Modern Statistics*, 2e | Modern data, simulation and inference sequence | CC BY-SA 3.0. Adaptation requires attribution and ShareAlike compliance; confirm product implications first. |

## Coverage crosswalk

`Present` means a learner can find and practise the topic now. `Partial` means
the idea appears but is too shallow, poorly named or lacks a complete exercise.
`Absent` means no visible read-to-practice route exists.

| Knowledge area | Current Qubix | Reference signal | Decision |
|---|---|---|---|
| What data represents; observations, variables and grain | Present | Think Stats; Data Science from Scratch | Keep and strengthen Chapter 1. |
| Data types and measurement scales | Present after 2026-08-27 revision | Think Stats; introductory statistics texts | Keep the new explicit read point and classification mission. |
| Data-science problem framing and lifecycle | Absent | Hands-On ML; Build a Career in Data Science | Add before tool-specific chapters: question → evidence → method → decision → communication → monitoring. |
| Frequency tables, empirical distributions and percentiles | Partial | Think Stats; OpenStax/OpenIntro | Expand before formal inference. Current histogram work is not a complete distribution sequence. |
| Centre, spread, outliers and robust summaries | Partial | Think Stats; Data Science from Scratch | Add variance, standard deviation, quantiles and IQR, with choice-by-shape practice. |
| Visual perception and chart purpose | Partial | The Functional Art | Expand beyond “do not mislead”: comparison, distribution, relationship, change, hierarchy, annotation and exploratory versus explanatory views. |
| Probability foundations | Partial | Think Stats; Data Science from Scratch; Hundred-Page ML | Add sample spaces, independence, conditional probability, Bayes, random variables and common distributions. |
| Statistical inference | Absent | Think Stats; OpenIntro; Data Science from Scratch | Add sampling distributions, standard error, confidence intervals, tests, power, effect size, practical significance and A/B testing. |
| Correlation, confounding and causal caution | Partial | Think Stats; Data Science from Scratch | Add Simpson’s paradox, controlled comparison and explicit observational-versus-experimental reasoning. |
| Linear algebra | Absent | Data Science from Scratch; Hundred-Page ML | Add vectors, matrices, dot products, transformations and geometric meaning before ML optimisation. |
| Calculus and optimisation for ML | Planned elsewhere, not connected | Data Science from Scratch; Hundred-Page ML | Connect the existing functions/rates work to derivatives, gradients, loss and gradient descent. |
| Python language basics | Partial | Data Science from Scratch | Expand types, collections, iteration, functions, tests and debugging; keep it subordinate to data questions. |
| NumPy, pandas, notebooks and reproducibility | Absent | Data Science from Scratch; Hands-On ML | Add a real, runnable data-work layer rather than screenshots or multiple-choice simulation. |
| Data acquisition, cleaning and exploratory analysis | Partial | Data Science from Scratch; Hands-On ML | Add import, parsing, reshaping, duplicate handling, validation, one/two/many-variable EDA and leakage-safe preparation. |
| SQL and relational reasoning | Partial | Data Science from Scratch | Current grain-first approach is strong; add real querying, subqueries, windows, temporal joins, indexes and query plans later. |
| ML problem types and vocabulary | Absent | Hundred-Page ML; Hands-On ML | Add supervised, unsupervised, regression, classification, clustering, features, labels, parameters and hyperparameters. |
| Model evaluation and generalisation | Absent | Hundred-Page ML; Hands-On ML; Data Science from Scratch | Add baselines, train/validation/test, cross-validation, over/underfitting, bias/variance and task-appropriate metrics before algorithms. |
| Core algorithms | Absent | All three ML references | Add linear/logistic regression, k-NN, trees, ensembles, clustering and dimensionality reduction in dependency order. |
| Feature engineering and preprocessing | Absent | Hands-On ML | Add scaling, encoding, missingness strategy, pipelines and leakage checks. |
| Neural networks and deep learning | Future label only | Data Science from Scratch; Hands-On ML | Defer until probability, linear algebra, optimisation and model evaluation are secure. |
| Ethics, fairness, privacy and interpretability | Almost absent | Data Science from Scratch; Hands-On ML | Make these longitudinal checks in every project, not a final optional chapter. |
| End-to-end projects and portfolio evidence | Absent | Hands-On ML; Build a Career in Data Science | Introduce projects before advanced ML; require a question, reproducible work, recommendation, limitations and stakeholder handoff. |
| Careers, roles, teamwork and communication | Partial | Build a Career in Data Science | Connect Superstore roles to skills, artefacts, feedback, interviews and realistic career progression. |
| Deployment, monitoring and model operations | Absent | Hands-On ML | Add after model evaluation; cover data drift, performance drift, retraining, rollback and human review. |

## Corrected pathway

The visible route should be explicit and cumulative:

1. **Data and decisions** — representation, observations, variables, types,
   grain, quality, provenance and the data-science lifecycle.
2. **Describe what happened** — tables, distributions, visual encoding, centre,
   spread, relationships and honest communication.
3. **Reason under uncertainty** — probability, sampling, estimation, confidence,
   testing, effect size and causal caution.
4. **Work with data** — Python, SQL, files, notebooks, cleaning, EDA,
   reproducibility and testing.
5. **Mathematics for models** — vectors, matrices, functions, derivatives,
   gradients and optimisation.
6. **Learn from examples** — ML framing, splits, baselines, regression,
   classification, trees, ensembles, clustering, reduction and evaluation.
7. **Build responsibly** — feature pipelines, interpretability, fairness,
   privacy, deployment, monitoring and human decisions.
8. **Become employable** — cumulative Superstore projects, portfolio artefacts,
   role exploration, stakeholder communication and career preparation.

## Next gaps to draft, in prerequisite order

These are proposals for founder selection. They are not approved curriculum.

| Priority | Proposed read point | Why it comes next | Applied Superstore move |
|---:|---|---|---|
| 1 | From a question to a decision | Gives the whole course a visible lifecycle and prevents tools becoming the curriculum | Turn “Why are queues longer?” into a decision, evidence plan and success measure |
| 2 | Frequency tables and empirical distributions | Bridges data types to histograms, percentiles and later probability | Build and read the distribution of basket sizes |
| 3 | Quantiles, variance, standard deviation and IQR | Completes the currently compressed centre-and-spread material | Choose a summary for skewed checkout waits |
| 4 | What a chart is for | Introduces visual function before chart selection | Redesign one operational chart for exploration and one for a board briefing |
| 5 | Conditional probability and Bayes’ rule | Repairs the current one-session probability treatment | Interpret a late-delivery alert using a two-way table |
| 6 | Sampling distributions and standard error | Establishes why estimates vary before confidence intervals or tests | Compare weekly complaint-rate estimates from different sample sizes |
| 7 | Confidence intervals, tests and practical significance | Completes the inference bridge required by ML evaluation and experiments | Evaluate a checkout intervention without treating a p-value as a decision |
| 8 | Correlation, confounding and Simpson’s paradox | Prevents predictive patterns being mistaken for causes | Explain why self-checkout appears slower until basket size is considered |
| 9 | A real notebook and dataframe workflow | Makes Python a data tool rather than a syntax quiz | Load, inspect, clean and validate a Superstore extract |
| 10 | ML problem framing and a baseline | Begins ML with evaluation discipline, not algorithms | Define a late-delivery classifier and beat a simple baseline without leakage |

## Founder decision required

- [ ] Accept this reference set as the curriculum coverage panel.
- [ ] Amend the references or their assigned roles.
- [ ] Draft Priority 1, **From a question to a decision**, as the next approval sample.
- [ ] Choose another proposed read point first.

