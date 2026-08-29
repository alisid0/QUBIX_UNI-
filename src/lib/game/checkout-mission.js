import { PRODUCT_CATALOG } from '../three/assets/index.js';

export const CHECKOUT_MISSION = Object.freeze({
  id: 'PRE-DATA-001',
  title: 'Process a Sale',
  status: 'AI_DRAFT',
  role: 'Pre-Intern',
  competency: 'Distinguish raw observations, master data and derived transaction data.',
  order: Object.freeze([
    Object.freeze({ sku: 'QX-CER-001', quantity: 1 }),
    Object.freeze({ sku: 'QX-DRK-014', quantity: 2 }),
    Object.freeze({ sku: 'QX-TIN-032', quantity: 3 })
  ])
});

export const productFor = sku => PRODUCT_CATALOG.find(product => product.sku === sku);

export function createScanOutcome({ transactionId, checkoutId, sequence, product, quantity, observedAt }) {
  if (!productFor(product.sku)) throw new Error(`Mission product ${product.sku} is not in the catalogue.`);
  if (!Number.isInteger(quantity) || quantity < 1) throw new Error('Quantity must be a positive whole number.');

  const lineTotal = +(product.unitPrice * quantity).toFixed(2);
  const rawEvent = Object.freeze({
    event_id: `SCAN-${String(sequence).padStart(3, '0')}`,
    event_type: 'barcode_scanned',
    barcode: product.barcode,
    checkout_id: checkoutId,
    observed_at: observedAt
  });
  const lineRecord = Object.freeze({
    transaction_id: transactionId,
    line_number: sequence,
    sku: product.sku,
    quantity,
    unit_price: product.unitPrice,
    line_total: lineTotal
  });

  return Object.freeze({
    rawEvent,
    masterRecord: Object.freeze({
      sku: product.sku,
      name: product.name,
      category: product.category,
      unit_price: product.unitPrice
    }),
    lineRecord
  });
}

export function summariseBasket(lines) {
  return Object.freeze({
    line_count: lines.length,
    item_count: lines.reduce((sum, line) => sum + line.quantity, 0),
    basket_total: +lines.reduce((sum, line) => sum + line.line_total, 0).toFixed(2)
  });
}
