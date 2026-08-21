<script>
  import { fly, fade } from 'svelte/transition';
  import SecurityEvidence from './SecurityEvidence.svelte';
  import LogicTruthMini from './LogicTruthMini.svelte';

  export let config;
  export let onDone = () => {};
  export let onExit = () => {};

  const states = [[0, 0], [0, 1], [1, 0], [1, 1]];

  let phase = 'brief';
  let andInputs = [0, 0];
  let orInputs = [0, 0];
  let andTests = {};
  let orTests = {};
  let andOpen = false;
  let orOpen = false;
  let hintUsed = false;
  let activeHint = '';
  let transferAnswers = { payment: '', fire: '', override: '' };
  let transferMistakes = 0;
  let recorded = false;

  $: andList = states.map(([a, b]) => andTests[`${a}${b}`]).filter(Boolean);
  $: orList = states.map(([a, b]) => orTests[`${a}${b}`]).filter(Boolean);
  $: andReady = andOpen && andList.length >= 3;
  $: orReady = orOpen && !!orTests['10'] && !!orTests['01'] && !!orTests['00'];
  $: transferReady =
    transferAnswers.payment === 'both' &&
    transferAnswers.fire === 'either' &&
    transferAnswers.override === 'grouped';
  $: transferFirstTry = transferReady && transferMistakes === 0;
  $: evidenceScore = andList.length === 4 && orList.length === 4 ? 4 : 3;
  // Caps at 15 W, consistent with the other Solve First games. The current
  // terms already max at exactly 15; the clamp keeps that true if they change.
  $: reward = Math.min(15, 6 + evidenceScore + (transferFirstTry ? 3 : 1) + (hintUsed ? 0 : 2));

  function toggle(kind, index) {
    if (kind === 'and') {
      andInputs[index] = andInputs[index] ? 0 : 1;
      andInputs = [...andInputs];
    } else {
      orInputs[index] = orInputs[index] ? 0 : 1;
      orInputs = [...orInputs];
    }
  }

  function runAndTest() {
    const [pin, fingerprint] = andInputs;
    const output = pin && fingerprint ? 1 : 0;
    andTests = { ...andTests, [`${pin}${fingerprint}`]: { a: pin, b: fingerprint, output } };
    andOpen = output === 1;
  }

  function runOrTest() {
    const [card, recovery] = orInputs;
    const output = card || recovery ? 1 : 0;
    orTests = { ...orTests, [`${card}${recovery}`]: { a: card, b: recovery, output } };
    orOpen = output === 1;
  }

  function showHint(kind) {
    hintUsed = true;
    activeHint = activeHint === kind ? '' : kind;
  }

  function answerTransfer(scenario, answer) {
    const correct = scenario === 'payment' ? 'both' : scenario === 'fire' ? 'either' : 'grouped';
    if (answer !== correct) transferMistakes += 1;
    transferAnswers = { ...transferAnswers, [scenario]: answer };
  }

  function finishDiscovery() {
    if (!transferReady) return;
    phase = 'reveal';
    if (!recorded) {
      recorded = true;
      onDone({
        id: config.id,
        reward,
        evidenceCount: andList.length + orList.length,
        patternFound: true,
        compared: true,
        transferFirstTry,
        usedHint: hintUsed
      });
    }
  }

  function restart() {
    phase = 'brief';
    andInputs = [0, 0];
    orInputs = [0, 0];
    andTests = {};
    orTests = {};
    andOpen = false;
    orOpen = false;
    hintUsed = false;
    activeHint = '';
    transferAnswers = { payment: '', fire: '', override: '' };
    transferMistakes = 0;
    recorded = false;
  }
</script>

