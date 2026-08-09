<script>
  import { theme } from '../lib/stores/theme.js';
  import { registry, entryFor, sources } from '../factory/index.js';

  const slots = [['readings', 'reading'], ['interactions', 'interaction'], ['exercises', 'exercise']];

  let active = new URLSearchParams(window.location.search).get('bb') || '1';
  $: entry = entryFor(active);
  $: bb1 = entry.bb;
  $: selections = entry.selections;
  $: finalised = entry.finalised;

  function show(key) {
    active = key;
    const url = new URL(window.location.href);
    url.searchParams.set('bb', key);
    history.replaceState({}, '', url);
    values = bb1.sections.map(() => 2);
  }

  // What is still open, so the remaining decisions are visible at a glance.
  $: outstanding = bb1.sections.map(section => ({
    code: section.code,
    name: section.name,
    missing: slots
      .filter(([key]) => !section[key].some(v => selections[v.code] || finalised[v.code]))
      .map(([, label]) => label)
  })).filter(s => s.missing.length);

  // One live control value per section, so every interaction variant in a
  // section is driven by the same number and can be compared side by side.
  let values = entryFor(new URLSearchParams(window.location.search).get('bb') || '1').bb.sections.map(() => 2);

  // Sorter state for S1-I2: each chip cycles pool -> fixed -> varies -> pool.
  const bins = ['unfiled', 'fixed', 'can vary'];
  let sorted = { '2': 0, x: 0, '7': 0, y: 0 };

  // Exercise preview state, keyed by exercise code.
  let picked = {};
  let stepped = {};   // stepper current values
  let placed = {};    // match: item label -> bin
  let held = {};      // match/workshop: what is currently picked up
  let ordered = {};   // order: current arrangement
  let bench = { assigned: {}, held: null };

  function stepBy(ex, delta) {
    const cur = stepped[ex.code] ?? ex.start ?? ex.min;
    const next = Math.min(ex.max, Math.max(ex.min, Number((cur + delta * ex.step).toFixed(4))));
    stepped = { ...stepped, [ex.code]: next };
  }
  const stepValue = (ex, s) => s[ex.code] ?? ex.start ?? ex.min;
  const stepHit = (ex, s) => Math.abs(stepValue(ex, s) - ex.target) < ex.step / 2;

  // Tap to pick up, tap to place. Works with a mouse and with a thumb, which
  // HTML5 drag-and-drop does not.
  function takeItem(code, label) {
    held = { ...held, [code]: held[code] === label ? null : label };
  }
  function placeItem(code, bin) {
    const label = held[code];
    if (!label) return;
    placed = { ...placed, [code]: { ...(placed[code] || {}), [label]: bin } };
    held = { ...held, [code]: null };
  }
  const matchDone = (ex, p) => ex.items.every(i => (p[ex.code] || {})[i.label] === i.bin);

  function orderList(ex) {
    return ordered[ex.code] || ex.items.map((_, i) => i);
  }
  function moveItem(ex, from, dir) {
    const list = [...orderList(ex)];
    const to = from + dir;
    if (to < 0 || to >= list.length) return;
    [list[from], list[to]] = [list[to], list[from]];
    ordered = { ...ordered, [ex.code]: list };
  }
  const orderDone = (ex, o) => (o[ex.code] || ex.items.map((_, i) => i)).every((v, i) => v === i);

  function benchTake(v) {
    bench = { ...bench, held: bench.held === v ? null : v };
  }
  function benchDrop(letter) {
    if (bench.held === null) return;
    bench = { assigned: { ...bench.assigned, [letter]: bench.held }, held: null };
  }
  function benchClear(letter) {
    const next = { ...bench.assigned };
    delete next[letter];
    bench = { ...bench, assigned: next };
  }
  // Change bench (BB2 W1) and delta builder (BB2 W2).
  let cb = { oldV: 2, newV: 2 };
  let db = { letter: null };
  const cbDelta = s => Number((s.newV - s.oldV).toFixed(2));
  function cbStep(which, delta) {
    const next = Number(Math.min(4, Math.max(0, cb[which] + delta * 0.1)).toFixed(2));
    cb = { ...cb, [which]: next };
  }

  // Goals are checked per workshop kind rather than by a global id lookup, so a
  // new workshop cannot silently inherit another one's success conditions.
  // The three states are passed in rather than read from scope: Svelte tracks
  // dependencies at the call site, so reading them inside the body would leave
  // the goal list frozen.
  function goalMet(kind, id, bench, cb, db) {
    if (kind === 'assignment-bench') {
      const a = bench.assigned;
      if (id === 'g1') return a.x === 7;
      if (id === 'g2') return a.y !== undefined && a.x !== undefined && a.y !== a.x;
      if (id === 'g3') return a.z === undefined;
    }
    if (kind === 'change-bench') {
      const d = cbDelta(cb);
      if (id === 'b1') return Math.abs(d - 0.5) < 0.001;
      if (id === 'b2') return d < -0.001;
      if (id === 'b3') return Math.abs(d) < 0.001 && (cb.oldV !== 2 || cb.newV !== 2);
    }
    if (kind === 'delta-builder') {
      if (id === 'd1') return db.letter === 't';
      if (id === 'd2') return db.letter === 'y';
    }
    return false;
  }

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
    <nav class="bb-switch" aria-label="Choose a bite-sized board">
      {#each registry as item}
        <button class:on={item.key === active} on:click={() => show(item.key)}>
          {item.label}<em>{item.bb.title}</em>
        </button>
      {/each}
    </nav>

    <section class="intro">
      <span class="micro">{bb1.id}</span>
      <h1>{bb1.title}</h1>
      <p class="lede">
        Every variant below is a candidate. Touch the interactions, play the
        exercises, then send me the codes you want kept. Nothing here is live in
        the Viewer.
      </p>
      {#if entry.gated}
        <p class="gate">Gated · {entry.gated} These are drafts for later selection. They must not reach a learner while the gate stands.</p>
      {/if}

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
              <p class="reading-text" class:verbatim={reading.verbatim}>{reading.text}</p>
              {#if reading.verbatim}
                <p class="verbatim-tag">Author's own words, unaltered · {sources[reading.verbatim].ref}</p>
              {/if}
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

                {:else if interaction.kind === 'number-line'}
                  <div class="rows centre">
                    <svg viewBox="0 0 320 110" class="mini-svg" role="img" aria-label={`Number line, new value ${fmt(values[si])}`}>
                      <path class="ax" d="M28 64H292"/>
                      {#each [1.5, 2, 2.5, 3, 3.5] as tick}
                        <path class="ax" d={`M${28 + (tick - 1.5) * 132} 58v12`}/>
                        <text x={28 + (tick - 1.5) * 132} y="88">{tick}</text>
                      {/each}
                      <path class="gap" d={`M160 40 H${28 + (values[si] - 1.5) * 132}`}/>
                      <circle class="old" cx="160" cy="64" r="5"/>
                      <circle class="new" cx={28 + (values[si] - 1.5) * 132} cy="64" r="7"/>
                    </svg>
                  </div>

                {:else if interaction.kind === 'two-bars'}
                  <div class="rows">
                    <div class="bar-row"><small>OLD</small><span class="bar" style="width:96px"></span><b>2.0</b></div>
                    <div class="bar-row"><small>NEW</small><span class="bar" style={`width:${values[si] * 48}px`}></span><b>{fmt(values[si])}</b></div>
                    <div class="bar-row"><small>CHANGE</small><span class="bar diff" style={`width:${Math.abs(values[si] - 2) * 48}px`}></span><b>{(values[si] - 2).toFixed(1).replace('-', '−')}</b></div>
                  </div>

                {:else if interaction.kind === 'glyph-card'}
                  <div class="rows centre">
                    <div class="glyph">Δ<em>the change in</em></div>
                  </div>

                {:else if interaction.kind === 'two-labels'}
                  <div class="rows centre">
                    <div class="square-figure">
                      <div class="square area" style={`width:${squareSize(values[si])}px;height:${squareSize(values[si])}px`}>
                        <span>y = {(values[si] * values[si]).toFixed(2)}</span>
                      </div>
                      <span class="edge-label sm" style={`width:${squareSize(values[si])}px`}>x = {fmt(values[si])}</span>
                    </div>
                  </div>

                {:else if interaction.kind === 'two-cards'}
                  <div class="rows centre">
                    <div class="pair">
                      <span class="card sym">x = {fmt(values[si])}</span>
                      <span class="card sym">y = {(values[si] * values[si]).toFixed(2)}</span>
                    </div>
                  </div>

                {:else if interaction.kind === 'locked-pair'}
                  <div class="rows centre">
                    <div class="pair">
                      <span class="card sym">x = {fmt(values[si])}<em>assign</em></span>
                      <span class="card val locked">y = {(values[si] * values[si]).toFixed(2)}<em>follows</em></span>
                    </div>
                  </div>

                {:else if interaction.kind === 'machine'}
                  <div class="rows centre">
                    <div class="pair">
                      <span class="card sym">{fmt(values[si])}</span>
                      <span class="machine-box">× itself</span>
                      <span class="card val">{(values[si] * values[si]).toFixed(2)}</span>
                    </div>
                  </div>

                {:else if interaction.kind === 'two-squares'}
                  <div class="rows centre">
                    <div class="pair">
                      <span class="square area small" style="width:64px;height:64px"><span>4</span></span>
                      <span class="square area" style={`width:${squareSize(values[si])}px;height:${squareSize(values[si])}px`}>
                        <span>{(values[si] * values[si]).toFixed(2)}</span>
                      </span>
                    </div>
                  </div>

                {:else if interaction.kind === 'power-table'}
                  <div class="rows">
                    {#each [2, 3, 4, 5] as n, ni}
                      <div class="ladder-row" class:on={Math.round((values[si] - 1.5) / 0.667) === ni}>
                        <small>y = x{['²', '³', '⁴', '⁵'][ni]}</small>
                        <b>dy/dx = {n}x{['', '²', '³', '⁴'][ni]}</b>
                      </div>
                    {/each}
                  </div>

                {:else if interaction.kind === 'speed-track'}
                  <div class="rows">
                    <svg viewBox="0 0 280 70" class="mini-svg" role="img" aria-label={`Train at time ${fmt(values[si])}`}>
                      <path class="ax" d="M14 52H266"/>
                      <rect class="train" x={14 + (values[si] - 1.5) * 118} y="30" width="26" height="15" rx="3"/>
                    </svg>
                    <div class="bar-row"><small>TIME t</small><b>{fmt(values[si] - 1.5)} s</b></div>
                    <div class="bar-row"><small>DISTANCE s</small><b>{((values[si] - 1.5) * 10).toFixed(1)} m</b></div>
                  </div>

                {:else if interaction.kind === 'ratio-plain'}
                  <div class="rows centre">
                    <div class="ratio">
                      <div class="frac">
                        <span><small>AREA CHANGE</small><b>{(values[si] * values[si] - 4).toFixed(2)}</b></span>
                        <i></i>
                        <span><small>SIDE CHANGE</small><b>{(values[si] - 2).toFixed(2)}</b></span>
                      </div>
                      <span class="eq">=</span>
                      <div class="ratio-out">
                        <b>{values[si] > 2.001 ? (2 + values[si]).toFixed(2) : '—'}</b>
                        <small>cm² per cm</small>
                      </div>
                    </div>
                  </div>

                {:else if interaction.kind === 'rate-formula'}
                  <div class="rows centre">
                    <div class="formula">
                      <span>Δy/Δx</span><i>=</i><span>2x + Δx</span><i>=</i>
                      <span>4 + {(values[si] - 2).toFixed(2)}</span><i>=</i>
                      <b>{values[si] > 2.001 ? (2 + values[si]).toFixed(2) : '4.00'}</b>
                    </div>
                    <p class="stage-note">2x depends only on where you stand. Δx is the gap itself.</p>
                  </div>

                {:else if interaction.kind === 'rate-ladder'}
                  <div class="rows">
                    {#each [1, 0.5, 0.1, 0.01, 0.001] as gap}
                      <div class="ladder-row" class:on={Math.abs((values[si] - 1.5) / 0.5 - [1, 0.5, 0.1, 0.01, 0.001].indexOf(gap)) < 0.5}>
                        <small>Δx = {gap}</small><b>rate {(4 + gap).toFixed(3)}</b>
                      </div>
                    {/each}
                  </div>

                {:else if interaction.kind === 'curve-secant'}
                  <div class="rows centre">
                    <svg viewBox="0 0 260 170" class="mini-svg" role="img" aria-label="Parabola with a line through two points">
                      <path class="ax" d="M30 148H244M30 148V18"/>
                      <polyline class="curve" points={Array.from({ length: 49 }, (_, i) => { const x = i / 16; return `${30 + x * 62},${148 - x * x * 9}`; }).join(' ')}/>
                      {#key values[si]}
                        <path class="sec" d={`M60 ${(148 - 36 + (4 + (values[si] - 2)) * 9 * 0.8).toFixed(1)} L220 ${(148 - 36 - (4 + (values[si] - 2)) * 9 * 1.7).toFixed(1)}`}/>
                      {/key}
                      <circle class="old" cx="154" cy="112" r="5"/>
                      <circle class="new" cx={154 + (values[si] - 2) * 62} cy={148 - (2 + (values[si] - 2)) * (2 + (values[si] - 2)) * 9} r="6"/>
                    </svg>
                  </div>

                {:else if interaction.kind === 'growth-decomposition'}
                  <div class="rows centre">
                    <svg viewBox="0 0 180 180" class="mini-svg decomp" role="img" aria-label="Square of side x growing by a bit, showing two rectangles and a corner square">
                      <rect class="grow" x="20" y={180 - 20 - (values[si] * 44)} width={values[si] * 44} height={values[si] * 44}/>
                      <rect class="base" x="20" y="72" width="88" height="88"/>
                      <text x="60" y="122">x²</text>
                      <text x={20 + 88 + (values[si] * 44 - 88) / 2} y="122">x·dx</text>
                      <text x="60" y={180 - 20 - (values[si] * 44) + (values[si] * 44 - 88) / 2 + 4}>x·dx</text>
                    </svg>
                    <p class="stage-note">The gain is two rectangles plus a small corner, which is why the area outruns the side.</p>
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
              {:else if ex.kind === 'stepper'}
                <div class="stepper">
                  <button aria-label="Decrease" on:click={() => stepBy(ex, -1)}>−</button>
                  <span class="stepper-value">
                    x = {stepValue(ex, stepped).toFixed(ex.step < 1 ? 1 : 0)}{ex.unit ? ' ' + ex.unit : ''}
                  </span>
                  <button aria-label="Increase" on:click={() => stepBy(ex, 1)}>+</button>
                </div>
                <p class="kind-note">Target {ex.target}{ex.unit ? ' ' + ex.unit : ''} ·
                  <b class:hit={stepHit(ex, stepped)}>{stepHit(ex, stepped) ? 'reached' : 'not yet'}</b></p>
                {#if stepHit(ex, stepped) && ex.successNote}<p class="ok">{ex.successNote}</p>{/if}

              {:else if ex.kind === 'match'}
                <div class="tray">
                  {#each ex.items as item}
                    {#if !(placed[ex.code] || {})[item.label]}
                      <button class="chip pick" class:up={held[ex.code] === item.label}
                        on:click={() => takeItem(ex.code, item.label)}>{item.label}</button>
                    {/if}
                  {/each}
                  {#if !ex.items.some(i => !(placed[ex.code] || {})[i.label])}
                    <span class="tray-empty">tray empty</span>
                  {/if}
                </div>
                <div class="bins">
                  {#each ex.bins as bin}
                    <button class="bin" class:armed={held[ex.code]} on:click={() => placeItem(ex.code, bin)}>
                      <small>{bin}</small>
                      <span class="bin-items">
                        {#each ex.items.filter(i => (placed[ex.code] || {})[i.label] === bin) as i}
                          <em class:wrong={i.bin !== bin}>{i.label}</em>
                        {/each}
                      </span>
                    </button>
                  {/each}
                </div>
                <p class="kind-note">Tap a symbol, then tap a box ·
                  <b class:hit={matchDone(ex, placed)}>{matchDone(ex, placed) ? 'all correct' : 'in progress'}</b></p>
                {#if matchDone(ex, placed) && ex.successNote}<p class="ok">{ex.successNote}</p>{/if}

              {:else if ex.kind === 'order'}
                <div class="order-list">
                  {#each orderList(ex) as idx, pos}
                    <div class="order-row">
                      <span>{ex.items[idx]}</span>
                      <span class="order-btns">
                        <button aria-label="Move up" disabled={pos === 0} on:click={() => moveItem(ex, pos, -1)}>↑</button>
                        <button aria-label="Move down" disabled={pos === orderList(ex).length - 1} on:click={() => moveItem(ex, pos, 1)}>↓</button>
                      </span>
                    </div>
                  {/each}
                </div>
                <p class="kind-note">Reorder with the arrows ·
                  <b class:hit={orderDone(ex, ordered)}>{orderDone(ex, ordered) ? 'correct order' : 'not yet'}</b></p>
                {#if orderDone(ex, ordered) && ex.successNote}<p class="ok">{ex.successNote}</p>{/if}

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

    {#if bb1.workshops}
      <section class="section-block">
        <div class="section-head">
          <span class="section-code">W</span>
          <h2>Workshops <em>— larger than a check: several objects, a few goals</em></h2>
        </div>
        <div class="variant-grid">
          {#each bb1.workshops as w}
            <article class="variant">
              <span class="code">{w.code}</span>
              <p class="prompt">{w.name}</p>
              <p class="reading-text">{w.blurb}</p>

              <div class="stage">
                {#if w.kind === 'assignment-bench'}
                  <div class="rows">
                    <div class="tray">
                      {#each w.values as v}
                        <button class="chip pick" class:up={bench.held === v} on:click={() => benchTake(v)}>{v}</button>
                      {/each}
                    </div>
                    <div class="letters">
                      {#each w.letters as L}
                        <div class="letter-slot" class:armed={bench.held !== null} class:filled={bench.assigned[L] !== undefined}>
                          <button class="slot-hit" on:click={() => benchDrop(L)}>
                            <b>{L}</b>
                            <span>{bench.assigned[L] !== undefined ? '= ' + bench.assigned[L] : 'no value'}</span>
                          </button>
                          {#if bench.assigned[L] !== undefined}
                            <button class="clear" aria-label={`Clear ${L}`} on:click={() => benchClear(L)}>×</button>
                          {/if}
                        </div>
                      {/each}
                    </div>
                    <ul class="goals">
                      {#each w.goals as g}
                        <li class:met={goalMet(w.kind, g.id, bench, cb, db)}>
                          <i>{goalMet(w.kind, g.id, bench, cb, db) ? '✓' : '○'}</i>{g.text}
                        </li>
                      {/each}
                    </ul>
                  </div>

                {:else if w.kind === 'change-bench'}
                  <div class="rows">
                    <div class="bench-row">
                      <small>OLD</small>
                      <button on:click={() => cbStep('oldV', -1)} aria-label="Decrease old">−</button>
                      <b>{cb.oldV.toFixed(1)}</b>
                      <button on:click={() => cbStep('oldV', 1)} aria-label="Increase old">+</button>
                    </div>
                    <div class="bench-row">
                      <small>NEW</small>
                      <button on:click={() => cbStep('newV', -1)} aria-label="Decrease new">−</button>
                      <b>{cb.newV.toFixed(1)}</b>
                      <button on:click={() => cbStep('newV', 1)} aria-label="Increase new">+</button>
                    </div>
                    <div class="equation-strip">
                      <span>Δx</span>
                      <strong>= {cb.newV.toFixed(1)} − {cb.oldV.toFixed(1)}</strong>
                      <b>= {cbDelta(cb).toFixed(1).replace('-', '−')}</b>
                    </div>
                    <ul class="goals">
                      {#each w.goals as g}
                        <li class:met={goalMet(w.kind, g.id, bench, cb, db)}>
                          <i>{goalMet(w.kind, g.id, bench, cb, db) ? '✓' : '○'}</i>{g.text}
                        </li>
                      {/each}
                    </ul>
                  </div>

                {:else if w.kind === 'delta-builder'}
                  <div class="rows centre">
                    <div class="build-line">
                      <span class="glyph-sm">Δ</span>
                      {#if db.letter}
                        <span class="glyph-sm let">{db.letter}</span>
                      {:else}
                        <span class="glyph-sm empty">?</span>
                      {/if}
                    </div>
                    <p class="build-read">
                      {db.letter ? `the change in ${db.letter}` : 'attach a letter'}
                    </p>
                    <div class="tray">
                      {#each w.letters as L}
                        <button class="chip pick" class:up={db.letter === L} on:click={() => db = { letter: db.letter === L ? null : L }}>{L}</button>
                      {/each}
                    </div>
                    <ul class="goals">
                      {#each w.goals as g}
                        <li class:met={goalMet(w.kind, g.id, bench, cb, db)}>
                          <i>{goalMet(w.kind, g.id, bench, cb, db) ? '✓' : '○'}</i>{g.text}
                        </li>
                      {/each}
                    </ul>
                  </div>

                {:else if w.kind === 'statement-match'}
                  <div class="rows">
                    {#each w.pairs as p}
                      <div class="pair-row"><b>{p.left}</b><i>→</i><span>{p.right}</span></div>
                    {/each}
                    <p class="stage-note">Shown paired here. Built, the right column would be shuffled and tapped into place.</p>
                  </div>
                {/if}
              </div>

              <p class="note">{w.note}</p>
            </article>
          {/each}
        </div>
      </section>
    {/if}

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
  .reading-text.verbatim { font-style: italic; border-left: 2px solid var(--qx-accent); padding-left: 12px; }
  .verbatim-tag { font-size: 10px; letter-spacing: .06em; font-weight: 800; color: var(--qx-accent-text); }

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
  .stepper { display: flex; align-items: center; gap: 10px; }
  .stepper button { width: 44px; height: 44px; border-radius: 12px; border: 1px solid var(--qx-border-2); background: var(--qx-surface-2); color: var(--qx-text); font-size: 22px; font-weight: 900; cursor: pointer; }
  .stepper button:active { background: var(--qx-accent-soft); }
  .stepper-value { flex: 1; text-align: center; font-size: 20px; font-weight: 900; color: var(--qx-accent-text); }

  .tray { display: flex; flex-wrap: wrap; gap: 7px; min-height: 44px; align-items: center; }
  .tray-empty { font-size: 11px; color: var(--qx-text-faint); font-weight: 700; }
  .chip.pick { min-width: 40px; height: 40px; padding: 0 12px; border-radius: 10px; border: 1px solid var(--qx-border-2); background: var(--qx-surface); color: var(--qx-text); font-size: 17px; font-weight: 900; cursor: pointer; }
  .chip.pick.up { border-color: var(--qx-accent); background: var(--qx-accent-soft); color: var(--qx-accent-text); transform: translateY(-3px); }
  .bins { display: grid; grid-template-columns: 1fr 1fr; gap: 9px; }
  .bin { min-height: 74px; border: 1px dashed var(--qx-border-2); border-radius: 12px; background: var(--qx-surface-2); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; cursor: pointer; padding: 9px; }
  .bin.armed { border-color: var(--qx-accent); background: var(--qx-accent-soft); }
  .bin small { font-size: 9px; letter-spacing: .1em; font-weight: 900; color: var(--qx-text-faint); }
  .bin-items { display: flex; gap: 6px; flex-wrap: wrap; justify-content: center; }
  .bin-items em { font-style: normal; font-weight: 900; font-size: 15px; color: var(--qx-green-text); }
  .bin-items em.wrong { color: var(--qx-danger-text); text-decoration: line-through; }

  .order-list { display: flex; flex-direction: column; gap: 6px; }
  .order-row { display: flex; align-items: center; gap: 9px; border: 1px solid var(--qx-border-2); border-radius: 10px; padding: 8px 10px; background: var(--qx-surface-2); font-size: 13px; font-weight: 700; }
  .order-row span:first-child { flex: 1; }
  .order-btns { display: flex; gap: 5px; }
  .order-btns button { width: 30px; height: 30px; border-radius: 8px; border: 1px solid var(--qx-border-2); background: var(--qx-surface); color: var(--qx-text); cursor: pointer; font-weight: 900; }
  .order-btns button:disabled { opacity: .3; cursor: default; }

  .letters { display: flex; gap: 9px; flex-wrap: wrap; }
  .letter-slot { position: relative; flex: 1 1 84px; }
  .letter-slot .slot-hit { width: 100%; min-height: 66px; border: 1px dashed var(--qx-border-2); border-radius: 12px; background: var(--qx-surface-2); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px; cursor: pointer; color: var(--qx-text); }
  .letter-slot.armed .slot-hit { border-color: var(--qx-accent); }
  .letter-slot.filled .slot-hit { border-style: solid; border-color: var(--qx-accent); background: var(--qx-accent-soft); }
  .letter-slot b { font: italic 800 22px/1 Georgia, serif; color: var(--qx-accent-text); }
  .letter-slot span { font-size: 11px; font-weight: 800; color: var(--qx-text-dim); }
  .clear { position: absolute; top: -6px; right: -6px; width: 22px; height: 22px; border-radius: 50%; border: 1px solid var(--qx-border-2); background: var(--qx-surface); color: var(--qx-text-dim); cursor: pointer; font-size: 12px; line-height: 1; }
  .goals { list-style: none; display: flex; flex-direction: column; gap: 5px; }
  .goals li { display: flex; align-items: center; gap: 8px; font-size: 12.5px; color: var(--qx-text-2); }
  .goals li i { font-style: normal; color: var(--qx-text-faint); font-weight: 900; }
  .goals li.met { color: var(--qx-green-text); }
  .goals li.met i { color: var(--qx-green); }
  .bench-row { display: flex; align-items: center; gap: 9px; }
  .bench-row small { width: 44px; font-size: 9px; letter-spacing: .1em; font-weight: 900; color: var(--qx-text-faint); }
  .bench-row button { width: 38px; height: 38px; border-radius: 10px; border: 1px solid var(--qx-border-2); background: var(--qx-surface); color: var(--qx-text); font-size: 19px; font-weight: 900; cursor: pointer; }
  .bench-row b { flex: 1; text-align: center; font-size: 19px; }
  .build-line { display: flex; align-items: center; gap: 4px; }
  .glyph-sm { min-width: 46px; height: 56px; border: 2px solid var(--qx-accent); border-radius: 11px; background: var(--qx-accent-soft); color: var(--qx-accent-text); display: grid; place-items: center; font-size: 28px; font-weight: 900; padding: 0 10px; }
  .glyph-sm.let { font: italic 800 28px/1 Georgia, serif; }
  .glyph-sm.empty { border-style: dashed; border-color: var(--qx-border-2); background: transparent; color: var(--qx-text-faint); }
  .build-read { font-size: 13px; font-weight: 800; color: var(--qx-text-2); }
  .pair-row { display: flex; align-items: center; gap: 9px; font-size: 13px; }
  .pair-row b { min-width: 52px; font-size: 15px; color: var(--qx-accent-text); }
  .pair-row i { font-style: normal; color: var(--qx-text-faint); }
  .ok { font-size: 12px; line-height: 1.45; color: var(--qx-green-text); background: var(--qx-green-soft); border-radius: 9px; padding: 8px 11px; }

  .kind-note { font-size: 12.5px; color: var(--qx-text-dim); line-height: 1.5; }
  .kind-note b { color: var(--qx-text-dim); }
  .kind-note b.hit { color: var(--qx-green-text); }

  .gate { border: 1px dashed var(--qx-danger); border-radius: 11px; padding: 11px 13px; background: var(--qx-danger-soft); color: var(--qx-danger-text); font-size: 12.5px; line-height: 1.5; font-weight: 700; margin-top: 14px; }
  .mini-svg .train { fill: var(--qx-accent); }
  .bb-switch { display: flex; gap: 8px; flex-wrap: wrap; }
  .bb-switch button { display: flex; flex-direction: column; gap: 3px; align-items: flex-start; border: 1px solid var(--qx-border-2); background: var(--qx-surface); color: var(--qx-text); border-radius: 12px; padding: 9px 14px; cursor: pointer; font-weight: 900; font-size: 12px; }
  .bb-switch button em { font-style: normal; font-size: 10.5px; font-weight: 700; color: var(--qx-text-faint); }
  .bb-switch button.on { border-color: var(--qx-accent); background: var(--qx-accent-soft); color: var(--qx-accent-text); }

  .mini-svg { width: 100%; max-width: 300px; height: auto; }
  .mini-svg .ax { fill: none; stroke: var(--qx-text-dim); stroke-width: 2; stroke-linecap: round; }
  .mini-svg text { fill: var(--qx-text-faint); font-size: 11px; text-anchor: middle; font-weight: 700; }
  .mini-svg .gap { fill: none; stroke: var(--qx-accent); stroke-width: 3; stroke-linecap: round; }
  .mini-svg .old { fill: var(--qx-text-faint); }
  .mini-svg .new { fill: var(--qx-accent); }
  .decomp .base { fill: var(--qx-accent-soft); stroke: var(--qx-accent); stroke-width: 2; }
  .decomp .grow { fill: none; stroke: var(--qx-green); stroke-width: 2; stroke-dasharray: 5 4; }

  .mini-svg .curve { fill: none; stroke: var(--qx-text-dim); stroke-width: 2.5; }
  .mini-svg .sec { fill: none; stroke: var(--qx-accent); stroke-width: 2.5; stroke-linecap: round; }

  .ratio { display: flex; align-items: center; gap: 13px; }
  .frac { display: flex; flex-direction: column; gap: 5px; }
  .frac span { display: flex; justify-content: space-between; align-items: baseline; gap: 10px; }
  .frac small { font-size: 8.5px; letter-spacing: .1em; color: var(--qx-text-faint); font-weight: 900; }
  .frac b { font-size: 19px; }
  .frac i { height: 1px; background: var(--qx-text-dim); display: block; }
  .eq { font-size: 19px; color: var(--qx-text-dim); font-weight: 900; }
  .ratio-out { display: flex; flex-direction: column; align-items: flex-start; border-left: 1px solid var(--qx-border-2); padding-left: 13px; }
  .ratio-out b { font-size: 26px; color: var(--qx-accent-text); }
  .ratio-out small { font-size: 9px; letter-spacing: .09em; color: var(--qx-text-faint); font-weight: 900; }

  .formula { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center; font-size: 15px; font-weight: 800; }
  .formula i { font-style: normal; color: var(--qx-text-faint); }
  .formula b { font-size: 21px; color: var(--qx-accent-text); }
  .ladder-row { display: flex; justify-content: space-between; gap: 12px; border: 1px solid var(--qx-border); border-radius: 9px; padding: 7px 11px; font-size: 12px; }
  .ladder-row small { color: var(--qx-text-faint); font-weight: 900; letter-spacing: .07em; }
  .ladder-row.on { border-color: var(--qx-accent); background: var(--qx-accent-soft); color: var(--qx-accent-text); }

  .bar-row { display: flex; align-items: center; gap: 9px; }
  .bar-row small { width: 54px; font-size: 9px; letter-spacing: .1em; color: var(--qx-text-faint); font-weight: 900; }
  .bar-row b { font-size: 13px; }
  .bar { height: 15px; border-radius: 5px; background: var(--qx-accent); display: inline-block; min-width: 2px; }
  .bar.diff { background: var(--qx-green); }
  .glyph { display: flex; flex-direction: column; align-items: center; gap: 7px; border: 2px solid var(--qx-accent); border-radius: 14px; padding: 18px 30px; background: var(--qx-accent-soft); color: var(--qx-accent-text); font-size: 40px; font-weight: 900; }
  .glyph em { font-style: normal; font-size: 11px; letter-spacing: .1em; font-weight: 800; }
  .card em { display: block; font-style: normal; font-size: 9px; letter-spacing: .1em; color: var(--qx-text-faint); font-weight: 800; margin-top: 3px; }
  .card.locked { opacity: .82; }
  .machine-box { border: 1px dashed var(--qx-border-2); border-radius: 9px; padding: 9px 12px; font-size: 11px; font-weight: 800; color: var(--qx-text-dim); }
  .square.area { display: grid; place-items: center; }
  .square.area span { font-size: 14px; font-weight: 900; color: var(--qx-accent-text); }
  .square.area.small { border-color: var(--qx-text-faint); background: transparent; }
  .edge-label.sm { font: italic 800 14px/1 Georgia, serif; gap: 6px; }

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
