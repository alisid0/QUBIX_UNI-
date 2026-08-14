<script>
  // Atom Foundry — the chemistry signature lab (docs/ATOM-FOUNDRY-WORKSHOP-DESIGN.md).
  // Seven mastery stages: forge (protons name it), steady (neutrons weigh it),
  // isotope, shells (electrons fill inner-first), strip (cation), catch (anion),
  // identify. Each stage retries with a hint until correct — a completion gate,
  // scored 1/1 by the Workshop runner on finish via onDone.
  export let prompt = 'Forge a nucleus, fill the shells, and strip electrons into ions.';
  export let onDone = () => {};

  const reduceMotion = typeof matchMedia !== 'undefined'
    && matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Z → element. shells = electron config (2/8/8 model). n = standard neutron count.
  const ELEMENTS = [
    { z: 1,  symbol: 'H',  name: 'Hydrogen',   n: 0,  shells: [1] },
    { z: 2,  symbol: 'He', name: 'Helium',     n: 2,  shells: [2] },
    { z: 3,  symbol: 'Li', name: 'Lithium',    n: 4,  shells: [2, 1] },
    { z: 4,  symbol: 'Be', name: 'Beryllium',  n: 5,  shells: [2, 2] },
    { z: 5,  symbol: 'B',  name: 'Boron',      n: 6,  shells: [2, 3] },
    { z: 6,  symbol: 'C',  name: 'Carbon',     n: 6,  shells: [2, 4] },
    { z: 7,  symbol: 'N',  name: 'Nitrogen',   n: 7,  shells: [2, 5] },
    { z: 8,  symbol: 'O',  name: 'Oxygen',     n: 8,  shells: [2, 6] },
    { z: 9,  symbol: 'F',  name: 'Fluorine',   n: 10, shells: [2, 7] },
    { z: 10, symbol: 'Ne', name: 'Neon',       n: 10, shells: [2, 8] },
    { z: 11, symbol: 'Na', name: 'Sodium',     n: 12, shells: [2, 8, 1] },
    { z: 12, symbol: 'Mg', name: 'Magnesium',  n: 12, shells: [2, 8, 2] },
    { z: 13, symbol: 'Al', name: 'Aluminium',  n: 14, shells: [2, 8, 3] },
    { z: 14, symbol: 'Si', name: 'Silicon',    n: 14, shells: [2, 8, 4] },
    { z: 15, symbol: 'P',  name: 'Phosphorus', n: 16, shells: [2, 8, 5] },
    { z: 16, symbol: 'S',  name: 'Sulfur',     n: 16, shells: [2, 8, 6] },
    { z: 17, symbol: 'Cl', name: 'Chlorine',   n: 18, shells: [2, 8, 7] },
    { z: 18, symbol: 'Ar', name: 'Argon',      n: 22, shells: [2, 8, 8] },
  ];
  const SHELL_CAP = [2, 8, 8];
  const SHELL_R = [52, 86, 118];
  const elementFor = (p) => (p >= 1 && p <= ELEMENTS.length ? ELEMENTS[p - 1] : null);

  const STAGES = [
    { id: 'forge',    label: 'Forge' },
    { id: 'steady',   label: 'Steady' },
    { id: 'isotope',  label: 'Isotope' },
    { id: 'shells',   label: 'Shells' },
    { id: 'cation',   label: 'Strip' },
    { id: 'anion',    label: 'Catch' },
    { id: 'identify', label: 'Name it' },
  ];

  let stage = 0;
  let stageDone = false;
  let hint = '';
  let complete = false;

  // The live atom. Each stage seeds it, then the learner mutates it.
  let protons = 0;
  let neutrons = 0;
  let electrons = 0;   // total; seated inner-first by shellsOf()
  let pulse = 0;       // bump to re-trigger the nucleus pulse
  let stillFlash = ''; // "still carbon" caption text, cleared after a beat
  let stillTimer = null;
  let glow = false;    // outer-shell glow on a completed ion

  // Derived
  $: element = elementFor(protons);
  $: mass = protons + neutrons;
  $: charge = protons - electrons;
  $: chargeLabel = charge === 0 ? '0' : charge > 0 ? `+${charge}` : `${charge}`;

  // Seat `electrons` into shells inner-first, capped 2/8/8.
  function shellsOf(e) {
    const out = [];
    let left = e;
    for (const cap of SHELL_CAP) {
      const here = Math.max(0, Math.min(cap, left));
      out.push(here);
      left -= here;
      if (left <= 0) break;
    }
    return out;
  }
  $: shellCounts = shellsOf(electrons);
  // How many rings to draw: element's natural shell count, min 1, and at least
  // enough to hold the current electrons.
  $: ringCount = Math.max(1, element ? element.shells.length : 1, shellCounts.length);
  $: nucleusR = Math.min(34, 18 + protons + neutrons);

  // Electron seats: fixed positions so adding one never moves the others.
  $: electronDots = (() => {
    const dots = [];
    for (let s = 0; s < shellCounts.length; s++) {
      const cap = SHELL_CAP[s];
      const r = SHELL_R[s];
      for (let k = 0; k < shellCounts[s]; k++) {
        const angle = (k / cap) * Math.PI * 2 - Math.PI / 2;
        dots.push({
          key: `${s}-${k}`,
          x: 130 + Math.cos(angle) * r,
          y: 130 + Math.sin(angle) * r,
        });
      }
    }
    return dots;
  })();

  function bumpPulse() { if (!reduceMotion) pulse += 1; }
  function flashStill(text) {
    stillFlash = text;
    if (stillTimer) clearTimeout(stillTimer);
    stillTimer = setTimeout(() => { stillFlash = ''; }, 1200);
  }

  // ── stage lifecycle ─────────────────────────────────────────────────────────
  function seedStage(i) {
    stageDone = false;
    hint = '';
    glow = false;
    stillFlash = '';
    if (i === 0) { protons = 0; neutrons = 0; electrons = 0; }
    else if (i === 1) { protons = 6; neutrons = 0; electrons = 0; }
    else if (i === 2) { protons = 6; neutrons = 6; electrons = 0; }
    else if (i === 3) { protons = 6; neutrons = 6; electrons = 0; }
    else if (i === 4) { protons = 11; neutrons = 12; electrons = 11; } // neutral sodium
    else if (i === 5) { protons = 17; neutrons = 18; electrons = 17; } // neutral chlorine
    else if (i === 6) {
      identifyIdx = 0; identifyPick = null;
      const q0 = IDENTIFY[0];
      protons = q0.p; neutrons = q0.n; electrons = q0.e;
    }
  }

  function nextStage() {
    if (stage < STAGES.length - 1) {
      stage += 1;
      seedStage(stage);
    } else {
      complete = true;
    }
  }

  // ── Stage 1: Forge — protons define identity (target carbon, z=6) ──────────
  // Free +/- so the learner can overshoot and watch the identity flip; a
  // "Forge it" confirm checks for carbon. (All checks use local arithmetic —
  // the reactive $: derivations lag one tick behind a synchronous mutation.)
  function addProton() {
    if (stageDone) return;
    protons += 1; bumpPulse(); hint = '';
  }
  function removeProton() {
    if (stageDone || protons <= 0) return;
    protons -= 1; bumpPulse(); hint = '';
  }
  function forgeIt() {
    if (stageDone) return;
    if (protons === 6) { stageDone = true; hint = ''; }
    else if (protons > 6) hint = `Too far — that reads ${elementFor(protons)?.name || 'a heavier element'}. The proton count IS the name. Pull back to 6.`;
    else hint = `Only ${protons} proton${protons === 1 ? '' : 's'} so far — carbon needs 6. Keep dropping them in.`;
  }

  // ── Stage 2/3: neutrons (steady → C-12 A=12; isotope → C-14 neu=8) ─────────
  function addNeutron() {
    if (stageDone) return;
    neutrons += 1; bumpPulse();
    checkNeutronStage();
  }
  function removeNeutron() {
    if (stageDone || neutrons <= 0) return;
    neutrons -= 1; bumpPulse();
    checkNeutronStage();
  }
  function checkNeutronStage() {
    const m = protons + neutrons; // local, not the lagging reactive
    if (stage === 1) {
      if (m === 12) { stageDone = true; hint = ''; }
      else if (neutrons > 0) flashStill('still carbon');
    } else if (stage === 2) {
      if (neutrons === 8) { stageDone = true; hint = ''; }
      else if (m === 13) flashStill('carbon-13 — also real, also carbon');
    }
  }

  // ── Stage 4: shells — electrons fill inner-first (target neutral carbon) ───
  function addElectron() {
    if (stageDone) return;
    const cap = SHELL_CAP.reduce((a, b) => a + b, 0);
    if (electrons >= cap) return;
    const before = shellsOf(electrons);
    electrons += 1;
    const after = shellsOf(electrons);
    if (stage === 3 && before[0] === 1 && after[0] === 2) flashStill('shell 1 full — next one sits further out');
    // Neutral carbon = 6 protons, 6 electrons → charge 0. Use local values.
    if (stage === 3 && electrons === 6 && protons - electrons === 0) { stageDone = true; hint = ''; }
    else hint = '';
  }

  // ── Stage 5: strip — remove outermost electron (target Na+, e=10) ──────────
  function removeElectron() {
    if (stageDone) return;
    if (electrons <= 0) return;
    electrons -= 1;
    if (stage === 4) {
      if (electrons === 10) { stageDone = true; hint = ''; glow = true; }
      else if (electrons < 10) hint = 'Stop — you broke into a full shell. Sodium only wants to lose ONE. Put it back.';
      else hint = '';
    }
  }
  function recoverElectron() {
    if (stageDone) return;
    electrons += 1;
    if (stage === 4 && electrons === 10) { stageDone = true; hint = ''; glow = true; }
    else hint = '';
  }

  // ── Stage 6: catch — add electron to chlorine (target Cl-, e=18) ───────────
  function catchElectron() {
    if (stageDone) return;
    if (electrons >= 18) return;
    electrons += 1;
    if (stage === 5 && electrons === 18) { stageDone = true; hint = ''; glow = true; }
    else hint = '';
  }

  // ── Stage 7: identify ───────────────────────────────────────────────────────
  // Options shuffled per mount with a stable comparator (Math.random seeds once).
  function shuf(arr) {
    const s = [...arr];
    for (let i = s.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [s[i], s[j]] = [s[j], s[i]];
    }
    return s;
  }
  const IDENTIFY = [
    {
      p: 8, n: 8, e: 10,
      options: shuf([
        { label: 'O²⁻ — oxygen that caught two', correct: true },
        { label: 'Ne — neutral neon', correct: false },
        { label: 'O — neutral oxygen', correct: false },
      ]),
      hint: 'Count protons first for the name, then compare electrons for the charge.',
    },
    {
      p: 12, n: 12, e: 10,
      options: shuf([
        { label: 'Mg²⁺ — magnesium that lost two', correct: true },
        { label: 'Ne²⁻', correct: false },
        { label: 'Mg — neutral magnesium', correct: false },
      ]),
      hint: 'Twelve protons is magnesium no matter what. Now: 12 minus 10 electrons?',
    },
    {
      p: 6, n: 8, e: 6,
      options: shuf([
        { label: 'carbon-14, neutral', correct: true },
        { label: 'oxygen-14, neutral', correct: false },
        { label: 'C⁴⁻', correct: false },
      ]),
      hint: 'Six protons: carbon. Electrons match, so no charge. The 8 neutrons only change the mass.',
    },
  ];
  let identifyIdx = 0;
  let identifyPick = null;
  function pickIdentify(opt) {
    if (stageDone) return;
    identifyPick = opt;
    if (opt.correct) {
      hint = '';
      if (identifyIdx === IDENTIFY.length - 1) { stageDone = true; }
      else setTimeout(() => { identifyIdx += 1; identifyPick = null; syncIdentifyAtom(); }, 700);
    } else {
      hint = IDENTIFY[identifyIdx].hint;
    }
  }
  // Reflect the current identify puzzle in the live atom stage.
  function syncIdentifyAtom() {
    const q = IDENTIFY[identifyIdx];
    protons = q.p; neutrons = q.n; electrons = q.e;
  }
