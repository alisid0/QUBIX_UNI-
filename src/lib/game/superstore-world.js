// The world above the shop floor.
//
// superstore.js is one chain of 48 branches. This is the group that owns it:
// the geography those branches sit in, the management that runs them, the zones
// that price them, the depots that supply them, the countries goods come from,
// the commodities those goods are made of, and the three factories the group
// bought so it could make some of them itself.
//
// It exists because the decisions a supermarket makes are stratified, and the
// data has to be stratified the same way or the decisions cannot be modelled:
//
//   a branch decides what to mark down tonight
//   a district decides where to move staff this week
//   a region decides which stores get the seasonal range
//   the centre decides what a product costs and what it sells for
//   the group decides which country to buy from, and what to stop buying at all
//
// Everything here is hand-authored and frozen. The generated tables in data/ are
// derived from it, so a figure here is the reason a figure there is what it is.
//
// The faults are deliberate and are listed at the bottom of this file.

/* ── countries ─────────────────────────────────────────────────────────────
   Two the group trades in, and eleven it buys from. Currency is the point:
   a group total that sums money across these without converting is wrong, and
   nothing in the data stops you doing it. */
export const COUNTRIES = Object.freeze([
  Object.freeze({ id: 'BR', name: 'Brannoch', currency: 'GBP', role: 'home', tradesIn: true }),
  Object.freeze({ id: 'AV', name: 'Averlund', currency: 'EUR', role: 'acquired estate', tradesIn: true }),
  Object.freeze({ id: 'ES', name: 'Estramar', currency: 'EUR', role: 'sourcing', tradesIn: false }),
  Object.freeze({ id: 'PL', name: 'Polvenia', currency: 'PLN', role: 'sourcing', tradesIn: false }),
  Object.freeze({ id: 'DK', name: 'Danmark Nord', currency: 'DKK', role: 'sourcing', tradesIn: false }),
  Object.freeze({ id: 'MA', name: 'Maghreb Sud', currency: 'MAD', role: 'sourcing', tradesIn: false }),
  Object.freeze({ id: 'KE', name: 'Kirinyaga', currency: 'KES', role: 'sourcing', tradesIn: false }),
  Object.freeze({ id: 'VN', name: 'Anh Viet', currency: 'VND', role: 'sourcing', tradesIn: false }),
  Object.freeze({ id: 'BZ', name: 'Brasilia Verde', currency: 'BRL', role: 'sourcing', tradesIn: false }),
  Object.freeze({ id: 'GH', name: 'Ashanti Coast', currency: 'GHS', role: 'sourcing', tradesIn: false }),
  Object.freeze({ id: 'CR', name: 'Costa Alta', currency: 'USD', role: 'sourcing', tradesIn: false }),
  Object.freeze({ id: 'TR', name: 'Anatolia', currency: 'TRY', role: 'sourcing', tradesIn: false }),
  Object.freeze({ id: 'NL', name: 'Vlaanden', currency: 'EUR', role: 'sourcing', tradesIn: false })
]);

/** Rough rate against the pound at the start of the quarter. Daily rates in
    fx_rate.csv drift from these, and there are no rates at the weekend. */
export const CURRENCIES = Object.freeze([
  Object.freeze({ code: 'GBP', name: 'Brannoch pound', perGbp: 1 }),
  Object.freeze({ code: 'EUR', name: 'Euro', perGbp: 1.17 }),
  Object.freeze({ code: 'USD', name: 'Dollar', perGbp: 1.27 }),
  Object.freeze({ code: 'PLN', name: 'Polvenian zloty', perGbp: 5.04 }),
  Object.freeze({ code: 'DKK', name: 'Nord krone', perGbp: 8.72 }),
  Object.freeze({ code: 'MAD', name: 'Maghreb dirham', perGbp: 12.6 }),
  Object.freeze({ code: 'KES', name: 'Kirinyaga shilling', perGbp: 164 }),
  Object.freeze({ code: 'VND', name: 'Viet dong', perGbp: 31200 }),
  Object.freeze({ code: 'BRL', name: 'Verde real', perGbp: 6.41 }),
  Object.freeze({ code: 'GHS', name: 'Ashanti cedi', perGbp: 15.8 }),
  Object.freeze({ code: 'TRY', name: 'Anatolian lira', perGbp: 41.2 })
]);

