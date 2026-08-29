# Foundations of Maths — Batch 1: Arithmetic → Algebra → Equations (12 BBs)

The 84-card static deck and all dynamic batches so far have zero BBs covering arithmetic fluency, algebraic manipulation, or equation-solving — yet the entire physics, chemistry, and calculus curriculum rests on these. This batch fills Phase 1 topics 1–3 of CURRICULUM.md.

---

## BB-NEW-110 — The four operations and their rules

**Subject:** maths | **Topic:** arithmetic | **Concept:** addition; subtraction; multiplication; division; commutation; association; distribution | **Ground:** g0 | **Builds on:** []

**Floor 0 (Idea):**
<p>There are only four things you can do to numbers: combine them, find the gap between them, scale them up, and split them into groups. Addition, subtraction, multiplication, division. Everything else in mathematics — from algebra to calculus to quantum mechanics — is built out of these four moves, applied in sequence.</p>

**Floor 1 (Concrete):**
<p>Addition: 3 apples plus 2 apples is 5 apples. You can add in any order — 3+2 = 2+3. Subtraction: you had 5 apples, ate 2, 3 remain. Order matters — 5−2 is not 2−5. Multiplication: 4 bags, 3 apples each, 12 apples total. Like addition, order doesn't matter — 4×3 = 3×4. Division: 12 apples split among 4 people, 3 each. Order matters — 12÷4 = 3, but 4÷12 is not 3. Division by zero is impossible: "12 split among 0 people" is nonsense.</p>

**Floor 2 (Definition):**
<p>The four <strong>binary operations</strong> on numbers each have a name, a symbol, and algebraic properties. The <strong>commutative</strong> property holds when order doesn't matter: a+b = b+a, a×b = b×a (but NOT a−b or a÷b). The <strong>associative</strong> property holds when grouping doesn't matter: (a+b)+c = a+(b+c), (a×b)×c = a×(b×c). The <strong>distributive</strong> property links multiplication and addition: a(b + c) = ab + ac. Division by zero is <strong>undefined</strong> — it has no meaning in the real number system.</p>

**Floor 3 (In action):**
<p>The distributive property is the engine of algebra. Without it, you can't expand 3(x+2) into 3x+6. You can't multiply (x+1)(x+2) into x²+3x+2. Every expansion, every factorisation, every algebraic manipulation traces back to a(b+c) = ab+ac. The associative property lets you regroup: (2+3)+4 = 2+(3+4), so you can add in any order. These are not arbitrary rules — they are the observed behaviour of numbers, codified. If numbers didn't obey these properties, algebra would not work.</p>

**Image prompt:** A chalk drawing of a horizontal number line. Four labelled operations are shown: addition as combining two stacks, subtraction as removing, multiplication as rows × columns, division as grouping. The distributive property a(b+c) = ab+ac is boxed and highlighted. Chalk on dark green board. Square 1:1.

---

## BB-NEW-111 — Place value: why 347 means three hundred and forty-seven

**Subject:** maths | **Topic:** arithmetic | **Concept:** place-value; decimal-system; powers-of-ten | **Ground:** g0 | **Builds on:** [BB-NEW-110]

**Floor 0 (Idea):**
<p>The number 347 doesn't mean 3, then 4, then 7. It means 3 hundreds, 4 tens, and 7 ones — each digit's value depends on where it sits. This is place value, and it's the reason you can write any number, no matter how large, using only ten symbols.</p>

**Floor 1 (Concrete):**
<p>In 425.73, the 4 is in the hundreds place (400), the 2 is in the tens (20), the 5 is in the ones (5). After the decimal point, the 7 is in the tenths (7/10) and the 3 is in the hundredths (3/100). Each position is a power of ten: ... 10³ 10² 10¹ 10⁰ · 10⁻¹ 10⁻² ... The digit times the power of ten gives its contribution. 425.73 = 4×10² + 2×10¹ + 5×10⁰ + 7×10⁻¹ + 3×10⁻².</p>

**Floor 2 (Definition):**
<p>The <strong>decimal system</strong> (base-10) represents numbers using ten digits (0–9) arranged in positions where each position is a power of 10. The value of a digit is the digit multiplied by the place value of its position. Moving left multiplies by 10; moving right divides by 10. The <strong>decimal point</strong> separates whole-number positions (10⁰ and above) from fractional positions (10⁻¹ and below). The system is <strong>positional</strong> — the same digit means different things in different places (the 3 in 347 vs the 3 in 1.03).</p>

