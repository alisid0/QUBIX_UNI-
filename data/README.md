# The Qubix Superstore quarter

One quarter of trading, 1 April to 30 June 2026, across the whole chain: 48
branches, 2,140 products, 850,000 transactions. Twenty CSV files, 7.45 million
rows, about 345 MB.

```bash
npm run data            # rebuild it, about six seconds
npm run check:dataset   # check it is a dataset and not a pile of plausible rows
```

Not in git. It is generated, so committing it would version 345 MB of something
a command reproduces exactly.

```bash
node scripts/generate-dataset.mjs --days 7       # a week, about 27 MB
node scripts/generate-dataset.mjs --branches 6   # the named six only
```

## Why it exists

`superstore.js` claimed Northgate takes 60,000 transactions a quarter. Join
Without Changing the Grain claimed 48 branches and 2,140 products. The largest
table anywhere in the product was twelve rows, so the fiction promised a
supermarket group and delivered a spreadsheet fragment. You cannot practise SQL
on twelve rows, sample from a population that does not exist, or open anything
in Excel.

The small tables in the missions stay as they are. *What does one row represent*
needs a table you can see all of, and twelve rows you can read is the point of
that mission rather than a limitation of it. What was missing is the population
underneath, and everything the missions already named without having: returns,
promotions, price history, suppliers, loyalty, footfall, and the till timings
that make a checkout something you can measure.

## The tables

| File | Rows | What one row is |
|---|---:|---|
| `branch.csv` | 48 | one branch |
| `till.csv` | 284 | one till, staffed, self-service or kiosk |
| `supplier.csv` | 42 | one supplier, with lead time and payment terms |
| `product.csv` | 2,140 | one product in the master |
| `promotion.csv` | 63 | one promotion that ran in the quarter |
| `promotion_product.csv` | 1,874 | one product included in one promotion |
| `price_history.csv` | 9,605 | one price, from a date until it changed |
| `employee.csv` | 1,304 | one colleague, current or departed |
| `customer.csv` | 120,000 | one loyalty member |
| `sale.csv` | 854,892 | one completed sale, timed at the till |
| `sale_line.csv` | 4,774,443 | one product line within one sale |
| `return.csv` | 11,070 | one return, against the sale it came from |
| `return_line.csv` | 35,807 | one item coming back |
| `shipment.csv` | 2,522 | one delivery in from a supplier |
| `shipment_line.csv` | 58,753 | one product on that delivery |
| `customer_order.csv` | 16,822 | one order placed for delivery or collection |
| `employee_shift.csv` | 60,076 | one shift worked |
| `inventory_snapshot.csv` | 1,335,360 | one product at one branch at one week's close |
| `sensor_reading.csv` | 103,781 | one cold-chain reading |
| `footfall.csv` | 65,520 | one branch, one hour, one visitor count |

`sale_line` is the one that hurts Excel. It is also the join that turns 854,892
sales into 4,774,443 rows, which is the fan-out chapter 05 is about, at a size
where you can feel it.

## The till is now something you can measure

`sale` carries three timestamps and an item count: when scanning started, when
it finished, and when payment completed. That makes items per minute, queue
time, and the wait after the last item while somebody finds a card all things
you can compute rather than assert.

Self-service is slower per item than a trained colleague, by about a factor of
two, which is a finding a learner can arrive at rather than be told.

## The faults are deliberate

Real data is not clean, and several chapters teach about exactly these:

- **about 2.5% of stock counts never happened.** `closing_stock_units` is blank,
  not zero. Which of the four kinds of absence it is depends on the branch and
  the day, and is not written in the cell.
- **140 of 1,304 colleagues have left.** Their rows stay, because the quarter's
  shifts still point at them. Headcount is a count with a condition.
- **heads and hours are different numbers.** 847 colleagues work less than a
  full week, so headcount and FTE disagree at every branch.
- **`quantity` means two things.** A tin is a count, loose produce is a weight in
  kilograms, and `uom` is the only thing telling you which. `SUM(quantity)` over
  a basket is meaningless and nothing stops you running it. About 10% of lines
  are weighed.
- **collection orders have no delivery distance, and it is blank rather than
  zero.** A collected order did not travel nought kilometres; it did not travel.
- **cold-chain readings have gaps.** A sensor that sends nothing for an hour has
  not recorded a zero.
- **deliveries arrive short.** `ordered_units` and `received_units` are separate
  columns because about 7% of the time they differ.
- **baskets are right-skewed.** Mean £58.53 against a median of £35.34, so the
  mean sits above most actual baskets, which is what the Distribution Desk is
  about, arrived at from the population rather than asserted.

## It is deterministic

The generator is seeded, so the same command produces byte-identical files. A
figure quoted in a lesson stays true, and a guard can check it. Never
`Math.random`: a dataset that changes under you cannot be taught from.

## The taught rows are really in here

The SQL Console's twelve sales are written into the quarter verbatim, at their
own dates and totals. `S-1041` is in `sale.csv`, at Northgate, on 2026-05-04,
for £18.70, and its lines in `sale_line.csv` add up to exactly that. The
teaching table is a genuine extract rather than a parallel invention, and
`check:dataset` fails if the two ever disagree.

The counts the missions quote are built to, not approximated: 48 branches,
2,140 products, 9,605 price rows, 63 promotions over 1,874 products.

## What check:dataset actually checks

Forty-eight assertions, all streaming, because `readFileSync` on a 189 MB
`sale_line` wants a gigabyte to say "no orphans". Among them:

- no orphan rows anywhere, in either direction
- no till rang up a sale for another branch
- nothing was paid for before it was scanned
- quantity times unit price is the line total, on all 4.8 million lines
- every basket reconciles against its own lines
- no return cites a sale that did not happen, at a branch that did not sell it,
  for more than was paid, on a date before it was bought
- every branch takes the trade `superstore.js` declares, within 3%
- the faults above are all still present

Three of these failed on the first run and were real: line totals that did not
multiply out, baskets that did not reconcile, and 5,628 refunds larger than the
sale they came from. A fourth was subtler and would have passed any eyeball
test: every basket in the chain ended with a weighed item, because closing on
the scales was how the total had been made to balance.

## Loading it

```sql
-- SQLite. --csv reads the header row as column names and creates the table.
.import --csv data/sale.csv sale
.import --csv data/sale_line.csv sale_line
.import --csv data/till.csv till

-- the fan-out, at a size you can feel
SELECT COUNT(*) FROM sale;                                    -- 854892
SELECT COUNT(*) FROM sale JOIN sale_line USING (sale_id);     -- 4774443

-- items per minute, by till kind
SELECT t.kind,
       ROUND(AVG(s.items * 60.0 /
         (strftime('%s', s.scan_ended_at) - strftime('%s', s.scan_started_at))), 1)
FROM sale s JOIN till t USING (till_id)
GROUP BY t.kind;
```
