<script>
  import QxButton from '../lib/components/qubix/QxButton.svelte';
  import QubixMascot from '../lib/components/qubix/QubixMascot.svelte';
  import { profile } from '../lib/stores/profile.js';

  export let onComplete = () => {};

  let step = 1;
  const TOTAL_STEPS = 4;

  let username = '';
  let ageBand = '';
  let learningGoal = '';
  let dailyGoalMinutes = 10;
  let selectedTopics = [];
  let heardFrom = '';
  let learnerType = '';
  let saving = false;

  // Qubix requires a minimum age of 13 (UK GDPR consent age) and is declared
  // as not targeted at children on Google Play. Do not re-add an under-13 band
  // without a verifiable parental-consent flow — see migration 0005.
  const AGE_BANDS = [
    { id: '13_15', label: '13-15' },
    { id: '16_17', label: '16-17' },
    { id: '18_plus', label: '18+' },
    { id: 'prefer_not', label: 'Prefer not' }
  ];

  const GOALS = [
    { id: 'school', label: 'School' },
    { id: 'exam', label: 'Exams' },
    { id: 'career', label: 'Career' },
    { id: 'coding', label: 'Coding' },
    { id: 'curiosity', label: 'Curiosity' },
    { id: 'teaching', label: 'Teaching' }
  ];

  const TOPICS = [
    { id: 'line', label: 'Mathematics', sub: 'numbers, space, patterns' },
    { id: 'bit', label: 'Computer Science', sub: 'code, systems, AI' },
    { id: 'atom', label: 'Chemistry', sub: 'atoms, bonds, reactions' },
    { id: 'unit', label: 'Physics', sub: 'forces, units, energy' }
  ];

  const HEARD_OPTIONS = ['Friend', 'Social', 'Search', 'Teacher', 'Other'];
  const LEARNER_TYPES = [
    { id: 'visual', label: 'Visual', sub: 'diagrams and maps' },
    { id: 'hands-on', label: 'Hands-on', sub: 'do, then learn' },
    { id: 'reader', label: 'Reader', sub: 'text and depth' },
    { id: 'social', label: 'Social', sub: 'progress and leagues' }
  ];

  $: cleanUsername = username.toLowerCase().replace(/[^a-z0-9_]+/g, '_').replace(/^_+|_+$/g, '').slice(0, 40);
  $: usernameValid = cleanUsername.length >= 3;
  $: canContinue =
    step === 1 ? usernameValid && ageBand :
    step === 2 ? learningGoal && dailyGoalMinutes :
    step === 3 ? selectedTopics.length > 0 :
    true;

  function toggleTopic(id) {
    selectedTopics = selectedTopics.includes(id)
      ? selectedTopics.filter((item) => item !== id)
      : [...selectedTopics, id];
  }

  async function next() {
    if (!canContinue || saving) return;
    if (step < TOTAL_STEPS) {
      step += 1;
      return;
    }

    saving = true;
    await profile.complete({
      username: cleanUsername,
      ageBand,
      learningGoal,
      dailyGoalMinutes,
      selectedTopics,
      heardFrom,
      learnerType
    });
    saving = false;
    onComplete();
  }

  function back() {
    if (step > 1) step -= 1;
  }
</script>

