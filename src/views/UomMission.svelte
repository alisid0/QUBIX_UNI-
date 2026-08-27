<script>
  // Mission 019. The receipt and the query disagree, and the receipt is right.
  //
  // The evidence panel puts the four lines of one basket next to the two ways of
  // reading them, because the whole lesson fits in four rows and does not need
  // to be hunted for. What has to be earned is noticing that the fault scales:
  // the same 0.307 becomes 1,291 across the chain, and still looks like a count.

  import { UOM_MISSION as M, UOM_FIGURES as F, basketReadings } from '../lib/game/uom-mission.js';
  import { recordCompletion } from '../lib/game/progress.js';

  let caseIndex = 0;
  let chosen = null;
  let revealed = false;
  let correct = 0;
  let complete = false;

  $: c = M.cases[caseIndex];
  $: b = basketReadings();

  function choose(option) {
    if (revealed) return;
    chosen = option;
    revealed = true;
    if (option === c.answer) correct += 1;
  }

  function next() {
    if (caseIndex + 1 >= M.cases.length) {
      complete = true;
      recordCompletion('uom');
      return;
    }
    caseIndex += 1; chosen = null; revealed = false;
  }

  function restart() {
    caseIndex = 0; chosen = null; revealed = false; correct = 0; complete = false;
  }
</script>

