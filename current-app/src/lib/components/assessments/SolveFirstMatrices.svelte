<script>
  // SolveFirstMatrices — problem-led discovery of the transformation matrix.
  // No lesson first: the learner bends a shape with two draggable "guide arrows"
  // (the basis vectors), proves that those two arrows decide where every point
  // lands (p = a·î + b·ĵ), transfers the rule to predict a new point, then the
  // name is revealed: a matrix is those two arrows, and matrix × vector is that
  // same follow-the-arrows rule.
  export let config;
  export let onDone = () => {};
  export let onExit = () => {};

  const reduceMotion = typeof matchMedia !== 'undefined'
    && matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── grid geometry ──
  const VB = 300, OX = 140, OY = 170, U = 30; // origin + px per unit
  const toX = (x) => OX + x * U;
  const toY = (y) => OY - y * U;
  const snap = (v) => Math.round(v);              // integer grid points (all targets are whole numbers)
  const clampV = (v) => Math.max(-4, Math.min(4, v));

  // An asymmetric "F" so scaling, mirroring and shear are all visible.
  const SHAPE = [[0,0],[0,2],[1.6,2],[1.6,1.5],[0.7,1.5],[0.7,1.15],[1.25,1.15],[1.25,0.7],[0.7,0.7],[0.7,0]];

  let iVec = { x: 1, y: 0 };
  let jVec = { x: 0, y: 1 };

  const T = (a, b) => ({ x: a * iVec.x + b * jVec.x, y: a * iVec.y + b * jVec.y });
  $: shapePath = SHAPE.map(([a, b], k) => { const p = T(a, b); return `${k ? 'L' : 'M'} ${toX(p.x).toFixed(1)} ${toY(p.y).toFixed(1)}`; }).join(' ') + ' Z';
  const origPath = SHAPE.map(([a, b], k) => `${k ? 'L' : 'M'} ${toX(a).toFixed(1)} ${toY(b).toFixed(1)}`).join(' ') + ' Z';

  // ── phases: stretch → flip → transfer → reveal ──
  const STEPS = [
    { id: 'stretch', label: 'Stretch' },
    { id: 'flip', label: 'Flip' },
    { id: 'transfer', label: 'Predict' },
    { id: 'reveal', label: 'Reveal' },
  ];
  let phase = 'stretch';
  let phaseDone = false;
  let showHint = false;
  let usedHint = false;
  let evidence = 0;

  // ── transfer sub-problem ──
  const TI = { x: 2, y: 0 }, TJ = { x: 0, y: 3 };  // fixed arrows for the prediction
  const TP = { a: 2, b: 1 };                        // point that rides them
  const TARGET = { x: TP.a * TI.x + TP.b * TJ.x, y: TP.a * TI.y + TP.b * TJ.y }; // (4,3)
  let marker = { x: 0, y: 0 };
  let transferDrops = 0;

  const near = (v, t, tol = 0.26) => Math.abs(v.x - t.x) <= tol && Math.abs(v.y - t.y) <= tol;

  function check() {
    if (phase === 'stretch') phaseDone = near(iVec, { x: 2, y: 0 }) && near(jVec, { x: 0, y: 1 });
    else if (phase === 'flip') phaseDone = near(iVec, { x: -1, y: 0 }) && near(jVec, { x: 0, y: 1 });
    else if (phase === 'transfer') phaseDone = near(marker, TARGET, 0.3);
  }

  // ── drag ──
  let dragging = null, svgEl;
  function toMath(evt) {
    const r = svgEl.getBoundingClientRect();
    const sx = (evt.clientX - r.left) * (VB / r.width);
    const sy = (evt.clientY - r.top) * (VB / r.height);
    return { x: clampV(snap((sx - OX) / U)), y: clampV(snap((OY - sy) / U)) };
  }
  function down(which, e) {
    if (phase === 'reveal') return;
    dragging = which;
    try { e.target.setPointerCapture(e.pointerId); } catch (_) {}
  }
  function moveDrag(e) {
    if (!dragging) return;
    const p = toMath(e);
    if (dragging === 'i') iVec = p;
    else if (dragging === 'j') jVec = p;
    else if (dragging === 'marker') marker = p;
    check();
  }
  function endDrag() {
    if (dragging === 'marker' && phase === 'transfer') transferDrops += 1;
    dragging = null;
  }

  function useHint() { showHint = true; usedHint = true; }

  function advance() {
    evidence += 1;
    showHint = false;
    if (phase === 'stretch') { phase = 'flip'; iVec = { x: 1, y: 0 }; jVec = { x: 0, y: 1 }; phaseDone = false; }
    else if (phase === 'flip') { phase = 'transfer'; iVec = { ...TI }; jVec = { ...TJ }; marker = { x: 0, y: 0 }; phaseDone = false; }
    else if (phase === 'transfer') finish();
  }

  $: evidenceScore = Math.min(evidence, 4);
  $: transferFirstTry = phaseDone && transferDrops <= 1;
  $: reward = Math.min(15, 6 + evidenceScore + (transferFirstTry ? 3 : 1) + (usedHint ? 0 : 2));

  function finish() {
    phase = 'reveal';
    onDone({
      id: config.id,
      reward,
      evidenceCount: evidence + 2,
      patternFound: true,
      compared: true,
      transferFirstTry,
      usedHint,
    });
  }

  // arrow ends for the transfer reference
  $: dispI = phase === 'transfer' ? TI : iVec;
  $: dispJ = phase === 'transfer' ? TJ : jVec;
