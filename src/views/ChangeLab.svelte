<script>
  import { onMount, onDestroy } from 'svelte';
  import { get } from 'svelte/store';
  import { theme } from '../lib/stores/theme.js';
  import { boards, declaredBoards } from '../lib/content/course.js';
  import Stage from '../lib/components/Stage.svelte';
  import { progress, xpSummary } from '../lib/stores/progress.js';

  // Closest first. The slider then reads the natural way round: dragging right
  // drives the two points further apart instead of shrinking the gap.
  const stepOptions = [0.001, 0.01, 0.1, 0.5, 1];
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
  let exIndex = 0;
  let stepCleared = false;   // current check within the section
  let heldItem = null;       // match: item picked up
  let placedItems = {};      // match: label -> bin
  let orderState = [];       // order: current arrangement
  let picked = null;
  let attempts = 0;
  let feedback = '';
  let completed = {};
  let lastKey = '';
  let finished = false;
  let hydrated = false;
  let pointerStart = null;
  let previousXP = null;
  let xpGain = 0;
  let xpTimer = null;

  $: board = boards[boardIndex];
  $: floorData = board?.floors[floorIndex] || { text: '' };
  $: floor = floorData.text || '';
  // A section may carry more than one check. The founder kept two on BB2 S1, so
  // one-per-section was my assumption rather than a rule.
  $: exercises = floorData.exercises || (floorData.exercise ? [floorData.exercise] : []);
  $: exercise = exercises[exIndex] || null;
  $: orderRows = orderState.length ? orderState : (exercise?.items?.map((_, i) => i) ?? []);
  // Note: do not derive a `cleared` value with `$:`. clearSetControl() assigns
  // `completed` from inside a reactive block, and a derived alias computed earlier
  // in the same update pass would keep a stale value. Read completed[exerciseKey].
  $: exerciseKey = `${boardIndex}:${floorIndex}`;
  // The hardcoded stages and the per-board control variables are keyed to the
  // declared boards, so they must be looked up by position within THAT list.
  // Using boardIndex here broke the moment Factory boards were inserted in the
  // middle: board 3 stopped being the rate board.
  $: declaredIndex = declaredBoards.indexOf(board);
  $: controlValue = [squareX, deltaEnd, dependentX, rateX, stepIndex][declaredIndex];
  // 1.5 -> 74px, 3.5 -> 152px. No cap: the old max-width froze the square above
  // x = 3.0 while the readout kept climbing, which contradicted the lesson.
  $: squareSize = 74 + (squareX - 1.5) * 39;
  $: deltaX = deltaEnd - 2;
  // Use a real minus sign, not a hyphen: BB2 section 5 teaches what that sign records.
  $: deltaXLabel = deltaX.toFixed(1).replace('-', '−');
  $: newAreaSize = 76 + (dependentX - 2) * 38;
  // The growth band, in SVG units, at the same scale as the 104px base square.
  $: growSize = (dependentX - 2) * 52;
  $: dependentY = dependentX * dependentX;
  $: dependentDeltaY = dependentY - 4;
  $: rateDeltaX = rateX - 2;
  $: rateDeltaY = rateX * rateX - 4;
  $: averageRate = rateDeltaX ? rateDeltaY / rateDeltaX : 4;
  $: step = stepOptions[stepIndex];
  $: localRate = 4 + step;
  $: secantEndX = 160 + step * 60;
  $: secantEndY = 144 - (4 * step + step * step) * 8.5;
  // At the closest setting the two points coincide, so a segment drawn between
  // them would be invisible. Extend the line through both instead: it still
  // passes through them when they are apart, and reads as the tangent when not.
  $: secantRise = localRate * 8.5 / 60 * 80;
  $: secantPath = `M80 ${(144 + secantRise).toFixed(1)} L240 ${(144 - secantRise).toFixed(1)}`;

  // Reset the per-question state whenever the learner moves to another floor.
  $: if (exerciseKey !== lastKey) {
    lastKey = exerciseKey;
    exerciseOpen = false;
    exIndex = 0;
    resetCheck();
  }

  function resetCheck() {
    stepCleared = false;
    picked = null;
    attempts = 0;
    feedback = '';
    heldItem = null;
    placedItems = {};
    // Shuffled so it never opens already solved.
    const ex = exercises[exIndex];
    orderState = ex && ex.kind === 'order'
      ? ex.items.map((_, i) => i).slice().reverse()
      : [];
  }

  // A set-control exercise is answered with the board's own slider. This must not
  // read exerciseCleared: that would make completed -> exerciseCleared -> completed
  // a cycle, and the cleared state would never reach the Continue button.
  $: if (exerciseOpen && exercise && exercise.kind === 'set-control'
      && !stepCleared && setControlSatisfied(exercise, controlValue)) {
    markCleared(exercise.successNote);
  }

  // Position and completion now live in the progress store, which owns the
  // storage key and also records attempt quality for a later recall view.
  onMount(() => {
    const saved = get(progress);
    if (Number.isInteger(saved.boardIndex) && saved.boardIndex >= 0 && saved.boardIndex < boards.length) {
      boardIndex = saved.boardIndex;
      floorIndex = Math.min(saved.floorIndex || 0, boards[boardIndex].floors.length - 1);
      completed = saved.completed && typeof saved.completed === 'object' ? { ...saved.completed } : {};
    }
    hydrated = true;
  });

  $: if (hydrated) progress.setPosition(boardIndex, floorIndex);
  $: if (hydrated) progress.setCompleted(completed);
  $: if (hydrated) {
    const totalXP = $xpSummary.total;
    if (previousXP !== null && totalXP > previousXP) {
      xpGain = totalXP - previousXP;
      clearTimeout(xpTimer);
      xpTimer = setTimeout(() => { xpGain = 0; }, 2200);
    }
    previousXP = totalXP;
  }

  onDestroy(() => clearTimeout(xpTimer));

  function advance() {
    // A floor with unanswered checks opens them instead of moving on, and works
    // through them in order before the section is counted as done.
    if (exercises.length && !completed[exerciseKey]) {
      if (!exerciseOpen) {
        exIndex = 0;
        resetCheck();
        primeSetControl();
        exerciseOpen = true;
        return;
      }
      if (exIndex < exercises.length - 1) {
        exIndex += 1;
        resetCheck();
        primeSetControl();
        return;
      }
      completed = { ...completed, [exerciseKey]: true };
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

  function chooseBoard(event) {
    const next = Number(event.currentTarget.value);
    if (!Number.isInteger(next) || next < 0 || next >= boards.length) return;
    boardIndex = next;
    floorIndex = 0;
    exerciseOpen = false;
    finished = false;
  }

  function chooseOption(option) {
    if (stepCleared) return;
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

  // Stepper: plus and minus rather than a slider, so a value is chosen rather
  // than swept. It drives the board's own control, so the stage and the stepper
  // are the same number. Keeping a private value produced two different figures
  // on screen both labelled x, and stepping moved nothing.
  function stepBy(delta) {
    if (stepCleared) return;
    const next = Math.min(exercise.max, Math.max(exercise.min, Number((controlValue + delta * exercise.step).toFixed(4))));
    setControl(next);
    if (Math.abs(next - exercise.target) < exercise.step / 2) markCleared(exercise.successNote);
  }

  // Match: tap an item, tap a bin. Tap-to-place works with a thumb; HTML5 drag
  // does not.
  function takeItem(label) {
    if (stepCleared) return;
    heldItem = heldItem === label ? null : label;
  }
  function placeItem(bin) {
    if (stepCleared || !heldItem) return;
    placedItems = { ...placedItems, [heldItem]: bin };
    heldItem = null;
    if (exercise.items.every(i => placedItems[i.label] === i.bin)) markCleared(exercise.successNote);
  }

  // A placement must be undoable. Without this one mistaken tap leaves the
  // section permanently unclearable, with no way back.
  // Order: arrows rather than drag, so it works with a thumb and with a keyboard.
  // orderRows must be a reactive value, not a function call in the template:
  // Svelte tracks dependencies where they are read, so a helper that reads
  // orderState inside its body leaves the list frozen on screen.
  function moveOrder(from, dir) {
    if (stepCleared) return;
    const list = [...orderRows];
    const to = from + dir;
    if (to < 0 || to >= list.length) return;
    [list[from], list[to]] = [list[to], list[from]];
    orderState = list;
    if (list.every((v, i) => v === i)) markCleared(exercise.successNote);
  }

  function unplaceItem(label) {
    if (stepCleared) return;
    const next = { ...placedItems };
    delete next[label];
    placedItems = next;
    heldItem = label;
  }

  function markCleared(message) {
    // Recorded but never shown: whether this took more than one attempt is the
    // only quality signal kept, and no score is derived from it yet.
    if (!stepCleared) {
      progress.recordAttempt(`${exerciseKey}:${exIndex}`, { tries: Math.max(attempts, 1), firstTime: attempts <= 1 });
    }
    stepCleared = true;
    feedback = message || '';
  }

  function primeSetControl() {
    const ex = exercises[exIndex];
    if (!ex) return;
    // A stepper starts from a declared value so the task is always real work
    // and the learner is never dropped onto the answer.
    if (ex.kind === 'stepper' && ex.start != null) setControl(ex.start);
    if (ex.kind === 'set-control' && setControlSatisfied(ex, controlValue)) setControl(ex.from);
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
    const d = declaredBoards.indexOf(boards[boardIndex]);
    if (d === 0) squareX = value;
    else if (d === 1) deltaEnd = value;
    else if (d === 2) dependentX = value;
    else if (d === 3) rateX = value;
    else if (d === 4) stepIndex = value;
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
    // A drag that begins on a control belongs to that control. Without this,
    // dragging the slider left is read as a swipe and navigates the deck.
    if (event.target.closest('input, button, label, a, select, textarea')) {
      pointerStart = null;
      return;
    }
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

<svelte:head>
  <title>Variables and Rates of Change | Qubix University</title>
  <meta name="description" content="An interactive mathematics pilot introducing variables, functions, coordinate geometry and rates of change." />
</svelte:head>

<div class="qx-shell lab-view" on:pointerdown={handlePointerDown} on:pointerup={handlePointerUp}>
  <header class="lab-header">
    <a class="topics-button" aria-label="Back to the Qubix academy" href="/"><span aria-hidden="true">←</span> Academy</a>
    <div class="brand-lockup">
      <span class="brand">QUBIX UNIVERSITY</span>
      <span class="lab-name">Mathematics and introductory physics</span>
    </div>
    <div class="lab-tools">
      <span class="xp-badge" aria-label={`${$xpSummary.total} experience points`}><b>{$xpSummary.total}</b> XP</span>
      <button class="icon-btn" aria-label="Toggle colour theme" on:click={() => theme.toggle()}>
        {#if $theme === 'dark'}
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41"/></svg>
        {:else}
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
        {/if}
      </button>
    </div>
  </header>

  {#if xpGain}<div class="xp-toast" role="status">+{xpGain} XP</div>{/if}

  {#if finished}
    <main class="complete-screen">
      <div class="complete-mark" aria-hidden="true">✓</div>
      <span class="micro-label">COURSE COMPLETE</span>
      <h1>You explored variables, functions,<br/>geometry, rates and force.</h1>
      <p>{boards.length} subtopics, from assigning a value to comparing force, mass and acceleration.</p>
      <strong class="complete-xp">{$xpSummary.total} XP earned</strong>
      <div class="summary-chain" aria-label="Concept sequence">
        <span>x</span><i>→</i><span>f(x)</span><i>→</i><span>(x, y)</span><i>→</i><span>Δy/Δx</span><i>→</i><span>F = ma</span>
      </div>
      <button class="primary wide" on:click={restart}>Begin again</button>
    </main>
  {:else}
    <section class="progress-wrap" aria-label={`Subtopic ${boardIndex + 1} of ${boards.length}`}>
      <label class="topic-selector">
        <span>SELECT SUBTOPIC</span>
        <select aria-label="Select a subtopic" value={boardIndex} on:change={chooseBoard}>
          {#each boards as subtopic, index}<option value={index}>{index + 1}. {subtopic.title}</option>{/each}
        </select>
      </label>
      <div class="progress-copy">
        <span>Subtopic {boardIndex + 1} of {boards.length} · section {floorIndex + 1} of {board.floors.length}</span>
        <span>{Math.round(((boardIndex + floorIndex / board.floors.length) / boards.length) * 100)}%</span>
      </div>
      <div class="segments" style={`grid-template-columns: repeat(${boards.length}, minmax(0, 1fr))`}>
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

        <!-- While a stepper check runs, the board's slider stands down: the task
             is to step, and leaving both on screen makes it bypassable. -->
        <div class="stage" class:stepping={exerciseOpen && exercise && exercise.kind === 'stepper'} aria-live="polite">
          {#if board.fromFactory}
            <!-- Built from the founder's Factory selections. The figure is
                 whatever variant was chosen for this section, or nothing at all
                 where the section was given a reading and no figure. -->
            {#each floorData.stages || [] as st (st.code)}
              <Stage stage={st}/>
            {/each}

          {:else if declaredIndex === 0}
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
          {:else if declaredIndex === 1 && floorIndex === 4}
            <!-- Section 5 is about direction, so zero sits at the centre and the
                 bar grows the way the change runs. Founder specification. -->
            <div class="signed-stage">
              <div class="signed-track">
                <span class="signed-axis"></span>
                <span class="signed-zero"></span>
                <span class="signed-fill" class:neg={deltaX < 0}
                  style={`width:${Math.min(48, Math.abs(deltaX) * 46)}%; ${deltaX < 0 ? 'right:50%' : 'left:50%'}`}></span>
              </div>
              <div class="signed-labels"><span>negative</span><span>0</span><span>positive</span></div>
              <div class="signed-read" class:neg={deltaX < 0}>
                Δx = {deltaEnd.toFixed(1)} − 2.0 = {deltaXLabel}
              </div>
            </div>
            <label class="range-row">
              <span>1.2</span>
              <input aria-label="Choose the new x value" type="range" min="1.2" max="3" step="0.1" bind:value={deltaEnd}/>
              <span>3.0</span>
            </label>
          {:else if declaredIndex === 1}
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
          {:else if declaredIndex === 2}
            <!-- x labels the side, y labels the interior. One square while the
                 two letters are being introduced; the pair only once there is a
                 change to compare. -->
            {#if floorIndex === 0}
              <div class="paired-stage">
                <div class="pair">
                  <div class="area-square new-area" style={`width:${newAreaSize}px;height:${newAreaSize}px`}><span>y = {dependentY.toFixed(2)}</span></div>
                  <span class="edge-label sm" style={`width:${newAreaSize}px`}>x = {dependentX.toFixed(1)}</span>
                </div>
              </div>
            {:else if floorIndex === 1}
              <!-- The rule as a step between the two, with both ends named: a
                   learner should not have to work out which figure is which. -->
              <div class="machine-stage">
                <span class="assign-card val">x = {dependentX.toFixed(1)}</span>
                <span class="machine-box">× itself</span>
                <span class="assign-card">y = {dependentY.toFixed(2)}</span>
              </div>
              <div class="role-cards">
                <span class="role-card"><b>x</b><em>you assign</em></span>
                <span class="role-card follows"><b>y</b><em>the rule settles</em></span>
              </div>
            {:else if floorIndex === 2}
              <div class="flow-stage">
                <span class="flow-card"><b>x = {dependentX.toFixed(1)}</b><em>INDEPENDENT · you set this</em></span>
                <span class="flow-arrow">{#key dependentX}<i></i>{/key}→</span>
                <span class="flow-card dep"><b>y = {dependentY.toFixed(2)}</b><em>DEPENDENT · this follows</em></span>
              </div>
            {:else}
              <!-- The growth region split into its parts: the original square,
                   the two strips along the sides, and the small corner. It shows
                   why the area gain outruns the side gain instead of reporting it. -->
              <div class="decomp-stage">
                <!-- base square x², a strip along the top and one along the
                     right, each x by Δx, and the small corner Δx by Δx. -->
                <svg viewBox="0 0 200 200" role="img" aria-label={`Square of side 2 grown to ${dependentX.toFixed(1)}`}>
                  <rect class="strip" x="20" y={76 - growSize} width="104" height={growSize}/>
                  <rect class="strip" x="124" y="76" width={growSize} height="104"/>
                  <rect class="corner" x="124" y={76 - growSize} width={growSize} height={growSize}/>
                  <rect class="base" x="20" y="76" width="104" height="104"/>
                  <text x="72" y="134">4</text>
                  {#if growSize > 16}
                    <text class="tiny" x="72" y={76 - growSize / 2 + 4}>x · Δx</text>
                    <text class="tiny" x={124 + growSize / 2} y="132">x · Δx</text>
                  {/if}
                </svg>
                <div class="delta-pills"><span>Δx = {(dependentX - 2).toFixed(1)}</span><span>Δy = {dependentDeltaY.toFixed(2)}</span></div>
              </div>
            {/if}
            <label class="range-row">
              <span>2.1</span>
              <input aria-label="Change the square side" type="range" min="2.1" max="3" step="0.1" bind:value={dependentX}/>
              <span>3.0</span>
            </label>
          {:else if declaredIndex === 3}
            <!-- The result is a ratio, so it is never drawn inside a shape. The
                 division only appears once section 2 introduces it. -->
            {#if floorIndex === 0}
              <div class="change-bars">
                <div class="bar-row"><small>SIDE CHANGE Δx</small><span class="bar" style={`width:${Math.max(2, rateDeltaX * 90)}px`}></span><b>{rateDeltaX.toFixed(2)}</b></div>
                <div class="bar-row"><small>AREA CHANGE Δy</small><span class="bar wide" style={`width:${Math.max(2, rateDeltaY * 26)}px`}></span><b>{rateDeltaY.toFixed(2)}</b></div>
              </div>
            {:else}
              <div class="rate-stage">
                <div class="rate-fraction">
                  <div><small>AREA CHANGE</small><strong>{rateDeltaY.toFixed(2)}</strong></div>
                  <span class="fraction-line"></span>
                  <div><small>SIDE CHANGE</small><strong>{rateDeltaX.toFixed(2)}</strong></div>
                </div>
                <div class="equals">=</div>
                <div class="rate-result">
                  <strong>{averageRate.toFixed(2)}</strong>
                  {#if floorIndex >= 2}<small>cm² per cm</small>{/if}
                </div>
              </div>
            {/if}
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
                <path class="secant" d={secantPath}/>
                <circle class="fixed-point" cx="160" cy="144" r="6"/>
                <circle class="moving-point" cx={secantEndX} cy={secantEndY} r="7"/>
                <text x="145" y="167">x = 2</text>
              </svg>
              <div class="local-readout"><small>INTERVAL</small><strong>Δx = {step}</strong><span>rate {localRate.toFixed(step < 0.01 ? 3 : step < 0.1 ? 2 : 1)}</span></div>
            </div>
            {#if floorIndex === 2}
              <div class="equation-strip"><span>2x + Δx</span><strong>= 4 + {step}</strong><b>= {localRate.toFixed(step < 0.01 ? 3 : step < 0.1 ? 2 : 1)}</b></div>
            {/if}
            <label class="range-row discrete">
              <span>together</span>
              <input aria-label="Drive the two points apart" type="range" min="0" max="4" step="1" bind:value={stepIndex}/>
              <span>apart</span>
            </label>
          {/if}
        </div>

        <section class="floor-copy">
          <div class="floor-dots" aria-label={`Depth ${floorIndex + 1} of ${board.floors.length}`}>
            {#each board.floors as _, index}
              <span class:active={index === floorIndex} class:read={index < floorIndex} class:checked={completed[`${boardIndex}:${index}`]}></span>
            {/each}
          </div>

          <!-- The reading stays on screen through the check. The feedback refers
               back to it, so removing it is exactly the wrong moment to do so. -->
          <p class:recessed={exerciseOpen}>{floor}</p>

          {#if exerciseOpen && exercise}
            <div class="exercise" aria-live="polite">
              <div class="check-topline">
                <span>QUICK CHECK</span>
                <span>
                  {#if exercises.length > 1}{exIndex + 1} of {exercises.length} · {/if}Section {floorIndex + 1} of {board.floors.length}
                </span>
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
                      disabled={stepCleared}
                      class:correct={stepCleared && option.correct}
                      class:missed={picked === option.label && !option.correct}
                      on:click={() => chooseOption(option)}>{option.label}</button>
                  {/each}
                </div>

              {:else if exercise.kind === 'stepper'}
                <div class="lab-stepper">
                  <button aria-label="Decrease" disabled={stepCleared || controlValue <= exercise.min} on:click={() => stepBy(-1)}>−</button>
                  <span>x = {controlValue.toFixed(exercise.step < 1 ? 1 : 0)}{exercise.unit ? ' ' + exercise.unit : ''}</span>
                  <button aria-label="Increase" disabled={stepCleared || controlValue >= exercise.max} on:click={() => stepBy(1)}>+</button>
                </div>

              {:else if exercise.kind === 'match'}
                <div class="lab-tray">
                  {#each exercise.items as item}
                    {#if !placedItems[item.label]}
                      <button class="lab-chip" class:up={heldItem === item.label} on:click={() => takeItem(item.label)}>{item.label}</button>
                    {/if}
                  {/each}
                </div>
                <div class="lab-bins">
                  {#each exercise.bins as bin}
                    <div class="lab-bin" class:armed={heldItem}>
                      <button class="bin-hit" on:click={() => placeItem(bin)} aria-label={`Place in ${bin}`}>
                        <small>{bin}</small>
                      </button>
                      <span>
                        {#each exercise.items.filter(i => placedItems[i.label] === bin) as i}
                          <button class="placed" class:wrong={i.bin !== bin} disabled={stepCleared}
                            on:click|stopPropagation={() => unplaceItem(i.label)}
                            aria-label={`Take ${i.label} back`}>{i.label}</button>
                        {/each}
                      </span>
                    </div>
                  {/each}
                </div>

              {:else if exercise.kind === 'order'}
                <div class="lab-order">
                  {#each orderRows as idx, pos}
                    <div class="lab-order-row" data-idx={idx}>
                      <span>{exercise.items[idx]}</span>
                      <span class="lab-order-btns">
                        <button aria-label="Move up" disabled={stepCleared || pos === 0} on:click={() => moveOrder(pos, -1)}>↑</button>
                        <button aria-label="Move down" disabled={stepCleared || pos === orderRows.length - 1} on:click={() => moveOrder(pos, 1)}>↓</button>
                      </span>
                    </div>
                  {/each}
                </div>
              {/if}

              {#if feedback}
                <div class="feedback" class:success={stepCleared}>{feedback}</div>
              {/if}
            </div>
          {/if}
        </section>

        <div class="board-actions">
          <button class="secondary" on:click={retreat} disabled={boardIndex === 0 && floorIndex === 0 && !exerciseOpen} aria-label="Previous step">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>
            <span>Back</span>
          </button>
          <button class="primary" on:click={advance} disabled={exerciseOpen && !stepCleared}>
            {#if exerciseOpen}
              {exIndex < exercises.length - 1 ? 'Next check' : 'Continue'}
            {:else if exercises.length && !completed[exerciseKey]}
              Check
            {:else if floorIndex < board.floors.length - 1}
              Continue
            {:else if boardIndex === boards.length - 1}
              Finish
            {:else}
              Next subtopic
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
  .lab-header { display: grid; grid-template-columns: auto 1fr auto; gap: 10px; align-items: center; min-height: 46px; }
  .brand-lockup { display: flex; flex-direction: column; align-items: center; gap: 2px; }
  .brand { color: var(--qx-accent); font-size: 13.5px; font-weight: 900; letter-spacing: .17em; }
  .lab-name { color: var(--qx-text-dim); font-size: 14.5px; font-weight: 700; }
  .topics-button { min-height: 40px; padding: 0 12px; border-radius: 12px; border: 1px solid var(--qx-border); background: var(--qx-surface); color: var(--qx-accent-text); display: flex; align-items: center; gap: 6px; font-size: 13.5px; font-weight: 900; cursor: pointer; }
  .icon-btn { width: 40px; height: 40px; border-radius: 50%; border: 1px solid var(--qx-border); background: var(--qx-surface); color: var(--qx-text); display: grid; place-items: center; cursor: pointer; }
  .lab-tools { display: flex; align-items: center; gap: 7px; }
  .xp-badge { min-height: 38px; padding: 0 10px; border: 1px solid var(--qx-border); border-radius: 999px; background: var(--qx-accent-soft); color: var(--qx-accent-text); display: flex; align-items: center; gap: 4px; font-size: 12px; font-weight: 900; letter-spacing: .07em; white-space: nowrap; }
  .xp-badge b { font-size: 14.5px; }
  .xp-toast { position: fixed; z-index: 80; top: max(70px, calc(env(safe-area-inset-top) + 58px)); left: 50%; transform: translateX(-50%); padding: 9px 15px; border-radius: 999px; background: var(--qx-green); color: #fff; box-shadow: var(--qx-shadow-card); font-size: 15px; font-weight: 900; animation: xp-pop .24s ease-out; }
  .complete-xp { display: inline-flex; margin-top: 14px; padding: 8px 12px; border-radius: 999px; background: var(--qx-accent-soft); color: var(--qx-accent-text); font-size: 15px; }
  @keyframes xp-pop { from { opacity: 0; transform: translate(-50%, -8px) scale(.92); } }
  .icon-btn svg, .board-actions svg { width: 20px; height: 20px; fill: none; stroke: currentColor; stroke-width: 2.1; stroke-linecap: round; stroke-linejoin: round; }
  .progress-wrap { padding: 2px 4px; }
  .topic-selector { display: grid; grid-template-columns: auto minmax(0, 1fr); align-items: center; gap: 10px; margin-bottom: 10px; }
  .topic-selector span { color: var(--qx-accent-text); font-size: 12px; letter-spacing: .12em; font-weight: 900; }
  .topic-selector select { width: 100%; min-height: 40px; border: 1px solid var(--qx-border-2); border-radius: 11px; background: var(--qx-surface); color: var(--qx-text); padding: 0 34px 0 11px; font-size: 14.5px; font-weight: 800; cursor: pointer; }
  .progress-copy { display: flex; justify-content: space-between; color: var(--qx-text-dim); font-size: 13.5px; font-weight: 800; margin-bottom: 7px; }
  .segments { display: grid; gap: 5px; }
  .segments span { height: 4px; border-radius: 9px; background: var(--qx-surface-3); transition: background .2s, transform .2s; }
  .segments span.complete { background: var(--qx-green); }
  .segments span.active { background: var(--qx-accent); transform: scaleY(1.35); }
  .board-card { flex: 1 0 auto; min-height: 610px; background: var(--qx-surface); border: 1px solid var(--qx-border); border-radius: 24px; box-shadow: var(--qx-shadow-card); padding: 21px 18px 18px; display: flex; flex-direction: column; }
  .board-heading { margin-bottom: 13px; }
  .micro-label { color: var(--qx-accent-text); font-size: 13px; line-height: 1; letter-spacing: .13em; font-weight: 900; text-transform: uppercase; }
  h1 { color: var(--qx-text); font-size: 27px; line-height: 1.08; letter-spacing: -.035em; margin-top: 7px; }
  .stage { min-height: 300px; flex-shrink: 0; border-radius: 18px; border: 1px solid var(--qx-border); background: var(--qx-surface-2); padding: 17px 14px 13px; display: flex; flex-direction: column; justify-content: center; position: relative; overflow: hidden; }
  .range-row { display: grid; grid-template-columns: 28px 1fr 28px; align-items: center; gap: 8px; color: var(--qx-text-faint); font-size: 13px; font-weight: 800; width: 100%; margin-top: 13px; }
  .range-row span:last-child { text-align: right; }
  .stage.stepping .range-row { display: none; }
  input[type='range'] { width: 100%; accent-color: var(--qx-accent); cursor: pointer; }
  .square-stage { min-height: 215px; display: grid; grid-template-columns: 1fr 126px; align-items: center; gap: 10px; }
  .square-figure { justify-self: center; display: flex; flex-direction: column; align-items: center; gap: 8px; }
  .symbol-rows { display: flex; flex-direction: column; gap: 14px; justify-content: center; }
  .symbol-row { display: flex; align-items: center; gap: 8px; }
  .symbol-row small { width: 62px; font-size: 12px; letter-spacing: .11em; font-weight: 900; color: var(--qx-text-faint); }
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
  .edge-label.sm { font: italic 800 14px/1 Georgia, serif; gap: 6px; }
  .value-readout, .local-readout { border-left: 1px solid var(--qx-border-2); padding-left: 15px; display: flex; flex-direction: column; gap: 3px; }
  .value-readout small, .local-readout small, .rate-fraction small { font-size: 12px; font-weight: 900; letter-spacing: .11em; color: var(--qx-text-faint); }
  .value-readout strong, .local-readout strong { font-size: 23px; color: var(--qx-text); }
  .value-readout span, .local-readout span { font-size: 14.5px; color: var(--qx-text-dim); }
  .signed-stage { display: flex; flex-direction: column; gap: 14px; justify-content: center; align-items: center; }
  .signed-track { position: relative; width: 100%; height: 54px; }
  .signed-axis { position: absolute; left: 0; right: 0; top: 50%; height: 1px; background: var(--qx-text-dim); }
  .signed-zero { position: absolute; left: 50%; top: 9px; bottom: 9px; width: 2px; background: var(--qx-text-dim); }
  .signed-fill { position: absolute; top: 50%; transform: translateY(-50%); height: 22px; border-radius: 5px; background: var(--qx-accent); transition: width .12s; }
  .signed-fill.neg { background: var(--qx-danger); }
  .signed-labels { display: flex; justify-content: space-between; width: 100%; font-size: 12px; letter-spacing: .1em; font-weight: 900; color: var(--qx-text-faint); }
  .signed-read { font-size: 19px; font-weight: 900; color: var(--qx-accent-text); }
  .signed-read.neg { color: var(--qx-danger-text); }
  .number-stage svg { width: 100%; height: 165px; overflow: visible; }
  .number-stage .axis, .number-stage .tick { fill: none; stroke: var(--qx-text-dim); stroke-width: 2; stroke-linecap: round; }
  .number-stage text { fill: var(--qx-text-dim); font-size: 13.5px; text-anchor: middle; font-weight: 700; }
  .old-dot { fill: var(--qx-text-faint); }
  .new-dot { fill: var(--qx-accent); stroke: var(--qx-surface); stroke-width: 3; }
  .move-line { fill: none; stroke: var(--qx-accent); stroke-width: 3; stroke-linecap: round; }
  .equation-strip { display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 8px; background: var(--qx-surface); border: 1px solid var(--qx-border); border-radius: 13px; padding: 12px 14px; }
  .equation-strip span { color: var(--qx-accent-text); font-weight: 900; }
  .equation-strip span.word { font-size: 13px; letter-spacing: .11em; text-transform: uppercase; }
  .equation-strip strong { font-size: 14px; }
  .equation-strip b { color: var(--qx-green-text); }
  .paired-stage { min-height: 185px; display: flex; align-items: center; justify-content: center; gap: 12px; }
  .pair { display: flex; flex-direction: column; align-items: center; justify-content: flex-end; gap: 8px; min-width: 84px; min-height: 140px; }
  .area-square { display: grid; place-items: center; border-radius: 5px; transition: width .12s, height .12s; }
  .new-area { max-width: 122px; max-height: 122px; border: 3px solid var(--qx-green); background: var(--qx-green-soft); }
  .area-square span { font-size: 18px; font-weight: 900; color: var(--qx-text); }
  .delta-pills { display: flex; justify-content: center; gap: 8px; }
  .delta-pills span { border-radius: 99px; padding: 7px 11px; background: var(--qx-surface); border: 1px solid var(--qx-border); color: var(--qx-text-2); font-size: 14.5px; font-weight: 800; }
  .delta-pills span:last-child { color: var(--qx-green-text); }
  .rate-stage { min-height: 225px; display: flex; align-items: center; justify-content: center; gap: 16px; }
  .rate-fraction { width: 116px; display: flex; flex-direction: column; gap: 8px; }
  .rate-fraction div { display: flex; justify-content: space-between; align-items: end; gap: 8px; }
  .rate-fraction strong { font-size: 22px; }
  .fraction-line { height: 2px; background: var(--qx-text); border-radius: 2px; }
  .equals { color: var(--qx-text-faint); font-size: 24px; }
  .rate-result { display: flex; flex-direction: column; align-items: flex-start; border-left: 1px solid var(--qx-border-2); padding-left: 15px; }
  .rate-result strong { color: var(--qx-accent-text); font-size: 30px; }
  .rate-result small { margin-top: 3px; letter-spacing: .06em; font-size: 12px; font-weight: 900; color: var(--qx-text-faint); }
  .change-bars { display: flex; flex-direction: column; gap: 14px; justify-content: center; }
  .change-bars .bar-row { display: flex; align-items: center; gap: 9px; }
  .change-bars small { width: 108px; font-size: 12px; letter-spacing: .09em; color: var(--qx-text-faint); font-weight: 900; }
  .change-bars .bar { height: 16px; border-radius: 5px; background: var(--qx-accent); display: inline-block; }
  .change-bars .bar.wide { background: var(--qx-green); }
  .change-bars b { font-size: 15px; }
  .machine-stage { display: flex; align-items: center; justify-content: center; gap: 10px; flex-wrap: wrap; }
  .machine-box { border: 1px dashed var(--qx-border-2); border-radius: 10px; padding: 10px 13px; font-size: 14.5px; font-weight: 900; color: var(--qx-text-dim); letter-spacing: .05em; }
  .decomp-stage { display: flex; flex-direction: column; align-items: center; gap: 10px; }
  .decomp-stage svg { width: 100%; max-width: 220px; height: auto; }
  .decomp-stage .base { fill: var(--qx-accent-soft); stroke: var(--qx-accent); stroke-width: 2; }
  .decomp-stage .strip { fill: var(--qx-green-soft); stroke: var(--qx-green); stroke-width: 1.5; }
  .decomp-stage .corner { fill: var(--qx-surface-3); stroke: var(--qx-text-faint); stroke-width: 1.5; }
  .decomp-stage text { fill: var(--qx-accent-text); font-size: 17px; font-weight: 900; text-anchor: middle; }
  .decomp-stage text.tiny { fill: var(--qx-green-text); font-size: 12px; letter-spacing: .08em; }
  .flow-stage { display: flex; align-items: center; justify-content: center; gap: 10px; min-height: 200px; }
  .flow-card { display: flex; flex-direction: column; gap: 4px; align-items: center; border: 2px solid var(--qx-accent); border-radius: 13px; padding: 14px 16px; background: var(--qx-accent-soft); color: var(--qx-accent-text); }
  .flow-card.dep { border-style: dashed; border-color: var(--qx-border-2); background: var(--qx-surface); color: var(--qx-text); }
  .flow-card b { font-size: 18px; }
  .flow-card em { font-style: normal; font-size: 11.5px; letter-spacing: .09em; font-weight: 900; color: var(--qx-text-faint); text-align: center; }
  .flow-arrow { position: relative; width: 46px; text-align: center; font-size: 22px; color: var(--qx-text-faint); }
  .flow-arrow i { position: absolute; left: 0; top: 50%; width: 10px; height: 10px; border-radius: 50%; background: var(--qx-accent); transform: translateY(-50%); animation: flow-pulse .6s ease-out; }
  @keyframes flow-pulse { from { left: 0; opacity: 1; } to { left: 36px; opacity: 0; } }
  .role-cards { display: flex; gap: 9px; justify-content: center; margin-top: 12px; }
  .role-card { display: flex; flex-direction: column; gap: 3px; border: 1px solid var(--qx-accent); border-radius: 11px; padding: 8px 13px; background: var(--qx-accent-soft); color: var(--qx-accent-text); }
  .role-card.follows { border-color: var(--qx-border-2); background: var(--qx-surface); color: var(--qx-text); }
  .role-card b { font-size: 16px; }
  .role-card em { font-style: normal; font-size: 11.5px; letter-spacing: .09em; font-weight: 800; color: var(--qx-text-faint); }
  .curve-stage { min-height: 230px; display: grid; grid-template-columns: minmax(0, 1fr) 108px; align-items: center; }
  .curve-stage svg { width: 100%; height: 210px; overflow: visible; }
  .gridline { fill: none; stroke: var(--qx-border-2); stroke-width: 1.5; }
  .curve { fill: none; stroke: var(--qx-text-dim); stroke-width: 3; stroke-linecap: round; }
  .secant { fill: none; stroke: var(--qx-accent); stroke-width: 3; stroke-linecap: round; }
  .fixed-point { fill: var(--qx-green); stroke: var(--qx-surface-2); stroke-width: 3; }
  .moving-point { fill: var(--qx-accent); stroke: var(--qx-surface-2); stroke-width: 3; }
  .curve-stage text { fill: var(--qx-text-dim); font-size: 13px; font-weight: 800; }
  .floor-copy { padding: 15px 4px 5px; min-height: 122px; flex-shrink: 0; }
  .floor-dots { display: flex; gap: 5px; margin-bottom: 11px; }
  .floor-dots span { width: 7px; height: 7px; border-radius: 50%; background: var(--qx-surface-3); }
  .floor-dots span.read { background: var(--qx-green); }
  .floor-dots span.active { background: var(--qx-accent); transform: scale(1.22); }
  .floor-copy p { color: var(--qx-text-2); font-size: 17px; line-height: 1.53; font-weight: 550; }
  .floor-copy p.recessed { font-size: 14px; line-height: 1.5; color: var(--qx-text-dim); padding-bottom: 3px; border-bottom: 1px solid var(--qx-border); margin-bottom: 3px; }
  .board-actions { margin-top: auto; display: grid; grid-template-columns: minmax(104px, .42fr) 1fr; gap: 9px; }
  .primary, .secondary { border: 0; cursor: pointer; font-weight: 900; }
  .primary { min-height: 48px; border-radius: 14px; background: var(--qx-accent); color: #fffaf2; display: flex; align-items: center; justify-content: center; gap: 8px; padding: 0 18px; }
  .primary svg { width: 18px; }
  .secondary { min-height: 48px; border-radius: 14px; border: 1px solid var(--qx-border-2); background: var(--qx-surface-2); color: var(--qx-text); display: flex; align-items: center; justify-content: center; gap: 6px; }
  .secondary:disabled { opacity: .32; cursor: default; }
  .wide { width: 100%; }
  .swipe-note { text-align: center; color: var(--qx-text-faint); font-size: 13px; font-weight: 700; padding-bottom: 2px; }
  .exercise { display: flex; flex-direction: column; gap: 12px; }
  .exercise-prompt { color: var(--qx-text); font-size: 17px; line-height: 1.45; font-weight: 800; }
  .check-topline { display: flex; justify-content: space-between; color: var(--qx-accent-text); font-size: 13px; letter-spacing: .12em; font-weight: 900; }
  .check-topline span:last-child { color: var(--qx-text-faint); letter-spacing: 0; }
  .check-visual { min-height: 116px; display: flex; align-items: center; justify-content: center; gap: 16px; background: var(--qx-surface-2); border: 1px solid var(--qx-border); border-radius: 18px; padding: 10px; }
  .check-visual svg { width: 44px; fill: none; stroke: var(--qx-accent); stroke-width: 2.3; stroke-linecap: round; stroke-linejoin: round; }
  .mini-square { display: flex; flex-direction: column; align-items: center; justify-content: center; border-radius: 6px; font-size: 14.5px; font-weight: 900; color: var(--qx-text-dim); }
  .mini-square span { color: var(--qx-text); font-size: 23px; }
  .mini-square.old { width: 78px; height: 78px; border: 2px solid var(--qx-text-faint); }
  .mini-square.fresh { width: 100px; height: 100px; border: 3px solid var(--qx-green); background: var(--qx-green-soft); }
  .check-options { display: grid; grid-template-columns: 1fr; gap: 8px; }
  .check-options button { min-height: 48px; border-radius: 13px; border: 1px solid var(--qx-border-2); background: var(--qx-surface-2); color: var(--qx-text); font-size: 16px; font-weight: 800; cursor: pointer; padding: 8px 14px; text-align: left; }
  .check-options button.correct { border-color: var(--qx-green); background: var(--qx-green-soft); color: var(--qx-green-text); }
  .check-options button.missed { border-color: var(--qx-danger); }
  .lab-stepper { display: flex; align-items: center; gap: 10px; }
  .lab-stepper button { width: 52px; height: 52px; border-radius: 13px; border: 1px solid var(--qx-border-2); background: var(--qx-surface-2); color: var(--qx-text); font-size: 24px; font-weight: 900; cursor: pointer; }
  .lab-stepper button:disabled { opacity: .35; cursor: default; }
  .lab-stepper span { flex: 1; text-align: center; font-size: 22px; font-weight: 900; color: var(--qx-accent-text); }
  .lab-tray { display: flex; flex-wrap: wrap; gap: 8px; min-height: 48px; align-items: center; }
  .lab-chip { min-width: 46px; height: 46px; padding: 0 14px; border-radius: 12px; border: 1px solid var(--qx-border-2); background: var(--qx-surface-2); color: var(--qx-text); font-size: 17px; font-weight: 900; cursor: pointer; }
  .lab-chip.up { border-color: var(--qx-accent); background: var(--qx-accent-soft); color: var(--qx-accent-text); transform: translateY(-3px); }
  .lab-bins { display: grid; grid-template-columns: 1fr 1fr; gap: 9px; }
  .lab-bin { min-height: 78px; border: 1px dashed var(--qx-border-2); border-radius: 13px; background: var(--qx-surface-2); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; padding: 9px; cursor: pointer; }
  .lab-bin.armed { border-color: var(--qx-accent); background: var(--qx-accent-soft); }
  .lab-bin small { font-size: 12px; letter-spacing: .1em; font-weight: 900; color: var(--qx-text-faint); text-align: center; }
  .lab-bin span { display: flex; gap: 7px; flex-wrap: wrap; justify-content: center; }
  .lab-bin .bin-hit { flex: 1; width: 100%; border: 0; background: none; cursor: pointer; display: grid; place-items: center; padding: 4px; }
  .lab-bin .placed { border: 1px solid var(--qx-green); border-radius: 8px; background: var(--qx-green-soft); color: var(--qx-green-text); font-weight: 900; font-size: 15px; padding: 3px 9px; cursor: pointer; }
  .lab-bin .placed.wrong { border-color: var(--qx-danger); background: var(--qx-danger-soft); color: var(--qx-danger-text); }
  .lab-bin .placed:disabled { cursor: default; }
  .lab-order { display: flex; flex-direction: column; gap: 7px; }
  .lab-order-row { display: flex; align-items: center; gap: 10px; border: 1px solid var(--qx-border-2); border-radius: 11px; padding: 10px 12px; background: var(--qx-surface-2); font-size: 14px; font-weight: 700; }
  .lab-order-row span:first-child { flex: 1; }
  .lab-order-btns { display: flex; gap: 6px; }
  .lab-order-btns button { width: 36px; height: 36px; border-radius: 9px; border: 1px solid var(--qx-border-2); background: var(--qx-surface); color: var(--qx-text); cursor: pointer; font-weight: 900; }
  .lab-order-btns button:disabled { opacity: .3; cursor: default; }
  .check-options button:disabled { cursor: default; }
  .primary:disabled { opacity: .38; cursor: default; }
  .floor-dots span.checked { background: var(--qx-green); }
  .feedback { padding: 12px 13px; border-radius: 12px; background: var(--qx-danger-soft); color: var(--qx-danger-text); font-size: 15px; line-height: 1.45; font-weight: 750; }
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

  /* Mathematics keeps its compact lesson controls, but now sits on the same
     paper and in the same framed work area as the Superstore missions. */
  :global(html),:global(body),:global(#app){background:#e6e0d2}
  .lab-view{--qx-bg:#e6e0d2;--qx-surface:#f7f3e9;--qx-surface-2:#efe9dd;--qx-surface-3:#d8d0be;
            --qx-text:#20241f;--qx-text-2:#4f574e;--qx-text-dim:#62695f;--qx-text-faint:#817b70;
            --qx-border:#c8c1b1;--qx-border-2:#9c998d;--qx-accent:#b85530;--qx-accent-text:#9d4426;
            --qx-accent-soft:#f0ddd2;--qx-green:#315f48;--qx-green-text:#284c3b;--qx-green-soft:#e0e8df;
            width:min(100%,760px);max-width:760px;margin-inline:auto;padding:18px clamp(16px,5vw,56px) 34px;background:#e6e0d2}
  .lab-header{min-height:58px;border-bottom:1px solid #c8c1b1;padding-bottom:12px}
  .brand{color:#20241f;font-family:Georgia,serif;font-weight:600;letter-spacing:0;text-transform:none}.lab-name{font-size:11px;letter-spacing:.08em;text-transform:uppercase}
  .topics-button{border-radius:0;border-color:#315f48;background:transparent;color:#315f48;text-decoration:none}.icon-btn,.xp-badge{border-radius:0}
  .topic-selector select,.segments span{border-radius:0}.segments span.active{background:#315f48}
  .board-card{border:6px solid #20241f;border-radius:0;box-shadow:11px 11px 0 rgba(32,36,31,.16);background:#f7f3e9;padding:24px 22px 20px}
  .board-heading h1{font:400 34px/1 Georgia,serif}.stage{border-radius:0;background:#efe9dd}
  .primary,.secondary,.check-visual,.check-options button,.lab-stepper button,.lab-chip,.lab-bin,.lab-order-row,.lab-order-btns button,.feedback,.equation-strip,.flow-card,.role-card,.machine-box{border-radius:0}
  @media(max-width:600px){.lab-view{padding-inline:16px}.board-card{border-width:5px;box-shadow:8px 8px 0 rgba(32,36,31,.16);padding:18px 14px}.brand-lockup{align-items:flex-start}.lab-name{display:none}.board-heading h1{font-size:29px}}
</style>
