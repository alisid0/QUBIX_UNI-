<script>
  // The learner-facing renderer for a Factory interaction. One component per
  // section, so each board keeps its own state instead of sharing a module-level
  // variable with every other preview of the same kind, which is what the
  // Factory harness does.
  //
  // Known debt, stated rather than hidden: the Factory renders these same kinds
  // from its own markup in FactoryMode.svelte. Two renderers for one set of
  // kinds can drift. Extracting the harness onto this component is the right
  // next move; it was not done in the same pass as wiring the pilot up, because
  // that would have put the authoring surface at risk in the same change that
  // put the app in front of learners.
  export let stage;

  const RULES = {
    'double it': v => v * 2,
    'add three': v => v + 3,
    'square it': v => v * v,
    'take away one': v => v - 1
  };
  const PLATES = Object.keys(RULES);
  const run = (name, v) => RULES[name](v);
  const fmt = n => Number(Number(n).toFixed(2)).toString().replace('-', '−');

  // Switch and tap.
  let up = false;
  let turn = 3;
  const flow = t => Number((t * 0.4).toFixed(1));

  // Drinks panel.
  const PANEL = ['tea', 'coffee', 'soup', 'coffee'];
  const SOUND = ['tea', 'coffee', 'soup', 'water'];
  const FORKED = ['tea', 'coffee', ['tea', 'coffee'], 'water'];
  let log = [];
  function press(i) { log = [...log, { button: i + 1, out: PANEL[i] }]; }
  function pressPair(which, i) {
    const out = which === 'sound' ? SOUND[i] : FORKED[i];
    log = [...log, { which, button: i + 1, out: Array.isArray(out) ? out.join(' and ') : out, forked: Array.isArray(out) }];
  }

  // Substitution and machines.
  let b = 4;
  let inValue = 3;
  let plate = 0;

  // The ladder.
  let dist = 3;
  let shown = {};
  const height = d => Math.sqrt(Math.max(0, 25 - d * d));

  // Area and plane.
  let base = 4, alt = 3;
  let px = 3, py = 4;
  const quadrant = (x, y) => `(${x >= 0 ? '+' : '−'}, ${y >= 0 ? '+' : '−'})`;
</script>

