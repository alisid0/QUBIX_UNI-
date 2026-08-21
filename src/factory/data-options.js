import { superstoreTopics, superstoreTopicCount } from './superstore-topics.js';

// Factory options for "Observations and Variables", the proposed first board
// of Qubix's Statistics and Probability pathway. Drafted 2026-08-21 after the
// founder set Data Science, Machine Learning and AI as the product destination.
//
// ONE IDEA ONLY. A dataset is not a cloud of numbers. Each row records one
// observed case, and each column records one variable in the same way for every
// case. Mean, spread, probability and modelling remain locked behind that idea.
//
// SOURCE. The modern definition of a variable and the categorical/quantitative
// distinction come from Lane et al., Introduction to Statistics (Online
// Edition), Introduction / Variables (2022), released worldwide into the public
// domain by its copyright holders. The source entries are STAT1 and STAT2 in
// sources.js. The practice company, branches, schema, values and interactions
// are original synthetic Qubix material. They contain no personal, customer,
// employee, Walmart or other externally sourced operational data.

export const selections = {};
export const finalised = {};
export const rejected = {};
export const gated = 'First proposed Statistics and Probability board, drafted 2026-08-21. Authoring-only AI_DRAFT: no wording, interaction, exercise, prerequisite or curriculum placement has been founder-approved.';

