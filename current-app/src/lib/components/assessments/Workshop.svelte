<script>
  // Workshop — steps through interactive assessment interactions
  import { onDestroy } from 'svelte';
  import { fly } from 'svelte/transition';
  import SortingDesk from './SortingDesk.svelte';
  import TapErase from './TapErase.svelte';
  import BitPattern from './BitPattern.svelte';
  import PixelGrid from './PixelGrid.svelte';
  import ForceBalance from './ForceBalance.svelte';
  import WaveTuner from './WaveTuner.svelte';
  import AtomBuilder from './AtomBuilder.svelte';
  import MoleculeBuilder from './MoleculeBuilder.svelte';
  import MatrixCellFinder from './MatrixCellFinder.svelte';
  import MatrixTransform from './MatrixTransform.svelte';
  import MatrixLab from './MatrixLab.svelte';
  import CoordinateDrill from './CoordinateDrill.svelte';
  import CoordinateWorkbook from './CoordinateWorkbook.svelte';
  import UnitDimensionCheck from './UnitDimensionCheck.svelte';
  import PixiSceneChoice from './PixiSceneChoice.svelte';
  import ThermoLab from './ThermoLab.svelte';
  import BitsToNumber from './BitsToNumber.svelte';
  import BitsToWord from './BitsToWord.svelte';
  import GateBuilder from './GateBuilder.svelte';
  import BitMachineLab from './BitMachineLab.svelte';
  import UnitForgeLab from './UnitForgeLab.svelte';
  import BondLab from './BondLab.svelte';
  import FunctionMachineLab from './FunctionMachineLab.svelte';
  import AtomFoundryLab from './AtomFoundryLab.svelte';
  import UnitCircleLab from './UnitCircleLab.svelte';
  import CircuitBenchLab from './CircuitBenchLab.svelte';
  import MotionLab from './MotionLab.svelte';
  import MomentumLab from './MomentumLab.svelte';
  import EquationBalancer from './EquationBalancer.svelte';
  import FunctionLab from './FunctionLab.svelte';
  import AsymptoteLab from './AsymptoteLab.svelte';
  import RateIntervalBench from './RateIntervalBench.svelte';
  import LocalLinearityStudio from './LocalLinearityStudio.svelte';
  import SecantTangentStudio from './SecantTangentStudio.svelte';
  import ProbabilityLab from './ProbabilityLab.svelte';
  // MCQ-style scenario picker is inline

  export let interactions = []; // [{ type: 'sorting'|'taperase'|'scenario', ...props }]
  export let onDone = () => {}; // (score, total, bestStreak) => void
  // Challenge mode: whole-run countdown. 0 = off (normal learn flow, untouched).
  // When it hits zero the run ends immediately — answered steps keep their score,
  // unanswered steps count as missed (total = interactions.length throughout).
  export let timeLimitSec = 0;
  // Test (assessment) mode: one attempt per item with nothing revealed while
  // running — no correct-answer highlight, no teaching feedback, no streak
  // flame (it would leak correctness). The verdict arrives only at the end.
  export let assess = false;
  // Full workshop runs use a compact retro-game HUD and input treatment.
  // Reader checkpoints and daily workouts keep the calmer default surface.
  export let arcade = false;

  let step = 0;
  let totalScore = 0;
  let totalMax = 0;
  let streak = 0;
  let bestStreak = 0;
  let finished = false;

  // ── challenge countdown ──
  let timeLeft = timeLimitSec;
  let timerId = null;
  if (timeLimitSec > 0) {
    timerId = setInterval(() => {
      timeLeft -= 1;
      if (timeLeft <= 0) {
        stopTimer();
        finished = true;
        onDone(totalScore, interactions.length, bestStreak);
      }
    }, 1000);
  }
  function stopTimer() {
    if (timerId) { clearInterval(timerId); timerId = null; }
  }
  onDestroy(stopTimer);

  $: mmss = `${Math.floor(Math.max(0, timeLeft) / 60)}:${String(Math.max(0, timeLeft) % 60).padStart(2, '0')}`;
  $: timeCritical = timeLimitSec > 0 && timeLeft <= 15;

  function shuffle(items = []) {
    const shuffled = [...items];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  function shuffledOptions(interaction) {
    if (!interaction?._shuffledOptions) {
      interaction._shuffledOptions = shuffle(interaction.options || []);
    }
    return interaction._shuffledOptions;
  }

  function handleInteractionDone(score, max) {
    if (finished) return; // timer expired while feedback was on screen
    totalScore += score;
    totalMax += max;
    if (score >= max && max > 0) {
      streak += 1;
      if (streak > bestStreak) bestStreak = streak;
    } else {
      streak = 0;
    }
    if (step < interactions.length - 1) {
      step++;
    } else {
      finished = true;
      stopTimer();
      onDone(totalScore, timeLimitSec > 0 ? interactions.length : totalMax, bestStreak);
    }
  }

  $: current = interactions[step];
  $: progressPct = interactions.length ? ((step + 1) / interactions.length) * 100 : 0;
  $: scenarioOptions = current?.type === 'scenario' ? shuffledOptions(current) : [];
</script>

<div class="workshop" class:arcade>
  <div class="workshop-header">
    <div>
      <span class="workshop-kicker">{assess ? 'Test' : timeLimitSec > 0 ? 'Challenge' : 'Learn First'}</span>
      <span class="workshop-title">Workshop</span>
    </div>
    <div class="workshop-chips">
      {#if streak >= 2 && !assess}
        <span class="workshop-streak">🔥 {streak}</span>
      {/if}
      {#if timeLimitSec > 0}
        <span class="workshop-timer" class:critical={timeCritical}>{mmss}</span>
      {/if}
      <span class="workshop-progress">{step + 1}/{interactions.length}</span>
    </div>
  </div>
  <div class="progress-track" aria-hidden="true">
    <span style={`width:${progressPct}%`}></span>
  </div>

  <!-- Keyed by step: Svelte otherwise reuses the same component instance across
       consecutive same-type interactions, leaving mount-only state (targets,
       toggles, selections) stale on every step after the first. -->
  {#key step}
  <div class="workshop-body" in:fly={{ x: 40, duration: 220 }}>
    {#if current}
      {#if current.type === 'sorting'}
        <SortingDesk boxes={current.boxes} items={current.items} onDone={handleInteractionDone} />
      {:else if current.type === 'taperase'}
        <TapErase onDone={handleInteractionDone} />
      {:else if current.type === 'bitpattern'}
        <BitPattern
          prompt={current.prompt}
          bits={current.bits}
          target={current.target}
          labels={current.labels || []}
          correctFeedback={current.correctFeedback}
          incorrectFeedback={current.incorrectFeedback}
          onDone={handleInteractionDone}
        />
      {:else if current.type === 'pixelgrid'}
        <PixelGrid
          prompt={current.prompt}
          target={current.target}
          correctFeedback={current.correctFeedback}
          incorrectFeedback={current.incorrectFeedback}
          onDone={handleInteractionDone}
        />
      {:else if current.type === 'forcebalance'}
        <ForceBalance
          prompt={current.prompt}
          target={current.target}
          startLeft={current.startLeft}
          startRight={current.startRight}
          correctFeedback={current.correctFeedback}
          incorrectFeedback={current.incorrectFeedback}
          onDone={handleInteractionDone}
        />
      {:else if current.type === 'wavetuner'}
        <WaveTuner
          prompt={current.prompt}
          targetAmplitude={current.targetAmplitude}
          targetFrequency={current.targetFrequency}
          correctFeedback={current.correctFeedback}
          incorrectFeedback={current.incorrectFeedback}
          onDone={handleInteractionDone}
        />
      {:else if current.type === 'atombuilder'}
        <AtomBuilder
          prompt={current.prompt}
          targetName={current.targetName}
          targetProtons={current.targetProtons}
          targetNeutrons={current.targetNeutrons}
          targetElectrons={current.targetElectrons}
          correctFeedback={current.correctFeedback}
          incorrectFeedback={current.incorrectFeedback}
          onDone={handleInteractionDone}
        />
      {:else if current.type === 'moleculebuilder'}
        <MoleculeBuilder
          prompt={current.prompt}
          targetFormula={current.targetFormula}
          targetAtoms={current.targetAtoms}
          correctFeedback={current.correctFeedback}
          incorrectFeedback={current.incorrectFeedback}
          onDone={handleInteractionDone}
        />
      {:else if current.type === 'matrixcell'}
        <MatrixCellFinder
          prompt={current.prompt}
          matrix={current.matrix}
          targetRow={current.targetRow}
          targetCol={current.targetCol}
          correctFeedback={current.correctFeedback}
          incorrectFeedback={current.incorrectFeedback}
          onDone={handleInteractionDone}
        />
      {:else if current.type === 'matrixtransform'}
        <MatrixTransform
          prompt={current.prompt}
          matrix={current.matrix}
          inputPoint={current.inputPoint}
          options={current.options}
          correctFeedback={current.correctFeedback}
          incorrectFeedback={current.incorrectFeedback}
          onDone={handleInteractionDone}
        />
      {:else if current.type === 'matrixlab'}
        <MatrixLab
          mode={current.mode}
          prompt={current.prompt}
          matrix={current.matrix}
          blankRow={current.blankRow}
          blankCol={current.blankCol}
          options={current.options}
          correctValue={current.correctValue}
          matrices={current.matrices}
          correctIndex={current.correctIndex}
          matrixA={current.matrixA}
          matrixB={current.matrixB}
          choices={current.choices}
          correctChoice={current.correctChoice}
          correctFeedback={current.correctFeedback}
          incorrectFeedback={current.incorrectFeedback}
          onDone={handleInteractionDone}
        />
      {:else if current.type === 'coorddrill'}
        <CoordinateDrill
          mode={current.mode}
          prompt={current.prompt}
          targetX={current.targetX}
          targetY={current.targetY}
          targetM={current.targetM}
          targetC={current.targetC}
          fixedPoint={current.fixedPoint}
          targetDistance={current.targetDistance}
          distanceTolerance={current.distanceTolerance}
          pointA={current.pointA}
          pointB={current.pointB}
          xRange={current.xRange}
          yRange={current.yRange}
          correctFeedback={current.correctFeedback}
          incorrectFeedback={current.incorrectFeedback}
          onDone={handleInteractionDone}
        />
      {:else if current.type === 'coordworkbook'}
        <CoordinateWorkbook
          mode={current.mode}
          prompt={current.prompt}
          points={current.points}
          targetId={current.targetId}
          targetCoordinate={current.targetCoordinate}
          targetQuadrant={current.targetQuadrant}
          vector={current.vector}
          axis={current.axis}
          xRange={current.xRange}
          yRange={current.yRange}
          correctFeedback={current.correctFeedback}
          incorrectFeedback={current.incorrectFeedback}
          onDone={handleInteractionDone}
        />
      {:else if current.type === 'unitcheck'}
        <UnitDimensionCheck
          prompt={current.prompt}
          expression={current.expression}
          target={current.target}
          options={current.options}
          correctOption={current.correctOption}
          correctFeedback={current.correctFeedback}
          incorrectFeedback={current.incorrectFeedback}
          onDone={handleInteractionDone}
        />
      {:else if current.type === 'pixiscene'}
        <PixiSceneChoice
          mode={current.mode}
          scene={current.scene}
          prompt={current.prompt}
          options={current.options}
          correctOption={current.correctOption}
          correctFeedback={current.correctFeedback}
          incorrectFeedback={current.incorrectFeedback}
          onDone={handleInteractionDone}
        />
      {:else if current.type === 'thermolab'}
        <ThermoLab
          mode={current.mode}
          prompt={current.prompt}
          target={current.target}
          tolerance={current.tolerance}
          start={current.start}
          min={current.min}
          max={current.max}
          step={current.step}
          correctFeedback={current.correctFeedback}
          incorrectFeedback={current.incorrectFeedback}
          onDone={handleInteractionDone}
        />
      {:else if current.type === 'bitsnumber'}
        <BitsToNumber
          mode={current.mode}
          prompt={current.prompt}
          bits={current.bits}
          target={current.target}
          shown={current.shown}
          options={current.options}
          correctFeedback={current.correctFeedback}
          incorrectFeedback={current.incorrectFeedback}
          onDone={handleInteractionDone}
        />
      {:else if current.type === 'bitsword'}
        <BitsToWord
          mode={current.mode}
          prompt={current.prompt}
          target={current.target}
          shown={current.shown}
          options={current.options}
          correctFeedback={current.correctFeedback}
          incorrectFeedback={current.incorrectFeedback}
          onDone={handleInteractionDone}
        />
      {:else if current.type === 'gatebuilder'}
        <GateBuilder
          mode={current.mode}
          prompt={current.prompt}
          chain={current.chain}
          palette={current.palette}
          gatesLocked={current.gatesLocked}
          targetTable={current.targetTable}
          correctFeedback={current.correctFeedback}
          incorrectFeedback={current.incorrectFeedback}
          onDone={handleInteractionDone}
        />
      {:else if current.type === 'bitmachine'}
        <BitMachineLab
          prompt={current.prompt}
          onDone={handleInteractionDone}
        />
      {:else if current.type === 'unitforge'}
        <UnitForgeLab
          prompt={current.prompt}
          onDone={handleInteractionDone}
        />
      {:else if current.type === 'bondlab'}
        <BondLab
          prompt={current.prompt}
          onDone={handleInteractionDone}
        />
      {:else if current.type === 'functionmachine'}
        <FunctionMachineLab
          prompt={current.prompt}
          onDone={handleInteractionDone}
        />
      {:else if current.type === 'atomfoundry'}
        <AtomFoundryLab
          prompt={current.prompt}
          onDone={handleInteractionDone}
        />
      {:else if current.type === 'unitcircle'}
        <UnitCircleLab
          prompt={current.prompt}
          onDone={handleInteractionDone}
        />
      {:else if current.type === 'circuitbench'}
        <CircuitBenchLab
          prompt={current.prompt}
          onDone={handleInteractionDone}
        />
      {:else if current.type === 'motionlab'}
        <MotionLab
          prompt={current.prompt}
          onDone={handleInteractionDone}
        />
      {:else if current.type === 'momentumlab'}
        <MomentumLab
          prompt={current.prompt}
          onDone={handleInteractionDone}
        />
      {:else if current.type === 'equationbalancer'}
        <EquationBalancer
          prompt={current.prompt}
          onDone={handleInteractionDone}
        />
      {:else if current.type === 'functionlab'}
        <FunctionLab
          prompt={current.prompt}
          onDone={handleInteractionDone}
        />
      {:else if current.type === 'asymptotelab'}
        <AsymptoteLab
          prompt={current.prompt}
          onDone={handleInteractionDone}
        />
      {:else if current.type === 'rateinterval'}
        <RateIntervalBench
          prompt={current.prompt}
          onDone={handleInteractionDone}
        />
      {:else if current.type === 'locallinearity'}
        <LocalLinearityStudio
          prompt={current.prompt}
          onDone={handleInteractionDone}
        />
      {:else if current.type === 'secanttangent'}
        <SecantTangentStudio
          prompt={current.prompt}
          onDone={handleInteractionDone}
        />
      {:else if current.type === 'probability'}
        <ProbabilityLab
          prompt={current.prompt}
          onDone={handleInteractionDone}
        />
      {:else if current.type === 'scenario'}
        <div class="scenario">
          <div class="scenario-prompt">{current.prompt}</div>
          {#if current.image}
            <div class="scenario-image">{current.image}</div>
          {/if}
          <div class="scenario-options">
            {#each scenarioOptions as opt}
              <button
                class="scenario-opt"
                class:selected={current._answered && (!assess || current._chosen === opt.id)}
                class:correct={!assess && current._answered && opt.correct}
                class:incorrect={!assess && current._answered && current._chosen === opt.id && !opt.correct}
                on:click={() => {
                  if (current._answered) return;
                  current._answered = true;
                  current._chosen = opt.id;
                  current._feedback = opt.correct ? current.correctFeedback : current.incorrectFeedback;
                  current._correct = opt.correct;
                  interactions = [...interactions];
                }}
              >
                {opt.label}
                {#if !assess && current._answered && opt.correct}<span class="check"> ✓</span>{/if}
                {#if !assess && current._answered && current._chosen === opt.id && !opt.correct}<span class="check"> ✗</span>{/if}
              </button>
            {/each}
          </div>
          {#if current._answered}
            {#if assess}
              <div class="scenario-feedback">Answer locked in. You’ll see your score at the end.</div>
            {:else}
              <div class="scenario-feedback" class:correct={current._correct} class:incorrect={!current._correct}>
                {current._feedback}
              </div>
            {/if}
            <button class="continue-btn" on:click={() => handleInteractionDone(current._correct ? 1 : 0, 1)}>Continue</button>
          {/if}
        </div>
      {/if}
    {/if}
  </div>
  {/key}
</div>

<style>
  .workshop {
    display: flex; flex-direction: column; width: 100%;
  }
  .workshop-header {
    display: flex; justify-content: space-between; align-items: center;
    gap: 14px; margin-bottom: 8px;
  }
  .workshop-kicker {
    display: block;
    font-size: 10px;
    line-height: 1.1;
    font-weight: 850;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--qx-accent);
    margin-bottom: 3px;
  }
  .workshop-title {
    display: block;
    font-size: 18px; font-weight: 850; color: var(--qx-text);
  }
  .workshop-chips {
    display: flex; align-items: center; gap: 6px;
  }
  .workshop-progress {
    font-size: 12px; font-weight: 850; color: var(--qx-text-faint);
    font-variant-numeric: tabular-nums;
    border: 1px solid var(--qx-border);
    border-radius: 999px;
    padding: 5px 9px;
    background: var(--qx-surface-2);
  }
  .workshop-timer {
    font-size: 12px; font-weight: 900; color: var(--qx-accent);
    font-variant-numeric: tabular-nums;
    border: 1px solid var(--qx-accent);
    border-radius: 999px;
    padding: 5px 9px;
    background: var(--qx-accent-soft);
    min-width: 40px;
    text-align: center;
  }
  .workshop-timer.critical {
    color: var(--qx-danger-text);
    border-color: var(--qx-danger);
    background: var(--qx-danger-soft);
    animation: timerPulse 1s ease-in-out infinite;
  }
  @keyframes timerPulse {
    50% { transform: scale(1.08); }
  }
  @media (prefers-reduced-motion: reduce) {
    .workshop-timer.critical { animation: none; }
  }
  .workshop-streak {
    font-size: 12px; font-weight: 900; color: var(--qx-green-text);
    border: 1px solid var(--qx-green);
    border-radius: 999px;
    padding: 5px 9px;
    background: var(--qx-green-soft);
  }
  .progress-track {
    height: 5px;
    width: 100%;
    border-radius: 999px;
    background: var(--qx-surface-2);
    overflow: hidden;
    margin-bottom: 18px;
  }
  .progress-track span {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: var(--qx-accent);
    transition: width 0.22s ease;
  }
  .workshop-body { flex: 1; min-height: 360px; }
  .scenario {
    display: flex; flex-direction: column; gap: 16px; align-items: center;
    width: 100%; max-width: 360px; margin: 0 auto;
  }
  .scenario-prompt {
    font-size: 15px; font-weight: 700; color: var(--qx-text);
    text-align: center; line-height: 1.5;
  }
  .scenario-options { display: flex; flex-direction: column; gap: 8px; width: 100%; }
  .scenario-opt {
    padding: 12px 14px; border-radius: 10px; border: 1.5px solid var(--qx-border-2);
    background: var(--qx-surface); font-family: var(--qx-font);
    font-size: 14px; font-weight: 700; color: var(--qx-text); cursor: pointer;
    text-align: left; transition: border-color 0.15s;
  }
  .scenario-opt:hover { border-color: var(--qx-accent); }
  .scenario-opt.selected { pointer-events: none; }
  .scenario-opt.correct { border-color: var(--qx-green); background: var(--qx-green-soft); color: var(--qx-green-text); }
  .scenario-opt.incorrect { border-color: var(--qx-danger); background: var(--qx-danger-soft); color: var(--qx-danger-text); }
  .check { float: right; }
  .scenario-feedback {
    font-size: 13px; font-weight: 600; padding: 12px; border-radius: 8px;
    text-align: center; line-height: 1.5; width: 100%; box-sizing: border-box;
  }
  .scenario-feedback.correct { background: var(--qx-green-soft); color: var(--qx-green-text); }
  .scenario-feedback.incorrect { background: var(--qx-danger-soft); color: var(--qx-danger-text); }
  .continue-btn {
    padding: 12px 32px; border-radius: 24px; border: none;
    background: var(--qx-accent); color: #fff;
    font-family: var(--qx-font); font-size: 14px; font-weight: 800; cursor: pointer;
  }

  /* Selected workshops switch into a compact pre-smartphone game presentation.
     The interactions stay accessible HTML; only the framing and feedback language
     become more console-like. */
  .workshop.arcade { min-height: 420px; }
  .arcade .workshop-header {
    min-height: 54px;
    margin: 0 0 8px;
    padding: 8px 10px;
    border: 1px solid var(--qx-border);
    border-radius: var(--qx-radius-md);
    background: var(--qx-surface);
    box-sizing: border-box;
  }
  .arcade .workshop-kicker { color: var(--qx-accent-text); font-size: 8px; letter-spacing: .13em; }
  .arcade .workshop-title { color: var(--qx-text); font-size: 14px; text-transform: uppercase; }
  .arcade .workshop-progress,
  .arcade .workshop-timer,
  .arcade .workshop-streak {
    border-radius: var(--qx-radius-sm);
    padding: 5px 7px;
    background: var(--qx-surface-2);
    color: var(--qx-text-dim);
    font-size: 9px;
  }
  .arcade .workshop-timer { color: var(--qx-accent-text); }
  .arcade .workshop-streak { color: var(--qx-green-text); }
  .arcade .progress-track {
    height: 8px;
    margin-bottom: 18px;
    border: none;
    border-radius: 999px;
    background: var(--qx-surface-3);
  }
  .arcade .progress-track span {
    border-radius: inherit;
    background: var(--qx-accent);
  }
  .arcade .workshop-body {
    min-height: 340px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .arcade .scenario { max-width: 430px; gap: 13px; }
  .arcade .scenario-prompt {
    width: 100%;
    padding: 14px;
    border: 1px solid var(--qx-border);
    border-radius: var(--qx-radius-md);
    background: var(--qx-surface);
    color: var(--qx-text);
    box-shadow: var(--qx-shadow-card);
    font-size: 13px;
    line-height: 1.45;
    box-sizing: border-box;
  }
  .arcade .scenario-options { gap: 9px; }
  .arcade .scenario-opt {
    min-height: 48px;
    padding: 11px 13px;
    border: 1px solid var(--qx-border-2);
    border-radius: var(--qx-radius-sm);
    background: var(--qx-surface);
    box-shadow: var(--qx-shadow-card);
    font-size: 12px;
  }
  .arcade .scenario-opt:active {
    transform: translateY(1px);
    box-shadow: none;
  }
  .arcade .scenario-opt.correct { border-color: var(--qx-green); }
  .arcade .scenario-opt.incorrect { border-color: var(--qx-danger); }
  .arcade .scenario-feedback {
    border: 1px solid currentColor;
    border-radius: var(--qx-radius-sm);
    font-size: 11px;
  }
  .arcade .continue-btn {
    min-height: 46px;
    padding: 0 26px;
    border: none;
    border-radius: var(--qx-radius-sm);
    box-shadow: var(--qx-shadow-card);
    font-size: 11px;
    text-transform: uppercase;
  }
  .arcade .continue-btn:active { transform: translateY(1px); box-shadow: none; }

  @media (max-width: 430px) {
    .workshop.arcade { min-height: 390px; }
    .arcade .workshop-header { align-items: flex-start; }
    .arcade .workshop-chips { gap: 3px; }
    .arcade .workshop-streak { display: none; }
    .arcade .scenario-prompt { font-size: 12px; }
  }

  /* Desktop: give the exercise a comfortable, centred column instead of a
     phone-width strip marooned in a wide, empty card. */
  @media (min-width: 900px) {
    .workshop-body { display: flex; flex-direction: column; justify-content: center; }
    .scenario { max-width: 560px; gap: 18px; }
    .scenario-prompt { font-size: 17px; line-height: 1.5; }
    .scenario-opt { font-size: 15px; padding: 14px 16px; }
    .scenario-feedback { font-size: 14px; }
  }
</style>