**Floor 3 (In action):**
<p>Place value is why "adding a zero" multiplies by ten: 347 → 3470, because every digit shifts one place left. It's why lining up decimal points is essential when adding: 3.4 + 0.27 = 3.67, not 0.61. It's why multiplying by powers of ten just moves the decimal point. And it's not the only system — computers use base-2 (binary), the Babylonians used base-60 (still with us in 60 seconds and 360 degrees). The decimal system won because ten fingers, but the principle — position encodes magnitude — is universal.</p>

**Image prompt:** A chalk drawing of the number 425.73 with each digit connected to its place value: 4→400, 2→20, 5→5, 7→7/10, 3→3/100. Powers of ten are written above each column: 10², 10¹, 10⁰, 10⁻¹, 10⁻². Chalk on dark green board. Square 1:1.

---

## BB-NEW-112 — Fractions: parts of a whole, written as a division

**Subject:** maths | **Topic:** arithmetic | **Concept:** fractions; numerator; denominator; equivalent-fractions | **Ground:** g0 | **Builds on:** [BB-NEW-110, BB-NEW-111]

**Floor 0 (Idea):**
<p>A fraction is two numbers stacked with a bar between them. The top counts how many pieces you have. The bottom tells you what kind of pieces they are — how many equal parts make the whole. 3/4 means three quarters: the whole was cut into 4 equal pieces and you have 3 of them.</p>

**Floor 1 (Concrete):**
<p>A pizza cut into 8 equal slices. You eat 3. You've eaten 3/8 of the pizza. The same fraction can look different: 3/8 = 6/16 = 9/24 — all mean the same amount, just with different slice sizes. Multiplying the numerator and denominator by the same number doesn't change the fraction's value because you're multiplying by 1 in disguise (2/2 = 1, 3/3 = 1). This is why 1/2 = 2/4 = 3/6 = 50/100. They are <strong>equivalent fractions</strong>.</p>

**Floor 2 (Definition):**
<p>A <strong>fraction</strong> a/b represents a ÷ b — the numerator a divided by the denominator b, where b ≠ 0. A <strong>proper fraction</strong> has numerator < denominator (value < 1). An <strong>improper fraction</strong> has numerator ≥ denominator (value ≥ 1). A <strong>mixed number</strong> combines a whole number and a proper fraction: 1½ = 3/2. <strong>Equivalent fractions</strong> represent the same value. A fraction is in <strong>simplest form</strong> (lowest terms) when numerator and denominator share no common factor other than 1.</p>

**Floor 3 (In action):**
<p>Fractions are the bridge to rational numbers, ratios, proportions, and probability. "3 out of 4 dentists agree" is the fraction 3/4. A scale model at 1:72 means every dimension is 1/72 of the original. A probability of 0.25 is 1/4. Adding fractions requires a common denominator because you can't directly add pieces of different sizes — 1/2 + 1/3 needs a common "slice size" (6ths): 3/6 + 2/6 = 5/6. Fractions are not secondary to decimals — they are exact where decimals often approximate (1/3 = 0.333... forever).</p>

**Image prompt:** A chalk drawing of a circle divided into 8 equal slices, 3 shaded. Below: 3/8 = 6/16 = 9/24 shown with circles divided into 16 and 24 parts with corresponding shading. The equivalence arrow shows numerator and denominator both multiplied by the same number. Chalk on dark green board. Square 1:1.

---

## BB-NEW-113 — Decimals, percentages, and converting between them

**Subject:** maths | **Topic:** arithmetic | **Concept:** decimals; percentages; conversion; recurring-decimals | **Ground:** g0 | **Builds on:** [BB-NEW-111, BB-NEW-112]

**Floor 0 (Idea):**
<p>Decimals and percentages are just fractions wearing different clothes. 0.75, 75%, and 3/4 are the exact same number — three quarters — written in three different notations. Each notation is useful for different situations, and you can move freely between them.</p>

**Floor 1 (Concrete):**
<p>Scores on a test: 17 out of 20. As a fraction: 17/20. To convert to a decimal, divide: 17 ÷ 20 = 0.85. To convert to a percentage, multiply the decimal by 100: 0.85 × 100 = 85%. Reversing: 30% of 80. Convert 30% to a decimal: 30 ÷ 100 = 0.30. Multiply: 0.30 × 80 = 24. A discount of 30% on an 80-rupee item saves 24 rupees. The three forms are interchangeable, and the conversion is always multiplication or division by 100.</p>

