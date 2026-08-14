<script>
  // Function Machine — the Functions signature lab (docs/FUNCTIONS-WORKSHOP-DESIGN.md).
  // Six mastery stages: feed, repair, domain, graph, reverse, chain. Each stage
  // retries with a hint until correct (the lab is a completion gate, not a quiz);
  // the Workshop runner scores it 1/1 on finish via onDone.
  export let prompt = 'Run the function machine.';
  export let onDone = () => {};

  const STAGES = [
    { id: 'feed', label: 'Feed' },
    { id: 'broken', label: 'Repair' },
    { id: 'domain', label: 'Domain' },
    { id: 'graph', label: 'Graph' },
    { id: 'reverse', label: 'Reverse' },
    { id: 'compose', label: 'Chain' },
  ];
  let stage = 0;
  let stageDone = false;
  let hint = '';
  let complete = false;

  function nextStage() {
    if (stage < STAGES.length - 1) {
      stage += 1;
      stageDone = false;
      hint = '';
    } else {
      complete = true;
    }
  }

  // ── Stage 1: Feed the machine — f(x) = x + 3 ────────────────────────────────
  const feedChips = [0, 1, 2, 3, 4];
  let fed = [];
  let feedPick = null;
  function feedChip(x) {
    if (fed.includes(x) || stageDone) return;
    fed = [...fed, x];
  }
  function pickFeedPrediction(v) {
    if (stageDone) return;
    feedPick = v;
    if (v === 9) { stageDone = true; hint = ''; }
    else hint = 'Follow the rule inside the machine. Add 3 to the input before reading the output.';
  }

  // ── Stage 2: Broken machine ─────────────────────────────────────────────────
  const machineA = [[2, 5], [3, 6], [2, 5]];
  const machineB = [[2, 5], [3, 6], [2, 9]];
  let brokenPick = null;
  function pickBroken(which) {
    if (stageDone) return;
    brokenPick = which;
    if (which === 'B') { stageDone = true; hint = ''; }
    else hint = 'Look for the same input appearing twice with different outputs.';
  }

  // ── Stage 3: Domain gate — f(x) = x², allowed inputs 0–4 ───────────────────
  const domainChips = [-1, 0, 2, 4, 6];
  const allowed = new Set([0, 2, 4]);
  let gate = {}; // chip -> 'allow' | 'reject' | undefined
  let domainSorted = false;
  let rangePick = null;
  function cycleGate(x) {
    if (domainSorted) return;
    gate[x] = gate[x] === 'allow' ? 'reject' : gate[x] === 'reject' ? undefined : 'allow';
    gate = { ...gate };
  }
  function checkGate() {
    const ok = domainChips.every(x => gate[x] === (allowed.has(x) ? 'allow' : 'reject'));
    if (ok) { domainSorted = true; hint = ''; }
    else hint = 'Check the allowed input sign (0–4) before feeding the machine.';
  }
  function pickRange(v) {
    if (stageDone || !domainSorted) return;
    rangePick = v;
    if (v === '0, 4, 16') { stageDone = true; hint = ''; }
    else hint = 'The range is what actually comes out: square each accepted input.';
  }

  // ── Stage 4: Graph scanner — f(x) = x + 1 ──────────────────────────────────
  // Table first, then find the glowing target point. x runs across; f(x) runs up.
  const graphRows = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]];
  const graphTargets = [[1, 2], [3, 4], [4, 5]];
  let graphMatched = [];
  let graphFlash = null;
  $: graphTarget = graphTargets[graphMatched.length] || null;
  $: graphFound = (p) => graphMatched.some(m => m[0] === p[0] && m[1] === p[1]);
  $: graphIsTarget = (p) => graphTarget && p[0] === graphTarget[0] && p[1] === graphTarget[1];
  function tapPoint(p) {
    if (stageDone) return;
    if (graphIsTarget(p)) {
      graphMatched = [...graphMatched, p];
      hint = '';
      if (graphMatched.length === graphTargets.length) stageDone = true;
    } else if (graphFound(p)) {
      hint = 'That point is already found. Look for the glowing target.';
    } else {
      graphFlash = p;
      hint = `Not that one. Go across to x = ${graphTarget[0]}, then up to f(x) = ${graphTarget[1]}.`;
      setTimeout(() => { graphFlash = null; }, 500);
    }
  }
  const gx = x => 36 + x * 34;
  const gy = y => 158 - y * 24;

  // ── Stage 5: Reverse machine ────────────────────────────────────────────────
  const reverseQs = [
    { rule: 'f(x) = x + 5', forward: '3 → f → 8', ask: '8 → reverse → ?', ops: ['subtract 5', 'add 5', 'multiply by 5'], answer: 'subtract 5' },
    { rule: 'f(x) = 2x', forward: '4 → f → 8', ask: '8 → reverse → ?', ops: ['divide by 2', 'subtract 2', 'multiply by 2'], answer: 'divide by 2' },
  ];
  let reverseIdx = 0;
  let reversePick = null;
  function pickReverse(op) {
    if (stageDone) return;
    reversePick = op;
    if (op === reverseQs[reverseIdx].answer) {
      hint = '';
      if (reverseIdx === reverseQs.length - 1) { stageDone = true; }
      else setTimeout(() => { reverseIdx += 1; reversePick = null; }, 700);
    } else {
      hint = 'Ask what operation would undo the original rule.';
    }
  }

  // ── Stage 6: Conveyor composition — g(x) = x + 2, then f(x) = 3x ───────────
  const composeQs = [
    { input: 5, mid: 7, out: 21, options: [21, 17, 7] },
    { input: 1, mid: 3, out: 9, options: [9, 5, 3] },
  ];
  let composeIdx = 0;
  let composePick = null;
  function pickCompose(v) {
    if (stageDone) return;
    composePick = v;
    if (v === composeQs[composeIdx].out) {
      hint = '';
      if (composeIdx === composeQs.length - 1) { stageDone = true; }
      else setTimeout(() => { composeIdx += 1; composePick = null; }, 700);
    } else {
      hint = 'Run the inside machine first: g adds 2, then f multiplies by 3.';
    }
  }
