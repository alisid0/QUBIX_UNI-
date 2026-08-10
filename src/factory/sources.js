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
  // Wentworth, The First Steps in Algebra, ch. III, Positive and Negative
  // Numbers. This chapter draws the number line, works addition and subtraction
  // along it, drives it into the ground by asking for 2 − 5, and only then
  // extends it leftward. That is the make-it-fail-first shape the Coordinate
  // Plane and the functions boards use, and here it is the source's own.
  //
  // It also settles P-02, which was recorded on 2026-08-10 as unbuildable for
  // want of a source after De Morgan turned out to treat negatives only as a
  // computing device. The source was on the shelf the whole time, in a book
  // already being quoted for two other boards.
  WN1: {
    ref: 'Wentworth, The First Steps in Algebra, ch. III §56, printed folio 33',
    quote: 'If a person is engaged in trade, his capital will be increased by his gains, and diminished by his losses. Increase in temperature is measured by the number of degrees the mercury rises in a thermometer, and decrease in temperature by the number of degrees the mercury falls. In considering any quantity whatever, a quantity that increases the quantity considered is called a positive quantity; and a quantity that decreases the quantity considered is called a negative quantity.'
  },
  WN2: {
    ref: 'Wentworth, The First Steps in Algebra, ch. III §57, printed folio 33',
    quote: 'If from a given point, marked 0, we draw a straight line to the right, and beginning from the zero point lay off units of length on this line, the successive repetitions of the unit will be expressed by the natural series of numbers, 1, 2, 3, 4, etc.'
  },
  WN3: {
    ref: 'Wentworth, The First Steps in Algebra, ch. III §57, printed folio 33',
    quote: 'If we wish to add 2 to 5, we begin at 5, count 2 units forwards, and arrive at 7, the sum required. If we wish to subtract 2 from 5, we begin at 5, count 2 units backwards, and arrive at 3, the difference required. … If we wish to subtract 5 from 2, we cannot do it, because when we have counted backwards from 2 as far as 0, the natural series of numbers comes to an end.'
  },
  WN4: {
    ref: 'Wentworth, The First Steps in Algebra, ch. III §57, printed folio 34',
    quote: 'In order to subtract a greater number from a smaller, it is necessary to assume a new series of numbers, beginning at zero and extending to the left of zero. … This opposition is indicated by calling every number in the right-hand series a positive number, and prefixing to it, when written, the sign +; and by calling every number in the left-hand series a negative number, and prefixing to it the sign −.'
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
  // De Morgan, Elements of Arithmetic, 1858, Gutenberg 68662. The shelf has
  // always listed this book with the role "prerequisite repair BBs" and nobody
  // had opened it.
  //
  // CITATION CONVENTION, and a correction. This transcription carries no page
  // markers of any kind. D1 to D4 first cited "printed page 65" and "printed
  // page 66", inferred from the contents table rather than read, which is the
  // same fault corrected in T6 on 2026-08-09. Corrected 2026-08-10 to cite the
  // article number alone, which is how the book numbers itself and is what the
  // transcription actually carries. The contents table gives section start pages
  // and those may be quoted as such, but no individual passage may claim one.
  //
  // Note on notation. De Morgan writes a decimal with a leading point and no
  // zero, ·7 rather than 0.7, which was ordinary in 1858 and is not now. Boards
  // built from him must write 0.7 and record the change as a modernisation.
  //
  // Numeration. The opening of the book builds number out of matching rather
  // than counting: one horseman to every horse, then a pebble for each. That is
  // a better first idea than reciting names in order, and it is his.
  N1: {
    ref: 'De Morgan, Elements of Arithmetic, Book I §I art. 1',
    quote: 'Imagine a multitude of objects of the same kind assembled together; for example, a company of horsemen. One of the first things that must strike a spectator, although unused to counting, is, that to each man there is a horse. Now, though men and horses are things perfectly unlike, yet, because there is one of the first kind to every one of the second, one man to every horse, a new notion will be formed in the mind.'
  },
  N2: {
    ref: 'De Morgan, Elements of Arithmetic, Book I §I art. 2',
    quote: 'Suppose that while the first company passes by, he drops a pebble into a basket for each man whom he sees. There is no connexion between the pebbles and the horsemen but this, that for every horseman there is a pebble; that is, in common language, the number of pebbles and of horsemen is the same.'
  },
  N3: {
    ref: 'De Morgan, Elements of Arithmetic, Book I §I art. 3',
    quote: 'In this way a savage could keep an account of any numbers in which he was interested. He could thus register his children, his cattle, or the number of summers and winters which he had seen, by means of pebbles, or any other small objects which could be got in large numbers.'
  },
  // Square root, and the discovery that some numbers have none. Art. 158 is the
  // most dramatic passage in the book and it closes a loop the Area board opened
  // on purpose: its tiling bench sets a goal that cannot be met because 24 has
  // no whole square root.
  SR1: {
    ref: 'De Morgan, Elements of Arithmetic, Book I §VII art. 156',
    quote: 'We have already remarked, that a number multiplied by itself produces what is called the square of that number. Thus, 169, or 13 × 13, is the square of 13. Conversely, 13 is called the square root of 169, and 5 is the square root of 25; and any number is the square root of another, which when multiplied by itself will produce that other.'
  },
  SR2: {
    ref: 'De Morgan, Elements of Arithmetic, Book I §VII art. 158',
    quote: 'It does not follow that a number has a square root because it has a square; thus, though 5 can be multiplied by itself, there is no number which multiplied by itself will produce 5. It is proved in algebra, that no fraction multiplied by itself can produce a whole number … therefore 5 has neither a whole nor a fractional square root; that is, it has no square root at all.'
  },
  SR3: {
    ref: 'De Morgan, Elements of Arithmetic, Book I §VII art. 158',
    quote: 'Nevertheless, there are methods of finding fractions whose squares shall be as near to 5 as we please, though not exactly equal to it.'
  },
  // Multiplication as a shortcut for addition, which is the honest way to meet
  // it and is what P-09 needs.
  M1: {
    ref: 'De Morgan, Elements of Arithmetic, Book I §III art. 47',
    quote: 'I have said that all questions in arithmetic require nothing but addition and subtraction. I do not mean by this that no rule should ever be used except those given in the last section, but that all other rules only shew shorter ways of finding what might be found, if we pleased, by the methods there deduced.'
  },
  M2: {
    ref: 'De Morgan, Elements of Arithmetic, Book I §III art. 48',
    quote: 'I want to know the sum of five seventeens, or I ask the following question: There are five heaps of pebbles, and seventeen pebbles in each heap; how many are there in all?'
  },
  // Proportion, for P-07. De Morgan compares two numbers first by difference and
  // only then by ratio, which is the distinction the rate boards depend on.
  R1: {
    ref: 'De Morgan, Elements of Arithmetic, Book I §VIII art. 170',
    quote: 'When two numbers are named in any problem, it is usually necessary, in some way or other, to compare the two; that is, by considering the two together, to establish some connexion between them, which may be useful in future operations. The first method which suggests itself, and the most simple, is to observe which is the greater, and by how much it differs from the other.'
  },
  D1: {
    ref: 'De Morgan, Elements of Arithmetic, Book I §VI art. 135',
    quote: 'Decimal fractions are not usually written at full length. It is more convenient to write the numerator only, and to cut off from the numerator as many figures as there are ciphers in the denominator, when that is possible, by a point. … Thus, ·7 will be used in future to denote 7/10, ·07 for 7/100, and so on.'
  },
  D2: {
    ref: 'De Morgan, Elements of Arithmetic, Book I §VI art. 133',
    quote: 'The figures on the left of the point by themselves make the whole number which the fraction contains.'
  },
  D3: {
    ref: 'De Morgan, Elements of Arithmetic, Book I §VI art. 136',
    quote: 'The ciphers on the right hand of the decimal point serve the same purpose as the ciphers in (10). They are not counted as any thing themselves, but serve to shew the place in which the accompanying numbers stand. … Thus, ·0003747 is a decimal of seven places with four significant figures, ·346 is a decimal of three places with three significant figures.'
  },
  D4: {
    ref: 'De Morgan, Elements of Arithmetic, Book I §VI art. 137',
    quote: 'The value of a decimal is not altered by putting any number of ciphers at the right hand of it.'
  },
  // Functions. Three sources at three levels: Wentworth for the procedure,
  // Thompson for the name and the notation, Hardy for the precise property.
  // Added 2026-08-09, all read in the transcriptions rather than recalled.
  //
  // These correct the pilot proposal, which stated that the word "function" in
  // its modern sense is not on the shelf and that the function boards would be
  // ORIGINAL. Thompson defines the word outright; Hardy states the one-value
  // property exactly.
  F1: {
    ref: 'Wentworth, The First Steps in Algebra, ch. I art. 40, printed folio 12',
    quote: 'The numerical value of an algebraic expression is the number obtained by putting for the letters involved the numbers for which these letters stand, and then performing the operations required by the signs.'
  },
  F2: {
    ref: 'Thompson, Calculus Made Easy, ch. III, printed page 13',
    quote: 'It should be noted here that we can only find this ratio dy/dx when y and x are related to each other in some way, so that whenever x varies y does vary also.'
  },
  // Thompson makes the relation fail before he names it. The same shape as the
  // failing number line in The Coordinate Plane, and his own device, not ours.
  F3: {
    ref: 'Thompson, Calculus Made Easy, ch. III, printed pages 13–14',
    quote: 'If, while x is, as before, the distance of the foot of the ladder from the wall, y is, instead of the height reached, the horizontal length of the wall, or the number of bricks in it, or the number of years since it was built, any change in x would naturally cause no change whatever in y; in this case dy/dx has no meaning whatever, and it is not possible to find an expression for it.'
  },
  F4: {
    ref: 'Thompson, Calculus Made Easy, ch. III, printed page 14',
    quote: 'Whenever we use differentials dx, dy, dz, etc., the existence of some kind of relation between x, y, z, etc., is implied, and this relation is called a "function" in x, y, z, etc.'
  },
  F5: {
    ref: 'Thompson, Calculus Made Easy, ch. III, printed pages 14–15',
    quote: 'We see that an explicit function in x, y, z, etc., is simply something the value of which changes when x, y, z, etc., are changing, either one at the time or several together. Because of this, the value of the explicit function is called the dependent variable, as it depends on the value of the other variable quantities in the function; these other variables are called the independent variables because their value is not determined from the value assumed by the function.'
  },
  F6: {
    ref: 'Thompson, Calculus Made Easy, ch. III, printed page 15',
    quote: 'Sometimes the letter f or φ is used instead of F, so that y = F(x), y = f(x) and y = φ(x) all mean the same thing, namely, that the value of y depends on the value of x in some way which is not stated.'
  },
  // Hardy, A Course of Pure Mathematics, 3rd edition, Gutenberg 38769. Hardy
  // died in 1947, so the text is outside the UK life-plus-70 term. The Gutenberg
  // edition credits transcribers and proofreaders only, no editor.
  H1: {
    ref: 'Hardy, A Course of Pure Mathematics, 3rd ed., §20, printed page 38',
    quote: 'And let us suppose that the positions of the points P and Q are not independent, but connected by a relation which we can imagine to be expressed as a relation between x and y: so that, when P and x are known, Q and y are also known. … In these circumstances y is said to be a function of x.'
  },
  H2: {
    ref: 'Hardy, A Course of Pure Mathematics, 3rd ed., §20, printed page 38',
    quote: '(1) y is determined for every value of x; (2) to each value of x for which y is given corresponds one and only one value of y; (3) the relation between x and y is expressed by means of an analytical formula, from which the value of y corresponding to a given value of x can be calculated by direct substitution of the latter.'
  },
  // The catch, and it must be recorded rather than quietly dropped: Hardy lists
  // the one-value property and then refuses to make it part of the definition.
  // Modern school usage took the opposite decision.
  H3: {
    ref: 'Hardy, A Course of Pure Mathematics, 3rd ed., §20, printed page 39',
    quote: 'It is indeed the case that these particular characteristics are possessed by many of the most important functions. But the consideration of the following examples will make it clear that they are by no means essential to a function. All that is essential is that there should be some relation between x and y such that to some values of x at any rate correspond values of y.'
  },
  H4: {
    ref: 'Hardy, A Course of Pure Mathematics, 3rd ed., §20, Examples X.3, printed page 39',
    quote: 'Let y² = x. Then if x is positive this equation defines two values of y corresponding to each value of x, viz. ±√x. If x = 0, y = 0. Hence to the particular value 0 of x corresponds one and only one value of y. But if x is negative there is no value of y which satisfies the equation. That is to say, the function y is not defined for negative values of x.'
  },
  // Hardy reaches for a physical apparatus to introduce the idea, and credits it
  // to Carslaw. This is the precedent for the switch-and-tap board: the move is
  // his, and only the apparatus is modernised.
  H6: {
    ref: 'Hardy, A Course of Pure Mathematics, 3rd ed., §20, Examples X.4, printed page 39',
    quote: 'Consider a volume of gas maintained at a constant temperature and contained in a cylinder closed by a sliding piston. … If additional weight is placed upon the piston the latter is forced downwards. The volume (v) of the gas diminishes; the pressure (p) which it exerts upon unit area of the piston increases.'
  },
  H5: {
    ref: 'Hardy, A Course of Pure Mathematics, 3rd ed., §26, printed pages 49–50',
    quote: 'It would be natural to denote by √x, where x is any positive number, the positive square root of x, in which case y = √x would be a one-valued function of x. It is however often more convenient to regard √x as standing for the two-valued function whose two values are the positive and negative square roots of x.'
  },
  T17: {
    ref: 'Thompson, Calculus Made Easy, ch. XI, printed page 93',
    quote: 'One of the principal uses of the process of differentiating is to find out under what conditions the value of the thing differentiated becomes a maximum, or a minimum. This is often exceedingly important in engineering questions, where it is most desirable to know what conditions will make the cost of working a minimum, or will make the efficiency a maximum.'
  }
};
