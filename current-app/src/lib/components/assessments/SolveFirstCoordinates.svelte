<script>
  // Find the Signal — a Solve First coordinate navigation game.
  //
  // The learner flies a locator drone across a blacked-out rescue map and, one
  // control at a time, discovers how two ordered movements pin an exact place.
  // Chapters:
  //   1 oneline    one tunnel; observe home / east / west (>=3 distinct runs)
  //   2 column     one number finds a column, not a point -> restore 2nd control
  //   3 order      build two complete routes, horizontal first and vertical second
  //   4 sectors    recover a signal in each of the four sign regions
  //   5 warehouse  transfer the same route-building rule to a robot
  //   6 reveal     only now: number line, origin, x/y axes, ordered pair, quadrants
  // No formal vocabulary before the reveal. A tap-through solved route makes
  // the assignment's input, route, target and output explicit. No timer.
  // Lucky single hits never skip the contrasting-evidence gates.
  import { fly, fade } from 'svelte/transition';
  import ArcadeShell from './ArcadeShell.svelte';
  import SignalGrid from './SignalGrid.svelte';
  import { playAward, playBonus } from '../../sfx.js';

  export let config;
  export let onDone = () => {};
  export let onExit = () => {};

  const clamp = (v) => Math.max(-4, Math.min(4, v));
  function radarStatus(drone, targets) {
    if (!drone) return 'SCANNING';
    const distance = Math.min(...targets.map((target) => Math.hypot(drone.x - target.x, drone.y - target.y)));
    if (distance === 0) return 'LOCKED';
    if (distance <= 1.5) return 'HOT';
    if (distance <= 3) return 'NEAR';
    return 'FAINT';
  }

  let phase = 'brief';
  let usedHint = false;
  let activeHint = '';
  let recorded = false;
  let arcadeScore = 0;
  let combo = 0;
  let attempts = 0;
  let awarded = new Set();

  // Worked example shown before the assignment. Tapping the solved radar
  // isolates one layer at a time so the learner sees input -> route -> output.
  const DEMO_STEPS = [
    {
      id: 'start',
      label: 'Start',
      title: 'Begin at home',
      body: 'Every route starts from the centre marker. This is the reference point for both moves.'
    },
    {
      id: 'first',
      label: 'Move 1',
      title: 'Move sideways first',
      body: 'The first control moves the locator 3 spaces east. The first number records that move.'
    },
    {
      id: 'second',
      label: 'Move 2',
      title: 'Then move vertically',
      body: 'The second control moves 2 spaces north. The order matters: sideways, then up or down.'
    },
    {
      id: 'target',
      label: 'Target',
      title: 'Lock onto the signal',
      body: 'The two moves meet at one exact place. A correct route changes the beacon from scanning to locked.'
    },
    {
      id: 'output',
      label: 'Output',
      title: 'Record the finished code',
      body: 'The completed output is (+3, +2): first move 3 east, second move 2 north.'
    }
  ];
  let demoIndex = 0;
  let demoVisited = new Set(['start']);
  $: demoStep = DEMO_STEPS[demoIndex];
  $: demoExplored = demoVisited.size;

  function setDemo(index) {
    demoIndex = index;
    demoVisited = new Set([...demoVisited, DEMO_STEPS[index].id]);
  }

  function cycleDemo() {
    setDemo((demoIndex + 1) % DEMO_STEPS.length);
  }

  // chapter 1 — one tunnel
  let ew1 = 0;
  let drone1 = null;
  let runs1 = [];
  let seen1 = { home: false, east: false, west: false };
  let signedShown = false;
  const EAST_RELAY = 3, WEST_RELAY = -2;
  $: line1Ready = seen1.home && seen1.east && seen1.west && runs1.length >= 3;

  // chapter 2 — column vs point
  let ew2 = 0, ns2 = 0;
  let drone2 = null;
  let columnProbed = false;
  let secondControlOn = false;
  let columnSolved = false;
  const COL2_X = 2, COL2_TARGET = { x: 2, y: 3 }, COL2_DECOY = { x: 2, y: -2 };

  // chapter 3 — build the route in a consistent order
  let first3 = 0, second3 = 0;
  let drone3 = null, trace3 = [];
  let gotA = false, gotB = false;
  $: build3Ready = gotA && gotB;

  // chapter 4 — four sectors
  let ew4 = 0, ns4 = 0;
  let drone4 = null;
  const SECTORS = [
    { key: 'aurora', label: 'Aurora', x: 3, y: 2, clue: 'Aurora: 3 east, 2 north.' },
    { key: 'boreal', label: 'Boreal', x: -2, y: 3, clue: 'Boreal: 2 west, 3 north.' },
    { key: 'cinder', label: 'Cinder', x: -3, y: -2, clue: 'Cinder: 3 west, 2 south.' },
    { key: 'delta', label: 'Delta', x: 2, y: -3, clue: 'Delta: 2 east, 3 south.' }
  ];
  let found4 = {};
  let miss4 = 0;
  $: sectors4Ready = SECTORS.every((s) => found4[s.key]);

  // chapter 5 — warehouse transfer
  let aisle = 0, shelf = 0;
  const CRATES = [
    { key: 'c1', label: 'Crate A', x: 2, y: 1, printed: { a: 2, s: 1 } },
    { key: 'c2', label: 'Crate B', x: 3, y: -1, printed: { a: 3, s: -1 } },
    { key: 'c3', label: 'Crate C', x: -2, y: 2, printed: { a: -2, s: 2 } }
  ];
  let retrieved = {};
  let crateTries = {};
  let crateMsg = '';
  // final route builds
  const REVERSE_BIN = { x: -1, y: 3 };
  const REVERSE_OPTIONS = [
    { key: 'r1', a: 1, s: 3 },
    { key: 'r2', a: -1, s: 3 },   // correct
    { key: 'r3', a: -3, s: 1 }
  ];
  let reversePick = '';
  let reverseTries = 0;
  let routePick = '';
  let routeTries = 0;
  $: cratesDone = CRATES.every((c) => retrieved[c.key]);
  $: reverseDone = reversePick === 'r2';
  $: routeDone = routePick === 'plus3-minus4';
  $: warehouseReady = cratesDone && reverseDone && routeDone;
  $: transferFirstTry =
    warehouseReady &&
    CRATES.every((c) => crateTries[c.key] === 1) &&
    reverseTries === 1 &&
    routeTries === 1;

  // reward
  $: evidenceScore = runs1.length >= 4 && miss4 <= 2 ? 4 : 3;
  $: reward = Math.min(15, 6 + evidenceScore + (transferFirstTry ? 3 : 1) + (usedHint ? 0 : 2));
  $: rank = arcadeScore >= 9000 ? 'S' : arcadeScore >= 6500 ? 'A' : arcadeScore >= 4000 ? 'B' : 'C';

  function bump(setter, val, delta) { return clamp(val + delta); }
  function showHint(key) { usedHint = true; activeHint = activeHint === key ? '' : key; }
  function award(key, points, major = false) {
    if (awarded.has(key)) {
      arcadeScore += 20;
      return;
    }
    awarded = new Set([...awarded, key]);
    combo += 1;
    arcadeScore += points * Math.max(1, combo);
    if (major) playBonus();
    else playAward();
  }
  function miss(penalty = 25) {
    combo = 0;
    arcadeScore = Math.max(0, arcadeScore - penalty);
  }

  // ---- chapter 1 ----
  function send1() {
    attempts += 1;
    drone1 = { x: ew1, y: 0 };
    const dir = ew1 === 0 ? 'home' : ew1 > 0 ? 'east' : 'west';
    const hit = ew1 === EAST_RELAY ? 'East relay' : ew1 === WEST_RELAY ? 'West relay' : null;
    runs1 = [...runs1, { ew: ew1, dir, landed: ew1, hit }];
    seen1 = { ...seen1, [dir]: true };
    award(`tunnel-${dir}`, hit ? 180 : 100, !!hit);
    if (seen1.home && seen1.east && seen1.west) signedShown = true;
  }

  // ---- chapter 2 ----
  function probeColumn() {
    attempts += 1;
    drone2 = { x: ew2, y: 0 };
    columnProbed = ew2 === COL2_X;
    if (columnProbed) award('column', 300, true);
    else miss();
  }
  function restoreSecond() { secondControlOn = true; }
  function send2() {
    attempts += 1;
    drone2 = { x: ew2, y: ns2 };
    if (ew2 === COL2_TARGET.x && ns2 === COL2_TARGET.y) {
      columnSolved = true;
      award('exact-point', 450, true);
    } else {
      miss();
    }
  }

  // ---- chapter 3 ----
  function send3() {
    attempts += 1;
    drone3 = { x: first3, y: second3 };
    trace3 = [{ x: 0, y: 0 }, { x: first3, y: 0 }, { x: first3, y: second3 }];
    if (first3 === 3 && second3 === 1) {
      gotA = true;
      award('order-a', 400);
    } else if (first3 === -2 && second3 === 3) {
      gotB = true;
      award('order-b', 400);
    } else {
      miss();
    }
  }

  // ---- chapter 4 ----
  function send4() {
    attempts += 1;
    drone4 = { x: ew4, y: ns4 };
    const hit = SECTORS.find((s) => s.x === ew4 && s.y === ns4);
    if (hit) {
      found4 = { ...found4, [hit.key]: true };
      award(`sector-${hit.key}`, 450, true);
    } else {
      miss4 += 1;
      miss();
    }
  }

  // ---- chapter 5 ----
  function retrieve(crate) {
    attempts += 1;
    const ok = aisle === crate.x && shelf === crate.y;
    crateTries = { ...crateTries, [crate.key]: (crateTries[crate.key] || 0) + 1 };
    if (ok) {
      retrieved = { ...retrieved, [crate.key]: true };
      crateMsg = `${crate.label} retrieved.`;
      award(`crate-${crate.key}`, 500);
    } else {
      miss(35);
      const aisleWrong = aisle !== crate.x;
      const shelfWrong = shelf !== crate.y;
      crateMsg = aisleWrong && shelfWrong
        ? 'Both the aisle and the shelf are wrong.'
        : aisleWrong ? 'Right shelf, wrong aisle.' : 'Right aisle, wrong shelf.';
    }
  }
  function pickReverse(key) {
    if (reversePick === key) return;
    attempts += 1;
    reverseTries += 1;
    reversePick = key;
    if (key === 'r2') award('reverse', 650, true);
    else miss(40);
  }
  function pickRoute(key) {
    if (routePick === key) return;
    attempts += 1;
    routeTries += 1;
    routePick = key;
    if (key === 'plus3-minus4') award('displacement', 900, true);
    else miss(50);
  }

  function finishDiscovery() {
    if (!warehouseReady) return;
    phase = 'reveal';
    if (!recorded) {
      recorded = true;
      onDone({
        id: config.id,
        reward,
        evidenceCount: runs1.length + Object.keys(found4).length,
        patternFound: true,
        compared: true,
        transferFirstTry,
        usedHint,
        arcadeScore,
        arcadeRank: rank,
        attempts
      });
    }
  }

  function restart() {
    phase = 'brief'; usedHint = false; activeHint = ''; recorded = false;
    demoIndex = 0; demoVisited = new Set(['start']);
    ew1 = 0; drone1 = null; runs1 = []; seen1 = { home: false, east: false, west: false }; signedShown = false;
    ew2 = 0; ns2 = 0; drone2 = null; columnProbed = false; secondControlOn = false; columnSolved = false;
    first3 = 0; second3 = 0; drone3 = null; trace3 = []; gotA = false; gotB = false;
    ew4 = 0; ns4 = 0; drone4 = null; found4 = {}; miss4 = 0;
    aisle = 0; shelf = 0; retrieved = {}; crateTries = {}; crateMsg = ''; reversePick = ''; reverseTries = 0; routePick = ''; routeTries = 0;
    arcadeScore = 0; combo = 0; attempts = 0; awarded = new Set();
  }

  const PHASES = ['oneline', 'column', 'order', 'sectors', 'warehouse', 'reveal'];
  $: phaseIndex = phase === 'brief' ? 0 : PHASES.indexOf(phase) + 1;
  $: arcadeLevel = phase === 'reveal' ? 5 : Math.min(5, phaseIndex);
