<script>
  import { onDestroy } from 'svelte';
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

  // Plotting and line-slope bridge boards. These kinds remain outside the
  // generated learner bundle until the founder selects them in the Factory.
  const GRAPH_X = [-3, -2, -1, 0, 1, 2, 3];
  const GRAPH_RULES = {
    'square it': v => v * v,
    'double it': v => v * 2,
    'add three': v => v + 3
  };
  let graphCount = 1;
  let graphRule = 'square it';
  const graphY = x => GRAPH_RULES[graphRule](x);
  const graphPoint = (x, y) => ({ x: 150 + x * 32, y: 124 - y * 13 });
  const PLOT_DRILLS = {
    'point-target-drill': [[-2, 4], [1, 1], [0, 0], [2, 4], [-1, 1]],
    'point-target-shuffle': [[3, 2], [-1, 5], [2, 7], [-3, 1], [0, 6]],
    'curve-plot-drill': [[-2, 4], [0, 0], [2, 4], [-1, 1], [1, 1]],
    'curve-point-check': [[2, 5], [-2, 1], [3, 6], [-3, 0], [0, 3]]
  };
  let plotDrill = { kind: '', step: 0, hits: [], misses: 0 };
  const drillState = (kind, state) => state.kind === kind ? state : { kind, step: 0, hits: [], misses: 0 };
  function tryPlot(kind, x, y) {
    const state = drillState(kind, plotDrill);
    const target = PLOT_DRILLS[kind][state.step];
    if (!target) return;
    plotDrill = target[0] === x && target[1] === y
      ? { ...state, step: state.step + 1, hits: [...state.hits, target] }
      : { ...state, misses: state.misses + 1 };
  }
  let lineRun = 3, lineRise = 2, previousRise = 2;
  const slope = () => lineRise / lineRun;
  function changeLine(which, delta) {
    previousRise = lineRise;
    if (which === 'run') lineRun = Math.max(1, Math.min(5, lineRun + delta));
    else lineRise = Math.max(-4, Math.min(4, lineRise + delta));
  }

  // Force and acceleration. The selected board runs two controlled
  // experiments: S1/S2 change force at a fixed 2 kg, then S3 changes mass at a
  // fixed 6 N. Every animation represents the same one-second force interval.
  const PHYSICS_VALUES = [2, 4, 6];
  const isMassStage = stage.kind === 'mass-push' || stage.kind === 'mass-race';
  let physForce = isMassStage ? 6 : 2;
  let physMass = 2;
  let physRunning = false;
  let physTravel = 0;
  let physResult = null;
  let physTrials = [];
  let physTimer;
  let physFrame;
  const physAcceleration = (force, mass) => Number((force / mass).toFixed(2));
  const physDistance = (force, mass) => Number((0.5 * physAcceleration(force, mass)).toFixed(2));
  function choosePhysicsForce(force) {
    if (physRunning) return;
    physForce = force;
    physTravel = 0;
    physResult = null;
  }
  function choosePhysicsMass(mass) {
    if (physRunning) return;
    physMass = mass;
    physTravel = 0;
    physResult = null;
  }
  function runPhysics() {
    if (physRunning) return;
    window.clearTimeout(physTimer);
    window.cancelAnimationFrame(physFrame);
    physRunning = false;
    physTravel = 0;
    physResult = null;
    physFrame = window.requestAnimationFrame(() => {
      const force = physForce;
      const mass = physMass;
      const acceleration = physAcceleration(force, mass);
      const distance = physDistance(force, mass);
      physRunning = true;
      physTravel = stage.kind === 'mass-race' ? 1 : distance;
      physTimer = window.setTimeout(() => {
        physRunning = false;
        physResult = stage.kind === 'mass-race' ? { race: true } : { force, mass, acceleration, distance };
        if (stage.kind !== 'mass-race') {
          const key = stage.kind === 'mass-push' ? 'mass' : 'force';
          physTrials = [...physTrials.filter(trial => trial[key] !== physResult[key]), physResult]
            .sort((a, b) => a[key] - b[key]);
        }
      }, 950);
    });
  }
  onDestroy(() => {
    window.clearTimeout(physTimer);
    window.cancelAnimationFrame(physFrame);
  });
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

