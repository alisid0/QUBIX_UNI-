// Workshop interaction data for the four starting points.
// 48 interactions across 4 checkpoints (12 per checkpoint).

function S(prompt, opts, correctFeedback, incorrectFeedback) {
  return { type: 'scenario', prompt, options: opts, correctFeedback, incorrectFeedback };
}

function O(id, label, correct) {
  return { id, label, correct };
}

export const LINE_WORKSHOPS = {

  // After BB 003 — Boundaries: Segments, Rays, Lines (12 interactions)
  checkpoint_a: [
    { type: 'sorting', boxes: [
      { id: 'segment', label: 'Segment' }, { id: 'ray', label: 'Ray' }
    ], items: [
      { id: 'ruler', label: 'A wooden ruler', box: 'segment' }
    ]},
    S('Tap the wrong word in this sentence to fix it.\n\nA true Euclidean line has two ends.',
      [O('one','one',false), O('zero','zero',true), O('infinite','infinite',false)],
      'Exactly. A true line never stops in either direction.',
      'Actually, it has zero. A line goes on forever both ways.'),
    S('You draw a straight line in the sand with a stick. You walk away. What did you just draw?',
      [O('line','A line',false), O('segment','A segment',true)],
      'Yep. No matter how long you drew it, it eventually stops. That makes it a segment.',
      'Not quite. A true line goes on forever. Your stick eventually ran out of sand.'),
    { type: 'taperase' },
    S('A laser pointer shining into deep, empty space is a good example of a ray.',
      [O('true','True',true), O('false','False',false)],
      'Yep. It starts at your hand, and the light just keeps going.',
      'Actually, it is true. It starts at the bulb and goes on endlessly in one direction.'),
    S('You are holding a piece of dry spaghetti. You snap it in half. What do you have now?',
      [O('rays','Two rays',false), O('segments','Two segments',true)],
      'Yep. Just two shorter pieces that both have ends.',
      'Not quite. Both new pieces still have ends, so they are both segments.'),
    S('Tap the wrong word to fix the sentence.\n\nA ray has an anchor on one side, and goes on forever on neither side.',
      [O('both','both',false), O('the other','the other',true)],
      'Got it. Anchored on one end, infinite on the other.',
      'Not quite. It only goes on forever on the other side.'),
    S('Can you put a true Euclidean line in your pocket?',
      [O('yes','Yes',false), O('no','No',true)],
      'Yep. It goes on forever, so it only really exists in your imagination.',
      'Not quite. It stretches forever in both directions. It would not fit.'),
    S('You tap a railroad track onto the ground. It runs from edge to edge of the screen. Is it a true mathematical line?',
      [O('yes','Yes',false), O('no','No',true)],
      'Right. At some point, the steel runs out. It is just a very long segment.',
      'Actually, no. Real railroad tracks eventually end.'),
    S('Slide to the number of endpoints a true line has.\n\nSlider: 0 to 5',
      [O('0','0',true), O('1','1',false), O('2','2',false)],
      'Yep. Zero ends. It just keeps going.',
      'Not quite. A true line never stops, so it has zero ends.'),
    S('You slide right to zoom out on a line segment. Huge walls appear on both sides. Does zooming out change the fact that it has ends?',
      [O('yes','Yes',false), O('no','No',true)],
      'Got it. A segment is trapped between two points, no matter how far back you stand.',
      'Actually, no. It is stuck between its two endpoints forever.'),
    S('You turn on a flashlight in a dark room. The beam hits the bedroom door. Did you just create a ray, or a segment?',
      [O('ray','A ray. Light goes on forever.',false), O('segment','A segment. The door stopped it.',true)],
      'Spot on. The moment that light hits a wall, it gains a second endpoint.',
      'The door gave the beam a second endpoint. That makes it a segment.')
  ],

  // After BB 006 — Walking the Line: Zero, Left, Right (12 interactions)
  checkpoint_b: [
    S('We have a blank line. You drop the anchor for Zero. Does it matter where you put it?',
      [O('yes','Yes',false), O('no','No',true)],
      'Yep. It does not matter. It is just the starting line before we begin counting.',
      'Actually, no. You can put the starting line anywhere you want.'),
    S('You are standing on zero. You take 4 steps to the right. Where are you?',
      [O('pos4','Positive 4',true), O('neg4','Negative 4',false)],
      'Exactly. Stepping right is just regular, positive counting.',
      'Not quite. Taking steps to the right moves you into the positives.'),
    S('Tap the wrong word to fix the sentence.\n\nTo get to negative numbers, you start at zero and walk to the right.',
      [O('left','left',true), O('up','up',false)],
      'Got it. Negatives just mean walking backward to the left.',
      'Not quite. You have to walk left to get into the negatives.'),
    S('You are in an elevator on Floor 2. You go down 5 floors. Where do you end up?',
      [O('neg3','Floor -3',true), O('3','Floor 3',false), O('lobby','Lobby (0)',false)],
      'Yep. Going down 5 floors from floor 2 drops you 3 floors underground.',
      'Not quite. Two floors down gets you to zero, and three more puts you at -3.'),
    S('You have $10. You buy a pizza for $12. Where are you on the number line?',
      [O('neg2','-2',true), O('2','2',false)],
      'Exactly. You dropped below zero and owe 2 dollars.',
      'Actually, spending more than you have drops you into the negatives. You are at -2.'),
    S('Zero just means empty space on the number line. True or False?',
      [O('false','False',true), O('true','True',false)],
      'Yep. Zero is highly important. It is our anchor point.',
      'Actually, it is false. Zero is not empty space; it is the anchor that tells us where we are starting.'),
    S('You owe a friend 5 dollars. You hand them a 5 dollar bill. Where does your bank account sit now?',
      [O('zero','Zero',true), O('pos5','Positive 5',false)],
      'Yep. You paid off the debt, bringing you exactly back to the starting line.',
      'Not quite. You used your $5 to erase the debt, which lands you right on zero.'),
    S('Tap the wrong word to fix the sentence.\n\nA negative number is a completely different distance than a positive number.',
      [O('direction','direction',true), O('size','size',false)],
      'Exactly. Negative 5 is the exact same distance as positive 5. It is just the opposite direction.',
      'Actually, the distance is identical. Only the direction is different.'),
    S('You keep walking left past -100. Does the left side ever stop?',
      [O('no','No',true), O('yes','Yes',false)],
      'Yep. The left side is just as infinite as the right side.',
      'Actually, no. Just like the positive numbers, the negatives go on forever.'),
    S('You take 3 steps forward, then 3 steps backward. What number are you standing on?',
      [O('0','0',true), O('3','3',false)],
      'Exactly. The steps cancel each other out.',
      'Not quite. The backward steps bring you right back to your anchor point.'),
    S('Water freezes at 32 degrees. Which side of zero does this temperature sit on?',
      [O('right','Right of zero (Positive)',true), O('left','Left of zero (Negative)',false)],
      'Yep. It is above zero, so it sits on the right side.',
      'Not quite. 32 is above zero, so it goes on the right.'),
    S('Drag the number -1 to its spot on the line.\n\nLine shows: -2 ... ? ... 0',
      [O('between','Right between -2 and 0',true), O('left','Left of -2',false), O('right','Right of 0',false)],
      'Got it. It is exactly one step to the left of zero.',
      'Not quite. Negative 1 lives right between zero and negative 2.')
  ],

  // After BB 009 — Stepping Stones: Natural, Whole, Integers (12 interactions)
  checkpoint_c: [
    S('A shepherd counts 4 sheep in a field. What box are they using?',
      [O('natural','Natural Numbers',true), O('integers','Integers',false)],
      'Yep. Pure, simple counting starts at 1. That is a natural number.',
      'Not quite. Basic counting (1, 2, 3) belongs in the Natural box.'),
    S('All the sheep run away. What number do we need now?',
      [O('zero','Zero',true), O('negative','A negative number',false)],
      'Got it. We need a way to write down nothing.',
      'Actually, you just have nothing left. You need zero.'),
    S('Tap the wrong word.\n\nThe Whole Numbers box is just the counting numbers plus fractions.',
      [O('zero','zero',true), O('negatives','negatives',false)],
      'Yep. The only difference between Natural and Whole is just tossing zero in the box.',
      'Not quite. The Whole Numbers box is just counting numbers plus zero.'),
    S('A negative number like -3 belongs in the Whole Numbers box. True or False?',
      [O('false','False',true), O('true','True',false)],
      'Exactly. Whole numbers do not handle debt or walking backward.',
      'Actually, that is false. Whole numbers stop at zero. Negatives need a bigger box.'),
    S('You add negative numbers to the Whole Numbers box. What did we just create?',
      [O('integers','Integers',true), O('natural','Natural Numbers',false)],
      'Yep. Positives, zero, and negatives together make the Integers.',
      'Not quite. Once you add the negatives, you have the Integers.'),
    S('You borrow 10 bucks. Your balance is -10. Which box does -10 belong in?',
      [O('integers','Integers',true), O('natural','Natural Numbers',false)],
      'Exactly. Integers handle the left side of the number line.',
      'Actually, natural numbers are just for basic counting. -10 is an integer.'),
    S('Drag the number 0 to its smallest correct box.',
      [O('whole','Whole Numbers',true), O('natural','Natural Numbers',false)],
      'Yep. Zero is the only reason the Whole Numbers box even exists.',
      'Not quite. Natural numbers start at 1. Zero belongs in Whole.'),
    S('You look at the integers on the line: -2, -1, 0, 1, 2. Are they a solid line or stepping stones?',
      [O('stones','Stepping stones',true), O('solid','A solid line',false)],
      'Got it. Integers do not cover the spaces in between.',
      'Actually, they are just stepping stones. There is empty space between them.'),
    S('Tap the wrong word.\n\nAn integer is always a fraction.',
      [O('clean','clean step',true), O('decimal','decimal',false)],
      'Yep. Integers are clean whole numbers, never fractions.',
      'Not quite. Integers are clean steps. They are never fractions.'),
    S('A toddler is counting wooden blocks. 1, 2, 3. Which box are they using?',
      [O('natural','Natural Numbers',true), O('integers','Integers',false)],
      'Exactly. Toddlers do not count with zero or negatives.',
      'Not quite. Toddlers just use basic counting: the natural numbers.'),
    S('Every single Natural Number also fits inside the Integer box. True or False?',
      [O('true','True',true), O('false','False',false)],
      'Yep. Integers cover positives, zero, and negatives. It is a bigger umbrella.',
      'Actually, it is true. The integer box is big enough to hold all the natural numbers too.'),
    S('Find the number that is NOT an integer.\n\nLine shows: 1 ... 1.5 ... 2',
      [O('1.5','1.5',true), O('1','1',false), O('2','2',false)],
      'Got it. Integers do not do halfway steps.',
      'Not quite. Integers have to land directly on a clean, whole step.')
  ],

  // After BB 013 — The In-Between + Full Taxonomy (12 interactions)
  checkpoint_d: [
    S('You tap the empty space between 0 and 1. Right in the middle appears 1/2. What box does 1/2 go into?',
      [O('rational','Rational',true), O('integer','Integer',false)],
      'Yep. It is a clean fraction, which makes it rational.',
      'Actually, integers are only whole steps. Fractions go into the Rational box.'),
    S('Which food belongs in the Rational box?\n\n3 whole apples vs Half a pizza (1/2)',
      [O('pizza','Half a pizza (1/2)',true), O('apples','3 whole apples',false)],
      'Got it. A fraction of a pizza is a perfect example of a rational number.',
      'Not quite. The whole apples are integers. The half pizza belongs in the Rational box.'),
    S('Tap the wrong word.\n\nThe word "rational" in math means the number is highly intelligent.',
      [O('ratio','a ratio',true), O('decimal','a decimal',false)],
      'Yep. It just contains the word "ratio," which means fraction.',
      'Actually, it has nothing to do with being smart. It just means it is a ratio (a fraction).'),
    S('You type 1 divided by 2 into a calculator. It says 0.5. Does this decimal belong in the Rational box?',
      [O('yes_stop','Yes, because it stops',true), O('no_decimal','No, because it is a decimal',false)],
      'Exactly. Decimals that come to a clean stop are perfectly rational.',
      'Actually, it belongs. Any decimal that stops cleanly is rational.'),
    S('A decimal that repeats a simple pattern forever (like 0.3333...) is Rational. True or False?',
      [O('true','True',true), O('false','False',false)],
      'Yep. Because it behaves predictably, we can write it as a fraction (1/3).',
      'Actually, it is true. Because it repeats a simple pattern, it is rational.'),
    S('You chop the space between 0 and 0.5 exactly in half. You get 0.25. Will you ever run out of spaces to chop in half?',
      [O('no','No',true), O('yes','Yes',false)],
      'Got it. You can keep zooming in and chopping forever.',
      'Actually, no. You can chop fractions in half infinitely.'),
    S('You look at the decimal for Pi (3.14159...). The digits scroll randomly forever. Does it ever stop or repeat a pattern?',
      [O('no','No',true), O('yes','Yes',false)],
      'Yep. It just spits out random digits forever.',
      'Not quite. It never stops, and it never repeats. It is totally random.'),
    S('Pi refuses to behave. Which box does it belong in?',
      [O('irrational','Irrational',true), O('rational','Rational',false)],
      'Exactly. Because it refuses to behave, it goes in the Irrational box.',
      'Not quite. It does not play by the rules, so it is irrational.'),
    S('An irrational number is perfectly messy. Does it still have a physical spot on the number line?',
      [O('yes','Yes',true), O('no','No',false)],
      'Yep. It is wedged in there. It just has a really long, ugly address.',
      'Actually, yes. It still has an exact location on the line.'),
    S('Tap the wrong word.\n\nIf you put all the integers, rationals, and irrationals on the line, there are still gaps.',
      [O('no','no holes left',true), O('empty','empty spaces',false)],
      'Got it. The line fills up completely.',
      'Actually, there are no gaps left at all. The line becomes totally solid.'),
    S('The giant umbrella name for every number on the solid line is The Real Numbers. True or False?',
      [O('true','True',true), O('false','False',false)],
      'Exactly. If you can point to it on the line, it is a real number.',
      'Actually, it is true. Everything on the line together makes the real numbers.'),
    S('You throw a dart at a number line. It hits a completely random, microscopic spot. What kind of number did you hit?',
      [O('real','A Real Number',true), O('integer','An Integer',false)],
      'Yep. No matter where it lands, every single spot is a real number.',
      'Not quite. It is highly unlikely to hit a clean integer, but whatever you hit is definitely a Real Number.')
  ],

  // After BB 016 — The Shorthand: N, W, Z, Q, R (12 interactions)
  checkpoint_e: [
    S('Tap the strange-looking \u2115 to see what it really is. Does the extra stripe mean anything complicated?',
      [O('no','No, it is just a font style',true), O('yes','Yes, it is a math formula',false)],
      'Yep. It is just shorthand. The extra stripe just tells you it is a category of numbers.',
      'Not quite. It is literally just a font style called blackboard bold to make it stand out.'),
    { type: 'sorting', boxes: [
      { id: 'natural', label: 'Natural Numbers' }, { id: 'whole', label: 'Whole Numbers' }
    ], items: [
      { id: 'n', label: '\u2115', box: 'natural' }, { id: 'w', label: 'W', box: 'whole' }
    ]},
    S('You walk into a classroom and see \u2124 written on the board. What are they talking about?',
      [O('integers','Integers',true), O('fractions','Fractions',false)],
      'Exactly. The Z is for Zahlen, the German word for numbers. It is the integers.',
      'Actually, Z is for integers. Fractions get a different letter.'),
    S('Tap the wrong word to fix the sentence.\n\nIntegers get a Z because the letter I was already taken, and Z stands for the German word for zero.',
      [O('numbers','numbers',true), O('zebras','zebras',false)],
      'Yep. Zahlen just means numbers.',
      'Not quite. Zahlen is just the German word for numbers.'),
    S('The Rational numbers (the clean fractions) get the letter R. True or False?',
      [O('false','False',true), O('true','True',false)],
      'Yep, that is false. R was taken by the Real numbers, so Rationals get a Q.',
      'Actually, false. Rationals get a Q.'),
    S('Tap the \u211A to reveal the hidden word behind it. What does quotient mean?',
      [O('division','The answer to a division problem',true), O('decimal','A repeating decimal',false)],
      'Exactly. Since a fraction is just division, Quotient makes sense for the fraction box.',
      'Not quite. A quotient is just the answer you get when you divide things (like in a fraction).'),
    S('Which letter holds every single number on the line? \u2115 \u2192 \u2124 \u2192 \u211D',
      [O('R','\u211D',true), O('Z','\u2124',false)],
      'Yep. The R stands for Real Numbers, which covers the entire solid line.',
      'Actually, R holds everything. Z only holds the clean stepping stones.'),
    S('A test asks you to pick a number that belongs in \u211A but NOT in \u2124. What should you pick?',
      [O('half','1/2',true), O('neg5','-5',false)],
      'Got it. Q holds the fractions. Z only holds the whole stepping stones.',
      'Not quite. -5 is a clean step, so it belongs in Z. 1/2 is a fraction, so it goes in Q.'),
    { type: 'sorting', boxes: [
      { id: 'n', label: '\u2115' }, { id: 'z', label: '\u2124' }
    ], items: [
      { id: 'three', label: '3', box: 'n' }, { id: 'neg7', label: '-7', box: 'z' }
    ]},
    S('Tap the wrong word.\n\nIf you see an \u211D in a textbook, it means the number has to be a fraction.',
      [O('anything','literally anything on the line',true), O('counting','a counting number',false)],
      'Exactly. R means Real. It can be a fraction, a negative, or a messy decimal.',
      'Actually, R stands for Real numbers. It can be anything on the solid line.'),
    S('Pi (3.14159...) belongs inside the big \u211D umbrella. True or False?',
      [O('true','True',true), O('false','False',false)],
      'Yep. Even though it is messy and irrational, it is still a Real number on the line.',
      'Actually, it is true. R holds the clean numbers AND the messy rule-breakers.'),
    S('You are trying to write down that you have zero sheep. Which shorthand letter do you need to use?',
      [O('W','W',true), O('N','\u2115',false)],
      'Got it. The W (Whole numbers) is the first box that includes zero.',
      'Not quite. \u2115 starts at 1. You need the W for Whole numbers to get zero.')
  ],

  // The Mathematical Machine (Functions & Growth)
  checkpoint_f: [
    S('Tap the wrong word to fix the rule of a mathematical function.\n\nA working function can take a single specific input and produce multiple different outputs.',
      [O('one','exactly one',true), O('randomized','a randomized',false)],
      'Yep. Predictability is the absolute rule. One specific input can only ever lead to exactly one specific output.',
      'Actually, a single input can only produce exactly one output. If it produces multiple different outputs, the machine is broken.'),
    S('Tap the vending machine slot where the coins go in. The word DOMAIN appears over the coin slot. What does the Domain of a function represent?',
      [O('inputs','All acceptable inputs',true), O('outputs','All possible outputs',false)],
      'Exactly. The Domain is the strictly defined list of inputs the machine is allowed to accept without breaking.',
      'Not quite. The outputs are the Range. The Domain is the complete list of all acceptable inputs.'),
    S('A single bacterial cell divides into two. Those two divide into four. Four become eight. What mathematical curve tracks this growth?',
      [O('exponential','An Exponential function',true), O('linear','A Linear function',false)],
      'Got it. It isn\'t growing by a steady, fixed amount. It is multiplying its previous output, bending the line violently upward.',
      'Actually, a linear function grows by a steady, flat amount. Because the bacteria are multiplying, it is an Exponential function.'),
    S('A dot traces the path of a baseball thrown high into the air. The dot perfectly traces an upside-down U-shape. What is the name of this specific mathematical curve?',
      [O('parabola','A parabola (Quadratic)',true), O('linear','A straight line (Linear)',false)],
      'Yep. Every object falling under gravity traces this exact quadratic curve.',
      'Not quite. A thrown object goes up, peaks, and falls in a symmetrical U-shape. That is a quadratic parabola.'),
    S('To successfully run a function backward (an Inverse Function), the original machine must have a strictly one-to-one relationship between inputs and outputs.',
      [O('true','True',true), O('false','False',false)],
      'Exactly. If two different buttons drop the exact same soda, running it backward is impossible because the math doesn\'t know which button was pressed.',
      'Actually, that\'s true. If the relationship isn\'t perfectly one-to-one, you can\'t trace the output back to the original input.'),
    { type: 'sorting', boxes: [
      { id: 'plug', label: 'Plug directly into' }
    ], items: [
      { id: 'output', label: 'The output of the first machine', box: 'plug' },
      { id: 'input', label: 'The input slot of the second machine', box: null }
    ]}
  ]
};

// ── The Atom workshops ──

