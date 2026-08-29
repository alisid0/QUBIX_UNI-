export const TABLE_GRAIN_MISSION = Object.freeze({
  id: 'MISSION 004', status: 'AI_DRAFT', role: 'PRE-INTERN', title: 'What Does One Row Represent?',
  competency: 'State a table’s grain precisely and interpret a row count without changing its meaning.',
  sources: Object.freeze([
    Object.freeze({ label: 'Statistics Canada — rows and observation units', url: 'https://www150.statcan.gc.ca/n1/edu/power-pouvoir/ch1/definitions/5214853-eng.htm' }),
    Object.freeze({ label: 'Statistics Canada — statistical units', url: 'https://www150.statcan.gc.ca/n1/pub/11-634-x/2016001/section1/chap3-eng.htm' }),
    Object.freeze({ label: 'Australian Bureau of Statistics — data units and records', url: 'https://www.abs.gov.au/statistics/understanding-statistics/statistical-terms-and-concepts/data' })
  ]),
  cases: Object.freeze([
    Object.freeze({
      id:'sale', table:'sale', colour:0xa85a34, columns:['sale_id','branch_id','sold_at','basket_total'],
      rows:[['S-1041','B-17','09:42','18.70'],['S-1042','B-17','09:47','6.25'],['S-1043','B-08','09:51','31.40']],
      context:'A checkout creates one header record when payment succeeds.',
      grain:'one completed sale', grainOptions:['one product sold','one branch per day','one completed sale'],
      count:'number of completed sales', countOptions:['number of completed sales','number of products sold','total items purchased'],
      explanation:'Each sale_id appears once and describes the whole transaction.', countExplanation:'COUNT(*) counts sale records: three rows means three completed sales, not three products.'
    }),
    Object.freeze({
      id:'sale-line', table:'sale_line', colour:0xd39035, columns:['sale_id','line_no','sku','quantity'],
      rows:[['S-1041','1','QX-CER-001','1'],['S-1041','2','QX-DRK-014','2'],['S-1042','1','QX-TIN-032','3']],
      context:'A sale creates another row for each distinct product line in its basket.',
      grain:'one product line within one sale', grainOptions:['one individual physical item','one product line within one sale','one completed sale'],
      count:'number of sale lines', countOptions:['number of completed sales','sum of item quantities','number of sale lines'],
      explanation:'sale_id can repeat; line_no distinguishes product lines inside the same sale.', countExplanation:'COUNT(*) is three sale lines. It is neither two sales nor six physical items.'
    }),
    Object.freeze({
      id:'product', table:'product', colour:0x4f8f56, columns:['sku','product_name','category','active'],
      rows:[['QX-CER-001','Oat Crunch','Cereal','true'],['QX-DRK-014','Orchard Juice','Drinks','true'],['QX-TIN-032','Garden Peas','Tinned','true']],
      context:'The product master stores the current identity and classification of each SKU.',
      grain:'one product SKU', grainOptions:['one category','one product SKU','one product sale'],
      count:'number of product SKUs', countOptions:['number of product SKUs','number of units in stock','number of categories'],
      explanation:'Every row describes one distinct SKU, even when several products share a category.', countExplanation:'COUNT(*) counts product records. Repeated categories do not change the row grain.'
    }),
    Object.freeze({
      id:'branch-day', table:'branch_day', colour:0x477c9f, columns:['branch_id','business_date','sales','transactions'],
      rows:[['B-17','2026-08-20','28410','1468'],['B-08','2026-08-20','19730','1032'],['B-17','2026-08-21','30105','1521']],
      context:'The overnight process summarises all transactions for each branch and business date.',
      grain:'one branch on one business date', grainOptions:['one branch on one business date','one sale','one branch'],
      count:'number of branch-days', countOptions:['number of branches','number of sales','number of branch-days'],
      explanation:'A branch can appear on many dates and a date can contain many branches; the pair defines one row.', countExplanation:'Three rows means three branch-day observations. There are only two distinct branches here.'
    }),
    Object.freeze({
      id:'inventory-snapshot', table:'inventory_snapshot', colour:0x6d5a96, columns:['branch_id','sku','observed_at','units_on_hand'],
      rows:[['B-17','QX-CER-001','08:00','42'],['B-17','QX-CER-001','12:00','31'],['B-17','QX-DRK-014','12:00','18']],
      context:'Inventory is measured repeatedly for products at branches throughout the day.',
      grain:'one product at one branch at one observation time', grainOptions:['one stock movement','one product at one branch at one observation time','one product at one branch'],
      count:'number of inventory snapshots', countOptions:['total units on hand','number of inventory snapshots','number of products'],
      explanation:'The same branch and SKU can legitimately repeat when observed_at changes.', countExplanation:'COUNT(*) counts measurements. It does not count distinct products or add the stock values.'
    }),
    Object.freeze({
      id:'employee-shift', table:'employee_shift', colour:0x3f8f86, columns:['employee_id','branch_id','shift_start','shift_end'],
      rows:[['E-204','B-17','08:00','16:00'],['E-311','B-17','09:00','17:00'],['E-204','B-17','17:00','21:00']],
      context:'Scheduling records each assigned work interval for an employee at a branch.',
      grain:'one employee work shift', grainOptions:['one employee work shift','one employee','one branch staffing total'],
      count:'number of scheduled shifts', countOptions:['number of employees','total hours worked','number of scheduled shifts'],
      explanation:'An employee can have more than one shift, so employee_id alone does not define the row.', countExplanation:'Three rows means three scheduled shifts. Only two distinct employees appear.'
    })
  ])
});

export function answerForGrainCase(caseRecord, step) {
  return step === 'grain' ? caseRecord?.grain : caseRecord?.count;
}