**Floor 2 (Definition):**
<p>A <strong>decimal</strong> is a fraction whose denominator is a power of 10, written using the decimal point: 0.75 = 75/100. A <strong>percentage</strong> is a fraction whose denominator is 100: 75% = 75/100. Conversions: fraction → decimal (divide numerator by denominator). Decimal → percentage (multiply by 100 and add %). Percentage → fraction (divide by 100 and simplify). <strong>Terminating decimals</strong> end (1/8 = 0.125). <strong>Recurring decimals</strong> repeat forever (1/3 = 0.333..., 1/7 = 0.142857142857...). Every rational number is either terminating or recurring.</p>

**Floor 3 (In action):**
<p>Percentages are the language of comparison — "40% larger" is clearer than "multiplied by 1.4." Decimals are the language of calculation — multiplying 0.85 × 80 is easier than computing 85/100 × 80 in your head. Fractions are the language of exactness — 1/3 is exact; 0.333... is an approximation you must truncate. Knowing when to use each is part of number sense. A 50% increase followed by a 50% decrease doesn't return you to the original — 100 → 150 → 75. Percentages compound, they don't cancel.</p>

**Image prompt:** A chalk drawing showing the same number in three forms linked by labelled arrows: 3/4 (fraction) ↔ 0.75 (decimal) ↔ 75% (percentage). The conversion steps are written beside each arrow: "÷ 4 × 3", "× 100", "÷ 100". Chalk on dark green board. Square 1:1.

---

## BB-NEW-114 — Estimation and number sense: is the answer reasonable?

**Subject:** maths | **Topic:** arithmetic | **Concept:** estimation; rounding; number-sense; fermi-problems | **Ground:** g0 | **Builds on:** [BB-NEW-110, BB-NEW-111]

**Floor 0 (Idea):**
<p>Before you calculate, ask: what should the answer roughly be? If you're computing the cost of 37 items at 48 rupees each, 37×48 should be close to 40×50 = 2000. If your calculator says 177.6, something is wrong — the answer should be near 2000, not 200. Estimation is your first and best defence against nonsense.</p>

**Floor 1 (Concrete):**
<p>Compute 98 × 53. Round: 98 ≈ 100, 53 ≈ 50. Estimate: 100 × 50 = 5000. Exact: 98 × 53 = 5194. The estimate was within 4%. Now estimate 687 ÷ 19. Round 687 ≈ 700, 19 ≈ 20. 700 ÷ 20 = 35. Exact: 687 ÷ 19 = 36.16. The estimate took two seconds and landed within 3%. For most real-world decisions — "can I afford this?", "is this measurement about right?" — an estimate within 10% is far more useful than an exact calculation that takes five minutes.</p>

**Floor 2 (Definition):**
<p><strong>Estimation</strong> replaces exact numbers with nearby round numbers to produce an approximate result quickly. <strong>Rounding</strong> reduces a number to a specified number of significant digits or decimal places. <strong>Number sense</strong> is the intuition for the size of numbers and the reasonableness of results — knowing that 784 × 0.99 should be slightly less than 784, not more; that dividing by a number less than 1 gives a result larger than the original. A <strong>Fermi problem</strong> estimates an unfamiliar quantity by breaking it into estimable pieces.</p>

**Floor 3 (In action):**
<p>Number sense catches errors that exact arithmetic misses. A student computes 45 × 0.2 and writes 90 — but 0.2 is less than 1, so the answer must be less than 45. Error caught without recalculating. In science, every measurement comes with uncertainty, and reporting 6.847392 when the instrument only reads to 6.8 is dishonest. Estimation teaches you what's worth computing exactly and what's not. In engineering, the factor of safety exists because exact calculation is impossible — estimation with margins keeps bridges standing.</p>

**Image prompt:** A chalk drawing of a rough calculation: 98 × 53 → 100 × 50 = 5000 (estimate) vs 5194 (exact). A speech bubble: "Is it about 5000? Yes. Send it." Below: a crossed-out calculation 45 × 0.2 = 90 with the note "0.2 < 1, so answer must be less than 45." Chalk on dark green board. Square 1:1.

---

## BB-NEW-115 — What algebra is: the letter stands for a number

**Subject:** maths | **Topic:** algebra | **Concept:** algebra-intro; variables; expressions-vs-equations | **Ground:** g0 | **Builds on:** [BB-NEW-110]

**Floor 0 (Idea):**
<p>Algebra begins with a single move: let a letter stand for a number you don't know yet. x is not mysterious. It's a placeholder — an empty box waiting for a value. "Let x be the cost of one apple" turns a word problem into symbols you can manipulate.</p>

