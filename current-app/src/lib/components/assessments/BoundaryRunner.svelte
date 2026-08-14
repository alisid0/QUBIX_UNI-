<script>
  // Boundary Runner — Solve First limits discovery arcade game v3.
  // Six missions with ArcadeShell HUD, SVG playfield, probe controls.
  import ArcadeShell from './ArcadeShell.svelte';
  import SolveFirstPause from './SolveFirstPause.svelte';
  import { fly } from 'svelte/transition';
  import { generateLevel, LEVEL_NAMES, LEVEL_DESCRIPTIONS, LEVEL_HINTS, computeReward } from '../../content/boundaryRunner.js';

  export let config;
  export let onDone = () => {};
  export let onExit = () => {};

  // reduced-motion: JS gate for transitions; CSS handles animation.
  $: reduceMotion = typeof matchMedia !== 'undefined'
    && matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Game state
  let levelIx = -1, hintUsed = false, recorded = false;
  let arcadeScore = 0, combo = 0, levelResults = [];
  let phase = 'briefing';    // briefing | playing | reveal
  $: totalLevels = 6;

  // Level state
  let level = null;
  let probes = {
    left: { x: 0, active: false },
    right: { x: 0, active: false }
  };
  let samples = [], activeSide = 'left';
  let prediction = null, predictionCorrect = false, levelCleared = false;
  let mistakes = 0, hintVisible = false;
  let pendingBeat = '';
  // Reactor-specific
  let reactorStage = 0;
  // Far-Horizon-specific
  let farStage = 0, farPrediction, farCorrect;
  // Safety-Corridor-specific
  let corridorDelta, corridorTested, corridorPassed, corridorRound = 0;

  // SVG geometry
  const W = 300, H = 200, PL = 36, PR = 12, PT = 14, PB = 30;
  const plotW = W - PL - PR, plotH = H - PT - PB;
  let svgEl, liveRegion;

  function sx(x) { return PL + ((x - viewMin) / Math.max(0.01, viewMax - viewMin)) * plotW; }
  function sy(y) { return (H - PB) - ((y - viewYMin) / Math.max(0.01, viewYMax - viewYMin)) * plotH; }

  // Viewport — uses active reactor stage for reactor levels
  $: activeReactor = level && level.kind === 'reactor' ? level.stages[reactorStage] : null;
  $: activeFn = level && level.kind === 'reactor' ? activeReactor?.fn
    : level && level.kind === 'farHorizon' ? (farStage === 0 ? level.fn1 : level.fn2)
    : level?.fn;
  $: boundaryA = level && level.kind === 'reactor' ? activeReactor?.a
    : level?.a;
  $: viewMin = level && level.kind === 'farHorizon' ? 0 : (boundaryA != null ? boundaryA - 5 : -5);
  $: viewMax = level && level.kind === 'farHorizon' ? 20 : (boundaryA != null ? boundaryA + 5 : 5);
  $: viewYMin = level && level.kind === 'farHorizon' ? 0 : (level && level.kind === 'reactor' ? -2 : 0);
  $: viewYMax = level && level.kind === 'farHorizon' ? 120
    : (level && level.kind === 'reactor' ? 20 : 12);

  // Probe ops — step sizes and boundary enforcement
  const STEPS = [2, 1, 0.5, 0.25, 0.1, 0.05];

  function initProbes(lvl, rStage) {
    const a = lvl.kind === 'reactor' ? lvl.stages[rStage].a : lvl.a;
    if (lvl.kind === 'farHorizon') {
      probes = { left: { x: 2, active: false }, right: { x: 8, active: false } };
    } else {
      probes = { left: { x: a - 3, active: false },
                 right: { x: a + 3, active: false } };
    }
    activeSide = 'left';
  }

  function moveProbe(side, delta) {
    if (!level || levelCleared || pendingBeat) return;
    const p = probes[side];
    const a = boundaryA;
    let nx = p.x + delta;
    if (level.kind !== 'farHorizon') {
      if (side === 'left') nx = Math.min(nx, a - 0.001);
      else nx = Math.max(nx, a + 0.001);
    }
    nx = Math.max(viewMin, Math.min(viewMax, nx));
    probes = { ...probes, [side]: { ...p, x: nx, active: true } };
  }

  function sampleProbe(side) {
    if (!level || levelCleared || pendingBeat || !activeFn) return;
    const p = probes[side];
    if (!p.active) return;
    const x = p.x, y = activeFn(x);
    if (!samples.find(s => s.side === side && Math.abs(s.x - x) < 0.0001)) {
      samples = [...samples, { side, x, y, latest: true }];
    }
    samples = samples.map(s => ({ ...s, latest: s.side === side && Math.abs(s.x - x) < 0.0001 }));
    announce(`Probe reading: ${y.toFixed(2)}`);
  }

  function clearSamples(resetMistakes = true) {
    samples = []; prediction = null; predictionCorrect = false;
    levelCleared = false;
    if (resetMistakes) mistakes = 0;
    farPrediction = null; farCorrect = false;
    corridorDelta = null; corridorTested = false; corridorPassed = false;
    hintVisible = false;
  }

  // Announce
  function announce(msg) {
    if (liveRegion) { liveRegion.textContent = msg; }
  }

  // Level lifecycle
  function startLevel(ix) {
    levelIx = ix;
    level = generateLevel(ix, Date.now());
    pendingBeat = '';
    reactorStage = 0; farStage = 0; corridorRound = 0;
    initProbes(level, 0);
    clearSamples();
  }

  function useHint() {
    if (!hintVisible) hintUsed = true;
    hintVisible = !hintVisible;
  }

  // Reactor: advance stage
  function advanceReactor() {
    if (reactorStage < level.stages.length - 1) {
      pendingBeat = 'reactor';
    } else { levelCleared = true; combo++; arcadeScore += (100 + combo * 20); }
  }

  function answerReactorStage(answer) {
    if (!activeReactor || !evidenceReady || pendingBeat) return;
    const correct = activeReactor.answer;
    if (answer === correct) { advanceReactor(); }
    else { mistakes++; }
  }

  // Far Horizon: two-stage progression
  function submitFarPrediction() {
    if (!level || level.kind !== 'farHorizon' || !farEvidenceReady || pendingBeat) return;
    const target = farStage === 0 ? level.L : level.L2;
    if (Math.abs(Number(farPrediction) - target) < 1) {
      farCorrect = true;
      if (farStage === 0) {
        pendingBeat = 'far';
      } else {
        levelCleared = true; combo++; arcadeScore += (100 + combo * 20);
      }
    } else { mistakes++; }
  }

  // Prediction (levels 1-3)
  function submitPrediction() {
    if (!level || !evidenceReady) return;
    if (level.kind === 'converge' || level.kind === 'ghost') {
      predictionCorrect = Math.abs(Number(prediction) - level.L) < 0.1;
    } else if (level.kind === 'split') {
      predictionCorrect = prediction === 'none';
    }
    if (!predictionCorrect) mistakes++;
    else { levelCleared = true; combo++; arcadeScore += (100 + combo * 20); }
  }

  // Safety Corridor
  $: corridorRounds = level && level.kind === 'safetyCorridor' ? level.rounds : [];
  $: activeCorridor = corridorRounds[corridorRound] || null;
  $: corridorBounds = activeCorridor
    ? { min: activeCorridor.deltaMin, max: activeCorridor.deltaMax, step: activeCorridor.deltaStep }
    : { min: 0.01, max: 3, step: 0.01 };

  function testCorridor() {
    if (!activeCorridor || !corridorDelta || pendingBeat) return;
    const { x0, fn, L, epsilon } = activeCorridor;
    let allPass = true;
    for (let i = 0; i < 80; i++) {
      const tx = x0 - corridorDelta + 2 * corridorDelta * (i / 79);
      if (Math.abs(fn(tx) - L) >= epsilon - 1e-10) { allPass = false; break; }
    }
    corridorTested = true; corridorPassed = allPass;
    if (allPass) {
      combo++; arcadeScore += (150 + combo * 20);
      if (corridorRound < corridorRounds.length - 1) {
        pendingBeat = 'corridor';
      } else { levelCleared = true; }
    } else { mistakes++; }
  }

  function continueBeat() {
    if (pendingBeat === 'reactor') {
      pendingBeat = '';
      reactorStage++;
      initProbes(level, reactorStage);
      clearSamples(false);
      announce('Reactor stage ' + (reactorStage + 1) + ' of ' + level.stages.length);
      return;
    }
    if (pendingBeat === 'far') {
      pendingBeat = '';
      farStage = 1;
      farPrediction = null;
      farCorrect = false;
      samples = [];
      initProbes(level, 0);
      hintVisible = false;
      announce('Stage 2: rational asymptote');
      return;
    }
    if (pendingBeat === 'corridor') {
      pendingBeat = '';
      corridorRound++;
      corridorDelta = null;
      corridorTested = false;
      corridorPassed = false;
      announce('Round ' + (corridorRound + 1) + ': tighter tolerance');
    }
  }

  function clearLevel() {
    if (!levelCleared) return;
    levelResults = [...levelResults, { li: levelIx, cleared: true, perfect: mistakes === 0 }];
    if (levelIx < totalLevels - 1) { startLevel(levelIx + 1); announce(LEVEL_NAMES[levelIx] + ' — begin'); }
    else { finishGame(); }
  }

  function finishGame() {
    phase = 'reveal';
    if (!recorded) {
      recorded = true;
      onDone({ id: config.id, reward: computeReward(levelResults, hintUsed),
        arcadeScore, levelsCleared: levelResults.filter(r=>r.cleared).length,
        perfectLevels: levelResults.filter(r=>r.perfect).length,
        patternFound: true, compared: true,
        transferFirstTry: levelResults.every(r=>r.perfect), usedHint: hintUsed });
    }
  }

  function restart() {
    levelIx = -1; hintUsed = false; recorded = false; arcadeScore = 0; combo = 0;
    levelResults = []; phase = 'briefing'; level = null; samples = [];
    hintVisible = false; pendingBeat = ''; reactorStage = 0; farStage = 0; corridorRound = 0;
  }

  // Keyboard: only when playfield is focused
  function handlePlayfieldKeydown(e) {
    if (phase !== 'playing' || !level) return;
    const step = level.kind === 'farHorizon' ? 1 : 0.25;
    if (e.key === 'ArrowLeft') { moveProbe(activeSide, -step); e.preventDefault(); }
    if (e.key === 'ArrowRight') { moveProbe(activeSide, step); e.preventDefault(); }
    if (e.key === ' ') { sampleProbe(activeSide); e.preventDefault(); }
  }

  // Evidence gates
  $: leftSamples = samples.filter(s => s.side === 'left');
  $: rightSamples = samples.filter(s => s.side === 'right');
  $: minSamples = 2;
  $: hasBothSides = leftSamples.length >= minSamples && rightSamples.length >= minSamples;
  $: hasCloseLeft = leftSamples.some(s => Math.abs(s.x - boundaryA) < 0.6);
  $: hasCloseRight = rightSamples.some(s => Math.abs(s.x - boundaryA) < 0.6);
  $: evidenceReady = hasBothSides && hasCloseLeft && hasCloseRight;
  $: farEvidenceReady = level && level.kind === 'farHorizon'
    ? samples.length >= 3 && samples.some(s => s.x >= 15)
    : false;
  $: controlStep = level && level.kind === 'farHorizon' ? 2 : 0.5;

  $: showPrediction = level && (level.kind === 'converge' || level.kind === 'ghost' || level.kind === 'split');

  // Curve path
  $: curvePath = level && level.kind !== 'safetyCorridor' ? buildCurve() : '';
  function buildCurve() {
    if (!level || !activeFn) return '';
    const lo = viewMin, hi = viewMax;
    const step = (hi - lo) / 160; let d = ''; let prevY = null;
    for (let x = lo; x <= hi; x += step) {
      const y = activeFn(x);
      if (prevY !== null && Math.abs(y - prevY) > 200) { d = ''; prevY = y; continue; }
      const py = sy(y);
      if (py < PT - 60 || py > H - PB + 60) { d = ''; prevY = y; continue; }
      d += (d ? ' L' : 'M') + sx(x).toFixed(1) + ',' + py.toFixed(1);
      prevY = y;
    }
    return d;
  }

  $: leftPx = level ? sx(probes.left.x) : 0;
  $: rightPx = level ? sx(probes.right.x) : 0;
  $: probeY = H - PB - 6;
  $: leftDist = boundaryA != null ? (boundaryA - probes.left.x).toFixed(2) : '?';
  $: rightDist = boundaryA != null ? (probes.right.x - boundaryA).toFixed(2) : '?';
  $: playfieldSummary = level && level.kind === 'farHorizon'
    ? `Long-run playfield. Near probe at input ${probes.left.x.toFixed(2)}. Far probe at input ${probes.right.x.toFixed(2)}.`
    : `Probe playfield: ${LEVEL_NAMES[levelIx]}. West probe at ${leftDist} from boundary. East probe at ${rightDist} from boundary.`;
  $: sampleDots = samples.map(s => ({
    px: sx(s.x), py: sy(s.y), side: s.side, latest: s.latest, y: s.y
  }));
  $: flashSample = samples.filter(s => s.latest).length;
