<script>
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import { theme } from '../lib/stores/theme.js';
  import { boards } from '../lib/content/lesson.js';
  import { progress } from '../lib/stores/progress.js';
  import { view } from '../lib/stores/view.js';

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
  $: newAreaSize = 76 + (dependentX - 2) * 38;
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
    // Recorded but never shown: whether this took more than one attempt is the
    // only quality signal kept, and no score is derived from it yet.
    if (!completed[exerciseKey]) {
      progress.recordAttempt(exerciseKey, { tries: Math.max(attempts, 1), firstTime: attempts <= 1 });
    }
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

<div class="qx-shell lab-view" on:pointerdown={handlePointerDown} on:pointerup={handlePointerUp}>
  <header class="lab-header">
    <button class="course-mark" aria-label="Back to the home page" on:click={() => view.set('home')}>01</button>
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
            {:else if floorIndex < 3}
              <div class="paired-stage">
                <div class="pair">
                  <div class="area-square new-area" style={`width:${newAreaSize}px;height:${newAreaSize}px`}><span>y = {dependentY.toFixed(2)}</span></div>
                  <span class="edge-label sm" style={`width:${newAreaSize}px`}>x = {dependentX.toFixed(1)}</span>
                </div>
                <div class="role-cards">
                  <span class="role-card"><b>x = {dependentX.toFixed(1)}</b><em>{floorIndex === 2 ? 'independent · you assign' : 'you assign'}</em></span>
                  <span class="role-card follows"><b>y = {dependentY.toFixed(2)}</b><em>{floorIndex === 2 ? 'dependent · follows' : 'follows'}</em></span>
                </div>
              </div>
            {:else}
              <div class="paired-stage">
                <div class="pair old-pair">
                  <div class="area-square old-area" style="width:76px;height:76px"><span>y = 4</span></div>
                  <span class="edge-label sm" style="width:76px">x = 2</span>
                </div>
                <svg class="pair-arrow" viewBox="0 0 52 30" aria-hidden="true"><path d="M2 15h42M38 8l7 7-7 7"/></svg>
                <div class="pair">
                  <div class="area-square new-area" style={`width:${newAreaSize}px;height:${newAreaSize}px`}><span>y = {dependentY.toFixed(2)}</span></div>
                  <span class="edge-label sm" style={`width:${newAreaSize}px`}>x = {dependentX.toFixed(1)}</span>
                </div>
              </div>
              <div class="delta-pills"><span>Δx = {(dependentX - 2).toFixed(1)}</span><span>Δy = {dependentDeltaY.toFixed(2)}</span></div>
            {/if}
            <label class="range-row">
              <span>2.1</span>
              <input aria-label="Change the square side" type="range" min="2.1" max="3" step="0.1" bind:value={dependentX}/>
              <span>3.0</span>
            </label>
          {:else if boardIndex === 3}
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
  .edge-label.sm { font: italic 800 14px/1 Georgia, serif; gap: 6px; }
  .value-readout, .local-readout { border-left: 1px solid var(--qx-border-2); padding-left: 15px; display: flex; flex-direction: column; gap: 3px; }
  .value-readout small, .local-readout small, .rate-fraction small { font-size: 9px; font-weight: 900; letter-spacing: .11em; color: var(--qx-text-faint); }
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
  .rate-result { display: flex; flex-direction: column; align-items: flex-start; border-left: 1px solid var(--qx-border-2); padding-left: 15px; }
  .rate-result strong { color: var(--qx-accent-text); font-size: 30px; }
  .rate-result small { margin-top: 3px; letter-spacing: .06em; font-size: 9px; font-weight: 900; color: var(--qx-text-faint); }
  .change-bars { display: flex; flex-direction: column; gap: 14px; justify-content: center; }
  .change-bars .bar-row { display: flex; align-items: center; gap: 9px; }
  .change-bars small { width: 108px; font-size: 9px; letter-spacing: .09em; color: var(--qx-text-faint); font-weight: 900; }
  .change-bars .bar { height: 16px; border-radius: 5px; background: var(--qx-accent); display: inline-block; }
  .change-bars .bar.wide { background: var(--qx-green); }
  .change-bars b { font-size: 15px; }
  .role-cards { display: flex; gap: 9px; justify-content: center; margin-top: 12px; }
  .role-card { display: flex; flex-direction: column; gap: 3px; border: 1px solid var(--qx-accent); border-radius: 11px; padding: 8px 13px; background: var(--qx-accent-soft); color: var(--qx-accent-text); }
  .role-card.follows { border-color: var(--qx-border-2); background: var(--qx-surface); color: var(--qx-text); }
  .role-card b { font-size: 16px; }
  .role-card em { font-style: normal; font-size: 8.5px; letter-spacing: .09em; font-weight: 800; color: var(--qx-text-faint); }
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
  .floor-copy p.recessed { font-size: 14px; line-height: 1.5; color: var(--qx-text-dim); padding-bottom: 3px; border-bottom: 1px solid var(--qx-border); margin-bottom: 3px; }
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
