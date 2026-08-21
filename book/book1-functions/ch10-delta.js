// 10. Difference, delta, and rate
//
// The chapter the book was missing. Draft 2 went straight from function
// families to [f(b) - f(a)]/(b - a) without ever saying that a difference is a
// subtraction, that a rate is a division, or that the symbol Delta means "the
// change in". Those three facts are too obvious to write down, which is
// exactly why every text skips them and every reader who is lost is lost here.
//
// Placed immediately before average rate of change, so the payoff is the next
// page rather than three chapters later.

export default {
  id: 10,
  title: 'Difference, delta, and rate',
  standfirst: 'Everything calculus does is a subtraction followed by a division. This chapter does both slowly.',

  blocks: [
    { t: 'p', text: 'The next four chapters are built from two operations you have known for years. Nothing new is introduced here. What is introduced is the **notation**, and a habit of saying out loud which subtraction and which division are being performed, because from chapter 13 onward the answer stops being obvious.' },

    { t: 'h', text: 'A difference is a subtraction' },
    { t: 'p', text: 'A plant is 12 cm tall on day 4 and 30 cm tall on day 13. How much did it grow? Subtract: 30 − 12 = 18 cm. That is the **difference**, and there is nothing more to it.' },
    { t: 'p', text: 'Two things are worth stating anyway, because both cause trouble later.' },
    { t: 'list', items: [
      '**The order is new minus old**, not the other way round. Writing 12 − 30 answers a different question.',
      '**The sign is information, not an error.** A difference of −30 says the quantity fell by 30. It is an answer, not a mistake to be tidied away.'
    ] },

    { t: 'figure', kind: 'numberline', from: 0, to: 36, ticks: false,
      spans: [{ a: 12, b: 30, label: 'the difference: 18 cm' }],
      marks: [{ x: 12, label: 'day 4' }, { x: 30, label: 'day 13' }],
      caption: 'The difference is the gap between two readings, and subtraction is how you measure a gap. Nothing here depends on the quantity being a height.' },

    { t: 'h', text: 'Delta is shorthand for "the change in"' },
    { t: 'p', text: 'Writing "the change in height" every time is tiring, so mathematics borrows a Greek capital D: **Δ**. Read Δh as "delta h", meaning *the change in h*. It is one symbol standing for four words.' },
    { t: 'formula', text: 'Δh = 30 - 12 = 18 cm      Δt = 13 - 4 = 9 days' },

    { t: 'callout', title: 'Δ is not a number, and it does not multiply',
      text: 'Δh does not mean Δ times h. Δ is not a quantity at all; it is an instruction that only means anything when a letter follows it. This is the same trap as f(x) in chapter 3, where the brackets looked like multiplication and were not. The cure is the same: read it as a word.' },

    { t: 'table', head: ['Written', 'Read aloud', 'Means'],
      rows: [
        ['Δh', 'delta h', 'the change in height'],
        ['Δt', 'delta t', 'the change in time'],
        ['Δx', 'delta x', 'the change in the input'],
        ['Δy', 'delta y', 'the change in the output']
      ] },

    { t: 'example', n: 1,
      ask: 'A tank holds 80 litres at 9am and 50 litres at 3pm. Find ΔV and Δt, and say what the signs mean.',
      steps: [
        'Volume: new minus old, so ΔV = 50 − 80 = −30 litres.',
        'Time: 3pm minus 9am, so Δt = 6 hours.',
        'The negative ΔV says the tank lost 30 litres. It is not an error to be dropped.',
        'Δt is positive because time ran forwards, which it does in every question in this book.'
      ],
      answer: 'ΔV = −30 litres and Δt = 6 hours.',
      note: 'Δt is almost always positive, so the sign of a rate almost always comes from the top of the fraction. That is a useful thing to know when checking an answer.',
      show: { kind: 'numberline', from: 0, to: 90, ticks: false,
        spans: [{ a: 50, b: 80, tone: 'out', label: 'ΔV = -30 litres' }],
        marks: [{ x: 80, label: '9am' }, { x: 50, label: '3pm' }],
        caption: 'The reading moved leftward down the scale, which is what a negative difference looks like.' },
      turn: { ask: 'A price falls from 240 to 200 over 5 weeks. Find ΔP and Δt.',
        a: 'ΔP = −40 and Δt = 5 weeks.' } },

    { t: 'h', text: 'A rate is a division' },
    { t: 'p', text: 'The plant grew 18 cm, but over nine days. To compare it with anything else you need to know how much it grew **per one day**, and the word *per* means *divided by*.' },
    { t: 'formula', text: '18 cm shared over 9 days:   18 / 9 = 2 cm per day' },

    { t: 'figure', kind: 'share', total: 18, parts: 9, each: 2, unit: 'cm', per: 'days',
      caption: 'A rate is the answer to "how much for one of them". Dividing 18 by 9 shares the growth out evenly, and the highlighted box is what one day gets.' },

    { t: 'p', text: 'That sharing is a slight fiction: the plant did not grow exactly 2 cm on each of the nine days. The rate is the steady growth that would have produced the same total in the same time, which is precisely what the word *average* will mean in the next chapter.' },

    { t: 'example', n: 2,
      ask: 'A car covers 150 miles in 3 hours. Find its rate. Then a second car covers 150 miles in 2 hours.',
      steps: [
        'Rate means per one hour, so divide the distance by the time: 150 ÷ 3 = 50.',
        'The units come along with the arithmetic: miles divided by hours gives miles per hour.',
        'Second car: 150 ÷ 2 = 75 miles per hour.',
        'The same distance in less time gives a bigger rate, because the divisor shrank while the top stayed the same.'
      ],
      answer: '50 mph and 75 mph.',
      note: 'Notice which number moved. Dividing by a smaller number gives a bigger answer, and that single fact is why the derivative in chapter 13 needs a limit rather than just setting the interval to zero.',
      show: { kind: 'frames', label: 'Same distance, different times',
        frames: [
          { kind: 'share', total: 150, parts: 3, each: 50, unit: 'mi', per: 'hours', pick: '3 hours',
            say: '150 shared over 3 hours gives 50 to each hour.' },
          { kind: 'share', total: 150, parts: 2, each: 75, unit: 'mi', per: 'hours', pick: '2 hours',
            say: 'The same 150 shared over 2 hours gives 75 to each. Fewer parts, bigger share.' }
        ] },
      turn: { ask: 'A printer produces 240 pages in 8 minutes. Find its rate. What if it took 6 minutes?',
        a: '30 pages per minute, and 40 pages per minute.' } },

    { t: 'h', text: 'A rate of change is one difference divided by another' },
    { t: 'p', text: 'Put the two halves together. The top of the fraction is a difference. The bottom is also a difference. The whole thing is a division.' },
    { t: 'formula', text: 'rate of change = Δy / Δx' },
    { t: 'p', text: 'For the plant: Δh = 18 cm and Δt = 9 days, so Δh/Δt = 18/9 = 2 cm per day. Every symbol in that line has now been explained, and none of it is new arithmetic.' },

    { t: 'figure', kind: 'delta', f: t => 12 + 2 * (t - 4), a: 4, b: 13,
      title: 'THE TWO DIFFERENCES, DRAWN', note: 'cm against days', unit: 'cm/day',
      x0: 0, x1: 15, y0: 0, y1: 36, w: 320, h: 235,
      caption: 'The orange leg is Δt, measured along the bottom. The teal leg is Δh, measured up the side. The dashed line joining the two points is what the next chapter calls a secant, and its steepness is the quotient of the two legs.' },

    { t: 'callout', title: 'The two deltas do not cancel',
      text: 'Δy/Δx cannot be simplified to y/x. Δ is not a factor multiplying y, so there is nothing to cancel. Written out in full the fraction reads (y₂ − y₁)/(x₂ − x₁), and no part of that expression is a common factor of the other.' },

    { t: 'h', text: 'One number, many names' },
    { t: 'p', text: 'Depending on what the two quantities are, the same division gets a different name. They are not different ideas, and it is worth seeing them side by side once.' },

    { t: 'table', head: ['Δ on top', 'Δ underneath', 'The quotient is called', 'Units'],
      rows: [
        ['distance', 'time', 'speed', 'metres per second'],
        ['height', 'horizontal distance', 'gradient, or slope', 'rise per run'],
        ['cost', 'quantity', 'cost per unit', 'pounds per item'],
        ['volume', 'time', 'flow rate', 'litres per minute'],
        ['population', 'time', 'growth rate', 'people per year'],
        ['output y', 'input x', 'rate of change of the function', 'output units per input unit']
      ] },

    { t: 'p', text: 'The last row is the general case and the other five are instances of it. When chapter 13 writes dy/dx, it is writing the last row with the interval shrunk to nothing, which is why the notation keeps the shape of a fraction.' },

    { t: 'example', n: 3,
      ask: 'A line passes through (2, 5) and (6, 17). Find Δy, Δx, and the rate of change.',
      steps: [
        'Δy is the change in the second coordinate: 17 − 5 = 12.',
        'Δx is the change in the first: 6 − 2 = 4.',
        'Divide: Δy/Δx = 12/4 = 3.',
        'Check the order. Taking both differences the other way gives −12 and −4, and (−12)/(−4) is still 3, so the answer does not depend on which point you call first, provided you are consistent.'
      ],
      answer: 'Δy = 12, Δx = 4, and the rate of change is 3.',
      note: 'That last step matters. Being consistent is the whole requirement; there is no rule about which point must come first.',
      show: { kind: 'delta', f: x => 3 * x - 1, a: 2, b: 6, title: 'RISE OVER RUN', note: 'through (2,5) and (6,17)',
        x0: 0, x1: 8, y0: 0, y1: 22, w: 300, h: 225,
        caption: 'Four across and twelve up, so three up for every one across. On a straight line this number is the same wherever the two points are placed.' },
      turn: { ask: 'A line passes through (1, 4) and (5, 6). Find Δy, Δx, and the rate.',
        a: 'Δy = 2, Δx = 4, and the rate is 0.5.' } },

    { t: 'example', n: 4,
      ask: 'A tank drains from 80 litres to 50 litres over 6 hours. Find the rate of change, and say what its sign means.',
      steps: [
        'ΔV = 50 − 80 = −30 litres, from example 1.',
        'Δt = 6 hours.',
        'Divide: −30/6 = −5 litres per hour.',
        'The negative sign says the volume is falling. The tank loses 5 litres in each hour.'
      ],
      answer: '−5 litres per hour.',
      note: 'A negative rate does not mean time ran backwards. Δt was positive throughout; the minus came from the top of the fraction, where the quantity genuinely decreased.',
      show: { kind: 'delta', f: t => 80 - 5 * t, a: 0, b: 6, title: 'A FALLING QUANTITY', note: 'litres against hours', unit: 'l/h',
        x0: 0, x1: 8, y0: 0, y1: 95, w: 300, h: 225,
        caption: 'The teal leg points downward, so Δy is negative while Δx is positive. A line that falls from left to right always has a negative rate of change.' },
      turn: { ask: 'A phone battery falls from 90% to 30% over 4 hours. Find the rate of change with its sign.',
        a: '−15 percentage points per hour.' } },

    { t: 'h', text: 'Why this is worth a chapter' },
    { t: 'p', text: 'Everything remaining in this book is these two operations applied more carefully. The next chapter divides one difference by another and calls it an average rate. Chapter 12 asks what that quotient approaches as the bottom shrinks. Chapter 13 gives the answer a name and a symbol. Chapter 14 runs the whole thing backwards.' },
    { t: 'p', text: 'If any later chapter stops making sense, the question to ask first is always the same: **which two things are being subtracted, and what is being divided by what?**' }
  ],

  drills: [
    { kind: 'rate', tier: 'Warm-up', what: 'A plant', verb: 'is', unit: 'cm', per: 'days',
      pairs: [[4, 12, 13, 30], [0, 5, 10, 45], [2, 20, 8, 38]] },
    { kind: 'rate', what: 'A tank', verb: 'holds', unit: 'litres', per: 'hours',
      pairs: [[0, 80, 6, 50], [1, 60, 5, 20], [0, 12, 4, 40]], tier: 'Core' },
    { kind: 'rate', what: 'A car', verb: 'has covered', unit: 'miles', per: 'hours',
      pairs: [[0, 0, 3, 150], [1, 40, 4, 220]], tier: 'Core' }
  ],

  practice: [
    { q: 'A plant is 12 cm on day 4 and 30 cm on day 13. Find Δh and Δt.', level: 'Calculate',
      a: 'Δh = 30 − 12 = 18 cm, and Δt = 13 − 4 = 9 days.',
      show: { kind: 'delta', f: t => 12 + 2 * (t - 4), a: 4, b: 13, title: 'BOTH DIFFERENCES', note: 'cm against days', unit: 'cm/day', x0: 0, x1: 15, y0: 0, y1: 36, w: 290, h: 215,
        caption: 'Nine along the bottom and eighteen up the side.' } },
    { q: 'Using those two, find the rate of change with units.', level: 'Calculate',
      a: '18/9 = 2 cm per day.',
      show: { kind: 'share', total: 18, parts: 9, each: 2, unit: 'cm', per: 'days',
        caption: 'The growth shared evenly over the nine days. The rate is what one day gets.' } },
    { q: 'A price rises from 200 to 260 over 4 weeks. Find ΔP, Δt, and the rate.', level: 'Calculate',
      a: 'ΔP = 60, Δt = 4 weeks, and the rate is 15 per week.',
      show: { kind: 'delta', f: t => 200 + 15 * t, a: 0, b: 4, title: 'A RISING PRICE', note: 'per week', unit: '/wk', x0: 0, x1: 6, y0: 190, y1: 275, w: 290, h: 215,
        caption: 'Both legs point the helpful way, so the rate is positive.' } },
    { q: 'A price falls from 260 to 200 over 4 weeks. Find ΔP and the rate.', level: 'Calculate',
      a: 'ΔP = −60 and the rate is −15 per week. Only the sign has changed.',
      show: { kind: 'delta', f: t => 260 - 15 * t, a: 0, b: 4, title: 'THE SAME MOVE, REVERSED', note: 'per week', unit: '/wk', x0: 0, x1: 6, y0: 190, y1: 275, w: 290, h: 215,
        caption: 'The teal leg now points down. Δt stayed positive, so the minus came entirely from the top.' } },
    { q: 'Explain in one sentence why Δy / Δx cannot be cancelled to y / x.', level: 'Recognise',
      a: 'Because Δ is an instruction rather than a quantity multiplying y, so there is no common factor to cancel; written in full the fraction is (y₂ − y₁)/(x₂ − x₁).',
      show: { kind: 'blanks', rule: 'Δy / Δx', sub: 'written out in full', result: '(y2 - y1)/(x2 - x1)',
        caption: 'Nothing in the lower expression is a factor of the upper one, which is why nothing cancels.' } },
    { q: 'A car covers 240 miles in 4 hours. Find its rate. What rate covers the same distance in 3 hours?', level: 'Calculate',
      a: '60 mph, and 80 mph. The same top divided by a smaller bottom gives a bigger answer.',
      show: { kind: 'frames', label: 'Same distance, fewer hours',
        frames: [
          { kind: 'share', total: 240, parts: 4, each: 60, unit: 'mi', per: 'hours', pick: '4 hours', say: 'Each hour gets 60 miles.' },
          { kind: 'share', total: 240, parts: 3, each: 80, unit: 'mi', per: 'hours', pick: '3 hours', say: 'Three shares instead of four, so each share is larger.' }
        ] } },
    { q: 'Name the quotient when delta volume is divided by delta time, and give its units.', level: 'Recognise',
      a: 'Flow rate, measured in volume units per time unit, such as litres per minute.',
      show: { kind: 'delta', f: t => 4 * t, a: 1, b: 5, title: 'VOLUME AGAINST TIME', note: 'litres per minute', unit: 'l/min', x0: 0, x1: 7, y0: 0, y1: 25, w: 290, h: 215,
        caption: 'The name changes with the quantities; the division does not.' } },
    { q: 'A line passes through (1, 4) and (5, 6). Find Δy, Δx, and the rate of change.', level: 'Calculate',
      a: 'Δy = 2, Δx = 4, and the rate is 0.5.',
      show: { kind: 'delta', f: x => 0.5 * x + 3.5, a: 1, b: 5, title: 'A SHALLOW LINE', note: 'through (1,4) and (5,6)', x0: 0, x1: 7, y0: 0, y1: 9, w: 290, h: 215,
        caption: 'Four across for two up, so half a unit up for every one across.' } },
    { q: 'For the same two points, take both differences in the opposite order. Does the rate change?', level: 'Calculate', hard: true,
      a: 'Δy = −2 and Δx = −4, so the rate is (−2)/(−4) = 0.5. It does not change, because the two minus signs divide out. Only consistency is required, not a particular order.',
      show: { kind: 'blanks', rule: '(4 - 6)/(1 - 5)', sub: 'both differences reversed', result: '(-2)/(-4) = 0.5',
        caption: 'Reversing both the top and the bottom leaves the quotient alone. Reversing only one would flip its sign, which is the error to guard against.' } },
    { q: 'A quantity has Δy = 0 over an interval where Δx = 5. What is the rate, and what does the graph look like?', level: 'Analyse change', hard: true,
      a: 'The rate is 0/5 = 0, and the graph is horizontal across that interval: it moved along without going up or down.',
      show: { kind: 'delta', f: x => 6, a: 1, b: 6, title: 'NO CHANGE AT ALL', note: 'Δy = 0', unit: '', x0: 0, x1: 8, y0: 0, y1: 10, w: 290, h: 215,
        caption: 'The teal leg has no length. A flat graph has a rate of change of zero, which chapter 13 turns into the way high and low points are found.' } },
    { q: 'Why can Δx never be 0 in a rate of change?', level: 'Recognise', hard: true,
      a: 'Because it is the divisor, and dividing by zero names no number. A rate answers "how much per one unit of x", and if x did not move there is no interval to share the change out over.',
      show: { kind: 'delta', f: x => 2 * x, a: 2, b: 2.4, title: 'AS THE RUN SHRINKS', note: 'Δx may approach 0, never reach it', unit: '', x0: 0, x1: 5, y0: 0, y1: 10, w: 290, h: 215,
        caption: 'The interval may be made as narrow as you like and must never close completely. Chapter 12 is entirely about that distinction.' } },
    { q: 'A walker covers 6 km in the first hour and 2 km in the second. Find the rate for each hour and for the whole walk.', level: 'Analyse change', hard: true,
      a: '6 km/h, then 2 km/h, and 8/2 = 4 km/h overall. The overall figure is the average of the two only because the intervals happen to be equally long.',
      show: { kind: 'frames', label: 'Three intervals, three rates',
        frames: [
          { kind: 'delta', f: t => t <= 1 ? 6 * t : 6 + 2 * (t - 1), a: 0, b: 1, title: 'FIRST HOUR', note: '6 km/h', unit: 'km/h', x0: 0, x1: 2.6, y0: 0, y1: 10, w: 265, h: 200, pick: 'hour 1', say: 'Six kilometres in one hour.' },
          { kind: 'delta', f: t => t <= 1 ? 6 * t : 6 + 2 * (t - 1), a: 1, b: 2, title: 'SECOND HOUR', note: '2 km/h', unit: 'km/h', x0: 0, x1: 2.6, y0: 0, y1: 10, w: 265, h: 200, pick: 'hour 2', say: 'Two kilometres in the next hour. The walker slowed.' },
          { kind: 'delta', f: t => t <= 1 ? 6 * t : 6 + 2 * (t - 1), a: 0, b: 2, title: 'THE WHOLE WALK', note: '4 km/h', unit: 'km/h', x0: 0, x1: 2.6, y0: 0, y1: 10, w: 265, h: 200, pick: 'both', say: 'Eight kilometres over two hours: 4 km/h, matching neither hour.' }
        ] } }
  ],

  misconception: {
    name: 'cancelling the two deltas',
    wrong: 'Δy/Δx looks like a fraction with Δ on the top and the bottom, so the Δs are struck out and it becomes y/x.',
    why: 'Δ is not a quantity, so it is not a factor, so there is nothing to cancel. Written in full the expression is (y₂ − y₁)/(x₂ − x₁), and neither bracket divides the other. Test it once with numbers: from (2, 5) to (6, 17), Δy/Δx = 12/4 = 3, while y/x at the second point is 17/6, which is about 2.83. Different numbers, and only one of them means anything.'
  },

  review: 'Chapter 6 built difference tables by subtracting each output from the next, and called the results first and second differences. Those were Δy all along, taken over intervals of Δx = 1, which is why the division was invisible: dividing by 1 changes nothing. This chapter lets the interval be any width, and the division stops being free.'
};
