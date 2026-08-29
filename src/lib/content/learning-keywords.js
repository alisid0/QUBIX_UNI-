// Small, first-party Wiki articles for terms introduced inside the reader.
// A lesson opts into these entries explicitly; the reader never guesses which
// ordinary words should become links. This keeps the prose calm and makes each
// link a deliberate teaching decision.

export const LEARNING_KEYWORDS = Object.freeze({
  quantity: Object.freeze({
    slug: 'quantity',
    term: 'Quantity',
    aliases: Object.freeze(['quantity', 'quantities']),
    short: 'The property being counted or measured.',
    definition: 'A quantity is the part of something that can be counted or measured. Temperature, mass, time and the number of products sold are different quantities.',
    why: 'The number alone does not identify the quantity. A recorded 4 could describe four products, four kilograms or four degrees, and each supports different calculations.',
    example: 'In the field temperature_c = 4, temperature is the quantity, degrees Celsius is the unit and 4 is the numerical value.',
    related: Object.freeze(['measurement', 'unit'])
  }),
  measurement: Object.freeze({
    slug: 'measurement',
    term: 'Measurement',
    aliases: Object.freeze(['measurement', 'measurements', 'measured', 'measuring']),
    short: 'A value produced by comparing a quantity with a unit.',
    definition: 'A measurement records how much of a chosen quantity is present by comparing it with an agreed unit. It therefore needs both a number and a unit.',
    why: 'Measurements inherit limits from the instrument and process that produced them. They are not automatically exact merely because a system stores many decimal places.',
    example: 'A freezer sensor reporting −18 °C has measured temperature. The sensor reading, its unit, time and device are all useful parts of the record.',
    related: Object.freeze(['quantity', 'unit', 'conversion'])
  }),
  unit: Object.freeze({
    slug: 'unit',
    term: 'Unit',
    aliases: Object.freeze(['unit', 'units']),
    short: 'The agreed amount used to express a measurement.',
    definition: 'A unit is an agreed reference amount used to state a measurement, such as kilograms for mass, seconds for time or degrees Celsius for temperature.',
    why: 'The same number in different units can describe different amounts. Calculations are trustworthy only when their units are known and compatible.',
    example: '3 kilograms and 3 grams share the number 3 but not the amount. The unit tells you that the first mass is one thousand times the second.',
    related: Object.freeze(['quantity', 'measurement', 'conversion'])
  }),
  conversion: Object.freeze({
    slug: 'conversion',
    term: 'Unit conversion',
    aliases: Object.freeze(['converting', 'conversion', 'converted', 'convert']),
    short: 'Expressing the same quantity in a different unit.',
    definition: 'A unit conversion changes how a quantity is expressed while keeping the underlying amount the same.',
    why: 'Mixed units create believable but false results. Good data work preserves the value that arrived, records the conversion rule and stores the converted value separately.',
    example: '3,000 grams and 3 kilograms describe the same mass. Dividing by 1,000 changes the unit and numerical value, not the quantity itself.',
    related: Object.freeze(['measurement', 'unit'])
  }),
  ratio: Object.freeze({
    slug: 'ratio',
    term: 'Ratio',
    aliases: Object.freeze(['ratio', 'ratios']),
    short: 'A comparison made by dividing one quantity by another.',
    definition: 'A ratio compares two named quantities by division. The result is understandable only when you know what was divided and what it was divided by.',
    why: 'Two calculations can produce the same number while describing different situations. Naming both parts prevents a correct division from becoming a misleading claim.',
    example: 'Five returns divided by 40 sales gives a return ratio of 0.125, or 12.5%. Returns divided by five staff members would answer a completely different question.',
    related: Object.freeze(['denominator', 'rate', 'percentage'])
  }),
  denominator: Object.freeze({
    slug: 'denominator',
    term: 'Denominator',
    aliases: Object.freeze(['denominator', 'denominators']),
    short: 'The quantity you divide by—the base of a ratio.',
    definition: 'The denominator is the quantity underneath the division line, or the quantity after the word “per.” It names the base against which the top quantity is compared.',
    why: 'Changing the denominator changes the question. Forty complaints may be serious among 500 sales and ordinary among 500,000 sales.',
    example: 'In 40 returns ÷ 5,000 sales, 5,000 sales is the denominator. The rate describes returns per sale, not returns per branch or per employee.',
    related: Object.freeze(['ratio', 'rate', 'percentage'])
  }),
  rate: Object.freeze({
    slug: 'rate',
    term: 'Rate',
    aliases: Object.freeze(['rate', 'rates']),
    short: 'A ratio comparing quantities with different units.',
    definition: 'A rate is a ratio whose two quantities use different units, such as sales per day, cost per kilogram or faults per thousand products.',
    why: 'Rates make differently sized periods, branches or products comparable. The unit after “per” must stay attached to the result.',
    example: 'A branch making £14,000 over seven days has an average sales rate of £2,000 per day. The total and the daily rate answer different questions.',
    related: Object.freeze(['ratio', 'denominator', 'percentage'])
  }),
  percentage: Object.freeze({
    slug: 'percentage',
    term: 'Percentage',
    aliases: Object.freeze(['percentage', 'percentages', 'percent', 'per cent']),
    short: 'A ratio expressed as an amount out of 100.',
    definition: 'A percentage expresses a ratio on a scale of 100. Multiplying a ratio by 100 changes its presentation, not the underlying comparison.',
    why: 'A percentage hides the counts that produced it. The same percentage based on 40 cases and 40,000 cases does not carry the same amount of evidence.',
    example: 'Five returns among 40 sales is 12.5%. Quote “5 of 40 (12.5%)” so the reader can see both the comparison and its size.',
    related: Object.freeze(['ratio', 'denominator', 'rate'])
  }),
  'missing-data': Object.freeze({
    slug: 'missing-data',
    term: 'Missing data',
    aliases: Object.freeze(['missing data', 'missing and unknown', 'missing value', 'missing values']),
    short: 'A value that is unavailable even though it could exist.',
    definition: 'Data is missing when a value could exist for the case being recorded but the system does not have it.',
    why: 'Missing does not mean zero. Replacing an unknown stock count with zero would claim that somebody inspected the shelf and found it empty.',
    example: 'A scanner outage prevents the closing stock count from arriving. Stock existed, but its value is unknown, so the record needs a blank plus the outage reason.',
    related: Object.freeze(['null', 'pending-data', 'not-applicable'])
  }),
  null: Object.freeze({
    slug: 'null',
    term: 'NULL',
    aliases: Object.freeze(['NULL', 'null']),
    short: 'A database marker saying no value is stored.',
    definition: 'NULL is a database marker for the absence of a stored value. By itself, it does not explain why the value is absent.',
    why: 'Different causes can look identical as NULL. Analysis must use process evidence or a reason field rather than guessing from the cell.',
    example: 'closing_stock_units = NULL may mean a scanner failed, the count is pending or the field does not apply. The accompanying status distinguishes them.',
    related: Object.freeze(['missing-data', 'pending-data', 'not-applicable'])
  }),
  'pending-data': Object.freeze({
    slug: 'pending-data',
    term: 'Pending value',
    aliases: Object.freeze(['pending']),
    short: 'A value that is expected but has not arrived yet.',
    definition: 'A pending value is temporarily absent because the event or process that will produce it has not finished.',
    why: 'Treating pending data as final creates premature totals and rates. The safe action is usually to wait, flag the record or state the reporting cutoff.',
    example: 'Returned units remain pending while the return window is open. Zero can be reported only after the window closes with no returns.',
    related: Object.freeze(['missing-data', 'null', 'not-applicable'])
  }),
  'not-applicable': Object.freeze({
    slug: 'not-applicable',
    term: 'Not applicable',
    aliases: Object.freeze(['not applicable']),
    short: 'No value can logically exist for this case.',
    definition: 'Not applicable means the field does not describe this case, so there is no correct value to collect.',
    why: 'It differs from missing information: there is nothing to recover, estimate or chase. Combining the two wastes effort and distorts completeness measures.',
    example: 'A cancelled order has no delivery date because delivery never happened. The date is not missing; it is not applicable.',
    related: Object.freeze(['missing-data', 'null', 'pending-data'])
  }),
  'categorical-data': Object.freeze({
    slug: 'categorical-data',
    term: 'Categorical data',
    aliases: Object.freeze(['categorical value', 'categorical values', 'categorical']),
    short: 'Values that identify groups or labels.',
    definition: 'Categorical data records which group or label a case belongs to, such as branch, payment method or product category.',
    why: 'Arithmetic on category codes usually has no meaning. A database may average branch numbers, but the answer does not describe an average branch.',
    example: 'branch_id 17 is a label even when stored as the number 17. Counting branch 17 is meaningful; adding it to branch 8 is not.',
    related: Object.freeze(['quantitative-data', 'ordinal-data', 'measurement-scale'])
  }),
  'quantitative-data': Object.freeze({
    slug: 'quantitative-data',
    term: 'Quantitative data',
    aliases: Object.freeze(['quantitative value', 'quantitative values', 'quantitative']),
    short: 'Values describing how much or how many.',
    definition: 'Quantitative data records an amount or count for which appropriate arithmetic has a real interpretation.',
    why: 'Looking numeric is not enough. The meaning of the field decides whether addition, averaging or comparison is legitimate.',
    example: 'units_sold is quantitative because 8 units and 4 units can be added to make 12 units. A numeric branch identifier cannot.',
    related: Object.freeze(['categorical-data', 'measurement-scale', 'unit'])
  }),
  'ordinal-data': Object.freeze({
    slug: 'ordinal-data',
    term: 'Ordinal data',
    aliases: Object.freeze(['ordinal categories', 'ordinal']),
    short: 'Categories with an order but no measured distance between them.',
    definition: 'Ordinal data can be ranked, but the gap between neighbouring categories is not known to be equal.',
    why: 'A mean assumes equal numerical gaps. For ratings such as poor, fair and good, the median or full distribution usually makes fewer unsupported assumptions.',
    example: '“Good” ranks above “fair,” but the improvement from fair to good has not been measured as equal to the improvement from poor to fair.',
    related: Object.freeze(['categorical-data', 'quantitative-data', 'measurement-scale'])
  }),
  'measurement-scale': Object.freeze({
    slug: 'measurement-scale',
    term: 'Measurement scale',
    aliases: Object.freeze(['interval scale', 'ratio scale', 'measurement scale', 'measurement scales']),
    short: 'The rules that determine which comparisons a value supports.',
    definition: 'A measurement scale describes the information carried by values and therefore which mathematical operations are meaningful.',
    why: 'Interval scales have meaningful differences but an arbitrary zero. Ratio scales also have a true zero, so statements such as “twice as much” become meaningful.',
    example: '20 °C is 10 degrees warmer than 10 °C but not twice as hot. Twenty units sold is genuinely twice ten units sold.',
    related: Object.freeze(['categorical-data', 'quantitative-data', 'ordinal-data'])
  }),
  grain: Object.freeze({
    slug: 'grain',
    term: 'Table grain',
    aliases: Object.freeze(['grain']),
    short: 'The precise thing represented by one row.',
    definition: 'A table’s grain is a complete statement of what one row represents.',
    why: 'Row counts count whatever the grain describes. If one row is a product line, counting rows gives product lines—not sales or customers.',
    example: 'The grain of sale_line is one product line within one completed sale. Sale 104 containing three products therefore occupies three rows.',
    related: Object.freeze(['key', 'composite-key', 'duplicate'])
  }),
  key: Object.freeze({
    slug: 'key',
    term: 'Key',
    aliases: Object.freeze(['key', 'keys']),
    short: 'The field or fields that uniquely identify a row.',
    definition: 'A key is a column or combination of columns whose values uniquely identify each row at the table’s declared grain.',
    why: 'A key lets a database test the grain. Repeated key values reveal either duplicate records or an incomplete description of what makes a row unique.',
    example: 'sale_id can identify one sale. Inside sale_line, sale_id alone repeats, so sale_id plus line_number forms the key.',
    related: Object.freeze(['grain', 'composite-key', 'duplicate'])
  }),
  'composite-key': Object.freeze({
    slug: 'composite-key',
    term: 'Composite key',
    aliases: Object.freeze(['composite key', 'composite keys']),
    short: 'A unique identifier formed from more than one field.',
    definition: 'A composite key combines two or more columns because no single column uniquely identifies a row.',
    why: 'Leaving out one part makes legitimate records appear duplicated. The chosen columns must match every distinguishing part of the grain.',
    example: 'branch_id + product_id + observation_time uniquely identifies an inventory snapshot when the same product is measured repeatedly.',
    related: Object.freeze(['grain', 'key', 'duplicate'])
  }),
  duplicate: Object.freeze({
    slug: 'duplicate',
    term: 'Duplicate record',
    aliases: Object.freeze(['duplicate', 'duplicates']),
    short: 'A repeated record at the table’s declared grain.',
    definition: 'A duplicate exists when two or more rows represent the same thing at the same grain and repeat the key that should be unique.',
    why: 'Similar-looking rows are not automatically duplicates. Deleting before checking the grain can destroy legitimate observations and the evidence needed to investigate.',
    example: 'Two stock readings for the same product at 08:00 and 12:00 are not duplicates when observation time is part of the grain.',
    related: Object.freeze(['grain', 'key', 'composite-key'])
  }),
  provenance: Object.freeze({
    slug: 'provenance',
    term: 'Data provenance',
    aliases: Object.freeze(['provenance']),
    short: 'The recorded history of where data came from and how it changed.',
    definition: 'Data provenance records a value’s source and the processing steps that produced the version now being used.',
    why: 'Without provenance, a plausible result cannot be reproduced, audited or corrected when its source is later found to be wrong.',
    example: 'A freezer report links −17.8 °C to sensor FZ-2 at 05:45 and to normalise_temperature_v3, the conversion that produced it.',
    related: Object.freeze(['entity', 'transformation', 'derivation'])
  }),
  entity: Object.freeze({
    slug: 'entity',
    term: 'Entity or source record',
    aliases: Object.freeze(['entity', 'source record', 'source records']),
    short: 'The identifiable record or object from which a value came.',
    definition: 'In a lineage trace, the entity is the source item identified precisely enough to find again.',
    why: 'A number by itself cannot be audited. Its branch, device, transaction or observation time distinguishes its source from every similar record.',
    example: 'B-08 · FZ-2 · 05:45 identifies one freezer observation and acts as the source entity for the converted report value.',
    related: Object.freeze(['provenance', 'transformation', 'derivation'])
  }),
  transformation: Object.freeze({
    slug: 'transformation',
    term: 'Transformation',
    aliases: Object.freeze(['transformation', 'transformations', 'processing']),
    short: 'A defined operation that changes data into another form.',
    definition: 'A transformation is a named, repeatable processing step that converts, filters, combines or otherwise changes data.',
    why: 'Recording the transformation and its version allows somebody else to repeat the result and identify which outputs are affected by a faulty rule.',
    example: 'normalise_temperature_v3 converts Fahrenheit readings to Celsius. Its version is part of the history because a later version may use a corrected rule.',
    related: Object.freeze(['provenance', 'entity', 'derivation'])
  }),
  derivation: Object.freeze({
    slug: 'derivation',
    term: 'Derivation',
    aliases: Object.freeze(['derivation', 'derived']),
    short: 'The link showing which sources and steps produced an output.',
    definition: 'A derivation connects an output to the source data and transformation from which it was produced.',
    why: 'The link works in both directions: trace a report backward to check it, or trace a faulty source forward to find every affected result.',
    example: 'The reported Celsius value is derived from one sensor reading through normalise_temperature_v3. That relationship is its derivation.',
    related: Object.freeze(['provenance', 'entity', 'transformation'])
  })
});

export const keywordFor = slug => LEARNING_KEYWORDS[slug] || null;
export const learningKeywords = Object.freeze(Object.values(LEARNING_KEYWORDS));
export const keywordPath = (slug, returnPath = '') => {
  const path = `/wiki/terms/${encodeURIComponent(slug)}`;
  return returnPath ? `${path}?from=${encodeURIComponent(returnPath)}` : path;
};
