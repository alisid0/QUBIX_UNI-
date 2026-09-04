<script>
  import { tick } from 'svelte';
  import { answersQuiz, explains, routeFor } from '../content/assistant-match.js';
  import { supabase } from '../supabase.js';

  export let spec;

  let open = false;
  let input = '';
  let messages = [];
  let lastKey = '';
  let hintIndex = 0;
  let awaiting = '';
  let log;
  let thinking = false;
  let aiState = 'unknown';
  let aiModel = 'GPT-5 nano';

  $: if (spec?.key && spec.key !== lastKey) {
    lastKey = spec.key;
    messages = [{ from: 'assistant', text: spec.welcome }];
    hintIndex = 0;
    awaiting = '';
    input = '';
  }

  async function add(user, assistant) {
    const reply = typeof assistant === 'string' ? { text: assistant } : assistant;
    messages = [...messages, { from: 'user', text: user }, { from: 'assistant', ...reply }];
    await tick();
    if (log) log.scrollTop = log.scrollHeight;
  }

  function useAction(action) {
    awaiting = '';
    if (action === 'explain') add('Explain this simply.', spec.explain);
    if (action === 'terms') add('Show me the real terminology.', spec.terminology);
    if (action === 'hint') {
      const index = Math.min(hintIndex, spec.hints.length - 1);
      add(hintIndex ? 'One more hint.' : 'Give me a hint.', `Hint ${index + 1} of ${spec.hints.length}: ${spec.hints[index]}`);
      hintIndex = Math.min(hintIndex + 1, spec.hints.length - 1);
    }
    if (action === 'quiz') {
      add('Question me.', spec.quiz.question);
      awaiting = 'quiz';
    }
    if (action === 'reason') {
      add('Check my reasoning.', spec.reasoning.prompt);
      awaiting = 'reason';
    }
  }

  function localResponse(value, sources) {
    const rule = routeFor(value, spec.rules);
    if (rule) return rule.response;
    if (sources.length) return {
      text: `The live model is unavailable, so I searched ${spec.knowledgeCount} passages locally. These are the closest pieces of Qubix material; open one to continue in its original lesson context.`,
      sources
    };
    return spec.fallback;
  }

  async function askTutor(value, sources) {
    const context = [spec.title, spec.welcome, spec.explain, spec.terminology]
      .filter(Boolean).join('\n').slice(0, 2400);

    // The server decides whether this learner may ask the model. Sending the
    // session token is the whole of the client's part in that: there is no
    // check here to bypass, because there is no check here.
    const { data } = supabase ? await supabase.auth.getSession() : { data: null };
    const token = data?.session?.access_token;

    const response = await fetch('/api/tutor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify({ mode: 'learner', question: value, context, sources })
    });
    const payload = await response.json().catch(() => ({}));

    // Not an error to report as one. The learner asked a fair question and the
    // answer is that this part needs an account; the scripted hints, quizzes
    // and terminology in this same panel keep working either way.
    if (response.status === 401 && payload.requiresSignIn) {
      aiState = 'signin';
      return {
        text: payload.error,
        sources: sources.length ? sources : undefined,
        signIn: true
      };
    }
    if (!response.ok) throw new Error(payload.error || 'Tutor unavailable');
    aiState = payload.model === 'Qubix scope gate' ? 'guard' : 'live';
    if (payload.model && payload.model !== 'Qubix scope gate') aiModel = payload.model;
    return { text: payload.answer, sources: payload.refused ? undefined : sources };
  }

  /**
   * Open the panel with a question already written, from somewhere else on the
   * page.
   *
   * The workbook needed this. It is the only part of a session that asks a
   * learner to use their own data, and it was the only part with nobody to
   * answer: they wrote eight values into a box and the site never said whether
   * they were right. This hands that box to the tutor.
   *
   * Deliberately does not submit. The learner sees their own words in the field
   * and presses send, because a panel that opens and fires a question at a
   * model on their behalf is a surprise rather than a tool.
   */
  export async function ask(text) {
    const question = String(text || '').trim();
    if (!question) return;
    open = true;
    awaiting = '';
    input = question;
    await tick();
    if (log) log.scrollTop = log.scrollHeight;
  }

  async function submit() {
    const value = input.trim();
    if (!value || thinking) return;
    let response = spec.fallback;

    if (awaiting === 'quiz') {
      const correct = answersQuiz(value, spec.quiz.answers);
      response = correct ? spec.quiz.success : spec.quiz.retry;
      if (correct) awaiting = '';
    } else if (awaiting === 'reason') {
      const complete = explains(value, spec.reasoning.terms);
      response = complete ? spec.reasoning.success : spec.reasoning.retry;
      if (complete) awaiting = '';
    } else {
      const sources = spec.search ? spec.search(value, 3) : [];
      thinking = true;
      input = '';
      messages = [...messages, { from: 'user', text: value }];
      try {
        response = await askTutor(value, sources);
      } catch (_) {
        aiState = 'local';
        response = localResponse(value, sources);
      } finally {
        thinking = false;
      }
      messages = [...messages, { from: 'assistant', ...(typeof response === 'string' ? { text: response } : response) }];
      await tick();
      if (log) log.scrollTop = log.scrollHeight;
      return;
    }

    add(value, response);
    input = '';
  }

  function openSource(event, href) {
    event.preventDefault();
    window.location.assign(href);
  }
