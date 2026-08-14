<script>
  // ASCII byte ↔ letter converter drill. Two modes:
  //  'build' — toggle 8 switches; the decoded character updates live in a big
  //            preview card (the converter experience). Target is a letter.
  //  'read'  — a fixed byte is shown; pick which letter it encodes.
  export let mode = 'build';
  export let prompt = 'Build the byte for the letter.';
  export let target = 'A';          // build: the letter to encode
  export let shown = '01000001';    // read: the fixed byte
  export let options = [];          // read: letter choices
  export let correctFeedback = 'Correct.';
  export let incorrectFeedback = 'Not quite.';
  export let onDone = () => {};

  let values = Array(8).fill(0);
  let selected = null;
  let submitted = false;
  let correct = false;

  const PLACES = [128, 64, 32, 16, 8, 4, 2, 1];

  $: liveValue = values.reduce((sum, v, i) => sum + v * PLACES[i], 0);
  $: liveChar = liveValue >= 33 && liveValue <= 126 ? String.fromCharCode(liveValue) : '·';
  $: targetCode = target.charCodeAt(0);
  $: shownBits = shown.replace(/\s/g, '').split('').map(c => (c === '1' ? 1 : 0));
  $: shownValue = shownBits.reduce((sum, v, i) => sum + v * PLACES[i], 0);
  $: shownChar = String.fromCharCode(shownValue);

  function toggle(i) {
    if (submitted) return;
    values[i] = values[i] ? 0 : 1;
    values = [...values];
  }

  function submit() {
    correct = mode === 'read' ? selected === shownChar : liveValue === targetCode;
    submitted = true;
  }

  function finish() {
    onDone(correct ? 1 : 0, 1);
  }
</script>

<div class="bits-word">
  <div class="prompt">{prompt}</div>

  {#if mode === 'read'}
    <div class="byte-row" aria-label="Byte to decode">
      {#each shownBits as b, i}
        <span class="cell shown" class:on={b === 1}>
          <strong>{b}</strong>
          <small>{PLACES[i]}</small>
        </span>
      {/each}
    </div>
    <div class="decode-hint">= {shownValue} in decimal. Which letter is that?</div>

    <div class="options">
      {#each options as opt}
        <button
          class:picked={selected === opt}
          class:right={submitted && opt === shownChar}
          class:wrong={submitted && selected === opt && opt !== shownChar}
          on:click={() => { if (!submitted) selected = opt; }}
        >{opt} <small>({opt.charCodeAt(0)})</small></button>
      {/each}
    </div>
  {:else}
    <div class="target-row">Target: <strong>{target}</strong> <span>(code {targetCode})</span></div>

    <div class="stage">
      <div class="char-card" class:hit={liveValue === targetCode} aria-live="polite">
        <span class="char">{liveChar}</span>
        <span class="code">{liveValue}</span>
      </div>
    </div>

    <div class="byte-row" role="group" aria-label="Byte switches">
      {#each values as v, i}
        <button class="cell" class:on={v === 1} on:click={() => toggle(i)} aria-pressed={v === 1}>
          <strong>{v}</strong>
          <small>{PLACES[i]}</small>
        </button>
      {/each}
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
  .bits-word {
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

  .target-row strong { color: var(--qx-text); font-size: 15px; }

  .stage {
    width: 100%;
    display: grid;
    place-items: center;
    padding: 4px 0;
  }

  .char-card {
    width: 108px;
    height: 108px;
    border-radius: 14px;
    border: 2px solid var(--qx-border-2);
    background: var(--qx-surface-2);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
    transition: border-color 0.15s, background 0.15s;
  }

  .char-card.hit {
    border-color: var(--qx-green);
    background: var(--qx-green-soft);
  }

  .char {
    font-size: 46px;
    font-weight: 900;
    color: var(--qx-text);
    line-height: 1;
    font-family: var(--qx-font);
  }

  .char-card.hit .char { color: var(--qx-green-text); }

  .code {
    font-size: 12px;
    font-weight: 800;
    color: var(--qx-text-faint);
    font-variant-numeric: tabular-nums;
  }

  .byte-row {
    display: flex;
    gap: 4px;
    justify-content: center;
  }

  .cell {
    width: 40px;
    height: 58px;
    border-radius: 8px;
    border: 1.5px solid var(--qx-border-2);
    background: var(--qx-surface);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
    font-family: var(--qx-font);
    padding: 0;
  }

  button.cell { cursor: pointer; transition: border-color 0.12s, background 0.12s; }

  .cell strong {
    font-size: 17px;
    font-weight: 900;
    color: var(--qx-text-faint);
    line-height: 1;
  }

  .cell small {
    font-size: 9px;
    font-weight: 800;
    color: var(--qx-text-faint);
  }

  .cell.on { border-color: var(--qx-accent); background: var(--qx-accent-soft); }
  .cell.on strong, .cell.on small { color: var(--qx-accent-text); }

  .decode-hint {
    font-size: 13px;
    font-weight: 750;
    color: var(--qx-text-dim);
  }

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
  }

  .options button small { font-size: 11px; font-weight: 750; color: var(--qx-text-faint); }
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