**Floor 1 (Concrete):**
<p>A shop sells apples at the same price each. You don't know the price, so call it p. Three apples cost 3p. Two apples and a 10-rupee delivery charge cost 2p + 10. If the total came to 26 rupees, you can write 2p + 10 = 26. This is an <strong>equation</strong> — a statement that two things are equal. Now you can find p: subtract 10 from both sides (2p = 16), divide by 2 (p = 8). The price is 8 rupees. The letter carried the unknown through the reasoning until it was found.</p>

**Floor 2 (Definition):**
<p><strong>Algebra</strong> is the branch of mathematics that uses symbols (letters) to represent numbers and express relationships between them. A <strong>variable</strong> is a symbol (usually a letter like x, y, or t) that stands for a number. An <strong>expression</strong> is a combination of numbers, variables, and operations (3x + 2, t², 5 − y). An <strong>equation</strong> is a statement that two expressions are equal (3x + 2 = 14). Solving the equation means finding the value of the variable that makes the statement true.</p>

**Floor 3 (In action):**
<p>Algebra is not a separate subject from arithmetic — it's arithmetic generalised. Instead of solving "what number plus 3 equals 7?" one hundred times, algebra gives the method once: x + 3 = 7 → x = 4. The letter lets you solve a whole class of problems at once. Physics runs on algebra: F = ma is a relationship between three variables, true for every force and every mass in classical mechanics. The formula doesn't solve for one specific value — it captures the relationship itself, ready for any numbers you plug in.</p>

**Image prompt:** A chalk drawing of a balance scale. On the left pan: "2p + 10". On the right pan: "26". The scale is balanced. Below, step by step: subtract 10 (scale tips, rebalanced) → 2p = 16 → divide by 2 → p = 8. Chalk on dark green board. Square 1:1.

---

## BB-NEW-116 — Expressions, terms, and simplifying

**Subject:** maths | **Topic:** algebra | **Concept:** algebraic-expressions; like-terms; simplifying | **Ground:** g0 | **Builds on:** [BB-NEW-115]

**Floor 0 (Idea):**
<p>An algebraic expression is a string of numbers, letters, and operations — like 3x² + 2x − 5. Before you can solve anything, you need to tidy it up. Combine the pieces that are the same kind of thing. This is simplifying, and it's the first skill algebra demands.</p>

**Floor 1 (Concrete):**
<p>You have 3 apples, someone gives you 2 more apples, and then 4 oranges. You don't write "3 apples + 2 apples + 4 oranges" — you write "5 apples + 4 oranges." Algebra does the same: 3x + 2x + 4y simplifies to 5x + 4y. The x terms combine with x terms. The y terms combine with y terms. Apples and oranges. Terms with different letters (or different powers of the same letter) are <strong>unlike terms</strong> — you cannot combine them. 3x + 2x² does not simplify to 5 of anything. They stay separate.</p>

**Floor 2 (Definition):**
<p>An algebraic <strong>expression</strong> is built from <strong>terms</strong> connected by + or −. Each term is a number (the <strong>coefficient</strong>) multiplied by variables raised to powers: in 3x², 3 is the coefficient and x² is the variable part. <strong>Like terms</strong> have exactly the same variable and exponent — 3x² and 5x² are like terms; 3x² and 3x are NOT. <strong>Simplifying</strong> an expression means combining like terms by adding or subtracting their coefficients while leaving the variable part unchanged. A <strong>polynomial</strong> is an expression with one or more terms involving non-negative integer powers of variables.</p>

**Floor 3 (In action):**
<p>Simplifying is the warm-up for everything else. Expanding brackets produces unsimplified expressions that must be tidied. Factorising is the reverse. Solving equations requires collecting like terms on each side first. In physics, combining like terms in a force equation separates the x-direction from the y-direction — the terms with î combine together, the terms with ĵ combine together. Simplifying is not busywork — it's how you see the structure hidden in the mess.</p>

**Image prompt:** A chalk drawing of a messy expression: 3x + 2y + 5x − y + 7. Arrows group like terms: 3x+5x→8x in one colour, 2y−y→y in another, the constant 7 in a third. The simplified result 8x + y + 7 is circled. Chalk on dark green board. Square 1:1.

---

## BB-NEW-117 — Expanding brackets: the distributive law in action

**Subject:** maths | **Topic:** algebra | **Concept:** expanding-brackets; distributive-law; FOIL; binomial-products | **Ground:** g0 | **Builds on:** [BB-NEW-110, BB-NEW-115]

**Floor 0 (Idea):**
<p>3(x + 2) means "add x and 2, then multiply everything by 3." The distributive law says you can multiply first: 3×x plus 3×2, giving 3x + 6. Expanding brackets is just the distributive law, applied systematically, over and over.</p>