export const ATOM_WORKSHOPS = {

  // After BB 003 — The Bottom of the Pile (12 interactions)
  checkpoint_a: [
    S('You have cut the aluminum foil down to a single, solitary atom. Can you cut this final piece in half and still have aluminum?',
      [O('no','No',true), O('yes','Yes',false)],
      'Yep. Once you smash that final piece, it loses its identity completely.',
      'Not quite. If you cut it one more time, it stops being aluminum. It just becomes a pile of raw parts.'),
    S('We only know atoms exist because of math and theories. No one has ever actually seen one.',
      [O('false','False',true), O('true','True',false)],
      'Exactly. With modern electron microscopes, we can look at a screen and literally see them stacked up.',
      'Actually, that is false. We have microscopes powerful enough to see them now. It is a physical fact.'),
    { type: 'sorting', boxes: [
      { id: 'center', label: 'The center' },
      { id: 'outside', label: 'Zipping around the outside' }
    ], items: [
      { id: 'nucleus', label: 'The heavy nucleus', box: 'center' },
      { id: 'electrons', label: 'The tiny electrons', box: 'outside' }
    ]},
    S('You take an electron out of a gold atom. You take an electron out of an aluminum atom. You put them on a table. Can you tell which is which?',
      [O('no','No',true), O('yes','Yes',false)],
      'Yep. The raw parts are totally identical. They only create gold or aluminum when put together into a whole atom.',
      'Actually, no. An electron is an electron. They are exactly identical.'),
    S('If you smash a gold atom apart, do you get microscopic pieces of gold?',
      [O('no','No — just raw parts',true), O('yes','Yes — tiny gold dust',false)],
      'Exactly. Once the atom breaks, the identity is gone. You just have generic subatomic parts.',
      'Not quite. Smashing the atom destroys the gold. You just get electrons and a nucleus.'),
    S('Is a single aluminum atom visible to the naked eye?',
      [O('no','No',true), O('yes','Yes',false)],
      'Yep. Atoms are far too small. You need an electron microscope to see them.',
      'Actually, no. Atoms are impossibly small — way below what your eyes can resolve.'),
    S('Tap the wrong word to fix the sentence.\n\nThe ancient Romans called the smallest piece of matter atomos.',
      [O('Greeks','Greeks',true), O('Egyptians','Egyptians',false)],
      'Got it. It was the ancient Greeks who coined the word atomos.',
      'Not quite. Atomos is a Greek word, not a Roman one.'),
    S('You keep cutting a gold ring into smaller and smaller pieces. At what point does it stop being gold?',
      [O('atom','When you split a single gold atom',true), O('dust','When it becomes dust',false)],
      'Exactly. The atom is the last piece that still behaves like gold.',
      'Not quite. Gold dust is still gold. It only stops being gold when you split the atom itself.'),
    S('Before electron microscopes, was the atom a proven fact or a working hypothesis?',
      [O('hypothesis','A working hypothesis',true), O('fact','A proven fact',false)],
      'Yep. For thousands of years it was a very good guess, but not directly observed.',
      'Actually, it was just a hypothesis until we built tools powerful enough to see them.'),
    S('You look through an electron microscope at a piece of metal. What do the atoms look like?',
      [O('balls','Fuzzy balls stacked in rows',true), O('cubes','Perfect tiny cubes',false)],
      'Got it. They appear as millions of fuzzy little spheres packed neatly together.',
      'Not quite. They look like fuzzy tennis balls arranged in orderly rows.'),
    S('An atom of aluminum and an atom of gold — which one has a heavier center?',
      [O('gold','Gold',true), O('aluminum','Aluminum',false), O('same','They are the same',false)],
      'Yep. Gold atoms have a much heavier nucleus than aluminum atoms.',
      'Actually, gold has the heavier center. That is partly why gold feels so much heavier.'),
    S('Is the atom the absolute smallest thing that exists?',
      [O('no','No — it has smaller pieces inside',true), O('yes','Yes — nothing is smaller',false)],
      'Exactly. The atom has internal parts: a nucleus and electrons. It is the smallest piece that keeps its identity, not the smallest thing period.',
      'Not quite. The atom is made of even smaller things: protons, neutrons, and electrons.')
  ],

  // After BB 006 — The Inventory (12 interactions)
  checkpoint_b: [
    S('Tap the wrong word to fix the sentence.\n\nA solid block of pure iron is made of a mix of different atoms.',
      [O('identical','exactly identical',true), O('broken','broken',false)],
      'Yep. If it is pure iron, every single atom is exactly the same element.',
      'Not quite. Pure iron is made of exactly identical iron atoms.'),
    S('You add exactly one proton to the center of a Hydrogen atom. Did it just become a heavier Hydrogen atom?',
      [O('no','No — it became Helium',true), O('yes','Yes — heavier Hydrogen',false)],
      'Exactly. Changing the number of protons completely changes the identity. It is now Helium.',
      'Actually, no. If you change the proton count, it instantly becomes a different element entirely.'),
    S('You find an atom with 8 protons in its center. A chemist tells you it is Oxygen. If you find another atom on Mars with 8 protons, what is it?',
      [O('oxygen','Oxygen',true), O('martian','A Martian element',false)],
      'Got it. Identity is just a headcount. 8 protons is always Oxygen, anywhere in the universe.',
      'Actually, 8 protons is Oxygen anywhere. Identity is just about counting the protons.'),
    S('The Periodic Table is a list of millions of different atoms that make up the world.',
      [O('false','False',true), O('true','True',false)],
      'Yep. There are only about 100 on the list. Everything is built from just those.',
      'Actually, false. There are only about 100 elements. The table is just a short inventory.'),
    S('Why does aluminum feel light and gold feel heavy?',
      [O('atoms','Gold atoms are heavier',true), O('density','Gold is more tightly packed',false)],
      'Yep. Each individual gold atom weighs more than each aluminum atom.',
      'Not quite. The gold atoms themselves are simply heavier than aluminum atoms.'),
    S('Tap the wrong word to fix the sentence.\n\nThe Periodic Table sorts atoms by how many electrons they have.',
      [O('protons','protons',true), O('neutrons','neutrons',false)],
      'Exactly. The table is ordered by proton count — that is the identity badge.',
      'Not quite. The table is sorted by the number of protons in the nucleus.'),
    S('How many different elements exist in nature?',
      [O('100','About 100',true), O('1000','Thousands',false), O('millions','Millions',false)],
      'Yep. Nature only provides roughly 100 building blocks.',
      'Actually, there are only about 100 naturally occurring elements.'),
    S('You hold a bar of pure gold. How many different types of atoms are inside it?',
      [O('1','Exactly one',true), O('few','A few different metals',false)],
      'Got it. Pure gold means every atom in the bar is a gold atom.',
      'Not quite. Pure gold contains only gold atoms — one single type.'),
    S('If you could magically change the proton count of an atom, what would happen?',
      [O('change','It becomes a different element',true), O('heavier','It just gets heavier',false)],
      'Exactly. Proton count IS identity. Change it, and the element changes.',
      'Not quite. Changing protons does not just change weight — it changes what the element is.'),
    S('Does the Periodic Table include water?',
      [O('no','No — water is a molecule, not an element',true), O('yes','Yes — it is listed',false)],
      'Yep. The table lists elements only. Water is a molecule built from hydrogen and oxygen.',
      'Actually, no. Water is not an element. It is a molecule made from two different elements.'),
    S('You discover a new material on an asteroid. How do you figure out what elements it contains?',
      [O('protons','Count the protons in each atom',true), O('color','Look at its color',false)],
      'Exactly. Count the protons and you know exactly which elements you are dealing with.',
      'Not quite. You identify elements by the number of protons in each atom.'),
    S('An atom has 79 protons. What element is it?',
      [O('gold','Gold',true), O('lead','Lead',false), O('mercury','Mercury',false)],
      'Yep. 79 protons means gold, every single time.',
      'Actually, 79 protons is gold. The number never lies.')
  ],

  // After BB 009 — Molecules & Bonds (12 interactions)
  checkpoint_c: [
    S('Human beings have a special life particle in them that is not found in rocks or dirt.',
      [O('false','False',true), O('true','True',false)],
      'Yep. We are built from the exact same carbon and oxygen atoms found in dirt and coal. We are just arranged differently.',
      'Actually, false. There is no life particle. We are made of the exact same atoms as a lump of coal.'),
    S('Tap the wrong word to fix the sentence.\n\nA glass of water is full of billions of water atoms.',
      [O('molecules','molecules',true), O('elements','elements',false)],
      'Got it. There is no water atom. Water is a molecule made by snapping hydrogen and oxygen together.',
      'Not quite. Water is not an atom; it is a molecule made of hydrogen and oxygen.'),
    S('Do atoms have physical hooks or velcro that lock them together?',
      [O('no','No — they share electrons',true), O('yes','Yes — they have hooks',false)],
      'Exactly. They do not have hooks. They share a moving electron, tethering them with electricity.',
      'Actually, no. They share an electron that zips around both of them.'),
    { type: 'sorting', boxes: [
      { id: 'destroyed', label: 'The atoms are destroyed' },
      { id: 'rearrange', label: 'The atoms rearrange' }
    ], items: [
      { id: 'log', label: 'A log turning into ash and smoke', box: 'rearrange' }
    ]},
    S('When wood burns, where do the atoms go?',
      [O('rearrange','They bond with oxygen and float away',true), O('vanish','They vanish into nothing',false)],
      'Yep. Matter is never destroyed. The atoms just find new partners in the air.',
      'Not quite. The atoms do not vanish. They bond with oxygen and drift away as smoke and gas.'),
    S('A carbon atom inside a lump of coal is different from a carbon atom inside your body.',
      [O('false','False — they are identical',true), O('true','True — body carbon is special',false)],
      'Exactly. A carbon atom is a carbon atom, whether it sits in coal or in your cells.',
      'Actually, false. The carbon atom is exactly the same. Only the arrangement differs.'),
    S('How many hydrogen atoms bond with one oxygen atom to make a water molecule?',
      [O('2','Two',true), O('1','One',false), O('3','Three',false)],
      'Yep. H₂O: two hydrogens, one oxygen.',
      'Not quite. Water is two hydrogen atoms attached to one oxygen atom.'),
    S('Tap the wrong word to fix the sentence.\n\nIn chemistry, matter is sometimes destroyed when you burn it.',
      [O('never','never',true), O('always','always',false)],
      'Got it. Matter is never destroyed. It only ever rearranges into new combinations.',
      'Not quite. Chemistry never destroys matter. The atoms always survive, just in new arrangements.'),
    S('Hydrogen and oxygen are both invisible gases. Why is water a liquid you can drink?',
      [O('bond','The bond changes their properties',true), O('cold','Water is colder',false)],
      'Exactly. When they bond, the molecule has completely different properties from the bare atoms.',
      'Not quite. The chemical bond transforms their behavior entirely.'),
    S('An electron zips around two atoms in a figure-eight. What do chemists call this?',
      [O('bond','A chemical bond',true), O('orbit','An orbit',false)],
      'Yep. That shared electron IS the chemical bond.',
      'Actually, it is called a chemical bond. The shared electron tethers the atoms together.'),
    S('You burn a log completely. The ashes weigh less than the log. Where did the missing mass go?',
      [O('air','It floated away as gas',true), O('destroyed','It was destroyed',false)],
      'Exactly. The missing mass bonded with oxygen and drifted into the air as invisible gas.',
      'Not quite. The mass did not vanish. It combined with oxygen and floated away.'),
    S('Does a molecule have the same properties as the atoms it is made of?',
      [O('no','No — the properties change',true), O('yes','Yes — they stay the same',false)],
      'Got it. The molecule behaves completely differently from its individual atoms.',
      'Actually, no. The bond changes everything. Hydrogen and oxygen are gases; together they make liquid water.')
  ],

  // After BB 015 (1109-1113) — The Engine of the Atom (12 interactions)
  checkpoint_d: [
    { type: 'sorting', boxes: [
      { id: 'center', label: 'Dead center on the 50-yard line' },
      { id: 'stands', label: 'The upper deck seats' }
    ], items: [
      { id: 'nucleus', label: 'A glass marble (The Nucleus)', box: 'center' },
      { id: 'electron', label: 'A gnat (An Electron)', box: 'stands' }
    ]},
    S('Tap the wrong word to fix the sentence.\n\nIn an atom, the space between the heavy nucleus and the moving electrons is filled with air.',
      [O('empty','empty space',true), O('water','water',false)],
      'Exactly. It is just pure, empty vacuum. You are mostly made of nothing.',
      'Actually, there is no air inside an atom. The space is completely empty.'),
    S('Tap the screen to put a positive proton and a negative electron next to each other. They instantly snap together. In the physics of an atom, what do opposite charges do?',
      [O('attract','They attract',true), O('repel','They repel',false)],
      'Got it. Opposites attract. That invisible pull is what holds the whole atom together.',
      'Not quite. Positive and negative are opposites, so they pull toward each other.'),
    S('Those electrons are flying around the outside of the atom at unimaginable speeds. Why don\'t they just fly away into deep space?',
      [O('protons','The protons pull on them',true), O('shell','They are trapped in a physical shell',false)],
      'Yep. The positive protons act like an anchor, using their magnetic pull to keep the electrons on a leash.',
      'Actually, there is no physical shell. The magnetic pull of the positive protons keeps them from flying away.'),
    S('You are looking at a Hydrogen atom. It has exactly 1 proton. You jam a second proton into the center. The label changes from Hydrogen to Helium. Did adding a proton just make it a heavier Hydrogen atom?',
      [O('new','No, it is a totally new element',true), O('heavier','Yes, it is just heavier',false)],
      'Exactly. Identity is just a headcount. The second you change the number of protons, the element changes.',
      'Not quite. The number of protons is its absolute identity. If you add one, it instantly becomes a completely different element.'),
    S('If an Oxygen atom loses one of its outside electrons, it stops being Oxygen.',
      [O('false','False',true), O('true','True',false)],
      'Yep, that is false. Electrons come and go all the time — that is just chemistry. Only protons dictate identity.',
      'Actually, that is false. An atom can trade electrons all day long and still be Oxygen. Only the protons matter.'),
    { type: 'sorting', boxes: [
      { id: 'repel', label: 'They violently repel' },
      { id: 'lock', label: 'They lock together' }
    ], items: [
      { id: 'protons', label: 'Two positive protons pushed together', box: 'repel' }
    ]},
    S('A Gold atom has 79 positive protons crammed perfectly together inside a microscopic nucleus. Based on the rules of magnets, what should happen?',
      [O('explode','It should explode',true), O('freeze','It should freeze',false)],
      'Yep. 79 positive charges packed together should violently repel each other and blow the atom to pieces.',
      'Actually, it should explode. The repulsive force between that many positive protons should blow the nucleus apart.'),
    S('Tap the wrong word to fix the sentence.\n\nTo keep the atom from exploding, the nucleus uses neutrons, which have a highly negative charge.',
      [O('neutral','neutral',true), O('positive','positive',false)],
      'Exactly. Neutrons have absolutely zero charge. They are totally neutral.',
      'Not quite. Neutrons don\'t have a charge at all. They are completely neutral.'),
    S('You drop a neutron between two angry, repelling protons. The protons stop vibrating and stabilize. What is the neutron actually doing here?',
      [O('wedge','Acting as a physical wedge',true), O('glue','Gluing them with electricity',false)],
      'Got it. It just acts as a heavy peacekeeper, spacing the protons out so they don\'t blow the center apart.',
      'Actually, it is just acting as a wedge. Because it has no charge, it just spaces the protons out to keep the peace.'),
    S('Because neutrons are in the center of the atom, they pull on the outside electrons just like protons do.',
      [O('false','False',true), O('true','True',false)],
      'Yep, that is false. Because they have zero charge, they have zero magnetic pull.',
      'Actually, that is false. Neutrons have no electrical charge, so they can\'t pull on electrons at all.'),
    S('You are trying to build a stable atom from scratch. Which piece do you need to act as the heavy peacekeeper so your atom doesn\'t destroy itself?',
      [O('neutron','The neutron',true), O('electron','The electron',false)],
      'Exactly. You need neutrons to wedge between the protons and hold the center together.',
      'Not quite. The electron flies around the outside. You need the neutron to keep the peace inside the center.')
  ],

  // After BB 020 — Weight and Twins (12 interactions)
  checkpoint_e: [
    S('Tap the wrong word to fix the sentence.\n\nIf you add an extra neutron to an atom, it instantly becomes a completely new element.',
      [O('weight','weight',true), O('electron','electron',false)],
      'Yep. Identity is tied strictly to protons. Neutrons just add weight.',
      'Actually, neutrons just change the weight. The element stays exactly the same.'),
    S('You are looking at a Carbon atom with 6 protons and 6 neutrons. You add another neutron to the nucleus. The label stays Carbon. Did adding that neutron change how the atom acts in a chemical reaction?',
      [O('no','No',true), O('yes','Yes',false)],
      'Exactly. The electrons handle the chemistry. The extra neutron is just dead weight in the center.',
      'Not quite. Neutrons have no charge, so they don\'t change the chemistry at all. It just gets heavier.'),
    { type: 'sorting', boxes: [
      { id: 'skin', label: 'Builds human skin' },
      { id: 'different', label: 'Builds a completely different material' }
    ], items: [
      { id: 'c12', label: 'A normal Carbon atom', box: 'skin' },
      { id: 'c14', label: 'A heavier Carbon isotope', box: 'skin' }
    ]},
    S('You tap the number 35.5 under Chlorine on the Periodic Table. A pile of different-sized Chlorine atoms appears. Is there a single Chlorine atom anywhere in the universe that actually weighs 35.5?',
      [O('no','No',true), O('yes','Yes',false)],
      'Yep. You can\'t have half a neutron. 35.5 is just the average of the whole pile.',
      'Not quite. Atoms can only have whole numbers of neutrons. 35.5 is just the average of a mixed handful.'),
    S('Isotopes are just two atoms with the same number of protons, but a different number of neutrons.',
      [O('true','True',true), O('false','False',false)],
      'Exactly. Same identity, different weight. That is the definition of an isotope.',
      'Actually, that is perfectly true. Same protons (identity), different neutrons (weight).'),
    S('You scoop up a handful of pure carbon from the ground. Are all the atoms in your hand going to weigh the exact same amount?',
      [O('no','No, it will be a mix of heavy and light twins',true), O('yes','Yes, they are all Carbon',false)],
      'Got it. In nature, most elements are a mix of light and heavy isotopes jumbled together.',
      'Not quite. In nature, elements exist as a mix of different isotopes. Some will be heavier than others.'),
    S('Tap the wrong word to fix the sentence.\n\nA heavy isotope of Oxygen breathes and acts totally differently than a normal Oxygen atom.',
      [O('identically','identically',true), O('unpredictably','unpredictably',false)],
      'Yep. An isotope is just wearing a heavier backpack. It still acts exactly like normal Oxygen.',
      'Actually, it acts identically. The extra neutrons don\'t change how it chemically behaves.'),
    { type: 'sorting', boxes: [
      { id: 'bench', label: 'The lab bench' }
    ], items: [
      { id: 'scale', label: 'A glass weighing scale', box: 'bench' },
      { id: 'tweezers', label: 'A pair of tweezers', box: null }
    ]},
    S('You have a sealed jar full of pennies. You know one penny weighs 2.5 grams. If you weigh the whole jar and it weighs 250 grams, do you need to open it to count them?',
      [O('no','No, I know there are 100 pennies',true), O('yes','Yes, I have to physically count them',false)],
      'Yep. By dividing the total weight by the weight of one piece, the scale counts them for you.',
      'Actually, you don\'t. The math does it for you. 250 divided by 2.5 means there are exactly 100 pennies in there.'),
    S('You crack open the nucleus. Protons and neutrons spill out. Which of these particles is completely responsible for making an isotope heavier?',
      [O('neutrons','The neutrons',true), O('protons','The protons',false)],
      'Got it. Changing the protons would change the element. Only the neutrons can change the weight safely.',
      'Not quite. If you added protons, you\'d make a new element. Isotopes are made heavier by extra neutrons.'),
    S('The weight listed on the Periodic Table is just a population average, like the average weight of dogs at a park.',
      [O('true','True',true), O('false','False',false)],
      'Yep. It just averages out all the heavy and light isotopes floating around in nature.',
      'Actually, it is true. The decimal weight is just an average of all the different isotopes in a handful.'),
    S('You take a Carbon-12 atom (6 neutrons) and a Carbon-14 atom (8 neutrons). You drop them both into a chemical reaction. Will one react differently than the other?',
      [O('no','No, they are chemically identical',true), O('yes','Yes, the heavier one reacts differently',false)],
      'Exactly. The electrons dictate the reaction. The neutrons in the center are just sitting there doing nothing.',
      'Actually, no. Neutrons have no charge, so they don\'t affect chemistry. Both atoms will react the exact same way.')
  ],

  // The Chemical Engine (Shells, Ions & Bonds)
  checkpoint_f: [
    S('A Chlorine atom has 7 electrons in its outer shell. One more electron is added and the shell reaches 8, locking into a stable, glowing state. Why do atoms constantly trade and share electrons?',
      [O('shell','To reach a perfectly full outer shell',true), O('heavier','To become heavier',false)],
      'Yep. Almost every chemical reaction is just an atom chasing the stability of 8 outer electrons.',
      'Not quite. Chemistry is driven by the Octet Rule. Atoms bond specifically to fill their outer shells.'),
    { type: 'sorting', boxes: [
      { id: 'positive', label: 'Becomes a positive Ion (+1)' },
      { id: 'negative', label: 'Becomes a negative Ion (-1)' }
    ], items: [
      { id: 'na', label: 'The Sodium atom', box: 'positive' }
    ]},
    S('A grain of table salt is examined at the atomic level. A massive, repeating 3D grid of alternating positive and negative ions appears. Are there individual, discrete "salt molecules" floating around inside this crystal?',
      [O('no','No, it is one endless continuous lattice',true), O('yes','Yes, billions of them',false)],
      'Got it. Ionic bonds do not form small, closed loops. They form massive, rigid, continuous grids.',
      'Actually, no. Ionic bonds create an endless, repeating grid of alternating charges, not individual molecules.'),
    S('Two non-metal atoms drift together. Both need more electrons to fill their shells, but neither is willing to give one away. What happens?',
      [O('share','They overlap and share an electron pair',true), O('repel','They repel and fly apart',false)],
      'Yep. The shared electrons act as glue holding both nuclei together. This is a Covalent bond.',
      'Not quite. They compromise. By sharing a pair of electrons between them, they lock together in a Covalent bond.'),
    S('Tap the wrong word to fix the sentence.\n\nA piece of copper wire bends instead of shattering because its atoms are locked into a rigid partnership.',
      [O('fluid','fluid, communal',true), O('brittle','brittle',false)],
      'Exactly. The positive atoms sit in a liquid "sea" of free-roaming electrons, allowing the layers to slide past each other without breaking.',
      'Actually, the atoms are in a fluid, communal partnership. The "sea of electrons" allows the metal to bend.'),
    S('Neon and Argon are highly reactive gases because their outer shells are completely empty.',
      [O('false','False',true), O('true','True',false)],
      'Yep, that\'s false. They react with absolutely nothing because their outer shells are already perfectly full.',
      'Actually, that\'s false. They are completely unreactive (Noble Gases) because they already have 8 electrons. They have nothing to gain or lose.')
  ],

  // Counting the Invisible (Moles & Formulas)
  checkpoint_g: [
    S('Tap the wrong word to fix the sentence.\n\nA mole is a magical chemical particle that weighs exactly 12 grams.',
      [O('counting','a massive counting number',true), O('atom','an invisible atom',false)],
      'Yep. A mole isn\'t a physical object. It is just a massive number (like a dozen), used to group tiny things together.',
      'Actually, a mole is just a number. It is exactly like saying "a dozen," just massively scaled up.'),
    { type: 'sorting', boxes: [
      { id: 'bench', label: 'The lab bench' }
    ], items: [
      { id: 'scale', label: 'A laboratory scale', box: 'bench' },
      { id: 'tweezers', label: 'A pair of tweezers', box: null }
    ]},
    S('The physical weight of a powder (80 grams) is pushed through the n = m / M bridge equation. The weight is divided by the Molar Mass, and outputs "2 Moles". Why do chemists convert grams into moles before running an experiment?',
      [O('ratio','Because chemical recipes only run on mole ratios',true), O('heavy','Because grams are too heavy',false)],
      'Got it. A chemical equation (like 2H₂ + O₂) dictates the exact ratio of atoms needed. It doesn\'t care how much they weigh.',
      'Actually, it is because chemical equations are recipes. They dictate the exact ratio of moles needed to make the reaction work.'),
    S('If a machine tells you a powder is 40% Carbon by mass, you instantly know the exact chemical formula.',
      [O('false','False',true), O('true','True',false)],
      'Yep, that\'s false. Mass percentages don\'t reveal the structure. You have to convert the masses into moles to find the actual ratio of atoms.',
      'Actually, that\'s false. Mass alone doesn\'t tell you the atomic structure. You have to convert to moles to find the ratio.'),
    S('An Empirical Formula is found with a simple 1:2:1 ratio (CH₂O). It weighs 30 grams. But lab tests prove the real molecule weighs 180 grams. What do you do?',
      [O('multiply','Multiply the entire formula by 6',true), O('add','Add 150 grams to the formula',false)],
      'Exactly. 180 divided by 30 is 6. You just multiply the simplest ratio by 6 to find the true, massive size of the molecule (C₆H₁₂O₆).',
      'Not quite. You find the multiplier by dividing the total weight by the simple weight (180 / 30 = 6). Then you multiply the formula by 6.')
  ],

  // Geometry of Matter (Shapes, Polarity & Networks)
  checkpoint_h: [
    S('A molecule is built with four electron pairs around a central atom. The pairs push to the corners of a tetrahedron. Why do the electron pairs push away from each other?',
      [O('repel','Because like-charges (negative) repel',true), O('heavy','Because they are too heavy',false)],
      'Yep. The negative electrons constantly push against one another, forcing the molecule into a highly specific 3D shape.',
      'Actually, it\'s because electrons carry a negative charge. In physics, like-charges violently repel each other.'),
    { type: 'sorting', boxes: [
      { id: 'o', label: 'The Oxygen atom' }
    ], items: [
      { id: 'neg', label: 'A slightly negative charge', box: 'o' },
      { id: 'pos', label: 'A slightly positive charge', box: null }
    ]},
    S('Carbon Dioxide (CO₂) has highly polar bonds. But it is perfectly straight (linear). Does the entire molecule carry a lopsided electrical charge?',
      [O('no','No, the pulls perfectly cancel out',true), O('yes','Yes, it is highly polar',false)],
      'Exactly. Because the oxygens pull in exact opposite directions, the tug-of-war is a tie. The molecule is neutral overall.',
      'Actually, no. Because the molecule is perfectly straight, the electrical pulls cancel each other out entirely.'),
    S('The two strands of DNA are held together by unbreakable, permanent covalent bonds.',
      [O('false','False',true), O('true','True',false)],
      'Yep, that\'s false. They are held together by weak Intermolecular forces (Hydrogen bonds) so they can easily unzip to be copied.',
      'Actually, that\'s false. They are held by weak Hydrogen bonds, acting like a zipper that can easily open and close.'),
    S('A carbon atom in a piece of Diamond is tapped. The atom is locked to 4 neighbors, who are locked to 4 neighbors, in an endless 3D grid. Are there individual, discrete molecules inside a diamond?',
      [O('no','No, the whole crystal is one continuous network',true), O('yes','Yes, millions of them',false)],
      'Got it. There are no separate molecules. The entire physical crystal is locked together as one giant structure.',
      'Actually, no. In a giant covalent network, the bonds never stop. The entire crystal is essentially one massive molecule.'),
    S('Tap the wrong word to fix the sentence.\n\nGraphite is much softer than Diamond because it is built out of an entirely different element.',
      [O('shape','geometric shape',true), O('liquid','chemical liquid',false)],
      'Exactly. They are both made of 100% pure Carbon. The only difference is the 3D geometry of how the atoms connect.',
      'Actually, they are both pure Carbon. Graphite is soft because it forms flat, sliding sheets instead of a rigid 3D pyramid.')
  ],

  // The Electron Ladder (Shells & The Octet)
  checkpoint_i: [
    S('An atom is tapped to reveal its electron arrangement. Rings appear: 2 electrons fill the innermost shell, then 8 fill the next, then 8 fill the outermost. Do electrons orbit randomly like a swarm of bees?',
      [O('no','No, they sit in strict layers',true), O('yes','Yes, they fly everywhere',false)],
      'Yep. They are forced into specific shells, filling up from the inside out.',
      'Actually, no. They sit in highly structured layers, or shells, completely dictated by strict capacities.'),
    S('Tap the wrong word to fix the sentence.\n\nThe inner electrons completely dictate how an atom will react, while the outer electrons do nothing.',
      [O('valence','valence (outer)',true), O('heaviest','heaviest',false)],
      'Exactly. The outermost layer (the valence shell) is the only layer that matters for chemical reactions.',
      'Not quite. The outer electrons (valence shell) do all the work. The inner ones are buried and mostly ignore the outside world.'),
    S('An atom has 6 electrons in its valence shell. What is the exact number it wants to reach to become stable?',
      [O('8','8',true), O('6','6',false), O('10','10',false)],
      'Got it. Atoms constantly hunt for a completely full outer shell, which for most elements means exactly 8 electrons.',
      'Actually, the magic number is 8. The Octet Rule dictates that an atom is only stable when its outer shell holds exactly 8 electrons.'),
    S('Elements sitting in the exact same vertical column on the Periodic Table behave completely differently from each other.',
      [O('false','False',true), O('true','True',false)],
      'Yep, that\'s false. Because they share the exact same number of outer electrons, they behave almost identically.',
      'Actually, that\'s false. Elements in the same column have the exact same number of valence electrons, meaning they react in the exact same way.'),
    { type: 'sorting', boxes: [
      { id: 'reactive', label: 'Violently reactive' },
      { id: 'inert', label: 'Completely inert' }
    ], items: [
      { id: 'neon', label: 'Neon (8 outer electrons)', box: 'inert' }
    ]},
    S('Sodium has 1 outer electron. Chlorine has 7. What is the fundamental reason these two atoms react with each other?',
      [O('octet','To reach a full shell of 8',true), O('heavy','To become a heavier element',false)],
      'Exactly. Sodium dumps its 1 electron to empty its shell, and Chlorine grabs it to hit 8. Both achieve stability.',
      'Actually, it is purely to satisfy the Octet Rule. They trade an electron so both can end up with a perfectly full outer shell.')
  ],

  // The Charged Grid (Ions & Salt)
  checkpoint_j: [
    S('Tap the wrong word to fix the sentence.\n\nIf a neutral atom throws away a negative electron, the atom becomes a neutral ion.',
      [O('positive','positive',true), O('negative','negative',false)],
      'Got it. It lost a negative charge, meaning the positive protons now outnumber the electrons.',
      'Not quite. By losing a negative piece, the atom is left with more positive protons than negative electrons. It becomes positive.'),
    S('A positive Sodium ion (+1) sits next to a negative Chlorine ion (−1). The two ions slam together violently. What physical force holds these two atoms together?',
      [O('electrostatic','Electrostatic attraction',true), O('hooks','Physical hooks',false)],
      'Yep. Opposite charges attract. That powerful electrostatic grip is an Ionic Bond.',
      'Actually, it is purely electrostatic. Opposite electrical charges pull toward each other like powerful magnets.'),
    S('A grain of salt is made of billions of tiny, separate "NaCl" molecules tumbling past each other.',
      [O('false','False',true), O('true','True',false)],
      'Exactly, that\'s false. There are no separate molecules in salt. It is one massive, continuous grid of alternating ions.',
      'Actually, that\'s false. Ionic bonds do not form discrete molecules. They form massive, continuous 3D grids called lattices.'),
    { type: 'sorting', boxes: [
      { id: 'harmless', label: 'Harmless table salt' },
      { id: 'deadly', label: 'A deadly, explosive mixture' }
    ], items: [
      { id: 'nacl', label: 'Sodium Chloride (NaCl)', box: 'harmless' }
    ]},
    S('A hammer strikes a salt crystal. The grid shifts slightly, forcing positive Sodium ions to sit directly next to other positive Sodium ions. What happens?',
      [O('shatter','The crystal shatters',true), O('bend','The crystal bends',false)],
      'Exactly. Like-charges repel. The instant the positive ions align, they violently push each other apart, snapping the crystal cleanly.',
      'Actually, it shatters. When the grid shifts, like-charges align. Because like-charges repel, the crystal physically rips itself apart.'),
    S('An ionic lattice is held together by immense electrical forces pulling in every direction. What temperature is required to melt it?',
      [O('high','Extremely high heat (~800°C)',true), O('low','Moderate warmth (~100°C)',false)],
      'Got it. Because the grid is so tightly locked by electrostatic attraction, it requires massive thermal energy to break the bonds.',
      'Not quite. It requires extreme heat. Ionic lattices have incredibly high melting points because the electrical grip is so strong.')
  ],

  // Sharing & Swirling (Covalent & Metallic)
  checkpoint_k: [
    { type: 'sorting', boxes: [
      { id: 'covalent', label: 'Covalent Bonding (overlap and share)' },
      { id: 'ionic', label: 'Ionic Bonding (one steals an electron)' }
    ], items: [
      { id: 'oxygen', label: 'Two Oxygen atoms — both need 2 electrons', box: 'covalent' }
    ]},
    S('A glass of water sits on a table. How is the water structurally different from a crystal of salt?',
      [O('discrete','It is made of discrete, separate molecules',true), O('grid','It is an endless 3D grid',false)],
      'Exactly. Covalent bonds form finite packages (molecules). The H₂O molecules tumble past each other, which is why water is a liquid.',
      'Actually, water is made of billions of individual, separated H₂O molecules. Salt is an endless grid.'),
    S('A block of solid copper is tapped to reveal how the atoms are bonded. A grid of positive cores appears, surrounded by a swirling blue liquid. Do metal atoms share electrons in neat, isolated pairs?',
      [O('no','No, they pool them communally',true), O('yes','Yes, just like water',false)],
      'Got it. The outer electrons are completely unleashed, flowing freely between the atoms like a liquid sea.',
      'Not quite. Metals release their outer electrons into a massive, shared communal pool called a "sea of electrons."'),
    S('If a voltage is applied to a copper wire, the "sea of electrons" instantly drifts down the wire, creating an electric current.',
      [O('true','True',true), O('false','False',false)],
      'Yep. Because the outer electrons are completely free to roam, metals conduct electricity effortlessly.',
      'Actually, that\'s true. The free-roaming electrons are easily pushed by voltage, which is exactly how electrical currents flow.'),
    S('Tap the wrong word to fix the sentence.\n\nA piece of metal bends when struck by a hammer because its atoms are locked into a brittle grid.',
      [O('fluid','fluid',true), O('fragile','fragile',false)],
      'Exactly. Because the atoms sit in a fluid sea of electrons, the layers can slide past each other without breaking the bond.',
      'Actually, the bond is fluid. The sea of electrons acts like a lubricant, allowing the heavy atoms to slide without shattering.'),
    { type: 'sorting', boxes: [
      { id: 'covalent_box', label: 'Covalent Bond' },
      { id: 'ionic_box', label: 'Ionic Bond' }
    ], items: [
      { id: 'transferred', label: 'Electrons are completely transferred', box: 'ionic_box' },
      { id: 'shared', label: 'Electrons are shared in pairs', box: 'covalent_box' }
    ]}
  ],

  // The Subatomic Blueprint
  checkpoint_l: [
    S('Tap the wrong word to fix the sentence.\n\nThe nucleus at the center of an atom is incredibly light and takes up the majority of the atom\'s total space.',
      [O('a microscopic fraction','a microscopic fraction',true), O('none','none',false)],
      'Yep. The nucleus is incredibly heavy, but it is unimaginably tiny. An atom is 99.999% pure, empty vacuum.',
      'Actually, the nucleus is incredibly dense but microscopic. The vast majority of an atom is just empty space.'),
    { type: 'sorting', boxes: [
      { id: 'pos', label: 'Positive (+)' },
      { id: 'neg', label: 'Negative (−)' },
      { id: 'neut', label: 'Neutral (0)' }
    ], items: [
      { id: 'proto', label: 'Proton', box: 'pos' },
      { id: 'elec', label: 'Electron', box: 'neg' },
      { id: 'neutro', label: 'Neutron', box: 'neut' }
    ]},
    S('If an atom loses one of its outside electrons, it instantly becomes a completely different element.',
      [O('false','False',true), O('true','True',false)],
      'Yep, that\'s false. Electrons are traded all the time — that\'s just chemistry. Identity is dictated entirely by the number of protons.',
      'Actually, that\'s false. An atom can lose electrons and still be the exact same element. Only changing the number of protons changes the element.'),
    S('The nucleus of a Gold atom is tapped — it contains 79 positive protons packed tightly together. The nucleus vibrates violently, then stabilizes. Because like-charges repel, why doesn\'t this nucleus explode?',
      [O('neutrons','Neutrons act as physical peacekeepers',true), O('electrons','The electrons hold it together',false)],
      'Got it. Neutrons have no charge. They wedge themselves between the angry protons to keep the center from blowing apart.',
      'Not quite. Neutrons sit in the center. Because they are neutral, they act as buffers, spacing the positive protons out so they don\'t repel each other.'),
    S('A Carbon atom has 6 protons and 6 neutrons. A 7th neutron is jammed into the center. Did this change how the atom chemically reacts?',
      [O('no','No, it just got heavier',true), O('yes','Yes, it is a new element',false)],
      'Exactly. Neutrons have no electrical charge. They don\'t affect the electrons or the chemistry. They are just dead weight.',
      'Actually, no. Neutrons do not affect chemistry because they have no charge. Adding one simply makes the exact same atom slightly heavier.'),
    S('A Carbon-12 atom and a Carbon-14 atom are weighed. The Carbon-14 tips the scale slightly heavier. What is the scientific term for atoms of the same element that have different weights?',
      [O('isotopes','Isotopes',true), O('ions','Ions',false)],
      'Yep. Isotopes are just identical twins where one is carrying a heavier backpack of neutrons.',
      'Not quite. They are called Isotopes. They have the exact same identity (protons), but a different weight (neutrons).')
  ],

  // The Periodic Map & The Octet
  checkpoint_m: [
    S('The Periodic Table lists the weight of Chlorine as 35.5. But a half-neutron cannot physically exist. Why is there a decimal?',
      [O('average','It is a population average of different isotopes',true), O('broken','The scale is broken',false)],
      'Exactly. In nature, Chlorine is a mix of heavy and light twins. The 35.5 is just the weighted average of a handful.',
      'Not quite. The decimal exists because the number is a population average of all the heavy and light isotopes mixed together in nature.'),
    S('Tap the wrong word to fix the sentence.\n\nElectrons sit in highly specific layers around the nucleus, and the inner shell dictates almost everything about how the atom behaves.',
      [O('outermost (valence)','outermost (valence)',true), O('heaviest','heaviest',false)],
      'Got it. The inner shells are buried and satisfied. The outermost shell (the valence shell) does all the interacting with the world.',
      'Actually, it is the outermost shell (the valence shell). The inner electrons are trapped; the outer ones do all the chemical bonding.'),
    S('The valence shell of a highly reactive atom is tapped. The atom violently steals an electron from a neighbor and locks into a stable state. How many electrons does an atom usually need in its outer shell to become perfectly stable?',
      [O('8','8',true), O('10','10',false)],
      'Yep. The Octet Rule. Almost every chemical reaction in the universe is just an atom chasing exactly 8 outer electrons.',
      'Not quite. The magic number is 8. This is called the Octet Rule.'),
    S('The Periodic Table is shaped randomly to fit on a standard piece of paper.',
      [O('false','False',true), O('true','True',false)],
      'Yep, that\'s false. It is a highly specific map. Elements in the same vertical column share the exact same number of outer electrons.',
      'Actually, that\'s false. It is a map of electron shells. Every element in a vertical column has the exact same number of valence electrons.'),
    { type: 'sorting', boxes: [
      { id: 'inert2', label: 'Completely inert and unreactive' },
      { id: 'explo', label: 'Highly explosive in water' }
    ], items: [
      { id: 'noble', label: 'The Noble Gases', box: 'inert2' }
    ]},
    S('A neutral atom has 11 positive protons and 11 negative electrons. One electron is thrown away — the total electron count drops to 10. Because the positive protons now outnumber the negative electrons, what has the atom become?',
      [O('ion','A positive Ion (+1)',true), O('element','A completely new element',false)],
      'Yep. An Ion is simply an atom carrying a net electrical charge because it lost or gained electrons.',
      'Actually, it becomes a positive Ion. By losing a negative charge, the atom is left with a positive imbalance.')
  ],

  // The Mechanics of Bonding
  checkpoint_n: [
    { type: 'sorting', boxes: [
      { id: 'static', label: 'The electrostatic grip' },
      { id: 'overlap', label: 'The atoms overlap' }
    ], items: [
      { id: 'na_cl', label: 'Sodium completely transfers its electron to Chlorine', box: 'static' }
    ]},
    S('A crystal of table salt (Sodium Chloride) is tapped. A massive, repeating 3D lattice of alternating positive and negative charges appears. Does an Ionic bond form small, separate molecules?',
      [O('no','No, it forms a continuous 3D grid',true), O('yes','Yes, billions of them',false)],
      'Exactly. There are no individual "salt molecules." The electrical forces pull in every direction, building a massive, rigid crystal.',
      'Actually, no. Ionic bonds build massive, continuous 3D grids called Lattices. They do not form small, discrete molecules.'),
    S('Two non-metal atoms drift together. Both need electrons to reach 8, but neither is willing to give one away. How do they solve this?',
      [O('share','They overlap and share pairs of electrons',true), O('repel','They repel each other',false)],
      'Yep. Both nuclei pull hard on the shared electrons sitting between them, gluing the atoms together.',
      'Not quite. They compromise by sharing. This shared pool of electrons acts as a glue, creating a Covalent Bond.'),
    S('Tap the wrong word to fix the sentence.\n\nUnlike salt, a glass of water is made of billions of continuous molecules tumbling past each other.',
      [O('individual, separate','individual, separate',true), O('metallic','metallic',false)],
      'Got it. Covalent bonds form discrete, finite packages. The H₂O molecules are separate, which is why water is a liquid.',
      'Actually, water molecules are individual and separate. Covalent bonds form discrete packages, unlike the continuous grid of salt.'),
    S('In a block of solid copper, the atoms share electrons in neat, isolated pairs.',
      [O('false','False',true), O('true','True',false)],
      'Yep, that\'s false. Metals unleash their outer electrons completely, letting them flow freely between the atoms like a liquid sea.',
      'Actually, that\'s false. Metals release their electrons into a massive, shared communal pool called a "sea of electrons."'),
    S('A piece of metal is struck with a hammer. The top layer of atoms shifts, but the blue liquid electrons flow smoothly around them to keep the bond intact. Why does metal bend instead of shattering?',
      [O('sea','The sea of electrons acts as a fluid lubricant',true), O('melt','The metal is melting',false)],
      'Exactly. Because the atoms are not locked to specific partners, the layers can slide past each other without breaking the electrostatic grip.',
      'Not quite. The fluid sea of electrons allows the rigid atoms to slide past each other without breaking the bond. That is why metal bends.')
  ]
};

