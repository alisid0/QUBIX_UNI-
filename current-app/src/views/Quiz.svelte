<script>
  import { getPathQuestions, getFillBankAnswers, DIFFICULTY_LABELS } from '../lib/content/questions.js';
  import { formatMathText } from '../lib/content/mathFormat.js';
  import { PATHS } from '../lib/content/paths.js';
  import { progress } from '../lib/stores/progress.js';
  import QxButton from '../lib/components/qubix/QxButton.svelte';

  export let pathId = '';
  export let onComplete; // () => void
  export let onBack; // () => void

  $: manifest = PATHS[pathId];
  $: if (pathId) {
    const qs = getPathQuestions(pathId, 10);
    questions = qs;
    fillChoiceCache = {};
    current = 0;
    answers = qs.reduce((o, _, i) => (o[i] = null, o), {});
    attempts = qs.reduce((o, _, i) => (o[i] = 0, o), {});
    status = qs.reduce((o, _, i) => (o[i] = 'pending', o), {});
    showFeedback = qs.reduce((o, _, i) => (o[i] = null, o), {});
    score = 0;
    finished = false;
  } else {
    questions = [];
  }

  // Same-topic pool of fill-in-the-blank answers, for tap-to-answer distractors.
  $: fillBank = pathId ? getFillBankAnswers(pathId) : [];

  let current = 0;
  let answers = {};
  let attempts = {};
  let status = {};
  let score = 0;
  let finished = false;
  let showFeedback = {};
  let questions = [];
  let fillChoiceCache = {};

  // On mobile, typing exact words is slow and error-prone. Turn a fill-in-the-blank
  // into tap-to-answer when we can source plausible distractors from sibling
  // fillblank answers in the same quiz (same topic, so they read as real options).
  const isNumericAns = (s) => /^-?\d+(\.\d+)?$/.test(String(s).trim());
  function seededShuffle(arr, seed) {
    const a = arr.slice();
    let s = ((seed + 1) * 2654435761) % 2147483647 || 1;
    const rnd = () => { s = (s * 48271) % 2147483647; return s / 2147483647; };
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function getFillChoices(idx) {
    if (idx in fillChoiceCache) return fillChoiceCache[idx];
    const q = questions[idx];
    const correct = String(q?.answer ?? '').trim();
    const accept = new Set((q?.accept || [correct]).map((a) => String(a).toLowerCase()));
    const numeric = isNumericAns(correct);
    const seen = new Set([correct.toLowerCase()]);
    const distractors = [];
    // Prefer authored distractors; top up from same-topic answers only if needed.
    for (const cand0 of Array.isArray(q?.distractors) ? q.distractors : []) {
      const cand = String(cand0).trim();
      const lc = cand.toLowerCase();
      if (!cand || accept.has(lc) || seen.has(lc)) continue;
      seen.add(lc);
      distractors.push(cand);
    }
    if (distractors.length < 3) {
      for (const cand0 of fillBank) {
        const cand = String(cand0).trim();
        const lc = cand.toLowerCase();
        if (!cand || accept.has(lc) || seen.has(lc) || isNumericAns(cand) !== numeric) continue;
        seen.add(lc);
        distractors.push(cand);
      }
    }
    let choices = null;
    if (correct && distractors.length >= 2) {
      const picked = seededShuffle(distractors, idx + correct.length).slice(0, 3);
      choices = seededShuffle([correct, ...picked], idx + 7);
    }
    fillChoiceCache[idx] = choices;
    return choices;
  }
  $: fillChoices = questions[current]?.type === 'fillblank' ? getFillChoices(current) : null;

  function handleFillChoice(questionIdx, choice) {
    const q = questions[questionIdx];
    if (status[questionIdx] !== 'pending') return;

    const accept = (q.accept || [q.answer]).map((a) => String(a).toLowerCase());
    const isCorrect = accept.includes(String(choice).trim().toLowerCase());

    attempts[questionIdx] = (attempts[questionIdx] || 0) + 1;
    answers[questionIdx] = choice;

    if (isCorrect) {
      status[questionIdx] = 'correct';
      score++;
      progress.grantCorrectAnswer();
      showFeedback[questionIdx] = { type: 'good', text: `Correct. ${q.explain || ''}` };
    } else if (attempts[questionIdx] >= 2) {
      status[questionIdx] = 'failed';
      showFeedback[questionIdx] = { type: 'bad', text: `Answer: ${q.answer}. ${q.explain || ''}` };
    } else {
      showFeedback[questionIdx] = { type: 'bad', text: 'Not quite, try once more.' };
    }
    status = { ...status };
    showFeedback = { ...showFeedback };
  }

  function handleMCQ(questionIdx, optionIdx) {
    const q = questions[questionIdx];
    if (status[questionIdx] !== 'pending') return;

    const isCorrect = optionIdx === q.answer;
    attempts[questionIdx] = (attempts[questionIdx] || 0) + 1;
    answers[questionIdx] = optionIdx;

    if (isCorrect) {
      status[questionIdx] = 'correct';
      score++;
      progress.grantCorrectAnswer();
      showFeedback[questionIdx] = { type: 'good', text: `Correct. ${q.explain || ''}` };
    } else if (attempts[questionIdx] >= 2) {
      status[questionIdx] = 'failed';
      const correctAnswer = q.opts ? q.opts[q.answer] : q.answer;
      showFeedback[questionIdx] = { type: 'bad', text: `The answer was: ${correctAnswer}. ${q.explain || ''}` };
    } else {
      showFeedback[questionIdx] = { type: 'bad', text: 'Not quite, try once more.' };
    }
    answers = Object.assign({}, answers);
    status = Object.assign({}, status);
    showFeedback = Object.assign({}, showFeedback);
  }

  function handleTrueFalse(questionIdx, value) {
    const q = questions[questionIdx];
    if (status[questionIdx] !== 'pending') return;

    const isCorrect = value === q.answer;
    attempts[questionIdx] = (attempts[questionIdx] || 0) + 1;
    answers[questionIdx] = value;

    if (isCorrect) {
      status[questionIdx] = 'correct';
      score++;
      progress.grantCorrectAnswer();
      showFeedback[questionIdx] = { type: 'good', text: `Correct. ${q.explain || ''}` };
    } else if (attempts[questionIdx] >= 2) {
      status[questionIdx] = 'failed';
      showFeedback[questionIdx] = { type: 'bad', text: `The answer was: ${q.answer}. ${q.explain || ''}` };
    } else {
      showFeedback[questionIdx] = { type: 'bad', text: 'Not quite, try once more.' };
    }
    status = { ...status };
    showFeedback = { ...showFeedback };
  }

  function handleNumeric(questionIdx) {
    const q = questions[questionIdx];
    if (status[questionIdx] !== 'pending') return;

    const input = document.getElementById(`num-input-${questionIdx}`);
    const val = parseFloat(input?.value);
    const tolerance = q.tolerance ?? 0.001;
    const isCorrect = !isNaN(val) && Math.abs(val - q.answer) <= tolerance;

    attempts[questionIdx] = (attempts[questionIdx] || 0) + 1;
    answers[questionIdx] = val;

    if (isCorrect) {
      status[questionIdx] = 'correct';
      score++;
      progress.grantCorrectAnswer();
      showFeedback[questionIdx] = { type: 'good', text: `Correct. ${q.explain || ''}` };
    } else if (attempts[questionIdx] >= 2) {
      status[questionIdx] = 'failed';
      showFeedback[questionIdx] = { type: 'bad', text: `The answer was: ${q.answer}. ${q.explain || ''}` };
    } else {
      showFeedback[questionIdx] = { type: 'bad', text: 'Not quite, try once more.' };
    }
    status = { ...status };
    showFeedback = { ...showFeedback };
  }

  function handleFillBlank(questionIdx) {
    const q = questions[questionIdx];
    if (status[questionIdx] !== 'pending') return;

    const input = document.getElementById(`fill-input-${questionIdx}`);
    const val = (input?.value || '').trim().toLowerCase();
    const accept = (q.accept || [q.answer]).map(a => String(a).toLowerCase());
    const isCorrect = accept.includes(val);

    attempts[questionIdx] = (attempts[questionIdx] || 0) + 1;
    answers[questionIdx] = val;

    if (isCorrect) {
      status[questionIdx] = 'correct';
      score++;
      progress.grantCorrectAnswer();
      showFeedback[questionIdx] = { type: 'good', text: `Correct. ${q.explain || ''}` };
    } else if (attempts[questionIdx] >= 2) {
      status[questionIdx] = 'failed';
      showFeedback[questionIdx] = { type: 'bad', text: `Answer: ${q.answer}. ${q.explain || ''}` };
    } else {
      showFeedback[questionIdx] = { type: 'bad', text: 'Not quite, try once more.' };
    }
    status = { ...status };
    showFeedback = { ...showFeedback };
  }

  function handleMatch(questionIdx, leftIdx, rightIdx) {
    // For match questions, we check if all pairs are matched correctly
    const q = questions[questionIdx];
    if (status[questionIdx] !== 'pending') return;

    // Simplified: just check one pair at a time
    const correctRightIndex = questionIdx; // simplified
    // Full match logic would be more complex
  }

  function nextQuestion() {
    if (current < questions.length - 1) {
      current++;
    } else {
      finishQuiz();
    }
  }

  function finishQuiz() {
    finished = true;
    progress.recordQuizResult(pathId, score, questions.length);
    if (onComplete) onComplete();
  }

  function restart() {
    const newQs = getPathQuestions(pathId, 10);
    questions = newQs;
    current = 0;
    answers = newQs.reduce((o, _, i) => (o[i] = null, o), {});
    attempts = newQs.reduce((o, _, i) => (o[i] = 0, o), {});
    status = newQs.reduce((o, _, i) => (o[i] = 'pending', o), {});
    showFeedback = newQs.reduce((o, _, i) => (o[i] = null, o), {});
    score = 0;
    finished = false;
  }

  function goNext() { nextQuestion(); }

  $: doneCount = Object.keys(status).filter(k => status[k] !== 'pending').length;
  $: progressPct = questions.length > 0 ? (doneCount / questions.length) * 100 : 0;
</script>

<div class="qx-shell quiz-view">
  <div class="quiz-header">
    <div class="head-top">
      <button class="back-chev" on:click={onBack} aria-label="Back">‹</button>
      <h1>{manifest?.name || 'Topic check'}</h1>
    </div>
    <p class="quiz-sub">Topic check · {questions.length} questions · randomized every time</p>
  </div>

  {#if questions.length === 0}
    <div class="empty-quiz">No check for this topic yet.</div>
  {:else if !finished}
    <div class="progress-bar-wrap">
      <div class="progress-bar-fill" style="width:{progressPct}%"></div>
    </div>

    <div class="question-card">
      <div class="q-meta">
        <span class="q-tag">Question {current + 1} of {questions.length}</span>
        {#if questions[current]?.difficulty && DIFFICULTY_LABELS[questions[current].difficulty]}
          <span class="q-band band-{questions[current].difficulty}">{DIFFICULTY_LABELS[questions[current].difficulty]}</span>
        {/if}
      </div>
      <div class="q-text">{@html formatMathText(questions[current]?.q || '')}</div>

      <!-- MCQ -->
      {#if questions[current]?.type === 'mcq'}
        <div class="options">
          {#each questions[current].opts as opt, oi}
            <button
              class="opt-btn {answers[current] === oi ? (status[current] === 'correct' ? 'correct' : status[current] === 'failed' ? 'incorrect' : 'selected') : ''}"
              disabled={status[current] !== 'pending'}
              on:click={() => handleMCQ(current, oi)}
            >{@html formatMathText(opt)}</button>
          {/each}
        </div>

      <!-- True/False -->
      {:else if questions[current]?.type === 'truefalse'}
        <div class="tf-options">
          <button
            class="opt-btn tf {answers[current] === true ? (status[current] === 'correct' ? 'correct' : 'incorrect') : ''}"
            disabled={status[current] !== 'pending'}
            on:click={() => handleTrueFalse(current, true)}
          >True</button>
          <button
            class="opt-btn tf {answers[current] === false ? (status[current] === 'correct' ? 'correct' : 'incorrect') : ''}"
            disabled={status[current] !== 'pending'}
            on:click={() => handleTrueFalse(current, false)}
          >False</button>
        </div>

      <!-- Type answer (numeric) -->
      {:else if questions[current]?.type === 'typeanswer'}
        <div class="numeric-wrap">
          <input id="num-input-{current}" type="number" step="any" inputmode="decimal" enterkeyhint="done"
            class="num-input" placeholder="Your answer"
            disabled={status[current] !== 'pending'} on:keydown={(e) => e.key === 'Enter' && handleNumeric(current)} />
          <QxButton fullWidth={false} variant="secondary" on:click={() => handleNumeric(current)} disabled={status[current] !== 'pending'}>
            Check
          </QxButton>
        </div>

      <!-- Fill in the blank: tap-to-answer when we have distractors, else type it -->
      {:else if questions[current]?.type === 'fillblank'}
        {#if fillChoices}
          <div class="options">
            {#each fillChoices as choice}
              <button
                class="opt-btn {answers[current] === choice ? (status[current] === 'correct' ? 'correct' : status[current] === 'failed' ? 'incorrect' : 'selected') : ''}"
                disabled={status[current] !== 'pending'}
                on:click={() => handleFillChoice(current, choice)}
              >{@html formatMathText(choice)}</button>
            {/each}
          </div>
        {:else}
          <div class="fill-wrap">
            <input id="fill-input-{current}" type="text" class="num-input" placeholder="Type your answer"
              autocapitalize="off" autocorrect="off" autocomplete="off" spellcheck="false" inputmode="text" enterkeyhint="done"
              disabled={status[current] !== 'pending'} on:keydown={(e) => e.key === 'Enter' && handleFillBlank(current)} />
            <QxButton fullWidth={false} variant="secondary" on:click={() => handleFillBlank(current)} disabled={status[current] !== 'pending'}>
              Check
            </QxButton>
          </div>
        {/if}

      <!-- Match the following -->
      {:else if questions[current]?.type === 'match'}
        <div class="match-wrap">
          <p class="match-hint">Match each item on the left to its pair on the right.</p>
          <div class="match-grid">
            {#each questions[current].pairs || [] as pair, pi}
              <div class="match-row">
                <span class="match-left">{@html formatMathText(pair[0])}</span>
                <span class="match-arrow">⟷</span>
                <span class="match-right">{@html formatMathText(pair[1])}</span>
              </div>
            {/each}
          </div>
          <QxButton on:click={() => { status[current] = 'correct'; score++; showFeedback[current] = { type: 'good', text: questions[current]?.explain || '' }; status = { ...status }; showFeedback = { ...showFeedback }; }}>
            All matched, check
          </QxButton>
        </div>
      {/if}

      <!-- Feedback -->
      {#if showFeedback[current]}
        <div class="feedback {showFeedback[current].type}">{@html formatMathText(showFeedback[current].text)}</div>
      {/if}

      <!-- Next / See score -->
      <div class="q-nav">
        {#if status[current] === 'correct' || status[current] === 'failed'}
          <QxButton fullWidth={false} on:click={goNext}>
            {current < questions.length - 1 ? 'Next' : 'See score'}
          </QxButton>
        {/if}
      </div>
    </div>

  {:else}
    <!-- Results -->
    <div class="result-card">
      <h2>Done</h2>
      <div class="big-score">{score} / {questions.length}</div>
      <p class="result-msg">
        {#if score === questions.length}
          Perfect score. Every answer correct.
        {:else if score >= questions.length * 0.7}
          Solid work. A quick review of the ones you missed will lock it in.
        {:else}
          Worth revisiting the topic boards before trying again.
        {/if}
      </p>
      <div class="result-actions">
        <QxButton on:click={restart}>Try again (new values)</QxButton>
        <QxButton variant="ghost" on:click={onBack}>Back to topic</QxButton>
      </div>
    </div>
  {/if}
</div>

<style>
  .quiz-view { height: 100%; overflow-y: auto; padding: 16px 18px 100px; box-sizing: border-box; }
  /* Desktop: keep the check in a readable centred column instead of stretching
     full width. */
  @media (min-width: 900px) {
    .quiz-view { max-width: 680px; margin: 0 auto; padding: 32px 24px 120px; }
  }

  .quiz-header { margin-bottom: 18px; }
  .head-top { display: flex; align-items: center; gap: 10px; }
  .back-chev {
    width: 34px; height: 34px; border-radius: 50%; border: 1.5px solid var(--qx-border-2); background: var(--qx-surface);
    color: var(--qx-text-dim); font-size: 19px; cursor: pointer; display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .quiz-header h1 { font-family: var(--qx-font); font-weight: 800; font-size: 21px; color: var(--qx-text); margin: 0; letter-spacing: -0.01em; }
  .quiz-sub { font-size: 13px; color: var(--qx-text-dim); font-weight: 600; margin: 8px 0 0 44px; }

  .empty-quiz { text-align: center; color: var(--qx-text-faint); padding: 40px 0; font-size: 14px; }

  .progress-bar-wrap {
    height: 6px; background: var(--qx-border-2); border-radius: 999px; margin-bottom: 18px; overflow: hidden;
  }
  .progress-bar-fill { height: 100%; background: var(--qx-accent); border-radius: 999px; transition: width 0.3s; }

  .question-card {
    background: var(--qx-surface); border: 1.5px solid var(--qx-border); border-radius: var(--qx-radius-lg);
    padding: 22px 20px;
  }
  .q-meta { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 12px; }
  .q-tag { font-size: 12px; font-weight: 700; color: var(--qx-text-faint); }
  .q-band {
    font-size: 11px; font-weight: 800; letter-spacing: 0.04em; text-transform: uppercase;
    padding: 3px 9px; border-radius: var(--qx-radius-pill); white-space: nowrap;
    color: var(--qx-text-dim); background: var(--qx-surface-2);
  }
  .q-band.band-super-easy { color: var(--qx-green-text); background: var(--qx-green-soft); }
  .q-band.band-easy { color: var(--qx-green-text); background: var(--qx-green-soft); }
  .q-band.band-medium { color: var(--qx-yellow-text); background: var(--qx-yellow-soft); }
  .q-band.band-hard { color: var(--qx-pink-text); background: var(--qx-pink-soft); }
  .q-text { font-family: var(--qx-font); font-weight: 700; font-size: 18px; color: var(--qx-text); margin-bottom: 18px; line-height: 1.45; }

  /* Math typography injected by formatMathText (subscripts, superscripts, vectors) */
  .question-card :global(sub) { font-size: 0.7em; vertical-align: -0.25em; line-height: 0; }
  .question-card :global(sup) { font-size: 0.7em; vertical-align: 0.5em; line-height: 0; }
  .question-card :global(.vec) { font-weight: 700; font-style: italic; }

  .options { display: flex; flex-direction: column; gap: 8px; }
  .opt-btn {
    display: block; width: 100%; text-align: left;
    background: var(--qx-surface-2);
    border: 1.5px solid var(--qx-border-2); border-radius: var(--qx-radius-md);
    padding: 13px 16px; color: var(--qx-text);
    font-family: var(--qx-font); font-size: 15px; font-weight: 600; cursor: pointer; transition: 0.15s;
  }
  .opt-btn:hover:not(:disabled) { border-color: var(--qx-accent); }
  .opt-btn.selected { border-color: var(--qx-accent); background: var(--qx-accent-soft); }
  .opt-btn.correct { border-color: var(--qx-green); background: var(--qx-green-soft); color: var(--qx-green-text); }
  .opt-btn.incorrect { border-color: var(--qx-danger); background: var(--qx-danger-soft); color: var(--qx-danger-text); }
  .opt-btn:disabled { cursor: default; }

  .tf-options { display: flex; gap: 12px; }
  .tf-options .opt-btn { flex: 1; text-align: center; font-weight: 700; }

  .numeric-wrap, .fill-wrap { display: flex; gap: 10px; align-items: center; }
  .num-input {
    flex: 1; padding: 12px 14px; border-radius: var(--qx-radius-md);
    border: 1.5px solid var(--qx-border-2);
    background: var(--qx-surface-2); color: var(--qx-text);
    font-family: var(--qx-font); font-size: 15px; outline: none;
  }
  .num-input:focus { border-color: var(--qx-accent); }
  .num-input:disabled { opacity: 0.7; }

  .match-hint { font-size: 13px; color: var(--qx-text-dim); margin-bottom: 14px; }
  .match-grid { display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px; }
  .match-row {
    display: flex; align-items: center; gap: 10px;
    background: var(--qx-surface-2); padding: 11px 14px; border-radius: var(--qx-radius-md);
    border: 1.5px solid var(--qx-border-2);
  }
  .match-left { flex: 1; font-size: 15px; color: var(--qx-text); font-weight: 600; }
  .match-arrow { color: var(--qx-text-faint); font-size: 14px; }
  .match-right { flex: 1; font-size: 15px; color: var(--qx-text-dim); text-align: right; }

  .feedback {
    font-size: 13.5px; line-height: 1.5;
    margin-top: 14px; padding-top: 12px;
    border-top: 1px solid var(--qx-border);
  }
  .feedback.good { color: var(--qx-green-text); }
  .feedback.bad { color: var(--qx-danger-text); }

  .q-nav { display: flex; justify-content: flex-end; margin-top: 16px; }

  .result-card {
    background: var(--qx-surface); border: 1.5px solid var(--qx-border); border-left: 4px solid var(--qx-accent);
    border-radius: var(--qx-radius-lg); padding: 30px 26px; text-align: center;
  }
  .result-card h2 { font-family: var(--qx-font); font-weight: 800; font-size: 22px; color: var(--qx-text); margin: 0 0 8px; }
  .big-score {
    font-family: var(--qx-font); font-weight: 800; font-size: 46px; color: var(--qx-accent);
    margin: 12px 0;
  }
  .result-msg { font-size: 14px; color: var(--qx-text-dim); margin-bottom: 20px; line-height: 1.5; }
  .result-actions { display: flex; flex-direction: column; gap: 10px; }
</style>
