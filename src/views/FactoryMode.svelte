<script>
  import { theme } from '../lib/stores/theme.js';
  import { registry, entryFor, sources } from '../factory/index.js';
  import SquareScene from '../lib/components/SquareScene.svelte';
  $: rejected = entry.rejected || {};

  const slots = [['readings', 'reading'], ['interactions', 'interaction'], ['exercises', 'exercise']];

  // Interaction kinds that carry their own controls or are deliberately fixed.
  const NO_CONTROL = ['line-fails', 'axes-build', 'find-place', 'quadrants', 'diagonal-bench-stage', 'unit-square', 'unit-square-fixed', 'unit-scale', 'count-grid', 'sorter', 'glyph-card', 'delta-facts', 'delta-token', 'statement-match',
    // The functions boards. Every one of these carries its own stepper, plate
    // picker or number line, so the shared x slider would be dead under them.
    'substitute-strip', 'machine-single', 'rule-swap', 'two-machines', 'relation-test', 'function-word',
    'notation-builder', 'notation-card', 'two-answers', 'square-back', 'function-or-not', 'verdict-strip',
    'accepted-line', 'accepted-list',
    'switch-toggle', 'switch-plain', 'tap-valve', 'tap-piston', 'machine-panel', 'machine-labels',
    'forked-button', 'flaky-button'];

  // The kept sheet: the board as chosen, with everything unselected and rejected
  // hidden. A last read before approval is asked for.
  let keptOnly = new URLSearchParams(window.location.search).get('kept') === '1';
  function setKept(on) {
    keptOnly = on;
    const url = new URL(window.location.href);
    if (on) url.searchParams.set('kept', '1');
    else url.searchParams.delete('kept');
    history.replaceState({}, '', url);
  }

  let active = new URLSearchParams(window.location.search).get('bb') || 'letter';
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
  let values = entryFor(new URLSearchParams(window.location.search).get('bb') || 'letter').bb.sections.map(() => 2);

  // Sorter state for S1-I2: each chip cycles pool -> fixed -> varies -> pool.
  const bins = ['unfiled', 'fixed', 'can vary'];
  let sorted = { '2': 0, x: 0, '7': 0, y: 0 };

  // ---- Functions boards -------------------------------------------------
  // One table of rules, shared by both boards, so a rule cannot mean one thing
  // in the machine and another in the inspector.
  const RULES = {
    'double it': v => v * 2,
    'add three': v => v + 3,
    'square it': v => v * v,
    'take away one': v => v - 1
  };
  const PLATES = Object.keys(RULES);
  const run = (name, v) => RULES[name](v);

  let sub = { b: 4 };                       // substitute-strip
  let plate = 0;                            // rule-swap: which plate is loaded
  let mach = { x: 3 };                      // machine-single, two-machines
  let lad = { d: 3 };                       // relation-test: foot of the ladder
  let nota = 0;                             // notation-builder: F, f or phi
  let fork = { x: 4 };                      // two-answers
  let verdicts = {};                        // function-or-not, verdict-strip
  let testedRules = {};                     // which rules have been run
  let accept = { x: 4 };                    // accepted-line

  const NOTATION = ['F', 'f', 'φ'];
  // The ladder is 5 units long, so the height it reaches falls as the foot goes
  // out. The other two readouts are constants and are meant to sit dead.
  const ladHeight = d => Math.sqrt(Math.max(0, 25 - d * d));
  const FORK_RULE = 'a number whose square is x';
  const forkAnswers = x => x < 0 ? [] : (x === 0 ? [0] : [Math.sqrt(x), -Math.sqrt(x)]);
  const fmt2 = n => Number(n.toFixed(2)).toString().replace('-', '−');

  function judge(name, v) {
    verdicts = { ...verdicts, [name]: v };
  }
  function testRule(name) {
    testedRules = { ...testedRules, [name]: true };
  }

  // Workshop state. Kept separate from the goal checkers above so a new
  // workshop cannot inherit another one's success conditions.
  let fm = { plate: 0, seen: [] };          // machine bench
  let rg = { hidden: 'add three', fed: [], guess: null };
  let ri = { verdicts: {} };                // rule inspector

  // ---- What a Button Does ----------------------------------------------
  let sw = { up: false, tally: { up: 0, down: 0 } };
  let tap = { turn: 3, visited: {} };
  let panel = { log: [] };
  const PANEL = ['tea', 'coffee', 'soup', 'coffee'];
  let broken = { log: [] };
  const SOUND = ['tea', 'coffee', 'soup', 'water'];
  const FORKED = ['tea', 'coffee', ['tea', 'coffee'], 'water'];

  function flick(up) {
    sw = { up, tally: { ...sw.tally, [up ? 'up' : 'down']: sw.tally[up ? 'up' : 'down'] + 1 } };
  }
  function turnTap(v) {
    tap = { turn: v, visited: { ...tap.visited, [v]: (tap.visited[v] || 0) + 1 } };
  }
  const flow = t => Number((t * 0.4).toFixed(1));
  function press(i) {
    panel = { log: [...panel.log, { button: i + 1, out: PANEL[i] }] };
  }
  function pressBroken(which, i) {
    const out = which === 'sound' ? SOUND[i] : FORKED[i];
    broken = { log: [...broken.log, { which, button: i + 1, out: Array.isArray(out) ? out.join(' and ') : out, forked: Array.isArray(out) }] };
  }

  // Repair bench. Verdicts and presses are tracked per machine.
  let rb = { pressed: {}, verdicts: {} };
  function rbPress(mi, bi, label) {
    rb = { ...rb, pressed: { ...rb.pressed, [`${mi}:${bi}`]: label } };
  }
  function rbJudge(mi, v) {
    rb = { ...rb, verdicts: { ...rb.verdicts, [mi]: v } };
  }
  function benchGoal(id, s, machines) {
    if (id === 'b1') {
      return machines.every((m, mi) => m.buttons.every((_, bi) => s.pressed[`${mi}:${bi}`] !== undefined));
    }
    if (id === 'b2') return Object.values(s.pressed).some(v => typeof v === 'string' && v.includes(' and '));
    if (id === 'b3') return machines.every((m, mi) => m.kind !== 'sound' || s.verdicts[mi] === 'pass');
    if (id === 'b4') return machines.every((m, mi) => m.kind !== 'forked' || s.verdicts[mi] === 'fail');
    return false;
  }

  function fmFeed(input) {
    const name = PLATES[fm.plate];
    const out = run(name, input);
    fm = { ...fm, seen: [...fm.seen, { plate: name, input, out }] };
  }
  function rgFeed(v) {
    if (rg.fed.some(f => f.input === v)) return;
    rg = { ...rg, fed: [...rg.fed, { input: v, out: run(rg.hidden, v) }] };
  }

  // State is passed in rather than read from scope. Svelte tracks dependencies
  // where they are read, so a checker that reached into the closure would leave
  // the goal list frozen; that fault has caught four interactions in this file.
  function machineGoal(id, s) {
    const eights = s.seen.filter(r => r.out === 8);
    if (id === 'm1') return eights.length > 0;
    if (id === 'm2') return new Set(eights.map(r => r.plate)).size > 1;
    if (id === 'm3') return s.seen.some(r => r.out === r.input);
    if (id === 'm4') {
      return PLATES.some(p => {
        const rows = s.seen.filter(r => r.plate === p);
        return rows.some(a => rows.some(b => a.input !== b.input && a.out === b.out));
      });
    }
    return false;
  }
  function guessGoal(id, s) {
    if (id === 'g1') return s.fed.length >= 2;
    if (id === 'g2') return s.guess === s.hidden;
    return false;
  }
  function inspectorGoal(id, s, rules) {
    const v = s.verdicts;
    if (id === 'r1') return v['a number whose square is x'] === 'fail';
    if (id === 'r2') return v['1 divided by it'] === 'pass';
    if (id === 'r3') return v['a number bigger than x'] === 'fail';
    if (id === 'r4') return rules.filter(r => r.ok).every(r => v[r.name] === 'pass');
    return false;
  }

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
  function goalMet(kind, id, bench, cb, db, sb, dt, sp, dd, bench24, placed3) {
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
    if (kind === 'square-builder') {
      const a = sb.side ** 2;
      if (id === 's1') return Math.abs(a - 9) < 0.001;
      if (id === 's2') return a > 20;
      if (id === 's3') return sb.side > 0 && a < sb.side;
    }
    if (kind === 'dependence-tester') {
      if (id === 't1') return Math.abs(dt.x - 4) < 0.001;
      if (id === 't2') return dt.refused;
    }
    if (kind === 'span-explorer') {
      if (id === 'p1') return sp.a !== sp.b && Math.abs(sp.a + sp.b - 5) < 0.001;
      if (id === 'p2') return sp.hits.length > 1;
      if (id === 'p3') return sp.a === sp.b;
    }
    if (kind === 'tiling-bench') {
      // a2 is unreachable on purpose: 24 has no whole-number square root.
      if (id === 'a2') return false;
      return bench24.done.includes(id);
    }
    if (kind === 'diagonal-bench') {
      if (id === 'p1') return placed3.includes('2,2');
      if (id === 'p2') return placed3.includes('3,3');
      if (id === 'p3') return placed3.includes('4,4');
      // A fourth point where both readings agree, which can only be found by
      // noticing the pattern the first three make.
      if (id === 'p4') return placed3.some(k => { const [a, b] = k.split(',').map(Number); return a === b && ![2, 3, 4].includes(a); });
    }
    if (kind === 'derivative-dial') {
      const r = 2 * dd.x;
      if (id === 'r1') return Math.abs(r - 6) < 0.001;
      if (id === 'r2') return Math.abs(r - 1) < 0.001;
      if (id === 'r3') return Math.abs(r - dd.x ** 2) < 0.001 && dd.x > 0;
    }
    return false;
  }

  // Span explorer: the average rate from a to b works out to a + b, so many
  // different spans share one rate. hits records which pairs reached 5, which
  // is how the second goal knows a *different* pair was used.
  // Countable grid. Snapped to whole units, because Wentworth's scholium only
  // holds when the sides contain the unit an integral number of times.
  const GRID_W = 8, GRID_H = 6;
  let grids = {};        // per interaction code: { b, a }
  let gridDrag = false;
  const gridOf = (code, g) => g[code] || { b: 3, a: 2 };
  function setGrid(code, b, a) {
    grids = { ...grids, [code]: { b: Math.max(1, Math.min(GRID_W, b)), a: Math.max(1, Math.min(GRID_H, a)) } };
  }

  // Exercise-side grid, one shared cell since only one check shows at a time.
  let exGrid = { b: 1, a: 1 };
  const exGridOk = (ex, g) =>
    g.b * g.a === ex.targetArea
    && (!ex.requireBase || g.b === ex.requireBase)
    && (!ex.requireSquare || g.b === g.a);

  // Tiling bench: which distinct rectangles of area 24 have been built.
  // Goals stick once reached. Goal a1 is about the target 24 and a3 is about any
  // other target, so without this, meeting one would un-tick the other and the
  // list would read as current state rather than as things achieved.
  let bench24 = { b: 1, a: 1, found: [], target: 24, done: [] };
  function benchSet(b, a) {
    const next = { ...bench24, b: Math.max(1, Math.min(GRID_W, b)), a: Math.max(1, Math.min(GRID_H, a)) };
    if (next.b * next.a === next.target) {
      const key = `${next.b}×${next.a}`;
      if (!next.found.includes(key)) next.found = [...next.found, key];
    }
    const hit = [];
    if (next.target === 24 && next.found.length >= 3) hit.push('a1');
    if (next.target !== 24 && next.b === next.a && next.b * next.a === next.target) hit.push('a3');
    next.done = [...new Set([...next.done, ...hit])];
    bench24 = next;
  }
  function benchTarget(t) {
    bench24 = { ...bench24, target: t, found: [] };
  }

  let unitRefused = false;
  let unitSide = 1;

  // Coordinate plane board. One shared point, since only one stage shows at once.
  const PX = 6, PY = 5;                 // grid extent each side of the origin
  let pt = { x: 3, y: 4 };
  let axesOn = false;
  let placed3 = [];                     // diagonal workshop
  const quadName = p =>
    p.x === 0 || p.y === 0 ? 'on an axis'
      : `(${p.x > 0 ? '+' : '−'}, ${p.y > 0 ? '+' : '−'})`;
  function placeDiag(x, y) {
    pt = { x, y };
    const key = `${x},${y}`;
    if (!placed3.includes(key)) placed3 = [...placed3, key];
  }
  // Note for future work: do not wrap these lookups in helper functions and call
  // them from the template. Svelte tracks dependencies where they are read, so a
  // helper that reads placed3 inside its body leaves the markup frozen. This has
  // now caught four separate interactions in this file; read the state directly.
  let splitTried = false;
  let sp = { a: 1, b: 2, hits: [] };
  function spStep(which, delta) {
    const next = Number(Math.min(5, Math.max(0.5, sp[which] + delta * 0.5)).toFixed(1));
    const s = { ...sp, [which]: next };
    if (s.a !== s.b && Math.abs(s.a + s.b - 5) < 0.001) {
      const key = [s.a, s.b].sort((m, n) => m - n).join('/');
      if (!s.hits.includes(key)) s.hits = [...s.hits, key];
    }
    sp = s;
  }
  const spRate = s => (s.a === s.b ? null : Number((s.a + s.b).toFixed(2)));

  let dd = { x: 1 };
  function ddStep(delta) {
    dd = { x: Number(Math.min(5, Math.max(0.5, dd.x + delta * 0.5)).toFixed(1)) };
  }

  // Square builder: a deliberately wider range than the lesson uses, so the
  // area can be driven below the side, which only happens under 1.
  let sb = { side: 2 };
  function sbStep(delta) {
    sb = { side: Number(Math.min(5, Math.max(0.5, sb.side + delta * 0.1)).toFixed(2)) };
  }

  // Dependence tester: the y buttons are live but refuse, and say why.
  let dt = { x: 2, refused: false };
  function dtStep(delta) {
    dt = { ...dt, x: Number(Math.min(6, Math.max(1, dt.x + delta)).toFixed(0)) };
  }
  function dtRefuse() {
    dt = { ...dt, refused: true };
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
    <nav class="mode-switch" aria-label="Choose a view">
      <button class:on={!keptOnly} on:click={() => setKept(false)}>
        All variants<em>everything drafted, chosen or not</em>
      </button>
      <button class:on={keptOnly} on:click={() => setKept(true)}>
        Kept sheet<em>the board as chosen, for a last read</em>
      </button>
    </nav>

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
        {#if keptOnly}
          This is the board as chosen. Everything rejected or still undecided is
          hidden. Read it through and touch the interactions as a learner would;
          nothing here is live in the Viewer.
        {:else}
          Every variant below is a candidate. Touch the interactions, play the
          exercises, then send me the codes you want kept. Nothing here is live in
          the Viewer.
        {/if}
      </p>
      {#if entry.gated}
        <p class="gate">Gated · {entry.gated} These are drafts for later selection. They must not reach a learner while the gate stands.</p>
      {/if}

      <!-- Authoring metadata. Nothing here reaches a learner, so the kept sheet
           hides it: that sheet shows what goes into the app and nothing else. -->
      <div class="fork-note" class:hidden={keptOnly}>
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

        {#if !keptOnly}
          <div class="sources">
            {#each section.sources as key}
              <blockquote>
                <p>{sources[key].quote}</p>
                <cite>{key} · {sources[key].ref}</cite>
              </blockquote>
            {/each}
          </div>
        {/if}

        <h3>Reading</h3>
        <div class="variant-grid">
          {#each (keptOnly ? section.readings.filter(r => selections[r.code] || finalised[r.code]) : section.readings) as reading}
            <article class="variant" class:selected={selections[reading.code] && !keptOnly} class:finalised={finalised[reading.code]} class:rejected={rejected[reading.code]}>
              <span class="code">{reading.code}{#if selections[reading.code] && !keptOnly} · SELECTED{:else if finalised[reading.code]} · FINALISED{:else if rejected[reading.code]} · REJECTED{/if}</span>
              <p class="reading-text" class:verbatim={reading.verbatim}>{reading.text}</p>
              {#if reading.verbatim}
                <p class="verbatim-tag">Author's own words, unaltered · {sources[reading.verbatim].ref}</p>
              {/if}
              {#if finalised[reading.code]}<p class="why">{finalised[reading.code]}</p>{/if}
            </article>
          {/each}
        </div>

        <h3>Interaction {#if !keptOnly}<em>— drag the sliders, these are live</em>{/if}</h3>
        <div class="variant-grid">
          {#each (keptOnly ? section.interactions.filter(i => selections[i.code] || finalised[i.code]) : section.interactions) as interaction}
            <article class="variant" class:selected={selections[interaction.code] && !keptOnly} class:finalised={finalised[interaction.code]} class:rejected={rejected[interaction.code]}>
              <span class="code">{interaction.code}{#if selections[interaction.code] && !keptOnly} · SELECTED{:else if finalised[interaction.code]} · FINALISED{:else if rejected[interaction.code]} · REJECTED{/if}</span>
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
                  <!-- bars: 2 shows only the two lengths; 3 adds the difference as
                       an object of its own. Without this the variants are identical. -->
                  <div class="rows">
                    <div class="bar-row"><small>OLD</small><span class="bar" style="width:96px"></span><b>2.0</b></div>
                    <div class="bar-row"><small>NEW</small><span class="bar" style={`width:${values[si] * 48}px`}></span><b>{fmt(values[si])}</b></div>
                    {#if (interaction.bars ?? 3) >= 3}
                      <div class="bar-row"><small>CHANGE</small><span class="bar diff" style={`width:${Math.abs(values[si] - 2) * 48}px`}></span><b>{(values[si] - 2).toFixed(1).replace('-', '−')}</b></div>
                    {/if}
                  </div>

                {:else if interaction.kind === 'delta-expand'}
                  <div class="rows centre">
                    <div class="expand-top"><span class="glyph-sm">Δ</span><span class="glyph-sm let">x</span></div>
                    <span class="expand-arrow" aria-hidden="true">↓</span>
                    <div class="expand-sum">
                      <b>{fmt(values[si])}</b><i>−</i><b>2.0</b><i>=</i>
                      <b class="accent">{(values[si] - 2).toFixed(1).replace('-', '−')}</b>
                    </div>
                    <p class="stage-note">Δ is not a value. It is an instruction to take the new figure and subtract the old.</p>
                  </div>

                {:else if interaction.kind === 'unit-square'}
                  <div class="rows centre">
                    <div class="unit-fig">
                      <span class="side-mark">1</span>
                      <span class="unit-sq"></span>
                      <span class="side-mark under">1</span>
                    </div>
                    <p class="stage-note">The unit of surface. Everything on this board is counted in these.</p>
                  </div>

                {:else if interaction.kind === 'unit-square-fixed'}
                  <div class="rows centre">
                    <div class="unit-fig">
                      <span class="side-mark">1</span>
                      <button class="unit-sq live" class:refused={unitRefused} on:click={() => (unitRefused = true)}
                        aria-label="Try to resize the unit square"></button>
                      <span class="side-mark under">1</span>
                    </div>
                    {#if unitRefused}
                      <p class="refusal">It will not resize. A unit that could be any size would measure nothing, so this one is fixed at one by one and everything else is counted against it.</p>
                    {:else}
                      <p class="stage-note">Try to make it bigger.</p>
                    {/if}
                  </div>

                {:else if interaction.kind === 'line-fails' || interaction.kind === 'axes-build'}
                  {@const showY = interaction.kind === 'axes-build' || axesOn}
                  <div class="rows centre">
                    <svg viewBox="0 0 300 190" class="mini-svg" role="img"
                      aria-label={showY ? 'Two axes crossed at a right angle' : 'A number line with two points above the same mark'}>
                      <path class="ax" d="M20 150H280"/>
                      {#each [1, 2, 3, 4, 5] as t}
                        <path class="ax" d={`M${20 + t * 44} 144v12`}/>
                        <text x={20 + t * 44} y="172">{t}</text>
                      {/each}
                      {#if showY}
                        <path class="ax" d="M152 20V178"/>
                        {#each [1, 2, 3, 4] as t}
                          <path class="ax" d={`M146 ${150 - t * 30}h12`}/>
                          <text x="138" y={154 - t * 30} text-anchor="end">{t}</text>
                        {/each}
                        <circle class="new" cx="152" cy="150" r="5"/>
                        <text x="168" y="166" text-anchor="start">origin</text>
                      {/if}
                      <circle class="old" cx={20 + 3 * 44} cy="60" r="7"/>
                      <text x={20 + 3 * 44 + 16} y="65" text-anchor="start">A</text>
                      <circle class="old" cx={20 + 3 * 44} cy="110" r="7"/>
                      <text x={20 + 3 * 44 + 16} y="115" text-anchor="start">B</text>
                    </svg>
                    {#if showY}
                      <p class="ok">With a second reading, A is (3, 3) and B is (3, 1). Two different places, told apart at last.</p>
                    {:else}
                      <div class="fails-read"><span>A is at 3</span><span>B is at 3</span></div>
                      <p class="stage-note">The line gives the same answer for both, and they are not the same place.</p>
                      <button class="reveal-btn" on:click={() => (axesOn = true)}>Add a second line</button>
                    {/if}
                  </div>

                {:else if interaction.kind === 'find-place' || interaction.kind === 'quadrants' || interaction.kind === 'diagonal-bench-stage'}
                  {@const full = interaction.kind !== 'find-place'}
                  <div class="rows centre">
                    <div class="plane" style={`--cols:${full ? PX * 2 + 1 : PX + 1}`}>
                      {#each Array(full ? PY * 2 + 1 : PY + 1) as _, r}
                        {#each Array(full ? PX * 2 + 1 : PX + 1) as _, c}
                          {@const gx = full ? c - PX : c}
                          {@const gy = full ? PY - r : PY - r}
                          <button class="pcell"
                            class:axis={gx === 0 || gy === 0}
                            class:here={pt.x === gx && pt.y === gy}
                            on:click={() => (pt = { x: gx, y: gy })}
                            aria-label={`Place at ${gx}, ${gy}`}></button>
                        {/each}
                      {/each}
                    </div>
                    <div class="plane-read">
                      <span>( {pt.x} , {pt.y} )</span>
                      {#if interaction.kind === 'quadrants'}<em>{quadName(pt)}</em>{/if}
                    </div>
                  </div>

                {:else if interaction.kind === 'unit-scale'}
                  {@const n = unitSide}
                  <div class="rows centre">
                    <div class="unit-fig">
                      <span class="side-mark">{n}</span>
                      <span class="unit-stack" style={`--n:${n}`}>
                        {#each Array(n * n) as _}<i></i>{/each}
                      </span>
                      <span class="side-mark under">{n}</span>
                    </div>
                    <div class="stepper">
                      <button aria-label="Shorter side" disabled={n <= 1} on:click={() => (unitSide = Math.max(1, n - 1))}>−</button>
                      <span class="stepper-value">side {n}<em>{n * n} unit {n * n === 1 ? 'square' : 'squares'}</em></span>
                      <button aria-label="Longer side" disabled={n >= 4} on:click={() => (unitSide = Math.min(4, n + 1))}>+</button>
                    </div>
                    <p class="stage-note">
                      {n === 1 ? 'At a side of one this is the unit itself: the square everything else is counted in.' : `A side of ${n} holds ${n * n} of the unit square.`}
                    </p>
                  </div>

                {:else if interaction.kind === 'count-grid'}
                  {@const g = gridOf(interaction.code, grids)}
                  <div class="rows centre">
                    <div class="grid-wrap"
                      on:pointerdown={() => (gridDrag = true)}
                      on:pointerup={() => (gridDrag = false)}
                      on:pointerleave={() => (gridDrag = false)}>
                      {#each Array(GRID_H) as _, r}
                        <div class="grid-row">
                          {#each Array(GRID_W) as _, c}
                            <button class="cell"
                              class:on={c < g.b && (GRID_H - 1 - r) < g.a}
                              class:sq={interaction.requireSquare && g.b === g.a && c < g.b && (GRID_H - 1 - r) < g.a}
                              on:pointerdown={() => setGrid(interaction.code, c + 1, GRID_H - r)}
                              on:pointerenter={() => gridDrag && setGrid(interaction.code, c + 1, GRID_H - r)}
                              aria-label={`Set ${c + 1} by ${GRID_H - r}`}></button>
                          {/each}
                        </div>
                      {/each}
                    </div>
                    <div class="grid-read">
                      <span><small>BASE</small><b>{g.b}</b></span>
                      <span><small>ALTITUDE</small><b>{g.a}</b></span>
                      <span><small>SQUARES COUNTED</small><b class="accent">{g.b * g.a}</b></span>
                    </div>
                    {#if interaction.showProduct}
                      <div class="grid-product">{g.b} × {g.a} = {g.b * g.a}</div>
                    {/if}
                    {#if interaction.requireSquare && g.b === g.a}
                      <p class="ok">Base and altitude agree, so this is a square. Its area is a side times itself, written x².</p>
                    {/if}
                  </div>

                {:else if interaction.kind === 'delta-facts'}
                  <div class="rows">
                    <div class="facts-head"><span class="glyph-sm">Δ</span></div>
                    <div class="fact no">✗<span>is not a number</span></div>
                    <div class="fact no">✗<span>does not multiply</span></div>
                    <div class="fact yes">✓<span>is a word, written short: the change in</span></div>
                    <div class="fact yes">✓<span>marks a subtraction: new − old</span></div>
                  </div>

                {:else if interaction.kind === 'delta-rearrange'}
                  <div class="rows">
                    <div class="rearrange">
                      <b>Δx</b><i>=</i><span>{fmt(values[si])} − 2.0</span><i>=</i><b class="accent">{(values[si] - 2).toFixed(1)}</b>
                    </div>
                    <div class="rearrange">
                      <b>{fmt(values[si])}</b><i>=</i><span>2.0 + {(values[si] - 2).toFixed(1)}</span>
                    </div>
                    <p class="stage-note">One relation, written two ways. Subtract to find the change; add to find where you land.</p>
                  </div>

                {:else if interaction.kind === 'delta-token'}
                  <div class="rows centre">
                    <div class="tokens">
                      <button class="token joined" on:click={() => splitTried = true}>Δx</button>
                      <button class="token">x</button>
                    </div>
                    {#if splitTried}
                      <p class="refusal">Δx will not come apart. Δ and x are read together as one name, so there is no Δ to multiply by.</p>
                    {:else}
                      <p class="stage-note">Try pulling Δx apart.</p>
                    {/if}
                  </div>

                {:else if interaction.kind === 'signed-bar'}
                  <div class="rows centre">
                    <div class="signed">
                      <span class="axis-line"></span>
                      <span class="zero-tick"></span>
                      <span class="signed-fill" class:neg={values[si] < 2}
                        style={`width:${Math.min(48, Math.abs(values[si] - 2) * 46)}%; ${values[si] < 2 ? 'right:50%' : 'left:50%'}`}></span>
                    </div>
                    <div class="signed-read" class:neg={values[si] < 2}>
                      Δx = {fmt(values[si])} − 2.0 = {(values[si] - 2).toFixed(1).replace('-', '−')}
                    </div>
                    <p class="stage-note">Zero is the middle. A change to the left of it is negative.</p>
                  </div>

                {:else if interaction.kind === 'delta-applied'}
                  <div class="rows">
                    <div class="applied-row">
                      <b>Δx</b><span>{fmt(values[si])} − 2.0 = {(values[si] - 2).toFixed(1).replace('-', '−')}</span><em>a length, cm</em>
                    </div>
                    <div class="applied-row">
                      <b>Δy</b><span>{(values[si] ** 2).toFixed(2)} − 4.00 = {(values[si] ** 2 - 4).toFixed(2).replace('-', '−')}</span><em>an area, cm²</em>
                    </div>
                    <div class="applied-row">
                      <b>Δt</b><span>9 − 4 = 5</span><em>a time, seconds</em>
                    </div>
                    <p class="stage-note">One symbol, three different quantities. The subtraction never changes; only what it is applied to.</p>
                  </div>

                {:else if interaction.kind === 'glyph-card'}
                  <div class="rows centre">
                    <div class="glyph">Δ<em>the change in</em></div>
                  </div>

                {:else if interaction.kind === 'square-3d'}
                  <div class="rows">
                    <SquareScene side={values[si]} height={190} />
                    <div class="bar-row"><small>SIDE x</small><b>{fmt(values[si])}</b></div>
                    <div class="bar-row"><small>AREA y</small><b>{(values[si] ** 2).toFixed(2)}</b></div>
                  </div>

                {:else if interaction.kind === 'role-flow'}
                  <div class="rows centre">
                    <div class="flow">
                      <span class="flow-card">x = {fmt(values[si])}<em>you set this</em></span>
                      <span class="flow-arrow">{#key values[si]}<i></i>{/key}→</span>
                      <span class="flow-card dep">y = {(values[si] ** 2).toFixed(2)}<em>this follows</em></span>
                    </div>
                    <p class="stage-note">Move the control and the pulse runs one way only. Nothing travels back from y to x.</p>
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
                      <span class="card sym">{interaction.labelled ? `x = ${fmt(values[si])}` : fmt(values[si])}</span>
                      <span class="machine-box">× itself</span>
                      <span class="card val">{interaction.labelled ? `y = ${(values[si] * values[si]).toFixed(2)}` : (values[si] * values[si]).toFixed(2)}</span>
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

                {:else if interaction.kind === 'switch-toggle' || interaction.kind === 'switch-plain'}
                  <div class="rows centre">
                    <div class="lamp" class:lit={sw.up}>{sw.up ? 'ON' : 'OFF'}</div>
                    <div class="switch-body">
                      <button class="switch-half" class:on={sw.up} on:click={() => flick(true)}>up</button>
                      <button class="switch-half" class:on={!sw.up} on:click={() => flick(false)}>down</button>
                    </div>
                    {#if interaction.kind === 'switch-toggle'}
                      <p class="stage-note">
                        up chosen {sw.tally.up} {sw.tally.up === 1 ? 'time' : 'times'}, light came on {sw.tally.up} {sw.tally.up === 1 ? 'time' : 'times'}.
                        down chosen {sw.tally.down} {sw.tally.down === 1 ? 'time' : 'times'}, light went off {sw.tally.down} {sw.tally.down === 1 ? 'time' : 'times'}.
                      </p>
                    {/if}
                  </div>

                {:else if interaction.kind === 'tap-valve' || interaction.kind === 'tap-piston'}
                  <div class="rows">
                    <label class="range-row">
                      <span>shut</span>
                      <input type="range" min="0" max="10" step="1" value={tap.turn}
                        on:input={e => turnTap(Number(e.target.value))} aria-label="Tap setting"/>
                      <span>open</span>
                    </label>
                    {#if interaction.kind === 'tap-valve'}
                      <div class="flow-row">
                        <b>{flow(tap.turn)}</b><small>litres a minute</small>
                      </div>
                      <div class="flow-bar"><i style={`width:${tap.turn * 10}%`}></i></div>
                      {#if tap.visited[tap.turn] > 1}
                        <p class="stage-note">You have been at this setting {tap.visited[tap.turn]} times. The flow was {flow(tap.turn)} every time.</p>
                      {/if}
                    {:else}
                      <div class="readouts">
                        <div class="readout live"><small>volume</small><b>{(12 - tap.turn).toFixed(0)}</b></div>
                        <div class="readout live"><small>pressure</small><b>{(24 / Math.max(1, 12 - tap.turn)).toFixed(1)}</b></div>
                      </div>
                      <p class="stage-note">Weight on the piston. The volume falls as the pressure rises.</p>
                    {/if}
                  </div>

                {:else if interaction.kind === 'machine-panel' || interaction.kind === 'machine-labels'}
                  <div class="rows">
                    <div class="panel">
                      {#each PANEL as drink, bi}
                        <button class="panel-btn" on:click={() => press(bi)}>
                          <b>{bi + 1}</b>
                          {#if interaction.kind === 'machine-labels'}<em>{drink}</em>{/if}
                        </button>
                      {/each}
                    </div>
                    {#if interaction.kind === 'machine-panel'}
                      {#if panel.log.length}
                        <table class="io-table">
                          <thead><tr><th>pressed</th><th>arrived</th></tr></thead>
                          <tbody>
                            {#each panel.log.slice(-6) as r}<tr><td>{r.button}</td><td><b>{r.out}</b></td></tr>{/each}
                          </tbody>
                        </table>
                      {:else}
                        <p class="stage-note">Press a button. What arrives is recorded below it.</p>
                      {/if}
                    {/if}
                  </div>

                {:else if interaction.kind === 'forked-button' || interaction.kind === 'flaky-button'}
                  <div class="rows">
                    <div class="machine-row">
                      {#each [['sound', 'Machine A'], ['broken', interaction.kind === 'forked-button' ? 'Machine B, one button wired twice' : 'Machine B, will not settle']] as [which, label]}
                        <div class="machine">
                          <span class="plate">{label}</span>
                          <div class="panel">
                            {#each SOUND as _, bi}
                              <button class="panel-btn" on:click={() => pressBroken(which, bi)}><b>{bi + 1}</b></button>
                            {/each}
                          </div>
                        </div>
                      {/each}
                    </div>
                    {#if broken.log.length}
                      <table class="io-table">
                        <thead><tr><th>machine</th><th>button</th><th>arrived</th></tr></thead>
                        <tbody>
                          {#each broken.log.slice(-6) as r}
                            <tr><td>{r.which === 'sound' ? 'A' : 'B'}</td><td>{r.button}</td><td><b class:two={r.forked}>{r.out}</b></td></tr>
                          {/each}
                        </tbody>
                      </table>
                    {/if}
                    <p class="stage-note">
                      {interaction.kind === 'forked-button'
                        ? 'Button 3 on machine B sends out both, every time. Predictable, and still no answer to "which".'
                        : 'Machine B is drafted here as forking too. Built as written, its button would vary between presses instead.'}
                    </p>
                  </div>

                {:else if interaction.kind === 'substitute-strip'}
                  <div class="rows">
                    <div class="bench-row">
                      <small>b</small>
                      <button on:click={() => sub = { b: Math.max(1, sub.b - 1) }} aria-label="Decrease b">−</button>
                      <b>{sub.b}</b>
                      <button on:click={() => sub = { b: Math.min(6, sub.b + 1) }} aria-label="Increase b">+</button>
                    </div>
                    <div class="work-lines">
                      <span>3b²</span>
                      <span>3 × {sub.b}²</span>
                      <span>3 × {sub.b * sub.b}</span>
                      <b>{3 * sub.b * sub.b}</b>
                    </div>
                  </div>

                {:else if interaction.kind === 'machine-single' || interaction.kind === 'two-machines'}
                  {@const names = interaction.kind === 'two-machines' ? ['double it', 'square it'] : ['square it']}
                  <div class="rows">
                    <div class="bench-row">
                      <small>IN</small>
                      <button on:click={() => mach = { x: Math.max(0, mach.x - 1) }} aria-label="Decrease input">−</button>
                      <b>{mach.x}</b>
                      <button on:click={() => mach = { x: Math.min(6, mach.x + 1) }} aria-label="Increase input">+</button>
                    </div>
                    <div class="machine-row">
                      {#each names as nm}
                        <div class="machine">
                          <span class="port">{mach.x}</span>
                          <span class="plate">{nm}</span>
                          <b class="port out">{run(nm, mach.x)}</b>
                        </div>
                      {/each}
                    </div>
                  </div>

                {:else if interaction.kind === 'rule-swap'}
                  <div class="rows">
                    <div class="plates">
                      {#each PLATES.slice(0, 3) as nm, pi}
                        <button class="chip plate-pick" class:up={plate === pi} on:click={() => plate = pi}>{nm}</button>
                      {/each}
                    </div>
                    <table class="io-table">
                      <thead><tr><th>in</th><th>out</th></tr></thead>
                      <tbody>
                        {#each [1, 2, 3, 4] as v}
                          <tr><td>{v}</td><td><b>{run(PLATES[plate], v)}</b></td></tr>
                        {/each}
                      </tbody>
                    </table>
                    <p class="stage-note">The left column never moves. Only the plate does.</p>
                  </div>

                {:else if interaction.kind === 'relation-test'}
                  <div class="rows">
                    <label class="range-row">
                      <span>0</span>
                      <input type="range" min="0" max="5" step="0.5" bind:value={lad.d} aria-label="Distance of the foot of the ladder from the wall"/>
                      <span>5</span>
                    </label>
                    <div class="readouts">
                      <div class="readout live"><small>height reached</small><b>{fmt2(ladHeight(lad.d))}</b></div>
                      <div class="readout"><small>bricks in the wall</small><b>1,240</b></div>
                      <div class="readout"><small>year it was built</small><b>1908</b></div>
                    </div>
                    <p class="stage-note">Foot of the ladder, {fmt2(lad.d)} from the wall.</p>
                  </div>

                {:else if interaction.kind === 'function-word'}
                  <div class="rows centre">
                    <div class="glyph">function<em>a relation where changing the first changes the second</em></div>
                  </div>

                {:else if interaction.kind === 'notation-builder'}
                  <div class="rows centre">
                    <div class="build-line">
                      <span class="card val">y<em>what comes out</em></span>
                      <span class="card sym">=</span>
                      <button class="card sym cycle" on:click={() => nota = (nota + 1) % NOTATION.length}>{NOTATION[nota]}<em>the rule</em></button>
                      <span class="card sym">(</span>
                      <span class="card val">x<em>what goes in</em></span>
                      <span class="card sym">)</span>
                    </div>
                    <p class="stage-note">Tap the letter. The meaning underneath does not change.</p>
                  </div>

                {:else if interaction.kind === 'notation-card'}
                  <div class="rows centre">
                    <div class="build-line">
                      {#each NOTATION as L}<span class="card sym">y = {L}(x)</span>{/each}
                    </div>
                    <p class="stage-note">All three say that y depends on x by some rule.</p>
                  </div>

                {:else if interaction.kind === 'two-answers'}
                  {@const outs = forkAnswers(fork.x)}
                  <div class="rows">
                    <div class="bench-row">
                      <small>IN</small>
                      <button on:click={() => fork = { x: fork.x - 1 }} aria-label="Decrease input">−</button>
                      <b>{fmt2(fork.x)}</b>
                      <button on:click={() => fork = { x: fork.x + 1 }} aria-label="Increase input">+</button>
                    </div>
                    <div class="machine">
                      <span class="plate">{FORK_RULE}</span>
                      <div class="fork">
                        {#if outs.length === 0}
                          <span class="port empty">nothing comes out</span>
                        {:else}
                          {#each outs as o}<b class="port out">{fmt2(o)}</b>{/each}
                        {/if}
                      </div>
                    </div>
                    <p class="stage-note">
                      {outs.length === 0 ? 'No number multiplied by itself gives a negative.'
                        : outs.length === 1 ? 'Only here do the two answers land on top of each other.'
                        : 'Two answers, and both are right.'}
                    </p>
                  </div>

                {:else if interaction.kind === 'square-back'}
                  <div class="rows">
                    <table class="io-table">
                      <thead><tr><th>n</th><th>n²</th></tr></thead>
                      <tbody>
                        {#each [-3, -2, -1, 0, 1, 2, 3] as n}
                          <tr><td>{fmt2(n)}</td><td><b>{n * n}</b></td></tr>
                        {/each}
                      </tbody>
                    </table>
                    <p class="stage-note">Read the right column backwards and 9 has two rows pointing at it.</p>
                  </div>

                {:else if interaction.kind === 'function-or-not' || interaction.kind === 'verdict-strip'}
                  {@const cards = [
                    { name: 'double it', runs: '2 → 4, 3 → 6, 4 → 8' },
                    { name: 'square it', runs: '−2 → 4, 0 → 0, 2 → 4' },
                    { name: 'a number whose square is x', runs: '9 → 3 and −3' },
                    { name: '1 divided by it', runs: '2 → 0.5, 0 → refused' },
                    { name: 'a number bigger than x', runs: '3 → 4, 5, 6, …' }
                  ]}
                  {@const shown = interaction.kind === 'verdict-strip' ? cards.slice(0, 3) : cards}
                  <div class="rows">
                    {#each shown as c}
                      <div class="rule-card" class:passed={verdicts[c.name] === 'pass'} class:failed={verdicts[c.name] === 'fail'}>
                        <b>{c.name}</b>
                        {#if testedRules[c.name]}
                          <em>{c.runs}</em>
                        {:else}
                          <button class="chip" on:click={() => testRule(c.name)}>test it</button>
                        {/if}
                        <div class="verdict">
                          <button class="chip" on:click={() => judge(c.name, 'pass')}>function</button>
                          <button class="chip" on:click={() => judge(c.name, 'fail')}>not</button>
                        </div>
                      </div>
                    {/each}
                  </div>

                {:else if interaction.kind === 'accepted-line'}
                  {@const ok = accept.x >= 0}
                  <div class="rows">
                    <label class="range-row">
                      <span>−9</span>
                      <input type="range" min="-9" max="9" step="1" bind:value={accept.x} aria-label="Number offered to the rule"/>
                      <span>9</span>
                    </label>
                    <div class="accept-strip" class:ok>
                      <span>{fmt2(accept.x)}</span>
                      <b>{ok ? `accepted → ${fmt2(Math.sqrt(accept.x))} and ${fmt2(-Math.sqrt(accept.x))}` : 'refused'}</b>
                    </div>
                    <p class="stage-note">Drag across nought and watch where the refusal starts.</p>
                  </div>

                {:else if interaction.kind === 'accepted-list'}
                  <div class="rows">
                    <table class="io-table">
                      <thead><tr><th>input</th><th>verdict</th></tr></thead>
                      <tbody>
                        {#each [-4, -1, 0, 1, 4, 9] as n}
                          <tr><td>{fmt2(n)}</td><td><b>{n < 0 ? 'refused' : 'accepted'}</b></td></tr>
                        {/each}
                      </tbody>
                    </table>
                  </div>
                {/if}

                <!-- Only the kinds that actually read the section value get a
                     control. The harness used to add one to every preview,
                     which put a dead slider under the grids. -->
                {#if !NO_CONTROL.includes(interaction.kind)}
                  <label class="range-row">
                    <span>1.5</span>
                    <input type="range" min="1.5" max="3.5" step="0.1" bind:value={values[si]} aria-label={`Assign x for ${interaction.code}`}/>
                    <span>3.5</span>
                  </label>
                {/if}
              </div>
              {#if !keptOnly}
                <p class="note">{interaction.note}</p>
                {#if finalised[interaction.code]}<p class="why">{finalised[interaction.code]}</p>{/if}
              {/if}
            </article>
          {/each}
        </div>

        <h3>{keptOnly ? 'Checks' : 'Exercise'} {#if !keptOnly}<em>— clickable, answers reveal</em>{/if}</h3>
        <div class="variant-grid">
          {#each (keptOnly ? section.exercises.filter(e => selections[e.code] || finalised[e.code]) : section.exercises) as ex}
            <article class="variant" class:selected={selections[ex.code] && !keptOnly} class:finalised={finalised[ex.code]}>
              <span class="code">{ex.code}{#if selections[ex.code] && !keptOnly} · SELECTED{:else if finalised[ex.code]} · FINALISED{/if}</span>
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
              {:else if ex.kind === 'find-target'}
                <div class="plane" style={`--cols:${PX + 1}`}>
                  {#each Array(PY + 1) as _, r}
                    {#each Array(PX + 1) as _, c}
                      <button class="pcell"
                        class:axis={c === 0 || PY - r === 0}
                        class:here={pt.x === c && pt.y === PY - r}
                        on:click={() => (pt = { x: c, y: PY - r })}
                        aria-label={`Place at ${c}, ${PY - r}`}></button>
                    {/each}
                  {/each}
                </div>
                <p class="kind-note">
                  you placed ( {pt.x} , {pt.y} ) ·
                  <b class:hit={pt.x === ex.tx && pt.y === ex.ty}>{pt.x === ex.tx && pt.y === ex.ty ? 'that is it' : 'not yet'}</b>
                </p>

              {:else if ex.kind === 'set-grid'}
                <div class="grid-wrap small"
                  on:pointerdown={() => (gridDrag = true)}
                  on:pointerup={() => (gridDrag = false)}
                  on:pointerleave={() => (gridDrag = false)}>
                  {#each Array(GRID_H) as _, r}
                    <div class="grid-row">
                      {#each Array(GRID_W) as _, c}
                        <button class="cell"
                          class:on={c < exGrid.b && (GRID_H - 1 - r) < exGrid.a}
                          on:pointerdown={() => (exGrid = { b: c + 1, a: GRID_H - r })}
                          on:pointerenter={() => gridDrag && (exGrid = { b: c + 1, a: GRID_H - r })}
                          aria-label={`Set ${c + 1} by ${GRID_H - r}`}></button>
                      {/each}
                    </div>
                  {/each}
                </div>
                <p class="kind-note">
                  {exGrid.b} × {exGrid.a} = {exGrid.b * exGrid.a} ·
                  <b class:hit={exGridOk(ex, exGrid)}>{exGridOk(ex, exGrid) ? 'that is it' : 'not yet'}</b>
                </p>

              {:else if ex.kind === 'stepper'}
                <div class="stepper">
                  <button aria-label="Decrease" on:click={() => stepBy(ex, -1)}>−</button>
                  <span class="stepper-value">
                    x = {stepValue(ex, stepped).toFixed(ex.step < 1 ? 1 : 0)}{ex.unit ? ' ' + ex.unit : ''}
                    {#if ex.derive === 'square'}
                      <em>y = {(stepValue(ex, stepped) ** 2).toFixed(2)}</em>
                    {:else if ex.derive === 'delta-pair'}
                      <em>Δx = {(stepValue(ex, stepped) - 2).toFixed(2)} · Δy = {(stepValue(ex, stepped) ** 2 - 4).toFixed(2)}</em>
                    {:else if ex.derive === 'interval-rate'}
                      <em>Δx = {[0.001, 0.01, 0.1, 0.5, 1][stepValue(ex, stepped)]} · rate {(4 + [0.001, 0.01, 0.1, 0.5, 1][stepValue(ex, stepped)]).toFixed(3)}</em>
                    {/if}
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
          {#each (keptOnly ? bb1.workshops.filter(w => selections[w.code] || finalised[w.code]) : bb1.workshops) as w}
            <article class="variant" class:selected={selections[w.code] && !keptOnly} class:finalised={finalised[w.code]} class:rejected={rejected[w.code]}>
              <span class="code">{w.code}{#if selections[w.code] && !keptOnly} · SELECTED{:else if finalised[w.code]} · FINALISED{:else if rejected[w.code]} · REJECTED{/if}</span>
              <p class="prompt">{w.name}</p>
              <p class="reading-text">{w.blurb}</p>
              {#if keptOnly}<span class="spacer"></span>{/if}

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
                        <li class:met={goalMet(w.kind, g.id, bench, cb, db, sb, dt, sp, dd, bench24, placed3)}>
                          <i>{goalMet(w.kind, g.id, bench, cb, db, sb, dt, sp, dd, bench24, placed3) ? '✓' : '○'}</i>{g.text}
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
                        <li class:met={goalMet(w.kind, g.id, bench, cb, db, sb, dt, sp, dd, bench24, placed3)}>
                          <i>{goalMet(w.kind, g.id, bench, cb, db, sb, dt, sp, dd, bench24, placed3) ? '✓' : '○'}</i>{g.text}
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
                        <li class:met={goalMet(w.kind, g.id, bench, cb, db, sb, dt, sp, dd, bench24, placed3)}>
                          <i>{goalMet(w.kind, g.id, bench, cb, db, sb, dt, sp, dd, bench24, placed3) ? '✓' : '○'}</i>{g.text}
                        </li>
                      {/each}
                    </ul>
                  </div>

                {:else if w.kind === 'square-builder'}
                  <div class="rows centre">
                    <div class="square-figure">
                      <div class="square area" style={`width:${Math.min(150, sb.side * 34)}px;height:${Math.min(150, sb.side * 34)}px`}>
                        <span>{(sb.side ** 2).toFixed(2)}</span>
                      </div>
                      <span class="edge-label sm" style={`width:${Math.min(150, sb.side * 34)}px`}>x = {sb.side.toFixed(1)}</span>
                    </div>
                    <div class="bench-row">
                      <small>SIDE</small>
                      <button on:click={() => sbStep(-1)} aria-label="Decrease side">−</button>
                      <b>{sb.side.toFixed(1)}</b>
                      <button on:click={() => sbStep(1)} aria-label="Increase side">+</button>
                    </div>
                    <ul class="goals">
                      {#each w.goals as g}
                        <li class:met={goalMet(w.kind, g.id, bench, cb, db, sb, dt, sp, dd, bench24, placed3)}>
                          <i>{goalMet(w.kind, g.id, bench, cb, db, sb, dt, sp, dd, bench24, placed3) ? '✓' : '○'}</i>{g.text}
                        </li>
                      {/each}
                    </ul>
                  </div>

                {:else if w.kind === 'dependence-tester'}
                  <div class="rows">
                    <div class="bench-row">
                      <small>x</small>
                      <button on:click={() => dtStep(-1)} aria-label="Decrease x">−</button>
                      <b>{dt.x}</b>
                      <button on:click={() => dtStep(1)} aria-label="Increase x">+</button>
                    </div>
                    <div class="bench-row locked">
                      <small>y</small>
                      <button on:click={dtRefuse} aria-label="Try to decrease y">−</button>
                      <b>{dt.x ** 2}</b>
                      <button on:click={dtRefuse} aria-label="Try to increase y">+</button>
                    </div>
                    {#if dt.refused}
                      <p class="refusal">y cannot be set on its own. It is whatever x² comes to, so the only way to move it is to move x.</p>
                    {/if}
                    <ul class="goals">
                      {#each w.goals as g}
                        <li class:met={goalMet(w.kind, g.id, bench, cb, db, sb, dt, sp, dd, bench24, placed3)}>
                          <i>{goalMet(w.kind, g.id, bench, cb, db, sb, dt, sp, dd, bench24, placed3) ? '✓' : '○'}</i>{g.text}
                        </li>
                      {/each}
                    </ul>
                  </div>

                {:else if w.kind === 'span-explorer'}
                  <div class="rows">
                    <div class="bench-row">
                      <small>FROM a</small>
                      <button on:click={() => spStep('a', -1)} aria-label="Decrease a">−</button>
                      <b>{sp.a.toFixed(1)}</b>
                      <button on:click={() => spStep('a', 1)} aria-label="Increase a">+</button>
                    </div>
                    <div class="bench-row">
                      <small>TO b</small>
                      <button on:click={() => spStep('b', -1)} aria-label="Decrease b">−</button>
                      <b>{sp.b.toFixed(1)}</b>
                      <button on:click={() => spStep('b', 1)} aria-label="Increase b">+</button>
                    </div>
                    <div class="ratio">
                      <div class="frac">
                        <span><small>Δy</small><b>{sp.a === sp.b ? '0' : (sp.b ** 2 - sp.a ** 2).toFixed(2)}</b></span>
                        <i></i>
                        <span><small>Δx</small><b>{(sp.b - sp.a).toFixed(2)}</b></span>
                      </div>
                      <span class="eq">=</span>
                      <div class="ratio-out">
                        <b>{spRate(sp) === null ? 'undefined' : spRate(sp).toFixed(2)}</b>
                        <small>{sp.a === sp.b ? 'both ends are the same point' : 'cm² per cm'}</small>
                      </div>
                    </div>
                    {#if sp.hits.length}
                      <p class="stage-note">Pairs reaching 5 so far: {sp.hits.join(', ')}</p>
                    {/if}
                    <ul class="goals">
                      {#each w.goals as g}
                        <li class:met={goalMet(w.kind, g.id, bench, cb, db, sb, dt, sp, dd, bench24, placed3)}>
                          <i>{goalMet(w.kind, g.id, bench, cb, db, sb, dt, sp, dd, bench24, placed3) ? '✓' : '○'}</i>{g.text}
                        </li>
                      {/each}
                    </ul>
                  </div>

                {:else if w.kind === 'derivative-dial'}
                  <div class="rows">
                    <div class="bench-row">
                      <small>x</small>
                      <button on:click={() => ddStep(-1)} aria-label="Decrease x">−</button>
                      <b>{dd.x.toFixed(1)}</b>
                      <button on:click={() => ddStep(1)} aria-label="Increase x">+</button>
                    </div>
                    <div class="dial-out">
                      <span><small>AREA x²</small><b>{(dd.x ** 2).toFixed(2)}</b></span>
                      <span><small>RATE 2x</small><b class="accent">{(2 * dd.x).toFixed(2)}</b></span>
                    </div>
                    <ul class="goals">
                      {#each w.goals as g}
                        <li class:met={goalMet(w.kind, g.id, bench, cb, db, sb, dt, sp, dd, bench24, placed3)}>
                          <i>{goalMet(w.kind, g.id, bench, cb, db, sb, dt, sp, dd, bench24, placed3) ? '✓' : '○'}</i>{g.text}
                        </li>
                      {/each}
                    </ul>
                  </div>

                {:else if w.kind === 'diagonal-bench'}
                  <div class="rows centre">
                    <div class="plane" style={`--cols:${PX + 1}`}>
                      {#each Array(PY + 1) as _, r}
                        {#each Array(PX + 1) as _, c}
                          <button class="pcell"
                            class:axis={c === 0 || PY - r === 0}
                            class:dot={placed3.includes(`${c},${PY - r}`)}
                            class:here={pt.x === c && pt.y === PY - r}
                            on:click={() => placeDiag(c, PY - r)}
                            aria-label={`Place at ${c}, ${PY - r}`}></button>
                        {/each}
                      {/each}
                    </div>
                    <div class="plane-read"><span>( {pt.x} , {pt.y} )</span></div>
                    {#if placed3.length}
                      <p class="stage-note">Placed: {placed3.map(k => '(' + k.replace(',', ', ') + ')').join('  ')}</p>
                    {/if}
                    <ul class="goals">
                      {#each w.goals as g}
                        <li class:met={goalMet(w.kind, g.id, bench, cb, db, sb, dt, sp, dd, bench24, placed3)}>
                          <i>{goalMet(w.kind, g.id, bench, cb, db, sb, dt, sp, dd, bench24, placed3) ? '✓' : '○'}</i>{g.text}
                        </li>
                      {/each}
                    </ul>
                  </div>

                {:else if w.kind === 'tiling-bench'}
                  <div class="rows">
                    <div class="bench-target">TARGET AREA <b>{bench24.target}</b></div>
                    <div class="grid-wrap"
                      on:pointerdown={() => (gridDrag = true)}
                      on:pointerup={() => (gridDrag = false)}
                      on:pointerleave={() => (gridDrag = false)}>
                      {#each Array(GRID_H) as _, r}
                        <div class="grid-row">
                          {#each Array(GRID_W) as _, c}
                            <button class="cell"
                              class:on={c < bench24.b && (GRID_H - 1 - r) < bench24.a}
                              class:hitarea={bench24.b * bench24.a === bench24.target && c < bench24.b && (GRID_H - 1 - r) < bench24.a}
                              on:pointerdown={() => benchSet(c + 1, GRID_H - r)}
                              on:pointerenter={() => gridDrag && benchSet(c + 1, GRID_H - r)}
                              aria-label={`Set ${c + 1} by ${GRID_H - r}`}></button>
                          {/each}
                        </div>
                      {/each}
                    </div>
                    <div class="grid-product">{bench24.b} × {bench24.a} = {bench24.b * bench24.a}</div>
                    <div class="bench-targets">
                      <button class:on={bench24.target === 24} on:click={() => benchTarget(24)}>24</button>
                      <button class:on={bench24.target === 16} on:click={() => benchTarget(16)}>16</button>
                      <button class:on={bench24.target === 25} on:click={() => benchTarget(25)}>25</button>
                    </div>
                    {#if bench24.found.length}
                      <p class="stage-note">Found so far: {bench24.found.join(', ')}</p>
                    {/if}
                    <ul class="goals">
                      {#each w.goals as g}
                        <li class:met={goalMet(w.kind, g.id, bench, cb, db, sb, dt, sp, dd, bench24, placed3)}>
                          <i>{goalMet(w.kind, g.id, bench, cb, db, sb, dt, sp, dd, bench24, placed3) ? '✓' : '○'}</i>{g.text}
                        </li>
                      {/each}
                    </ul>
                  </div>

                {:else if w.kind === 'repair-bench'}
                  <div class="rows">
                    {#each w.machines as m, mi}
                      <div class="rule-card" class:passed={rb.verdicts[mi] === 'pass'} class:failed={rb.verdicts[mi] === 'fail'}>
                        <b>{m.name}</b>
                        <div class="panel">
                          {#each m.buttons as label, bi}
                            <button class="panel-btn sm" on:click={() => rbPress(mi, bi, label)}>
                              <b>{bi + 1}</b>
                              {#if rb.pressed[`${mi}:${bi}`]}<em>{rb.pressed[`${mi}:${bi}`]}</em>{/if}
                            </button>
                          {/each}
                        </div>
                        <div class="verdict">
                          <button class="chip" on:click={() => rbJudge(mi, 'pass')}>can be relied on</button>
                          <button class="chip" on:click={() => rbJudge(mi, 'fail')}>cannot</button>
                        </div>
                      </div>
                    {/each}
                    <ul class="goals">
                      {#each w.goals as g}
                        <li class:met={benchGoal(g.id, rb, w.machines)}>
                          <i>{benchGoal(g.id, rb, w.machines) ? '✓' : '○'}</i>{g.text}
                        </li>
                      {/each}
                    </ul>
                  </div>

                {:else if w.kind === 'machine-bench'}
                  <div class="rows">
                    <div class="plates">
                      {#each w.plates as nm, pi}
                        <button class="chip plate-pick" class:up={fm.plate === pi} on:click={() => fm = { ...fm, plate: pi }}>{nm}</button>
                      {/each}
                    </div>
                    <div class="tray">
                      {#each w.inputs as v}
                        <button class="chip pick" on:click={() => fmFeed(v)}>{fmt2(v)}</button>
                      {/each}
                    </div>
                    {#if fm.seen.length}
                      <p class="stage-note">
                        {fm.seen.slice(-6).map(r => `${fmt2(r.input)} → ${fmt2(r.out)}`).join('   ')}
                      </p>
                    {/if}
                    <ul class="goals">
                      {#each w.goals as g}
                        <li class:met={machineGoal(g.id, fm)}>
                          <i>{machineGoal(g.id, fm) ? '✓' : '○'}</i>{g.text}
                        </li>
                      {/each}
                    </ul>
                  </div>

                {:else if w.kind === 'rule-guess'}
                  <div class="rows">
                    <div class="tray">
                      {#each w.inputs as v}
                        <button class="chip pick" on:click={() => rgFeed(v)}>{fmt2(v)}</button>
                      {/each}
                    </div>
                    <table class="io-table">
                      <thead><tr><th>in</th><th>out</th></tr></thead>
                      <tbody>
                        {#each rg.fed as f}<tr><td>{fmt2(f.input)}</td><td><b>{fmt2(f.out)}</b></td></tr>{/each}
                      </tbody>
                    </table>
                    <div class="plates">
                      {#each w.plates as nm}
                        <button class="chip plate-pick" class:up={rg.guess === nm} on:click={() => rg = { ...rg, guess: nm }}>{nm}</button>
                      {/each}
                    </div>
                    <ul class="goals">
                      {#each w.goals as g}
                        <li class:met={guessGoal(g.id, rg)}>
                          <i>{guessGoal(g.id, rg) ? '✓' : '○'}</i>{g.text}
                        </li>
                      {/each}
                    </ul>
                  </div>

                {:else if w.kind === 'rule-inspector'}
                  <div class="rows">
                    {#each w.rules as r}
                      <div class="rule-card" class:passed={ri.verdicts[r.name] === 'pass'} class:failed={ri.verdicts[r.name] === 'fail'}>
                        <b>{r.name}</b>
                        <div class="verdict">
                          <button class="chip" on:click={() => ri = { verdicts: { ...ri.verdicts, [r.name]: 'pass' } }}>function</button>
                          <button class="chip" on:click={() => ri = { verdicts: { ...ri.verdicts, [r.name]: 'fail' } }}>not</button>
                        </div>
                      </div>
                    {/each}
                    <ul class="goals">
                      {#each w.goals as g}
                        <li class:met={inspectorGoal(g.id, ri, w.rules)}>
                          <i>{inspectorGoal(g.id, ri, w.rules) ? '✓' : '○'}</i>{g.text}
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

              {#if !keptOnly}<p class="note">{w.note}</p>{/if}
            </article>
          {/each}
        </div>
      </section>
    {/if}

    <section class="closing">
      {#if keptOnly}
        <h2>Ready to approve?</h2>
        {#if outstanding.length}
          <p class="warn">
            Not yet. {outstanding.length} section{outstanding.length === 1 ? '' : 's'} still
            {outstanding.length === 1 ? 'has' : 'have'} an empty slot, so this sheet is showing an
            incomplete board. Switch back to all variants and fill them.
          </p>
          <ul class="outstanding">
            {#each outstanding as row}
              <li><b>{row.code}</b> {row.name}<span>{row.missing.join(', ')}</span></li>
            {/each}
          </ul>
        {:else}
          <p>
            Every slot is filled. This is {bb1.title} as chosen, with nothing
            rejected or undecided on screen. Read it through, and if it stands, say
            so and I will write the approval into the record and the status page
            with your name and today's date.
          </p>
          <p class="note">
            Approval is a sentence to me, not a button here. This page cannot write
            to the repository, which is deliberate: nothing should be able to change
            curriculum status without passing through a person.
          </p>
        {/if}
      {:else}
        <h2>Still open</h2>
        {#if outstanding.length}
          <ul class="outstanding">
            {#each outstanding as row}
              <li><b>{row.code}</b> {row.name}<span>{row.missing.join(', ')}</span></li>
            {/each}
          </ul>
        {:else}
          <p>Every slot is filled. Switch to the kept sheet for a last read before approval.</p>
        {/if}

        <h2>Sending your selection</h2>
        <p>
          Reply with one reading, one interaction and one exercise per section, for
          example <code>S1-A, S1-I1, S1-X2, S2-B, S2-I1, S2-X1 …</code>. Anything you
          leave out I will choose and record as a finalised conclusion. Anything you
          want reworded stays here rather than graduating to the record.
        </p>
      {/if}
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
  .bench-row.locked button { border-style: dashed; color: var(--qx-text-faint); }
  .bench-row.locked b { color: var(--qx-text-dim); }
  .dial-out { display: flex; gap: 10px; }
  .dial-out span { flex: 1; display: flex; flex-direction: column; gap: 3px; border: 1px solid var(--qx-border-2); border-radius: 11px; padding: 9px 12px; background: var(--qx-surface); }
  .dial-out small { font-size: 8.5px; letter-spacing: .1em; font-weight: 900; color: var(--qx-text-faint); }
  .dial-out b { font-size: 20px; }
  .dial-out b.accent { color: var(--qx-accent-text); }
  .refusal { font-size: 12px; line-height: 1.5; color: var(--qx-danger-text); background: var(--qx-danger-soft); border-radius: 9px; padding: 9px 11px; font-weight: 700; }
  .stepper-value em { display: block; font-style: normal; font-size: 12px; font-weight: 800; color: var(--qx-text-dim); margin-top: 2px; }
  .expand-top { display: flex; align-items: center; gap: 4px; }
  .expand-arrow { color: var(--qx-text-faint); font-size: 20px; }
  .expand-sum { display: flex; align-items: center; gap: 8px; font-size: 21px; font-weight: 900; }
  .expand-sum i { font-style: normal; color: var(--qx-text-faint); font-weight: 700; }
  .expand-sum b.accent { color: var(--qx-accent-text); }
  .applied-row { display: flex; align-items: center; gap: 10px; border: 1px solid var(--qx-border-2); border-radius: 10px; padding: 9px 11px; background: var(--qx-surface); }
  .applied-row b { min-width: 34px; font-size: 17px; color: var(--qx-accent-text); }
  .applied-row span { flex: 1; font-size: 14px; font-weight: 800; }
  .applied-row em { font-style: normal; font-size: 9.5px; letter-spacing: .07em; font-weight: 800; color: var(--qx-text-faint); }
  .build-line { display: flex; align-items: center; gap: 4px; }
  .glyph-sm { min-width: 46px; height: 56px; border: 2px solid var(--qx-accent); border-radius: 11px; background: var(--qx-accent-soft); color: var(--qx-accent-text); display: grid; place-items: center; font-size: 28px; font-weight: 900; padding: 0 10px; }
  .glyph-sm.let { font: italic 800 28px/1 Georgia, serif; }
  .glyph-sm.empty { border-style: dashed; border-color: var(--qx-border-2); background: transparent; color: var(--qx-text-faint); }
  .build-read { font-size: 13px; font-weight: 800; color: var(--qx-text-2); }
  .pair-row { display: flex; align-items: center; gap: 9px; font-size: 13px; }
  .pair-row b { min-width: 52px; font-size: 15px; color: var(--qx-accent-text); }
  .pair-row i { font-style: normal; color: var(--qx-text-faint); }
  .ok { font-size: 12px; line-height: 1.45; color: var(--qx-green-text); background: var(--qx-green-soft); border-radius: 9px; padding: 8px 11px; }

  /* Functions boards. */
  .work-lines { display: flex; flex-direction: column; gap: 5px; font-size: 14px; color: var(--qx-text-2); }
  .work-lines b { font-size: 19px; color: var(--qx-accent-text); }
  .machine-row { display: flex; gap: 12px; flex-wrap: wrap; }
  .machine { flex: 1; min-width: 128px; display: flex; flex-direction: column; align-items: center; gap: 7px; border: 1px solid var(--qx-border-2); border-radius: 12px; padding: 11px 9px; }
  .machine .port { font-size: 16px; font-weight: 800; color: var(--qx-text-2); }
  .machine .port.out { font-size: 21px; color: var(--qx-accent-text); }
  .machine .port.empty { font-size: 12px; font-weight: 700; color: var(--qx-text-faint); }
  .machine .plate { font-size: 11px; font-weight: 800; letter-spacing: .04em; text-transform: uppercase; color: var(--qx-text-dim); border-top: 1px dashed var(--qx-border-2); border-bottom: 1px dashed var(--qx-border-2); padding: 5px 0; width: 100%; text-align: center; }
  .fork { display: flex; gap: 14px; align-items: center; }
  .plates { display: flex; gap: 6px; flex-wrap: wrap; }
  .plate-pick { font-size: 11.5px; }
  .io-table { border-collapse: collapse; font-size: 13px; align-self: flex-start; }
  .io-table th { font-size: 9.5px; letter-spacing: .08em; text-transform: uppercase; color: var(--qx-text-faint); text-align: left; padding: 0 16px 4px 0; font-weight: 800; }
  .io-table td { padding: 2px 16px 2px 0; color: var(--qx-text-2); }
  .io-table b { color: var(--qx-accent-text); font-size: 15px; }
  .readouts { display: flex; gap: 8px; flex-wrap: wrap; }
  .readout { flex: 1; min-width: 96px; border: 1px solid var(--qx-border-2); border-radius: 10px; padding: 8px 9px; opacity: .5; }
  .readout.live { opacity: 1; border-color: var(--qx-accent); background: var(--qx-accent-soft); }
  .readout small { display: block; font-size: 9.5px; letter-spacing: .05em; text-transform: uppercase; color: var(--qx-text-faint); font-weight: 800; }
  .readout b { font-size: 18px; color: var(--qx-accent-text); }
  .cycle { cursor: pointer; }
  .rule-card { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; border: 1px solid var(--qx-border-2); border-radius: 11px; padding: 9px 11px; }
  .rule-card b { font-size: 13px; flex: 1; min-width: 132px; }
  .rule-card em { font-style: normal; font-size: 11.5px; color: var(--qx-text-faint); }
  .rule-card.passed { border-color: var(--qx-green); background: var(--qx-green-soft); }
  .rule-card.failed { border-color: var(--qx-accent); background: var(--qx-accent-soft); }
  .verdict { display: flex; gap: 5px; }
  .accept-strip { display: flex; align-items: center; gap: 11px; border: 1px dashed var(--qx-border-2); border-radius: 10px; padding: 9px 11px; font-size: 13px; }
  .accept-strip span { font-size: 18px; font-weight: 800; min-width: 34px; }
  .accept-strip b { color: var(--qx-text-faint); }
  .accept-strip.ok { border-style: solid; border-color: var(--qx-green); }
  .accept-strip.ok b { color: var(--qx-green-text); }

  /* What a Button Does. */
  .lamp { width: 74px; height: 74px; border-radius: 50%; display: grid; place-items: center; font-size: 12px; font-weight: 900; letter-spacing: .08em; border: 2px solid var(--qx-border-2); color: var(--qx-text-faint); transition: background .12s, color .12s, border-color .12s; }
  .lamp.lit { background: var(--qx-accent-soft); border-color: var(--qx-accent); color: var(--qx-accent-text); box-shadow: 0 0 0 7px var(--qx-accent-soft); }
  .switch-body { display: flex; flex-direction: column; border: 1px solid var(--qx-border-2); border-radius: 11px; overflow: hidden; width: 96px; }
  .switch-half { padding: 9px 0; font-size: 12px; font-weight: 800; letter-spacing: .05em; background: transparent; border: 0; color: var(--qx-text-dim); cursor: pointer; }
  .switch-half + .switch-half { border-top: 1px solid var(--qx-border-2); }
  .switch-half.on { background: var(--qx-accent); color: #fff; }
  .flow-row { display: flex; align-items: baseline; gap: 7px; }
  .flow-row b { font-size: 25px; color: var(--qx-accent-text); }
  .flow-row small { font-size: 11px; color: var(--qx-text-faint); }
  .flow-bar { height: 9px; border-radius: 5px; background: var(--qx-border-1); overflow: hidden; }
  .flow-bar i { display: block; height: 100%; background: var(--qx-accent); }
  .panel { display: flex; gap: 6px; flex-wrap: wrap; }
  .panel-btn { min-width: 46px; padding: 8px 9px; border: 1px solid var(--qx-border-2); border-radius: 9px; background: transparent; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 2px; }
  .panel-btn b { font-size: 15px; color: var(--qx-accent-text); }
  .panel-btn em { font-style: normal; font-size: 10px; color: var(--qx-text-faint); }
  .panel-btn.sm { min-width: 40px; padding: 6px 7px; }
  .io-table b.two { color: var(--qx-accent-text); background: var(--qx-accent-soft); border-radius: 5px; padding: 1px 5px; }

  .kind-note { font-size: 12.5px; color: var(--qx-text-dim); line-height: 1.5; }
  .kind-note b { color: var(--qx-text-dim); }
  .kind-note b.hit { color: var(--qx-green-text); }

  .gate { border: 1px dashed var(--qx-danger); border-radius: 11px; padding: 11px 13px; background: var(--qx-danger-soft); color: var(--qx-danger-text); font-size: 12.5px; line-height: 1.5; font-weight: 700; margin-top: 14px; }
  .mini-svg .train { fill: var(--qx-accent); }
  .mode-switch { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 4px; }
  .mode-switch button { display: flex; flex-direction: column; gap: 3px; align-items: flex-start; border: 1px solid var(--qx-border-2); background: var(--qx-surface); color: var(--qx-text-dim); border-radius: 12px; padding: 10px 15px; cursor: pointer; font-weight: 900; font-size: 13px; }
  .mode-switch button em { font-style: normal; font-size: 10.5px; font-weight: 700; color: var(--qx-text-faint); }
  .mode-switch button.on { border-color: var(--qx-green); background: var(--qx-green-soft); color: var(--qx-green-text); }
  .warn { color: var(--qx-danger-text); background: var(--qx-danger-soft); border: 1px solid var(--qx-danger); border-radius: 11px; padding: 11px 13px; font-size: 13px; line-height: 1.55; font-weight: 700; margin-bottom: 12px; }
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
  .flow { display: flex; align-items: center; gap: 10px; }
  .flow-card { display: flex; flex-direction: column; gap: 3px; border: 2px solid var(--qx-accent); border-radius: 12px; padding: 11px 15px; background: var(--qx-accent-soft); color: var(--qx-accent-text); font-size: 17px; font-weight: 900; }
  .flow-card.dep { border-style: dashed; border-color: var(--qx-border-2); background: var(--qx-surface); color: var(--qx-text); }
  .flow-card em { font-style: normal; font-size: 8.5px; letter-spacing: .09em; color: var(--qx-text-faint); font-weight: 800; }
  .flow-arrow { position: relative; color: var(--qx-text-faint); font-size: 22px; width: 42px; text-align: center; }
  .flow-arrow i { position: absolute; left: 0; top: 50%; width: 9px; height: 9px; border-radius: 50%; background: var(--qx-accent); transform: translateY(-50%); animation: pulse-right .55s ease-out; }
  @keyframes pulse-right { from { left: 0; opacity: 1; } to { left: 34px; opacity: 0; } }
  .unit-fig { display: grid; grid-template-columns: auto auto; grid-template-rows: auto auto; align-items: center; justify-items: center; gap: 7px; }
  .unit-sq { width: 62px; height: 62px; border: 2px solid var(--qx-accent); background: var(--qx-accent-soft); border-radius: 3px; padding: 0; }
  .unit-sq.live { cursor: pointer; }
  .unit-sq.refused { border-style: dashed; }
  .unit-stack { display: grid; grid-template-columns: repeat(var(--n), 30px); grid-template-rows: repeat(var(--n), 30px); gap: 2px; }
  .unit-stack i { border: 1px solid var(--qx-accent); background: var(--qx-accent-soft); border-radius: 2px; }

  .plane { display: grid; grid-template-columns: repeat(var(--cols), 26px); gap: 1px; touch-action: none; }
  .pcell { width: 26px; height: 26px; border: 1px solid var(--qx-border); background: var(--qx-surface); border-radius: 2px; padding: 0; cursor: pointer; }
  .pcell.axis { background: var(--qx-surface-3); }
  .pcell.dot { background: var(--qx-green); border-color: var(--qx-green); }
  .pcell.here { background: var(--qx-accent); border-color: var(--qx-accent); }
  .plane-read { display: flex; align-items: baseline; gap: 10px; font-size: 19px; font-weight: 900; color: var(--qx-accent-text); }
  .plane-read em { font-style: normal; font-size: 11px; letter-spacing: .08em; font-weight: 800; color: var(--qx-text-faint); }
  .fails-read { display: flex; gap: 14px; }
  .fails-read span { border: 1px solid var(--qx-danger); background: var(--qx-danger-soft); color: var(--qx-danger-text); border-radius: 9px; padding: 7px 12px; font-size: 13px; font-weight: 800; }
  .reveal-btn { border: 1px solid var(--qx-accent); background: var(--qx-accent-soft); color: var(--qx-accent-text); border-radius: 11px; padding: 9px 14px; font-weight: 900; font-size: 12px; cursor: pointer; }
  .side-mark { font-size: 13px; font-weight: 900; color: var(--qx-accent-text); }
  .side-mark.under { grid-column: 2; }

  .grid-wrap { display: flex; flex-direction: column; gap: 2px; touch-action: none; user-select: none; }
  .grid-wrap.small { transform: scale(.86); transform-origin: left top; }
  .grid-row { display: flex; gap: 2px; }
  .cell { width: 30px; height: 30px; border: 1px solid var(--qx-border-2); background: var(--qx-surface); border-radius: 2px; cursor: pointer; padding: 0; }
  .cell.on { background: var(--qx-accent-soft); border-color: var(--qx-accent); }
  .cell.sq { background: var(--qx-green-soft); border-color: var(--qx-green); }
  .cell.hitarea { background: var(--qx-green-soft); border-color: var(--qx-green); }
  .grid-read { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; }
  .grid-read span { display: flex; flex-direction: column; align-items: center; gap: 2px; }
  .grid-read small { font-size: 8.5px; letter-spacing: .1em; font-weight: 900; color: var(--qx-text-faint); }
  .grid-read b { font-size: 19px; }
  .grid-read b.accent { color: var(--qx-accent-text); }
  .grid-product { font-size: 18px; font-weight: 900; color: var(--qx-accent-text); }
  .bench-target { font-size: 10px; letter-spacing: .12em; font-weight: 900; color: var(--qx-text-faint); }
  .bench-target b { font-size: 18px; color: var(--qx-accent-text); margin-left: 6px; }
  .bench-targets { display: flex; gap: 7px; }
  .bench-targets button { min-width: 44px; height: 36px; border-radius: 10px; border: 1px solid var(--qx-border-2); background: var(--qx-surface); color: var(--qx-text); font-weight: 900; cursor: pointer; }
  .bench-targets button.on { border-color: var(--qx-accent); background: var(--qx-accent-soft); color: var(--qx-accent-text); }

  .hidden { display: none; }
  .spacer { display: none; }
  .variant.rejected { opacity: .55; }
  .variant.rejected .code { border-color: var(--qx-danger); color: var(--qx-danger-text); }
  .facts-head { display: flex; justify-content: center; margin-bottom: 4px; }
  .fact { display: flex; align-items: center; gap: 9px; font-size: 13px; font-weight: 700; border: 1px solid var(--qx-border); border-radius: 9px; padding: 8px 11px; }
  .fact.no { color: var(--qx-danger-text); background: var(--qx-danger-soft); border-color: var(--qx-danger); }
  .fact.yes { color: var(--qx-green-text); background: var(--qx-green-soft); border-color: var(--qx-green); }
  .rearrange { display: flex; align-items: center; gap: 8px; font-size: 16px; font-weight: 800; border: 1px solid var(--qx-border-2); border-radius: 10px; padding: 10px 12px; background: var(--qx-surface); }
  .rearrange i { font-style: normal; color: var(--qx-text-faint); }
  .rearrange b.accent { color: var(--qx-accent-text); }
  .tokens { display: flex; gap: 12px; }
  .token { min-width: 62px; height: 58px; border-radius: 13px; border: 2px solid var(--qx-accent); background: var(--qx-accent-soft); color: var(--qx-accent-text); font: italic 800 26px/1 Georgia, serif; cursor: pointer; }
  .token.joined { letter-spacing: -1px; }
  .signed { position: relative; width: 100%; max-width: 300px; height: 46px; }
  .signed .axis-line { position: absolute; left: 0; right: 0; top: 50%; height: 1px; background: var(--qx-text-dim); }
  .signed .zero-tick { position: absolute; left: 50%; top: 8px; bottom: 8px; width: 2px; background: var(--qx-text-dim); }
  .signed-fill { position: absolute; top: 50%; transform: translateY(-50%); height: 18px; border-radius: 4px; background: var(--qx-accent); transition: width .12s; }
  .signed-fill.neg { background: var(--qx-danger); }
  .signed-read { font-size: 16px; font-weight: 900; color: var(--qx-accent-text); }
  .signed-read.neg { color: var(--qx-danger-text); }
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
