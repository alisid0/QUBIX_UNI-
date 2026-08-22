export const DATA_LINEAGE_MISSION = Object.freeze({
  id: 'MISSION 007',
  status: 'AI_DRAFT · AUTHORING ONLY',
  role: 'PRE-INTERN',
  title: 'Trace the Number',
  competency: 'Trace a reported value back to its source record and identify the activity that changed it.',
  provenance: 'Original Qubix interaction using a synthetic branch record. Terminology is informed by W3C PROV and the Qubix Superstore learning-world rules.',
  sources: Object.freeze([
    Object.freeze({ label: 'W3C PROV Overview', url: 'https://www.w3.org/TR/prov-overview/' }),
    Object.freeze({ label: 'W3C PROV Model Primer', url: 'https://www.w3.org/TR/prov-primer/' })
  ]),
  record: Object.freeze({
    sourceSystem: 'Branch freezer sensor', sourceKey: 'B-08 · FZ-2 · 05:45', sourceValue: '0 °F',
    activity: 'normalise_temperature_v3', rule: '(°F − 32) × 5 ÷ 9', outputValue: '−17.8 °C',
    destination: 'morning_freezer_report', reportCell: 'B-08 · 05:45'
  }),
  steps: Object.freeze([
    Object.freeze({
      id: 'source', number: '01', label: 'ENTITY', prompt: 'Which record is the source of the report value?',
      theory: 'A useful trace begins with an identifiable source record, not only a number. The branch, sensor and observation time distinguish this reading from every other reading.',
      answer: 'B-08 · FZ-2 · 05:45', explanation: 'Correct. This composite source key points to one observation.',
      options: Object.freeze([
        Object.freeze({ value: '0', label: '0', note: 'a value without identity or unit' }),
        Object.freeze({ value: 'B-08 · FZ-2 · 05:45', label: 'B-08 · FZ-2 · 05:45', note: 'branch, device and observation time' }),
        Object.freeze({ value: 'freezer_temperature', label: 'freezer_temperature', note: 'a field name shared by many records' })
      ])
    }),
    Object.freeze({
      id: 'activity', number: '02', label: 'ACTIVITY', prompt: 'What changed the source value?',
      theory: 'Lineage records the processing activity between input and output. Naming and versioning the rule makes the change inspectable and repeatable.',
      answer: 'normalise_temperature_v3', explanation: 'Correct. The named transformation explains how 0 °F became −17.8 °C.',
      options: Object.freeze([
        Object.freeze({ value: 'morning_freezer_report', label: 'morning_freezer_report', note: 'the destination, not the change' }),
        Object.freeze({ value: 'overwrite_source', label: 'overwrite_source', note: 'would remove the original evidence' }),
        Object.freeze({ value: 'normalise_temperature_v3', label: 'normalise_temperature_v3', note: '(°F − 32) × 5 ÷ 9' })
      ])
    }),
    Object.freeze({
      id: 'derivation', number: '03', label: 'DERIVATION', prompt: 'Which evidence makes the report value traceable?',
      theory: 'A derived value should remain connected to its source and the activity that produced it. The output alone cannot explain its history.',
      answer: 'source + activity + output', explanation: 'Correct. The report value is now connected to both its source entity and the activity that generated it.',
      options: Object.freeze([
        Object.freeze({ value: 'source + activity + output', label: 'Source key + activity version + output', note: 'keeps the complete path visible' }),
        Object.freeze({ value: 'output only', label: 'Output value only', note: 'shows the result but hides its history' }),
        Object.freeze({ value: 'activity only', label: 'Activity name only', note: 'shows a rule but not the record it used' })
      ])
    })
  ])
});

export function completedLineage(stepIndex) {
  return Object.freeze({ source: stepIndex >= 1, activity: stepIndex >= 2, output: stepIndex >= 3 });
}
