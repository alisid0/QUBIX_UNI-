<script>
  // Mission 018. Three defensible answers to one question, all different.
  //
  // The evidence panel deliberately shows the three numbers side by side before
  // the learner is asked anything, because the mission is not a puzzle about
  // finding them. It is about noticing that having three is normal, and that
  // choosing between them is the work.

  import { ZONE_PRICE_MISSION as M, ZONE_PRICE_FIGURES as F, competingAnswers }
    from '../lib/game/zone-price-mission.js';
  import { recordCompletion } from '../lib/game/progress.js';
  import SiteNav from '../lib/components/SiteNav.svelte';

  let caseIndex = 0;
  let chosen = null;
  let revealed = false;
  let correct = 0;
  let complete = false;

  $: c = M.cases[caseIndex];
  $: answers = competingAnswers();
  $: maxUnits = Math.max(...F.zones.map(z => z.units));

  function choose(option) {
    if (revealed) return;
    chosen = option;
    revealed = true;
    if (option === c.answer) correct += 1;
  }

  function next() {
    if (caseIndex + 1 >= M.cases.length) {
      complete = true;
      recordCompletion('zone-price');
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
  <!-- Without this the only way out of the mission was the console link below,
       which goes further in. -->
  <SiteNav current="play" subjects={false} />
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
      <h2>{F.productName} <span class="sku">{F.sku} · {F.unit}</span></h2>

      <div class="answers">
        {#each answers as a}
          <div>
            <span class="value">£{a.value.toFixed(2)}</span>
            <span class="label">{a.label}</span>
            <span class="note">{a.note}</span>
          </div>
        {/each}
      </div>

      <h3>What each zone charges</h3>
      <div class="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Zone</th><th class="n">Price</th><th class="n">Branches</th>
              <th class="n">Units sold</th><th class="bar-head">Share of volume</th>
            </tr>
          </thead>
          <tbody>
            {#each F.zones as z}
              <tr class:silent={z.units === 0}>
                <td>{z.name} <span class="sku">{z.zone}</span></td>
                <td class="n">£{z.price.toFixed(2)}</td>
                <td class="n">{z.branches}</td>
                <td class="n">{z.units}</td>
                <td class="bar-cell">
                  <span class="bar" style="width: {maxUnits ? (z.units / maxUnits) * 100 : 0}%"></span>
                  {#if z.units === 0}<em>none sold</em>{/if}
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
      <p class="caption">
        {F.unitsSold} units sold in the window, £{F.revenue.toFixed(2)} of revenue.
        The Value zone lists a price and sold none of it.
      </p>
    </section>

    <section class="work">
      {#if complete}
        <div class="done">
          <span class="seal">✓</span>
          <p class="eyebrow">COMPETENCY DEMONSTRATED</p>
          <h2>You made the number say which question it answers.</h2>
          <p>{M.competency}</p>
          <p class="score">{correct} of {M.cases.length} first-time</p>
          <a class="console-link solid" href="?lab=sql">Price it yourself →</a>
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
  .mission {
    min-height: 100vh; padding: 24px 18px 48px;
    background: var(--qx-bg); color: #25231f; font-family: var(--qx-font);
  }
  header {
    max-width: 1180px; margin: 0 auto 22px;
    display: flex; flex-wrap: wrap; gap: 14px 24px;
    align-items: flex-end; justify-content: space-between;
  }
  .eyebrow { margin: 0 0 6px; color: var(--qx-accent-text); font: 900 11.5px/1 var(--qx-font); letter-spacing: 0.11em; }
  h1 { margin: 0 0 8px; font: 800 30px/1.15 var(--qx-font); letter-spacing: -0.02em; }
  .brief { margin: 0; max-width: 44em; font: 650 15px/1.6 var(--qx-font); color: #5c5648; }

  .console-link {
    display: inline-block; padding: 10px 16px; border: 2px solid #25231f;
    border-radius: 11px; color: #25231f; font: 900 13px/1.3 var(--qx-font);
    text-decoration: none; white-space: nowrap;
  }
  .console-link:hover { background: #25231f; color: #f1ede4; }
  .console-link:focus-visible { outline: 3px solid var(--qx-accent); outline-offset: 2px; }
  .console-link.solid { background: #25231f; color: #f1ede4; margin-top: 6px; }

  main { max-width: 1180px; margin: 0 auto; display: grid; gap: 20px; }
  @media (min-width: 62rem) { main { grid-template-columns: 1.05fr 1fr; align-items: start; } }

  section.evidence, section.work {
    padding: 20px; border: 2px solid #ded6c6; border-radius: 14px; background: #fff;
  }
  h2 { margin: 0 0 12px; font: 800 19px/1.3 var(--qx-font); letter-spacing: -0.01em; }
  h3 { margin: 18px 0 8px; font: 750 13px/1.3 var(--qx-font); }
  .sku { color: #8d8474; font: 650 11.5px var(--qx-font); }

  .answers { display: grid; gap: 10px; }
  @media (min-width: 34rem) { .answers { grid-template-columns: repeat(3, 1fr); } }
  .answers > div {
    padding: 12px 13px; border: 1px solid #e4ddcd; border-radius: 11px; background: #faf8f3;
    display: flex; flex-direction: column; gap: 3px;
  }
  .value { font: 800 22px/1.1 var(--qx-font); font-variant-numeric: tabular-nums; }
  .answers .label { font: 700 12px/1.4 var(--qx-font); }
  .answers .note { font: 650 11.5px/1.4 var(--qx-font); color: #8d8474; }

  .table-scroll { overflow-x: auto; border: 1px solid #e4ddcd; border-radius: 10px; }
  table { border-collapse: collapse; width: 100%; font: 650 13.5px/1.5 var(--qx-font); }
  th, td { padding: 9px 12px; text-align: left; }
  .n { text-align: right; font-variant-numeric: tabular-nums; }
  thead th {
    background: #f4f0e7; color: #6b6152;
    font: 800 11.5px/1 var(--qx-font); letter-spacing: 0.07em; text-transform: uppercase;
  }
  .bar-head { width: 34%; }
  tbody tr + tr td { border-top: 1px solid #ece7dc; }
  tbody tr.silent { background: #f7ede6; }
  .bar-cell { position: relative; }
  .bar { display: inline-block; height: 9px; border-radius: 5px; background: var(--qx-accent); min-width: 0; vertical-align: middle; }
  .bar-cell em { font: 650 11.5px var(--qx-font); font-style: normal; color: var(--qx-accent-text); }
  .caption { margin: 10px 0 0; color: #6b6152; font: 650 12.5px/1.6 var(--qx-font); }

  .hint { margin: 0 0 14px; color: #6b6152; font: 650 13px/1.6 var(--qx-font); }
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
    max-width: 1180px; margin: 18px auto 0;
    display: flex; flex-wrap: wrap; gap: 12px; justify-content: space-between;
    color: #6f8794; font: 650 12px/1.5 var(--qx-font);
  }
  footer a { color: inherit; }
</style>
