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
    destination: 'morning_freezer_report', reportCell: 'B-08 · 05:45',
    agent: 'etl-nightly@qubix', ranAt: '06:10', ruleVersion: 'v3'
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
    }),
    Object.freeze({
      id: 'agent', number: '04', label: 'AGENT', prompt: 'Who or what ran the transformation?',
      theory: 'The model this mission follows has three parts, and the third is the agent: the person or process responsible for an activity. Without it a trace can say what happened and not who to ask when it happened wrongly.',
      answer: 'etl-nightly@qubix', explanation: 'Correct. A scheduled job ran the rule at 06:10, and that job is who you raise the problem with.',
      options: Object.freeze([
        Object.freeze({ value: 'FZ-2', label: 'The freezer sensor FZ-2', note: 'produced the reading, did not transform it' }),
        Object.freeze({ value: 'etl-nightly@qubix', label: 'etl-nightly@qubix', note: 'the scheduled job that ran the rule at 06:10' }),
        Object.freeze({ value: 'branch manager', label: 'The Branch 08 manager', note: 'reads the report, does not produce it' })
      ])
    }),
    Object.freeze({
      id: 'repeat', number: '05', label: 'REPRODUCIBILITY', prompt: 'What do you need to get −17.8 °C again tomorrow?',
      theory: 'A traced value should be recomputable. The source reading alone is not enough, because the rule can change: this run used version three, and a version four with a different rounding would give a different answer from the same input.',
      answer: 'value + version', explanation: 'Correct. The reading and the exact rule version together reproduce the output. Either on its own leaves the result unrepeatable.',
      options: Object.freeze([
        Object.freeze({ value: 'value only', label: 'The source value, 0 °F', note: 'the rule could change under you' }),
        Object.freeze({ value: 'output only', label: 'The stored output, −17.8 °C', note: 'copying an answer is not recomputing it' }),
        Object.freeze({ value: 'value + version', label: '0 °F and normalise_temperature_v3', note: 'the input and the exact rule that ran on it' })
      ])
    }),
    Object.freeze({
      id: 'impact', number: '06', label: 'IMPACT', prompt: 'FZ-2 is found to have been reading three degrees low all week. What has to be corrected?',
      theory: 'Lineage is usually read backwards, from a number to its source. Its other use is forwards: when a source turns out to be wrong, the same links say exactly what inherited the error. That list is the reason it is worth recording at all.',
      answer: 'everything downstream', explanation: 'Correct. Every value derived from that sensor this week inherited the fault, and the lineage is what finds them without guessing.',
      options: Object.freeze([
        Object.freeze({ value: 'the sensor only', label: 'Recalibrate the sensor', note: 'stops it recurring, fixes nothing already published' }),
        Object.freeze({ value: 'the report cell', label: 'The one cell in this morning report', note: 'this week has six more mornings in it' }),
        Object.freeze({ value: 'everything downstream', label: 'Every value derived from FZ-2 this week', note: 'follow the same links in the other direction' })
      ])
    })
  ])
});

export function completedLineage(stepIndex) {
  // The diagram lights up as the trace is established. The later steps
  // interrogate the same path rather than extending it, so the output stays
  // lit rather than the strip growing three more boxes.
  return Object.freeze({ source: stepIndex >= 1, activity: stepIndex >= 2, output: stepIndex >= 3 });
}