{:else if stage.kind === 'table-plot-step' || stage.kind === 'table-plot-predict' || stage.kind === 'table-plot-sprint' || stage.kind === 'table-rule-switch'}
  <div class="st">
    {#if stage.kind === 'table-rule-switch'}
      <div class="plates">{#each Object.keys(GRAPH_RULES) as rule}<button class="chip" class:on={graphRule === rule} on:click={() => { graphRule = rule; graphCount = 1; }}>{rule}</button>{/each}</div>
    {/if}
    <table class="io"><thead><tr><th>x</th><th>{graphRule}</th><th>pair</th></tr></thead>
      <tbody>{#each GRAPH_X.slice(0, graphCount) as x}<tr><td>{x}</td><td><b>{graphY(x)}</b></td><td>( {x}, {graphY(x)} )</td></tr>{/each}</tbody>
    </table>
    <button class="advance" disabled={graphCount >= GRAPH_X.length} on:click={() => (graphCount = Math.min(GRAPH_X.length, graphCount + (stage.kind === 'table-plot-sprint' ? 3 : 1)))}>{stage.kind === 'table-plot-sprint' ? 'Add three rows' : 'Add the next row'}</button>
    <p class="hint">The rule stays fixed while each input produces its output.</p>
  </div>

{:else if stage.kind === 'table-points' || stage.kind === 'table-points-order' || stage.kind === 'curve-from-points' || stage.kind === 'curve-rule-compare'}
  <div class="st centre">
    {#if stage.kind === 'curve-rule-compare'}
      <div class="plates">{#each Object.keys(GRAPH_RULES) as rule}<button class="chip" class:on={graphRule === rule} on:click={() => { graphRule = rule; graphCount = Math.max(graphCount, 5); }}>{rule}</button>{/each}</div>
    {/if}
    <svg class="plot" viewBox="0 0 300 170" role="img" aria-label="Coordinate graph generated from a table">
      <path class="axis" d="M22 124H282M150 12V158"/>
      {#each [-3, -2, -1, 0, 1, 2, 3] as x}<line class="gridline" x1={150 + x * 32} y1="16" x2={150 + x * 32} y2="154"/>{/each}
      {#each [0, 2, 4, 6, 8] as y}<line class="gridline" x1="24" y1={124 - y * 13} x2="280" y2={124 - y * 13}/>{/each}
      {#if (stage.kind === 'curve-from-points' || stage.kind === 'curve-rule-compare') && graphCount >= 5}
        <polyline class="curve" points={Array.from({ length: 49 }, (_, i) => { const x = -3 + i / 8; const p = graphPoint(x, graphY(x)); return `${p.x},${p.y}`; }).join(' ')}/>
      {/if}
      {#each GRAPH_X.slice(0, graphCount) as x}
        {@const p = graphPoint(x, graphY(x))}
        <circle class="dot" cx={p.x} cy={p.y} r="5"/>
      {/each}
    </svg>
    <button class="advance" disabled={graphCount >= GRAPH_X.length} on:click={() => (graphCount = Math.min(GRAPH_X.length, graphCount + 1))}>Plot another pair</button>
    <p class="hint">{graphCount >= 5 ? 'The points expose the shape made by the rule.' : 'Plot more pairs before drawing the curve.'}</p>
  </div>

{:else if stage.kind === 'point-target-drill' || stage.kind === 'point-target-shuffle' || stage.kind === 'curve-plot-drill' || stage.kind === 'curve-point-check'}
  {@const drill = drillState(stage.kind, plotDrill)}
  {@const pairs = PLOT_DRILLS[stage.kind]}
  {@const target = pairs[drill.step]}
  <div class="st centre">
    <div class="drill-status">
      {#if target}<span>Plot <b>( {target[0]}, {target[1]} )</b></span>{:else}<strong>Round complete · {pairs.length}/{pairs.length}</strong>{/if}
      <small>{drill.misses === 0 ? 'No misplaced points' : `${drill.misses} misplaced ${drill.misses === 1 ? 'point' : 'points'}`}</small>
    </div>
    <div class="coordinate-grid" role="group" aria-label="Plot a coordinate on the grid">
      {#each [8, 7, 6, 5, 4, 3, 2, 1, 0] as y}
        {#each [-3, -2, -1, 0, 1, 2, 3] as x}
          <button class:hit={drill.hits.some(pair => pair[0] === x && pair[1] === y)} class:x-axis={y === 0} class:y-axis={x === 0}
            aria-label={`Plot ${x}, ${y}`} on:click={() => tryPlot(stage.kind, x, y)}>
            {drill.hits.some(pair => pair[0] === x && pair[1] === y) ? '●' : ''}
            {#if x === -3}<small>{y}</small>{/if}
          </button>
        {/each}
      {/each}
      <div class="coordinate-labels" aria-hidden="true">{#each [-3, -2, -1, 0, 1, 2, 3] as x}<span>{x}</span>{/each}</div>
    </div>
    {#if drill.step >= pairs.length && (stage.kind === 'curve-plot-drill' || stage.kind === 'curve-point-check')}
      {@const rule = stage.kind === 'curve-plot-drill' ? 'square it' : 'add three'}
      <svg class="plot drill-result" viewBox="0 0 300 170" role="img" aria-label="Curve revealed by the completed plotting round">
        <path class="axis" d="M22 124H282M150 8V158"/>
        <polyline class="curve" points={Array.from({ length: 49 }, (_, i) => { const x = -3 + i / 8; const p = graphPoint(x, GRAPH_RULES[rule](x)); return `${p.x},${p.y}`; }).join(' ')}/>
        {#each drill.hits as pair}{@const hit = graphPoint(pair[0], pair[1])}<circle class="dot" cx={hit.x} cy={hit.y} r="5"/>{/each}
      </svg>
    {/if}
    <p class="hint">{drill.step} of {pairs.length} points placed correctly.</p>
  </div>

{:else if stage.kind === 'mass-race'}
  <div class="st centre physics-stage">
    <div class="physics-constant"><small>CONSTANT FORCE</small><b>6 N</b><span>same one-second push</span></div>
    <div class="mass-race">
      {#each PHYSICS_VALUES as mass}
        {@const acceleration = physAcceleration(6, mass)}
        {@const distance = physDistance(6, mass)}
        <div class="mass-lane" role="img" aria-label={`${mass} kilogram block accelerating at ${acceleration} metres per second squared under a 6 newton force`}>
          <strong>{mass} kg</strong>
          <div class="mass-ground"><i>6 N →</i></div>
          <div class:moved={physRunning || physResult} class="mass-block" style={`--race-travel:${distance * 34}%;--mass-width:${38 + mass * 4}px`}><b>{mass} kg</b></div>
          <span>{acceleration} m/s²</span>
        </div>
      {/each}
    </div>
    <button class="physics-run" disabled={physRunning} on:click={runPhysics}>{physRunning ? 'APPLYING 6 N FOR 1 SECOND…' : 'APPLY 6 N TO ALL THREE'}</button>
    {#if physResult}<p class="physics-result success">Same force, different result: the 2 kg block accelerates most and travels farthest.</p>{/if}
    <p class="hint">Only the mass changes. Friction is off.</p>
  </div>

{:else if stage.kind === 'force-push' || stage.kind === 'force-bars' || stage.kind === 'mass-push'}
  <div class="st centre physics-stage">
    {#if stage.kind === 'mass-push'}
      <div class="physics-constant"><small>CONSTANT FORCE</small><b>6 N</b><span>choose the mass</span></div>
    {/if}
    <div class="physics-track" role="img" aria-label={`A person applying ${physForce} newtons to a ${physMass} kilogram block`} style={`--travel:${physTravel * 36}%`}>
      <div class="physics-ground"></div>
      <div class:push={physRunning} class="physics-person" aria-hidden="true"><i></i><b></b><em></em><span></span><span></span></div>
      <div class="physics-arrow" style={`--arrow:${34 + physForce * 7}px`}><span>F = {physForce} N</span></div>
      <div class="physics-block"><b>{physMass} kg</b></div>
      <small>START</small>
    </div>
    <div class="physics-picks" aria-label={stage.kind === 'mass-push' ? 'Choose the block mass' : 'Choose the applied force'}>
      {#each PHYSICS_VALUES as value}
        {#if stage.kind === 'mass-push'}
          <button class:on={physMass === value} disabled={physRunning} on:click={() => choosePhysicsMass(value)}>{value} kg</button>
        {:else}
          <button class:on={physForce === value} disabled={physRunning} on:click={() => choosePhysicsForce(value)}>{value} N</button>
        {/if}
      {/each}
    </div>
    <button class="physics-run" disabled={physRunning} on:click={runPhysics}>{physRunning ? 'PUSHING FOR 1 SECOND…' : 'PUSH FOR 1 SECOND'}</button>
    <div class="physics-readouts">
      <span><small>FORCE</small><b>{physForce} N</b></span>
      <span><small>MASS</small><b>{physMass} kg</b></span>
      <span><small>ACCELERATION</small><b>{physAcceleration(physForce, physMass)} m/s²</b></span>
    </div>
    {#if stage.kind === 'force-bars'}
      <div class="physics-bars">
        <span><small>force</small><i style={`width:${physForce * 13}%`}></i><b>{physForce} N</b></span>
        <span><small>acceleration</small><i style={`width:${physAcceleration(physForce, physMass) * 26}%`}></i><b>{physAcceleration(physForce, physMass)} m/s²</b></span>
      </div>
    {/if}
    {#if physResult}
      <p class="physics-result">{stage.kind === 'mass-push' ? `The same ${physResult.force} N force accelerated the ${physResult.mass} kg block at ${physResult.acceleration} m/s², covering ${physResult.distance} m during the push.` : `${physResult.force} N produced ${physResult.acceleration} m/s² and ${physResult.distance} m of travel during the push.`}</p>
    {/if}
    {#if physTrials.length}
      <div class="physics-trials">
        {#each physTrials as trial}<span><b>{stage.kind === 'mass-push' ? `${trial.mass} kg` : `${trial.force} N`}</b><i>{trial.acceleration} m/s²</i><small>{trial.distance} m</small></span>{/each}
      </div>
    {/if}
    <p class="hint">{stage.kind === 'mass-push' ? 'The force is 6 N. Only the mass changes.' : 'The mass is 2 kg. Only the force changes.'} Every push lasts one second. Friction is off.</p>
  </div>

{:else if stage.kind === 'rise-run-line' || stage.kind === 'rise-run-ghost' || stage.kind === 'slope-ratio' || stage.kind === 'slope-triangles' || stage.kind === 'slope-sign' || stage.kind === 'slope-target'}
  {@const pts = { x0: 54, y0: 124, x1: 54 + lineRun * 38, y1: 124 - lineRise * 22 }}
  <div class="st centre">
    {#if stage.kind === 'slope-target'}<p class="target">TARGET SLOPE <b>1</b></p>{/if}
    <svg class="plot" viewBox="0 0 300 170" role="img" aria-label={`Line with run ${lineRun}, rise ${lineRise}, slope ${slope()}`}>
      <path class="axis" d="M20 146H282M36 12V158"/>
      {#each [0, 1, 2, 3, 4, 5, 6] as n}<line class="gridline" x1={36 + n * 38} y1="14" x2={36 + n * 38} y2="154"/>{/each}
      {#each [24, 46, 68, 90, 112, 134] as y}<line class="gridline" x1="24" y1={y} x2="280" y2={y}/>{/each}
      {#if stage.kind === 'rise-run-ghost'}<line class="ghost-line" x1={pts.x0} y1={pts.y0} x2={pts.x1} y2={pts.y0 - previousRise * 22}/>{/if}
      <line class="main-line" x1={pts.x0} y1={pts.y0} x2={pts.x1} y2={pts.y1}/>
      <line class="run-line" x1={pts.x0} y1={pts.y0} x2={pts.x1} y2={pts.y0}/>
      <line class="rise-line" x1={pts.x1} y1={pts.y0} x2={pts.x1} y2={pts.y1}/>
      {#if stage.kind === 'slope-triangles'}<path class="small-triangle" d={`M${pts.x0} ${pts.y0} H${pts.x0 + (pts.x1-pts.x0)/2} V${pts.y0 - lineRise * 11}`}/>{/if}
      <circle class="dot" cx={pts.x0} cy={pts.y0} r="5"/><circle class="dot" cx={pts.x1} cy={pts.y1} r="5"/>
    </svg>
    <div class="line-controls">
      <span><small>RUN</small><button aria-label="Decrease run" on:click={() => changeLine('run', -1)}>−</button><b>{lineRun}</b><button aria-label="Increase run" on:click={() => changeLine('run', 1)}>+</button></span>
      <span><small>RISE</small><button aria-label="Decrease rise" on:click={() => changeLine('rise', -1)}>−</button><b>{lineRise}</b><button aria-label="Increase rise" on:click={() => changeLine('rise', 1)}>+</button></span>
    </div>
    <div class="ratio-read"><span>{lineRise}</span><i>÷</i><span>{lineRun}</span><i>=</i><b class:hit={stage.kind === 'slope-target' && slope() === 1}>{Number(slope().toFixed(2))}</b></div>
    {#if stage.kind === 'slope-sign'}<p class="hint">{lineRise > 0 ? 'Rises left to right · positive' : lineRise < 0 ? 'Falls left to right · negative' : 'Level · zero'}</p>{/if}
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
  .advance { align-self: flex-start; border: 1px solid var(--qx-accent); background: var(--qx-accent-soft); color: var(--qx-accent-text); border-radius: 10px; padding: 8px 12px; font-weight: 800; cursor: pointer; }
  .advance:disabled { opacity: .45; cursor: default; }
  .plot { width: 100%; max-width: 390px; height: auto; }
  .axis { fill: none; stroke: var(--qx-text-dim); stroke-width: 1.7; }
  .gridline { stroke: var(--qx-border); stroke-width: .7; }
  .dot { fill: var(--qx-accent); }
  .coordinate-grid { display: grid; grid-template-columns: repeat(7, 1fr); position: relative; width: 100%; max-width: 390px; margin-bottom: 18px; border: 1px solid var(--qx-border-2); background: var(--qx-surface); }
  .coordinate-grid button { position: relative; min-width: 0; height: 30px; padding: 0; border: 0; border-right: 1px solid var(--qx-border); border-bottom: 1px solid var(--qx-border); border-radius: 0; background: transparent; color: var(--qx-accent-text); cursor: crosshair; font-size: 15px; }
  .coordinate-grid button:hover, .coordinate-grid button:focus { background: var(--qx-accent-soft); outline: 2px solid var(--qx-accent); outline-offset: -2px; }
  .coordinate-grid button.x-axis { border-bottom: 2px solid var(--qx-text); }
  .coordinate-grid button.y-axis { border-right: 2px solid var(--qx-text); }
  .coordinate-grid button.hit { background: var(--qx-accent-soft); font-weight: 900; }
  .coordinate-grid button small { position: absolute; left: 3px; top: 3px; color: var(--qx-text-faint); font-size: 8px; }
  .coordinate-labels { position: absolute; left: 0; right: 0; bottom: -16px; display: grid; grid-template-columns: repeat(7, 1fr); color: var(--qx-text-faint); font-size: 8px; text-align: center; }
  .drill-result { margin-top: 16px; }
  .drill-status { width: 100%; max-width: 390px; display: flex; align-items: baseline; justify-content: space-between; gap: 10px; }
  .drill-status span, .drill-status strong { font-size: 13px; }
  .drill-status small { font-size: 10px; color: var(--qx-text-faint); }
  .curve { fill: none; stroke: var(--qx-green); stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }
  .main-line { stroke: var(--qx-accent); stroke-width: 3; stroke-linecap: round; }
  .ghost-line { stroke: var(--qx-text-faint); stroke-width: 2; stroke-dasharray: 5 4; }
  .run-line { stroke: var(--qx-green); stroke-width: 2; }
  .rise-line { stroke: var(--qx-danger); stroke-width: 2; }
  .small-triangle { fill: none; stroke: var(--qx-text-faint); stroke-width: 1.5; stroke-dasharray: 4 3; }
  .line-controls { display: flex; gap: 9px; flex-wrap: wrap; justify-content: center; }
  .line-controls span { display: flex; align-items: center; gap: 6px; border: 1px solid var(--qx-border-2); border-radius: 9px; padding: 5px 7px; }
  .line-controls small { font-size: 8.5px; letter-spacing: .08em; color: var(--qx-text-faint); font-weight: 900; }
  .line-controls button { width: 28px; height: 28px; border: 1px solid var(--qx-border-2); border-radius: 7px; background: transparent; color: var(--qx-text); cursor: pointer; }
  .line-controls b { min-width: 18px; text-align: center; color: var(--qx-accent-text); }
  .ratio-read { display: flex; align-items: center; gap: 7px; font-size: 17px; }
  .ratio-read i { font-style: normal; color: var(--qx-text-faint); }
  .ratio-read b { color: var(--qx-accent-text); font-size: 23px; }
  .ratio-read b.hit { color: var(--qx-green-text); }
  .target { margin: 0; font-size: 9px; letter-spacing: .1em; color: var(--qx-text-faint); font-weight: 900; }
  .target b { color: var(--qx-accent-text); font-size: 18px; margin-left: 5px; }

  .physics-stage { width: 100%; }
  .physics-constant { display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap; border: 1px solid var(--qx-green); border-radius: 11px; padding: 8px 11px; background: var(--qx-green-soft); }
  .physics-constant small { color: var(--qx-green-text); font-size: 8px; letter-spacing: .09em; font-weight: 900; }
  .physics-constant b { color: var(--qx-green-text); font-size: 19px; }
  .physics-constant span { color: var(--qx-text-dim); font-size: 10px; }
  .physics-track { position: relative; width: min(100%, 560px); height: 170px; overflow: hidden; border: 1px solid var(--qx-border-2); border-radius: 14px; background: linear-gradient(to bottom, var(--qx-surface-2) 0 71%, var(--qx-surface-3) 71% 100%); }
  .physics-ground { position: absolute; left: 0; right: 0; top: 121px; height: 2px; background: var(--qx-text-faint); }
  .physics-track > small { position: absolute; left: 18%; top: 129px; color: var(--qx-text-faint); font-size: 8px; letter-spacing: .1em; font-weight: 900; transform: translateX(-50%); }
  .physics-person { position: absolute; left: 4%; top: 51px; width: 54px; height: 72px; transition: transform .15s ease; }
  .physics-person i { position: absolute; left: 16px; top: 0; width: 19px; height: 19px; border: 3px solid var(--qx-accent); border-radius: 50%; }
  .physics-person b { position: absolute; left: 26px; top: 22px; width: 3px; height: 31px; background: var(--qx-accent); }
  .physics-person em { position: absolute; left: 27px; top: 29px; width: 33px; height: 3px; background: var(--qx-accent); transform: rotate(8deg); transform-origin: left center; }
  .physics-person span { position: absolute; left: 27px; top: 51px; width: 29px; height: 3px; background: var(--qx-accent); transform: rotate(55deg); transform-origin: left center; }
  .physics-person span + span { transform: rotate(125deg); }
  .physics-person.push { transform: translateX(4px) rotate(3deg); }
  .physics-arrow { position: absolute; left: 11%; top: 40px; height: 3px; width: var(--arrow); background: var(--qx-accent); }
  .physics-arrow::after { content: ''; position: absolute; right: -1px; top: -4px; border-left: 8px solid var(--qx-accent); border-top: 5px solid transparent; border-bottom: 5px solid transparent; }
  .physics-arrow span { position: absolute; left: 50%; bottom: 7px; white-space: nowrap; transform: translateX(-50%); color: var(--qx-accent-text); font-size: 10px; font-weight: 900; }
  .physics-block { position: absolute; left: calc(18% + var(--travel)); top: 76px; width: 48px; height: 46px; display: grid; place-items: center; border: 2px solid var(--qx-accent); border-radius: 5px; background: var(--qx-accent-soft); color: var(--qx-accent-text); transition: left .9s cubic-bezier(.55,.05,.92,.45); }
  .physics-block b { font-size: 12px; }
  .physics-picks { display: flex; gap: 7px; flex-wrap: wrap; justify-content: center; }
  .physics-picks button { min-width: 64px; min-height: 44px; border: 1px solid var(--qx-border-2); border-radius: 10px; background: var(--qx-surface); color: var(--qx-text); font-weight: 900; cursor: pointer; }
  .physics-picks button.on { border-color: var(--qx-accent); background: var(--qx-accent-soft); color: var(--qx-accent-text); }
  .physics-run { min-height: 44px; border: 0; border-radius: 11px; padding: 9px 17px; background: var(--qx-accent); color: #fff; font-size: 11px; letter-spacing: .06em; font-weight: 900; cursor: pointer; }
  .physics-run:disabled { opacity: .65; cursor: default; }
  .physics-readouts { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; }
  .physics-readouts span { min-width: 82px; border: 1px solid var(--qx-border); border-radius: 9px; padding: 7px 9px; display: flex; flex-direction: column; gap: 2px; background: var(--qx-surface-2); }
  .physics-readouts small { color: var(--qx-text-faint); font-size: 7.5px; letter-spacing: .08em; font-weight: 900; }
  .physics-readouts b { color: var(--qx-text); font-size: 13px; }
  .physics-bars { width: min(100%, 390px); display: flex; flex-direction: column; gap: 6px; }
  .physics-bars span { display: grid; grid-template-columns: 76px 1fr 58px; align-items: center; gap: 7px; }
  .physics-bars small { color: var(--qx-text-faint); font-size: 9px; font-weight: 800; }
  .physics-bars i { display: block; height: 10px; max-width: 100%; border-radius: 5px; background: var(--qx-accent); }
  .physics-bars span + span i { background: var(--qx-green); }
  .physics-bars b { color: var(--qx-text); font-size: 10px; }
  .physics-result { margin: 0; border-radius: 9px; padding: 7px 10px; background: var(--qx-surface-2); color: var(--qx-text-2); font-size: 12px; font-weight: 800; }
  .physics-result.success { background: var(--qx-green-soft); color: var(--qx-green-text); }
  .physics-trials { display: flex; gap: 7px; flex-wrap: wrap; justify-content: center; }
  .physics-trials span { display: grid; grid-template-columns: auto auto; gap: 2px 7px; border: 1px solid var(--qx-border-2); border-radius: 9px; padding: 6px 9px; }
  .physics-trials b { color: var(--qx-accent-text); font-size: 12px; }
  .physics-trials i { color: var(--qx-text); font-size: 11px; font-style: normal; }
  .physics-trials small { grid-column: 1 / -1; color: var(--qx-text-faint); font-size: 9px; }
  .mass-race { width: min(100%, 560px); display: grid; gap: 8px; border: 1px solid var(--qx-border-2); border-radius: 14px; padding: 10px; background: var(--qx-surface-2); }
  .mass-lane { position: relative; min-height: 88px; overflow: hidden; border-radius: 9px; background: var(--qx-surface); }
  .mass-lane > strong { position: absolute; left: 10px; top: 35px; color: var(--qx-accent-text); font-size: 12px; }
  .mass-lane > span { position: absolute; right: 9px; top: 7px; color: var(--qx-text-dim); font-size: 10px; font-weight: 900; }
  .mass-ground { position: absolute; left: 64px; right: 12px; top: 59px; height: 2px; background: var(--qx-text-faint); }
  .mass-ground i { position: absolute; left: 7px; bottom: 7px; color: var(--qx-accent-text); font-size: 9px; font-style: normal; font-weight: 900; }
  .mass-block { position: absolute; left: 64px; top: 28px; width: var(--mass-width); height: 32px; display: grid; place-items: center; border: 2px solid var(--qx-accent); border-radius: 5px; background: var(--qx-accent-soft); color: var(--qx-accent-text); transition: left .9s cubic-bezier(.55,.05,.92,.45); }
  .mass-block.moved { left: calc(64px + var(--race-travel)); }
  .mass-block b { font-size: 10px; }
</style>