<div class="qx-shell onboarding-view">
  <div class="topbar">
    <span class="step-label">Step {step} of {TOTAL_STEPS}</span>
    <div class="dots" aria-hidden="true">
      {#each Array(TOTAL_STEPS) as _, i}
        <div class="dot" class:filled={i < step}></div>
      {/each}
    </div>
  </div>

  {#if step === 1}
    <section class="content">
      <h2>Create your profile</h2>
      <p class="sub">This is used to personalize Qubix. Your email stays inside secure sign-in, not public progress tables.</p>

      <label class="fl" for="username">Username</label>
      <input
        id="username"
        bind:value={username}
        maxlength="40"
        placeholder="learner_name"
        autocomplete="nickname"
      />
      <div class="hint">{username ? cleanUsername : 'Use letters, numbers, and underscores.'}</div>

      <div class="fl">Age band</div>
      <div class="pill-row">
        {#each AGE_BANDS as opt}
          <button class="pill" class:active={ageBand === opt.id} on:click={() => ageBand = opt.id}>{opt.label}</button>
        {/each}
      </div>
    </section>
  {:else if step === 2}
    <section class="content">
      <h2>What brings you here?</h2>
      <p class="sub">We use this to shape the first topics and session length.</p>

      <div class="type-grid">
        {#each GOALS as goal}
          <button class="type-card" class:active={learningGoal === goal.id} on:click={() => learningGoal = goal.id}>
            <div class="type-name">{goal.label}</div>
          </button>
        {/each}
      </div>

      <div class="fl spaced">Daily learning goal</div>
      <div class="minute-row">
        {#each [5, 10, 15, 30] as minutes}
          <button class="minute" class:active={dailyGoalMinutes === minutes} on:click={() => dailyGoalMinutes = minutes}>
            {minutes}<span>min</span>
          </button>
        {/each}
      </div>

      <div class="fl spaced">How did you hear about us?</div>
      <div class="pill-row compact">
        {#each HEARD_OPTIONS as opt}
          <button class="pill" class:active={heardFrom === opt} on:click={() => heardFrom = opt}>{opt}</button>
        {/each}
      </div>
    </section>
  {:else if step === 3}
    <section class="content">
      <h2>Pick your topics</h2>
      <p class="sub">Choose at least one. You can still access everything later.</p>

      <div class="topic-grid">
        {#each TOPICS as topic}
          <button class="topic-card" class:active={selectedTopics.includes(topic.id)} on:click={() => toggleTopic(topic.id)}>
            <span>{topic.label}</span>
            <small>{topic.sub}</small>
          </button>
        {/each}
      </div>

      <div class="fl spaced">Learning style</div>
      <div class="type-grid">
        {#each LEARNER_TYPES as t}
          <button class="type-card" class:active={learnerType === t.id} on:click={() => learnerType = t.id}>
            <div class="type-name">{t.label}</div>
            <div class="type-sub">{t.sub}</div>
          </button>
        {/each}
      </div>
    </section>
  {:else}
    <section class="content gestures">
      <div class="onboarding-mascot"><QubixMascot intent="success" size="lg" decorative eager /></div>
      <h2>Start small, build daily</h2>
      <p class="sub">One short session is enough to keep momentum.</p>
      <div class="goal-card">
        <span>{dailyGoalMinutes}</span>
        <div>
          <strong>minutes a day</strong>
          <small>Your W Score and streak grow from real use.</small>
        </div>
      </div>
      <div class="gesture-row">
        <div class="g-circle"><span>-></span></div>
        <div><div class="g-title">Swipe across</div><div class="g-sub">move to the next board</div></div>
      </div>
      <div class="gesture-row">
        <div class="g-circle accent"><span>v</span></div>
        <div><div class="g-title">Dig deeper</div><div class="g-sub">open the next floor</div></div>
      </div>
    </section>
  {/if}

  <div class="footer">
    {#if step > 1}
      <QxButton variant="secondary" fullWidth={false} on:click={back}>Back</QxButton>
    {/if}
    <QxButton variant="primary" on:click={next} disabled={!canContinue || saving}>
      {step < TOTAL_STEPS ? 'Next' : saving ? 'Saving...' : 'Start learning'}
    </QxButton>
  </div>
</div>

<style>
  .onboarding-view {
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 18px 22px 0;
    box-sizing: border-box;
    overflow-y: auto;
  }

  .topbar { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; }
  .step-label { font-size: 13px; font-weight: 750; color: var(--qx-text-dim); }
  .dots { display: flex; gap: 6px; }
  .dot { width: 22px; height: 6px; border-radius: 3px; background: var(--qx-border-2); }
  .dot.filled { background: var(--qx-accent); }

  .content { flex: 1; }
  h2 { font-weight: 900; font-size: 24px; color: var(--qx-text); margin: 0 0 5px; letter-spacing: 0; }
  .sub { font-size: 14px; color: var(--qx-text-dim); margin: 0 0 20px; line-height: 1.45; }

  .fl { font-size: 12px; font-weight: 850; color: var(--qx-text-dim); margin: 0 0 8px; }
  .fl.spaced { margin-top: 22px; }

  input {
    width: 100%;
    box-sizing: border-box;
    min-height: 46px;
    border-radius: 8px;
    border: 1.5px solid var(--qx-border-2);
    background: var(--qx-surface);
    color: var(--qx-text);
    padding: 0 13px;
    font: 800 15px/1 var(--qx-font);
  }

  .hint {
    min-height: 18px;
    margin: 6px 0 16px;
    color: var(--qx-text-faint);
    font-size: 12px;
    font-weight: 700;
  }

  .pill-row { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 10px; }
  .pill-row.compact { margin-bottom: 0; }
  .pill {
    font-size: 13px;
    font-weight: 800;
    color: var(--qx-text-2);
    background: var(--qx-surface);
    border: 1.5px solid var(--qx-border-2);
    border-radius: 999px;
    padding: 8px 13px;
    cursor: pointer;
    font-family: var(--qx-font);
  }
  .pill.active { color: var(--qx-accent-text); background: var(--qx-accent-soft); border-color: var(--qx-accent); }

  .type-grid,
  .topic-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }

  .type-card,
  .topic-card {
    min-height: 64px;
    border: 1.5px solid var(--qx-border-2);
    background: var(--qx-surface);
    border-radius: 8px;
    padding: 11px 12px;
    text-align: left;
    cursor: pointer;
    font-family: var(--qx-font);
  }
  .type-card.active,
  .topic-card.active {
    border-color: var(--qx-accent);
    background: var(--qx-accent-soft);
  }
  .type-name,
  .topic-card span { font-size: 14px; font-weight: 900; color: var(--qx-text); display: block; }
  .type-sub,
  .topic-card small { font-size: 11px; font-weight: 650; color: var(--qx-text-dim); display: block; margin-top: 4px; line-height: 1.25; }

  .minute-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
  .minute {
    min-height: 54px;
    border-radius: 8px;
    border: 1.5px solid var(--qx-border-2);
    background: var(--qx-surface);
    color: var(--qx-text);
    font: 900 20px/1 var(--qx-font);
    cursor: pointer;
  }
  .minute span { display: block; margin-top: 4px; color: var(--qx-text-dim); font-size: 10px; font-weight: 850; }
  .minute.active { color: var(--qx-accent-text); background: var(--qx-accent-soft); border-color: var(--qx-accent); }

  .gestures { display: flex; flex-direction: column; justify-content: center; }
  .onboarding-mascot { height: 76px; display: grid; place-items: center; margin-bottom: 4px; }
  .onboarding-mascot :global(.mascot) { --mascot-size: 96px; }
  .goal-card {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px;
    border-radius: 8px;
    border: 1.5px solid var(--qx-accent);
    background: var(--qx-accent-soft);
    margin-bottom: 18px;
  }
  .goal-card span {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: var(--qx-accent);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: 900;
    flex-shrink: 0;
  }
  .goal-card strong { display: block; color: var(--qx-text); font-size: 15px; font-weight: 900; }
  .goal-card small { display: block; color: var(--qx-text-dim); font-size: 12px; line-height: 1.35; margin-top: 3px; }

  .gesture-row { display: flex; align-items: center; gap: 14px; margin-bottom: 16px; }
  .g-circle {
    width: 48px;
    height: 48px;
    min-width: 48px;
    border-radius: 50%;
    border: 2px solid var(--qx-border-2);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--qx-text);
    font-size: 16px;
    font-weight: 900;
  }
  .g-circle.accent { border-color: var(--qx-accent); color: var(--qx-accent); }
  .g-title { font-size: 16px; font-weight: 850; color: var(--qx-text); }
  .g-sub { font-size: 13px; color: var(--qx-text-dim); }

  .footer { display: flex; gap: 10px; align-items: center; padding: 16px 0 18px; }
</style>
