export const CLASSIFICATION_MISSION = {
  id: 'MISSION 002',
  status: 'AI_DRAFT',
  role: 'PRE-INTERN',
  title: 'Classify Store Data',
  competency: 'Classify a variable by meaning, subtype, and measurement scale.',
  sources: [
    {
      label: 'NIST — Data Classification',
      url: 'https://www.itl.nist.gov/div898/handbook/ppc/section1/ppc135.htm'
    },
    {
      label: 'Penn State STAT 504 — Types of Data',
      url: 'https://online.stat.psu.edu/stat504/Lesson01'
    },
    {
      label: 'NIST — Ratio-scale note',
      url: 'https://itl.nist.gov/div898/software/dataplot/refman2/auxillar/coefvari.htm'
    }
  ],
  variations: [
    {
      id: 'checkout',
      title: 'Checkout Transactions',
      shortTitle: 'Checkout',
      description: 'Classify fields produced while a customer pays for a basket.',
      variables: [
    {
      id: 'barcode',
      identifier: true,
      name: 'Product barcode',
      field: 'barcode',
      samples: ['5012345678901', '5098765432107', '5011122233344'],
      context: 'The scanner uses these digits to identify products.',
      primary: 'categorical',
      subtype: 'nominal',
      scale: 'nominal',
      reason: 'The digits are a label. Adding or averaging barcodes has no business meaning.'
    },
    {
      id: 'payment_method',
      name: 'Payment method',
      field: 'payment_method',
      samples: ['Card', 'Cash', 'Voucher'],
      context: 'The till records how each transaction was paid.',
      primary: 'categorical',
      subtype: 'nominal',
      scale: 'nominal',
      reason: 'These are named groups with no natural first-to-last order.'
    },
    {
      id: 'satisfaction',
      name: 'Customer satisfaction',
      field: 'satisfaction_level',
      samples: ['Poor', 'Fair', 'Good', 'Excellent'],
      context: 'A customer chooses one ordered response after checkout.',
      primary: 'categorical',
      subtype: 'ordinal',
      scale: 'ordinal',
      reason: 'The labels have a natural order, but the gaps between levels are not known to be equal.'
    },
    {
      id: 'item_count',
      name: 'Items in basket',
      field: 'item_count',
      samples: ['1', '4', '12'],
      context: 'The transaction counts physical items in the basket.',
      primary: 'quantitative',
      subtype: 'discrete',
      scale: 'ratio',
      reason: 'It is a count of whole items. Zero means none, and 12 items really is three times 4.'
    },
    {
      id: 'weight',
      name: 'Package weight',
      field: 'package_weight_kg',
      samples: ['0.42', '1.15', '2.70'],
      context: 'A calibrated scale measures package mass in kilograms.',
      primary: 'quantitative',
      subtype: 'continuous',
      scale: 'ratio',
      reason: 'Mass can vary continuously. Zero represents no mass, so ratios are meaningful.'
    },
    {
      id: 'temperature',
      name: 'Freezer temperature',
      field: 'freezer_temperature_c',
      samples: ['−22.4', '−18.0', '−15.6'],
      context: 'A sensor records temperature in degrees Celsius.',
      primary: 'quantitative',
      subtype: 'continuous',
      scale: 'interval',
      reason: 'Differences in Celsius are meaningful, but 0 °C is not an absence of temperature, so ratios are not.'
    }
      ]
    },
    {
      id: 'customers',
      title: 'Customers and Orders',
      shortTitle: 'Customers',
      description: 'Classify identifiers, customer groups, counts, distance, and calendar time.',
      variables: [
        {
          id: 'customer_number', identifier: true, name: 'Customer number', field: 'customer_number',
          samples: ['104820', '104821', '104822'], context: 'The loyalty system assigns one number to each customer record.',
          primary: 'categorical', subtype: 'nominal', scale: 'nominal',
          reason: 'Customer numbers are labels with no natural order; arithmetic on them is meaningless.'
        },
        {
          id: 'sales_channel', name: 'Sales channel', field: 'sales_channel',
          samples: ['Store', 'Web', 'Mobile app'], context: 'Each order records where the customer placed it.',
          primary: 'categorical', subtype: 'nominal', scale: 'nominal',
          reason: 'The channels are named groups with no natural ranking.'
        },
        {
          id: 'loyalty_tier', name: 'Loyalty tier', field: 'loyalty_tier',
          samples: ['Bronze', 'Silver', 'Gold', 'Platinum'], context: 'Customers progress through ranked membership levels.',
          primary: 'categorical', subtype: 'ordinal', scale: 'ordinal',
          reason: 'The tiers have an order, but the difference from Bronze to Silver is not a measured interval.'
        },
        {
          id: 'monthly_orders', name: 'Orders last month', field: 'orders_last_month',
          samples: ['0', '3', '11'], context: 'The system counts completed orders for each customer.',
          primary: 'quantitative', subtype: 'discrete', scale: 'ratio',
          reason: 'It is a whole-number count with a meaningful zero, so ratios are meaningful.'
        },
        {
          id: 'delivery_distance', name: 'Delivery distance', field: 'delivery_distance_km',
          samples: ['0.8', '4.35', '18.2'], context: 'Routing software measures the journey distance in kilometres.',
          primary: 'quantitative', subtype: 'continuous', scale: 'ratio',
          reason: 'Distance varies continuously and has a meaningful zero.'
        },
        {
          id: 'account_year', name: 'Account opening year', field: 'account_opened_year',
          samples: ['2019', '2022', '2026'], context: 'The customer table stores the calendar year each account opened.',
          primary: 'quantitative', subtype: 'discrete', scale: 'interval',
          reason: 'Calendar years are separate whole years with equal differences, but year zero is not an absence of time.'
        }
      ]
    },
    {
      id: 'warehouse',
      title: 'Warehouse Operations',
      shortTitle: 'Warehouse',
      description: 'Classify fields used to receive, inspect, store, and monitor goods.',
      variables: [
        {
          id: 'storage_bin', identifier: true, name: 'Storage-bin code', field: 'storage_bin_code',
          samples: ['A-04-12', 'B-09-03', 'C-02-18'], context: 'The warehouse uses a code to locate each storage position.',
          primary: 'categorical', subtype: 'nominal', scale: 'nominal',
          reason: 'Bin codes identify locations; their characters do not form an amount or ranking.'
        },
        {
          id: 'shipment_mode', name: 'Shipment mode', field: 'shipment_mode',
          samples: ['Road', 'Rail', 'Air'], context: 'An inbound shipment records its mode of transport.',
          primary: 'categorical', subtype: 'nominal', scale: 'nominal',
          reason: 'Transport modes are named groups without a natural ranking.'
        },
        {
          id: 'inspection_grade', name: 'Inspection grade', field: 'inspection_grade',
          samples: ['Reject', 'Conditional', 'Pass', 'Excellent'], context: 'An inspector assigns an ordered quality result.',
          primary: 'categorical', subtype: 'ordinal', scale: 'ordinal',
          reason: 'The grades are ordered, but the gaps between grades are not measured equally.'
        },
        {
          id: 'damaged_units', name: 'Damaged units', field: 'damaged_unit_count',
          samples: ['0', '2', '9'], context: 'Receiving staff count damaged packages in each shipment.',
          primary: 'quantitative', subtype: 'discrete', scale: 'ratio',
          reason: 'This is a whole-number count with a meaningful zero.'
        },
        {
          id: 'carton_volume', name: 'Carton volume', field: 'carton_volume_litres',
          samples: ['8.25', '19.6', '42.75'], context: 'A scanner measures how much three-dimensional space a carton occupies.',
          primary: 'quantitative', subtype: 'continuous', scale: 'ratio',
          reason: 'Volume is measured continuously and zero represents no volume.'
        },
        {
          id: 'cold_room_temperature', name: 'Cold-room temperature', field: 'cold_room_temperature_c',
          samples: ['−4.8', '0.0', '3.2'], context: 'A sensor measures the room in degrees Celsius.',
          primary: 'quantitative', subtype: 'continuous', scale: 'interval',
          reason: 'Celsius differences are meaningful, but 0 °C is not an absence of temperature.'
        }
      ]
    },
    {
      id: 'corporate',
      title: 'Corporate People Data',
      shortTitle: 'Corporate',
      description: 'Classify HR identifiers, groups, rankings, counts, durations, and dates.',
      variables: [
        {
          id: 'employee_number', identifier: true, name: 'Employee number', field: 'employee_number',
          samples: ['700184', '700185', '700186'], context: 'HR assigns one number to identify each employee record.',
          primary: 'categorical', subtype: 'nominal', scale: 'nominal',
          reason: 'Employee numbers are labels. Their numerical size has no quantitative meaning.'
        },
        {
          id: 'department', name: 'Department', field: 'department_name',
          samples: ['Finance', 'Operations', 'Technology'], context: 'Every role belongs to a named business department.',
          primary: 'categorical', subtype: 'nominal', scale: 'nominal',
          reason: 'Departments are named groups with no natural first-to-last order.'
        },
        {
          id: 'performance_band', name: 'Performance band', field: 'performance_band',
          samples: ['Developing', 'Effective', 'Strong', 'Exceptional'], context: 'A review places performance into an ordered band.',
          primary: 'categorical', subtype: 'ordinal', scale: 'ordinal',
          reason: 'The bands can be ranked, but the gaps between them are not known to be equal.'
        },
        {
          id: 'direct_reports', name: 'Number of direct reports', field: 'direct_report_count',
          samples: ['0', '4', '13'], context: 'The organisation chart counts people reporting directly to a manager.',
          primary: 'quantitative', subtype: 'discrete', scale: 'ratio',
          reason: 'It is a whole-person count with a meaningful zero.'
        },
        {
          id: 'training_hours', name: 'Training duration', field: 'training_hours',
          samples: ['0.5', '6.25', '21.0'], context: 'The learning system measures time spent in training.',
          primary: 'quantitative', subtype: 'continuous', scale: 'ratio',
          reason: 'Duration can vary continuously and zero hours means no training time.'
        },
        {
          id: 'hire_year', name: 'Year hired', field: 'hire_year',
          samples: ['2016', '2021', '2025'], context: 'HR stores the calendar year employment began.',
          primary: 'quantitative', subtype: 'discrete', scale: 'interval',
          reason: 'Calendar-year differences are equal, but year zero is not an absence of time.'
        }
      ]
    }
  ]
};