</script>

<div class="assistant-shell" class:open>
  {#if open}
    <section class="assistant-panel" aria-label="Ask Qubix workshop assistant">
      <header>
        <span class="bot" aria-hidden="true"><i></i><b>QX</b></span>
        <div><small>{spec.eyebrow}</small><strong>{spec.title}</strong></div>
        <button class="close" aria-label="Close Ask Qubix" on:click={() => open = false}>×</button>
      </header>

      <div class="prototype-note"><span></span>{aiState === 'live' ? `LIVE ${aiModel.toUpperCase()} · GROUNDED IN QUBIX` : aiState === 'local' ? 'LOCAL QUBIX FALLBACK · LIVE AI NOT CONNECTED' : aiState === 'guard' ? 'QUBIX SCOPE GATE · OFF-TOPIC REQUEST REFUSED' : 'GROUNDED QUBIX TUTOR · LOCAL FALLBACK READY'}</div>

      <p class="purpose-note"><b>EXPLAIN</b> with a useful analogy <i>·</i> <b>GUIDE</b> you to the Qubix reading</p>

      <div class="messages" bind:this={log} role="log" aria-live="polite" aria-label="Conversation" aria-busy={thinking}>
        {#each messages as message}
          <div class:learner={message.from === 'user'} class="message">
            <small>{message.from === 'user' ? 'YOU' : 'QUBIX'}</small>
            <p>{message.text}</p>
            {#if message.signIn}
              <a class="signin-cta" href="/signin">Create a free account</a>
            {/if}
            {#if message.sources}
              <div class="sources" aria-label="Retrieved Qubix material">
                {#each message.sources as source}
                  <article>
                    <span>{source.kind.toUpperCase()} · {source.section}</span>
                    <p>{source.excerpt}</p>
                    <a href={source.href} on:click={(event) => openSource(event, source.href)}>{source.session} <i aria-hidden="true">→</i></a>
                  </article>
                {/each}
              </div>
            {/if}
          </div>
        {/each}
        {#if thinking}
          <div class="message thinking" aria-label="Qubix is preparing an answer">
            <small>QUBIX <span>THINKING</span></small>
            <div class="thinking-card">
              <b>Checking the Qubix material</b>
              <span class="thinking-dots" aria-hidden="true"><i></i><i></i><i></i></span>
              <span class="thinking-track" aria-hidden="true"><i></i></span>
            </div>
          </div>
        {/if}
      </div>

      <div class="actions" aria-label="Tutor actions">
        <!-- Only the actions this spec can actually perform. A lesson coach
             offers hints and a quiz; a wayfinding assistant on the home page
             has neither, and a button that answers nothing is worse than an
             absent one. -->
        {#if spec.explain}<button on:click={() => useAction('explain')}>{spec.labels?.explain ?? 'Explain simply'}</button>{/if}
        {#if spec.hints?.length}<button on:click={() => useAction('hint')}>{spec.labels?.hint ?? 'Give me a hint'}</button>{/if}
        {#if spec.quiz}<button on:click={() => useAction('quiz')}>{spec.labels?.quiz ?? 'Question me'}</button>{/if}
        {#if spec.reasoning}<button on:click={() => useAction('reason')}>{spec.labels?.reason ?? 'Check my reasoning'}</button>{/if}
        {#if spec.terminology}<button on:click={() => useAction('terms')}>{spec.labels?.terms ?? 'Real terminology'}</button>{/if}
      </div>

      <form on:submit|preventDefault={submit}>
        <label for={`assistant-${spec.key}`}>Ask about this lesson</label>
        <div><input id={`assistant-${spec.key}`} bind:value={input} placeholder="Type your question or reasoning…" autocomplete="off" disabled={thinking} /><button aria-label="Send message" disabled={!input.trim() || thinking}>↑</button></div>
        <p class="ai-privacy">Open questions may be processed by the Qubix AI service. Do not include personal or confidential information.</p>
      </form>
    </section>
  {/if}

  <button class="launcher" aria-expanded={open} aria-label={open ? 'Close Ask Qubix' : 'Open Ask Qubix'} on:click={() => open = !open}>
    <span aria-hidden="true"><i></i><b>QX</b></span>
    <em>{open ? 'CLOSE' : 'ASK QUBIX'}</em>
  </button>
</div>

<style>
  .assistant-shell{position:fixed;right:26px;bottom:24px;z-index:80;font-family:var(--qx-font);color:var(--qx-text)}
  .launcher{display:flex;align-items:center;gap:9px;min-height:52px;padding:7px 15px 7px 8px;border:3px solid #20241f;border-radius:4px;background:var(--qx-overlay);color:var(--qx-text);box-shadow:5px 5px 0 #20241f;cursor:pointer}
  .launcher span,.bot{position:relative;display:grid;place-items:center;width:34px;height:34px;background:var(--qx-accent);color:#fff;border:2px solid #20241f}
  .launcher span i,.bot i{position:absolute;top:7px;width:13px;height:5px;border-left:3px solid #fff;border-right:3px solid #fff}
  .launcher b,.bot b{margin-top:11px;font:900 11px ui-monospace,monospace}
  .launcher em{font:900 12px/1 var(--qx-font);font-style:normal;letter-spacing:.08em}
  .launcher:hover{transform:translate(-1px,-1px);box-shadow:6px 6px 0 #20241f}.launcher:active{transform:translate(3px,3px);box-shadow:2px 2px 0 #20241f}
  .assistant-panel{position:absolute;right:0;bottom:68px;display:grid;grid-template-rows:auto auto auto minmax(150px,1fr) auto auto;width:min(410px,calc(100vw - 28px));height:min(650px,calc(100vh - 112px));overflow:hidden;border:3px solid #20241f;border-radius:5px;background:var(--qx-overlay);box-shadow:8px 8px 0 #20241f}
  header{display:grid;grid-template-columns:auto 1fr auto;gap:11px;align-items:center;padding:13px 14px;border-bottom:2px solid #20241f;background:var(--qx-overlay-2)}
  header small,header strong{display:block}header small{margin-bottom:3px;color:var(--qx-accent-text);font:900 11px/1 var(--qx-font);letter-spacing:.09em}header strong{font:750 16px/1.2 Georgia,serif}
  .bot{width:38px;height:38px}.close{align-self:start;width:34px;height:34px;padding:0;border:2px solid #20241f;background:var(--qx-surface);color:var(--qx-text);font:800 24px/1 var(--qx-font);cursor:pointer}
  .prototype-note{display:flex;align-items:center;gap:7px;padding:8px 14px;border-bottom:1px solid var(--qx-border-2);color:var(--qx-text-dim);font:850 11px/1 var(--qx-font);letter-spacing:.08em}.prototype-note span{width:7px;height:7px;background:var(--qx-green);border-radius:50%}
  .purpose-note{margin:0;padding:8px 14px;border-bottom:1px solid var(--qx-border-2);background:var(--qx-surface);color:var(--qx-text-dim);font:650 11px/1.35 var(--qx-font)}.purpose-note b{color:var(--qx-text);font-weight:900;letter-spacing:.05em}.purpose-note i{padding:0 3px;color:var(--qx-accent-text);font-style:normal}
  .messages{min-height:0;padding:13px 14px;overflow-y:auto;background:var(--qx-bg)}
  .message{max-width:88%;margin-bottom:12px;animation:message-arrive .24s cubic-bezier(.2,.75,.25,1) both}.message small{display:block;margin:0 0 4px;color:var(--qx-accent-text);font:900 11px/1 var(--qx-font);letter-spacing:.08em}.message small span{margin-left:5px;color:var(--qx-text-faint);font-size:11px}.message p{margin:0;padding:10px 12px;border:1px solid var(--qx-border-2);border-radius:2px 10px 10px;background:var(--qx-surface);color:var(--qx-text);font:650 13px/1.48 var(--qx-font)}
  .message.learner{margin-left:auto}.message.learner small{text-align:right;color:var(--qx-green-text)}.message.learner p{border-color:var(--qx-green);border-radius:10px 2px 10px;background:var(--qx-green-soft)}
  .thinking-card{position:relative;display:flex;align-items:center;gap:9px;min-height:43px;padding:10px 12px 13px;overflow:hidden;border:1px solid var(--qx-border-2);border-radius:2px 10px 10px;background:var(--qx-surface);color:var(--qx-text-dim)}.thinking-card b{font:700 12px/1.3 var(--qx-font)}.thinking-dots{display:flex;gap:3px}.thinking-dots i{width:4px;height:4px;border-radius:50%;background:var(--qx-accent);animation:thinking-dot 1s ease-in-out infinite}.thinking-dots i:nth-child(2){animation-delay:.14s}.thinking-dots i:nth-child(3){animation-delay:.28s}.thinking-track{position:absolute;left:12px;right:12px;bottom:7px;height:2px;overflow:hidden;background:var(--qx-border-2)}.thinking-track i{display:block;width:42%;height:100%;background:var(--qx-accent);animation:thinking-track 1.25s ease-in-out infinite}
  .signin-cta{display:inline-flex;align-items:center;min-height:34px;margin-top:8px;padding:6px 14px;border:1px solid var(--qx-accent);border-radius:999px;background:var(--qx-accent-soft);color:var(--qx-accent-text);font:900 12px var(--qx-font);text-decoration:none}
  .signin-cta:focus-visible{outline:2px solid var(--qx-accent);outline-offset:2px}
  .sources{display:grid;gap:7px;margin-top:8px}.sources article{padding:10px;border:1px solid var(--qx-border-2);border-left:4px solid var(--qx-accent);background:var(--qx-surface)}.sources span{display:block;color:var(--qx-accent-text);font:900 11px/1.25 var(--qx-font);letter-spacing:.05em}.sources p{padding:0;margin:6px 0;border:0;border-radius:0;background:transparent;color:var(--qx-text-2);font:650 12px/1.45 var(--qx-font)}.sources a{display:flex;align-items:flex-end;justify-content:space-between;gap:7px;color:var(--qx-text);font:850 11.5px/1.35 var(--qx-font);text-decoration-thickness:1px;text-underline-offset:3px}.sources i{flex:0 0 auto;font-style:normal}
  .actions{display:flex;gap:6px;padding:10px 12px;overflow-x:auto;border-top:1px solid var(--qx-border-2);background:var(--qx-surface)}
  .actions button{flex:0 0 auto;min-height:34px;padding:7px 9px;border:1px solid var(--qx-border-2);border-radius:2px;background:var(--qx-surface-2);color:var(--qx-text);font:800 11px/1.2 var(--qx-font);cursor:pointer}.actions button:hover{border-color:var(--qx-accent);color:var(--qx-accent-text)}
  form{padding:10px 12px 12px;border-top:1px solid var(--qx-border-2);background:var(--qx-surface)}form label{display:block;margin-bottom:6px;color:var(--qx-text-dim);font:800 11px/1 var(--qx-font);letter-spacing:.05em}form>div{display:grid;grid-template-columns:1fr 42px;gap:7px}input{min-width:0;height:42px;padding:0 11px;border:2px solid #20241f;border-radius:2px;background:var(--qx-bg);color:var(--qx-text);font:650 13px var(--qx-font)}form button{border:2px solid #20241f;background:var(--qx-accent);color:#fff;font:900 19px var(--qx-font);cursor:pointer}form button:disabled{opacity:.4;cursor:default}
  .ai-privacy{margin:7px 0 0;color:var(--qx-text-faint);font:650 11px/1.35 var(--qx-font)}
  button:focus-visible,input:focus-visible{outline:3px solid var(--qx-accent);outline-offset:2px}
  @keyframes message-arrive{from{opacity:0;transform:translateY(7px)}to{opacity:1;transform:translateY(0)}}
  @keyframes thinking-dot{0%,60%,100%{opacity:.28;transform:translateY(0)}30%{opacity:1;transform:translateY(-2px)}}
  @keyframes thinking-track{0%{transform:translateX(-115%)}55%,100%{transform:translateX(260%)}}
  @media(max-width:600px){.assistant-shell{right:10px;bottom:12px}.launcher{min-height:48px}.assistant-panel{position:fixed;left:0;right:0;bottom:0;width:100%;height:min(76vh,650px);border-width:3px 0 0;border-radius:0;box-shadow:0 -7px 0 #20241f}.assistant-shell.open .launcher{display:none}.messages{padding:12px}.message{max-width:93%}.actions{padding:9px 10px}form{padding:9px 10px calc(11px + env(safe-area-inset-bottom))}}
  @media(prefers-reduced-motion:reduce){.launcher{transition:none}.message,.thinking-dots i,.thinking-track i{animation:none}.thinking-dots i{opacity:.65}.thinking-track i{width:100%}}
</style>
