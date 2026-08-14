new_deck = r"""const DECK=[
  /* ---------- ACT I ---------- */
  C("I","Card 01","The whole game",[
    "<p>Physics is the science of stillness, movement, force and energy, and how they play out over time.</p><p>Why do bridges stand? How long does coffee stay hot? Why do things fall <em>down</em>, and why do planets and asteroids collide?</p><p>Can time run backwards? Is teleportation possible? Could anything survive falling into a black hole? Those are physics too. We'll keep them aside for a while.</p>"
  ],"images/card-01.png",{subject:"physics",topic:"foundations",concept:"what-physics-is",ground:"g0",buildsOn:[]}),

  C("I","Card 02","Stuff takes up space",[
    "<p>Matter is anything that takes up space and weighs something. It doesn't matter how much of either.</p><p>From microorganisms to stars, it's all matter. Anything that exists in physical form.</p>",
    null,
    "<p><strong>What's the matter with mass?</strong></p><p>Mass is a measure of resistance. It takes an external action, a force, to change where it sits.</p><p>Weight is one way to measure mass. It isn't the mass itself.</p><p>A brick has the same mass underwater, in space, or on the surface of the sun, assuming it doesn't melt.</p>"
  ],"images/card-02.png",{subject:"physics",topic:"matter",concept:"mass; weight-vs-mass",ground:"g0",buildsOn:[]}),

  C("I","Card 03","Rocks do not move (on their own)",[
    "<p>Leave a thing alone and its motion never changes. Something still stays still. Something moving keeps moving in a straight line, and keeps going.</p>",
    "<p>Slide a hockey puck across rough ground and it stops fast, so stopping feels like the natural thing. It isn't. The ground is quietly pushing back, with friction.</p><p>On smooth ice the puck glides much further. On a frictionless surface in space, it would never stop. The moving was never the strange part. The stopping is.</p>"
  ],"images/card-03.png",{subject:"physics",topic:"mechanics",concept:"inertia; newtons-first-law",ground:"g0",buildsOn:[]}),

  C("I","Card 04","The thing your eyes can't see",[
    "<p>How rough or smooth two surfaces are decides how easily one slides over the other. The rougher they are, the more they resist. The smoother they are, the easier the glide.</p>",
    "<p>Why does a hockey puck stop dead on a concrete street but keep gliding on ice?</p><p>Same puck, same push. The only thing that changed is the surface under it. Something is happening down there, too small for the eye to catch. To see why, we have to look closer.</p>"
  ],"images/card-04.png",{subject:"physics",topic:"mechanics",concept:"friction",ground:"g0",buildsOn:[]}),

  C("I","Card 05","The second big rule",[
    "<p>Force, mass, and how fast something speeds up (its acceleration) are locked together in one exact relationship.</p><p>More force, more speed-up. More mass, less speed-up.</p>",
    "<p>Give a child on a skateboard one firm push and they roll off at a modest pace. Push harder, they roll faster.</p><p>Now tie a bag of bricks to the skateboard, at least ten times as heavy as the child, and push. It barely moves.</p><p>Force and mass aren't acting in a straight line. They're acting proportionally.</p>",
    null,
    null,
    "<p>Put the two together. Push harder on the same object and it speeds up more, so force tracks acceleration. Add more mass but push just as hard, and it speeds up less, so for a fixed force, mass and acceleration trade off against each other inversely.</p><p>Written down as one equation:</p><div class='formula'>F = m &middot; a<span class='gloss'>Force equals mass times acceleration.</span></div><p>Newton was the first to prove this formally, as a theorem. We've been designing machines and mechanical parts on it ever since, and it hasn't been disproved. There's a nuance to it, but we're not going there yet. We're still in observable physics.</p>"
  ],"images/card-05.png",{subject:"physics",topic:"mechanics",concept:"newtons-second-law; force",ground:"g0",buildsOn:[]}),

  C("I","Card 06","A bus between stops",[
    "<p>A bus waits at the stop. It isn't moving at all. Then the driver pulls away, rolls down the road, and brakes at a red light half a mile on.</p><p>Three different things are changing during that short trip. Dig down to see each one.</p>",
    "<p>Speed is simply how fast the bus is going. Nothing more. Standing at the stop, its speed is zero. Pulling away, the speed climbs. At the light, it falls back to zero.</p><p>Speed is a single number: twenty miles an hour, thirty, zero. It says how fast, and nothing about which way.</p>",
    "<p>Velocity is speed with a direction attached. \"Twenty miles an hour\" is a speed. \"Twenty miles an hour down the high street\" is a velocity.</p><p>It matters more than it sounds. A bus going twenty north and one going twenty south have the same speed but opposite velocities. The moment direction is part of the answer, you're talking about velocity.</p>",
    "<p>Acceleration is how quickly the velocity is changing. As the bus pulls away, its speed is climbing, so it's accelerating. As it brakes for the light, its speed is dropping, so it's accelerating the other way.</p><p>Sitting still at the stop, nothing changes, so acceleration is zero. Cruising at a steady speed in a straight line, also zero. Acceleration only exists when the motion itself is changing.</p>"
  ],"images/card-06.png",{subject:"physics",topic:"mechanics",concept:"speed; velocity; acceleration",ground:"g0",buildsOn:[]}),

  C("I","Card 07","It always pushes back",[
    "<p>Push on a wall and the wall pushes back on you, exactly as hard. This holds for everything. There is no such thing as a one-sided force. This one is called Newton's third law.</p><p>Step off a small boat onto the dock and the boat shoots backward beneath you, sometimes dropping you in the water. You pushed the boat back; the boat pushed you forward. A rocket works the same way: it throws gas downward, and the gas throws the rocket up. Nothing is pushing against the ground. The two are pushing on each other.</p>"
  ],"images/card-07.png",{subject:"physics",topic:"mechanics",concept:"newtons-third-law",ground:"g0",buildsOn:[]}),

  C("I","Card 08","How hard the stop is",[
    "<p>When something moving comes to a stop, what hurts isn't the speed it had. It's how sharply that speed was taken away.</p><p>Drop the same speed to zero over two seconds and the stop is gentle. Drop it over a tenth of a second and it's brutal. The force depends on the rate the speed falls, and squeezing the same drop into less time makes that rate, and the force, far bigger.</p>",
    "<p>Jump off a chair onto a concrete floor and it jars your knees. Jump from the same height onto a thick crash mat and you feel almost nothing.</p><p>You hit at the same speed both times. The mat doesn't change your speed, it changes how quickly that speed is taken off you, spreading the drop over a longer moment. Slower drop, gentler force. Airbags, foam packaging, boxing gloves, a fielder drawing their hands back as they catch: each one stretches the stop, which softens the rate, which shrinks the force.</p>"
  ],"images/card-08.png",{subject:"physics",topic:"mechanics",concept:"deceleration; impact-force",ground:"g0",buildsOn:[]}),

  C("I","Card 09","Why crumple zones exist",[
    "<p>A car's nose is built to crumple on purpose. It seems backwards to design something to fall apart, but the crumpling is the point.</p><p>By folding, the nose stretches the stop from a sudden instant into a fraction of a second longer. That extra sliver of time is what drops the force from deadly to survivable. The passenger, held by the belt, is brought to rest over that stretched moment instead of all at once.</p>"
  ],"images/card-09.png",{subject:"physics",topic:"mechanics",concept:"impulse; crumple-zones",ground:"g0",buildsOn:[]}),

  /* ---------- ACT II ---------- */
  C("II","Card 10","Energy",[
    "<p>Energy is the reason for existence. For anything to exist, it has to do something, and what matter does is consume energy and release it.</p><p>That is the closest thing matter has to a purpose: to take energy in, and give it back out.</p>",
    "<p>The formal definition: energy is the capacity to do work. \"Work\" here means a force moving something over a distance. If something can push, lift, heat, or move anything else, it has energy. Energy is measured in joules.</p>",
    "<p>Energy comes in a handful of forms, and they turn into one another.</p><p>Kinetic energy is the energy of motion. Potential energy is stored energy, waiting, like a weight held up high. Heat is the energy of jiggling particles. Chemical energy sits in the bonds between atoms, in food and fuel. Light carries energy too.</p><p>Different names, but it's all the same thing in different clothing.</p>"
  ],"images/card-10.png",{subject:"physics",topic:"energy",concept:"what-energy-is; work; joules",ground:"g0",buildsOn:[]}),

  C("II","Card 11","Energy is never lost",[
    "<p>A boulder at the top of a hill holds stored energy, waiting. Let it roll and that stored energy turns into the energy of motion. None of it appears from nowhere, and none of it vanishes.</p><p>You cannot make energy from nothing, and you cannot destroy what's there. You can only turn it from one form into another. The total always stays the same.</p>"
  ],"images/card-11.png",{subject:"physics",topic:"energy",concept:"conservation-of-energy",ground:"g0",buildsOn:[]}),

  /* ---------- ACT III . LIMITS ---------- */
  C("III","Card 12","Limits",[
    "<p>Some things can't be pinned to an exact number. Instead, they head toward one.</p><p>A value that creeps closer and closer to something, but never exactly lands on it, is called a limit. It's one of the most useful ideas in all of maths, and the next few boards lean on it.</p>",
    "<p>How many points sit on the edge of a circle?</p><p>On a perfect circle, infinite. But a perfect circle doesn't exist in the real world. Every real circle is made of something, so its edge has some finite, enormous number of points.</p><p>So we say the number of points heads toward infinity. It heads there but never exactly gets there. That is a limit.</p>",
    "<p>Now flip it around. Look at the gap between two neighbouring points on that edge.</p><p>The more points there are, the smaller each gap becomes. As the number of points heads toward infinity, the size of each gap heads toward zero.</p><p>But it never becomes zero, because there is always something between two points. A value heading toward zero without ever being zero. A limit again, pointing the other way.</p>",
    "<p>Here is where it bites. What is one divided by zero?</p><p>Not infinity. Undefined. Maths simply breaks. A real answer to a real problem can never be one over zero, and if you ever land there, something has gone wrong.</p><p>People sometimes write it as infinity, but infinity is not a number, and it is not an answer. This is part of why limits matter: they let us get right up next to zero without ever dividing by it.</p>"
  ],null,{subject:"maths",topic:"calculus",concept:"limits",ground:"g0",buildsOn:[]}),

  C("III","Card 13","Measuring a circle",[
    "<p>We want the area inside a circle. But a curve gives our straight-line tools nothing to grip.</p><p>Straight-edged shapes are easy. We have a formula for the area of a square, a triangle, any polygon. So draw a polygon inside the circle. A square is a rough fit, with gaps. A hexagon fits a little better. Each one, we can measure.</p>",
    "<p>Now let the limit do the work.</p><p>Say the polygon has n sides, and let n head toward infinity. Each extra side hugs the circle a little tighter, and the leftover gap shrinks. As n heads toward infinity, the polygon's area heads toward the circle's true area.</p><p>It never quite touches it, the same way the points never quite reached infinity. But it gets close enough to give us the answer. We've measured a curved shape using nothing but straight lines and a limit.</p>",
    "<p>Think about how many doors that one move opens.</p><p>If a polygon with infinite sides can give us the area of a circle, then the same trick gives us the area of any curved shape, and the volume of any curved solid. Shapes with no clean edges at all suddenly become measurable.</p><p>Anything that curves, bends, or changes smoothly can now be pinned down.</p>",
    "<p>This is barely 350 years old. Two people, Isaac Newton and Gottfried Leibniz, worked it out separately at almost the same time.</p><p>The engines that ran the industrial age, the machines that left the planet, the computers we think with: all of it leans on this one idea. The trick of getting as close to a perfect imagined answer as we possibly can, without ever needing to reach it.</p>"
  ],null,{subject:"maths",topic:"calculus",concept:"limits; integration-seed; area",ground:"g0",buildsOn:[]}),

  C("III","Card 14","Functions",[
    "<p>Imagine a machine that does only one thing. You press a button, it drops out a bag of chips. That's it.</p><p>One button, one result, every time.</p>",
    "<p>You've seen these in malls, railway stations, airports. It's called a vending machine. Press B4, get B4's crisps, every time. Press a microwave's popcorn button, get the popcorn setting, every time.</p><p>Each button is a function: one reliable input, one reliable output. Everything a microwave or a phone can do, all its buttons together, is what we casually call its functionality. The everyday word and the maths word are the same word.</p>",
    "<p>Now we write it down. Mathematicians call the machine f, the input x, and the output f(x).</p><p>So a \"double it\" machine is f(x) = 2x. Feed it 3, it gives 6. Feed it 10, it gives 20. The notation just names the machine and what you feed it.</p><p>Almost everything in physics and maths from here is built on this.</p>",
    "<p>So how is this different from a plain equation?</p><p>An equation is a question with an answer. \"x + 4 = 10\" is solved by one value: 6. It sits still. A function doesn't have a single answer. It's a machine that keeps running.</p><p>Feed f(x) = 2x a 3 and it gives 6; feed it 10 and it gives 20. An equation pins down a value. A function describes how one thing turns into another, for every input you could give it.</p>"
  ],null,{subject:"maths",topic:"functions",concept:"function; f-of-x",ground:"g0",buildsOn:[]}),

  C("III","Card 15","Applying a limit",[
    "<p>A tree grows so slowly you can't see it move. A ship crosses the water at a steady crawl. A supersonic jet tears across the sky.</p><p>Different speeds, but the same question underneath: how fast is this changing? To answer questions like these exactly, we lean on one tool, the limit. Here is how to use it.</p>",
    "<p>Take the area inside a circle. You can't measure the curve directly, so replace it with something you can: a polygon inside it. That's step one, swap the impossible for something workable.</p><p>Step two, make it better: add sides, and the polygon hugs the circle tighter. Step three, take where it's heading: let the sides head toward infinity, and the area settles on the value it's approaching. That value is the answer.</p>",
    "<p>Those three steps are the whole method of applying a limit. Replace the thing you can't handle with something you can. Sharpen it, again and again. Take the value it heads toward.</p><p>It found the circle's area. The same three steps find the speed of that jet at a single instant, the volume of a curved solid, and far more.</p>",
    "<p>So a limit doesn't measure the impossible thing directly.</p><p>It measures something close, makes that closer and closer, and takes where it's heading as the answer. One move, used everywhere from a growing tree to a circle to a jet.</p>"
  ],null,{subject:"maths",topic:"calculus",concept:"limits; rate-of-change",ground:"g0",buildsOn:[]}),

  /* ---------- ACT IV . GRAVITY ---------- */
  C("IV","Card 16","Everything pulls on everything",[
    "<p>Remember the third law: push on a wall and it pushes back, equally. Pulls work the same way.</p><p>Imagine everything carries a quiet pull, as if it were a magnet, though it isn't really one. You pull on your chair, and the chair pulls back on you, exactly as hard. Equal and opposite, just like the wall.</p>",
    "<p>Now scale it up. The Earth pulls on the Moon, and the Moon pulls back on the Earth, just as hard.</p><p>They've been holding onto each other across a quarter of a million miles of empty space for billions of years.</p>",
    "<p>And it isn't only the big things. Every two objects in the universe pull on each other. You and the person beside you. Your phone and the wall. Always, everywhere.</p><p>This pull is called gravity. It is its own force, not actually magnetism, and unlike a magnet it only ever attracts. It never pushes away.</p>"
  ],null,{subject:"physics",topic:"gravity",concept:"universal-gravitation",ground:"g0",buildsOn:[]}),

  /* ---------- ACT V . TRIGONOMETRY ---------- */
  C("V","Card 17","What trigonometry is",[
    "<p>You're the captain of a ship, and the power is gone. No navigation, no instruments, nothing electrical.</p><p>Far off, you can just make out an island. You need to know things about it, and all you have is what you can see and a bit of maths.</p>",
    "<p>Here's the move: turn the situation into a right triangle. Once a problem fits a right triangle, the angles and sides are tied together, and the maths can hand you the rest.</p><p>But you only have a straight line of sight. So how do you get an angle to work with? You're a smart captain. The ship's flagpole casts a shadow, and a shadow holds more information than it looks.</p>",
    "<p>This is trigonometry: the study of how a triangle's angles and its sides are tied together. Know a few, and you can work out the rest.</p><p>Exactly how the flagpole and its shadow crack the captain's problem, we'll come to. First, the piece that makes it all work.</p>"
  ],null,{subject:"maths",topic:"trigonometry",concept:"trig-intro; right-triangle",ground:"g0",buildsOn:[]}),

  C("V","Card 18","The parts of a right triangle",[
    "<p>Take a right-angled triangle. It has three pieces worth naming. There's the right angle itself, the square corner. The side that stands up opposite it is the perpendicular. The side it sits on is the base. And the longest side, stretching across from the right angle, is the hypotenuse.</p><p>Different textbooks swap some of these names, but the picture is always the same.</p>",
    "<p>A right triangle has two other angles besides the square corner. Textbooks the world over label the one we care about with the Greek letter &theta;, theta.</p><p>But there are two angles to choose from. Which one is &theta;? Whichever you want. You pick the angle your problem is about, and call it &theta;.</p>",
    "<p>Here's the part to hold onto: once you pick &theta;, the perpendicular and base are decided relative to it. The side opposite your &theta; is the perpendicular; the one beside it is the base. Choose the other angle, and they swap.</p><p>The captain's flagpole and its shadow make exactly this triangle. Next, we turn these named sides into the ratios that solve the problem.</p>"
  ],null,{subject:"maths",topic:"trigonometry",concept:"right-triangle; theta; sides",ground:"g0",buildsOn:[]}),

  C("V","Card 19","Sine, cosine, tangent",[
    "<p>You've got three sides now: perpendicular, base, hypotenuse. Pick any two and you get a ratio. There are three useful pairings, and each one gets a name.</p><p>Sine, cosine, tangent. That's all they are, names for three ratios of a right triangle's sides. No magic.</p>",
    "<p>Measured against your angle &theta;: sine is the perpendicular over the hypotenuse. Cosine is the base over the hypotenuse. Tangent is the perpendicular over the base.</p><p>You may also remember it as SOH-CAH-TOA: Sine-Opposite-Hypotenuse, Cosine-Adjacent-Hypotenuse, Tangent-Opposite-Adjacent. \"Opposite\" is just the perpendicular, \"adjacent\" the base.</p>",
    "<p>Each one is a function (remember the machine from before): feed in the angle &theta;, and it hands back a ratio. Feed in 30 degrees, sine hands back exactly one half, every time.</p><p>That's what cracks the captain's problem. The sun's angle gives a ratio, and a ratio plus one length you can measure unlocks the length you can't.</p>"
  ],null,{subject:"maths",topic:"trigonometry",concept:"sine; cosine; tangent; soh-cah-toa",ground:"g0",buildsOn:[]}),

  C("V","Card 20","Cracking the captain's problem",[
    "<p>Time to rescue the captain. The flagpole and its shadow taught the captain that a shadow hides an angle. Now for the island. Out there is a cliff, and the captain wants its height to check it against the charts.</p>",
    "<p>The captain sights along to the top of the cliff and reads the angle up to it. That angle is &theta;. The distance from the ship to the foot of the cliff can be paced or estimated, and that's the base of a tall right triangle, with the cliff itself as the perpendicular.</p><p>Tangent does the rest: tangent of &theta; is perpendicular over base. The angle gives the tangent, the base is known, so the cliff's height drops straight out.</p>",
    "<p>The captain measured a cliff that was never within reach. One angle, one distance, a fixed ratio. This is the whole of trigonometry: turn the world into a right triangle, take one angle, let the ratios hand back the rest.</p><p>But a sharper question remains. There are two islands out there, and the captain needs to know which is closer. Height won't answer that. For distance to something you can't reach, there's another move, coming next.</p>"
  ],null,{subject:"maths",topic:"trigonometry",concept:"tangent; solving-triangles; captain-payoff",ground:"g0",buildsOn:[]}),

  /* ---------- ACT V continued: vectors & angles ---------- */
  C("V","Card 21","How much isn't enough",[
    "<p>You're at your house and you want to get to the playground. Someone tells you it's exactly half a mile away.</p><p>Is that enough to get you there? No. Walk half a mile and you could end up at the supermarket, the motorway, or in the middle of a lake. A number on its own doesn't get you anywhere.</p><p>You don't just need an amount. You need a direction.</p>",
    "<p>So let's fix the directions. The real way to the playground: walk half a mile straight down your street, then take a left and walk another quarter of a mile.</p><p>Now you have a path. You didn't just cover ground, you covered specific ground in a specific direction. In physics there's a real difference between just moving and actually going somewhere.</p>",
    "<p>Physics splits these into two kinds of quantity.</p><p>A <strong>scalar</strong> has only an amount. Temperature is a scalar. Time is a scalar. \"Half a mile\" is a scalar, just a raw distance.</p><p>A <strong>vector</strong> has an amount and a direction. \"Half a mile north\" is a vector. Picture it as an arrow: its length is how much, its point is which way.</p>",
    "<p>Look at your walk again. You went straight, then you went left. Two arrows, joined end to end.</p><p>But a bird wouldn't follow your streets. It would lift off the roof and fly in one straight diagonal line to the playground.</p><p>That diagonal is the <strong>resultant</strong>: the single arrow that does the job of your two. To add vectors you don't add the numbers, you lay the arrows head to tail and draw the shortcut.</p>",
    "<p>So how long is the bird's flight?</p><p>You can't just add 0.5 and 0.25. Your left turn was a right angle, so your two streets are the two short sides of a right-angled triangle, and the bird's flight is the long side.</p><p>To get its length, vectors borrow geometry. We use Pythagoras.</p><div class='formula'>R&#178; = x&#178; + y&#178;<span class='gloss'>The resultant squared equals the two sides squared and added.</span></div><p>You walked 0.75 miles on the pavement. The bird flew a shorter line to the very same spot.</p>"
  ],null,{subject:"physics",topic:"vectors",concept:"scalars-vectors; resultant; pythagoras",ground:"g0",buildsOn:["Card 06"]}),

  C("V","Card 22","When two things push at once",[
    "<p>Your pedometer counted 0.75 miles on that walk. It only counts steps, so it gives you a scalar. The bird's straight flight to the same place was shorter, maybe 0.55 miles. That's the vector.</p><p>Distance is the scalar. Displacement is the vector. The bird cares about the angle; the pedometer doesn't.</p>",
    "<p>Why does this matter? Because the real world is full of things pushing at the same time.</p><p>Row a boat straight across a fast river. You point it dead ahead, but the current shoves you sideways the whole way across.</p>",
    "<p>You're now making two vectors at once. Your oars push the boat across. The river pushes it downstream.</p><p>You don't land straight opposite where you started. You land well down the bank. You travelled along the diagonal of the two.</p>",
    "<p>That diagonal is the resultant again, this time as a real compromise between two forces.</p><p>Planes live with this constantly. A pilot points east, a crosswind blows south, and the plane actually tracks south-east. The autopilot is adding vectors the whole flight just to hold a straight line.</p>",
    "<p>And the resultant depends entirely on the angle between the two.</p><p>Row with the current and the speeds add up. Row against it and they fight, one subtracting from the other. Point across it and you get the diagonal.</p><p>Vectors aren't just arrows on a page. They're how reality settles a tug-of-war.</p>"
  ],null,{subject:"physics",topic:"vectors",concept:"relative-velocity; real-life; resultant-by-angle",ground:"g0",buildsOn:["Card 21"]}),

  C("V","Card 23","Splitting a diagonal",[
    "<p>We can turn two straight arrows into one diagonal. Now go the other way.</p><p>A cannonball is fired off at an angle into the sky, and you want to know how high it climbs. Diagonal lines are awkward to do maths with. We need to break the diagonal apart.</p>",
    "<p>Any diagonal arrow can be split into two straight pieces: a sideways piece and an up-and-down piece. These are its <strong>components</strong>.</p><p>A plane flying north-west is really doing two things at once: going north at some speed, and going west at some speed. Separate the two and the maths gets easy.</p>",
    "<p>Drop a straight line down from the tip of the diagonal and you've drawn a right-angled triangle. The diagonal is the hypotenuse, and you know the angle it sits at.</p><p>You've already met the tools for this. A triangle's sides and angles are tied together by sine, cosine and tangent.</p>",
    "<p>For a diagonal of size V at angle &theta;, the two pieces come straight out of those ratios.</p><div class='formula'>across = V &middot; cos(&theta;)<br>up = V &middot; sin(&theta;)<span class='gloss'>The sideways and vertical parts of the diagonal.</span></div><p>Cosine gives the sideways part, sine gives the vertical part.</p>",
    "<p>This move is called <strong>resolving</strong> a vector, and it's everywhere.</p><p>A bridge holding a truck, a cannonball arcing through the air, a planet pulled by the sun: almost every hard problem in physics starts by splitting a messy diagonal into a tidy sideways piece and a tidy vertical piece, using exactly this.</p>"
  ],null,{subject:"physics",topic:"vectors",concept:"resolving-vectors; components; uses-trig",ground:"g0",buildsOn:["Card 19","Card 21"]}),

  C("V","Card 24","The made-up 360",[
    "<p>Since school you've been told a full circle is 360 degrees, a right angle is 90, a straight line is 180.</p><p>But why 360? Why not 100, or 10?</p><p>Because people chose it. The Babylonians built their maths around 60, and 360 roughly matched the days in their year. A degree is just a label we agreed on.</p>",
    "<p>Nature never agreed to it. For real physics and the maths that comes later, a made-up unit won't do.</p><p>We want a way to measure an angle that comes from the circle itself, not from an old calendar. Let the circle measure its own angles.</p>",
    "<p>Take a bicycle wheel. The straight spoke from the centre to the rim is the <strong>radius</strong>.</p><p>Pull that spoke out, bend it, and lay it along the rim. Draw lines from the two ends of the bent spoke back to the centre, making a slice.</p><p>The angle at the point of that slice is <strong>one radian</strong>.</p>",
    "<p>A radian isn't an arbitrary number. It's the angle you get when the curved edge is exactly as long as the radius.</p><p>How many fit around a whole circle? Always a little over six, no matter the circle's size. Exactly <strong>2&pi;</strong> of them, about 6.28, make the full turn.</p>",
    "<p>Why does the serious maths insist on radians? Because a degree is a unit, but a radian is a pure ratio.</p><p>In radians, the distance travelled along the edge is just the radius times the angle.</p><div class='formula'>s = r &middot; &theta;<span class='gloss'>Arc length equals radius times the angle in radians.</span></div><p>That ties turning directly to distance. Without that clean link, the machinery that comes next simply doesn't work.</p>"
  ],null,{subject:"maths",topic:"trigonometry",concept:"radians; degrees; arc-length",ground:"g0",buildsOn:["Card 17"]}),

  /* ---------- Cards 25-29: kinematics & motion in 2D ---------- */
  C("I","Card 25","The three accelerators",[
    "<p>Look at a car's dashboard. The speedometer says 60 mph. That's your <strong>speed</strong>.</p><p>But if you ring a friend and say \"I'm doing 60,\" they've no idea whether you're heading toward them or away. Speed is blind. It only says how fast, never which way.</p>",
    "<p>Attach a direction and you get <strong>velocity</strong>: \"60 mph north.\" Now it's an arrow through space. Its length is the 60, its point is north.</p><p>The universe runs on velocity, not bare speed.</p>",
    "<p>Here's why that matters. Drive around a roundabout with cruise control set to a steady 30.</p><p>Your speed never changes. But you're turning the wheel the whole way, so your direction is always changing, and that means your velocity is changing every instant.</p>",
    "<p>Which brings in <strong>acceleration</strong>. In everyday talk it means speeding up. In physics it means <em>any</em> change in velocity.</p><p>A velocity arrow has two parts, length and direction, so there are two ways to change it. That gives a car three accelerators: the throttle, the brake, and the steering wheel.</p>",
    "<p>Throttle lengthens the arrow. Brake shortens it. Steering turns it. To a physicist, all three are acceleration.</p><div class='formula'>a = &Delta;v / &Delta;t<span class='gloss'>Acceleration is the change in velocity over the change in time.</span></div><p>The v there is velocity, the vector, not speed. Take a sharp bend at a constant 30 and you're still accelerating hard, which is exactly why you're thrown against the door.</p>"
  ],null,{subject:"physics",topic:"mechanics",concept:"velocity; acceleration; vectors",ground:"g0",buildsOn:["Card 06","Card 21"]}),

  C("I","Card 26","The infinite tightrope",[
    "<p>How do we track where something is? Start with the simplest map there is: a perfectly straight, endless tightrope.</p><p>Stand in the middle. Call that spot <strong>zero</strong>. This is the one-dimensional world. You can only go forward or backward.</p>",
    "<p>Step forward and you hit 1, then 2, counting up forever. Step back from zero and you enter the mirror side: -1, -2, -3.</p><p>But the rope isn't empty between the steps.</p>",
    "<p>Half a step lands you on 0.5. A step tied to the geometry of a circle might land you on an awkward number like pi. Whole, negative, fraction, decimal: every number has one exact address on this rope.</p><p>This is the <strong>number line</strong>.</p>",
    "<p>Living on the line, your address is a single number. To find the gap between you and a friend, subtract the addresses. You at 5, friend at 2, you're 3 apart. Simple, but it's a trap.</p>",
    "<p>On the line, if something blocks the path at 3 and you're at 1, you can never reach 5. There's no stepping around it, because there is no \"around.\"</p><p>We call this horizontal line the <strong>x-axis</strong>. To get free, we need a second direction.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"number-line; 1D",ground:"g0",buildsOn:[]}),

  C("I","Card 27","The grid of reality",[
    "<p>To escape the tightrope, take a second number line and stand it upright, crossing the first exactly at zero.</p><p>Now you have a crosshair. The flat line is the <strong>x-axis</strong> (left and right). The upright one is the <strong>y-axis</strong> (up and down).</p>",
    "<p>This is two dimensions: a flat, endless map, the <strong>Cartesian plane</strong>. A single number is no longer enough for an address. You need a pair, written (x, y).</p><p>\"Right 3, up 4\" puts you at (3, 4). Every pixel on your screen and every point on a map works this way.</p>",
    "<p>Why does this matter for physics? It gives your vectors a home. Put your house at the centre, (0,0). The street you walked is an arrow along the x-axis. Your left turn is an arrow up the y-axis.</p>",
    "<p>Now the bird's diagonal flight isn't just a sketch. It's an arrow from (0,0) to the playground's exact (x, y) address.</p><p>This is the great translation: shapes and arrows become pure numbers.</p>",
    "<p>Pinned to the grid, a vector no longer has to be drawn to be worked out.</p><div class='formula'>V = (x<sub>2</sub>, y<sub>2</sub>) &minus; (x<sub>1</sub>, y<sub>1</sub>)<span class='gloss'>A vector is its end coordinates minus its start coordinates.</span></div><p>Because of this, a computer can work out exactly where a spacecraft will land without ever drawing a map. The map is made of the numbers themselves.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"cartesian-plane; 2D; vectors-on-a-grid",ground:"g0",buildsOn:["Card 21","Card 26"]}),

  C("I","Card 28","The two lives of a falling rock",[
    "<p>Take the grid and hold a rock at (0, 10). Let go.</p><p>It falls straight down the y-axis to (0, 0). On this map, gravity is a force that only knows one direction: down.</p>",
    "<p>And gravity doesn't just pull, it accelerates. As the rock falls, its downward velocity arrow grows longer every second.</p><p>Earth's gravity adds about 9.8 metres per second of speed every second. A relentless vertical accelerator.</p>",
    "<p>Now change it. Put the rock on a table and flick it off the edge. It's moving right (x) while falling down (y).</p><p>Here's one of the great questions in physics: does moving sideways make it fall any slower?</p>",
    "<p>No. Drop a rock from one hand and fire a bullet horizontally from the other at the same instant, and <em>both hit the ground at the same moment</em>.</p><p>That surprises people, but the grid explains it.</p>",
    "<p>The x-axis and y-axis are completely independent. They're blind to each other.</p><p>Gravity is a y-axis force. It has no power over the x-axis at all. So the rock keeps cruising sideways at a steady speed, while quite separately it accelerates downward. In physics you solve the x and the y as two separate problems.</p>"
  ],null,{subject:"physics",topic:"kinematics",concept:"gravity; independence-of-axes",ground:"g0",buildsOn:["Card 25","Card 27"]}),

  C("I","Card 29","The perfect arc",[
    "<p>Watch a quarterback throw, or a cannon fire. The ball doesn't fly in a straight diagonal or a zig-zag. It paints a smooth curve in the sky.</p><p>Anything thrown through the air is a <strong>projectile</strong>, and that curve is the compromise between the two axes.</p>",
    "<p>When the cannon fires at an angle, we use the resolving trick from before to split that diagonal speed into a sideways (x) part and an upward (y) part.</p><p>Once it leaves the barrel, it's living two lives at once.</p>",
    "<p>Sideways, nothing pushes it any more (ignoring air), so its x-arrow keeps the same length the whole flight. It cruises forward.</p><p>Vertically, it's fighting gravity. The upward arrow shrinks to zero, that's the top of the arc, then flips and grows as it falls.</p>",
    "<p>Combine steady sideways motion with up-stop-down vertical motion, and the path traced on the grid is a curve called a <strong>parabola</strong>.</p><p>A parabola is the footprint of gravity acting on a moving object.</p>",
    "<p>Because the axes are independent, the maths is clean. We use the kinematic (SUVAT) equations.</p><div class='formula'>y = v<sub>y</sub>t &minus; &frac12;gt&#178;<br>x = v<sub>x</sub>t<span class='gloss'>Vertical fights gravity (g); horizontal is just steady speed. Time (t) is shared.</span></div><p>The x equation has no g, because gravity doesn't act sideways. The only thing linking the two axes is <strong>time</strong>, the master clock that decides when the arc lands.</p>"
  ],null,{subject:"physics",topic:"kinematics",concept:"projectile-motion; parabolas",ground:"g0",buildsOn:["Card 23","Card 28"]}),

  /* ---------- Cards 30-32: coordinate geometry of curves & lines ---------- */
  C("V","Card 30","Dot and the square game",[
    "<p>Meet Dot, a tiny glowing point living on the grid. She starts at the origin, (0,0).</p><p>Dot plays a game. Each time she steps right along the x-axis, she squares her x-number and walks that many steps up.</p>",
    "<p>Track her. One step right (x=1): one squared is 1, so up 1, to (1,1). Another step (x=2): two squared is 4, up to (2,4). Again (x=3): three squared is 9, up to (3,9).</p><p>She isn't walking a straight line, she's climbing faster and faster.</p>",
    "<p>The glowing trail behind her is a sweeping curve, the <strong>parabola</strong>.</p><p>In physics it's the arc of a thrown ball. In pure maths it's just the shape of numbers multiplied by themselves.</p>",
    "<p>What if Dot walks left, into negative x? Step to x = &minus;2 and she squares it. Negative times negative is positive, so (&minus;2)&#178; is +4, and she goes <em>up</em> to (&minus;2, 4).</p><p>That's why the parabola is a perfect U. Squaring erases the minus sign, so the left side mirrors the right exactly.</p>",
    "<p>We don't need to track her step by step. Her whole endless journey is one rule.</p><div class='formula'>y = x&#178;<span class='gloss'>The height is always the square of the across.</span></div><p>This is a <strong>function</strong>: a machine that takes the across, squares it, and gives back the height. The parabola is just a photograph of that rule.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"parabola; quadratics; graphing",ground:"g0",buildsOn:["Card 27","Card 29"]}),

  C("V","Card 31","Dash and the staircase",[
    "<p>Dot has a friend, Dash, who doesn't like speeding-up curves. He likes a steady rhythm.</p><p>Dash starts at (0,1). His rule: for every step right, exactly two steps up. He never changes it.</p>",
    "<p>Right 1, up 2. Right 1, up 2. Up close he's climbing stairs. Zoom out and the stairs blur into a straight slanted ramp. Dash is drawing a <strong>line</strong>.</p>",
    "<p>To describe his line you only need two things. Where did he start? At (0,1), crossing the y-axis at 1, the <strong>y-intercept</strong>. How steep are his stairs? Two up for every one across, the <strong>slope</strong>.</p>",
    "<p>Slope is the measure of straight-line steepness: rise over run, how much up divided by how much across.</p><p>Up 5 for every 1 across is a slope of 5, a near cliff. <em>Down</em> 2 for every 1 across is a slope of &minus;2, heading downhill.</p>",
    "<p>With just the slope and the y-intercept, you can say exactly where Dash will be a million steps on, without drawing a thing.</p><div class='formula'>y = mx + c<span class='gloss'>m is the slope, c is the starting height (y-intercept).</span></div><p>This is the <strong>equation of a straight line</strong>: every straight line is just a slope and a starting point.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"linear-equations; slope; y-intercept",ground:"g0",buildsOn:["Card 27"]}),

  C("V","Card 32","The kissing curves",[
    "<p>Put Dot's U-shaped parabola and Dash's straight line on the same grid at once.</p><p>Do their trails ever cross? Throw a ball toward a slanting roof: the ball hits the roof. On the grid, a hit means the curve and the line share the same (x, y) address.</p>",
    "<p>That's an <strong>intersection</strong>. A straight line through a U-shaped parabola usually cuts it in <em>two</em> places, in one side and out the other.</p>",
    "<p>How do we find those points without the map? Algebra. If they meet, their y-values match there. So take Dot's rule (y = x&#178;) and Dash's rule (y = 2x + 1) and set them equal: x&#178; = 2x + 1.</p><p>Solving that gives the exact meeting points.</p>",
    "<p>Now slide Dash's line down. The two meeting points slide closer together.</p><p>Lower it just enough and the line stops cutting through. It only grazes the very bottom of the curve, touching at a single frozen point before pulling away.</p>",
    "<p>A line that touches a curve at exactly one point without cutting through is a <strong>tangent</strong>.</p><div class='formula'>the tangent line<span class='gloss'>A straight line giving the exact steepness of a curve at one point.</span></div><p>This is the whole goal of calculus: the tangent tells you how steep a curving thing is at one instant, translating the curved world into straight, measurable lines.</p>"
  ],null,{subject:"maths",topic:"coordinate-geometry",concept:"intersections; tangents; algebra-geometry-link",ground:"g0",buildsOn:["Card 30","Card 31"]}),

  /* ---------- Cards 33-34: chemistry (scale & the mole) ---------- */
  C("II","Card 33","The science of exceptions",[
    "<p>Physics loves clean rules: gravity always pulls down, a straight line is always straight. <strong>Chemistry</strong> is the science of exceptions.</p><p>It's messy. Elements misbehave, reactions run backward, molecules change shape at random. Getting a pattern-based science out of that chaos was a real achievement.</p>",
    "<p>But it had to be done, because mastering this messy science is how we survive.</p><p>Without it there's no medicine to cure disease, no rust-proofing for aircraft, no way to filter water or freeze-dry food for orbit. Chemistry is an engine of survival.</p>",
    "<p>To get chemistry, you have to grasp scale, just how small things go.</p><p>It's smaller than you think. A single grain of sand is a mountain next to what we're dealing with. And here's the magic: in that smallness sits an enormous effect on the large world.</p>",
    "<p>It takes billions of atoms to make a speck of dust, yet their tiny shapes decide everything above.</p><p>Move one atom in a large molecule and a life-saving medicine can turn into a poison. The microscopic structure controls the visible world.</p>",
    "<p>Which leaves scientists a problem.</p><p>To build a bridge you count steel beams. To build a medicine you'd need to count atoms. How do you measure and count particles you can't see at all?</p>"
  ],null,{subject:"chemistry",topic:"foundations",concept:"scale; introduction-to-chemistry",ground:"g0",buildsOn:[]}),

  C("II","Card 34","The chemist's dozen",[
    "<p>How do people count things? With grouping words.</p><p>At a bakery you ask for a <strong>dozen</strong> eggs, not twelve. Lincoln said \"four <strong>score</strong>,\" not eighty years. A hundred years is a <strong>century</strong>.</p>",
    "<p>Dozen, score, century: just words standing for numbers, to make counting big things easier.</p><p>Chemists need to count atoms to mix their recipes. But atoms are so small that asking for a dozen of them is useless. You couldn't see a trillion.</p>",
    "<p>So they invented a new grouping word, the biggest in history: the <strong>mole</strong>.</p><p>Just as a dozen always means 12, a mole always means about 602,200,000,000,000,000,000,000 things. Just a number, nothing mystical.</p>",
    "<p>To feel how huge it is against how small atoms are: a mole of marbles would bury the Earth's surface miles deep. But a mole of water molecules fits in a single shot glass.</p><p>That's the microscopic scale. The number is vast, the particles almost ghosts.</p>",
    "<p>That number is the translator between the invisible world and the visible one.</p><div class='formula'>1 mole = 6.022 &times; 10<sup>23</sup> particles<span class='gloss'>The bridge between counting atoms and weighing grams.</span></div><p>Because of it, a chemist can put a cup of powder on an ordinary scale and know exactly how many trillions of atoms are inside, without counting one.</p>"
  ],null,{subject:"chemistry",topic:"stoichiometry",concept:"the-mole; avogadros-number",ground:"g0",buildsOn:["Card 33"]}),

  /* ---------- Cards 35-37: atomic structure ---------- */
  C("II","Card 35","The cosmic menu",[
    "<p>The whole world is made from just 118 ingredients.</p><p>Think of everything you've ever seen: every star, every ocean, every building, the screen you're reading on, the eyes you're reading with. All of it is built from the same short recipe list.</p>",
    "<p>Before you say \"what about dark matter, or the God particle?\" &mdash; yes, there are stranger, deeper mysteries out there. We'll keep those for later.</p><p>For the physical, touchable universe, the stuff you can weigh and handle, those 118 ingredients are everything.</p>",
    "<p>These ingredients are called <strong>elements</strong>, and they're laid out on one famous chart: the <strong>periodic table</strong>.</p><p>Don't read it as a poster to memorise. Read it as the inventory of reality, the complete list of what the universe is made of.</p>",
    "<p>Just as a baker mixes flour, butter and sugar into hundreds of pastries, nature mixes these elements.</p><p>Take three, carbon, hydrogen, oxygen. Combine them one way and you get the sugar in your coffee. Another way, rocket fuel. Another, a tree trunk. The magic isn't endless ingredients, it's how they link up.</p>",
    "<p>So what makes element 8 (oxygen) behave so differently from element 79 (gold)?</p><p>To answer that, things are about to get small. Smaller than you can easily imagine. We have to look inside the ingredients themselves.</p>"
  ],null,{subject:"chemistry",topic:"periodic-table",concept:"elements; periodic-table-intro",ground:"g0",buildsOn:["Card 33"]}),

  C("II","Card 36","The 80th cut",[
    "<p>Take a piece of iron, a 100-gram chunk about the size of a golf ball, held between two fingers.</p><p>Now take a magically sharp knife and start cutting it in half. How many cuts until you reach the smallest possible piece of iron? Millions? Billions? Let's find out.</p>",
    "<p>First cut: two halves, 50 grams each. Again: 25 grams. Cut three: 12.5. Cut four: 6.25. It shrinks fast. By cut 10 it's smaller than a grain of sand.</p><p>But we keep going. We're chasing the very bottom of matter.</p>",
    "<p>By cut 30 it's invisible to the eye. By cut 50, smaller than a virus. By cut 70, we're past the DNA inside a cell.</p><p>We cut until the knife simply won't divide it any further. It can't stay iron and get smaller. And the number of cuts it took is surprisingly small: exactly <strong>80</strong>.</p>",
    "<p>After 80 halvings you're left with a single dot of matter, the very basement of the universe.</p><p>You've reached <strong>the atom</strong>, the building block of all 118 ingredients. Cut this final dot and it stops being iron at all, breaking into something else entirely.</p>",
    "<p>The word atom comes from the Greek <em>atomos</em>. It means <strong>uncuttable</strong>.</p><div class='formula'>the atom<span class='gloss'>The smallest recognisable piece of any element on the periodic table.</span></div><p>Gold, oxygen, carbon, iron: every element is just a collection of these uncuttable dots. But what makes an iron atom different from a gold one? We have to look inside the dot.</p>"
  ],null,{subject:"chemistry",topic:"atomic-structure",concept:"the-atom; scale-of-matter",ground:"g0",buildsOn:["Card 35"]}),

  C("II","Card 37","The three puzzle pieces",[
    "<p>Here's a twist. That \"uncuttable\" atom? Not quite true. It isn't the smallest thing after all.</p><p>In the early 1900s scientists cracked the atom open, and what they found changed everything. The atom isn't a solid dot. It's a container.</p>",
    "<p>Inside are just three smaller pieces: <strong>protons, neutrons and electrons</strong>.</p><p>This is the real plot twist. An iron atom and a gold atom look nothing alike in the world, but zoom in and they're built from the exact same three parts. There's no \"gold proton\" or \"iron electron.\" A proton is a proton, everywhere.</p>",
    "<p>How are they arranged? Protons (positive charge) and neutrons (no charge) are packed tightly in a heavy clump at the dead centre, the <strong>nucleus</strong>.</p><p>The electrons (negative charge) are tiny, and they swarm around the outside at blinding speed, like a cloud.</p>",
    "<p>At this scale, the \"type\" of matter stops existing. There's only counting.</p><p>The only thing making an atom behave like gold, or oxygen, or iron is the <em>number</em> of these pieces inside. The universe isn't a kitchen with 118 ingredients. It's a Lego set with three kinds of brick.</p>",
    "<p>The key brick is the proton. Its count is an element's ID card. Exactly 26 protons in the centre means iron. 79 means gold.</p><div class='formula'>atomic number (Z) = number of protons<span class='gloss'>Change the proton count and you change the element itself.</span></div><p>That's what the periodic table is really sorting: it starts at hydrogen (1 proton) and counts up, one at a time.</p>"
  ],null,{subject:"chemistry",topic:"atomic-structure",concept:"protons-neutrons-electrons; atomic-number",ground:"g0",buildsOn:["Card 36"]}),
];

"""

with open('C:/Users/ali10/strata/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

deck_start = content.index('const DECK=[')
engine_start = content.index('/* ============================================================\n   ENGINE')

# The DECK ends with ];\n\n before ENGINE comment
deck_section_end = content.rindex(';\n\n', deck_start, engine_start) + 3

new_content = content[:deck_start] + new_deck + content[deck_section_end:]

with open('C:/Users/ali10/strata/index.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Done.")

import re
cards = re.findall(r'C\("(?:I{1,3}|IV|V)","Card \d+",', new_content)
print(f"Card count: {len(cards)}")
