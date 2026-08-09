<script>
  import { onMount } from 'svelte';
  import { theme } from '../lib/stores/theme.js';

  const boards = [
    {
      id: 'CME-CHANGE-001',
      title: 'Variables and Changing Values',
      marker: 'Variables',
      floors: [
        {
          text: 'Arithmetic uses figures to represent numbers: 1, 2, 3, 4, 5, 6, 7, 8, 9, 0. Algebra uses the letters of the alphabet as well.',
          exercise: {
            kind: 'choice',
            prompt: 'Which of these always stands for the same number?',
            options: [
              { label: '7', correct: true },
              { label: 'x', feedback: 'A letter has no fixed value until one is assigned to it.' },
              { label: 'y', feedback: 'A letter has no fixed value until one is assigned to it.' }
            ],
            successNote: 'Correct. A figure always represents the same number. A letter does not.',
            revealNote: '7 is a figure, so it always represents the same number. x and y are letters.'
          }
        },
        {
          text: 'Write x = 2. This assigns the number 2 to the letter x. In this lesson x now represents 2.',
          exercise: {
            kind: 'choice',
            prompt: 'x has been assigned the value 5. What does x stand for?',
            options: [
              { label: 'The number 5', correct: true },
              { label: 'The letter x', feedback: 'x is how it is written. The question is what it stands for.' },
              { label: 'Any number at all', feedback: 'That was true before a value was assigned. It is not true now.' }
            ],
            successNote: 'Correct. Once 5 is assigned to x, x represents 5.',
            revealNote: 'x stands for the number assigned to it, which here is 5.'
          }
        },
        {
          text: 'Any particular value may be assigned to a letter. Assign 3 to x and x represents 3. Assign 1.5 and x represents 1.5. The letter is not altered by this.',
          exercise: {
            kind: 'choice',
            prompt: 'x is assigned 2, then assigned 3. What changed?',
            options: [
              { label: 'The value assigned to x', correct: true },
              { label: 'The symbol changed from x to another letter', feedback: 'The letter is written the same way both times.' },
              { label: 'The number 2 became a letter', feedback: '2 is a figure. It always represents the same number.' }
            ],
            successNote: 'Correct. The letter stayed x. The number assigned to it was replaced.',
            revealNote: 'x is the letter in both statements. The value assigned to it was replaced.'
          }
        },
        {
          text: 'A letter may represent a measured quantity. Let x be the length of the side of this square, in centimetres. The square is drawn at whatever value is assigned to x.',
          exercise: {
            kind: 'set-control',
            prompt: 'Assign x the value that makes each side 3.0 cm.',
            target: 3,
            tolerance: 0.05,
            from: 2,
            successNote: 'x = 3.0 cm. The square is drawn from the value assigned to x.'
          }
        }
      ]
    },
    {
      id: 'CME-CHANGE-002',
      title: 'Change in a Variable',
      marker: 'Change',
      floors: [
        {
          text: 'This is the same x you have just met. It starts at 2. Move it and x takes a new value, while the symbol stays x.',
          exercise: {
            kind: 'set-control',
            prompt: 'Move x to 2.5.',
            target: 2.5,
            tolerance: 0.05,
            from: 2,
            successNote: 'x is now 2.5. One symbol, a second value.'
          }
        },
        {
          text: 'Between the old value and the new one there is a gap, and that gap has a size of its own: new − old. From 2 to 2.5, the gap is 0.5.',
          exercise: {
            kind: 'choice',
            prompt: 'x moves from 2 to 2.75. How big is the change?',
            options: [
              { label: '0.75', correct: true },
              { label: '2.75', feedback: '2.75 is where x ended up, not how far it travelled.' },
              { label: '4.75', feedback: 'Adding gives the wrong quantity. The gap is a subtraction: new − old.' }
            ],
            successNote: 'Correct. 2.75 − 2 = 0.75. The change is a quantity in its own right.',
            revealNote: 'The change is new − old, so 2.75 − 2 = 0.75.'
          }
        },
        {
          text: 'That gap needs a name. Mathematicians write “the change in” using the Greek capital letter Δ, read “delta”. On its own Δ is not a number, and it does not multiply. It is waiting for a variable to attach to.',
          exercise: {
            kind: 'choice',
            prompt: 'On its own, what does Δ mean?',
            options: [
              { label: 'The change in', correct: true },
              { label: 'Multiply by delta', feedback: 'Δ is not a quantity, so there is nothing to multiply by. It is a word, written short.' },
              { label: 'A very small amount', feedback: 'Δ says nothing about size. A change can be large or small.' }
            ],
            successNote: 'Correct. Δ is shorthand for the words “the change in”.',
            revealNote: 'Δ is shorthand for “the change in”. It is a word, not a number.'
          }
        },
        {
          text: 'Now attach Δ to x. Δx is read “delta x” and means the change in x: Δx = new − old. Moving from 2 to 2.5 gives Δx = 0.5.',
          exercise: {
            kind: 'choice',
            prompt: 'What does Δx mean?',
            options: [
              { label: 'The change in x', correct: true },
              { label: 'Δ multiplied by x', feedback: 'Δ is not a number, so it cannot multiply anything. Δ and x are read together as one name.' },
              { label: 'A new variable, separate from x', feedback: 'Δx is not independent. It measures how far this same x has moved.' }
            ],
            successNote: 'Correct. Δx is one name meaning the change in x.',
            revealNote: 'Δx is read as one thing: the change in x. Δ never multiplies.'
          }
        },
        {
          text: 'Δx can also be negative. Move the new value below 2 and the subtraction turns the other way. The sign records the direction of the move, not only its size.',
          exercise: {
            kind: 'set-control',
            prompt: 'Move the new value so that Δx becomes negative.',
            below: 2,
            from: 2.5,
            successNote: 'Δx is now negative. x decreased, and the minus sign is what records that.'
          }
        }
      ]
    },
    {
      id: 'CME-CHANGE-003',
      title: 'Dependent Variables',
      marker: 'Functions',
      floors: [
        { text: 'Let x be the side of a square and y be its area. They are tied together by y = x².' },
        { text: 'At x = 2, y = 4. Change x to 2.5 and the area becomes 6.25.' },
        { text: 'x is the independent variable. y depends on it. The area change is Δy = 2.25.' },
        { text: 'We now have a paired move: Δx = 0.5 and Δy = 2.25.' }
      ]
    },
    {
      id: 'CME-CHANGE-004',
      title: 'Average Rate of Change',
      marker: 'Rate of change',
      floors: [
        { text: 'The side grows by 0.5 cm while the area grows by 2.25 cm². Compare the two changes.' },
        { text: 'Δy/Δx = 2.25/0.5 = 4.5. That is the average area growth for each centimetre added.' },
        { text: 'Average rate of change means change in output divided by change in input.' }
      ]
    },
    {
      id: 'CME-CHANGE-005',
      title: 'Instantaneous Rate of Change',
      marker: 'A shrinking interval',
      floors: [
        { text: 'Keep the starting value at x = 2. Move the other value closer.' },
        { text: 'The average rates are 5, then 4.5, 4.1, 4.01, and 4.001.' },
        { text: 'The interval shrinks while the rates settle near 4. That value describes the rate right at x = 2.' },
        { text: 'Calculus calls this local rate the derivative. Next comes Thompson’s notation: dy/dx.' }
      ]
    }
  ];

  const stepOptions = [1, 0.5, 0.1, 0.01, 0.001];
  const parabolaPoints = Array.from({ length: 61 }, (_, i) => {
    const x = i / 15;
    return `${40 + x * 60},${178 - x * x * 8.5}`;
  }).join(' ');

  let boardIndex = 0;
  let floorIndex = 0;
  let squareX = 2;
  let deltaEnd = 2;
  let dependentX = 2.5;
  let rateX = 2.5;
  let stepIndex = 0;
  let exerciseOpen = false;
  let picked = null;
  let attempts = 0;
  let feedback = '';
  let completed = {};
  let lastKey = '';
  let finished = false;
  let hydrated = false;
  let pointerStart = null;

  $: board = boards[boardIndex];
  $: floorData = board?.floors[floorIndex] || { text: '' };
  $: floor = floorData.text || '';
  $: exercise = floorData.exercise || null;
  // Note: do not derive a `cleared` value with `$:`. clearSetControl() assigns
  // `completed` from inside a reactive block, and a derived alias computed earlier
  // in the same update pass would keep a stale value. Read completed[exerciseKey].
  $: exerciseKey = `${boardIndex}:${floorIndex}`;
  $: controlValue = [squareX, deltaEnd, dependentX, rateX, stepIndex][boardIndex];
  // 1.5 -> 74px, 3.5 -> 152px. No cap: the old max-width froze the square above
  // x = 3.0 while the readout kept climbing, which contradicted the lesson.
  $: squareSize = 74 + (squareX - 1.5) * 39;
  $: deltaX = deltaEnd - 2;
  // Use a real minus sign, not a hyphen: BB2 section 5 teaches what that sign records.
  $: deltaXLabel = deltaX.toFixed(1).replace('-', '−');
  $: dependentY = dependentX * dependentX;
  $: dependentDeltaY = dependentY - 4;
  $: rateDeltaX = rateX - 2;
  $: rateDeltaY = rateX * rateX - 4;
  $: averageRate = rateDeltaX ? rateDeltaY / rateDeltaX : 4;
  $: step = stepOptions[stepIndex];
  $: localRate = 4 + step;
  $: secantEndX = 160 + step * 60;
  $: secantEndY = 144 - (4 * step + step * step) * 8.5;

  // Reset the per-question state whenever the learner moves to another floor.
  $: if (exerciseKey !== lastKey) {
    lastKey = exerciseKey;
    exerciseOpen = false;
    picked = null;
    attempts = 0;
    feedback = '';
  }

  // A set-control exercise is answered with the board's own slider. This must not
  // read exerciseCleared: that would make completed -> exerciseCleared -> completed
  // a cycle, and the cleared state would never reach the Continue button.
  $: if (exerciseOpen && exercise && exercise.kind === 'set-control'
      && setControlSatisfied(exercise, controlValue)) {
    clearSetControl();
  }

  onMount(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('qubix-university-variables-rates-v3') || 'null');
      if (saved && Number.isInteger(saved.boardIndex) && saved.boardIndex >= 0 && saved.boardIndex < boards.length) {
        boardIndex = saved.boardIndex;
        floorIndex = Math.min(saved.floorIndex || 0, boards[boardIndex].floors.length - 1);
        completed = saved.completed && typeof saved.completed === 'object' ? saved.completed : {};
      }
    } catch (_) {}
    hydrated = true;
  });

  $: if (hydrated) {
    try {
      localStorage.setItem('qubix-university-variables-rates-v3', JSON.stringify({ boardIndex, floorIndex, completed }));
    } catch (_) {}
  }

  function advance() {
    // A floor with an unanswered exercise opens it instead of moving on.
    if (exercise && !completed[exerciseKey]) {
      // If the control already happens to satisfy the task, the learner would
      // get it for free. Wind it back so the task is always real work.
      if (exercise.kind === 'set-control' && setControlSatisfied(exercise, controlValue)) {
        setControl(exercise.from);
      }
      exerciseOpen = true;
      return;
    }
    exerciseOpen = false;
    if (floorIndex < board.floors.length - 1) {
      floorIndex += 1;
      return;
    }
    if (boardIndex < boards.length - 1) {
      boardIndex += 1;
      floorIndex = 0;
      return;
    }
    finished = true;
  }

  function retreat() {
    if (exerciseOpen) {
      exerciseOpen = false;
      picked = null;
      return;
    }
    if (floorIndex > 0) {
      floorIndex -= 1;
      return;
    }
    if (boardIndex > 0) {
      boardIndex -= 1;
      floorIndex = boards[boardIndex].floors.length - 1;
    }
  }

  function chooseOption(option) {
    if (completed[exerciseKey]) return;
    picked = option.label;
    attempts += 1;
    if (option.correct) {
      markCleared(exercise.successNote);
    } else if (attempts === 1) {
      feedback = option.feedback || 'Not quite. Try once more.';
    } else {
      markCleared(exercise.revealNote || exercise.successNote);
    }
  }

  function markCleared(message) {
    completed = { ...completed, [exerciseKey]: true };
    feedback = message || '';
  }

  // A set-control exercise is satisfied either by landing on a target value or by
  // pushing the control past a bound, which is how "make Δx negative" is expressed.
  function setControlSatisfied(ex, value) {
    if (typeof ex.below === 'number') return value < ex.below;
    if (typeof ex.above === 'number') return value > ex.above;
    return Math.abs(value - ex.target) <= (ex.tolerance ?? 0.05);
  }

  // Each board is driven by one control; this writes back to the current one.
  function setControl(value) {
    if (value == null) return;
    if (boardIndex === 0) squareX = value;
    else if (boardIndex === 1) deltaEnd = value;
    else if (boardIndex === 2) dependentX = value;
    else if (boardIndex === 3) rateX = value;
    else stepIndex = value;
  }

  function clearSetControl() {
    if (completed[exerciseKey]) return;
    markCleared(exercise.successNote);
  }

  function restart() {
    boardIndex = 0;
    floorIndex = 0;
    exerciseOpen = false;
    picked = null;
    attempts = 0;
    feedback = '';
    completed = {};
    finished = false;
  }

  function handlePointerDown(event) {
    pointerStart = { x: event.clientX, y: event.clientY };
  }

  function handlePointerUp(event) {
    if (!pointerStart || exerciseOpen || finished) return;
    const dx = event.clientX - pointerStart.x;
    const dy = event.clientY - pointerStart.y;
    pointerStart = null;
    if (Math.abs(dx) < 52 || Math.abs(dx) < Math.abs(dy) * 1.4) return;
    if (dx < 0) advance();
    else retreat();
  }
