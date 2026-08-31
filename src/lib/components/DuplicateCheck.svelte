<script>
  // Four pairs of rows. Is this the same case recorded twice?
  //
  // Each pair arrives with the table's grain and its identifying columns named
  // above it, and those columns are marked in the table itself. That is the
  // method being taught: you decide by comparing the identifying columns, not
  // by noticing that two rows look alike. Two sales can legitimately share a
  // customer and a total, and two rows can be identical in an extract that
  // simply left the identifier out.
  //
  // The fourth pair has no identifying columns at all and the honest answer is
  // that the evidence does not settle it. That option is always on screen, so
  // choosing it is a judgement rather than a hint.
  //
  // Ported from a review-document script that wrote into data-dup-* hooks.

  import { createEventDispatcher } from 'svelte';

  export let cases = [];
  export let completed = false;

  const dispatch = createEventDispatcher();

  const CHOICES = [
    'Two different records',
    'The same record twice',
    'Not enough evidence'
  ];

  let round = 0;
  let picked = null;
  let answered = false;
  let correct = false;

  $: current = cases[round];
  $: last = round === cases.length - 1;

  // Which cells differ between the two rows, so the difference can be marked
  // rather than left for the learner to spot by eye.
  $: differing = current
    ? current.columns.map((_, i) => current.rows[0][i] !== current.rows[1][i])
    : [];

  // A second press cannot get in. The early return below reads the settled flag
  // that this same handler set, so the second press is rejected by the first
  // one having already happened, and the buttons are disabled from the next
  // render onward.
  //
  // A no-op flag used to sit here, set true and false again inside one
  // synchronous handler. It read like protection and blocked nothing.

  function pick(index) {
    if (answered || completed || !current) return;
    picked = index;
    answered = true;
    correct = index === current.correct;
  }

  function next() {
    if (!correct) return;
    picked = null; answered = false; correct = false;
    if (!last) { round += 1; return; }
    dispatch('complete');
  }

  function again() { picked = null; answered = false; correct = false; }
</script>

