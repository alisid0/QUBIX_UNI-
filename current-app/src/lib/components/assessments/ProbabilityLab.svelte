<script>
  // Probability Lab — "The Long Run". A spinner of equal wedges, some gold.
  // Stage 1: read the theoretical chance of gold off the geometry (favourable
  // / total). Stage 2: spin it — a handful of spins are wild, but keep going and
  // the experimental rate converges on the theoretical line (law of large
  // numbers), painted as a live chart. Stage 3: read a different spinner, to
  // transfer the favourable/total idea. Contract: prompt in, onDone(1,1) on end.
  import LabShell from './LabShell.svelte';
  export let prompt = 'A few spins are wild, but over the long run the rate settles on favourable ÷ total.';
  export let onDone = () => {};

  const reduceMotion = typeof matchMedia !== 'undefined'
    && matchMedia('(prefers-reduced-motion: reduce)').matches;

  const SPINNER_A = { total: 6, gold: [0, 3] };   // 2 of 6 = 1/3
  const SPINNER_B = { total: 5, gold: [0, 1, 2] }; // 3 of 5

  const STAGES = [
    { mode: 'read', spinner: SPINNER_A, options: ['1/6', '1/3', '1/2'], answer: '1/3', name: 'Read the odds',
      tip: 'Two of the six wedges are gold. What is the chance one spin lands on gold?' },
    { mode: 'run', spinner: SPINNER_A, name: 'The long run',
      tip: 'Spin it. Early on the rate jumps around — keep spinning and watch it settle near 1 in 3.' },
    { mode: 'read', spinner: SPINNER_B, options: ['2/5', '1/2', '3/5'], answer: '3/5', name: 'A new spinner',
      tip: 'Different spinner: three of five wedges are gold. What is the chance of gold now?' }
  ];
  const TARGET_SPINS = 60;

  const CX = 150, CY = 118, R = 92;

  let stageIx = 0;
  let complete = false;
  let rot = 0;
  let spinning = false;
  let landed = null;
  let spins = 0, hits = 0;
  let history = [];
  let matched = false;   // read stage answered / run stage converged
  let wrongHint = '';

  $: stage = STAGES[stageIx];
  $: spinner = stage.spinner;
  $: wa = 360 / spinner.total;
  $: theoP = spinner.gold.length / spinner.total;
  $: expP = spins ? hits / spins : 0;

  const rad = (a) => (a * Math.PI) / 180;
  const pt = (a) => [CX + R * Math.sin(rad(a)), CY - R * Math.cos(rad(a))];
  function wedgePath(i) {
    const [x0, y0] = pt(i * wa), [x1, y1] = pt((i + 1) * wa);
    const large = wa > 180 ? 1 : 0;
    return `M${CX},${CY} L${x0.toFixed(1)},${y0.toFixed(1)} A${R},${R} 0 ${large} 1 ${x1.toFixed(1)},${y1.toFixed(1)} Z`;
  }
  const isGold = (i) => spinner.gold.includes(i);

  function initStage() {
    rot = 0; spinning = false; landed = null; spins = 0; hits = 0; history = []; matched = false; wrongHint = '';
  }

  function record(k) {
    spins += 1;
    if (isGold(k)) hits += 1;
    history = [...history, hits / spins];
  }
  function spinOnce() {
    if (spinning || matched) return;
    const k = Math.floor(Math.random() * spinner.total);
    const target = (((-(k + 0.5) * wa) % 360) + 360) % 360;
    const base = rot + 360 * 4;
    rot = base + (((target - (base % 360)) % 360) + 360) % 360;
    if (reduceMotion) { landed = k; record(k); checkRun(); return; }
    spinning = true;
    setTimeout(() => { spinning = false; landed = k; record(k); checkRun(); }, 820);
  }
  function spinBatch(n) {
    if (spinning || matched) return;
    let k = 0;
    for (let i = 0; i < n; i++) { k = Math.floor(Math.random() * spinner.total); record(k); }
    landed = k;
    rot += 360 * 2 + Math.random() * 360;
    checkRun();
  }
  function checkRun() {
    if (spins >= TARGET_SPINS && !matched) {
      matched = true;
      const delay = reduceMotion ? 0 : 900;
      if (stageIx < STAGES.length - 1) setTimeout(() => { stageIx += 1; initStage(); }, delay);
      else setTimeout(() => { complete = true; }, delay);
    }
  }
  function answer(opt) {
    if (matched) return;
    if (opt === stage.answer) {
      matched = true;
      const delay = reduceMotion ? 0 : 700;
      if (stageIx < STAGES.length - 1) setTimeout(() => { stageIx += 1; initStage(); }, delay);
      else setTimeout(() => { complete = true; }, delay);
    } else {
      wrongHint = 'Count the gold wedges over the total wedges — that fraction is the chance.';
    }
  }

  // convergence chart
  const CW = 300, CH = 78, CPL = 8, CPR = 8, CPT = 8, CPB = 8;
  const cx2 = (i, n) => CPL + (n <= 1 ? 0 : (i / (n - 1)) * (CW - CPL - CPR));
  const cy2 = (p) => CPT + (1 - p) * (CH - CPT - CPB);
  $: chartPath = history.length
    ? history.map((p, i) => (i ? 'L' : 'M') + cx2(i, history.length).toFixed(1) + ',' + cy2(p).toFixed(1)).join(' ')
    : '';
</script>

