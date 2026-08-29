// Founder pass of 2026-08-12. Sections 1 and 2 settled except for S2's
// interaction and checks; section 3 untouched.
export const selections = {
  'S1-A': '2026-08-12',
  // The animated journey over the static four-position stepper. The displacement
  // arrow reconnecting to the moving marker is the thing worth watching, and it
  // is what makes "distance remembers the route" visible rather than asserted.
  'S1-I2': '2026-08-12',
  // Both checks kept: X1 is the full lap where displacement is zero, X2 the half
  // lap where the chord is at its longest. They are the two ends of the same idea.
  'S1-X1': '2026-08-12',
  'S1-X2': '2026-08-12',
  'S2-A': '2026-08-12',
  // Founder: the two S2 interactions do the same thing, so only one is kept.
  'S2-I2': '2026-08-12',
  'S2-X1': '2026-08-12',
  'S2-X2': '2026-08-12',
  'S3-A': '2026-08-12',
  'S3-I2': '2026-08-12',
  // Founder asked whether both S3 checks are needed. Both taken; see the note on
  // S3-X1, which is the weaker of the two and the one to drop if the section
  // reads long.
  'S3-X1': '2026-08-12',
  'S3-X2': '2026-08-12'
};
export const finalised = {};

export const rejected = {
  'S1-B': 'Not selected; S1-A states the distinction before giving the lap example, so the example lands on a rule rather than standing in for one.',
  'S1-I1': 'Not selected; S1-I2 animates the same circle and keeps the displacement arrow reconnecting as the marker moves.',
  'S2-B': 'Not selected; S2-A introduces direction with a magnitude already attached, which is the pairing section 3 formalises.',
  'S2-I1': 'Founder, 2026-08-12: it and S2-I2 do the same thing. Both rotate a fixed-magnitude arrow around an origin; one names the compass point and the other adds the angle. S2-I2 carries both labels, so nothing is lost.',
  'S3-B': 'Not selected; S3-A says what the arrow\'s two parts represent, which is what S3-X2 goes on to test.',
  'S3-I1': 'Not selected; S3-I2 builds two vectors and tests equality, which is the section\'s actual claim rather than a display of one vector.'
};
export const gated = 'Proposed vector prerequisite after Speed and Velocity. Every candidate is AI_DRAFT and awaits founder selection, prerequisite mapping, placement and approval. It must remain outside the learner build.';

