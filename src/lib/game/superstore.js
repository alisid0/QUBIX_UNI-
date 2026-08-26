// Qubix Superstore: the world every mission is set in.
//
// The fiction was already consistent in spirit. B-17 and B-08 recur across six
// missions, the SKU prefixes hold, and sales run from S-1041. What was missing
// was anywhere to look it up, so each mission hardcoded its own fragment and the
// fragments disagreed in ways nobody could see from inside one file:
//
//   B-17 was also written "Branch 17" and "BR-017"
//   B-08 was called both "Branch 08" and "Eastfield"
//   Riverside was quoted in a complaint rate with no branch id at all
//   BR-004 existed once and nowhere else
//
// This is the source those facts come from now. It is deliberately fuller than
// the missions currently need: a mission that wants a third branch or a chilled
// product should find one here rather than invent one.
//
// Missions may contradict it on purpose. Keys and Duplicate Records is entirely
// about a SKU that arrives twice with conflicting attributes, so it shows
// QX-DRK-014 as both "Orchard Juice" at 2.15 and "Orchard Juice 1L" at 2.25.
// That is the lesson, not a mistake. Such a mission declares `contradicts` and
// check-world leaves it alone.

/** Branches, largest first. Transaction volumes are one quarter. */
export const BRANCHES = Object.freeze([
  Object.freeze({
    id: 'B-17', name: 'Northgate', format: 'Superstore',
    transactions: 60000, staff: 84, opened: '2011-03-14',
    note: 'The flagship. Most examples are set here because it is busy enough for a rate to mean something.'
  }),
  Object.freeze({
    id: 'B-08', name: 'Eastfield', format: 'Superstore',
    transactions: 41000, staff: 61, opened: '2014-09-02',
    note: 'Second largest, and the one with the cold room whose sensor keeps appearing in lineage work.'
  }),
  Object.freeze({
    id: 'B-09', name: 'Millgate', format: 'Supermarket',
    transactions: 22500, staff: 33, opened: '2017-06-19',
    note: 'Mid-sized. Useful when an example needs a branch that is neither the biggest nor the smallest.'
  }),
  Object.freeze({
    id: 'B-04', name: 'Harbour Point', format: 'Supermarket',
    transactions: 14200, staff: 24, opened: '2019-04-08',
    note: 'Coastal, seasonal. Its stock counts are the least complete, which makes it useful for absence.'
  }),
  Object.freeze({
    id: 'B-02', name: 'Canalside', format: 'Express',
    transactions: 8600, staff: 12, opened: '2021-11-23',
    note: 'Small format, long hours, no delivery.'
  }),
  Object.freeze({
    id: 'B-01', name: 'Riverside', format: 'Express',
    transactions: 5000, staff: 9, opened: '2022-02-01',
    note: 'The smallest. Any count taken here needs a denominator before it can be compared with Northgate.'
  })
]);

/** The product master. Prices are the current shelf price in pounds. */
export const PRODUCTS = Object.freeze([
  Object.freeze({ sku: 'QX-CER-001', name: 'Oat Crunch', category: 'Cereal', unit: '750 g', price: 2.85, chilled: false }),
  Object.freeze({ sku: 'QX-CER-002', name: 'Bran Flakes', category: 'Cereal', unit: '500 g', price: 2.10, chilled: false }),
  Object.freeze({ sku: 'QX-DRK-014', name: 'Orchard Juice', category: 'Drinks', unit: '1 L', price: 2.15, chilled: true }),
  Object.freeze({ sku: 'QX-DRK-021', name: 'Still Water', category: 'Drinks', unit: '2 L', price: 0.85, chilled: false }),
  Object.freeze({ sku: 'QX-TIN-032', name: 'Chopped Tomatoes', category: 'Tinned', unit: '400 g', price: 0.95, chilled: false }),
  Object.freeze({ sku: 'QX-TIN-045', name: 'Butter Beans', category: 'Tinned', unit: '400 g', price: 1.05, chilled: false }),
  Object.freeze({ sku: 'QX-DRY-184', name: 'Long Grain Rice', category: 'Dry goods', unit: '1 kg', price: 1.90, chilled: false }),
  Object.freeze({ sku: 'QX-CHL-007', name: 'Salted Butter', category: 'Chilled', unit: '250 g', price: 2.40, chilled: true }),
  Object.freeze({ sku: 'QX-FRZ-112', name: 'Garden Peas', category: 'Frozen', unit: '900 g', price: 1.75, chilled: true })
]);

/** Systems a value can come from, which is what lineage work traces between. */
export const SYSTEMS = Object.freeze([
  Object.freeze({ id: 'checkout', name: 'Checkout', produces: 'sale, sale_line' }),
  Object.freeze({ id: 'inventory', name: 'Stock control', produces: 'inventory_snapshot' }),
  Object.freeze({ id: 'coldchain', name: 'Cold chain monitoring', produces: 'sensor_reading' }),
  Object.freeze({ id: 'receiving', name: 'Goods receiving', produces: 'shipment, supplier_invoice' }),
  Object.freeze({ id: 'loyalty', name: 'Loyalty', produces: 'customer_profile' }),
  Object.freeze({ id: 'digital', name: 'Digital orders', produces: 'customer_order' })
]);

export const branch = id => BRANCHES.find(b => b.id === id) || null;
export const product = sku => PRODUCTS.find(p => p.sku === sku) || null;

/** The canonical spelling of a branch, for prose: "Northgate (B-17)". */
export const branchLabel = id => {
  const b = branch(id);
  return b ? `${b.name} (${b.id})` : id;
};