/* ── the management hierarchy ─────────────────────────────────────────────
   Regions and districts are how the company is run. A district manager has
   three to five branches; a regional director has two or three districts. */
export const REGIONS = Object.freeze([
  Object.freeze({ id: 'RGN-N', name: 'Northmarch', director: 'E-901', established: '2009-01-01' }),
  Object.freeze({ id: 'RGN-W', name: 'Westreach', director: 'E-902', established: '2009-01-01' }),
  Object.freeze({ id: 'RGN-C', name: 'Cindermoor', director: 'E-903', established: '2012-04-01' }),
  Object.freeze({ id: 'RGN-E', name: 'Eastfen', director: 'E-904', established: '2012-04-01' }),
  Object.freeze({ id: 'RGN-S', name: 'Southdown', director: 'E-905', established: '2016-09-01' }),
  Object.freeze({ id: 'RGN-K', name: 'Kingsbourne', director: 'E-906', established: '2018-02-01' })
]);

export const DISTRICTS = Object.freeze([
  Object.freeze({ id: 'DIS-01', name: 'Northmarch Upper', region: 'RGN-N', manager: 'E-911' }),
  Object.freeze({ id: 'DIS-02', name: 'Northmarch Coast', region: 'RGN-N', manager: 'E-912' }),
  Object.freeze({ id: 'DIS-03', name: 'Westreach Vale', region: 'RGN-W', manager: 'E-913' }),
  Object.freeze({ id: 'DIS-04', name: 'Westreach Moor', region: 'RGN-W', manager: 'E-914' }),
  Object.freeze({ id: 'DIS-05', name: 'Cindermoor North', region: 'RGN-C', manager: 'E-915' }),
  Object.freeze({ id: 'DIS-06', name: 'Cindermoor South', region: 'RGN-C', manager: 'E-916' }),
  Object.freeze({ id: 'DIS-07', name: 'Eastfen Levels', region: 'RGN-E', manager: 'E-917' }),
  Object.freeze({ id: 'DIS-08', name: 'Eastfen Shore', region: 'RGN-E', manager: 'E-918' }),
  Object.freeze({ id: 'DIS-09', name: 'Southdown Weald', region: 'RGN-S', manager: 'E-919' }),
  Object.freeze({ id: 'DIS-10', name: 'Southdown Harbour', region: 'RGN-S', manager: 'E-920' }),
  Object.freeze({ id: 'DIS-11', name: 'Kingsbourne Inner', region: 'RGN-K', manager: 'E-921' }),
  Object.freeze({ id: 'DIS-12', name: 'Kingsbourne Outer', region: 'RGN-K', manager: 'E-922' }),
  Object.freeze({ id: 'DIS-13', name: 'Kingsbourne West', region: 'RGN-K', manager: 'E-923' }),
  Object.freeze({ id: 'DIS-14', name: 'Cindermoor Fringe', region: 'RGN-C', manager: 'E-924' })
]);

/* ── the geographic hierarchy ─────────────────────────────────────────────
   Counties are where places are, not who runs them. The two hierarchies were
   drawn forty years apart by different departments and they do not line up:
   a branch can sit in a county whose region is not the region its district
   reports to. Nothing in the data warns you. "Sales by region" is therefore
   two different numbers depending on which path you take, and the difference
   is not an error in either one. */