</script>

<div class="sf">
  {#if phase === 'reveal'}
    <div class="reveal">
      <div class="reveal-kicker">Concept uncovered</div>
      <h2>You discovered the transformation matrix.</h2>
      <p class="reveal-lead">The two guide arrows <b>are</b> the matrix — its columns. Every point follows the same rule you used: <b>a·î + b·ĵ</b>. That rule is exactly “matrix × vector”.</p>

      <div class="matrix-viz">
        <span class="bracket">[</span>
        <div class="col i"><span>{TI.x}</span><span>{TI.y}</span><small>î</small></div>
        <div class="col j"><span>{TJ.x}</span><span>{TJ.y}</span><small>ĵ</small></div>
        <span class="bracket">]</span>
        <span class="times">×</span>
        <div class="col v"><span>{TP.a}</span><span>{TP.b}</span></div>
        <span class="times">=</span>
        <div class="col r"><span>{TARGET.x}</span><span>{TARGET.y}</span></div>
      </div>

      <div class="reward-panel">
        <div class="reward-top">
          <div><span>Discovery distinction</span><strong>{config.rewardLabel}</strong></div>
          <b>+{reward} W</b>
        </div>
        <div class="reward-skills">
          <span>Basis vectors</span><span>Linear maps</span><span>Matrix × vector</span>
        </div>
      </div>

      <div class="reveal-actions">
        <button class="primary" on:click={onExit}>Return to workshops</button>
      </div>
    </div>
  {:else}
    <button class="exit" on:click={onExit} aria-label="Return to all workshops">←</button>
    <div class="head">
      <span class="eyebrow">{config.eyebrow}</span>
      <h2>{config.title}</h2>
    </div>

    <div class="rail" aria-hidden="true">
      {#each STEPS as s (s.id)}
        <span class="rail-dot" class:done={STEPS.findIndex(x => x.id === phase) > STEPS.findIndex(x => x.id === s.id)} class:cur={s.id === phase}>{s.label}</span>
      {/each}
    </div>
    <div class="reveal-note">Names revealed at the end</div>

    <!-- the grid -->
    <svg class="grid" viewBox="0 0 {VB} {VB}" bind:this={svgEl}
         on:pointermove={moveDrag} on:pointerup={endDrag} on:pointerleave={endDrag} role="application" aria-label="Warp grid">
      {#each [-4,-3,-2,-1,0,1,2,3,4] as g}
        <line class="gl" x1={toX(g)} y1={toY(-4)} x2={toX(g)} y2={toY(4)} />
        <line class="gl" x1={toX(-4)} y1={toY(g)} x2={toX(4)} y2={toY(g)} />
      {/each}
      <line class="axis" x1={toX(-4)} y1={toY(0)} x2={toX(4)} y2={toY(0)} />
      <line class="axis" x1={toX(0)} y1={toY(-4)} x2={toX(0)} y2={toY(4)} />

      {#if phase !== 'transfer'}
        <path class="orig" d={origPath} />
        <path class="warped" d={shapePath} style={`transition: d ${reduceMotion ? 0 : 120}ms linear;`} />
      {:else}
        <!-- prediction scene: the point that rides the arrows -->
        <circle class="startpt" cx={toX(TP.a)} cy={toY(TP.b)} r="5" />
        <text class="ptlabel" x={toX(TP.a) + 8} y={toY(TP.b) - 6}>start ({TP.a}, {TP.b})</text>
        <circle class="marker" class:ok={phaseDone} cx={toX(marker.x)} cy={toY(marker.y)} r="9"
                on:pointerdown={(e) => down('marker', e)} role="button" tabindex="0" aria-label="Prediction marker" />
      {/if}

      <!-- guide arrows -->
      <line class="arm i" x1={toX(0)} y1={toY(0)} x2={toX(dispI.x)} y2={toY(dispI.y)} />
      <line class="arm j" x1={toX(0)} y1={toY(0)} x2={toX(dispJ.x)} y2={toY(dispJ.y)} />
      {#if phase !== 'transfer'}
        <circle class="knob i" cx={toX(iVec.x)} cy={toY(iVec.y)} r="8" on:pointerdown={(e) => down('i', e)} role="button" tabindex="0" aria-label="Red guide arrow" />
        <circle class="knob j" cx={toX(jVec.x)} cy={toY(jVec.y)} r="8" on:pointerdown={(e) => down('j', e)} role="button" tabindex="0" aria-label="Blue guide arrow" />
      {:else}
        <circle class="knob i locked" cx={toX(TI.x)} cy={toY(TI.y)} r="6" />
        <circle class="knob j locked" cx={toX(TJ.x)} cy={toY(TJ.y)} r="6" />
      {/if}
    </svg>

    <div class="readout">
      <span class="chip i">î = ({dispI.x}, {dispI.y})</span>
      <span class="chip j">ĵ = ({dispJ.x}, {dispJ.y})</span>
    </div>

    <div class="task">
      {#if phase === 'stretch'}
        Drag the two arrows so the shape is <b>twice as wide</b> but the same height. Watch which arrow controls what.
      {:else if phase === 'flip'}
        Now <b>mirror</b> the shape — flip it left-to-right — without squashing it.
      {:else}
        The two arrows are locked. A point starts at <b>({TP.a}, {TP.b})</b>. Drag the marker to where these arrows send it.
      {/if}
    </div>

    {#if phaseDone}
      <div class="good">
        {#if phase === 'stretch'}Nice — the red arrow î stretched the width; the blue arrow ĵ held the height.
        {:else if phase === 'flip'}That’s a reflection — pushing î to the other side mirrors every point at once.
        {:else}Exactly. You followed 2 red + 1 blue: 2·(2,0) + 1·(0,3) = (4,3).
        {/if}
      </div>
      <button class="primary" on:click={advance}>{phase === 'transfer' ? 'Reveal what this is' : 'Next'}</button>
    {:else if showHint}
      <div class="hint">
        {#if phase === 'stretch'}Send î to (2, 0) and keep ĵ at (0, 1). The red arrow is the shape’s new “one step right”.
        {:else if phase === 'flip'}Send î to (−1, 0) and keep ĵ at (0, 1) — one step right now points left.
        {:else}Go along the arrows: {TP.a} of î plus {TP.b} of ĵ. That lands at ({TARGET.x}, {TARGET.y}).
        {/if}
      </div>
    {:else}
      <button class="hintbtn" on:click={useHint}>Stuck? Show a hint</button>
    {/if}
  {/if}
</div>

<style>
  .sf { width: 100%; max-width: 400px; margin: 0 auto; position: relative; display: flex; flex-direction: column; align-items: center; gap: 11px; }
  .exit { position: absolute; left: 0; top: 0; width: 34px; height: 34px; border-radius: 50%; border: 1.5px solid var(--qx-border); background: var(--qx-surface); color: var(--qx-text); font-size: 18px; cursor: pointer; }
  .head { text-align: center; padding: 0 40px; }
  .eyebrow { color: var(--qx-accent); font-size: 10px; font-weight: 900; letter-spacing: .1em; text-transform: uppercase; }
  .head h2 { font-size: 20px; font-weight: 900; color: var(--qx-text); margin: 2px 0 0; }

  .rail { display: flex; gap: 5px; flex-wrap: wrap; justify-content: center; }
  .rail-dot { font-size: 9.5px; font-weight: 850; letter-spacing: .04em; text-transform: uppercase; padding: 4px 9px; border-radius: 999px; border: 1px solid var(--qx-border); background: var(--qx-surface-2); color: var(--qx-text-faint); }
  .rail-dot.cur { border-color: var(--qx-accent); background: var(--qx-accent-soft); color: var(--qx-accent-text); }
  .rail-dot.done { border-color: var(--qx-green); background: var(--qx-green-soft); color: var(--qx-green-text); }
  .reveal-note { font-size: 10.5px; font-weight: 800; letter-spacing: .05em; text-transform: uppercase; color: var(--qx-text-faintest); }

  .grid { width: 100%; max-width: 320px; border: 1.5px solid var(--qx-border); border-radius: 10px; background: var(--qx-surface); touch-action: none; }
  .gl, .axis, .arm, .orig, .warped, .startpt, .ptlabel { pointer-events: none; }
  .gl { stroke: var(--qx-border); stroke-width: 0.6; }
  .axis { stroke: var(--qx-border-2); stroke-width: 1.4; }
  .orig { fill: none; stroke: var(--qx-text-faintest); stroke-width: 1.5; stroke-dasharray: 3 3; }
  .warped { fill: color-mix(in srgb, var(--qx-accent) 22%, transparent); stroke: var(--qx-accent); stroke-width: 2; stroke-linejoin: round; }
  .arm { stroke-width: 3; stroke-linecap: round; }
  .arm.i { stroke: #E0603A; }
  .arm.j { stroke: #3E8FE0; }
  .knob { stroke: var(--qx-surface); stroke-width: 2; cursor: grab; }
  .knob.i { fill: #E0603A; }
  .knob.j { fill: #3E8FE0; }
  .knob.locked { cursor: default; opacity: 0.85; }
  .startpt { fill: var(--qx-text-faint); }
  .ptlabel { fill: var(--qx-text-faint); font: 700 9px var(--qx-font); }
  .marker { fill: var(--qx-yellow); stroke: var(--qx-surface); stroke-width: 2; cursor: grab; }
  .marker.ok { fill: var(--qx-green); }

  .readout { display: flex; gap: 8px; }
  .chip { font-size: 12px; font-weight: 850; font-variant-numeric: tabular-nums; padding: 4px 10px; border-radius: 999px; border: 1.5px solid var(--qx-border); background: var(--qx-surface-2); }
  .chip.i { color: #E0603A; border-color: #E0603A; }
  .chip.j { color: #3E8FE0; border-color: #3E8FE0; }

  .task { font-size: 13.5px; font-weight: 720; color: var(--qx-text); text-align: center; line-height: 1.45; }
  .task b { color: var(--qx-accent-text); }
  .good, .hint { width: 100%; box-sizing: border-box; padding: 10px 12px; border-radius: 8px; font-size: 12.5px; font-weight: 700; line-height: 1.45; text-align: center; }
  .good { background: var(--qx-green-soft); color: var(--qx-green-text); }
  .hint { background: var(--qx-yellow-soft); color: var(--qx-yellow-text); }
  .hintbtn { background: none; border: none; color: var(--qx-accent-text); font-family: var(--qx-font); font-size: 12.5px; font-weight: 800; cursor: pointer; text-decoration: underline; padding: 4px; }

  .primary { min-height: 42px; width: 100%; border-radius: 999px; border: none; background: var(--qx-accent); color: #fff; font-family: var(--qx-font); font-size: 14px; font-weight: 850; cursor: pointer; }

  /* reveal */
  .reveal { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 8px 0; }
  .reveal-kicker { color: var(--qx-accent); font-size: 10px; font-weight: 900; letter-spacing: .11em; text-transform: uppercase; }
  .reveal h2 { font-size: 20px; font-weight: 900; color: var(--qx-text); margin: 0; }
  .reveal-lead { font-size: 13.5px; font-weight: 640; color: var(--qx-text-dim); line-height: 1.5; max-width: 34ch; margin: 0; }
  .reveal-lead b { color: var(--qx-text); }
  .matrix-viz { display: flex; align-items: center; gap: 4px; font-variant-numeric: tabular-nums; }
  .bracket { font-size: 40px; color: var(--qx-text-faint); font-weight: 300; }
  .matrix-viz .col { display: flex; flex-direction: column; align-items: center; position: relative; padding: 0 5px; font-size: 15px; font-weight: 850; color: var(--qx-text); }
  .matrix-viz .col small { position: absolute; bottom: -14px; font-size: 9px; font-weight: 900; }
  .matrix-viz .col.i, .matrix-viz .col.i small { color: #E0603A; }
  .matrix-viz .col.j, .matrix-viz .col.j small { color: #3E8FE0; }
  .matrix-viz .col.r { color: var(--qx-green-text); }
  .times { font-size: 15px; color: var(--qx-text-faint); font-weight: 800; }

  .reward-panel { width: 100%; box-sizing: border-box; border: 1.5px solid var(--qx-accent); background: var(--qx-accent-soft); border-radius: 12px; padding: 12px; }
  .reward-top { display: flex; align-items: center; justify-content: space-between; }
  .reward-top span { font-size: 9px; font-weight: 900; letter-spacing: .09em; text-transform: uppercase; color: var(--qx-accent); display: block; }
  .reward-top strong { font-size: 15px; color: var(--qx-text); }
  .reward-top b { font-size: 18px; color: var(--qx-accent-text); }
  .reward-skills { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 8px; }
  .reward-skills span { font-size: 10.5px; font-weight: 800; color: var(--qx-text-dim); background: var(--qx-surface); border-radius: 999px; padding: 3px 9px; }
  .reveal-actions { width: 100%; }
</style>