// ── The Bit workshops ──

export const BIT_DATA_WORKSHOP = [
  {
    type: 'bitpattern',
    prompt: 'Beat 1: flip the switches into 1011.',
    bits: 4,
    target: '1011',
    labels: ['8', '4', '2', '1'],
    correctFeedback: 'Correct. In four-bit binary, 1011 means 8 + 0 + 2 + 1.',
    incorrectFeedback: 'Check each place from left to right: 8, 4, 2, 1. The target is 1011.'
  },
  S('Same bits, different meaning. What tells the computer how to read a pattern?',
    [O('rule','The rule used to read it',true), O('shape','The visual shape of the 1s and 0s',false)],
    'Exactly. The same bits only become useful when a system knows how to interpret them.',
    'Not quite. Bits need a reading rule. Without that rule, a pattern is just a row of 1s and 0s.'),
  S('Eight bits snap together into one byte. Why is that useful?',
    [O('chunk','It gives computers a useful standard chunk of storage',true), O('speed','It makes electricity travel faster',false)],
    'Yes. A byte is a practical block that computers can count, move, and store.',
    'Not quite. A byte does not make electricity faster. It gives computers a standard-sized block to work with.'),
  {
    type: 'bitpattern',
    prompt: 'Make the byte 01000001. In common text encoding, this becomes capital A.',
    bits: 8,
    target: '01000001',
    labels: ['128', '64', '32', '16', '8', '4', '2', '1'],
    correctFeedback: 'Correct. The pattern 01000001 is read as capital A in common text encoding.',
    incorrectFeedback: 'Look carefully at the target. Only the 64 place and the 1 place should be switched on.'
  },
  { type: 'sorting', boxes: [
    { id: 'bit', label: 'Bit' },
    { id: 'byte', label: 'Byte' }
  ], items: [
    { id: 'single', label: 'One on/off state', box: 'bit' },
    { id: 'eight', label: 'Eight bits grouped together', box: 'byte' }
  ]},
  {
    type: 'pixelgrid',
    prompt: 'Paint the target. Each square is just one bit: off or on.',
    target: ['0110', '1001', '1001', '0110'],
    correctFeedback: 'Nice. A tiny picture can start as a grid of on/off pixel states.',
    incorrectFeedback: 'Compare row by row. A 1 is a filled square; a 0 is empty.'
  },
  {
    type: 'bitpattern',
    prompt: 'Color mix: red on, green off, blue on.',
    bits: 3,
    target: '101',
    labels: ['red', 'green', 'blue'],
    correctFeedback: 'Correct. Red and blue are on, green is off.',
    incorrectFeedback: 'The target is red on, green off, blue on: 101.'
  },
  S('A sound wave enters the computer. What gets stored?',
    [O('samples','Many measured samples of the wave',true), O('air','Tiny pockets of air pressure',false)],
    'Yes. The computer stores measurements, then rebuilds the sound from those measurements during playback.',
    'Not quite. The computer stores measured numbers called samples, not actual air pressure.')
];

export const BIT_WORKSHOPS = {

  // After BB 003 — Switches and Pipes (12 interactions)
  checkpoint_a: [
    S('The guard on the Great Wall looks up and sees a perfectly clear, empty blue sky. In the language of computing, what did he just receive?',
      [O('zero','A zero',true), O('nothing','Nothing at all',false)],
      'Yep. An empty sky is a specific state. It means zero.',
      'Not quite. An empty sky isn\'t just "nothing." It\'s a specific message that means zero.'),
    S('Tap the wrong word in this sentence to fix it.\n\nA bit is a piece of complex math that a computer calculates.',
      [O('choice','a simple choice',true), O('equation','a difficult equation',false)],
      'Exactly. A bit isn\'t math. It\'s just a choice between on and off.',
      'Actually, a bit isn\'t math at all. It\'s just a choice between yes and no.'),
    { type: 'sorting', boxes: [
      { id: 'one', label: '1' },
      { id: 'zero', label: '0' }
    ], items: [
      { id: 'closed', label: 'A closed switch with electricity flowing through it', box: 'one' }
    ]},
    S('Tap the name "George Boole" to look inside his algebra system. The words TRUE and FALSE appear. Do you need to know how to multiply or divide to use Boolean logic?',
      [O('no','No',true), O('yes','Yes',false)],
      'Yep. It\'s entirely built on simple Yes or No decisions. No math required.',
      'Actually, no. It doesn\'t use numbers like that. It just uses True and False.'),
    S('You are wiring an AND gate. The first switch is ON. You slide the second switch to ON and the light bulb lights up. What happens if you slide it back to OFF?',
      [O('out','The light goes out',true), O('on','The light stays on',false)],
      'Exactly. In an AND gate, both switches must be ON, or the whole path is broken.',
      'Not quite. If you turn one off in an AND gate, the physical path breaks and the light goes out.'),
    S('In an OR gate, if you turn on the top switch AND the bottom switch at the same time, the machine breaks.',
      [O('false','False',true), O('true','True',false)],
      'Yep, that\'s false. If both are on, the electricity just flows through both paths to the bulb. It still turns on.',
      'Actually, that\'s false. If both are on, the electricity just has two paths it can take. The light still turns on.'),
    { type: 'sorting', boxes: [
      { id: 'switch', label: 'An electrical switch' },
      { id: 'wire', label: 'A copper wire' }
    ], items: [
      { id: 'valve', label: 'A physical plumbing valve', box: 'switch' }
    ]},
    S('You tap to open the first valve on a straight, single water pipe. Water flows past the first valve and slams into the second closed valve. Which logic gate did we just build out of pipes?',
      [O('and','An AND gate',true), O('or','An OR gate',false)],
      'Yep. Because they are on the exact same pipe, you need the first AND the second valve open.',
      'Not quite. Because it\'s one straight pipe, the first AND the second must be open. It\'s an AND gate.'),
    S('Tap the wrong word to fix the sentence.\n\nTo build an OR gate out of plumbing, you need to put two valves on a straight pipe.',
      [O('Y-shaped','Y-shaped',true), O('broken','broken',false)],
      'Exactly. You have to split the pipe so the water has two different paths it can take.',
      'Actually, a straight pipe makes an AND gate. To make an OR gate, you need a Y-shaped pipe.'),
    S('You have a Y-shaped pipe with a top valve and a bottom valve. You shut the top valve completely. You open the bottom valve. Does water come out the faucet?',
      [O('yes','Yes',true), O('no','No',false)],
      'Yep. As long as the bottom OR the top is open, the water finds a way around.',
      'Not quite. Because the pipe is split, the water just ignores the top, takes the bottom path, and comes out the faucet.'),
    S('A computer microchip is basically just billions of microscopic plumbing valves routing electricity instead of water.',
      [O('true','True',true), O('false','False',false)],
      'Exactly. It\'s just millions of microscopic paths opening and closing to make decisions.',
      'Actually, that\'s perfectly true. A chip is just billions of tiny switches routing electricity exactly like pipes and valves.'),
    S('Imagine you build a water pipe with no valves on it at all. The water just flows constantly, forever. Can you use this pipe to send a message to someone?',
      [O('no','No',true), O('yes','Yes',false)],
      'Got it. If it can\'t change states (on and off), it\'s just a pipe. You need at least two states to carry a signal.',
      'Actually, no. If the water never stops, you can\'t use it to signal anything. You need to be able to turn it on and off.')
  ],

  // After BB 006 — Logic and Gates (Textbook Edition) (12 interactions)
  checkpoint_b: [
    S('Tap the term "Bit" to reveal what the word actually stands for. The words "Binary Digit" appear. What does the word "Binary" mean in this context?',
      [O('two','Exactly two options',true), O('complex','A complex math equation',false)],
      'Yep. Binary simply means two. On or Off. 1 or 0.',
      'Not quite. Binary just means two. A bit only ever has two possible states.'),
    { type: 'sorting', boxes: [
      { id: 'one', label: '1' },
      { id: 'zero', label: '0' }
    ], items: [
      { id: 'true', label: 'The logic state of "True"', box: 'one' }
    ]},
    S('If a computer encounters a 1 and a 0, it adds them together mathematically to get a 1.',
      [O('false','False',true), O('true','True',false)],
      'Yep, that\'s false. At this level, it isn\'t doing math. It is just comparing True and False states.',
      'Actually, that\'s false. The computer isn\'t adding numbers here. It is just looking at logic states (Yes and No).'),
    S('In an AND gate, Input A is 1. You slide Input B. To get the Output to be 1, what must Input B be?',
      [O('1','1',true), O('0','0',false)],
      'Got it. In an AND gate, Input A and Input B must both be 1 to get a 1 out.',
      'Not quite. To get a 1 out of an AND gate, both inputs must be 1.'),
    S('Tap the wrong word to fix the sentence.\n\nIn Boolean algebra, if an AND gate receives a 1 and a 0, the final output will be True.',
      [O('False','False',true), O('1','1',false)],
      'Exactly. If even one input is 0 (False), an AND gate instantly outputs a 0 (False).',
      'Actually, because one of the inputs is a 0, the AND gate outputs a 0 (False).'),
    S('An OR gate receives two inputs. Input A is 0. Input B is 1. What does the gate output?',
      [O('1','1',true), O('0','0',false)],
      'Yep. As long as A or B is a 1, an OR gate will output a 1.',
      'Not quite. Because Input B is a 1, the OR gate is satisfied and outputs a 1.'),
    { type: 'sorting', boxes: [
      { id: 'zero', label: 'Output is 0' },
      { id: 'one', label: 'Output is 1' }
    ], items: [
      { id: 'or00', label: 'An OR gate receiving a 0 and a 0', box: 'zero' }
    ]},
    S('You tap the text to see how engineers draw an AND gate on a circuit blueprint. The D-shaped symbol appears, with two lines going in and one coming out. Why are there two lines going in, but only one line coming out?',
      [O('compare','Because it compares two inputs to make one final decision',true), O('half','Because the electricity is cut in half',false)],
      'Exactly. The gate looks at both inputs, compares them, and spits out a single True or False answer.',
      'Not quite. It takes two signals, compares them based on its rules, and outputs one final decision.'),
    S('If an OR gate receives a 1 and a 1, it gets confused and outputs a 0.',
      [O('false','False',true), O('true','True',false)],
      'Yep, that\'s false. An OR gate just needs at least one True signal. If it gets two, it happily outputs a 1.',
      'Actually, that\'s false. If it receives two 1s, the "OR" condition is easily met, and it outputs a 1.'),
    S('You need a security system that only unlocks the door if a person scans a keycard (1) AND enters a PIN code (1). Which gate should you wire into the lock?',
      [O('and','An AND gate',true), O('or','An OR gate',false)],
      'Yep. An AND gate guarantees the door stays locked if they only do one of the two things.',
      'Not quite. If you used an OR gate, they could just scan the card without knowing the PIN, and the door would open. You need an AND gate.'),
    S('Tap the wrong word to fix the sentence.\n\nA modern computer processor is made of gears that physically turn to calculate Boolean logic.',
      [O('switches','microscopic switches',true), O('wire','a single wire',false)],
      'Exactly. There are no moving physical parts. It is just billions of microscopic switches routing electricity.',
      'Actually, modern computers have no moving parts like gears. They use microscopic electrical switches.'),
    S('You have an AND gate. The first input is 0. Do you even need to look at the second input to know what the output will be?',
      [O('no','No',true), O('yes','Yes',false)],
      'Got it. The second a 0 hits an AND gate, the whole thing fails. The output will be 0 no matter what the other input is.',
      'Actually, you don\'t. Because an AND gate requires both to be 1, a single 0 means the output is guaranteed to be 0.')
  ],

  // The Physical Switch (Hardware & Software)
  checkpoint_c: [
    S('If an Adder circuit is handed electrical signals representing a 2 and a 3, it outputs a 5. Does the computer actually "know" what a 5 is?',
      [O('no','No, it just routed electricity through logic gates',true), O('yes','Yes, it calculated the math in its brain',false)],
      'Yep. The physical architecture of the gates just forces the electricity down a specific path. It is purely mechanical.',
      'Actually, no. The computer has no brain. The physical wiring of the AND and OR gates just guarantees the electricity exits on the correct wire.'),
    S('An English code instruction is tapped. A "Compiler" instantly translates the text into a massive wall of 1s and 0s. Why is a compiler necessary?',
      [O('binary','The processor only understands On and Off',true), O('fast','The processor is too fast for English',false)],
      'Exactly. The hardware only understands raw electricity. The compiler does the heavy lifting of translating human logic into electrical switches.',
      'Not quite. A processor cannot read words at all. It only understands physical electricity turning on and off (1s and 0s).'),
    S('If the steps of an algorithm are executed out of order, the computer will automatically fix the sequence.',
      [O('false','False',true), O('true','True',false)],
      'Yep, that\'s false. A computer is blind. It will execute the steps exactly as written, even if it completely ruins the task.',
      'Actually, that\'s false. A computer has no intelligence. If the recipe is written out of order, the machine will blindly execute it and fail.'),
    { type: 'sorting', boxes: [
      { id: 'board', label: 'The circuit board' }
    ], items: [
      { id: 'diode', label: 'A Diode', box: 'board' },
      { id: 'wire', label: 'A Copper Wire', box: null }
    ]},
    S('Tap the wrong word to fix the sentence.\n\nA transistor is able to flip on and off billions of times a second because it uses microscopic moving parts.',
      [O('solid','solid, motionless',true), O('mechanical','heavy, mechanical',false)],
      'Exactly. The transistor was a revolution because it has absolutely no moving parts to break or wear out.',
      'Actually, the transistor has zero moving parts. It is just a solid block of chemicals that changes how it conducts electricity.'),
    S('An "If/Then" branch is written. The logic path slides to the "False" outcome, routing to the "Error Screen" wire. Does this branch require the computer to make a complex moral decision?',
      [O('no','No, it is just Boolean logic',true), O('yes','Yes, it must weigh the options',false)],
      'Yep. It is purely mathematical. If the password matches, the electricity goes one way. If it doesn\'t, it goes the other.',
      'Not quite. An If/Then statement is just simple Boolean logic. The electricity is just physically routed based on a True or False check.')
  ],

  // The Network Scale (LAN vs. WAN)
  checkpoint_d: [
    S('A smartphone and a television are connected to the same wireless router inside a house. A storm knocks down the main internet cable outside. Does the phone lose its ability to send a video to the television?',
      [O('no','No, internal traffic still works',true), O('yes','Yes, the internet is down',false)],
      'Exactly. The router is still managing the Local Area Network (LAN). Internal devices do not need the global internet to talk to each other.',
      'Not quite. They are communicating on a private Local Area Network (LAN). The global internet cable is not required for them to trade data locally.'),
    { type: 'sorting', boxes: [
      { id: 'wifi', label: 'Pushing high-speed data through solid drywall' },
      { id: 'bt', label: 'Connecting a wireless mouse using almost zero battery' }
    ], items: [
      { id: 'wifip', label: 'Wi-Fi', box: 'wifi' },
      { id: 'btp', label: 'Bluetooth', box: 'bt' }
    ]},
    S('Tap the wrong word to fix the sentence.\n\nTo connect a private office network in New York to a private office network in London, the data must travel across a LAN.',
      [O('WAN','WAN',true), O('Bluetooth connection','Bluetooth connection',false)],
      'Got it. Wide Area Networks (WAN) cover massive geographical distances, bridging local networks together.',
      'Not quite. A Local Area Network (LAN) only covers one building. To cross an ocean, a Wide Area Network (WAN) is required.'),
    S('The global internet is simply the largest Wide Area Network (WAN) in existence, bridging billions of private networks together.',
      [O('true','True',true), O('false','False',false)],
      'Yep. It is just a massive, chaotic web of physical cables connecting local rooms together.',
      'Actually, that is true. The internet is just the ultimate Wide Area Network, tying all the smaller local networks into one system.'),
    S('A tiny wireless earbud is tapped. A small battery icon appears. Why does an earbud use Bluetooth instead of a standard Wi-Fi connection?',
      [O('battery','Wi-Fi would drain the battery in minutes',true), O('faster','Bluetooth is significantly faster',false)],
      'Exactly. Wi-Fi requires too much electrical power. Bluetooth limits its range to just a few meters to keep the device alive.',
      'Not quite. Wi-Fi is faster, but it requires massive electrical power. Bluetooth is used because it barely drains the battery.'),
    S('A laptop is sending a file via Bluetooth. The laptop slides away from the receiver — the signal snaps after just a few meters. Why?',
      [O('range','Bluetooth is strictly a personal area network, sacrificing distance for battery',true), O('broken','The laptop is broken',false)],
      'Yep. Bluetooth is strictly a "personal area network." It sacrifices distance for battery efficiency.',
      'Actually, the signal breaks very quickly. Bluetooth is only designed to cover a few meters of space.')
  ],

  // The Cloud & The Post Office
  checkpoint_e: [
    S('The "Cloud Computing" icon is tapped. The cloud icon vanishes, revealing a massive, air-conditioned warehouse filled with server racks. Is Cloud Computing an invisible storage space?',
      [O('no','No, it is just renting physical hardware',true), O('yes','Yes, it has no physical location',false)],
      'Got it. "The Cloud" is a marketing term. The data sits on a physical server inside a warehouse hundreds of miles away.',
      'Actually, no. It is just a rented server. The data sits on physical hard drives inside massive, heavily guarded warehouses.'),
    S('When a large video file is sent across the internet, it travels down the fiber-optic cable as one massive, heavy chunk of data.',
      [O('false','False',true), O('true','True',false)],
      'Yep, that\'s false. The file is chopped up into thousands of microscopic pieces called Packets to prevent traffic jams.',
      'Actually, that\'s false. Sending one massive file would clog the network. It is chopped into thousands of tiny Packets.'),
    { type: 'sorting', boxes: [
      { id: 'router', label: 'The microscopic post office' }
    ], items: [
      { id: 'r', label: 'A Router', box: 'router' },
      { id: 'bt_ant', label: 'A Bluetooth antenna', box: null }
    ]},
    S('Tap the wrong word to fix the sentence.\n\nWhen a smartphone translates a spoken language in real-time, the complex math is calculated locally on the phone.',
      [O('in a massive Cloud server','in a massive Cloud server',true), O('using Bluetooth','using Bluetooth',false)],
      'Got it. A phone does not have the processing power. It just sends the audio to a server, and the server sends the answer back.',
      'Actually, the phone lacks the processing power. The math is calculated in a Cloud server, and the answer is sent back as a text file.'),
    S('A small business launches a website. On day one, ten million people try to visit it at the exact same second. If the website is hosted on a single local computer, what happens?',
      [O('crash','The computer runs out of processing power and crashes',true), O('upgrade','The computer automatically upgrades itself',false)],
      'Yep. A single machine hits a hard physical limit. This is exactly why companies rent Cloud servers — to handle massive, sudden spikes.',
      'Not quite. Hardware cannot upgrade itself. A single machine will run out of memory and instantly crash under the load.'),
    S('A photograph is ready to be sent across the network. It breaks into thousands of identical numbered squares. What are these individual squares called?',
      [O('packets','Packets',true), O('frequencies','Frequencies',false)],
      'Exactly. Packets allow millions of different files to share the exact same physical cable without crashing into each other.',
      'Actually, they are called Packets. Chopping the file into uniform packets allows data to flow smoothly through the routers.')
  ],

  // Firewalls & Secrets (Cybersecurity)
  checkpoint_f: [
    { type: 'sorting', boxes: [
      { id: 'bouncer', label: 'The Digital Bouncer' }
    ], items: [
      { id: 'fw', label: 'A Firewall', box: 'bouncer' },
      { id: 'usb', label: 'A USB cable', box: null }
    ]},
    S('If a malicious command bypasses the firewall, the computer processor will refuse to execute it because it knows the code is dangerous.',
      [O('false','False',true), O('true','True',false)],
      'Yep, that\'s false. A processor is completely blind. It executes destructive malware with the exact same flawless efficiency as a normal program.',
      'Actually, that\'s false. A processor has no intelligence. It will blindly execute a command to delete its own hard drive without hesitation.'),
    S('The Wi-Fi signal floating through a public coffee shop is tapped. A plain-text credit card number appears in the air. Can anyone with an antenna read this data?',
      [O('yes','Yes, radio waves are public',true), O('no','No, Wi-Fi is invisible',false)],
      'Exactly. Wi-Fi is just radio waves. Anyone can pull them out of the air. This is why raw data must never be sent over a network.',
      'Actually, yes. Wi-Fi ripples through the open air. Anyone with a basic antenna can intercept and read the packets.'),
    S('Tap the wrong word to fix the sentence.\n\nEncryption protects data by translating the 1s and 0s into Spanish.',
      [O('a chaotic, unreadable mess','a chaotic, unreadable mess',true), O('binary','binary',false)],
      'Got it. It scrambles the data mathematically. Without the exact key, it just looks like random garbage characters.',
      'Not quite. Encryption uses a mathematical algorithm to scramble the data into complete, unreadable chaos.'),
    S('An online store needs to securely receive credit card numbers, but it has never met the customers before. How does it share the encryption key without a hacker stealing it?',
      [O('public','It gives the public a key that only locks data, and keeps the unlocking key private',true), O('email','It sends the key through a separate email',false)],
      'Yep. Public Key Cryptography. Anyone can scramble the data using the public lock, but only the store holds the private key required to unscramble it.',
      'Actually, it uses Public Key Cryptography. The store broadcasts a "Public Key" that can only scramble data, while heavily guarding the "Private Key" needed to unlock it.'),
    S('An encrypted packet arrives at a secure server. A key is slid to unscramble the data — a wall of garbage characters snaps into a readable password. Without this key, how long would it take a supercomputer to guess the original message?',
      [O('millions','Millions of years',true), O('minutes','A few minutes',false)],
      'Exactly. Modern encryption is mathematically airtight. Brute-forcing the answer without the key is physically impossible in a human lifetime.',
      'Not quite. Without the mathematical key, checking every possible combination would take a supercomputer millions of years.')
  ],

  // The Human Element & Zero-Days
  checkpoint_g: [
    S('Tap the wrong word to fix the sentence.\n\nThe vast majority of secure networks are broken by hackers using supercomputers.',
      [O('social engineering','social engineering',true), O('brute force','brute force',false)],
      'Yep. Technical systems are mathematically solid. The easiest way in is just tricking a human into handing over the password.',
      'Actually, they are broken by social engineering. It is much easier to trick a human than it is to outsmart a firewall.'),
    S('A hacker calls a company employee, claims to be from the IT department, and demands their login credentials to "fix a server issue." What is this tactic called?',
      [O('social','Social Engineering',true), O('zeroday','A Zero-Day Exploit',false)],
      'Exactly. It relies entirely on human psychology — authority and urgency — to bypass the digital locks completely.',
      'Not quite. This is Social Engineering. It uses human psychology to bypass the software defenses.'),
    S('Modern operating systems are written so perfectly that they contain absolutely zero structural flaws.',
      [O('false','False',true), O('true','True',false)],
      'Yep, that\'s false. An operating system has 50 million lines of code. It is a mathematical certainty that human programmers made logical mistakes.',
      'Actually, that\'s false. With tens of millions of lines of code, human errors and hidden logic bugs are a mathematical certainty.'),
    S('The locked vault representing a software company\'s database is tapped. A hacker slips through a microscopic crack in the back wall. If a hacker finds a bug before the software creators know it exists, what is it called?',
      [O('zeroday','A Zero-Day Vulnerability',true), O('phish','A Phishing Attack',false)],
      'Got it. The creators have had "zero days" to fix it. These undiscovered flaws are the most highly prized weapons in cybersecurity.',
      'Actually, it is a Zero-Day Vulnerability. The software creators don\'t know it exists, meaning they have had zero days to patch it.'),
    { type: 'sorting', boxes: [
      { id: 'enc', label: 'Encryption' },
      { id: 'fwall', label: 'A Firewall' }
    ], items: [
      { id: 'eaves', label: 'Eavesdropping on Wi-Fi', box: 'enc' },
      { id: 'malpkt', label: 'A malicious packet arriving at a port', box: 'fwall' }
    ]},
    S('A piece of malware tricks an employee and successfully enters the computer\'s RAM. What will the processor (ALU) do when it receives the malicious 1s and 0s?',
      [O('execute','Execute the math perfectly',true), O('quarantine','Quarantine the virus',false)],
      'Exactly. The processor is just a machine routing electricity. It executes a command to destroy the system just as flawlessly as a command to save a file.',
      'Not quite. The processor will execute the math perfectly. It has no intelligence and cannot recognize malicious intent.')
  ],

  // The Architecture & The Bottleneck
  checkpoint_h: [
    S('Tap the wrong word to fix the sentence.\n\nIn a modern computer, software is installed by manually rerouting physical cables.',
      [O('1s and 0s','1s and 0s',true), O('processors','processors',false)],
      'Yep. The Von Neumann Architecture turned software into pure data, stored as 1s and 0s in the exact same memory bank as the numbers being calculated.',
      'Actually, early computers used cables. Modern computers treat software as pure data (1s and 0s) stored in the memory bank.'),
    S('The RAM (Random Access Memory) grid is tapped, cutting the power supply. The entire grid goes black instantly. Does RAM permanently store data like a hard drive?',
      [O('no','No, it is highly volatile',true), O('yes','Yes, it is a permanent vault',false)],
      'Exactly. The microscopic capacitors must be constantly refreshed. If power drops, the data is instantly and permanently destroyed.',
      'Not quite. RAM is highly volatile. The instant the electrical power stops, the capacitors empty and all data is lost.'),
    { type: 'sorting', boxes: [
      { id: 'addr', label: 'Sends the coordinate location to the RAM' },
      { id: 'data', label: 'Carries the actual payload of 1s and 0s back' }
    ], items: [
      { id: 'ab', label: 'The Address Bus', box: 'addr' },
      { id: 'db', label: 'The Data Bus', box: 'data' }
    ]},
    S('The RAM operates at the exact same blistering speed as the CPU, feeding it data instantly.',
      [O('false','False',true), O('true','True',false)],
      'Yep, that\'s false. The CPU is exponentially faster. It often sits completely idle, wasting billions of clock cycles waiting for data to travel from the slow RAM.',
      'Actually, that\'s false. This is the Von Neumann Bottleneck. The RAM is significantly slower, forcing the CPU to sit idle and wait for data to arrive.'),
    S('To fix the bottleneck, engineers placed a tiny amount of extremely fast, expensive memory directly onto the CPU silicon itself. What is this called?',
      [O('cache','Cache Memory',true), O('hdd','A Hard Drive',false)],
      'Exactly. Cache predicts what data the processor will need next and stages it right next to the logic gates, completely bypassing the slow RAM.',
      'Not quite. It is called Cache Memory. It holds data just millimeters away from the logic gates so the processor doesn\'t have to wait.'),
    S('The quartz crystal frequency is slid to 3 Gigahertz (3 GHz). The Fetch-Decode-Execute cycle spins into a blur. How many instructions is the CPU fetching, decoding, and executing at this speed?',
      [O('billion','Three billion per second',true), O('thousand','Three thousand per second',false)],
      'Yep. The crystal pulses three billion times a second, driving the mechanical heartbeat of the entire machine.',
      'Actually, 3 GHz means exactly three billion pulses per second. The machine executes three billion instructions every second.')
  ]
};