export const COUNTIES = Object.freeze([
  Object.freeze({ id: 'CTY-ARD', name: 'Ardwick', country: 'BR', region: 'RGN-N', population: 1_240_000 }),
  Object.freeze({ id: 'CTY-BRA', name: 'Bramlow', country: 'BR', region: 'RGN-N', population: 610_000 }),
  Object.freeze({ id: 'CTY-CAL', name: 'Calderness', country: 'BR', region: 'RGN-W', population: 890_000 }),
  Object.freeze({ id: 'CTY-DUR', name: 'Durnholt', country: 'BR', region: 'RGN-W', population: 445_000 }),
  Object.freeze({ id: 'CTY-EAV', name: 'Eavesmere', country: 'BR', region: 'RGN-C', population: 1_510_000 }),
  Object.freeze({ id: 'CTY-FEN', name: 'Fenwold', country: 'BR', region: 'RGN-E', population: 720_000 }),
  Object.freeze({ id: 'CTY-GAR', name: 'Garrowby', country: 'BR', region: 'RGN-E', population: 388_000 }),
  Object.freeze({ id: 'CTY-HAL', name: 'Halstead', country: 'BR', region: 'RGN-C', population: 963_000 }),
  Object.freeze({ id: 'CTY-ILM', name: 'Ilmarsh', country: 'BR', region: 'RGN-S', population: 555_000 }),
  Object.freeze({ id: 'CTY-KEN', name: 'Kenwater', country: 'BR', region: 'RGN-S', population: 1_070_000 }),
  Object.freeze({ id: 'CTY-LOW', name: 'Lowbourne', country: 'BR', region: 'RGN-K', population: 2_840_000 }),
  Object.freeze({ id: 'CTY-MER', name: 'Merrowfield', country: 'BR', region: 'RGN-K', population: 1_930_000 }),
  Object.freeze({ id: 'CTY-NOR', name: 'Norstrand', country: 'BR', region: 'RGN-N', population: 402_000 }),
  Object.freeze({ id: 'CTY-OAK', name: 'Oakmere', country: 'BR', region: 'RGN-W', population: 336_000 })
]);

/* ── price zones ──────────────────────────────────────────────────────────
   A third hierarchy over the same branches, and it nests in neither of the
   other two, because price follows competition rather than geography. A city
   centre Express and a rural Express are not in the same market even when they
   are in the same county.

   The multiplier is applied to the national list price in superstore.js, which
   is why the same SKU rings through at different money in different branches
   and why "the price of QX-CER-001" is not a question with one answer. */
export const PRICE_ZONES = Object.freeze([
  Object.freeze({ id: 'PZ-METRO', name: 'Metro', multiplier: 1.14, note: 'City centre, short opening, high rent, low basket.' }),
  Object.freeze({ id: 'PZ-URBAN', name: 'Urban', multiplier: 1.04, note: 'Town centre and inner suburb.' }),
  Object.freeze({ id: 'PZ-CORE', name: 'Core', multiplier: 1.00, note: 'The national list price. Most superstores sit here.' }),
  Object.freeze({ id: 'PZ-VALUE', name: 'Value', multiplier: 0.94, note: 'Within two miles of a discounter. Priced to hold footfall.' }),
  Object.freeze({ id: 'PZ-REMOTE', name: 'Remote', multiplier: 1.09, note: 'Coastal and upland. Costs more to serve, so it costs more to shop.' })
]);

/* ── depots ───────────────────────────────────────────────────────────────
   A branch is served by more than one, because ambient, chilled and frozen
   move through different buildings. Joining depot to branch therefore fans
   out, and "how many branches does Kettleby serve" and "how many depots serve
   Northgate" are both counts with a condition. */
export const DEPOTS = Object.freeze([
  Object.freeze({ id: 'DC-01', name: 'Kettleby', county: 'CTY-EAV', regime: 'ambient', pallets: 42_000, opened: '2004-06-01' }),
  Object.freeze({ id: 'DC-02', name: 'Harrowgate', county: 'CTY-ARD', regime: 'ambient', pallets: 28_500, opened: '2011-10-01' }),
  Object.freeze({ id: 'DC-03', name: 'Saltney', county: 'CTY-KEN', regime: 'chilled', pallets: 11_200, opened: '2015-03-01' }),
  Object.freeze({ id: 'DC-04', name: 'Wrenfold', county: 'CTY-HAL', regime: 'frozen', pallets: 8_400, opened: '2018-08-01' }),
  Object.freeze({ id: 'DC-05', name: 'Port Anster', county: 'CTY-NOR', regime: 'import', pallets: 19_000, opened: '2009-02-01' })
]);

/* ── who else is on the high street ───────────────────────────────────────
   Competitor prices are checked by hand, weekly, on a list of lines customers
   are believed to remember the price of. It is a sample and not a census, the
   checks are not all done on the same day, and some of them are stale by the
   time anybody looks. Pricing decisions are made from it anyway. */