**Floor 1 (Concrete):**
<p>To expand (x + 2)(x + 3): multiply everything in the first bracket by everything in the second. First: x × x = x². Outer: x × 3 = 3x. Inner: 2 × x = 2x. Last: 2 × 3 = 6. Sum: x² + 3x + 2x + 6 = x² + 5x + 6. The acronym FOIL (First, Outer, Inner, Last) remembers the pattern for two-term brackets. For (a+b)², the pattern is always a² + 2ab + b². For (a+b)(a−b), it's always a² − b² — the "difference of two squares." But all of these are just the distributive law, applied to every pair of terms.</p>

**Floor 2 (Definition):**
<p><strong>Expanding</strong> (or multiplying out) brackets uses the <strong>distributive law</strong>: a(b + c) = ab + ac. For two binomials: (a + b)(c + d) = a(c + d) + b(c + d) = ac + ad + bc + bd — every term in the first bracket multiplied by every term in the second. Key patterns: (a + b)² = a² + 2ab + b² (perfect square). (a − b)² = a² − 2ab + b². (a + b)(a − b) = a² − b² (difference of two squares). After expanding, always simplify by combining like terms.</p>

**Floor 3 (In action):**
<p>Expanding is the forward direction. Factorising (next) is the reverse — taking x² + 5x + 6 and turning it back into (x + 2)(x + 3). You need both directions because different problems demand different forms. An expanded quadratic ax² + bx + c tells you the y-intercept (c). A factorised quadratic (x + p)(x + q) tells you the x-intercepts (−p and −q). Expanding reveals one set of properties; factorising reveals another. The algebra is a language, and expanding and factorising are translation in opposite directions.</p>

**Image prompt:** A chalk drawing showing the FOIL expansion of (x+2)(x+3) with arrows: F→x², O→3x, I→2x, L→6. The four products are summed to x²+5x+6. Below, the three special patterns: (a+b)², (a−b)², (a+b)(a−b) each with a small geometric square diagram. Chalk on dark green board. Square 1:1.

---

## BB-NEW-118 — Factorising: turning a sum back into a product

**Subject:** maths | **Topic:** algebra | **Concept:** factorising; common-factor; quadratic-factorisation; difference-of-squares | **Ground:** g0 | **Builds on:** [BB-NEW-117]

**Floor 0 (Idea):**
<p>Expanding turns (x+2)(x+3) into x²+5x+6. Factorising is the undo button — it takes x²+5x+6 and finds the two brackets that multiply to it. The question is: what pair of numbers multiply to give the constant term, and add to give the x-coefficient?</p>

**Floor 1 (Concrete):**
<p>Factorise x² + 7x + 12. Find two numbers that multiply to 12 and add to 7. Possibilities for 12: 1×12 (sum 13), 2×6 (sum 8), 3×4 (sum 7) — found them. So x²+7x+12 = (x+3)(x+4). Check by expanding: x²+4x+3x+12 = x²+7x+12 ✓. For a common factor: 6x² + 9x = 3x(2x + 3) — pull out the 3x that divides both terms. For difference of squares: x² − 25 = (x+5)(x−5) — because a²−b² = (a+b)(a−b). Always look for a common factor first.</p>

**Floor 2 (Definition):**
<p><strong>Factorising</strong> is rewriting an expression as a product of simpler expressions. Steps: (1) Look for a <strong>common factor</strong> — a number or variable dividing every term (6x²+9x = 3x(2x+3)). (2) For a quadratic x²+bx+c, find two numbers p and q such that p+q = b and p×q = c — then x²+bx+c = (x+p)(x+q). (3) For <strong>difference of two squares</strong> a²−b² = (a+b)(a−b). (4) Check by expanding. Not all quadratics factorise neatly with integers — x²+1 does not factorise over the reals.</p>

**Floor 3 (In action):**
<p>Factorising is the gatekeeper for solving quadratics. If x²+7x+12 = 0, factorising gives (x+3)(x+4) = 0. A product is zero only when at least one factor is zero — so x+3=0 or x+4=0, giving x=−3 or x=−4. Without factorising, you'd have to guess or use the quadratic formula. Factorising also simplifies fractions: (x²−9)/(x+3) = (x+3)(x−3)/(x+3) = x−3 (for x≠−3). It reveals the structure that the expanded form hides.</p>

**Image prompt:** A chalk drawing showing x²+7x+12, then arrows to the pairs (1,12)→13, (2,6)→8, (3,4)→7 ✓. The factorised form (x+3)(x+4) appears below with a check-mark from expanding back. Beside: 6x²+9x = 3x(2x+3) with 3x highlighted as the common factor. Chalk on dark green board. Square 1:1.