export const COMPUTER_WORKSHOP_MODULES = [
  {
    id: 'binary-data',
    label: 'Data',
    title: 'Binary and data lab',
    sub: 'Switch bits into numbers, letters, pixels, colour, and sound.',
    interactions: [
      ...BIT_DATA_WORKSHOP,
      {
        type: 'bitsnumber', mode: 'build',
        prompt: 'Flip switches and watch the total. Build 13.',
        bits: 4, target: 13,
        correctFeedback: 'Correct. 8 + 4 + 1 = 13, so 13 is 1101 in binary.',
        incorrectFeedback: 'Watch the running total under the switches: you need 8 + 4 + 1.'
      },
      {
        type: 'bitsnumber', mode: 'read',
        prompt: 'Read the bits. What number is this?',
        shown: '0110', options: [3, 6, 9, 12],
        correctFeedback: 'Correct. 4 + 2 = 6.',
        incorrectFeedback: 'Only the 4 and the 2 are switched on: 4 + 2 = 6.'
      },
      {
        type: 'bitsword', mode: 'build',
        prompt: 'Letters are numbers in disguise. Build the byte for A — watch the letter card as you flip.',
        target: 'A',
        correctFeedback: 'Correct. A is code 65: 64 + 1, or 01000001.',
        incorrectFeedback: 'A is code 65. You need the 64 switch and the 1 switch.'
      },
      {
        type: 'bitsword', mode: 'read',
        prompt: 'A byte arrives over the network. Which letter is it?',
        shown: '01001000', options: ['E', 'H', 'L', 'O'],
        correctFeedback: 'Correct. 64 + 8 = 72, and code 72 is H.',
        incorrectFeedback: '64 + 8 = 72. Code 72 is the letter H.'
      },
      S('A sensor stores 00000000 for darkness and 11111111 for full brightness. What is the computer really storing?',
        [O('measurements','Measurements written as bits',true), O('light','Actual light trapped inside memory',false)],
        'Correct. The machine stores measured values, not the physical light itself.',
        'Not quite. It stores numbers that represent brightness levels.'),
      S('A file opens correctly on one app and looks broken in another. What probably changed?',
        [O('decoder','The rule used to decode the bits',true), O('electricity','The electricity became weaker',false)],
        'Yes. Same bits, different interpretation rule, different meaning.',
        'The bits need a decoding rule. Without the right rule, the pattern looks meaningless.'),
      {
        type: 'pixelgrid',
        prompt: 'Paint a diagonal. Each 1 is a filled pixel; each 0 is empty.',
        target: ['1000', '0100', '0010', '0001'],
        correctFeedback: 'Nice. A picture can be built from nothing but positions and on/off states.',
        incorrectFeedback: 'Read each row left to right. The 1 should step down one column each row.'
      },
      {
        type: 'bitpattern',
        prompt: 'Make the tiny colour code: red off, green on, blue on.',
        bits: 3,
        target: '011',
        labels: ['red', 'green', 'blue'],
        correctFeedback: 'Locked. Green and blue are on; red is off.',
        incorrectFeedback: 'The target is red off, green on, blue on: 011.'
      }
    ]
  },
  {
    id: 'logic-gates',
    label: 'Logic',
    title: 'Logic gate trainer',
    sub: 'Build confidence with AND, OR, NOT, and gate behaviour.',
    interactions: [
      {
        type: 'gatebuilder', mode: 'pick',
        prompt: 'Pick the gate that matches this truth table. Toggle A and B to test your circuit live.',
        chain: 1, palette: ['AND', 'OR', 'XOR', 'NAND'], targetTable: [0, 0, 0, 1],
        correctFeedback: 'Correct. Only AND outputs 1 exclusively when both inputs are 1.',
        incorrectFeedback: 'The table lights the bulb only for A=1, B=1 — that strict "both must agree" rule is AND.'
      },
      {
        type: 'gatebuilder', mode: 'pick',
        prompt: 'This table lights the bulb when the inputs DISAGREE. Which gate is that?',
        chain: 1, palette: ['AND', 'OR', 'XOR', 'NAND'], targetTable: [0, 1, 1, 0],
        correctFeedback: 'Correct. XOR means "exactly one, not both".',
        incorrectFeedback: 'Bulb on only when A and B differ — that is XOR, the exclusive OR.'
      },
      {
        type: 'gatebuilder', mode: 'solve',
        prompt: 'The gates are fixed. Toggle A, B, and C until the bulb lights.',
        chain: 2, gatesLocked: ['AND', 'OR'],
        correctFeedback: 'Correct. (A AND B) OR C — either both A and B, or just C, lights it.',
        incorrectFeedback: 'Trace the wires: the first gate needs A and B together, OR the bulb takes C directly.'
      },
      {
        type: 'gatebuilder', mode: 'solve',
        prompt: 'Harder wiring: light the bulb through an XOR feeding an AND.',
        chain: 2, gatesLocked: ['XOR', 'AND'],
        correctFeedback: 'Correct. A and B must disagree AND C must be on.',
        incorrectFeedback: 'The XOR only passes 1 when A and B differ — and then the AND still needs C.'
      },
      S('A bit can only hold one yes/no state. Which pair matches that idea?',
        [O('onezero','1 and 0',true), O('onetwo','1 and 2',false)],
        'Exactly. A bit is one binary state.',
        'A bit is binary. It needs exactly two states: 1 and 0.'),
      { type: 'sorting', boxes: [
        { id: 'one', label: '1 / True' },
        { id: 'zero', label: '0 / False' }
      ], items: [
        { id: 'closed', label: 'Closed switch with current flowing', box: 'one' },
        { id: 'open', label: 'Open switch with no current', box: 'zero' }
      ]},
      S('An AND gate receives A = 1 and B = 0. What is the output?',
        [O('0','0',true), O('1','1',false)],
        'Correct. AND needs both inputs to be 1.',
        'AND fails if even one input is 0.'),
      S('An OR gate receives A = 0 and B = 1. What is the output?',
        [O('1','1',true), O('0','0',false)],
        'Yes. OR only needs at least one 1.',
        'OR is satisfied as soon as one input is 1.'),
      { type: 'sorting', boxes: [
        { id: 'and', label: 'AND gate' },
        { id: 'or', label: 'OR gate' }
      ], items: [
        { id: 'keypin', label: 'Keycard and PIN both required', box: 'and' },
        { id: 'frontback', label: 'Front door or back door can open', box: 'or' }
      ]},
      S('A NOT gate receives 1. What does it output?',
        [O('0','0',true), O('1','1',false)],
        'Exactly. NOT flips the state.',
        'NOT is an inverter. It turns 1 into 0 and 0 into 1.'),
      S('A security lock says: keycard AND PIN. The keycard works, but the PIN is wrong. Does the lock open?',
        [O('no','No',true), O('yes','Yes',false)],
        'Right. One missing requirement breaks the AND condition.',
        'For AND, both requirements must pass.'),
      S('Why are logic gates powerful?',
        [O('combine','They combine simple yes/no signals into decisions',true), O('english','They understand English instructions directly',false)],
        'Correct. Huge systems are built from simple signal rules.',
        'Gates do not read English. They combine electrical yes/no states.')
    ]
  },
  {
    id: 'code-algorithms',
    label: 'Code',
    title: 'Code and algorithm lab',
    sub: 'Turn instructions into exact steps, branches, and machine actions.',
    interactions: [
      S('An algorithm is best described as:',
        [O('steps','Ordered steps for solving a task',true), O('guess','A lucky guess from the computer',false)],
        'Yes. The order is part of the algorithm.',
        'An algorithm is a clear sequence of steps.'),
      S('A recipe says bake first, mix later. What happens if a computer follows that algorithm?',
        [O('fails','It follows the bad order and fails',true), O('fixes','It quietly fixes the order',false)],
        'Exactly. Computers follow instructions as written.',
        'Computers do not automatically repair bad instructions.'),
      { type: 'sorting', boxes: [
        { id: 'human', label: 'Human-friendly' },
        { id: 'machine', label: 'Machine-friendly' }
      ], items: [
        { id: 'python', label: 'print("hello")', box: 'human' },
        { id: 'binary', label: '01001000 01101001', box: 'machine' }
      ]},
      S('Why does compiled code eventually become machine code?',
        [O('processor','The processor only acts on electrical patterns',true), O('grammar','The processor prefers shorter English grammar',false)],
        'Correct. The chip responds to encoded electrical instructions.',
        'The processor does not understand English. It receives machine instructions.'),
      S('An if-statement checks: password matches? The answer is false. Which path runs?',
        [O('else','The false / else path',true), O('then','The true / then path',false)],
        'Right. A branch routes the program based on a yes/no result.',
        'A false condition does not run the true branch.'),
      S('A loop is useful because it:',
        [O('repeat','Repeats a step without rewriting it many times',true), O('delete','Deletes the algorithm after one run',false)],
        'Exactly. Loops make repeated work manageable.',
        'Loops repeat instructions while a condition says to continue.'),
      S('A bug is not always a crash. Sometimes it is:',
        [O('wrong','A program doing the wrong thing perfectly',true), O('battery','A battery problem inside the screen',false)],
        'Yes. A machine can execute a mistaken instruction flawlessly.',
        'A bug is often flawed logic being executed exactly.'),
      S('What builds confidence in coding fastest?',
        [O('trace','Tracing what each step actually does',true), O('memorise','Memorising every keyword at once',false)],
        'Correct. Tracing turns code from mystery into cause and effect.',
        'Keywords matter, but tracing the flow is the real confidence builder.')
    ]
  },
  {
    id: 'hardware-memory',
    label: 'Hardware',
    title: 'Hardware and memory lab',
    sub: 'See transistors, CPU work, RAM, cache, and storage as one machine.',
    interactions: [
      S('A transistor is useful because it behaves like:',
        [O('switch','A tiny controllable switch',true), O('wheel','A tiny spinning wheel',false)],
        'Correct. Switching is the core idea.',
        'A transistor has no spinning parts. It controls current.'),
      { type: 'sorting', boxes: [
        { id: 'cpu', label: 'CPU' },
        { id: 'ram', label: 'RAM' }
      ], items: [
        { id: 'execute', label: 'Runs instructions', box: 'cpu' },
        { id: 'working', label: 'Holds active working data', box: 'ram' }
      ]},
      S('RAM loses its contents when power is cut. What word describes that?',
        [O('volatile','Volatile',true), O('permanent','Permanent',false)],
        'Yes. RAM is fast working memory, not long-term storage.',
        'RAM is volatile: power off, contents gone.'),
      S('A hard drive or SSD is different from RAM because it:',
        [O('keeps','Keeps data after power is off',true), O('thinks','Thinks through instructions',false)],
        'Correct. Storage is for keeping data.',
        'Storage keeps data. The CPU executes instructions.'),
      { type: 'sorting', boxes: [
        { id: 'address', label: 'Address bus' },
        { id: 'data', label: 'Data bus' }
      ], items: [
        { id: 'where', label: 'Which memory location?', box: 'address' },
        { id: 'what', label: 'What bits are being carried?', box: 'data' }
      ]},
      S('Why does cache memory sit close to the CPU?',
        [O('speed','To keep likely-needed data very fast to reach',true), O('backup','To permanently back up photos',false)],
        'Exactly. Cache reduces waiting.',
        'Cache is speed memory, not permanent backup.'),
      S('A CPU running at 3 GHz is pulsing about:',
        [O('billion','Three billion times per second',true), O('thousand','Three thousand times per second',false)],
        'Correct. Giga means billion.',
        '3 GHz means roughly three billion cycles each second.'),
      S('The bottleneck happens when:',
        [O('wait','The CPU waits for slower memory/data movement',true), O('paint','The screen colour is too bright',false)],
        'Yes. Fast computation can still be limited by data movement.',
        'The bottleneck is about waiting for data to arrive.')
    ]
  },
  {
    id: 'networks-cloud',
    label: 'Networks',
    title: 'Networks and cloud lab',
    sub: 'Route packets through LANs, WANs, Wi-Fi, Bluetooth, and servers.',
    interactions: [
      S('Two devices in the same home talk through the router. That is mainly a:',
        [O('lan','LAN',true), O('wan','WAN',false)],
        'Correct. A Local Area Network covers a small local space.',
        'A home network is a LAN. WANs connect across large distances.'),
      S('The internet is best understood as:',
        [O('networks','Many networks connected together',true), O('onebox','One giant computer in one building',false)],
        'Yes. The internet is a network of networks.',
        'It is not one computer. It is many networks linked together.'),
      { type: 'sorting', boxes: [
        { id: 'wifi', label: 'Wi-Fi' },
        { id: 'bluetooth', label: 'Bluetooth' }
      ], items: [
        { id: 'stream', label: 'Higher data around a room or building', box: 'wifi' },
        { id: 'mouse', label: 'Low-power nearby accessories', box: 'bluetooth' }
      ]},
      S('Why are big files split into packets?',
        [O('share','So many messages can share the network and be reassembled',true), O('weight','Because files become physically heavy',false)],
        'Correct. Packets keep traffic manageable.',
        'Packets are about routing and sharing network capacity.'),
      S('A router is like a:',
        [O('post','Post office choosing where packets go next',true), O('battery','Battery making packets stronger',false)],
        'Exactly. It forwards packets toward their destination.',
        'A router chooses paths. It does not just add power.'),
      S('The cloud is:',
        [O('servers','Someone else’s physical servers rented over the internet',true), O('sky','Invisible storage with no machines',false)],
        'Right. Cloud still means real machines in real data centers.',
        'Cloud is physical hardware accessed remotely.'),
      S('A website crashes when traffic spikes because:',
        [O('limits','Servers have real limits on CPU, memory, and bandwidth',true), O('name','The domain name gets tired',false)],
        'Yes. Scaling is about handling real resource limits.',
        'Traffic pressure hits hardware and network limits.'),
      S('What does latency measure?',
        [O('delay','Delay between request and response',true), O('colour','How colourful the website is',false)],
        'Correct. Low latency feels instant; high latency feels slow.',
        'Latency is delay.')
    ]
  },
  {
    id: 'security-architecture',
    label: 'Security',
    title: 'Security and architecture lab',
    sub: 'Practice firewalls, encryption, social engineering, zero-days, and system design.',
    interactions: [
      S('A firewall mainly decides:',
        [O('allow','Which network traffic to allow or block',true), O('charge','How much battery the CPU has',false)],
        'Correct. A firewall is a traffic gatekeeper.',
        'Firewalls inspect and filter network traffic.'),
      S('Encryption protects a message by:',
        [O('scramble','Scrambling it so only the right key can read it',true), O('hide','Changing the font size to zero',false)],
        'Yes. Without the key, the data should look useless.',
        'Encryption is mathematical scrambling, not visual hiding.'),
      S('Public key cryptography works because:',
        [O('pair','One key can lock, while a different private key unlocks',true), O('same','Everyone shares the same secret key openly',false)],
        'Exactly. The public key can be shared; the private key is guarded.',
        'The private key must not be shared.'),
      { type: 'sorting', boxes: [
        { id: 'firewall', label: 'Firewall helps' },
        { id: 'encryption', label: 'Encryption helps' }
      ], items: [
        { id: 'port', label: 'Suspicious traffic hitting a port', box: 'firewall' },
        { id: 'wifi', label: 'Someone listening to public Wi-Fi packets', box: 'encryption' }
      ]},
      S('Social engineering attacks the:',
        [O('human','Human decision-maker',true), O('clock','Quartz clock inside the CPU',false)],
        'Correct. It tries to trick people, not beat the math directly.',
        'Social engineering targets people.'),
      S('A zero-day is dangerous because:',
        [O('unknown','The defender does not know the flaw exists yet',true), O('old','It is a very old password',false)],
        'Yes. Zero days means zero days to patch.',
        'A zero-day is an unknown/unpatched vulnerability.'),
      S('In stored-program architecture, software is stored as:',
        [O('data','Data in memory, just like other bits',true), O('cables','A new physical cable layout every time',false)],
        'Right. Programs become data the machine can fetch.',
        'Modern machines do not rewire cables for every program.'),
      S('A strong system is usually built from:',
        [O('layers','Several layers: code, network, identity, monitoring, backups',true), O('onewall','One perfect wall that never fails',false)],
        'Exactly. Real security and system design use layers.',
        'One perfect wall is brittle. Layers give resilience.')
    ]
  }
];

function cloneOption(option) {
  if (Array.isArray(option)) return [...option];
  if (option && typeof option === 'object') return { ...option };
  return option;
}

function cloneMatrixChoice(choice) {
  if (Array.isArray(choice)) return [...choice];
  if (choice && typeof choice === 'object') {
    return {
      ...choice,
      matrix: choice.matrix?.map((row) => [...row])
    };
  }
  return choice;
}

function cloneInteractions(interactions) {
  return interactions.map((interaction) => ({
    ...interaction,
    boxes: interaction.boxes?.map((box) => ({ ...box })),
    items: interaction.items?.map((item) => ({ ...item })),
    options: interaction.options?.map(cloneOption),
    choices: interaction.choices?.map(cloneMatrixChoice),
    matrices: interaction.matrices?.map(cloneMatrixChoice),
    target: Array.isArray(interaction.target) ? [...interaction.target] : interaction.target,
    labels: interaction.labels ? [...interaction.labels] : interaction.labels,
    matrix: interaction.matrix?.map((row) => [...row]),
    matrixA: interaction.matrixA?.map((row) => [...row]),
    matrixB: interaction.matrixB?.map((row) => [...row]),
    inputPoint: interaction.inputPoint ? [...interaction.inputPoint] : interaction.inputPoint
  }));
}

export function getComputerWorkshopModules() {
  return COMPUTER_WORKSHOP_MODULES.map(({ id, label, title, sub }) => ({ id, label, title, sub }));
}

export function getComputerWorkshopModule(id = 'binary-data') {
  const module = COMPUTER_WORKSHOP_MODULES.find((item) => item.id === id) || COMPUTER_WORKSHOP_MODULES[0];
  return {
    ...module,
    interactions: cloneInteractions(module.interactions)
  };
}

export function getBitWorkshop(checkpointIndex) {
  const keys = Object.keys(BIT_WORKSHOPS);
  if (checkpointIndex < keys.length) {
    return BIT_WORKSHOPS[keys[checkpointIndex]];
  }
  return null;
}

export function getBitDataWorkshop() {
  return getComputerWorkshopModule('binary-data').interactions;
}

export const PHYSICS_UNITS_WORKSHOP = [
  { type: 'sorting', boxes: [
    { id: 'base', label: 'Base unit' },
    { id: 'derived', label: 'Derived unit' }
  ], items: [
    { id: 'meter', label: 'Meter', box: 'base' },
    { id: 'second', label: 'Second', box: 'base' },
    { id: 'speed', label: 'Meter per second', box: 'derived' },
    { id: 'newton', label: 'Newton', box: 'derived' }
  ]},
  S('A number without a unit says very little in physics. A measurement needs:',
    [O('valueunit','A value and a unit',true), O('name','Only a famous scientist name',false)],
    'Correct. 10 is incomplete; 10 meters, 10 seconds, and 10 kilograms mean different things.',
    'Not quite. Physics needs both the number and what kind of thing was measured.'),
  {
    type: 'unitcheck',
    prompt: 'Cancel the units. What does speed multiplied by time become?',
    expression: '(m/s) x s',
    target: 'A car moves at speed for a certain time.',
    options: [
      { id: 'm', label: 'm', note: 'distance' },
      { id: 's', label: 's', note: 'time' },
      { id: 'kg', label: 'kg', note: 'mass' }
    ],
    correctOption: 'm',
    correctFeedback: 'Yes. The seconds cancel, leaving meters. That is distance.',
    incorrectFeedback: 'Cancel s in the denominator with s in the multiplier. The unit left behind is meters.'
  },
  {
    type: 'unitcheck',
    prompt: 'Check the equation before using numbers. What unit does force have?',
    expression: 'kg x m/s²',
    target: 'Newton’s second law: F = ma',
    options: [
      { id: 'n', label: 'N', note: 'newton' },
      { id: 'j', label: 'J', note: 'joule' },
      { id: 'w', label: 'W', note: 'watt' }
    ],
    correctOption: 'n',
    correctFeedback: 'Locked. A newton is kg x m/s² wearing a shorter name.',
    incorrectFeedback: 'Force is mass times acceleration: kg x m/s². That derived unit is called a newton.'
  },
  S('A calculation is supposed to find distance, but the answer comes out in kilograms. What should happen next?',
    [O('stop','Stop and check the work',true), O('accept','Accept it if the number looks nice',false)],
    'Exactly. Units act like a built-in lie detector.',
    'Distance cannot come out in kilograms. The unit mismatch is a warning sign.'),
  {
    type: 'unitcheck',
    prompt: 'Which result has the dimensions of energy?',
    expression: 'force x distance',
    target: 'Work done = force applied across a distance.',
    options: [
      { id: 'j', label: 'N x m = J', note: 'joule' },
      { id: 'pa', label: 'N/m² = Pa', note: 'pressure' },
      { id: 'hz', label: '1/s = Hz', note: 'frequency' }
    ],
    correctOption: 'j',
    correctFeedback: 'Correct. Work and energy use joules: force times distance.',
    incorrectFeedback: 'Energy appears when a force acts across a distance. That gives N x m, called a joule.'
  },
  { type: 'sorting', boxes: [
    { id: 'scalar', label: 'Scalar' },
    { id: 'vector', label: 'Vector' }
  ], items: [
    { id: 'mass', label: '5 kg', box: 'scalar' },
    { id: 'temp', label: '20 C', box: 'scalar' },
    { id: 'velocity', label: '12 m/s east', box: 'vector' },
    { id: 'force', label: '30 N downward', box: 'vector' }
  ]},
  S('The prefix kilo means:',
    [O('thousand','Multiply by 1000',true), O('newunit','A completely new base unit',false)],
    'Yes. Kilo changes the scale, not the kind of quantity.',
    'Kilo is a prefix. It means one thousand of the base unit.'),
  {
    type: 'unitcheck',
    prompt: 'A wave has frequency measured in hertz. What is a hertz underneath?',
    expression: '1/s',
    target: 'Frequency counts how many cycles happen each second.',
    options: [
      { id: 'hz', label: 'Hz', note: 'per second' },
      { id: 'n', label: 'N', note: 'force' },
      { id: 'm', label: 'm', note: 'distance' }
    ],
    correctOption: 'hz',
    correctFeedback: 'Correct. Hertz means per second: cycles each second.',
    incorrectFeedback: 'Frequency counts repetitions per second, so the hidden unit is 1/s, called hertz.'
  },
  S('Why do dimensions catch mistakes before the final number is checked?',
    [O('meaning','They track the physical meaning of each quantity',true), O('font','They make the equation look more official',false)],
    'Exactly. Units carry meaning through the calculation.',
    'Not quite. Dimensions are not decoration; they track what kind of physical thing the equation produces.')
];

export const PHYSICS_CORE_WORKSHOP = [
  { type: 'sorting', boxes: [
    { id: 'base', label: 'Base unit' },
    { id: 'derived', label: 'Built from other units' }
  ], items: [
    { id: 'meter', label: 'Meter', box: 'base' },
    { id: 'second', label: 'Second', box: 'base' },
    { id: 'speed', label: 'Meters per second', box: 'derived' },
    { id: 'newton', label: 'Newton', box: 'derived' }
  ]},
  {
    type: 'forcebalance',
    prompt: 'Make the cart stay still. Equal pushes cancel each other.',
    target: 'balanced',
    startLeft: 1,
    startRight: 3,
    correctFeedback: 'Locked. Equal force on both sides gives zero net force, so the cart does not accelerate.',
    incorrectFeedback: 'The pushes need to match. If one side is stronger, the cart accelerates that way.'
  },
  S('A skater is already gliding forward on smooth ice. No one pushes. What keeps changing?',
    [O('nothing','Nothing; the motion continues steadily',true), O('speed','The speed increases by itself',false)],
    'Exactly. Without a net force, motion does not need to keep being fed. It keeps going steadily.',
    'Not quite. A steady glide can continue without a new push. A net force is needed to change the motion.'),
  {
    type: 'forcebalance',
    prompt: 'Now make the cart accelerate to the right.',
    target: 'right',
    startLeft: 2,
    startRight: 2,
    correctFeedback: 'Yes. A stronger right-side push makes the net force point right.',
    incorrectFeedback: 'The right push must be stronger than the left push.'
  },
  S('Two identical pushes act on two carts. One cart is empty; one is loaded with bricks. Which cart accelerates more?',
    [O('empty','The empty cart',true), O('loaded','The loaded cart',false)],
    'Correct. The same force changes lighter mass more easily.',
    'Not quite. More mass resists acceleration. The empty cart responds more.'),
  {
    type: 'wavetuner',
    prompt: 'Tune the wave: make it tall and tightly packed.',
    targetAmplitude: 4,
    targetFrequency: 4,
    correctFeedback: 'Good. Taller means higher amplitude. More packed means higher frequency.',
    incorrectFeedback: 'Match both controls: height 4 and crowding 4.'
  },
  S('A ball rolls down a ramp. Stored height energy turns mostly into what?',
    [O('motion','Motion energy',true), O('mass','Extra mass',false)],
    'Exactly. The ball is not gaining mass; stored energy is turning into motion.',
    'Not quite. The ball keeps the same mass. Its stored height energy becomes motion.'),
  S('A student can explain the answer without using the app hints. What does that usually mean?',
    [O('grasped','They have grasped the idea',true), O('lucky','They only got lucky',false)],
    'Yes. Being able to explain the rule is a stronger sign than tapping the right option once.',
    'Not quite. A clear explanation is a good sign that the idea is becoming usable.')
];

export const PHYSICS_THERMO_WORKSHOP = [
  S('A tiny spark is very hot. A warm bathtub has a lower temperature. Which one can usually transfer more total heat?',
    [O('bath','The bathtub',true), O('spark','The spark',false)],
    'Correct. Temperature is average particle energy; total heat transfer also depends on how much matter is involved.',
    'Not quite. The spark is hotter, but it has very little mass. The bath has far more thermal energy available.'),
  { type: 'sorting', boxes: [
    { id: 'temperature', label: 'Temperature' },
    { id: 'heat', label: 'Heat' }
  ], items: [
    { id: 'average', label: 'Average particle motion', box: 'temperature' },
    { id: 'kelvin', label: 'Measured in kelvin', box: 'temperature' },
    { id: 'transfer', label: 'Energy transferred', box: 'heat' },
    { id: 'joule', label: 'Measured in joules', box: 'heat' }
  ]},
  {
    type: 'thermolab',
    mode: 'mix',
    prompt: 'A warm and cool sample are mixed in an insulated cup. Tune the final temperature to the balance point.',
    min: 20,
    max: 80,
    step: 1,
    start: 38,
    target: 50,
    tolerance: 2,
    correctFeedback: 'Balanced. In an insulated mix, heat lost by the warmer sample is gained by the cooler one.',
    incorrectFeedback: 'Move toward the temperature where neither side still has spare heat to give. The balance point here is about 50 C.'
  },
  {
    type: 'unitcheck',
    prompt: 'Before calculating, check the equation. What unit should Q have in Q = mcDeltaT?',
    expression: 'kg x J/(kg K) x K',
    target: 'Heat transferred by changing temperature.',
    options: [
      { id: 'j', label: 'J', note: 'joule' },
      { id: 'k', label: 'K', note: 'kelvin' },
      { id: 'kg', label: 'kg', note: 'mass' }
    ],
    correctOption: 'j',
    correctFeedback: 'Yes. kg and K cancel, leaving joules: heat is energy.',
    incorrectFeedback: 'Cancel kg with kg and K with K. The unit left behind is J.'
  },
  {
    type: 'thermolab',
    mode: 'phase',
    prompt: 'Heat keeps entering, but the temperature is not rising. Put the marker on the melting plateau.',
    min: 0,
    max: 4,
    step: 1,
    start: 0,
    target: 1,
    tolerance: 0,
    correctFeedback: 'Exactly. During melting, added energy breaks structure instead of raising temperature.',
    incorrectFeedback: 'A plateau is the flat part of the heating curve. Melting is the first flat section.'
  },
  S('During boiling, water stays at about 100 C while heat is still being added. Where is the energy going?',
    [O('bonds','Separating molecules into gas',true), O('thermometer','Making the thermometer ignore heat',false)],
    'Right. The energy is latent heat, used to change state rather than raise temperature.',
    'Not quite. The thermometer is working. The energy is going into the phase change.'),
  {
    type: 'thermolab',
    mode: 'piston',
    prompt: 'Boyle law challenge: compress the gas until the pressure doubles from 1.0 atm to 2.0 atm.',
    min: 2,
    max: 10,
    step: 0.5,
    start: 10,
    target: 2,
    tolerance: 0.1,
    correctFeedback: 'Locked. Halving the volume doubles the pressure when temperature stays fixed.',
    incorrectFeedback: 'For this setup, pressure is 10 divided by volume. A 2.0 atm target needs 5 L.'
  },
  { type: 'sorting', boxes: [
    { id: 'fixedT', label: 'Temperature fixed' },
    { id: 'fixedP', label: 'Pressure fixed' },
    { id: 'fixedV', label: 'Volume fixed' }
  ], items: [
    { id: 'boyle', label: 'Boyle law', box: 'fixedT' },
    { id: 'charles', label: 'Charles law', box: 'fixedP' },
    { id: 'pressure', label: 'Pressure law', box: 'fixedV' }
  ]},
  {
    type: 'unitcheck',
    prompt: 'The ideal gas equation is PV = nRT. Which variable must use an absolute temperature scale?',
    expression: 'PV = nRT',
    target: 'Gas law calculations.',
    options: [
      { id: 't', label: 'T in kelvin', note: 'absolute temperature' },
      { id: 'c', label: 'T in Celsius', note: 'daily temperature scale' },
      { id: 'f', label: 'T in Fahrenheit', note: 'daily temperature scale' }
    ],
    correctOption: 't',
    correctFeedback: 'Correct. Gas laws use kelvin because the scale starts at absolute zero.',
    incorrectFeedback: 'Use kelvin. Celsius can make ratios and gas-law results physically meaningless.'
  },
  {
    type: 'thermolab',
    mode: 'engine',
    prompt: 'Carnot challenge: the cold reservoir is fixed at 300 K. Raise the hot reservoir until the maximum efficiency reaches 50%.',
    min: 350,
    max: 900,
    step: 10,
    start: 450,
    target: 50,
    tolerance: 2,
    correctFeedback: 'Yes. With Tc = 300 K and Th near 600 K, the theoretical ceiling is about 50%.',
    incorrectFeedback: 'Efficiency rises when the hot reservoir gets hotter compared with the cold one. Aim near 600 K.'
  },
  S('A real engine cannot turn every joule of heat into useful work. What must always happen?',
    [O('waste','Some heat leaves to a colder place',true), O('perfect','The engine eventually becomes 100% efficient',false)],
    'Exactly. A heat engine needs a temperature difference and always rejects waste heat.',
    'Not quite. The second law blocks perfect conversion of heat into work. Some heat must be dumped.'),
  { type: 'sorting', boxes: [
    { id: 'spreads', label: 'Entropy increases' },
    { id: 'unlikely', label: 'Needs outside work' }
  ], items: [
    { id: 'perfume', label: 'Perfume spreads through a room', box: 'spreads' },
    { id: 'coffee', label: 'Hot coffee cools on a desk', box: 'spreads' },
    { id: 'unmix', label: 'Mixed dye unmixes itself', box: 'unlikely' },
    { id: 'reheat', label: 'Cold tea reheats itself', box: 'unlikely' }
  ]}
];

