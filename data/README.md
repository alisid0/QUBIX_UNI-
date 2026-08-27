# The Qubix Group quarter

One quarter, 1 April to 30 June 2026, for a supermarket group: 48 branches
across six regions, 2,140 products, 850,000 transactions, 42 suppliers in twelve
countries, five depots, three factories, and an acquired estate that is still on
its own systems. Fifty-four CSV files, 7.7 million rows, about 360 MB, built in
eight seconds.

```bash
npm run data            # rebuild the group
npm run check:dataset   # 86 assertions, all streaming
```

Not in git. It is generated, so committing it would version 360 MB of something
a command reproduces exactly.

```bash
node scripts/generate-dataset.mjs --days 7       # a week
node scripts/generate-dataset.mjs --branches 6   # the named six only
```

## Why it goes up as well as across

A supermarket's decisions are stratified, and data that is only one layer deep
cannot model any of them:

| Who | Decides | Needs |
|---|---|---|
| a branch | what to mark down tonight | `markdown`, `waste`, `inventory_snapshot` |
| a district | where to move staff this week | `labour_plan`, `footfall`, `employee_shift` |
| a region | which stores get the seasonal range | `branch`, `price_zone`, `depot_branch` |
| the centre | what a product costs and what it sells for | `zone_price`, `price_elasticity`, `competitor_price_check` |
| the group | which country to buy from, and what to stop buying | `supplier_quote`, `fx_rate`, `tariff`, `freight_lane` |
| the board | what to stop buying and start making | `make_or_buy`, `bill_of_materials`, `production_run` |

The structure is hand-authored in `src/lib/game/superstore-world.js` and the
volume is generated from it, so a figure there is the reason a figure here is
what it is.

## The tables

**The shop floor** — `branch` 48, `till` 284, `sale` 854,892, `sale_line`
4,736,504, `return` 11,070, `return_line` 35,510, `customer` 120,000,
`customer_order` 16,822, `employee` 1,304, `employee_shift` 60,918,
`inventory_snapshot` 1,335,360, `sensor_reading` 103,799, `footfall` 65,520,
`markdown` 32,237, `waste` 21,883, `labour_plan` 624.

**Where things are, and who runs them** — `country` 13, `currency` 11, `region`
6, `district` 14, `county` 14, `price_zone` 5, `depot` 5, `depot_branch` 121.

**What things cost, and what we charge** — `product` 2,140, `price_history`
9,605, `zone_price` 10,700, `promotion` 63, `promotion_product` 1,874,
`price_elasticity` 3,290, `competitor` 6, `competitor_price_check` 183,305,
`brand_tier` 4.

**Buying** — `supplier` 42, `supplier_quote` 1,818, `purchase_order` 1,021,
`supplier_performance` 126, `shipment` 2,541, `shipment_line` 58,417, `fx_rate`
970, `tariff` 65, `freight_lane` 22, `incoterm` 4, `commodity` 10,
`commodity_index` 170, `depot_stock` 39,211.

**Making** — `factory` 3, `production_line` 13, `bill_of_materials` 394,
`production_run` 855, `make_or_buy` 76.

**The acquisition** — `meridian_store` 11, `meridian_daily_sales` 1,001,
`product_crosswalk` 1,720.

## Three hierarchies over the same 48 branches

Regions and districts are how the company is run. Counties are where places
are. Price zones are who else is on that high street. **None of the three nests
inside another**, and for seven of the 48 branches the management path and the
geographic path do not even end in the same region, because a district was moved
between regions and nobody redrew the county map.

So "sales by region" is two different numbers depending on which join you take,
and neither one is wrong. The six branches the missions name by hand are clean
down both paths, because a worked example is not the place to meet an ambiguity.

## The same product, five prices

`product.list_price` is the national list price. What a branch actually charges
is `zone_price`, and every one of the 2,140 products has five of them:

```
QX-CER-001   PZ-VALUE  £2.68   PZ-CORE  £2.85   PZ-URBAN  £2.96
             PZ-REMOTE £3.11   PZ-METRO £3.25
```

Every one of the 4.7 million sale lines rang through at its branch's zone price,
which the checker verifies line by line. "What does QX-CER-001 cost" is not a
question with one answer, and nothing in the schema warns you.

