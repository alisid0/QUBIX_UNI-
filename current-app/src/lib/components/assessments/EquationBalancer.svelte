<script>
  // EquationBalancer — the "balance it" chemistry lab, built around a real
  // balance scale. Adjust the coefficient in front of each species; the atoms
  // pile onto two pans (CPK-coloured, like the other chem labs) and the beam
  // tips by actual atomic mass — leveling only when the equation truly balances.
  // Conservation of mass, made physical. A station solves when every element
  // matches AND the coefficients are the simplest whole-number ratio.

  export let prompt = 'Balance each equation: level the scale by matching the atoms on both sides.';
  export let onDone = () => {};

  const reduceMotion = typeof matchMedia !== 'undefined'
    && matchMedia('(prefers-reduced-motion: reduce)').matches;

  // element → CPK fill, darker stroke, approximate atomic mass
  const EL = {
    H:  { c: '#E9EEF7', s: '#B9C6DE', m: 1 },
    C:  { c: '#9AA0A6', s: '#6E747A', m: 12 },
    N:  { c: '#9D8CFF', s: '#6F5FE0', m: 14 },
    O:  { c: '#71B7FF', s: '#3E8FE0', m: 16 },
    Fe: { c: '#E0733A', s: '#B4551F', m: 56 },
  };

  const STATIONS = [
    { label: 'Water',   note: 'Hydrogen burns in oxygen to form water.',
      left: [{ f: 'H2', a: { H: 2 } }, { f: 'O2', a: { O: 2 } }], right: [{ f: 'H2O', a: { H: 2, O: 1 } }] },
    { label: 'Ammonia', note: 'Nitrogen and hydrogen combine to make ammonia.',
      left: [{ f: 'N2', a: { N: 2 } }, { f: 'H2', a: { H: 2 } }], right: [{ f: 'NH3', a: { N: 1, H: 3 } }] },
    { label: 'Methane', note: 'Methane burns completely in oxygen.',
      left: [{ f: 'CH4', a: { C: 1, H: 4 } }, { f: 'O2', a: { O: 2 } }], right: [{ f: 'CO2', a: { C: 1, O: 2 } }, { f: 'H2O', a: { H: 2, O: 1 } }] },
    { label: 'Rust',    note: 'Iron reacts with oxygen to form iron(III) oxide.',
      left: [{ f: 'Fe', a: { Fe: 1 } }, { f: 'O2', a: { O: 2 } }], right: [{ f: 'Fe2O3', a: { Fe: 2, O: 3 } }] },
    { label: 'Ethane',  note: 'Ethane burns in oxygen — mind the odd oxygen.',
      left: [{ f: 'C2H6', a: { C: 2, H: 6 } }, { f: 'O2', a: { O: 2 } }], right: [{ f: 'CO2', a: { C: 1, O: 2 } }, { f: 'H2O', a: { H: 2, O: 1 } }] },
  ];

  let stage = 0, stageDone = false, complete = false, coeffs = [], showHint = false;
  function seedStage(i) { coeffs = [...STATIONS[i].left, ...STATIONS[i].right].map(() => 1); stageDone = false; showHint = false; }
  seedStage(0);

  const MAX = 12;
  function bump(i, d) { if (stageDone) return; coeffs[i] = Math.min(MAX, Math.max(1, coeffs[i] + d)); coeffs = [...coeffs]; }

  const gcd = (a, b) => (b ? gcd(b, a % b) : a);
  const D = { 0: '₀', 1: '₁', 2: '₂', 3: '₃', 4: '₄', 5: '₅', 6: '₆', 7: '₇', 8: '₈', 9: '₉' };
  const sub = (f) => f.replace(/\d/g, (d) => D[d]);

  $: station = STATIONS[stage];
  $: nLeft = station.left.length;
  $: species = [...station.left.map((s) => ({ ...s, side: 'L' })), ...station.right.map((s) => ({ ...s, side: 'R' }))];
  // Pass species + coeffs as args so Svelte sees the dependency (a $: that
  // only names sideCounts wouldn't re-run when species/coeffs change, and could
  // even run before species is assigned).
  function sideCounts(sp, cf, side) {
    const c = {};
    sp.forEach((s, i) => { if (s.side !== side) return; for (const [el, n] of Object.entries(s.a)) c[el] = (c[el] || 0) + n * cf[i]; });
    return c;
  }
  $: leftCounts = sideCounts(species, coeffs, 'L');
  $: rightCounts = sideCounts(species, coeffs, 'R');
  $: elements = [...new Set(species.flatMap((s) => Object.keys(s.a)))];
  $: tally = elements.map((el) => {
    const L = leftCounts[el] || 0, R = rightCounts[el] || 0;
    return { el, L, R, ok: L === R && L > 0 };
  });
  $: leftMass = Object.entries(leftCounts).reduce((a, [el, n]) => a + n * EL[el].m, 0);
  $: rightMass = Object.entries(rightCounts).reduce((a, [el, n]) => a + n * EL[el].m, 0);
  $: allBalanced = tally.length > 0 && tally.every((t) => t.ok);
  $: simplest = coeffs.reduce((a, b) => gcd(a, b), 0) === 1;
  $: overBalanced = allBalanced && !simplest;
  $: solved = allBalanced && simplest;
  $: if (solved && !stageDone) stageDone = true;

  const MAXA = 14;
  // Beam tips by mass difference (positive = right heavier = right pan down).
  // Level only when truly solved, so a coincidental equal-mass state doesn't
  // read as "done".
  $: beamAngle = solved ? 0 : Math.max(-MAXA, Math.min(MAXA, MAXA * Math.tanh((rightMass - leftMass) / 12)));

  // Strategy hint: metals/carbon/nitrogen are easiest (one compound each side);
  // leave O and H for last. Point at the first unbalanced element by that rule.
  const PRIORITY = ['Fe', 'C', 'N', 'H', 'O'];
  $: hintText = (() => {
    const off = tally.filter((t) => !t.ok);
    if (!off.length) return '';
    const t = PRIORITY.map((el) => off.find((o) => o.el === el)).find(Boolean) || off[0];
    const late = t.el === 'O' || t.el === 'H';
    return `Look at ${t.el}: ${t.L} on the left, ${t.R} on the right. `
      + (late ? 'Balance oxygen and hydrogen last — fix the other elements first, then come back to these.'
              : `It appears in just one species on each side, so it's the easiest to lock in first.`);
  })();

  // Atom layout for one pan: clusters of CPK circles per element, capped, with
  // a count label. Returns { circles:[{x,y,el}], labels:[{x,el,n}] }.
  const R = 6.2, GAP = 14, CAP = 6, CLUSTER_GAP = 12;
  function panAtoms(counts) {
    const els = Object.keys(counts).filter((el) => counts[el] > 0);
    const clusters = els.map((el) => ({ el, n: counts[el], cols: Math.min(3, counts[el]) }));
    const widths = clusters.map((c) => c.cols * GAP);
    const total = widths.reduce((a, w) => a + w, 0) + CLUSTER_GAP * Math.max(0, clusters.length - 1);
    let x = -total / 2;
    const circles = [], labels = [];
    clusters.forEach((c, ci) => {
      const shown = Math.min(c.n, CAP), cols = c.cols;
      const cx0 = x + widths[ci] / 2;
      for (let k = 0; k < shown; k++) {
        const row = Math.floor(k / cols), col = k % cols;
        const rowLen = Math.min(cols, shown - row * cols);
        circles.push({ x: cx0 + (col - (rowLen - 1) / 2) * GAP, y: -8 - row * GAP, el: c.el });
      }
      labels.push({ x: cx0, el: c.el, n: c.n });
      x += widths[ci] + CLUSTER_GAP;
    });
    return { circles, labels };
  }
  $: leftPan = panAtoms(leftCounts);
  $: rightPan = panAtoms(rightCounts);

  const PIV = { x: 150, y: 120 };
  const ARM = 96, HANG = 30;
  $: leftEnd = { x: PIV.x - ARM, y: PIV.y };
  $: rightEnd = { x: PIV.x + ARM, y: PIV.y };

  function nextStage() {
    if (stage < STATIONS.length - 1) { stage += 1; seedStage(stage); }
    else complete = true;
  }