export const PHYSICS_WORKSHOP_MODULES = [
  {
    id: 'units-dimensions',
    label: 'Units',
    title: 'Units and dimensions lab',
    sub: 'Use units as a physics lie detector before trusting the numbers.',
    pathId: 'PHY_UNITS',
    interactions: PHYSICS_UNITS_WORKSHOP
  },
  {
    id: 'forces-waves',
    label: 'Forces',
    title: 'Forces, waves, and energy',
    sub: 'Balance pushes, tune waves, and read motion.',
    pathId: 'PHYS_001',
    interactions: PHYSICS_CORE_WORKSHOP
  },
  {
    id: 'thermodynamics',
    label: 'Thermo',
    title: 'Heat, gas, and engines',
    sub: 'Mix heat, read phase changes, compress gas, and tune an engine.',
    pathId: 'PHY_THERMO',
    interactions: PHYSICS_THERMO_WORKSHOP
  }
];

export function getPhysicsWorkshopModules() {
  return PHYSICS_WORKSHOP_MODULES.map(({ id, label, title, sub, pathId }) => ({ id, label, title, sub, pathId }));
}

export function getPhysicsWorkshopModule(id = 'units-dimensions') {
  const module = PHYSICS_WORKSHOP_MODULES.find((item) => item.id === id) || PHYSICS_WORKSHOP_MODULES[0];
  return {
    ...module,
    interactions: cloneInteractions(module.interactions)
  };
}

export function getPhysicsCoreWorkshop() {
  return getPhysicsWorkshopModule('units-dimensions').interactions;
}

export const CHEMISTRY_CORE_WORKSHOP = [
  {
    type: 'atombuilder',
    prompt: 'Build neutral oxygen. Protons set the element; electrons set the charge.',
    targetName: 'Oxygen',
    targetProtons: 8,
    targetNeutrons: 8,
    targetElectrons: 8,
    correctFeedback: 'Clean build. Eight protons makes oxygen, and eight electrons keeps it neutral.',
    incorrectFeedback: 'Oxygen needs 8 protons. Neutral oxygen also needs 8 electrons.'
  },
  S('An atom has 6 protons. A neutron is added. What changes?',
    [O('mass','Its mass changes, but it stays carbon',true), O('element','It becomes a new element',false)],
    'Exactly. Neutrons change mass, not element identity.',
    'Not quite. Element identity is set by protons. Neutrons make isotopes.'),
  {
    type: 'atombuilder',
    prompt: 'Make a positive lithium ion. Same element, one electron missing.',
    targetName: 'Lithium ion',
    targetProtons: 3,
    targetNeutrons: 4,
    targetElectrons: 2,
    correctFeedback: 'Yes. Three protons still means lithium. Two electrons leaves a +1 charge.',
    incorrectFeedback: 'Keep lithium at 3 protons, then remove one electron so the charge becomes positive.'
  },
  { type: 'sorting', boxes: [
    { id: 'identity', label: 'Changes element identity' },
    { id: 'charge', label: 'Changes charge' },
    { id: 'mass', label: 'Changes isotope mass' }
  ], items: [
    { id: 'protons', label: 'Add or remove protons', box: 'identity' },
    { id: 'electrons', label: 'Add or remove electrons', box: 'charge' },
    { id: 'neutrons', label: 'Add or remove neutrons', box: 'mass' }
  ]},
  {
    type: 'moleculebuilder',
    prompt: 'Build water from the formula H2O.',
    targetFormula: 'H2O',
    targetAtoms: { H: 2, O: 1 },
    correctFeedback: 'Correct. H2O means two hydrogen atoms and one oxygen atom.',
    incorrectFeedback: 'Read the small number as a count. H2O needs 2 H and 1 O.'
  },
  {
    type: 'moleculebuilder',
    prompt: 'Build carbon dioxide from the formula CO2.',
    targetFormula: 'CO2',
    targetAtoms: { C: 1, O: 2 },
    correctFeedback: 'Correct. CO2 means one carbon atom with two oxygen atoms.',
    incorrectFeedback: 'CO2 needs 1 C and 2 O. The 2 only belongs to oxygen.'
  },
  S('A molecule behaves differently from the atoms it contains. What is the main reason?',
    [O('bonds','The atoms are bonded into a new structure',true), O('heavier','The atoms simply became heavier',false)],
    'Exactly. Bonds and structure create new behavior.',
    'Not quite. The same atoms can behave differently once bonds arrange them into a molecule.'),
  S('A learner can look at H2O and immediately say "two hydrogens, one oxygen." What has clicked?',
    [O('formula','They can read a chemical formula as atom counts',true), O('mass','They know the exact mass of the sample',false)],
    'Yes. That is real formula fluency: symbols become counts, not decoration.',
    'Not quite. Formula fluency means reading the symbols and subscripts as atom counts.')
];

export function getChemistryCoreWorkshop() {
  return CHEMISTRY_CORE_WORKSHOP;
}

export const MATHS_EXP_LOGS_WORKSHOP = [
  S('What does 2⁵ actually mean?',
    [O('repeat','2 multiplied by itself 5 times',true), O('times','2 multiplied by 5',false), O('add','2 added 5 times',false)],
    'Correct. The exponent counts repeated multiplication.',
    'Not quite. 2⁵ means five 2s multiplied together.'),
  { type: 'sorting', boxes: [
    { id: 'growth', label: 'Exponential growth' },
    { id: 'linear', label: 'Linear growth' }
  ], items: [
    { id: 'double', label: '2, 4, 8, 16', box: 'growth' },
    { id: 'add3', label: '3, 6, 9, 12', box: 'linear' },
    { id: 'interest', label: 'Compound interest', box: 'growth' },
    { id: 'steps', label: 'Walking 5 meters each second', box: 'linear' }
  ]},
  {
    type: 'pixiscene',
    mode: 'growth',
    scene: 'exponential',
    prompt: 'The bars keep doubling. What kind of pattern is the animation showing?',
    options: [
      { id: 'exponential', label: 'Exponential growth', note: 'A repeated multiplier' },
      { id: 'linear', label: 'Linear growth', note: 'A fixed amount added each step' },
      { id: 'decay', label: 'Exponential decay', note: 'A repeated fraction kept each step' }
    ],
    correctOption: 'exponential',
    correctFeedback: 'Correct. Each step multiplies the previous amount, so the rise speeds up.',
    incorrectFeedback: 'Watch the spacing between the bars. The change is multiplying, not adding.'
  },
  S('Same base, multiplied powers: 3² x 3⁴ becomes:',
    [O('six','3⁶',true), O('eight','3⁸',false), O('two','3²',false)],
    'Yes. Two 3s plus four more 3s gives six 3s.',
    'When the base matches, multiplication adds the exponents.'),
  S('What does 5⁻² mean?',
    [O('reciprocal','1 / 5²',true), O('negative','-25',false), O('zero','0',false)],
    'Right. A negative exponent means reciprocal, not a negative answer.',
    'Negative exponents move the power under 1.'),
  S('Which expression means square root of x?',
    [O('half','x^(1/2)',true), O('two','x²',false), O('minus','x⁻¹',false)],
    'Correct. A half power is a square root.',
    'The denominator of the fractional exponent tells the root.'),
  S('A medicine halves every hour. What kind of pattern is that?',
    [O('decay','Exponential decay',true), O('linear','Linear growth',false), O('random','Random change',false)],
    'Exactly. It keeps a fixed fraction each step.',
    'Halving repeatedly is exponential decay.'),
  S('A logarithm asks:',
    [O('power','What power made this number?',true), O('sum','What two numbers add to this?',false), O('shape','What shape is the graph?',false)],
    'Yes. Logs are exponents read backward.',
    'A logarithm asks for the hidden exponent.'),
  S('If 10⁴ = 10000, then log10(10000) equals:',
    [O('four','4',true), O('ten','10',false), O('thousand','1000',false)],
    'Correct. The log returns the power.',
    'The answer is the exponent needed to make 10000 from base 10.'),
  { type: 'sorting', boxes: [
    { id: 'exp', label: 'Exponent question' },
    { id: 'log', label: 'Log question' }
  ], items: [
    { id: 'two8', label: '2⁸ = ?', box: 'exp' },
    { id: 'log100', label: 'log10(100) = ?', box: 'log' },
    { id: 'e3', label: 'e³ = ?', box: 'exp' },
    { id: 'lnx', label: 'ln(x) = ?', box: 'log' }
  ]},
  S('Why are logs useful when the unknown is in the exponent?',
    [O('undo','They undo exponentials',true), O('guess','They let us guess faster',false)],
    'Exactly. Logs pull the exponent back into reach.',
    'Logs are inverse functions for exponentials.')
];

export function getMathsExpLogsWorkshop() {
  return cloneInteractions(MATHS_EXP_LOGS_WORKSHOP);
}

/** Baby-step Functions practice — mirrors BBs 1219–1228 in order. */
export const MATHS_FUNCTIONS_FOUNDATIONS_WORKSHOP = [
  S('A function is best thought of as:',
    [O('rule','A reliable input-output rule',true), O('random','A random answer generator',false), O('shape','Only a curved graph',false)],
    'Correct. A function takes an input and gives one reliable output.',
    'Not quite. The important idea is reliability: each allowed input has one output.'),
  { type: 'sorting', boxes: [
    { id: 'function', label: 'Function' },
    { id: 'broken', label: 'Not a function' }
  ], items: [
    { id: 'double', label: 'n goes to 2n', box: 'function' },
    { id: 'plus3', label: 'n goes to n + 3', box: 'function' },
    { id: 'split2', label: '2 goes to 5 and 9', box: 'broken' },
    { id: 'coin', label: 'n goes to heads or tails', box: 'broken' }
  ]},
  S('Button A1 drops cola today and chips tomorrow. Same button, two results. Is this a function?',
    [O('no','No — one input gave two outputs',true), O('yes','Yes — machines can change their mind',false)],
    'Correct. Same input must always produce the same output.',
    'A function is predictable. One input cannot split into two different outputs.'),
  S('If f(x) = 2x + 1, what is f(4)?',
    [O('9','9',true), O('8','8',false), O('7','7',false)],
    'Yes. Put 4 into the rule: 2 × 4 + 1 = 9.',
    'Close, but remember the +1 after doubling the input.'),
  S('What does the notation g(0) ask you to do when g(x) = x + 3?',
    [O('feed','Feed 0 into the rule; the output is 3',true), O('times','Multiply g by 0',false), O('three','Always answer 0',false)],
    'Right. The number in the brackets is the input.',
    'g(0) means put 0 into g. Applying x + 3 gives 3.'),
  S('A domain tells you:',
    [O('inputs','Which inputs are allowed',true), O('outputs','Only the final outputs',false), O('slope','Only whether the graph is steep',false)],
    'Exactly. The domain is the safe input set for the function.',
    'Not quite. Domain is about allowed inputs. Range is about possible outputs.'),
  S('A square machine only accepts whole numbers 0, 1, 2. The outputs are 0, 1, 4. What is the range for those inputs?',
    [O('out','0, 1, 4',true), O('in','0, 1, 2',false), O('all','All whole numbers',false)],
    'Yes. Range is what actually comes out for the allowed inputs.',
    'Domain was 0, 1, 2. Squaring them gives the range 0, 1, 4.'),
  S('A graph fails the vertical line test when:',
    [O('two','One x-value has two y-values',true), O('steep','The graph is very steep',false), O('negative','The graph goes below zero',false)],
    'Correct. One input cannot produce two outputs.',
    'Not quite. The test is about whether one input has more than one output.'),
  { type: 'sorting', boxes: [
    { id: 'linear', label: 'Linear' },
    { id: 'exponential', label: 'Exponential' },
    { id: 'quadratic', label: 'Quadratic' }
  ], items: [
    { id: 'add', label: 'Adds the same amount each step', box: 'linear' },
    { id: 'multiply', label: 'Multiplies by the same factor each step', box: 'exponential' },
    { id: 'u', label: 'Makes a U-shaped curve', box: 'quadratic' },
    { id: 'seqL', label: 'Outputs: 3, 5, 7, 9', box: 'linear' },
    { id: 'seqE', label: 'Outputs: 1, 2, 4, 8', box: 'exponential' },
    { id: 'seqQ', label: 'Outputs: 0, 1, 4, 9', box: 'quadratic' }
  ]},
  S('For f(x) = 3x, the slope stays the same everywhere. What kind of function is this?',
    [O('lin','Linear',true), O('exp','Exponential',false), O('quad','Quadratic',false)],
    'Correct. Constant rate of change means linear.',
    'A steady add (or steady multiply-by-x with fixed coefficient as mx) draws a straight line.'),
  S('If g(x) = x + 5, the inverse machine does what?',
    [O('minus','Subtracts 5',true), O('plus','Adds 5 again',false), O('square','Squares the output',false)],
    'Right. The inverse undoes the rule.',
    'Not quite. To reverse adding 5, subtract 5.'),
  S('Why does f(x) = x² on all real numbers fail to have a single inverse?',
    [O('two','Two inputs (2 and −2) share the output 4',true), O('steep','The graph is too steep',false), O('zero','It hits zero',false)],
    'Correct. One output must point back to exactly one input for a clean inverse.',
    'Both 2 and −2 square to 4, so you cannot uniquely walk backward from 4.'),
  S('If f(x) = 2x and g(x) = x + 3, what is f(g(4))?',
    [O('14','14',true), O('11','11',false), O('10','10',false)],
    'Yes. First g(4) = 7, then f(7) = 14.',
    'Composition runs the inside function first, then feeds that output into the next.'),
  S('With the same f and g, what is g(f(4))?',
    [O('11','11',true), O('14','14',false), O('8','8',false)],
    'Yes. f(4) = 8, then g(8) = 11. Order matters.',
    'Run f first this time: 2 × 4 = 8, then add 3 to get 11.')
];

export const PHYSICS_ELECTRICITY_WORKSHOP = [
  { type: 'sorting', boxes: [
    { id: 'charge', label: 'Charge' },
    { id: 'current', label: 'Current' },
    { id: 'voltage', label: 'Voltage' }
  ], items: [
    { id: 'coulomb', label: 'Measured in coulombs', box: 'charge' },
    { id: 'amp', label: 'Charge flow each second', box: 'current' },
    { id: 'energy', label: 'Energy per charge', box: 'voltage' }
  ]},
  S('Current is best described as:',
    [O('flow','Charge passing a point each second',true), O('energy','Energy stored inside the wire',false)],
    'Correct. Current is a rate of charge flow.',
    'Current is about moving charge, not stored energy.'),
  {
    type: 'unitcheck',
    prompt: 'Ohm law check: if V = I x R, what unit does voltage use?',
    expression: 'A x Ohm',
    target: 'Voltage from current and resistance.',
    options: [
      { id: 'v', label: 'V', note: 'volt' },
      { id: 'w', label: 'W', note: 'watt' },
      { id: 'c', label: 'C', note: 'coulomb' }
    ],
    correctOption: 'v',
    correctFeedback: 'Yes. Ampere times ohm gives volts.',
    incorrectFeedback: 'Ohm law is V = IR, so the result is voltage in volts.'
  },
  S('In a series circuit, what is the same through every component?',
    [O('current','Current',true), O('voltage','Voltage',false), O('resistance','Resistance',false)],
    'Right. One path means the same current through each part.',
    'Series circuits share current, while voltage is divided.'),
  S('In a parallel circuit, what is the same across every branch?',
    [O('voltage','Voltage',true), O('current','Current',false), O('charge','Number of electrons',false)],
    'Correct. Parallel branches sit across the same two points.',
    'Parallel branches share voltage. Current splits between them.'),
  {
    type: 'pixiscene',
    mode: 'circuit',
    scene: 'parallel',
    prompt: 'The moving charges split into two branches. Which circuit layout is shown?',
    options: [
      { id: 'parallel', label: 'Parallel circuit', note: 'Branches share the same two connection points' },
      { id: 'series', label: 'Series circuit', note: 'One path through every component' }
    ],
    correctOption: 'parallel',
    correctFeedback: 'Correct. A split path means parallel branches.',
    incorrectFeedback: 'The key clue is the split. Series has one path; parallel has branches.'
  },
  { type: 'sorting', boxes: [
    { id: 'series', label: 'Series' },
    { id: 'parallel', label: 'Parallel' }
  ], items: [
    { id: 'onepath', label: 'One path', box: 'series' },
    { id: 'split', label: 'Current splits', box: 'parallel' },
    { id: 'samei', label: 'Same current everywhere', box: 'series' },
    { id: 'samev', label: 'Same voltage across branches', box: 'parallel' }
  ]},
  {
    type: 'unitcheck',
    prompt: 'Electrical power: what does current times voltage become?',
    expression: 'A x V',
    target: 'Power transferred by a circuit component.',
    options: [
      { id: 'w', label: 'W', note: 'watt' },
      { id: 'n', label: 'N', note: 'newton' },
      { id: 'hz', label: 'Hz', note: 'hertz' }
    ],
    correctOption: 'w',
    correctFeedback: 'Correct. P = IV, and power is measured in watts.',
    incorrectFeedback: 'Current times voltage gives electrical power, measured in watts.'
  },
  S('Kirchhoff current rule says that at a junction:',
    [O('conserve','Current in equals current out',true), O('vanish','Some charge disappears',false)],
    'Exactly. Charge is conserved at the junction.',
    'Charge does not vanish. What flows in must flow out.'),
  S('A capacitor mainly stores energy by:',
    [O('separating','Separating positive and negative charge',true), O('creating','Creating brand new charge',false)],
    'Right. It separates charge; it does not create charge.',
    'A capacitor stores energy in separated charge and the electric field between plates.'),
  S('A bulb gets brighter because more electrical energy is transferred each second. Which quantity describes that rate?',
    [O('power','Power',true), O('mass','Mass',false), O('area','Area',false)],
    'Correct. Power is energy transferred per second.',
    'Brightness is tied to power, the rate of energy transfer.')
];

export function getPhysicsElectricityWorkshop() {
  return cloneInteractions(PHYSICS_ELECTRICITY_WORKSHOP);
}

export const CHEMISTRY_STRUCTURE_WORKSHOP = [
  {
    type: 'atombuilder',
    prompt: 'Build carbon-14. Same element as carbon-12, but with extra neutrons.',
    targetName: 'Carbon-14',
    targetProtons: 6,
    targetNeutrons: 8,
    targetElectrons: 6,
    correctFeedback: 'Correct. Six protons makes carbon. Eight neutrons makes this isotope carbon-14.',
    incorrectFeedback: 'Keep protons at 6 for carbon. Carbon-14 has 8 neutrons and 6 electrons when neutral.'
  },
  S('What decides the identity of an element?',
    [O('protons','Number of protons',true), O('neutrons','Number of neutrons',false), O('shells','Number of shells',false)],
    'Exactly. Proton count names the element.',
    'Neutrons change isotope. Protons decide element identity.'),
  {
    type: 'atombuilder',
    prompt: 'Make a negative fluoride ion. Fluorine has gained one electron.',
    targetName: 'Fluoride ion',
    targetProtons: 9,
    targetNeutrons: 10,
    targetElectrons: 10,
    correctFeedback: 'Yes. Nine protons is fluorine; ten electrons gives a -1 ion.',
    incorrectFeedback: 'Fluorine needs 9 protons. A negative ion has one extra electron.'
  },
  { type: 'sorting', boxes: [
    { id: 'ionic', label: 'Ionic bonding' },
    { id: 'covalent', label: 'Covalent bonding' },
    { id: 'metallic', label: 'Metallic bonding' }
  ], items: [
    { id: 'transfer', label: 'Electrons transferred', box: 'ionic' },
    { id: 'share', label: 'Electron pairs shared', box: 'covalent' },
    { id: 'sea', label: 'Sea of mobile electrons', box: 'metallic' }
  ]},
  {
    type: 'pixiscene',
    mode: 'bond',
    scene: 'covalent',
    prompt: 'The two atoms keep a shared pair of electrons between them. Which bond is this?',
    options: [
      { id: 'covalent', label: 'Covalent bond', note: 'Atoms share electron pairs' },
      { id: 'ionic', label: 'Ionic bond', note: 'Electrons transfer from one atom to another' },
      { id: 'metallic', label: 'Metallic bond', note: 'Electrons move through a metal structure' }
    ],
    correctOption: 'covalent',
    correctFeedback: 'Correct. Shared electron pairs are the signature of covalent bonding.',
    incorrectFeedback: 'Look at where the electrons stay. Shared pairs point to covalent bonding.'
  },
  {
    type: 'moleculebuilder',
    prompt: 'Build methane from the formula CH4.',
    targetFormula: 'CH4',
    targetAtoms: { C: 1, H: 4 },
    correctFeedback: 'Correct. Methane has one carbon atom bonded to four hydrogen atoms.',
    incorrectFeedback: 'CH4 means 1 carbon and 4 hydrogen atoms.'
  },
  S('Why does molecular shape matter?',
    [O('fit','Shape affects how molecules fit, dissolve, and react',true), O('mass','Shape changes the number of protons',false)],
    'Correct. Shape controls interactions.',
    'Shape does not change proton count. It changes how the molecule behaves.'),
  S('Polarity means electrons are:',
    [O('uneven','Shared unevenly',true), O('gone','Destroyed during bonding',false), O('equal','Always shared equally',false)],
    'Right. Uneven sharing creates partial charges.',
    'Polarity comes from uneven electron sharing.'),
  S('A reaction mainly does what to atoms?',
    [O('rearrange','Rearranges them into new substances',true), O('erase','Erases atoms and starts again',false)],
    'Exactly. Atoms are conserved and rearranged.',
    'Chemical reactions rearrange atoms; they do not erase them.'),
  S('When balancing an equation, what can be changed?',
    [O('coeff','Coefficients in front of formulas',true), O('subscript','Subscripts inside formulas',false)],
    'Correct. Coefficients count whole particles.',
    'Changing subscripts changes the substance. Balance using coefficients.'),
  {
    type: 'moleculebuilder',
    prompt: 'Build carbon dioxide from the formula CO2.',
    targetFormula: 'CO2',
    targetAtoms: { C: 1, O: 2 },
    correctFeedback: 'Correct. CO2 means one carbon atom and two oxygen atoms.',
    incorrectFeedback: 'CO2 needs 1 carbon and 2 oxygen atoms.'
  }
];

export function getChemistryStructureWorkshop() {
  return cloneInteractions(CHEMISTRY_STRUCTURE_WORKSHOP);
}

export const MATHS_MATRICES_WORKSHOP = [
  {
    type: 'matrixcell',
    prompt: 'A matrix starts like a spreadsheet: rows, columns, cells. Tap the requested cell.',
    matrix: [[12, 5, 9], [3, 8, 14], [6, 1, 10]],
    targetRow: 2,
    targetCol: 3,
    correctFeedback: 'Correct. Row 2, column 3 holds 14. A matrix cell is just an address with a value.',
    incorrectFeedback: 'Find the row first, then move across to the column.'
  },
  {
    type: 'matrixlab',
    mode: 'fill',
    prompt: 'Replace the missing spreadsheet value. The blank is row 2, column 2.',
    matrix: [[12, 5, 9], [3, null, 14], [6, 1, 10]],
    blankRow: 2,
    blankCol: 2,
    options: [8, 5, 14, 1],
    correctValue: 8,
    correctFeedback: 'Correct. Row 2, column 2 is the centre cell, so the missing value is 8.',
    incorrectFeedback: 'Start with the row number first, then move across to the column.'
  },
  S('A spreadsheet cell like B7 has a fixed address. What is the matrix version of that idea?',
    [O('rowcol','Row and column position',true), O('total','The total of every number',false)],
    'Exactly. A matrix is a grid where position matters.',
    'Not quite. The address of an entry is its row and column position.'),
  {
    type: 'matrixcell',
    prompt: 'A small data table is also a matrix. Tap row 3, column 1.',
    matrix: [[70, 72], [68, 71], [75, 73]],
    targetRow: 3,
    targetCol: 1,
    correctFeedback: 'Yes. The cell is 75. Matrices can store measurements cleanly.',
    incorrectFeedback: 'Rows go across. Columns go down. Start at row 3, then column 1.'
  },
  S('Why are matrices useful for computers?',
    [O('grid','They store many related numbers in a fixed grid',true), O('words','They turn every number into a word',false)],
    'Right. A computer can loop through a matrix because every number has a predictable position.',
    'Not quite. Matrices are powerful because numbers sit in fixed, ordered positions.'),
  {
    type: 'matrixlab',
    mode: 'addability',
    prompt: 'Can these two matrices be added? Matrix addition needs the exact same shape.',
    matrixA: [[2, 4, 6], [1, 3, 5]],
    matrixB: [[9, 8, 7], [6, 5, 4]],
    choices: [
      { label: 'Yes: both are 2 x 3' },
      { label: 'No: the numbers are different' },
      { label: 'No: addition only works for square matrices' }
    ],
    correctChoice: 0,
    correctFeedback: 'Correct. The entries differ, but the shapes match: 2 rows and 3 columns in both.',
    incorrectFeedback: 'For addition, the shape matters first. These are both 2 x 3 matrices.'
  },
  {
    type: 'matrixlab',
    mode: 'addition',
    prompt: 'Add matching cells. Which result is A + B?',
    matrixA: [[1, 4], [2, 3]],
    matrixB: [[5, 1], [7, 2]],
    choices: [
      { label: 'Result A', matrix: [[6, 5], [9, 5]] },
      { label: 'Result B', matrix: [[5, 4], [14, 6]] },
      { label: 'Result C', matrix: [[6, 4], [7, 5]] },
      { label: 'Result D', matrix: [[1, 5], [2, 7]] }
    ],
    correctChoice: 0,
    correctFeedback: 'Yes. Each cell adds to the cell in the same position: 1+5, 4+1, 2+7, 3+2.',
    incorrectFeedback: 'Do not add rows as totals. Add cell to matching cell.'
  },
  {
    type: 'matrixlab',
    mode: 'identity',
    prompt: 'Identify the 2 x 2 identity matrix. It leaves every point unchanged.',
    matrices: [
      { label: 'A', matrix: [[1, 0], [0, 1]] },
      { label: 'B', matrix: [[0, 1], [1, 0]] },
      { label: 'C', matrix: [[1, 1], [0, 1]] },
      { label: 'D', matrix: [[2, 0], [0, 2]] }
    ],
    correctIndex: 0,
    correctFeedback: 'Correct. Ones on the main diagonal, zeros everywhere else: that is the identity matrix.',
    incorrectFeedback: 'The identity matrix has 1s from top-left to bottom-right and 0s everywhere else.'
  },
  {
    type: 'matrixlab',
    mode: 'fill',
    prompt: 'Complete the 3 x 3 identity matrix. What belongs in the missing corner of the diagonal?',
    matrix: [[1, 0, 0], [0, 1, 0], [0, 0, null]],
    blankRow: 3,
    blankCol: 3,
    options: [0, 1, -1, 3],
    correctValue: 1,
    correctFeedback: 'Correct. Every main diagonal entry in the identity matrix is 1.',
    incorrectFeedback: 'Follow the main diagonal from top-left to bottom-right. Identity keeps 1s there.'
  },
  {
    type: 'matrixtransform',
    prompt: 'This matrix doubles x and leaves y alone. Where does point (2, 3) land?',
    matrix: [[2, 0], [0, 1]],
    inputPoint: [2, 3],
    options: [[4, 3], [2, 6], [4, 6]],
    correctFeedback: 'Correct. The x value doubled from 2 to 4, while y stayed 3.',
    incorrectFeedback: 'This matrix changes x only: (2, 3) becomes (4, 3).'
  },
  {
    type: 'matrixtransform',
    prompt: 'This matrix flips x across the vertical axis. Where does point (3, 2) land?',
    matrix: [[-1, 0], [0, 1]],
    inputPoint: [3, 2],
    options: [[-3, 2], [3, -2], [-3, -2]],
    correctFeedback: 'Correct. The x sign flipped, so the point moved to the other side.',
    incorrectFeedback: 'Only x changes sign here. y stays the same.'
  },
  {
    type: 'matrixtransform',
    prompt: 'The identity matrix does nothing. Where does point (4, -2) land?',
    matrix: [[1, 0], [0, 1]],
    inputPoint: [4, -2],
    options: [[4, -2], [-4, 2], [2, 4]],
    correctFeedback: 'Correct. Identity means no change: the point comes out exactly as it went in.',
    incorrectFeedback: 'The identity matrix leaves both coordinates unchanged.'
  },
  {
    type: 'matrixlab',
    mode: 'identity',
    prompt: 'Which matrix swaps x and y? Test it on a point: (3, 8) would become (8, 3).',
    matrices: [
      { label: 'A', matrix: [[1, 0], [0, 1]] },
      { label: 'B', matrix: [[0, 1], [1, 0]] },
      { label: 'C', matrix: [[-1, 0], [0, 1]] },
      { label: 'D', matrix: [[2, 0], [0, 1]] }
    ],
    correctIndex: 1,
    correctFeedback: 'Correct. The off-diagonal 1s swap the two coordinates.',
    incorrectFeedback: 'A swap matrix sends x into the y position and y into the x position.'
  },
  S('What changed between the spreadsheet idea and the transformation idea?',
    [O('active','The grid stopped just storing numbers and started acting on a point',true), O('random','The numbers became random decoration',false)],
    'Exactly. A matrix can be a table of data, or it can be a machine that transforms space.',
    'Not quite. The same grid structure can store data or act as a transformation rule.'),
  S('A learner sees [[2,0],[0,1]] and says, "that stretches x." What has clicked?',
    [O('meaning','They can read the matrix as an action',true), O('memory','They memorised one symbol only',false)],
    'Yes. That is the real step: matrix notation becomes a visible action.',
    'Not quite. The goal is not memorising brackets. It is seeing the action encoded by the numbers.')
];

export function getMathsMatricesWorkshop() {
  return cloneInteractions(MATHS_MATRICES_WORKSHOP);
}

// ── Coordinate geometry (The Line) workshop — drag-based drills on a live plane ──

const CG_FIVE_POINTS_A = [
  { id: 'a', label: 'A', x: -3, y: 2 },
  { id: 'b', label: 'B', x: 2, y: 4 },
  { id: 'c', label: 'C', x: 4, y: -1 },
  { id: 'd', label: 'D', x: -2, y: -3 },
  { id: 'e', label: 'E', x: 0, y: 3 }
];

const CG_FIVE_POINTS_B = [
  { id: 'a', label: 'A', x: -4, y: 1 },
  { id: 'b', label: 'B', x: 1, y: 3 },
  { id: 'c', label: 'C', x: 3, y: -2 },
  { id: 'd', label: 'D', x: -1, y: -4 },
  { id: 'e', label: 'E', x: 0, y: 0 }
];