</script>

<svelte:window on:keydown={(e) => { if (e.key === 'Tab') return; /* preserve Tab */ }} />

<ArcadeShell eyebrow={config.eyebrow} title={config.title} level={levelIx + 1}
  totalLevels={totalLevels} score={arcadeScore} streak={combo} onExit={onExit}>

  <!-- Live region for screen-reader announcements -->
  <div class="sr-only" bind:this={liveRegion} role="status" aria-live="polite"></div>

  {#if phase === 'briefing'}
    <div class="brief" in:fly={{ x: reduceMotion ? 0 : 20, duration: reduceMotion ? 0 : 200 }}>
      <div class="portal-mark" aria-hidden="true"><span class="pl"></span><span class="pc"></span><span class="pr"></span></div>
      <div class="kicker">Boundary Runner · {totalLevels} missions</div>
      <h2>Recover the signal before the boundary collapses.</h2>
      <p>A damaged portal blocks direct access. Two probes approach from opposite sides. Gather evidence and reconstruct only what the data supports.</p>
      <div class="mission-rules">
        <span>Both probes required</span><span>Evidence over guesses</span><span>No penalty for mistakes</span>
      </div>

      <!-- Mission map: six-light rail -->
      <div class="mission-rail" aria-label="Six mission lights">
        {#each LEVEL_NAMES as _, i}<span class="rail-dot" class:lit={false}></span>{/each}
      </div>

      <button class="primary" on:click={() => { phase = 'playing'; startLevel(0); announce('Mission 1: Convergence Run'); }}>
        Launch probes
      </button>
    </div>

  {:else if phase === 'playing' && level}
    <div class="game-area" in:fly={{ x: reduceMotion ? 0 : 20, duration: reduceMotion ? 0 : 200 }}>
      <div class="level-header">
        <span>Mission {levelIx + 1}/{totalLevels}
          {#if level.kind === 'reactor'} · Check {reactorStage + 1}/{level.stages.length}{/if}
          {#if level.kind === 'farHorizon'} · Stage {farStage + 1} of 2{/if}
          {#if level.kind === 'safetyCorridor'} · Round {corridorRound + 1}/{corridorRounds.length}{/if}
        </span>
        <strong>{LEVEL_NAMES[levelIx]}</strong>
        <small>{LEVEL_DESCRIPTIONS[levelIx]}</small>
      </div>

      <!-- Hint button -->
      <button class="hint-link" on:click={useHint} aria-label="Request a hint (small reward trade-off)">
        {hintUsed ? (hintVisible ? '▲ Hide hint' : 'Need a clue?') : 'Need a clue?'}
      </button>
      {#if hintVisible && hintUsed}
        <div class="hint-box" role="note">{LEVEL_HINTS[levelIx]}</div>
      {/if}

      <!-- Playfield group — focusable for keyboard probe control -->
      <button type="button" class="playfield-focus"
        aria-roledescription="interactive limits graph"
        aria-label={playfieldSummary} on:keydown={handlePlayfieldKeydown}>
      <svg class="playfield" viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
        <defs><pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M 30 0 L 0 0 0 30" fill="none" stroke="var(--qx-border)" stroke-width="0.4" opacity="0.4"/></pattern></defs>
        <rect x={PL} y={PT} width={plotW} height={plotH} fill="url(#grid)" />
        <line x1={PL} y1={H - PB} x2={W - PR} y2={H - PB} stroke="var(--qx-text-faint)" stroke-width="1" />
        <line x1={sx(viewMin > 0 ? viewMin : 0)} y1={PT} x2={sx(viewMin > 0 ? viewMin : 0)} y2={H - PB} stroke="var(--qx-text-faint)" stroke-width="1" opacity="0.5" />

        <!-- Ghost marker -->
        {#if level.kind === 'ghost'}
          <circle cx={sx(level.a)} cy={sy(level.L)} r="5" fill="none" stroke="var(--qx-green)" stroke-width="2" stroke-dasharray="4,3" />
          <circle cx={sx(level.a)} cy={sy(level.M)} r="4" fill="var(--qx-danger)" opacity="0.7" />
        {/if}

        <!-- Curve -->
        {#if curvePath}
          <path d={curvePath} fill="none" stroke="var(--qx-accent)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
        {/if}

        <!-- Reactor asymptote -->
        {#if level.kind === 'reactor' && activeReactor}
          <line x1={sx(activeReactor.a)} y1={PT} x2={sx(activeReactor.a)} y2={H - PB}
            stroke="var(--qx-danger)" stroke-width="2" stroke-dasharray="6,4" opacity="0.7" />
        {/if}

        <!-- Sample dots -->
        {#each sampleDots as dot}
          <circle cx={dot.px} cy={dot.py} r={dot.latest ? 5 : 3.5}
            fill={dot.side === 'left' ? 'var(--qx-accent)' : 'var(--qx-pink)'}
            stroke="var(--qx-surface)" stroke-width="1.5" />
          {#if dot.latest}<text x={dot.px} y={dot.py - 10} text-anchor="middle" font-size="9" font-weight="800" fill="var(--qx-text)">{dot.y}</text>{/if}
        {/each}

        <!-- Probes -->
        <g transform={`translate(${leftPx},${probeY})`}>
          <polygon points="-8,8 0,-10 8,8" fill="var(--qx-accent)" stroke="var(--qx-surface)" stroke-width="1.2" />
          <circle r="12" fill="none" stroke="var(--qx-accent)" stroke-width="1" opacity={reduceMotion ? 0 : 0.4} class="pulse-ring" />
        </g>
        <g transform={`translate(${rightPx},${probeY})`}>
          <polygon points="-8,8 0,-10 8,8" fill="var(--qx-pink)" stroke="var(--qx-surface)" stroke-width="1.2" />
          <circle r="12" fill="none" stroke="var(--qx-pink)" stroke-width="1" opacity={reduceMotion ? 0 : 0.4} class="pulse-ring" />
        </g>
      </svg>
      </button>

      <!-- Probe controls — Tab navigable -->
      <div class="probe-panel">
        <div class="probe-card" class:active={activeSide === 'left'}>
          <span class="probe-label" id="west-label">
            {level.kind === 'farHorizon' ? `Near probe · input ${probes.left.x.toFixed(2)}` : `◄ West probe · ${leftDist} from boundary`}
          </span>
          <strong>{probes.left.x.toFixed(2)}</strong>
          <div class="probe-dir" role="group" aria-labelledby="west-label">
            <button on:click={() => moveProbe('left', -controlStep)} aria-label="Move first probe to a smaller input" tabindex="0">◄</button>
            <button on:click={() => { activeSide = 'left'; sampleProbe('left'); }} aria-label="Sample first probe reading" tabindex="0">Sample</button>
            <button on:click={() => moveProbe('left', controlStep)} aria-label="Move first probe to a larger input" tabindex="0">►</button>
          </div>
        </div>
        <div class="probe-card right-card" class:active={activeSide === 'right'}>
          <span class="probe-label" id="east-label">
            {level.kind === 'farHorizon' ? `Far probe · input ${probes.right.x.toFixed(2)}` : `East probe ► · ${rightDist} from boundary`}
          </span>
          <strong>{probes.right.x.toFixed(2)}</strong>
          <div class="probe-dir" role="group" aria-labelledby="east-label">
            <button on:click={() => moveProbe('right', -controlStep)} aria-label="Move second probe to a smaller input" tabindex="0">◄</button>
            <button on:click={() => { activeSide = 'right'; sampleProbe('right'); }} aria-label="Sample second probe reading" tabindex="0">Sample</button>
            <button on:click={() => moveProbe('right', controlStep)} aria-label="Move second probe to a larger input" tabindex="0">►</button>
          </div>
        </div>
      </div>

      <!-- Evidence panel -->
      <div class="evidence-panel" aria-live="polite">
        <div>
          <span class="evidence-status">{level.kind === 'farHorizon' ? 'Near' : 'West'}: {level.kind === 'farHorizon' ? leftSamples.length : leftSamples.length >= minSamples ? 'complete' : `${leftSamples.length}/${minSamples} needed`}</span>
          {#if leftSamples.length}<span class="vals">{leftSamples.map(s => s.y).join(', ')}</span>{/if}
        </div>
        <div>
          <span class="evidence-status">{level.kind === 'farHorizon' ? 'Far' : 'East'}: {level.kind === 'farHorizon' ? rightSamples.length : rightSamples.length >= minSamples ? 'complete' : `${rightSamples.length}/${minSamples} needed`}</span>
          {#if rightSamples.length}<span class="vals">{rightSamples.map(s => s.y).join(', ')}</span>{/if}
        </div>
        {#if level.kind === 'farHorizon' && !farEvidenceReady}
          <div class="evidence-hint">Collect at least three readings, including one at input 15 or beyond.</div>
        {:else if !evidenceReady && hasBothSides}
          <div class="evidence-hint">Collect a close reading (&lt;0.6 from boundary) on each side.</div>
        {/if}
      </div>

      <!-- Prediction (levels 1-3) — gated behind evidenceReady -->
      {#if showPrediction && evidenceReady}
        <div class="prediction-panel">
          <strong>{level.kind === 'split' ? 'Do both sides agree on a single destination?' : 'What value do both probes approach?'}</strong>
          {#if level.kind === 'split'}
            <div class="pred-btns">
              <button on:click={() => { prediction = 'none'; submitPrediction(); }} class:correct={predictionCorrect && prediction === 'none'} class:wrong={prediction !== null && !predictionCorrect}>Refuse — no single value</button>
            </div>
          {:else}
            <label for="pred-input" class="sr-only">Predicted limit value</label>
            <input id="pred-input" type="number" step="0.1" bind:value={prediction} placeholder="Predicted value" on:keydown={(e) => e.key === 'Enter' && submitPrediction()} />
            <button on:click={submitPrediction} disabled={prediction === null || prediction === ''}>Lock prediction</button>
          {/if}
          {#if predictionCorrect}<div class="ok">✓ Readings support this destination.</div>{/if}
          {#if prediction !== null && !predictionCorrect}<div class="err">Check the nearest readings again.</div>{/if}
        </div>
      {/if}

      <!-- Reactor Wall — gated behind evidenceReady -->
      {#if level.kind === 'reactor' && activeReactor}
        <div class="reactor-panel">
          <p>{activeReactor.label}: {activeReactor.desc}</p>
          {#if evidenceReady}
            <div class="pred-btns">
              <button on:click={() => answerReactorStage('bothPosInf')}>Rises on both sides</button>
              <button on:click={() => answerReactorStage('opposite')}>Opposite directions</button>
              <button on:click={() => answerReactorStage('finite')}>Large but finite peak</button>
            </div>
          {:else}
            <small>Gather near-boundary readings from both sides before classifying the signal.</small>
          {/if}
        </div>
      {/if}

      <!-- Far Horizon -->
      {#if level.kind === 'farHorizon'}
        <div class="prediction-panel">
          <strong>Stage {farStage + 1} of 2 — {farStage === 0 ? 'Exponential settling' : 'Rational asymptote'}: what value does the system approach?</strong>
          {#if farEvidenceReady}
            <label for="far-input" class="sr-only">Predicted settling value</label>
            <input id="far-input" type="number" step="1" bind:value={farPrediction} placeholder="Settling value" on:keydown={(e) => e.key === 'Enter' && submitFarPrediction()} />
            <button on:click={submitFarPrediction} disabled={farPrediction === null || farPrediction === ''}>Lock prediction</button>
          {:else}
            <small>Send probes farther out and collect enough evidence to unlock a prediction.</small>
          {/if}
          {#if farCorrect && farStage === 0}<div class="ok">✓ Stage 1 cleared. Stage 2: rational function.</div>{/if}
          {#if farCorrect && farStage === 1}<div class="ok">✓ Both stages cleared.</div>{/if}
        </div>
      {/if}

      <!-- Safety Corridor -->
      {#if level.kind === 'safetyCorridor' && activeCorridor}
        <div class="corridor-panel">
          <strong>Round {corridorRound + 1} of {corridorRounds.length}: {activeCorridor.label}</strong>
          <p>Keep output within ±{activeCorridor.epsilon} of {activeCorridor.L}. Choose an input corridor around x = {activeCorridor.x0}.</p>
          <div class="corridor-controls">
            <label for="delta-range">Input corridor δ:</label>
            <input id="delta-range" type="range" min={corridorBounds.min} max={corridorBounds.max}
              step={corridorBounds.step} bind:value={corridorDelta}
              disabled={corridorTested && corridorPassed} />
            <strong>{corridorDelta || '?'}</strong>
          </div>
          <button on:click={testCorridor} disabled={!corridorDelta || (corridorTested && corridorPassed)}>Test corridor</button>
          {#if corridorTested}
            {#if corridorPassed}
              <div class="ok">All challenge probes passed within δ={corridorDelta}. This is evidence for a valid corridor. A formal proof must guarantee every permitted input.</div>
            {:else}
              <div class="err">Some probes escaped. Tighten the corridor.</div>
            {/if}
          {/if}
        </div>
      {/if}

      {#if pendingBeat}
        <SolveFirstPause
          title={pendingBeat === 'reactor'
            ? `Reactor check ${reactorStage + 1} is correct`
            : pendingBeat === 'far' ? 'The first long-run pattern is locked'
            : `Safety corridor ${corridorRound + 1} held`}
          message={pendingBeat === 'reactor'
            ? 'Keep the readings from both sides visible. They support this conclusion; the next check will change the boundary and ask whether the same reasoning survives.'
            : pendingBeat === 'far'
              ? 'The exponential settled toward one output as the input travelled farther out. Hold that evidence before comparing it with a different function.'
              : `Every tested input inside δ = ${corridorDelta} kept the output within the stated tolerance. The next round will tighten the requirement.`}
          actionLabel={pendingBeat === 'reactor'
            ? 'Continue to the next reactor check'
            : pendingBeat === 'far' ? 'Continue to the second pattern' : 'Continue to the tighter corridor'}
          onContinue={continueBeat}
        />
      {/if}

      {#if levelCleared}
        <button class="primary" on:click={clearLevel}>{levelIx < totalLevels - 1 ? 'Mission cleared → Next' : 'Complete — reveal the concept'}</button>
      {/if}
    </div>

  {:else if phase === 'reveal'}
    <div class="reveal" in:fly={{ x: reduceMotion ? 0 : 20, duration: reduceMotion ? 0 : 200 }}>
      <div class="kicker">The reasoning has a name</div>
      <h2>You investigated limits.</h2>
      <p>A limit describes where nearby outputs head as an input closes in on a point.</p>

      <div class="formula">
        <span>Formal notation</span>
        <strong>lim<sub>x→a</sub> f(x) = L</strong>
        <small>As x approaches a from both sides, f(x) approaches L.</small>
      </div>

      <ul class="reveal-list">
        <li><strong>Two-sided limit:</strong> you gathered evidence that both probes approach the same destination in Convergence Run.</li>
        <li><strong>Point value is separate:</strong> f(a) can differ from the limit. You repaired this in Ghost Platform.</li>
        <li><strong>Jump discontinuities:</strong> when left and right disagree, no single two-sided limit exists. You refused the false average in Split Gate.</li>
        <li><strong>Infinite limits:</strong> "infinity" describes unbounded growth, not a number. You classified these in Reactor Wall.</li>
        <li><strong>Limits at infinity:</strong> long-run behaviour as input grows without bound. You predicted settling values in Far Horizon.</li>
        <li><strong>Safety corridor:</strong> ε was your output tolerance; δ your input corridor. You tested that a tight enough δ keeps outputs within the band — evidence for the pattern the formal epsilon–delta definition demands as a guarantee.</li>
      </ul>

      <div class="reward-panel">
        <div class="reward-top">
          <div><span>Discovery distinction</span><strong>{config.rewardLabel}</strong></div>
          <b>+{computeReward(levelResults, hintUsed)} W</b>
        </div>
        <div class="reward-skills">
          <span class:earned={levelResults.length >= 6}>All missions</span>
          <span class:earned={levelResults.filter(r => r.perfect).length >= 4}>Precision</span>
          <span class:earned={!hintUsed}>Independent</span>
          <span class:earned={true}>Limits</span>
        </div>
      </div>
      <div class="reveal-actions">
        <button class="primary" on:click={onExit}>Return to workshops</button>
        <button class="secondary" on:click={restart}>Play again</button>
      </div>
    </div>
  {/if}
</ArcadeShell>

<style>
  .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
  .brief, .reveal, .game-area { display: flex; flex-direction: column; gap: 11px; padding: 0 4px; }
  .brief, .reveal { align-items: center; text-align: center; }
  .portal-mark { width: 120px; height: 80px; margin: 8px 0 12px; display: flex; align-items: center; justify-content: space-between; position: relative; }
  .portal-mark::before { content: ''; position: absolute; left: 4px; right: 4px; top: 50%; border-top: 2px solid var(--qx-text-faint); }
  .pl, .pr { width: 20px; height: 20px; border-radius: 50%; background: var(--qx-accent); box-shadow: 0 0 0 8px var(--qx-accent-soft); z-index: 1; }
  .pr { background: var(--qx-pink); box-shadow: 0 0 0 8px var(--qx-pink-soft); }
  .pc { width: 26px; height: 26px; border: 3px dashed var(--qx-danger); border-radius: 50%; background: var(--qx-surface); z-index: 1; }
  .kicker { color: var(--qx-accent); font-size: 10px; font-weight: 900; letter-spacing: 0.1em; text-transform: uppercase; }
  h2 { font-size: 22px; line-height: 1.15; margin: 4px 0 6px; font-weight: 950; }
  p { color: var(--qx-text-dim); font-size: 13px; line-height: 1.5; margin: 0; max-width: 40ch; }
  .mission-rules { display: flex; gap: 5px; flex-wrap: wrap; justify-content: center; margin: 12px 0 8px; }
  .mission-rules span { border: 1px solid var(--qx-border); border-radius: 999px; padding: 4px 9px; font-size: 9px; font-weight: 800; color: var(--qx-text-dim); background: var(--qx-surface-2); }

  /* Mission rail */
  .mission-rail { display: flex; gap: 6px; justify-content: center; margin: 8px 0; }
  .rail-dot { width: 12px; height: 12px; border-radius: 50%; border: 1.5px solid var(--qx-border); background: var(--qx-surface-2); }
  .rail-dot.lit { background: var(--qx-accent); border-color: var(--qx-accent); }

  .level-header { text-align: left; display: flex; flex-direction: column; gap: 3px; }
  .level-header span { color: var(--qx-accent); font-size: 9px; font-weight: 900; letter-spacing: 0.08em; text-transform: uppercase; }
  .level-header strong { font-size: 16px; }
  .level-header small { color: var(--qx-text-dim); font-size: 11px; line-height: 1.4; }

  .playfield-focus { display: block; width: 100%; padding: 0; border: 0; border-radius: 14px; background: transparent; color: inherit; outline: none; cursor: default; }
  .playfield-focus:focus-visible { outline: 2px solid var(--qx-accent); outline-offset: 2px; }
  .playfield { display: block; width: 100%; border: 1px solid var(--qx-border); border-radius: 14px; background: var(--qx-surface-elevated); touch-action: none; }

  /* Reduced-motion: stop pulse animations */
  @media (prefers-reduced-motion: reduce) {
    .pulse-ring { display: none; }
  }
  .pulse-ring { animation: pulse 1.2s ease-out infinite; }
  @keyframes pulse { 0% { r: 12; opacity: 0.4; } 100% { r: 22; opacity: 0; } }

  .probe-panel { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .probe-card { border: 1.5px solid var(--qx-border); border-radius: 12px; padding: 10px; background: var(--qx-surface); display: grid; justify-items: center; gap: 6px; }
  .probe-card.active { border-color: var(--qx-accent); }
  .right-card.active { border-color: var(--qx-pink); }
  .probe-label { font-size: 9px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.05em; color: var(--qx-accent-text); }
  .right-card .probe-label { color: var(--qx-pink-text); }
  .probe-card strong { font-size: 15px; font-weight: 950; }
  .probe-dir { display: flex; gap: 6px; width: 100%; }
  .probe-dir button { flex: 1; min-height: 44px; min-width: 44px; border: 1px solid var(--qx-border-2); border-radius: 8px; background: var(--qx-surface-2); color: var(--qx-text); font: 800 11px/1 var(--qx-font); cursor: pointer; }

  .evidence-panel { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 8px; font-size: 10px; font-weight: 700; color: var(--qx-text-dim); }
  .evidence-panel > div { min-width: 0; display: grid; align-content: start; gap: 3px; }
  .evidence-status { display: block; font-weight: 850; }
  .evidence-panel .vals { display: block; min-width: 0; color: var(--qx-accent-text); font-weight: 900; line-height: 1.35; overflow-wrap: anywhere; }
  .evidence-hint { grid-column: 1 / -1; font-size: 9px; color: var(--qx-text-faint); }

  .prediction-panel { border: 1.5px solid var(--qx-accent); border-radius: 12px; padding: 11px; background: var(--qx-accent-soft); display: grid; gap: 7px; }
  .prediction-panel strong { font-size: 12px; }
  .prediction-panel input { width: 100%; box-sizing: border-box; min-height: 44px; border: 1.5px solid var(--qx-border); border-radius: 10px; background: var(--qx-surface); color: var(--qx-text); font: 800 14px var(--qx-font); padding: 0 12px; text-align: center; }
  .pred-btns { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px; }
  .pred-btns button, .prediction-panel > button { min-height: 44px; border: 1.5px solid var(--qx-border-2); border-radius: 10px; background: var(--qx-surface); color: var(--qx-text); font: 800 10px/1.2 var(--qx-font); cursor: pointer; }
  .ok { color: var(--qx-green-text); font-size: 12px; font-weight: 900; }
  .err { color: var(--qx-danger-text); font-size: 12px; font-weight: 700; }
  .reactor-panel, .corridor-panel { border: 1.5px solid var(--qx-border); border-radius: 12px; padding: 11px; background: var(--qx-surface-2); display: grid; gap: 8px; }
  .corridor-controls { display: flex; align-items: center; gap: 10px; }
  .corridor-controls label { font-size: 11px; font-weight: 700; color: var(--qx-text-dim); white-space: nowrap; }
  .corridor-controls input { flex: 1; min-width: 60px; }
  .corridor-controls strong { font-size: 16px; min-width: 2em; text-align: center; }

  .hint-link { border: none; background: none; color: var(--qx-text-faint); font-family: var(--qx-font); font-size: 11px; font-weight: 800; cursor: pointer; align-self: center; min-height: 32px; min-width: 44px; }
  .hint-box { border-radius: 10px; padding: 9px 11px; color: var(--qx-accent-text); background: var(--qx-accent-soft); font-size: 11px; line-height: 1.4; }

  .primary, .secondary { min-height: 46px; width: 100%; border-radius: 999px; font-family: var(--qx-font); font-size: 14px; font-weight: 900; cursor: pointer; }
  .primary { border: none; background: var(--qx-accent); color: var(--qx-bg); }
  .primary:disabled { opacity: .42; cursor: not-allowed; }
  .secondary { border: 1.5px solid var(--qx-border-2); background: var(--qx-surface); color: var(--qx-text-dim); }

  .formula { width: 100%; box-sizing: border-box; border: 1.5px solid var(--qx-accent); border-radius: 13px; padding: 12px; background: var(--qx-accent-soft); display: grid; gap: 4px; text-align: left; }
  .formula span { color: var(--qx-accent-text); font-size: 9px; font-weight: 900; text-transform: uppercase; }
  .formula strong { font-size: 20px; font-weight: 950; }
  .formula small { font-size: 10px; color: var(--qx-text-dim); }
  .reveal-list { list-style: none; text-align: left; width: 100%; margin: 0; padding: 0; display: grid; gap: 5px; }
  .reveal-list li { border: 1px solid var(--qx-border); border-radius: 9px; padding: 8px 10px; background: var(--qx-surface-2); font-size: 11px; line-height: 1.4; color: var(--qx-text-dim); }
  .reveal-list strong { color: var(--qx-text); }
  .reward-panel { width: 100%; box-sizing: border-box; border: 1.5px solid var(--qx-green); border-radius: 14px; background: var(--qx-green-soft); padding: 12px; text-align: left; }
  .reward-top { display: flex; justify-content: space-between; align-items: center; }
  .reward-top div { display: flex; flex-direction: column; }
  .reward-top span { font-size: 9px; color: var(--qx-green-text); font-weight: 900; text-transform: uppercase; }
  .reward-top strong { font-size: 15px; }
  .reward-top b { color: var(--qx-green-text); font-size: 21px; }
  .reward-skills { display: flex; gap: 5px; flex-wrap: wrap; margin: 8px 0 6px; }
  .reward-skills span { border: 1px solid var(--qx-border); background: var(--qx-surface); border-radius: 999px; padding: 3px 7px; font-size: 9px; font-weight: 850; color: var(--qx-text-faint); }
  .reward-skills span.earned { color: var(--qx-green-text); border-color: var(--qx-green); }
  .reveal-actions { width: 100%; display: grid; gap: 7px; }

  @media (max-width: 360px) { h2 { font-size: 19px; } .probe-panel, .evidence-panel { grid-template-columns: 1fr; } .pred-btns { grid-template-columns: 1fr; } }
</style>