<div class="dup">
  <p class="progress" aria-live="polite">
    {completed ? 'All four pairs done' : `Pair ${round + 1} of ${cases.length}`}
  </p>

  {#if current && !completed}
    <dl class="context">
      <div><dt>Table</dt><dd>{current.table}</dd></div>
      <div><dt>One row represents</dt><dd>{current.grain}</dd></div>
      <div><dt>Identifying columns</dt><dd>{current.key}</dd></div>
    </dl>

    <!-- Wide screens get a table. Narrow screens get one card per row, so the
         comparison stays readable instead of scrolling sideways. -->
    <div class="wide">
      <table>
        <thead>
          <tr>{#each current.columns as col}
            <th class:key={col.key}>{col.name}{#if col.key}<i aria-hidden="true">key</i>{/if}</th>
          {/each}</tr>
        </thead>
        <tbody>
          {#each current.rows as row, r}
            <tr>{#each row as cell, c}
              <td class:key={current.columns[c].key} class:differs={differing[c]}>{cell}</td>
            {/each}</tr>
          {/each}
        </tbody>
      </table>
    </div>

    <!-- Not aria-hidden: display:none already takes whichever view is not in
         use out of the accessibility tree, and hiding this one would leave a
         screen reader on a phone with no rows at all. -->
    <div class="narrow">
      {#each current.rows as row, r}
        <div class="rowcard">
          <b>Row {r + 1}</b>
          {#each row as cell, c}
            <p class:key={current.columns[c].key} class:differs={differing[c]}>
              <span>{current.columns[c].name}{#if current.columns[c].key}<i>key</i>{/if}</span>{cell}
            </p>
          {/each}
        </div>
      {/each}
    </div>

    <p class="question" id="dup-question">Do these rows describe the same case twice?</p>

    <div class="choices" role="group" aria-labelledby="dup-question">
      {#each CHOICES as label, i}
        <button
          class="choice"
          class:picked={picked === i}
          class:right={answered && correct && picked === i}
          class:wrong={answered && !correct && picked === i}
          class:answer={answered && !correct && i === current.correct}
          aria-pressed={picked === i}
          disabled={answered}
          on:click={() => pick(i)}>{label}</button>
      {/each}
    </div>

    <div class="feedback" role="status" aria-live="polite">
      {#if answered && correct}
        <p class="good"><b>Yes.</b> {current.explanation}</p>
      {:else if answered}
        <p class="not-yet"><b>Not that one.</b> {current.explanation}</p>
      {:else}
        <p class="waiting">Compare the identifying columns before anything else.</p>
      {/if}
    </div>

    {#if answered && correct}
      <div class="term"><span>WHAT THIS IS CALLED</span><b>{current.term}</b></div>
      <button class="advance" on:click={next}>{last ? 'Finish' : 'Next pair'}</button>
    {:else if answered}
      <button class="advance retry" on:click={again}>Try this one again</button>
    {/if}
  {:else}
    <p class="all-done">Two rows that look alike are not automatically the same record, and two
      rows that are the same record are not always easy to see. The identifying columns settle it,
      and when an extract leaves them out, nothing settles it.</p>
  {/if}
</div>

<style>
  .dup { display: grid; gap: 13px; }

  .progress { margin: 0; color: #6d6558; font: 800 11px var(--qx-font, system-ui);
              letter-spacing: .1em; text-transform: uppercase; }

  .context { display: grid; gap: 7px; margin: 0; padding: 13px 15px;
             border-left: 4px solid #20241f; background: #fffdf7; }
  .context > div { display: flex; gap: 9px; flex-wrap: wrap; align-items: baseline; }
  .context dt { color: #8b8375; font: 700 11px var(--qx-font, system-ui);
                letter-spacing: .08em; text-transform: uppercase; }
  .context dd { margin: 0; font: 700 13.5px var(--qx-font, system-ui); color: #20241f; }

  table { width: 100%; border-collapse: collapse; font: 650 14px var(--qx-font, system-ui); }
  th, td { padding: 9px 12px; text-align: left; color: #20241f; border-bottom: 1px solid #e0d8c8; }
  th { font: 800 11.5px var(--qx-font, system-ui); letter-spacing: .06em; text-transform: uppercase;
       color: #6d6558; border-bottom: 2px solid #20241f; }
  th.key { color: #8c4c2e; }
  th.key i { margin-left: 6px; padding: 2px 5px; border-radius: 3px; background: #f6e6db;
             font: 800 11px var(--qx-font, system-ui); font-style: normal; letter-spacing: .05em; }
  td.key { font-weight: 800; background: #faf3ec; }
  /* A cell that differs is marked with a rule as well as a tint. */
  td.differs { box-shadow: inset 0 -3px 0 #3e9e2a; }

  .narrow { display: none; }
  .rowcard { padding: 12px 14px; border: 2px solid #cbbfa6; border-radius: 10px;
             background: #fffdf7; }
  .rowcard + .rowcard { margin-top: 9px; }
  .rowcard b { display: block; margin-bottom: 7px; color: #8b8375;
               font: 800 11px var(--qx-font, system-ui); letter-spacing: .09em; }
  .rowcard p { margin: 0; display: flex; justify-content: space-between; gap: 12px;
               padding: 5px 0; border-top: 1px solid #efe8db;
               font: 700 14px var(--qx-font, system-ui); color: #20241f; }
  .rowcard p span { color: #8b8375; font-weight: 700; }
  /* Marked the same way as the table heading, rather than with a separator
     whose leading space Svelte trims out of the if-block. */
  .rowcard p span i { margin-left: 6px; padding: 2px 5px; border-radius: 3px; background: #f6e6db;
                      color: #8c4c2e; font: 800 11px var(--qx-font, system-ui); font-style: normal; }
  .rowcard p.key { background: #faf3ec; }
  .rowcard p.differs { box-shadow: inset 0 -3px 0 #3e9e2a; }

  .question { margin: 0; font: 700 18px/1.35 Georgia, serif; color: #20241f; }

  .choices { display: grid; gap: 8px; }
  .choice { width: 100%; min-height: 46px; padding: 11px 15px; text-align: left; cursor: pointer;
            border: 2px solid #cbbfa6; border-radius: 10px; background: #fff; color: #20241f;
            font: 650 15px/1.35 var(--qx-font, system-ui); }
  .choice:hover:not(:disabled) { border-color: #a85a34; }
  .choice:focus-visible { outline: 3px solid #a85a34; outline-offset: 2px; }
  .choice.picked { border-color: #20241f; }
  .choice.right { border-color: #3e9e2a; background: #e7f1e2; color: #2c6b1c; }
  .choice.right::after { content: ' — correct'; font-weight: 800; }
  .choice.wrong { border-color: #b3402e; background: #f7e7e3; }
  .choice.wrong::after { content: ' — not this one'; font-weight: 800; color: #8c3a2a; }
  .choice.answer { border-color: #3e9e2a; }
  .choice.answer::after { content: ' — this one'; font-weight: 800; color: #2c6b1c; }
  .choice:disabled { cursor: default; }

  .feedback { min-height: 44px; }
  .feedback p { margin: 0; font: 600 14px/1.5 var(--qx-font, system-ui); }
  .good { color: #2c6b1c; }
  .not-yet { color: #8c3a2a; }
  .waiting { color: #8b8375; }

  .term { display: grid; gap: 2px; padding: 12px 16px; border-left: 4px solid #a85a34;
          background: #f6e6db; }
  .term span { color: #8c4c2e; font: 800 11px var(--qx-font, system-ui); letter-spacing: .11em; }
  .term b { font: 800 19px var(--qx-font, system-ui); color: #20241f; }

  .advance { min-height: 46px; padding: 0 20px; border: 0; border-radius: 11px; cursor: pointer;
             background: #20241f; color: #fff; font: 800 15px var(--qx-font, system-ui); }
  .advance.retry { background: #fffdf7; color: #20241f; border: 2px solid #20241f; }
  .advance:focus-visible { outline: 3px solid #a85a34; outline-offset: 2px; }

  .all-done { margin: 0; color: #4a4436; font: 600 15px/1.6 var(--qx-font, system-ui); max-width: 62ch; }

  @media (max-width: 620px) {
    .wide { display: none; }
    .narrow { display: block; }
    .question { font-size: 16.5px; }
  }

  @media (forced-colors: active) {
    td.differs, .rowcard p.differs { box-shadow: inset 0 -3px 0 CanvasText; }
    .choice.right, .choice.answer, .choice.wrong { border-color: CanvasText; }
  }
</style>
