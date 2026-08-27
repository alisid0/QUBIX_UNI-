# A working sample of the Qubix Group quarter

Six branches, seven days, all 54 tables. About 6.5 MB, and unlike the full
quarter this one **is** in git, so you can read it on GitHub, clone it, or open
any of it in a spreadsheet without downloading anything.

```bash
npm run data:sample                      # rebuild it
npm run check:dataset -- --from data-sample
```

## It is not a slice of the full quarter

It is a smaller world built by the same generator with the same seed. Sample and
full quarter are both internally consistent, and neither is a subset of the
other: with six branches instead of 48 the random stream diverges immediately,
so `S-100000` is a different basket in each.

What carries over is every rule about how the data behaves. The same checker
runs against both, and only the handful of assertions that are genuinely about
scale are skipped, which it says out loud when it skips them.

## Why 1 to 7 May

Because that is the week the missions teach from. All twelve sales the SQL
Console shows are in `sale.csv` here, at their own dates and totals, with lines
that add up to them:

```
S-1041   B-17   2026-05-04   £18.70
S-1043   B-08   2026-05-04   £31.40
S-1052   B-02   2026-05-06   £24.30
```

A sample starting at day 0 would have missed all twelve, which would make it a
sample of the wrong thing.

## What is here

All 54 tables, at a sixth of the branches and a thirteenth of the days:

| | |
|---|---|
| the shop floor | `sale` 11,647, `sale_line` 64,973, `till`, `markdown`, `waste`, `footfall` |
| geography | `region`, `district`, `county`, `price_zone`, `depot`, `depot_branch` |
| pricing | `zone_price` 10,700, `price_elasticity`, `competitor_price_check` |
| buying | `supplier_quote`, `purchase_order`, `fx_rate`, `tariff`, `freight_lane` |
| making | `factory`, `bill_of_materials`, `production_run`, `make_or_buy` |
| the acquisition | `meridian_store`, `product_crosswalk` |

The reference tables are full size, because a lookup table with rows removed is
a broken lookup table. `product` is all 2,140 products and `zone_price` is all
10,700 prices, even though a six-branch week only sells a fraction of them.

## The faults are all still here

Every deliberate fault documented in `src/lib/game/superstore-world.js` survives
into the sample: the two hierarchies that disagree, quotes in ten currencies, no
exchange rate at weekends, blank stock counts, `quantity` meaning two different
things depending on `uom`, waste filed as "other".

Three things cannot survive in miniature, and the checker skips them by name
rather than pretending:

- six branches cannot drift across regions in the proportion 48 do
- nothing ordered inside a seven day window with a forty day lead time arrives
  inside that window, so every purchase order here is still open
- price zones cannot be shown to cut across six regions when there is one branch
  in each

## The full quarter

48 branches, 91 days, 7.7 million rows, 360 MB. It is not in git, because
`sale_line.csv` alone is 187 MB and GitHub refuses anything over 100 MB.

- build it yourself: `npm run data`, about eight seconds
- or download it from the repository's releases, where it is an 82 MB
  `tar.gz`

Both routes give byte-identical files. The generator is seeded and the archive
pins its own timestamps, so the same input always produces the same bytes.
