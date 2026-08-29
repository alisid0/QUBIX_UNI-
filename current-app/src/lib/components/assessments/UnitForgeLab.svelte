<script>
  export let prompt = 'Forge the units before trusting the number.';
  export let onDone = () => {};

  const stages = [
    { id: 'measure', label: 'Measure', task: 'Lay four rods to cover the bar.' },
    { id: 'prefix', label: 'Prefix', task: 'Convert 3 km into metres.' },
    { id: 'forge', label: 'Forge', task: 'Build the dimensions of force.' },
    { id: 'judge', label: 'Judge', task: 'Decide if the energy units match.' }
  ];

  const prefixes = [
    { id: 'km', label: 'km', value: 3 },
    { id: 'm', label: 'm', value: 3000 },
    { id: 'mm', label: 'mm', value: 3000000 }
  ];

  let stage = 0;
  let rods = 0;
  let prefix = 'km';
  let dims = { kg: 0, m: 0, s: 0 };
  let judge = null;
  let completed = new Set();
  let feedback = 'Units are not decoration. They tell us what kind of thing the answer is.';
  let submitted = false;

  $: active = stages[stage];
  $: prefixItem = prefixes.find((item) => item.id === prefix) || prefixes[0];
  $: dimLabel = formatDims(dims);
  $: forgeName = nameDims(dims);

  function markDone(id, message) {
    completed = new Set([...completed, id]);
    feedback = message;
    if (completed.size === stages.length) {
      submitted = true;
    } else {
      const next = stages.findIndex((item) => !completed.has(item.id));
      if (next >= 0) stage = next;
    }
  }

  const SUP_DIGITS = '⁰¹²³⁴⁵⁶⁷⁸⁹';
  const sup = (n) => String(n).split('').map((c) => (c >= '0' && c <= '9' ? SUP_DIGITS[+c] : c)).join('');

  function formatDims(d) {
    const top = [];
    const bottom = [];
    for (const [unit, power] of [['kg', d.kg], ['m', d.m], ['s', d.s]]) {
      if (power > 0) top.push(power === 1 ? unit : `${unit}${sup(power)}`);
      if (power < 0) bottom.push(power === -1 ? unit : `${unit}${sup(Math.abs(power))}`);
    }
    if (!top.length && !bottom.length) return '1';
    return `${top.length ? top.join('*') : '1'}${bottom.length ? '/' + bottom.join('*') : ''}`;
  }

  function nameDims(d) {
    const key = `${d.kg},${d.m},${d.s}`;
    if (key === '1,1,-2') return 'newton: force';
    if (key === '1,2,-2') return 'joule: energy';
    if (key === '1,-1,-2') return 'pascal: pressure';
    if (key === '0,0,0') return 'dimensionless';
    return 'legal unit bundle';
  }

  function addRod() {
    if (submitted || active.id !== 'measure') return;
    rods = Math.min(4, rods + 1);
    feedback = `${rods} of 4 rods laid. The unit is the repeated measuring stick.`;
  }

  function checkMeasure() {
    if (rods === 4) markDone('measure', 'Good. Measurement starts by repeating a chosen unit.');
    else feedback = 'Keep laying rods until the whole bar is covered.';
  }

  function movePrefix(next) {
    if (submitted || active.id !== 'prefix') return;
    prefix = next;
    feedback = `Now showing ${prefixItem.value} ${next}. Prefixes change scale, not the physical distance.`;
  }

  function checkPrefix() {
    if (prefix === 'm') markDone('prefix', 'Correct. 3 km is 3000 m.');
    else feedback = 'Use metres. Kilo means one thousand, so 3 km becomes 3000 m.';
  }

  function changeDim(unit, delta) {
    if (submitted || active.id !== 'forge') return;
    const next = Math.max(-3, Math.min(3, dims[unit] + delta));
    dims = { ...dims, [unit]: next };
    feedback = `Current bundle: ${formatDims({ ...dims, [unit]: next })}.`;
  }

  function checkForge() {
    if (dims.kg === 1 && dims.m === 1 && dims.s === -2) {
      markDone('forge', 'Locked. Force is kg*m/s², shortened to newton.');
    } else {
      feedback = 'Force is mass times acceleration: kg times m/s².';
    }
  }

  function checkJudge(answer) {
    judge = answer;
    if (answer === 'same') {
      markDone('judge', 'Correct. N*m expands to kg*m²/s², the same dimensions as energy.');
    } else {
      feedback = 'Expand N first: N is kg*m/s². Multiplying by m gives kg*m²/s².';
    }
  }

  function resetActive() {
    if (active.id === 'measure') rods = 0;
    if (active.id === 'prefix') prefix = 'km';
    if (active.id === 'forge') dims = { kg: 0, m: 0, s: 0 };
    if (active.id === 'judge') judge = null;
    feedback = 'Reset this stage. Try again.';
  }
</script>