{#if stage.kind === 'switch-toggle' || stage.kind === 'switch-plain'}
  <div class="st centre">
    <div class="lamp" class:lit={up}>{up ? 'ON' : 'OFF'}</div>
    <div class="switch">
      <button class:on={up} on:click={() => (up = true)}>up</button>
      <button class:on={!up} on:click={() => (up = false)}>down</button>
    </div>
  </div>

{:else if stage.kind === 'tap-valve'}
  <div class="st">
    <label class="range">
      <span>shut</span>
      <input type="range" min="0" max="10" step="1" bind:value={turn} aria-label="Tap setting"/>
      <span>open</span>
    </label>
    <div class="big"><b>{flow(turn)}</b><small>litres a minute</small></div>
    <div class="bar"><i style={`width:${turn * 10}%`}></i></div>
  </div>

{:else if stage.kind === 'machine-panel'}
  <div class="st">
    <div class="panel">
      {#each PANEL as _, i}
        <button class="pbtn" on:click={() => press(i)}><b>{i + 1}</b></button>
      {/each}
    </div>
    {#if log.length}
      <table class="io"><thead><tr><th>pressed</th><th>arrived</th></tr></thead>
        <tbody>{#each log.slice(-5) as r}<tr><td>{r.button}</td><td><b>{r.out}</b></td></tr>{/each}</tbody>
      </table>
    {:else}<p class="hint">Press a button. What arrives is recorded below it.</p>{/if}
  </div>

{:else if stage.kind === 'forked-button' || stage.kind === 'flaky-button'}
  <div class="st">
    <div class="machines">
      {#each [['sound', 'Machine A'], ['broken', 'Machine B']] as [which, label]}
        <div class="machine">
          <span class="plate">{label}</span>
          <div class="panel">
            {#each SOUND as _, i}
              <button class="pbtn" on:click={() => pressPair(which, i)}><b>{i + 1}</b></button>
            {/each}
          </div>
        </div>
      {/each}
    </div>
    {#if log.length}
      <table class="io"><thead><tr><th></th><th>button</th><th>arrived</th></tr></thead>
        <tbody>{#each log.slice(-5) as r}
          <tr><td>{r.which === 'sound' ? 'A' : 'B'}</td><td>{r.button}</td><td><b class:two={r.forked}>{r.out}</b></td></tr>
        {/each}</tbody>
      </table>
    {:else}<p class="hint">Press the same button on each machine.</p>{/if}
  </div>

{:else if stage.kind === 'substitute-strip'}
  <div class="st">
    <div class="row"><small>b</small>
      <button on:click={() => (b = Math.max(1, b - 1))} aria-label="Decrease b">−</button>
      <b>{b}</b>
      <button on:click={() => (b = Math.min(6, b + 1))} aria-label="Increase b">+</button>
    </div>
    <div class="work"><span>3b²</span><span>3 × {b}²</span><span>3 × {b * b}</span><b>{3 * b * b}</b></div>
  </div>

{:else if stage.kind === 'machine-single' || stage.kind === 'two-machines'}
  <div class="st">
    <div class="row"><small>IN</small>
      <button on:click={() => (inValue = Math.max(0, inValue - 1))} aria-label="Decrease input">−</button>
      <b>{inValue}</b>
      <button on:click={() => (inValue = Math.min(6, inValue + 1))} aria-label="Increase input">+</button>
    </div>
    <div class="machines">
      {#each (stage.kind === 'two-machines' ? ['double it', 'square it'] : ['square it']) as nm}
        <div class="machine"><span class="port">{inValue}</span><span class="plate">{nm}</span><b class="out">{run(nm, inValue)}</b></div>
      {/each}
    </div>
  </div>

{:else if stage.kind === 'rule-swap'}
  <div class="st">
    <div class="plates">
      {#each PLATES.slice(0, 3) as nm, i}
        <button class="chip" class:on={plate === i} on:click={() => (plate = i)}>{nm}</button>
      {/each}
    </div>
    <table class="io"><thead><tr><th>in</th><th>out</th></tr></thead>
      <tbody>{#each [1, 2, 3, 4] as v}<tr><td>{v}</td><td><b>{run(PLATES[plate], v)}</b></td></tr>{/each}</tbody>
    </table>
    <p class="hint">The left column never moves. Only the plate does.</p>
  </div>

{:else if stage.kind === 'relation-test' || stage.kind === 'relation-guess'}
  <div class="st">
    <svg class="ladder" viewBox="0 0 210 150" role="img"
      aria-label={`A ladder with its foot ${fmt(dist)} from the wall, reaching ${fmt(height(dist))} up it`}>
      <rect class="wall" x="6" y="6" width="34" height="130"/>
      {#each [20, 34, 48, 62, 76, 90, 104, 118, 132] as y}<line class="brick" x1="6" y1={y} x2="40" y2={y}/>{/each}
      {#each [20, 48, 76, 104] as y}<line class="brick" x1="23" y1={y} x2="23" y2={y + 14}/>{/each}
      {#each [34, 62, 90, 118] as y}<line class="brick" x1="14" y1={y} x2="14" y2={y + 14}/>{/each}
      <rect class="plaque" x="12" y="120" width="22" height="11" rx="2"/>
      <text class="ptext" x="23" y="128">1908</text>
      <line class="floor" x1="0" y1="136" x2="210" y2="136"/>
      <line class="hmark" x1="40" y1={136 - height(dist) * 25} x2="52" y2={136 - height(dist) * 25}/>
      <text class="htext" x="55" y={140 - height(dist) * 25}>{fmt(height(dist))}</text>
      <line class="rung" x1={40 + dist * 25} y1="136" x2="40" y2={136 - height(dist) * 25}/>
      <line class="rung rail" x1={40 + dist * 25 - 7} y1="136" x2="33" y2={136 - height(dist) * 25}/>
      <circle class="foot" cx={40 + dist * 25} cy="136" r="4"/>
    </svg>
    <label class="range">
      <span>at the wall</span>
      <input type="range" min="0" max="5" step="0.5" bind:value={dist} aria-label="Distance of the foot of the ladder from the wall"/>
      <span>far out</span>
    </label>
    <div class="outs">
      {#each [['height reached', fmt(height(dist))], ['bricks in the wall', '1,240'], ['year it was built', '1908']] as [name, val], i}
        <div class="out-box">
          <small>{name}</small>
          {#if stage.kind === 'relation-test' || shown[i]}
            <b>{val}</b>
          {:else}
            <div class="guess">
              <button class="chip" on:click={() => (shown = { ...shown, [i]: 1 })}>changes</button>
              <button class="chip" on:click={() => (shown = { ...shown, [i]: 1 })}>does not</button>
            </div>
          {/if}
        </div>
      {/each}
    </div>
    {#if stage.kind === 'relation-guess'}<p class="hint">Say what each one will do, then move the ladder.</p>{/if}
  </div>

{:else if stage.kind === 'notation-card' || stage.kind === 'notation-builder'}
  <div class="st centre">
    <div class="forms">{#each ['F', 'f', 'φ'] as L}<span class="form">y = {L}(x)</span>{/each}</div>
    <p class="hint">All three say that y depends on x by some rule.</p>
  </div>

{:else if stage.kind === 'count-grid' || stage.kind === 'unit-scale'}
  <div class="st">
    <div class="grid" style={`--w:${base}`}>
      {#each Array(base * alt) as _}<i></i>{/each}
    </div>
    <div class="row"><small>BASE</small>
      <button on:click={() => (base = Math.max(1, base - 1))} aria-label="Decrease base">−</button><b>{base}</b>
      <button on:click={() => (base = Math.min(8, base + 1))} aria-label="Increase base">+</button>
    </div>
    <div class="row"><small>HEIGHT</small>
      <button on:click={() => (alt = Math.max(1, alt - 1))} aria-label="Decrease altitude">−</button><b>{alt}</b>
      <button on:click={() => (alt = Math.min(6, alt + 1))} aria-label="Increase altitude">+</button>
    </div>
    <div class="big"><b>{base * alt}</b><small>{stage.showProduct ? `squares, and ${base} × ${alt}` : 'squares'}</small></div>
  </div>

{:else if stage.kind === 'line-fails' || stage.kind === 'axes-build' || stage.kind === 'find-place' || stage.kind === 'quadrants'}
  <div class="st">
    <div class="plane">
      {#each Array(7) as _, r}
        {#each Array(7) as _, c}
          <button class="cell" class:axis={c === 0 || 6 - r === 0}
            class:here={px === c && py === 6 - r}
            on:click={() => { px = c; py = 6 - r; }} aria-label={`Place at ${c}, ${6 - r}`}></button>
        {/each}
      {/each}
    </div>
    <div class="big"><b>( {px} , {py} )</b>{#if stage.kind === 'quadrants'}<small>{quadrant(px, py)}</small>{/if}</div>
  </div>

{:else}
  <p class="hint">This section has no figure.</p>
{/if}

<style>
  .st { display: flex; flex-direction: column; gap: 11px; width: 100%; align-items: stretch; }
  .st.centre { align-items: center; }
  .hint { font-size: 12px; color: var(--qx-text-faint); margin: 0; line-height: 1.4; }
  .row { display: flex; align-items: center; gap: 9px; }
  .row small { font-size: 9.5px; letter-spacing: .07em; font-weight: 800; color: var(--qx-text-faint); min-width: 46px; }
  .row b { font-size: 19px; min-width: 34px; text-align: center; color: var(--qx-accent-text); }
  .row button { width: 30px; height: 30px; border-radius: 8px; border: 1px solid var(--qx-border-2); background: transparent; color: var(--qx-text); font-size: 16px; cursor: pointer; }
  .range { display: flex; align-items: center; gap: 9px; font-size: 10px; color: var(--qx-text-faint); font-weight: 800; }
  .range input { flex: 1; accent-color: var(--qx-accent); }
  .big { display: flex; align-items: baseline; gap: 8px; }
  .big b { font-size: 27px; color: var(--qx-accent-text); }
  .big small { font-size: 11px; color: var(--qx-text-faint); }
  .bar { height: 9px; border-radius: 5px; background: var(--qx-surface-2); overflow: hidden; }
  .bar i { display: block; height: 100%; background: var(--qx-accent); }

  .lamp { width: 78px; height: 78px; border-radius: 50%; display: grid; place-items: center; font-size: 12px; font-weight: 900; letter-spacing: .08em; border: 2px solid var(--qx-border-2); color: var(--qx-text-faint); }
  .lamp.lit { background: var(--qx-accent-soft); border-color: var(--qx-accent); color: var(--qx-accent-text); box-shadow: 0 0 0 8px var(--qx-accent-soft); }
  .switch { display: flex; flex-direction: column; border: 1px solid var(--qx-border-2); border-radius: 11px; overflow: hidden; width: 104px; }
  .switch button { padding: 10px 0; font-size: 12px; font-weight: 800; background: transparent; border: 0; color: var(--qx-text-dim); cursor: pointer; }
  .switch button + button { border-top: 1px solid var(--qx-border-2); }
  .switch button.on { background: var(--qx-accent); color: #fff; }

  .panel { display: flex; gap: 7px; flex-wrap: wrap; }
  .pbtn { min-width: 46px; padding: 9px; border: 1px solid var(--qx-border-2); border-radius: 9px; background: transparent; cursor: pointer; }
  .pbtn b { font-size: 15px; color: var(--qx-accent-text); }
  .machines { display: flex; gap: 11px; flex-wrap: wrap; }
  .machine { flex: 1; min-width: 122px; display: flex; flex-direction: column; align-items: center; gap: 7px; border: 1px solid var(--qx-border-2); border-radius: 12px; padding: 10px 8px; }
  .machine .port { font-size: 16px; font-weight: 800; color: var(--qx-text-2); }
  .machine .out { font-size: 21px; color: var(--qx-accent-text); }
  .machine .plate { font-size: 10.5px; font-weight: 800; letter-spacing: .04em; text-transform: uppercase; color: var(--qx-text-dim); border-top: 1px dashed var(--qx-border-2); border-bottom: 1px dashed var(--qx-border-2); padding: 5px 0; width: 100%; text-align: center; }
  .plates { display: flex; gap: 6px; flex-wrap: wrap; }
  .chip { font-size: 11.5px; font-weight: 800; padding: 6px 11px; border-radius: 999px; border: 1px solid var(--qx-border-2); background: transparent; color: var(--qx-text-dim); cursor: pointer; }
  .chip.on { border-color: var(--qx-accent); background: var(--qx-accent-soft); color: var(--qx-accent-text); }
  .io { border-collapse: collapse; font-size: 13px; align-self: flex-start; }
  .io th { font-size: 9px; letter-spacing: .08em; text-transform: uppercase; color: var(--qx-text-faint); text-align: left; padding: 0 15px 4px 0; }
  .io td { padding: 2px 15px 2px 0; color: var(--qx-text-2); }
  .io b { color: var(--qx-accent-text); font-size: 15px; }
  .io b.two { background: var(--qx-accent-soft); border-radius: 5px; padding: 1px 5px; }
  .work { display: flex; flex-direction: column; gap: 5px; font-size: 14px; color: var(--qx-text-2); }
  .work b { font-size: 20px; color: var(--qx-accent-text); }

  .ladder { width: 100%; max-width: 290px; height: auto; align-self: center; }
  .ladder .wall { fill: var(--qx-surface-2); stroke: var(--qx-border-2); }
  .ladder .brick { stroke: var(--qx-text-faint); stroke-width: .6; opacity: .55; }
  .ladder .floor { stroke: var(--qx-text-dim); stroke-width: 2; }
  .ladder .plaque { fill: var(--qx-surface); stroke: var(--qx-text-faint); stroke-width: .8; }
  .ladder .ptext { fill: var(--qx-text-dim); font-size: 7px; font-weight: 800; text-anchor: middle; }
  .ladder .rung { stroke: var(--qx-accent); stroke-width: 3.5; stroke-linecap: round; }
  .ladder .rung.rail { stroke-width: 2; opacity: .55; }
  .ladder .foot { fill: var(--qx-accent); }
  .ladder .hmark { stroke: var(--qx-accent); stroke-width: 1.5; stroke-dasharray: 3 2; }
  .ladder .htext { fill: var(--qx-accent-text); font-size: 9px; font-weight: 800; }
  .outs { display: flex; gap: 8px; flex-wrap: wrap; }
  .out-box { flex: 1; min-width: 96px; border: 1px solid var(--qx-border-2); border-radius: 10px; padding: 8px 9px; }
  .out-box small { display: block; font-size: 9px; letter-spacing: .05em; text-transform: uppercase; color: var(--qx-text-faint); font-weight: 800; }
  .out-box b { font-size: 18px; color: var(--qx-accent-text); }
  .guess { display: flex; gap: 4px; margin-top: 4px; }
  .guess .chip { font-size: 10px; padding: 3px 7px; }
  .forms { display: flex; gap: 9px; flex-wrap: wrap; justify-content: center; }
  .form { font-size: 17px; font-weight: 800; color: var(--qx-accent-text); border: 1px solid var(--qx-border-2); border-radius: 10px; padding: 9px 13px; }

  .grid { display: grid; grid-template-columns: repeat(var(--w), 24px); gap: 2px; align-self: center; }
  .grid i { width: 24px; height: 24px; background: var(--qx-accent-soft); border: 1px solid var(--qx-accent); border-radius: 3px; }
  .plane { display: grid; grid-template-columns: repeat(7, 30px); align-self: center; }
  .cell { width: 30px; height: 30px; border: 1px solid var(--qx-border-2); background: transparent; cursor: pointer; padding: 0; }
  .cell.axis { background: var(--qx-surface-2); }
  .cell.here { background: var(--qx-accent); border-color: var(--qx-accent); }
</style>
