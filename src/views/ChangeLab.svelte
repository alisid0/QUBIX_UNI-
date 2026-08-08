<script>
  import { onMount } from 'svelte';
  import { theme } from '../lib/stores/theme.js';

  const boards = [
    {
      id: 'CME-CHANGE-001',
      title: 'Let x move',
      marker: 'A changing value',
      floors: [
        'Write x = 2. Now replace the 2 with a 3. The letter stayed put; the value assigned to it changed.',
        'A letter used this way is a variable. It can hold one value now and another value later.',
        'Here x is the side length of a square. Move x and the square follows.'
      ]
    },
    {
      id: 'CME-CHANGE-002',
      title: 'Name the change',
      marker: 'Δx = new − old',
      floors: [
        'The side moves from 2 cm to 2.5 cm. The move itself has a size: 0.5 cm.',
        'We write that change as Δx, read “delta x.” Here, Δx = 2.5 − 2 = 0.5 cm.',
        'The new value is the old value plus the change: x + Δx.',
        'A change can be negative. The minus sign records the direction of the move.'
      ]
    },
    {
      id: 'CME-CHANGE-003',
      title: 'When x moves, y answers',
      marker: 'Dependent change',
      floors: [
        'Let x be the side of a square and y be its area. They are tied together by y = x².',
        'At x = 2, y = 4. Change x to 2.5 and the area becomes 6.25.',
        'x is the independent variable. y depends on it. The area change is Δy = 2.25.',
        'We now have a paired move: Δx = 0.5 and Δy = 2.25.'
      ]
    },
    {
      id: 'CME-CHANGE-004',
      title: 'Compare the two changes',
      marker: 'Average rate',
      floors: [
        'The side grows by 0.5 cm while the area grows by 2.25 cm². Compare the two changes.',
        'Δy/Δx = 2.25/0.5 = 4.5. That is the average area growth for each centimetre added.',
        'Average rate of change means change in output divided by change in input.'
      ]
    },
    {
      id: 'CME-CHANGE-005',
      title: 'Move closer',
      marker: 'A local rate appears',
      floors: [
        'Keep the starting value at x = 2. Move the other value closer.',
        'The average rates are 5, then 4.5, 4.1, 4.01, and 4.001.',
        'The interval shrinks while the rates settle near 4. That value describes the rate right at x = 2.',
        'Calculus calls this local rate the derivative. Next comes Thompson’s notation: dy/dx.'
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
  let deltaEnd = 2.5;
  let dependentX = 2.5;
  let rateX = 2.5;
  let stepIndex = 0;
  let showCheck = false;
  let checkAttempts = 0;
  let checkDone = false;
  let checkMessage = '';
  let finished = false;
  let hydrated = false;
  let pointerStart = null;

  $: board = boards[boardIndex];
  $: floor = board?.floors[floorIndex] || '';
  $: deltaX = deltaEnd - 2;
  $: dependentY = dependentX * dependentX;
  $: dependentDeltaY = dependentY - 4;
  $: rateDeltaX = rateX - 2;
  $: rateDeltaY = rateX * rateX - 4;
  $: averageRate = rateDeltaX ? rateDeltaY / rateDeltaX : 4;
  $: step = stepOptions[stepIndex];
  $: localRate = 4 + step;
  $: secantEndX = 160 + step * 60;
  $: secantEndY = 144 - (4 * step + step * step) * 8.5;

  onMount(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('qubix-university-change-lab-v1') || 'null');
      if (saved && Number.isInteger(saved.boardIndex) && saved.boardIndex >= 0 && saved.boardIndex < boards.length) {
        boardIndex = saved.boardIndex;
        floorIndex = Math.min(saved.floorIndex || 0, boards[boardIndex].floors.length - 1);
        checkDone = !!saved.checkDone;
      }
    } catch (_) {}
    hydrated = true;
  });

  $: if (hydrated) {
    try {
      localStorage.setItem('qubix-university-change-lab-v1', JSON.stringify({ boardIndex, floorIndex, checkDone }));
    } catch (_) {}
  }

  function advance() {
    if (floorIndex < board.floors.length - 1) {
      floorIndex += 1;
      return;
    }
    if (boardIndex === 2 && !checkDone) {
      showCheck = true;
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
    if (showCheck) {
      showCheck = false;
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

  function chooseCheck(value) {
    checkAttempts += 1;
    if (value === 7) {
      checkDone = true;
      checkMessage = 'Yes. The area moves from 9 to 16, so Δy = 16 − 9 = 7.';
    } else if (checkAttempts === 1) {
      checkMessage = 'Try once more. Δy is the new area minus the old area.';
    } else {
      checkDone = true;
      checkMessage = 'The area moves from 3² = 9 to 4² = 16. So Δy = 16 − 9 = 7.';
    }
  }

  function leaveCheck() {
    showCheck = false;
    boardIndex = 3;
    floorIndex = 0;
  }

  function restart() {
    boardIndex = 0;
    floorIndex = 0;
    showCheck = false;
    checkAttempts = 0;
    checkDone = false;
    checkMessage = '';
    finished = false;
  }

  function handlePointerDown(event) {
    pointerStart = { x: event.clientX, y: event.clientY };
  }

  function handlePointerUp(event) {
    if (!pointerStart || showCheck || finished) return;
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
      <span class="lab-name">Change laboratory</span>
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
      <span class="micro-label">FIRST FIVE COMPLETE</span>
      <h1>You found a rate<br/>by moving closer.</h1>
      <p>Five small moves. Variable, change, dependence, average rate, local rate.</p>
      <div class="summary-chain" aria-label="Concept sequence">
        <span>x</span><i>→</i><span>Δx</span><i>→</i><span>Δy</span><i>→</i><span>Δy/Δx</span><i>→</i><span>4</span>
      </div>
      <button class="primary wide" on:click={restart}>Begin again</button>
    </main>
  {:else}
    <section class="progress-wrap" aria-label={`Board ${boardIndex + 1} of ${boards.length}`}>
      <div class="progress-copy">
        <span>Board {boardIndex + 1} of {boards.length}</span>
        <span>{Math.round(((boardIndex + floorIndex / board.floors.length) / boards.length) * 100)}%</span>
      </div>
      <div class="segments">
        {#each boards as _, index}
          <span class:complete={index < boardIndex} class:active={index === boardIndex}></span>
        {/each}
      </div>
    </section>

    <main class="board-card" class:check-mode={showCheck}>
      {#if showCheck}
        <div class="check-panel">
          <div class="check-topline"><span>QUICK CHECK</span><span>1 question</span></div>
          <div class="check-visual" aria-hidden="true">
            <div class="mini-square old">3²<span>9</span></div>
            <svg viewBox="0 0 54 24"><path d="M2 12h46M42 6l6 6-6 6"/></svg>
            <div class="mini-square fresh">4²<span>16</span></div>
          </div>
          <h1>x changes from 3 to 4.<br/>What is Δy?</h1>
          <div class="check-options">
            {#each [1, 7, 16] as option}
              <button disabled={checkDone} class:correct={checkDone && option === 7} on:click={() => chooseCheck(option)}>{option}</button>
            {/each}
          </div>
          {#if checkMessage}
            <div class:success={checkDone} class="feedback">{checkMessage}</div>
          {/if}
          {#if checkDone}
            <button class="primary wide" on:click={leaveCheck}>Continue</button>
          {/if}
        </div>
      {:else}
        <div class="board-heading">
          <span class="micro-label">{board.marker}</span>
          <h1>{board.title}</h1>
        </div>

        <div class="stage" aria-live="polite">
          {#if boardIndex === 0}
            <div class="square-stage">
              <div class="square" style={`width:${74 + (squareX - 1.5) * 52}px;height:${74 + (squareX - 1.5) * 52}px`}>
                <span>x</span>
              </div>
              <div class="value-readout"><small>CURRENT VALUE</small><strong>x = {Number(squareX).toFixed(1)}</strong><span>cm</span></div>
            </div>
            <label class="range-row">
              <span>1.5</span>
              <input aria-label="Change x" type="range" min="1.5" max="3.5" step="0.1" bind:value={squareX}/>
              <span>3.5</span>
            </label>
          {:else if boardIndex === 1}
            <div class="number-stage">
              <svg viewBox="0 0 320 128" role="img" aria-label={`Number line from 1 to 3. Current x is ${deltaEnd}`}>
                <path class="axis" d="M28 72H292"/>
                {#each [1, 1.5, 2, 2.5, 3] as tick}
                  <path class="tick" d={`M${28 + (tick - 1) * 132} 65v14`}/>
                  <text x={28 + (tick - 1) * 132} y="98">{tick}</text>
                {/each}
                <circle class="old-dot" cx="160" cy="72" r="6"/>
                <path class="move-line" d={`M160 46 H${28 + (deltaEnd - 1) * 132}`}/>
                <circle class="new-dot" cx={28 + (deltaEnd - 1) * 132} cy="72" r="8"/>
              </svg>
              <div class="equation-strip"><span>Δx</span><strong>= {deltaEnd.toFixed(1)} − 2.0</strong><b>= {deltaX.toFixed(1)}</b></div>
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
              <span class:active={index === floorIndex} class:read={index < floorIndex}></span>
            {/each}
          </div>
          <p>{floor}</p>
        </section>

        <div class="board-actions">
          <button class="secondary" on:click={retreat} disabled={boardIndex === 0 && floorIndex === 0} aria-label="Previous step">
            <svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button class="primary" on:click={advance}>
            {floorIndex < board.floors.length - 1 ? 'Go deeper' : boardIndex === boards.length - 1 ? 'Finish' : 'Next board'}
            <svg viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
      {/if}
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
  .board-card { flex: 1; min-height: 610px; background: var(--qx-surface); border: 1px solid var(--qx-border); border-radius: 24px; box-shadow: var(--qx-shadow-card); padding: 21px 18px 18px; display: flex; flex-direction: column; overflow: hidden; }
  .board-card.check-mode { justify-content: center; }
  .board-heading { margin-bottom: 13px; }
  .micro-label { color: var(--qx-accent-text); font-size: 10px; line-height: 1; letter-spacing: .13em; font-weight: 900; text-transform: uppercase; }
  h1 { color: var(--qx-text); font-size: 27px; line-height: 1.08; letter-spacing: -.035em; margin-top: 7px; }
  .stage { min-height: 300px; border-radius: 18px; border: 1px solid var(--qx-border); background: var(--qx-surface-2); padding: 17px 14px 13px; display: flex; flex-direction: column; justify-content: center; position: relative; overflow: hidden; }
  .range-row { display: grid; grid-template-columns: 28px 1fr 28px; align-items: center; gap: 8px; color: var(--qx-text-faint); font-size: 10px; font-weight: 800; width: 100%; margin-top: 13px; }
  .range-row span:last-child { text-align: right; }
  input[type='range'] { width: 100%; accent-color: var(--qx-accent); cursor: pointer; }
  .square-stage { min-height: 215px; display: grid; grid-template-columns: 1fr 126px; align-items: center; gap: 10px; }
  .square { max-width: 152px; max-height: 152px; justify-self: center; border: 3px solid var(--qx-accent); background: var(--qx-accent-soft); display: grid; place-items: center; border-radius: 5px; transition: width .12s, height .12s; }
  .square span { font: italic 800 34px/1 Georgia, serif; color: var(--qx-accent-text); }
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
  .floor-copy { padding: 15px 4px 5px; min-height: 122px; }
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
  .check-panel { display: flex; flex-direction: column; gap: 17px; }
  .check-topline { display: flex; justify-content: space-between; color: var(--qx-accent-text); font-size: 10px; letter-spacing: .12em; font-weight: 900; }
  .check-topline span:last-child { color: var(--qx-text-faint); letter-spacing: 0; }
  .check-visual { min-height: 150px; display: flex; align-items: center; justify-content: center; gap: 16px; background: var(--qx-surface-2); border: 1px solid var(--qx-border); border-radius: 18px; }
  .check-visual svg { width: 44px; fill: none; stroke: var(--qx-accent); stroke-width: 2.3; stroke-linecap: round; stroke-linejoin: round; }
  .mini-square { display: flex; flex-direction: column; align-items: center; justify-content: center; border-radius: 6px; font-size: 12px; font-weight: 900; color: var(--qx-text-dim); }
  .mini-square span { color: var(--qx-text); font-size: 23px; }
  .mini-square.old { width: 78px; height: 78px; border: 2px solid var(--qx-text-faint); }
  .mini-square.fresh { width: 100px; height: 100px; border: 3px solid var(--qx-green); background: var(--qx-green-soft); }
  .check-panel h1 { font-size: 25px; }
  .check-options { display: grid; grid-template-columns: repeat(3, 1fr); gap: 9px; }
  .check-options button { min-height: 52px; border-radius: 13px; border: 1px solid var(--qx-border-2); background: var(--qx-surface-2); color: var(--qx-text); font-size: 18px; font-weight: 900; cursor: pointer; }
  .check-options button.correct { border-color: var(--qx-green); background: var(--qx-green-soft); color: var(--qx-green-text); }
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