</script>

<div class="solve-first">
  <ArcadeShell
    eyebrow={`${config.eyebrow} · Arcade mission`}
    title="Find the Signal"
    level={arcadeLevel}
    totalLevels={5}
    score={arcadeScore}
    streak={combo}
    {onExit}
  >
  {#key phase}
    <section class="phase" in:fly={{ x: 28, duration: 240 }} out:fade={{ duration: 90 }}>

      {#if phase === 'brief'}
        <div class="brief">
          <div class="micro-label">Underground rescue · Worked example</div>
          <h2>Find the Signal</h2>
          <p class="brief-lede">First, inspect one completed rescue. Then use the same two-move system to rebuild the missing map yourself.</p>
          <button class="skip-example" on:click={() => phase = 'oneline'}>
            Already know this? Skip example · Start Level 1 →
          </button>

          <div class="assignment-summary">
            <div>
              <span>Objective</span>
              <strong>Turn two signed moves into one exact location.</strong>
              <small>Use that rule to find beacons and route a warehouse robot.</small>
            </div>
            <div>
              <span>Total output</span>
              <strong>A verified rescue map.</strong>
              <small>5 levels · 4 sector signals · 3 crates · 2 final route checks.</small>
            </div>
          </div>

          <section class="worked-example" aria-labelledby="worked-example-title">
            <div class="worked-head">
              <div>
                <span>Solved sample</span>
                <strong id="worked-example-title">3 east, then 2 north</strong>
              </div>
              <b>{demoExplored}/{DEMO_STEPS.length} explored</b>
            </div>

            <button
              type="button"
              class={`demo-radar focus-${demoStep.id}`}
              on:click={cycleDemo}
              aria-label={`Solved radar. ${demoStep.title}. Tap to highlight the next layer.`}
            >
              <span class="demo-grid" aria-hidden="true"></span>
              <span class="demo-axis horizontal" aria-hidden="true"></span>
              <span class="demo-axis vertical" aria-hidden="true"></span>
              <span class="demo-part demo-origin"><i></i><b>HOME</b></span>
              <span class="demo-part demo-first"><i></i><b>+3 EAST</b></span>
              <span class="demo-part demo-second"><i></i><b>+2 NORTH</b></span>
              <span class="demo-part demo-target"><i></i><b>SIGNAL</b></span>
              <span class="demo-tap">Tap radar to explain</span>
            </button>

            <div class="demo-tabs" aria-label="Solved example layers">
              {#each DEMO_STEPS as step, index}
                <button
                  type="button"
                  class:active={demoIndex === index}
                  class:visited={demoVisited.has(step.id)}
                  on:click={() => setDemo(index)}
                >{step.label}</button>
              {/each}
            </div>

            <div class="demo-explanation" aria-live="polite">
              <span>{String(demoIndex + 1).padStart(2, '0')}</span>
              <div>
                <strong>{demoStep.title}</strong>
                <p>{demoStep.body}</p>
              </div>
            </div>

            <div class="sample-output" class:active={demoStep.id === 'output'}>
              <span>Input</span><b>3 east → 2 north</b>
              <span>Output</span><strong>(+3, +2) · SIGNAL LOCKED</strong>
            </div>
          </section>

          <div class="brief-rules">
            <span>Free retries</span>
            <span>No timer</span>
            <span>Formal names come last</span>
          </div>
          <button class="primary start-mission" on:click={() => phase = 'oneline'}>Start Level 1 · Find both relays</button>
        </div>

      {:else if phase === 'oneline'}
        <div class="section-title">
          <span>Control 01 · One tunnel</span>
          <h2>Reach both relays</h2>
          <p>The drone can move along one tunnel through home. Two maintenance relays sit on opposite sides. Find each, and find home.</p>
        </div>

        <SignalGrid drone={drone1} mode={signedShown ? 'signed' : 'plain'}
          scanStatus={radarStatus(drone1, [{ x: EAST_RELAY, y: 0 }, { x: WEST_RELAY, y: 0 }])}
          signals={[{ x: EAST_RELAY, y: 0, label: 'East relay', found: seen1.east && drone1?.x === EAST_RELAY },
                    { x: WEST_RELAY, y: 0, label: 'West relay', found: seen1.west && drone1?.x === WEST_RELAY }]}
          caption={drone1 ? `Drone ${drone1.x === 0 ? 'at home' : drone1.x > 0 ? drone1.x + ' east' : (-drone1.x) + ' west'}` : 'Drone at home'} />

        <div class="readout">
          <span>Command</span>
          <strong>{signedShown ? (ew1 > 0 ? `+${ew1}` : ew1) : (ew1 === 0 ? 'home' : ew1 > 0 ? `${ew1} east` : `${-ew1} west`)}</strong>
        </div>

        <div class="controls one">
          <div class="control">
            <span>Move along the tunnel</span>
            <strong>{ew1 === 0 ? 'home' : ew1 > 0 ? `${ew1} E` : `${-ew1} W`}</strong>
            <div>
              <button on:click={() => ew1 = bump('ew1', ew1, -1)} disabled={ew1 === -4} aria-label="Step west">−</button>
              <button on:click={() => ew1 = bump('ew1', ew1, 1)} disabled={ew1 === 4} aria-label="Step east">+</button>
            </div>
          </div>
        </div>

        <button class="test-button" on:click={send1}>Send locator</button>

        <div class="evidence">
          <div class="evidence-head"><strong>Search log</strong><span>{runs1.length} sent</span></div>
          <div class="evidence-classes">
            {#each [{ k: 'west', t: 'West of home' }, { k: 'home', t: 'Home' }, { k: 'east', t: 'East of home' }] as c}
              <div class:got={seen1[c.k]}><b>{seen1[c.k] ? '✓' : '—'}</b><span>{c.t}</span></div>
            {/each}
          </div>
          {#if runs1.length}
            <ul class="run-list">
              {#each runs1.slice(-3).reverse() as r}
                <li class:hit={r.hit}><span>{r.dir === 'home' ? 'home' : r.dir === 'east' ? r.landed + ' E' : (-r.landed) + ' W'}</span><strong>{r.hit ? r.hit + ' ✓' : 'no relay here'}</strong></li>
              {/each}
            </ul>
          {/if}
        </div>

        {#if runs1.length > 0 && !line1Ready}
          <div class="nudge">Keep going — reach a place east of home, a place west of home, and home itself. One relay hit is not enough.</div>
        {/if}
        <button class="hint-link" on:click={() => showHint('one')}>{activeHint === 'one' ? 'Hide clue' : 'Need a clue?'}</button>
        {#if activeHint === 'one'}<div class="hint">Test one place on each side of home, then return exactly to home.</div>{/if}
        <button class="primary" disabled={!line1Ready} on:click={() => phase = 'column'}>
          {line1Ready ? 'One number, one line · Next' : 'Reach east, west and home'}
        </button>

      {:else if phase === 'column'}
        <div class="section-title">
          <span>Problem · One number is not enough</span>
          <h2>Two signals, one column</h2>
          <p>Two signals sit in the same column, one higher than the other. Try the single control first.</p>
        </div>

        <SignalGrid drone={drone2} mode="signed" showColumn={columnProbed && !secondControlOn ? COL2_X : null}
          scanStatus={radarStatus(drone2, [COL2_TARGET])}
          signals={[{ x: COL2_TARGET.x, y: COL2_TARGET.y, label: 'Upper', found: columnSolved },
                    { x: COL2_DECOY.x, y: COL2_DECOY.y, label: 'Lower', faint: true }]}
          caption={secondControlOn ? 'Two controls active' : 'One control only'} />

        {#if !secondControlOn}
          <div class="controls one">
            <div class="control">
              <span>Move along the tunnel</span>
              <strong>{ew2 > 0 ? `+${ew2}` : ew2}</strong>
              <div>
                <button on:click={() => ew2 = clamp(ew2 - 1)} disabled={ew2 === -4} aria-label="Step west">−</button>
                <button on:click={() => ew2 = clamp(ew2 + 1)} disabled={ew2 === 4} aria-label="Step east">+</button>
              </div>
            </div>
          </div>
          <button class="test-button" on:click={probeColumn}>Send locator</button>
          {#if columnProbed}
            <div class="report">Column found. <strong>Level unknown.</strong> One number cannot separate two signals stacked in the same column.</div>
            <button class="primary" on:click={restoreSecond}>Restore the second control</button>
          {:else}
            <div class="nudge">Move to the column both signals share, then send the locator.</div>
          {/if}
        {:else}
          <div class="controls two">
            <div class="control">
              <span>First move (E/W)</span>
              <strong>{ew2 > 0 ? `+${ew2}` : ew2}</strong>
              <div>
                <button on:click={() => ew2 = clamp(ew2 - 1)} disabled={ew2 === -4} aria-label="First move west">−</button>
                <button on:click={() => ew2 = clamp(ew2 + 1)} disabled={ew2 === 4} aria-label="First move east">+</button>
              </div>
            </div>
            <div class="control">
              <span>Second move (N/S)</span>
              <strong>{ns2 > 0 ? `+${ns2}` : ns2}</strong>
              <div>
                <button on:click={() => ns2 = clamp(ns2 - 1)} disabled={ns2 === -4} aria-label="Second move south">−</button>
                <button on:click={() => ns2 = clamp(ns2 + 1)} disabled={ns2 === 4} aria-label="Second move north">+</button>
              </div>
            </div>
          </div>
          <button class="test-button" on:click={send2}>Send locator</button>
          {#if columnSolved}
            <div class="report ok">Locked on the upper signal. Two independent moves pinned one exact place.</div>
          {:else if drone2}
            <div class="nudge">Closer. Now set the second move so the drone reaches the upper signal, not just its column.</div>
          {/if}
          <button class="primary" disabled={!columnSolved} on:click={() => phase = 'order'}>
            {columnSolved ? 'Two numbers, one point · Next' : 'Reach the upper signal'}
          </button>
        {/if}

      {:else if phase === 'order'}
        <div class="section-title">
          <span>Build 03 · Two complete routes</span>
          <h2>Build every location the same way</h2>
          <p>Start at home. Set the horizontal move first, then the vertical move. Send each completed route to its signal.</p>
        </div>

        <SignalGrid drone={drone3} mode="signed" trace={trace3}
          scanStatus={radarStatus(drone3, [{ x: 3, y: 1 }, { x: -2, y: 3 }])}
          signals={[{ x: 3, y: 1, label: 'Signal A', found: gotA }, { x: -2, y: 3, label: 'Signal B', found: gotB }]}
          caption="Route builder" />

        <div class="route-rule" aria-label="Route order">
          <span><b>1</b> Horizontal</span>
          <i>→</i>
          <span><b>2</b> Vertical</span>
          <i>→</i>
          <strong>Exact location</strong>
        </div>

        <div class="code-card">
          <span class="slot-label">1 · Horizontal move (west/east)</span>
          <div class="slot">
            <button on:click={() => first3 = clamp(first3 - 1)} disabled={first3 === -4} aria-label="Horizontal move west">−</button>
            <strong>{first3 > 0 ? `+${first3}` : first3}</strong>
            <button on:click={() => first3 = clamp(first3 + 1)} disabled={first3 === 4} aria-label="Horizontal move east">+</button>
          </div>
          <span class="slot-label">2 · Vertical move (south/north)</span>
          <div class="slot">
            <button on:click={() => second3 = clamp(second3 - 1)} disabled={second3 === -4} aria-label="Vertical move south">−</button>
            <strong>{second3 > 0 ? `+${second3}` : second3}</strong>
            <button on:click={() => second3 = clamp(second3 + 1)} disabled={second3 === 4} aria-label="Vertical move north">+</button>
          </div>
        </div>
        <button class="test-button" on:click={send3}>Send locator</button>

        <div class="goal-row">
          <div class:done={gotA}><b>{gotA ? '✓' : '○'}</b> Signal A · 3 east → 1 north</div>
          <div class:done={gotB}><b>{gotB ? '✓' : '○'}</b> Signal B · 2 west → 3 north</div>
        </div>

        <button class="hint-link" on:click={() => showHint('order')}>{activeHint === 'order' ? 'Hide clue' : 'Need a clue?'}</button>
        {#if activeHint === 'order'}<div class="hint">Build Signal A as 3 spaces east, then 1 north. Build Signal B as 2 spaces west, then 3 north.</div>{/if}
        <button class="primary" disabled={!build3Ready} on:click={() => phase = 'sectors'}>
          {build3Ready ? 'Routes built · Recover all four' : 'Build both routes'}
        </button>

      {:else if phase === 'sectors'}
        <div class="section-title">
          <span>Recover · Four sectors</span>
          <h2>One signal in every region</h2>
          <p>The signed code now drives both moves. A rescue signal sits in each of the four regions around home.</p>
        </div>

        <SignalGrid drone={drone4} mode="signed"
          scanStatus={radarStatus(drone4, SECTORS)}
          signals={SECTORS.map((s) => ({ x: s.x, y: s.y, label: s.label, found: !!found4[s.key] }))}
          caption="Four-sector recovery" />

        <div class="sector-grid">
          {#each SECTORS as s}
            <div class:done={found4[s.key]}><b>{found4[s.key] ? '✓' : '○'}</b> {s.label}</div>
          {/each}
        </div>

        {#if !sectors4Ready}
          <div class="clue-strip">{SECTORS.find((s) => !found4[s.key])?.clue}</div>
        {/if}

        <div class="controls two">
          <div class="control">
            <span>First move (E/W)</span>
            <strong>{ew4 > 0 ? `+${ew4}` : ew4}</strong>
            <div>
              <button on:click={() => ew4 = clamp(ew4 - 1)} disabled={ew4 === -4} aria-label="First move west">−</button>
              <button on:click={() => ew4 = clamp(ew4 + 1)} disabled={ew4 === 4} aria-label="First move east">+</button>
            </div>
          </div>
          <div class="control">
            <span>Second move (N/S)</span>
            <strong>{ns4 > 0 ? `+${ns4}` : ns4}</strong>
            <div>
              <button on:click={() => ns4 = clamp(ns4 - 1)} disabled={ns4 === -4} aria-label="Second move south">−</button>
              <button on:click={() => ns4 = clamp(ns4 + 1)} disabled={ns4 === 4} aria-label="Second move north">+</button>
            </div>
          </div>
        </div>
        <button class="test-button" on:click={send4}>Send locator</button>
        {#if drone4 && !SECTORS.some((s) => s.x === drone4.x && s.y === drone4.y) }
          <div class="nudge">No signal there. The clue names the direction and distance for each move.</div>
        {/if}

        <button class="primary" disabled={!sectors4Ready} on:click={() => phase = 'warehouse'}>
          {sectors4Ready ? 'Map restored · Transfer the rule' : `Recover all four (${Object.keys(found4).length}/4)`}
        </button>

      {:else if phase === 'warehouse'}
        <div class="section-title">
          <span>Transfer · Warehouse retrieval</span>
          <h2>Same rule, new machine</h2>
          <p>A warehouse robot uses aisle and shelf moves from its home dock. The bin codes work exactly like your locator codes.</p>
        </div>

        <div class="warehouse" aria-hidden="true">
          <div class="rack" style={`--ax:${aisle}; --sy:${shelf};`}>
            {#each CRATES as c}
              <span class="bin" class:got={retrieved[c.key]} style={`--bx:${c.x}; --by:${c.y};`}>{retrieved[c.key] ? '✓' : c.label[6]}</span>
            {/each}
            <span class="robot" style={`--rx:${aisle}; --ry:${shelf};`}></span>
            <span class="dock">dock</span>
          </div>
        </div>

        <div class="crate-codes">
          {#each CRATES as c}
            <div class:done={retrieved[c.key]}>
              <b>{c.label}</b>
              <small>route: {c.printed.a < 0 ? `${-c.printed.a} left` : `${c.printed.a} right`} → {c.printed.s < 0 ? `${-c.printed.s} down` : `${c.printed.s} up`}</small>
            </div>
          {/each}
        </div>

        <div class="controls two">
          <div class="control">
            <span>Aisle (left/right)</span>
            <strong>{aisle > 0 ? `+${aisle}` : aisle}</strong>
            <div>
              <button on:click={() => aisle = clamp(aisle - 1)} disabled={aisle === -4} aria-label="Aisle left">−</button>
              <button on:click={() => aisle = clamp(aisle + 1)} disabled={aisle === 4} aria-label="Aisle right">+</button>
            </div>
          </div>
          <div class="control">
            <span>Shelf (down/up)</span>
            <strong>{shelf > 0 ? `+${shelf}` : shelf}</strong>
            <div>
              <button on:click={() => shelf = clamp(shelf - 1)} disabled={shelf === -4} aria-label="Shelf down">−</button>
              <button on:click={() => shelf = clamp(shelf + 1)} disabled={shelf === 4} aria-label="Shelf up">+</button>
            </div>
          </div>
        </div>

        <div class="retrieve-row">
          {#each CRATES as c}
            <button class="retrieve-btn" class:done={retrieved[c.key]} disabled={retrieved[c.key]} on:click={() => retrieve(c)}>
              {retrieved[c.key] ? `${c.label} ✓` : `Retrieve ${c.label}`}
            </button>
          {/each}
        </div>
        {#if crateMsg}<div class="report" class:ok={cratesDone}>{crateMsg}</div>{/if}

        {#if cratesDone}
          <div class="reverse">
            <div class="reverse-head">Build the highlighted bin route. Move horizontally first, then vertically.</div>
            <SignalGrid drone={null} mode="signed" scanStatus="TARGET"
              signals={[{ x: REVERSE_BIN.x, y: REVERSE_BIN.y, label: 'this bin', found: true }]}
              caption="Route target" />
            <div class="reverse-options">
              {#each REVERSE_OPTIONS as o}
                <button
                  class:selected={reversePick === o.key}
                  class:correct={reversePick === o.key && o.key === 'r2'}
                  class:wrong={reversePick === o.key && o.key !== 'r2'}
                  on:click={() => pickReverse(o.key)}
                >{o.a < 0 ? `${-o.a} left` : `${o.a} right`} → {o.s < 0 ? `${-o.s} down` : `${o.s} up`}</button>
              {/each}
            </div>
          </div>
        {/if}

        {#if reverseDone}
          <div class="reverse route-challenge">
            <div class="reverse-head">From the robot’s current bin, move 3 aisles right and 4 shelves down. Which route follows those instructions?</div>
            <div class="reverse-options">
              <button
                class:selected={routePick === 'plus1-minus2'}
                class:wrong={routePick === 'plus1-minus2'}
                on:click={() => pickRoute('plus1-minus2')}
              >1 right → 2 down</button>
              <button
                class:selected={routePick === 'plus3-minus4'}
                class:correct={routePick === 'plus3-minus4'}
                on:click={() => pickRoute('plus3-minus4')}
              >3 right → 4 down</button>
              <button
                class:selected={routePick === 'minus3-plus4'}
                class:wrong={routePick === 'minus3-plus4'}
                on:click={() => pickRoute('minus3-plus4')}
              >3 left → 4 up</button>
            </div>
          </div>
        {/if}

        <button class="primary" disabled={!warehouseReady} on:click={finishDiscovery}>
          {warehouseReady ? 'Name the map' : !cratesDone ? 'Retrieve all three crates' : !reverseDone ? 'Build the highlighted route' : 'Build the final route'}
        </button>

      {:else if phase === 'reveal'}
        <div class="reveal">
          <div class="reveal-kicker">The map has a name</div>
          <h2>You rebuilt the coordinate plane.</h2>
          <p>Every control you restored has a formal name. Here is the map you operated.</p>

          <SignalGrid drone={null} mode="formal" scanStatus="RESTORED"
            signals={SECTORS.map((s) => ({ x: s.x, y: s.y, label: s.label, found: true }))}
            caption="Restored coordinate map" />

          <ul class="reveal-list">
            <li>The one tunnel is a <strong>number line</strong>; home is <strong>0</strong>.</li>
            <li>On the two-direction map, home is the <strong>origin</strong>, (0, 0).</li>
            <li>The horizontal direction is the <strong>x-axis</strong>; the vertical is the <strong>y-axis</strong>.</li>
            <li>A two-slot code is an <strong>ordered pair</strong>, (x, y): first horizontal, then vertical.</li>
            <li>The four sign regions are the <strong>quadrants</strong>, I–IV anticlockwise from upper-right.</li>
          </ul>

          <div class="tie-back">
            You built every location in the same order: horizontal first, vertical second. Your sample route—3 east, then 2 north—is written (3, 2) on this map. You also recovered one signal in every sign region; those regions are the four quadrants.
          </div>

          <div class="insight-ladder">
            <strong>What you actually proved</strong>
            <span><b>Evidence:</b> one value fixed only a line; two ordered values fixed one exact location.</span>
            <span><b>Rule:</b> position uses (x, y), while movement between positions uses the change in each coordinate.</span>
            <span><b>Deeper build:</b> from (−1, 3) to (2, −1), the change is (+3, −4). That difference becomes a displacement vector and later powers distance, gradient, and transformations.</span>
          </div>

          <div class="reward-panel">
            <div class="reward-top">
              <div><span>Discovery distinction</span><strong>{config.rewardLabel}</strong></div>
              <b>+{reward} W</b>
            </div>
            <div class="arcade-result">
              <div><span>Arcade score</span><strong>{arcadeScore.toLocaleString()}</strong></div>
              <div><span>Navigator rank</span><strong>{rank}</strong></div>
              <div><span>Searches</span><strong>{attempts}</strong></div>
            </div>
            <div class="reward-skills">
              <span class:earned={sectors4Ready}>Evidence</span>
              <span class:earned={true}>Pattern</span>
              <span class:earned={warehouseReady}>Transfer</span>
              <span class:earned={!usedHint}>Independent</span>
            </div>
            <small>Ws are awarded once. The distinction records how you reasoned—not how quickly you tapped.</small>
          </div>

          <div class="reveal-actions">
            <button class="primary" on:click={onExit}>Return to workshops</button>
            <button class="secondary" on:click={restart}>Play again</button>
          </div>
        </div>
      {/if}
    </section>
  {/key}
  </ArcadeShell>
</div>

<style>
  .solve-first { width: 100%; max-width: 430px; margin: 0 auto; color: var(--qx-text); }
  .phase { min-height: 420px; display: flex; flex-direction: column; }

  .brief { text-align: center; display: flex; flex-direction: column; align-items: center; }
  .micro-label, .section-title > span, .reveal-kicker { color: var(--qx-accent); font-size: 10px; font-weight: 900; letter-spacing: .11em; text-transform: uppercase; }
  h2 { font-size: 24px; line-height: 1.12; margin: 7px 0 9px; font-weight: 950; }
  p { color: var(--qx-text-dim); font-size: 13.5px; line-height: 1.5; margin: 0; }
  .brief-lede { max-width: 40ch; }
  .skip-example {
    min-height: 36px;
    margin-top: 7px;
    padding: 4px 8px;
    border: 0;
    background: transparent;
    color: var(--qx-accent-text);
    font: 850 10.5px/1.2 var(--qx-font);
    text-decoration: underline;
    text-underline-offset: 3px;
    cursor: pointer;
  }
  .brief-rules { display: flex; gap: 5px; flex-wrap: wrap; justify-content: center; margin: 14px 0 12px; }
  .brief-rules span { border: 1px solid var(--qx-border); border-radius: 999px; padding: 5px 9px; font-size: 10px; font-weight: 800; color: var(--qx-text-dim); background: var(--qx-surface-2); }

  .assignment-summary {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin: 16px 0 12px;
    text-align: left;
  }
  .assignment-summary > div {
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 12px;
    border: 1px solid var(--qx-border);
    border-radius: 14px;
    background: var(--qx-surface-2);
  }
  .assignment-summary > div:last-child {
    border-color: color-mix(in srgb, var(--qx-accent) 55%, var(--qx-border));
    background: color-mix(in srgb, var(--qx-accent-soft) 62%, var(--qx-surface));
  }
  .assignment-summary span,
  .worked-head span,
  .sample-output span {
    color: var(--qx-accent-text);
    font-size: 8.5px;
    font-weight: 950;
    letter-spacing: .08em;
    text-transform: uppercase;
  }
  .assignment-summary strong {
    color: var(--qx-text);
    font-size: 12px;
    line-height: 1.3;
  }
  .assignment-summary small {
    color: var(--qx-text-dim);
    font-size: 9.5px;
    line-height: 1.35;
  }

  .worked-example {
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    padding: 12px;
    border: 1px solid var(--qx-border-2);
    border-radius: 18px;
    background: var(--qx-surface);
    box-shadow: var(--qx-shadow-card);
    text-align: left;
  }
  .worked-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 10px;
  }
  .worked-head > div {
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .worked-head strong {
    color: var(--qx-text);
    font-size: 14px;
    line-height: 1.25;
  }
  .worked-head > b {
    flex: 0 0 auto;
    padding: 5px 8px;
    border-radius: 999px;
    background: var(--qx-accent-soft);
    color: var(--qx-accent-text);
    font-size: 8.5px;
    font-variant-numeric: tabular-nums;
  }

  .demo-radar {
    position: relative;
    width: 100%;
    height: 222px;
    overflow: hidden;
    padding: 0;
    border: 1px solid color-mix(in srgb, var(--qx-green) 55%, var(--qx-border));
    border-radius: 16px;
    background:
      radial-gradient(circle at 50% 58%, color-mix(in srgb, var(--qx-green) 10%, transparent), transparent 42%),
      color-mix(in srgb, var(--qx-green-soft) 55%, var(--qx-surface-2));
    color: var(--qx-text);
    font-family: var(--qx-font);
    cursor: pointer;
  }
  .demo-grid {
    position: absolute;
    inset: 0;
    opacity: .34;
    background-image:
      linear-gradient(color-mix(in srgb, var(--qx-green) 42%, transparent) 1px, transparent 1px),
      linear-gradient(90deg, color-mix(in srgb, var(--qx-green) 42%, transparent) 1px, transparent 1px);
    background-size: 12.5% 12.5%;
  }
  .demo-axis {
    position: absolute;
    z-index: 1;
    background: color-mix(in srgb, var(--qx-text) 42%, transparent);
  }
  .demo-axis.horizontal { left: 6%; right: 6%; top: 58%; height: 1px; }
  .demo-axis.vertical { top: 6%; bottom: 8%; left: 50%; width: 1px; }
  .demo-part {
    position: absolute;
    z-index: 3;
    opacity: .28;
    transition: opacity .18s ease, filter .18s ease, transform .18s ease;
  }
  .demo-origin {
    left: 50%;
    top: 58%;
    display: grid;
    justify-items: center;
    transform: translate(-50%, -50%);
  }
  .demo-origin i {
    width: 15px;
    height: 15px;
    border: 3px solid var(--qx-text);
    border-radius: 50%;
    background: var(--qx-surface);
  }
  .demo-origin b {
    margin-top: 6px;
  }
  .demo-first {
    left: 50%;
    top: 58%;
    width: 28%;
    height: 1px;
  }
  .demo-first i {
    position: absolute;
    inset: -2px 0 auto;
    border-top: 4px solid var(--qx-accent);
  }
  .demo-first i::after {
    content: '';
    position: absolute;
    right: -1px;
    top: -6px;
    border: 4px solid transparent;
    border-left: 7px solid var(--qx-accent);
  }
  .demo-first b {
    position: absolute;
    left: 50%;
    top: 9px;
    transform: translateX(-50%);
    white-space: nowrap;
  }
  .demo-second {
    left: 78%;
    top: 28%;
    width: 1px;
    height: 30%;
  }
  .demo-second i {
    position: absolute;
    inset: 0 auto 0 -2px;
    border-left: 4px solid var(--qx-pink);
  }
  .demo-second i::after {
    content: '';
    position: absolute;
    left: -6px;
    top: -1px;
    border: 4px solid transparent;
    border-bottom: 7px solid var(--qx-pink);
  }
  .demo-second b {
    position: absolute;
    right: 8px;
    top: 42%;
    transform: translateY(-50%);
    white-space: nowrap;
  }
  .demo-target {
    left: 78%;
    top: 28%;
    display: grid;
    justify-items: center;
    transform: translate(-50%, -50%);
  }
  .demo-target i {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--qx-green);
    box-shadow: 0 0 0 6px var(--qx-green-soft), 0 0 0 11px color-mix(in srgb, var(--qx-green) 18%, transparent);
  }
  .demo-target b {
    margin-top: 9px;
    color: var(--qx-green-text);
  }
  .demo-part b {
    color: var(--qx-text);
    font-size: 8px;
    font-weight: 950;
    letter-spacing: .05em;
  }
  .demo-tap {
    position: absolute;
    left: 50%;
    bottom: 9px;
    z-index: 4;
    transform: translateX(-50%);
    padding: 5px 9px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--qx-surface) 88%, transparent);
    color: var(--qx-text-dim);
    font-size: 8.5px;
    font-weight: 850;
    white-space: nowrap;
  }
  .demo-radar.focus-start .demo-origin,
  .demo-radar.focus-first .demo-first,
  .demo-radar.focus-second .demo-second,
  .demo-radar.focus-target .demo-target {
    opacity: 1;
    filter: drop-shadow(0 0 7px color-mix(in srgb, var(--qx-accent) 50%, transparent));
  }
  .demo-radar.focus-output .demo-part {
    opacity: .9;
  }

  .demo-tabs {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 5px;
    margin: 9px 0;
  }
  .demo-tabs button {
    min-width: 0;
    min-height: 34px;
    padding: 4px 2px;
    border: 1px solid var(--qx-border);
    border-radius: 9px;
    background: var(--qx-surface-2);
    color: var(--qx-text-faint);
    font: 850 8px var(--qx-font);
    cursor: pointer;
  }
  .demo-tabs button.visited {
    color: var(--qx-text-dim);
    border-color: color-mix(in srgb, var(--qx-green) 45%, var(--qx-border));
  }
  .demo-tabs button.active {
    border-color: var(--qx-accent);
    background: var(--qx-accent-soft);
    color: var(--qx-accent-text);
  }

  .demo-explanation {
    display: grid;
    grid-template-columns: 34px minmax(0, 1fr);
    gap: 10px;
    align-items: start;
    min-height: 67px;
    padding: 10px;
    border-radius: 12px;
    background: var(--qx-surface-2);
  }
  .demo-explanation > span {
    width: 34px;
    height: 34px;
    display: grid;
    place-items: center;
    border-radius: 10px;
    background: var(--qx-text);
    color: var(--qx-bg);
    font-size: 10px;
    font-weight: 950;
  }
  .demo-explanation > div {
    min-width: 0;
  }
  .demo-explanation strong {
    display: block;
    margin-bottom: 2px;
    color: var(--qx-text);
    font-size: 11.5px;
  }
  .demo-explanation p {
    font-size: 10.5px;
    line-height: 1.38;
  }

  .sample-output {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 4px 9px;
    margin-top: 9px;
    padding: 9px 10px;
    border: 1px solid var(--qx-border);
    border-radius: 12px;
    background: var(--qx-surface-2);
    transition: border-color .18s ease, background .18s ease;
  }
  .sample-output b,
  .sample-output strong {
    color: var(--qx-text);
    font-size: 10px;
    text-align: right;
  }
  .sample-output strong {
    color: var(--qx-green-text);
  }
  .sample-output.active {
    border-color: var(--qx-green);
    background: var(--qx-green-soft);
  }
  .start-mission {
    border-radius: 13px;
    box-shadow: 0 7px 18px rgba(0, 0, 0, .16);
  }

  .primary, .secondary { min-height: 44px; width: 100%; border-radius: 999px; font-family: var(--qx-font); font-size: 14px; font-weight: 900; cursor: pointer; }
  .primary { border: none; background: var(--qx-accent); color: #fff; }
  .primary:disabled { opacity: .42; cursor: not-allowed; }
  .secondary { border: 1.5px solid var(--qx-border-2); background: var(--qx-surface); color: var(--qx-text-dim); }

  .section-title { text-align: left; margin-bottom: 12px; }
  .section-title h2 { font-size: 21px; margin-bottom: 6px; }

  .readout { width: 100%; box-sizing: border-box; display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; border: 1px solid var(--qx-border); border-radius: 9px; background: var(--qx-surface-2); margin: 10px 0; }
  .readout span { font-size: 9px; font-weight: 900; letter-spacing: .06em; text-transform: uppercase; color: var(--qx-text-faint); }
  .readout strong { font-size: 14px; color: var(--qx-text); }

  .controls { width: 100%; display: grid; gap: 10px; margin-bottom: 10px; }
  .controls.one { grid-template-columns: 1fr; }
  .controls.two { grid-template-columns: 1fr 1fr; }
  .control { border: 1px solid var(--qx-border); border-radius: 10px; background: var(--qx-surface); padding: 10px; display: grid; gap: 6px; justify-items: center; }
  .control span { font-size: 10px; font-weight: 850; color: var(--qx-text-faint); text-transform: uppercase; letter-spacing: .04em; text-align: center; }
  .control > strong { font-size: 20px; font-weight: 950; color: var(--qx-text); font-variant-numeric: tabular-nums; }
  .control div { display: flex; gap: 8px; }
  .control button { width: 44px; height: 44px; border-radius: 50%; border: 1px solid var(--qx-border-2); background: var(--qx-surface-2); color: var(--qx-text); font: 900 20px/1 var(--qx-font); cursor: pointer; }
  .control button:disabled { opacity: .4; cursor: not-allowed; }

  .test-button { width: 100%; min-height: 44px; border-radius: 10px; border: none; background: var(--qx-text); color: var(--qx-bg); font-family: var(--qx-font); font-size: 13px; font-weight: 900; cursor: pointer; margin-bottom: 10px; }

  .evidence { border: 1px solid var(--qx-border); border-radius: 12px; padding: 10px; margin-bottom: 9px; }
  .evidence-head { display: flex; justify-content: space-between; margin-bottom: 8px; }
  .evidence-head strong { font-size: 11px; }
  .evidence-head span { font-size: 9px; color: var(--qx-text-faint); font-weight: 800; }
  .evidence-classes { display: grid; grid-template-columns: repeat(3, 1fr); gap: 5px; }
  .evidence-classes > div { display: grid; gap: 2px; justify-items: center; text-align: center; border-radius: 8px; padding: 7px 3px; background: var(--qx-surface-2); opacity: .5; }
  .evidence-classes > div.got { opacity: 1; background: var(--qx-green-soft); }
  .evidence-classes b { font-size: 12px; color: var(--qx-text-faint); }
  .evidence-classes > div.got b { color: var(--qx-green-text); }
  .evidence-classes span { font-size: 8.5px; font-weight: 850; color: var(--qx-text-dim); }
  .evidence-classes > div.got span { color: var(--qx-green-text); }
  .run-list { list-style: none; margin: 8px 0 0; padding: 0; display: grid; gap: 4px; }
  .run-list li { display: grid; grid-template-columns: auto 1fr; gap: 7px; align-items: center; border-radius: 7px; padding: 5px 8px; background: var(--qx-surface-2); }
  .run-list li.hit { background: var(--qx-green-soft); }
  .run-list li span { font-size: 9.5px; font-weight: 900; color: var(--qx-text-faint); }
  .run-list li strong { text-align: right; font-size: 9.5px; font-weight: 850; color: var(--qx-text-dim); }
  .run-list li.hit strong { color: var(--qx-green-text); }

  .report { width: 100%; box-sizing: border-box; border-radius: 10px; padding: 10px 12px; font-size: 11.5px; line-height: 1.45; margin-bottom: 9px; background: var(--qx-accent-soft); color: var(--qx-accent-text); }
  .report.ok { background: var(--qx-green-soft); color: var(--qx-green-text); }
  .report strong { font-weight: 950; }

  .goal-row, .sector-grid, .goal-row { width: 100%; display: grid; gap: 8px; margin-bottom: 10px; }
  .goal-row { grid-template-columns: 1fr 1fr; }
  .sector-grid { grid-template-columns: 1fr 1fr; }
  .goal-row div, .sector-grid div { display: flex; align-items: center; gap: 6px; border: 1.5px solid var(--qx-border); border-radius: 10px; padding: 8px 10px; background: var(--qx-surface-2); font-size: 11px; font-weight: 850; color: var(--qx-text-dim); }
  .goal-row div.done, .sector-grid div.done { border-color: var(--qx-green); background: var(--qx-green-soft); color: var(--qx-green-text); }
  .goal-row b, .sector-grid b { font-size: 12px; }
  .clue-strip { width: 100%; box-sizing: border-box; border: 1px dashed var(--qx-border-2); border-radius: 9px; padding: 8px 11px; font-size: 11px; font-weight: 800; color: var(--qx-text-dim); background: var(--qx-surface-2); margin-bottom: 9px; text-align: center; }

  .code-card { width: 100%; box-sizing: border-box; border: 1.5px solid var(--qx-border); border-radius: 12px; background: var(--qx-surface-2); padding: 11px; display: grid; gap: 6px; margin-bottom: 10px; }
  .code-card.small { margin-top: 8px; }
  .slot-label { font-size: 9px; font-weight: 900; color: var(--qx-text-faint); text-transform: uppercase; letter-spacing: .05em; }
  .slot { display: grid; grid-template-columns: 44px 1fr 44px; align-items: center; gap: 8px; }
  .slot strong { text-align: center; font-size: 20px; font-weight: 950; color: var(--qx-text); font-variant-numeric: tabular-nums; }
  .slot button { width: 44px; height: 44px; border-radius: 12px; border: 1px solid var(--qx-border-2); background: var(--qx-surface); color: var(--qx-text); font: 900 20px/1 var(--qx-font); cursor: pointer; }
  .slot button:disabled { opacity: .4; cursor: not-allowed; }

  .route-rule {
    width: 100%;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr) auto minmax(0, 1.1fr);
    align-items: center;
    gap: 5px;
    margin-bottom: 9px;
    padding: 8px;
    border: 1px solid var(--qx-accent);
    border-radius: 11px;
    background: var(--qx-accent-soft);
    color: var(--qx-accent-text);
    font-size: 9px;
    font-weight: 900;
    text-align: center;
  }
  .route-rule span { min-width: 0; }
  .route-rule b {
    display: inline-grid;
    width: 18px;
    height: 18px;
    margin-right: 2px;
    place-items: center;
    border-radius: 50%;
    background: var(--qx-accent);
    color: #fff;
    font-size: 9px;
  }
  .route-rule i { color: var(--qx-text-faint); font-style: normal; }
  .route-rule strong { color: var(--qx-text); font-size: 9px; }

  .nudge, .hint { border-radius: 10px; padding: 9px 11px; font-size: 11px; line-height: 1.4; margin-bottom: 7px; }
  .nudge { color: var(--qx-green-text); background: var(--qx-green-soft); }
  .hint { color: var(--qx-accent-text); background: var(--qx-accent-soft); }
  .hint-link { border: none; background: none; color: var(--qx-text-faint); font-family: var(--qx-font); font-size: 11px; font-weight: 800; cursor: pointer; margin: 0 auto 8px; min-height: 30px; }

  .warehouse { width: 100%; border: 1.5px solid var(--qx-border); border-radius: 14px; background: var(--qx-surface-elevated); padding: 12px; margin-bottom: 10px; display: grid; place-items: center; }
  .rack { position: relative; width: 220px; height: 150px; }
  .bin, .robot { position: absolute; width: 26px; height: 26px; border-radius: 7px; display: grid; place-items: center; font-size: 10px; font-weight: 900; left: calc(50% + var(--bx, 0) * 24px - 13px); top: calc(50% - var(--by, 0) * 22px - 13px); }
  .bin { border: 1.5px solid var(--qx-danger); color: var(--qx-danger-text); background: var(--qx-danger-soft); }
  .bin.got { border-color: var(--qx-green); color: var(--qx-green-text); background: var(--qx-green-soft); }
  .robot { left: calc(50% + var(--rx, 0) * 24px - 13px); top: calc(50% - var(--ry, 0) * 22px - 13px); background: var(--qx-accent); border: 1.5px solid var(--qx-accent); transition: left .28s ease, top .28s ease; }
  .dock { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); font-size: 7px; font-weight: 900; color: var(--qx-text-faint); letter-spacing: .06em; text-transform: uppercase; }

  .crate-codes { width: 100%; display: grid; gap: 6px; margin-bottom: 10px; }
  .crate-codes > div { border: 1px solid var(--qx-border); border-radius: 9px; padding: 8px 10px; background: var(--qx-surface-2); }
  .crate-codes > div.done { border-color: var(--qx-green); background: var(--qx-green-soft); }
  .crate-codes b { font-size: 11px; }
  .crate-codes small { display: block; font-size: 9.5px; color: var(--qx-text-dim); margin-top: 2px; font-variant-numeric: tabular-nums; }

  .retrieve-row { width: 100%; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px; margin-bottom: 9px; }
  .retrieve-btn { min-height: 44px; border: 1.5px solid var(--qx-border-2); border-radius: 10px; background: var(--qx-surface); color: var(--qx-text-dim); font: 850 10px/1.2 var(--qx-font); padding: 6px; cursor: pointer; }
  .retrieve-btn.done { border-color: var(--qx-green); background: var(--qx-green-soft); color: var(--qx-green-text); }
  .retrieve-btn:disabled { cursor: default; }

  .reverse { width: 100%; box-sizing: border-box; border: 1.5px solid var(--qx-border); border-radius: 12px; padding: 11px; background: var(--qx-surface-2); margin-bottom: 10px; }
  .reverse-head { font-size: 11.5px; font-weight: 850; color: var(--qx-text); line-height: 1.4; margin-bottom: 9px; }
  .reverse-options { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px; margin-top: 9px; }
  .reverse-options button { min-width: 0; min-height: 52px; padding: 7px 5px; border: 1.5px solid var(--qx-border-2); border-radius: 10px; background: var(--qx-surface); color: var(--qx-text-dim); font: 900 10px/1.25 var(--qx-font); cursor: pointer; font-variant-numeric: tabular-nums; overflow-wrap: anywhere; }
  .reverse-options button.correct { border-color: var(--qx-green); background: var(--qx-green-soft); color: var(--qx-green-text); }
  .reverse-options button.wrong { border-color: var(--qx-danger); background: var(--qx-danger-soft); color: var(--qx-danger-text); }
  .route-challenge { border-color: var(--qx-accent); }

  .reveal { text-align: center; display: flex; flex-direction: column; align-items: center; }
  .reveal h2 { font-size: 21px; }
  .reveal-list { list-style: none; text-align: left; width: 100%; margin: 12px 0 10px; padding: 0; display: grid; gap: 6px; }
  .reveal-list li { border: 1px solid var(--qx-border); border-radius: 9px; padding: 8px 11px; background: var(--qx-surface-2); font-size: 11.5px; line-height: 1.4; color: var(--qx-text-dim); }
  .reveal-list strong { color: var(--qx-text); font-weight: 950; }
  .tie-back { width: 100%; box-sizing: border-box; border: 1px solid var(--qx-border); border-radius: 12px; padding: 11px 13px; background: var(--qx-surface); color: var(--qx-text-dim); font-size: 11.5px; line-height: 1.5; text-align: left; margin-bottom: 13px; }
  .insight-ladder { width: 100%; box-sizing: border-box; display: grid; gap: 7px; border: 1.5px solid var(--qx-accent); border-radius: 12px; padding: 11px 12px; margin-bottom: 13px; background: var(--qx-accent-soft); text-align: left; }
  .insight-ladder > strong { color: var(--qx-accent-text); font-size: 12px; }
  .insight-ladder span { color: var(--qx-text-dim); font-size: 10.5px; line-height: 1.4; }
  .insight-ladder b { color: var(--qx-text); }

  .reward-panel { width: 100%; box-sizing: border-box; border: 1.5px solid var(--qx-green); border-radius: 14px; background: var(--qx-green-soft); padding: 12px; text-align: left; margin-bottom: 13px; }
  .reward-top { display: flex; justify-content: space-between; align-items: center; }
  .reward-top div { display: flex; flex-direction: column; }
  .reward-top span { font-size: 9px; color: var(--qx-green-text); font-weight: 900; text-transform: uppercase; letter-spacing: .08em; }
  .reward-top strong { font-size: 15px; color: var(--qx-text); }
  .reward-top b { color: var(--qx-green-text); font-size: 21px; }
  .arcade-result { display: grid; grid-template-columns: 1.4fr 1fr 1fr; gap: 6px; margin: 10px 0; }
  .arcade-result > div { border: 1px solid color-mix(in srgb, var(--qx-green) 42%, var(--qx-border)); border-radius: 9px; padding: 7px 8px; background: var(--qx-surface); display: flex; flex-direction: column; }
  .arcade-result span { color: var(--qx-text-faint); font-size: 8px; font-weight: 900; letter-spacing: .06em; text-transform: uppercase; }
  .arcade-result strong { color: var(--qx-text); font-size: 15px; font-weight: 950; font-variant-numeric: tabular-nums; }
  .reward-skills { display: flex; gap: 5px; flex-wrap: wrap; margin: 10px 0 7px; }
  .reward-skills span { border: 1px solid var(--qx-border); background: var(--qx-surface); color: var(--qx-text-faint); border-radius: 999px; padding: 4px 8px; font-size: 9px; font-weight: 850; }
  .reward-skills span.earned { color: var(--qx-green-text); border-color: var(--qx-green); }
  .reward-panel small { color: var(--qx-text-dim); font-size: 9.5px; line-height: 1.35; display: block; }
  .reveal-actions { width: 100%; display: grid; gap: 7px; }

  @media (max-width: 430px) {
    .phase { min-height: calc(100dvh - 235px); }
    .section-title { margin-bottom: 9px; }
    .section-title h2 { font-size: 19px; margin-top: 5px; }
    .section-title p { font-size: 12px; line-height: 1.4; }
    .controls { gap: 7px; }
    .control { padding: 8px 6px; }
    .control button, .slot button { width: 42px; height: 42px; }
    .run-list { display: none; }
    .warehouse { padding: 8px; }
  }

  @media (max-width: 360px) {
    .solve-first { max-width: 100%; }
    .phase { min-height: 400px; }
    h2 { font-size: 21px; }
    .assignment-summary { grid-template-columns: 1fr; }
    .demo-radar { height: 205px; }
    .demo-tabs { gap: 3px; }
    .demo-tabs button { font-size: 7.5px; }
    .arcade-result { grid-template-columns: 1fr 1fr 1fr; }
  }
</style>