</script>

<div class="fm-lab">
  {#if complete}
    <div class="fm-complete">
      <div class="fm-complete-mark">✓</div>
      <div class="fm-complete-title">Function Machine complete</div>
      <p>You can now read a rule, test whether it behaves like a function, graph its outputs, reverse simple machines, and chain machines together.</p>
      <button class="fm-primary" on:click={() => onDone(1, 1)}>Continue</button>
    </div>
  {:else}
    <div class="fm-prompt">{prompt}</div>

    <div class="fm-stages" aria-label="Lab stages">
      {#each STAGES as s, i}
        <span class="fm-stage-dot" class:done={i < stage} class:cur={i === stage}>{s.label}</span>
      {/each}
    </div>

    {#if stage === 0}
      <div class="fm-rule">Machine rule: <strong>f(x) = x + 3</strong></div>
      <div class="fm-machine-row">
        <div class="fm-chips">
          {#each feedChips as x}
            <button class="fm-chip" class:used={fed.includes(x)} on:click={() => feedChip(x)}>{x}</button>
          {/each}
        </div>
      </div>
      {#if fed.length}
        <table class="fm-table">
          <thead><tr><th>x</th><th>f(x)</th></tr></thead>
          <tbody>
            {#each fed as x}
              <tr><td>{x}</td><td>{x + 3}</td></tr>
            {/each}
          </tbody>
        </table>
      {/if}
      {#if fed.length < 3}
        <div class="fm-note">Feed {3 - fed.length} more {fed.length === 2 ? 'input' : 'inputs'} into the machine.</div>
      {:else}
        <div class="fm-question">Now predict: what comes out for <strong>6</strong>?</div>
        <div class="fm-options">
          {#each [3, 6, 9] as v}
            <button
              class:right={stageDone && v === 9}
              class:wrong={feedPick === v && v !== 9}
              on:click={() => pickFeedPrediction(v)}>{v}</button>
          {/each}
        </div>
      {/if}
      {#if stageDone}<div class="fm-good">Yes. The same input travels through the same rule and gives the same output.</div>{/if}

    {:else if stage === 1}
      <div class="fm-question">One machine is not a function. Find the broken one.</div>
      <div class="fm-pair">
        {#each [['A', machineA], ['B', machineB]] as [name, rows]}
          <button class="fm-machine"
            class:right={stageDone && name === 'B'}
            class:wrong={brokenPick === name && name === 'A'}
            on:click={() => pickBroken(name)}>
            <span class="fm-machine-name">Machine {name}</span>
            {#each rows as [a, b], ri}
              <span class="fm-io" class:conflict={stageDone && name === 'B' && a === 2}>{a} → {b}</span>
            {/each}
          </button>
        {/each}
      </div>
      {#if stageDone}<div class="fm-good">Correct. Input 2 cannot sometimes give 5 and sometimes give 9. A function must be reliable for each input.</div>{/if}

    {:else if stage === 2}
      <div class="fm-rule">Rule: <strong>f(x) = x²</strong> · Allowed inputs: <strong>0 – 4</strong></div>
      <div class="fm-question">Tap each chip to mark it: allow into the machine, or reject at the gate.</div>
      <div class="fm-chips">
        {#each domainChips as x}
          <button class="fm-chip gate"
            class:allow={gate[x] === 'allow'}
            class:reject={gate[x] === 'reject'}
            disabled={domainSorted}
            on:click={() => cycleGate(x)}>
            {x}
            <small>{gate[x] === 'allow' ? 'allow' : gate[x] === 'reject' ? 'reject' : 'tap'}</small>
          </button>
        {/each}
      </div>
      {#if !domainSorted}
        <button class="fm-primary" on:click={checkGate}>Open the gate</button>
      {:else}
        <div class="fm-good">Gate correct. Accepted inputs 0, 2, 4 produce outputs 0, 4, 16.</div>
        <div class="fm-question">So what is the <strong>range</strong> here?</div>
        <div class="fm-options">
          {#each ['0, 4, 16', '-1, 0, 2', '0, 1, 2, 3, 4'] as v}
            <button
              class:right={stageDone && v === '0, 4, 16'}
              class:wrong={rangePick === v && v !== '0, 4, 16'}
              on:click={() => pickRange(v)}>{v}</button>
          {/each}
        </div>
      {/if}
      {#if stageDone}<div class="fm-good">Correct. The domain controls what may go in. The range is what actually comes out.</div>{/if}

    {:else if stage === 3}
      <div class="fm-rule">Machine: <strong>f(x) = x + 1</strong></div>
      <div class="fm-question">
        Each table row becomes one point: <strong>x across</strong>, <strong>f(x) up</strong>.
      </div>
      <table class="fm-table fm-table-graph">
        <thead><tr><th>x (across)</th><th>f(x) (up)</th><th></th></tr></thead>
        <tbody>
          {#each graphRows as row}
            <tr
              class:target={graphIsTarget(row)}
              class:found={graphFound(row)}
            >
              <td>{row[0]}</td>
              <td>{row[1]}</td>
              <td class="fm-row-status">
                {#if graphFound(row)}found
                {:else if graphIsTarget(row)}find this
                {:else}·{/if}
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
      {#if graphTarget}
        <div class="fm-question">
          Tap the glowing point for
          <strong> x = {graphTarget[0]} → f(x) = {graphTarget[1]} </strong>
        </div>
      {:else if stageDone}
        <div class="fm-question">All three target points found.</div>
      {/if}
      <svg class="fm-graph" viewBox="0 0 230 190" aria-label="Graph of f(x) = x + 1">
        {#each [0, 1, 2, 3, 4, 5] as t}
          <line x1={gx(t)} y1="22" x2={gx(t)} y2="158" class="fm-grid" />
          <line x1="36" y1={gy(t)} x2="206" y2={gy(t)} class="fm-grid" />
          <text x={gx(t)} y="174" class="fm-tick" text-anchor="middle">{t}</text>
          <text x="26" y={gy(t) + 4} class="fm-tick" text-anchor="end">{t}</text>
        {/each}
        <line x1="36" y1="158" x2="206" y2="158" class="fm-axis" />
        <line x1="36" y1="22" x2="36" y2="158" class="fm-axis" />
        <text x="121" y="188" class="fm-axis-label" text-anchor="middle">x → input</text>
        <text x="12" y="90" class="fm-axis-label" text-anchor="middle" transform="rotate(-90 12 90)">f(x) → output</text>
        {#if graphTarget}
          <circle cx={gx(graphTarget[0])} cy={gy(graphTarget[1])} r="16" class="fm-target-ring" />
        {/if}
        {#each graphRows as p}
          <circle
            cx={gx(p[0])} cy={gy(p[1])} r="9"
            class="fm-point"
            class:hit={graphFound(p)}
            class:target={graphIsTarget(p)}
            class:flash={graphFlash === p}
            role="button" tabindex="0"
            aria-label={`Point x ${p[0]}, f(x) ${p[1]}`}
            on:click={() => tapPoint(p)}
            on:keydown={(e) => e.key === 'Enter' && tapPoint(p)}
          />
        {/each}
      </svg>
      <div class="fm-legend">
        <span><i class="lg target"></i> find this</span>
        <span><i class="lg hit"></i> found</span>
        <span><i class="lg idle"></i> other points</span>
      </div>
      <div class="fm-note">{graphMatched.length} of {graphTargets.length} target points found</div>
      {#if stageDone}
        <div class="fm-good">
          Yes. The table and the graph say the same thing: each input lands on exactly one height.
        </div>
      {/if}

    {:else if stage === 4}
      {#key reverseIdx}
        <div class="fm-rule">Machine: <strong>{reverseQs[reverseIdx].rule}</strong></div>
        <div class="fm-flow">{reverseQs[reverseIdx].forward}</div>
        <div class="fm-question">Run it backwards: <strong>{reverseQs[reverseIdx].ask}</strong> Which operation undoes the machine?</div>
        <div class="fm-options">
          {#each reverseQs[reverseIdx].ops as op}
            <button
              class:right={(stageDone || reversePick === op) && op === reverseQs[reverseIdx].answer}
              class:wrong={reversePick === op && op !== reverseQs[reverseIdx].answer}
              on:click={() => pickReverse(op)}>{op}</button>
          {/each}
        </div>
      {/key}
      <div class="fm-note">{reverseIdx + (stageDone ? 1 : 0)}/{reverseQs.length} machines reversed</div>
      {#if stageDone}<div class="fm-good">Correct. The inverse walks the output back to the input — that's f⁻¹(x).</div>{/if}

    {:else if stage === 5}
      <div class="fm-rule">Conveyor: <strong>g(x) = x + 2</strong> runs first, then <strong>f(x) = 3x</strong></div>
      <div class="fm-flow">Example: 2 → g → 4 → f → 12</div>
      {#key composeIdx}
        <div class="fm-question">Feed <strong>{composeQs[composeIdx].input}</strong> into the belt. What comes out of f?</div>
        <div class="fm-options">
          {#each composeQs[composeIdx].options as v}
            <button
              class:right={(stageDone || composePick === v) && v === composeQs[composeIdx].out}
              class:wrong={composePick === v && v !== composeQs[composeIdx].out}
              on:click={() => pickCompose(v)}>{v}</button>
          {/each}
        </div>
      {/key}
      <div class="fm-note">{composeIdx + (stageDone ? 1 : 0)}/{composeQs.length} chains run</div>
      {#if stageDone}<div class="fm-good">Correct. The middle number matters: one machine hands its output to the next.</div>{/if}
    {/if}

    {#if hint && !stageDone}
      <div class="fm-hint">{hint}</div>
    {/if}

    {#if stageDone}
      <button class="fm-primary" on:click={nextStage}>
        {stage === STAGES.length - 1 ? 'Finish the lab' : 'Next station →'}
      </button>
    {/if}
  {/if}
</div>

<style>
  .fm-lab {
    width: 100%;
    max-width: 390px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 13px;
  }

  .fm-prompt {
    color: var(--qx-text);
    font-size: 15px;
    font-weight: 780;
    line-height: 1.42;
    text-align: center;
  }

  .fm-stages {
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .fm-stage-dot {
    font-size: 10px;
    font-weight: 850;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    padding: 4px 9px;
    border-radius: 999px;
    border: 1px solid var(--qx-border);
    background: var(--qx-surface-2);
    color: var(--qx-text-faint);
  }
  .fm-stage-dot.cur { border-color: var(--qx-accent); background: var(--qx-accent-soft); color: var(--qx-accent-text); }
  .fm-stage-dot.done { border-color: var(--qx-green); background: var(--qx-green-soft); color: var(--qx-green-text); }

  .fm-rule {
    width: 100%;
    box-sizing: border-box;
    padding: 9px 11px;
    border: 1px solid var(--qx-border);
    border-radius: 8px;
    background: var(--qx-surface-2);
    color: var(--qx-text-dim);
    font-size: 12.5px;
    font-weight: 750;
    text-align: center;
  }
  .fm-rule strong { color: var(--qx-text); }

  .fm-question {
    font-size: 14px;
    font-weight: 750;
    color: var(--qx-text);
    text-align: center;
    line-height: 1.45;
  }

  .fm-machine-row { width: 100%; display: flex; justify-content: center; }

  .fm-chips { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; }

  .fm-chip {
    min-width: 46px;
    min-height: 46px;
    border-radius: 10px;
    border: 1.5px solid var(--qx-border-2);
    background: var(--qx-surface);
    color: var(--qx-text);
    font-family: var(--qx-font);
    font-size: 17px;
    font-weight: 900;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1px;
    transition: border-color 0.12s, background 0.12s, opacity 0.12s;
  }
  .fm-chip small { font-size: 9px; font-weight: 800; color: var(--qx-text-faint); text-transform: uppercase; }
  .fm-chip.used { opacity: 0.35; pointer-events: none; }
  .fm-chip.gate.allow { border-color: var(--qx-green); background: var(--qx-green-soft); }
  .fm-chip.gate.allow small { color: var(--qx-green-text); }
  .fm-chip.gate.reject { border-color: var(--qx-danger); background: var(--qx-danger-soft); }
  .fm-chip.gate.reject small { color: var(--qx-danger-text); }

  .fm-table {
    border-collapse: collapse;
    font-variant-numeric: tabular-nums;
    font-size: 14px;
    font-weight: 800;
  }
  .fm-table th {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--qx-text-faint);
    padding: 3px 18px;
  }
  .fm-table td {
    color: var(--qx-text);
    text-align: center;
    padding: 5px 18px;
    border-top: 1px solid var(--qx-border);
  }
  .fm-table-graph { width: 100%; }
  .fm-table-graph td, .fm-table-graph th { padding: 5px 8px; }
  .fm-table-graph tr.target td {
    background: var(--qx-accent-soft);
    color: var(--qx-accent-text);
  }
  .fm-table-graph tr.found td {
    background: var(--qx-green-soft);
    color: var(--qx-green-text);
  }
  .fm-row-status {
    font-size: 10px !important;
    font-weight: 850 !important;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--qx-text-faint) !important;
  }
  .fm-table-graph tr.target .fm-row-status { color: var(--qx-accent-text) !important; }
  .fm-table-graph tr.found .fm-row-status { color: var(--qx-green-text) !important; }

  .fm-legend {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    justify-content: center;
    font-size: 11px;
    font-weight: 750;
    color: var(--qx-text-dim);
  }
  .fm-legend span { display: inline-flex; align-items: center; gap: 5px; }
  .fm-legend i.lg {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: inline-block;
    border: 1.5px solid var(--qx-accent);
    background: var(--qx-surface);
  }
  .fm-legend i.lg.target {
    border-color: var(--qx-accent);
    background: var(--qx-accent);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--qx-accent) 28%, transparent);
  }
  .fm-legend i.lg.hit {
    border-color: var(--qx-green);
    background: var(--qx-green);
  }
  .fm-legend i.lg.idle {
    border-color: var(--qx-border-2);
    background: var(--qx-surface);
  }

  .fm-options {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }
  .fm-options button {
    padding: 12px 8px;
    border-radius: 10px;
    border: 1.5px solid var(--qx-border-2);
    background: var(--qx-surface);
    font-family: var(--qx-font);
    font-size: 14px;
    font-weight: 850;
    color: var(--qx-text);
    cursor: pointer;
  }
  .fm-options button.right { border-color: var(--qx-green); background: var(--qx-green-soft); color: var(--qx-green-text); }
  .fm-options button.wrong { border-color: var(--qx-danger); background: var(--qx-danger-soft); color: var(--qx-danger-text); }

  .fm-pair { width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .fm-machine {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 12px;
    border-radius: 10px;
    border: 1.5px solid var(--qx-border-2);
    background: var(--qx-surface);
    font-family: var(--qx-font);
    cursor: pointer;
  }
  .fm-machine.right { border-color: var(--qx-green); background: var(--qx-green-soft); }
  .fm-machine.wrong { border-color: var(--qx-danger); background: var(--qx-danger-soft); }
  .fm-machine-name { font-size: 11px; font-weight: 850; text-transform: uppercase; letter-spacing: 0.06em; color: var(--qx-text-faint); }
  .fm-io { font-size: 15px; font-weight: 800; color: var(--qx-text); font-variant-numeric: tabular-nums; }
  .fm-io.conflict { color: var(--qx-danger-text); }

  .fm-graph {
    width: 100%;
    max-width: 280px;
    border: 1.5px solid var(--qx-border);
    border-radius: 8px;
    background: var(--qx-surface-2);
  }
  .fm-grid { stroke: var(--qx-border); stroke-width: 0.6; stroke-dasharray: 3 3; }
  .fm-axis { stroke: var(--qx-text-dim); stroke-width: 1.4; }
  .fm-tick {
    fill: var(--qx-text-faint);
    font-size: 9px;
    font-weight: 700;
    font-family: var(--qx-font);
  }
  .fm-axis-label {
    fill: var(--qx-text-dim);
    font-size: 9px;
    font-weight: 800;
    font-family: var(--qx-font);
  }
  .fm-target-ring {
    fill: none;
    stroke: var(--qx-accent);
    stroke-width: 2;
    stroke-dasharray: 4 3;
    opacity: 0.85;
  }
  .fm-point { fill: var(--qx-surface); stroke: var(--qx-border-2); stroke-width: 2; cursor: pointer; transition: fill 0.12s, stroke 0.12s; }
  .fm-point.target { fill: var(--qx-accent); stroke: var(--qx-accent); }
  .fm-point.hit { fill: var(--qx-green); stroke: var(--qx-green); }
  .fm-point.flash { fill: var(--qx-danger); stroke: var(--qx-danger); }

  .fm-flow {
    font-size: 16px;
    font-weight: 850;
    color: var(--qx-accent-text);
    font-variant-numeric: tabular-nums;
    padding: 8px 16px;
    border-radius: 999px;
    background: var(--qx-accent-soft);
    border: 1px solid var(--qx-accent);
  }

  .fm-note { font-size: 12px; font-weight: 700; color: var(--qx-text-faint); }

  .fm-hint {
    width: 100%;
    box-sizing: border-box;
    padding: 10px 12px;
    border-radius: 8px;
    background: var(--qx-danger-soft);
    color: var(--qx-danger-text);
    font-size: 12.5px;
    font-weight: 700;
    line-height: 1.45;
    text-align: center;
  }

  .fm-good {
    width: 100%;
    box-sizing: border-box;
    padding: 10px 12px;
    border-radius: 8px;
    background: var(--qx-green-soft);
    color: var(--qx-green-text);
    font-size: 12.5px;
    font-weight: 700;
    line-height: 1.45;
    text-align: center;
  }

  .fm-primary {
    min-height: 42px;
    width: 100%;
    border-radius: 999px;
    border: none;
    background: var(--qx-accent);
    color: #fff;
    font-family: var(--qx-font);
    font-size: 14px;
    font-weight: 850;
    cursor: pointer;
  }

  .fm-complete {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    text-align: center;
    padding: 28px 0;
  }
  .fm-complete-mark {
    width: 62px;
    height: 62px;
    border-radius: 50%;
    background: var(--qx-green-soft);
    border: 2px solid var(--qx-green);
    color: var(--qx-green-text);
    font-size: 30px;
    font-weight: 900;
    display: grid;
    place-items: center;
  }
  .fm-complete-title { font-size: 18px; font-weight: 900; color: var(--qx-text); }
  .fm-complete p { font-size: 13.5px; font-weight: 650; color: var(--qx-text-dim); line-height: 1.5; max-width: 34ch; margin: 0; }
</style>