<section class="mission">
  <header>
    <div>
      <p class="eyebrow">{M.id} · {M.role} · {M.status}</p>
      <h1>{M.title}</h1>
      <p class="brief">{M.brief}</p>
    </div>
    <a class="console-link" href="?lab=sql">Check it in the data console →</a>
  </header>

  <main>
    <section class="evidence">
      <h2>Basket {b.saleId} <span class="sku">{b.branch} · {b.date} · £{b.total.toFixed(2)}</span></h2>

      <div class="table-scroll">
        <table>
          <thead>
            <tr><th class="n">#</th><th>Product</th><th class="n">Quantity</th><th>Unit</th><th class="n">Line total</th></tr>
          </thead>
          <tbody>
            {#each b.lines as line}
              <tr class:weighed={line.uom === 'kg'}>
                <td class="n">{line.no}</td>
                <td>{line.name} <span class="sku">{line.sku}</span></td>
                <td class="n">{line.quantity}</td>
                <td><span class="uom" class:kg={line.uom === 'kg'}>{line.uom}</span></td>
                <td class="n">£{line.lineTotal.toFixed(2)}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>

      <div class="readings">
        <div class="wrong-read">
          <span class="value">{b.naiveSum}</span>
          <span class="label">SUM(quantity)</span>
          <span class="note">adds {b.weighedTotal} kg to 4 items</span>
        </div>
        <div class="right-read">
          <span class="value">{b.items}</span>
          <span class="label">items on the receipt</span>
          <span class="note">a weighed line is one item</span>
        </div>
      </div>

      <h3>The same fault, across the chain</h3>
      <div class="scale">
        <p><b>{F.naiveSum.toLocaleString()}</b> <span>SUM(quantity), which is not a count of anything</span></p>
        <p><b>{F.unitQuantity.toLocaleString()}</b> <span>items on lines sold by the each</span></p>
        <p><b>{F.kilograms.toLocaleString()} kg</b> <span>across {F.weighedLines.toLocaleString()} weighed lines</span></p>
        <p class="agree"><b>{F.trueItems.toLocaleString()}</b> <span>items, derived from the lines and confirmed by the till</span></p>
      </div>
    </section>

    <section class="work">
      {#if complete}
        <div class="done">
          <span class="seal">✓</span>
          <p class="eyebrow">COMPETENCY DEMONSTRATED</p>
          <h2>You checked what the column meant, then found a second way to the answer.</h2>
          <p>{M.competency}</p>
          <p class="score">{correct} of {M.cases.length} first-time</p>
          <a class="console-link solid" href="?lab=sql">Count it yourself →</a>
          <button on:click={restart}>Work it through again</button>
        </div>
      {:else}
        <p class="eyebrow">STEP {caseIndex + 1} OF {M.cases.length}</p>
        <h2>{c.brief}</h2>
        <p class="hint">{c.hint}</p>

        <div class="options" role="group" aria-label="Answers">
          {#each c.options as option}
            <button
              class:right={revealed && option === c.answer}
              class:wrong={revealed && chosen === option && option !== c.answer}
              disabled={revealed}
              on:click={() => choose(option)}
            >{option}</button>
          {/each}
        </div>

        {#if revealed}
          <div class="why" class:good={chosen === c.answer}>
            <p class="verdict">{chosen === c.answer ? 'Correct.' : 'Not quite.'}</p>
            <p>{c.why}</p>
          </div>
          <button class="next" on:click={next}>
            {caseIndex + 1 >= M.cases.length ? 'Finish' : 'Next step'}
          </button>
        {/if}
      {/if}
    </section>
  </main>

  <footer>
    <span>Source-informed learning draft · figures verified against the sample database</span>
    <span>{#each M.sources as s, i}<a href={s.url} target="_blank" rel="noreferrer">{s.label}</a>{i < M.sources.length - 1 ? ' · ' : ''}{/each}</span>
  </footer>
</section>

<style>
  .mission { min-height: 100vh; padding: 24px 18px 48px; background: var(--qx-bg); color: #25231f; font-family: var(--qx-font); }
  header {
    max-width: 1180px; margin: 0 auto 22px; display: flex; flex-wrap: wrap;
    gap: 14px 24px; align-items: flex-end; justify-content: space-between;
  }
  .eyebrow { margin: 0 0 6px; color: var(--qx-accent-text); font: 900 11.5px/1 var(--qx-font); letter-spacing: 0.11em; }
  h1 { margin: 0 0 8px; font: 800 30px/1.15 var(--qx-font); letter-spacing: -0.02em; font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
  .brief { margin: 0; max-width: 44em; font: 650 15px/1.6 var(--qx-font); color: #5c5648; }

  .console-link {
    display: inline-block; padding: 10px 16px; border: 2px solid #25231f; border-radius: 11px;
    color: #25231f; font: 900 13px/1.3 var(--qx-font); text-decoration: none; white-space: nowrap;
  }
  .console-link:hover { background: #25231f; color: #f1ede4; }
  .console-link:focus-visible { outline: 3px solid var(--qx-accent); outline-offset: 2px; }
  .console-link.solid { background: #25231f; color: #f1ede4; margin-top: 6px; }

  main { max-width: 1180px; margin: 0 auto; display: grid; gap: 20px; }
  @media (min-width: 62rem) { main { grid-template-columns: 1.05fr 1fr; align-items: start; } }
  section.evidence, section.work { padding: 20px; border: 2px solid #ded6c6; border-radius: 14px; background: #fff; }
  h2 { margin: 0 0 12px; font: 800 19px/1.3 var(--qx-font); letter-spacing: -0.01em; }
  h3 { margin: 18px 0 8px; font: 750 13px/1.3 var(--qx-font); }
  .sku { color: #8d8474; font: 650 11.5px var(--qx-font); }

  .table-scroll { overflow-x: auto; border: 1px solid #e4ddcd; border-radius: 10px; }
  table { border-collapse: collapse; width: 100%; font: 650 13.5px/1.5 var(--qx-font); }
  th, td { padding: 9px 12px; text-align: left; }
  .n { text-align: right; font-variant-numeric: tabular-nums; }
  thead th { background: #f4f0e7; color: #6b6152; font: 800 11.5px/1 var(--qx-font); letter-spacing: 0.07em; text-transform: uppercase; }
  tbody tr + tr td { border-top: 1px solid #ece7dc; }
  tbody tr.weighed { background: #f7ede6; }
  .uom {
    display: inline-block; padding: 1px 7px; border-radius: 999px;
    background: #ece7dc; color: #6b6152; font: 800 11px/1.7 var(--qx-font);
  }
  .uom.kg { background: var(--qx-accent); color: #fff; }

  .readings { display: grid; gap: 10px; margin-top: 14px; }
  @media (min-width: 30rem) { .readings { grid-template-columns: 1fr 1fr; } }
  .readings > div { padding: 12px 13px; border-radius: 11px; display: flex; flex-direction: column; gap: 2px; }
  .wrong-read { background: #f6e3df; border: 1px solid #e5c3bb; }
  .right-read { background: #eff4e8; border: 1px solid #cfe0c2; }
  .readings .value { font: 800 24px/1.1 var(--qx-font); font-variant-numeric: tabular-nums; }
  .readings .label { font: 700 12px/1.4 var(--qx-font); font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
  .readings .note { font: 650 11.5px/1.4 var(--qx-font); color: #6b6152; }

  .scale { display: flex; flex-direction: column; gap: 6px; }
  .scale p {
    margin: 0; display: flex; flex-wrap: wrap; gap: 4px 10px; align-items: baseline;
    padding: 8px 12px; border-radius: 9px; background: #faf8f3;
  }
  .scale b { font: 800 15px/1.2 var(--qx-font); font-variant-numeric: tabular-nums; min-width: 7.5em; }
  .scale span { font: 650 12.5px/1.5 var(--qx-font); color: #6b6152; }
  .scale .agree { background: #eff4e8; }

  .hint { margin: 0 0 14px; color: #6b6152; font: 650 13px/1.6 var(--qx-font); }
  .options { display: flex; flex-direction: column; gap: 8px; }
  .options button {
    width: 100%; padding: 13px 15px; text-align: left; border: 2px solid #ded6c6;
    border-radius: 11px; background: #fff; font: 650 14px/1.5 var(--qx-font); color: #25231f; cursor: pointer;
  }
  .options button:hover:not(:disabled) { border-color: #25231f; }
  .options button:disabled { cursor: default; }
  .options button.right { border-color: #3e9e2a; background: #eff4e8; }
  .options button.wrong { border-color: #b3402e; background: #f6e3df; }
  .options button:focus-visible { outline: 3px solid var(--qx-accent); outline-offset: 2px; }

  .why { margin-top: 14px; padding: 13px 15px; border-radius: 11px; background: #f6e3df; border: 1px solid #e5c3bb; }
  .why.good { background: #eff4e8; border-color: #cfe0c2; }
  .why p { margin: 0; font: 650 13.5px/1.65 var(--qx-font); }
  .verdict { font-weight: 900; margin-bottom: 5px !important; }

  .next, .done button {
    width: 100%; min-height: 46px; margin-top: 13px; border: 0; border-radius: 11px;
    background: #2f7d6a; color: #fff; font: 900 13.5px var(--qx-font); cursor: pointer;
  }
  .next:focus-visible, .done button:focus-visible { outline: 3px solid #25231f; outline-offset: 2px; }
  .done { text-align: center; }
  .seal { display: block; font-size: 30px; color: #3e9e2a; }
  .score { color: #6b6152; font: 700 13px var(--qx-font); }

  footer {
    max-width: 1180px; margin: 18px auto 0; display: flex; flex-wrap: wrap;
    gap: 12px; justify-content: space-between; color: #6f8794; font: 650 12px/1.5 var(--qx-font);
  }
  footer a { color: inherit; }
</style>