export const COMPETITORS = Object.freeze([
  Object.freeze({ id: 'CMP-HW', name: 'Hallwards', position: 'full range', stance: 'matched' }),
  Object.freeze({ id: 'CMP-BG', name: 'Bergstrom', position: 'discounter', stance: 'undercut by 6 to 11%' }),
  Object.freeze({ id: 'CMP-KL', name: 'Kesslers', position: 'discounter', stance: 'undercut by 4 to 9%' }),
  Object.freeze({ id: 'CMP-VN', name: 'Verrondale', position: 'premium', stance: 'above by 8 to 20%' }),
  Object.freeze({ id: 'CMP-QS', name: 'Quickstop', position: 'convenience', stance: 'above by 10 to 25%' }),
  Object.freeze({ id: 'CMP-ON', name: 'Orderline', position: 'online only', stance: 'matched, plus a delivery fee' })
]);

/* ── what things are made of ──────────────────────────────────────────────
   Cost does not start at the supplier. It starts here, and a supplier who
   raises a price in May is usually passing on something that happened to one
   of these in February. The index is 100 at the start of 2025. */
export const COMMODITIES = Object.freeze([
  Object.freeze({ id: 'CMD-WHT', name: 'Milling wheat', unit: 'tonne', base: 214, volatility: 'high' }),
  Object.freeze({ id: 'CMD-DRY', name: 'Raw milk', unit: '1000 L', base: 398, volatility: 'medium' }),
  Object.freeze({ id: 'CMD-COC', name: 'Cocoa', unit: 'tonne', base: 6_140, volatility: 'extreme' }),
  Object.freeze({ id: 'CMD-COF', name: 'Arabica coffee', unit: 'tonne', base: 4_720, volatility: 'extreme' }),
  Object.freeze({ id: 'CMD-PLM', name: 'Palm oil', unit: 'tonne', base: 892, volatility: 'medium' }),
  Object.freeze({ id: 'CMD-SUN', name: 'Sunflower oil', unit: 'tonne', base: 1_040, volatility: 'high' }),
  Object.freeze({ id: 'CMD-ALU', name: 'Aluminium', unit: 'tonne', base: 2_180, volatility: 'medium' }),
  Object.freeze({ id: 'CMD-BRD', name: 'Corrugated board', unit: 'tonne', base: 505, volatility: 'low' }),
  Object.freeze({ id: 'CMD-DSL', name: 'Diesel', unit: '1000 L', base: 1_310, volatility: 'high' }),
  Object.freeze({ id: 'CMD-GAS', name: 'Natural gas', unit: 'MWh', base: 78, volatility: 'extreme' })
]);

/* ── brand tiers ──────────────────────────────────────────────────────────
   The reason own label exists is the margin column. The reason it is hard is
   that a customer who cannot find the brand does not always trade down; a
   third of the time they leave. */
export const BRAND_TIERS = Object.freeze([
  Object.freeze({ id: 'branded', name: 'Branded', margin: 0.21, ownLabel: false, share: 0.54 }),
  Object.freeze({ id: 'value', name: 'Qubix Value', margin: 0.18, ownLabel: true, share: 0.11 }),
  Object.freeze({ id: 'core', name: 'Qubix', margin: 0.34, ownLabel: true, share: 0.27 }),
  Object.freeze({ id: 'finest', name: 'Qubix Finest', margin: 0.41, ownLabel: true, share: 0.08 })
]);

/* ── the factories ────────────────────────────────────────────────────────
   Bought rather than built, which is why their cost structures do not match
   and why one of them still runs a production system nobody at head office
   can query directly.

   A factory is a fixed cost. It is only cheaper than buying above a volume,
   and the volume is different for every product, which is the whole of the
   make-or-buy question. */
export const FACTORIES = Object.freeze([
  Object.freeze({
    id: 'FAC-01', name: 'Wrenfold Bakery', country: 'BR', county: 'CTY-HAL',
    makes: 'Bakery', capacityPerWeek: 1_450_000, fixedCostPerWeek: 214_000,
    acquired: '2017-05-02', lines: 4,
    note: 'Bread and morning goods. Runs seven days because bread does not keep.'
  }),
  Object.freeze({
    id: 'FAC-02', name: 'Saltney Fresh', country: 'BR', county: 'CTY-KEN',
    makes: 'Chilled', capacityPerWeek: 620_000, fixedCostPerWeek: 341_000,
    acquired: '2021-11-15', lines: 6,
    note: 'Ready meals and prepared salad. The highest margin own label the group makes, and the most waste.'
  }),
  Object.freeze({
    id: 'FAC-03', name: 'Averlund Bottling', country: 'AV', county: null,
    makes: 'Drinks', capacityPerWeek: 2_900_000, fixedCostPerWeek: 178_000,
    acquired: '2024-03-01', lines: 3,
    note: 'Came with the Meridian acquisition. Prices in euro, reports in a format nobody else uses.'
  })
]);

