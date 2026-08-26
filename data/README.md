# The Qubix Superstore quarter

One quarter of trading, 1 April to 30 June 2026, across six branches and HQ.
About a million rows in eight CSV files, roughly 35 MB.

```bash
npm run data            # rebuild it, about three seconds
npm run check:dataset   # check it is a dataset and not a pile of plausible rows
```

Not in git. It is generated, so committing it would version 35 MB of something a
command reproduces exactly.

## Why it exists

`superstore.js` always claimed Northgate takes 60,000 transactions a quarter and
the chain takes 151,300. The largest table anywhere in the product was twelve
rows, so the fiction promised a supermarket chain and delivered a spreadsheet
fragment. You cannot practise SQL on twelve rows, sample from a population that
does not exist, or open anything in Excel.

The small tables stay as they are. *What does one row represent* needs a table
you can see all of, and twelve rows you can read is the point of that mission
rather than a limitation of it. What was missing is the population underneath.

## The tables

| File | Rows | What one row is |
|---|---:|---|
| `branch.csv` | 6 | one branch |
| `product.csv` | 9 | one product in the master |
| `employee.csv` | 226 | one colleague, current or departed |
| `sale.csv` | 151,267 | one completed sale |
| `sale_line.csv` | 836,526 | one product line within one sale |
| `employee_shift.csv` | ~10,500 | one shift worked |
| `inventory_snapshot.csv` | 4,914 | one product at one branch at one day's close |
| `sensor_reading.csv` | ~13,000 | one cold-chain reading |

`sale_line` is the one that hurts Excel. It is also the join that turns 151,267
sales into 836,526 rows, which is the fan-out chapter 05 is about, at a size
where you can feel it.

## It is deterministic

The generator is seeded, so the same command produces byte-identical files. A
figure quoted in a lesson stays true, and a guard can check it. Never
`Math.random`: a dataset that changes under you cannot be taught from.

## The taught rows are really in here

The SQL Console's twelve sales are written into the quarter verbatim, at their
own dates. `S-1041` is in `sale.csv`, at Northgate, on 2026-05-04, for £18.70.
The teaching table is a genuine extract rather than a parallel invention, and
`check-dataset` fails if the two ever disagree.

## The faults are deliberate

Real data is not clean, and three chapters teach about exactly these:

- **about 2% of stock counts never happened.** `closing_stock_units` is blank,
  not zero. Which of the four kinds of absence it is depends on the branch and
  the day, and is not written in the cell.
- **29 of 226 colleagues have left.** Their rows stay, because the quarter's
  shifts still point at them. Headcount is a count with a condition.
- **cold-chain readings have gaps.** A sensor that sends nothing for an hour has
  not recorded a zero.
- **baskets are right-skewed.** Mean £49.21 against a median of £25.37. The mean
  sits above almost every actual basket, which is what the Distribution Desk is
  about, arrived at from the population rather than asserted.

## Loading it

```sql
-- SQLite
.mode csv
.import data/sale.csv sale
.import data/sale_line.csv sale_line

-- then the fan-out, at a size you can feel
SELECT COUNT(*) FROM sale;                                    -- 151267
SELECT COUNT(*) FROM sale JOIN sale_line USING (sale_id);     -- 836526
```
