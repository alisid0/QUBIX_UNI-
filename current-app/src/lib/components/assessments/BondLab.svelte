<script>
  export let prompt = 'Build stable compounds on the bench.';
  export let onDone = () => {};

  const elements = [
    { s: 'H', name: 'Hydrogen', group: 'nonmetal', valence: 1 },
    { s: 'C', name: 'Carbon', group: 'nonmetal', valence: 4 },
    { s: 'N', name: 'Nitrogen', group: 'nonmetal', valence: 5 },
    { s: 'O', name: 'Oxygen', group: 'nonmetal', valence: 6 },
    { s: 'F', name: 'Fluorine', group: 'nonmetal', valence: 7 },
    { s: 'Na', name: 'Sodium', group: 'metal', valence: 1 },
    { s: 'Mg', name: 'Magnesium', group: 'metal', valence: 2 },
    { s: 'Cl', name: 'Chlorine', group: 'nonmetal', valence: 7 },
    { s: 'Ne', name: 'Neon', group: 'noble', valence: 8 }
  ];

  const recipes = [
    {
      target: 'H2O',
      name: 'water',
      atoms: ['H', 'H', 'O'],
      type: 'covalent',
      insight: 'Oxygen is short by two electrons. Two hydrogens share one each, making water stable.'
    },
    {
      target: 'NaCl',
      name: 'sodium chloride',
      atoms: ['Na', 'Cl'],
      type: 'ionic',
      insight: 'Sodium gives up one outer electron. Chlorine accepts it. Opposite charges hold the ions together.'
    },
    {
      target: 'CO2',
      name: 'carbon dioxide',
      atoms: ['C', 'O', 'O'],
      type: 'covalent',
      insight: 'Carbon shares with two oxygens. The molecule is stable because electrons are shared into full shells.'
    }
  ];

  let bench = [];
  let targetIndex = 0;
  let notebook = [];
  let feedback = 'Choose atoms for the current commission, then bring them together.';
  let submitted = false;

  $: target = recipes[targetIndex];
  $: formula = bench.map((a) => a.s).join(' ');
  $: complete = notebook.length >= recipes.length;

  function addAtom(el) {
    if (submitted || bench.length >= 4 || el.group === 'noble') {
      if (el.group === 'noble') feedback = `${el.name} already has a full outer shell, so it usually refuses to bond.`;
      return;
    }
    bench = [...bench, el];
    feedback = `${el.name} placed on the bench.`;
  }

  function removeAtom(index) {
    if (submitted) return;
    bench = bench.filter((_, i) => i !== index);
  }

  function sameAtoms(a, b) {
    const count = (list) => list.reduce((map, item) => ({ ...map, [item]: (map[item] || 0) + 1 }), {});
    const ca = count(a);
    const cb = count(b);
    return Object.keys({ ...ca, ...cb }).every((key) => ca[key] === cb[key]);
  }

  function react() {
    const symbols = bench.map((a) => a.s);
    if (!sameAtoms(symbols, target.atoms)) {
      feedback = `Not that mixture. The commission needs ${target.atoms.join(' + ')}.`;
      return;
    }
    notebook = [...notebook, target];
    feedback = `${target.target} formed: ${target.insight}`;
    bench = [];
    if (targetIndex < recipes.length - 1) {
      targetIndex += 1;
    } else {
      submitted = true;
    }
  }

  function clearBench() {
    bench = [];
    feedback = 'Bench cleared.';
  }
</script>

