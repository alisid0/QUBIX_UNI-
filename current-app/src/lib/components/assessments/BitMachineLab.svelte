<script>
  export let prompt = 'Run the bit machine.';
  export let onDone = () => {};

  const stages = [
    { id: 'build', label: 'Build', task: 'Flip the register into 1011.' },
    { id: 'adder', label: 'Add', task: 'Find the outputs for 1 + 1.' },
    { id: 'program', label: 'Program', task: 'Write a tiny program that reaches 10.' }
  ];

  let stage = 0;
  let bits = [0, 0, 0, 0];
  let adder = { a: 0, b: 0, sum: 0, carry: 0 };
  let program = [];
  let feedback = 'A bit is a switch. Four switches can already count from 0 to 15.';
  let completed = new Set();
  let submitted = false;
  let correct = false;

  const ops = [
    { id: 'INC', label: '+1' },
    { id: 'SHL', label: 'x2' },
    { id: 'DEC', label: '-1' }
  ];

  $: value = bits.reduce((total, bit, i) => total + (bit ? 2 ** (3 - i) : 0), 0);
  $: bin = bits.join('');
  $: programValue = runProgram(program);
  $: active = stages[stage];
  $: doneCount = completed.size;

  function runProgram(list) {
    let v = 0;
    for (const op of list) {
      if (op === 'INC') v += 1;
      if (op === 'SHL') v *= 2;
      if (op === 'DEC') v = Math.max(0, v - 1);
      v %= 16;
    }
    return v;
  }

  function markDone(id, message) {
    completed = new Set([...completed, id]);
    feedback = message;
    if (completed.size === stages.length) {
      submitted = true;
      correct = true;
    } else {
      const next = stages.findIndex((item) => !completed.has(item.id));
      if (next >= 0) stage = next;
    }
  }

  function toggleBit(i) {
    if (submitted || active.id !== 'build') return;
    bits = bits.map((bit, index) => index === i ? (bit ? 0 : 1) : bit);
  }

  function checkBuild() {
    if (bin === '1011') {
      markDone('build', 'Locked. 1011 is 8 + 2 + 1, which makes 11.');
    } else {
      feedback = 'Not yet. The target is 1011: on, off, on, on.';
    }
  }

  function toggleAdder(key) {
    if (submitted || active.id !== 'adder') return;
    adder = { ...adder, [key]: adder[key] ? 0 : 1 };
    const total = (key === 'a' ? Number(!adder.a) : adder.a) + (key === 'b' ? Number(!adder.b) : adder.b);
    feedback = `Inputs now add to ${total}. The sum bit is the ones place, the carry bit is the next place.`;
  }

  function checkAdder() {
    if (adder.a === 1 && adder.b === 1 && adder.sum === 0 && adder.carry === 1) {
      markDone('adder', 'Correct. 1 + 1 is binary 10: sum 0, carry 1.');
    } else {
      feedback = 'Set A and B to 1. The answer is not 2 in one bit; it becomes sum 0 with carry 1.';
    }
  }

  function addOp(op) {
    if (submitted || active.id !== 'program' || program.length >= 6) return;
    program = [...program, op];
  }

  function checkProgram() {
    if (programValue === 10) {
      markDone('program', 'Program accepted. Starting from zero, your instructions made the register hold 10.');
    } else {
      feedback = `The register ends at ${programValue}. Try using x2 as a fast way to shift the number left.`;
    }
  }

  function resetActive() {
    if (active.id === 'build') bits = [0, 0, 0, 0];
    if (active.id === 'adder') adder = { a: 0, b: 0, sum: 0, carry: 0 };
    if (active.id === 'program') program = [];
    feedback = 'Reset this stage. Try again.';
  }

  function finish() {
    onDone(correct ? 1 : 0, 1);
  }
</script>

