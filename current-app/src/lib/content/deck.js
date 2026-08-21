/**
 * Strata — The full BB deck.
 * Ported from the legacy index.html DECK array.
 * BB shape: { act, kicker, title, layers, img, tags }
 */
function C(act, kicker, title, layers, img, tags) {
  return { act, kicker, title, layers, img: img || null, tags: tags || null };
}

export const ACTS = {
  I: 'I · Things move, and something makes them',
  II: 'II · Energy and the idea of change',
  III: 'III · Getting infinitely close',
  IV: 'IV · Gravity, and the pull between things',
  V: 'V · Trigonometry, vectors and angles'
};

export const DEPTH_NAMES = [];

// ═══════════════════════════════════════════════════════════════════
// 84-BB deck: 1-32 (original) + 33-37 (chemistry) + 38-70 (CG T0+T1)
//             + 71-84 (Mechanics foundations, Tier 1 + Tier 2)
// ═══════════════════════════════════════════════════════════════════
export const DECK = [
  /* ───────── ACT I ───────── */
  C('I', 'Mechanics 3.0', 'What physics studies', [
    '<p>Physics is the study of matter, motion, force, and energy.</p>',
    '<p>Physics is the study of matter, motion, force, and energy, and of how these interact over time. It explains why a bridge can bear its own weight without collapsing, why a cup of coffee cools at a predictable rate, and why objects fall toward the ground rather than away from it.</p><p>It also explains larger-scale phenomena, including why planets and asteroids follow the orbits and collision courses they do. Some questions remain open, including whether time could run in reverse, whether teleportation is physically possible, and what happens to matter that falls into a black hole. This deck begins with what has already been established through observation and experiment.</p>'
  ], 'images/card-01.png', { subject: 'physics', topic: 'foundations', concept: 'what-physics-is', ground: 'g0', buildsOn: [] }),

  C('I', 'Mechanics 3.1', 'Matter and mass', [
    '<p>Matter is anything that occupies space and has mass.</p>',
    '<p>Matter is anything that occupies space and has mass: solids, liquids, gases, and everything between, from a single bacterium to a star. The quantity present does not change what counts as matter, only that it takes up space and has mass.</p>',
    null,
    '<p>Mass measures an object\'s resistance to a change in its motion. Changing how an object moves, speeding it up, slowing it down, or redirecting it, requires a force; the more mass an object has, the more force that change requires.</p><p>Weight is one way to measure mass, using the pull of gravity on an object, but weight and mass are not the same quantity. A given object has the same mass underwater, in orbit, or anywhere else, because its resistance to a change in motion does not depend on its surroundings. Its weight depends on the strength of the local gravitational pull.</p>'
  ], 'images/card-02.png', { subject: 'physics', topic: 'matter', concept: 'mass; weight-vs-mass', ground: 'g0', buildsOn: [] }),

  C('I', 'Mechanics 3.2', 'Inertia and Newton\'s first law', [
    '<p>An object retains its current state of motion unless acted on by an outside force.</p>',
    '<p>An object retains its current state of motion unless acted on by an outside force. An object at rest remains at rest; an object already moving continues in a straight line at constant speed, unless something interferes. This is Newton\'s first law of motion, often called the law of <strong>inertia</strong>.</p>',
    '<p>A hockey puck sliding across rough pavement stops quickly, which can make stopping look like the natural outcome. It is not: the ground exerts a continuous backward force on the puck through friction. On smooth ice, where that backward force is much weaker, the same puck travels far longer before it stops. On a frictionless surface, it would never stop at all. The puck\'s continued motion is not what needs explaining. Its eventual stop does.</p>'
  ], 'images/card-03.png', { subject: 'physics', topic: 'mechanics', concept: 'inertia; newtons-first-law', ground: 'g0', buildsOn: [] }),

  C('I', 'Mechanics 3.3', 'Friction', [
    '<p>Friction is the resistance two surfaces exert against sliding over each other.</p>',
    '<p>The roughness of two surfaces in contact determines how easily one slides over the other. Rougher surfaces resist sliding more; smoother surfaces resist it less. This resistance to sliding is called <strong>friction</strong>.</p>',
    '<p>A hockey puck sliding across concrete stops almost immediately, while the same puck sliding across ice continues for a much greater distance, despite an identical push. The only difference is the surface beneath it. At a scale too small to see directly, microscopic irregularities in each surface catch against each other; smoother surfaces have fewer and shallower irregularities to catch on.</p>'
  ], 'images/card-04.png', { subject: 'physics', topic: 'mechanics', concept: 'friction', ground: 'g0', buildsOn: [] }),

  C('I', 'Mechanics 3.4', 'Newton\'s second law: F = ma', [
    '<p>Force, mass, and acceleration are related by one exact relationship.</p>',
    '<p>Force, mass, and acceleration are related by one exact relationship: a greater force produces a greater acceleration; a greater mass reduces the acceleration produced by the same force.</p>',
    '<p>A single firm push sends a child on a skateboard rolling at a modest pace; a harder push sends them rolling faster. Attach a load of bricks to the same skateboard, at least ten times the child\'s mass, and the identical push barely moves it. Force and mass do not act independently, they trade off against each other in producing acceleration.</p>',
    null, null,
    '<p>Combining the two relationships: for a fixed mass, acceleration increases in direct proportion to the applied force; for a fixed force, acceleration decreases in direct proportion to the mass. Written as a single equation:</p><div class=\'formula\'>F = m &middot; a<span class=\'gloss\'>Force equals mass times acceleration.</span></div><p>Newton first proved this relationship formally. It has been used to design mechanical systems ever since and has not been disproved within the range of speeds and scales this deck covers. A more complete treatment, accounting for relativistic effects at extreme speeds, comes later.</p>'
  ], 'images/card-05.png', { subject: 'physics', topic: 'mechanics', concept: 'newtons-second-law; force', ground: 'g0', buildsOn: [] }),

  C('I', 'Mechanics 3.5', 'Speed, velocity, and acceleration', [
    '<p>A bus between stops shows speed, velocity, and acceleration changing in turn.</p>',
    '<p>A bus at a stop is motionless. As the driver pulls away, accelerates down the road, and brakes at a traffic light, three distinct quantities change during that short trip: speed, velocity, and acceleration.</p>',
    '<p><strong>Speed</strong> is how fast an object is moving, with no reference to direction. At the stop, the bus\'s speed is zero. As it pulls away, its speed increases. At the light, it falls back to zero. Speed is a single number, such as twenty miles per hour; it states how fast, not which way.</p>',
    '<p><strong>Velocity</strong> is speed combined with a direction. "Twenty miles per hour" is a speed; "twenty miles per hour northbound" is a velocity. Two buses travelling at the same speed but in opposite directions have identical speeds and opposite velocities.</p>',
    '<p><strong>Acceleration</strong> is the rate at which velocity changes. As the bus pulls away, its speed increases, so it is accelerating. As it brakes at the light, its speed decreases, so it is decelerating, which means its acceleration is negative.</p><p>At rest at the stop, nothing is changing, so acceleration is zero. Cruising at a constant speed in a straight line, acceleration is also zero. Acceleration exists only when the motion itself is changing, whether in speed, in direction, or in both.</p>'
  ], 'images/card-06.png', { subject: 'physics', topic: 'mechanics', concept: 'speed; velocity; acceleration', ground: 'g0', buildsOn: [] }),

  C('I', 'Mechanics 3.6', 'Newton\'s third law', [
    '<p>Every force has an equal and opposite reaction force.</p>',
    '<p>Every force has an equal and opposite reaction force. Pushing on a wall produces a force from the wall back on the hand, equal in magnitude. No force acts alone; this is Newton\'s third law.</p><p>Stepping off a small boat onto a dock pushes the boat backward, sometimes far enough to unbalance the person stepping off. The person exerted a backward force on the boat; the boat exerted an equal forward force on the person. A rocket operates on the same principle: it expels gas downward, and the gas exerts an equal upward force on the rocket. Neither the boat nor the rocket is pushing against the ground; each pair of objects is pushing on each other directly.</p>'
  ], 'images/card-07.png', { subject: 'physics', topic: 'mechanics', concept: 'newtons-third-law', ground: 'g0', buildsOn: [] }),

  C('I', 'Mechanics 3.7', 'How hard the stop is', [
    '<p>When something moving comes to a stop, what hurts isn\'t the speed it had. It\'s how sharply that speed was taken away.</p><p>Drop the same speed to zero over two seconds and the stop is gentle. Drop it over a tenth of a second and it\'s brutal. The force depends on the rate the speed falls, and squeezing the same drop into less time makes that rate, and the force, far bigger.</p>',
    '<p>Jump off a chair onto a concrete floor and it jars your knees. Jump from the same height onto a thick crash mat and you feel almost nothing.</p><p>You hit at the same speed both times. The mat doesn\'t change your speed, it changes how quickly that speed is taken off you, spreading the drop over a longer moment. Slower drop, gentler force. Airbags, foam packaging, boxing gloves, a fielder drawing their hands back as they catch: each one stretches the stop, which softens the rate, which shrinks the force.</p>'
  ], 'images/card-08.png', { subject: 'physics', topic: 'mechanics', concept: 'deceleration; impact-force', ground: 'g0', buildsOn: [] }),

  C('I', 'Mechanics 3.8', 'Why crumple zones exist', [
    '<p>A car\'s nose is built to crumple on purpose. It seems backwards to design something to fall apart, but the crumpling is the point.</p><p>By folding, the nose stretches the stop from a sudden instant into a fraction of a second longer. That extra sliver of time is what drops the force from deadly to survivable. The passenger, held by the belt, is brought to rest over that stretched moment instead of all at once.</p>'
  ], 'images/card-09.png', { subject: 'physics', topic: 'mechanics', concept: 'impulse; crumple-zones', ground: 'g0', buildsOn: [] }),

  /* ───────── ACT II ───────── */
  C('II', 'Energy 3.0', 'Energy', [
    '<p>Energy is the reason for existence. For anything to exist, it has to do something, and what matter does is consume energy and release it.</p><p>That is the closest thing matter has to a purpose: to take energy in, and give it back out.</p>',
    '<p>The formal definition: energy is the capacity to do work. "Work" here means a force moving something over a distance. If something can push, lift, heat, or move anything else, it has energy. Energy is measured in joules.</p><p class=\'diagram-ref\'><em>See diagram below</em></p>',
    '<p>Energy comes in a handful of forms, and they turn into one another.</p><p>Kinetic energy is the energy of motion. Potential energy is stored energy, waiting, like a weight held up high. Heat is the energy of jiggling particles. Chemical energy sits in the bonds between atoms, in food and fuel. Light carries energy too.</p><p>Different names, but it\'s all the same thing in different clothing.</p>'
  ], 'images/card-10.png', { subject: 'physics', topic: 'energy', concept: 'what-energy-is; work; joules', ground: 'g0', buildsOn: [] }),

  C('II', 'Energy 3.1', 'Energy is never lost', [
    '<p>A boulder at the top of a hill holds stored energy, waiting. Let it roll and that stored energy turns into the energy of motion. None of it appears from nowhere, and none of it vanishes.</p><p>You cannot make energy from nothing, and you cannot destroy what\'s there. You can only turn it from one form into another. The total always stays the same.</p>'
  ], 'images/card-11.png', { subject: 'physics', topic: 'energy', concept: 'conservation-of-energy', ground: 'g0', buildsOn: [] }),

  /* ───────── ACT III ───────── */
  C('III', 'Calculus 1.0', 'Limits', [
    '<p>Some things can\'t be pinned to an exact number. Instead, they head toward one.</p><p>A value that creeps closer and closer to something, but never exactly lands on it, is called a limit. It\'s one of the most useful ideas in all of maths, and the next few boards lean on it.</p>',
    '<p>How many points sit on the edge of a circle?</p><p>On a perfect circle, infinite. But a perfect circle doesn\'t exist in the real world. Every real circle is made of something, so its edge has some finite, enormous number of points.</p><p>So we say the number of points heads toward infinity. It heads there but never exactly gets there. That is a limit.</p>',
    '<p>Now flip it around. Look at the gap between two neighbouring points on that edge.</p><p>The more points there are, the smaller each gap becomes. As the number of points heads toward infinity, the size of each gap heads toward zero.</p><p>But it never becomes zero, because there is always something between two points. A value heading toward zero without ever being zero. A limit again, pointing the other way.</p>',
    '<p>Here is where it bites. What is one divided by zero?</p><p>Not infinity. Undefined. Maths simply breaks. A real answer to a real problem can never be one over zero, and if you ever land there, something has gone wrong.</p><p>People sometimes write it as infinity, but infinity is not a number, and it is not an answer. This is part of why limits matter: they let us get right up next to zero without ever dividing by it.</p>'
  ], null, { subject: 'maths', topic: 'calculus', concept: 'limits', ground: 'g0', buildsOn: [] }),

  C('III', 'Calculus 1.1', 'Measuring a circle', [
    '<p>We want the area inside a circle. But a curve gives our straight-line tools nothing to grip.</p><p>Straight-edged shapes are easy. We have a formula for the area of a square, a triangle, any polygon. So draw a polygon inside the circle. A square is a rough fit, with gaps. A hexagon fits a little better. Each one, we can measure.</p>',
    '<p>Now let the limit do the work.</p><p>Say the polygon has n sides, and let n head toward infinity. Each extra side hugs the circle a little tighter, and the leftover gap shrinks. As n heads toward infinity, the polygon\'s area heads toward the circle\'s true area.</p><p>It never quite touches it, the same way the points never quite reached infinity. But it gets close enough to give us the answer. We\'ve measured a curved shape using nothing but straight lines and a limit.</p>',
    '<p>Think about how many doors that one move opens.</p><p>If a polygon with infinite sides can give us the area of a circle, then the same trick gives us the area of any curved shape, and the volume of any curved solid. Shapes with no clean edges at all suddenly become measurable.</p><p>Anything that curves, bends, or changes smoothly can now be pinned down.</p>',
    '<p>This is barely 350 years old. Two people, Isaac Newton and Gottfried Leibniz, worked it out separately at almost the same time.</p><p>The engines that ran the industrial age, the machines that left the planet, the computers we think with: all of it leans on this one idea. The trick of getting as close to a perfect imagined answer as we possibly can, without ever needing to reach it.</p>'
  ], null, { subject: 'maths', topic: 'calculus', concept: 'limits; integration-seed; area', ground: 'g0', buildsOn: [] }),

  C('III', 'Calculus 1.2', 'Functions', [
    '<p>Imagine a machine that does only one thing. You press a button, it drops out a bag of chips. That\'s it.</p><p>One button, one result, every time.</p>',
    '<p>You\'ve seen these in malls, railway stations, airports. It\'s called a vending machine. Press B4, get B4\'s crisps, every time. Press a microwave\'s popcorn button, get the popcorn setting, every time.</p><p>Each button is a function: one reliable input, one reliable output. Everything a microwave or a phone can do, all its buttons together, is what we casually call its functionality. The everyday word and the maths word are the same word.</p>',
    '<p>Now we write it down. Mathematicians call the machine f, the input x, and the output f(x).</p><p>So a "double it" machine is f(x) = 2x. Feed it 3, it gives 6. Feed it 10, it gives 20. The notation just names the machine and what you feed it.</p><p>Almost everything in physics and maths from here is built on this.</p>',
    '<p>So how is this different from a plain equation?</p><p>An equation is a question with an answer. "x + 4 = 10" is solved by one value: 6. It sits still. A function doesn\'t have a single answer. It\'s a machine that keeps running.</p><p>Feed f(x) = 2x a 3 and it gives 6; feed it 10 and it gives 20. An equation pins down a value. A function describes how one thing turns into another, for every input you could give it.</p>',
    '<p>Everything in this path from here is the same machine, wearing a different formula. A line is f(x) = mx + c, a "multiply, then add" machine. A parabola is f(x) = x&sup2;, a "square it" machine. Even s = ut + &frac12;at&sup2;, from physics, is the same idea: feed it a time, get back a displacement.</p><p>One exception is coming soon: a circle. Feed it an x and sometimes you get two y\'s back, not one &mdash; which is exactly why a circle isn\'t a function. Worth keeping that exception, not smoothing it over.</p>'
  ], null, { subject: 'maths', topic: 'functions', concept: 'function; f-of-x; function-bridge', ground: 'g0', buildsOn: [] }),

  C('III', 'Calculus 1.3', 'Applying a limit', [
    '<p>A tree grows so slowly you can\'t see it move. A ship crosses the water at a steady crawl. A supersonic jet tears across the sky.</p><p>Different speeds, but the same question underneath: how fast is this changing? To answer questions like these exactly, we lean on one tool, the limit. Here is how to use it.</p>',
    '<p>Take the area inside a circle. You can\'t measure the curve directly, so replace it with something you can: a polygon inside it. That\'s step one, swap the impossible for something workable.</p><p>Step two, make it better: add sides, and the polygon hugs the circle tighter. Step three, take where it\'s heading: let the sides head toward infinity, and the area settles on the value it\'s approaching. That value is the answer.</p>',
    '<p>Those three steps are the whole method of applying a limit. Replace the thing you can\'t handle with something you can. Sharpen it, again and again. Take the value it heads toward.</p><p>It found the circle\'s area. The same three steps find the speed of that jet at a single instant, the volume of a curved solid, and far more.</p>',
    '<p>So a limit doesn\'t measure the impossible thing directly.</p><p>It measures something close, makes that closer and closer, and takes where it\'s heading as the answer. One move, used everywhere from a growing tree to a circle to a jet.</p>'
  ], null, { subject: 'maths', topic: 'calculus', concept: 'limits; rate-of-change', ground: 'g0', buildsOn: [] }),

  /* ───────── ACT IV ───────── */
  C('IV', 'Gravity 3.0', 'Everything pulls on everything', [
    '<p>Remember the third law: push on a wall and it pushes back, equally. Pulls work the same way.</p><p>Imagine everything carries a quiet pull, as if it were a magnet, though it isn\'t really one. You pull on your chair, and the chair pulls back on you, exactly as hard. Equal and opposite, just like the wall.</p>',
    '<p>Now scale it up. The Earth pulls on the Moon, and the Moon pulls back on the Earth, just as hard.</p><p>They\'ve been holding onto each other across a quarter of a million miles of empty space for billions of years.</p>',
    '<p>And it isn\'t only the big things. Every two objects in the universe pull on each other. You and the person beside you. Your phone and the wall. Always, everywhere.</p><p>This pull is called gravity. It is its own force, not actually magnetism, and unlike a magnet it only ever attracts. It never pushes away.</p>'
  ], null, { subject: 'physics', topic: 'gravity', concept: 'universal-gravitation', ground: 'g0', buildsOn: [] }),

  /* ───────── ACT V · TRIGONOMETRY ───────── */
  C("V","Trigonometry 1.0","What trigonometry is",[
    "<p>You're the captain of a ship, and the power is gone. No navigation, no instruments, nothing electrical.</p><p>Far off, you can just make out an island. You need to know things about it, and all you have is what you can see and a bit of maths.</p>",
    "<p>Here's the move: turn the situation into a right triangle. Once a problem fits a right triangle, the angles and sides are tied together, and the maths can hand you the rest.</p><p>But you only have a straight line of sight. So how do you get an angle to work with? You're a smart captain. The ship's flagpole casts a shadow, and a shadow holds more information than it looks.</p>",
    "<p>This is trigonometry: the study of how a triangle's angles and its sides are tied together. Know a few, and you can work out the rest.</p><p>Exactly how the flagpole and its shadow crack the captain's problem, we'll come to. First, the piece that makes it all work.</p>"
  ],null,{subject:"maths",topic:"trigonometry",concept:"trig-intro; right-triangle",ground:"g0",buildsOn:[]}),

  C("V","Trigonometry 1.1","The parts of a right triangle",[
    "<p>Take a right-angled triangle. It has three pieces worth naming. There's the right angle itself, the square corner. The side that stands up opposite it is the perpendicular. The side it sits on is the base. And the longest side, stretching across from the right angle, is the hypotenuse.</p><p>Different textbooks swap some of these names, but the picture is always the same.</p>",
    "<p>A right triangle has two other angles besides the square corner. Textbooks the world over label the one we care about with the Greek letter θ, theta.</p><p>But there are two angles to choose from. Which one is θ? Whichever you want. You pick the angle your problem is about, and call it θ.</p>",
    "<p>Here's the part to hold onto: once you pick θ, the perpendicular and base are decided relative to it. The side opposite your θ is the perpendicular; the one beside it is the base. Choose the other angle, and they swap.</p><p>The captain's flagpole and its shadow make exactly this triangle. Next, we turn these named sides into the ratios that solve the problem.</p>"
  ],null,{subject:"maths",topic:"trigonometry",concept:"right-triangle; theta; sides",ground:"g0",buildsOn:[]}),

  C("V","Trigonometry 1.2","Sine, cosine, tangent",[
    "<p>You've got three sides now: perpendicular, base, hypotenuse. Pick any two and you get a ratio. There are three useful pairings, and each one gets a name.</p><p>Sine, cosine, tangent. That's all they are, names for three ratios of a right triangle's sides. No magic.</p>",
    "<p>Measured against your angle θ: sine is the perpendicular over the hypotenuse. Cosine is the base over the hypotenuse. Tangent is the perpendicular over the base.</p><p>You may also remember it as SOH-CAH-TOA: Sine-Opposite-Hypotenuse, Cosine-Adjacent-Hypotenuse, Tangent-Opposite-Adjacent. \"Opposite\" is just the perpendicular, \"adjacent\" the base.</p>",
    "<p>Each one is a function (remember the machine from before): feed in the angle θ, and it hands back a ratio. Feed in 30 degrees, sine hands back exactly one half, every time.</p><p>That's what cracks the captain's problem. The sun's angle gives a ratio, and a ratio plus one length you can measure unlocks the length you can't.</p>"
  ],null,{subject:"maths",topic:"trigonometry",concept:"sine; cosine; tangent; soh-cah-toa",ground:"g0",buildsOn:[]}),

  C("V","Trigonometry 1.3","Cracking the captain's problem",[
    "<p>Time to rescue the captain. The flagpole and its shadow taught the captain that a shadow hides an angle. Now for the island. Out there is a cliff, and the captain wants its height to check it against the charts.</p>",
    "<p>The captain sights along to the top of the cliff and reads the angle up to it. That angle is θ. The distance from the ship to the foot of the cliff can be paced or estimated, and that's the base of a tall right triangle, with the cliff itself as the perpendicular.</p><p>Tangent does the rest: tangent of θ is perpendicular over base. The angle gives the tangent, the base is known, so the cliff's height drops straight out.</p>",
    "<p>The captain measured a cliff that was never within reach. One angle, one distance, a fixed ratio. This is the whole of trigonometry: turn the world into a right triangle, take one angle, let the ratios hand back the rest.</p><p>But a sharper question remains. There are two islands out there, and the captain needs to know which is closer. Height won't answer that. For distance to something you can't reach, there's another move, coming next.</p>"
  ],null,{subject:"maths",topic:"trigonometry",concept:"tangent; solving-triangles; captain-payoff",ground:"g0",buildsOn:[]}),

  /* ---------- ACT V continued: vectors & angles ---------- */
  C("V","Vectors 3.0","How much isn't enough",[
    "<p>You're at your house and you want to get to the playground. Someone tells you it's exactly half a mile away.</p><p>Is that enough to get you there? No. Walk half a mile and you could end up at the supermarket, the motorway, or in the middle of a lake. A number on its own doesn't get you anywhere.</p><p>You don't just need an amount. You need a direction.</p>",
    "<p>So let's fix the directions. The real way to the playground: walk half a mile straight down your street, then take a left and walk another quarter of a mile.</p><p>Now you have a path. You didn't just cover ground, you covered specific ground in a specific direction. In physics there's a real difference between just moving and actually going somewhere.</p>",
    "<p>Physics splits these into two kinds of quantity.</p><p>A <strong>scalar</strong> has only an amount. Temperature is a scalar. Time is a scalar. \"Half a mile\" is a scalar, just a raw distance.</p><p>A <strong>vector</strong> has an amount and a direction. \"Half a mile north\" is a vector. Picture it as an arrow: its length is how much, its point is which way.</p>",
    "<p>Look at your walk again. You went straight, then you went left. Two arrows, joined end to end.</p><p>But a bird wouldn't follow your streets. It would lift off the roof and fly in one straight diagonal line to the playground.</p><p>That diagonal is the <strong>resultant</strong>: the single arrow that does the job of your two. To add vectors you don't add the numbers, you lay the arrows head to tail and draw the shortcut.</p>",
    "<p>So how long is the bird's flight?</p><p>You can't just add 0.5 and 0.25. Your left turn was a right angle, so your two streets are the two short sides of a right-angled triangle, and the bird's flight is the long side.</p><p>To get its length, vectors borrow geometry. We use Pythagoras.</p><div class='formula'>R² = x² + y²<span class='gloss'>The resultant squared equals the two sides squared and added.</span></div><p>You walked 0.75 miles on the pavement. The bird flew a shorter line to the very same spot.</p>"
  ],null,{subject:"physics",topic:"vectors",concept:"scalars-vectors; resultant; pythagoras",ground:"g0",buildsOn:["Mechanics 3.5"]}),

  C("V","Vectors 3.1","When two things push at once",[
    "<p>Your pedometer counted 0.75 miles on that walk. It only counts steps, so it gives you a scalar. The bird's straight flight to the same place was shorter, maybe 0.55 miles. That's the vector.</p><p>Distance is the scalar. Displacement is the vector. The bird cares about the angle; the pedometer doesn't.</p>",
    "<p>Why does this matter? Because the real world is full of things pushing at the same time.</p><p>Row a boat straight across a fast river. You point it dead ahead, but the current shoves you sideways the whole way across.</p>",
    "<p>You're now making two vectors at once. Your oars push the boat across. The river pushes it downstream.</p><p>You don't land straight opposite where you started. You land well down the bank. You travelled along the diagonal of the two.</p>",
    "<p>That diagonal is the resultant again, this time as a real compromise between two forces.</p><p>Planes live with this constantly. A pilot points east, a crosswind blows south, and the plane actually tracks south-east. The autopilot is adding vectors the whole flight just to hold a straight line.</p>",
    "<p>And the resultant depends entirely on the angle between the two.</p><p>Row with the current and the speeds add up. Row against it and they fight, one subtracting from the other. Point across it and you get the diagonal.</p><p>Vectors aren't just arrows on a page. They're how reality settles a tug-of-war.</p>"
  ],null,{subject:"physics",topic:"vectors",concept:"relative-velocity; real-life; resultant-by-angle",ground:"g0",buildsOn:["Vectors 3.0"]}),

  C("V","Vectors 3.2","Splitting a diagonal",[
    "<p>We can turn two straight arrows into one diagonal. Now go the other way.</p><p>A cannonball is fired off at an angle into the sky, and you want to know how high it climbs. Diagonal lines are awkward to do maths with. We need to break the diagonal apart.</p>",
    "<p>Any diagonal arrow can be split into two straight pieces: a sideways piece and an up-and-down piece. These are its <strong>components</strong>.</p><p>A plane flying north-west is really doing two things at once: going north at some speed, and going west at some speed. Separate the two and the maths gets easy.</p>",
    "<p>Drop a straight line down from the tip of the diagonal and you've drawn a right-angled triangle. The diagonal is the hypotenuse, and you know the angle it sits at.</p><p>You've already met the tools for this. A triangle's sides and angles are tied together by sine, cosine and tangent.</p>",
    "<p>For a diagonal of size V at angle θ, the two pieces come straight out of those ratios.</p><div class='formula'>across = V · cos(θ)<br>up = V · sin(θ)<span class='gloss'>The sideways and vertical parts of the diagonal.</span></div><p>Cosine gives the sideways part, sine gives the vertical part.</p>",
    "<p>This move is called <strong>resolving</strong> a vector, and it's everywhere.</p><p>A bridge holding a truck, a cannonball arcing through the air, a planet pulled by the sun: almost every hard problem in physics starts by splitting a messy diagonal into a tidy sideways piece and a tidy vertical piece, using exactly this.</p>"
  ],null,{subject:"physics",topic:"vectors",concept:"resolving-vectors; components; uses-trig",ground:"g0",buildsOn:["Trigonometry 1.2","Vectors 3.0"]}),

  C("V","Trigonometry 1.4","The made-up 360",[
    "<p>Since school you've been told a full circle is 360 degrees, a right angle is 90, a straight line is 180.</p><p>But why 360? Why not 100, or 10?</p><p>Because people chose it. The Babylonians built their maths around 60, and 360 roughly matched the days in their year. A degree is just a label we agreed on.</p>",
    "<p>Nature never agreed to it. For real physics and the maths that comes later, a made-up unit won't do.</p><p>We want a way to measure an angle that comes from the circle itself, not from an old calendar. Let the circle measure its own angles.</p>",
    "<p>Take a bicycle wheel. The straight spoke from the centre to the rim is the <strong>radius</strong>.</p><p>Pull that spoke out, bend it, and lay it along the rim. Draw lines from the two ends of the bent spoke back to the centre, making a slice.</p><p>The angle at the point of that slice is <strong>one radian</strong>.</p>",
    "<p>A radian isn't an arbitrary number. It's the angle you get when the curved edge is exactly as long as the radius.</p><p>How many fit around a whole circle? Always a little over six, no matter the circle's size. Exactly <strong>2π</strong> of them, about 6.28, make the full turn.</p>",
    "<p>Why does the serious maths insist on radians? Because a degree is a unit, but a radian is a pure ratio.</p><p>In radians, the distance travelled along the edge is just the radius times the angle.</p><div class='formula'>s = r · θ<span class='gloss'>Arc length equals radius times the angle in radians.</span></div><p>That ties turning directly to distance. Without that clean link, the machinery that comes next simply doesn't work.</p>"
  ],null,{subject:"maths",topic:"trigonometry",concept:"radians; degrees; arc-length",ground:"g0",buildsOn:["Trigonometry 1.0"]}),

  /* ---------- Cards 25-29: kinematics & motion in 2D ---------- */
  C("I","Mechanics 3.9","The three accelerators",[
    "<p>Look at a car's dashboard. The speedometer says 60 mph. That's your <strong>speed</strong>.</p><p>But if you ring a friend and say \"I'm doing 60,\" they've no idea whether you're heading toward them or away. Speed is blind. It only says how fast, never which way.</p>",
    "<p>Attach a direction and you get <strong>velocity</strong>: \"60 mph north.\" Now it's an arrow through space. Its length is the 60, its point is north.</p><p>The universe runs on velocity, not bare speed.</p>",
    "<p>Here's why that matters. Drive around a roundabout with cruise control set to a steady 30.</p><p>Your speed never changes. But you're turning the wheel the whole way, so your direction is always changing, and that means your velocity is changing every instant.</p>",
    "<p>Which brings in <strong>acceleration</strong>. In everyday talk it means speeding up. In physics it means <em>any</em> change in velocity.</p><p>A velocity arrow has two parts, length and direction, so there are two ways to change it. That gives a car three accelerators: the throttle, the brake, and the steering wheel.</p>",
    "<p>Throttle lengthens the arrow. Brake shortens it. Steering turns it. To a physicist, all three are acceleration.</p><div class='formula'>a = Δv / Δt<span class='gloss'>Acceleration is the change in velocity over the change in time.</span></div><p>The v there is velocity, the vector, not speed. Take a sharp bend at a constant 30 and you're still accelerating hard, which is exactly why you're thrown against the door.</p>"
  ],null,{subject:"physics",topic:"mechanics",concept:"velocity; acceleration; vectors",ground:"g0",buildsOn:["Mechanics 3.5","Vectors 3.0"]}),

  C("I","Coordinate Geometry 1.0","The infinite tightrope",[
    "<p>How do we track where something is? Start with the simplest map there is: a perfectly straight, endless tightrope.</p><p>Stand in the middle. Call that spot <strong>zero</strong>. This is the one-dimensional world. You can only go forward or backward.</p>",
    "<p>Step forward and you hit 1, then 2, counting up forever. Step back from zero and you enter the mirror side: -1, -2, -3.</p><p>But the rope isn't empty between the steps.</p>",
    "<p>Half a step lands you on 0.5. A step tied to the geometry of a circle might land you on an awkward number like pi. Whole, negative, fraction, decimal: every number has one exact address on this rope.</p><p>This is the <strong>number line</strong>.</p>",
    "<p>Living on the line, your address is a single number. To find the gap between you and a friend, subtract the addresses. You at 5, friend at 2, you're 3 apart. Simple, but it's a trap.</p>",
    "<p>On the line, if something blocks the path at 3 and you're at 1, you can never reach 5. There's no stepping around it, because there is no \"around.\"</p><p>We call this horizontal line the <strong>x-axis</strong>. To get free, we need a second direction.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"number-line; 1D",ground:"g0",buildsOn:[]}),

  C("I","Coordinate Geometry 1.1","The grid of reality",[
    "<p>To escape the tightrope, take a second number line and stand it upright, crossing the first exactly at zero.</p><p>Now you have a crosshair. The flat line is the <strong>x-axis</strong> (left and right). The upright one is the <strong>y-axis</strong> (up and down).</p>",
    "<p>This is two dimensions: a flat, endless map, the <strong>Cartesian plane</strong>. A single number is no longer enough for an address. You need a pair, written (x, y).</p><p>\"Right 3, up 4\" puts you at (3, 4). Every pixel on your screen and every point on a map works this way.</p>",
    "<p>Why does this matter for physics? It gives your vectors a home. Put your house at the centre, (0,0). The street you walked is an arrow along the x-axis. Your left turn is an arrow up the y-axis.</p>",
    "<p>Now the bird's diagonal flight isn't just a sketch. It's an arrow from (0,0) to the playground's exact (x, y) address.</p><p>This is the great translation: shapes and arrows become pure numbers.</p>",
    "<p>Pinned to the grid, a vector no longer has to be drawn to be worked out.</p><div class='formula'>V = (x₂, y₂) − (x₁, y₁)<span class='gloss'>A vector is its end coordinates minus its start coordinates.</span></div><p>Because of this, a computer can work out exactly where a spacecraft will land without ever drawing a map. The map is made of the numbers themselves.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"cartesian-plane; 2D; vectors-on-a-grid",ground:"g0",buildsOn:["Vectors 3.0","Coordinate Geometry 1.0"]}),

  C("I","Mechanics 3.10","The two lives of a falling rock",[
    "<p>Take the grid and hold a rock at (0, 10). Let go.</p><p>It falls straight down the y-axis to (0, 0). On this map, gravity is a force that only knows one direction: down.</p>",
    "<p>And gravity doesn't just pull, it accelerates. As the rock falls, its downward velocity arrow grows longer every second.</p><p>Earth's gravity adds about 9.8 metres per second of speed every second. A relentless vertical accelerator.</p>",
    "<p>Now change it. Put the rock on a table and flick it off the edge. It's moving right (x) while falling down (y).</p><p>Here's one of the great questions in physics: does moving sideways make it fall any slower?</p>",
    "<p>No. Drop a rock from one hand and fire a bullet horizontally from the other at the same instant, and <em>both hit the ground at the same moment</em>.</p><p>That surprises people, but the grid explains it.</p>",
    "<p>The x-axis and y-axis are completely independent. They're blind to each other.</p><p>Gravity is a y-axis force. It has no power over the x-axis at all. So the rock keeps cruising sideways at a steady speed, while quite separately it accelerates downward. In physics you solve the x and the y as two separate problems.</p>"
  ],null,{subject:"physics",topic:"kinematics",concept:"gravity; independence-of-axes",ground:"g0",buildsOn:["Mechanics 3.9","Coordinate Geometry 1.1"]}),

  C("I","Mechanics 3.11","The perfect arc",[
    "<p>Watch a quarterback throw, or a cannon fire. The ball doesn't fly in a straight diagonal or a zig-zag. It paints a smooth curve in the sky.</p><p>Anything thrown through the air is a <strong>projectile</strong>, and that curve is the compromise between the two axes.</p>",
    "<p>When the cannon fires at an angle, we use the resolving trick from before to split that diagonal speed into a sideways (x) part and an upward (y) part.</p><p>Once it leaves the barrel, it's living two lives at once.</p>",
    "<p>Sideways, nothing pushes it any more (ignoring air), so its x-arrow keeps the same length the whole flight. It cruises forward.</p><p>Vertically, it's fighting gravity. The upward arrow shrinks to zero, that's the top of the arc, then flips and grows as it falls.</p>",
    "<p>Combine steady sideways motion with up-stop-down vertical motion, and the path traced on the grid is a curve called a <strong>parabola</strong>.</p><p>A parabola is the footprint of gravity acting on a moving object.</p>",
    "<p>Because the axes are independent, the maths is clean. We use the kinematic (SUVAT) equations.</p><div class='formula'>y = vᵧt − ½gt²<br>x = vₓt<span class='gloss'>Vertical fights gravity (g); horizontal is just steady speed. Time (t) is shared.</span></div><p>The x equation has no g, because gravity doesn't act sideways. The only thing linking the two axes is <strong>time</strong>, the master clock that decides when the arc lands.</p>"
  ],null,{subject:"physics",topic:"kinematics",concept:"projectile-motion; parabolas",ground:"g0",buildsOn:["Vectors 3.2","Mechanics 3.10"]}),

  /* ---------- Cards 30-32: coordinate geometry of curves & lines ---------- */
  C("V","Coordinate Geometry 1.2","Dot and the square game",[
    "<p>Meet Dot, a tiny glowing point living on the grid. She starts at the origin, (0,0).</p><p>Dot plays a game. Each time she steps right along the x-axis, she squares her x-number and walks that many steps up.</p>",
    "<p>Track her. One step right (x=1): one squared is 1, so up 1, to (1,1). Another step (x=2): two squared is 4, up to (2,4). Again (x=3): three squared is 9, up to (3,9).</p><p>She isn't walking a straight line, she's climbing faster and faster.</p>",
    "<p>The glowing trail behind her is a sweeping curve, the <strong>parabola</strong>.</p><p>In physics it's the arc of a thrown ball. In pure maths it's just the shape of numbers multiplied by themselves.</p>",
    "<p>What if Dot walks left, into negative x? Step to x = −2 and she squares it. Negative times negative is positive, so (−2)² is +4, and she goes <em>up</em> to (−2, 4).</p><p>That's why the parabola is a perfect U. Squaring erases the minus sign, so the left side mirrors the right exactly.</p>",
    "<p>We don't need to track her step by step. Her whole endless journey is one rule.</p><div class='formula'>y = x²<span class='gloss'>The height is always the square of the across.</span></div><p>This is a <strong>function</strong>: a machine that takes the across, squares it, and gives back the height. The parabola is just a photograph of that rule.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"parabola; quadratics; graphing",ground:"g0",buildsOn:["Coordinate Geometry 1.1","Mechanics 3.11"]}),

  C("V","Coordinate Geometry 1.3","Dash and the staircase",[
    "<p>Dot has a friend, Dash, who doesn't like speeding-up curves. He likes a steady rhythm.</p><p>Dash starts at (0,1). His rule: for every step right, exactly two steps up. He never changes it.</p>",
    "<p>Right 1, up 2. Right 1, up 2. Up close he's climbing stairs. Zoom out and the stairs blur into a straight slanted ramp. Dash is drawing a <strong>line</strong>.</p>",
    "<p>To describe his line you only need two things. Where did he start? At (0,1), crossing the y-axis at 1, the <strong>y-intercept</strong>. How steep are his stairs? Two up for every one across, the <strong>slope</strong>.</p>",
    "<p>Slope is the measure of straight-line steepness: rise over run, how much up divided by how much across.</p><p>Up 5 for every 1 across is a slope of 5, a near cliff. <em>Down</em> 2 for every 1 across is a slope of −2, heading downhill.</p>",
    "<p>With just the slope and the y-intercept, you can say exactly where Dash will be a million steps on, without drawing a thing.</p><div class='formula'>y = mx + c<span class='gloss'>m is the slope, c is the starting height (y-intercept).</span></div><p>This is the <strong>equation of a straight line</strong>: every straight line is just a slope and a starting point.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"linear-equations; slope; y-intercept",ground:"g0",buildsOn:["Coordinate Geometry 1.1"]}),

  C("V","Coordinate Geometry 1.4","The kissing curves",[
    "<p>Put Dot's U-shaped parabola and Dash's straight line on the same grid at once.</p><p>Do their trails ever cross? Throw a ball toward a slanting roof: the ball hits the roof. On the grid, a hit means the curve and the line share the same (x, y) address.</p>",
    "<p>That's an <strong>intersection</strong>. A straight line through a U-shaped parabola usually cuts it in <em>two</em> places, in one side and out the other.</p>",
    "<p>How do we find those points without the map? Algebra. If they meet, their y-values match there. So take Dot's rule (y = x²) and Dash's rule (y = 2x + 1) and set them equal: x² = 2x + 1.</p><p>Solving that gives the exact meeting points.</p>",
    "<p>Now slide Dash's line down. The two meeting points slide closer together.</p><p>Lower it just enough and the line stops cutting through. It only grazes the very bottom of the curve, touching at a single frozen point before pulling away.</p>",
    "<p>A line that touches a curve at exactly one point without cutting through is a <strong>tangent</strong>.</p><div class='formula'>the tangent line<span class='gloss'>A straight line giving the exact steepness of a curve at one point.</span></div><p>This is the whole goal of calculus: the tangent tells you how steep a curving thing is at one instant, translating the curved world into straight, measurable lines.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"intersections; tangents; algebra-geometry-link",ground:"g0",buildsOn:["Coordinate Geometry 1.2","Coordinate Geometry 1.3"]}),

  /* ---------- Cards 33-34: chemistry (scale & the mole) ---------- */
  C("II","Atomic Chemistry 2.0","The science of exceptions",[
    "<p>Physics loves clean rules: gravity always pulls down, a straight line is always straight. <strong>Chemistry</strong> is the science of exceptions.</p><p>It's messy. Elements misbehave, reactions run backward, molecules change shape at random. Getting a pattern-based science out of that chaos was a real achievement.</p>",
    "<p>But it had to be done, because mastering this messy science is how we survive.</p><p>Without it there's no medicine to cure disease, no rust-proofing for aircraft, no way to filter water or freeze-dry food for orbit. Chemistry is an engine of survival.</p>",
    "<p>To get chemistry, you have to grasp scale, just how small things go.</p><p>It's smaller than you think. A single grain of sand is a mountain next to what we're dealing with. And here's the magic: in that smallness sits an enormous effect on the large world.</p>",
    "<p>It takes billions of atoms to make a speck of dust, yet their tiny shapes decide everything above.</p><p>Move one atom in a large molecule and a life-saving medicine can turn into a poison. The microscopic structure controls the visible world.</p>",
    "<p>Which leaves scientists a problem.</p><p>To build a bridge you count steel beams. To build a medicine you'd need to count atoms. How do you measure and count particles you can't see at all?</p>"
  ],null,{subject:"chemistry",topic:"foundations",concept:"scale; introduction-to-chemistry",ground:"g0",buildsOn:[]}),

  C("II","Atomic Chemistry 2.1","The chemist's dozen",[
    "<p>How do people count things? With grouping words.</p><p>At a bakery you ask for a <strong>dozen</strong> eggs, not twelve. Lincoln said \"four <strong>score</strong>,\" not eighty years. A hundred years is a <strong>century</strong>.</p>",
    "<p>Dozen, score, century: just words standing for numbers, to make counting big things easier.</p><p>Chemists need to count atoms to mix their recipes. But atoms are so small that asking for a dozen of them is useless. You couldn't see a trillion.</p>",
    "<p>So they invented a new grouping word, the biggest in history: the <strong>mole</strong>.</p><p>Just as a dozen always means 12, a mole always means about 602,200,000,000,000,000,000,000 things. Just a number, nothing mystical.</p>",
    "<p>To feel how huge it is against how small atoms are: a mole of marbles would bury the Earth's surface miles deep. But a mole of water molecules fits in a single shot glass.</p><p>That's the microscopic scale. The number is vast, the particles almost ghosts.</p>",
    "<p>That number is the translator between the invisible world and the visible one.</p><div class='formula'>1 mole = 6.022 × 10²³ particles<span class='gloss'>The bridge between counting atoms and weighing grams.</span></div><p>Because of it, a chemist can put a cup of powder on an ordinary scale and know exactly how many trillions of atoms are inside, without counting one.</p>"
  ],null,{subject:"chemistry",topic:"stoichiometry",concept:"the-mole; avogadros-number",ground:"g0",buildsOn:["Atomic Chemistry 2.0"]}),

  /* ---------- Cards 35-37: atomic structure ---------- */
  C("II","Atomic Chemistry 2.2","The cosmic menu",[
    "<p>The whole world is made from just 118 ingredients.</p><p>Think of everything you've ever seen: every star, every ocean, every building, the screen you're reading on, the eyes you're reading with. All of it is built from the same short recipe list.</p>",
    "<p>Before you say \"what about dark matter, or the God particle?\" — yes, there are stranger, deeper mysteries out there. We'll keep those for later.</p><p>For the physical, touchable universe, the stuff you can weigh and handle, those 118 ingredients are everything.</p>",
    "<p>These ingredients are called <strong>elements</strong>, and they're laid out on one famous chart: the <strong>periodic table</strong>.</p><p>Don't read it as a poster to memorise. Read it as the inventory of reality, the complete list of what the universe is made of.</p>",
    "<p>Just as a baker mixes flour, butter and sugar into hundreds of pastries, nature mixes these elements.</p><p>Take three, carbon, hydrogen, oxygen. Combine them one way and you get the sugar in your coffee. Another way, rocket fuel. Another, a tree trunk. The magic isn't endless ingredients, it's how they link up.</p>",
    "<p>So what makes element 8 (oxygen) behave so differently from element 79 (gold)?</p><p>To answer that, things are about to get small. Smaller than you can easily imagine. We have to look inside the ingredients themselves.</p>"
  ],null,{subject:"chemistry",topic:"periodic-table",concept:"elements; periodic-table-intro",ground:"g0",buildsOn:["Atomic Chemistry 2.0"]}),

  C("II","Atomic Chemistry 2.3","The 80th cut",[
    "<p>Take a piece of iron, a 100-gram chunk about the size of a golf ball, held between two fingers.</p><p>Now take a magically sharp knife and start cutting it in half. How many cuts until you reach the smallest possible piece of iron? Millions? Billions? Let's find out.</p>",
    "<p>First cut: two halves, 50 grams each. Again: 25 grams. Cut three: 12.5. Cut four: 6.25. It shrinks fast. By cut 10 it's smaller than a grain of sand.</p><p>But we keep going. We're chasing the very bottom of matter.</p>",
    "<p>By cut 30 it's invisible to the eye. By cut 50, smaller than a virus. By cut 70, we're past the DNA inside a cell.</p><p>We cut until the knife simply won't divide it any further. It can't stay iron and get smaller. And the number of cuts it took is surprisingly small: exactly <strong>80</strong>.</p>",
    "<p>After 80 halvings you're left with a single dot of matter, the very basement of the universe.</p><p>You've reached <strong>the atom</strong>, the building block of all 118 ingredients. Cut this final dot and it stops being iron at all, breaking into something else entirely.</p>",
    "<p>The word atom comes from the Greek <em>atomos</em>. It means <strong>uncuttable</strong>.</p><div class='formula'>the atom<span class='gloss'>The smallest recognisable piece of any element on the periodic table.</span></div><p>Gold, oxygen, carbon, iron: every element is just a collection of these uncuttable dots. But what makes an iron atom different from a gold one? We have to look inside the dot.</p>"
  ],null,{subject:"chemistry",topic:"atomic-structure",concept:"the-atom; scale-of-matter",ground:"g0",buildsOn:["Atomic Chemistry 2.2"]}),

  C("II","Atomic Chemistry 2.4","The three puzzle pieces",[
    "<p>Here's a twist. That \"uncuttable\" atom? Not quite true. It isn't the smallest thing after all.</p><p>In the early 1900s scientists cracked the atom open, and what they found changed everything. The atom isn't a solid dot. It's a container.</p>",
    "<p>Inside are just three smaller pieces: <strong>protons, neutrons and electrons</strong>.</p><p>This is the real plot twist. An iron atom and a gold atom look nothing alike in the world, but zoom in and they're built from the exact same three parts. There's no \"gold proton\" or \"iron electron.\" A proton is a proton, everywhere.</p>",
    "<p>How are they arranged? Protons (positive charge) and neutrons (no charge) are packed tightly in a heavy clump at the dead centre, the <strong>nucleus</strong>.</p><p>The electrons (negative charge) are tiny, and they swarm around the outside at blinding speed, like a cloud.</p>",
    "<p>At this scale, the \"type\" of matter stops existing. There's only counting.</p><p>The only thing making an atom behave like gold, or oxygen, or iron is the <em>number</em> of these pieces inside. The universe isn't a kitchen with 118 ingredients. It's a Lego set with three kinds of brick.</p>",
    "<p>The key brick is the proton. Its count is an element's ID card. Exactly 26 protons in the centre means iron. 79 means gold.</p><div class='formula'>atomic number (Z) = number of protons<span class='gloss'>Change the proton count and you change the element itself.</span></div><p>That's what the periodic table is really sorting: it starts at hydrogen (1 proton) and counts up, one at a time.</p>"
  ],null,{subject:"chemistry",topic:"atomic-structure",concept:"protons-neutrons-electrons; atomic-number",ground:"g0",buildsOn:["Atomic Chemistry 2.3"]}),

  /* ---------- Cards 38-70: Coordinate Geometry path, Tier 0 (the plane) + Tier 1 (lines) ---------- */
  C("V","Coordinate Geometry 1.5","A line that holds every number",[
    "<p>A number line is a straight line where every point stands for a number. Walk along it to the right and the numbers climb. Walk back and they fall.</p><p>It turns \"more\" and \"less\" into \"further right\" and \"further left\" — a quantity becomes a place you can point to.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"number-line",ground:"g0",buildsOn:[]}),

  C("V","Coordinate Geometry 1.6","The point everything is measured from",[
    "<p>Zero isn't nothing on the line. It's a place, like any other point, and it's the one every other number is measured against.</p><p>A number doesn't just say \"how much.\" It says \"this much more than zero\" or \"this much less.\"</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"zero; origin-1d",ground:"g0",buildsOn:["Coordinate Geometry 1.5"]}),

  C("V","Coordinate Geometry 1.7","Two directions from zero",[
    "<p>Positive numbers sit to the right of zero. Negative numbers sit to the left. The sign in front of a number isn't really about size, it's about which way from zero you're standing.</p><p>−5 isn't a tiny version of 5. It's 5 steps the other direction — and which side gets called \"positive\" is a convention, not a law. Everyone just agreed on right, and never had reason to flip it.</p>",
    "<p>A bank balance of −50 isn't a small amount of money. It's a debt of 50. The minus sign carries a direction, not a shrinking.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"positive-negative; sign-as-direction",ground:"g0",buildsOn:["Coordinate Geometry 1.6"]}),

  C("V","Coordinate Geometry 1.8","The gaps between the whole numbers",[
    "<p>The number line isn't just dots at 1, 2, 3. Between any two whole numbers there's room for halves, quarters, and decimals: 1.5 sits exactly halfway between 1 and 2.</p><p>However finely you slice the gap, there's always a number that lives there.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"fractions-decimals-on-line; density",ground:"g0",buildsOn:["Coordinate Geometry 1.5"]}),

  C("V","Coordinate Geometry 1.9","The line settles every argument about size",[
    "<p>Which is bigger, −3 or −8? Find them on the line. Whichever one sits further right is the bigger number, no matter how the digits look.</p><p>−3 is to the right of −8, so −3 is bigger, even though 8 looks like the larger digit.</p><p>Since the line never ends in either direction, there's always a bigger number and always a smaller one. That's exactly what +∞ and −∞ mean — not numbers you can land on, just the fact that comparison never runs out.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"comparing-numbers; ordering; infinity-notation",ground:"g0",buildsOn:["Coordinate Geometry 1.7"]}),

  C("V","Coordinate Geometry 1.10","Subtraction is just a length",[
    "<p>How far apart are 2 and 9 on the line? Count it out, 3-4-5-6-7-8-9, that's seven steps. Or just subtract: 9 − 2 = 7. Same answer — subtraction is just counting, done in one move.</p>",
    "<p>It works with negatives too. The distance between −3 and 4 is 4 − (−3) = 7. Distance can't be negative, so if subtracting one way gives a negative number, just flip it.</p><div class='formula'>distance = |a − b|<span class='gloss'>Subtract the two points, then drop the sign — distance is always positive.</span></div>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"distance-1d; subtraction-as-length",ground:"g0",buildsOn:["Coordinate Geometry 1.7"]}),

  C("V","Coordinate Geometry 1.11","The exact middle, found by averaging",[
    "<p>The midpoint between 2 and 9 is 5.5 — found by adding them and halving the result. Averaging two numbers always lands you exactly between them on the line.</p><div class='formula'>midpoint = (a + b) / 2<span class='gloss'>Add the two points, then halve it.</span></div>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"midpoint-1d",ground:"g0",buildsOn:["Coordinate Geometry 1.10"]}),

  C("V","Coordinate Geometry 1.12","One line can't hold everything",[
    "<p>A number line tells you how far along, but that's not always enough. Picture a movie theatre: \"seat 12\" alone doesn't pin down one place, every row has its own seat 12. You need two independent numbers at once, row and seat, to find the exact one.</p><p>To fix that, we don't add more numbers to the same line. We add a second line, crossing the first.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"limits-of-1d; need-for-2d",ground:"g0",buildsOn:["Coordinate Geometry 1.5"]}),

  C("V","Coordinate Geometry 1.13","Two number lines, crossed at a right angle",[
    "<p>Lay one number line flat. Stand a second one upright, crossing it at a right angle. The flat one is the x-axis, the upright one is the y-axis. x is conventionally the input, chosen first; y is the output, produced after — exactly what \"y = f(x)\" means later on: pick x, get y.</p><p>Together they don't just measure two separate things. They measure one thing: position, in a way one line alone never could.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"x-axis; y-axis; cartesian-plane",ground:"g0",buildsOn:["Coordinate Geometry 1.12"]}),

  C("V","Coordinate Geometry 1.14","Where the two lines meet",[
    "<p>The origin is the single point where the x-axis and y-axis cross. It's zero on both lines at once, and it's where every measurement on the grid starts from.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"origin-2d",ground:"g0",buildsOn:["Coordinate Geometry 1.13"]}),

  C("V","Coordinate Geometry 1.15","Every place on the grid has an address",[
    "<p>A point on the grid is written (x, y): how far along the x-axis, then how far up the y-axis. To plot (3, 4), go to 3 on the x-axis first, then move 4 straight up from there. That's the point.</p><p>It's an address — an <strong>ordered pair</strong>. Two numbers, one exact place, and the order is non-negotiable: (3, 4) and (4, 3) are different points entirely.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"plotting-points; ordered-pair",ground:"g0",buildsOn:["Coordinate Geometry 1.13","Coordinate Geometry 1.14"]}),

  C("V","Coordinate Geometry 1.16","Going backwards: point to address",[
    "<p>Plotting goes from numbers to a point. Reading a graph goes the other way: drop a perpendicular from the point to each axis. Where it lands on the x-axis gives you x; where it lands on the y-axis gives you y.</p><p>That trips people up at first, since distance from the y-axis gives the x-coordinate, not the y. It's the reverse of what you'd guess, and it's exactly the previous card run backwards.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"reading-coordinates",ground:"g0",buildsOn:["Coordinate Geometry 1.15"]}),

  C("V","Coordinate Geometry 1.17","The grid splits into four rooms",[
    "<p>The two axes cut the plane into four regions, called quadrants, numbered I to IV going anticlockwise from the top right.</p><p>Every point on the grid lives in exactly one of them, unless it sits right on an axis.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"quadrants",ground:"g0",buildsOn:["Coordinate Geometry 1.15"]}),

  C("V","Coordinate Geometry 1.18","The signs of x and y give it away",[
    "<p>You don't need to look at a picture to know which quadrant a point is in. Just check the signs.</p><p>Both positive: quadrant I. Negative x, positive y: quadrant II. Both negative: quadrant III. Positive x, negative y: quadrant IV.</p><p>Notice the pattern: moving between neighbouring quadrants always flips exactly one sign, never both at once.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"quadrant-signs",ground:"g0",buildsOn:["Coordinate Geometry 1.17"]}),

  C("V","Coordinate Geometry 1.19","Borrowing a triangle to measure a diagonal",[
    "<p>Two points on a number line: just subtract. Two points on a grid: the straight-line gap between them is diagonal, and subtraction alone won't measure a diagonal.</p><p>So build a right-angled triangle: the horizontal gap is one side, the vertical gap is the other, and the diagonal distance is the hypotenuse.</p>",
    "<p>Pythagoras hands back the hypotenuse from the other two sides.</p><div class='formula'>d = √((x₂−x₁)² + (y₂−y₁)²)<span class='gloss'>The horizontal gap squared, plus the vertical gap squared, then square-rooted.</span></div><p>It's the number-line distance formula, just run twice and stitched together with Pythagoras.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"distance-formula-2d; pythagoras",ground:"g0",buildsOn:["Coordinate Geometry 1.10","Coordinate Geometry 1.15"]}),

  C("V","Coordinate Geometry 1.20","Averaging both coordinates at once",[
    "<p>The midpoint between two points on a grid is found the same way as on a line, just done twice: average the x-coordinates, then average the y-coordinates.</p><div class='formula'>midpoint = ((x₁+x₂)/2, (y₁+y₂)/2)<span class='gloss'>Average the x's. Average the y's. That's the point exactly between them.</span></div>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"midpoint-2d",ground:"g0",buildsOn:["Coordinate Geometry 1.11","Coordinate Geometry 1.15"]}),

  C("V","Coordinate Geometry 1.21","A shape is just a few points, joined up",[
    "<p>Plot three points and join them and you have a triangle. Plot four and you might have a rectangle, a kite, or nothing recognisable at all, depending where they sit.</p><p>Don't just eyeball the shape, prove it. Take (0,0), (4,0), (4,3), (0,3): run the distance formula on each side and you get 4, 3, 4, 3. Opposite sides equal, confirmed by calculation rather than by looking, which is exactly how you prove it's a rectangle.</p><p>Every shape on a grid, however complicated, is built the same way: a list of points, connected in order, provable with the tools already in this tier.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"shapes-from-points",ground:"g0",buildsOn:["Coordinate Geometry 1.15"]}),

  C("V","Coordinate Geometry 1.22","Did you know? The footnote that ate the book",[
    "<p>René Descartes published this idea in 1637 — not as its own book, but as an appendix called La Géométrie, tucked onto the back of a philosophy book, Discourse on the Method.</p><p>Legend says it came to him while lying in bed, watching a fly walk across the ceiling. He realised he could pin down the fly's exact position at any instant using just its distance from two walls.</p><p>The twist: the footnote outlived the book. Almost nobody reads Discourse on the Method for its philosophy anymore. The entire system is named after the appendix that was barely the point.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"history-descartes",kind:"snippet",ground:"g0",buildsOn:["Coordinate Geometry 1.13"]}),

  C("V","Coordinate Geometry 1.23","Quick things to remember — Tier 0",[
    "<ul><li>A number line orders every real number — equal spacing means equal difference.</li><li>Zero is the reference point, not the start. Right = positive, left = negative, by convention.</li><li>Between any two numbers there are infinitely many more.</li><li>Distance on a line = |a − b|. Midpoint = (a + b) / 2.</li><li>Two number lines crossed at a right angle make the x-axis (horizontal) and y-axis (vertical).</li><li>A point's address is the ordered pair (x, y) — x first, always.</li><li>The origin (0, 0) is where both axes' zeros meet.</li><li>Distance on the grid: d = √((x₂−x₁)² + (y₂−y₁)²). Midpoint: ((x₁+x₂)/2, (y₁+y₂)/2).</li><li>Four quadrants, I–IV, anticlockwise from top-right: (+,+), (−,+), (−,−), (+,−).</li></ul>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"tier-0-recap",kind:"recap",ground:"g0",buildsOn:["Coordinate Geometry 1.21"]}),

  C("V","Coordinate Geometry 1.24","How much a line leans",[
    "<p>Draw a line that passes through quadrant I, cuts into quadrant II, and eventually reaches quadrant III — never dipping into quadrant IV. Slide your finger along it: as x increases, y increases too, at the same rate the entire way. x and y aren't moving independently, they're locked into a relationship.</p><p>That rate never changes, the whole way along, and that's what makes it a line rather than a curve. A curve's rate keeps changing as you move; a line's never does.</p>",
    "<p>That constant rate of change has a name: <strong>steepness</strong>. A line climbing left to right (like the one above) has positive steepness. One falling left to right has negative steepness. Either way, it's exactly measurable, not just eyeballed.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"steepness-intro; constant-rate",ground:"g0",buildsOn:["Coordinate Geometry 1.15"]}),

  C("V","Coordinate Geometry 1.25","How far up, how far along",[
    "<p>Pick two points on a line. There are exactly two distances worth measuring between them: how far up (or down) you went, and how far along you went. Mathematicians write these as Δy (vertical change) and Δx (horizontal change) — Δ just means \"change in.\"</p><p>A steep line has a big Δy for a small Δx. A gentle line has the opposite.</p>",
    "<p>Take the points (1, 2) and (4, 8) on a line. Δy = 8 − 2 = 6. Δx = 4 − 1 = 3. That's the whole measurement: 6 up, 3 along.</p><p>Some textbooks give these two distances nicknames: \"rise\" for Δy, \"run\" for Δx — common in American classrooms, less so elsewhere. NCERT and most other curricula skip the nicknames and go straight to Δy and Δx, which is what actually carries forward into the formula.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"delta-y; delta-x; rise-run",ground:"g0",buildsOn:["Coordinate Geometry 1.24"]}),

  C("V","Coordinate Geometry 1.26","Turning the lean into one number",[
    "<p>Divide Δy by Δx and steepness stops being a vague impression and becomes one exact number: the <strong>gradient</strong> — also called the <strong>slope</strong>. Same number, two names for it.</p><div class='formula'>m = Δy / Δx = (y₂−y₁) / (x₂−x₁)<span class='gloss'>The vertical change between two points on the line, divided by the horizontal change.</span></div>",
    "<p>Same two points as before, (1, 2) and (4, 8): m = (8 − 2) / (4 − 1) = 6 / 3 = 2. That line climbs 2 units for every 1 unit it moves right.</p><p>Pick any other two points on that same line, say (2, 4) and (4, 8): m = (8 − 4) / (4 − 2) = 4 / 2 = 2. Same answer. That's what makes a line straight — the gradient never changes, wherever you measure it.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"gradient; slope",ground:"g0",buildsOn:["Coordinate Geometry 1.25","Coordinate Geometry 1.19"]}),

  C("V","Coordinate Geometry 1.27","Uphill or downhill, left to right",[
    "<p>Read a graph left to right. If the line climbs, the gradient is positive. If it falls, the gradient is negative.</p><p>The sign isn't decoration, it's the direction the line is heading, exactly like the sign on a number line.</p>",
    "<p>The line through (1, 2) and (4, 8) has m = 2 — positive, and it climbs left to right. Compare a line through (1, 8) and (4, 2): m = (2 − 8) / (4 − 1) = −6 / 3 = −2. Negative, and it falls left to right. Same two points, reversed heights, opposite sign.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"gradient-sign",ground:"g0",buildsOn:["Coordinate Geometry 1.26"]}),

  C("V","Coordinate Geometry 1.28","No rise at all",[
    "<p>A perfectly horizontal line never climbs or falls. Its Δy is always zero, whatever Δx is, so its gradient is zero.</p><p>A gradient of zero doesn't mean \"no line.\" It means a line that goes nowhere up or down.</p>",
    "<p>Take (1, 4) and (6, 4) — same y, different x. m = (4 − 4) / (6 − 1) = 0 / 5 = 0. Zero on top of the fraction, whatever sits on the bottom, always gives zero.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"zero-gradient",ground:"g0",buildsOn:["Coordinate Geometry 1.26"]}),

  C("V","Coordinate Geometry 1.29","When the formula breaks",[
    "<p>A perfectly vertical line has zero Δx — it never moves along at all. The gradient formula needs to divide by that Δx, and dividing by zero is undefined.</p><p>So a vertical line doesn't have a small gradient or a huge one. It has no gradient. The formula simply doesn't apply.</p>",
    "<p>Take (3, 1) and (3, 9) — same x, different y. m = (9 − 1) / (3 − 3) = 8 / 0. Not zero, not a huge number — undefined. The calculation itself breaks down.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"undefined-gradient; vertical-line",ground:"g0",buildsOn:["Coordinate Geometry 1.26"]}),

  C("V","Coordinate Geometry 1.30","One equation, every point on the line",[
    "<p>Every point on a straight line obeys the same rule: y = mx + c. Feed in any x, and the equation hands back the matching y, for every single point on that line and no others.</p><div class='formula'>y = mx + c<span class='gloss'>m is the gradient. c is where the line crosses the y-axis.</span></div>",
    "<p>Take y = 2x + 3. Feed in x = 1: y = 2(1) + 3 = 5. Feed in x = 4: y = 2(4) + 3 = 11. Every (x, y) pair this equation produces, (1, 5), (4, 11), or any other, sits on that one line, and nothing else does.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"line-equation; y-mx-c",ground:"g0",buildsOn:["Coordinate Geometry 1.26"]}),

  C("V","Coordinate Geometry 1.31","Two knobs, two jobs",[
    "<p>In y = mx + c, the two letters do two completely separate jobs. m controls the lean of the line — how steep, and which way. c controls where the line sits — specifically, where it crosses the y-axis.</p><p>Change m and the line tilts. Change c and the line slides up or down without tilting at all.</p>",
    "<p>y = 2x + 3 and y = 2x + 7 share m = 2, so they're tilted identically — just shifted, since c changed from 3 to 7. y = 2x + 3 and y = 5x + 3 share c = 3, so they cross the y-axis at the same spot — but m changed from 2 to 5, so one is far steeper.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"m-and-c-roles",ground:"g0",buildsOn:["Coordinate Geometry 1.30"]}),

  C("V","Coordinate Geometry 1.32","Reverse-engineering the line",[
    "<p>Given just two points, you can rebuild the whole equation. First find the gradient using Δy/Δx. Then plug one point and that gradient into y = mx + c and solve for c.</p><p>Two points are all a straight line ever needs.</p>",
    "<p>Take (2, 7) and (5, 16). m = (16 − 7) / (5 − 2) = 9 / 3 = 3. Plug (2, 7) into y = 3x + c: 7 = 3(2) + c, so c = 1. The line is y = 3x + 1. Check it against the other point: 3(5) + 1 = 16. ✓</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"equation-from-two-points",ground:"g0",buildsOn:["Coordinate Geometry 1.26","Coordinate Geometry 1.30"]}),

  C("V","Coordinate Geometry 1.33","Same lean, different position",[
    "<p>Two lines are parallel exactly when they share the same gradient. They lean at the same angle, so however far you follow them, they never meet.</p><p>Different c, same m: parallel but never touching.</p>",
    "<p>y = 2x + 3 and y = 2x − 4 both have m = 2. Same lean, shifted apart — at every x, the second line sits exactly 7 below the first, so they run side by side forever.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"parallel-lines",ground:"g0",buildsOn:["Coordinate Geometry 1.30"]}),

  C("V","Coordinate Geometry 1.34","Meeting at a perfect right angle",[
    "<p>Two lines cross at exactly 90° when their gradients are negative reciprocals of each other: flip one gradient upside down and switch its sign, and you get the other.</p><div class='formula'>m₁ × m₂ = −1<span class='gloss'>Multiply the two gradients of perpendicular lines and you always get −1.</span></div>",
    "<p>A gradient of 2 pairs with a perpendicular gradient of −1/2. Check it: 2 × (−1/2) = −1. ✓ Steep meets shallow, opposite sign, at a perfect corner.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"perpendicular-lines; negative-reciprocal",ground:"g0",buildsOn:["Coordinate Geometry 1.30"]}),

  C("V","Coordinate Geometry 1.35","Setting y to zero",[
    "<p>A line crosses the x-axis exactly where its height, y, is zero. Set y = 0 in the line's equation and solve for x, and that x is where the crossing happens.</p><p>This crossing point has a name: the root.</p>",
    "<p>Take y = 2x − 6. Set y = 0: 0 = 2x − 6, so x = 3. The line crosses the x-axis at (3, 0) — its root is 3.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"x-intercept; root",ground:"g0",buildsOn:["Coordinate Geometry 1.30"]}),

  C("V","Coordinate Geometry 1.36","Setting x to zero",[
    "<p>A line crosses the y-axis exactly where x = 0. Plug x = 0 into y = mx + c and everything with m vanishes, leaving y = c.</p><p>That's why c is called the intercept: it's the height the line sits at the instant it crosses the y-axis.</p>",
    "<p>Same line as before, y = 2x − 6. At x = 0: y = 2(0) − 6 = −6. It crosses the y-axis at (0, −6) — and sure enough, c = −6, exactly as the equation already said.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"y-intercept",ground:"g0",buildsOn:["Coordinate Geometry 1.30"]}),

  C("V","Coordinate Geometry 1.37","One point, shared by two equations",[
    "<p>Two different lines cross at exactly one point, unless they're parallel. At that point, both equations are true at once: the same x and y satisfy both.</p><p>Set the two equations equal to each other, solve for x, then plug it back in for y. That's the meeting point, found without ever drawing the graph.</p>",
    "<p>Take y = 2x − 6 and y = −x + 9. Set them equal: 2x − 6 = −x + 9, so 3x = 15, x = 5. Plug back in: y = 2(5) − 6 = 4. They meet at (5, 4). Check the other equation: −5 + 9 = 4. ✓</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"simultaneous-equations-graphical",ground:"g0",buildsOn:["Coordinate Geometry 1.30"]}),

  /* ---------- Mechanics 3.12-3.18: Mechanics foundations, Tier 1 (mathematical formulation) ---------- */
  C("I","Mechanics 3.12","How physics expresses a law mathematically",[
    "<p>A physical law is a precise relationship between measurable quantities, expressed as an equation rather than a description. Each quantity in that equation has a defined unit, and the equation holds regardless of which specific numbers are substituted into it.</p><p>Newton's second law, introduced in Mechanics 3.4, is one example: F = ma relates force (measured in newtons), mass (in kilograms), and acceleration (in metres per second squared). The equation does not just describe the relationship in words, it specifies exactly how the three quantities trade off against each other, for any values at all. The BBs that follow formalize the qualitative ideas from Mechanics 3.0-3.6 into equations of this kind.</p>"
  ],null,{subject:"physics",topic:"foundations",concept:"law-as-equation; units",ground:"g1",buildsOn:["Mechanics 3.0"]}),

  C("I","Mechanics 3.13","Mass, weight, and units",[
    "<p>Mass is a scalar quantity, measured in <strong>kilograms (kg)</strong>. It has a magnitude only, no direction, and the same number applies wherever the object is located.</p><p>Weight is the force of gravity acting on that mass, and unlike mass, it is measured in <strong>newtons (N)</strong>, the unit of force. The two are related by:</p><div class='formula'>W = mg<span class='gloss'>Weight equals mass times the local gravitational acceleration, g.</span></div><p>Near Earth's surface, g is approximately 9.8 m/s², so a 1 kg mass weighs about 9.8 N. On the Moon, where g is about 1.6 m/s², the same 1 kg mass weighs only about 1.6 N. The mass, 1 kg, does not change; only the weight does.</p>"
  ],null,{subject:"physics",topic:"matter",concept:"mass-unit; weight-equation",ground:"g1",buildsOn:["Mechanics 3.1"]}),

  C("I","Mechanics 3.14","Newton's first law as a condition",[
    "<p>Newton's first law can be stated as a single condition: an object moves at constant velocity, including remaining at rest, exactly when the net force acting on it is zero.</p><div class='formula'>&Sigma;F = 0 &rArr; v = constant<span class='gloss'>If the sum of all forces on an object is zero, its velocity does not change.</span></div><p>This condition, &Sigma;F = 0, is what \"left alone\" meant in Mechanics 3.2: not the absence of any forces, but the absence of a net, unbalanced one. A book resting on a table has gravity pulling it down and the table pushing it up; these two forces sum to zero, which is why the book stays at constant velocity, meaning at rest.</p>"
  ],null,{subject:"physics",topic:"mechanics",concept:"net-force; equilibrium-condition",ground:"g1",buildsOn:["Mechanics 3.2"]}),

  C("I","Mechanics 3.15","The friction equation",[
    "<p>The amount of friction between two surfaces can be calculated, not just described qualitatively. It depends on two things: how strongly the two surfaces are pressed together, and a number describing how rough that particular pair of surfaces is.</p><div class='formula'>F = &mu;N<span class='gloss'>Friction force equals the coefficient of friction (&mu;) times the normal force (N).</span></div><p>N is the <strong>normal force</strong>, the force pressing the two surfaces together (for an object resting on a flat surface, this equals its weight). &mu;, the <strong>coefficient of friction</strong>, is a number specific to the pair of materials in contact: rubber on dry concrete has a high &mu;; steel on ice has a low one. A larger &mu; or a larger N both produce more friction.</p>"
  ],null,{subject:"physics",topic:"mechanics",concept:"coefficient-of-friction; normal-force",ground:"g1",buildsOn:["Mechanics 3.3"]}),

  C("I","Mechanics 3.16","Rearranging F = ma",[
    "<p>Newton's second law, F = ma, can be rearranged to solve for any one of its three quantities once the other two are known.</p><div class='formula'>a = F / m<br>m = F / a<span class='gloss'>The same relationship, solved for acceleration or for mass.</span></div><p>Each quantity carries its own SI unit: force in newtons (N), mass in kilograms (kg), acceleration in metres per second squared (m/s&sup2;). One newton is defined as exactly the force that gives a 1 kg mass an acceleration of 1 m/s&sup2;, which is what ties the three units together: 1 N = 1 kg&middot;m/s&sup2;.</p>"
  ],null,{subject:"physics",topic:"mechanics",concept:"newtons-second-law-rearranged; SI-units",ground:"g1",buildsOn:["Mechanics 3.4"]}),

  C("I","Mechanics 3.17","Velocity and acceleration as rates of change",[
    "<p>Velocity and acceleration, introduced qualitatively in Mechanics 3.5, are each defined as a rate of change.</p><div class='formula'>v = &Delta;x / &Delta;t<br>a = &Delta;v / &Delta;t<span class='gloss'>Velocity is the change in position over the change in time; acceleration is the change in velocity over the change in time.</span></div><p>&Delta;x (change in position) and &Delta;v (change in velocity) are measured over an interval of time, &Delta;t. Velocity is measured in metres per second (m/s); acceleration, being a change in velocity per second, is measured in metres per second squared (m/s&sup2;).</p>"
  ],null,{subject:"physics",topic:"mechanics",concept:"velocity-formula; acceleration-formula",ground:"g1",buildsOn:["Mechanics 3.5"]}),

  C("I","Mechanics 3.18","Newton's third law as an equation",[
    "<p>Newton's third law can be written as a single equation relating the two forces in any interacting pair.</p><div class='formula'>F&#8321;&#8322; = &minus;F&#8322;&#8321;<span class='gloss'>The force of object 1 on object 2 is equal in magnitude and opposite in direction to the force of object 2 on object 1.</span></div><p>The minus sign represents the opposite direction; the magnitudes on both sides are equal. This holds regardless of the masses of the two objects involved: a person pushing on a wall and a person pushing on another person experience the same kind of equal-and-opposite pair, even though the wall does not move and the other person might.</p>"
  ],null,{subject:"physics",topic:"mechanics",concept:"newtons-third-law-equation",ground:"g1",buildsOn:["Mechanics 3.6"]}),

  /* ---------- Mechanics 3.19-3.25: Mechanics foundations, Tier 2 (numericals) ---------- */
  C("I","Mechanics 3.19","Numerical: force, mass, and units",[
    "<p>Newton's second law states F = ma. Consider a 4 kg mass given an acceleration of 3 m/s&sup2;. The force required is:</p><div class='formula'>F = m &times; a = 4 kg &times; 3 m/s&sup2; = 12 kg&middot;m/s&sup2; = 12 N<span class='gloss'>Multiplying mass by acceleration gives a result in kg&middot;m/s&sup2;, which is defined as the newton.</span></div><p>This confirms the unit relationship from Mechanics 3.12: one newton is exactly one kilogram-metre-per-second-squared, not a separately defined unit.</p>"
  ],null,{subject:"physics",topic:"foundations",concept:"law-as-equation; units; worked-example",ground:"g2",buildsOn:["Mechanics 3.12"]}),

  C("I","Mechanics 3.20","Numerical: weight on Earth and the Moon",[
    "<p>A 12 kg object sits on a table. Its weight is:</p><div class='formula'>W = mg = 12 kg &times; 9.8 m/s&sup2; = 117.6 N<span class='gloss'>Weight equals mass times gravitational acceleration.</span></div><p>On the Moon, where g &asymp; 1.6 m/s&sup2;, the same object's weight would be 12 &times; 1.6 = 19.2 N. Its mass, 12 kg, is unchanged in both cases; only the gravitational acceleration differs.</p>"
  ],null,{subject:"physics",topic:"matter",concept:"mass-unit; weight-equation; worked-example",ground:"g2",buildsOn:["Mechanics 3.13"]}),

  C("I","Mechanics 3.21","Numerical: the normal force on a resting box",[
    "<p>A 5 kg box rests on a table. Gravity pulls down on it with a force of W = mg = 5 &times; 9.8 = 49 N. For the box to remain at rest, per Mechanics 3.14, the net force on it must be zero.</p><div class='formula'>&Sigma;F = 0 &rArr; N = 49 N<span class='gloss'>The table must push up on the box with a normal force exactly equal to its weight.</span></div><p>If the table instead pushed up with only 40 N, the forces would not balance, and the box would accelerate downward. The 49 N normal force is not a coincidence: it is the exact value required by &Sigma;F = 0.</p>"
  ],null,{subject:"physics",topic:"mechanics",concept:"net-force; equilibrium-condition; worked-example",ground:"g2",buildsOn:["Mechanics 3.14"]}),

  C("I","Mechanics 3.22","Numerical: maximum friction on a crate",[
    "<p>A 10 kg crate rests on a concrete floor, where the coefficient of friction between crate and floor is &mu; = 0.5. The normal force is N = mg = 10 &times; 9.8 = 98 N.</p><div class='formula'>F = &mu;N = 0.5 &times; 98 = 49 N<span class='gloss'>The maximum friction force resisting the crate's sliding.</span></div><p>A horizontal push smaller than 49 N will not be enough to start the crate sliding; a push exceeding 49 N will overcome friction and set it in motion.</p>"
  ],null,{subject:"physics",topic:"mechanics",concept:"coefficient-of-friction; normal-force; worked-example",ground:"g2",buildsOn:["Mechanics 3.15"]}),

  C("I","Mechanics 3.23","Numerical: force and acceleration of a car",[
    "<p>A car of mass 1200 kg needs to accelerate at 2 m/s&sup2;. Using F = ma, the force its engine must produce is:</p><div class='formula'>F = m &times; a = 1200 kg &times; 2 m/s&sup2; = 2400 N<span class='gloss'>Force required for the given mass and acceleration.</span></div><p>If the same car's engine instead produces a constant 1800 N, the resulting acceleration is a = F/m = 1800 / 1200 = 1.5 m/s&sup2;, lower than before, because the same mass now receives less force.</p>"
  ],null,{subject:"physics",topic:"mechanics",concept:"newtons-second-law-rearranged; SI-units; worked-example",ground:"g2",buildsOn:["Mechanics 3.16"]}),

  C("I","Mechanics 3.24","Numerical: a cyclist's velocity and acceleration",[
    "<p>A cyclist travels from a position 20 m to a position 170 m along a straight road, taking 30 seconds to do so. Their average velocity is:</p><div class='formula'>v = &Delta;x / &Delta;t = (170 &minus; 20) / 30 = 150 / 30 = 5 m/s<span class='gloss'>Average velocity over the 30-second interval.</span></div><p>If the cyclist's velocity increases from 5 m/s to 9 m/s over the next 4 seconds, their acceleration over that interval is a = &Delta;v / &Delta;t = (9 &minus; 5) / 4 = 1 m/s&sup2;.</p>"
  ],null,{subject:"physics",topic:"mechanics",concept:"velocity-formula; acceleration-formula; worked-example",ground:"g2",buildsOn:["Mechanics 3.17"]}),

  C("I","Mechanics 3.25","Numerical: two skaters pushing off",[
    "<p>A 70 kg skater pushes off a 50 kg skater on frictionless ice. The push exerts 140 N on the lighter skater. By Newton's third law, the lighter skater exerts exactly 140 N back on the heavier one, in the opposite direction.</p><div class='formula'>a&#8321; = F / m&#8321; = 140 / 70 = 2 m/s&sup2;<br>a&#8322; = F / m&#8322; = 140 / 50 = 2.8 m/s&sup2;<span class='gloss'>Equal and opposite forces, applied to different masses, produce different accelerations.</span></div><p>The forces are identical in magnitude, exactly as Newton's third law requires, but the resulting accelerations differ because the two skaters have different masses. Equal force does not mean equal acceleration.</p>"
  ],null,{subject:"physics",topic:"mechanics",concept:"newtons-third-law-equation; worked-example",ground:"g2",buildsOn:["Mechanics 3.18"]}),
];
