export const SHARED_FOUNDATIONS_PART_ONE = Object.freeze({
  id: 'SHARED-FOUNDATIONS-PART-ONE',
  status: 'AI_DRAFT · AUTHORING ONLY',
  title: 'How Data Represents the World',
  subtitle: 'Part One of Volume 0',
  totalMinutes: 40,
  sessions: Object.freeze([
    Object.freeze({
      id: 'representation', number: '01', title: 'A sale is not its record', studyMinutes: 7, playMinutes: 5,
      objective: 'Explain the difference between something that happened and the data recorded about it.',
      audioSummary: 'Imagine buying three products from a shop. The purchase is an event in the real world. When the products are scanned, the checkout creates a record of that event. The record keeps selected details, so it is not the event itself. A value may be observed at the checkout, looked up from stored product information or calculated from other values. Keeping those origins separate helps us find mistakes and explain where a result came from.',
      opening: 'You buy three things and walk out with a receipt. It lists what you bought, the time of the purchase, and the total you paid. Everything on that receipt is data.',
      sections: Object.freeze([
        Object.freeze({ heading: 'A shop holds more data than it holds food', paragraphs: Object.freeze([
          'Look around a shop and you are looking at data. The inventory count for every shelf is data. The temperature inside the freezer is data. The electricity the store used last night is data. The number of people who came through the door this morning is data, and so is the number who left again without buying anything.'
        ]) }),
        Object.freeze({ heading: 'A row records what happened, not why', paragraphs: Object.freeze([
          'The sale row says two bottles at £3.40. It does not say this was the last brand left on the shelf. The footfall count says four hundred and twelve people came through the door. It does not say it rained all morning. The freezer reading says minus sixteen. It does not say the door had been propped open.',
          'The checkout (the till) was built to take payment, and it keeps what payment needs.'
        ]) }),
        Object.freeze({ heading: 'The scan, the saved price and the calculated total', paragraphs: Object.freeze([
          'Some values are observed when the event happens. A barcode is scanned or a sensor takes a reading. Some values already exist as stored reference information. A product already has a name, category and approved unit price.',
          'Other values are calculated. If two bottles cost £3.40 each, the system derives a line total of £6.80. “Derived” simply means calculated from other values.',
          'The distinction helps when something looks wrong. Check what was observed, what was looked up and what was calculated. A wrong record does not change the past; correcting it improves our description of the past and should preserve evidence of what changed.'
        ]) })
      ]),
      figure: Object.freeze({ kind: 'record-chain', caption: 'One purchase, three steps into data', note: 'The scan is observed, the price is looked up and the total is calculated. Each step can fail in a different way.' }),
      example: Object.freeze({ title: 'Follow one product through the checkout', headers: Object.freeze(['What the system does','Value','Where it came from']), rows: Object.freeze([
        Object.freeze(['Observes a scan','5012345678900','the barcode scanner']), Object.freeze(['Looks up the price','£3.40','the stored product record']), Object.freeze(['Calculates the total','2 × £3.40 = £6.80','quantity multiplied by unit price'])
      ]) }),
      workbook: Object.freeze({ title: 'Describe an everyday event', prompt: 'Choose something familiar: making tea, taking a bus or buying lunch.', steps: Object.freeze(['Write one sentence describing what happens in the real world.', 'List three details a system might record.', 'List two real details the system would probably leave out.', 'Label each recorded value as observed, stored or calculated.']) }),
      check: Object.freeze({ prompt: 'A checkout records quantity 2 and looks up a unit price of £3.40. It then produces £6.80. What kind of value is £6.80?', answer: 'derived', options: Object.freeze([['observation','Observed directly when the event happened'],['master','Already stored as product information'],['derived','Calculated from the quantity and price']]), explanation: '£6.80 is derived because the system calculates it by multiplying two recorded values.' }),
      practice: Object.freeze({ title: 'Process a Sale', href: '?mode=game&mission=checkout', instruction: 'Process one basket and identify what the checkout observes, looks up and calculates.' }),
      sources: Object.freeze([Object.freeze({label:'W3C PROV Overview',url:'https://www.w3.org/TR/prov-overview/'})])
    }),
    Object.freeze({
      id: 'observations-variables', number: '02', title: 'What is this table describing?', studyMinutes: 9, playMinutes: 5,
      objective: 'Say what one row represents, explain what a column records and choose a data type from meaning rather than appearance.',
      audioSummary: 'A table is easier to understand when you ask two questions. What does one row represent, and what question does each column answer? A row describes one observation, such as one product or one sale. A column records one variable consistently across those observations. Some variables are categories or labels. Others are quantities we can count or measure. A barcode contains digits, but it is still a label because arithmetic with barcodes has no useful meaning. The meaning of a value—not the way it looks—decides its data type.',
      opening: 'Look at any table and pause before reading the numbers. First ask: what does one row describe, and what question does each column answer?',
      sections: Object.freeze([
        Object.freeze({ heading: 'One row: one customer, one sale or one product?', paragraphs: Object.freeze([
          'Suppose a table lists five customers. Each row holds details that belong to one customer. That customer is the case being described, which data professionals call an observation.',
          'In another table, one row might describe one completed sale. The meaning of a row depends on the table. The same product can appear in thousands of sale rows because it was part of thousands of different purchase events.'
        ]) }),
        Object.freeze({ heading: 'Each column keeps one kind of detail', paragraphs: Object.freeze([
          'A customer-name column asks “what is this customer called?” for every row. A basket-total column asks “how much was paid in this sale?” A characteristic recorded consistently across observations is called a variable.',
          'A useful column has a clear name, meaning and—when needed—a unit. If people interpret the question differently, values that look tidy can still mean different things. Write the question in ordinary language whenever a column name feels unclear.'
        ]) }),
        Object.freeze({ heading: 'Why a barcode is not really a number', paragraphs: Object.freeze([
          'Categorical data names or groups things. A branch ID is a category with no natural order; this is called nominal data. Satisfaction levels such as Poor, Fair and Good can be ordered; this is called ordinal data. The gap between Fair and Good is not necessarily a measurable distance.',
          'Quantitative data describes an amount. Item count is discrete because it comes from counting whole items. Waiting time is continuous because it is measured and could, in principle, fall anywhere between two times.',
          'Digits do not automatically make a value quantitative. Barcode 5012345678901 is an identifier. Adding two barcodes or calculating their average would be meaningless. Choose a data type by asking what operations make sense, not by looking at the characters.'
        ]) })
      ]),
      figures: Object.freeze([
        Object.freeze({ kind: 'row-column', caption: 'One row, one column', note: 'The band across is one sale. The band down is one question asked of every sale.' }),
        Object.freeze({ kind: 'data-types', caption: 'Choose the type from the meaning', note: 'First ask whether the value is a label or an amount. Then ask whether order, counting or measurement makes sense.' })
      ]),
      example: Object.freeze({ title: 'The value tells you less than the meaning', headers: Object.freeze(['Column','Example value','What you may sensibly do']), rows: Object.freeze([
        Object.freeze(['branch_id','B-08','identify or group branches']), Object.freeze(['satisfaction','Good','place responses in order']), Object.freeze(['basket_total','£18.70','add, compare or calculate a difference'])
      ]) }),
      rehearsal: Object.freeze({
        mission: 'classify-data',
        lead: 'One field from the mission at the end of this session. Decide what kind of thing it is before the mission asks you, because the answer decides what you are allowed to do with it.',
        cases: Object.freeze([
          Object.freeze({
            caseId: 'barcode',
            facts: Object.freeze([
              Object.freeze(['The field', 'barcode']),
              Object.freeze(['What it is called', 'Product barcode']),
              Object.freeze(['Three real values', '5012345678901 · 5098765432107 · 5011122233344'])
            ]),
            question: 'Every value is thirteen digits. Does that make it a number?',
            answer: 'No. It is an identifier that happens to be written in digits.',
            why: 'Nothing sensible comes of adding two barcodes together, or averaging them, or asking which is larger. A value is the kind of thing its meaning makes it, not the kind of thing its characters suggest, and treating this as a number would also drop the leading zero on any barcode that has one.'
          })
        ]),
        closing: 'This is the question the whole mission asks, twenty-four times over. What kind of thing is this value, and what does that permit?'
      }),
      workbook: Object.freeze({ title: 'Read a small table properly', prompt: 'Use a receipt, timetable, fitness app or another small record you can see.', steps: Object.freeze(['Finish the sentence “one row represents…”', 'Choose five columns and write the question each one answers.', 'Classify each column as categorical or quantitative.', 'If it is categorical, decide whether the categories have an order.', 'If it is quantitative, decide whether it was counted or measured.', 'Circle any identifier that uses digits but is not an amount.']) }),
      check: Object.freeze({ prompt: 'Employee number 700184 contains only digits. Why should it be treated as categorical data?', answer: 'label', options: Object.freeze([['large','Because the value is a large number'],['label','Because it identifies a person and arithmetic with it has no meaning'],['whole','Because it has no decimal places']]), explanation: 'The employee number is a label. Its digits do not represent a quantity that can sensibly be added or averaged.' }),
      practice: Object.freeze({ title: 'Classify Store Data', href: '?mode=game&mission=classify-data', instruction: 'Inspect Superstore fields and decide what each value means before choosing its data type.' }),
      sources: Object.freeze([Object.freeze({label:'OpenStax: Data, Sampling, and Variation',url:'https://openstax.org/books/introductory-statistics-2e/pages/1-2-data-sampling-and-variation-in-data-and-sampling',licence:'CC BY 4.0'}),Object.freeze({label:'OpenStax: Levels of Measurement',url:'https://openstax.org/books/introductory-statistics-2e/pages/1-3-frequency-frequency-tables-and-levels-of-measurement',licence:'CC BY 4.0'}),Object.freeze({label:'NIST Engineering Statistics Handbook',url:'https://www.itl.nist.gov/div898/handbook/ppc/section1/ppc135.htm'})])
    }),
    Object.freeze({
      id: 'rows-grain', number: '03', title: '300 rows—but 300 of what?', studyMinutes: 5, playMinutes: 5,
      objective: 'Describe exactly what one row represents and explain what a row count is actually counting.',
      audioSummary: 'Before counting rows, ask what one row represents. A sale table may use one row for one completed sale. A sale-line table may use one row for one product within a sale. Data professionals call this the grain of the table. A count of rows counts things at that grain. Three sale-line rows mean three sale lines, not necessarily three sales or three customers. A join can repeat rows, so check the meaning of one row before and after joining tables.',
      opening: 'A table contains 300 rows. Is that 300 customers, 300 sales or 300 products? The number alone cannot tell you.',
      sections: Object.freeze([
        Object.freeze({ heading: 'The report says 300. What are the 300?', paragraphs: Object.freeze([
          'Every table needs a sentence that begins “one row represents…” For a sale table, the answer may be one completed sale. For a sale-line table, it may be one product line within one sale.',
          'Data professionals call this exact meaning the grain of the table. The name is less important than the habit: say what one row is before using a row count.'
        ]) }),
        Object.freeze({ heading: 'One basket can fill several rows', paragraphs: Object.freeze([
          'Suppose one customer buys three different products and pays once. The sale table may contain one row for the whole purchase. The sale-line table may contain three rows—one for each product line. The payment table may contain one row for the payment attempt.',
          'None of those row counts is wrong. Each table describes the event at a different grain. COUNT(*) simply counts the rows that exist in the table you are using.'
        ]) }),
        Object.freeze({ heading: 'Why matching two tables can multiply the rows', paragraphs: Object.freeze([
          'A join connects matching rows from two tables. If one product record matches many sale lines, its name and category will appear once beside every matching line. That repetition may be correct.',
          'Unexpected trouble begins when both sides contain several matches and the join multiplies rows. Before joining, write the intended output sentence: “one result row should represent…” Then check whether it is still true afterwards.'
        ]) })
      ]),
      figure: Object.freeze({ kind: 'row-grain', caption: 'One purchase, three ways to organise the records', note: 'Different tables can describe the same event with different legitimate row counts.' }),
      example: Object.freeze({ title: 'One purchase appears differently in three tables', headers: Object.freeze(['Table','Number of rows','One row represents']), rows: Object.freeze([
        Object.freeze(['sale','1','one completed sale']), Object.freeze(['sale_line','3','one product line within one sale']), Object.freeze(['payment','1','one payment attempt for the sale'])
      ]) }),
      rehearsal: Object.freeze({
        mission: 'table-grain',
        lead: 'The first table in the mission at the end of this session. State what one row is before you meet it, because everything you can count depends on that answer.',
        cases: Object.freeze([
          Object.freeze({
            caseId: 'sale',
            facts: Object.freeze([
              Object.freeze(['The table', 'sale']),
              Object.freeze(['How a row gets there', 'A checkout creates one header record when payment succeeds.'])
            ]),
            question: 'Three rows come back from this table. Three of what?',
            answer: 'Three completed sales.',
            why: 'Each sale_id appears once and describes the whole transaction. COUNT(*) counts sale records: three rows means three completed sales, not three products. Somebody who reports it as products has not misread the number, they have misread the row.'
          })
        ]),
        closing: 'Every table in the mission asks the same two questions, and the second one only has an answer once the first does: what is one row, and therefore what does counting them tell you?'
      }),
      workbook: Object.freeze({ title: 'Change the row, change the meaning', prompt: 'Imagine recording attendance at a weekly class.', steps: Object.freeze(['Write “one row represents one learner enrolled in one class.”', 'Now write a different sentence for attendance at one particular class session.', 'List the columns needed to distinguish the rows in each table.', 'Explain why the attendance table can contain more rows than the enrolment table.', 'Write what COUNT(*) would count in each table.']) }),
      check: Object.freeze({ prompt: 'Sale S-1041 has three rows in a sale-line table. What does COUNT(*) return for those rows?', answer: 'lines', options: Object.freeze([['sales','One completed sale'],['lines','Three sale-line records'],['products','Every product sold by the company']]), explanation: 'COUNT(*) returns three because it counts the existing sale-line rows. It does not automatically count sales.' }),
      practice: Object.freeze({ title: 'What Does One Row Represent?', href: '?mode=game&mission=table-grain', instruction: 'Inspect six tables, state what one row represents and only then interpret their row counts.' }),
      sources: Object.freeze([Object.freeze({label:'Statistics Canada: observations and variables',url:'https://www150.statcan.gc.ca/n1/edu/power-pouvoir/ch1/definitions/5214853-eng.htm'}),Object.freeze({label:'Australian Bureau of Statistics: data units and records',url:'https://www.abs.gov.au/statistics/understanding-statistics/statistical-terms-and-concepts/data'})])
    }),
    Object.freeze({
      id: 'context-quality', number: '04', title: 'Zero, blank or missing?', studyMinutes: 7, playMinutes: 5,
      objective: 'Explain why zero, a blank and an invalid value mean different things, and why measurements need units.',
      audioSummary: 'The number in a cell is only useful when we know what it means. Zero is a known answer, but a blank means the system holds no answer. The value might be unknown, expected later or not applicable at all. Those situations should not be treated in the same way. A measurement also needs a unit. Ten kilograms and ten centimetres both contain the number ten, but they describe different kinds of quantity. Good data checks meaning and context, not only whether a value fits into a column.',
      opening: 'You see `0`, a blank cell and `10` in a table. None of them can be interpreted safely until you know what the columns mean.',
      sections: Object.freeze([
        Object.freeze({ heading: 'Did nothing happen—or do we simply not know?', paragraphs: Object.freeze([
          'A returned-item count of zero means the system knows that no items were returned. A blank cell means the system does not currently hold a value. In databases, that missing value is often represented by NULL.',
          'The reason may be unknown, expected later, deliberately uncollected or not applicable. Replacing every blank with zero changes “we do not know” into “we know none occurred.” That invents evidence and can distort totals, averages and decisions.'
        ]) }),
        Object.freeze({ heading: '“Unknown” fits in the box, but it may still be wrong', paragraphs: Object.freeze([
          'A data type tells a system how to store and handle a value. Dates should work in calendar calculations. Text can preserve identifiers that begin with zero. A true-or-false field should contain only the states its definition allows.',
          'Passing a format check is not enough. The text “unknown” fits inside a text column, but it is still invalid if that column requires a two-letter country code. Validation must check both form and meaning.'
        ]) }),
        Object.freeze({ heading: 'Ten what? A number needs a unit', paragraphs: Object.freeze([
          'The value 10 might mean 10 kilograms, 10 minutes or 10 degrees. The number is incomplete without its unit because the unit tells us what kind of quantity was measured.',
          'Compatible units can be converted: 100 centimetres can become 1 metre. Incompatible quantities cannot. Ten centimetres cannot become ten kilograms by changing a label. That is evidence of a recording or mapping error that should be set aside and investigated.'
        ]) })
      ]),
      example: Object.freeze({ title: 'The cell is only the beginning', headers: Object.freeze(['Cell','Column','What it means']), rows: Object.freeze([
        Object.freeze(['0','returned_unit_count','known answer: no units were returned']), Object.freeze(['NULL','delivery_time','no value is held; find out why']), Object.freeze(['28 cm','mass_kg','wrong kind of measurement; do not convert'])
      ]) }),
      rehearsal: Object.freeze({
        mission: 'missing-data',
        lead: 'Two cells from the mission at the end of this session. Both are blank, and they need opposite treatment.',
        cases: Object.freeze([
          Object.freeze({
            caseId: 'pickup-distance',
            facts: Object.freeze([
              Object.freeze(['Field', 'delivery_distance_km']),
              Object.freeze(['The cell shows', 'NULL']),
              Object.freeze(['Operational evidence', 'fulfilment_method = PICKUP · No delivery journey exists'])
            ]),
            question: 'Is this a distance nobody measured, or a distance that does not exist?',
            answer: 'It does not exist.',
            why: 'Delivery distance does not apply because there was no delivery. Nobody can ever fill this in, so chasing it is wasted effort and averaging it as zero would put a collected order into a delivery statistic.'
          }),
          Object.freeze({
            caseId: 'temperature-unknown',
            facts: Object.freeze([
              Object.freeze(['Field', 'temperature_c']),
              Object.freeze(['The cell shows', 'NULL']),
              Object.freeze(['Operational evidence', 'Device online · Calibration window: 13:00–13:10'])
            ]),
            question: 'The cold room had a temperature during those ten minutes. Why is the cell empty?',
            answer: 'It was not recorded, though it existed.',
            why: 'The sensor was busy calibrating and sent a heartbeat without a reading. The value was real and is simply not in the record, which is a different problem from a value that could never exist and needs a different note beside it.'
          })
        ]),
        closing: 'Two blank cells, identical on screen. One can never be filled and one merely was not, and only the operational record separates them. That is what this session means by context.'
      }),
      workbook: Object.freeze({ title: 'Give five values their context', prompt: 'Review five fields from a form, spreadsheet or app you know.', steps: Object.freeze(['Write what each field is meant to record.', 'Add the unit wherever the field contains a measurement.', 'Write what zero would mean in each field.', 'Write two possible reasons for a blank.', 'Find one value that could have the correct format but the wrong meaning.', 'Choose the safest response: keep it, correct it using evidence, or set it aside for investigation.']) }),
      check: Object.freeze({ prompt: 'A delivery-time field is blank because the parcel has not arrived yet. What does the blank mean?', answer: 'pending', options: Object.freeze([['zero','The delivery took zero minutes'],['pending','The value is expected after the parcel arrives'],['not-applicable','A delivery time can never apply to this parcel']]), explanation: 'The value is pending because the event that will produce it—the parcel arriving—has not happened yet.' }),
      practice: Object.freeze({ title: 'Missing Values Are Not Zero', href: '?mode=game&mission=missing-data', instruction: 'Use evidence from the real process to explain six missing values and choose a safe treatment.' }),
      sources: Object.freeze([Object.freeze({label:'UK Government Analysis Function: symbols in tables',url:'https://analysisfunction.civilservice.gov.uk/policy-store/symbols-in-tables-definitions-and-help/'}),Object.freeze({label:'PostgreSQL: NULL comparison rules',url:'https://www.postgresql.org/docs/current/functions-comparison.html'})])
    }),
    Object.freeze({
      id: 'question-to-decision', number: '05', title: 'What decision are we helping with?', studyMinutes: 12, playMinutes: 8,
      objective: 'Turn a vague request into a fair question that the available data can answer and a decision it can support.',
      audioSummary: 'Good analysis begins with a decision, not with a chart or a preferred conclusion. First ask who must choose, what options are available and when the choice must be made. Then write a fair question by naming the people or events being studied, the outcome, the comparison and the time period. Check whether the available records actually contain the evidence needed. Agree what result would be useful before looking at the answer. Finally, keep the finding separate from the recommendation so everyone can see where evidence ends and judgement begins.',
      opening: 'A manager says, “Make a dashboard proving we need more tills.” It sounds specific, but it asks the data to defend an answer chosen in advance.',
      sections: Object.freeze([
        Object.freeze({ heading: 'What will the manager actually decide?', paragraphs: Object.freeze([
          'A dashboard, query or model is only an output. It becomes useful when it helps a named person make a real choice. Ask who will decide, what options they have, when they need the answer and what could happen if they are wrong.',
          '“The regional operations manager will decide on Friday whether to run a four-week staffing trial” gives the work a purpose. “Prove we need more tills” does not. The word prove has already chosen the conclusion.'
        ]) }),
        Object.freeze({ heading: 'Did the system record what we need?', paragraphs: Object.freeze([
          'A useful analytical question names who or what is being studied, the outcome, the comparison and the time period. For example: “For Saturday checkouts at Northgate, how do scan-to-payment times differ between staffed and self-service tills for similar basket sizes?”',
          'Now compare the question with the available data. Qubix records when scanning starts and payment finishes, the item count and the till type. It does not record when a shopper joins the queue. The analysis can compare transaction time, but it cannot honestly claim to measure waiting time before scanning.'
        ]) }),
        Object.freeze({ heading: 'Set the goal before seeing the answer', paragraphs: Object.freeze([
          'Choose the comparison and success measure before calculating the answer. Otherwise it is tempting to select whichever number makes the preferred option look best. Agree how large an improvement would justify the trial and what harmful result would stop it.',
          'A finding is not the same as a decision. The analyst explains what the records show, what remains uncertain and what the data could not measure. The manager combines that evidence with cost, staffing and practical constraints. After acting, the team checks what happened and learns from it.'
        ]) })
      ]),
      figure: Object.freeze({ kind: 'decision-cycle', caption: 'A decision begins and ends the analysis', note: 'The result supports a choice. Monitoring what happens next creates evidence for the next question.' }),
      example: Object.freeze({ title: 'Turn a biased request into an honest investigation', headers: Object.freeze(['Part','Weak request','Better version']), rows: Object.freeze([
        Object.freeze(['Purpose','Prove we need more tills','Decide whether to run a four-week Saturday staffing trial']),
        Object.freeze(['Question','Why are queues bad?','How do recorded transaction stages differ by till type and basket size at Northgate on Saturdays?']),
        Object.freeze(['Boundary','All waiting time','From scan start to payment completion; pre-scan queue time is not recorded']),
        Object.freeze(['Outcome','A dashboard','Finding, uncertainty, recommendation and an agreed monitoring measure'])
      ]) }),
      workbook: Object.freeze({ title: 'Repair a data request', prompt: 'Choose a request such as “show that sales are down” or “find our best branch.”', steps: Object.freeze([
        'Name the person who must make a decision.',
        'Write the real options available to that person.',
        'Remove any wording that assumes the answer in advance.',
        'Name who or what will be studied, the outcome, comparison and time period.',
        'List what the available records can measure and one thing they cannot.',
        'Write what result would be useful before calculating it.',
        'Keep the eventual finding separate from your recommendation.'
      ]) }),
      exercise: Object.freeze({
        id: 'repair-the-request', type: 'decision-path', minutes: 7,
        title: 'Repair a biased dashboard request',
        instruction: 'Build an analysis brief for the Northgate till decision. Choose the option that keeps the decision, evidence and conclusion separate.',
        scenario: Object.freeze({ title: '“Make a dashboard proving Northgate needs more staffed tills.”', brief: 'The regional operations manager must decide on Friday whether to fund a four-week Saturday trial. The sale data records scan and payment timestamps, item count and till type—but not arrival at the queue.' }),
        items: Object.freeze([
          Object.freeze({ id: 'decision', stage: 'DECISION', prompt: 'What should the brief commit to first?', answer: 'trial', options: Object.freeze([
            Object.freeze(['prove','Prove that two more staffed tills are necessary.']),
            Object.freeze(['trial','Support the Friday decision on whether to run a four-week Saturday staffing trial.']),
            Object.freeze(['dashboard','Deliver a till-performance dashboard with as many metrics as possible.'])
          ]), why: 'It names the owner’s real choice and deadline without assuming which option the evidence will favour.', retry: 'Choose the statement that defines an action and deadline without choosing the conclusion.' }),
          Object.freeze({ id: 'question', stage: 'QUESTION', prompt: 'Which question can the available records answer honestly?', answer: 'transaction', options: Object.freeze([
            Object.freeze(['queue','How much faster will queues become after two tills are added?']),
            Object.freeze(['transaction','For Northgate Saturdays, how do scan-to-payment times differ by till type after accounting for basket size?']),
            Object.freeze(['national','Why are self-service tills slower across the whole Qubix estate?'])
          ]), why: 'It matches the branch, period and fields actually recorded, and it does not rename transaction time as unobserved queue time.', retry: 'Check the stated data boundary: no timestamp records when a shopper joins the queue.' }),
          Object.freeze({ id: 'criterion', stage: 'SUCCESS MEASURE', prompt: 'When should the success criterion be agreed?', answer: 'before', options: Object.freeze([
            Object.freeze(['after','After seeing which metric makes the trial look most favourable.']),
            Object.freeze(['before','Before analysis, with a minimum useful improvement and an adverse-outcome guardrail.']),
            Object.freeze(['none','No criterion is needed because the manager will recognise a good result.'])
          ]), why: 'Pre-agreement prevents the target moving after the result is known and makes the later decision auditable.', retry: 'Choose the option that prevents the result from determining its own definition of success.' }),
          Object.freeze({ id: 'handover', stage: 'FINDING AND DECISION', prompt: 'What should the final handover contain?', answer: 'separate', options: Object.freeze([
            Object.freeze(['recommendation','Only the recommendation; operational leaders do not need analytical detail.']),
            Object.freeze(['separate','The finding, uncertainty and data boundary, followed by a clearly separate recommendation and monitoring plan.']),
            Object.freeze(['raw','The raw extract so the manager can decide what it means.'])
          ]), why: 'It preserves what the evidence established, what remains uncertain and where judgement enters the decision.', retry: 'Choose the handover that makes both evidence and judgement visible without confusing them.' })
        ]),
        why: 'The repaired brief begins with a real decision, asks only what the data can answer, fixes success before seeing the result and keeps the analytical finding separate from managerial judgement.'
      }),
      check: Object.freeze({ prompt: 'A director asks you to “prove the new checkout process worked.” What should you do first?', answer: 'reframe', options: Object.freeze([
        Object.freeze(['chart','Choose the chart that makes the improvement easiest to see.']),
        Object.freeze(['reframe','Clarify the decision, fair comparison, outcome, group being studied and success measure.']),
        Object.freeze(['average','Calculate an average before discussing what the question means.'])
      ]), explanation: 'Reframing removes the assumed answer and defines what evidence would matter before anyone sees the result.' }),
      practice: Object.freeze({ title: 'The Analyst’s Desk', href: '?mode=game&mission=analyst-desk', instruction: 'Decide what the evidence supports, what remains outside the data and which recommendation can honestly follow.' }),
      sources: Object.freeze([
        Object.freeze({label:'UK Government AQuA Book — analytical lifecycle',url:'https://www.gov.uk/guidance/the-aqua-book',licence:'Open Government Licence 3.0'}),
        Object.freeze({label:'National Academies — Data Science for Undergraduates',url:'https://nap.nationalacademies.org/catalog/25104/data-science-for-undergraduates-opportunities-and-options'})
      ])
    })
  ])
});