---

## BB-NEW-119 — Solving linear equations: the balancing method

**Subject:** maths | **Topic:** algebra | **Concept:** linear-equations; solving; balancing-method; one-variable | **Ground:** g0 | **Builds on:** [BB-NEW-115, BB-NEW-116]

**Floor 0 (Idea):**
<p>An equation is a balance scale. The left side equals the right side. Whatever you do to one side, you must do to the other, or the balance breaks. Solving an equation means isolating the unknown on one side of the scale — and the only tools you're allowed are the four operations, applied equally to both sides.</p>

**Floor 1 (Concrete):**
<p>Solve 3x − 7 = 14. Step 1: add 7 to both sides to undo the subtraction. 3x − 7 + 7 = 14 + 7 → 3x = 21. Step 2: divide both sides by 3 to undo the multiplication. 3x/3 = 21/3 → x = 7. Check: 3(7) − 7 = 21 − 7 = 14 ✓. For equations with x on both sides: 5x + 2 = 3x + 10. Gather x terms on one side: subtract 3x from both → 2x + 2 = 10. Subtract 2 → 2x = 8. Divide by 2 → x = 4. Check: 5(4)+2=22, 3(4)+10=22 ✓.</p>

**Floor 2 (Definition):**
<p>A <strong>linear equation</strong> in one variable has the form ax + b = cx + d (or can be rearranged to it), where x appears to the first power only — no x², no 1/x, no sin(x). Solving uses inverse operations in reverse order of operations: undo addition/subtraction first, then undo multiplication/division. If x appears on both sides, collect all x terms on one side. The solution is a single number — the value that makes the equation true. A linear equation in one variable always has either one solution, no solution (contradiction like 0=5), or infinitely many solutions (identity like 0=0).</p>

**Floor 3 (In action):**
<p>Linear equations are the most common kind you'll solve in physics and everyday life. "A 25-rupee phone plan plus 2 rupees per minute — how many minutes if the bill is 85 rupees?" → 25 + 2m = 85 → 2m = 60 → m = 30. Every conversion formula is a linear equation: °F = (9/5)°C + 32. Rearranging formulas for a different variable is solving a linear equation: if v = u + at, then t = (v−u)/a. The balancing method — do the same thing to both sides — is the one move, used over and over.</p>

**Image prompt:** A chalk drawing of a balance scale. Left pan: 3x − 7. Right pan: 14. Step 1: +7 added to both pans → 3x = 21. Step 2: both sides divided by 3 → x = 7. A speech bubble: "Whatever you do to one side, do to the other." Chalk on dark green board. Square 1:1.

---

## BB-NEW-120 — Solving quadratic equations: when x² enters the room

**Subject:** maths | **Topic:** algebra | **Concept:** quadratic-equations; factorisation-method; quadratic-formula; discriminant | **Ground:** g0 | **Builds on:** [BB-NEW-118, BB-NEW-119]

**Floor 0 (Idea):**
<p>A linear equation like 2x = 10 has one answer. A quadratic — with an x² term — usually has two. Throw a ball in the air and the equation for when it's at height 2 metres is a quadratic: the ball passes that height once going up and once coming down. Two answers, both physically real.</p>

**Floor 1 (Concrete):**
<p>Solve x² − 5x + 6 = 0. Factorise: (x−2)(x−3) = 0. A product equals zero only when a factor equals zero — so x−2=0 (x=2) or x−3=0 (x=3). Check: 2²−5(2)+6 = 4−10+6 = 0 ✓. 3²−5(3)+6 = 9−15+6 = 0 ✓. If factorising isn't easy, the quadratic formula x = [−b ± √(b²−4ac)] / (2a) always works. For x²−5x+6: a=1, b=−5, c=6. b²−4ac = 25−24 = 1. x = [5 ± 1] / 2 → x=3 or x=2. Same answers.</p>

**Floor 2 (Definition):**
<p>A <strong>quadratic equation</strong> has the standard form ax² + bx + c = 0, with a ≠ 0. Three solution methods: <strong>Factorising</strong> — if ax²+bx+c = (px+q)(rx+s), set each bracket to zero. <strong>Quadratic formula</strong> — x = [−b ± √(b²−4ac)] / (2a). The expression b²−4ac is the <strong>discriminant</strong>. If discriminant > 0, two real solutions. If = 0, one real solution (repeated root). If < 0, no real solutions (the roots are complex). <strong>Completing the square</strong> — rewriting as (x+h)² + k = 0. All three methods are equivalent.</p>