export const observationsVariables = {
  id: 'STAT-DATA-001',
  title: 'Observations and Variables',
  objective: 'Given a synthetic branch-day feed, identify one complete observation, distinguish variables from values, and restore a detached value using its row and column meaning.',
  prerequisites: 'Read a small table; recognise whole-number counts and short text labels.',
  misconception: 'A row is not merely a horizontal line, a column is not merely a vertical line, and a missing value is not automatically zero.',
  fork: 'A row keeps one case together. A column asks the same question of every case.',
  structure: 'One continuous Data Intern mission inside Qubix Superstore: identify branch-day cases, validate variables, then repair the corporate feed.',
  world: {
    company: 'Qubix Superstore',
    tagline: 'A synthetic retail enterprise where every course concept changes a working data system.',
    disclaimer: 'Fictional company · synthetic data · no real customers, employees, branches or retailer records',
    footprint: [
      { value: '48', label: 'branches' },
      { value: '5', label: 'regions' },
      { value: '2', label: 'distribution hubs' },
      { value: '1', label: 'corporate data office' }
    ],
    learningCycles: [
      { theory: 'Define one branch-day case', practical: 'Select and inspect complete branch rows' },
      { theory: 'Define variables and data types', practical: 'Trace and classify corporate feed columns' },
      { theory: 'Join rows and columns into a dataset', practical: 'Repair the detached stockout value' }
    ],
    topicCatalog: superstoreTopics,
    topicCount: superstoreTopicCount,
    currentMission: {
      role: 'Pre-Intern Candidate',
      team: 'Pre-Intern Academy · Data Foundations Desk',
      location: 'Corporate HQ · Learning Lab',
      title: 'Pre-Intern Capstone · Repair the daily branch feed',
      brief: 'You are assumed to know nothing about data work. Earlier academy steps teach digital basics, arithmetic, tables and the company. Here four branches sent a close-of-day record: identify what rows and columns mean, then return one detached stockout count to the correct branch-day record.',
      outcome: 'Complete the prerequisite foundation and unlock promotion to Data Intern.'
    },
    network: [
      { name: 'Branch network', detail: 'Point-of-sale, inventory, staffing and promotion events' },
      { name: 'Data platform', detail: 'Validated relational tables, history and governed metrics' },
      { name: 'Corporate office', detail: 'Operations, merchandising, finance, supply chain and customer strategy' },
      { name: 'Decision systems', detail: 'Dashboards, forecasts, experiments, optimisation and machine learning' }
    ],
    schema: [
      { table: 'branch', key: 'branch_id', fields: 'region_id · format · opened_date' },
      { table: 'sale', key: 'sale_id', fields: 'branch_id · product_id · date_id · units · net_sales' },
      { table: 'product', key: 'product_id', fields: 'category_id · supplier_id · unit_cost · price' },
      { table: 'inventory_snapshot', key: 'branch_id + product_id + date_id', fields: 'on_hand · stockout_flag' },
      { table: 'promotion', key: 'promotion_id', fields: 'product_id · branch_id · start_date · end_date' },
      { table: 'employee_shift', key: 'shift_id', fields: 'branch_id · role_code · hours · date_id' },
      { table: 'supplier', key: 'supplier_id', fields: 'lead_time_days · region · service_level' },
      { table: 'calendar', key: 'date_id', fields: 'week · month · quarter · holiday_flag' }
    ],
    careerRoutes: [
      { name: 'Pre-Intern academy', roles: ['Pre-Intern Candidate', 'Digital Foundations', 'Maths Foundations', 'Data Literacy Capstone'] },
      { name: 'Launchpad', roles: ['Data Intern', 'Data Quality Associate', 'Junior Data Analyst'] },
      { name: 'Analytics', roles: ['Data Analyst', 'BI Analyst', 'Operations Analyst', 'Merchandising Analyst', 'Supply Chain Analyst', 'Product Analyst', 'Decision Scientist'] },
      { name: 'Data platform', roles: ['Analytics Engineer', 'Data Engineer', 'Database Engineer', 'Data Reliability Engineer', 'Data Architect'] },
      { name: 'Science & ML', roles: ['Statistician', 'Experimentation Scientist', 'Data Scientist', 'Forecasting Scientist', 'ML Engineer', 'MLOps Engineer', 'AI Engineer', 'Lead Data Scientist'] },
      { name: 'Trust & leadership', roles: ['Data Steward', 'Privacy Analyst', 'Model Risk Analyst', 'Responsible AI Lead', 'Principal Data Scientist', 'Head of Data'] }
    ],
    promotionPath: [
      { role: 'Pre-Intern Candidate', gate: 'Digital basics, maths prerequisites and data-literacy capstone' },
      { role: 'Data Intern', gate: 'Trustworthy descriptive analysis and documented quality checks' },
      { role: 'Data Analyst', gate: 'SQL, Python, statistics and a reconciled business decision product' },
      { role: 'Analytics or Data Engineer', gate: 'Governed models, tested pipelines and operational reliability' },
      { role: 'Junior Data Scientist', gate: 'ML mathematics, reproducible modelling and honest evaluation' },
      { role: 'Data Scientist', gate: 'Independent problem framing, experimentation and production evidence' },
      { role: 'Senior / Principal Data Scientist', gate: 'Cross-team technical leadership, risk ownership and mentoring' },
      { role: 'Lead Data Scientist', gate: 'Lead an ambiguous programme through deployment, governance and measured outcome' }
    ]
  },
  sections: [
    {
      code: 'S1',
      name: 'Theory and practice · one case at a time',
      sources: ['STAT1', 'WIKI_OBS'],
      readings: [
        {
          code: 'S1-A',
          text: 'At closing time, each Qubix Superstore branch sends one daily record to the corporate data office. It contains the branch code, region, transaction count and stockout count for that date. One branch on one date, together with every value recorded about it, is one case. Break the row apart and the record no longer describes that branch-day.'
        },
        {
          code: 'S1-B',
          text: 'Your first Data Intern question is not “What calculation should I run?” It is “What does one row describe?” Here it describes one branch at close of business on 21 August. B-027, Central, 1,536 transactions and 3 stockouts belong to one observation rather than four unrelated facts.'
        },
        {
          code: 'S1-C',
          text: 'Before collecting data, name the unit of observation: the kind of thing one record describes. Qubix may store one row per sale, product, shipment, branch-day or employee shift. This mission uses branch-day. A table cannot quietly switch from branch-days to individual sales halfway down.'
        }
      ],
      interactions: [
        {
          code: 'S1-I1', kind: 'case-focus',
          note: 'Four branch-day cards. Selecting a branch lifts one complete close-of-day record out of the corporate feed and shows its values together.'
        },
        {
          code: 'S1-I2', kind: 'case-row',
          note: 'The corporate branch feed remains in a table. Selecting a branch code highlights the complete row in place.'
        }
      ],
      exercises: [
        {
          code: 'S1-X1', kind: 'choice',
          prompt: 'In the corporate branch-day table, what is one observation?',
          options: [
            { label: 'One branch-day and every value recorded about it', correct: true },
            { label: 'The whole transactions column', feedback: 'That is one variable recorded for every branch-day, not one complete observation.' },
            { label: 'Any single number in the table', feedback: 'One cell is one value. An observation keeps all values for one case together.' }
          ],
          successNote: 'One case, one complete record, one row.',
          revealNote: 'An observation contains all recorded values for one case.'
        },
        {
          code: 'S1-X2', kind: 'match',
          prompt: 'Sort each item by what it represents.',
          bins: ['A case', 'One value'],
          items: [
            { label: 'B-027 and its complete close-of-day record', bin: 'A case' },
            { label: 'B-027 transaction count of 1,536', bin: 'One value' },
            { label: 'one sale and every field logged for it', bin: 'A case' },
            { label: 'that sale\'s net amount', bin: 'One value' }
          ],
          successNote: 'A case is the thing observed; a value is one fact recorded about it.'
        }
      ]
    },
    {
      code: 'S2',
      name: 'Theory and practice · one variable at a time',
      sources: ['STAT1', 'STAT2', 'WIKI_DATA'],
      readings: [
        {
          code: 'S2-A',
          text: 'A variable is a characteristic that can take different values. Ask every branch-day the same question—Which region? How many transactions? How many stockouts?—and place the answers in one column. Region is categorical. Transactions and stockouts are quantitative counts.'
        },
        {
          code: 'S2-B',
          text: 'Look down one column and you follow one corporate metric across every branch-day. A variable must be recorded consistently: net sales cannot quietly switch from pounds to pence. Some variables place branches in categories, such as region. Others count or measure a quantity, such as transactions or stockouts.'
        },
        {
          code: 'S2-C',
          text: 'A column is a data contract: every value answers the same question in the same form. Stockouts may vary by branch, but that column cannot suddenly contain a region name. Consistent meaning, type and units are what let corporate analysts compare branches and data engineers validate the pipeline.'
        }
      ],
      interactions: [
        {
          code: 'S2-I1', kind: 'variable-focus',
          note: 'The learner selects a column heading. The complete column lights and its values are pulled into a vertical strip. This is the column counterpart to S1\'s row focus.'
        },
        {
          code: 'S2-I2', kind: 'variable-sort',
          note: 'Three variable cards cycle through unfiled, categorical and quantitative. The board confirms only when all three are classified, making the learner use the values rather than memorize a definition.'
        }
      ],
      exercises: [
        {
          code: 'S2-X1', kind: 'match',
          prompt: 'Classify each variable.',
          bins: ['Categorical', 'Quantitative'],
          items: [
            { label: 'branch region', bin: 'Categorical' },
            { label: 'transaction count', bin: 'Quantitative' },
            { label: 'stockout count', bin: 'Quantitative' },
            { label: 'store format', bin: 'Categorical' }
          ],
          successNote: 'Labels form categories. Counts and measurements are quantitative.'
        },
        {
          code: 'S2-X2', kind: 'choice',
          prompt: 'Why must one column use the same unit throughout?',
          options: [
            { label: 'So its values describe one variable consistently', correct: true },
            { label: 'Because every case must have the same value', feedback: 'Values are expected to vary. The meaning and unit must stay fixed.' },
            { label: 'Only to make the table look tidy', feedback: 'A mixed-unit column changes what its numbers mean and can corrupt every calculation that follows.' }
          ],
          successNote: 'Values vary; the question and unit do not.',
          revealNote: 'Consistency makes comparisons and later calculations valid.'
        }
      ]
    },
    {
      code: 'S3',
      name: 'Theory and practice · build the dataset',
      sources: ['STAT1', 'STAT2', 'WIKI_DATA'],
      readings: [
        {
          code: 'S3-A',
          text: 'Put branch-day observations in rows and variables in columns. The rectangle is a dataset. Every cell has two coordinates: which branch-day it belongs to and which variable it answers. A detached value such as 4 says almost nothing until you know it is B-044’s stockout count.'
        },
        {
          code: 'S3-B',
          text: 'The corporate feed is organised evidence. Read across to reconstruct one branch-day. Read down to compare one variable across branches. A blank stockout cell is not zero and should not be guessed: it remains missing until the branch record or validated source supplies it.'
        },
        {
          code: 'S3-C',
          text: 'The branch-day table is only one part of the superstore. Sales join products, branches and calendar dates through keys; inventory snapshots join branches to products; promotions and suppliers add context. Later missions turn this relational system into dashboards, forecasts, experiments and machine-learning features without losing its lineage.'
        }
      ],
      interactions: [
        {
          code: 'S3-I1', kind: 'dataset-grid',
          note: 'A two-way reading game. Toggle rows or columns, choose a target, and the table highlights either one complete observation or one complete variable. It joins the two previous sections into a single structure.'
        },
        {
          code: 'S3-I2', kind: 'dataset-repair',
          note: 'One stockout count is detached from the corporate feed. The learner uses the branch code and column heading to return it to the only meaningful cell.'
        }
      ],
      exercises: [
        {
          code: 'S3-X1', kind: 'choice',
          prompt: 'What does one cell in a dataset represent?',
          options: [
            { label: 'One variable value for one case', correct: true },
            { label: 'A complete observation', feedback: 'A complete observation is the row. A cell holds only one of its values.' },
            { label: 'A complete variable', feedback: 'A complete variable is the column. A cell contributes one value to it.' }
          ],
          successNote: 'One case crossed with one variable gives one cell.',
          revealNote: 'The row identifies the case and the column identifies the variable.'
        },
        {
          code: 'S3-X2', kind: 'order',
          prompt: 'Build a trustworthy dataset in order.',
          items: [
            'Decide what counts as one case',
            'Define the variables and their units',
            'Record one row for each case',
            'Check missing and inconsistent values before calculating'
          ],
          successNote: 'Structure and meaning come before averages, charts or models.'
        }
      ]
    }
  ],
  workshops: []
};