<div class="pb">
  <LabShell eyebrow={complete ? 'Chance, read and run' : stage.name}
            stage={stageIx} total={STAGES.length} done={complete} />

  <div class="pb-tip" class:warn={wrongHint}>
    {#if complete}{prompt}{:else if wrongHint}{wrongHint}{:else}{stage.tip}{/if}
  </div>

  <div class="pb-wheelbox">
    <svg viewBox="0 0 300 236">
      <!-- needle -->
      <path class="needle" d="M150,{CY - R - 8} l-9,-13 l18,0 Z" />
      <g class="wheel" class:spin={spinning} style={`transform: rotate(${rot}deg)`}>
        {#each Array(spinner.total) as _, i}
          <path class="wedge" class:gold={isGold(i)} class:landed={landed === i && (matched || stage.mode === 'run')} d={wedgePath(i)} />
        {/each}
      </g>
      <circle class="hub" cx={CX} cy={CY} r="7" />
    </svg>

    {#if stage.mode === 'run'}
      <div class="pb-stats">
        <span class="chip">gold <b>{hits}</b> / {spins}</span>
        <span class="chip exp">now <b>{(expP * 100).toFixed(0)}%</b></span>
        <span class="chip theo">target <b>{(theoP * 100).toFixed(0)}%</b></span>
      </div>
      <svg class="chart" viewBox="0 0 {CW} {CH}">
        <line class="theo-line" x1={CPL} y1={cy2(theoP)} x2={CW - CPR} y2={cy2(theoP)} />
        {#if chartPath}<path class="exp-line" d={chartPath} />{/if}
      </svg>
    {/if}
  </div>

  <div class="pb-foot">
    {#if complete}
      <button class="pb-primary" on:click={() => onDone(1, 1)}>Continue</button>
    {:else if stage.mode === 'read'}
      <div class="pb-opts">
        {#each stage.options as opt}
          <button class="opt" disabled={matched} on:click={() => answer(opt)}>{opt}</button>
        {/each}
      </div>
    {:else}
      <div class="pb-spinbtns">
        <button class="spinbtn" disabled={spinning || matched} on:click={spinOnce}>Spin</button>
        <button class="spinbtn ghost" disabled={spinning || matched} on:click={() => spinBatch(25)}>Spin ×25</button>
      </div>
    {/if}
  </div>
</div>

<style>
  .pb { display: flex; flex-direction: column; gap: 9px; }
  .pb-tip { font-size: 13px; font-weight: 600; color: var(--qx-text-dim); line-height: 1.35; min-height: 34px; }
  .pb-tip.warn { color: var(--qx-yellow-text); }

  .pb-wheelbox { border: 1.5px solid var(--qx-border); border-radius: 12px; background: var(--qx-surface); padding: 8px 8px 12px; }
  svg { display: block; width: 100%; height: auto; }
  .needle { fill: var(--qx-accent); }
  .wheel { transform-box: fill-box; transform-origin: center; }
  .wheel.spin { transition: transform 0.82s cubic-bezier(0.15, 0.85, 0.2, 1); }
  .wedge { fill: var(--qx-surface-2); stroke: var(--qx-surface); stroke-width: 2; }
  .wedge.gold { fill: var(--qx-yellow); }
  .wedge.landed { stroke: var(--qx-text); stroke-width: 3; }
  .hub { fill: var(--qx-text); stroke: var(--qx-surface); stroke-width: 2; }

  .pb-stats { display: flex; flex-wrap: wrap; gap: 6px; justify-content: center; margin-top: 8px; }
  .chip {
    font-family: ui-monospace, Menlo, monospace; font-size: 11.5px; font-weight: 700;
    color: var(--qx-text-dim); background: var(--qx-surface-2);
    border: 1px solid var(--qx-border); border-radius: 8px; padding: 3px 8px;
  }
  .chip b { color: var(--qx-text); font-weight: 900; font-variant-numeric: tabular-nums; }
  .chip.exp b { color: var(--qx-yellow-text); }
  .chip.theo { border-color: color-mix(in srgb, var(--qx-green) 45%, var(--qx-border)); }
  .chip.theo b { color: var(--qx-green-text); }

  .chart { margin-top: 8px; border-top: 1px solid var(--qx-border); }
  .theo-line { stroke: var(--qx-green); stroke-width: 1.6; stroke-dasharray: 5 5; }
  .exp-line { fill: none; stroke: var(--qx-yellow); stroke-width: 2.4; stroke-linejoin: round; stroke-linecap: round; }

  .pb-foot { display: flex; justify-content: center; align-items: center; min-height: 46px; }
  .pb-opts, .pb-spinbtns { display: flex; gap: 10px; }
  .opt {
    min-width: 58px; border: 1.5px solid var(--qx-border-2); background: var(--qx-surface);
    color: var(--qx-text); border-radius: 12px; font-family: ui-monospace, Menlo, monospace;
    font-size: 15px; font-weight: 800; min-height: 42px; padding: 0 14px; cursor: pointer;
  }
  .opt:disabled { opacity: 0.5; cursor: default; }
  .spinbtn {
    border: none; border-radius: 999px; background: var(--qx-accent); color: #fff;
    font-family: var(--qx-font); font-size: 14px; font-weight: 850; min-height: 42px; padding: 0 24px; cursor: pointer;
  }
  .spinbtn.ghost { background: var(--qx-surface); color: var(--qx-text); border: 1.5px solid var(--qx-border-2); }
  .spinbtn:disabled { opacity: 0.5; cursor: default; }
  .pb-primary {
    border: none; border-radius: 999px; background: var(--qx-accent); color: #fff;
    font-family: var(--qx-font); font-size: 14px; font-weight: 850; min-height: 40px; padding: 0 26px; cursor: pointer;
  }
</style>
