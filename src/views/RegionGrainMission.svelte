<script>
  // Mission 017. The first mission whose evidence a learner can go and check.
  //
  // Every figure shown here is in the sample database, and the console is one
  // link away, so the mission has to be right rather than merely plausible.
  // check-region-grain.mjs asserts each number against the database on every
  // build for exactly that reason.

  import { REGION_GRAIN_MISSION as M, REGION_FIGURES, regionDeltas } from '../lib/game/region-grain-mission.js';
  import { recordCompletion } from '../lib/game/progress.js';

  let caseIndex = 0;
  let chosen = null;
  let revealed = false;
  let correct = 0;
  let complete = false;

  $: c = M.cases[caseIndex];
  $: deltas = regionDeltas();

  function choose(option) {
    if (revealed) return;
    chosen = option;
    revealed = true;
    if (option === c.answer) correct += 1;
  }

  function next() {
    if (caseIndex + 1 >= M.cases.length) {
      complete = true;
      recordCompletion('region-grain');
      return;
    }
    caseIndex += 1;
    chosen = null;
    revealed = false;
  }

  function restart() {
    caseIndex = 0; chosen = null; revealed = false; correct = 0; complete = false;
  }
</script>

<section class="mission">
  <header>
    <div class="identity">
      <p class="eyebrow">{M.id} · {M.role} · {M.status}</p>
      <h1>{M.title}</h1>
      <p class="brief">{M.brief}</p>
    </div>
    <a class="console-link" href="?lab=sql">Check it in the data console →</a>
  </header>

  <main>
    <section class="evidence">
      <h2>The two reports</h2>
      <p class="caption">
        Both analysts were asked for sales by region for the quarter. Both wrote correct SQL.
      </p>

      <div class="reports">
        <article>
          <h3>Priya · joined through <code>district</code></h3>
          <pre>{M.queries.management}</pre>
        </article>
        <article>
          <h3>Marcus · joined through <code>county</code></h3>
          <pre>{M.queries.geographic}</pre>
        </article>
      </div>

      <div class="table-scroll">
        <table>
          <thead>
            <tr><th>Region</th><th class="n">Priya</th><th class="n">Marcus</th><th class="n">Difference</th></tr>
          </thead>
          <tbody>
            {#each deltas as row}
              <tr class:moved={row.delta !== 0}>
                <td>{row.name} <span class="id">{row.region}</span></td>
                <td class="n">{row.management.toLocaleString()}</td>
                <td class="n">{row.geographic.toLocaleString()}</td>
                <td class="n delta">{row.delta === 0 ? '—' : (row.delta > 0 ? '+' : '') + row.delta.toLocaleString()}</td>
              </tr>
            {/each}
          </tbody>
          <tfoot>
            <tr>
              <td>Total</td>
              <td class="n">{REGION_FIGURES.totalSales.toLocaleString()}</td>
              <td class="n">{REGION_FIGURES.totalSales.toLocaleString()}</td>
              <td class="n">—</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <p class="caption tail">The totals match. Only the split moves.</p>
    </section>

    <section class="work">
      {#if complete}
        <div class="done">
          <span class="seal">✓</span>
          <p class="eyebrow">COMPETENCY DEMONSTRATED</p>
          <h2>You asked what the column meant before you grouped by it.</h2>
          <p>{M.competency}</p>
          <p class="score">{correct} of {M.cases.length} first-time</p>

          <div class="culprits">
            {#each REGION_FIGURES.culprits as branch}
              <p>
                <b>{branch.name}</b> <span class="id">{branch.branch}</span>
                reports to <b>{branch.district}</b>, stands in <b>{branch.county}</b>,
                and moves <b>{branch.sales.toLocaleString()}</b> sales between the two reports.
              </p>
            {/each}
          </div>

          <a class="console-link solid" href="?lab=sql">Run both queries yourself →</a>
          <button on:click={restart}>Work it through again</button>
        </div>
      {:else}
        <p class="eyebrow">STEP {caseIndex + 1} OF {M.cases.length}</p>
        <h2>{c.brief}</h2>
        <p class="hint">{c.hint}</p>

        <div class="options" role="group" aria-label="Answers">
          {#each c.options as option}
            <button
              class:picked={chosen === option}
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
  .mission {
    min-height: 100vh; padding: 24px 18px 48px;
    background: var(--qx-bg); color: var(--qx-text, #25231f);
    font-family: var(--qx-font);
  }
  header {
    max-width: 1180px; margin: 0 auto 22px;
    display: flex; flex-wrap: wrap; gap: 14px 24px;
    align-items: flex-end; justify-content: space-between;
  }
  .eyebrow {
    margin: 0 0 6px; color: var(--qx-accent-text);
    font: 900 11.5px/1 var(--qx-font); letter-spacing: 0.11em;
  }
  h1 { margin: 0 0 8px; font: 800 30px/1.15 var(--qx-font); letter-spacing: -0.02em; }
  .brief { margin: 0; max-width: 46em; font: 650 15px/1.6 var(--qx-font); color: var(--qx-text-dim, #5c5648); }

  .console-link {
    display: inline-block; padding: 10px 16px; border: 2px solid #25231f;
    border-radius: 11px; background: transparent; color: #25231f;
    font: 900 13px/1.3 var(--qx-font); text-decoration: none; white-space: nowrap;
  }
  .console-link:hover { background: #25231f; color: #f1ede4; }
  .console-link:focus-visible { outline: 3px solid var(--qx-accent); outline-offset: 2px; }
  .console-link.solid { background: #25231f; color: #f1ede4; margin-top: 6px; }
  .console-link.solid:hover { background: #3a352c; }

  main {
    max-width: 1180px; margin: 0 auto;
    display: grid; gap: 20px; grid-template-columns: 1fr;
  }
  @media (min-width: 62rem) { main { grid-template-columns: 1.05fr 1fr; align-items: start; } }

  section.evidence, section.work {
    padding: 20px; border: 2px solid #ded6c6; border-radius: 14px;
    background: var(--qx-surface, #fff);
  }
  h2 { margin: 0 0 8px; font: 800 19px/1.3 var(--qx-font); letter-spacing: -0.01em; }
  h3 { margin: 0 0 6px; font: 750 13px/1.3 var(--qx-font); }
  .caption { margin: 0 0 14px; color: var(--qx-text-dim, #6b6152); font: 650 13px/1.6 var(--qx-font); }
  .caption.tail { margin: 10px 0 0; }

  .reports { display: grid; gap: 12px; margin-bottom: 16px; }
  @media (min-width: 40rem) { .reports { grid-template-columns: 1fr 1fr; } }
  pre {
    margin: 0; padding: 11px 12px; overflow-x: auto;
    background: #100e0a; color: #ece7dc; border-radius: 9px;
    font: 12px/1.6 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  }
  code { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 0.92em; }

  .table-scroll { overflow-x: auto; border: 1px solid #e4ddcd; border-radius: 10px; }
  table { border-collapse: collapse; width: 100%; font: 650 13.5px/1.5 var(--qx-font); }
  th, td { padding: 9px 12px; text-align: left; }
  .n { text-align: right; font-variant-numeric: tabular-nums; }
  thead th { background: #f4f0e7; font: 800 11.5px/1 var(--qx-font); letter-spacing: 0.07em; text-transform: uppercase; color: #6b6152; }
  tbody tr + tr td, tfoot td { border-top: 1px solid #ece7dc; }
  tbody tr.moved { background: #f7ede6; }
  .delta { font-weight: 800; }
  tbody tr.moved .delta { color: var(--qx-accent-text); }
  tfoot td { font-weight: 800; background: #faf8f3; }
  .id { color: #8d8474; font-size: 11.5px; }

  .hint { margin: 0 0 14px; color: var(--qx-text-dim, #6b6152); font: 650 13px/1.6 var(--qx-font); }

  .options { display: flex; flex-direction: column; gap: 8px; }
  .options button {
    width: 100%; padding: 13px 15px; text-align: left;
    border: 2px solid #ded6c6; border-radius: 11px; background: #fff;
    font: 650 14px/1.5 var(--qx-font); color: #25231f; cursor: pointer;
  }
  .options button:hover:not(:disabled) { border-color: #25231f; }
  .options button:disabled { cursor: default; }
  .options button.right { border-color: #3e9e2a; background: #eff4e8; }
  .options button.wrong { border-color: #b3402e; background: #f6e3df; }
  .options button:focus-visible { outline: 3px solid var(--qx-accent); outline-offset: 2px; }

  .why {
    margin-top: 14px; padding: 13px 15px; border-radius: 11px;
    background: #f6e3df; border: 1px solid #e5c3bb;
  }
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
  .score { color: var(--qx-text-dim, #6b6152); font: 700 13px var(--qx-font); }
  .culprits {
    margin: 14px 0; padding: 13px 15px; text-align: left;
    background: #f4f0e7; border-radius: 11px;
  }
  .culprits p { margin: 0 0 8px; font: 650 13px/1.6 var(--qx-font); }
  .culprits p:last-child { margin-bottom: 0; }

  footer {
    max-width: 1180px; margin: 18px auto 0;
    display: flex; flex-wrap: wrap; gap: 12px; justify-content: space-between;
    color: #6f8794; font: 650 12px/1.5 var(--qx-font);
  }
  footer a { color: inherit; }
</style>
