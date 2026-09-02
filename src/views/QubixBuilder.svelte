<script>
  import { onMount, tick } from 'svelte';

  const STORAGE_KEY = 'qx.builder.access.v1';
  const STARTERS = [
    ['Audit a topic', 'Audit the next topic against MASTERPLAN-01092026. Identify prerequisites, the learner outcome, and what still needs a founder decision.'],
    ['Frame a Read/Play pair', 'Draft the framing questions for one Read/Play pair. Do not write the final lesson and do not mark anything approved.'],
    ['Challenge the plan', 'Act as a critical curriculum reviewer. Find the biggest learner-risk or sequencing assumption in the current Qubix plan.'],
    ['Prepare an approval', 'Turn my idea into a narrow founder approval checklist with explicit scope and exclusions.']
  ];

  let accessKey = '';
  let unlocked = false;
  let input = '';
  let busy = false;
  let model = 'GPT-5.6 Terra';
  let log;
  let messages = [{
    from: 'builder',
    text: 'I help construct Qubix one controlled decision at a time. I can audit coverage, frame Read/Play pairs, challenge prerequisites, and prepare drafts. I cannot approve or release curriculum.'
  }];

  onMount(() => {
    try {
      accessKey = sessionStorage.getItem(STORAGE_KEY) || '';
      unlocked = Boolean(accessKey);
    } catch (_) {}
  });

  function enter() {
    if (!accessKey.trim()) return;
    try { sessionStorage.setItem(STORAGE_KEY, accessKey.trim()); } catch (_) {}
    unlocked = true;
  }

  function lock() {
    accessKey = '';
    unlocked = false;
    try { sessionStorage.removeItem(STORAGE_KEY); } catch (_) {}
  }

  function choose(text) {
    input = text;
    document.getElementById('builder-question')?.focus();
  }

  async function submit() {
    const question = input.trim();
    if (!question || busy) return;
    messages = [...messages, { from: 'founder', text: question }];
    input = '';
    busy = true;
    await tick();
    if (log) log.scrollTop = log.scrollHeight;

    try {
      const response = await fetch('/api/tutor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Qubix-Builder-Key': accessKey.trim()
        },
        body: JSON.stringify({
          mode: 'builder',
          question,
          context: 'MASTERPLAN-01092026 is the current clean-slate curriculum plan. It is AI_DRAFT. Qubix teaches through paired Read and Play material in a fictional Superstore data world. The founder alone controls APPROVED and RELEASED status.',
          sources: []
        })
      });
      const payload = await response.json().catch(() => ({}));
      if (response.status === 401) {
        lock();
        throw new Error('The access key was not accepted. Enter the current Builder key and try again.');
      }
      if (!response.ok) throw new Error(payload.error || 'Qubix Builder is unavailable just now.');
      if (payload.model && payload.model !== 'Qubix scope gate') model = payload.model;
      messages = [...messages, { from: 'builder', text: payload.answer }];
    } catch (error) {
      messages = [...messages, { from: 'system', text: error.message }];
    } finally {
      busy = false;
      await tick();
      if (log) log.scrollTop = log.scrollHeight;
    }
  }
</script>

<svelte:head>
  <title>Qubix Builder · Private founder workspace</title>
  <meta name="robots" content="noindex,nofollow" />
</svelte:head>

