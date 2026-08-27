// Everything above the till.
//
// generate-dataset.mjs builds a quarter of trading: what was sold, to whom, at
// which till, at what time. That is one floor of the building. This is the rest
// of it, because the questions a supermarket group actually pays people to
// answer are not on the shop floor:
//
//   what should this cost, here, this week, given what Bergstrom charges
//   which of four suppliers is cheapest once you convert and add the duty
//   why did our cost go up in May when nothing about the product changed
//   how much of what we threw away did we know we were going to throw away
//   at what volume does it become cheaper to make this than to buy it
//
// Every table here derives from superstore-world.js, so the structure is
// hand-authored and the volume is generated. The faults are deliberate and are
// listed at the bottom of superstore-world.js.
//
// It shares one seeded PRNG with the trading generator, so the whole estate is
// byte-identical run to run.

import {
  COUNTRIES, CURRENCIES, REGIONS, DISTRICTS, COUNTIES, PRICE_ZONES, DEPOTS,
  COMPETITORS, COMMODITIES, BRAND_TIERS, FACTORIES, MERIDIAN, INCOTERMS
} from '../../src/lib/game/superstore-world.js';

/* ── which branch sits where ───────────────────────────────────────────────
   The six branches missions name are placed by hand and placed consistently:
   their district's region and their county's region agree, so an example that
   says "Northgate, Cindermoor" is true down both paths. The other 42 are placed
   by stride, and for some of them the two paths disagree. That is the trap, and
   it is kept away from the branches the teaching uses. */
const PLACED = {
  'B-17': { district: 'DIS-05', county: 'CTY-EAV', zone: 'PZ-CORE' },
  'B-08': { district: 'DIS-07', county: 'CTY-FEN', zone: 'PZ-CORE' },
  'B-09': { district: 'DIS-03', county: 'CTY-CAL', zone: 'PZ-URBAN' },
  'B-04': { district: 'DIS-10', county: 'CTY-ILM', zone: 'PZ-REMOTE' },
  'B-02': { district: 'DIS-11', county: 'CTY-LOW', zone: 'PZ-METRO' },
  'B-01': { district: 'DIS-12', county: 'CTY-MER', zone: 'PZ-VALUE' }
};

const ZONE_BY_FORMAT = {
  Superstore: ['PZ-CORE', 'PZ-CORE', 'PZ-VALUE', 'PZ-URBAN'],
  Supermarket: ['PZ-URBAN', 'PZ-CORE', 'PZ-VALUE', 'PZ-REMOTE'],
  Express: ['PZ-METRO', 'PZ-METRO', 'PZ-URBAN', 'PZ-VALUE']
};

export function assignGeography(ctx) {
  const { estate, pick, between, chance, rnd } = ctx;
  estate.forEach((b, i) => {
    const set = PLACED[b.id];
    b.district = set ? set.district : DISTRICTS[(i * 5) % DISTRICTS.length].id;

    // The two hierarchies agree for most branches. They drift for about one in
    // six, which is what a real restructure leaves behind: a district was moved
    // between regions and the county map was never redrawn. A trap that catches
    // two thirds of rows is not a trap, it is a broken join, and a learner
    // learns nothing from a table that is wrong everywhere.
    const home = DISTRICTS.find(d => d.id === b.district).region;
    const inRegion = COUNTIES.filter(c => c.region === home);
    const elsewhere = COUNTIES.filter(c => c.region !== home);
    b.county = set ? set.county
      : (i % 6 === 4 ? elsewhere[(i * 7) % elsewhere.length].id
        : inRegion[(i * 3) % inRegion.length].id);

    b.zone = set ? set.zone : pick(ZONE_BY_FORMAT[b.format]);
    b.floorSqm = Math.round(
      b.format === 'Superstore' ? between(3800, 9200)
        : b.format === 'Supermarket' ? between(1400, 3600)
          : between(180, 520));
    b.carPark = b.format === 'Express' ? 0 : Math.round(between(40, 620));
    b.catchment = Math.round(between(8_000, 180_000));
    b.refit = chance(0.4) ? null : Math.floor(between(200, 2600));
    b.depots = depotsFor(b);
    b.competitors = COMPETITORS.filter(() => rnd() < 0.45);
    if (!b.competitors.length) b.competitors = [COMPETITORS[1]];
  });
}

