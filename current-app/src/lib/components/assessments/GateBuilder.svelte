<script>
  // Live logic-gate circuit. Toggling an input or swapping a gate re-evaluates
  // the whole circuit instantly: wires carrying 1 glow, the bulb lights when
  // the output is 1. Two modes:
  //  'pick'  — the gate slots are selectable; match the target truth table.
  //            (Inputs are a free sandbox for testing — the current input
  //             combination's row is highlighted in the table.)
  //  'solve' — gates are locked; toggle the inputs to light the bulb.
  export let mode = 'pick';
  export let prompt = 'Choose the gate that produces this truth table.';
  export let chain = 1;                       // 1 gate (A,B) or 2 gates ((A g1 B) g2 C)
  export let palette = ['AND', 'OR', 'XOR', 'NAND'];
  export let gatesLocked = ['AND'];           // solve mode: the fixed gates
  export let targetTable = [0, 0, 0, 1];      // pick mode, chain 1: outputs for (0,0),(0,1),(1,0),(1,1)
  export let correctFeedback = 'Correct.';
  export let incorrectFeedback = 'Not quite.';
  export let onDone = () => {};

  let inputs = [0, 0, 0];                     // A, B, C
  let gates = mode === 'solve' ? [...gatesLocked] : [palette[0], palette[0]];
  let submitted = false;
  let correct = false;

  const GATE_FNS = {
    AND:  (a, b) => (a && b ? 1 : 0),
    OR:   (a, b) => (a || b ? 1 : 0),
    XOR:  (a, b) => (a !== b ? 1 : 0),
    NAND: (a, b) => (a && b ? 0 : 1),
    NOR:  (a, b) => (a || b ? 0 : 1),
  };

  const evalGate = (g, a, b) => GATE_FNS[g] ? GATE_FNS[g](a, b) : 0;

  $: g1out = evalGate(gates[0], inputs[0], inputs[1]);
  $: out = chain === 2 ? evalGate(gates[1], g1out, inputs[2]) : g1out;
  $: combos = [[0, 0], [0, 1], [1, 0], [1, 1]];
  $: currentRow = inputs[0] * 2 + inputs[1];

  function toggleInput(i) {
    if (submitted) return;
    inputs[i] = inputs[i] ? 0 : 1;
    inputs = [...inputs];
  }

  function setGate(slot, g) {
    if (submitted || mode === 'solve') return;
    gates[slot] = g;
    gates = [...gates];
  }

  function submit() {
    if (mode === 'solve') {
      correct = out === 1;
    } else {
      // The chosen gate must reproduce the target table on every input combo.
      correct = combos.every(([a, b], i) => evalGate(gates[0], a, b) === targetTable[i]);
    }
    submitted = true;
  }

  function finish() {
    onDone(correct ? 1 : 0, 1);
  }
</script>