<div class="bond-lab">
  <div class="prompt">{prompt}</div>

  <section class="commission">
    <div>
      <small>Commission {targetIndex + 1}/3</small>
      <strong>Make {target.target}</strong>
      <span>{target.name} - {target.type} bond</span>
    </div>
    <b>{notebook.length}/3</b>
  </section>

  <section class="bench">
    {#if bench.length}
      {#each bench as atom, i}
        <button class:metal={atom.group === 'metal'} on:click={() => removeAtom(i)}>
          <strong>{atom.s}</strong>
          <small>{atom.valence} outer e-</small>
        </button>
      {/each}
    {:else}
      <em>Tap elements below to place atoms on the bench.</em>
    {/if}
  </section>

  <div class="formula">
    <span>Bench</span>
    <strong>{formula || 'empty'}</strong>
  </div>

  <div class="palette">
    {#each elements as el}
      <button class:metal={el.group === 'metal'} class:noble={el.group === 'noble'} on:click={() => addAtom(el)}>
        <strong>{el.s}</strong>
        <small>{el.name}</small>
      </button>
    {/each}
  </div>

  <p>{feedback}</p>

  {#if notebook.length}
    <div class="notebook">
      {#each notebook as entry}
        <span>{entry.target}<small>{entry.type}</small></span>
      {/each}
    </div>
  {/if}

  <div class="actions">
    <button class="secondary" on:click={clearBench} disabled={submitted}>Clear</button>
    {#if submitted}
      <button class="primary" on:click={() => onDone(1, 1)}>Continue</button>
    {:else}
      <button class="primary" on:click={react} disabled={!bench.length}>Bring together</button>
    {/if}
  </div>
</div>

<style>
  .bond-lab { width: 100%; max-width: 430px; margin: 0 auto; display: grid; gap: 11px; }
  .prompt { text-align: center; font-size: 15px; font-weight: 850; color: var(--qx-text); line-height: 1.4; }
  button { font: inherit; cursor: pointer; }
  .commission { display: flex; justify-content: space-between; align-items: center; gap: 12px; padding: 11px 13px; border: 1.5px solid var(--qx-border); border-radius: 8px; background: var(--qx-accent-soft-2); }
  .commission div { display: grid; gap: 2px; }
  .commission small, .formula span { color: var(--qx-accent); text-transform: uppercase; letter-spacing: 0.08em; font-size: 10px; font-weight: 900; }
  .commission strong { color: var(--qx-text); font-size: 16px; font-weight: 950; }
  .commission span { color: var(--qx-text-2); font-size: 12.5px; font-weight: 750; }
  .commission b { color: var(--qx-accent); }
  .bench { min-height: 126px; border: 1.5px solid var(--qx-border); border-radius: 8px; background: linear-gradient(180deg, var(--qx-surface-2), var(--qx-surface)); padding: 12px; display: flex; flex-wrap: wrap; gap: 10px; align-items: center; justify-content: center; }
  .bench em { color: var(--qx-text-faint); font-size: 14px; font-style: normal; font-weight: 750; text-align: center; }
  .bench button { width: 78px; height: 78px; border-radius: 50%; border: 2px solid var(--qx-border-2); background: var(--qx-surface); color: var(--qx-text); display: grid; place-items: center; }
  .bench button.metal { background: var(--qx-accent-soft); border-color: var(--qx-accent); }
  .bench strong { font-size: 23px; font-weight: 950; }
  .bench small { color: var(--qx-text-faint); font-size: 10px; font-weight: 850; }
  .formula { display: flex; align-items: center; justify-content: space-between; border: 1.5px solid var(--qx-border); border-radius: 8px; background: var(--qx-surface); padding: 9px 12px; }
  .formula strong { color: var(--qx-text); font-size: 15px; font-weight: 950; }
  .palette { display: grid; grid-template-columns: repeat(3, 1fr); gap: 7px; }
  .palette button { min-height: 54px; border: 1.5px solid var(--qx-border-2); border-radius: 8px; background: var(--qx-surface); color: var(--qx-text); display: grid; place-items: center; padding: 6px 2px; }
  .palette button.metal { background: var(--qx-accent-soft-2); }
  .palette button.noble { opacity: 0.58; border-style: dashed; }
  .palette strong { font-size: 18px; font-weight: 950; }
  .palette small { color: var(--qx-text-faint); font-size: 10px; font-weight: 800; }
  p { margin: 0; min-height: 42px; color: var(--qx-text-2); font-size: 13.5px; font-weight: 700; line-height: 1.45; }
  .notebook { display: flex; gap: 7px; flex-wrap: wrap; }
  .notebook span { padding: 7px 10px; border-radius: 999px; background: var(--qx-green-soft); color: var(--qx-green-text); font-size: 12px; font-weight: 900; }
  .notebook small { margin-left: 6px; opacity: 0.8; }
  .actions { display: flex; gap: 9px; }
  .primary, .secondary { min-height: 44px; border-radius: 8px; border: 0; padding: 0 14px; font-size: 14px; font-weight: 900; }
  .primary { background: var(--qx-accent); color: #fff; flex: 1.35; }
  .secondary { background: var(--qx-surface); border: 1.5px solid var(--qx-border-2); color: var(--qx-text); flex: 1; }
  .primary:disabled, .secondary:disabled { opacity: 0.5; cursor: not-allowed; }
</style>