</script>

<div class="eb-lab">
  {#if complete}
    <div class="eb-complete">
      <div class="eb-complete-mark">✓</div>
      <div class="eb-complete-title">Equation Balancer complete</div>
      <p>You levelled every scale — matching atoms on both sides and reducing each equation to its simplest whole-number ratio. That balance point is conservation of mass: atoms are only rearranged, never created or destroyed.</p>
      <button class="eb-primary" on:click={() => onDone(1, 1)}>Continue</button>
    </div>
  {:else}
    <div class="eb-prompt">{prompt}</div>

    <div class="eb-stages" aria-label="Equations">
      {#each STATIONS as s, i}
        <span class="eb-stage-dot" class:done={i < stage} class:cur={i === stage}>{s.label}</span>
      {/each}
    </div>

    <!-- The balance scale -->
    <svg class="eb-scale" class:level={solved} viewBox="0 0 300 210" role="img" aria-label="Balance scale of atoms">
      <line class="eb-post" x1="150" y1="120" x2="150" y2="188" />
      <polygon class="eb-base" points="120,190 180,190 172,198 128,198" />
      <polygon class="eb-fulcrum" points="150,110 160,124 140,124" />

      <g class="eb-beam-group" style={`transform: rotate(${beamAngle}deg); transform-origin: ${PIV.x}px ${PIV.y}px; transition: transform ${reduceMotion ? 0 : 500}ms cubic-bezier(.34,1.3,.5,1);`}>
        <line class="eb-beam" x1={leftEnd.x} y1={leftEnd.y} x2={rightEnd.x} y2={rightEnd.y} />
        <circle class="eb-pivot" cx={PIV.x} cy={PIV.y} r="4.5" />

        {#each [{ end: leftEnd, pan: leftPan }, { end: rightEnd, pan: rightPan }] as P}
          <line class="eb-chain" x1={P.end.x - 34} y1={P.end.y} x2={P.end.x - 34} y2={P.end.y + HANG} />
          <line class="eb-chain" x1={P.end.x + 34} y1={P.end.y} x2={P.end.x + 34} y2={P.end.y + HANG} />
          <g style={`transform: rotate(${-beamAngle}deg); transform-origin: ${P.end.x}px ${P.end.y + HANG}px; transition: transform ${reduceMotion ? 0 : 500}ms cubic-bezier(.34,1.3,.5,1);`}>
            <path class="eb-pan" d={`M ${P.end.x - 44} ${P.end.y + HANG} Q ${P.end.x} ${P.end.y + HANG + 16} ${P.end.x + 44} ${P.end.y + HANG} Z`} />
            <g transform={`translate(${P.end.x} ${P.end.y + HANG})`}>
              {#each P.pan.circles as a}
                <circle r={R} cx={a.x} cy={a.y} fill={EL[a.el].c} stroke={EL[a.el].s} stroke-width="1.4" />
              {/each}
              {#each P.pan.labels as l}
                <text class="eb-atom-label" x={l.x} y="16">{l.n} {l.el}</text>
              {/each}
            </g>
          </g>
        {/each}
      </g>
    </svg>

    <div class="eb-masswrap">
      <span class="eb-mass" class:heavy={leftMass > rightMass}>left {leftMass}</span>
      <span class="eb-balpt" class:on={solved}>{solved ? 'balanced' : leftMass === rightMass ? 'level' : 'tipping'}</span>
      <span class="eb-mass" class:heavy={rightMass > leftMass}>right {rightMass}</span>
    </div>

    <div class="eb-equation">
      {#each species as s, i}
        {#if i === nLeft}<div class="eb-arrow">→</div>{:else if i > 0}<div class="eb-plus">+</div>{/if}
        <div class="eb-species">
          <div class="eb-stepper">
            <button on:click={() => bump(i, -1)} disabled={stageDone || coeffs[i] <= 1} aria-label="decrease">−</button>
            <span class="eb-coeff" class:one={coeffs[i] === 1}>{coeffs[i]}</span>
            <button on:click={() => bump(i, 1)} disabled={stageDone || coeffs[i] >= MAX} aria-label="increase">+</button>
          </div>
          <div class="eb-formula">{sub(s.f)}</div>
        </div>
      {/each}
    </div>

    <div class="eb-tally">
      {#each tally as t}
        <span class="eb-atom-chip" class:ok={t.ok}>{t.el} {t.L}<span class="eb-vs">|</span>{t.R} {t.ok ? '✓' : '✗'}</span>
      {/each}
    </div>

    {#if stageDone}
      <div class="eb-good">Level — the scale balances. Atoms match on both sides in the simplest ratio.</div>
      <button class="eb-primary" on:click={nextStage}>{stage === STATIONS.length - 1 ? 'Finish the lab' : 'Next equation →'}</button>
    {:else if overBalanced}
      <div class="eb-hint">Every atom matches, but the coefficients share a common factor — divide them all down to the simplest whole-number ratio.</div>
    {:else if showHint}
      <div class="eb-hint">{hintText}</div>
    {:else}
      <button class="eb-hintbtn" on:click={() => showHint = true}>Stuck? Show a strategy hint</button>
    {/if}
  {/if}
</div>

<style>
  .eb-lab { width: 100%; max-width: 400px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; gap: 12px; }
  .eb-prompt { color: var(--qx-text); font-size: 15px; font-weight: 780; line-height: 1.42; text-align: center; }

  .eb-stages { display: flex; gap: 5px; flex-wrap: wrap; justify-content: center; }
  .eb-stage-dot {
    font-size: 10px; font-weight: 850; letter-spacing: 0.04em; text-transform: uppercase;
    padding: 4px 9px; border-radius: 999px; border: 1px solid var(--qx-border);
    background: var(--qx-surface-2); color: var(--qx-text-faint);
  }
  .eb-stage-dot.cur { border-color: var(--qx-accent); background: var(--qx-accent-soft); color: var(--qx-accent-text); }
  .eb-stage-dot.done { border-color: var(--qx-green); background: var(--qx-green-soft); color: var(--qx-green-text); }

  .eb-scale {
    width: 100%; max-width: 320px;
    border: 1.5px solid var(--qx-border); border-radius: 10px;
    background: radial-gradient(circle at 50% 25%, var(--qx-surface-2), var(--qx-surface));
  }
  .eb-scale.level { border-color: var(--qx-green); }
  .eb-post { stroke: var(--qx-border-2); stroke-width: 4; stroke-linecap: round; }
  .eb-base { fill: var(--qx-border-2); }
  .eb-fulcrum { fill: var(--qx-text-faint); }
  .eb-beam { stroke: var(--qx-text-dim); stroke-width: 5; stroke-linecap: round; }
  .eb-scale.level .eb-beam { stroke: var(--qx-green); }
  .eb-pivot { fill: var(--qx-text); }
  .eb-chain { stroke: var(--qx-border-2); stroke-width: 1.5; }
  .eb-pan { fill: var(--qx-surface-2); stroke: var(--qx-border-2); stroke-width: 2; }
  .eb-scale.level .eb-pan { stroke: var(--qx-green); fill: var(--qx-green-soft); }
  .eb-atom-label { fill: var(--qx-text-faint); font: 800 8px var(--qx-font); text-anchor: middle; }

  .eb-masswrap { display: flex; align-items: center; gap: 10px; font-size: 11px; font-weight: 800; }
  .eb-mass { color: var(--qx-text-faint); font-variant-numeric: tabular-nums; }
  .eb-mass.heavy { color: var(--qx-danger-text); }
  .eb-balpt {
    text-transform: uppercase; letter-spacing: 0.06em; font-size: 10px;
    padding: 3px 9px; border-radius: 999px; background: var(--qx-surface-2); color: var(--qx-text-faint);
  }
  .eb-balpt.on { background: var(--qx-green-soft); color: var(--qx-green-text); }

  .eb-equation {
    width: 100%; display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: center; gap: 6px;
    border: 1.5px solid var(--qx-border); border-radius: 10px; padding: 12px 10px;
    background: var(--qx-surface);
  }
  .eb-species { display: flex; flex-direction: column; align-items: center; gap: 5px; }
  .eb-stepper { display: flex; align-items: center; gap: 4px; }
  .eb-stepper button {
    width: 26px; height: 26px; border-radius: 7px; border: 1.5px solid var(--qx-border-2);
    background: var(--qx-surface); color: var(--qx-text); font-family: var(--qx-font);
    font-size: 16px; font-weight: 900; cursor: pointer; line-height: 1;
  }
  .eb-stepper button:disabled { opacity: 0.4; cursor: default; }
  .eb-coeff { min-width: 20px; text-align: center; font-size: 16px; font-weight: 900; color: var(--qx-accent-text); font-variant-numeric: tabular-nums; }
  .eb-coeff.one { color: var(--qx-text-faint); }
  .eb-formula { font-size: 18px; font-weight: 800; color: var(--qx-text); }
  .eb-plus, .eb-arrow { font-size: 17px; font-weight: 800; color: var(--qx-text-faint); padding-bottom: 4px; }
  .eb-arrow { color: var(--qx-accent-text); font-size: 19px; }

  .eb-tally { display: flex; gap: 6px; flex-wrap: wrap; justify-content: center; }
  .eb-atom-chip {
    font-size: 12px; font-weight: 850; font-variant-numeric: tabular-nums;
    padding: 4px 10px; border-radius: 999px;
    border: 1.5px solid var(--qx-danger); background: var(--qx-danger-soft); color: var(--qx-danger-text);
  }
  .eb-atom-chip.ok { border-color: var(--qx-green); background: var(--qx-green-soft); color: var(--qx-green-text); }
  .eb-vs { color: var(--qx-text-faintest); margin: 0 3px; }

  .eb-hint, .eb-good {
    width: 100%; box-sizing: border-box; padding: 10px 12px; border-radius: 8px;
    font-size: 12.5px; font-weight: 700; line-height: 1.45; text-align: center;
  }
  .eb-hint { background: var(--qx-yellow-soft); color: var(--qx-yellow-text); }
  .eb-good { background: var(--qx-green-soft); color: var(--qx-green-text); }
  .eb-hintbtn {
    background: none; border: none; color: var(--qx-accent-text); font-family: var(--qx-font);
    font-size: 12.5px; font-weight: 800; cursor: pointer; text-decoration: underline; padding: 4px;
  }

  .eb-primary {
    min-height: 42px; width: 100%; border-radius: 999px; border: none;
    background: var(--qx-accent); color: #fff; font-family: var(--qx-font);
    font-size: 14px; font-weight: 850; cursor: pointer;
  }

  .eb-complete { display: flex; flex-direction: column; align-items: center; gap: 12px; text-align: center; padding: 26px 0; }
  .eb-complete-mark {
    width: 62px; height: 62px; border-radius: 50%; background: var(--qx-green-soft);
    border: 2px solid var(--qx-green); color: var(--qx-green-text);
    font-size: 30px; font-weight: 900; display: grid; place-items: center;
  }
  .eb-complete-title { font-size: 18px; font-weight: 900; color: var(--qx-text); }
  .eb-complete p { font-size: 13.5px; font-weight: 650; color: var(--qx-text-dim); line-height: 1.5; max-width: 36ch; margin: 0; }
</style>
