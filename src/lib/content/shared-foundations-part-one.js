export const SHARED_FOUNDATIONS_PART_ONE = Object.freeze({
  id: 'SHARED-FOUNDATIONS-PART-ONE',
  status: 'AI_DRAFT · AUTHORING ONLY',
  title: 'How Data Represents the World',
  subtitle: 'Part One of Volume 0',
  totalMinutes: 40,
  sessions: Object.freeze([
    Object.freeze({
      id: 'representation', number: '01', title: 'Data is a record, not reality', studyMinutes: 5, playMinutes: 5,
      objective: 'Distinguish a real thing or event from the record created about it.',
      opening: 'A sale happens in a shop. A row about that sale is created in a system. The event and the record are connected, but they are not the same thing.',
      sections: Object.freeze([
        Object.freeze({ heading: 'Start with the world', paragraphs: Object.freeze([
          'Before looking at a table, ask what happened in the world. A customer bought three products. A freezer sensor took a reading. A supplier changed a price. These are events or states that a system may observe.',
          'Data is a deliberately structured record of part of that reality. It keeps selected details and leaves other details out. A checkout record might keep the time, product and price, but not the customer’s mood or the queue length. Every dataset is therefore a representation with a purpose and a boundary.'
        ]) }),
        Object.freeze({ heading: 'Observed, stored and derived', paragraphs: Object.freeze([
          'An observation arrives from an event or measurement: a barcode was scanned or a temperature was read. Master data already exists to describe something: a product has a name, category and governed price. Derived data is calculated from other values: quantity multiplied by unit price produces a line total.',
          'These categories matter because they answer different questions. If a total looks wrong, inspect the observation, the stored reference and the calculation separately. Treating every value as if it came from the same place makes errors harder to explain.'
        ]) }),
        Object.freeze({ heading: 'A record can be wrong without the event changing', paragraphs: Object.freeze([
          'A customer may really have bought two bottles even if the quantity was recorded as one. Correcting the row does not rewrite the past. It improves the representation of the past while preserving evidence about what was originally captured and why it changed.',
          'This is the first habit of trustworthy data work: keep the world, the source observation and later transformations conceptually separate.'
        ]) })
      ]),
      example: Object.freeze({ title: 'Checkout example', headers: Object.freeze(['Stage','Value','Meaning']), rows: Object.freeze([
        Object.freeze(['Observe','5012345678900','barcode emitted by the scan event']), Object.freeze(['Look up','£3.40','governed unit price in the product record']), Object.freeze(['Derive','2 × £3.40 = £6.80','calculated transaction-line total'])
      ]) }),
      workbook: Object.freeze({ title: 'Ten-minute observation inventory', prompt: 'Choose an ordinary process such as making tea, taking a bus or buying lunch.', steps: Object.freeze(['Write down one event that happens.', 'List three details a system might record about it.', 'List two real details the record would probably omit.', 'Mark each recorded value as observed, stored or derived.']) }),
      check: Object.freeze({ prompt: 'A checkout stores quantity 2 and unit price £3.40, then calculates £6.80. What is £6.80?', answer: 'derived', options: Object.freeze([['observation','A value captured directly from the event'],['master','A value already governed in a reference record'],['derived','A value calculated from other recorded values']]), explanation: '£6.80 is derived because the system calculates it from quantity and unit price.' }),
      practice: Object.freeze({ title: 'Process a Sale', href: '?mode=game&mission=checkout', instruction: 'Scan the basket and watch one event become observed, stored and derived records.' }),
      sources: Object.freeze([Object.freeze({label:'W3C PROV Overview',url:'https://www.w3.org/TR/prov-overview/'})])
    }),
    Object.freeze({
      id: 'observations-variables', number: '02', title: 'Observations and variables', studyMinutes: 5, playMinutes: 5,
      objective: 'Explain what a row observes and what each variable means before choosing an analysis.',
      opening: 'A table becomes understandable when you can finish two sentences: “one row represents…” and “this column records…”.',
      sections: Object.freeze([
        Object.freeze({ heading: 'Observations stay together', paragraphs: Object.freeze([
          'An observation is the case being described. In a customer table, an observation may be one customer. In a sales table, it may be one completed sale. Values across a row belong to the same observation, so moving or mixing them changes the story the row tells.',
          'The same real object can appear in many observations. One product may occur in thousands of sale lines because each line records a different sale occurrence. Counting rows is therefore not automatically the same as counting products.'
        ]) }),
        Object.freeze({ heading: 'Variables are questions asked consistently', paragraphs: Object.freeze([
          'A variable records the same kind of characteristic for every observation. Product category asks “which group does this product belong to?” Basket total asks “how much money was paid for this sale?” The column name, definition, unit and allowed values should make that question stable.',
          'A column containing digits is not automatically quantitative. Product code 10482 may look numerical, but adding two product codes has no meaning. It is an identifier and should be treated as a categorical label.'
        ]) }),
        Object.freeze({ heading: 'Type controls valid comparisons', paragraphs: Object.freeze([
          'Categorical variables place observations into named groups. Some categories have no natural order, while ordinal categories can be ranked. Quantitative variables express counts or measurements, allowing meaningful arithmetic when their units and scales support it.',
          'Classification is not clerical tidying. It determines whether an average, ranking, distance or ratio makes sense. Asking what the values mean is more reliable than guessing from their appearance.'
        ]) })
      ]),
      example: Object.freeze({ title: 'Three variables, three meanings', headers: Object.freeze(['Variable','Example','Valid use']), rows: Object.freeze([
        Object.freeze(['branch_id','B-08','identify or group branches']), Object.freeze(['satisfaction','Good','compare ordered response levels']), Object.freeze(['basket_total','£18.70','sum, compare or calculate differences'])
      ]) }),
      workbook: Object.freeze({ title: 'Fifteen-minute variable audit', prompt: 'Use a receipt, timetable, fitness app or another small record you can see.', steps: Object.freeze(['Name what one observation represents.', 'List five variables recorded about it.', 'Write the meaning of each variable in a full sentence.', 'Classify each as categorical or quantitative.', 'Circle any identifier that contains digits but is not an amount.']) }),
      check: Object.freeze({ prompt: 'Employee number 700184 contains digits. Why is it categorical?', answer: 'label', options: Object.freeze([['large','The number happens to be large'],['label','It identifies a person and arithmetic on it has no meaning'],['whole','It contains no decimal places']]), explanation: 'An employee number is a label. Its numerical appearance does not make it a measured amount.' }),
      practice: Object.freeze({ title: 'Classify Store Data', href: '?mode=game&mission=classify-data', instruction: 'Apply meaning, subtype and measurement scale across Superstore variables.' }),
      sources: Object.freeze([Object.freeze({label:'NIST Engineering Statistics Handbook',url:'https://www.itl.nist.gov/div898/handbook/ppc/section1/ppc135.htm'}),Object.freeze({label:'Penn State STAT 504',url:'https://online.stat.psu.edu/stat504/Lesson01'})])
    }),
    Object.freeze({
      id: 'rows-grain', number: '03', title: 'One row means one thing', studyMinutes: 5, playMinutes: 5,
      objective: 'State a table’s grain precisely and use it to interpret row counts.',
      opening: 'Before counting, joining or removing duplicates, define exactly what makes one legitimate row different from another.',
      sections: Object.freeze([
        Object.freeze({ heading: 'Grain is the meaning of one row', paragraphs: Object.freeze([
          'The grain of a table is a precise sentence describing one row. “One sale” may be enough for a sale header. “One product within one sale” is needed for a sale-line table. “One product at one branch at one observation time” may describe an inventory snapshot.',
          'The sentence should include every entity, place and time component required to distinguish legitimate observations. If the sentence is vague, later counts and joins will also be vague.'
        ]) }),
        Object.freeze({ heading: 'COUNT counts the existing grain', paragraphs: Object.freeze([
          'Counting rows answers “how many records exist at this table’s grain?” A sale-line table can have six rows for one sale because six different products were recorded. COUNT(*) returns six sale lines, not six customers or six sales.',
          'To count another thing, state that thing explicitly and identify the key that represents it. Distinct sale IDs may count sales. Distinct customer IDs may count recorded customers. These answers can differ even when they come from the same table.'
        ]) }),
        Object.freeze({ heading: 'Joins can change the number of rows', paragraphs: Object.freeze([
          'A join is safe only when you understand the grain on both sides. Joining one product row to many sale-line rows repeats the product attributes once for every matching line. That repetition is expected. Joining two tables that both contain many rows per product can multiply rows unexpectedly.',
          'Always compare the intended output grain with the result after a join. Row growth is evidence to interpret, not automatically an error.'
        ]) })
      ]),
      example: Object.freeze({ title: 'The same sale at two grains', headers: Object.freeze(['Table','Rows','One row represents']), rows: Object.freeze([
        Object.freeze(['sale','1','one completed sale']), Object.freeze(['sale_line','3','one product line within one sale']), Object.freeze(['payment','1','one payment attempt for the sale'])
      ]) }),
      workbook: Object.freeze({ title: 'Ten-minute grain test', prompt: 'Imagine a table recording attendance at a weekly class.', steps: Object.freeze(['Write a grain sentence for one learner enrolled in one class.', 'Write a different grain sentence for one learner attending one class session.', 'List the columns needed to distinguish each grain.', 'Explain why the second table can contain more rows.']) }),
      check: Object.freeze({ prompt: 'A sale-line table has three rows for sale S-1041. What does COUNT(*) return?', answer: 'lines', options: Object.freeze([['sales','One sale'],['lines','Three sale-line records'],['products','Every product in the catalogue']]), explanation: 'COUNT(*) returns three because it counts rows at the sale-line grain.' }),
      practice: Object.freeze({ title: 'What Does One Row Represent?', href: '?mode=game&mission=table-grain', instruction: 'Declare the grain of six tables before interpreting their row counts.' }),
      sources: Object.freeze([Object.freeze({label:'Statistics Canada: observations and variables',url:'https://www150.statcan.gc.ca/n1/edu/power-pouvoir/ch1/definitions/5214853-eng.htm'}),Object.freeze({label:'Australian Bureau of Statistics: data units and records',url:'https://www.abs.gov.au/statistics/understanding-statistics/statistical-terms-and-concepts/data'})])
    }),
    Object.freeze({
      id: 'context-quality', number: '04', title: 'A value needs context', studyMinutes: 5, playMinutes: 5,
      objective: 'Distinguish zero from missing information and judge whether a value, type and unit fit the field definition.',
      opening: 'A cell is trustworthy only when its value, meaning, type, unit and missingness agree with the variable it claims to record.',
      sections: Object.freeze([
        Object.freeze({ heading: 'Zero is an answer; missing is a lack of answer', paragraphs: Object.freeze([
          'Zero can be a valid measured amount: no units were returned. A blank or NULL usually means the system does not hold a value, but it does not explain why. The value may be unknown, not applicable, pending or deliberately uncollected.',
          'Replacing every missing value with zero invents evidence. It changes “we do not know” into “we know none occurred,” which can distort totals, averages, rates and decisions.'
        ]) }),
        Object.freeze({ heading: 'Types describe allowed operations', paragraphs: Object.freeze([
          'A data type constrains how a value is stored and handled. Dates should support calendar operations. Boolean fields should represent two governed states. Text may preserve identifiers that contain leading zeroes. A value can be technically storable yet conceptually wrong for the field.',
          'Validation should therefore check both format and meaning. The text “unknown” may fit into a text column while violating a field that requires an ISO country code.'
        ]) }),
        Object.freeze({ heading: 'Units belong to the value', paragraphs: Object.freeze([
          'A measurement is incomplete without its unit. The number 10 could mean kilograms, litres, minutes or degrees. Compatible units can be converted when the original value and conversion rule remain traceable. Incompatible dimensions cannot be repaired by changing the label.',
          'Ten centimetres cannot become ten kilograms. That is not a conversion problem; it is evidence of a mapping or recording error that should be quarantined and investigated.'
        ]) })
      ]),
      example: Object.freeze({ title: 'Three cells that look simple', headers: Object.freeze(['Cell','Context','Meaning']), rows: Object.freeze([
        Object.freeze(['0','returned_unit_count','known zero: no returns']), Object.freeze(['NULL','delivery_time','no value held; reason required']), Object.freeze(['28 cm','mass_kg','wrong dimension; not convertible'])
      ]) }),
      workbook: Object.freeze({ title: 'Fifteen-minute quality review', prompt: 'Review five fields from a form, spreadsheet or app you know.', steps: Object.freeze(['Write the intended meaning and unit for each field.', 'Describe what zero would mean in each field.', 'Describe what a blank could mean.', 'Identify one value that could pass a format check but still be conceptually wrong.', 'Write the safest action: keep, correct with evidence, or quarantine.']) }),
      check: Object.freeze({ prompt: 'A delivery-time field is blank because the parcel has not arrived yet. What is the best interpretation?', answer: 'pending', options: Object.freeze([['zero','Delivery took zero minutes'],['pending','The value is expected later'],['not-applicable','Delivery time can never apply to this parcel']]), explanation: 'The value is pending because the event needed to produce it has not happened yet.' }),
      practice: Object.freeze({ title: 'Missing Values Are Not Zero', href: '?mode=game&mission=missing-data', instruction: 'Interpret six values using process evidence, then choose a traceable treatment.' }),
      sources: Object.freeze([Object.freeze({label:'UK Government Analysis Function: symbols in tables',url:'https://analysisfunction.civilservice.gov.uk/policy-store/symbols-in-tables-definitions-and-help/'}),Object.freeze({label:'PostgreSQL: NULL comparison rules',url:'https://www.postgresql.org/docs/current/functions-comparison.html'})])
    })
  ])
});