/* ── the acquisition ──────────────────────────────────────────────────────
   Meridian Markets was bought in 2024 and is still on its own systems. Its
   stores are not in branch.csv and never will be, because they are a different
   company with different keys, and pretending otherwise is how a group total
   ends up counting the same shop twice or not at all.

   The only bridge is product_crosswalk.csv, which is hand-maintained, about
   four fifths complete, and contains rows where two Qubix SKUs map to the same
   Meridian article because Meridian never split the pack sizes. */
export const MERIDIAN = Object.freeze({
  name: 'Meridian Markets',
  country: 'AV',
  currency: 'EUR',
  stores: 11,
  acquired: '2024-03-01',
  keyFormat: 'a four digit shop number, not a B-nn branch id',
  systemsMerged: false,
  crosswalkCoverage: 0.79
});

/* ── incoterms ────────────────────────────────────────────────────────────
   Who pays for what, which is why two quotes with the same number on them are
   not the same price. */
export const INCOTERMS = Object.freeze([
  Object.freeze({ id: 'EXW', name: 'Ex works', freightIncluded: false, dutyIncluded: false }),
  Object.freeze({ id: 'FOB', name: 'Free on board', freightIncluded: false, dutyIncluded: false }),
  Object.freeze({ id: 'CIF', name: 'Cost, insurance and freight', freightIncluded: true, dutyIncluded: false }),
  Object.freeze({ id: 'DDP', name: 'Delivered duty paid', freightIncluded: true, dutyIncluded: true })
]);

/* ── lookups ──────────────────────────────────────────────────────────────── */
export const country = id => COUNTRIES.find(c => c.id === id) || null;
export const region = id => REGIONS.find(r => r.id === id) || null;
export const district = id => DISTRICTS.find(d => d.id === id) || null;
export const county = id => COUNTIES.find(c => c.id === id) || null;
export const priceZone = id => PRICE_ZONES.find(z => z.id === id) || null;
export const depot = id => DEPOTS.find(d => d.id === id) || null;
export const commodity = id => COMMODITIES.find(c => c.id === id) || null;
export const factory = id => FACTORIES.find(f => f.id === id) || null;
export const currency = code => CURRENCIES.find(c => c.code === code) || null;

/** The management path: branch to district to region. */
export const regionOfDistrict = districtId => {
  const d = district(districtId);
  return d ? region(d.region) : null;
};

/** The geographic path: branch to county to region. It is not the same path,
    and for some branches it does not end in the same place. */
export const regionOfCounty = countyId => {
  const c = county(countyId);
  return c ? region(c.region) : null;
};

/* ── the deliberate faults ────────────────────────────────────────────────
   Every one of these is in the data on purpose, is documented here, and is
   asserted by check-dataset so it cannot quietly disappear:

   1.  Two hierarchies over the same branches that do not agree, so "by region"
       is ambiguous and neither answer is wrong.
   2.  A third hierarchy, price zones, that nests in neither.
   3.  The same SKU at different prices in different branches, so "the price"
       needs a branch before it means anything.
   4.  Quotes in eleven currencies, so the cheapest supplier cannot be found by
       sorting a column.
   5.  No FX rate at weekends, so a Saturday purchase order has to carry Friday
       forward, and a naive join drops it.
   6.  A tariff that changed mid-quarter, so duty depends on the date of the
       shipment and not the date of the query.
   7.  Elasticity estimates fitted on as few as nine observations, published in
       the same table and the same format as ones fitted on nine thousand.
   8.  Competitor prices that are a weekly hand-collected sample of a KVI list,
       not a census, with gaps where nobody went.
   9.  An acquired estate that is not in the branch table at all, and a product
       crosswalk that is 79% complete and not one-to-one.
   10. Waste reason codes with an "other" bucket that swallows a third of it.
   11. Production runs where good units plus scrap does not equal planned units.
   12. Make-or-buy rows with no decision yet, whose recommendation column is a
       model output and not a fact.                                            */