export const LINE_CORE_WORKSHOP = [
  {
    type: 'coordworkbook',
    mode: 'selectPoint',
    prompt: 'Five points are on the grid. Tap the point whose address is (-3, 2).',
    points: CG_FIVE_POINTS_A,
    targetCoordinate: { x: -3, y: 2 },
    correctFeedback: 'Correct. A is three left and two up, so its address is (-3, 2).',
    incorrectFeedback: 'Read across first, then up or down. The point at (-3, 2) is A.'
  },
  {
    type: 'coordworkbook',
    mode: 'quadrant',
    prompt: 'Tap a point in Quadrant IV. That means x is positive and y is negative.',
    points: CG_FIVE_POINTS_A,
    targetQuadrant: 'IV',
    correctFeedback: 'Correct. Quadrant IV is right of the y-axis and below the x-axis.',
    incorrectFeedback: 'Quadrant IV has positive x and negative y. Look for the point on the lower-right side.'
  },
  {
    type: 'coordworkbook',
    mode: 'readPoint',
    prompt: 'Read the address of point B. Use the steppers instead of typing.',
    points: CG_FIVE_POINTS_A,
    targetId: 'b',
    correctFeedback: 'Correct. B is at (2, 4): two across, four up.',
    incorrectFeedback: 'Point B is two units right and four units up, so its address is (2, 4).'
  },
  {
    type: 'coordworkbook',
    mode: 'movePoint',
    prompt: 'Move point C to the address (-1, 4). Tap the target square or drag the point.',
    points: CG_FIVE_POINTS_B,
    targetId: 'c',
    targetCoordinate: { x: -1, y: 4 },
    correctFeedback: 'Correct. You moved C to (-1, 4): left one, up four.',
    incorrectFeedback: 'C needs to land one unit left of the origin and four units above it.'
  },
  {
    type: 'coordworkbook',
    mode: 'translatePoint',
    prompt: 'Translate point A by (3, -2). Across changes by +3, height changes by -2.',
    points: CG_FIVE_POINTS_B,
    targetId: 'a',
    vector: { x: 3, y: -2 },
    correctFeedback: 'Correct. A moved three right and two down.',
    incorrectFeedback: 'Start from A and add the vector: x plus 3, y minus 2.'
  },
  {
    type: 'coordworkbook',
    mode: 'reflectPoint',
    prompt: 'Reflect point D across the x-axis. Only the y-coordinate changes sign.',
    points: CG_FIVE_POINTS_B,
    targetId: 'd',
    axis: 'x',
    correctFeedback: 'Correct. Reflection across the x-axis keeps x and flips y.',
    incorrectFeedback: 'Across the x-axis means keep x the same and change y to its opposite.'
  },
  {
    type: 'coordworkbook',
    mode: 'reflectPoint',
    prompt: 'Reflect point C across the y-axis. Only the x-coordinate changes sign.',
    points: CG_FIVE_POINTS_A,
    targetId: 'c',
    axis: 'y',
    correctFeedback: 'Correct. Reflection across the y-axis keeps y and flips x.',
    incorrectFeedback: 'Across the y-axis means keep y the same and change x to its opposite.'
  },
  {
    type: 'coorddrill', mode: 'plotPoint',
    prompt: 'Every point has an address: across, then up. Plot it.',
    targetX: 4, targetY: 3,
    correctFeedback: 'Correct. 4 across, then 3 up — that address is (4, 3).',
    incorrectFeedback: 'Across first, then up. Drag the point to 4 on x, 3 on y.'
  },
  S('You read a coordinate as (5, -2). Which number tells you how far up or down?',
    [O('second','The second number',true), O('first','The first number',false)],
    'Right. The first number is across, the second is up or down.',
    'Not quite. The first number is always across (x); the second is up/down (y).'),
  {
    type: 'coorddrill', mode: 'plotPoint',
    prompt: 'Negative coordinates work the same way, just in the other direction.',
    targetX: -3, targetY: -2,
    correctFeedback: 'Yes. Negative x is left, negative y is down.',
    incorrectFeedback: 'Negative means the opposite direction on that axis. Try left and down.'
  },
  {
    type: 'coorddrill', mode: 'buildLine',
    prompt: 'A line is a rule connecting x and y: y = mx + c. Match the dashed target line.',
    targetM: 2, targetC: -1,
    correctFeedback: 'Correct. Slope 2 means the line climbs 2 for every 1 across; -1 is where it crosses the y-axis.',
    incorrectFeedback: 'Slope controls the steepness, intercept controls where it crosses the y-axis. Adjust both.'
  },
  S('A line has a slope of 0. What does that mean?',
    [O('flat','It is perfectly flat/horizontal',true), O('vertical','It is perfectly vertical',false)],
    'Exactly. Zero slope means y never changes as x changes — a flat line.',
    'Not quite. A slope of 0 means no rise at all — the line is flat, not vertical.'),
  {
    type: 'coorddrill', mode: 'buildLine',
    prompt: 'A steeper line has a bigger slope. Match this one.',
    targetM: -3, targetC: 2,
    correctFeedback: 'Correct. Negative slope means the line falls as it moves right.',
    incorrectFeedback: 'Negative slope falls left-to-right. Push the slope below zero.'
  },
  {
    type: 'coorddrill', mode: 'distance',
    prompt: 'Distance between two points is just the straight line between them. Drag B to match.',
    fixedPoint: { x: -2, y: -2 }, targetDistance: 5, distanceTolerance: 0.4,
    correctFeedback: 'Correct. A 3-4-5 triangle hides inside that distance.',
    incorrectFeedback: 'Watch the live readout as you drag B — get it within range of the target.'
  },
  S('To find the distance between two points, what shape do you secretly build?',
    [O('triangle','A right-angled triangle',true), O('circle','A circle',false)],
    'Yes. The horizontal and vertical gaps become the two legs, and Pythagoras gives you the distance.',
    'Not quite. The two gaps (horizontal and vertical) form a right triangle — distance is its hypotenuse.'),
  {
    type: 'coorddrill', mode: 'midpoint',
    prompt: 'The midpoint sits exactly between two points. Drag M into place.',
    pointA: { x: -4, y: 1 }, pointB: { x: 2, y: 5 },
    correctFeedback: 'Correct. Average the x values, average the y values — that lands you exactly halfway.',
    incorrectFeedback: 'The midpoint is the average of both x-coordinates and both y-coordinates.'
  },
  S('Points A(0, 0) and B(6, 0) sit on the x-axis. Where is the midpoint?',
    [O('3,0','(3, 0)',true), O('6,0','(6, 0)',false)],
    'Right. Halfway across 0 to 6 is 3, and both y-values are already 0.',
    'Not quite. Average the x-coordinates: (0 + 6) / 2 = 3. The midpoint is (3, 0).'),
  {
    type: 'coorddrill', mode: 'distance',
    prompt: 'One more distance check — this time starting from the origin.',
    fixedPoint: { x: 0, y: 0 }, targetDistance: 5, distanceTolerance: 0.4,
    correctFeedback: 'Correct. That is another 3-4-5 right triangle, just anchored at the origin.',
    incorrectFeedback: 'Try B at (3, 4) or (4, 3) — both are exactly 5 units from the origin.'
  },
  S('A line climbs 4 units for every 2 units it moves right. What is its slope?',
    [O('2','2',true), O('4','4',false)],
    'Correct. Slope is rise over run: 4 over 2 simplifies to 2.',
    'Not quite. Slope is rise divided by run: 4 ÷ 2 = 2.')
];

export function getLineCoreWorkshop() {
  return LINE_CORE_WORKSHOP;
}

// ── Functions workshop — Function Machine (docs/FUNCTIONS-WORKSHOP-DESIGN.md) ──

export const MATHS_FUNCTIONS_WORKSHOP = [
  {
    type: 'functionmachine',
    prompt: 'Feed inputs, repair broken rules, graph outputs, reverse machines, and chain functions.'
  },
  S('A relation sends 4 to 10 on Monday and 4 to 12 on Tuesday. Is it a function?',
    [O('no', 'No — one input gave two outputs', true), O('yes', 'Yes — outputs are allowed to vary', false)],
    'Correct. A function must give the same output for the same input, every time.',
    'A function is reliable: input 4 must always produce the same output.'),
  S('Machine h uses h(x) = x - 4. What does h(10) mean?',
    [O('feed', 'Feed 10 into machine h: the output is 6', true), O('times', 'Multiply h by 10', false)],
    'Good. The number inside the brackets is the input; the rule turns it into the output.',
    'h(10) reads as "put 10 into machine h". Apply the rule: 10 - 4 = 6.'),
  { type: 'sorting',
    boxes: [
      { id: 'domain', label: 'Domain (inputs)' },
      { id: 'range', label: 'Range (outputs)' }
    ],
    items: [
      { id: 'safe', label: 'The list of numbers allowed in', box: 'domain' },
      { id: 'produced', label: 'The values the machine produces', box: 'range' },
      { id: 'x', label: 'The x in f(x)', box: 'domain' },
      { id: 'fx', label: 'The value of f(x)', box: 'range' }
    ] },
  S('A graph is scanned with a vertical line. At x = 3 the line crosses the curve twice. What does that mean?',
    [O('notfn', 'Not a function — input 3 has two outputs', true), O('fn', 'A function — twice is fine', false)],
    'Correct. If a vertical line hits twice, one input has split into two outputs.',
    'One x-position cannot give two y-values. The double hit breaks the function rule.'),
  { type: 'sorting',
    boxes: [
      { id: 'linear', label: 'Steady add (linear)' },
      { id: 'expo', label: 'Repeated multiply (exponential)' },
      { id: 'quad', label: 'Square rule (quadratic)' }
    ],
    items: [
      { id: 'l1', label: 'Outputs: 3, 5, 7, 9', box: 'linear' },
      { id: 'e1', label: 'Outputs: 2, 4, 8, 16', box: 'expo' },
      { id: 'q1', label: 'Outputs: 0, 1, 4, 9', box: 'quad' },
      { id: 'l2', label: 'x + 7', box: 'linear' },
      { id: 'e2', label: '3ˣ', box: 'expo' },
      { id: 'q2', label: 'x²', box: 'quad' }
    ] },
  S('Machine f multiplies by 4. The output tray shows 20. What was the input?',
    [O('five', '5 — reverse it by dividing by 4', true), O('eighty', '80 — reverse it by multiplying again', false)],
    'Correct. The inverse undoes the machine: divide 20 by 4 to walk back to 5.',
    'To undo "multiply by 4", divide by 4. The inverse walks the output back to the input.'),
  S('g(x) = x + 1 runs first, then f(x) = 2x. What is f(g(3))?',
    [O('eight', '8', true), O('seven', '7', false), O('six', '6', false)],
    'Correct. g turns 3 into 4, then f doubles it to 8. The inside machine runs first.',
    'Run g first: 3 + 1 = 4. Then feed 4 to f: 2 × 4 = 8.')
];

export function getMathsFunctionsBasicsWorkshop() {
  return cloneInteractions([...MATHS_FUNCTIONS_FOUNDATIONS_WORKSHOP]);
}

/** Everyday + maths: sort what is a function vs what is not. */
export const MATHS_FUNCTIONS_OR_NOT_WORKSHOP = [
  S('A function means: from each allowed input there is…',
    [O('one', 'Exactly one output', true), O('many', 'As many outputs as you like', false), O('zero', 'Sometimes no output is fine', false)],
    'Yes. One input, one arrow, one output. That is the non-negotiable.',
    'Every allowed input must get exactly one output — not zero, not two.'),
  { type: 'sorting', boxes: [
    { id: 'function', label: 'Function' },
    { id: 'not', label: 'Not a function' }
  ], items: [
    { id: 'birthday', label: 'Person → birthday', box: 'function' },
    { id: 'capital', label: 'Country → capital city', box: 'function' },
    { id: 'friend', label: 'Person → friend', box: 'not' },
    { id: 'synonym', label: 'Word → synonym', box: 'not' }
  ]},
  { type: 'sorting', boxes: [
    { id: 'function', label: 'Function' },
    { id: 'not', label: 'Not a function' }
  ], items: [
    { id: 'isbn', label: 'Book → ISBN', box: 'function' },
    { id: 'plate', label: 'Number plate → car', box: 'function' },
    { id: 'course', label: 'Student → course enrolled', box: 'not' },
    { id: 'restaurant', label: 'City → restaurant', box: 'not' }
  ]},
  { type: 'sorting', boxes: [
    { id: 'function', label: 'Function' },
    { id: 'not', label: 'Not a function' }
  ], items: [
    { id: 'letters', label: 'Word → number of letters', box: 'function' },
    { id: 'seat', label: 'Ticket seat code → one seat', box: 'function' },
    { id: 'actor', label: 'Movie → actor in it', box: 'not' },
    { id: 'search', label: 'Search query → webpage result', box: 'not' }
  ]},
  { type: 'sorting', boxes: [
    { id: 'function', label: 'Function' },
    { id: 'not', label: 'Not a function' }
  ], items: [
    { id: 'passport', label: 'Passport number → holder', box: 'function' },
    { id: 'barcode', label: 'Barcode → product', box: 'function' },
    { id: 'surname', label: 'Surname → person with that name', box: 'not' },
    { id: 'coin', label: 'Coin flip setup → heads or tails', box: 'not' }
  ]},
  { type: 'sorting', boxes: [
    { id: 'function', label: 'Function' },
    { id: 'not', label: 'Not a function' }
  ], items: [
    { id: 'double', label: 'x → 2x', box: 'function' },
    { id: 'square', label: 'x → x²', box: 'function' },
    { id: 'abs', label: 'x → |x|', box: 'function' },
    { id: 'pmroot', label: 'x → ±√x (both signs)', box: 'not' }
  ]},
  { type: 'sorting', boxes: [
    { id: 'function', label: 'Function' },
    { id: 'not', label: 'Not a function' }
  ], items: [
    { id: 'proot', label: 'x → √x (positive root only, x ≥ 0)', box: 'function' },
    { id: 'plus3', label: 'x → x + 3', box: 'function' },
    { id: 'circle', label: 'x → y on the circle x² + y² = 1', box: 'not' },
    { id: 'factor', label: 'Integer → a factor of that integer', box: 'not' }
  ]},
  S('Box A has 4 and 9. Someone maps 4 → +2 and 4 → −2 because “square root.” Is that a function?',
    [O('no', 'No — one input forked to two outputs', true), O('yes', 'Yes — both roots are allowed', false)],
    'Correct. One arrow per input. ±√ splits 4 into two answers, so it is not a function.',
    'A function cannot send 4 to both +2 and −2. Choose one output, or it is only a relation.'),
  S('How do mathematicians make square root into a function?',
    [O('principal', 'Keep only the principal (non-negative) root', true), O('both', 'Always return both + and −', false), O('none', 'Refuse to define √ at all', false)],
    'Yes. √4 = 2 only. The negative solution still exists for x² = 4, but √ does not return it.',
    'The principal square root picks the non-negative answer so each input gets one output.'),
  S('Many inputs may share one output (2 → 4 and −2 → 4 for squaring). Is that still a function?',
    [O('yes', 'Yes — many-to-one is allowed', true), O('no', 'No — outputs must all be unique', false)],
    'Correct. The ban is one-to-many, not many-to-one.',
    'Different inputs may land on the same output. What fails is one input landing on several outputs.'),
  S('A grater maps each whole vegetable to one grated portion. Person → friend maps one person to many friends. Which is a function?',
    [O('grater', 'Only the grater', true), O('both', 'Both', false), O('friend', 'Only person → friend', false)],
    'Right. The grater gives one result per vegetable. “Friend” forks.',
    'One vegetable → one grated result is a function. One person → many friends is not.'),
  S('Is “2 + 2 = 4” a function?',
    [O('no', 'No — it is an equation, a true/false statement', true), O('yes', 'Yes — it maps 2 to 4', false)],
    'Correct. An equation claims equality. A function is an input→output mapping.',
    '2 + 2 = 4 does not take an arbitrary input from a domain box. It is just a statement.'),
  S('Which statement captures a function in one line?',
    [O('arrow', 'Each allowed input has exactly one arrow to exactly one output', true), O('rules', 'Any rulebook of how a game works', false), O('formula', 'Only things written as algebraic formulas', false)],
    'Yes. Mapping with exactly one arrow per input.',
    'Football rulebooks are not functions. Formulas are optional — Dirichlet’s idea: any reliable assignment counts.')
];

export function getMathsFunctionsOrNotWorkshop() {
  return cloneInteractions([...MATHS_FUNCTIONS_OR_NOT_WORKSHOP]);
}

export function getMathsFunctionsWorkshop() {
  return cloneInteractions([...MATHS_FUNCTIONS_WORKSHOP]);
}

// ── Maths: Unit Circle (Trigonometry signature lab) ──

export const MATHS_UNIT_CIRCLE_WORKSHOP = [
  {
    type: 'unitcircle',
    prompt: 'Drag the angle around the unit circle. Read cos and sin, place the special angles, and unwrap the wave.'
  },
  S('On the unit circle, the point at angle θ has coordinates:',
    [O('cs', '(cos θ, sin θ)', true), O('sc', '(sin θ, cos θ)', false)],
    'Correct. The x-coordinate is cos θ, the y-coordinate is sin θ.',
    'Across is cos θ, up is sin θ — the point is (cos θ, sin θ).'),
  S('At θ = 90°, the point sits at the top of the circle. What are cos and sin there?',
    [O('01', 'cos = 0, sin = 1', true), O('10', 'cos = 1, sin = 0', false)],
    'Correct. Straight up means no horizontal reach (cos 0) and full height (sin 1).',
    'At the top: no sideways distance, full height. cos 90° = 0, sin 90° = 1.'),
  S('Why is cos 45° equal to sin 45°?',
    [O('iso', 'The 45° right triangle is isosceles — equal legs', true), O('big', 'Because 45 is half of 90', false)],
    'Correct. Equal legs give equal cos and sin: both √2 / 2.',
    'The 45°-45°-90° triangle has two equal sides, so cos and sin match at √2 / 2.'),
  S('Tangent is undefined at 90° because:',
    [O('div0', 'tan θ = sin θ / cos θ and cos 90° = 0', true), O('big', 'sin 90° is too large', false)],
    'Correct. Dividing by cos 90° = 0 sends tan θ to infinity.',
    'tan θ = sin θ / cos θ. At 90°, cos θ = 0, so the ratio is undefined.'),
  S('A point sweeps once around the circle. Its height plotted against the angle gives:',
    [O('sine', 'One full sine wave', true), O('line', 'A straight line', false)],
    'Correct. One trip around the circle is one period of the sine wave — it repeats every 2π.',
    'The rising and falling height traces a sine wave; one lap = one full wave.'),
  S('How many radians are in a full turn?',
    [O('2pi', '2π', true), O('360', '360', false), O('pi', 'π', false)],
    'Correct. A full turn is 2π radians (that is where 360° comes from).',
    'A full circle is 2π radians. Half a turn is π, a quarter is π/2.')
];

export function getMathsUnitCircleWorkshop() {
  return cloneInteractions(MATHS_UNIT_CIRCLE_WORKSHOP);
}

// ── Physics: Circuit Bench (Electricity signature lab) ──

export const PHY_CIRCUIT_WORKSHOP = [
  {
    type: 'circuitbench',
    prompt: 'Close the loop, drive it with voltage, choke it with resistance, and compare series with parallel.'
  },
  S('A bulb, a battery, and wires are connected but the switch is open. Why is the bulb dark?',
    [O('loop', 'The loop is broken, so charge cannot flow', true), O('gone', 'The battery ran out of charge', false)],
    'Correct. Current needs a complete path; an open switch breaks the loop.',
    'Nothing is used up — the open switch just breaks the loop so charge cannot flow round.'),
  S('Ohm’s law is I = V / R. Voltage stays fixed and you double the resistance. The current:',
    [O('half', 'Halves', true), O('double', 'Doubles', false)],
    'Correct. With V fixed, doubling R halves I — resistance chokes the current.',
    'I = V / R. If R doubles and V is fixed, I is cut in half.'),
  S('Current is measured through a component; voltage is measured:',
    [O('across', 'Across it', true), O('through', 'Through it too', false)],
    'Correct. Voltage is the energy difference across a component; current is the flow through it.',
    'Voltage is measured across a component (the energy drop); current is what flows through.'),
  { type: 'sorting',
    boxes: [
      { id: 'series', label: 'Series' },
      { id: 'parallel', label: 'Parallel' }
    ],
    items: [
      { id: 'onepath', label: 'One single path for the current', box: 'series' },
      { id: 'sharei', label: 'Same current through every part', box: 'series' },
      { id: 'splitv', label: 'Supply voltage is shared', box: 'series' },
      { id: 'branches', label: 'Current has more than one path', box: 'parallel' },
      { id: 'fullv', label: 'Each branch gets the full voltage', box: 'parallel' },
      { id: 'homewire', label: 'How home wiring is built', box: 'parallel' }
    ] },
  S('Old fairy lights were wired in series. One bulb blew and the whole string went dark. Why?',
    [O('onepath', 'Series has one path — a break stops all current', true), O('power', 'The power surged through the others', false)],
    'Correct. In series a single break opens the only loop, so every bulb goes out.',
    'Series has just one path. Break it anywhere and the whole loop is open — all bulbs die.'),
  S('Electrical power is P = IV. For the same current, a higher voltage means:',
    [O('more', 'More power transferred', true), O('less', 'Less power', false)],
    'Correct. P = IV rises with either current or voltage.',
    'P = I × V. With current fixed, more voltage means more power delivered.')
];

export function getPhysCircuitWorkshop() {
  return cloneInteractions(PHY_CIRCUIT_WORKSHOP);
}

// ── Physics: Motion Lab (Motion foundations signature lab) ──

export const PHY_MOTION_WORKSHOP = [
  {
    type: 'motionlab',
    prompt: 'Set the motion, hit Run, and watch the position, velocity, and acceleration graphs draw themselves.'
  },
  S('Speed is a scalar; velocity is a vector. What does velocity have that speed does not?',
    [O('dir', 'A direction', true), O('unit', 'A different unit', false)],
    'Correct. Velocity is speed with a direction — that is what makes it a vector.',
    'They share the same unit (m/s). Velocity adds a direction; speed is just the size.'),
  S('A car drives north at 30 m/s, then south at 30 m/s. Its speed is unchanged, but its velocity:',
    [O('changed', 'Changed — the direction reversed', true), O('same', 'Stayed the same', false)],
    'Correct. Same speed, opposite direction, so the velocity is different (and it accelerated to turn around).',
    'Velocity includes direction. Reversing direction changes the velocity even at the same speed.'),
  S('On a position-time graph, a steeper line means:',
    [O('faster', 'A greater velocity', true), O('further', 'A longer journey', false)],
    'Correct. The slope of a position-time graph is the velocity — steeper is faster.',
    'Slope is velocity. A steeper position-time line means the object covers ground faster.'),
  { type: 'sorting',
    boxes: [
      { id: 'vgraph', label: 'Velocity-time graph' },
      { id: 'motion', label: 'What the object does' }
    ],
    items: [
      { id: 'flatpos', label: 'A flat line above zero', box: 'vgraph' },
      { id: 'steady', label: 'Moves at a steady speed', box: 'motion' },
      { id: 'rising', label: 'A line climbing from zero', box: 'vgraph' },
      { id: 'speedup', label: 'Speeds up (accelerates)', box: 'motion' },
      { id: 'belowzero', label: 'A line below the axis', box: 'vgraph' },
      { id: 'backwards', label: 'Moves in reverse', box: 'motion' }
    ] },
  S('A velocity-time graph is a flat horizontal line above zero. The acceleration is:',
    [O('zero', 'Zero — velocity is not changing', true), O('big', 'Large and steady', false)],
    'Correct. Acceleration is the slope of the velocity graph; a flat line has zero slope, so zero acceleration.',
    'Acceleration is how fast velocity changes. A flat velocity line is not changing, so acceleration is zero.')
];

export function getPhysMotionWorkshop() {
  return cloneInteractions(PHY_MOTION_WORKSHOP);
}

// ── Tier A: coverage workshops reusing existing lab components ──
// Each points an uncovered topic at a lab that already exists (CoordinateDrill,
// AtomBuilder, BondLab, MoleculeBuilder), with topic-matched reinforcement.

// Maths · Coordinate geometry (CoordinateDrill)
export const MATH_COORD_GEOMETRY_WORKSHOP = [
  { type: 'coorddrill', mode: 'plotPoint', prompt: 'Plot the point (3, 4) — across first, then up.',
    targetX: 3, targetY: 4,
    correctFeedback: 'Correct. 3 across, 4 up.', incorrectFeedback: 'Across is x, up is y. Drag to (3, 4).' },
  S('The distance between two points is found with which idea?',
    [O('pyth', 'Pythagoras on the horizontal and vertical gaps', true), O('add', 'Adding the two coordinates', false)],
    'Correct. The gaps form a right triangle; the distance is its hypotenuse.',
    'The horizontal and vertical gaps are the legs of a right triangle — use Pythagoras.'),
  { type: 'coorddrill', mode: 'distance', prompt: 'Drag B until it is exactly 5 units from A.',
    fixedPoint: { x: -1, y: -1 }, targetDistance: 5, distanceTolerance: 0.4,
    correctFeedback: 'Correct — a hidden 3-4-5 triangle.', incorrectFeedback: 'Try 3 across and 4 up from A.' },
  { type: 'coorddrill', mode: 'midpoint', prompt: 'Drag M to the midpoint of A and B.',
    pointA: { x: -3, y: 1 }, pointB: { x: 3, y: 5 },
    correctFeedback: 'Correct. Average the x values, average the y values.', incorrectFeedback: 'Midpoint = ((-3+3)/2, (1+5)/2) = (0, 3).' },
  S('Two lines are parallel. What do they share?',
    [O('slope', 'The same slope', true), O('inter', 'The same y-intercept', false)],
    'Correct. Parallel lines have equal slopes and never meet.',
    'Parallel means equal steepness — the same slope.'),
  { type: 'coorddrill', mode: 'buildLine', prompt: 'Match the target line y = 2x + 1.',
    targetM: 2, targetC: 1,
    correctFeedback: 'Correct. Slope 2, crossing the y-axis at 1.', incorrectFeedback: 'Slope sets the tilt, intercept sets where it crosses y.' }
];
export function getMathCoordGeometryWorkshop() { return cloneInteractions(MATH_COORD_GEOMETRY_WORKSHOP); }

// Maths · Coordinate maps (CoordinateDrill — reading/writing coordinates, quadrants)
export const MATH_COORD_MAPS_WORKSHOP = [
  { type: 'coorddrill', mode: 'plotPoint', prompt: 'Plot (2, 5): the address is across, then up.',
    targetX: 2, targetY: 5,
    correctFeedback: 'Correct. (2, 5): 2 across, 5 up.', incorrectFeedback: 'First number across, second up. Drag to (2, 5).' },
  S('A point sits in the bottom-left region. Both its coordinates are:',
    [O('neg', 'Negative', true), O('pos', 'Positive', false)],
    'Correct. Bottom-left is quadrant III: x negative, y negative.',
    'Bottom-left means left (negative x) and down (negative y).'),
  { type: 'coorddrill', mode: 'plotPoint', prompt: 'Plot (-4, 2) — negatives go the other way.',
    targetX: -4, targetY: 2,
    correctFeedback: 'Correct. Left 4, up 2.', incorrectFeedback: 'Negative x is left; positive y is up.' },
  S('The point (0, 3) sits where?',
    [O('yaxis', 'On the y-axis', true), O('xaxis', 'On the x-axis', false)],
    'Correct. An x-coordinate of 0 puts it on the vertical y-axis.',
    'When x is 0 there is no sideways move — the point is on the y-axis.'),
  { type: 'coorddrill', mode: 'plotPoint', prompt: 'Plot (5, -3): right and down.',
    targetX: 5, targetY: -3,
    correctFeedback: 'Correct. Right 5, down 3 — quadrant IV.', incorrectFeedback: 'Positive x is right; negative y is down.' },
  S('Why does the order in a coordinate pair matter?',
    [O('diff', '(3, 5) and (5, 3) are different points', true), O('same', 'It does not — they mean the same', false)],
    'Correct. (x, y) is ordered; swapping gives a different location.',
    '(3, 5) is 3 across and 5 up; (5, 3) is 5 across and 3 up — different points.')
];
export function getMathCoordMapsWorkshop() { return cloneInteractions(MATH_COORD_MAPS_WORKSHOP); }

// Maths · Lines & gradients (CoordinateDrill — buildLine focus)
export const MATH_LINEAR_GRAPHS_WORKSHOP = [
  { type: 'coorddrill', mode: 'buildLine', prompt: 'Build y = x + 2: slope 1, intercept 2.',
    targetM: 1, targetC: 2,
    correctFeedback: 'Correct. Rises 1 per step across, crosses y at 2.', incorrectFeedback: 'Slope 1 (gentle rise), intercept 2 (crosses y at 2).' },
  S('In y = mx + c, what does m control?',
    [O('slope', 'The steepness (slope)', true), O('cross', 'Where it crosses the y-axis', false)],
    'Correct. m is the gradient — how steep the line is.',
    'm is the slope; c is where it crosses the y-axis.'),
  { type: 'coorddrill', mode: 'buildLine', prompt: 'Build a steeper, falling line: y = -3x + 2.',
    targetM: -3, targetC: 2,
    correctFeedback: 'Correct. A negative slope falls as it moves right.', incorrectFeedback: 'Negative slope falls left-to-right; push m below zero.' },
  S('A line has slope 0. It is:',
    [O('flat', 'Perfectly flat (horizontal)', true), O('vert', 'Perfectly vertical', false)],
    'Correct. Zero slope means no rise — a horizontal line.',
    'Slope 0 means it never rises: a flat, horizontal line.'),
  { type: 'coorddrill', mode: 'buildLine', prompt: 'Match y = 2x - 3.',
    targetM: 2, targetC: -3,
    correctFeedback: 'Correct. Climbs 2 per step, crosses y at -3.', incorrectFeedback: 'Slope 2, intercept -3 (crosses y below the origin).' },
  S('A line climbs 6 units over a run of 2 units. Its gradient is:',
    [O('3', '3', true), O('6', '6', false)],
    'Correct. Gradient = rise / run = 6 / 2 = 3.',
    'Gradient is rise over run: 6 ÷ 2 = 3.')
];
export function getMathLinearGraphsWorkshop() { return cloneInteractions(MATH_LINEAR_GRAPHS_WORKSHOP); }

