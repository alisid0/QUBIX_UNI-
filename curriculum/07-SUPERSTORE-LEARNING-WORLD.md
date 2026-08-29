# Qubix Superstore Learning World

Status: **Persistent-world design recorded; first mission is `AI_DRAFT`**  
Founder direction: 2026-08-21  
Current drafting gate: `STAT-DATA-001` only

## Product decision

Data Science, Machine Learning and AI are taught inside one continuous fictional
enterprise rather than through disconnected examples. The learner joins
**Qubix Superstore**, begins as a Pre-Intern Candidate with no assumed technical
or mathematical knowledge, earns the Data Intern position by completing the
prerequisite academy, and then gains access to larger data, systems, decisions
and responsibilities as competence grows toward Lead Data Scientist.

The world borrows the general operating complexity of a large multi-branch
retailer—stores, transactions, products, inventory, suppliers, promotions,
distribution and corporate functions—but does not use Walmart branding,
proprietary processes, claims, customer information or operational data.
Everything is synthetic unless a separately licensed public dataset is recorded.

## Company map

- Corporate HQ: enterprise data office, finance, merchandising, operations,
  supply chain, people operations, risk and customer strategy.
- 48 synthetic branches across five regions and several store formats.
- Two distribution hubs connected to suppliers and branch replenishment.
- Digital channel producing orders, fulfilment events and product interactions.
- Shared data platform connecting operational systems to governed analytics,
  experimentation, forecasting and machine-learning products.

## Persistent relational model

| Domain | Core tables | Important relationships | Early learner question |
|---|---|---|---|
| Organisation | `branch`, `region`, `department`, `employee_shift` | branches belong to regions; shifts occur at branches and departments | What does one row describe? |
| Sales | `sale`, `sale_line`, `return`, `payment_type` | sale lines join a sale to products; returns reference sale lines | Which key prevents double counting? |
| Product | `product`, `category`, `brand`, `price_history` | products belong to categories; prices vary through time | Which price was valid on the sale date? |
| Inventory | `inventory_snapshot`, `stock_movement`, `reorder_rule` | product stock is measured by branch and time | Is a blank stock count zero or missing? |
| Supply chain | `supplier`, `purchase_order`, `shipment`, `distribution_hub` | orders create shipments through hubs to branches | Where did the late replenishment begin? |
| Promotion | `promotion`, `promotion_product`, `promotion_branch` | many-to-many campaign scope across products and branches | Which sales were actually exposed? |
| Customer | `customer_segment`, `loyalty_event`, `digital_session` | privacy-safe synthetic segments and events; no real identities | What is an acceptable unit of analysis? |
| Time | `calendar`, `fiscal_period`, `holiday_event` | every event joins to a governed date dimension | Are weekdays and holidays comparable? |
| Experiments | `experiment`, `assignment`, `outcome` | assignment precedes outcome and preserves treatment lineage | Did randomisation create comparable groups? |
| ML platform | `feature_snapshot`, `model_version`, `prediction`, `monitoring_event` | predictions retain feature time, model version and outcome | Can this prediction be reproduced and audited? |

Every row carries a defined grain. Every fact has units. Every derived table
retains source keys, transformation lineage and observation time. Slowly changing
dimensions, late-arriving data and historical corrections are introduced only
after the learner understands simple keys and joins.

## Career routes

Roles are not cosmetic avatars. Each role changes the learner's permissions,
quality bar, tools, stakeholders and definition of “done”.

| Route | Roles | Core responsibility |
|---|---|---|
| Pre-Intern academy | Pre-Intern Candidate → Digital Foundations → Maths Foundations → Data Literacy Capstone | learn the assumed prerequisites from zero and demonstrate readiness for the first job |
| Launchpad | Data Intern → Data Quality Associate → Junior Data Analyst | inspect records, define grain, validate types, repair traceable errors |
| Analytics | Data Analyst → BI Analyst → Operations Analyst → Merchandising Analyst → Supply Chain Analyst → Product Analyst → Decision Scientist | turn governed data into decisions, metrics, experiments and recommendations |
| Data platform | Analytics Engineer → Data Engineer → Database Engineer → Data Reliability Engineer → Data Architect | model, transform, orchestrate, test, document and operate trustworthy data |
| Statistics | Statistical Analyst → Statistician → Experimentation Scientist → Forecasting Scientist | quantify variation, uncertainty, effects and future demand |
| Data science | Junior Data Scientist → Data Scientist → Senior Data Scientist → Principal Data Scientist | frame problems, build evidence, validate models and influence decisions |
| Machine learning | Junior ML Engineer → ML Engineer → MLOps Engineer → AI Engineer → ML Platform Engineer | productionise features, training, serving, evaluation and monitoring |
| Trust | Data Steward → Privacy Analyst → Model Risk Analyst → Responsible AI Lead | protect rights, quality, explainability, compliance and safe use |
| Leadership | Analytics Manager → Data Engineering Manager → Data Science Manager → Head of Data | set strategy, operating standards, investment and accountability |

