<script>
  import { theme } from '../lib/stores/theme.js';
  import { bb1, sources, selections, finalised } from '../factory/bb1-options.js';

  const slots = [['readings', 'reading'], ['interactions', 'interaction'], ['exercises', 'exercise']];
  const settled = code => selections[code] || finalised[code];

  // What is still open, so the remaining decisions are visible at a glance.
  $: outstanding = bb1.sections.map(section => ({
    code: section.code,
    name: section.name,
    missing: slots
      .filter(([key]) => !section[key].some(v => settled(v.code)))
      .map(([, label]) => label)
  })).filter(s => s.missing.length);

  // One live control value per section, so every interaction variant in a
  // section is driven by the same number and can be compared side by side.
  let values = bb1.sections.map(() => 2);

  // Sorter state for S1-I2: each chip cycles pool -> fixed -> varies -> pool.
  const bins = ['unfiled', 'fixed', 'can vary'];
  let sorted = { '2': 0, x: 0, '7': 0, y: 0 };

  // Exercise preview state, keyed by exercise code.
  let picked = {};

  const squareSize = v => 74 + (v - 1.5) * 39; // 1.5 -> 74px, 3.5 -> 152px, no cap
  const fmt = v => Number(v).toFixed(1);

  function cycle(chip) {
    sorted = { ...sorted, [chip]: (sorted[chip] + 1) % 3 };
  }

  function choose(exCode, option) {
    picked = { ...picked, [exCode]: option.label };
  }
</script>

