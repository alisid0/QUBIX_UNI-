<script>
  export let prompt = 'Tap the requested matrix cell.';
  export let matrix = [[4, 8, 2], [7, 1, 9]];
  export let targetRow = 2;
  export let targetCol = 3;
  export let correctFeedback = 'Correct. Rows go across; columns go down.';
  export let incorrectFeedback = 'Not yet. Find the row first, then the column.';
  export let onDone = () => {};

  let selected = null;
  let submitted = false;
  let correct = false;

  $: rows = matrix.length;
  $: cols = matrix[0]?.length || 0;
  $: targetKey = `${targetRow - 1}-${targetCol - 1}`;
  $: targetValue = matrix[targetRow - 1]?.[targetCol - 1];

  function pick(row, col) {
    if (submitted) return;
    selected = `${row}-${col}`;
  }

  function submit() {
    correct = selected === targetKey;
    submitted = true;
  }

  function finish() {
    onDone(correct ? 1 : 0, 1);
  }
</script>

<div class="matrix-cell">
  <div class="prompt">{prompt}</div>
  <div class="target">Find <strong>row {targetRow}, column {targetCol}</strong></div>

  <div class="matrix-wrap">
    <div class="col-heads" style={`--cols:${cols};`}>
      {#each Array(cols) as _, col}
        <span>C{col + 1}</span>
      {/each}
    </div>
    <div class="matrix-row-area">
      <div class="row-heads" style={`--rows:${rows};`}>
        {#each Array(rows) as _, row}
          <span>R{row + 1}</span>
        {/each}
      </div>
      <div class="grid" style={`--cols:${cols}; --rows:${rows};`}>
        {#each matrix as row, r}
          {#each row as value, c}
            <button
              class:selected={selected === `${r}-${c}`}
              class:right={submitted && `${r}-${c}` === targetKey}
              class:wrong={submitted && selected === `${r}-${c}` && selected !== targetKey}
              on:click={() => pick(r, c)}
            >
              {value}
            </button>
          {/each}
        {/each}
      </div>
    </div>
  </div>

  <div class="readout">Target value: <strong>{targetValue}</strong></div>

  {#if !submitted}
    <button class="submit-btn" disabled={!selected} on:click={submit}>Check cell</button>
  {:else}
    <div class="feedback" class:correct={correct} class:incorrect={!correct}>
      {correct ? correctFeedback : incorrectFeedback}
    </div>
    <button class="continue-btn" on:click={finish}>Continue</button>
  {/if}
</div>

<style>
  .matrix-cell {
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

  .target,
  .readout {
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

  .target strong,
  .readout strong {
    color: var(--qx-text);
  }

  .matrix-wrap {
    width: 100%;
    border: 1.5px solid var(--qx-border);
    border-radius: 8px;
    background: var(--qx-surface);
    padding: 14px;
    box-sizing: border-box;
  }

  .col-heads {
    display: grid;
    grid-template-columns: repeat(var(--cols), 1fr);
    gap: 7px;
    padding-left: 38px;
    margin-bottom: 7px;
  }

  .row-heads {
    display: grid;
    grid-template-rows: repeat(var(--rows), 1fr);
    gap: 7px;
  }

  .col-heads span,
  .row-heads span {
    min-height: 43px;
    display: grid;
    place-items: center;
    color: var(--qx-text-faint);
    font-size: 10px;
    font-weight: 850;
    letter-spacing: 0.06em;
  }

  .matrix-row-area {
    display: grid;
    grid-template-columns: 31px 1fr;
    gap: 7px;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(var(--cols), 1fr);
    grid-template-rows: repeat(var(--rows), 1fr);
    gap: 7px;
  }

  .grid button {
    min-height: 43px;
    border-radius: 8px;
    border: 1.5px solid var(--qx-border-2);
    background: var(--qx-surface-2);
    color: var(--qx-text);
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    font-size: 18px;
    font-weight: 900;
    cursor: pointer;
  }

  .grid button.selected {
    border-color: var(--qx-accent);
    background: var(--qx-accent-soft);
    color: var(--qx-accent-text);
  }

  .grid button.right {
    border-color: var(--qx-green);
    background: var(--qx-green-soft);
    color: var(--qx-green-text);
  }

  .grid button.wrong {
    border-color: var(--qx-danger);
    background: var(--qx-danger-soft);
    color: var(--qx-danger-text);
  }

  .submit-btn,
  .continue-btn {
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

  .submit-btn:disabled {
    opacity: 0.45;
    cursor: default;
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

  .feedback.correct {
    background: var(--qx-green-soft);
    color: var(--qx-green-text);
  }

  .feedback.incorrect {
    background: var(--qx-danger-soft);
    color: var(--qx-danger-text);
  }
</style>