<div class="bit-lab">
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
      <strong>{doneCount}/3</strong>
    </div>

    {#if active.id === 'build'}
      <div class="register">
        {#each bits as bit, i}
          <button class:on={bit} on:click={() => toggleBit(i)}>
            <strong>{bit}</strong>
            <small>{2 ** (3 - i)}</small>
          </button>
        {/each}
      </div>
      <div class="readout"><span>{bin}</span><strong>{value}</strong></div>
      <button class="primary" on:click={checkBuild}>Check pattern</button>
    {:else if active.id === 'adder'}
      <div class="adder">
        <div>
          <small>Inputs</small>
          <button class:on={adder.a} on:click={() => toggleAdder('a')}>A {adder.a}</button>
          <button class:on={adder.b} on:click={() => toggleAdder('b')}>B {adder.b}</button>
        </div>
        <div>
          <small>Outputs</small>
          <button class:on={adder.sum} on:click={() => toggleAdder('sum')}>Sum {adder.sum}</button>
          <button class:on={adder.carry} on:click={() => toggleAdder('carry')}>Carry {adder.carry}</button>
        </div>
      </div>
      <button class="primary" on:click={checkAdder}>Check adder</button>
    {:else}
      <div class="program">
        <div class="program-strip">
          {#if program.length}
            {#each program as op}<span>{op}</span>{/each}
          {:else}
            <em>No instructions yet</em>
          {/if}
        </div>
        <div class="ops">
          {#each ops as op}
            <button on:click={() => addOp(op.id)}>{op.label}<small>{op.id}</small></button>
          {/each}
        </div>
        <div class="readout"><span>Register</span><strong>{programValue}</strong></div>
      </div>
      <button class="primary" on:click={checkProgram}>Run check</button>
    {/if}

    <p>{@html feedback}</p>
  </section>

  <div class="actions">
    <button class="secondary" on:click={resetActive} disabled={submitted}>Reset stage</button>
    {#if submitted}
      <button class="primary" on:click={finish}>Continue</button>
    {/if}
  </div>
</div>

<style>
  .bit-lab { width: 100%; max-width: 430px; margin: 0 auto; display: grid; gap: 12px; }
  .prompt { text-align: center; font-size: 15px; font-weight: 850; color: var(--qx-text); line-height: 1.4; }
  .stage-tabs { display: grid; grid-template-columns: repeat(3, 1fr); gap: 7px; }
  button { font: inherit; cursor: pointer; }
  .stage-tabs button { min-height: 34px; border-radius: 999px; border: 1.5px solid var(--qx-border); background: var(--qx-surface); color: var(--qx-text-faint); font-size: 12px; font-weight: 900; }
  .stage-tabs button.active { color: #fff; background: var(--qx-accent); border-color: var(--qx-accent); }
  .stage-tabs button.done { color: var(--qx-green-text); background: var(--qx-green-soft); border-color: transparent; }
  .machine { border: 1.5px solid var(--qx-border); border-radius: 8px; background: var(--qx-surface); padding: 13px; display: grid; gap: 12px; }
  .task-row, .readout { display: flex; align-items: center; justify-content: space-between; gap: 10px; color: var(--qx-text-2); font-size: 13px; font-weight: 800; }
  .task-row strong, .readout strong { color: var(--qx-accent); font-size: 20px; }
  .register { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
  .register button { min-height: 82px; border-radius: 8px; border: 1.5px solid var(--qx-border-2); background: var(--qx-surface-2); color: var(--qx-text); display: grid; place-items: center; }
  .register strong { font-size: 28px; font-weight: 950; }
  .register small, .adder small, .ops small { color: var(--qx-text-faint); font-weight: 850; }
  .register button.on, .adder button.on { background: var(--qx-accent); border-color: var(--qx-accent); color: #fff; }
  .register button.on small, .adder button.on small { color: rgba(255,255,255,0.82); }
  .adder { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .adder div { border: 1.5px solid var(--qx-border); border-radius: 8px; padding: 10px; display: grid; gap: 8px; background: var(--qx-surface-2); }
  .adder button, .ops button { min-height: 42px; border: 1.5px solid var(--qx-border-2); border-radius: 8px; background: var(--qx-surface); color: var(--qx-text); font-weight: 900; }
  .program { display: grid; gap: 10px; }
  .program-strip { min-height: 50px; border: 1.5px dashed var(--qx-border-2); border-radius: 8px; background: var(--qx-surface-2); padding: 8px; display: flex; gap: 6px; flex-wrap: wrap; align-items: center; }
  .program-strip span { padding: 7px 10px; border-radius: 7px; background: var(--qx-accent-soft); color: var(--qx-accent-text); font-size: 12px; font-weight: 900; }
  .program-strip em { color: var(--qx-text-faint); font-style: normal; font-size: 13px; font-weight: 750; }
  .ops { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
  .ops button { display: grid; place-items: center; padding: 8px 4px; }
  p { margin: 0; min-height: 42px; color: var(--qx-text-2); font-size: 13.5px; font-weight: 700; line-height: 1.45; }
  .actions { display: flex; gap: 9px; }
  .primary, .secondary { min-height: 44px; border-radius: 8px; border: 0; padding: 0 14px; font-size: 14px; font-weight: 900; }
  .primary { background: var(--qx-accent); color: #fff; }
  .secondary { background: var(--qx-surface); border: 1.5px solid var(--qx-border-2); color: var(--qx-text); flex: 1; }
  .actions .primary { flex: 1.2; }
</style>