**Floor 3 (In action):**
<p>Quadratics are everywhere. The path of a projectile is a quadratic (y = ut − ½gt²). The area of a rectangle with a given perimeter leads to a quadratic. Profit maximisation in business: revenue minus cost is often quadratic in quantity. The discriminant tells you before solving whether the answer will be real: if b²−4ac < 0, the projectile never reaches that height, the rectangle can't have that area with that perimeter, the business can't break even at any quantity. The formula doesn't just solve — it diagnoses.</p>

**Image prompt:** A chalk drawing of the quadratic formula x = [−b ± √(b²−4ac)]/(2a) in a box. Beside it, the discriminant cases: >0 (parabola crossing x-axis twice), =0 (touching once), <0 (parabola floating above x-axis). A worked example x²−5x+6=0 → (x−2)(x−3)=0 → x=2 or 3. Chalk on dark green board. Square 1:1.

---

## BB-NEW-121 — Inequalities: when things are not equal

**Subject:** maths | **Topic:** algebra | **Concept:** inequalities; greater-than; less-than; interval-notation; sign-flip | **Ground:** g0 | **Builds on:** [BB-NEW-119, BB-NEW-115]

**Floor 0 (Idea):**
<p>Equations say "this equals that." Inequalities say "this is bigger than that" — or smaller, or at least as big, or at most as big. Instead of one answer, an inequality gives a whole range of answers — every number on one side of a boundary. "The temperature stayed below 30°C" — that's every number from absolute zero up to (but not including) 30.</p>

**Floor 1 (Concrete):**
<p>Solve 2x + 3 > 7. Like an equation: subtract 3 from both sides → 2x > 4. Divide by 2 → x > 2. The solution is every number greater than 2. Now solve −2x + 3 > 7. Subtract 3 → −2x > 4. Here's the trap: dividing by −2 flips the inequality sign, because dividing by a negative reverses the order. −2x/(−2) < 4/(−2) → x < −2. Check: x=−3 → −2(−3)+3 = 9 > 7 ✓. x=0 → −2(0)+3 = 3, not > 7 ✓. The sign flip is the only rule not shared with equations.</p>

**Floor 2 (Definition):**
<p><strong>Inequalities</strong> express order relationships: < (less than), > (greater than), ≤ (less than or equal to), ≥ (greater than or equal to). Solving inequalities uses the same balancing method as equations with one critical exception: multiplying or dividing both sides by a <strong>negative number</strong> reverses the inequality sign. A <strong>compound inequality</strong> chains two comparisons: 3 < x ≤ 7 means x is greater than 3 and at most 7. <strong>Interval notation</strong> writes solution sets compactly: x > 2 is (2, ∞). x ≤ 5 is (−∞, 5]. The bracket [ or ] includes the endpoint; parentheses ( or ) exclude it.</p>

**Floor 3 (In action):**
<p>Inequalities describe constraints. A bridge has a weight limit: load ≤ 10 tonnes. A medicine dose depends on body mass: 5 ≤ dose (mg/kg) ≤ 10. A satellite stays in orbit only if its speed is above a threshold. In optimisation, you don't solve for one best answer — you define a feasible region: "x ≥ 0, y ≥ 0, 2x + y ≤ 100, x + 3y ≤ 120" — and search inside it. Inequalities are the language of limits, and most real-world problems are about staying within limits, not hitting exact values.</p>

**Image prompt:** A chalk drawing of a number line from −5 to 5. The region x > 2 is shaded with an open circle at 2. The region x ≤ −1 is shaded with a closed circle at −1. Below: solving −2x + 3 > 7 with the sign flip highlighted in pale yellow. Chalk on dark green board. Square 1:1.

---

## BB-NEW-122 — Indices and the laws of exponents

**Subject:** maths | **Topic:** algebra | **Concept:** indices; exponent-rules; powers; surds | **Ground:** g0 | **Builds on:** [BB-NEW-110, BB-NEW-115]

**Floor 0 (Idea):**
<p>x⁵ doesn't mean x×5. It means x multiplied by itself 5 times: x·x·x·x·x. The small raised number is the exponent or index. It's a shorthand for repeated multiplication, and it comes with its own set of rules — the laws of indices — that make multiplying and dividing powers far faster than writing everything out longhand.</p>

**Floor 1 (Concrete):**
<p>Multiply x³ by x²: that's (x·x·x) × (x·x) = x⁵. The exponents add: 3+2 = 5. Divide x⁵ by x²: (x·x·x·x·x) / (x·x) = x³. The exponents subtract: 5−2 = 3. Raise (x³)² = x³·x³ = x⁶. The exponents multiply: 3×2 = 6. Now the stranger ones: x⁰ = 1 (anything to the zero power is 1, because xⁿ/xⁿ = 1 = x⁰). x⁻² = 1/x² (negative exponent means reciprocal). x^(1/2) = √x (fractional exponent means root). x^(3/2) = (√x)³ = √(x³).</p>