The learner can specialise, but the routes reconnect. An ML Engineer must
understand observation grain and leakage. A Data Analyst must understand how a
join changes row counts. A leader must read uncertainty and model risk.

## Mission progression

| Phase | World responsibility | Knowledge earned | Representative missions |
|---:|---|---|---|
| 1 | Branch close desk | observations, variables, types, missingness, tables | repair a branch-day feed; classify fields; document grain |
| 2 | Morning operations brief | counts, distributions, charts, centre, spread, outliers | explain stockouts without hiding branch variation |
| 3 | Data quality rotation | keys, constraints, duplicates, units, lineage | find duplicate sales and a unit mismatch without deleting evidence |
| 4 | Analyst desk | SQL, joins, grouping, windows, dashboards, metric definitions | build same-store sales and trace every number to source rows |
| 5 | Supply chain rotation | conditional probability, distributions, expectation, simulation | quantify late-delivery risk and reorder uncertainty |
| 6 | Experimentation team | sampling, bias, intervals, tests, power, causal design | evaluate a promotion without confusing correlation and causation |
| 7 | Analytics engineering | dimensional models, transformation tests, orchestration, reproducibility | build a governed sales mart and survive late-arriving records |
| 8 | Data engineering | ingestion, batch/stream processing, storage, quality and observability | operate the inventory pipeline through schema and upstream failures |
| 9 | Data science | feature design, regression, classification, trees, clustering, evaluation | predict stockout risk with a decision-relevant metric |
| 10 | Forecasting | time series, seasonality, backtesting, hierarchy and uncertainty | forecast demand by product and branch without future leakage |
| 11 | ML engineering | training pipelines, registries, serving, monitoring, drift and rollback | deploy replenishment predictions with lineage and guardrails |
| 12 | AI engineering | embeddings, retrieval, language models, agents and human evaluation | build a cited operations assistant that cannot invent policy |
| 13 | Responsible production | privacy, fairness, robustness, security, governance and incident response | audit a model, document limits and decide whether it should ship |
| 14 | Leadership simulation | portfolio choices, team design, business cases and risk ownership | present a defensible data strategy to the fictional executive team |

## Experience rules

1. Every mission alternates **Theory → Practical → Theory → Practical** until
   the mission is complete. Theory is never allowed to accumulate into a long
   lecture before application, and practical work never arrives without the
   concept needed to reason about it.
2. Each practical stage has a guided system action followed by an independent
   check. The next theory stage begins only after the learner has applied the
   previous one and received explanatory feedback.
3. The company and relational model persist; new missions add tables and history
   instead of replacing the world with unrelated toy examples.
4. Every mission begins with a business decision and ends with a visible effect
   on a branch, team, customer promise or corporate process.
5. The learner sees the role, stakeholder, location, data grain, source tables,
   permitted tools, quality checks and business outcome on one mission surface.
6. Career progression is competence-based. Titles unlock only after the learner
   reconstructs the idea in a new context and explains a relevant failure mode.
7. Synthetic data generators preserve referential integrity, seasonality,
   realistic noise and known ground truth so exercises can be checked exactly.
8. Errors are traceable events: missing data is not silently filled, duplicate
   rows are not blindly deleted and model failures retain evidence.
9. Technical diagrams remain code-native and deterministic. Exact database,
   probability and model structures are never carried by decorative raster art.

## Current implementation boundary

`STAT-DATA-001` is now the **Pre-Intern Capstone · Repair the daily branch
feed**, performed at the Corporate HQ Learning Lab. Completing it does not grant
promotion by itself: phases 0–2 must also be earned. The world console,
company footprint, data flow, relational schema and career routes are visible in
the Factory. No later mission is learner content until this mission is selected,
reviewed and approved through the existing protocol.