<div class="solve-first">
  <header class="mode-head">
    <button class="exit" on:click={onExit} aria-label="Return to all workshops">←</button>
    <div>
      <span>{config.eyebrow}</span>
      <strong>Solve First</strong>
    </div>
    <div class="phase-count">
      {phase === 'brief' ? '0' : phase === 'and' ? '1' : phase === 'or' ? '2' : phase === 'transfer' ? '3' : '4'}/4
    </div>
  </header>

  <div class="phase-line" aria-label="Discovery progress">
    {#each ['and', 'or', 'transfer', 'reveal'] as item}
      <span
        class:active={phase === item}
        class:done={
          (item === 'and' && ['or','transfer','reveal'].includes(phase)) ||
          (item === 'or' && ['transfer','reveal'].includes(phase)) ||
          (item === 'transfer' && phase === 'reveal')
        }
      ></span>
    {/each}
  </div>

  {#key phase}
    <section class="phase" in:fly={{ x: 28, duration: 240 }} out:fade={{ duration: 90 }}>
      {#if phase === 'brief'}
        <div class="brief">
          <div class="security-mark" aria-hidden="true">
            <span class="pin-dots">••••</span>
            <span class="fingerprint">◎</span>
          </div>
          <div class="micro-label">Security lab · Two unknown systems</div>
          <h2>Crack the Lockers</h2>
          <p>Two lockers use different security rules. Nobody left the instructions.</p>
          <div class="mission">
            <span>Your mission</span>
            <strong>Open both lockers, prove their rules, then assign the right system to two new security jobs.</strong>
          </div>
          <div class="brief-rules">
            <span>Failed tests are free</span>
            <span>Evidence unlocks progress</span>
            <span>Names revealed at the end</span>
          </div>
          <button class="primary" on:click={() => phase = 'and'}>Enter security lab</button>
        </div>

      {:else if phase === 'and'}
        <div class="section-title">
          <span>Locker 01 · Personal storage</span>
          <h2>Unlock Maya’s locker</h2>
          <p>The scanner can receive a correct PIN and a matching fingerprint. Discover exactly what it demands.</p>
        </div>

        <div class="locker-machine" class:open={andOpen}>
          <div class="identity">M</div>
          <strong class="locker-name">Maya · Locker 18</strong>
          <span class="locker-state">{andOpen ? 'UNLOCKED' : 'LOCKED'}</span>
          <div class="credentials">
            <button class:valid={andInputs[0]} on:click={() => toggle('and', 0)} aria-pressed={andInputs[0] === 1}>
              <span class="credential-icon">#</span>
              <small>PIN</small>
              <strong>{andInputs[0] ? 'CORRECT' : 'WRONG'}</strong>
            </button>
            <button class:valid={andInputs[1]} on:click={() => toggle('and', 1)} aria-pressed={andInputs[1] === 1}>
              <span class="credential-icon print">◎</span>
              <small>FINGERPRINT</small>
              <strong>{andInputs[1] ? 'MATCH' : 'NO MATCH'}</strong>
            </button>
          </div>
          <div class="lock-core">
            <i class:hot={andInputs[0]}></i><b>?</b><i class:hot={andInputs[1]}></i>
          </div>
          <button class="test-button" on:click={runAndTest}>Try to unlock</button>
        </div>

        <SecurityEvidence
          list={andList}
          combinations={states}
          labels={['PIN', 'PRINT']}
        />

        {#if andOpen && !andReady}
          <div class="nudge">The locker opened. Test at least {3 - andList.length} more {3 - andList.length === 1 ? 'state' : 'states'} so you know whether both checks truly matter.</div>
        {/if}
        <button class="hint-link" on:click={() => showHint('and')}>{activeHint === 'and' ? 'Hide clue' : 'Need a clue?'}</button>
        {#if activeHint === 'and'}<div class="hint">Try one valid credential while deliberately failing the other.</div>{/if}
        <button class="primary" disabled={!andReady} on:click={() => phase = 'or'}>
          {andReady ? 'Rule proven · Next locker' : 'Open it and collect 3 tests'}
        </button>

      {:else if phase === 'or'}
        <div class="section-title">
          <span>Locker 02 · Emergency supplies</span>
          <h2>Open the rescue locker</h2>
          <p>During an emergency, authorised staff may have a supervisor card or a one-time recovery code.</p>
        </div>

        <div class="locker-machine rescue" class:open={orOpen}>
          <div class="identity">+</div>
          <strong class="locker-name">Rescue supplies · B4</strong>
          <span class="locker-state">{orOpen ? 'RELEASED' : 'SEALED'}</span>
          <div class="credentials">
            <button class:valid={orInputs[0]} on:click={() => toggle('or', 0)} aria-pressed={orInputs[0] === 1}>
              <span class="credential-icon">▣</span>
              <small>STAFF CARD</small>
              <strong>{orInputs[0] ? 'VALID' : 'ABSENT'}</strong>
            </button>
            <button class:valid={orInputs[1]} on:click={() => toggle('or', 1)} aria-pressed={orInputs[1] === 1}>
              <span class="credential-icon">✦</span>
              <small>RECOVERY CODE</small>
              <strong>{orInputs[1] ? 'VALID' : 'ABSENT'}</strong>
            </button>
          </div>
          <div class="lock-core">
            <i class:hot={orInputs[0]}></i><b>?</b><i class:hot={orInputs[1]}></i>
          </div>
          <button class="test-button" on:click={runOrTest}>Try to release</button>
        </div>

        <SecurityEvidence
          list={orList}
          combinations={states}
          labels={['CARD', 'CODE']}
        />

        {#if orOpen && !orReady}
          <div class="nudge">Good. Now prove whether each credential can open the locker independently, and test what happens with neither.</div>
        {/if}
        <button class="hint-link" on:click={() => showHint('or')}>{activeHint === 'or' ? 'Hide clue' : 'Need a clue?'}</button>
        {#if activeHint === 'or'}<div class="hint">Test card-only, code-only, and neither. Compare all three results.</div>{/if}
        <button class="primary" disabled={!orReady} on:click={() => phase = 'transfer'}>
          {orReady ? 'Rule proven · Design security' : 'Prove both routes work alone'}
        </button>

      {:else if phase === 'transfer'}
        <div class="section-title">
          <span>Security architect test</span>
          <h2>Choose the right lock</h2>
          <p>Use the two behaviours you discovered. The formal names are still hidden.</p>
        </div>

        <div class="policy-card">
          <div class="policy-icon">£</div>
          <div class="policy-copy">
            <small>High-value payment</small>
            <strong>A £10,000 transfer requires the manager’s key and the customer’s confirmation.</strong>
          </div>
          <div class="policy-options">
            <button
              class:selected={transferAnswers.payment === 'both'}
              class:correct={transferAnswers.payment === 'both'}
              on:click={() => answerTransfer('payment', 'both')}
            >Both checks required</button>
            <button
              class:selected={transferAnswers.payment === 'either'}
              class:wrong={transferAnswers.payment === 'either'}
              on:click={() => answerTransfer('payment', 'either')}
            >Either check is enough</button>
          </div>
        </div>

        <div class="policy-card">
          <div class="policy-icon">!</div>
          <div class="policy-copy">
            <small>Fire-door release</small>
            <strong>The door releases from the wall switch or automatically from the smoke sensor.</strong>
          </div>
          <div class="policy-options">
            <button
              class:selected={transferAnswers.fire === 'both'}
              class:wrong={transferAnswers.fire === 'both'}
              on:click={() => answerTransfer('fire', 'both')}
            >Both triggers required</button>
            <button
              class:selected={transferAnswers.fire === 'either'}
              class:correct={transferAnswers.fire === 'either'}
              on:click={() => answerTransfer('fire', 'either')}
            >Either trigger is enough</button>
          </div>
        </div>

        <div class="policy-card synthesis-card">
          <div class="policy-icon">↳</div>
          <div class="policy-copy">
            <small>Compose both behaviours</small>
            <strong>A server opens for a valid badge plus PIN, or for one emergency override. Which design matches?</strong>
          </div>
          <div class="policy-options">
            <button
              class:selected={transferAnswers.override === 'all'}
              class:wrong={transferAnswers.override === 'all'}
              on:click={() => answerTransfer('override', 'all')}
            >Badge, PIN, and override must all pass</button>
            <button
              class:selected={transferAnswers.override === 'grouped'}
              class:correct={transferAnswers.override === 'grouped'}
              on:click={() => answerTransfer('override', 'grouped')}
            >(Badge plus PIN) or override</button>
            <button
              class:selected={transferAnswers.override === 'any'}
              class:wrong={transferAnswers.override === 'any'}
              on:click={() => answerTransfer('override', 'any')}
            >Any one of the three is enough</button>
          </div>
        </div>

        <button class="primary" disabled={!transferReady} on:click={finishDiscovery}>
          {transferReady ? 'Reveal the systems' : 'Assign and combine the security rules'}
        </button>

      {:else if phase === 'reveal'}
        <div class="reveal">
          <div class="reveal-kicker">Two principles uncovered</div>
          <h2>You discovered AND and OR.</h2>
          <p>You operated both systems before meeting their syllabus names.</p>

          <div class="gate-reveals">
            <article>
              <div class="gate-mark">AND</div>
              <strong>Two-of-two</strong>
              <span>PIN <b>and</b> fingerprint must pass.</span>
              <LogicTruthMini mode="and" />
            </article>
            <article>
              <div class="gate-mark or">OR</div>
              <strong>One-of-two</strong>
              <span>Card <b>or</b> recovery code can pass.</span>
              <LogicTruthMini mode="or" />
            </article>
          </div>

          <div class="insight-ladder">
            <strong>What you actually proved</strong>
            <span><b>Evidence:</b> changing one credential at a time isolated what each input contributed.</span>
            <span><b>Rule:</b> AND narrows access; OR creates alternatives.</span>
            <span><b>Deeper build:</b> grouping gates lets you design compound decisions such as <em>(badge AND PIN) OR override</em>. That is the first step toward truth tables, circuits, and program conditions.</span>
          </div>

          <div class="reward-panel">
            <div class="reward-top">
              <div><span>Discovery distinction</span><strong>{config.rewardLabel}</strong></div>
              <b>+{reward} W</b>
            </div>
            <div class="reward-skills">
              <span class:earned={andReady && orReady}>Evidence</span>
              <span class:earned={true}>Pattern</span>
              <span class:earned={transferReady}>Transfer</span>
              <span class:earned={!hintUsed}>Independent</span>
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
</div>

<style>
  .solve-first { width: 100%; max-width: 410px; margin: 0 auto; color: var(--qx-text); }
  .mode-head { display: grid; grid-template-columns: 36px 1fr auto; gap: 10px; align-items: center; margin-bottom: 11px; }
  .exit { width: 34px; height: 34px; border-radius: 50%; border: 1.5px solid var(--qx-border); background: var(--qx-surface-2); color: var(--qx-text); font-size: 17px; cursor: pointer; }
  .mode-head div:nth-child(2) { display: flex; flex-direction: column; }
  .mode-head span { color: var(--qx-accent); font-size: 9px; font-weight: 900; letter-spacing: .11em; text-transform: uppercase; }
  .mode-head strong { font-size: 17px; font-weight: 900; }
  .phase-count { color: var(--qx-text-faint); font-size: 11px; font-weight: 900; font-variant-numeric: tabular-nums; }
  .phase-line { display: grid; grid-template-columns: repeat(4, 1fr); gap: 5px; margin-bottom: 20px; }
  .phase-line span { height: 4px; border-radius: 4px; background: var(--qx-surface-3); }
  .phase-line span.active { background: var(--qx-accent); }
  .phase-line span.done { background: var(--qx-green); }
  .phase { min-height: 410px; display: flex; flex-direction: column; }
  .brief { text-align: center; display: flex; flex-direction: column; align-items: center; }
  .security-mark { width: 92px; height: 92px; border-radius: 24px; margin: 10px 0 18px; background: var(--qx-text); color: var(--qx-bg); box-shadow: var(--qx-shadow-card); display: grid; grid-template-columns: 1fr 1fr; align-items: center; padding: 12px; box-sizing: border-box; }
  .pin-dots { font-size: 16px; letter-spacing: 2px; color: var(--qx-accent); }
  .fingerprint { font-size: 38px; line-height: 1; color: var(--qx-green); }
  .micro-label, .section-title > span, .reveal-kicker { color: var(--qx-accent); font-size: 10px; font-weight: 900; letter-spacing: .11em; text-transform: uppercase; }
  h2 { font-size: 25px; line-height: 1.1; margin: 7px 0 9px; font-weight: 950; }
  p { color: var(--qx-text-dim); font-size: 13.5px; line-height: 1.5; margin: 0; }
  .brief > p { max-width: 31ch; }
  .mission { margin: 20px 0 12px; text-align: left; width: 100%; box-sizing: border-box; border: 1.5px solid var(--qx-accent); border-radius: 14px; padding: 13px 14px; background: var(--qx-accent-soft); }
  .mission span { display: block; color: var(--qx-accent-text); font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: .08em; }
  .mission strong { display: block; color: var(--qx-text); margin-top: 4px; font-size: 14px; line-height: 1.4; }
  .brief-rules { display: flex; gap: 5px; flex-wrap: wrap; justify-content: center; margin-bottom: 19px; }
  .brief-rules span { border: 1px solid var(--qx-border); border-radius: 999px; padding: 5px 9px; font-size: 10px; font-weight: 800; color: var(--qx-text-dim); background: var(--qx-surface-2); }
  .primary, .secondary { min-height: 44px; width: 100%; border-radius: 999px; font-family: var(--qx-font); font-size: 14px; font-weight: 900; cursor: pointer; }
  .primary { border: none; background: var(--qx-accent); color: #fff; }
  .primary:disabled { opacity: .42; cursor: not-allowed; }
  .secondary { border: 1.5px solid var(--qx-border-2); background: var(--qx-surface); color: var(--qx-text-dim); }
  .section-title { text-align: left; margin-bottom: 15px; }
  .section-title h2 { font-size: 22px; margin-bottom: 6px; }
  .locker-machine { position: relative; border: 1.5px solid var(--qx-border); border-radius: 16px; padding: 13px; background: linear-gradient(145deg, var(--qx-surface-2), var(--qx-surface)); box-shadow: var(--qx-shadow-card); margin-bottom: 11px; display: grid; grid-template-columns: 38px 1fr auto; align-items: center; gap: 8px; }
  .locker-machine.open { border-color: var(--qx-green); box-shadow: 0 12px 28px -18px var(--qx-green); }
  .identity { width: 34px; height: 34px; border-radius: 11px; background: var(--qx-accent-soft); color: var(--qx-accent-text); display: grid; place-items: center; font-size: 15px; font-weight: 950; }
  .rescue .identity { background: var(--qx-green-soft); color: var(--qx-green-text); }
  .locker-name { font-size: 12px; }
  .locker-state { border: 1px solid var(--qx-danger); color: var(--qx-danger-text); background: var(--qx-danger-soft); border-radius: 999px; padding: 4px 7px; font-size: 8px; font-weight: 950; letter-spacing: .05em; }
  .locker-machine.open .locker-state { border-color: var(--qx-green); color: var(--qx-green-text); background: var(--qx-green-soft); }
  .credentials { grid-column: 1 / -1; display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 3px; }
  .credentials button { min-height: 84px; border: 1.5px solid var(--qx-border-2); border-radius: 12px; background: var(--qx-surface); color: var(--qx-text); display: grid; grid-template-columns: 38px 1fr; grid-template-rows: 1fr 1fr; align-items: center; text-align: left; padding: 9px; cursor: pointer; }
  .credentials button.valid { border-color: var(--qx-green); background: var(--qx-green-soft); }
  .credential-icon { grid-row: 1 / 3; width: 32px; height: 32px; border-radius: 9px; display: grid; place-items: center; background: var(--qx-surface-2); color: var(--qx-accent-text); font-size: 18px; font-weight: 950; }
  .credential-icon.print { font-size: 25px; }
  .credentials small { font-size: 8px; font-weight: 900; color: var(--qx-text-faint); letter-spacing: .06em; }
  .credentials strong { font-size: 10px; }
  .credentials button.valid strong { color: var(--qx-green-text); }
  .lock-core { grid-column: 1 / -1; height: 38px; display: flex; align-items: center; }
  .lock-core i { height: 2px; background: var(--qx-border-2); flex: 1; }
  .lock-core i.hot { background: var(--qx-accent); box-shadow: 0 0 7px var(--qx-accent); }
  .lock-core b { width: 38px; height: 30px; border: 1.5px solid var(--qx-text-faint); border-radius: 8px; display: grid; place-items: center; background: var(--qx-text); color: var(--qx-bg); }
  .test-button { grid-column: 1 / -1; width: 100%; min-height: 39px; border-radius: 10px; border: none; background: var(--qx-text); color: var(--qx-bg); font-family: var(--qx-font); font-size: 12px; font-weight: 900; cursor: pointer; }
  .nudge, .hint { border-radius: 10px; padding: 9px 11px; font-size: 11px; line-height: 1.4; margin-bottom: 7px; }
  .nudge { color: var(--qx-green-text); background: var(--qx-green-soft); }
  .hint { color: var(--qx-accent-text); background: var(--qx-accent-soft); }
  .hint-link { border: none; background: none; color: var(--qx-text-faint); font-family: var(--qx-font); font-size: 11px; font-weight: 800; cursor: pointer; margin: 0 auto 8px; }
  .policy-card { display: grid; grid-template-columns: 42px 1fr; gap: 10px; border: 1.5px solid var(--qx-border); border-radius: 14px; padding: 12px; margin-bottom: 10px; background: var(--qx-surface-2); }
  .policy-icon { width: 40px; height: 40px; border-radius: 12px; display: grid; place-items: center; background: var(--qx-text); color: var(--qx-bg); font-size: 18px; font-weight: 950; }
  .policy-copy { display: flex; flex-direction: column; }
  .policy-copy small { color: var(--qx-accent); font-size: 8px; font-weight: 900; text-transform: uppercase; letter-spacing: .07em; }
  .policy-copy strong { font-size: 12px; line-height: 1.38; margin-top: 3px; }
  .policy-options { grid-column: 1 / -1; display: grid; grid-template-columns: 1fr 1fr; gap: 7px; }
  .policy-options button { min-height: 46px; border: 1.5px solid var(--qx-border-2); border-radius: 10px; background: var(--qx-surface); color: var(--qx-text-dim); font: 800 10.5px/1.25 var(--qx-font); padding: 7px; cursor: pointer; }
  .policy-options button.correct { border-color: var(--qx-green); background: var(--qx-green-soft); color: var(--qx-green-text); }
  .policy-options button.wrong { border-color: var(--qx-danger); background: var(--qx-danger-soft); color: var(--qx-danger-text); }
  .synthesis-card { border-color: var(--qx-accent); }
  .insight-ladder { width: 100%; box-sizing: border-box; display: grid; gap: 7px; border: 1.5px solid var(--qx-accent); border-radius: 12px; padding: 11px 12px; margin-bottom: 13px; background: var(--qx-accent-soft); text-align: left; }
  .insight-ladder > strong { color: var(--qx-accent-text); font-size: 12px; }
  .insight-ladder span { color: var(--qx-text-dim); font-size: 10.5px; line-height: 1.4; }
  .insight-ladder b { color: var(--qx-text); }
  .reveal { text-align: center; display: flex; flex-direction: column; align-items: center; }
  .reveal h2 { font-size: 22px; }
  .gate-reveals { width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin: 15px 0 12px; }
  .gate-reveals article { border: 1.5px solid var(--qx-border); border-radius: 14px; padding: 11px 8px; background: var(--qx-surface-2); display: flex; flex-direction: column; align-items: center; }
  .gate-mark { width: 70px; height: 48px; border: 2px solid var(--qx-green); border-radius: 14px; display: grid; place-items: center; background: var(--qx-green-soft); color: var(--qx-green-text); font-size: 16px; font-weight: 950; }
  .gate-mark.or { border-color: var(--qx-accent); background: var(--qx-accent-soft); color: var(--qx-accent-text); }
  .gate-reveals article > strong { font-size: 12px; margin-top: 7px; }
  .gate-reveals article > span { color: var(--qx-text-dim); font-size: 9.5px; line-height: 1.35; margin-top: 3px; min-height: 28px; }
  .reward-panel { width: 100%; box-sizing: border-box; border: 1.5px solid var(--qx-green); border-radius: 14px; background: var(--qx-green-soft); padding: 12px; text-align: left; margin-bottom: 13px; }
  .reward-top { display: flex; justify-content: space-between; align-items: center; }
  .reward-top div { display: flex; flex-direction: column; }
  .reward-top span { font-size: 9px; color: var(--qx-green-text); font-weight: 900; text-transform: uppercase; letter-spacing: .08em; }
  .reward-top strong { font-size: 15px; color: var(--qx-text); }
  .reward-top b { color: var(--qx-green-text); font-size: 21px; }
  .reward-skills { display: flex; gap: 5px; flex-wrap: wrap; margin: 10px 0 7px; }
  .reward-skills span { border: 1px solid var(--qx-border); background: var(--qx-surface); color: var(--qx-text-faint); border-radius: 999px; padding: 4px 8px; font-size: 9px; font-weight: 850; }
  .reward-skills span.earned { color: var(--qx-green-text); border-color: var(--qx-green); }
  .reward-panel small { color: var(--qx-text-dim); font-size: 9.5px; line-height: 1.35; display: block; }
  .reveal-actions { width: 100%; display: grid; gap: 7px; }
  @media (max-width: 360px) { .solve-first { max-width: 100%; } .phase { min-height: 390px; } h2 { font-size: 22px; } }
</style>
