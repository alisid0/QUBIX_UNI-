// Mission 017. The first mission whose evidence is the real database.
//
// Every mission before this one carries its own small table, written by hand so
// a learner can see all of it. This one carries a question instead, and the
// answer comes out of the 54-table Superstore the data console queries. The
// figures below were read from that database, not chosen: if the sample is
// rebuilt and they change, check-region-grain fails and this file is wrong.
//
// The mistake it exists for is not a SQL mistake. Both analysts wrote correct
// queries. They joined through different hierarchies because the request said
// "by region" and the company has two things called a region: the districts it
// is managed through, and the counties it sits in. Forty years apart, drawn by
// different departments, and nowhere in the schema does anything say they
// disagree.
//
// What makes it hard to catch is that the grand total reconciles. Both reports
// say 15,315 sales. A reviewer who checks the bottom line sees two documents
// that agree.

/** Read out of the sample database. Asserted by scripts/check-region-grain.mjs. */
export const REGION_FIGURES = Object.freeze({
  totalSales: 15315,
  management: Object.freeze([
    Object.freeze({ region: 'RGN-C', name: 'Cindermoor', sales: 3780 }),
    Object.freeze({ region: 'RGN-W', name: 'Westreach', sales: 3285 }),
    Object.freeze({ region: 'RGN-E', name: 'Eastfen', sales: 2865 }),
    Object.freeze({ region: 'RGN-S', name: 'Southdown', sales: 2709 }),
    Object.freeze({ region: 'RGN-K', name: 'Kingsbourne', sales: 2010 }),
    Object.freeze({ region: 'RGN-N', name: 'Northmarch', sales: 666 })
  ]),
  geographic: Object.freeze([
    Object.freeze({ region: 'RGN-C', name: 'Cindermoor', sales: 4431 }),
    Object.freeze({ region: 'RGN-W', name: 'Westreach', sales: 3285 }),
    Object.freeze({ region: 'RGN-E', name: 'Eastfen', sales: 2865 }),
    Object.freeze({ region: 'RGN-N', name: 'Northmarch', sales: 2352 }),
    Object.freeze({ region: 'RGN-K', name: 'Kingsbourne', sales: 1359 }),
    Object.freeze({ region: 'RGN-S', name: 'Southdown', sales: 1023 })
  ]),
  culprits: Object.freeze([
    Object.freeze({ branch: 'B-24', name: 'Elmsworth', district: 'RGN-S', county: 'RGN-N', sales: 1686 }),
    Object.freeze({ branch: 'B-30', name: 'Kelsingham', district: 'RGN-K', county: 'RGN-C', sales: 651 })
  ])
});

const QUERY_MANAGEMENT = `SELECT d.region_id, COUNT(*) AS sales
FROM sale s
JOIN branch   b USING (branch_id)
JOIN district d USING (district_id)
GROUP BY d.region_id;`;

const QUERY_GEOGRAPHIC = `SELECT c.region_id, COUNT(*) AS sales
FROM sale s
JOIN branch b USING (branch_id)
JOIN county c USING (county_id)
GROUP BY c.region_id;`;

