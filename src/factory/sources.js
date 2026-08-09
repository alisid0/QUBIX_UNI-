// Passages quoted from the Project Gutenberg LaTeX transcriptions, with the
// printed page or article recorded. Verified by reading the transcription, not
// recalled. Shared across every BB option set.
//
// Audited 2026-08-09: all seventeen Thompson entries were rechecked by locating
// each quote in 33283-t.tex and reading the printed page off the nearest
// preceding \DPPageSep marker. T6 was wrong on both counts and is corrected
// above its entry. T2, T5 and T15 claimed page ranges where the quoted words sit
// on a single page; narrowed. The other thirteen were right as recorded.

export const sources = {
  W1: {
    ref: 'Wentworth, The First Steps in Algebra, ch. I art. 5, printed folio 1',
    quote: 'Arithmetic employs the arbitrary symbols, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, called figures, to represent numbers.'
  },
  W2: {
    ref: 'Wentworth, The First Steps in Algebra, ch. I art. 6, printed folio 2',
    quote: 'Algebra employs the letters of the alphabet in addition to the figures of Arithmetic to represent numbers. Letters are used as general symbols of numbers to which any particular values may be assigned.'
  },
  T1: {
    ref: 'Thompson, Calculus Made Easy, ch. III, printed page 9',
    quote: 'We classify all quantities into two classes: constants and variables. Those which we regard as of fixed value, and call constants … while those which we consider as capable of growing, or (as mathematicians say) of "varying," we denote by letters from the end of the alphabet.'
  },
  T2: {
    ref: 'Thompson, Calculus Made Easy, ch. III, printed page 10',
    quote: 'Suppose we have got two such variables that depend one on the other. An alteration in one will bring about an alteration in the other, because of this dependence. Let us call one of the variables x, and the other that depends on it y.'
  },
  T3: {
    ref: 'Thompson, Calculus Made Easy, ch. III, printed page 10',
    quote: 'Suppose we make x to vary, that is to say, we either alter it or imagine it to be altered, by adding to it a bit which we call dx. We are thus causing x to become x + dx. Then, because x has been altered, y will have altered also, and will have become y + dy.'
  },
  T4: {
    ref: 'Thompson, Calculus Made Easy, ch. II, printed page 6',
    quote: 'Let us think of x as a quantity that can grow by a small amount so as to become x + dx, where dx is the small increment added by growth. The square of this is x² + 2x·dx + (dx)².'
  },
  T5: {
    ref: 'Thompson, Calculus Made Easy, ch. II, printed page 6, Fig. 1',
    quote: 'Draw a square the side of which we will take to represent x. Now suppose the square to grow by having a bit dx added to its size each way. The enlarged square is made up of the original square x², the two rectangles at the top and on the right, each of which is of area x·dx (or together 2x·dx), and the little square at the top right-hand corner.'
  },
  // Corrected 2026-08-09 against the LaTeX page markers. This entry previously
  // said printed page 10 and dropped two of the three "hunting"s. Both wrong.
  T6: {
    ref: 'Thompson, Calculus Made Easy, ch. III, printed page 12',
    quote: 'Now right through the differential calculus we are hunting, hunting, hunting for a curious thing, a mere ratio, namely, the proportion which dy bears to dx when both of them are indefinitely small.'
  },
  T7: {
    ref: 'Thompson, Calculus Made Easy, ch. IV, printed page 18',
    quote: 'Let us begin with the simple expression y = x². … What we have got to find out is the proportion between the growing of y and the growing of x. In other words our task is to find out the ratio between dy and dx, or, in brief, to find the value of dy/dx.'
  },
  T8: {
    ref: 'Thompson, Calculus Made Easy, ch. IV, printed page 19',
    quote: 'What does (dx)² mean? Remember that dx meant a bit — a little bit — of x. Then (dx)² will mean a little bit of a little bit of x; that is … a small quantity of the second order of smallness. It may therefore be discarded as quite inconsiderable in comparison with the other terms.'
  },
  T9: {
    ref: 'Thompson, Calculus Made Easy, ch. IV, Summary, printed page 25',
    quote: 'We have arrived at the following rule: To differentiate xⁿ, multiply by the power and reduce the power by one, so giving us nxⁿ⁻¹ as the result.'
  },
  T10: {
    ref: 'Thompson, Calculus Made Easy, ch. VIII, printed page 52',
    quote: 'Some of the most important problems of the calculus are those where time is the independent variable, and we have to think about the values of some other quantity that varies when the time varies.'
  },
  T11: {
    ref: 'Thompson, Calculus Made Easy, ch. VIII, printed page 52',
    quote: 'Which is growing at the greater rate; a plant 12 inches high which in one month becomes 14 inches high, or a tree 12 feet high which in a year becomes 14 feet high?'
  },
  T12: {
    ref: 'Thompson, Calculus Made Easy, ch. VIII, printed page 53',
    quote: 'What do we mean by rate? … we are making a mental comparison of something that is happening, and the length of time that it takes to happen. If the motor-car flies past us going 10 yards per second, a simple bit of mental arithmetic will show us that this is equivalent — while it lasts — to a rate of 600 yards per minute, or over 20 miles per hour.'
  },
  T13: {
    ref: 'Thompson, Calculus Made Easy, ch. V, printed page 26',
    quote: 'Our next step is to find out what effect on the process of differentiating is caused by the presence of constants, that is, of numbers which don’t change when x or y change their values.'
  },
  T14: {
    ref: 'Thompson, Calculus Made Easy, ch. VI, printed page 35',
    quote: 'We have now to consider how to tackle the sum of two or more functions. … The answer to this question is quite simple: just differentiate them, one after the other.'
  },
  T15: {
    ref: 'Thompson, Calculus Made Easy, ch. X, printed page 77',
    quote: 'Now observe how y changes when x is varied. If x is made to increase by a small increment dx, to the right, it will be observed that y also increases by a small increment dy. Then the ratio of dy to dx is a measure of the degree to which the curve is sloping up between the two points Q and T.'
  },
  T16: {
    ref: 'Thompson, Calculus Made Easy, ch. X, printed page 77',
    quote: 'If, however, Q and T are so near each other that the small portion QT of the curve is practically straight, then it is true to say that the ratio dy/dx is the slope of the curve.'
  },
  // Wentworth, Plane Geometry, Gutenberg 33063. This transcription marks scan
  // images and carries no printed folios, so citations say "scan N" rather than
  // inventing a page number.
  G1: {
    ref: 'Wentworth, Plane Geometry, Book IV, Areas of Polygons, scan 193',
    quote: 'The unit of surface is a square whose side is a unit of length.'
  },
  G2: {
    ref: 'Wentworth, Plane Geometry, Book IV, scan 193',
    quote: 'The area of a surface is the number of units of surface it contains.'
  },
  G3: {
    ref: 'Wentworth, Plane Geometry, Book IV, scan 196',
    quote: 'The area of a rectangle is equal to the product of its base by its altitude.'
  },
  G4: {
    ref: 'Wentworth, Plane Geometry, Book IV, Scholium, scan 196',
    quote: 'When the base and altitude each contain the linear unit an integral number of times, this proposition is rendered evident by dividing the figure into squares, each equal to the unit of surface. Thus, if the base contains seven linear units, and the altitude four, the figure may be divided into twenty-eight squares, each equal to the unit of surface.'
  },
  T17: {
    ref: 'Thompson, Calculus Made Easy, ch. XI, printed page 93',
    quote: 'One of the principal uses of the process of differentiating is to find out under what conditions the value of the thing differentiated becomes a maximum, or a minimum. This is often exceedingly important in engineering questions, where it is most desirable to know what conditions will make the cost of working a minimum, or will make the efficiency a maximum.'
  }
};
