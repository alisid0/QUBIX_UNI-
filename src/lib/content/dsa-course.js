// Original Qubix teaching edition. Existing approved samples remain unchanged.
// Drafting authority: founder request, 2026-09-05. No approval is implied.
export const COURSE_VERSION = 1;
export const modules = [
  {
    id: 'contracts', title: 'Data structures and algorithms', subtitle: 'Turn an intention into a procedure you can defend.',
    time: '25–35 minutes', prerequisite: 'Read a short list and follow instructions. No programming experience needed.',
    objective: 'Specify an operation, trace its steps, and give a counterexample to an incorrect procedure.',
    original: '/dsa/introduction', lab: 'contract',
    opening: 'A drawing app remembers three actions: draw a line, change its colour, move it. You press Undo. All three actions are stored correctly. That alone does not tell the app which one to reverse. The organisation of the history and the rule for using it must work together.',
    sections: [
      { title: 'Two decisions, one working system', paragraphs: [
        'A data structure organises information and supports operations on it. An algorithm is a precise procedure for doing a task. For the finite tasks in this course, it must eventually stop. “Find the right item” names a goal; “compare each item with the target, starting at the first, and stop at a match or the end” gives a procedure.',
        'For Undo, the important operation is removing the most recent action that has not already been undone. A stack provides this last-in, first-out rule. A queue provides a different rule: first-in, first-out. Neither is universally better. Each answers a different requirement.'
      ] },
      { title: 'Write the contract before the code', paragraphs: [
        'A contract states what is allowed in and what must come out. Suppose a routine support desk receives requests A, then B, then C. Its input is an ordered collection of waiting requests. Its operation is “serve next”. Its output is A, leaving B, C waiting. If nobody is waiting, it reports “empty”.',
        'The precondition describes what the procedure assumes before it starts. Here, the collection is already in arrival order. The postcondition describes what must be true when it finishes: the oldest request was returned, exactly one request was removed, and every other request kept its relative order. Relative order means that if B was before C, it still is.',
        'A constraint can change the contract. Emergency requests might need priority over routine requests. A plain arrival-order queue no longer expresses the whole policy. Ask which rule must hold before choosing a structure.'
      ] },
      { title: 'A trace makes a claim inspectable', paragraphs: [
        'A trace records the state after each step. With history [line, colour, move], remove-newest returns move and leaves [line, colour]. A second undo returns colour. Writing these intermediate states exposes a procedure that accidentally returns the oldest action.',
        'Try an empty history, a single action, and repeated actions. Repeated values do not make two events the same event. Two separate “move” actions may need to be undone separately. Tests should reflect the contract, not merely the easiest example.'
      ] },
      { title: 'One counterexample can overturn a claim', paragraphs: [
        'Suppose a proposed Undo algorithm removes the first entry in a history stored oldest-to-newest. A one-action test passes. Two different actions are enough to break it: [draw, move] should return move, but the algorithm returns draw. This is a counterexample: an allowed input on which the promised result is false.',
        'Passing ten examples is useful evidence, but it is not a proof for all allowed inputs. A convincing explanation must connect every step to the contract. Later we will use an invariant: a statement that remains true while a procedure runs.'
      ] },
      { title: 'What remains your job when AI writes code?', paragraphs: [
        'You still decide what correct means, which assumptions are justified, what evidence would reveal a failure, and whether the costs suit the situation. An elegant explanation from a model is a claim to examine. Start with a small example you can run in your head, then look for a case that would make the claim false.',
        'Use this rhythm: predict an outcome, execute the procedure, explain any difference, and try a changed case. If you ask an AI for help, first write your own trace. Ask it for a hint or a counterexample. After reading its answer, close it and reconstruct the reasoning yourself.'
      ] }
    ],
    worked: { title: 'The same three requests, two contracts', code: 'Waiting: [A, B, C]  (oldest → newest)\nQueue: serve oldest → A; remaining [B, C]\nStack: remove newest → C; remaining [A, B]', explanation: 'The data did not change. The required operation changed. A stack or queue describes behaviour; an array or linked nodes can implement that behaviour. An implementation determines the cost of meeting the rule.' },
    questions: [
      { id:'c1', prompt:'An AI implements Undo by removing the oldest action. Which is the smallest history here that exposes the error?', options:['An empty history','[draw, move]','[draw]'], correct:1, feedback:['An empty history tests empty handling, but cannot distinguish oldest from newest.','Two distinct actions separate the policies: Undo must return move, not draw.','With one action, oldest and newest are the same. This test hides the error.'], hint:'Find a case where oldest and newest name different actions.' },
      { id:'c2', prompt:'Which sentence is a postcondition for serving a routine request?', options:['The requests arrived over a network.','The collection is stored in an array.','The oldest request is returned and the others retain their relative order.'], correct:2, feedback:['This describes origin, not the required result.','This is an implementation choice, not a correctness guarantee.','It states what must be true after the operation, independently of implementation.'], hint:'A postcondition describes the result of the operation.' },
      { id:'c3', prompt:'A queue implementation passes 100 ordinary tests. What can you conclude?', options:['Those examples provide evidence; correctness for all allowed inputs still needs an argument.','The procedure is correct for every possible input.','Testing has no value unless it proves correctness.'], correct:0, feedback:['Yes. Tests can expose mistakes and support confidence without exhausting every possible input.','Unexamined inputs can still fail. Try an empty queue or a boundary case.','Tests are valuable evidence and regression protection even when they are not proofs.'], hint:'Separate evidence about sampled inputs from a claim about all inputs.' },
      { id:'c4', prompt:'Urgent requests must overtake routine requests. What should you do first?', options:['Replace every array with a graph.','Specify the priority and tie-breaking rules.','Keep arrival order because queues are always fair.'], correct:1, feedback:['A graph does not define the service policy.','Correct. Define urgency, equal-priority ordering and any protection against indefinite waiting before choosing the mechanism.','Fairness is a requirement to define; arrival order no longer captures this requirement.'], hint:'The requirement has changed. Make the new rule precise.' }
    ],
    reflection:'Design a contract for an Undo button after every action has already been undone. State the output and whether the history changes.',
    rubric:['An empty history returns a defined empty result or disables Undo.','No unrelated action or record is removed.','The behaviour is specified before choosing code or storage.'],
    transfer:'Tomorrow, find a real app with “next” or “undo”. Explain its ordering rule, then invent a two-item test that distinguishes it from the opposite rule.'
  },
  {
    id:'search', title:'Sequences, indexed access and linear search', subtitle:'Knowing a value is different from knowing where it lives.',
    time:'30–40 minutes', prerequisite:'Module 1: inputs, outputs, contracts and traces. Count from zero; a short repair is included below.',
    objective:'Trace a first-match search, handle absence and duplicates, and justify its correctness and worst-case cost.', original:'/dsa/sequences', lab:'search',
    opening:'A music player gets two requests: “Play the track at position 4” and “Find the track called River”. One supplies a position. The other supplies a value. An unsorted sequence cannot turn a name into a position just because its positions are numbered.',
    sections:[
      {title:'Index, value and length', paragraphs:[
        'A sequence is an ordered collection. In this course the positions begin at zero: in [8, 3, 8, 5], index 0 holds 8 and index 3 holds 5. Its length is 4. For a sequence of length n, valid non-negative indices are 0 through n − 1. An empty sequence has length zero and no valid index.',
        'If zero-based indexing is new, count gaps from the start: zero steps reaches the first item, one step reaches the second. “The fourth item” means index 3. Index 4 in a four-item sequence is outside the range. Python also permits negative indexing, but this module uses only non-negative positions.'
      ]},
      {title:'What direct access assumes', paragraphs:[
        'In our array model, equal-sized slots occupy consecutive memory positions. If the first slot begins at address b and each slot occupies w address units, index i begins at b + i × w. The calculation does not require inspecting earlier values. The units here describe a model, not a promise about your machine.',
        'Knowing an index therefore allows constant-time indexed access in this model. A sequence is an abstract ordered collection; not every implementation gives constant-time access. A linked list normally requires following links. We will not quietly transfer the array assumption to every list.'
      ]},
      {title:'Searching needs a stopping rule', paragraphs:[
        'Our contract is: given an unsorted sequence and a target, return the index of its first matching value; return −1 if none matches. First matters because values may repeat. In [8, 3, 8, 5], searching for 8 must return 0, not 2.',
        'Start at index 0. Compare the current value with the target. If it matches, return the index. Otherwise advance by one. Once the index reaches n, return −1. Do not access position n: it is the boundary after the last item. The empty sequence goes straight to “not found” without a value comparison.'
      ]},
      {title:'Why the procedure is correct', paragraphs:[
        'Before inspecting position i, none of the positions before i contains the target. This is our loop invariant. At i = 0 there are no earlier positions, so the statement is true. A mismatch allows i to increase by one while preserving it.',
        'If position i matches, the invariant tells us that no earlier match exists, so returning i meets the first-match contract. If i reaches n, every position has been ruled out, so −1 is correct. The uninspected suffix gets shorter after each mismatch. It cannot shrink forever: this establishes termination.'
      ]},
      {title:'Count a defined unit of work', paragraphs:[
        'Count value-to-target comparisons, not seconds or lines of code. A match at index i costs i + 1 comparisons. A missing target costs n. For a non-empty sequence the best case costs one comparison, and the worst case costs n. An empty input costs zero value comparisons.',
        'The worst-case comparison count grows linearly with n. We call it Θ(n), meaning a tight order-of-growth bound. O(n) expresses an upper bound and is also true here. Array access is Θ(1) in our model. These symbols describe growth under stated assumptions; a constant-time operation is not literally instantaneous.',
        'An average needs a distribution. If the target is present and each of the n positions is equally likely to be its first match, the expected comparisons are (n + 1)/2. That assumption is not automatically true for real searches, and it excludes absent targets.'
      ]}
    ],
    worked:{title:'Read the procedure one line at a time',code:'def first_index(items, target):\n    for i in range(len(items)):\n        if items[i] == target:\n            return i\n    return -1',explanation:'def names a procedure. len gives the length. range(n) produces positions 0 through n − 1. == tests equality. return stops the procedure and hands back a result. The last return is outside the loop; placing it inside would abandon the search after the first mismatch. This example is for reading, not an embedded Python runner.'},
    questions:[
      {id:'s1',prompt:'In [6, 2, 6, 9], how many comparisons does first-match search for 6 make?',answer:1,feedback:'It matches at index 0. The index is 0 but the number of comparisons is 1.',hint:'Stop on the first match; do not count the later duplicate.'},
      {id:'s2',prompt:'An empty sequence is searched for 9. What index does our contract return?',answer:-1,feedback:'There are no valid positions, so no value is inspected and the not-found result is −1.',hint:'Zero is a real position in a non-empty sequence. We need a distinct not-found signal.'},
      {id:'s3',prompt:'Which claim lets you conclude a match at position i is the first match?',options:['The sequence has at least one item.','Every position before i has already been checked and did not match.','The values are all different.'],correct:1,feedback:['Length alone says nothing about earlier matches.','This is exactly the invariant needed for the first-match contract.','Uniqueness was not required and is not safe to assume.'],hint:'Look at what the trace has ruled out.'},
      {id:'s4',prompt:'For 200 unsorted values, what is the worst-case number of value comparisons?',answer:200,feedback:'An absent target, or a first match at the final position, requires checking all 200 values.',hint:'Use an input that forces the procedure to inspect the whole sequence.'}
    ],
    reflection:'An AI puts “return −1” inside the loop immediately after the comparison fails. Give the smallest sequence and target that show the bug. State the expected and actual results.',
    rubric:['Use two values, for example [2, 7] with target 7.','The expected index is 1; the faulty procedure returns −1 after comparing only 2.','The repair returns −1 only after the entire loop finishes.'],
    transfer:'Without reopening the lesson, trace a search for an absent value and explain what remains true after each mismatch.'
  },
  {
    id:'insertion',title:'Array insertion and invariants',subtitle:'Make room without destroying what must stay.',time:'30–40 minutes',prerequisite:'Module 2: array indices, length, traces and an invariant.',
    objective:'Construct an order-preserving insertion, explain the direction of copying, and count moves separately from writes.',original:'/dsa/arrays/insertion',lab:'insertion',
    opening:'Your playlist is [A, B, C, D]. You want X before B. Writing X into position 1 replaces B. Insertion has a stronger promise: retain every old track, preserve their order, and add exactly one new track.',
    sections:[
      {title:'Length is not capacity',paragraphs:[
        'Length n counts the stored items. Capacity c counts the available slots in the backing array. A length-4 array with capacity 5 has four items and one spare slot. A spare slot is not an extra playlist item and must not be included in a search.',
        'This module assumes spare capacity: c ≥ n + 1. Without that precondition, we need a different operation before insertion can finish. The next module will build it. Keeping the assumption visible prevents us from claiming a procedure works on a full array.'
      ]},
      {title:'State exactly what insertion preserves',paragraphs:[
        'Insert X at index i, where 0 ≤ i ≤ n. The resulting length is n + 1. Positions before i stay as they were. Position i holds X. Every old item at position j ≥ i moves to j + 1. The old items keep their relative order.',
        'Unlike access, insertion permits i = n: it means adding after the final item. For an empty array, i = 0 is the only valid insertion position. A negative index or an index beyond n is invalid in this teaching contract, even though some language APIs apply other rules.'
      ]},
      {title:'The direction of copying is part of correctness',paragraphs:[
        'For [A, B, C, D, spare], first copy D from 3 to 4, then C from 2 to 3, then B from 1 to 2. Finally write X at 1. Temporary duplicate values are expected during copying. We have not yet finished the insertion.',
        'Copying B to 2 first overwrites C before C has been saved. Copying the new value at 2 to 3 then propagates B. The wrong direction loses information. Starting at the rightmost occupied slot protects the source of every future copy.'
      ]},
      {title:'An invariant that explains the movement',paragraphs:[
        'Before copying from position j to j + 1, all original items to the right of j already occupy their final shifted positions, and original items from i through j are still available at their original positions. Initially nothing has shifted and all sources are intact.',
        'A right-to-left copy extends the finished suffix by one while protecting the unread prefix. When j falls below i, the whole suffix has shifted. We can overwrite position i with X, then increase the length. This explains both why the algorithm works and why its loop eventually stops.'
      ]},
      {title:'Derive the cost; do not memorise a slogan',paragraphs:[
        'The old positions i, i + 1, …, n − 1 must move. There are n − i of them. We count one move per copied old item and one additional write for X. Inserting at the front moves n items; inserting at the end moves none when there is spare capacity.',
        'The complete operation costs Θ(n − i + 1) slot writes in this model. Worst-case insertion is Θ(n); append with spare capacity is Θ(1). Saying “array insertion is always linear” hides the position and capacity assumptions.',
        'Removing a middle item creates the opposite problem: fill the gap by shifting later items left, starting beside the gap. If order does not matter, a different contract may permit replacing the removed item with the last one. That faster operation would violate a playlist’s ordering requirement.'
      ]}
    ],
    worked:{title:'Insertion with spare capacity',code:'j = n - 1\nwhile j >= i:\n    slots[j + 1] = slots[j]\n    j = j - 1\nslots[i] = X\nn = n + 1',explanation:'This is pseudocode for an already allocated array, not Python list.insert. = stores a value; >= means greater than or equal to. For n = 4 and i = 1, j visits 3, 2, 1. The new item is written only after all three copies.'},
    questions:[
      {id:'i1',prompt:'An array has length 7 and spare capacity. Inserting at index 2 moves how many old items?',answer:5,feedback:'The old indices 2, 3, 4, 5 and 6 move: 7 − 2 = 5. Writing the new item is a separate write.',hint:'Count the original positions from the insertion index through n − 1.'},
      {id:'i2',prompt:'Which copy must happen first when inserting at 1 into [A, B, C, D, spare]?',options:['B from 1 to 2','X into 1','D from 3 to 4'],correct:2,feedback:['That overwrites C before preserving it.','That replaces B before preserving it.','Yes. This uses the spare slot and protects every source still needed.'],hint:'Use the empty slot to preserve the rightmost old item first.'},
      {id:'i3',prompt:'With length 7 and spare capacity, how many total slot writes does append make, including the new item?',answer:1,feedback:'No old items move at i = n. Only the new item is written.',hint:'Separate the number of old items moved from the write that stores the new one.'},
      {id:'i4',prompt:'The array is full. Which statement about the insertion procedure is accurate?',options:['Its spare-capacity precondition fails; acquire space or report failure before writing.','The final old item may be discarded.','Capacity is only a performance concern, so use index n anyway.'],correct:0,feedback:['Correct. The storage requirement is part of the contract, not a footnote.','Discarding an old item violates insertion’s preservation promise.','Writing beyond allocated storage is invalid in this model.'],hint:'What made the first rightward copy legal?'}
    ],
    reflection:'For [A, B, C, spare], insert X at index 1. Write every intermediate state, then explain exactly what a left-to-right copy would destroy.',
    rubric:['Copy C to 3, then B to 2, then write X at 1.','The result is [A, X, B, C] and length increases from 3 to 4.','Copying B first would overwrite C, which is still needed.'],
    transfer:'Explain why deleting the first item repeatedly from a contiguous ordered array involves many moves. Would that be a good way to serve a long queue?'
  },
  {
    id:'growth',title:'Dynamic arrays and amortised cost',subtitle:'Explain a cheap sequence of operations that includes expensive steps.',time:'35–45 minutes',prerequisite:'Module 3: length, capacity and insertion. Add small whole numbers; doubling is introduced here.',
    objective:'Compare growth policies using a trace, derive an aggregate bound, and distinguish amortised cost from worst-case latency.',original:'/dsa/arrays/growth',lab:'growth',
    opening:'A full four-slot array must accept a fifth item. There is no fifth slot to write into. We can allocate a larger backing array, copy the four old values, then append the new one. The crucial question is how much extra room to reserve.',
    sections:[
      {title:'The fifth append costs more than one write',paragraphs:[
        'A dynamic array manages a backing array that can be replaced. If there is room, append writes the new item and increases length. If it is full, growth first creates a larger backing array and copies the n stored items in order. The new item then takes one more write.',
        'Our model counts copied old values plus writes of new values. It excludes allocation bookkeeping, memory zeroing and hardware effects. The teaching policy doubles capacity; it is not a claim that a particular Python version always doubles its list storage.'
      ]},
      {title:'Two policies, the same correct values',paragraphs:[
        'Start empty with capacity 1. A grow-by-one policy always adds exactly one slot. For five appends the copy counts are 0, 1, 2, 3, 4: ten copies, plus five new-item writes. It keeps little spare room but repeats almost the same copying work.',
        'A doubling policy grows capacities 1, 2, 4, 8. For five appends the copy counts are 0, 1, 2, 0, 4: seven copies, plus five new-item writes. The fourth append fits the existing capacity. Both policies preserve values; their costs differ.'
      ]},
      {title:'Look at the whole sequence',paragraphs:[
        'For m appends from empty under grow-by-one, copies total 0 + 1 + … + (m − 1) = m(m − 1)/2. Including m new-item writes gives m(m + 1)/2. The total grows quadratically, Θ(m²). The average cost per append across that sequence grows with m.',
        'With doubling, the copied lengths are powers of two: 1, 2, 4, and so on. If the final capacity is C > 1, these copies sum to C − 1. For m ≥ 1, the capacity is less than 2m, so copies are fewer than 2m and total writes are fewer than 3m. For m = 1 there are zero copies and one write, which also fits the bound.',
        'There are at least m writes because every new value must be stored. Together, the upper and lower bounds establish Θ(m) total work for m appends. Dividing by m gives Θ(1) amortised work per append. Amortised means accounting across a sequence, not averaging over randomly chosen inputs.'
      ]},
      {title:'Averages do not remove pauses',paragraphs:[
        'An individual append at a full length-n array still copies n old values and writes one new value: Θ(n) work. The amortised bound does not promise a maximum pause. For an audio callback or other tight deadline, that distinction can matter more than the long-run total.',
        'More reserved space can reduce resizing frequency, but uses memory. Immediately after a large doubling, close to half the new capacity is spare. During allocation and copying, the old and new arrays may coexist; doubling a full capacity-C array can temporarily require 3C slots. Production decisions also need failure handling and measurement.'
      ]},
      {title:'Know what this result does not cover',paragraphs:[
        'This analysis is for append-only growth starting empty with capacity 1. It does not erase the shifts needed for insertion at the front. Repeatedly prepending m items still moves 0 + 1 + … + (m − 1) old items, even if resizing is well managed.',
        'Deletion and shrinking need a separate policy; shrinking immediately whenever one item is removed can cause repeated grow-shrink copying. We have not analysed that policy here. Always carry the operation, starting state and model along with the complexity claim.'
      ]}
    ],
    worked:{title:'A complete five-append trace',code:'Append number       1  2  3  4  5\nCapacity afterward  1  2  4  4  8\nOld values copied   0  1  2  0  4\nNew value writes    1  1  1  1  1\nTotal step cost     1  2  3  1  5',explanation:'The running total is 12 slot writes. The fifth append costs 5, even though the total divided by five is 2.4. A mean across this finite trace is a number; the amortised Θ(1) result is a bound for all lengths under the stated policy.'},
    questions:[
      {id:'g1',prompt:'Starting empty at capacity 1, doubling as needed, what is capacity after 9 appends?',answer:16,feedback:'Capacities grow 1 → 2 → 4 → 8 → 16. The ninth item triggers the last growth.',hint:'Choose the first doubled capacity that can hold nine values.'},
      {id:'g2',prompt:'At full length 8, how many slot writes does one growing append make, including the new value?',answer:9,feedback:'Eight old values are copied and one new value is written. Allocating 16 slots is not the same as copying 16 values.',hint:'Count stored old values, then add the new-item write.'},
      {id:'g3',prompt:'Which conclusion follows from Θ(1) amortised append cost?',options:['Every append takes the same time.','All insertions anywhere in the array are constant time.','The total append work from empty is bounded linearly, but one resizing append can be expensive.'],correct:2,feedback:['Individual resize operations still copy many values.','Middle insertions still need shifts to preserve order.','Exactly. A bound over a sequence is not a bound on each pause.'],hint:'Keep the aggregate cost separate from the largest single step.'},
      {id:'g4',prompt:'Grow-by-one from empty at capacity 1: how many old-value copies do 5 appends require?',answer:10,feedback:'The copies are 0 + 1 + 2 + 3 + 4 = 10. The five new-item writes would bring total writes to 15.',hint:'Do not include writes of the newly arriving values in the copy count.'}
    ],
    reflection:'An AI says, “Use a dynamic array for an audio deadline because append is O(1).” Write a response that identifies the missing qualifier, a failing situation, and one engineering question.',
    rubric:['The qualifier is amortised; it is not a worst-case per-operation guarantee.','A full array triggers copying, so one append may exceed the deadline.','Ask about the maximum size, allocation policy, worst-case timing or preallocation; a benchmark alone is not a hard deadline guarantee.'],
    transfer:'Tomorrow, derive the doubling copy bound from 1 + 2 + 4 + … without reopening this module. State one operation the proof does not make constant-time.'
  }
];

