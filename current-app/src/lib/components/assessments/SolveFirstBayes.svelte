<script>
  // Trust the Detector — a Solve First Bayes game (natural frequencies).
  //
  // A metal detector beeps on EVERY gold coin, plus a fixed 20% of the junk.
  // The learner predicts "a random beep — chance it's gold?", then digs and
  // watches the beeps split into gold vs junk. Across three fields the gold
  // gets rarer while the detector stays the same, so the beeps become mostly
  // false alarms — the base-rate shock, seen not told. Only at the end is it
  // named: Bayes' theorem. Same contract as the other arcade discoveries:
  // config in, onDone({id, reward, …}) at the reveal, onExit to leave.
  import ArcadeShell from './ArcadeShell.svelte';
  import { playAward, playBonus } from '../../sfx.js';

  export let config;
  export let onDone = () => {};
  export let onExit = () => {};

  const reduceMotion = typeof matchMedia !== 'undefined'
    && matchMedia('(prefers-reduced-motion: reduce)').matches;

  // total 100 dig sites; detector beeps on all gold + 20% of the non-gold.
  const LEVELS = [
    { goldN: 30, junkBeepN: 14, blurb: 'This field is rich. The detector beeps on every gold coin — and on a scatter of buried junk too.' },
    { goldN: 10, junkBeepN: 18, blurb: 'Gold is scarcer now. Same trusty detector, same junk.' },
    { goldN: 3, junkBeepN: 19, blurb: 'Almost picked clean. Same detector as always — so trust the beep?' }
  ];
  const TOTAL = 100, COLS = 10;

  let levelIx = 0;
  let phase = 'ready';          // ready | beeped | shown | transfer | concept
  let cells = [];
  let guess = 50;
  let arcadeScore = 0;
  let combo = 0;
  let goodGuesses = 0;
  let lastErr = null;
  let recorded = false;

  // Transfer: a fresh island, numbers only — no field to dig. The learner must
  // apply the rule (real beeps ÷ all beeps) instead of re-feeling it.
  // 1 gold in 100; detector beeps all gold + 20% of the 99 junk ≈ 20 junk beeps.
  const TRANSFER = {
    text: 'New island: only 1 site in 100 hides gold. Same detector — beeps on every gold coin and 1 in 5 junk pieces. It just beeped. Chance it’s gold?',
    options: [
      { label: 'About 1 in 21 — roughly 5%', ok: true },
      { label: 'About half — the beep is 50/50', ok: false },
      { label: 'About 80% — the detector is reliable', ok: false }
    ]
  };
  let transferTries = 0;
  let transferWrong = false;

  $: level = LEVELS[levelIx];
  $: beeped = level.goldN + level.junkBeepN;
  $: posterior = Math.round((level.goldN / beeped) * 100);
  $: reward = Math.min(15, 9 + goodGuesses * 2);

  function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[a[i], a[j]] = [a[j], a[i]]; } return a; }
  function buildField() {
    const lvl = LEVELS[levelIx];           // read directly — the reactive `level`
    const idx = shuffle([...Array(TOTAL).keys()]); // isn't set yet at init time
    const gold = new Set(idx.slice(0, lvl.goldN));
    const junk = new Set(idx.slice(lvl.goldN, lvl.goldN + lvl.junkBeepN));
    cells = [...Array(TOTAL).keys()].map((i) => ({
      i, gold: gold.has(i), junk: junk.has(i), beep: gold.has(i) || junk.has(i)
    }));
  }
  function startLevel() { phase = 'ready'; guess = 50; lastErr = null; buildField(); }

  function sweep() {
    if (phase !== 'ready') return;
    phase = 'beeped';
    if (!reduceMotion) { try { playAward(); } catch (_) {} }
  }

  function lockIn() {
    if (phase !== 'beeped') return;
    const err = Math.abs(guess - posterior);
    lastErr = err;
    const good = err <= 12;
    combo = good ? combo + 1 : 0;
    if (good) goodGuesses += 1;
    const points = Math.max(10, 120 - Math.round(err * 3));
    arcadeScore += points * Math.max(1, combo);
    if (!reduceMotion) { try { (good && combo > 1 ? playBonus : playAward)(); } catch (_) {} }
    phase = 'shown';
  }

  function next() {
    if (levelIx < LEVELS.length - 1) { levelIx += 1; startLevel(); }
    else { phase = 'transfer'; transferWrong = false; }
  }

  function answerTransfer(opt) {
    transferTries += 1;
    if (!opt.ok) { transferWrong = true; combo = 0; return; }
    arcadeScore += Math.max(40, 160 - (transferTries - 1) * 60);
    if (!reduceMotion) { try { playBonus(); } catch (_) {} }
    phase = 'concept';
    if (!recorded) {
      recorded = true;
      onDone({
        id: config.id, reward, arcadeScore, goodGuesses,
        patternFound: true, compared: true, usedHint: transferTries > 1,
        transferFirstTry: transferTries === 1
      });
    }
  }

  buildField();
</script>

