const preview = (columns, row) => Object.freeze({
  columns: Object.freeze(columns),
  row: Object.freeze(row)
});

export const MISSING_DATA_MISSION = Object.freeze({
  id: 'MISSION 003',
  status: 'AI_DRAFT',
  role: 'PRE-INTERN',
  title: 'Missing Values Are Not Zero',
  competency: 'Interpret an absent value from its operational context and preserve its meaning during treatment.',
  sources: Object.freeze([
    Object.freeze({ label: 'Government Analysis Function — cells with no data', url: 'https://analysisfunction.civilservice.gov.uk/policy-store/releasing-statistics-in-spreadsheets/' }),
    Object.freeze({ label: 'Government Analysis Function — symbols and shorthand', url: 'https://analysisfunction.civilservice.gov.uk/policy-store/symbols-in-tables-definitions-and-help/' }),
    Object.freeze({ label: 'PostgreSQL — NULL means unknown', url: 'https://www.postgresql.org/docs/9.3/functions-comparison.html' })
  ]),
  cases: Object.freeze([
    Object.freeze({
      id: 'returns-zero', source: 'Checkout', table: 'sale_line', field: 'returned_unit_count', displayValue: '0', valueState: 'present', colour: 0xa85a34,
      preview: preview(['sale_line_id', 'sku', 'sold_units', 'returned_unit_count'], ['SL-10482', 'QX-TIN-032', '3', '0']),
      context: 'The returns system confirms that no units from this sale line were returned.', evidence: 'Return-event count: 0 · Feed arrived normally',
      classification: 'valid-zero', action: 'keep-zero',
      explanation: 'Zero is observed information here: the count is known and none occurred.', treatment: 'Keep 0. Replacing it with NULL would discard a known fact.'
    }),
    Object.freeze({
      id: 'stock-unknown', source: 'Branch 17', table: 'inventory_snapshot', field: 'closing_stock_units', displayValue: 'NULL', valueState: 'missing', colour: 0xc83c2c,
      preview: preview(['branch_id', 'snapshot_date', 'sku', 'closing_stock_units'], ['BR-017', '2026-08-20', 'QX-DRY-184', 'NULL']),
      context: 'The handheld stock scanner lost power before the closing count completed.', evidence: 'Scanner outage: 20:51–21:18 · Closing feed incomplete',
      classification: 'unknown', action: 'keep-null-issue',
      explanation: 'The quantity exists, but the branch does not know it from this feed.', treatment: 'Keep NULL, attach the outage reason, and raise a quality issue. Do not invent zero.'
    }),
    Object.freeze({
      id: 'pickup-distance', source: 'Digital', table: 'customer_order', field: 'delivery_distance_km', displayValue: 'NULL', valueState: 'missing', colour: 0x477c9f,
      preview: preview(['order_id', 'fulfilment_method', 'branch_id', 'delivery_distance_km'], ['ORD-8821', 'PICKUP', 'BR-004', 'NULL']),
      context: 'This was a click-and-collect order collected inside the branch.', evidence: 'fulfilment_method = PICKUP · No delivery journey exists',
      classification: 'not-applicable', action: 'keep-null-reason',
      explanation: 'Delivery distance does not apply because there was no delivery.', treatment: 'Keep NULL with a not-applicable reason code so it is not confused with an unknown distance.'
    }),
    Object.freeze({
      id: 'invoice-pending', source: 'Receiving', table: 'shipment', field: 'supplier_invoice_total', displayValue: 'NULL', valueState: 'missing', colour: 0xd99b42,
      preview: preview(['shipment_id', 'received_at', 'invoice_status', 'supplier_invoice_total'], ['SHP-2049', '09:14', 'AWAITING', 'NULL']),
      context: 'The shipment arrived this morning, but the supplier invoice is due tomorrow.', evidence: 'Goods received: 09:14 · Invoice status: AWAITING',
      classification: 'pending', action: 'keep-null-refresh',
      explanation: 'The value is temporarily unavailable and is expected to arrive later.', treatment: 'Keep NULL, record that it is pending, and refresh after the invoice arrives.'
    }),
    Object.freeze({
      id: 'age-not-collected', source: 'Loyalty', table: 'customer_profile', field: 'exact_age', displayValue: 'NULL', valueState: 'missing', colour: 0x795f95,
      preview: preview(['customer_id', 'age_band', 'exact_age', 'collection_status'], ['C-44192', '35–44', 'NULL', 'POLICY']),
      context: 'Qubix policy collects an age band when needed, but never collects exact customer age.', evidence: 'Collection policy: age_band only · exact_age field deprecated',
      classification: 'not-collected', action: 'keep-null-policy',
      explanation: 'This value is absent by design, not because collection failed.', treatment: 'Document the policy and remove the misleading field from new extracts; do not infer exact age.'
    }),
    Object.freeze({
      id: 'temperature-unknown', source: 'Cold room', table: 'sensor_reading', field: 'temperature_c', displayValue: 'NULL', valueState: 'missing', colour: 0x3f8f86,
      preview: preview(['sensor_id', 'recorded_at', 'device_status', 'temperature_c'], ['CR-07', '13:05', 'CALIBRATING', 'NULL']),
      context: 'The sensor sent a heartbeat but no temperature measurement during calibration.', evidence: 'Device online · Calibration window: 13:00–13:10',
      classification: 'unknown', action: 'keep-null-issue',
      explanation: 'The temperature existed, but no measurement was recorded during calibration.', treatment: 'Keep NULL with the calibration reason. Never treat it as 0 °C.'
    })
  ])
});

export const MISSINGNESS_OPTIONS = Object.freeze([
  Object.freeze({ value: 'valid-zero', label: 'Valid zero', note: 'known amount: none occurred' }),
  Object.freeze({ value: 'unknown', label: 'Missing — unknown', note: 'a value exists but is not known' }),
  Object.freeze({ value: 'not-applicable', label: 'Not applicable', note: 'the field does not apply here' }),
  Object.freeze({ value: 'pending', label: 'Pending', note: 'expected to arrive later' }),
  Object.freeze({ value: 'not-collected', label: 'Not collected by design', note: 'policy intentionally does not collect it' })
]);

export const TREATMENT_OPTIONS = Object.freeze([
  Object.freeze({ value: 'keep-zero', label: 'Keep the zero', note: 'preserve the observed count' }),
  Object.freeze({ value: 'keep-null-issue', label: 'Keep NULL + raise issue', note: 'preserve uncertainty and investigate' }),
  Object.freeze({ value: 'keep-null-reason', label: 'Keep NULL + reason code', note: 'record that the field does not apply' }),
  Object.freeze({ value: 'keep-null-refresh', label: 'Keep NULL + refresh later', note: 'wait for the expected source value' }),
  Object.freeze({ value: 'keep-null-policy', label: 'Document collection policy', note: 'do not infer a value never collected' })
]);

export function answerForMissingCase(caseRecord, step) {
  return step === 'classification' ? caseRecord?.classification : caseRecord?.action;
}