export const vectors = {
  id: 'PHY-VECTOR-001', title: 'Vectors and Displacement',
  objective: 'The learner distinguishes path distance from directed displacement, then represents a vector by an arrow whose length and direction both carry meaning.',
  prerequisites: 'Provisional: recognise circles, compass directions, length, angles in degrees and the distance/velocity language of the preceding motion board.',
  misconception: 'Displacement is not the distance travelled. A vector is not merely an arrow decoration: its length represents magnitude and its arrowhead represents direction.',
  fork: 'Start with a circular path where distance and displacement visibly disagree, name direction, then formalise magnitude plus direction as a vector.',
  structure: 'Three sections: circular distance and displacement, directions, and vector arrows.',
  sourceMatrix: [{ work: 'Urone and Hinrichs, OpenStax Physics (2020), §§2.1 and 5.1', role: 'Distinguishes path distance from displacement and introduces vectors as quantities with magnitude and direction.', treatment: 'Paraphrased with attribution under CC BY. All examples, diagrams, controls and checks are Qubix-original.', url: 'https://openstax.org/books/physics/pages/2-1-relative-motion-distance-and-displacement' }],
  changeRecord: { date: '2026-08-11', authority: 'Founder instruction to begin vectors with circular distance/displacement, then directions and vector concept', effect: 'Creates one unselected gated Factory board. No approval, placement or release.' },
  sections: [
    { code:'S1', name:'Distance around a circle, displacement across it', sources:[], readings:[
      {code:'S1-A',text:'Distance follows the path actually travelled. Displacement points straight from the starting position to the finishing position. Around a circle, the curved path and the straight change in position are usually different.'},
      {code:'S1-B',text:'Travel around the rim and distance accumulates along the arc. Displacement ignores the route and joins start to finish directly. Complete one lap and the distance is one circumference while displacement is zero.'}
    ], interactions:[
      {code:'S1-I1',kind:'circle-displacement',note:'Move through quarter, half, three-quarter and full turns. The travelled arc and straight displacement chord remain visible together.'},
      {code:'S1-I2',kind:'circle-journey',note:'Animate the marker around the circular path while distance grows; the displacement arrow continually reconnects start to current position.'}
    ], exercises:[
      {code:'S1-X1',kind:'choice',prompt:'After one complete lap of a circular track, which statement is correct?',options:[{label:'Distance is one lap; displacement is zero',correct:true},{label:'Both are zero',feedback:'The runner travelled the entire circumference.'},{label:'Both equal one circumference',feedback:'Start and finish coincide, so displacement is zero.'}],successNote:'Distance remembers the route; displacement compares start and finish.'},
      {code:'S1-X2',kind:'choice',prompt:'After half a lap, which line represents displacement?',options:[{label:'The straight line across the circle from start to finish',correct:true},{label:'The curved half-circle path',feedback:'That arc is the distance travelled.'},{label:'The full circumference',feedback:'Only half the path has been travelled.'}],successNote:'Displacement is the direct start-to-finish change in position.'}
    ]},
    { code:'S2', name:'Direction completes the description', sources:[], readings:[
      {code:'S2-A',text:'A displacement needs a direction. “Five metres” gives only a magnitude; “five metres east” says where the change in position points.'},
      {code:'S2-B',text:'Directions can be named with words such as north and west or measured by an angle from a chosen reference direction. The reference must be stated so the direction is unambiguous.'}
    ], interactions:[
      {code:'S2-I1',kind:'compass-direction',note:'Choose eight compass directions around a fixed origin. The arrow rotates while its five-metre magnitude stays fixed.'},
      {code:'S2-I2',kind:'direction-angle',note:'Rotate direction in 45° steps from east as 0°. Compass name and angular description stay linked.'}
    ], exercises:[
      {code:'S2-X1',kind:'choice',prompt:'Which fully describes a displacement?',options:[{label:'8 m north',correct:true},{label:'8 m',feedback:'The magnitude is present but the direction is missing.'},{label:'north',feedback:'The direction is present but the magnitude is missing.'}],successNote:'A displacement needs both magnitude and direction.'},
      {code:'S2-X2',kind:'choice',prompt:'Two arrows are equally long but point east and west. What differs?',options:[{label:'Their direction',correct:true},{label:'Their magnitude',feedback:'Equal arrow length represents equal magnitude.'},{label:'Nothing',feedback:'Opposite directions make them different vectors.'}],successNote:'Same magnitude, different direction.'}
    ]},
    { code:'S3', name:'A vector carries magnitude and direction', sources:[], readings:[
      {code:'S3-A',text:'A vector is drawn as an arrow. Its length represents magnitude and its arrowhead shows direction. Change either one and you have changed the vector.'},
      {code:'S3-B',text:'The number alone is not the vector, and the arrowhead alone is not the vector. A vector combines how much with which way in one object.'}
    ], interactions:[
      {code:'S3-I1',kind:'vector-builder',note:'Choose magnitude from 1 to 8 and rotate direction through 360°. Arrow length, arrowhead and readout update together.'},
      {code:'S3-I2',kind:'vector-compare',note:'Build two vectors and test equality. They match only when both magnitude and direction match.'}
    ], exercises:[
      // The weaker of the two, and the one to drop if section 3 reads long. S3-I2
      // already has the learner build two vectors and test equality, so this
      // asks them to restate what they have just done. That is the see-it-then-
      // say-it pattern every other board uses, which is why it is kept, but it
      // is the only check on this board that repeats its own interaction.
      {code:'S3-X1',kind:'choice',prompt:'When are two vectors equal?',options:[{label:'When magnitude and direction both match',correct:true},{label:'Whenever their magnitudes match',feedback:'Equal length with different direction gives different vectors.'},{label:'Whenever they point the same way',feedback:'Direction alone does not fix magnitude.'}],successNote:'Both parts must agree.'},
      // The stronger keep. Its third option, "distance travelled along a path",
      // is the only place the board reaches back to section 1, so this is what
      // ties the vector to the distance-versus-displacement distinction the
      // whole board opened with.
      {code:'S3-X2',kind:'choice',prompt:'What does the arrowhead of a vector show?',options:[{label:'Direction',correct:true},{label:'Magnitude',feedback:'Magnitude is represented by the arrow length.'},{label:'Distance travelled along a path',feedback:'A vector joins a directed change; it does not trace the route.'}],successNote:'Arrowhead means direction; length means magnitude.'}
    ]}
  ], closing:'Next proposed board: Vector Addition, using head-to-tail arrows before two-dimensional forces.'
};
