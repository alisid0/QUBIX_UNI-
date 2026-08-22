export const UNIT_DECISIONS = Object.freeze([
  Object.freeze({ value: 'convert', label: 'Convert to the schema unit', note: 'keep the source value and add a traceable normalised value' }),
  Object.freeze({ value: 'keep', label: 'Keep as recorded', note: 'the source already matches the schema unit' }),
  Object.freeze({ value: 'quarantine', label: 'Quarantine for correction', note: 'the recorded quantity cannot be converted into the required dimension' })
]);

export const UNITS_MEASUREMENT_MISSION = Object.freeze({
  id: 'MISSION 006', status: 'AI_DRAFT', role: 'PRE-INTERN', title: 'Units and Measurement',
  competency: 'Check that a value and unit describe the required quantity, convert compatible units, and retain the original measurement in an audit trail.',
  sources: Object.freeze([
    Object.freeze({ label: 'BIPM — The International System of Units (9th edition)', url: 'https://www.bipm.org/en/publications/si-brochure/' }),
    Object.freeze({ label: 'NIST — SI units and quantity values', url: 'https://www.nist.gov/pml/owm/metric-si/si-units' }),
    Object.freeze({ label: 'NIST — units accepted for use with SI', url: 'https://www.nist.gov/pml/special-publication-330/sp-330-section-4' })
  ]),
  cases: Object.freeze([
    Object.freeze({ id:'juice-volume',source:'Product master',table:'product_package',field:'volume_l',item:'Orchard Juice',rawValue:750,rawUnit:'mL',targetUnit:'L',dimension:'volume',dimensionOptions:['volume','mass','length'],normalisedValue:.75,displayValue:'0.75 L',decision:'convert',factor:'750 ÷ 1,000 = 0.75',context:'A supplier file describes a bottle in millilitres, while the product schema stores volume in litres.',dimensionExplanation:'mL and L both measure volume, so a conversion is valid.',valueExplanation:'There are 1,000 millilitres in one litre.',decisionExplanation:'Store 0.75 L for comparison and retain 750 mL as the source measurement.' }),
    Object.freeze({ id:'rice-mass',source:'Supplier catalogue',table:'product_package',field:'mass_kg',item:'Long Grain Rice',rawValue:1250,rawUnit:'g',targetUnit:'kg',dimension:'mass',dimensionOptions:['mass','volume','time'],normalisedValue:1.25,displayValue:'1.25 kg',decision:'convert',factor:'1,250 ÷ 1,000 = 1.25',context:'A case specification reports grams, but warehouse comparisons use kilograms.',dimensionExplanation:'g and kg both measure mass.',valueExplanation:'There are 1,000 grams in one kilogram.',decisionExplanation:'Add the normalised kilogram value without overwriting the supplier record.' }),
    Object.freeze({ id:'unload-duration',source:'Distribution hub',table:'shipment_event',field:'duration_h',item:'Inbound shipment SH-208',rawValue:90,rawUnit:'min',targetUnit:'h',dimension:'time',dimensionOptions:['time','length','count'],normalisedValue:1.5,displayValue:'1.5 h',decision:'convert',factor:'90 ÷ 60 = 1.5',context:'The hub records unloading in minutes; the planning model expects hours.',dimensionExplanation:'Minutes and hours both measure elapsed time.',valueExplanation:'Sixty minutes make one hour.',decisionExplanation:'Convert for the model and preserve the original 90-minute event.' }),
    Object.freeze({ id:'hub-distance',source:'Route planner',table:'branch_route',field:'distance_m',item:'Hub North → Branch 17',rawValue:1.8,rawUnit:'km',targetUnit:'m',dimension:'length',dimensionOptions:['length','speed','area'],normalisedValue:1800,displayValue:'1,800 m',decision:'convert',factor:'1.8 × 1,000 = 1,800',context:'A route segment arrives in kilometres, but the routing table stores metres.',dimensionExplanation:'km and m both measure length; no time component is present.',valueExplanation:'The prefix kilo means one thousand.',decisionExplanation:'Normalise to metres and record the conversion factor beside the source value.' }),
    Object.freeze({ id:'cold-room-temperature',source:'Cold-room sensor',table:'sensor_reading',field:'temperature_c',item:'Cold room CR-04',rawValue:3.2,rawUnit:'°C',targetUnit:'°C',dimension:'temperature',dimensionOptions:['temperature','energy','time'],normalisedValue:3.2,displayValue:'3.2 °C',decision:'keep',factor:'no conversion required',context:'The sensor and the governed field use the same unit.',dimensionExplanation:'The reading is a temperature and the unit matches the schema.',valueExplanation:'The numerical value stays 3.2 because both units are °C.',decisionExplanation:'Keep the record unchanged; an unnecessary conversion would create risk.' }),
    Object.freeze({ id:'package-dimension-error',source:'Supplier catalogue',table:'product_package',field:'mass_kg',item:'Ceramic Mixing Bowl',rawValue:28,rawUnit:'cm',targetUnit:'kg',dimension:'length',dimensionOptions:['length','mass','volume'],normalisedValue:null,displayValue:'not convertible',decision:'quarantine',factor:'length ≠ mass',context:'A package dimension has been mapped into the mass field. The number is present, but it describes the wrong quantity.',dimensionExplanation:'Centimetres measure length; kilograms measure mass.',valueExplanation:'No conversion factor can turn a length into a mass.',decisionExplanation:'Quarantine the mapped record, preserve 28 cm, and ask the supplier pipeline for the missing mass.' })
  ])
});

export function answerForUnitCase(caseRecord, step) {
  if (step === 'dimension') return caseRecord?.dimension;
  if (step === 'value') return caseRecord?.displayValue;
  return caseRecord?.decision;
}

export function auditEntry(caseRecord) {
  return Object.freeze({ field:caseRecord.field,source_value:`${caseRecord.rawValue} ${caseRecord.rawUnit}`,normalised_value:caseRecord.normalisedValue===null?null:caseRecord.displayValue,treatment:caseRecord.decision });
}
