export const selections = {};
export const finalised = {};
export const rejected = {};
export const gated = 'Proposed extension after Vectors and Displacement. Every candidate is AI_DRAFT and awaits founder selection, prerequisite mapping, placement and approval. It must remain outside the learner build.';

export const vectorAddition = {
  id: 'PHY-VECTOR-002', title: 'Vector Addition',
  objective: 'The learner adds vectors graphically by placing them head to tail and identifies the resultant as the single vector from the first tail to the final head.',
  prerequisites: 'Provisional: PHY-VECTOR-001 Vectors and Displacement; recognise magnitude, direction and horizontal/vertical directions.',
  misconception: 'Moving an arrow without rotating or resizing it does not change the vector. Adding vector magnitudes alone is valid only when the vectors point in the same direction.',
  fork: 'Establish that a vector can be translated, join two arrows head to tail, then compare the route with the resultant and investigate cancellation.',
  structure: 'Three sections: translating a vector, head-to-tail addition, and resultants.',
  sourceMatrix: [{ work: 'Urone and Hinrichs, OpenStax Physics (2020), §5.1', role: 'Defines the head-to-tail graphical method, the resultant, order independence and opposite vectors.', treatment: 'Paraphrased with attribution under CC BY. All examples, diagrams, controls and checks are Qubix-original.', url: 'https://openstax.org/books/physics/pages/5-1-vector-addition-and-subtraction-graphical-methods' }],
  changeRecord: { date: '2026-08-11', authority: 'Founder instruction to create an extension of vectors', effect: 'Creates one unselected gated Factory board. No approval, placement or release.' },
  sections: [
    { code:'S1', name:'A vector can be moved without being changed', sources:[], readings:[
      {code:'S1-A',text:'A vector is fixed by its magnitude and direction, not by where it is drawn. Slide an arrow to another position without turning or stretching it and it still represents the same vector.'},
      {code:'S1-B',text:'To add vectors graphically, we often translate an arrow so its tail meets another arrow’s head. This movement changes its position on the page but preserves its length and direction.'}
    ], interactions:[
      {code:'S1-I1',kind:'vector-translate',note:'Slide one arrow between three starting positions. Its magnitude and direction readouts remain unchanged.'},
      {code:'S1-I2',kind:'vector-copy-test',note:'Compare a translated copy with a rotated or shortened arrow and identify when the vector itself has changed.'}
    ], exercises:[
      {code:'S1-X1',kind:'choice',prompt:'An arrow is slid across the page without being turned or resized. What happens to the vector?',options:[{label:'It remains the same vector',correct:true},{label:'Its magnitude changes',feedback:'The arrow length was not changed.'},{label:'Its direction changes',feedback:'The arrow was not turned.'}],successNote:'Position is not one of the two defining properties.'},
      {code:'S1-X2',kind:'choice',prompt:'Which change definitely creates a different vector?',options:[{label:'Rotate the arrow',correct:true},{label:'Move the arrow to a clear space',feedback:'Translation alone preserves the vector.'},{label:'Change the colour of the arrow',feedback:'Colour does not encode magnitude or direction here.'}],successNote:'Changing direction changes the vector.'}
    ]},
    { code:'S2', name:'Place vectors head to tail', sources:[], readings:[
      {code:'S2-A',text:'To add vector B after vector A, place the tail of B at the head of A. Keep both arrows’ lengths and directions unchanged. The connected arrows show the combined journey.'},
      {code:'S2-B',text:'The head-to-tail method preserves each separate movement. Four units east followed by three units north ends at the same point as three units north followed by four units east.'}
    ], interactions:[
      {code:'S2-I1',kind:'vector-head-tail',note:'Adjust an eastward vector and a northward vector. The second arrow begins exactly at the first arrow’s head.'},
      {code:'S2-I2',kind:'vector-route-order',note:'Swap which perpendicular vector comes first. Both routes finish at the same point.'}
    ], exercises:[
      {code:'S2-X1',kind:'choice',prompt:'Where is the tail of the second vector placed when using the head-to-tail method?',options:[{label:'At the head of the first vector',correct:true},{label:'At the tail of the first vector',feedback:'That compares vectors from a common origin rather than joining the journey.'},{label:'Anywhere on the page',feedback:'Its exact translated position matters for constructing the sum.'}],successNote:'First head meets second tail.'},
      {code:'S2-X2',kind:'choice',prompt:'A is 4 units east and B is 3 units north. Does changing their order change the final point?',options:[{label:'No, both orders reach the same final point',correct:true},{label:'Yes, east first travels farther',feedback:'Each order contains the same two vector lengths.'},{label:'Yes, north first reverses the result',feedback:'Neither vector changes direction when the order changes.'}],successNote:'For these vectors, A + B and B + A have the same resultant.'}
    ]},
    { code:'S3', name:'The resultant replaces the combined effect', sources:[], readings:[
      {code:'S3-A',text:'The resultant is the single vector drawn from the tail of the first vector to the head of the last. It has the same overall effect as the complete head-to-tail chain.'},
      {code:'S3-B',text:'Vector addition includes direction. Opposite vectors can partly or completely cancel: six units east plus six units west has a zero resultant, not twelve units.'}
    ], interactions:[
      {code:'S3-I1',kind:'vector-resultant',note:'Build perpendicular east and north vectors. The diagonal resultant updates as their magnitudes change.'},
      {code:'S3-I2',kind:'vector-cancel',note:'Add an eastward vector and a westward vector along one line. Equal magnitudes collapse the resultant to zero.'}
    ], exercises:[
      {code:'S3-X1',kind:'choice',prompt:'Where is the resultant drawn for a head-to-tail chain?',options:[{label:'From the first tail to the final head',correct:true},{label:'From the first head to the final tail',feedback:'That would point opposite to the combined change.'},{label:'Along every arrow separately',feedback:'Those arrows show the route; the resultant is one arrow.'}],successNote:'The resultant joins the start directly to the finish.'},
      {code:'S3-X2',kind:'choice',prompt:'What is the resultant of 5 units east plus 5 units west?',options:[{label:'Zero',correct:true},{label:'10 units east',feedback:'The two directions oppose rather than reinforce.'},{label:'10 units west',feedback:'Equal opposite vectors cancel completely.'}],successNote:'Equal magnitude and opposite direction give a zero resultant.'}
    ]}
  ],
  closing:'Next proposed step: resolve vectors into perpendicular components after the trigonometry prerequisite is in place.'
};
