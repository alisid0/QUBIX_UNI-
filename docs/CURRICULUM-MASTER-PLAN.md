# Teaching from the Superstore

Status: proposal for founder direction. Nothing here is approved curriculum.
Last updated: 2026-08-27

A fictional supermarket group of 54 tables and 7.7 million rows now exists, is
deterministic, and is guarded by 86 assertions. Nothing in the product touches
it. This is the plan for what to build on it, in what order, and what has to be
true before any of it is possible.

Counts in this document were read out of the repository rather than remembered:
7 chapters, 28 sessions, 16 rehearsals of 28, 16 missions, 36 views, 54 tables,
7.7M rows, 86 dataset assertions, 53 files marked `AI_DRAFT`.

---

## 1. Every idea below is blocked on a single build

There is no SQL engine in the dependency list, no data module, and no route that
loads a CSV. The SQL Console is a multiple-choice quiz over twelve hardcoded
rows. Every mission hardcodes its own small table.

A dataset the product cannot query is a dataset the product does not have.

Until this is solved, none of the sixteen missions, five projects or six volumes
below can be built. It is not the most interesting work here. It is the only
work that unlocks the rest.

**Phase 1a — ship the sample as a queryable asset.** `data-sample/` is already
6.5 MB of all 54 tables, committed, and covers the week the lessons teach from.
Serve it from `public/` (this is Svelte + Vite, so the static directory is
`public/` and not SvelteKit's `static/`) and load it into **sql.js**: a 1.5 MB
WASM build that handles this size comfortably. DuckDB-WASM is the better engine
for the full quarter but ships around 30 MB; start with sql.js and revisit when
a mission genuinely needs 4.7 million rows in the browser.

**Phase 1b — make quoted figures derive rather than drift.** Every number a
lesson states about the world should be computed from the data at build time,
not typed, with a guard that fails the build when prose and data disagree. This
is the same discipline that caught four faults in the generator. Hand-kept
numbers drift silently, and this project has proved that twice.

---

## 2. What the data makes teachable that a clean table cannot

Each row is a fault built in on purpose, and the lesson it is the only honest
way to teach. A tidied dataset teaches that data is tidy.

| In the data | The lesson it makes possible | Tables |
|---|---|---|
| Three hierarchies over 48 branches, none nesting | A dimension has to be defined before it can be aggregated. "By region" is two numbers and neither is wrong. | `branch` `district` `county` `region` `price_zone` |
| Every product carries five prices | A fact needs a grain. "The price" is not a question with one answer. | `zone_price` `product` `branch` |
| Quotes in ten currencies, four incoterms | Comparability before comparison. The cheapest supplier cannot be found by sorting a column. | `supplier_quote` `fx_rate` `incoterm` `tariff` |
| No exchange rate published at weekends | Last-value-carried-forward, and the silent row loss an inner join causes. | `fx_rate` `purchase_order` |
| Three tariffs changed mid-quarter | As-of joins and slowly-changing dimensions. Duty depends on when goods moved, not when you ran the query. | `tariff` `shipment` |
| 480 elasticity estimates fitted on under 50 observations | Sample size, standard error, and refusing to act on noise dressed in the same decimal places as signal. | `price_elasticity` |
| Competitor prices are a weekly hand-collected sample | A missing visit is not a matched price. Sampling frames, and absence that reads as agreement. | `competitor_price_check` `competitor` |
| An acquired estate on its own keys, 80% crosswalked | Entity resolution, many-to-one joins, double counting, and what you can honestly report about a merged group. | `meridian_store` `product_crosswalk` |
| `quantity` means a count or a weight depending on `uom` | Units, and why `SUM(quantity)` over a basket is meaningless with nothing stopping you running it. | `sale_line` `product` |
| Three timestamps on every sale plus an item count | Rates with real denominators, distributions, and confounding: self-service looks slower until you control for basket size. | `sale` `till` |
| 2.5% of stock counts blank, never zero | The four kinds of absence, and why the cell does not tell you which one it is. | `inventory_snapshot` |
| A third of waste filed as "other" | Incentives shape data at the point of capture. Fixing it in analysis is fixing the wrong thing. | `waste` |
| 210 of 855 production runs do not reconcile | Reconciliation, tolerance, and separating a real discrepancy from rounding. | `production_run` `factory` |
| Commodity indices published ten days after the month | Lagged causality and lineage across levels: why a cost rose in May because of something in February. | `commodity_index` `supplier_quote` |
| Make-or-buy cases with a recommendation but no decision | A model output is not a fact, and a recommendation is not a decision. | `make_or_buy` `bill_of_materials` |

---

## 3. Seven kinds of material, five of which exist

Naming the formats keeps the plan honest about cost. A mission is not a
rehearsal with more words; it is roughly ten times the work.

| Type | What it is | Cost | State |
|---|---|---|---|
| Read | A book session: sections, paragraphs, one worked example table. 5-20 minutes. | ~800 words | 28 written |
| Rehearse | A structured case inside the reader that decides the answer before the mission runs it. | ~40 lines | 16 of 28 |
| Figure | A deterministic SVG computed from data. Never a raster, never generated text. | ~60 lines | 5 kinds |
| Mission | A set-piece with its own view, state and scoring. | ~1-3 days | 16 live |
| Lab | *New.* A free console over real tables with a goal and a checker, not a scripted path. | needs Phase 1 | none |
| Case file | *New.* An investigation where the obvious answer is wrong and the data says why. | ~1 day each | none |
| Project | *New.* Multi-session, open-ended, produces an artefact a person could defend. | ~1 week each | none |

---

## 4. The slate: sixteen new missions

Each exists because a specific fault was built into the data. None could be
written honestly against a tidy table, and none can be built before Phase 1.

| Mission | Premise | Teaches | Tables |
|---|---|---|---|
| **The Region That Wasn't** | Two colleagues report sales by region and get different totals. Both queries are correct. | Define the dimension before you aggregate | `branch` `district` `county` `region` |
| **What Does It Cost?** | A simple request: the price of QX-CER-001. There are five answers, and £2.68 and £3.25 are both right. | A fact without a grain is not a fact | `zone_price` `price_zone` `branch` |
| **The Cheapest Supplier** | Four quotes for the same product, in four currencies, on four incoterms. Rank them. | Normalise before you compare | `supplier_quote` `fx_rate` `tariff` `freight_lane` |
| **Saturday's Order** | A purchase order raised on a Saturday vanishes from the report. It was never cancelled. | Inner joins delete rows silently | `purchase_order` `fx_rate` |
| **The Rate That Changed** | Duty on cocoa from Ashanti Coast changed mid-quarter. Value an April shipment correctly. | As-of joins and validity windows | `tariff` `shipment` `commodity` |
| **Nine Observations** | Two elasticity estimates, identical formatting. One was fitted on nine rows. Which do you price on? | Sample size and standard error | `price_elasticity` |
| **Nobody Went to Bergstrom** | The price-match report says 94% matched. Two thirds of the branch-weeks were never visited. | Absent is not equal | `competitor_price_check` `branch` |
| **The Merger** | Report group sales including Meridian. The crosswalk is 80% complete and not one to one. | Entity resolution and honest caveats | `product_crosswalk` `meridian_daily_sales` |
| **SUM(quantity)** | A basket report totals 41 items. Six of them were 0.734 kg of cheese. | Units, and aggregations that are not valid | `sale_line` `product` |
| **The Queue** | Self-service is twice as slow per item. Prove it, then find out whether that is the whole story. | Rates, denominators, confounding | `sale` `till` |
| **Where Did the Units Go?** | 210 production runs do not reconcile. Most of the gap is rounding. Some of it is not. | Reconciliation and tolerance | `production_run` `factory` |
| **Other** | A third of everything thrown away has no reason code. You cannot fix that in SQL. | Data quality begins at capture | `waste` `markdown` |
| **Markdown Night** | Reduce it at four or bin it at nine. The data shows what happened, not what would have. | Counterfactuals and sunk cost | `markdown` `waste` `sale_line` |
| **Why Did Our Cost Go Up?** | A supplier raised a price in May. The reason is a commodity index published in February. | Lag, lineage, and causal chains | `commodity_index` `supplier_quote` `price_history` |
| **The Flagship Is Not the Chain** | Northgate takes twelve times Riverside's trade. Every per-branch comparison needs fixing first. | Denominators and fair comparison | `branch` `sale` `footfall` |
| **Make or Buy** | The model recommends "make" on 48 of 76 cases. Twenty-eight have no decision. One of them is wrong. | Model output is not a decision | `make_or_buy` `bill_of_materials` `factory` |

---

## 5. Five projects

A mission has a right answer. A project has a recommendation, a stated
uncertainty, and a reader who will push back. This is where the course stops
being exercises.

**The Quarterly Trading Pack.** Build the eight pages a board actually reads:
trade by format, like-for-like, basket composition, availability, waste. Every
figure has to survive the question "by which region".
*Assesses: aggregation, grain discipline, honest visual encoding, separating
findings from opinions.*

**The Pricing Review.** Recommend zone price changes on twenty KVI lines. Use
elasticity where it is trustworthy, competitor checks where they exist, and say
plainly where you had neither.
*Assesses: reading uncertainty, sampling gaps, refusing to act on thin
estimates, defending a number.*

**The Sourcing Tender.** Award ten products to suppliers on landed cost:
ex-works, converted, plus freight, plus duty at the rate that applied. Include
lead time and OTIF, not just price.
*Assesses: multi-table joins, currency and temporal correctness, weighing
criteria that conflict.*

**The Make-or-Buy Case.** Take one own-label product from bill of materials to
breakeven volume, with capex, payback and a sensitivity on the commodity that
dominates it. Recommend, and state what would change your mind.
*Assesses: cost modelling, sensitivity analysis, separating model output from
decision.*

**The Data Quality Audit.** Find the faults without being told they exist. Rank
them by what they would cost a decision, and propose fixes at the point of
capture rather than in the query.
*Assesses: everything above, plus the judgement to know which problems are worth
raising.*

---

## 6. Six volumes, one world

Volume 0 exists and is written. The rest is proposed. Keeping every volume in
the same supermarket is the point: a learner who reaches procurement in Volume 4
already knows what a branch is.

| Volume | Covers | Missions | State |
|---|---|---|---|
| 0 · Shared Foundations | Records, units, quality, statistics before models, SQL, Python, explaining findings. 7 chapters, 28 sessions. | 16 live | written |
| 1 · The Query Floor | SQL at a size you can feel. Grain, fan-out, window functions, as-of joins, plans that matter at 4.7M rows. | Region · Cost · SUM(quantity) · Queue | proposed |
| 2 · Evidence | Statistics that survive contact with real data: sampling frames, uncertainty, confounding, when not to conclude. | Nine Observations · Bergstrom · Flagship | proposed |
| 3 · The Toolkit | Python for data work: dataframes, reproducible notebooks, testing an analysis. | Reconciliation · Markdown Night | proposed |
| 4 · The Commercial Floor | Pricing, procurement, manufacturing. The decisions the centre and the group make. | Supplier · Saturday · Tariff · Cost · Make-or-Buy | proposed |
| 5 · The Plumbing | Pipelines, lineage, dimensional modelling, data contracts, quality as an invariant. | Merger · Other · Where Did the Units Go? | proposed |
| 6 · Capstones | The five projects, assessed on judgement rather than answers. | — | proposed |

---

## 7. The order this has to happen in

Phases, not dates. Each is gated on the previous, and the gate is real: skipping
Phase 1 means every later phase hardcodes its own table again, which is the
situation this plan exists to end.

### Phase 1 — Reach the data *(blocks everything)*

- Serve `data-sample/` from `public/` and load it into sql.js.
- A `src/lib/data/` module: open the database, run a query, return typed rows.
- Rebuild the SQL Console as a real console over real tables, keeping the twelve
  taught sales as its first exercise.
- A guard that recomputes every figure quoted in content and fails the build on
  disagreement.

Nothing else can start until a learner can run `SELECT` and get a row back.

### Phase 2 — Finish Volume 0 on real data *(retrofit)*

- The 12 sessions with no rehearsal: `ch01.01` `ch02.01` `ch02.04` `ch03.02`
  `ch03.03` `ch04.02` `ch04.04` `ch06.01` `ch06.03` `ch07.01` `ch07.02` `ch07.03`.
- Figures for chapters 01 and 07, which have none.
- Re-source the existing 16 missions from the dataset instead of their own
  hardcoded tables. Six currently invent their own rows; those should become
  extracts.

This is the cheapest quality win available: the course already exists, it just
quotes a world it cannot show you.

### Phase 3 — Volume 1 and the Lab *(new format)*

- Build the Lab shell: a free console with a goal, a checker and a reset,
  reusable across every later volume.
- Missions: The Region That Wasn't · What Does It Cost? · SUM(quantity) · The Queue.

The Lab is the format that makes Volumes 2-5 cheap. Build it once, carefully.

### Phase 4 — Volume 2, Evidence

- Missions: Nine Observations · Nobody Went to Bergstrom · The Flagship Is Not the Chain.
- Introduce the Case File format, where the plausible answer is the wrong one.
- First project: The Quarterly Trading Pack.

### Phase 5 — Volume 4, The Commercial Floor

- Missions: The Cheapest Supplier · Saturday's Order · The Rate That Changed ·
  Why Did Our Cost Go Up? · Make or Buy.
- Projects: The Pricing Review · The Sourcing Tender · The Make-or-Buy Case.

This is the volume no comparable course has, because no comparable course has
the data for it.

### Phase 6 — Volumes 3 and 5

- Python (Volume 3) needs an execution story of its own; the existing Python
  Trace mission is a simulation, not a runtime.
- The Plumbing (Volume 5) can reuse the generator itself as teaching material:
  it is a worked example of building a dataset that does not lie.
- Missions: The Merger · Other · Where Did the Units Go? · Markdown Night.

### Phase 7 — Clear the review gate *(founder only)*

- 53 files carry `AI_DRAFT`. Nothing is approved.
- Only the founder may mark curriculum approved or released. No amount of
  building changes that.
- Review throughput is the real ceiling on this plan and should be planned for
  rather than discovered.

---

## 8. What has to stay true while this is built

- **Technical visuals stay deterministic.** Graphs, formulae, geometry, labels
  and quantities are SVG, canvas, Manim or Three.js. Never generated text or
  exact technical geometry in a raster frame.
- **The data stays seeded.** A dataset that changes under you cannot be taught
  from, and a guard cannot check a figure that moves.
- **Guards are invariants, not tests.** They run in `prebuild` and block the
  deploy. The 86 dataset assertions have already caught four real faults and two
  wrong assumptions.
- **A deliberate fault stays a minority.** Every basket ending on the scales, and
  every production run failing to reconcile, were both caught precisely because
  they were universal. A fault present on every row is not a fault, it is the
  format.
- **The named six branches stay clean.** A worked example is not the place to
  meet an ambiguity, and a guard enforces that the hierarchy drift never touches
  them.
- **Nothing ships as approved.** Production opens in staging mode, and an AI
  draft must never be dressed as a released course.

---

## 9. Where this could go wrong

**The dataset becomes a museum.** It is finished, verified and impressive, and it
stays unused because Phase 1 is plumbing and the missions are the fun part. This
has already happened once: the data has been built twice over and still nothing
reads it. Doing Phase 1 first is the whole plan.

**Sixteen missions is too many to build well.** The existing sixteen took months.
Building the Lab format first means later missions are content rather than
engineering. If the Lab does not land, cut the slate to six and pick the ones no
other course could teach: The Cheapest Supplier, Saturday's Order, Nine
Observations, Nobody Went to Bergstrom, The Merger, Make or Buy.

**The review gate is the actual bottleneck.** 53 files are drafts and none are
approved. A plan that adds sixteen missions and five projects adds a great deal
more to review, by one person who is also building it. Sequencing review into
the phases matters more than sequencing the writing.

---

## Related

- `data/README.md` — every table, every deliberate fault, how to load it
- `data-sample/README.md` — the committed 6.5 MB sample and what it can and cannot show
- `src/lib/game/superstore-world.js` — the canonical world the data derives from
- `docs/REVIEW-PROTOCOL.md` — the gate every item above has to pass
- `docs/PRODUCT-AND-LAUNCH-PLAN.md` — product-level decisions this plan sits under