<main class="builder-page">
  <header class="masthead">
    <a class="identity" href="/"><span>QX</span><b>QUBIX UNIVERSITY</b></a>
    <div class="private"><i></i> PRIVATE FOUNDER WORKSPACE</div>
    {#if unlocked}<button class="lock" on:click={lock}>Lock workspace</button>{/if}
  </header>

  {#if !unlocked}
    <section class="gate">
      <p class="eyebrow">CONTROLLED AI · CONSTRUCTION SIDE</p>
      <h1>Build Qubix with a copilot that knows its boundaries.</h1>
      <p class="lede">This workspace helps you shape curriculum and product decisions. It never changes an approval status, publishes a lesson, or releases curriculum.</p>
      <form on:submit|preventDefault={enter}>
        <label for="builder-key">Founder access key</label>
        <div><input id="builder-key" type="password" bind:value={accessKey} autocomplete="current-password" placeholder="Enter the Builder key" /><button disabled={!accessKey.trim()}>Enter Builder <span>→</span></button></div>
      </form>
      <aside><b>Why the gate?</b> The website may be quiet today, but a private construction tool should be safe before it becomes valuable.</aside>
    </section>
  {:else}
    <section class="workspace">
      <aside class="rail">
        <p class="eyebrow">FOUNDER COPILOT</p>
        <h1>Qubix Builder</h1>
        <p>Construct the university without confusing a generated draft with a founder decision.</p>

        <div class="starters">
          <b>Start a controlled task</b>
          {#each STARTERS as starter}
            <button on:click={() => choose(starter[1])}><span>{starter[0]}</span><i>→</i></button>
          {/each}
        </div>

        <div class="boundary">
          <b>Authority boundary</b>
          <span>AI may draft and challenge</span>
          <span>Founder alone approves</span>
          <span>Deployment remains separate</span>
        </div>
      </aside>

      <section class="conversation">
        <header>
          <div><small>LIVE MODEL</small><strong>{model}</strong></div>
          <div><small>SOURCE PLAN</small><strong>MASTERPLAN-01092026</strong></div>
          <div><small>STATUS</small><strong class="draft">AI_DRAFT</strong></div>
        </header>

        <div class="messages" bind:this={log} role="log" aria-live="polite" aria-busy={busy}>
          {#each messages as message}
            <article class:founder={message.from === 'founder'} class:system={message.from === 'system'}>
              <small>{message.from === 'founder' ? 'YOU' : message.from === 'system' ? 'SYSTEM' : 'QUBIX BUILDER'}</small>
              <p>{message.text}</p>
            </article>
          {/each}
          {#if busy}<article><small>QUBIX BUILDER</small><p class="thinking">Checking the scope, prerequisites and approval boundary…</p></article>{/if}
        </div>

        <form class="composer" on:submit|preventDefault={submit}>
          <label for="builder-question">What are we constructing or deciding?</label>
          <textarea id="builder-question" bind:value={input} rows="3" placeholder="For example: frame the first probability Read/Play pair…" disabled={busy}></textarea>
          <div><span>The key stays in this tab. Prompts are processed by the Qubix AI service; do not include secrets.</span><button disabled={!input.trim() || busy}>{busy ? 'Thinking…' : 'Ask Builder'} <b>↑</b></button></div>
        </form>
      </section>
    </section>
  {/if}
</main>

<style>
  :global(body){margin:0;background:#eee7d8;color:#25231f}
  .builder-page{min-height:100%;padding:18px clamp(14px,3vw,42px) 42px;font-family:var(--qx-font,Arial,sans-serif);box-sizing:border-box}
  .masthead{display:flex;align-items:center;gap:18px;max-width:1320px;margin:0 auto 24px;padding-bottom:14px;border-bottom:2px solid #25231f}
  .identity{display:flex;align-items:center;gap:10px;color:inherit;text-decoration:none}.identity span{display:grid;place-items:center;width:38px;height:38px;background:#a64e29;color:#fff;font:900 12px ui-monospace,monospace}.identity b{font:900 13px/1 var(--qx-font,Arial);letter-spacing:.12em}
  .private{display:flex;align-items:center;gap:7px;color:#4f493e;font:850 11px/1 var(--qx-font,Arial);letter-spacing:.1em}.private i{width:8px;height:8px;border-radius:50%;background:#38682c}.lock{margin-left:auto;padding:9px 13px;border:1px solid #25231f;border-radius:999px;background:#f8f4eb;font-weight:800;cursor:pointer}
  .gate{max-width:880px;margin:8vh auto 0;padding:clamp(28px,6vw,72px);border:3px solid #25231f;border-radius:28px 5px 28px 5px;background:#f8f4eb;box-shadow:12px 12px 0 #cabda6}
  .eyebrow{margin:0 0 12px;color:#a64e29;font-size:11px;font-weight:900;letter-spacing:.13em}.gate h1,.rail h1{margin:0;font:500 clamp(38px,6vw,68px)/.98 Georgia,serif;letter-spacing:-.035em}.gate .lede{max-width:720px;margin:22px 0 32px;color:#585044;font:500 18px/1.55 Georgia,serif}
  .gate form label{display:block;margin-bottom:8px;font-size:12px;font-weight:900;letter-spacing:.07em}.gate form>div{display:grid;grid-template-columns:1fr auto;gap:9px}.gate input{min-width:0;height:50px;padding:0 14px;border:2px solid #25231f;background:#fff;font:700 15px var(--qx-font,Arial)}.gate button,.composer button{padding:0 20px;border:2px solid #25231f;border-radius:999px;background:#a64e29;color:#fff;font-weight:900;cursor:pointer}.gate button:disabled,.composer button:disabled{opacity:.45;cursor:default}.gate button span{margin-left:18px}.gate aside{margin-top:25px;padding:14px 16px;border-left:4px solid #38682c;background:#e1eadb;color:#4f493e;font-size:13px;line-height:1.45}.gate aside b{color:#25231f}
  .workspace{display:grid;grid-template-columns:minmax(240px,330px) minmax(0,1fr);gap:18px;max-width:1320px;height:calc(100vh - 112px);min-height:620px;margin:auto}.rail,.conversation{min-height:0;border:2px solid #25231f;background:#f8f4eb}.rail{padding:25px;overflow-y:auto}.rail h1{font-size:43px}.rail>p:not(.eyebrow){color:#625a4e;font-size:14px;line-height:1.55}
  .starters{display:grid;gap:8px;margin-top:28px}.starters>b,.boundary>b{margin-bottom:3px;font-size:11px;letter-spacing:.09em;text-transform:uppercase}.starters button{display:flex;justify-content:space-between;gap:12px;padding:12px;border:1px solid #c9bfad;border-radius:16px 3px 16px 3px;background:#fff;color:#25231f;text-align:left;font-weight:800;cursor:pointer}.starters button:hover{border-color:#a64e29;color:#8c3f20}.starters i{font-style:normal}.boundary{display:grid;gap:8px;margin-top:28px;padding:15px;border-left:4px solid #38682c;background:#e1eadb}.boundary span{font-size:12px;color:#4f493e}
  .conversation{display:grid;grid-template-rows:auto minmax(0,1fr) auto}.conversation>header{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;border-bottom:2px solid #25231f;background:#25231f}.conversation>header div{padding:13px 15px;background:#ede5d5}.conversation>header small,.conversation>header strong{display:block}.conversation>header small{margin-bottom:4px;color:#746b5e;font-size:11px;font-weight:900;letter-spacing:.09em}.conversation>header strong{font:700 14px Georgia,serif}.conversation>header .draft{color:#a64e29}
  .messages{min-height:0;padding:20px;overflow-y:auto;background:#f2ecdf}.messages article{max-width:78%;margin-bottom:16px}.messages article.founder{margin-left:auto}.messages small{display:block;margin-bottom:5px;color:#8c3f20;font-size:11px;font-weight:900;letter-spacing:.09em}.messages p{margin:0;padding:13px 15px;border:1px solid #cabfae;border-radius:3px 18px 18px;background:#fff;white-space:pre-wrap;font-size:14px;line-height:1.55}.messages .founder small{text-align:right;color:#35622a}.messages .founder p{border-color:#91a986;border-radius:18px 3px 18px;background:#e1eadb}.messages .system p{border-color:#b3442f;background:#fae7df;color:#7a281b}.thinking{color:#6b6256;font-style:italic}
  .composer{padding:14px 16px 16px;border-top:2px solid #25231f;background:#fff}.composer label{display:block;margin-bottom:7px;font-size:11px;font-weight:900;letter-spacing:.07em}.composer textarea{box-sizing:border-box;width:100%;resize:none;padding:11px 13px;border:2px solid #25231f;background:#fbf8f2;font:650 14px/1.45 var(--qx-font,Arial)}.composer>div{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:8px}.composer span{color:#71685b;font-size:11px}.composer button{min-height:42px}.composer button b{margin-left:12px;font-size:17px}
  button:focus-visible,input:focus-visible,textarea:focus-visible,a:focus-visible{outline:3px solid #a64e29;outline-offset:3px}
  @media(max-width:780px){.builder-page{padding:12px}.private{display:none}.workspace{grid-template-columns:1fr;height:auto}.rail{overflow:visible}.conversation{min-height:72vh}.conversation>header{grid-template-columns:1fr}.messages article{max-width:92%}.gate form>div{grid-template-columns:1fr}.gate button{min-height:48px}.composer>div{align-items:flex-end}.composer span{max-width:150px}}
</style>
