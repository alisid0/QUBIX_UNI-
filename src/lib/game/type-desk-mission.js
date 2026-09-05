// Chapter 06.01's game. The type error that pays out in money.
//
// Chapter 06 taught Python and its Play was classify-data, chapter 03's
// data-types mission, borrowed. The learner read about Python and then did an
// exercise with no Python in it.
//
// The four lines below are the real receipt for sale S-1041 in
// data-sample/sale_line.csv, and `sale` records its basket_total as 18.70, so
// the learner has something to check the answer against. Read from a file every
// value arrives as text, which is the whole lesson: quantity has to be
// converted before it can be multiplied, and the conversion is a choice.
//
// Choosing int() rather than float() does not raise anything. It returns a
// basket of 16.27, which is wrong by 2.43, and every penny of the loss is the
// single line sold by weight. That is what a type error looks like once it has
// stopped being an error and become a figure in a report.

/** The receipt as a file hands it over: every field a string. */
export const RECEIPT = Object.freeze([
  Object.freeze({ sku: 'QX-HHD-523', quantity: '1', uom: 'unit', unit_price: '8.17', promotion_id: '' }),
  Object.freeze({ sku: 'QX-HHD-093', quantity: '2', uom: 'unit', unit_price: '3.15', promotion_id: 'PRM-030' }),
  Object.freeze({ sku: 'QX-DRK-230', quantity: '2', uom: 'unit', unit_price: '0.90', promotion_id: '' }),
  Object.freeze({ sku: 'QX-BAK-292', quantity: '0.347', uom: 'kg', unit_price: '7.00', promotion_id: '' })
]);

/** What the till recorded, so a learner can check rather than be told. */
export const TILL_TOTAL = 18.70;

const round2 = value => Math.round(value * 100) / 100;

/**
 * Run the receipt with one conversion choice and report every line.
 *
 * `int` truncates towards zero the way Python's int(float(x)) does, which is
 * what turns 0.347 kg into nothing at all.
 */
export function runBatch(conversion) {
  const lines = RECEIPT.map(row => {
    const price = Number(row.unit_price);
    const quantity = conversion === 'int' ? Math.trunc(Number(row.quantity)) : Number(row.quantity);
    return { ...row, used: quantity, lineTotal: round2(quantity * price) };
  });
  const total = round2(lines.reduce((sum, line) => sum + line.lineTotal, 0));
  return { lines, total, matchesTill: Math.abs(total - TILL_TOTAL) < 0.005, shortBy: round2(TILL_TOTAL - total) };
}

export const TYPE_DESK_MISSION = Object.freeze({
  id: 'MISSION 118',
  status: 'AI_DRAFT',
  role: 'ANALYST',
  title: 'The Type Desk',
  competency: 'Say what kind a value is once it has been read from a file, choose the conversion that keeps the total right, and recognise a type mistake that returns a number rather than an error.',
  sources: Object.freeze([
    Object.freeze({ label: 'Python — built-in types', url: 'https://docs.python.org/3/library/stdtypes.html' }),
    Object.freeze({ label: 'Python — int() and float()', url: 'https://docs.python.org/3/library/functions.html#int' })
  ]),
  cases: Object.freeze([
    Object.freeze({
      id: 'from-file',
      brief: 'The receipt has just been read from a file. What kind of value is quantity now?',
      hint: 'A file holds characters. Nothing in it says which of them were meant as numbers.',
      options: Object.freeze([
        ['float', 'A decimal, because 0.347 has a point in it', 'Python does not read the file and decide. It hands back what was written.'],
        ['str', 'Text, every one of them', 'A file is characters. "1" and "0.347" are both text until something converts them.'],
        ['mixed', 'Whole numbers where they look whole, decimals otherwise', 'That would require the reader to guess, and guessing is what causes the rest of this mission.']
      ]),
      answer: 'str',
      why: 'Everything arrives as text. That is not a flaw in the file, it is what a file is, and it is why the next step has to be a decision rather than an accident.',
      run: null
    }),
    Object.freeze({
      id: 'multiply-text',
      brief: 'Somebody writes quantity * unit_price straight away, without converting anything. What happens?',
      hint: 'Both values are still text.',
      options: Object.freeze([
        ['works', 'It works. Python sees numbers and multiplies them', 'It sees text, because that is what it was given.'],
        ['repeats', 'The text repeats, the way "ab" * 3 gives "ababab"', 'That works for text times a whole number. Text times text has no meaning at all.'],
        ['error', "TypeError: can't multiply sequence by non-int of type 'str'", 'Python refuses, names both kinds, and stops. This is the good case.']
      ]),
      answer: 'error',
      why: 'An error here is the best outcome in the whole mission. It happens at the moment of the mistake, it names what it refused, and nothing wrong reaches a report.',
      run: null
    }),
    Object.freeze({
      id: 'conversion',
      brief: 'So quantity must be converted. Which conversion?',
      hint: 'Look at the fourth line before answering. It is sold by weight.',
      options: Object.freeze([
        ['float', 'float(quantity)', 'Keeps 0.347 as 0.347, so the weighed line still costs what it cost.'],
        ['int', 'int(quantity)', 'Whole numbers only. 0.347 kg becomes 0, and the line becomes free.'],
        ['none', 'Leave it as text and convert the price instead', 'Then you are multiplying text by a number, which is the previous case again.']
      ]),
      answer: 'float',
      why: 'float reads every quantity, whole or not. int truncates, and on this receipt it silently discards the only line sold by weight.',
      run: 'both'
    }),
    Object.freeze({
      id: 'joined',
      brief: 'A colleague reports the basket as "2" + "3" items instead of 2 + 3. What do they publish?',
      hint: 'Adding is defined for both kinds. It just does not mean the same thing.',
      options: Object.freeze([
        ['five', '5', 'That is what the numbers give. These are not numbers.'],
        ['twentythree', '"23"', 'Text joins end to end, so a basket of five items is reported as twenty-three.'],
        ['error', 'An error', 'No error. Adding text to text is perfectly legal, which is exactly the problem.']
      ]),
      answer: 'twentythree',
      why: 'This is the shape of the whole lesson. The kind of a value decides what an operator means, and both meanings are legal, so nothing warns you.',
      run: null
    }),
    Object.freeze({
      id: 'empty',
      brief: 'Three of the four lines have no promotion. What is in promotion_id for those?',
      hint: 'The file has a gap between two commas. Something has to be handed back.',
      options: Object.freeze([
        ['zero', 'Zero', 'Zero is a number somebody recorded. Nothing was recorded here.'],
        ['none', 'None, meaning nothing is there', 'That is what a database returns. A CSV reader hands back a value, not an absence.'],
        ['empty', 'An empty piece of text, ""', 'The gap between the commas is zero characters, and zero characters is still text.']
      ]),
      answer: 'empty',
      why: 'Empty text is not None and neither of them is zero. Chapter 03 made that distinction about data; here it decides whether `if promotion_id:` behaves the way you assumed.',
      run: null
    })
  ])
});