// Chemistry · Atomic structure (AtomBuilder)
export const CHEM_ATOMIC_WORKSHOP = [
  { type: 'atombuilder', prompt: 'Build a neutral carbon atom. Protons name it; electrons balance it.',
    targetName: 'Carbon', targetProtons: 6, targetNeutrons: 6, targetElectrons: 6,
    correctFeedback: 'Correct. Six protons is carbon; six electrons keeps it neutral.', incorrectFeedback: 'Carbon needs 6p / 6n / 6e.' },
  S('What decides which element an atom is?',
    [O('p', 'The number of protons', true), O('e', 'The number of electrons', false)],
    'Correct. The proton count (atomic number) sets the identity.',
    'Electrons can change; the proton count fixes the element.'),
  { type: 'atombuilder', prompt: 'Build a neutral oxygen atom.',
    targetName: 'Oxygen', targetProtons: 8, targetNeutrons: 8, targetElectrons: 8,
    correctFeedback: 'Correct. Eight protons is oxygen.', incorrectFeedback: 'Oxygen needs 8p / 8n / 8e.' },
  S('The first electron shell fills before the second. How many electrons does it hold?',
    [O('2', '2', true), O('8', '8', false)],
    'Correct. Shell 1 holds a maximum of 2, then shell 2 holds 8.',
    'The inner shell holds only 2 electrons before the next shell starts.'),
  { type: 'atombuilder', prompt: 'Make a sodium ion, Na⁺: it lost one electron.',
    targetName: 'Na⁺', targetProtons: 11, targetNeutrons: 12, targetElectrons: 10,
    correctFeedback: 'Correct. Still 11 protons (sodium) but 10 electrons — charge +1.', incorrectFeedback: 'Na⁺ keeps 11 protons; losing an electron leaves 10.' },
  S('A neutral atom gains 2 electrons. Its charge becomes:',
    [O('neg2', '−2', true), O('pos2', '+2', false)],
    'Correct. Extra electrons add negative charge: −2.',
    'Electrons are negative, so gaining 2 gives a charge of −2.')
];
export function getChemAtomicWorkshop() { return cloneInteractions(CHEM_ATOMIC_WORKSHOP); }

// Chemistry · Nucleus & isotopes (AtomBuilder — isotope focus)
export const CHEM_NUCLEUS_WORKSHOP = [
  { type: 'atombuilder', prompt: 'Build carbon-12: 6 protons, 6 neutrons, neutral.',
    targetName: 'Carbon-12', targetProtons: 6, targetNeutrons: 6, targetElectrons: 6,
    correctFeedback: 'Correct. The standard carbon nucleus.', incorrectFeedback: 'Carbon-12 is 6p / 6n / 6e.' },
  S('Isotopes of one element differ in the number of:',
    [O('n', 'Neutrons', true), O('p', 'Protons', false)],
    'Correct. Same protons, different neutrons — that is an isotope.',
    'Changing protons changes the element. Isotopes only change neutrons.'),
  { type: 'atombuilder', prompt: 'Now build carbon-14: same protons, two extra neutrons.',
    targetName: 'Carbon-14', targetProtons: 6, targetNeutrons: 8, targetElectrons: 6,
    correctFeedback: 'Correct. Still carbon, heavier nucleus — the dating isotope.', incorrectFeedback: 'Carbon-14 keeps 6 protons but has 8 neutrons.' },
  S('Carbon-12 and carbon-14 react identically. Why?',
    [O('shell', 'Same protons and electron shells', true), O('mass', 'They weigh the same', false)],
    'Correct. Chemistry depends on protons and electrons, not neutrons.',
    'They have different masses, but identical proton and electron arrangements.'),
  { type: 'atombuilder', prompt: 'Build neutral helium: 2 protons, 2 neutrons.',
    targetName: 'Helium', targetProtons: 2, targetNeutrons: 2, targetElectrons: 2,
    correctFeedback: 'Correct. A tidy, stable little nucleus.', incorrectFeedback: 'Helium is 2p / 2n / 2e.' },
  S('The mass number of an atom counts:',
    [O('pn', 'Protons plus neutrons', true), O('pe', 'Protons plus electrons', false)],
    'Correct. Mass sits in the nucleus: protons + neutrons.',
    'Electrons are almost massless. Mass number = protons + neutrons.')
];
export function getChemNucleusWorkshop() { return cloneInteractions(CHEM_NUCLEUS_WORKSHOP); }

// Chemistry · Chemical bonding (BondLab)
export const CHEM_BONDING_WORKSHOP = [
  { type: 'bondlab', prompt: 'Place atoms on the bench and form stable compounds by sharing or transferring electrons.' },
  S('Why do atoms bond at all?',
    [O('shell', 'To reach a full outer shell', true), O('mass', 'To gain more mass', false)],
    'Correct. A full outer shell is stable, so atoms bond to reach it.',
    'Bonding is about stability — a full outer shell — not gaining mass.'),
  S('Sodium gives an electron to chlorine. This is:',
    [O('ionic', 'Ionic bonding (transfer)', true), O('cov', 'Covalent bonding (sharing)', false)],
    'Correct. Transferring electrons makes ions that attract — ionic bonding.',
    'Giving/taking electrons is ionic. Sharing them is covalent.'),
  S('Two atoms share a pair of electrons. This bond is:',
    [O('cov', 'Covalent', true), O('metal', 'Metallic', false)],
    'Correct. Shared electron pairs are covalent bonds.',
    'Sharing a pair is covalent; a sea of free electrons is metallic.'),
  S('A compound conducts electricity when molten and dissolves in water. Its bonding is likely:',
    [O('ionic', 'Ionic', true), O('cov', 'Simple covalent', false)],
    'Correct. Free-moving ions carry charge — typical of ionic compounds.',
    'Mobile charged ions point to ionic bonding.')
];
export function getChemBondingWorkshop() { return cloneInteractions(CHEM_BONDING_WORKSHOP); }

// Chemistry · Bonding types (BondLab — ionic/covalent/metallic sorting)
export const CHEM_BONDING_TYPES_WORKSHOP = [
  { type: 'bondlab', prompt: 'Build compounds by transferring or sharing electrons, and watch which bond forms.' },
  { type: 'sorting',
    boxes: [ { id: 'ionic', label: 'Ionic' }, { id: 'covalent', label: 'Covalent' }, { id: 'metallic', label: 'Metallic' } ],
    items: [
      { id: 'transfer', label: 'Electrons transferred metal → non-metal', box: 'ionic' },
      { id: 'share', label: 'Electrons shared between non-metals', box: 'covalent' },
      { id: 'sea', label: 'A sea of free electrons around metal ions', box: 'metallic' },
      { id: 'salt', label: 'Sodium chloride (table salt)', box: 'ionic' },
      { id: 'water', label: 'Water, H₂O', box: 'covalent' },
      { id: 'copper', label: 'Solid copper wire', box: 'metallic' }
    ] },
  S('Metals conduct electricity because they have:',
    [O('sea', 'Free (delocalised) electrons', true), O('ions', 'Trapped, fixed electrons', false)],
    'Correct. The mobile electron sea carries charge through the metal.',
    'Metallic bonding gives free-moving electrons that carry current.'),
  S('Non-metals bonding with each other usually form:',
    [O('cov', 'Covalent bonds (sharing)', true), O('ionic', 'Ionic bonds (transfer)', false)],
    'Correct. Neither wants to give up electrons, so they share — covalent.',
    'Two non-metals share electrons: covalent bonding.')
];
export function getChemBondingTypesWorkshop() { return cloneInteractions(CHEM_BONDING_TYPES_WORKSHOP); }

// Chemistry · Molecular architecture (MoleculeBuilder)
export const CHEM_ARCH_WORKSHOP = [
  { type: 'moleculebuilder', prompt: 'Build water from its formula, H2O.',
    targetFormula: 'H2O', targetAtoms: { H: 2, O: 1 },
    correctFeedback: 'Correct. Two hydrogens, one oxygen.', incorrectFeedback: 'H2O = 2 H and 1 O.' },
  S('In a chemical formula, the small subscript tells you:',
    [O('count', 'How many of that atom', true), O('charge', 'The charge of the atom', false)],
    'Correct. The subscript counts atoms of that element.',
    'The subscript is a count — H₂ means two hydrogen atoms.'),
  { type: 'moleculebuilder', prompt: 'Build carbon dioxide, CO2.',
    targetFormula: 'CO2', targetAtoms: { C: 1, O: 2 },
    correctFeedback: 'Correct. One carbon, two oxygens.', incorrectFeedback: 'CO2 = 1 C and 2 O.' },
  { type: 'moleculebuilder', prompt: 'Build ammonia, NH3.',
    targetFormula: 'NH3', targetAtoms: { N: 1, H: 3 },
    correctFeedback: 'Correct. One nitrogen, three hydrogens.', incorrectFeedback: 'NH3 = 1 N and 3 H.' },
  S('Water (H₂O) is bent, not straight. What pushes it into that shape?',
    [O('lone', 'Lone pairs of electrons on the oxygen', true), O('h', 'The two hydrogens repelling', false)],
    'Correct. Oxygen’s lone pairs push the bonds down into a bent shape.',
    'The oxygen’s lone electron pairs crowd the bonds, bending the molecule.'),
  { type: 'moleculebuilder', prompt: 'Build methane, CH4 — the tetrahedral one.',
    targetFormula: 'CH4', targetAtoms: { C: 1, H: 4 },
    correctFeedback: 'Correct. One carbon bonded to four hydrogens.', incorrectFeedback: 'CH4 = 1 C and 4 H.' }
];
export function getChemArchWorkshop() { return cloneInteractions(CHEM_ARCH_WORKSHOP); }

// ── Tier B: Energy & Momentum (bespoke Collision Lab) ──
export const PHY_MOMENTUM_WORKSHOP = [
  { type: 'momentumlab', prompt: 'Set the carts, choose a collision, hit Run, and watch momentum and energy.' }
];
export function getPhysMomentumWorkshop() { return cloneInteractions(PHY_MOMENTUM_WORKSHOP); }

// ── Tier B: chemistry coverage reusing MoleculeBuilder ──

// Chemistry · Reactions & the mole (MoleculeBuilder + ratio reasoning)
export const CHEM_MOLE_WORKSHOP = [
  S('A balanced equation says 2 H₂ + O₂ → 2 H₂O. What does the “2” in front of H₂ count?',
    [O('mol', 'How many molecules (or moles) react', true), O('atom', 'How many atoms are in one molecule', false)],
    'Correct. The big number is the amount reacting; the subscript counts atoms inside one molecule.',
    'The front number is the count of molecules/moles; the small subscript counts atoms in one molecule.'),
  { type: 'moleculebuilder', prompt: 'Build one water molecule, a product of that reaction.',
    targetFormula: 'H2O', targetAtoms: { H: 2, O: 1 },
    correctFeedback: 'Correct. Two hydrogens and one oxygen.', incorrectFeedback: 'Water is H2O: 2 H and 1 O.' },
  S('Burning methane: CH₄ + 2 O₂ → CO₂ + 2 H₂O. How many O₂ molecules per methane?',
    [O('2', 'Two', true), O('1', 'One', false)],
    'Correct. The ratio is 1 methane to 2 oxygen — read straight off the coefficients.',
    'The coefficient on O₂ is 2, so two O₂ per one CH₄.'),
  { type: 'moleculebuilder', prompt: 'Build the carbon dioxide that methane burning gives off.',
    targetFormula: 'CO2', targetAtoms: { C: 1, O: 2 },
    correctFeedback: 'Correct. One carbon, two oxygens.', incorrectFeedback: 'CO₂ is 1 C and 2 O.' },
  S('Why must a chemical equation be balanced?',
    [O('cons', 'Atoms are conserved — none created or destroyed', true), O('look', 'To make it look tidy', false)],
    'Correct. Every atom on the left must reappear on the right; matter is conserved.',
    'Balancing enforces conservation of atoms: the same atoms, rearranged.')
];
export function getChemMoleWorkshop() { return cloneInteractions(CHEM_MOLE_WORKSHOP); }

// Chemistry · Counting atoms (MoleculeBuilder — read a formula as a count)
export const CHEM_MOLE_COUNTING_WORKSHOP = [
  { type: 'moleculebuilder', prompt: 'Build ammonia, NH₃. Read the formula as a shopping list of atoms.',
    targetFormula: 'NH3', targetAtoms: { N: 1, H: 3 },
    correctFeedback: 'Correct. One nitrogen, three hydrogens.', incorrectFeedback: 'NH₃ is 1 N and 3 H.' },
  S('How many atoms are in one molecule of NH₃?',
    [O('4', 'Four', true), O('3', 'Three', false)],
    'Correct. One N plus three H makes four atoms.',
    'Add them up: 1 nitrogen + 3 hydrogen = 4 atoms.'),
  { type: 'moleculebuilder', prompt: 'Build methane, CH₄.',
    targetFormula: 'CH4', targetAtoms: { C: 1, H: 4 },
    correctFeedback: 'Correct. One carbon, four hydrogens — five atoms in all.', incorrectFeedback: 'CH₄ is 1 C and 4 H.' },
  S('In the formula 2 CO₂, how many oxygen atoms are there in total?',
    [O('4', 'Four', true), O('2', 'Two', false)],
    'Correct. Two molecules × two oxygens each = four oxygen atoms.',
    'Each CO₂ has 2 oxygens, and there are 2 molecules: 2 × 2 = 4.'),
  { type: 'moleculebuilder', prompt: 'Build carbon dioxide, CO₂.',
    targetFormula: 'CO2', targetAtoms: { C: 1, O: 2 },
    correctFeedback: 'Correct. One carbon, two oxygens.', incorrectFeedback: 'CO₂ is 1 C and 2 O.' }
];
export function getChemMoleCountingWorkshop() { return cloneInteractions(CHEM_MOLE_COUNTING_WORKSHOP); }

// Chemistry · Biomolecules (MoleculeBuilder — carbon backbone + small builds)
export const CHEM_BIOMOLECULES_WORKSHOP = [
  S('Life’s big molecules are built mostly around one element that bonds four ways. Which?',
    [O('c', 'Carbon', true), O('o', 'Oxygen', false)],
    'Correct. Carbon’s four bonds let it form long chains and rings — the scaffold of biology.',
    'Carbon forms four bonds, so it chains into the backbones of biomolecules.'),
  { type: 'moleculebuilder', prompt: 'Build methane, CH₄ — the simplest carbon skeleton.',
    targetFormula: 'CH4', targetAtoms: { C: 1, H: 4 },
    correctFeedback: 'Correct. One carbon holding four hydrogens — the seed of every carbon chain.', incorrectFeedback: 'CH₄ is 1 C and 4 H.' },
  S('Cells run on respiration: glucose + O₂ → CO₂ + H₂O. What are the two waste products?',
    [O('cw', 'Carbon dioxide and water', true), O('go', 'Glucose and oxygen', false)],
    'Correct. Respiration breaks sugar down to carbon dioxide and water, releasing energy.',
    'The outputs are carbon dioxide and water; glucose and oxygen are the inputs.'),
  { type: 'moleculebuilder', prompt: 'Build a water molecule, one product of respiration.',
    targetFormula: 'H2O', targetAtoms: { H: 2, O: 1 },
    correctFeedback: 'Correct. Two hydrogens, one oxygen.', incorrectFeedback: 'Water is H₂O: 2 H and 1 O.' },
  S('Proteins, carbohydrates, and DNA are all polymers. What does that mean?',
    [O('rep', 'Long chains built from small repeating units', true), O('one', 'Single large atoms', false)],
    'Correct. A polymer is many small monomers linked into a long chain.',
    'Polymer means a long chain of repeating small units (monomers).')
];
export function getChemBiomoleculesWorkshop() { return cloneInteractions(CHEM_BIOMOLECULES_WORKSHOP); }

// ── Tier B: Forces & Newton (reuses ForceBalance) ──
export const PHY_FORCES_WORKSHOP = [
  { type: 'forcebalance', prompt: 'Balance the cart so it stays perfectly still.',
    target: 'balanced', startLeft: 2, startRight: 3,
    correctFeedback: 'Locked. Equal and opposite pushes give zero net force, so the cart does not accelerate.',
    incorrectFeedback: 'The two pushes must match. Any imbalance sends the cart accelerating one way.' },
  S('A puck slides across frictionless ice with nothing pushing it. What does its motion do?',
    [O('same', 'Keeps going at the same speed and direction', true), O('slow', 'Slows down and stops on its own', false)],
    'Correct. Newton’s first law: with no net force, motion just continues unchanged.',
    'With no net force there is nothing to change the motion — it keeps going steadily (Newton’s first law).'),
  { type: 'forcebalance', prompt: 'Now make the cart accelerate to the right.',
    target: 'right', startLeft: 2, startRight: 2,
    correctFeedback: 'Yes. A stronger push on the left leaves a net rightward force, so the cart accelerates right.',
    incorrectFeedback: 'For rightward acceleration the net force must point right — make the left push bigger.' },
  S('You push a loaded cart and an empty cart with exactly the same force. Which speeds up faster?',
    [O('empty', 'The lighter, empty cart', true), O('loaded', 'The heavier, loaded cart', false)],
    'Correct. a = F / m: for the same force, less mass means more acceleration.',
    'Acceleration is force divided by mass, so the lighter cart accelerates more.'),
  S('You push on a wall and it does not move. What is the wall doing to your hand?',
    [O('back', 'Pushing back on you with an equal, opposite force', true), O('none', 'Nothing — only you exert a force', false)],
    'Correct. Newton’s third law: every push has an equal and opposite push back.',
    'Forces come in pairs — the wall pushes back on you just as hard (Newton’s third law).')
];
export function getPhysForcesWorkshop() { return cloneInteractions(PHY_FORCES_WORKSHOP); }

// ── Tier B: SI units & scale (reuses UnitCheck) ──
export const PHY_SI_SCALE_WORKSHOP = [
  S('Every physical measurement needs two things: a number and a…',
    [O('unit', 'unit', true), O('name', 'name', false)],
    'Correct. “5” means nothing until you say 5 metres, 5 seconds, 5 kilograms.',
    'A bare number is meaningless in physics — it needs a unit.'),
  { type: 'unitcheck', prompt: 'Cancel the units. What does distance divided by time give?',
    expression: 'm / s', target: 'A runner covers a distance in a certain time.',
    options: [
      { id: 'ms', label: 'm/s', note: 'speed' },
      { id: 'm', label: 'm', note: 'distance' },
      { id: 's', label: 's', note: 'time' }
    ],
    correctOption: 'ms',
    correctFeedback: 'Yes. Metres per second is a speed.',
    incorrectFeedback: 'Distance over time leaves metres per second — a speed.' },
  S('The prefix “kilo” multiplies a unit by…',
    [O('1000', '1000', true), O('100', '100', false)],
    'Correct. A kilometre is 1000 metres; a kilogram is 1000 grams.',
    '“Kilo” means one thousand.'),
  S('One millimetre is one _____ of a metre.',
    [O('th', 'thousandth', true), O('h', 'hundredth', false)],
    'Correct. Milli means a thousandth: 1000 mm make a metre.',
    '“Milli” means a thousandth, so 1000 mm = 1 m.'),
  { type: 'unitcheck', prompt: 'Cancel the units. What does length times length give?',
    expression: 'm x m', target: 'Tile a square patch of floor.',
    options: [
      { id: 'm2', label: 'm²', note: 'area' },
      { id: 'm', label: 'm', note: 'length' },
      { id: 'm3', label: 'm³', note: 'volume' }
    ],
    correctOption: 'm2',
    correctFeedback: 'Yes. Metres times metres is square metres — an area.',
    incorrectFeedback: 'Two lengths multiplied give square metres, an area.' }
];
export function getPhysSiScaleWorkshop() { return cloneInteractions(PHY_SI_SCALE_WORKSHOP); }

// ── Tier B: Scale, estimation & errors (reuses UnitCheck) ──
export const PHY_SCALE_WORKSHOP = [
  S('An order-of-magnitude estimate rounds each quantity to the nearest…',
    [O('pow', 'power of ten', true), O('int', 'whole number', false)],
    'Correct. You care about the number of zeros, not the exact digits.',
    'Order of magnitude means the nearest power of ten.'),
  S('You estimate a crowd at 3×10⁴ when the true count is 2.8×10⁴. This estimate is…',
    [O('good', 'good — right to an order of magnitude', true), O('bad', 'useless because it is not exact', false)],
    'Correct. For a quick estimate, being in the right ballpark of ten-thousands is a success.',
    'It lands in the right power of ten, which is exactly what an estimate is for.'),
  { type: 'unitcheck', prompt: 'Cancel the units. Speed multiplied by time gives what?',
    expression: '(m/s) x s', target: 'A car drives at a steady speed for a while.',
    options: [
      { id: 'm', label: 'm', note: 'distance' },
      { id: 's', label: 's', note: 'time' },
      { id: 'ms', label: 'm/s', note: 'speed' }
    ],
    correctOption: 'm',
    correctFeedback: 'Yes. The seconds cancel, leaving metres — a distance.',
    incorrectFeedback: 'The s on the bottom cancels the s you multiply by, leaving metres.' },
  S('A length written as 4.50 cm claims precision to the nearest…',
    [O('h', 'hundredth of a centimetre', true), O('cm', 'whole centimetre', false)],
    'Correct. The trailing zero is meaningful: it says the measurement is good to 0.01 cm.',
    'The last written digit shows the precision — here, hundredths of a centimetre.'),
  S('Rounded to one significant figure, 47,000 becomes…',
    [O('5', '50,000', true), O('4', '40,000', false)],
    'Correct. The leading 4.7 rounds up to 5, giving 50,000.',
    'One significant figure keeps only the first digit, rounded: 4.7 → 5, so 50,000.')
];
export function getPhysScaleWorkshop() { return cloneInteractions(PHY_SCALE_WORKSHOP); }

// ── Tier B: Limits (conceptual, scenario-driven) ──
export const MATH_LIMITS_WORKSHOP = [
  S('As x gets closer and closer to 2, f(x) gets closer and closer to 5. The limit of f as x → 2 is…',
    [O('5', '5', true), O('2', '2', false)],
    'Correct. The limit is the output value the function heads toward, which is 5.',
    'The limit is the value f(x) approaches, not the value x approaches — here that is 5.'),
  S('A limit describes the value a function…',
    [O('appr', 'approaches as the input nears a point', true), O('reach', 'must actually reach at that point', false)],
    'Correct. A limit is about the approach; the function need not even be defined at the point.',
    'A limit is about what the function approaches, not what it necessarily reaches.'),
  S('f(x) = (x²−1)/(x−1) is undefined at x = 1 (it gives 0/0). Can the limit as x → 1 still exist?',
    [O('yes', 'Yes — it approaches 2 from both sides', true), O('no', 'No — undefined there means no limit', false)],
    'Correct. This is why limits matter: they describe the approach even where the formula breaks.',
    'A limit can exist even where the function is undefined — here it approaches 2.'),
  S('Approaching from the left gives 3; approaching from the right gives 7. The two-sided limit…',
    [O('dne', 'does not exist', true), O('avg', 'is the average, 5', false)],
    'Correct. For a two-sided limit to exist, both sides must agree. They do not, so it does not exist.',
    'The two sides disagree, so there is no single two-sided limit (it is not their average).'),
  S('A function is continuous at a point when the limit there equals…',
    [O('val', 'the function’s value at that point', true), O('zero', 'zero', false)],
    'Correct. Continuity means no jump: the limit and the actual value line up.',
    'Continuity means the limit matches the function’s value at that point — no gap or jump.')
];
export function getMathLimitsWorkshop() { return cloneInteractions(MATH_LIMITS_WORKSHOP); }

// ── Tier B final: conceptual topics (scenario + sorting) ──

// Physics · Measurement limits
export const PHY_MEASUREMENT_LIMITS_WORKSHOP = [
  S('A scale reads 72.4 kg every single time, but a trusted reference says you are 70.0 kg. The scale is…',
    [O('prec', 'precise but not accurate', true), O('acc', 'accurate but not precise', false)],
    'Correct. Precise means repeatable; accurate means close to the true value. It repeats well but sits off-target.',
    'Consistent readings that are consistently wrong are precise but not accurate.'),
  { type: 'sorting',
    boxes: [ { id: 'random', label: 'Random error' }, { id: 'systematic', label: 'Systematic error' } ],
    items: [
      { id: 'zero', label: 'A balance never zeroed, reading 2 g high every time', box: 'systematic' },
      { id: 'noise', label: 'Tiny fluctuations that scatter repeated readings', box: 'random' },
      { id: 'ruler', label: 'A ruler printed 1% too short', box: 'systematic' },
      { id: 'angle', label: 'Reading the meniscus from a slightly different angle each time', box: 'random' }
    ] },
  S('You measure a length as 3.2 cm with a ruler marked in millimetres. The uncertainty is about…',
    [O('half', 'half a millimetre', true), O('cm', 'a whole centimetre', false)],
    'Correct. Resolution limits you to roughly half the smallest division.',
    'The finest division sets the floor — about half a millimetre here.'),
  S('Averaging many repeated readings mainly reduces…',
    [O('rand', 'random error', true), O('sys', 'systematic error', false)],
    'Correct. Random scatter averages out; a built-in offset does not.',
    'Averaging cancels random scatter but cannot remove a systematic offset.'),
  S('Why can no measurement ever be infinitely precise?',
    [O('lim', 'Every instrument has a finite resolution', true), O('lazy', 'Only because people are careless', false)],
    'Correct. There is always a smallest step the instrument can resolve.',
    'Instruments have a finite smallest division, so precision is always bounded.')
];
export function getPhysMeasurementLimitsWorkshop() { return cloneInteractions(PHY_MEASUREMENT_LIMITS_WORKSHOP); }

// Physics · Foundations & frontiers
export const PHY_FOUNDATIONS_WORKSHOP = [
  S('Physics explains the world by building…',
    [O('models', 'testable models that predict what happens', true), O('op', 'opinions about how things ought to be', false)],
    'Correct. A model earns trust by making predictions you can check against reality.',
    'Physics works through testable, predictive models, not opinion.'),
  { type: 'sorting',
    boxes: [ { id: 'small', label: 'Quantum / tiny' }, { id: 'human', label: 'Everyday' }, { id: 'cosmic', label: 'Astronomical' } ],
    items: [
      { id: 'electron', label: 'An electron inside an atom', box: 'small' },
      { id: 'ball', label: 'A thrown cricket ball', box: 'human' },
      { id: 'galaxy', label: 'A spiral galaxy', box: 'cosmic' },
      { id: 'photon', label: 'A single photon of light', box: 'small' },
      { id: 'phone', label: 'A phone sliding off a table', box: 'human' },
      { id: 'bh', label: 'A black hole', box: 'cosmic' }
    ] },
  S('When a well-tested theory disagrees with a careful experiment, physicists trust…',
    [O('exp', 'the experiment, and revise the theory', true), O('th', 'the theory, and discard the experiment', false)],
    'Correct. Experiment is the final referee; theories bend to fit the evidence.',
    'Evidence wins — a theory that conflicts with careful measurement must change.'),
  S('Newton’s laws still work for cars and planets even though relativity is “more correct.” Why keep them?',
    [O('good', 'They are accurate enough in everyday conditions', true), O('wrong', 'They are simply wrong and should be dropped', false)],
    'Correct. Older models survive as excellent approximations within their range.',
    'They remain great approximations at everyday speeds and scales.'),
  S('A “frontier” in physics is best described as…',
    [O('open', 'a question current models cannot yet fully answer', true), O('done', 'a topic that is completely finished', false)],
    'Correct. Frontiers are the open edges — dark matter, quantum gravity, and the rest.',
    'Frontiers are the unresolved questions at the edge of current understanding.')
];
export function getPhysFoundationsWorkshop() { return cloneInteractions(PHY_FOUNDATIONS_WORKSHOP); }

// Computing · AI-era computing
export const COMP_AI_ERA_WORKSHOP = [
  S('Traditional programming gives the computer explicit rules. Machine learning instead gives it…',
    [O('data', 'examples, and lets it learn the pattern', true), O('rules', 'even more detailed rules', false)],
    'Correct. ML learns patterns from data instead of being told every rule by hand.',
    'Machine learning is trained on examples rather than hand-written rules.'),
  { type: 'sorting',
    boxes: [ { id: 'rules', label: 'Write explicit rules' }, { id: 'ml', label: 'Train on examples' } ],
    items: [
      { id: 'tax', label: 'Calculate income tax from fixed brackets', box: 'rules' },
      { id: 'spam', label: 'Tell spam from real email', box: 'ml' },
      { id: 'sort', label: 'Sort a list of numbers', box: 'rules' },
      { id: 'face', label: 'Recognise a face in a photo', box: 'ml' },
      { id: 'trans', label: 'Translate a sentence between languages', box: 'ml' },
      { id: 'pin', label: 'Check a typed PIN matches the stored one', box: 'rules' }
    ] },
  S('Why has AI advanced so fast recently, beyond what the algorithms alone explain?',
    [O('scale', 'Huge datasets and powerful hardware to train on them', true), O('magic', 'The computers became conscious', false)],
    'Correct. Scale — data plus compute — drove most of the recent leap.',
    'The jump came mostly from massive data and fast hardware, not sentience.'),
  S('A model that scores brilliantly on its training data but fails on new data has…',
    [O('over', 'overfit — memorised instead of generalised', true), O('under', 'simply not trained long enough', false)],
    'Correct. Overfitting is memorising the training set rather than learning the pattern.',
    'That is overfitting: it memorised examples instead of learning to generalise.'),
  S('In the AI era, a crucial new skill is judging an AI’s output, because models can be…',
    [O('conf', 'confidently wrong', true), O('never', 'never mistaken', false)],
    'Correct. Models can state false things fluently, so verification matters.',
    'AI can be fluent and wrong at once — checking its output is essential.')
];
export function getCompAiEraWorkshop() { return cloneInteractions(COMP_AI_ERA_WORKSHOP); }

// Computing · AI behind the curtain
export const COMP_AI_BEHIND_WORKSHOP = [
  S('A large language model generates text by repeatedly predicting…',
    [O('next', 'the next most likely token (chunk of text)', true), O('whole', 'the whole answer in one exact lookup', false)],
    'Correct. It predicts one token at a time, each based on all the text so far.',
    'It works token by token, predicting the next chunk from everything before it.'),
  S('During training, a neural network learns by adjusting its…',
    [O('weights', 'weights, nudged to reduce prediction error', true), O('clock', 'clock speed', false)],
    'Correct. Learning is tuning millions of weights to make better predictions.',
    'Training adjusts the network’s weights to lower its error.'),
  { type: 'sorting',
    boxes: [ { id: 'train', label: 'Training time' }, { id: 'use', label: 'Using the model' } ],
    items: [
      { id: 'update', label: 'Weights are updated from examples', box: 'train' },
      { id: 'prompt', label: 'You type a prompt and read a reply', box: 'use' },
      { id: 'gpu', label: 'Huge compute crunches a giant dataset', box: 'train' },
      { id: 'fixed', label: 'The weights stay fixed, just running forward', box: 'use' }
    ] },
  S('Why can a model “hallucinate” a confident but false answer?',
    [O('pred', 'It predicts plausible text, not verified truth', true), O('bug', 'A rare software crash', false)],
    'Correct. It optimises for likely-sounding text, which is not always true.',
    'It generates plausible-sounding text, which can be fluent yet false.'),
  S('A model’s “knowledge” is essentially…',
    [O('pat', 'patterns compressed into its weights from training data', true), O('db', 'a live database it searches each time', false)],
    'Correct. It is patterns baked into weights, not a lookup of stored facts.',
    'It holds patterns in its weights rather than searching a database of facts.')
];
export function getCompAiBehindWorkshop() { return cloneInteractions(COMP_AI_BEHIND_WORKSHOP); }