<div class="factory-shell">
  <header class="factory-header">
    <div class="identity">
      <span class="mark">F</span>
      <span class="stack">
        <b>QUBIX UNIVERSITY</b>
        <small>Factory · authoring options</small>
      </span>
    </div>
    <div class="header-actions">
      <span class="pill">AI_DRAFT · NOT SELECTED</span>
      <button class="icon-btn" aria-label="Toggle colour theme" on:click={() => theme.toggle()}>
        {#if $theme === 'dark'}◑{:else}◐{/if}
      </button>
    </div>
  </header>

  <main class="factory-body">
    <section class="intro">
      <span class="micro">{bb1.id}</span>
      <h1>{bb1.title}</h1>
      <p class="lede">
        Every variant below is a candidate. Touch the interactions, play the
        exercises, then send me the codes you want kept. Nothing here is live in
        the Viewer.
      </p>
      <div class="fork-note">
        <div><b>Fork</b><span>{bb1.fork}</span></div>
        <div><b>Structure</b><span>{bb1.structure}</span></div>
      </div>
    </section>

    {#each bb1.sections as section, si}
      <section class="section-block">
        <div class="section-head">
          <span class="section-code">{section.code}</span>
          <h2>{section.name}</h2>
        </div>

        <div class="sources">
          {#each section.sources as key}
            <blockquote>
              <p>{sources[key].quote}</p>
              <cite>{key} · {sources[key].ref}</cite>
            </blockquote>
          {/each}
        </div>

        <h3>Reading</h3>
        <div class="variant-grid">
          {#each section.readings as reading}
            <article class="variant" class:selected={selections[reading.code]} class:finalised={finalised[reading.code]}>
              <span class="code">{reading.code}{#if selections[reading.code]} · SELECTED{:else if finalised[reading.code]} · FINALISED{/if}</span>
              <p class="reading-text">{reading.text}</p>
              {#if finalised[reading.code]}<p class="why">{finalised[reading.code]}</p>{/if}
            </article>
          {/each}
        </div>

        <h3>Interaction <em>— drag the sliders, these are live</em></h3>
        <div class="variant-grid">
          {#each section.interactions as interaction}
            <article class="variant" class:selected={selections[interaction.code]} class:finalised={finalised[interaction.code]}>
              <span class="code">{interaction.code}{#if selections[interaction.code]} · SELECTED{:else if finalised[interaction.code]} · FINALISED{/if}</span>
              <div class="stage">
                {#if interaction.kind === 'figures-letters'}
                  <div class="rows">
                    <div class="row"><small>FIGURES</small>{#each ['1', '2', '3', '7'] as f}<span class="chip fig">{f}</span>{/each}</div>
                    <div class="row"><small>LETTERS</small>{#each ['x', 'y', 'z'] as l}<span class="chip let">{l}</span>{/each}</div>
                    <p class="stage-note">A figure shows its number. A letter shows nothing until a value is assigned.</p>
                  </div>

                {:else if interaction.kind === 'sorter'}
                  <div class="rows">
                    <p class="stage-note">Click a chip to file it.</p>
                    <div class="row wrap">
                      {#each Object.keys(sorted) as chip}
                        <button class="chip sortable" class:fixed={sorted[chip] === 1} class:varies={sorted[chip] === 2} on:click={() => cycle(chip)}>
                          {chip}<em>{bins[sorted[chip]]}</em>
                        </button>
                      {/each}
                    </div>
                  </div>

                {:else if interaction.kind === 'value-card'}
                  <div class="rows centre">
                    <div class="value-card">x = {fmt(values[si])}</div>
                  </div>

                {:else if interaction.kind === 'symbol-value-pair'}
                  <div class="rows centre">
                    <div class="pair">
                      <span class="card sym">x</span>
                      <span class="joiner"></span>
                      <span class="card val">{fmt(values[si])}</span>
                    </div>
                  </div>

                {:else if interaction.kind === 'assign-slider'}
                  <div class="rows centre">
                    <div class="ghost-wrap">
                      <div class="value-card ghost">x = 2.0</div>
                      <div class="value-card">x = {fmt(values[si])}</div>
                    </div>
                    <p class="stage-note">The faded card is the value you replaced.</p>
                  </div>

                {:else if interaction.kind === 'square-edge' || interaction.kind === 'square-ghost'}
                  <div class="rows centre">
                    <div class="square-figure">
                      {#if interaction.kind === 'square-ghost'}
                        <div class="square ghost-square" style={`width:${squareSize(2)}px;height:${squareSize(2)}px`}></div>
                      {/if}
                      <div class="square" style={`width:${squareSize(values[si])}px;height:${squareSize(values[si])}px`}></div>
                      <span class="edge-label" style={`width:${squareSize(values[si])}px`}>x</span>
                    </div>
                  </div>
                {/if}

                <label class="range-row">
                  <span>1.5</span>
                  <input type="range" min="1.5" max="3.5" step="0.1" bind:value={values[si]} aria-label={`Assign x for ${interaction.code}`}/>
                  <span>3.5</span>
                </label>
              </div>
              <p class="note">{interaction.note}</p>
              {#if finalised[interaction.code]}<p class="why">{finalised[interaction.code]}</p>{/if}
            </article>
          {/each}
        </div>

        <h3>Exercise <em>— clickable, answers reveal</em></h3>
        <div class="variant-grid">
          {#each section.exercises as ex}
            <article class="variant" class:selected={selections[ex.code]} class:finalised={finalised[ex.code]}>
              <span class="code">{ex.code}{#if selections[ex.code]} · SELECTED{:else if finalised[ex.code]} · FINALISED{/if}</span>
              <p class="prompt">{ex.prompt}</p>
              {#if ex.kind === 'choice'}
                <div class="options">
                  {#each ex.options as option}
                    <button
                      class:correct={picked[ex.code] && option.correct}
                      class:wrong={picked[ex.code] === option.label && !option.correct}
                      on:click={() => choose(ex.code, option)}>
                      {option.label}
                    </button>
                  {/each}
                </div>
                {#if picked[ex.code]}
                  {#each ex.options.filter(o => o.label === picked[ex.code] && o.feedback) as o}
                    <p class="fb">{o.feedback}</p>
                  {/each}
                {/if}
              {:else}
                <p class="kind-note">
                  Slider task · target x = {ex.target}. Answered with the section's own control,
                  currently at {fmt(values[si])}.
                  <b class:hit={Math.abs(values[si] - ex.target) <= (ex.tolerance ?? 0.05)}>
                    {Math.abs(values[si] - ex.target) <= (ex.tolerance ?? 0.05) ? 'satisfied' : 'not yet'}
                  </b>
                </p>
              {/if}
            </article>
          {/each}
        </div>
      </section>
    {/each}

    <section class="closing">
      <h2>Still open</h2>
      {#if outstanding.length}
        <ul class="outstanding">
          {#each outstanding as row}
            <li><b>{row.code}</b> {row.name}<span>{row.missing.join(', ')}</span></li>
          {/each}
        </ul>
      {:else}
        <p>Every slot is filled. BB1 is ready to be written into its record.</p>
      {/if}

      <h2>Sending your selection</h2>
      <p>
        Reply with one reading, one interaction and one exercise per section, for
        example <code>S1-A, S1-I1, S1-X2, S2-B, S2-I1, S2-X1 …</code>. Anything you
        leave out I will choose and record as a finalised conclusion. Anything you
        want reworded stays here rather than graduating to the record.
      </p>
    </section>
  </main>
</div>

<style>
  .factory-shell { height: 100%; overflow-y: auto; overscroll-behavior: contain; -webkit-overflow-scrolling: touch; background: var(--qx-bg); color: var(--qx-text); font-family: var(--qx-font); }
  .factory-header { position: sticky; top: 0; z-index: 10; display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 13px clamp(16px, 4vw, 48px); border-bottom: 1px solid var(--qx-border); background: color-mix(in srgb, var(--qx-bg) 88%, transparent); backdrop-filter: blur(14px); }
  .identity { display: flex; align-items: center; gap: 11px; }
  .mark { width: 36px; height: 36px; border-radius: 50%; border: 1px solid var(--qx-accent); display: grid; place-items: center; color: var(--qx-accent-text); font: 800 18px/1 Georgia, serif; }
  .stack { display: flex; flex-direction: column; gap: 2px; }
  .stack b { font-size: 10px; letter-spacing: .17em; }
  .stack small { color: var(--qx-text-dim); font-size: 11px; }
  .header-actions { display: flex; align-items: center; gap: 10px; }
  .pill { border: 1px solid var(--qx-border-2); border-radius: 999px; padding: 5px 11px; font-size: 9px; font-weight: 900; letter-spacing: .12em; color: var(--qx-text-dim); }
  .icon-btn { width: 34px; height: 34px; border-radius: 50%; border: 1px solid var(--qx-border-2); background: var(--qx-surface-2); color: var(--qx-text); cursor: pointer; }

  .factory-body { max-width: 1180px; margin: 0 auto; padding: 26px clamp(16px, 4vw, 48px) 80px; display: flex; flex-direction: column; gap: 34px; }
  .micro { color: var(--qx-accent-text); font-size: 10px; letter-spacing: .14em; font-weight: 900; }
  .intro h1 { font-size: clamp(28px, 4vw, 42px); margin: 6px 0 10px; }
  .lede { color: var(--qx-text-2); font-size: 16px; line-height: 1.6; max-width: 62ch; }
  .fork-note { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 16px; }
  .fork-note div { flex: 1 1 260px; border: 1px solid var(--qx-border); border-radius: 12px; padding: 11px 13px; background: var(--qx-surface-2); display: flex; flex-direction: column; gap: 3px; }
  .fork-note b { font-size: 9px; letter-spacing: .13em; color: var(--qx-accent-text); }
  .fork-note span { font-size: 13px; color: var(--qx-text-2); }

  .section-block { border-top: 1px solid var(--qx-border); padding-top: 22px; display: flex; flex-direction: column; gap: 14px; }
  .section-head { display: flex; align-items: baseline; gap: 11px; }
  .section-code { color: var(--qx-accent-text); font-size: 11px; font-weight: 900; letter-spacing: .1em; }
  .section-head h2 { font-size: 23px; }
  h3 { font-size: 11px; letter-spacing: .13em; text-transform: uppercase; color: var(--qx-text-dim); margin-top: 6px; }
  h3 em { text-transform: none; letter-spacing: 0; font-style: normal; color: var(--qx-text-faint); font-weight: 600; }

  .sources blockquote { border-left: 2px solid var(--qx-accent); padding: 2px 0 2px 13px; margin-bottom: 9px; }
  .sources p { color: var(--qx-text-2); font-size: 14px; line-height: 1.55; font-style: italic; }
  .sources cite { display: block; margin-top: 5px; font-size: 10px; color: var(--qx-text-faint); font-style: normal; font-weight: 700; }

  .variant-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(290px, 1fr)); gap: 12px; }
  .variant { border: 1px solid var(--qx-border); border-radius: 15px; background: var(--qx-surface); padding: 13px; display: flex; flex-direction: column; gap: 9px; }
  .code { align-self: flex-start; border: 1px solid var(--qx-border-2); border-radius: 7px; padding: 3px 8px; font-size: 10px; font-weight: 900; letter-spacing: .07em; color: var(--qx-accent-text); }
  .reading-text { color: var(--qx-text-2); font-size: 15px; line-height: 1.55; }
  .note { color: var(--qx-text-faint); font-size: 11.5px; line-height: 1.45; }

  .stage { border: 1px solid var(--qx-border); border-radius: 13px; background: var(--qx-surface-2); padding: 13px; display: flex; flex-direction: column; gap: 11px; min-height: 210px; justify-content: center; }
  .rows { display: flex; flex-direction: column; gap: 9px; }
  .rows.centre { align-items: center; justify-content: center; flex: 1; }
  .row { display: flex; align-items: center; gap: 7px; }
  .row.wrap { flex-wrap: wrap; }
  .row small { font-size: 9px; letter-spacing: .1em; color: var(--qx-text-faint); width: 56px; font-weight: 900; }
  .stage-note { font-size: 11px; color: var(--qx-text-faint); line-height: 1.4; }

  .chip { min-width: 34px; height: 34px; padding: 0 9px; border-radius: 9px; display: inline-flex; align-items: center; justify-content: center; font-weight: 900; font-size: 15px; border: 1px solid var(--qx-border-2); background: var(--qx-surface); }
  .chip.let { font-style: italic; font-family: Georgia, serif; color: var(--qx-accent-text); }
  .chip.sortable { flex-direction: column; height: auto; padding: 6px 11px; gap: 2px; cursor: pointer; color: var(--qx-text); }
  .chip.sortable em { font-style: normal; font-size: 9px; letter-spacing: .08em; color: var(--qx-text-faint); font-weight: 700; }
  .chip.sortable.fixed { border-color: var(--qx-text-dim); }
  .chip.sortable.varies { border-color: var(--qx-accent); background: var(--qx-accent-soft); }

  .value-card { border: 2px solid var(--qx-accent); background: var(--qx-accent-soft); color: var(--qx-accent-text); border-radius: 12px; padding: 15px 22px; font-size: 25px; font-weight: 900; }
  .value-card.ghost { border-style: dashed; border-color: var(--qx-border-2); background: transparent; color: var(--qx-text-faint); font-size: 17px; padding: 9px 15px; }
  .ghost-wrap { display: flex; align-items: center; gap: 11px; }
  .pair { display: flex; align-items: center; gap: 9px; }
  .card { border: 1px solid var(--qx-border-2); border-radius: 11px; padding: 13px 19px; font-size: 22px; font-weight: 900; background: var(--qx-surface); }
  .card.sym { font-family: Georgia, serif; font-style: italic; color: var(--qx-accent-text); }
  .joiner { width: 26px; height: 1px; background: var(--qx-border-2); }

  .square-figure { display: flex; flex-direction: column; align-items: center; gap: 8px; position: relative; }
  .square { border: 3px solid var(--qx-accent); background: var(--qx-accent-soft); border-radius: 5px; transition: width .12s, height .12s; }
  .ghost-square { position: absolute; top: 0; border-style: dashed; border-color: var(--qx-border-2); background: transparent; }
  .edge-label { display: flex; align-items: center; justify-content: center; gap: 9px; font: italic 800 24px/1 Georgia, serif; color: var(--qx-accent-text); transition: width .12s; }
  .edge-label::before, .edge-label::after { content: ''; flex: 1; height: 1px; background: var(--qx-border-2); }

  .range-row { display: grid; grid-template-columns: 30px 1fr 30px; align-items: center; gap: 8px; font-size: 10px; color: var(--qx-text-faint); font-weight: 800; }
  .range-row span:last-child { text-align: right; }
  input[type='range'] { width: 100%; accent-color: var(--qx-accent); cursor: pointer; }

  .prompt { font-size: 15px; font-weight: 800; line-height: 1.45; }
  .options { display: grid; gap: 7px; }
  .options button { min-height: 42px; border-radius: 11px; border: 1px solid var(--qx-border-2); background: var(--qx-surface-2); color: var(--qx-text); font-size: 14px; font-weight: 800; cursor: pointer; padding: 7px 12px; text-align: left; }
  .options button.correct { border-color: var(--qx-green); background: var(--qx-green-soft); color: var(--qx-green-text); }
  .options button.wrong { border-color: var(--qx-danger); }
  .fb { font-size: 12px; line-height: 1.45; color: var(--qx-danger-text); background: var(--qx-danger-soft); border-radius: 9px; padding: 9px 11px; }
  .kind-note { font-size: 12.5px; color: var(--qx-text-dim); line-height: 1.5; }
  .kind-note b { color: var(--qx-text-dim); }
  .kind-note b.hit { color: var(--qx-green-text); }

  .variant.selected { border-color: var(--qx-green); background: var(--qx-green-soft); }
  .variant.selected .code { border-color: var(--qx-green); color: var(--qx-green-text); }
  .variant.finalised { border-color: var(--qx-accent); border-style: dashed; }
  .variant.finalised .code { border-color: var(--qx-accent); border-style: dashed; }
  .why { font-size: 11.5px; line-height: 1.45; color: var(--qx-accent-text); border-top: 1px dashed var(--qx-border-2); padding-top: 7px; }
  .outstanding { list-style: none; display: flex; flex-direction: column; gap: 6px; margin-bottom: 22px; }
  .outstanding li { display: flex; align-items: baseline; gap: 9px; font-size: 13.5px; color: var(--qx-text-2); border: 1px solid var(--qx-border); border-radius: 10px; padding: 9px 12px; background: var(--qx-surface); }
  .outstanding b { color: var(--qx-accent-text); font-size: 11px; letter-spacing: .08em; }
  .outstanding span { margin-left: auto; color: var(--qx-text-faint); font-size: 11px; font-weight: 800; }

  .closing { border-top: 1px solid var(--qx-border); padding-top: 20px; }
  .closing h2 { font-size: 18px; margin-bottom: 8px; }
  .closing p { color: var(--qx-text-2); font-size: 14px; line-height: 1.6; max-width: 70ch; }
  code { background: var(--qx-surface-2); border: 1px solid var(--qx-border); border-radius: 6px; padding: 2px 6px; font-size: 12.5px; }

  @media (max-width: 560px) {
    .factory-body { gap: 26px; }
    .variant-grid { grid-template-columns: 1fr; }
  }
</style>