<div class="unit-forge">
  <div class="prompt">{prompt}</div>

  <div class="stage-tabs">
    {#each stages as item, i}
      <button class:active={stage === i} class:done={completed.has(item.id)} on:click={() => { if (!submitted) stage = i; }}>
        {item.label}
      </button>
    {/each}
  </div>

  <section class="machine">
    <div class="task-row">
      <span>{active.task}</span>
      <strong>{completed.size}/4</strong>
    </div>

    {#if active.id === 'measure'}
      <div class="bar">
        {#each Array(4) as _, i}
          <span class:filled={i < rods}>{i < rods ? '1 rod' : ''}</span>
        {/each}
      </div>
      <button class="primary" on:click={addRod}>Lay rod</button>
      <button class="secondary" on:click={checkMeasure}>Check measure</button>
    {:else if active.id === 'prefix'}
      <div class="value">{prefixItem.value.toLocaleString()} <small>{prefixItem.label}</small></div>
      <div class="ladder">
        {#each prefixes as item}
          <button class:active={prefix === item.id} on:click={() => movePrefix(item.id)}>{item.label}</button>
        {/each}
      </div>
      <button class="primary" on:click={checkPrefix}>Check conversion</button>
    {:else if active.id === 'forge'}
      <div class="forge-unit">
        <strong>{dimLabel}</strong>
        <small>{forgeName}</small>
      </div>
      <div class="forge-grid">
        {#each ['kg', 'm', 's'] as unit}
          <button on:click={() => changeDim(unit, 1)}>x {unit}</button>
          <button on:click={() => changeDim(unit, -1)}>div {unit}</button>
        {/each}
      </div>
      <button class="primary" on:click={checkForge}>Check force</button>
    {:else}
      <div class="equation">
        <span>N*m</span>
        <b>= ?</b>
        <span>kg*m²/s²</span>
      </div>
      <div class="choices">
        <button class:right={judge === 'same'} on:click={() => checkJudge('same')}>same dimensions</button>
        <button class:wrong={judge === 'different'} on:click={() => checkJudge('different')}>different dimensions</button>
      </div>
    {/if}

    <p>{feedback}</p>
  </section>

  <div class="actions">
    <button class="secondary" on:click={resetActive} disabled={submitted}>Reset stage</button>
    {#if submitted}
      <button class="primary" on:click={() => onDone(1, 1)}>Continue</button>
    {/if}
  </div>
</div>

<style>
  .unit-forge { width: 100%; max-width: 430px; margin: 0 auto; display: grid; gap: 12px; }
  .prompt { text-align: center; font-size: 15px; font-weight: 850; color: var(--qx-text); line-height: 1.4; }
  button { font: inherit; cursor: pointer; }
  .stage-tabs { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; }
  .stage-tabs button { min-height: 34px; border-radius: 999px; border: 1.5px solid var(--qx-border); background: var(--qx-surface); color: var(--qx-text-faint); font-size: 11px; font-weight: 900; }
  .stage-tabs button.active { color: #fff; background: var(--qx-accent); border-color: var(--qx-accent); }
  .stage-tabs button.done { color: var(--qx-green-text); background: var(--qx-green-soft); border-color: transparent; }
  .machine { border: 1.5px solid var(--qx-border); border-radius: 8px; background: var(--qx-surface); padding: 13px; display: grid; gap: 12px; }
  .task-row { display: flex; align-items: center; justify-content: space-between; gap: 10px; color: var(--qx-text-2); font-size: 13px; font-weight: 850; }
  .task-row strong { color: var(--qx-accent); }
  .bar { height: 48px; border: 1.5px solid var(--qx-border-2); border-radius: 8px; background: var(--qx-surface-3); display: grid; grid-template-columns: repeat(4, 1fr); overflow: hidden; }
  .bar span { display: grid; place-items: center; border-right: 2px solid var(--qx-bg); font-size: 11px; font-weight: 900; color: #fff; }
  .bar span:last-child { border-right: 0; }
  .bar span.filled { background: var(--qx-accent); }
  .value { text-align: center; font-size: 32px; font-weight: 950; color: var(--qx-text); }
  .value small { font-size: 17px; color: var(--qx-accent); }
  .ladder, .forge-grid, .choices { display: grid; gap: 8px; }
  .ladder { grid-template-columns: repeat(3, 1fr); }
  .forge-grid { grid-template-columns: repeat(3, 1fr); }
  .ladder button, .forge-grid button, .choices button { min-height: 42px; border: 1.5px solid var(--qx-border-2); border-radius: 8px; background: var(--qx-surface-2); color: var(--qx-text); font-size: 13px; font-weight: 900; }
  .ladder button.active, .choices button.right { background: var(--qx-green-soft); color: var(--qx-green-text); border-color: transparent; }
  .choices button.wrong { background: var(--qx-danger-soft); color: var(--qx-danger-text); border-color: transparent; }
  .forge-unit { text-align: center; border: 1.5px solid var(--qx-border); border-radius: 8px; padding: 14px; background: var(--qx-surface-2); display: grid; gap: 4px; }
  .forge-unit strong { font-size: 26px; font-weight: 950; color: var(--qx-text); }
  .forge-unit small { color: var(--qx-green-text); font-weight: 850; }
  .equation { display: flex; justify-content: center; align-items: center; gap: 10px; flex-wrap: wrap; padding: 14px; border-radius: 8px; background: var(--qx-surface-2); }
  .equation span { border: 1.5px solid var(--qx-border-2); background: var(--qx-surface); border-radius: 8px; padding: 10px 12px; font-weight: 950; }
  p { margin: 0; min-height: 42px; color: var(--qx-text-2); font-size: 13.5px; font-weight: 700; line-height: 1.45; }
  .actions { display: flex; gap: 9px; }
  .primary, .secondary { min-height: 44px; border-radius: 8px; border: 0; padding: 0 14px; font-size: 14px; font-weight: 900; }
  .primary { background: var(--qx-accent); color: #fff; }
  .secondary { background: var(--qx-surface); border: 1.5px solid var(--qx-border-2); color: var(--qx-text); }
  .actions .secondary { flex: 1; }
  .actions .primary { flex: 1.2; }
</style>
