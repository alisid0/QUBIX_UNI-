<script>
  export let mode = 'fill';
  export let prompt = 'Complete the matrix.';
  export let matrix = [[1, null], [0, 1]];
  export let blankRow = 1;
  export let blankCol = 2;
  export let options = [];
  export let correctValue = null;
  export let matrices = [];
  export let correctIndex = 0;
  export let matrixA = [];
  export let matrixB = [];
  export let choices = [];
  export let correctChoice = 0;
  export let correctFeedback = 'Correct. The matrix pattern is locked in.';
  export let incorrectFeedback = 'Not yet. Read the rows and columns carefully.';
  export let onDone = () => {};

  let selected = null;
  let submitted = false;
  let correct = false;
  let lastKey = '';
  let shuffledOptions = [];
  let shuffledMatrices = [];
  let shuffledChoices = [];

  function shuffle(list = []) {
    const shuffled = [...list];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  function matrixRows(item) {
    return item?.matrix || item || [];
  }

  function choiceLabel(choice) {
    if (choice?.label) return choice.label;
    if (Array.isArray(choice)) return `(${choice.join(', ')})`;
    return String(choice ?? '');
  }

  function displayValue(value) {
    if (Array.isArray(value)) return `(${value.join(', ')})`;
    if (value && typeof value === 'object') return value.label || '';
    return value ?? '';
  }

  function isSelected(value) {
    return selected === value;
  }

  function evaluate() {
    if (mode === 'fill') {
      correct = String(selected) === String(correctValue);
    } else if (mode === 'identity') {
      correct = selected?.index === correctIndex;
    } else {
      correct = selected?.index === correctChoice;
    }
    submitted = true;
  }

  function finish() {
    onDone(correct ? 1 : 0, 1);
  }

  $: blankKey = `${blankRow - 1}-${blankCol - 1}`;
  $: safeOptions = options || [];
  $: safeMatrices = matrices || [];
  $: safeChoices = choices || [];
  $: safeMatrix = matrix || [];
  $: safeMatrixA = matrixA || [];
  $: safeMatrixB = matrixB || [];

  $: {
    const nextKey = JSON.stringify({ mode, prompt, safeMatrix, safeOptions, safeMatrices, safeMatrixA, safeMatrixB, safeChoices, correctValue, correctIndex, correctChoice });
    if (nextKey !== lastKey) {
      lastKey = nextKey;
      selected = null;
      submitted = false;
      correct = false;
      shuffledOptions = shuffle(safeOptions);
      shuffledMatrices = shuffle(safeMatrices.map((item, index) => ({ ...item, index })));
      shuffledChoices = shuffle(safeChoices.map((item, index) => (
        item && typeof item === 'object' && !Array.isArray(item)
          ? { ...item, index }
          : { value: item, index }
      )));
    }
  }
</script>

<div class="matrix-lab">
  <div class="prompt">{prompt}</div>

  {#if mode === 'fill'}
    <div class="matrix-shell">
      <div class="matrix-grid" style={`--cols:${safeMatrix[0]?.length || 1};`}>
        {#each safeMatrix as row, r}
          {#each row as value, c}
            <span class:blank={`${r}-${c}` === blankKey}>
              {`${r}-${c}` === blankKey ? (selected === null ? '?' : displayValue(selected)) : value}
            </span>
          {/each}
        {/each}
      </div>
    </div>

    <div class="options chips">
      {#each shuffledOptions as opt}
        <button
          class:selected={isSelected(opt)}
          class:right={submitted && String(opt) === String(correctValue)}
          class:wrong={submitted && isSelected(opt) && String(opt) !== String(correctValue)}
          on:click={() => { if (!submitted) selected = opt; }}
        >
          {displayValue(opt)}
        </button>
      {/each}
    </div>
  {:else if mode === 'identity'}
    <div class="matrix-options">
      {#each shuffledMatrices as item}
        <button
          class:selected={selected?.index === item.index}
          class:right={submitted && item.index === correctIndex}
          class:wrong={submitted && selected?.index === item.index && item.index !== correctIndex}
          on:click={() => { if (!submitted) selected = item; }}
        >
          <span>{item.label}</span>
          <div class="mini-matrix" style={`--cols:${matrixRows(item)[0]?.length || 1};`}>
            {#each matrixRows(item) as row}
              {#each row as value}
                <i>{value}</i>
              {/each}
            {/each}
          </div>
        </button>
      {/each}
    </div>
  {:else}
    <div class="equation">
      <div class="mini-matrix" style={`--cols:${safeMatrixA[0]?.length || 1};`}>
        {#each safeMatrixA as row}
          {#each row as value}
            <i>{value}</i>
          {/each}
        {/each}
      </div>
      <strong>{mode === 'addition' ? '+' : 'with'}</strong>
      <div class="mini-matrix" style={`--cols:${safeMatrixB[0]?.length || 1};`}>
        {#each safeMatrixB as row}
          {#each row as value}
            <i>{value}</i>
          {/each}
        {/each}
      </div>
    </div>

    <div class={mode === 'addition' ? 'matrix-options' : 'options chips'}>
      {#each shuffledChoices as choice}
        <button
          class:selected={selected?.index === choice.index}
          class:right={submitted && choice.index === correctChoice}
          class:wrong={submitted && selected?.index === choice.index && choice.index !== correctChoice}
          on:click={() => { if (!submitted) selected = choice; }}
        >
          {#if choice.matrix}
            <span>{choice.label}</span>
            <div class="mini-matrix" style={`--cols:${choice.matrix[0]?.length || 1};`}>
              {#each choice.matrix as row}
                {#each row as value}
                  <i>{value}</i>
                {/each}
              {/each}
            </div>
          {:else}
            {choiceLabel(choice.value ?? choice)}
          {/if}
        </button>
      {/each}
    </div>
  {/if}

  {#if !submitted}
    <button class="submit-btn" disabled={selected === null} on:click={evaluate}>Check</button>
  {:else}
    <div class="feedback" class:correct={correct} class:incorrect={!correct}>
      {correct ? correctFeedback : incorrectFeedback}
    </div>
    <button class="continue-btn" on:click={finish}>Continue</button>
  {/if}
</div>

<style>
  .matrix-lab {
    width: 100%;
    max-width: 430px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
  }

  .prompt {
    color: var(--qx-text);
    font-size: 15px;
    font-weight: 780;
    line-height: 1.42;
    text-align: center;
  }

  .matrix-shell,
  .equation,
  .matrix-options button {
    border: 1.5px solid var(--qx-border);
    border-radius: 8px;
    background: var(--qx-surface);
  }

  .matrix-shell {
    width: 100%;
    padding: 15px;
    box-sizing: border-box;
  }

  .matrix-grid,
  .mini-matrix {
    display: grid;
    grid-template-columns: repeat(var(--cols), 1fr);
    gap: 7px;
    padding: 10px 14px;
    border-left: 3px solid var(--qx-accent);
    border-right: 3px solid var(--qx-accent);
    border-radius: 5px;
  }

  .matrix-grid span,
  .mini-matrix i {
    min-width: 34px;
    min-height: 32px;
    display: grid;
    place-items: center;
    border-radius: 7px;
    background: var(--qx-surface-2);
    color: var(--qx-text);
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    font-size: 18px;
    font-style: normal;
    font-weight: 900;
  }

  .matrix-grid span.blank {
    border: 1.5px dashed var(--qx-accent);
    background: var(--qx-accent-soft);
    color: var(--qx-accent-text);
  }

  .equation {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: 10px;
    padding: 13px;
    box-sizing: border-box;
  }

  .equation strong {
    color: var(--qx-text-dim);
    font-size: 12px;
    font-weight: 900;
    text-transform: uppercase;
  }

  .mini-matrix {
    gap: 5px;
    padding: 8px 10px;
  }

  .mini-matrix i {
    min-width: 25px;
    min-height: 25px;
    font-size: 13px;
  }

  .options {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }

  .chips button,
  .matrix-options button {
    min-height: 44px;
    border-radius: 8px;
    border: 1.5px solid var(--qx-border-2);
    background: var(--qx-surface);
    color: var(--qx-text);
    font-family: var(--qx-font);
    font-size: 14px;
    font-weight: 850;
    cursor: pointer;
  }

  .chips button {
    padding: 0 12px;
  }

  .matrix-options {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  .matrix-options button {
    min-height: 126px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .matrix-options button > span {
    font-size: 12px;
    color: var(--qx-text-dim);
  }

  button.selected {
    border-color: var(--qx-accent);
    background: var(--qx-accent-soft);
    color: var(--qx-accent-text);
  }

  button.right {
    border-color: var(--qx-green);
    background: var(--qx-green-soft);
    color: var(--qx-green-text);
  }

  button.wrong {
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

  @media (max-width: 420px) {
    .matrix-options,
    .options,
    .equation {
      grid-template-columns: 1fr;
    }
  }
</style>