// ── Chemistry: Atom Foundry (docs/ATOM-FOUNDRY-WORKSHOP-DESIGN.md) ──

export const CHEM_FOUNDRY_WORKSHOP = [
  {
    type: 'atomfoundry',
    prompt: 'Forge a nucleus, steady it, fill the shells, and strip electrons into ions.'
  },
  S('An atom has 19 protons. A cosmic ray knocks out an electron. What is it now?',
    [O('kion', 'Potassium ion, K⁺', true), O('argon', 'Argon — it lost a particle', false)],
    'Right. Electrons come and go; the 19 protons keep it potassium.',
    'Only protons set identity. 19 protons is potassium whether it has 19 or 18 electrons.'),
  { type: 'sorting',
    boxes: [
      { id: 'element', label: 'Changes the element' },
      { id: 'isotope', label: 'Makes an isotope' },
      { id: 'ion', label: 'Makes an ion' }
    ],
    items: [
      { id: 'addp', label: 'Add a proton', box: 'element' },
      { id: 'remp', label: 'Remove a proton', box: 'element' },
      { id: 'addn', label: 'Add a neutron', box: 'isotope' },
      { id: 'adde', label: 'Add an electron', box: 'ion' },
      { id: 'reme', label: 'Remove an electron', box: 'ion' },
      { id: 'twon', label: 'Two extra neutrons', box: 'isotope' }
    ] },
  S('Why does the second electron shell refuse a 9th electron?',
    [O('cap', 'Each shell has a strict capacity — shell 2 holds 8', true), O('repel', 'Electrons repel it away randomly', false)],
    'Correct. The shells fill inner-first and each has a fixed capacity: 2, then 8, then 8.',
    'It is not random. Shell 2 simply holds a maximum of 8 electrons — a 9th must sit further out.'),
  S('Chlorine-35 and chlorine-37 react identically in every experiment. Why?',
    [O('same', 'Same protons and same electron shells — chemistry only sees those', true), O('weigh', 'They weigh the same', false)],
    'Correct. Isotopes differ only in neutrons, and chemistry is decided by protons and electrons.',
    'They do not weigh the same — that is the whole point of isotopes. Chemistry ignores the neutron difference.'),
  S('Mg²⁺ and Ne both have 10 electrons. Are they the same thing?',
    [O('no', 'No — 12 protons vs 10 protons, different elements', true), O('yes', 'Yes — same electrons means same atom', false)],
    'Correct. Identity is the proton count: 12 is magnesium, 10 is neon, matching electrons or not.',
    'Matching electron counts do not make them the same. Magnesium has 12 protons; neon has 10.'),
  S('An ion reads charge −2 with 18 electrons. How many protons does it have?',
    [O('16', '16 — it gained two', true), O('20', '20', false), O('18', '18', false)],
    'Correct. Charge = protons − electrons, so −2 = protons − 18 gives 16 protons.',
    'Charge = protons − electrons. −2 = p − 18, so p = 16.')
];

export function getChemFoundryWorkshop() {
  return cloneInteractions(CHEM_FOUNDRY_WORKSHOP);
}

// ── Physics workshops ──

export const PHYS_WORKSHOPS = {

  // After BB 003 — Building the Universe (12 interactions)
  checkpoint_a: [
    { type: 'sorting', boxes: [
      { id: 'base', label: 'Base Unit (A raw brick)' },
      { id: 'derived', label: 'Derived Unit (Bricks snapped together)' }
    ], items: [
      { id: 'meter', label: 'The Meter', box: 'base' },
      { id: 'speed', label: 'Speed (meters per second)', box: 'derived' }
    ]},
    S('Tap the trench coat to pull the mask off a "Newton." The word Newton vanishes, revealing kg·m/s². Does a Newton use completely new math?',
      [O('no','No',true), O('yes','Yes',false)],
      'Exactly. It is just the standard kilograms, meters, and seconds hiding under a shorter name.',
      'Actually, no. There is no new math. It is just a messy combination of the big three base units, given a nickname.'),
    S('You are taking a physics test. You do a massive calculation to figure out how far a car traveled. Your final answer is "45 kilograms." Do you need to double-check your math?',
      [O('yes','Yes, immediately',true), O('no','No, that makes sense',false)],
      'Got it. This is the built-in lie detector. Distance is measured in meters, so if you end up with kilograms, your math is definitely wrong.',
      'Actually, yes. Distance cannot be measured in kilograms (weight). The units instantly tell you the math is wrong.'),
    S('Tap the wrong word to fix the sentence.\n\nWhen you multiply speed (meters/second) by time (seconds), the seconds cancel out, leaving you with just kilograms.',
      [O('meters','meters',true), O('scalar','a scalar',false)],
      'Yep. The seconds on the top and bottom cancel out perfectly, leaving just the distance (meters).',
      'Not quite. If you cancel out the seconds, the only word left is meters.'),
    S('The prefix "Kilo" (like in kilometer) is a brand new base unit.',
      [O('false','False',true), O('true','True',false)],
      'Exactly, that is false. Kilo isn\'t a unit at all. It is just a quick shorthand command that means "multiply by 1,000."',
      'Actually, that is false. Kilo is just a prefix. It just tells you to slide the decimal point.'),
    S('You are looking at a 1-meter dog. You slide the bar to jump exactly one order of magnitude larger — from 1 to 10. In physics, does an order of magnitude just mean "a little bit bigger"?',
      [O('no','No, it means exactly 10 times bigger',true), O('yes','Yes, it is just an estimate',false)],
      'Yep. Physics scales the universe in clean jumps of 10.',
      'Not quite. An order of magnitude is a very specific jump. It means multiplying by 10.'),
    S('I blindfold you and tell you there is a million dollars exactly 10 meters away from where you are standing. Can you walk straight to it?',
      [O('no','No',true), O('yes','Yes',false)],
      'Exactly. You have the amount (10) and the unit (meters), but you are missing the direction.',
      'Actually, you can\'t. You know exactly how far it is, but you don\'t know which way to walk.'),
    { type: 'sorting', boxes: [
      { id: 'scalar', label: 'Scalar (Amount only)' },
      { id: 'vector', label: 'Vector (Amount + Direction)' }
    ], items: [
      { id: 'temp', label: '70 degrees Fahrenheit', box: 'scalar' },
      { id: 'car', label: '60 miles per hour, heading North', box: 'vector' }
    ]},
    S('Tap the police officer\'s radar gun to see what it measures. A screen pops up: "85 MPH". Does a standard radar gun measure your velocity?',
      [O('no','No, it only measures speed',true), O('yes','Yes, it measures velocity',false)],
      'Yep. It doesn\'t care if you are driving toward New York or Miami. Because it doesn\'t track direction, it only measures speed (a scalar).',
      'Actually, no. Velocity requires a direction. The radar gun just gives a raw number, which is speed.'),
    S('Tap the wrong word to fix the sentence.\n\nBecause mass has no direction, your weight in kilograms is classified as a vector.',
      [O('scalar','scalar',true), O('derived','derived unit',false)],
      'Exactly. Whether you face up, down, or sideways, your mass doesn\'t change. It is just an amount (a scalar).',
      'Not quite. Mass has no direction, which makes it a scalar.'),
    S('You are driving a car in a perfect, continuous circle at exactly 60 miles per hour. Your velocity is constantly changing.',
      [O('true','True',true), O('false','False',false)],
      'Yep. Even though your speed is locked at 60, your steering wheel is turning. If direction changes, velocity changes.',
      'Actually, it is true. Because velocity is an amount plus a direction, constantly turning the wheel means your velocity is constantly changing.'),
    S('You are programming a self-driving car. If you only program the car to understand scalars, will it be able to safely navigate a city?',
      [O('no','No',true), O('yes','Yes',false)],
      'Got it. It would know how fast to go, but it wouldn\'t know when to turn or which way to steer. Physics requires vectors to navigate reality.',
      'Actually, no. A scalar only tells you amounts (like speed). To navigate, the car must understand direction (vectors).')
  ],

  // The Laws of Motion (Newton & Kinematics)
  checkpoint_b: [
    S('A mountain-sized asteroid is falling toward Earth. Its speed is 20 kilometers per second. Why is this specifically a velocity and not just a speed?',
      [O('aimed','Because it is aimed dead at the ground',true), O('fast','Because it is moving very fast',false)],
      'Exactly. Speed is just the raw number. Velocity is that number paired with a specific direction.',
      'Not quite. Extreme speed is still just a scalar. It becomes a velocity because it has a specific direction (toward the ground).'),
    S('Tap the wrong word to fix the sentence.\n\nAccording to Newton\'s First Law, an object in motion will naturally fade to a halt unless a force keeps it moving.',
      [O('coast','coast forever',true), O('explode','explode',false)],
      'Yep. Motion doesn\'t fade on its own. It requires friction or an obstacle to physically stop it.',
      'Actually, an object in motion will coast forever in a straight line. It only stops because friction or air resistance forces it to.'),
    { type: 'sorting', boxes: [
      { id: 'cancel', label: 'Cancel each other out' },
      { id: 'unbalanced', label: 'Create an unbalanced force' }
    ], items: [
      { id: 'gravity', label: 'Gravity pulling down', box: 'cancel' },
      { id: 'table', label: 'The table pushing up', box: 'cancel' }
    ]},
    S('A cart is being pushed with a steady force. The cart is filled with heavy bricks and visually slows down. According to the equation F = ma, what happens to acceleration when mass increases but the force stays the same?',
      [O('drops','Acceleration drops',true), O('rises','Acceleration rises',false)],
      'Yep. The heavier the object, the more force is required to move it. If the force doesn\'t change, the acceleration must drop.',
      'Actually, acceleration drops. If a mass gets heavier, the exact same push will move it much slower.'),
    S('When a rifle fires, the bullet is pushed forward with much more force than the rifle is pushed backward.',
      [O('false','False',true), O('true','True',false)],
      'Exactly, that\'s false. The force is identical on both sides. The bullet just moves faster because it has a tiny mass.',
      'Actually, that\'s false. The force is exactly equal in both directions. The bullet just accelerates faster because it is incredibly light.'),
    S('A rocket engine fires in the empty vacuum of space. Exhaust shoots backward; the rocket moves forward. Since there is no air in space, what is the rocket pushing against?',
      [O('exhaust','Its own exhaust',true), O('space','The fabric of space',false)],
      'Got it. By throwing mass backward, it credits itself with forward momentum to balance the ledger.',
      'Not quite. A rocket pushes against its own fuel. It throws exhaust backward, which forces the ship forward.')
  ],

  // Relativity & Measurement (Frames & Errors)
  checkpoint_c: [
    S('A train travels East at 10 meters per second. A passenger walks toward the back of the train at 2 meters per second. How fast is the passenger moving relative to the ground outside?',
      [O('8','8 meters per second, East',true), O('12','12 meters per second, East',false)],
      'Yep. The backward walking speed simply subtracts from the forward train speed.',
      'Not quite. Because they are walking backward against the direction of the train, their speed relative to the ground drops to 8 meters per second.'),
    { type: 'sorting', boxes: [
      { id: 'vertical', label: 'Sees rain falling vertically' },
      { id: 'slant', label: 'Sees rain hitting at an aggressive slant' }
    ], items: [
      { id: 'person', label: 'A stationary person on the sidewalk', box: 'vertical' },
      { id: 'driver', label: 'A driver in a car moving 60 mph', box: 'slant' }
    ]},
    S('Tap the wrong word to fix the sentence.\n\nIf a digital scale is broken and constantly reads 5 grams too heavy, taking the average of a thousand trials will fix the error.',
      [O('fail','fail to change',true), O('randomize','randomize',false)],
      'Got it. A systematic error bakes a bias into the math. Averaging only fixes random, scattered noise.',
      'Actually, averaging will fail to fix it. Averaging a thousand biased readings just results in an average that is 5 grams too heavy.'),
    S('To cut the uncertainty of a measurement in half, an instrument must be tested exactly twice as many times.',
      [O('false','False',true), O('true','True',false)],
      'Yep, that\'s false. It requires four times as many tests. The math has a strict law of diminishing returns.',
      'Actually, that\'s false. Because of the law of diminishing returns, cutting the error in half requires four times as many trials.'),
    S('A single atom of oxygen floats in a vacuum. Does this single atom have a temperature?',
      [O('no','No',true), O('yes','Yes',false)],
      'Exactly. Temperature is the average speed of billions of atoms bouncing off each other. A single particle cannot be hot or cold.',
      'Not quite. Temperature is an emergent property. It only exists when billions of atoms interact. A single atom has no temperature.')
  ],

  // The Edge of Physics (Dimensions & Newton)
  checkpoint_d: [
    S('Tap the equals sign on this equation: Force = mass + velocity. The equation flashes RED and breaks apart. Why did the equation fail before numbers were even plugged in?',
      [O('dimensions','The dimensional units do not match',true), O('fast','Velocity is too fast to add',false)],
      'Yep. The Homogeneity Principle dictates that you cannot add different dimensions together. You can\'t add mass to speed.',
      'Not quite. According to the Homogeneity Principle, every piece of an equation must share the exact same underlying dimensional units.'),
    S('How did physicist G.I. Taylor deduce the highly classified energy yield of the first atomic bomb just by looking at a photograph of the fireball?',
      [O('dimensions','He mathematically balanced the visible dimensions (Length and Time) against the dimensions of Energy',true), O('stole','He stole the blueprints',false)],
      'Exactly. By forcing the dimensions on both sides of the equation to match, he mathematically cornered the exact explosive yield.',
      'Actually, he used Dimensional Analysis. By perfectly balancing the visible units (Length, Time, Mass), the math revealed the secret.'),
    S('In coordinate geometry, a computer proves a shape is a rectangle by looking at a picture of it.',
      [O('false','False',true), O('true','True',false)],
      'Yep, that\'s false. A computer proves it by running the Distance and Slope formulas to verify the math is perfect.',
      'Actually, that\'s false. A visual image can be deceptive. The computer calculates the exact length and angle of every line to prove it.'),
    { type: 'sorting', boxes: [
      { id: 'broken', label: 'The broken orbit' }
    ], items: [
      { id: 'mercury', label: 'Mercury', box: 'broken' },
      { id: 'neptune', label: 'Neptune', box: null }
    ]}
  ],

  // The Illusion of Stillness (Equilibrium)
  checkpoint_e: [
    S('A cargo ship sits motionless on a calm ocean. Massive red and blue arrows appear: Gravity pulls down, Buoyancy pushes up. Does "motionless" mean there are no forces acting on the ship?',
      [O('no','No, the forces are perfectly balanced',true), O('yes','Yes, forces only exist when things move',false)],
      'Exactly. "At rest" is just a disguise. It means the forces are in a dead heat, canceling each other out entirely.',
      'Actually, no. Massive forces are acting on the ship at all times. It doesn\'t move because those forces are perfectly balanced.'),
    S('Tap the wrong word to fix the sentence.\n\nIf you push a car on a sheet of frictionless ice in a vacuum, the car will eventually stop on its own.',
      [O('coast forever','coast forever',true), O('explode','explode',false)],
      'Yep. Without friction to bleed the energy away, motion simply persists. Things do not stop unless forced to.',
      'Actually, it would coast forever. Things do not naturally stop. They only stop because a force (like friction) pushes back against them.'),
    S('The ship\'s engine is off. Gravity and Buoyancy are perfectly matched. The throttle is pushed forward — a massive forward arrow appears and the ship begins to move. What caused the motion to finally change?',
      [O('unbalanced','An unbalanced force was added',true), O('gravity','Gravity disappeared',false)],
      'Got it. Motion only changes the instant the balance breaks. The engine provided a force that wasn\'t canceled out.',
      'Not quite. Motion changes because a new, unbalanced force was added by the engine, breaking the perfect equilibrium.'),
    S('If a car is cruising down the highway at a perfectly steady 60 miles per hour, the net force on the car is zero.',
      [O('true','True',true), O('false','False',false)],
      'Yep. Because the speed isn\'t changing (accelerating or braking), the engine\'s push is perfectly matched by the air\'s drag.',
      'Actually, that\'s true. If velocity isn\'t changing, acceleration is zero. And if acceleration is zero, the net force must be perfectly balanced at zero.'),
    { type: 'sorting', boxes: [
      { id: 'cause', label: 'A force causes...' }
    ], items: [
      { id: 'change', label: 'a change in motion', box: 'cause' }
    ]},
    S('A steel block sits under a hydraulic press. The press pushes down with ten tonnes of force. The block doesn\'t move a millimeter. Why?',
      [O('table','The table underneath pushes up with exactly ten tonnes',true), O('off','The press isn\'t turned on',false)],
      'Yep. Action and reaction. The table pushes back exactly as hard as the press pushes down, keeping the block perfectly balanced.',
      'Actually, the table underneath is pushing back up with the exact same ten tonnes of force, perfectly balancing the equation.')
  ],

  // The Invisible Anchor (Mass vs. Weight)
  checkpoint_f: [
    S('Tap the wrong word to fix the sentence.\n\nIf an astronaut takes their bathroom scale to the Moon, it will show a smaller number because they have lost mass.',
      [O('weight','weight',true), O('gravity','gravity',false)],
      'Exactly. Mass is the amount of physical stuff in a body. It never changes. The scale just reads less weight because the Moon\'s gravity is weaker.',
      'Actually, mass never changes. The scale reads less because the weight (the pull of gravity) is weaker on the Moon.'),
    { type: 'sorting', boxes: [
      { id: 'stuff', label: 'An amount of stuff' },
      { id: 'force', label: 'A physical force' }
    ], items: [
      { id: 'mass', label: 'Mass (Kilograms)', box: 'stuff' },
      { id: 'weight', label: 'Weight (Newtons)', box: 'force' }
    ]},
    S('An astronaut floats in deep, empty space, far from any gravity. Does the astronaut weigh anything? Does the astronaut have mass?',
      [O('zeromass','Weight is zero, but Mass remains the same',true), O('bothzero','Both are zero',false)],
      'Yep. With no gravity, weight hits zero. But if you try to push the astronaut, they will still resist moving. That resistance is their mass.',
      'Actually, weight drops to zero because there is no gravity. But mass (the amount of stuff) remains exactly the same.'),
    S('A hammer and a feather are dropped in a vacuum chamber with no air resistance. Both objects fall perfectly side-by-side. Why do they hit the ground at the exact same instant?',
      [O('rate','Gravity accelerates all masses at the exact same rate',true), O('heavier','The feather got heavier',false)],
      'Exactly. In the equation W = mg, the mass cancels out. Every single object falls at the exact same rate of acceleration.',
      'Not quite. In a vacuum, gravity accelerates every single object at the exact same rate, regardless of how heavy it is.'),
    S('A heavy bowling ball hits the ground with more force than a golf ball because gravity accelerates it faster.',
      [O('false','False',true), O('true','True',false)],
      'Yep, that\'s false. They both accelerate at the exact same speed. The bowling ball hits harder purely because it has more mass behind that speed.',
      'Actually, that\'s false. Gravity accelerates both balls at the exact same speed. The bowling ball just hits harder because it has more mass.'),
    S('Why is it harder to push a broken-down truck than a broken-down motorcycle?',
      [O('mass','The truck has more mass, requiring more force to accelerate it',true), O('gravity','The truck has more gravity',false)],
      'Got it. F = ma. If mass is huge, an enormous amount of force is needed to achieve even a tiny bit of acceleration.',
      'Not quite. It is harder to push because the truck has more mass, meaning it requires exponentially more force to accelerate.')
  ],

  // The Moving Baseline (Relative Velocity)
  checkpoint_g: [
    S('A person walks 2 miles per hour toward the front of a train. The train moves 50 miles per hour forward. How fast is the person moving relative to the tracks outside?',
      [O('52','52 miles per hour',true), O('50','50 miles per hour',false)],
      'Exactly. The velocities simply add together.',
      'Not quite. The walking speed simply adds to the train\'s speed, making the velocity 52 mph relative to the ground.'),
    S('A car drives 60 miles per hour through a windless rainstorm. The rain appears to streak aggressively backward across the window. Did the rain suddenly change direction?',
      [O('no','No, the car\'s forward motion makes the rain look slanted',true), O('yes','Yes, the wind picked up',false)],
      'Yep. The vertical fall of the rain and the forward motion of the car combine into a single, diagonal relative velocity.',
      'Actually, no. The rain is still falling straight down. The combination of the rain falling and the car rushing forward creates a slanted visual streak.'),
    S('There is a secret, hidden point in the center of the universe that is absolutely, perfectly still.',
      [O('false','False',true), O('true','True',false)],
      'Exactly, that\'s false. Everything is moving relative to something else. There is no absolute stillness in physics.',
      'Actually, that\'s false. "At rest" only means not moving compared to a chosen baseline. Nothing in the universe is absolutely still.'),
    S('Tap the wrong word to fix the sentence.\n\nA head-on collision between two cars moving 30 mph is identical to hitting a parked car at 30 mph.',
      [O('60 mph','60 mph',true), O('0 mph','0 mph',false)],
      'Got it. Because they are moving toward each other, their closing speed is the sum of both (60 mph).',
      'Actually, because they are moving toward each other, their speeds combine. The impact is the equivalent of 60 mph.'),
    { type: 'sorting', boxes: [
      { id: 'passengers', label: 'Velocity relative to the passengers' },
      { id: 'ground', label: 'Velocity relative to the ground' }
    ], items: [
      { id: 'slow', label: '2 mph', box: 'passengers' },
      { id: 'fast', label: '502 mph', box: 'ground' }
    ]},
    S('A boat is aimed straight across a river. The water flows fast to the right. Where will the boat actually land on the opposite shore?',
      [O('diagonal','Diagonally downstream',true), O('straight','Straight across',false)],
      'Exactly. The boat\'s forward velocity and the river\'s sideways velocity combine, pushing the boat on a diagonal path.',
      'Not quite. The river\'s current pushes the boat sideways while it drives forward, resulting in a diagonal path downstream.')
  ],

  // The Invention of Rulers
  checkpoint_h: [
    S('Waking up on an alien planet. Someone hands over a rock and asks how heavy it is. There are no scales, and the word "pound" does not exist. Can the question be answered?',
      [O('no','No, without a standard unit, the weight cannot be communicated',true), O('yes','Yes, just guess',false)],
      'Exactly. Without an agreed-upon standard reference, numbers mean absolutely nothing.',
      'Not quite. A guess can be made, but without a standard unit of measurement to compare against, the number has no actual meaning.'),
    { type: 'sorting', boxes: [
      { id: 'agree', label: 'The fundamental agreement' }
    ], items: [
      { id: 'stick', label: 'Declare that everything else will be compared to this exact stick', box: 'agree' }
    ]},
    S('Tap the wrong word to fix the sentence.\n\nTo describe the entire physical universe, scientists had to invent thousands of fundamental base units.',
      [O('exactly seven','exactly seven',true), O('zero','zero',false)],
      'Got it. They stripped the chaos away and agreed on exactly 7 fundamental tools (like the Meter, Kilogram, and Second).',
      'Not quite. The scientific community stripped away the chaos and agreed on exactly seven fundamental base units.'),
    S('Speed requires a brand new, independent measuring tool because it is not one of the 7 base units.',
      [O('false','False',true), O('true','True',false)],
      'Yep, that\'s false. Speed is just Distance divided by Time. It is a "Derived Unit," built entirely out of the original base units.',
      'Actually, that\'s false. Speed is derived by simply dividing a Meter by a Second. It doesn\'t need a new tool.'),
    S('The word "Newton" (a unit of force) is tapped to pull its mask off. The word changes to kg·m/s². Is a Newton using brand new math?',
      [O('no','No, it is just base units stacked together',true), O('yes','Yes, it is a new dimension',false)],
      'Exactly. Physicists just got tired of writing the messy fraction, so they disguised it with a shorter name.',
      'Actually, no. A Newton is just Kilograms, Meters, and Seconds stacked together and given a nickname.'),
    S('In 1889, the world defined a "Kilogram" using a solid metal cylinder locked in a vault in Paris. A hundred years pass — the cylinder loses 50 micrograms of dust. Because the cylinder was the definition of a kilogram, what happened to the math of the universe?',
      [O('shift','The definition of mass silently shifted to match the fluctuating metal',true), O('nothing','Nothing changed',false)],
      'Yep. This is the fatal flaw of using physical objects. If the object changes, the entire global math system changes with it.',
      'Not quite. Because the object defined the unit, its weight loss meant the definition of a Kilogram silently shifted across the entire planet.')
  ],

  // Constants & Scale
  checkpoint_i: [
    S('To stop the definition of a Meter from fluctuating, scientists threw the physical metal bar in the garbage. What did they tie the definition of the Meter to instead?',
      [O('light','The speed of light in a vacuum',true), O('earth','The circumference of the Earth',false)],
      'Exactly. Because the speed of light is a universal constant that never changes, the measurement is now permanently woven into reality.',
      'Not quite. They tied it to the speed of light. Because light speed is an unbreakable universal constant, the definition can never fluctuate again.'),
    { type: 'sorting', boxes: [
      { id: 'time', label: 'The modern definition of Time' }
    ], items: [
      { id: 'cesium', label: 'The exact vibration of a Cesium atom', box: 'time' }
    ]},
    S('Tap the wrong word to fix the sentence.\n\nIn physics, it is perfectly acceptable to add a unit of mass to a unit of length.',
      [O('physically impossible','physically impossible',true), O('mathematically illegal','mathematically illegal',false)],
      'Yep. 5 kilograms cannot be added to 5 meters. Every piece of an equation must share the exact same underlying dimensions.',
      'Not quite. It is physically impossible. The Homogeneity Principle states that only dimensions that are exactly the same can be added.'),
    S('A massive calculation is done to find distance, and the final answer is labeled in "Kilograms." This instantly reveals the math is wrong.',
      [O('true','True',true), O('false','False',false)],
      'Exactly. Distance is measured in meters. The dimensions act as a built-in lie detector before the numbers are even checked.',
      'Actually, that\'s true. The dimensions act as a lie detector. If the units don\'t match the physical reality, the math is guaranteed to be wrong.'),
    S('The prefix "Kilo" in the word Kilometer is tapped. The word "Kilo" changes to "Multiply by 1,000." Is Kilo a brand new unit of measurement?',
      [O('no','No, it is just shorthand for sliding the decimal point',true), O('yes','Yes, it is a new base unit',false)],
      'Got it. The base unit (the meter) never changes. The prefix just zooms the camera in or out.',
      'Actually, no. It is just shorthand. It tells the decimal point to slide without changing the underlying unit.'),
    S('A 1-meter dog is observed. The bar slides to jump exactly one "Order of Magnitude" larger — the animal instantly becomes a 10-meter whale. In physics, does an order of magnitude mean multiplying by 2?',
      [O('no','No, it means multiplying by exactly 10',true), O('yes','Yes, it just means "bigger"',false)],
      'Yep. Physics scales the universe in clean, strict jumps of 10.',
      'Not quite. An order of magnitude is a strict mathematical jump. It means multiplying by exactly 10.')
  ],

  // The Blindfold & The Arrow (Vectors)
  checkpoint_j: [
    S('A blindfold is on. There is a million dollars exactly 10 meters away. The unit (meters) and the scale (10) are known. Can the money be walked to directly?',
      [O('no','No, the direction is missing',true), O('yes','Yes, the distance is known',false)],
      'Exactly. A number and a unit are not enough to map reality. The final puzzle piece — direction — is missing.',
      'Not quite. The exact distance is known, but which way to walk is unknown. The direction is missing.'),
    { type: 'sorting', boxes: [
      { id: 'scal', label: 'Scalar (Amount only)' },
      { id: 'vec', label: 'Vector (Amount + Direction)' }
    ], items: [
      { id: 'tempf', label: '70 degrees Fahrenheit', box: 'scal' },
      { id: 'carv', label: '60 miles per hour, heading North', box: 'vec' }
    ]},
    S('Tap the wrong word to fix the sentence.\n\nA police radar gun measures the exact velocity as a car drives past.',
      [O('speed','speed',true), O('weight','weight',false)],
      'Yep. The radar gun doesn\'t care if the car is driving toward New York or Miami. It only tracks the raw number (Speed).',
      'Not quite. A radar gun only measures Speed. To measure Velocity, it would have to track the exact compass direction as well.'),
    S('A car drives in a perfect circle at exactly 60 mph. The velocity never changes.',
      [O('false','False',true), O('true','True',false)],
      'Yep, that\'s false. Velocity requires direction. Because the steering wheel is turning, the direction is changing every second, meaning the velocity is constantly changing.',
      'Actually, that\'s false. Because the car is constantly turning, the direction is changing. Therefore, the velocity is constantly changing.'),
    S('A plain 10-meter line segment drawn on a map is tapped. An arrowhead appears on one end, turning it into a Vector Arrow. Why did physicists hack geometry by painting an arrowhead on a segment?',
      [O('capture','Because it perfectly captures the amount AND the direction in one drawing',true), O('clean','Because it looks cleaner',false)],
      'Exactly. The length of the stick is the scalar (how much). The arrowhead is the direction. It is a completely self-contained map.',
      'Not quite. By adding an arrowhead, the drawing now captures both the amount (the length) and the direction. It becomes a Vector.'),
    S('In standard math, 1 + 1 always equals 2. But walking 1 meter North, then walking 1 meter South, results in being right back where one started (0). Why did the math break?',
      [O('direction','Because Vectors have direction that changes how they add together',true), O('slow','Because the walk was too slow',false)],
      'Got it. Vectors cannot be added like a pile of apples. Their directions must be combined, which can cancel the numbers out entirely.',
      'Actually, it is because Vectors have direction. Walking backward cancels out walking forward, meaning Vector addition does not follow normal arithmetic rules.')
  ]
};

export function getPhysWorkshop(checkpointIndex) {
  const keys = Object.keys(PHYS_WORKSHOPS);
  if (checkpointIndex < keys.length) {
    return PHYS_WORKSHOPS[keys[checkpointIndex]];
  }
  return null;
}

export function getAtomWorkshop(checkpointIndex) {
  const keys = Object.keys(ATOM_WORKSHOPS);
  if (checkpointIndex < keys.length) {
    return ATOM_WORKSHOPS[keys[checkpointIndex]];
  }
  return null;
}

export function getLineWorkshop(checkpointIndex) {
  const keys = Object.keys(LINE_WORKSHOPS);
  if (checkpointIndex < keys.length) {
    return LINE_WORKSHOPS[keys[checkpointIndex]];
  }
  return null;
}