</script>

<div class="qx-shell lab-view" on:pointerdown={handlePointerDown} on:pointerup={handlePointerUp}>
  <header class="lab-header">
    <div class="course-mark" aria-label="Course one">01</div>
    <div class="brand-lockup">
      <span class="brand">QUBIX UNIVERSITY</span>
      <span class="lab-name">Variables and rates of change</span>
    </div>
    <button class="icon-btn" aria-label="Toggle colour theme" on:click={() => theme.toggle()}>
      {#if $theme === 'dark'}
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41"/></svg>
      {:else}
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
      {/if}
    </button>
  </header>

  {#if finished}
    <main class="complete-screen">
      <div class="complete-mark" aria-hidden="true">✓</div>
      <span class="micro-label">INTRODUCTION COMPLETE</span>
      <h1>You calculated an<br/>instantaneous rate of change.</h1>
      <p>Five small moves. Variable, change, dependence, average rate, local rate.</p>
      <div class="summary-chain" aria-label="Concept sequence">
        <span>x</span><i>→</i><span>Δx</span><i>→</i><span>Δy</span><i>→</i><span>Δy/Δx</span><i>→</i><span>4</span>
      </div>
      <button class="primary wide" on:click={restart}>Begin again</button>
    </main>
  {:else}
    <section class="progress-wrap" aria-label={`Section ${boardIndex + 1} of ${boards.length}`}>
      <div class="progress-copy">
        <span>Section {boardIndex + 1} of {boards.length}</span>
        <span>{Math.round(((boardIndex + floorIndex / board.floors.length) / boards.length) * 100)}%</span>
      </div>
      <div class="segments">
        {#each boards as _, index}
          <span class:complete={index < boardIndex} class:active={index === boardIndex}></span>
        {/each}
      </div>
    </section>

    <main class="board-card">
      <div class="board-heading">
          <span class="micro-label">{board.marker}</span>
          <h1>{board.title}</h1>
        </div>

        <div class="stage" aria-live="polite">
          {#if boardIndex === 0}
            <!-- BB1 under fork F-2: figures and letters, then a value assigned,
                 then a value replaced, then a value that measures something. -->
            {#if floorIndex === 0}
              <div class="symbol-rows">
                <div class="symbol-row">
                  <small>FIGURES</small>
                  {#each ['1', '2', '3', '7'] as figure}<span class="symbol fig">{figure}</span>{/each}
                </div>
                <div class="symbol-row">
                  <small>LETTERS</small>
                  {#each ['x', 'y', 'z'] as letter}<span class="symbol let">{letter}</span>{/each}
                </div>
              </div>
            {:else if floorIndex === 1}
              <div class="pair-stage">
                <span class="assign-card sym">x</span>
                <span class="assign-joiner" aria-hidden="true"></span>
                <span class="assign-card val">{Number(squareX).toFixed(1)}</span>
              </div>
            {:else if floorIndex === 2}
              <div class="assign-stage">
                <div class="assign-card ghost">x = 2.0</div>
                <div class="assign-card live">x = {Number(squareX).toFixed(1)}</div>
              </div>
            {:else}
              <div class="square-stage">
                <div class="square-figure">
                  <div class="square" style={`width:${squareSize}px;height:${squareSize}px`}></div>
                  <span class="edge-label" style={`width:${squareSize}px`} aria-hidden="true">x</span>
                </div>
                <div class="value-readout"><small>CURRENT VALUE</small><strong>x = {Number(squareX).toFixed(1)}</strong><span>cm</span></div>
              </div>
            {/if}
            {#if floorIndex >= 1}
              <label class="range-row">
                <span>1.5</span>
                <input aria-label="Assign a value to x" type="range" min="1.5" max="3.5" step="0.1" bind:value={squareX}/>
                <span>3.5</span>
              </label>
            {/if}
          {:else if boardIndex === 1}
            <div class="number-stage">
              <svg viewBox="0 0 320 128" role="img" aria-label={`Number line from 1 to 3. Current x is ${deltaEnd}`}>
                <path class="axis" d="M28 72H292"/>
                {#each [1, 1.5, 2, 2.5, 3] as tick}
                  <path class="tick" d={`M${28 + (tick - 1) * 132} 65v14`}/>
                  <text x={28 + (tick - 1) * 132} y="98">{tick}</text>
                {/each}
                <circle class="old-dot" cx="160" cy="72" r="6"/>
                {#if floorIndex >= 1}
                  <path class="move-line" d={`M160 46 H${28 + (deltaEnd - 1) * 132}`}/>
                {/if}
                <circle class="new-dot" cx={28 + (deltaEnd - 1) * 132} cy="72" r="8"/>
              </svg>
              <!-- The notation appears only once the sequence has introduced it:
                   the value alone, then the change in words, then Δx. -->
              {#if floorIndex === 0}
                <div class="equation-strip"><span>x</span><strong>=</strong><b>{deltaEnd.toFixed(1)}</b></div>
              {:else if floorIndex < 3}
                <div class="equation-strip"><span class="word">change</span><strong>= {deltaEnd.toFixed(1)} − 2.0</strong><b>= {deltaXLabel}</b></div>
              {:else}
                <div class="equation-strip"><span>Δx</span><strong>= {deltaEnd.toFixed(1)} − 2.0</strong><b>= {deltaXLabel}</b></div>
              {/if}
            </div>
            <label class="range-row">
              <span>1.2</span>
              <input aria-label="Choose the new x value" type="range" min="1.2" max="3" step="0.1" bind:value={deltaEnd}/>
              <span>3.0</span>
            </label>
          {:else if boardIndex === 2}
            <div class="paired-stage">
              <div class="pair old-pair">
                <div class="area-square old-area"><span>4</span></div>
                <small>x = 2</small>
              </div>
              <svg class="pair-arrow" viewBox="0 0 52 30" aria-hidden="true"><path d="M2 15h42M38 8l7 7-7 7"/></svg>
              <div class="pair">
                <div class="area-square new-area" style={`width:${76 + (dependentX - 2) * 38}px;height:${76 + (dependentX - 2) * 38}px`}><span>{dependentY.toFixed(2)}</span></div>
                <small>x = {dependentX.toFixed(1)}</small>
              </div>
            </div>
            <div class="delta-pills"><span>Δx = {(dependentX - 2).toFixed(1)}</span><span>Δy = {dependentDeltaY.toFixed(2)}</span></div>
            <label class="range-row">
              <span>2.1</span>
              <input aria-label="Change the square side" type="range" min="2.1" max="3" step="0.1" bind:value={dependentX}/>
              <span>3.0</span>
            </label>
          {:else if boardIndex === 3}
            <div class="rate-stage">
              <div class="rate-fraction">
                <div><small>AREA CHANGE</small><strong>{rateDeltaY.toFixed(2)}</strong></div>
                <span class="fraction-line"></span>
                <div><small>SIDE CHANGE</small><strong>{rateDeltaX.toFixed(2)}</strong></div>
              </div>
              <div class="equals">=</div>
              <div class="rate-answer"><strong>{averageRate.toFixed(2)}</strong><small>cm² / cm</small></div>
            </div>
            <label class="range-row">
              <span>2.1</span>
              <input aria-label="Change the comparison endpoint" type="range" min="2.1" max="3.5" step="0.1" bind:value={rateX}/>
              <span>3.5</span>
            </label>
          {:else}
            <div class="curve-stage">
              <svg viewBox="0 0 320 205" role="img" aria-label={`Parabola with a secant interval of ${step}`}>
                <path class="gridline" d="M40 178H296M40 178V22"/>
                <polyline class="curve" points={parabolaPoints}/>
                <path class="secant" d={`M160 144 L${secantEndX} ${secantEndY}`}/>
                <circle class="fixed-point" cx="160" cy="144" r="6"/>
                <circle class="moving-point" cx={secantEndX} cy={secantEndY} r="7"/>
                <text x="145" y="167">x = 2</text>
              </svg>
              <div class="local-readout"><small>INTERVAL</small><strong>Δx = {step}</strong><span>rate {localRate.toFixed(step < 0.01 ? 3 : step < 0.1 ? 2 : 1)}</span></div>
            </div>
            <label class="range-row discrete">
              <span>wide</span>
              <input aria-label="Shrink the interval" type="range" min="0" max="4" step="1" bind:value={stepIndex}/>
              <span>close</span>
            </label>
          {/if}
        </div>

        <section class="floor-copy">
          <div class="floor-dots" aria-label={`Depth ${floorIndex + 1} of ${board.floors.length}`}>
            {#each board.floors as _, index}
              <span class:active={index === floorIndex} class:read={index < floorIndex} class:checked={completed[`${boardIndex}:${index}`]}></span>
            {/each}
          </div>

          {#if exerciseOpen && exercise}
            <div class="exercise" aria-live="polite">
              <div class="check-topline">
                <span>QUICK CHECK</span>
                <span>Section {floorIndex + 1} of {board.floors.length}</span>
              </div>

              {#if exercise.visual === 'symbol-value'}
                <div class="check-visual" aria-hidden="true">
                  <div class="mini-square old">variable<span>x = 2</span></div>
                  <svg viewBox="0 0 54 24"><path d="M2 12h46M42 6l6 6-6 6"/></svg>
                  <div class="mini-square fresh">variable<span>x = 3</span></div>
                </div>
              {/if}

              <p class="exercise-prompt">{exercise.prompt}</p>

              {#if exercise.kind === 'choice'}
                <div class="check-options">
                  {#each exercise.options as option}
                    <button
                      disabled={completed[exerciseKey]}
                      class:correct={completed[exerciseKey] && option.correct}
                      class:missed={picked === option.label && !option.correct}
                      on:click={() => chooseOption(option)}>{option.label}</button>
                  {/each}
                </div>
              {/if}

              {#if feedback}
                <div class="feedback" class:success={completed[exerciseKey]}>{feedback}</div>
              {/if}
            </div>
          {:else}
            <p>{floor}</p>
          {/if}
        </section>

        <div class="board-actions">
          <button class="secondary" on:click={retreat} disabled={boardIndex === 0 && floorIndex === 0 && !exerciseOpen} aria-label="Previous step">
            <svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button class="primary" on:click={advance} disabled={exerciseOpen && !completed[exerciseKey]}>
            {#if exerciseOpen}
              Continue
            {:else if exercise && !completed[exerciseKey]}
              Check
            {:else if floorIndex < board.floors.length - 1}
              Continue
            {:else if boardIndex === boards.length - 1}
              Finish
            {:else}
              Next section
            {/if}
            <svg viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
    </main>

    <p class="swipe-note">Swipe sideways or use the buttons</p>
  {/if}
</div>

<style>
  .lab-view {
    height: 100%; width: 100%; overflow-y: auto; padding: max(14px, env(safe-area-inset-top)) 16px max(18px, env(safe-area-inset-bottom));
    display: flex; flex-direction: column; gap: 12px;
  }
  button, input { font: inherit; }
  button { -webkit-tap-highlight-color: transparent; }
  .lab-header { display: grid; grid-template-columns: 42px 1fr 42px; align-items: center; min-height: 46px; }
  .brand-lockup { display: flex; flex-direction: column; align-items: center; gap: 2px; }
  .brand { color: var(--qx-accent); font-size: 11px; font-weight: 900; letter-spacing: .17em; }
  .lab-name { color: var(--qx-text-dim); font-size: 12px; font-weight: 700; }
  .course-mark { width: 40px; height: 40px; border-radius: 50%; border: 1px solid var(--qx-border); background: var(--qx-surface); color: var(--qx-accent-text); display: grid; place-items: center; font-size: 11px; font-weight: 900; letter-spacing: .04em; }
  .icon-btn { width: 40px; height: 40px; border-radius: 50%; border: 1px solid var(--qx-border); background: var(--qx-surface); color: var(--qx-text); display: grid; place-items: center; cursor: pointer; }
  .icon-btn svg, .board-actions svg { width: 20px; height: 20px; fill: none; stroke: currentColor; stroke-width: 2.1; stroke-linecap: round; stroke-linejoin: round; }
  .progress-wrap { padding: 2px 4px; }
  .progress-copy { display: flex; justify-content: space-between; color: var(--qx-text-dim); font-size: 11px; font-weight: 800; margin-bottom: 7px; }
  .segments { display: grid; grid-template-columns: repeat(5, 1fr); gap: 5px; }
  .segments span { height: 4px; border-radius: 9px; background: var(--qx-surface-3); transition: background .2s, transform .2s; }
  .segments span.complete { background: var(--qx-green); }
  .segments span.active { background: var(--qx-accent); transform: scaleY(1.35); }
  .board-card { flex: 1 0 auto; min-height: 610px; background: var(--qx-surface); border: 1px solid var(--qx-border); border-radius: 24px; box-shadow: var(--qx-shadow-card); padding: 21px 18px 18px; display: flex; flex-direction: column; }
  .board-heading { margin-bottom: 13px; }
  .micro-label { color: var(--qx-accent-text); font-size: 10px; line-height: 1; letter-spacing: .13em; font-weight: 900; text-transform: uppercase; }
  h1 { color: var(--qx-text); font-size: 27px; line-height: 1.08; letter-spacing: -.035em; margin-top: 7px; }
  .stage { min-height: 300px; flex-shrink: 0; border-radius: 18px; border: 1px solid var(--qx-border); background: var(--qx-surface-2); padding: 17px 14px 13px; display: flex; flex-direction: column; justify-content: center; position: relative; overflow: hidden; }
  .range-row { display: grid; grid-template-columns: 28px 1fr 28px; align-items: center; gap: 8px; color: var(--qx-text-faint); font-size: 10px; font-weight: 800; width: 100%; margin-top: 13px; }
  .range-row span:last-child { text-align: right; }
  input[type='range'] { width: 100%; accent-color: var(--qx-accent); cursor: pointer; }
  .square-stage { min-height: 215px; display: grid; grid-template-columns: 1fr 126px; align-items: center; gap: 10px; }
  .square-figure { justify-self: center; display: flex; flex-direction: column; align-items: center; gap: 8px; }
  .symbol-rows { display: flex; flex-direction: column; gap: 14px; justify-content: center; }
  .symbol-row { display: flex; align-items: center; gap: 8px; }
  .symbol-row small { width: 62px; font-size: 9px; letter-spacing: .11em; font-weight: 900; color: var(--qx-text-faint); }
  .symbol { min-width: 42px; height: 46px; padding: 0 11px; border-radius: 10px; border: 1px solid var(--qx-border-2); background: var(--qx-surface); display: inline-flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 900; }
  .symbol.let { font: italic 800 22px/1 Georgia, serif; color: var(--qx-accent-text); border-style: dashed; }
  .pair-stage, .assign-stage { display: flex; align-items: center; justify-content: center; gap: 12px; min-height: 150px; }
  .assign-card { border: 2px solid var(--qx-accent); background: var(--qx-accent-soft); color: var(--qx-accent-text); border-radius: 13px; padding: 16px 22px; font-size: 26px; font-weight: 900; }
  .assign-card.sym { font: italic 800 30px/1 Georgia, serif; }
  .assign-card.val { background: var(--qx-surface); border-color: var(--qx-border-2); color: var(--qx-text); }
  .assign-card.ghost { border-style: dashed; border-color: var(--qx-border-2); background: transparent; color: var(--qx-text-faint); font-size: 18px; padding: 11px 16px; }
  .assign-joiner { width: 34px; height: 1px; background: var(--qx-border-2); }
  .square { border: 3px solid var(--qx-accent); background: var(--qx-accent-soft); border-radius: 5px; transition: width .12s, height .12s; }
  .edge-label { display: flex; align-items: center; justify-content: center; gap: 9px; font: italic 800 26px/1 Georgia, serif; color: var(--qx-accent-text); transition: width .12s; }
  .edge-label::before, .edge-label::after { content: ''; flex: 1; height: 1px; background: var(--qx-border-2); }
  .value-readout, .local-readout { border-left: 1px solid var(--qx-border-2); padding-left: 15px; display: flex; flex-direction: column; gap: 3px; }
  .value-readout small, .local-readout small, .rate-fraction small, .rate-answer small { font-size: 9px; font-weight: 900; letter-spacing: .11em; color: var(--qx-text-faint); }
  .value-readout strong, .local-readout strong { font-size: 23px; color: var(--qx-text); }
  .value-readout span, .local-readout span { font-size: 12px; color: var(--qx-text-dim); }
  .number-stage svg { width: 100%; height: 165px; overflow: visible; }
  .number-stage .axis, .number-stage .tick { fill: none; stroke: var(--qx-text-dim); stroke-width: 2; stroke-linecap: round; }
  .number-stage text { fill: var(--qx-text-dim); font-size: 11px; text-anchor: middle; font-weight: 700; }
  .old-dot { fill: var(--qx-text-faint); }
  .new-dot { fill: var(--qx-accent); stroke: var(--qx-surface); stroke-width: 3; }
  .move-line { fill: none; stroke: var(--qx-accent); stroke-width: 3; stroke-linecap: round; }
  .equation-strip { display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 8px; background: var(--qx-surface); border: 1px solid var(--qx-border); border-radius: 13px; padding: 12px 14px; }
  .equation-strip span { color: var(--qx-accent-text); font-weight: 900; }
  .equation-strip span.word { font-size: 10px; letter-spacing: .11em; text-transform: uppercase; }
  .equation-strip strong { font-size: 14px; }
  .equation-strip b { color: var(--qx-green-text); }
  .paired-stage { min-height: 185px; display: flex; align-items: center; justify-content: center; gap: 12px; }
  .pair { display: flex; flex-direction: column; align-items: center; justify-content: flex-end; gap: 8px; min-width: 84px; min-height: 140px; }
  .pair small { color: var(--qx-text-dim); font-weight: 800; }
  .area-square { display: grid; place-items: center; border-radius: 5px; transition: width .12s, height .12s; }
  .old-area { width: 76px; height: 76px; border: 2px solid var(--qx-text-faint); background: var(--qx-surface-3); }
  .new-area { max-width: 122px; max-height: 122px; border: 3px solid var(--qx-green); background: var(--qx-green-soft); }
  .area-square span { font-size: 18px; font-weight: 900; color: var(--qx-text); }
  .pair-arrow { width: 42px; fill: none; stroke: var(--qx-accent); stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; }
  .delta-pills { display: flex; justify-content: center; gap: 8px; }
  .delta-pills span { border-radius: 99px; padding: 7px 11px; background: var(--qx-surface); border: 1px solid var(--qx-border); color: var(--qx-text-2); font-size: 12px; font-weight: 800; }
  .delta-pills span:last-child { color: var(--qx-green-text); }
  .rate-stage { min-height: 225px; display: flex; align-items: center; justify-content: center; gap: 16px; }
  .rate-fraction { width: 116px; display: flex; flex-direction: column; gap: 8px; }
  .rate-fraction div { display: flex; justify-content: space-between; align-items: end; gap: 8px; }
  .rate-fraction strong { font-size: 22px; }
  .fraction-line { height: 2px; background: var(--qx-text); border-radius: 2px; }
  .equals { color: var(--qx-text-faint); font-size: 24px; }
  .rate-answer { width: 98px; height: 98px; border-radius: 50%; background: var(--qx-accent-soft); border: 2px solid var(--qx-accent); display: flex; flex-direction: column; align-items: center; justify-content: center; }
  .rate-answer strong { color: var(--qx-accent-text); font-size: 27px; }
  .rate-answer small { margin-top: 2px; letter-spacing: 0; }
  .curve-stage { min-height: 230px; display: grid; grid-template-columns: minmax(0, 1fr) 108px; align-items: center; }
  .curve-stage svg { width: 100%; height: 210px; overflow: visible; }
  .gridline { fill: none; stroke: var(--qx-border-2); stroke-width: 1.5; }
  .curve { fill: none; stroke: var(--qx-text-dim); stroke-width: 3; stroke-linecap: round; }
  .secant { fill: none; stroke: var(--qx-accent); stroke-width: 3; stroke-linecap: round; }
  .fixed-point { fill: var(--qx-green); stroke: var(--qx-surface-2); stroke-width: 3; }
  .moving-point { fill: var(--qx-accent); stroke: var(--qx-surface-2); stroke-width: 3; }
  .curve-stage text { fill: var(--qx-text-dim); font-size: 10px; font-weight: 800; }
  .floor-copy { padding: 15px 4px 5px; min-height: 122px; flex-shrink: 0; }
  .floor-dots { display: flex; gap: 5px; margin-bottom: 11px; }
  .floor-dots span { width: 7px; height: 7px; border-radius: 50%; background: var(--qx-surface-3); }
  .floor-dots span.read { background: var(--qx-green); }
  .floor-dots span.active { background: var(--qx-accent); transform: scale(1.22); }
  .floor-copy p { color: var(--qx-text-2); font-size: 17px; line-height: 1.53; font-weight: 550; }
  .board-actions { margin-top: auto; display: grid; grid-template-columns: 48px 1fr; gap: 9px; }
  .primary, .secondary { border: 0; cursor: pointer; font-weight: 900; }
  .primary { min-height: 48px; border-radius: 14px; background: var(--qx-accent); color: #fffaf2; display: flex; align-items: center; justify-content: center; gap: 8px; padding: 0 18px; }
  .primary svg { width: 18px; }
  .secondary { border-radius: 14px; border: 1px solid var(--qx-border-2); background: var(--qx-surface-2); color: var(--qx-text); display: grid; place-items: center; }
  .secondary:disabled { opacity: .32; cursor: default; }
  .wide { width: 100%; }
  .swipe-note { text-align: center; color: var(--qx-text-faint); font-size: 10px; font-weight: 700; padding-bottom: 2px; }
  .exercise { display: flex; flex-direction: column; gap: 12px; }
  .exercise-prompt { color: var(--qx-text); font-size: 17px; line-height: 1.45; font-weight: 800; }
  .check-topline { display: flex; justify-content: space-between; color: var(--qx-accent-text); font-size: 10px; letter-spacing: .12em; font-weight: 900; }
  .check-topline span:last-child { color: var(--qx-text-faint); letter-spacing: 0; }
  .check-visual { min-height: 116px; display: flex; align-items: center; justify-content: center; gap: 16px; background: var(--qx-surface-2); border: 1px solid var(--qx-border); border-radius: 18px; padding: 10px; }
  .check-visual svg { width: 44px; fill: none; stroke: var(--qx-accent); stroke-width: 2.3; stroke-linecap: round; stroke-linejoin: round; }
  .mini-square { display: flex; flex-direction: column; align-items: center; justify-content: center; border-radius: 6px; font-size: 12px; font-weight: 900; color: var(--qx-text-dim); }
  .mini-square span { color: var(--qx-text); font-size: 23px; }
  .mini-square.old { width: 78px; height: 78px; border: 2px solid var(--qx-text-faint); }
  .mini-square.fresh { width: 100px; height: 100px; border: 3px solid var(--qx-green); background: var(--qx-green-soft); }
  .check-options { display: grid; grid-template-columns: 1fr; gap: 8px; }
  .check-options button { min-height: 48px; border-radius: 13px; border: 1px solid var(--qx-border-2); background: var(--qx-surface-2); color: var(--qx-text); font-size: 16px; font-weight: 800; cursor: pointer; padding: 8px 14px; text-align: left; }
  .check-options button.correct { border-color: var(--qx-green); background: var(--qx-green-soft); color: var(--qx-green-text); }
  .check-options button.missed { border-color: var(--qx-danger); }
  .check-options button:disabled { cursor: default; }
  .primary:disabled { opacity: .38; cursor: default; }
  .floor-dots span.checked { background: var(--qx-green); }
  .feedback { padding: 12px 13px; border-radius: 12px; background: var(--qx-danger-soft); color: var(--qx-danger-text); font-size: 13px; line-height: 1.45; font-weight: 750; }
  .feedback.success { background: var(--qx-green-soft); color: var(--qx-green-text); }
  .complete-screen { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 30px 20px; }
  .complete-mark { width: 72px; height: 72px; border-radius: 50%; display: grid; place-items: center; background: var(--qx-green-soft); border: 2px solid var(--qx-green); color: var(--qx-green-text); font-size: 34px; font-weight: 900; margin-bottom: 22px; }
  .complete-screen h1 { font-size: 34px; margin: 10px 0 14px; }
  .complete-screen p { color: var(--qx-text-2); line-height: 1.55; max-width: 33ch; }
  .summary-chain { margin: 28px 0; display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 7px; }
  .summary-chain span { padding: 7px 9px; border-radius: 9px; background: var(--qx-surface); border: 1px solid var(--qx-border); color: var(--qx-text); font-weight: 900; }
  .summary-chain i { color: var(--qx-accent); font-style: normal; }
  .complete-screen .primary { max-width: 280px; }
  @media (max-height: 760px) {
    .board-card { min-height: 560px; }
    .stage { min-height: 250px; }
    .square-stage, .rate-stage { min-height: 170px; }
    .curve-stage { min-height: 185px; }
    .curve-stage svg { height: 175px; }
    .floor-copy { min-height: 105px; }
  }
  @media (max-width: 370px) {
    .lab-view { padding-left: 10px; padding-right: 10px; }
    .board-card { padding-left: 14px; padding-right: 14px; }
    .stage { padding-left: 10px; padding-right: 10px; }
    .curve-stage { grid-template-columns: minmax(0, 1fr) 91px; }
    .floor-copy p { font-size: 16px; }
  }
</style>