**Floor 2 (Definition):**
<p>The <strong>laws of indices</strong> for any real numbers a, b and any base x > 0: (1) xᵃ × xᵇ = xᵃ⁺ᵇ. (2) xᵃ ÷ xᵇ = xᵃ⁻ᵇ. (3) (xᵃ)ᵇ = xᵃᵇ. (4) x⁰ = 1 (x ≠ 0). (5) x⁻ᵃ = 1/xᵃ. (6) x^(1/n) = ⁿ√x (the n-th root). (7) x^(m/n) = ⁿ√(xᵐ) = (ⁿ√x)ᵐ. <strong>Surds</strong> are roots that can't be simplified to rational numbers: √2, ∛5 — they are irrational numbers written in root notation. The laws of indices unify all of these — roots and powers are the same thing with different exponents.</p>

**Floor 3 (In action):**
<p>Indices are the backbone of scientific notation, exponential growth, and logarithms. Avogadro's number 6.022×10²³ uses an exponent to compress 24 digits into a few symbols. Compound interest: £1000 at 5% for 10 years = 1000 × (1.05)¹⁰ — the exponent counts the compounding periods. Radioactive decay: N = N₀ × 2^(−t/T) — a fractional and negative exponent together. The laws of indices are not just simplification tricks — they're how we write and manipulate the very large, the very small, and the repeatedly multiplied.</p>

**Image prompt:** A chalk drawing showing the laws of indices in a column: xᵃxᵇ=xᵃ⁺ᵇ, xᵃ/xᵇ=xᵃ⁻ᵇ, (xᵃ)ᵇ=xᵃᵇ, x⁰=1, x⁻ᵃ=1/xᵃ, x^(1/n)=ⁿ√x. Each law has a small numeric example beside it. Chalk on dark green board. Square 1:1.

---

## Summary

| Placeholder | Title | Ground | Builds on |
|---|---|---|---|
| BB-NEW-110 | The four operations and their rules | g0 | — |
| BB-NEW-111 | Place value | g0 | BB-NEW-110 |
| BB-NEW-112 | Fractions | g0 | BB-NEW-110, BB-NEW-111 |
| BB-NEW-113 | Decimals, percentages & conversion | g0 | BB-NEW-111, BB-NEW-112 |
| BB-NEW-114 | Estimation and number sense | g0 | BB-NEW-110, BB-NEW-111 |
| BB-NEW-115 | What algebra is | g0 | BB-NEW-110 |
| BB-NEW-116 | Expressions, terms & simplifying | g0 | BB-NEW-115 |
| BB-NEW-117 | Expanding brackets | g0 | BB-NEW-110, BB-NEW-115 |
| BB-NEW-118 | Factorising | g0 | BB-NEW-117 |
| BB-NEW-119 | Solving linear equations | g0 | BB-NEW-115, BB-NEW-116 |
| BB-NEW-120 | Solving quadratic equations | g0 | BB-NEW-118, BB-NEW-119 |
| BB-NEW-121 | Inequalities | g0 | BB-NEW-119, BB-NEW-115 |
| BB-NEW-122 | Indices and laws of exponents | g0 | BB-NEW-110, BB-NEW-115 |

**Thirteen BBs.** This batch fills the biggest hole in the entire curriculum — Phase 1 topics 1–3 (Arithmetic, Algebra, Equations) that had zero BBs despite underpinning everything else. The remaining Phase 1 gaps after this batch: exponentials/logarithms (topic 7), sequences & series (8), and proof & logic (10).

---

## Current batch inventory

| File | BBs | Content |
|------|-----|---------|
| `verma-batch-01.json` | 10 | Measurement, vectors |
| `verma-batch-02.md` | 10 | Kinematics, calculus, sig digits |
| `verma-batch-03.md` | 15 | Forces, Newton's laws, equilibrium |
| `verma-batch-04.md` | 15 | Friction, circular motion, work/energy, COM |
| `lines-numbers-batch-01.md` | 3 | Lines, segments, axes, number types |
| `matrices-batch-01.md` | 13 | Matrices via bookkeeping |
| `chemistry-batch-01.md` | 10 | Atomic structure, bonding |
| `foundations-maths-batch-01.md` | 13 | Arithmetic → algebra → equations |
| **Total** | **89** | |