export const REGION_GRAIN_MISSION = Object.freeze({
  id: 'MISSION 017',
  status: 'AI_DRAFT',
  role: 'ANALYST',
  title: 'The Region That Wasn’t',
  competency: 'Establish which hierarchy a grouping column belongs to before reporting a figure grouped by it.',
  brief: 'Two analysts answered the same request. Their reports do not match, and both queries are correct.',

  sources: Object.freeze([
    Object.freeze({ label: 'PostgreSQL — GROUP BY', url: 'https://www.postgresql.org/docs/current/sql-select.html' }),
    Object.freeze({ label: 'Kimball — dimension hierarchies', url: 'https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/' }),
    Object.freeze({ label: 'ONS — statistical geography hierarchies', url: 'https://www.ons.gov.uk/methodology/geography/ukgeographies/statisticalgeographies' })
  ]),

  queries: Object.freeze({ management: QUERY_MANAGEMENT, geographic: QUERY_GEOGRAPHIC }),

  cases: Object.freeze([
    Object.freeze({
      id: 'reconciles',
      brief: 'Priya and Marcus both reported sales by region. Their region rows disagree. What do their reports agree on?',
      hint: 'Compare the two columns, then add each one up.',
      options: Object.freeze([
        'Nothing. One of the two queries must be wrong.',
        'The grand total. Both reports account for all 15,315 sales.',
        'Cindermoor. It is the largest region in both.',
        'The number of regions, but nothing else.'
      ]),
      answer: 'The grand total. Both reports account for all 15,315 sales.',
      why: 'Every sale appears exactly once in both reports, so the totals are identical. '
        + 'That is what makes this expensive: a reviewer who checks the bottom line sees two '
        + 'documents that reconcile and stops looking.'
    }),
    Object.freeze({
      id: 'paired',
      brief: 'Northmarch gains 1,686 sales between the reports and Southdown loses exactly 1,686. Kingsbourne loses 651 and Cindermoor gains exactly 651. What does that pairing tell you?',
      hint: 'Sales are not appearing or disappearing. They are arriving somewhere else.',
      options: Object.freeze([
        'Some sales were counted twice in one of the reports.',
        'One report filtered out a branch the other kept.',
        'Some branches are being attributed to a different region by each query.',
        'The two reports cover different date ranges.'
      ]),
      answer: 'Some branches are being attributed to a different region by each query.',
      why: 'Losses and gains cancel to the penny, so nothing was gained or lost. The same '
        + 'sales are being filed under different regions, which means the branch, not the '
        + 'sale, is what the two queries disagree about.'
    }),
    Object.freeze({
      id: 'culprit',
      brief: 'Elmsworth (B-24) took 1,686 sales. Its district reports into Southdown. Its county sits in Northmarch. Which report is wrong?',
      hint: 'Ask what each query claimed to be counting.',
      options: Object.freeze([
        'Priya’s. A branch belongs to the region its county is in.',
        'Marcus’s. A branch belongs to the region it reports to.',
        'Neither. They answered two different questions that were asked with the same words.',
        'Both. A branch cannot be in two regions, so the data is corrupt.'
      ]),
      answer: 'Neither. They answered two different questions that were asked with the same words.',
      why: 'Both queries are correct and both hierarchies are real. A district is who a branch '
        + 'reports to; a county is where it stands. Elmsworth genuinely is managed from '
        + 'Southdown and genuinely stands in Northmarch. The data is not corrupt: the request was.'
    }),
    Object.freeze({
      id: 'schema',
      brief: 'What in the schema warned you that "region" was ambiguous?',
      hint: 'Look at what a join through district and a join through county each require.',
      options: Object.freeze([
        'The column was named region_id in both tables, so nothing did.',
        'A foreign key constraint would have rejected one of the joins.',
        'The branch table has a region_id column that both queries ignored.',
        'Nothing warns you, but both queries needed two joins to reach a region, which is the clue.'
      ]),
      answer: 'Nothing warns you, but both queries needed two joins to reach a region, which is the clue.',
      why: 'Neither query could reach a region from a sale without passing through something '
        + 'else first, and they passed through different things. When a grouping column is two '
        + 'joins away, ask what it is two joins away through.'
    }),
    Object.freeze({
      id: 'ask',
      brief: 'What should the request have said?',
      hint: 'The fix is upstream of the SQL.',
      options: Object.freeze([
        '"Sales by region, using the management hierarchy" or "using the geographic hierarchy".',
        '"Sales by region, and please check your joins."',
        '"Sales by branch." Regions are unreliable.',
        '"Sales by region" is fine. The analysts should agree a convention privately.'
      ]),
      answer: '"Sales by region, using the management hierarchy" or "using the geographic hierarchy".',
      why: 'A grouping is not defined by its column name. Naming the hierarchy makes both '
        + 'reports answerable and comparable, and it is the only version of the request that '
        + 'two analysts working separately can satisfy identically.'
    })
  ])
});

/** Which regions differ, and by how much, computed rather than listed. */
export function regionDeltas() {
  const geo = new Map(REGION_FIGURES.geographic.map(r => [r.region, r.sales]));
  return REGION_FIGURES.management
    .map(r => ({ region: r.region, name: r.name, management: r.sales, geographic: geo.get(r.region) ?? 0 }))
    .map(r => ({ ...r, delta: r.geographic - r.management }))
    .sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta));
}

/** Both reports must account for every sale, or the mission's premise is false. */
export function totalsAgree() {
  const sum = rows => rows.reduce((n, r) => n + r.sales, 0);
  return sum(REGION_FIGURES.management) === REGION_FIGURES.totalSales
    && sum(REGION_FIGURES.geographic) === REGION_FIGURES.totalSales;
}