<div class="gate-builder">
  <div class="prompt">{prompt}</div>

  {#if mode === 'pick'}
    <table class="truth" aria-label="Target truth table">
      <thead><tr><th>A</th><th>B</th><th>out</th></tr></thead>
      <tbody>
        {#each combos as [a, b], i}
          <tr class:now={a === inputs[0] && b === inputs[1]}>
            <td>{a}</td><td>{b}</td><td class="out-col">{targetTable[i]}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}

  <svg class="circuit" viewBox="0 0 340 {chain === 2 ? 224 : 180}" aria-label="Logic circuit">
    <!-- input A -->
    <g class="switch" class:on={inputs[0] === 1} on:click={() => toggleInput(0)} on:keydown={(e) => e.key === 'Enter' && toggleInput(0)} role="switch" aria-checked={inputs[0] === 1} aria-label="Input A" tabindex="0">
      <rect x="12" y="28" width="44" height="40" rx="9" />
      <text x="34" y="48" class="sw-val">{inputs[0]}</text>
      <text x="34" y="61" class="sw-name">A</text>
    </g>
    <!-- input B -->
    <g class="switch" class:on={inputs[1] === 1} on:click={() => toggleInput(1)} on:keydown={(e) => e.key === 'Enter' && toggleInput(1)} role="switch" aria-checked={inputs[1] === 1} aria-label="Input B" tabindex="0">
      <rect x="12" y="96" width="44" height="40" rx="9" />
      <text x="34" y="116" class="sw-val">{inputs[1]}</text>
      <text x="34" y="129" class="sw-name">B</text>
    </g>

    <!-- wires A/B → gate 1 -->
    <polyline class="wire" class:hot={inputs[0] === 1} points="56,48 96,48 96,72 122,72" />
    <polyline class="wire" class:hot={inputs[1] === 1} points="56,116 96,116 96,94 122,94" />

    <!-- gate 1 -->
    <g class="gate">
      <rect x="122" y="56" width="66" height="52" rx="10" />
      <text x="155" y="87">{gates[0]}</text>
    </g>

    {#if chain === 2}
      <!-- input C -->
      <g class="switch" class:on={inputs[2] === 1} on:click={() => toggleInput(2)} on:keydown={(e) => e.key === 'Enter' && toggleInput(2)} role="switch" aria-checked={inputs[2] === 1} aria-label="Input C" tabindex="0">
        <rect x="12" y="168" width="44" height="40" rx="9" />
        <text x="34" y="188" class="sw-val">{inputs[2]}</text>
        <text x="34" y="201" class="sw-name">C</text>
      </g>

      <!-- gate1 out + C → gate 2 -->
      <polyline class="wire" class:hot={g1out === 1} points="188,82 208,82 208,122 226,122" />
      <polyline class="wire" class:hot={inputs[2] === 1} points="56,188 208,188 208,144 226,144" />

      <!-- gate 2 -->
      <g class="gate">
        <rect x="226" y="106" width="62" height="52" rx="10" />
        <text x="257" y="137">{gates[1]}</text>
      </g>

      <!-- gate 2 → bulb -->
      <polyline class="wire" class:hot={out === 1} points="288,132 306,132" />
      <g class="bulb" class:lit={out === 1}>
        <circle cx="319" cy="132" r="13" />
        <text x="319" y="136">{out}</text>
      </g>
    {:else}
      <!-- gate 1 → bulb -->
      <polyline class="wire" class:hot={out === 1} points="188,82 282,82" />
      <g class="bulb" class:lit={out === 1}>
        <circle cx="299" cy="82" r="15" />
        <text x="299" y="87">{out}</text>
      </g>
    {/if}
  </svg>

  {#if mode === 'pick'}
    <div class="palette" role="group" aria-label="Gate choice">
      {#each palette as g}
        <button class:active={gates[0] === g} on:click={() => setGate(0, g)}>{g}</button>
      {/each}
    </div>
  {:else}
    <div class="hint">Gates are fixed: {chain === 2 ? `${gates[0]} then ${gates[1]}` : gates[0]}. Toggle the inputs until the bulb lights.</div>
  {/if}

  {#if !submitted}
    <button class="submit-btn" on:click={submit}>{mode === 'pick' ? 'Lock gate' : 'Lock inputs'}</button>
  {:else}
    <div class="feedback" class:correct class:incorrect={!correct}>
      {correct ? correctFeedback : incorrectFeedback}
    </div>
    <button class="continue-btn" on:click={finish}>Continue</button>
  {/if}
</div>

<style>
  .gate-builder {
    width: 100%;
    max-width: 390px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 13px;
  }

  .prompt {
    color: var(--qx-text);
    font-size: 15px;
    font-weight: 780;
    line-height: 1.42;
    text-align: center;
  }

  .truth {
    border-collapse: collapse;
    font-variant-numeric: tabular-nums;
    font-size: 13px;
    font-weight: 800;
  }

  .truth th {
    color: var(--qx-text-faint);
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    padding: 3px 14px;
  }

  .truth td {
    color: var(--qx-text-dim);
    text-align: center;
    padding: 4px 14px;
    border-top: 1px solid var(--qx-border);
  }

  .truth td.out-col { color: var(--qx-text); font-weight: 900; }

  .truth tr.now td {
    background: var(--qx-accent-soft);
    color: var(--qx-accent-text);
  }

  .circuit {
    width: 100%;
    border: 1.5px solid var(--qx-border);
    border-radius: 8px;
    background: radial-gradient(circle at 50% 45%, var(--qx-surface-2), var(--qx-surface));
  }

  .switch { cursor: pointer; }
  .switch rect {
    fill: var(--qx-surface);
    stroke: var(--qx-border-2);
    stroke-width: 1.5;
    transition: fill 0.12s, stroke 0.12s;
  }
  .switch.on rect { fill: var(--qx-accent-soft); stroke: var(--qx-accent); }
  .switch:focus-visible rect { stroke: var(--qx-accent); stroke-width: 2.5; }
  .sw-val {
    fill: var(--qx-text);
    font: 900 17px var(--qx-font);
    text-anchor: middle;
  }
  .switch.on .sw-val { fill: var(--qx-accent-text); }
  .sw-name {
    fill: var(--qx-text-faint);
    font: 800 9px var(--qx-font);
    text-anchor: middle;
    letter-spacing: 0.08em;
  }

  .wire {
    fill: none;
    stroke: var(--qx-border-2);
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
    transition: stroke 0.15s;
  }
  .wire.hot {
    stroke: var(--qx-accent);
    filter: drop-shadow(0 0 3px var(--qx-accent));
  }

  .gate rect {
    fill: var(--qx-surface);
    stroke: var(--qx-text-dim);
    stroke-width: 1.8;
  }
  .gate text {
    fill: var(--qx-text);
    font: 900 15px var(--qx-font);
    text-anchor: middle;
    letter-spacing: 0.04em;
  }

  .bulb circle {
    fill: var(--qx-surface);
    stroke: var(--qx-border-2);
    stroke-width: 2;
    transition: fill 0.15s, stroke 0.15s;
  }
  .bulb.lit circle {
    fill: #ffd75e;
    stroke: #e2a93b;
    filter: drop-shadow(0 0 7px rgba(255, 209, 84, 0.75));
  }
  .bulb text {
    fill: var(--qx-text-faint);
    font: 900 13px var(--qx-font);
    text-anchor: middle;
  }
  .bulb.lit text { fill: #4d3803; }

  .palette {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .palette button {
    min-height: 38px;
    padding: 0 16px;
    border-radius: 999px;
    border: 1.5px solid var(--qx-border-2);
    background: var(--qx-surface);
    color: var(--qx-text-dim);
    font-family: var(--qx-font);
    font-size: 13px;
    font-weight: 900;
    cursor: pointer;
    letter-spacing: 0.03em;
  }

  .palette button.active {
    border-color: var(--qx-accent);
    background: var(--qx-accent-soft);
    color: var(--qx-accent-text);
  }

  .hint {
    font-size: 12.5px;
    font-weight: 750;
    color: var(--qx-text-dim);
    text-align: center;
    line-height: 1.45;
  }

  .submit-btn, .continue-btn {
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

  .feedback {
    width: 100%;
    box-sizing: border-box;
    padding: 12px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 720;
    line-height: 1.45;
    text-align: center;
  }

  .feedback.correct { background: var(--qx-green-soft); color: var(--qx-green-text); }
  .feedback.incorrect { background: var(--qx-danger-soft); color: var(--qx-danger-text); }
</style>