## The faults are deliberate

Each one is documented in `superstore-world.js` and asserted by
`check:dataset`, so it cannot quietly disappear:

- **two hierarchies that disagree**, for seven branches out of 48. A minority, so
  it is something to notice rather than a broken join.
- **quotes in ten currencies.** The cheapest supplier cannot be found by sorting
  a column, and the incoterm decides whether freight and duty are already inside
  the number.
- **no exchange rate at the weekend.** A Saturday purchase order has to carry
  Friday forward. A naive join drops the row; it does not come back as a zero.
- **three tariffs changed mid-quarter.** Duty depends on when the goods moved,
  not on when you ran the query.
- **480 elasticity estimates fitted on fewer than 50 observations**, published in
  the same table and the same number of decimal places as ones fitted on nine
  thousand. The `observations` column is the only thing that tells you, and the
  thin ones carry standard errors twelve times wider.
- **competitor prices are a weekly hand-collected sample of a KVI list**, not a
  census. Two thirds of branch-competitor-weeks were never walked, and a missing
  visit is not a matched price.
- **an acquired estate that is not in `branch` at all**, on four digit shop
  numbers, in euro, joined to the rest only through a hand-maintained crosswalk
  that is 80% complete and matches 101 articles to more than one SKU.
- **`quantity` means two things.** A tin is a count, loose produce is a weight,
  and `uom` is the only thing that says which. `SUM(quantity)` over a basket is
  meaningless and nothing stops you running it.
- **a third of waste is filed as "other"**, because the reason code is chosen at
  the end of a shift by somebody who wants to go home.
- **210 of 855 production runs do not reconcile**: good plus scrap is not what
  was planned. Most runs do reconcile, which is what makes the others findable.
- **28 of 76 make-or-buy cases have no decision yet**, and the `recommendation`
  column is a model output rather than a fact. Reading the first as the second
  is the mistake that table exists to teach.
- **2.5% of stock counts never happened**, blank rather than zero.
- **140 of 1,304 colleagues have left**, and their rows stay, because the
  quarter's shifts still point at them.
- **collection orders have no delivery distance**, and it is blank rather than
  zero. A collected order did not travel nought kilometres. It did not travel.
- **deliveries arrive short**, which is why `ordered_units` and `received_units`
  are separate columns.
- **baskets are right-skewed**, so the mean sits above most actual baskets.

## It is deterministic

The generator is seeded, so the same command produces byte-identical files. A
figure quoted in a lesson stays true, and a guard can check it. Never
`Math.random`: a dataset that changes under you cannot be taught from.

## The taught rows are really in here

The SQL Console's twelve sales are written into the quarter verbatim, at their
own dates and totals, and their lines add up to exactly those totals. `S-1041`
is in `sale.csv`, at Northgate, on 2026-05-04, for £18.70. The teaching table is
a genuine extract rather than a parallel invention, and `check:dataset` fails if
the two ever disagree.

The counts the missions quote are built to, not approximated: 48 branches, 2,140
products, 9,605 price rows, 63 promotions over 1,874 products.

## Loading it

```sql
-- --csv reads the header row as column names and creates the table.
.import --csv data/sale.csv sale
.import --csv data/sale_line.csv sale_line
.import --csv data/till.csv till
.import --csv data/branch.csv branch
.import --csv data/zone_price.csv zone_price

-- the fan-out, at a size you can feel
SELECT COUNT(*) FROM sale;                                    -- 854892
SELECT COUNT(*) FROM sale JOIN sale_line USING (sale_id);     -- 4736504

-- items per minute, by till kind
SELECT t.kind,
       ROUND(AVG(s.items * 60.0 /
         (strftime('%s', s.scan_ended_at) - strftime('%s', s.scan_started_at))), 1)
FROM sale s JOIN till t USING (till_id)
GROUP BY t.kind;

-- the same cereal, five prices, and which shops pay which
SELECT z.zone_id, z.price, COUNT(b.branch_id) AS branches
FROM zone_price z LEFT JOIN branch b USING (zone_id)
WHERE z.sku = 'QX-CER-001'
GROUP BY z.zone_id, z.price
ORDER BY z.price;
```