export function searchTrace(values, target) {
  const steps = [];
  for (let i = 0; i < values.length; i += 1) {
    steps.push({ index:i, value:values[i], match:values[i] === target });
    if (values[i] === target) return { steps, result:i };
  }
  return { steps, result:-1 };
}

export function insertionTrace(values, index, value, capacity = values.length + 1) {
  if (!Number.isInteger(index) || index < 0 || index > values.length) throw new RangeError('Invalid insertion index');
  if (!Number.isInteger(capacity) || capacity < values.length + 1) throw new RangeError('Spare capacity required');
  const slots = [...values, ...Array(capacity - values.length).fill(null)];
  const steps = [{ slots:[...slots], note:'Before insertion', moves:0, writes:0 }];
  let moves = 0;
  for (let j = values.length - 1; j >= index; j -= 1) {
    slots[j + 1] = slots[j]; moves += 1;
    steps.push({slots:[...slots],note:`Copy ${slots[j]} from ${j} to ${j + 1}`,moves,writes:moves});
  }
  slots[index] = value;
  steps.push({slots:[...slots],note:`Write ${value} at ${index}; length becomes ${values.length + 1}`,moves,writes:moves + 1});
  return steps;
}

export function appendTrace(count, policy = 'double') {
  if (!Number.isInteger(count) || count < 0 || count > 128) throw new RangeError('Use 0–128 appends');
  if (!['double','one'].includes(policy)) throw new RangeError('Unknown growth policy');
  let capacity = 1; let copies = 0;
  return Array.from({length:count}, (_, n) => {
    const copied = n === capacity ? n : 0;
    if (n === capacity) capacity = policy === 'double' ? capacity * 2 : capacity + 1;
    copies += copied;
    return {length:n + 1,capacity,copied,copies,writes:copies + n + 1,cost:copied + 1};
  });
}

export function answerIsCorrect(question, value) {
  if (question.options) return Number.isInteger(value) && value === question.correct;
  return String(value).trim() !== '' && Number.isFinite(Number(value)) && Number(value) === question.answer;
}