</script>

<div class="af-lab">
  {#if complete}
    <div class="af-complete">
      <div class="af-complete-mark">✓</div>
      <div class="af-complete-title">Atom Foundry complete</div>
      <p>You can now build any light element from raw particles, keep its nucleus steady, fill shells inner-first, and forge ions in both directions.</p>
      <button class="af-primary" on:click={() => onDone(1, 1)}>Continue</button>
    </div>
  {:else}
    <div class="af-prompt">{prompt}</div>

    <div class="af-stages" aria-label="Lab stations">
      {#each STAGES as s, i}
        <span class="af-stage-dot" class:done={i < stage} class:cur={i === stage}>{s.label}</span>
      {/each}
    </div>

    <!-- Shared atom stage -->
    <svg class="af-stage-svg" viewBox="0 0 260 260" role="img" aria-label="Atom under construction">
      {#each Array(ringCount) as _, s}
        <circle class="af-shell" class:glow={glow && s === ringCount - 1}
          cx="130" cy="130" r={SHELL_R[s]} />
      {/each}
      {#key pulse}
        <circle class="af-nucleus" class:pulse={pulse > 0 && !reduceMotion}
          cx="130" cy="130" r={nucleusR} />
      {/key}
      <text class="af-nuc-p" x="130" y="126" text-anchor="middle">{protons}p</text>
      <text class="af-nuc-n" x="130" y="142" text-anchor="middle">{neutrons}n</text>
      {#each electronDots as d (d.key)}
        <circle class="af-electron" cx={d.x} cy={d.y} r="7" />
      {/each}
    </svg>

    <div class="af-badge" class:has={!!element}>
      {#if element}{element.symbol} · {element.name}{:else}— · empty foundry{/if}
    </div>
    {#if stillFlash}<div class="af-still">{stillFlash}</div>{/if}

    <div class="af-meters">
      <span class="af-meter">A = {mass}</span>
      <span class="af-meter charge"
        class:zero={charge === 0} class:pos={charge > 0} class:neg={charge < 0}>charge {chargeLabel}</span>
      <span class="af-meter">e⁻ = {electrons}</span>
    </div>

    <!-- Stage controls -->
    {#if stage === 0}
      <div class="af-instruction">Drop protons into the nucleus until the foundry reads <strong>Carbon</strong>, then forge it.</div>
      <div class="af-controls">
        <button class="af-remove-p" on:click={removeProton} disabled={protons <= 0}>− proton</button>
        <button class="af-add-p" on:click={addProton}>+ proton</button>
      </div>
      {#if !stageDone}
        <button class="af-primary af-forge" on:click={forgeIt} disabled={protons < 1}>Forge it</button>
      {/if}
      {#if stageDone}<div class="af-good">Locked. Six protons is carbon, always and everywhere. Change the count and it is simply a different element.</div>{/if}

    {:else if stage === 1}
      <div class="af-instruction">Neutrons are the peacekeepers — pack them in until the mass number <strong>A reads 12</strong>.</div>
      <div class="af-controls">
        <button class="af-remove-n" on:click={removeNeutron} disabled={neutrons <= 0}>− neutron</button>
        <button class="af-add-n" on:click={addNeutron}>+ neutron</button>
      </div>
      {#if stageDone}<div class="af-good">Carbon-12 assembled. The neutrons added weight and calm, and the name never moved.</div>{/if}

    {:else if stage === 2}
      <div class="af-instruction">Forge the heavy twin: <strong>carbon-14</strong>, the isotope used for dating ancient things.</div>
      <div class="af-controls">
        <button class="af-remove-n" on:click={removeNeutron} disabled={neutrons <= 0}>− neutron</button>
        <button class="af-add-n" on:click={addNeutron}>+ neutron</button>
      </div>
      {#if stageDone}<div class="af-good">Carbon-14: six protons, eight neutrons. Identical chemistry, heavier nucleus — that is all an isotope is.</div>{/if}

    {:else if stage === 3}
      <div class="af-instruction">Fire electrons at the atom. Watch where the machine seats them — the inner shell always fills first, and it only holds <strong>2</strong>.</div>
      <div class="af-controls">
        <button class="af-add-e" on:click={addElectron}>+ electron</button>
      </div>
      {#if stageDone}<div class="af-good">Neutral carbon: 2 inner, 4 outer. Six positives, six negatives, perfectly balanced.</div>{/if}

    {:else if stage === 4}
      <div class="af-instruction">Sodium hates its lonely outer electron. <strong>Strip it</strong> and read the charge meter.</div>
      <div class="af-controls">
        <button class="af-remove-e" on:click={removeElectron}>− electron</button>
        {#if electrons < 10 && !stageDone}<button class="af-add-e" on:click={recoverElectron}>+ electron</button>{/if}
      </div>
      {#if stageDone}<div class="af-good">Na⁺ forged. Eleven protons still — it is sodium with a positive charge, not a new element.</div>{/if}

    {:else if stage === 5}
      <div class="af-instruction">Chlorine is one seat short of a full shell. <strong>Feed it</strong> the electron it is desperate for.</div>
      <div class="af-controls">
        <button class="af-add-e" on:click={catchElectron} disabled={electrons >= 18}>+ electron</button>
      </div>
      {#if stageDone}<div class="af-good">Cl⁻ caught it. A full outer shell and a negative charge — the mirror image of what sodium just did.</div>{/if}

    {:else if stage === 6}
      {#key identifyIdx}
        <div class="af-instruction">Mystery atom: <strong>{IDENTIFY[identifyIdx].p}p / {IDENTIFY[identifyIdx].n}n / {IDENTIFY[identifyIdx].e}e</strong>. Name it.</div>
        <div class="af-options">
          {#each IDENTIFY[identifyIdx].options as opt}
            <button
              class:right={(stageDone || identifyPick === opt) && opt.correct}
              class:wrong={identifyPick === opt && !opt.correct}
              on:click={() => pickIdentify(opt)}>{opt.label}</button>
          {/each}
        </div>
      {/key}
      <div class="af-note">{identifyIdx + (stageDone ? 1 : 0)}/{IDENTIFY.length} identified</div>
      {#if stageDone}<div class="af-good">Foundry certified. Protons name it, neutrons weigh it, electrons charge it.</div>{/if}
    {/if}

    {#if hint && !stageDone}<div class="af-hint">{hint}</div>{/if}

    {#if stageDone}
      <button class="af-primary" on:click={nextStage}>
        {stage === STAGES.length - 1 ? 'Finish the foundry' : 'Next station →'}
      </button>
    {/if}
  {/if}
</div>

<style>
  .af-lab {
    width: 100%;
    max-width: 390px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 13px;
  }

  .af-prompt {
    color: var(--qx-text);
    font-size: 15px;
    font-weight: 780;
    line-height: 1.42;
    text-align: center;
  }

  .af-stages { display: flex; gap: 5px; flex-wrap: wrap; justify-content: center; }
  .af-stage-dot {
    font-size: 10px;
    font-weight: 850;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    padding: 4px 9px;
    border-radius: 999px;
    border: 1px solid var(--qx-border);
    background: var(--qx-surface-2);
    color: var(--qx-text-faint);
  }
  .af-stage-dot.cur { border-color: var(--qx-accent); background: var(--qx-accent-soft); color: var(--qx-accent-text); }
  .af-stage-dot.done { border-color: var(--qx-green); background: var(--qx-green-soft); color: var(--qx-green-text); }

  .af-stage-svg {
    width: 100%;
    max-width: 250px;
    border: 1.5px solid var(--qx-border);
    border-radius: 8px;
    background: radial-gradient(circle at 50% 45%, var(--qx-surface-2), var(--qx-surface));
  }
  .af-shell { fill: none; stroke: var(--qx-border-2); stroke-width: 1; stroke-dasharray: 4 4; }
  .af-shell.glow { stroke: var(--qx-green); stroke-width: 2; animation: afGlow 0.6s ease-out; }
  @keyframes afGlow { 0% { stroke-opacity: 0.3; } 50% { stroke-opacity: 1; } 100% { stroke-opacity: 1; } }
  .af-nucleus { fill: var(--qx-accent-soft); stroke: var(--qx-accent); stroke-width: 2; }
  .af-nucleus.pulse { animation: afPulse 0.12s ease-out; transform-origin: 130px 130px; }
  @keyframes afPulse { 0% { transform: scale(1); } 60% { transform: scale(1.12); } 100% { transform: scale(1); } }
  .af-nuc-p { fill: var(--qx-accent-text); font: 900 13px var(--qx-font); }
  .af-nuc-n { fill: var(--qx-text-dim); font: 800 11px var(--qx-font); }
  .af-electron { fill: var(--qx-accent); stroke: var(--qx-surface); stroke-width: 1.5; animation: afSeat 0.15s ease-out; }
  @keyframes afSeat { 0% { transform: scale(0); transform-origin: center; } 100% { transform: scale(1); } }

  .af-badge {
    padding: 6px 16px;
    border-radius: 999px;
    border: 1.5px solid var(--qx-border-2);
    background: var(--qx-surface);
    color: var(--qx-text-faint);
    font-size: 14px;
    font-weight: 850;
  }
  .af-badge.has { border-color: var(--qx-accent); background: var(--qx-accent-soft); color: var(--qx-accent-text); }

  .af-still {
    font-size: 12px;
    font-weight: 800;
    color: var(--qx-green-text);
    background: var(--qx-green-soft);
    border-radius: 999px;
    padding: 3px 12px;
    animation: afFade 1.2s ease-out;
  }
  @keyframes afFade { 0% { opacity: 0; } 20% { opacity: 1; } 80% { opacity: 1; } 100% { opacity: 0; } }

  .af-meters { display: flex; gap: 7px; flex-wrap: wrap; justify-content: center; }
  .af-meter {
    font-size: 12px;
    font-weight: 850;
    font-variant-numeric: tabular-nums;
    padding: 5px 11px;
    border-radius: 999px;
    border: 1px solid var(--qx-border);
    background: var(--qx-surface-2);
    color: var(--qx-text-dim);
  }
  .af-meter.charge.zero { border-color: var(--qx-green); background: var(--qx-green-soft); color: var(--qx-green-text); }
  .af-meter.charge.pos { border-color: var(--qx-yellow); background: var(--qx-yellow-soft); color: var(--qx-yellow-text); }
  .af-meter.charge.neg { border-color: var(--qx-accent); background: var(--qx-accent-soft); color: var(--qx-accent-text); }

  .af-instruction {
    font-size: 14px;
    font-weight: 720;
    color: var(--qx-text);
    text-align: center;
    line-height: 1.45;
  }
  .af-instruction strong { color: var(--qx-accent-text); }

  .af-controls { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; }
  .af-controls button {
    min-height: 44px;
    padding: 0 18px;
    border-radius: 999px;
    border: 1.5px solid var(--qx-border-2);
    background: var(--qx-surface);
    color: var(--qx-text);
    font-family: var(--qx-font);
    font-size: 14px;
    font-weight: 850;
    cursor: pointer;
  }
  .af-controls button:disabled { opacity: 0.4; cursor: default; }
  .af-add-p, .af-add-n, .af-add-e { border-color: var(--qx-accent); background: var(--qx-accent-soft); color: var(--qx-accent-text); }

  .af-options { width: 100%; display: flex; flex-direction: column; gap: 8px; }
  .af-options button {
    padding: 13px 14px;
    border-radius: 10px;
    border: 1.5px solid var(--qx-border-2);
    background: var(--qx-surface);
    font-family: var(--qx-font);
    font-size: 14px;
    font-weight: 800;
    color: var(--qx-text);
    cursor: pointer;
    text-align: left;
  }
  .af-options button.right { border-color: var(--qx-green); background: var(--qx-green-soft); color: var(--qx-green-text); }
  .af-options button.wrong { border-color: var(--qx-danger); background: var(--qx-danger-soft); color: var(--qx-danger-text); }

  .af-note { font-size: 12px; font-weight: 700; color: var(--qx-text-faint); }

  .af-hint {
    width: 100%;
    box-sizing: border-box;
    padding: 10px 12px;
    border-radius: 8px;
    background: var(--qx-danger-soft);
    color: var(--qx-danger-text);
    font-size: 12.5px;
    font-weight: 700;
    line-height: 1.45;
    text-align: center;
  }
  .af-good {
    width: 100%;
    box-sizing: border-box;
    padding: 10px 12px;
    border-radius: 8px;
    background: var(--qx-green-soft);
    color: var(--qx-green-text);
    font-size: 12.5px;
    font-weight: 700;
    line-height: 1.45;
    text-align: center;
  }

  .af-primary {
    min-height: 42px;
    width: 100%;
    border-radius: 999px;
    border: none;
    background: var(--qx-accent);
    color: #fff;
    font-family: var(--qx-font);
    font-size: 14px;
    font-weight: 850;
    cursor: pointer;
  }

  .af-complete {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    text-align: center;
    padding: 28px 0;
  }
  .af-complete-mark {
    width: 62px; height: 62px;
    border-radius: 50%;
    background: var(--qx-green-soft);
    border: 2px solid var(--qx-green);
    color: var(--qx-green-text);
    font-size: 30px;
    font-weight: 900;
    display: grid;
    place-items: center;
  }
  .af-complete-title { font-size: 18px; font-weight: 900; color: var(--qx-text); }
  .af-complete p { font-size: 13.5px; font-weight: 650; color: var(--qx-text-dim); line-height: 1.5; max-width: 34ch; margin: 0; }

  @media (prefers-reduced-motion: reduce) {
    .af-nucleus.pulse, .af-electron, .af-shell.glow, .af-still { animation: none; }
  }
</style>