<ArcadeShell
  eyebrow={`${config.eyebrow} · Arcade mission`}
  title={config.title}
  level={phase === 'concept' ? LEVELS.length : levelIx}
  totalLevels={LEVELS.length}
  score={arcadeScore}
  streak={combo}
  onExit={onExit}
>
  {#if phase === 'transfer'}
    <div class="reveal">
      <span class="rv-eyebrow">Final check — no field this time</span>
      <h2>Numbers only.</h2>
      <p>{TRANSFER.text}</p>
      <div class="topts">
        {#each TRANSFER.options as opt (opt.label)}
          <button class="topt" on:click={() => answerTransfer(opt)}>{opt.label}</button>
        {/each}
      </div>
      {#if transferWrong}
        <p class="twrong">Count the beeps: 1 real + ~20 false alarms. Gold is 1 of ~21 beeps.</p>
      {/if}
    </div>

  {:else if phase === 'concept'}
    <div class="reveal">
      <span class="rv-eyebrow">Concept uncovered</span>
      <h2>You just used Bayes' theorem.</h2>
      <p>A beep being gold is <b>real beeps ÷ all beeps</b>. When gold is rare,
        the detector's false alarms on the huge pile of junk outnumber the few
        real hits — so a beep can mean far less than it feels.</p>
      <div class="formula">
        P(gold | beep) = <span class="frac"><i>P(beep | gold) · P(gold)</i><em>P(beep)</em></span>
      </div>
      <div class="rv-reward">
        <div>
          <span>Discovery distinction</span>
          <strong>{config.rewardLabel}</strong>
        </div>
        <span class="rv-w">+{reward} W</span>
      </div>
      <div class="rv-skills">
        <span>Base rates</span><span>False positives</span><span>Posterior odds</span>
      </div>
      <button class="rv-exit" on:click={onExit}>Return to workshops</button>
    </div>

  {:else}
    <div class="field-head">
      <span class="fh-blurb">{level.blurb}</span>
      <span class="fh-count"><b>{level.goldN}</b> gold hidden in {TOTAL}</span>
    </div>

    <div class="field" class:revealed={phase === 'shown'}>
      {#each cells as c (c.i)}
        <span class="cell"
          class:beep={c.beep && phase !== 'ready'}
          class:gold={c.gold && phase === 'shown'}
          class:junk={c.junk && phase === 'shown'}
          style={phase === 'beeped' ? `transition-delay:${(c.i % COLS) * 12}ms` : ''}
        ></span>
      {/each}
    </div>

    {#if phase === 'ready'}
      <div class="deck">
        <p class="deck-tip">Sweep the field. The detector beeps on every gold coin — and on 1 in 5 pieces of junk.</p>
        <button class="go" on:click={sweep}>Sweep the detector</button>
      </div>

    {:else if phase === 'beeped'}
      <div class="deck">
        <p class="deck-tip">The detector beeped on <b>{beeped}</b> spots. You dig at one beep at random —
          what's the chance it's <b>gold</b>?</p>
        <div class="guessbar">
          <input type="range" min="0" max="100" step="1" bind:value={guess} aria-label="Chance a beep is gold" />
          <span class="gv">{guess}%</span>
        </div>
        <button class="go" on:click={lockIn}>Dig here — lock in {guess}%</button>
      </div>

    {:else}
      <div class="deck">
        <div class="result">
          <span class="res-chip">you said <b>{guess}%</b></span>
          <span class="res-chip actual" class:close={lastErr <= 12}>
            actually <b>{level.goldN}</b> / {beeped} = <b>{posterior}%</b>
          </span>
        </div>
        <p class="deck-tip">
          {#if lastErr <= 12}Sharp read.{:else}Feel the pull of the base rate:{/if}
          of the {beeped} beeps, only <b>{level.goldN}</b> were gold — the rest were junk the detector false-alarmed on.
        </p>
        <button class="go" on:click={next}>{levelIx < LEVELS.length - 1 ? 'Next field →' : 'What did I just do?'}</button>
      </div>
    {/if}
  {/if}
</ArcadeShell>

<style>
  .field-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; margin-bottom: 9px; }
  .fh-blurb { font-size: 13px; font-weight: 600; color: var(--qx-text-dim); line-height: 1.35; }
  .fh-count { font-size: 11px; font-weight: 800; color: var(--qx-text-faint); white-space: nowrap; }
  .fh-count b { color: var(--qx-yellow-text); }

  .field {
    display: grid; grid-template-columns: repeat(10, 1fr); gap: 4px;
    padding: 10px; border: 1.5px solid var(--qx-border); border-radius: 12px; background: var(--qx-surface);
  }
  .cell {
    aspect-ratio: 1; border-radius: 50%; background: var(--qx-surface-3);
    box-shadow: inset 0 0 0 1px var(--qx-border);
    transition: background 0.25s ease, box-shadow 0.25s ease, transform 0.2s ease;
  }
  /* a beep: ringed, not yet dug */
  .cell.beep { box-shadow: 0 0 0 2px var(--qx-accent), 0 0 8px color-mix(in srgb, var(--qx-accent) 55%, transparent); background: var(--qx-accent-soft); }
  /* dug up — gold is a literal treasure colour so it pops out of the crowd */
  .cell.gold { background: #f6c445; box-shadow: 0 0 0 2px #c88f1c, 0 0 11px rgba(246, 196, 69, 0.8); transform: scale(1.06); z-index: 1; }
  /* dug up — false alarm: a faded dud that recedes */
  .cell.junk { background: var(--qx-surface-2); box-shadow: inset 0 0 0 1.5px var(--qx-border-2); opacity: 0.28; }
  .field.revealed .cell:not(.gold):not(.junk) { opacity: 0.32; box-shadow: inset 0 0 0 1px var(--qx-border); }

  .deck { margin-top: 11px; display: flex; flex-direction: column; gap: 10px; }
  .deck-tip { font-size: 13px; font-weight: 600; color: var(--qx-text-dim); line-height: 1.4; margin: 0; }
  .deck-tip b { color: var(--qx-text); }

  .guessbar { display: flex; align-items: center; gap: 12px; }
  .guessbar input { flex: 1; accent-color: var(--qx-accent); height: 24px; }
  .gv { font-family: ui-monospace, Menlo, monospace; font-size: 16px; font-weight: 900; color: var(--qx-text); min-width: 48px; text-align: right; }

  .result { display: flex; flex-wrap: wrap; gap: 8px; }
  .res-chip { font-family: ui-monospace, Menlo, monospace; font-size: 12px; font-weight: 700; color: var(--qx-text-dim); background: var(--qx-surface-2); border: 1px solid var(--qx-border); border-radius: 8px; padding: 4px 9px; }
  .res-chip b { color: var(--qx-text); font-weight: 900; }
  .res-chip.actual { border-color: color-mix(in srgb, var(--qx-accent) 45%, var(--qx-border)); }
  .res-chip.actual.close { border-color: var(--qx-green); background: var(--qx-green-soft); color: var(--qx-green-text); }
  .res-chip.actual.close b { color: var(--qx-green-text); }

  .go {
    align-self: stretch; border: none; border-radius: 999px; background: var(--qx-accent); color: #fff;
    font-family: var(--qx-font); font-size: 14px; font-weight: 850; min-height: 46px; padding: 0 22px; cursor: pointer;
  }

  /* transfer */
  .topts { width: 100%; display: grid; gap: 8px; }
  .topt {
    border: 1.5px solid var(--qx-border-2); border-radius: 12px; background: var(--qx-surface);
    color: var(--qx-text); font-family: var(--qx-font); font-size: 13px; font-weight: 750;
    min-height: 46px; padding: 8px 14px; cursor: pointer; text-align: left;
  }
  .topt:hover { border-color: var(--qx-accent); }
  .twrong { color: var(--qx-danger-text); font-size: 12.5px; font-weight: 700; }

  /* reveal */
  .reveal { display: flex; flex-direction: column; gap: 12px; text-align: center; align-items: center; padding: 6px 2px; }
  .rv-eyebrow { font-size: 10px; font-weight: 900; letter-spacing: 0.12em; text-transform: uppercase; color: var(--qx-accent-text); }
  .reveal h2 { font-size: 21px; font-weight: 950; color: var(--qx-text); margin: 0; line-height: 1.15; }
  .reveal p { font-size: 13.5px; font-weight: 600; color: var(--qx-text-dim); line-height: 1.5; margin: 0; }
  .reveal p b { color: var(--qx-text); }
  .formula { font-family: ui-monospace, Menlo, monospace; font-size: 14px; font-weight: 800; color: var(--qx-text); display: flex; align-items: center; gap: 8px; justify-content: center; }
  .frac { display: inline-flex; flex-direction: column; align-items: center; }
  .frac i { font-style: normal; border-bottom: 2px solid var(--qx-text-faint); padding: 0 6px 2px; }
  .frac em { font-style: normal; padding-top: 2px; }
  .rv-reward { width: 100%; box-sizing: border-box; display: flex; align-items: center; justify-content: space-between; gap: 10px; border: 1.5px solid var(--qx-accent-soft); background: var(--qx-accent-soft); border-radius: 12px; padding: 10px 14px; }
  .rv-reward span { font-size: 10px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; color: var(--qx-text-faint); }
  .rv-reward strong { display: block; font-size: 15px; font-weight: 900; color: var(--qx-text); }
  .rv-w { font-size: 17px !important; font-weight: 950 !important; color: var(--qx-accent-text) !important; letter-spacing: 0 !important; text-transform: none !important; }
  .rv-skills { display: flex; flex-wrap: wrap; gap: 6px; justify-content: center; }
  .rv-skills span { font-size: 11px; font-weight: 700; color: var(--qx-text-dim); background: var(--qx-surface-2); border: 1px solid var(--qx-border); border-radius: 999px; padding: 4px 11px; }
  .rv-exit { margin-top: 4px; border: none; border-radius: 999px; background: var(--qx-accent); color: #fff; font-family: var(--qx-font); font-size: 14px; font-weight: 850; min-height: 44px; padding: 0 28px; cursor: pointer; }
</style>