/** Ambient, chilled and frozen arrive from different buildings, so joining a
    depot to a branch fans out and neither side is the grain you started with. */
function depotsFor(b) {
  const region = DISTRICTS.find(d => d.id === b.district).region;
  const ambient = ['RGN-N', 'RGN-W'].includes(region) ? 'DC-02' : 'DC-01';
  const list = [{ depot: ambient, regime: 'ambient' }, { depot: 'DC-03', regime: 'chilled' }];
  if (b.format !== 'Express') list.push({ depot: 'DC-04', regime: 'frozen' });
  return list;
}

/* ── the commercial estate ───────────────────────────────────────────────── */
export function buildCommercial(ctx) {
  const { open, estate, catalogue, suppliers, DAYS, day, stamp, money, pad,
    pick, between, chance, rnd } = ctx;

  const dec = (v, n = 4) => v.toFixed(n);
  const f = {
    country: open('country.csv', ['country_id', 'name', 'currency_code', 'role', 'trades_in']),
    currency: open('currency.csv', ['currency_code', 'name', 'units_per_gbp_at_quarter_start']),
    region: open('region.csv', ['region_id', 'name', 'director_employee_id', 'established']),
    district: open('district.csv', ['district_id', 'name', 'region_id', 'manager_employee_id']),
    county: open('county.csv', ['county_id', 'name', 'country_id', 'region_id', 'population']),
    zone: open('price_zone.csv', ['zone_id', 'name', 'multiplier', 'note']),
    depot: open('depot.csv', ['depot_id', 'name', 'county_id', 'regime', 'pallet_capacity', 'opened']),
    depotBranch: open('depot_branch.csv', ['depot_id', 'branch_id', 'regime', 'road_km', 'drops_per_week']),
    competitor: open('competitor.csv', ['competitor_id', 'name', 'position', 'stance']),
    commodity: open('commodity.csv', ['commodity_id', 'name', 'quoted_unit', 'base_index', 'volatility']),
    brandTier: open('brand_tier.csv', ['tier_id', 'name', 'target_margin', 'own_label', 'sales_share']),
    incoterm: open('incoterm.csv', ['incoterm', 'name', 'freight_included', 'duty_included']),
    factory: open('factory.csv', ['factory_id', 'name', 'country_id', 'county_id', 'makes',
      'capacity_units_per_week', 'fixed_cost_per_week_gbp', 'acquired', 'lines']),
    line: open('production_line.csv', ['line_id', 'factory_id', 'line_no', 'units_per_hour',
      'changeover_minutes', 'commissioned']),

    fx: open('fx_rate.csv', ['currency_code', 'rate_date', 'units_per_gbp']),
    index: open('commodity_index.csv', ['commodity_id', 'index_month', 'index_value', 'published_on']),
    tariff: open('tariff.csv', ['tariff_id', 'commodity_id', 'origin_country_id', 'duty_pct', 'valid_from', 'valid_to']),
    lane: open('freight_lane.csv', ['lane_id', 'origin_country_id', 'destination_depot_id', 'mode',
      'cost_per_pallet_gbp', 'transit_days', 'co2_kg_per_pallet']),

    quote: open('supplier_quote.csv', ['quote_id', 'sku', 'supplier_id', 'currency_code',
      'ex_works_cost', 'incoterm', 'moq_units', 'lead_days', 'valid_from', 'valid_to']),
    po: open('purchase_order.csv', ['po_id', 'supplier_id', 'depot_id', 'sku', 'ordered_on',
      'units', 'agreed_unit_cost', 'currency_code', 'incoterm', 'expected_on', 'received_on']),
    supplierPerf: open('supplier_performance.csv', ['supplier_id', 'period_month', 'otif_pct',
      'quality_rejects', 'invoice_disputes', 'avg_lead_days_actual']),

    zonePrice: open('zone_price.csv', ['sku', 'zone_id', 'price', 'effective_from']),
    elasticity: open('price_elasticity.csv', ['sku', 'zone_id', 'elasticity', 'std_error',
      'observations', 'r_squared', 'model_run_date']),
    check: open('competitor_price_check.csv', ['check_id', 'branch_id', 'competitor_id', 'sku',
      'checked_on', 'competitor_price', 'our_price', 'checked_by']),

    markdown: open('markdown.csv', ['markdown_id', 'branch_id', 'business_date', 'sku',
      'original_price', 'marked_price', 'units_marked', 'units_sold', 'units_wasted']),
    waste: open('waste.csv', ['branch_id', 'business_date', 'sku', 'reason_code', 'units', 'cost_value']),
    labour: open('labour_plan.csv', ['branch_id', 'week_starting', 'planned_hours', 'actual_hours',
      'forecast_transactions', 'actual_transactions']),
    depotStock: open('depot_stock.csv', ['depot_id', 'snapshot_date', 'sku', 'pallets_on_hand', 'weeks_cover']),

    bom: open('bill_of_materials.csv', ['sku', 'input_commodity_id', 'quantity_per_unit',
      'quantity_unit', 'yield_loss_pct']),
    run: open('production_run.csv', ['run_id', 'factory_id', 'line_id', 'business_date', 'sku',
      'planned_units', 'good_units', 'scrap_units', 'downtime_minutes']),
    makeBuy: open('make_or_buy.csv', ['case_id', 'sku', 'annual_units', 'buy_landed_cost',
      'make_unit_cost', 'make_capex_gbp', 'breakeven_units', 'payback_months',
      'recommendation', 'decision', 'decided_on']),

    meridian: open('meridian_store.csv', ['shop_no', 'town', 'floor_sqm', 'opened', 'manager_name']),
    meridianSales: open('meridian_daily_sales.csv', ['shop_no', 'trade_date', 'gross_eur',
      'transactions', 'staff_hours']),
    crosswalk: open('product_crosswalk.csv', ['qubix_sku', 'meridian_article', 'match_confidence', 'matched_on'])
  };

  /* ── reference ─────────────────────────────────────────────────────────── */
  for (const c of COUNTRIES) f.country.row([c.id, `"${c.name}"`, c.currency, `"${c.role}"`, c.tradesIn]);
  for (const c of CURRENCIES) f.currency.row([c.code, `"${c.name}"`, c.perGbp]);
  for (const r of REGIONS) f.region.row([r.id, `"${r.name}"`, r.director, r.established]);
  for (const d of DISTRICTS) f.district.row([d.id, `"${d.name}"`, d.region, d.manager]);
  for (const c of COUNTIES) f.county.row([c.id, `"${c.name}"`, c.country, c.region, c.population]);
  for (const z of PRICE_ZONES) f.zone.row([z.id, `"${z.name}"`, z.multiplier, `"${z.note}"`]);
  for (const d of DEPOTS) f.depot.row([d.id, `"${d.name}"`, d.county, d.regime, d.pallets, d.opened]);
  for (const c of COMPETITORS) f.competitor.row([c.id, `"${c.name}"`, `"${c.position}"`, `"${c.stance}"`]);
  for (const c of COMMODITIES) f.commodity.row([c.id, `"${c.name}"`, `"${c.unit}"`, c.base, c.volatility]);
  for (const t of BRAND_TIERS) f.brandTier.row([t.id, `"${t.name}"`, t.margin, t.ownLabel, t.share]);
  for (const i of INCOTERMS) f.incoterm.row([i.id, `"${i.name}"`, i.freightIncluded, i.dutyIncluded]);

  for (const b of estate)
    for (const d of b.depots)
      f.depotBranch.row([d.depot, b.id, d.regime, Math.round(between(4, 210)), Math.round(between(2, 14))]);

  /* ── factories and their lines ─────────────────────────────────────────── */
  const lines = [];
  for (const fac of FACTORIES) {
    f.factory.row([fac.id, `"${fac.name}"`, fac.country, fac.county ?? '', fac.makes,
      fac.capacityPerWeek, fac.fixedCostPerWeek, fac.acquired, fac.lines]);
    for (let n = 1; n <= fac.lines; n++) {
      const id = `${fac.id}-L${pad(n)}`;
      lines.push({ id, factory: fac.id, makes: fac.makes });
      f.line.row([id, fac.id, n, Math.round(between(900, 7400)), Math.round(between(12, 95)),
        day(-Math.floor(between(400, 4000)))]);
    }
  }

  /* ── money moves before goods do ────────────────────────────────────────
     No rate is published at the weekend, so a purchase order raised on a
     Saturday has to carry Friday forward. A join on rate_date drops it, and
     the row does not come back as a zero. It does not come back at all. */
  const fxOf = new Map();
  for (const c of CURRENCIES) {
    if (c.code === 'GBP') continue;
    let rate = c.perGbp * between(0.97, 1.03);
    for (let d = -45; d < DAYS; d++) {
      const date = day(d);
      const dow = new Date(date + 'T00:00:00Z').getUTCDay();
      rate *= between(0.9965, 1.0035);
      if (dow === 0 || dow === 6) continue;
      const v = Math.round(rate * 10000) / 10000;
      f.fx.row([c.code, date, dec(v)]);
      fxOf.set(`${c.code}|${date}`, v);
    }
  }
  // Friday's rate, for the Saturdays and Sundays that have none.
  const rateOn = (code, date) => {
    if (code === 'GBP') return 1;
    for (let back = 0; back < 5; back++) {
      const d = new Date(date + 'T00:00:00Z');
      d.setUTCDate(d.getUTCDate() - back);
      const hit = fxOf.get(`${code}|${d.toISOString().slice(0, 10)}`);
      if (hit) return hit;
    }
    return CURRENCIES.find(c => c.code === code).perGbp;
  };

  /* ── what things are made of, and what that cost last month ────────────
     Published ten days after the month it describes, which is why a cost
     movement is always explained late. */
  const VOL = { low: 0.012, medium: 0.03, high: 0.058, extreme: 0.11 };
  const indexOf = new Map();
  for (const c of COMMODITIES) {
    let v = c.base;
    for (let m = -14; m <= 2; m++) {
      const month = monthLabel(m);
      v *= 1 + (rnd() - 0.46) * VOL[c.volatility] * 2;
      const value = Math.round(v * 100) / 100;
      indexOf.set(`${c.id}|${month}`, value);
      f.index.row([c.id, month, dec(value, 2), monthPublished(m)]);
    }
  }

  /* ── duty, which depends on when the goods moved ───────────────────────
     Three of these change part way through the quarter. A query that looks up
     the rate as at today and applies it to a shipment from April gets the wrong
     number, and gets it silently. */
  const sourcing = COUNTRIES.filter(c => c.role === 'sourcing');
  let tariffNo = 1;
  const CHANGED = new Set(['CMD-COC|GH', 'CMD-COF|KE', 'CMD-PLM|VN']);
  for (const c of COMMODITIES) {
    for (const o of sourcing) {
      const key = `${c.id}|${o.id}`;
      // The three that change mid-quarter are always emitted. A deliberate
      // fault behind a coin flip is a fault that sometimes is not there, and
      // a guard cannot assert something that is only usually true.
      if (!CHANGED.has(key) && !chance(0.55)) continue;
      const base = Math.round(between(0, 14) * 10) / 10;
      if (CHANGED.has(key)) {
        const changeOn = day(Math.floor(between(28, 62)));
        f.tariff.row([`TRF-${pad(tariffNo++, 4)}`, c.id, o.id, dec(base, 1), day(-720), changeOn]);
        f.tariff.row([`TRF-${pad(tariffNo++, 4)}`, c.id, o.id,
          dec(Math.round(between(base + 2, base + 9) * 10) / 10, 1), changeOn, '']);
      } else {
        f.tariff.row([`TRF-${pad(tariffNo++, 4)}`, c.id, o.id, dec(base, 1), day(-720), '']);
      }
    }
  }

  /* ── getting it here ───────────────────────────────────────────────────── */
  let laneNo = 1;
  for (const o of sourcing) {
    const far = ['VN', 'BZ', 'KE', 'GH', 'CR'].includes(o.id);
    for (const mode of far ? ['sea', 'air'] : ['road', 'sea']) {
      const air = mode === 'air';
      f.lane.row([`LN-${pad(laneNo++, 3)}`, o.id, far ? 'DC-05' : pick(['DC-01', 'DC-05']), mode,
        money(air ? between(890, 2400) : far ? between(95, 260) : between(38, 145)),
        Math.round(air ? between(2, 5) : far ? between(22, 46) : between(3, 11)),
        Math.round(air ? between(1800, 4200) : far ? between(85, 240) : between(40, 130))]);
    }
  }

  /* ── the product master, enriched ──────────────────────────────────────── */
  const COMMODITY_FOR = {
    Cereal: 'CMD-WHT', Bakery: 'CMD-WHT', 'Dry goods': 'CMD-WHT', Chilled: 'CMD-DRY',
    Frozen: 'CMD-DRY', Drinks: 'CMD-SUN', Tinned: 'CMD-ALU', Produce: 'CMD-DSL',
    Household: 'CMD-BRD', 'Health and beauty': 'CMD-PLM', Pet: 'CMD-WHT',
    'Beer wine spirits': 'CMD-GAS'
  };
  for (const p of catalogue) {
    const roll = rnd();
    p.tier = roll < 0.54 ? 'branded' : roll < 0.65 ? 'value' : roll < 0.92 ? 'core' : 'finest';
    p.ownLabel = p.tier !== 'branded';
    p.kvi = chance(0.085);                       // the lines customers remember
    p.commodity = COMMODITY_FOR[p.category] ?? 'CMD-WHT';
    p.origin = chance(0.38) ? pick(sourcing).id : 'BR';
    p.madeInHouse = p.ownLabel && chance(0.14);
  }
  const kviList = catalogue.filter(p => p.kvi);

  /* ── the same product, five prices ─────────────────────────────────────── */
  for (const p of catalogue) {
    for (const z of PRICE_ZONES) {
      // Rounded to a price a shop would actually print, which is why the
      // multiplier does not reproduce exactly when you divide back out.
      const raw = p.price * z.multiplier;
      const shelf = raw < 1 ? Math.round(raw * 20) / 20 : Math.round(raw * 100) / 100;
      f.zonePrice.row([p.sku, z.id, money(Math.max(0.05, shelf)), day(-Math.floor(between(10, 200)))]);
      p.zonePrice = p.zonePrice || {};
      p.zonePrice[z.id] = Math.max(0.05, shelf);
    }
  }
  const zonePriceOf = (p, zoneId) => (p.zonePrice && p.zonePrice[zoneId]) || p.price;

  /* ── elasticity, published without a health warning ────────────────────
     Same table, same columns, same number of decimal places, whether it was
     fitted on nine thousand observations or nine. The observations column is
     the only thing that tells you, and nothing forces you to look at it. */
  const modelled = catalogue.filter(() => chance(0.37));
  for (const p of modelled) {
    for (const z of PRICE_ZONES) {
      if (!chance(0.8)) continue;
      const thin = chance(0.14);
      const obs = thin ? Math.round(between(9, 40)) : Math.round(between(340, 9400));
      const e = -(between(0.4, 3.2));
      f.elasticity.row([p.sku, z.id, dec(e, 3),
        dec(thin ? between(0.6, 2.4) : between(0.03, 0.22), 3), obs,
        dec(thin ? between(0.01, 0.2) : between(0.44, 0.93), 3), day(-Math.floor(between(3, 40)))]);
    }
  }

  /* ── what the competition charges, as far as anybody went and looked ──── */
  let checkNo = 1;
  const emitChecks = (b, date) => {
    // One colleague walks one competitor and writes prices on a clipboard, so
    // every check in a visit carries the same name and the same date, and a
    // branch nobody visited this week simply has no rows.
    const crew = (ctx.staffAt && ctx.staffAt.get(b.id)) || [];
    for (const c of b.competitors) {
      // Roughly one visit a week per competitor, which leaves plenty of
      // branch-weeks with no check at all. Somebody has to walk round a rival's
      // shop with a clipboard, and there is one of them per region.
      if (!chance(0.12)) continue;
      const by = crew.length ? pick(crew) : '';
      for (const p of kviList) {
        if (!chance(0.55)) continue;
        const ours = zonePriceOf(p, b.zone);
        const drift = c.position === 'discounter' ? between(0.89, 0.96)
          : c.position === 'premium' ? between(1.08, 1.2)
            : c.position === 'convenience' ? between(1.1, 1.25)
              : between(0.97, 1.03);
        f.check.row([`CHK-${pad(checkNo++, 7)}`, b.id, c.id, p.sku, date,
          money(ours * drift), money(ours), by]);
      }
    }
  };

  /* ── buying, centrally ─────────────────────────────────────────────────
     Two flows exist and they are not the same table. Central buying places an
     order on a supplier into a depot; a depot then delivers to a branch, which
     is shipment.csv. A third of orders are still open at the end of the
     quarter, so received_on is blank and that blank is a not-yet. */
  const tendered = catalogue.filter(() => chance(0.28));
  let quoteNo = 1, poNo = 1;
  const quoteBySku = new Map();
  for (const p of tendered) {
    const bidders = [];
    const n = 2 + Math.floor(rnd() * 3);
    for (let i = 0; i < n; i++) {
      const s = pick(suppliers);
      if (bidders.some(b => b.id === s.id)) continue;
      bidders.push(s);
      const cur = s.currency;
      const gbpCost = p.price * between(0.42, 0.68);
      f.quote.row([`QT-${pad(quoteNo++, 6)}`, p.sku, s.id, cur,
        dec(gbpCost * rateOn(cur, day(0)), 4), s.incoterm,
        Math.round(between(48, 4800)), Math.round(between(2, 46)),
        day(-Math.floor(between(20, 200))), day(Math.floor(between(20, 260)))]);
    }
    if (bidders.length) quoteBySku.set(p.sku, bidders);
  }

  const emitOrders = (d, date) => {
    const n = Math.round(between(4, 18));
    for (let i = 0; i < n; i++) {
      const p = pick(tendered);
      const bidders = quoteBySku.get(p.sku);
      if (!bidders) continue;
      const s = pick(bidders);
      const lead = Math.round(between(3, 40));
      const open = chance(0.31) || d + lead > DAYS;
      f.po.row([`PO-${pad(poNo++, 6)}`, s.id, pick(DEPOTS).id, p.sku, date,
        Math.round(between(120, 9600)),
        dec(p.price * between(0.42, 0.68) * rateOn(s.currency, date), 4), s.currency, s.incoterm,
        day(d + lead), open ? '' : day(d + lead + Math.round(between(-2, 6)))]);
    }
  };

  /* ── how well they actually did ────────────────────────────────────────── */
  for (const s of suppliers)
    for (let m = 0; m <= 2; m++)
      f.supplierPerf.row([s.id, monthLabel(m), dec(between(0.71, 0.995), 3),
        Math.round(between(0, 34)), Math.round(between(0, 11)),
        dec(s.leadDays * between(0.9, 1.9), 1)]);

  /* ── making it ourselves ───────────────────────────────────────────────── */
  const made = catalogue.filter(p => p.madeInHouse);
  for (const p of made) {
    const inputs = 2 + Math.floor(rnd() * 4);
    const used = new Set([p.commodity]);
    f.bom.row([p.sku, p.commodity, dec(between(0.02, 1.4), 4), 'kg', dec(between(0.5, 9), 2)]);
    for (let i = 1; i < inputs; i++) {
      const c = pick(COMMODITIES);
      if (used.has(c.id)) continue;
      used.add(c.id);
      f.bom.row([p.sku, c.id, dec(between(0.005, 0.6), 4),
        ['CMD-DSL', 'CMD-GAS'].includes(c.id) ? 'kWh' : 'kg', dec(between(0.2, 7), 2)]);
    }
  }

  let runNo = 1;
  const emitProduction = (d, date) => {
    for (const l of lines) {
      if (!chance(0.72)) continue;
      const candidates = made.filter(p => p.category === l.makes);
      const p = candidates.length ? pick(candidates) : pick(made);
      if (!p) continue;
      const planned = Math.round(between(4_000, 78_000));
      // Most runs reconcile: good plus scrap is what was planned. About a
      // quarter do not, because the run was cut short and nobody wrote the
      // difference back to the plan. A discrepancy present on every single row
      // is not a discrepancy, it is the format, and there is nothing to find.
      const scrap = Math.round(planned * between(0.004, 0.07));
      const good = chance(0.26)
        ? Math.round((planned - scrap) * between(0.8, 0.96))
        : planned - scrap;
      f.run.row([`RUN-${pad(runNo++, 6)}`, l.factory, l.id, date, p.sku,
        planned, good, scrap, Math.round(between(0, 190))]);
    }
  };

  /* ── the make or buy case ──────────────────────────────────────────────
     The recommendation column is a model output. The decision column is a
     person, and a third of the time there is not one yet. Reading the first as
     though it were the second is the mistake this table exists to teach. */
  let caseNo = 1;
  for (const p of catalogue.filter(p => p.ownLabel && chance(0.09))) {
    const annual = Math.round(between(40_000, 3_200_000));
    const buy = Math.round(p.price * between(0.44, 0.66) * 10000) / 10000;
    const makeUnit = Math.round(buy * between(0.68, 1.22) * 10000) / 10000;
    const capex = Math.round(between(60_000, 2_400_000));
    const saving = buy - makeUnit;
    const breakeven = saving > 0 ? Math.round(capex / saving) : '';
    const payback = saving > 0 ? Math.round((capex / (saving * annual)) * 12 * 10) / 10 : '';
    const rec = saving <= 0 ? 'buy' : payback !== '' && payback < 30 ? 'make' : 'review';
    const decided = chance(0.66);
    f.makeBuy.row([`MOB-${pad(caseNo++, 4)}`, p.sku, annual, dec(buy), dec(makeUnit), capex,
      breakeven, payback === '' ? '' : dec(payback, 1), rec,
      decided ? pick([rec, rec, rec, 'buy', 'deferred']) : '',
      decided ? day(-Math.floor(between(5, 240))) : '']);
  }

  /* ── the acquisition, on its own systems ───────────────────────────────
     Different key format, different column names, different currency, and no
     way to join it to anything except through a crosswalk somebody maintains
     by hand. */
  const TOWNS_AV = ['Aalstrand', 'Bergehaven', 'Cloonvara', 'Drimmelen', 'Ennisbruck',
    'Fjordal', 'Garvenholm', 'Havenster', 'Inisveld', 'Kaltenbrun', 'Lindehoek'];
  const shops = [];
  for (let i = 0; i < MERIDIAN.stores; i++) {
    const no = 4100 + i * 7;
    shops.push(no);
    f.meridian.row([no, `"${TOWNS_AV[i]}"`, Math.round(between(620, 3100)),
      day(-Math.floor(between(900, 7200))), `"${pick(['A. Voss', 'M. Draeger', 'P. Lyngstad',
        'S. Halloran', 'T. Vermeer', 'R. Kaltenbach'])}"`]);
  }
  const emitMeridian = date => {
    for (const no of shops)
      f.meridianSales.row([no, date, dec(between(9_400, 74_000), 2),
        Math.round(between(310, 2400)), dec(between(88, 620), 1)]);
  };

  let article = 88000;
  for (const p of catalogue) {
    if (!chance(MERIDIAN.crosswalkCoverage)) continue;
    // Meridian never split the pack sizes, so two Qubix SKUs sometimes land on
    // one article and the join is many to one in a direction nobody expects.
    const reuse = chance(0.06) && article > 88000;
    const art = reuse ? article - 7 : (article += 7);
    f.crosswalk.row([p.sku, `AV-${art}`, dec(between(0.62, 1), 2),
      day(-Math.floor(between(30, 700)))]);
  }

  /* ── what got thrown away, and what we knew about it ───────────────────
     "other" takes a third, because the reason code is chosen at the end of a
     shift by somebody who wants to go home. */
  const REASONS = ['out-of-date', 'damaged', 'unsold-markdown', 'temperature-failure',
    'other', 'other'];
  let markNo = 1;
  const shortLife = catalogue.filter(p => p.chilled);
  const emitFloor = (b, date, n) => {
    const marks = Math.round(between(2, 11) * (b.format === 'Superstore' ? 1.8 : 1));
    for (let i = 0; i < marks; i++) {
      const p = pick(shortLife);
      const was = zonePriceOf(p, b.zone);
      const now = Math.round(was * between(0.25, 0.7) * 100) / 100;
      const units = Math.round(between(1, 26));
      const sold = Math.round(units * between(0.3, 1));
      f.markdown.row([`MD-${pad(markNo++, 7)}`, b.id, date, p.sku, money(was), money(now),
        units, sold, units - sold]);
    }
    const wasteLines = Math.round(between(2, 8));
    for (let i = 0; i < wasteLines; i++) {
      const p = pick(catalogue);
      const units = Math.round(between(1, 40));
      f.waste.row([b.id, date, p.sku, pick(REASONS), units,
        money(units * p.price * between(0.45, 0.7))]);
    }
  };

  const emitLabour = (b, date, forecast, actual) =>
    f.labour.row([b.id, date, dec(between(380, 3400), 1), dec(between(360, 3600), 1),
      Math.round(forecast), actual]);

  const emitDepotStock = date => {
    for (const d of DEPOTS)
      for (const p of catalogue) {
        if (!chance(0.28)) continue;
        f.depotStock.row([d.id, date, p.sku, Math.round(between(0, 340)),
          dec(between(0.2, 9.5), 1)]);
      }
  };

  return {
    files: Object.values(f),
    zonePriceOf,
    perBranchDay: (b, date, n) => { emitChecks(b, date); emitFloor(b, date, n); },
    perDay: (d, date) => { emitOrders(d, date); emitProduction(d, date); emitMeridian(date); },
    perWeek: (d, date) => { emitDepotStock(date); },
    perWeekBranch: emitLabour
  };

  function monthLabel(offset) {
    const base = new Date(day(0) + 'T00:00:00Z');
    base.setUTCMonth(base.getUTCMonth() + offset, 1);
    return base.toISOString().slice(0, 7);
  }
  function monthPublished(offset) {
    const base = new Date(day(0) + 'T00:00:00Z');
    base.setUTCMonth(base.getUTCMonth() + offset + 1, 10);
    return base.toISOString().slice(0, 10);
  }
}
