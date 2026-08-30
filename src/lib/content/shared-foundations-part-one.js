export const SHARED_FOUNDATIONS_PART_ONE = Object.freeze({
  id: 'SHARED-FOUNDATIONS-PART-ONE',
  status: 'IN FINAL REVIEW · chapter not signed off',
  title: 'How Data Represents the World',
  subtitle: 'Part One of Volume 0',
  totalMinutes: 44,
  sessions: Object.freeze([
    Object.freeze({
      id: 'representation', number: '01', title: 'A sale is not its record', studyMinutes: 8, playMinutes: 5,
      objective: 'Explain the difference between something that happened and the data recorded about it, and say where each recorded value came from.',
      audioSummary: 'You buy three items and leave with a receipt. The purchase happened in the shop. The receipt records part of it: the items, the quantities, the prices, the time and the total. A shop holds far more data than it holds goods, because one product carries a barcode, a name, a supplier, a price, a stock count and a sales history. The checkout keeps the details it needs for the purchase and not every detail about the shop at that moment. A value enters a record in one of three ways. It is observed at the event, retrieved from stored information, or calculated from other values.',
      opening: 'You buy three items and leave the shop with a receipt. The purchase happened in the shop. The receipt is a record of part of that purchase: the items, quantities, prices, time, and total. Every detail written on it is data.',
      sections: Object.freeze([
        Object.freeze({ heading: 'A shop holds more data than it holds goods', paragraphs: Object.freeze([
          'Goods are the physical things a shop buys and sells. Data is what the shop records about those goods and about what happens to them. One product can have a barcode, name, supplier, price, stock count, shelf location, and sales history. Three products can therefore create far more than three pieces of data.'
        ]), images: Object.freeze([
          Object.freeze({ src: '/media/ch01-01/frame-1-aisle.webp', alt: 'A shopper reaches for a bottle on a supermarket shelf, a basket in the other hand, while a cashier waits at a counter behind them.', caption: 'Goods on the shelf. Data about every one of them.' })
        ]) }),
        Object.freeze({ heading: 'A row records what happened, not the story behind what happened', paragraphs: Object.freeze([
          'The checkout counter keeps the details it needs for the purchase: which items were scanned, how many were bought, when the sale happened, the stored price, and the total. It does not record every detail about the shop at that moment.',
          'Other systems may record shelf stock, weather, or whether a freezer door was open. One row contains the details that one system collected; it is not the complete story.'
        ]), images: Object.freeze([
          Object.freeze({ src: '/media/ch01-01/frame-2-counter.webp', alt: 'The shopper places three items on the checkout counter while the cashier reaches for the first one.', caption: 'This is the event. The row comes afterwards, and keeps the part the checkout needed.' })
        ]) }),
        Object.freeze({ heading: 'Observed, stored, and calculated values', paragraphs: Object.freeze([
          'The scanner observes the barcode when the item passes the checkout. The checkout looks up the product name and unit price that were already stored. It then calculates the line total from the quantity and unit price. A calculated value is also called a derived value.',
          'These are three ways a value can enter a record: observed at the event, retrieved from stored information, or calculated from other values.'
        ]), images: Object.freeze([
          Object.freeze({ src: '/media/ch01-01/frame-3-scan.webp', alt: 'A hand holds a bottle just above a scanner plate set into the counter, its blank label panel facing the viewer.', caption: 'Observed: the code comes from the world, at the moment it happens.' }),
          Object.freeze({ src: '/media/ch01-01/frame-4-till.webp', alt: 'A checkout counter with a blank screen on a stalk, a keypad, and a blank receipt curling from the printer slot.', caption: 'Looked up and calculated: the price was already stored, the total was worked out.' })
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
      id: 'observations-variables', number: '02', title: 'Rows and columns', studyMinutes: 7, playMinutes: 5,
      objective: 'Say what one row of a table represents and what one column contains, using the words observation and variable.',
      audioSummary: 'A table organises information into rows and columns. Each row contains details about one case. In a customer table that case is one customer; in a sales table it is one completed sale. A recorded case is called an observation. A column is intended to contain the same kind of detail for every row, and a characteristic recorded across many cases is called a variable. Customer postcode is a variable, and so is sale total. Real tables can be messy, so a column does not always hold its information consistently.',
      opening: 'A table organises information into rows and columns.',
      sections: Object.freeze([
        Object.freeze({ heading: 'What does a row represent?', paragraphs: Object.freeze([
          'Suppose a table lists five customers. Each row contains details about one customer. That customer is the case recorded in the row. Data professionals often call a recorded case an observation.',
          'A different table may contain completed sales. In that table, each row contains details about one sale. The row is still a row; the kind of case recorded in it has changed.'
        ]), images: Object.freeze([
          Object.freeze({ src: '/media/ch01-02/ledger-grid.webp', alt: 'A shop worker stands behind a counter with a large paper register open in front of her, its pages ruled into an empty grid of rows and columns.', caption: 'Rows across, columns down, and nothing written in yet.' })
        ]) }),
        Object.freeze({ heading: 'What does a column contain?', paragraphs: Object.freeze([
          'A column is intended to contain the same kind of detail for every row. A customer table might have columns for customer name, postcode, and registration date. A sales table might have columns for sale time, branch, and total paid.',
          'A characteristic recorded across many cases is called a variable. Customer postcode is a variable. Sale total is another variable. Real tables can be messy, so a column does not always contain its information consistently.'
        ]) })
      ]),
      figures: Object.freeze([
        Object.freeze({ kind: 'row-column', caption: 'One row, one column', note: 'The band across is one recorded case. The band down is one detail held for every case.' })
      ]),
      example: Object.freeze({ title: 'The same structure, two different tables', headers: Object.freeze(['Table','One row contains details about','Some of its columns']), rows: Object.freeze([
        Object.freeze(['customers','one customer','name, postcode, registration date']), Object.freeze(['sales','one completed sale','sale time, branch, total paid'])
      ]) }),
      rehearsal: Object.freeze({
        mission: 'classify-data',
        lead: 'One field from the mission at the end of this session. It is a first look at a question the next chapter answers properly: what kind of thing is this value, and what does that let you do with it?',
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
            why: 'A barcode identifies a product. The checkout uses it to find the product record and its current stored price. Adding two barcodes together, or averaging them, tells us nothing useful.'
          })
        ]),
        closing: 'The mission asks this of one field after another. The full explanation comes later, when digits and quantities get a session of their own.'
      }),
      workbook: Object.freeze({ title: 'Read a small table properly', prompt: 'Use a receipt, timetable, fitness app or another small record you can see.', steps: Object.freeze(['Finish the sentence “one row contains details about…”', 'Choose five columns and write what kind of detail each one holds.', 'Name two of those columns as variables.', 'Find one column that does not hold its information consistently.', 'Write what a second table about the same shop would put in one row.']) }),
      check: Object.freeze({ prompt: 'A table has one row for each completed sale. What is recorded in one row?', answer: 'sale', options: Object.freeze([['customer','Details about one customer'],['sale','Details about one completed sale'],['product','Details about one product']]), explanation: 'The case recorded in each row is one completed sale, so one row contains the details of that sale.' }),
      practice: Object.freeze({ title: 'Classify Store Data', href: '?mode=game&mission=classify-data', instruction: 'Inspect Superstore fields and decide what each value means before choosing its data type.' }),
      sources: Object.freeze([Object.freeze({label:'OpenStax: Data, Sampling, and Variation',url:'https://openstax.org/books/introductory-statistics-2e/pages/1-2-data-sampling-and-variation-in-data-and-sampling',licence:'CC BY 4.0'}),Object.freeze({label:'Statistics Canada: observations and variables',url:'https://www150.statcan.gc.ca/n1/edu/power-pouvoir/ch1/definitions/5214853-eng.htm'})])
    }),
    Object.freeze({
      id: 'rows-grain', number: '03', title: 'What one row represents', studyMinutes: 5, playMinutes: 5,
      objective: 'Say what one row of a table represents, and explain why counting rows is not automatically counting sales.',
      audioSummary: 'Twelve checkout rows come from one branch on one morning, and some receipt numbers repeat. A table’s grain tells us what one row represents, and a well-organised table uses the same grain throughout. One customer buying three products and paying once can be recorded in more than one useful way. A purchase table keeps one row for the whole purchase. A purchased-items table keeps one row for each product line inside it. Both describe the same checkout at different levels of detail. Before using a table, find out what one row represents.',
      opening: 'One customer buys three products and pays once. The shop can record that purchase in more than one useful way, and the number of rows is different in each.',
      sections: Object.freeze([
        Object.freeze({ heading: 'What one row represents', paragraphs: Object.freeze([
          'A table’s grain tells us what one row represents. A well-organised table uses the same grain throughout.',
          'One customer buys three products and pays once. The shop can record that purchase in more than one useful way.'
        ]) }),
        Object.freeze({ heading: 'The same purchase, recorded two ways', paragraphs: Object.freeze([
          'A purchase table keeps one row for the whole purchase. One row represents one completed purchase, and that is the grain of the purchase table.',
          'A purchased-items table keeps one row for each product on the receipt. One row represents one product line within a purchase, and that is the grain of the purchased-items table.',
          'Both tables describe the same checkout. They organise it at different levels of detail. Twelve rows in the second table can be seven purchases in the first.'
        ]), images: Object.freeze([
          Object.freeze({ src: '/media/ch01-03/one-purchase-two-forms.webp', alt: 'One blank receipt beside a bottle, a loaf and a carton, with arrows leading down to two blank forms: one ruled as a single wide box, the other as three stacked boxes.', caption: 'One purchase. One row on the left, three on the right, and neither is wrong.' })
        ]) })
      ]),
      figure: Object.freeze({ kind: 'row-grain', caption: 'One purchase, two ways to record it', note: 'The same checkout as one purchase row, and as one row for each product line inside it.' }),
      example: Object.freeze({ title: 'One purchase, two tables', headers: Object.freeze(['Table','Number of rows','One row represents']), rows: Object.freeze([
        Object.freeze(['purchase','1','one completed purchase']), Object.freeze(['purchased_item','3','one product line within a purchase'])
      ]) }),
      workbook: Object.freeze({ title: 'One row represents…', prompt: 'Look at three small tables and finish the same sentence for each one.', steps: Object.freeze(['A table with one row for every customer who joined the loyalty scheme. One row represents…', 'A table with one row for every delivery van leaving the depot each morning. One row represents…', 'A table with one row for every item scanned at a checkout. One row represents…', 'Now say which of those three tables would have the most rows for one busy Saturday, and why.']) }),
      check: Object.freeze({ prompt: 'A purchased-items table holds three rows for one customer’s shopping trip. How many purchases do those rows represent?', answer: 'one', options: Object.freeze([['three','Three purchases, one for each row'],['one','One purchase, recorded as three product lines'],['customers','Three customers, one for each row']]), explanation: 'The grain of that table is one product line, so three rows are three product lines. The customer paid once, so it is one purchase.' }),
      practice: Object.freeze({ title: 'What Does One Row Represent?', href: '?mode=game&mission=table-grain', instruction: 'Inspect six tables, state what one row represents and only then interpret their row counts.' }),
      sources: Object.freeze([Object.freeze({label:'Statistics Canada: observations and variables',url:'https://www150.statcan.gc.ca/n1/edu/power-pouvoir/ch1/definitions/5214853-eng.htm'}),Object.freeze({label:'Australian Bureau of Statistics: data units and records',url:'https://www.abs.gov.au/statistics/understanding-statistics/statistical-terms-and-concepts/data'})])
    }),
    Object.freeze({
      id: 'context-quality', number: '04', title: 'Zero, blank or missing?', studyMinutes: 7, playMinutes: 5,
      objective: 'Explain why a recorded zero and a missing value mean different things, and choose correctly between them.',
      audioSummary: 'A small grocery shop counts its stock at noon. The milk shelf was counted and no cartons remained, so its value is zero, which is a known count. The bread count was due but never entered, so its value is NULL, which means the system does not have the count. NULL does not mean there is no bread. Replacing NULL with zero turns we do not know into we know there are none, and those are not the same statement. A third case is different again: when an item does not apply at all, that should not be recorded as zero either.',
      opening: 'A small grocery shop records its stock at 12:00 and updates it again at 18:00. At noon the inventory holds three entries: milk cartons 0, bread loaves blank, egg boxes 12.',
      sections: Object.freeze([
        Object.freeze({ heading: 'Did nothing happen—or do we simply not know?', paragraphs: Object.freeze([
          'The milk shelf was counted and no cartons remained. Its value is 0. Zero is a known count.',
          'The bread count was due at noon, but it was not entered. Its value is NULL. NULL does not mean that there is no bread. It means that the system does not have the count.',
          'Replacing NULL with 0 would change “we do not know” into “we know there are none.” Those statements are not the same, and calculations can produce misleading results if they are confused.'
        ]), images: Object.freeze([
          Object.freeze({ src: '/media/ch01-04/inventory-shelves.webp', alt: 'A shop worker holds a clipboard with a blank three-row form, looking at the top shelf of a unit. The top shelf is bare, the middle shelf is full of loaves, and the bottom shelf holds four egg boxes.', caption: 'The bare shelf was counted. The full one has not been reached yet. On paper they can look the same.' })
        ]) }),
        Object.freeze({ heading: 'Not applicable is a third meaning', paragraphs: Object.freeze([
          'Sometimes an item is not expected on that shelf at all, so no count was ever due. That is a third situation, and it is not the same as a count that found none or a count that was missed.',
          'It should not automatically be written as zero either. Zero says somebody looked and found none.'
        ]) })
      ]),
      example: Object.freeze({ title: 'Three entries in one inventory', headers: Object.freeze(['Item','Value at 12:00','What it means']), rows: Object.freeze([
        Object.freeze(['Milk cartons','0','count completed, none remained']), Object.freeze(['Bread loaves','NULL','count not submitted, amount unknown']), Object.freeze(['Egg boxes','12','count completed, twelve remained'])
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
        closing: 'Two blank cells, identical on screen. One can never be filled and one merely was not, and only the operational record separates them.'
      }),
      workbook: Object.freeze({ title: 'Zero or missing?', prompt: 'Four situations from the same grocery inventory. For each one, choose 0 when a completed count found none, or NULL when no count was recorded.', steps: Object.freeze(['The yoghurt shelf was counted at noon and was empty.', 'The staff member counting the freezer aisle went home before reaching it.', 'Six bags of rice were counted and six were on the shelf.', 'The tablet used for counting lost power halfway through the bakery section.', 'Now write one sentence saying what would go wrong if all four were entered as 0.']) }),
      check: Object.freeze({ prompt: 'A delivery-time field is blank because the parcel has not arrived yet. What does the blank mean?', answer: 'pending', options: Object.freeze([['zero','The delivery took zero minutes'],['pending','The value is expected after the parcel arrives'],['not-applicable','A delivery time can never apply to this parcel']]), explanation: 'The value is pending because the event that will produce it, the parcel arriving, has not happened yet.' }),
      practice: Object.freeze({ title: 'Missing Values Are Not Zero', href: '?mode=game&mission=missing-data', instruction: 'Use evidence from the real process to explain six missing values and choose a safe treatment.' }),
      sources: Object.freeze([Object.freeze({label:'UK Government Analysis Function: symbols in tables',url:'https://analysisfunction.civilservice.gov.uk/policy-store/symbols-in-tables-definitions-and-help/'}),Object.freeze({label:'PostgreSQL: NULL comparison rules',url:'https://www.postgresql.org/docs/current/functions-comparison.html'})])
    }),
    Object.freeze({
      id: 'question-to-decision', number: '05', title: 'From a request to an analysis', studyMinutes: 12, playMinutes: 8,
      objective: 'Say what data analysis is, and turn a request into a brief with a purpose, a question, a boundary and an outcome.',
      audioSummary: 'The manager of the Northgate shop is considering whether more checkout counters are needed on Saturdays. Data analysis is the process of using recorded information to answer a specific question. It turns rows of data into evidence somebody can understand and use. Before working with the numbers, the request is written as a short analysis brief with four parts. The purpose says why the work is being done. The question says what the shop needs to learn. The boundary says what the analysis covers, and the outcome says what it will produce. One thing the records do not hold is the moment a customer joined the queue, so this analysis can describe how busy the counters were, and cannot say how long anybody waited.',
      opening: 'The manager of the Northgate shop is considering whether more checkout counters are needed on Saturdays. The request is: “Prepare an analysis to help us decide whether Northgate needs more checkout counters on Saturdays.”',
      sections: Object.freeze([
        Object.freeze({ heading: 'What data analysis is', paragraphs: Object.freeze([
          'Data analysis is the process of using recorded information to answer a specific question. It turns rows of data into evidence that someone can understand and use.',
          'Before working with the numbers, the request is written as a short analysis brief. The brief has four parts: purpose, question, boundary, and outcome.'
        ]), images: Object.freeze([
          Object.freeze({ src: '/media/ch01-05/saturday-queue.webp', alt: 'Three supermarket checkout counters seen from the shop floor, each staffed and each with a queue of waiting customers behind it. The signs above the counters are blank.', caption: 'Saturday at Northgate. This is the thing the manager has to decide about.' })
        ]) }),
        Object.freeze({ heading: 'Purpose, and question', paragraphs: Object.freeze([
          'The purpose says why the analysis is being done. The shop needs to decide whether to test additional checkout counters on busy Saturdays. The purpose keeps the work focused on a real decision instead of producing a dashboard with no clear use.',
          'The question says what the shop needs to learn. Between 12:00 and 16:00 on Saturdays, how often are all open counters occupied, and how long do transactions take for different basket sizes? A clear question tells us which information the analysis must use.'
        ]), images: Object.freeze([
          Object.freeze({ src: '/media/ch01-05/brief-cards.webp', alt: 'A pinboard holding one blank sheet at the top, connected down to a row of four blank cards. The first card is outlined in rust orange.', caption: 'The request at the top, and the four parts it has to become. Purpose is the first.' })
        ]) }),
        Object.freeze({ heading: 'Boundary, and what the records can support', paragraphs: Object.freeze([
          'The boundary says what the analysis covers. This one covers the Northgate shop, Saturdays from 12:00 to 16:00, during the previous eight weeks. A boundary prevents a result about one place and period from being presented as a result about every shop and every day.',
          'The records show when scanning started, when payment finished, how many items were in the basket, and how many counters were open. They do not show when a customer joined the queue.',
          'So waiting time cannot be calculated from what exists. The analysis says that plainly instead of answering a different question in its place. To measure waiting time, the shop would have to record queue arrival during the trial itself.'
        ]) }),
        Object.freeze({ heading: 'Outcome', paragraphs: Object.freeze([
          'The outcome says what the analysis will produce. It is a short report on how fully the counters are used and how long transactions take, and it states that customer waiting time was not recorded.',
          'The manager can use that evidence when deciding whether to test additional counters.'
        ]) })
      ]),
      example: Object.freeze({ title: 'The Northgate brief, in four parts', headers: Object.freeze(['Part','What it answers','Northgate']), rows: Object.freeze([
        Object.freeze(['Purpose','Why is the analysis being done?','To decide whether to test more checkout counters on busy Saturdays']),
        Object.freeze(['Question','What does the shop need to learn?','How often every open counter is occupied, and how long transactions take']),
        Object.freeze(['Boundary','What will the analysis cover?','Northgate, Saturdays 12:00 to 16:00, the previous eight weeks']),
        Object.freeze(['Outcome','What will the analysis produce?','A short report, including what the data cannot tell us'])
      ]) }),
      workbook: Object.freeze({ title: 'Sort a second request into four parts', prompt: 'A different shop asks for help with its bakery waste. Place each sentence under purpose, question, boundary or outcome.', steps: Object.freeze([
        '“We need to decide whether to bake less bread on weekday afternoons.”',
        '“How much bread is unsold at closing time, and on which days?”',
        '“Weekday afternoons at the Riverside shop, over the last three months.”',
        '“A short summary the shop manager can read before the next order is placed.”',
        'Now write one sentence saying what the analysis could not claim if the shop never recorded how much bread was thrown away.'
      ]) }),
      exercise: Object.freeze({
        id: 'repair-the-request', type: 'decision-path', minutes: 7,
        title: 'Build the Northgate brief',
        instruction: 'Turn the manager’s request into an analysis brief. Choose the sentence that belongs in each part.',
        scenario: Object.freeze({ title: '“Prepare an analysis to help us decide whether Northgate needs more checkout counters on Saturdays.”', brief: 'The records show when scanning started, when payment finished, how many items were bought and which counters were open. They do not show when a customer joined the queue.' }),
        items: Object.freeze([
          Object.freeze({ id: 'purpose', stage: 'PURPOSE', prompt: 'Why is the analysis being done?', answer: 'decide', options: Object.freeze([
            Object.freeze(['prove','To show that Northgate needs two more checkout counters.']),
            Object.freeze(['decide','To help the shop decide whether to test more checkout counters on busy Saturdays.']),
            Object.freeze(['dashboard','To build a checkout dashboard with as many measures as possible.'])
          ]), why: 'It names the real decision without choosing the answer in advance.', retry: 'One option decides the conclusion before the work starts. Another produces something with no stated use.' }),
          Object.freeze({ id: 'question', stage: 'QUESTION', prompt: 'What does the shop need to learn?', answer: 'occupancy', options: Object.freeze([
            Object.freeze(['waited','During the busiest Saturday hours, how long did customers wait in the queue before being served?']),
            Object.freeze(['occupancy','Between 12:00 and 16:00 on Saturdays, how often is every open counter occupied, and how long do transactions take?']),
            Object.freeze(['national','Why self-service counters are slower across every Qubix shop.'])
          ]), why: 'It asks about this shop in those hours, and every part of it can be answered from fields the records actually hold.', retry: 'Waiting starts when somebody joins the queue, and nothing records that moment. A question the data cannot answer is not made better by being the question you wanted.' }),
          Object.freeze({ id: 'boundary', stage: 'BOUNDARY', prompt: 'What will the analysis cover?', answer: 'scoped', options: Object.freeze([
            Object.freeze(['everything','Every Qubix shop, every day, for as long as records exist.']),
            Object.freeze(['scoped','The Northgate shop, Saturdays from 12:00 to 16:00, during the previous eight weeks.']),
            Object.freeze(['none','No boundary, so the finding applies as widely as possible.'])
          ]), why: 'A boundary stops a result about one shop and one period being read as a result about all of them.', retry: 'The purpose named one shop and one busy period. The boundary should match it.' }),
          Object.freeze({ id: 'outcome', stage: 'OUTCOME', prompt: 'What will the analysis produce?', answer: 'report', options: Object.freeze([
            Object.freeze(['report','A short report on counter occupancy and transaction duration, and a clear statement that waiting time was not recorded.']),
            Object.freeze(['answer','A single sentence saying yes or no.']),
            Object.freeze(['extract','The raw records, so the manager can work it out.'])
          ]), why: 'It gives the manager evidence to decide with, and it is honest about what the records leave out.', retry: 'One option hides the reasoning. One hands the whole job back to the manager.' })
        ]),
        why: 'A brief with a purpose, a question, a boundary and an outcome keeps the analysis tied to a real decision, and it says in advance what the records will not be able to show.'
      }),
      check: Object.freeze({ prompt: 'A brief says the analysis covers the Northgate shop on Saturdays between 12:00 and 16:00, over the last eight weeks. Which part of the brief is that?', answer: 'boundary', options: Object.freeze([
        Object.freeze(['purpose','The purpose, because it says why the work is being done.']),
        Object.freeze(['boundary','The boundary, because it says what the analysis covers.']),
        Object.freeze(['outcome','The outcome, because it says what the analysis will produce.'])
      ]), explanation: 'It names a place and a period, which is what a boundary does. It stops a finding about one shop and one part of the week being presented as a finding about all of them.' }),
      practice: Object.freeze({ title: 'The Analyst’s Desk', href: '?mode=game&mission=analyst-desk', instruction: 'Decide what the evidence supports, what remains outside the data and which recommendation can honestly follow.' }),
      sources: Object.freeze([
        Object.freeze({label:'UK Government AQuA Book — analytical lifecycle',url:'https://www.gov.uk/guidance/the-aqua-book',licence:'Open Government Licence 3.0'}),
        Object.freeze({label:'National Academies — Data Science for Undergraduates',url:'https://nap.nationalacademies.org/catalog/25104/data-science-for-undergraduates-opportunities-and-options'})
      ])
    })
  ])
});