export const QUESTION_STEPS = {
  primary: {
    label: 'Kind of variable',
    prompt: 'What kind of information does this variable carry?',
    theory: 'Ask whether arithmetic describes a real amount. Digits used only as labels are still categorical.',
    options: [
      { value: 'categorical', label: 'Categorical', note: 'names or groups — non-numeric in meaning' },
      { value: 'quantitative', label: 'Quantitative', note: 'counts or measurements — numeric in meaning' }
    ]
  },
  scale: {
    label: 'Measurement scale',
    prompt: 'What is the variable’s measurement scale?',
    theory: 'Nominal names groups; ordinal adds order; interval has equal differences; ratio also has a meaningful zero.',
    options: [
      { value: 'nominal', label: 'Nominal', note: 'groups, no natural order' },
      { value: 'ordinal', label: 'Ordinal', note: 'ordered groups, unequal or unknown gaps' },
      { value: 'interval', label: 'Interval', note: 'equal differences, no meaningful zero' },
      { value: 'ratio', label: 'Ratio', note: 'equal differences and a meaningful zero' }
    ]
  }
};

export function subtypeStep(primary) {
  return primary === 'categorical'
    ? {
        label: 'Categorical subtype',
        prompt: 'Do these categories have a natural order?',
        theory: 'Nominal categories are names only. Ordinal categories can be ranked, even when the gaps cannot be measured.',
        options: [
          { value: 'nominal', label: 'Nominal', note: 'no natural order' },
          { value: 'ordinal', label: 'Ordinal', note: 'a natural order exists' }
        ]
      }
    : {
        label: 'Quantitative subtype',
        prompt: 'Is this a count or a measurement on a continuum?',
        theory: 'Discrete variables count separate values. Continuous variables are measured and can take values between values.',
        options: [
          { value: 'discrete', label: 'Discrete', note: 'a count of separate values' },
          { value: 'continuous', label: 'Continuous', note: 'a measurement on a continuum' }
        ]
      };
}

export function answerFor(variable, step) {
  return variable?.[step] || '';
}

export function explanationFor(variable, step) {
  if (step === 'primary') {
    if (variable.identifier) return 'The value identifies a record or location; it does not measure an amount.';
    return variable.primary === 'categorical'
      ? 'The values place observations into named groups rather than measuring an amount.'
      : 'The values express a count or measurement on which arithmetic is meaningful.';
  }
  if (step === 'subtype') {
    const explanations = {
      nominal: 'The groups have no natural ranking.',
      ordinal: 'The groups can be ranked, although the gaps between them are not measured.',
      discrete: 'This is a count of separate possible values.',
      continuous: 'This is measured on a continuum and can take values between the displayed examples.'
    };
    return explanations[variable.subtype];
  }
  return variable.reason;
}
