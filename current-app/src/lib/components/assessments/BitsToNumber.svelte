<script>
  // Binary ↔ decimal converter drill. Two modes:
  //  'build' — toggle switches; the place values and running total update live
  //            (the converter experience), target is a decimal to reach.
  //  'read'  — a fixed bit pattern is shown; pick the decimal it encodes.
  export let mode = 'build';
  export let prompt = 'Build the number in binary.';
  export let bits = 4;
  export let target = 10;          // build: decimal to reach
  export let shown = '1010';       // read: the fixed pattern
  export let options = [];         // read: decimal choices
  export let correctFeedback = 'Correct.';
  export let incorrectFeedback = 'Not quite.';
  export let onDone = () => {};

  let values = Array(mode === 'read' ? shown.length : bits).fill(0);
  let selected = null;
  let submitted = false;
  let correct = false;

  $: placeValues = Array.from({ length: values.length }, (_, i) => 2 ** (values.length - 1 - i));
  $: liveValue = values.reduce((sum, v, i) => sum + v * placeValues[i], 0);
  $: litTerms = values.map((v, i) => (v ? placeValues[i] : null)).filter(v => v !== null);
  $: shownBits = shown.replace(/\s/g, '').split('').map(c => (c === '1' ? 1 : 0));
  $: shownValue = shownBits.reduce((sum, v, i) => sum + v * 2 ** (shownBits.length - 1 - i), 0);

  function toggle(i) {
    if (submitted) return;
    values[i] = values[i] ? 0 : 1;
    values = [...values];
  }

  function submit() {
    correct = mode === 'read' ? selected === shownValue : liveValue === target;
    submitted = true;
  }

  function finish() {
    onDone(correct ? 1 : 0, 1);
  }
</script>

<div class="bits-number">
  <div class="prompt">{prompt}</div>

  {#if mode === 'read'}
    <div class="shown-row" aria-label="Bit pattern to decode">
      {#each shownBits as b, i}
        <span class="shown-bit" class:on={b === 1}>
          <strong>{b}</strong>
          <small>{2 ** (shownBits.length - 1 - i)}</small>
        </span>
      {/each}
    </div>

    <div class="options">
      {#each options as opt}
        <button
          class:picked={selected === opt}
          class:right={submitted && opt === shownValue}
          class:wrong={submitted && selected === opt && opt !== shownValue}
          on:click={() => { if (!submitted) selected = opt; }}
        >{opt}</button>
      {/each}
    </div>
  {:else}
    <div class="target-row">Target: <strong>{target}</strong></div>

    <div class="bit-row" role="group" aria-label="Bit switches">
      {#each values as v, i}
        <button class="bit" class:on={v === 1} on:click={() => toggle(i)} aria-pressed={v === 1}>
          <strong>{v}</strong>
          <small>{placeValues[i]}</small>
        </button>
      {/each}
    </div>

    <div class="readout" aria-live="polite">
      {#if litTerms.length}
        <span class="terms">{litTerms.join(' + ')}</span>
        <span class="equals">=</span>
      {/if}
      <span class="total" class:hit={liveValue === target}>{liveValue}</span>
    </div>
  {/if}

  {#if !submitted}
    <button class="submit-btn" disabled={mode === 'read' && selected === null} on:click={submit}>Check</button>
  {:else}
    <div class="feedback" class:correct class:incorrect={!correct}>
      {correct ? correctFeedback : incorrectFeedback}
    </div>
    <button class="continue-btn" on:click={finish}>Continue</button>
  {/if}
</div>

<style>
  .bits-number {
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

  .target-row {
    width: 100%;
    box-sizing: border-box;
    padding: 9px 11px;
    border: 1px solid var(--qx-border);
    border-radius: 8px;
    background: var(--qx-surface-2);
    color: var(--qx-text-dim);
    font-size: 12px;
    font-weight: 750;
    text-align: center;
  }

  .target-row strong {
    color: var(--qx-text);
    font-size: 15px;
  }

  .bit-row, .shown-row {
    display: flex;
    gap: 7px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .bit, .shown-bit {
    width: 52px;
    height: 66px;
    border-radius: 10px;
    border: 1.5px solid var(--qx-border-2);
    background: var(--qx-surface);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3px;
    font-family: var(--qx-font);
  }

  .bit { cursor: pointer; transition: border-color 0.12s, background 0.12s; }

  .bit strong, .shown-bit strong {
    font-size: 21px;
    font-weight: 900;
    color: var(--qx-text-faint);
    line-height: 1;
  }

  .bit small, .shown-bit small {
    font-size: 10px;
    font-weight: 800;
    color: var(--qx-text-faint);
  }

  .bit.on, .shown-bit.on {
    border-color: var(--qx-accent);
    background: var(--qx-accent-soft);
  }

  .bit.on strong, .shown-bit.on strong { color: var(--qx-accent-text); }
  .bit.on small, .shown-bit.on small { color: var(--qx-accent-text); }

  .readout {
    min-height: 40px;
    display: flex;
    align-items: baseline;
    gap: 8px;
    font-variant-numeric: tabular-nums;
  }

  .terms {
    font-size: 15px;
    font-weight: 800;
    color: var(--qx-text-dim);
  }

  .equals {
    font-size: 15px;
    font-weight: 800;
    color: var(--qx-text-faint);
  }

  .total {
    font-size: 30px;
    font-weight: 900;
    color: var(--qx-text);
    line-height: 1;
  }

  .total.hit { color: var(--qx-green-text); }

  .options {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }

  .options button {
    padding: 13px;
    border-radius: 10px;
    border: 1.5px solid var(--qx-border-2);
    background: var(--qx-surface);
    font-family: var(--qx-font);
    font-size: 17px;
    font-weight: 900;
    color: var(--qx-text);
    cursor: pointer;
    font-variant-numeric: tabular-nums;
  }

  .options button.picked { border-color: var(--qx-accent); background: var(--qx-accent-soft); }
  .options button.right { border-color: var(--qx-green); background: var(--qx-green-soft); color: var(--qx-green-text); }
  .options button.wrong { border-color: var(--qx-danger); background: var(--qx-danger-soft); color: var(--qx-danger-text); }

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

  .submit-btn:disabled { opacity: 0.45; cursor: default; }

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
