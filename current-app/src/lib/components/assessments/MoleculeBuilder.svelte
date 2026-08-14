<script>
  export let prompt = 'Build the molecule shown in the target.';
  export let targetFormula = 'H2O';
  export let targetAtoms = { H: 2, O: 1 };
  export let correctFeedback = 'Correct. The molecule matches the formula.';
  export let incorrectFeedback = 'Not yet. Match the atom counts in the formula.';
  export let onDone = () => {};

  const ATOMS = [
    { id: 'H', name: 'Hydrogen', color: '#E9EEF7' },
    { id: 'O', name: 'Oxygen', color: '#71B7FF' },
    { id: 'C', name: 'Carbon', color: '#9AA0A6' },
    { id: 'N', name: 'Nitrogen', color: '#9D8CFF' }
  ];

  let counts = { H: 0, O: 0, C: 0, N: 0 };
  let submitted = false;
  let correct = false;

  $: builtAtoms = ATOMS.flatMap(atom => Array.from({ length: counts[atom.id] }, (_, index) => ({ ...atom, key: `${atom.id}-${index}` })));
  $: formula = ATOMS.map(atom => counts[atom.id] ? `${atom.id}${counts[atom.id] > 1 ? counts[atom.id] : ''}` : '').join('') || '-';

  function bump(id, delta) {
    if (submitted) return;
    counts[id] = Math.max(0, Math.min(6, counts[id] + delta));
    counts = { ...counts };
  }

  function submit() {
    correct = ATOMS.every(atom => (counts[atom.id] || 0) === (targetAtoms[atom.id] || 0));
    submitted = true;
  }

  function finish() {
    onDone(correct ? 1 : 0, 1);
  }
</script>

<div class="molecule-builder">
  <div class="prompt">{prompt}</div>
  <div class="target">
    Target: <strong>{targetFormula}</strong>
    <span>Built: {formula}</span>
  </div>

  <div class="bench">
    <div class="molecule">
      {#if builtAtoms.length}
        {#each builtAtoms as atom, index (atom.key)}
          <span
            class="atom"
            style={`--x:${Math.cos(index * 2.399) * Math.min(76, 24 + builtAtoms.length * 9)}px; --y:${Math.sin(index * 2.399) * Math.min(76, 24 + builtAtoms.length * 9)}px; --c:${atom.color};`}
          >
            {atom.id}
          </span>
        {/each}
      {:else}
        <div class="empty">Add atoms</div>
      {/if}
    </div>
  </div>

  <div class="atom-palette">
    {#each ATOMS as atom}
      <div class="atom-control">
        <span class="sample" style={`--c:${atom.color};`}>{atom.id}</span>
        <div>
          <strong>{atom.name}</strong>
          <small>{counts[atom.id]}</small>
        </div>
        <button on:click={() => bump(atom.id, -1)} aria-label={`Remove ${atom.name}`}>-</button>
        <button on:click={() => bump(atom.id, 1)} aria-label={`Add ${atom.name}`}>+</button>
      </div>
    {/each}
  </div>

  {#if !submitted}
    <button class="submit-btn" on:click={submit}>Check formula</button>
  {:else}
    <div class="feedback" class:correct={correct} class:incorrect={!correct}>
      {correct ? correctFeedback : incorrectFeedback}
    </div>
    <button class="continue-btn" on:click={finish}>Continue</button>
  {/if}
</div>

<style>
  .molecule-builder {
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

  .target {
    width: 100%;
    box-sizing: border-box;
    padding: 9px 11px;
    border: 1px solid var(--qx-border);
    border-radius: 8px;
    background: var(--qx-surface-2);
    color: var(--qx-text-dim);
    font-size: 12px;
    font-weight: 750;
    display: flex;
    justify-content: space-between;
    gap: 12px;
  }

  .target strong {
    color: var(--qx-text);
    font-size: 14px;
  }

  .bench {
    width: 100%;
    border: 1.5px solid var(--qx-border);
    border-radius: 8px;
    background: radial-gradient(circle at 50% 45%, var(--qx-surface-2), var(--qx-surface));
    min-height: 220px;
    display: grid;
    place-items: center;
    padding: 14px;
    box-sizing: border-box;
  }

  .molecule {
    width: 190px;
    height: 170px;
    position: relative;
    display: grid;
    place-items: center;
  }

  .molecule::before {
    content: '';
    position: absolute;
    inset: 46px;
    border: 1px dashed var(--qx-border-2);
    border-radius: 999px;
  }

  .atom {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(calc(-50% + var(--x)), calc(-50% + var(--y)));
    width: 42px;
    height: 42px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: var(--c);
    color: #111827;
    border: 2px solid rgba(255, 255, 255, 0.7);
    box-shadow: 0 12px 26px rgba(0, 0, 0, 0.22);
    font-size: 15px;
    font-weight: 900;
  }

  .empty {
    color: var(--qx-text-faint);
    font-size: 13px;
    font-weight: 800;
  }

  .atom-palette {
    width: 100%;
    display: grid;
    gap: 8px;
  }

  .atom-control {
    display: grid;
    grid-template-columns: 38px 1fr 34px 34px;
    align-items: center;
    gap: 8px;
    border: 1px solid var(--qx-border);
    border-radius: 8px;
    background: var(--qx-surface);
    padding: 8px;
  }

  .sample {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: var(--c);
    color: #111827;
    font-size: 13px;
    font-weight: 900;
  }

  .atom-control strong,
  .atom-control small {
    display: block;
    line-height: 1.1;
  }

  .atom-control strong {
    color: var(--qx-text);
    font-size: 13px;
    font-weight: 850;
  }

  .atom-control small {
    color: var(--qx-text-faint);
    font-size: 12px;
    font-weight: 800;
    margin-top: 3px;
  }

  .atom-control button {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    border: 1px solid var(--qx-border-2);
    background: var(--qx-surface-2);
    color: var(--qx-text);
    font: 900 18px/1 var(--qx-font);
    cursor: pointer;
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
