<script>
  import SolveFirstPause from './SolveFirstPause.svelte';

  export let config;
  export let onDone = () => {};
  export let onExit = () => {};

  const CAPACITY = 32;      // addresses 0x00 .. 0x1F
  const PAGE_SIZE = 4;      // fixed page / frame size for the paging stage

  const HUE = {
    rust: '#b5502a',
    green: '#3f8f5a',
    amber: '#c0872e',
    slate: '#4a6d8c',
    mauve: '#7d5a86',
    teal: '#2f827a'
  };

  const STAGES = ['allocate', 'free', 'fragment', 'policy', 'compact', 'page', 'reveal'];
  const STAGE_LABELS = {
    allocate: 'malloc',
    free: 'free',
    fragment: 'Frag',
    policy: 'Fit',
    compact: 'Move',
    page: 'Page',
    reveal: 'Map'
  };

  // Fixed evidence used verbatim in the synthesis.
  const FRAG_EVIDENCE = { free: 12, largest: 4, request: 6 };

  let phase = 'intro';
  let blocks = [];   // { id, label, size, addr, color, exited?, paged?, pageOf?, page?, used? }
  let queue = [];    // pending requests { id, label, size, color, paged?, pageOf?, page?, used? }
  let message = '';
  let messageTone = 'neutral';

  let allocateDone = false;
  let freedCount = 0;
  let freeDone = false;
  let fragFailed = false;
  let policyFail = false;
  let policyDone = false;
  let compactCopies = 0;
  let compactDone = false;
  let pageDone = false;
  let revealBeat = 0;
  let usedHint = false;
  let showHint = false;
  let recorded = false;

  $: regions = regionsOf(blocks);
  $: holes = regions.filter((r) => r.type === 'free');
  $: freeTotal = holes.reduce((sum, h) => sum + h.size, 0);
  $: usedTotal = CAPACITY - freeTotal;
  $: largestHole = holes.reduce((max, h) => Math.max(max, h.size), 0);
  $: request = queue[0] || null;
  $: need = request ? (request.paged ? PAGE_SIZE : request.size) : 0;
  $: pageTable = blocks
    .filter((b) => b.pageOf)
    .sort((a, b) => a.page - b.page)
    .map((b) => ({ label: b.label, page: b.page, frame: b.addr / PAGE_SIZE, addr: b.addr, used: b.used, size: b.size }));
  $: internalFrag = blocks.filter((b) => b.pageOf).reduce((sum, b) => sum + (b.size - (b.used ?? b.size)), 0);
  $: stageIndex = Math.max(0, STAGES.indexOf(phase));
  $: reward = Math.min(15, 10 + (usedHint ? 0 : 2) + (policyFail ? 1 : 3));

  function addr(n) {
    return `0x${n.toString(16).toUpperCase().padStart(2, '0')}`;
  }

  function regionsOf(list) {
    const sorted = [...list].sort((a, b) => a.addr - b.addr);
    const out = [];
    let cursor = 0;
    for (const blk of sorted) {
      if (blk.addr > cursor) out.push({ type: 'free', addr: cursor, size: blk.addr - cursor });
      out.push({ type: 'block', addr: blk.addr, size: blk.size, block: blk });
      cursor = blk.addr + blk.size;
    }
    if (cursor < CAPACITY) out.push({ type: 'free', addr: cursor, size: CAPACITY - cursor });
    return out;
  }

  function setFeedback(text, tone = 'neutral') {
    message = text;
    messageTone = tone;
  }

  function begin() {
    enterAllocate();
  }

  function enterAllocate() {
    phase = 'allocate';
    blocks = [];
    queue = [
      { id: 'NAV', label: 'NAV', size: 6, color: HUE.rust },
      { id: 'MAP', label: 'MAP', size: 4, color: HUE.green },
      { id: 'AUDIO', label: 'AUDIO', size: 5, color: HUE.amber }
    ];
    allocateDone = false;
    setFeedback('malloc(6) for NAV is waiting. Tap a free region large enough and it takes the low address.');
  }

  function enterFree() {
    phase = 'free';
    blocks = [
      { id: 'NAV', label: 'NAV', size: 6, addr: 0, color: HUE.rust },
      { id: 'MAP', label: 'MAP', size: 4, addr: 6, color: HUE.green, exited: true },
      { id: 'AUDIO', label: 'AUDIO', size: 5, addr: 10, color: HUE.amber },
      { id: 'NET', label: 'NET', size: 4, addr: 15, color: HUE.slate, exited: true },
      { id: 'SCAN', label: 'SCAN', size: 6, addr: 19, color: HUE.mauve },
      { id: 'LOG', label: 'LOG', size: 4, addr: 25, color: HUE.teal }
    ];
    queue = [];
    freedCount = 0;
    freeDone = false;
    setFeedback('MAP and NET have exited (pulsing). Free both, then a new request will reuse the space.');
  }

  function enterFragment() {
    phase = 'fragment';
    blocks = [
      { id: 'NAV', label: 'NAV', size: 4, addr: 0, color: HUE.rust },
      { id: 'MAP', label: 'MAP', size: 4, addr: 8, color: HUE.green },
      { id: 'AUDIO', label: 'AUDIO', size: 4, addr: 15, color: HUE.amber },
      { id: 'NET', label: 'NET', size: 4, addr: 22, color: HUE.slate },
      { id: 'SCAN', label: 'SCAN', size: 4, addr: 28, color: HUE.mauve }
    ];
    queue = [{ id: 'RENDER', label: 'RENDER', size: 6, color: HUE.teal }];
    fragFailed = false;
    setFeedback('malloc(6) for RENDER. The free counter says 12 bytes are open. Try to place it.');
  }

  function enterPolicy() {
    phase = 'policy';
    blocks = [
      { id: 'SYS', label: 'SYS', size: 6, addr: 0, color: HUE.slate, fixed: true },
      { id: 'DB', label: 'DB', size: 4, addr: 10, color: HUE.mauve, fixed: true },
      { id: 'GPU', label: 'GPU', size: 12, addr: 20, color: HUE.amber, fixed: true }
    ];
    // Two holes remain: 4 bytes at 0x06 and 6 bytes at 0x0E.
    queue = [
      { id: 'R1', label: 'JOB', size: 4, color: HUE.rust },
      { id: 'R2', label: 'APP', size: 6, color: HUE.green }
    ];
    policyFail = false;
    policyDone = false;
    setFeedback('Two requests, two holes (4 bytes and 6 bytes). Place malloc(4) first. Your hole choice decides if malloc(6) still fits.');
  }

  function enterCompact() {
    phase = 'compact';
    blocks = [
      { id: 'NAV', label: 'NAV', size: 4, addr: 0, color: HUE.rust },
      { id: 'MAP', label: 'MAP', size: 4, addr: 7, color: HUE.green },
      { id: 'AUDIO', label: 'AUDIO', size: 4, addr: 14, color: HUE.amber },
      { id: 'NET', label: 'NET', size: 4, addr: 21, color: HUE.slate },
      { id: 'SCAN', label: 'SCAN', size: 4, addr: 28, color: HUE.mauve }
    ];
    queue = [{ id: 'MODEL', label: 'MODEL', size: 8, color: HUE.teal }];
    compactCopies = 0;
    compactDone = false;
    showHint = false;
    setFeedback('malloc(8) for MODEL cannot fit: 12 bytes free, largest hole 4. Tap a block to slide it toward 0x00 and merge the gaps.');
  }

  function enterPage() {
    phase = 'page';
    blocks = [
      { id: 'NAV', label: 'NAV', size: 4, addr: 0, color: HUE.rust, fixed: true },
      { id: 'MAP', label: 'MAP', size: 4, addr: 8, color: HUE.green, fixed: true },
      { id: 'AUDIO', label: 'AUDIO', size: 4, addr: 16, color: HUE.amber, fixed: true },
      { id: 'NET', label: 'NET', size: 4, addr: 24, color: HUE.slate, fixed: true }
    ];
    // Free frames: 0x04, 0x0C, 0x14, 0x1C (scattered, non-adjacent).
    queue = [{ id: 'STREAM', label: 'STREAM', size: 6, color: HUE.teal, paged: true }];
    pageDone = false;
    setFeedback('STREAM needs 6 bytes, but no free frames are next to each other. Split it into fixed pages first.');
  }

  function place(region) {
    if (!request) {
      setFeedback('No request is waiting.', 'neutral');
      return;
    }
    if (region.type !== 'free') return;
    if (region.size < need) {
      if (phase === 'fragment') fragFailed = true;
      if (phase === 'policy') policyFail = true;
      setFeedback(
        `malloc failed: ${request.label} needs ${need} contiguous byte${need === 1 ? '' : 's'}, this hole holds ${region.size}.`,
        'bad'
      );
      return;
    }
    const blk = {
      id: request.id,
      label: request.label,
      size: need,
      addr: region.addr,
      color: request.color,
      paged: request.paged
    };
    if (request.pageOf !== undefined) {
      blk.pageOf = request.pageOf;
      blk.page = request.page;
      blk.used = request.used;
    }
    blocks = [...blocks, blk];
    queue = queue.slice(1);
    const at = addr(region.addr);
    if (blk.pageOf !== undefined) {
      setFeedback(`${blk.label} page ${blk.page} placed in frame ${region.addr / PAGE_SIZE} at ${at}.`, 'good');
    } else {
      setFeedback(`${blk.label} allocated at ${at}. The pointer ${blk.label} now holds ${at}.`, 'good');
    }
    afterPlace(blk);
  }

  function afterPlace(blk) {
    if (phase === 'allocate' && queue.length === 0) allocateDone = true;
    else if (phase === 'free' && blk.id === 'CACHE') freeDone = true;
    else if (phase === 'policy' && blocks.some((b) => b.id === 'R1') && blocks.some((b) => b.id === 'R2')) policyDone = true;
    else if (phase === 'compact' && blk.id === 'MODEL') compactDone = true;
    else if (phase === 'page' && blk.pageOf === 'STREAM' && blocks.filter((b) => b.pageOf === 'STREAM').length === 2) pageDone = true;
  }

  function onBlock(blk) {
    if (phase === 'free') {
      if (!blk.exited) {
        setFeedback(`${blk.label} is still in use. Only an exited program can be freed.`, 'bad');
        return;
      }
      blocks = blocks.filter((b) => b.id !== blk.id);
      setFeedback(`free(${blk.label}) returned ${blk.size} bytes at ${addr(blk.addr)} to the pool.`, 'good');
      freedCount += 1;
      if (freedCount >= 2 && !blocks.some((b) => b.id === 'CACHE') && queue.length === 0) {
        queue = [{ id: 'CACHE', label: 'CACHE', size: 4, color: HUE.teal }];
        setFeedback('Both blocks freed. Now malloc(4) for CACHE and reuse a freed hole.', 'good');
      }
      return;
    }
    if (phase === 'compact') {
      slide(blk);
      return;
    }
    if ((phase === 'allocate' || phase === 'policy') && !blk.fixed) {
      // Undo: return this block to the front of the request queue.
      blocks = blocks.filter((b) => b.id !== blk.id);
      queue = [{ id: blk.id, label: blk.label, size: blk.size, color: blk.color }, ...queue];
      if (phase === 'policy') policyDone = false;
      setFeedback(`free(${blk.label}). It is back in the request queue, so you can place it elsewhere.`, 'neutral');
      return;
    }
    if (phase === 'page' && blk.pageOf) {
      blocks = blocks.filter((b) => b.id !== blk.id);
      queue = [{ id: blk.id, label: blk.label, size: blk.size, color: blk.color, paged: true, pageOf: blk.pageOf, page: blk.page, used: blk.used }, ...queue];
      pageDone = false;
      setFeedback(`${blk.label} page ${blk.page} lifted. Drop it in a different free frame.`, 'neutral');
      return;
    }
    setFeedback(`${blk.label} is a running allocation. Route the request around it.`, 'bad');
  }

  function slide(blk) {
    const sorted = [...blocks].sort((a, b) => a.addr - b.addr);
    const idx = sorted.findIndex((b) => b.id === blk.id);
    const target = idx === 0 ? 0 : sorted[idx - 1].addr + sorted[idx - 1].size;
    if (target === blk.addr) {
      setFeedback(`${blk.label} is already packed against the block below it.`, 'neutral');
      return;
    }
    const from = blk.addr;
    blocks = blocks.map((b) => (b.id === blk.id ? { ...b, addr: target } : b));
    compactCopies += 1;
    setFeedback(`${blk.label} copied ${addr(from)} to ${addr(target)}, pointer updated. ${compactCopies} block copies so far.`, 'neutral');
  }

  function splitPages() {
    const req = queue[0];
    if (!req || !req.paged || req.pageOf !== undefined) return;
    const pages = Math.ceil(req.size / PAGE_SIZE);
    const pieces = Array.from({ length: pages }, (_, page) => ({
      id: `${req.id}-P${page}`,
      label: req.label,
      pageOf: req.id,
      page,
      size: PAGE_SIZE,
      used: Math.min(PAGE_SIZE, req.size - page * PAGE_SIZE),
      color: req.color,
      paged: true
    }));
    queue = [...pieces, ...queue.slice(1)];
    setFeedback(`${req.label} split into ${pages} pages of ${PAGE_SIZE} bytes. Each page can go in any free frame.`, 'good');
  }

  function useHint() {
    usedHint = true;
    showHint = true;
  }

  function beginReveal() {
    phase = 'reveal';
    revealBeat = 0;
  }

  function nextReveal() {
    if (revealBeat < 4) {
      revealBeat += 1;
      return;
    }
    if (!recorded) {
      recorded = true;
      onDone({
        id: config.id,
        reward,
        evidenceCount: 4,
        patternFound: true,
        compared: true,
        transferred: true,
        transferFirstTry: policyFail === false,
        usedHint
      });
    }
    revealBeat = 5;
  }

  function segStyle(size, extra = '') {
    return `flex-grow:${size};${extra}`;
  }
</script>

<div class="alloc-game" class:technical={phase === 'reveal'}>
  {#if phase === 'intro'}
    <button class="exit" type="button" on:click={onExit} aria-label="Return to all workshops">←</button>
    <section class="intro">
      <span class="eyebrow">{config.eyebrow}</span>
      <div class="strip mini" aria-hidden="true">
        <span class="seg block" style="flex-grow:3;background:{HUE.rust}"></span>
        <span class="seg hole" style="flex-grow:2"></span>
        <span class="seg block" style="flex-grow:2;background:{HUE.green}"></span>
        <span class="seg hole" style="flex-grow:1"></span>
        <span class="seg block" style="flex-grow:3;background:{HUE.slate}"></span>
        <span class="seg hole" style="flex-grow:1"></span>
      </div>
      <h2>You are the memory allocator.</h2>
      <p>Programs ask for memory with <code>malloc(n)</code>. You choose where each block lives on one strip of addresses, free blocks when programs exit, and keep the strip usable.</p>
      <strong>No timer. A failed allocation is evidence about how memory really behaves, not a mistake.</strong>
      <button class="primary" type="button" on:click={begin}>Start allocating</button>
    </section>

  {:else if phase === 'reveal'}
    <section class="reveal">
      <span class="eyebrow">Synthesis · {Math.min(revealBeat + 1, 5)}/5</span>

      {#if revealBeat === 0}
        <h2>You just ran a memory allocator.</h2>
        <p>Every choice you made has a standard name. Here is the whole system, one decision at a time.</p>
      {:else if revealBeat === 1}
        <h2>External fragmentation blocked a request.</h2>
        <div class="metric-replay">
          <span><b>{FRAG_EVIDENCE.free}</b>bytes free in total</span>
          <span><b>{FRAG_EVIDENCE.largest}</b>largest single hole</span>
          <span><b>{FRAG_EVIDENCE.request}</b>bytes requested together</span>
        </div>
        <p><code>malloc</code> needs <strong>contiguous</strong> bytes. Scattered holes can hold plenty of free memory and still reject a block. That gap between total-free and largest-hole is external fragmentation.</p>
      {:else if revealBeat === 2}
        <h2>The allocation policy changed the result.</h2>
        <div class="comparison">
          <article><b>First-fit</b><span>Use the first hole big enough. Fast, but it splits large holes early and can block the next big request.</span></article>
          <article><b>Best-fit</b><span>Use the tightest hole that fits. Preserves large holes for large requests, at the cost of small leftover slivers.</span></article>
        </div>
        <p>Same two requests, same two holes. Filling the tight hole first let both fit; taking the big hole first did not.</p>
      {:else if revealBeat === 3}
        <h2>Compaction bought contiguous space with copies.</h2>
        <div class="copy-counter">
          <b>{compactCopies}</b>
          <span>live block cop{compactCopies === 1 ? 'y' : 'ies'} during your recovery</span>
        </div>
        <p>Sliding live blocks together merges the holes into one, but every move copies bytes and rewrites a pointer, so the program must pause while it happens.</p>
      {:else}
        <h2>Paging removed the need for contiguous space.</h2>
        <div class="page-table">
          <div class="pt-head"><b>Virtual page</b><b>Physical frame</b></div>
          {#each pageTable as row}
            <div class="pt-row"><span>{row.label} P{row.page}</span><span>frame {row.frame} · {addr(row.addr)}</span></div>
          {/each}
        </div>
        <p>Fixed <strong>pages</strong> dropped into any free <strong>frames</strong>, and the <strong>page table</strong> remembered the mapping, so external fragmentation is gone. The cost is <strong>internal fragmentation</strong>: the last page wasted <b>{internalFrag}</b> bytes.</p>
        <div class="comparison">
          <article><b>Contiguous</b><span>Simple, one block, needs adjacent space, suffers external fragmentation, may need compaction.</span></article>
          <article><b>Paging</b><span>Any free frames, needs a page table, no external fragmentation, some internal fragmentation.</span></article>
        </div>
      {/if}

      {#if revealBeat < 4}
        <button class="primary" type="button" on:click={nextReveal}>
          {revealBeat === 0 ? 'Replay the blocked request' : revealBeat === 1 ? 'Compare the policies' : revealBeat === 2 ? 'Count the compaction cost' : 'See the paging trade'}
        </button>
      {:else if revealBeat === 4}
        <div class="reward-panel">
          <div><span>Discovery distinction</span><strong>{config.rewardLabel}</strong></div>
          <b>+{reward} W</b>
        </div>
        <button class="primary" type="button" on:click={nextReveal}>Complete discovery</button>
      {:else}
        <div class="complete-panel"><b>Memory allocation mapped.</b><span>malloc, free, fragmentation, policy, compaction, and paging, all from one strip of addresses.</span></div>
        <button class="primary" type="button" on:click={onExit}>Return to workshops</button>
      {/if}
    </section>

  {:else}
    <button class="exit" type="button" on:click={onExit} aria-label="Return to all workshops">←</button>
    <header>
      <span class="eyebrow">{config.eyebrow} · Allocator console</span>
      <h2>The Allocator</h2>
    </header>

    <div class="rail" aria-label="Discovery progress">
      {#each STAGES as stage}
        <span class:current={stage === phase} class:done={stageIndex > STAGES.indexOf(stage)}>{STAGE_LABELS[stage]}</span>
      {/each}
    </div>

    <section class="mission">
      {#if phase === 'allocate'}
        <span>malloc · allocate</span><h3>Give each request contiguous bytes.</h3>
        <p>Tap a free region at least as wide as the request. The block takes the low address and returns it as a pointer.</p>
      {:else if phase === 'free'}
        <span>free · reuse</span><h3>Return exited blocks to the pool.</h3>
        <p>Free the pulsing blocks, then allocate the new request into space a freed block left behind.</p>
      {:else if phase === 'fragment'}
        <span>external fragmentation</span><h3>Allocate the six-byte request.</h3>
        <p>The free counter looks large. Test whether any single hole can actually hold it.</p>
      {:else if phase === 'policy'}
        <span>first-fit vs best-fit</span><h3>Choose the hole that keeps both fitting.</h3>
        <p>Place malloc(4), then malloc(6). Tap a block to free it and try again if the second one will not fit.</p>
      {:else if phase === 'compact'}
        <span>compaction</span><h3>Merge the scattered holes.</h3>
        <p>Tap live blocks to slide them toward 0x00. Each move copies bytes and updates a pointer.</p>
      {:else}
        <span>paging · frames</span><h3>Split the request across free frames.</h3>
        <p>Break the request into fixed pages, then drop each page into any free frame. Watch the page table fill.</p>
      {/if}
    </section>

    <div class="dashboard">
      <span><small>Used</small><b>{usedTotal}/{CAPACITY}</b></span>
      <span><small>Free</small><b>{freeTotal}</b></span>
      <span><small>Largest hole</small><b>{largestHole}</b></span>
      <span><small>Copies</small><b>{compactCopies}</b></span>
    </div>

    {#if request}
      <div class="request" style={`--req:${request.color}`}>
        <span class="tag">Request</span>
        <b>{request.pageOf !== undefined ? `${request.label} · page ${request.page}` : `${request.label} · malloc(${request.size})`}</b>
        <small>needs {need} {request.pageOf !== undefined ? 'byte frame' : 'contiguous bytes'}{request.pageOf !== undefined && request.used < PAGE_SIZE ? ` (${request.used} used)` : ''}</small>
      </div>
    {/if}

    <div class="strip-wrap">
      <div class="strip" class:paged={phase === 'page'} aria-label="Memory address strip">
        {#each regions as r}
          {#if r.type === 'block'}
            <button
              type="button"
              class="seg block"
              class:fixed={r.block.fixed}
              class:exited={r.block.exited}
              class:pagepiece={r.block.pageOf}
              style={segStyle(r.size, `background:${r.block.color}`)}
              aria-label={`${r.block.label} block, ${r.block.size} bytes at ${addr(r.addr)}`}
              on:click={() => onBlock(r.block)}
            >
              {#if r.block.used !== undefined && r.block.used < r.block.size}
                <span class="waste" style={`width:${((r.block.size - r.block.used) / r.block.size) * 100}%`}></span>
              {/if}
              <b>{r.block.pageOf ? `P${r.block.page}` : r.block.label}</b>
              <small>{addr(r.addr)}</small>
              {#if r.block.exited}<em>exited</em>{/if}
            </button>
          {:else}
            <button
              type="button"
              class="seg hole"
              class:fits={request && r.size >= need}
              style={segStyle(r.size)}
              aria-label={`Free hole, ${r.size} bytes at ${addr(r.addr)}`}
              on:click={() => place(r)}
            >
              <b>{r.size}B</b>
              <small>{addr(r.addr)}</small>
            </button>
          {/if}
        {/each}
      </div>
      <div class="ruler" aria-hidden="true">
        <span>0x00</span><span>0x08</span><span>0x10</span><span>0x18</span><span class="end">0x1F</span>
      </div>
    </div>

    {#if pageTable.length && phase === 'page'}
      <aside class="clipboard">
        <div><span>Page table</span><b>page → frame</b></div>
        {#each pageTable as row}<small>{row.label} P{row.page} → frame {row.frame}</small>{/each}
      </aside>
    {/if}

    {#if phase === 'page' && request && request.paged && request.pageOf === undefined}
      <button class="wall-tool slicer" type="button" on:click={splitPages}>
        <b>SPLIT INTO PAGES</b><span>Divide {request.label} into {Math.ceil(request.size / PAGE_SIZE)} fixed {PAGE_SIZE}-byte pages</span>
      </button>
    {/if}

    <div class="load-status">
      <span>Allocator</span>
      {#if request}
        <b>Serving {request.label}</b><small>{phase === 'free' ? 'reuse a freed hole' : phase === 'page' ? 'drop the page in a free frame' : 'tap a hole that fits'}</small>
      {:else}
        <b>Idle</b><small>{phase === 'free' ? 'free the pulsing blocks' : phase === 'compact' ? 'slide blocks to merge holes' : 'queue clear'}</small>
      {/if}
    </div>

    <div class="feedback" class:good={messageTone === 'good'} class:bad={messageTone === 'bad'} aria-live="polite">{message}</div>

    {#if phase === 'allocate' && allocateDone}
      <SolveFirstPause title="Three blocks, three start addresses." message="Each malloc reserved contiguous bytes and returned the low address as a pointer. Now some programs will exit." actionLabel="Free some memory" onContinue={enterFree} />
    {:else if phase === 'free' && freeDone}
      <SolveFirstPause title="Freed space went straight back to the pool." message="The new request reused the hole an exited block left behind. Blocks still in use were never touched." actionLabel="Raise the pressure" onContinue={enterFragment} />
    {:else if phase === 'fragment' && fragFailed}
      <SolveFirstPause title="Twelve bytes free, but no hole holds six." message="This is external fragmentation: the free memory is real but scattered across holes too small to use. Keep this failed request as evidence." actionLabel="Choose the hole smarter" onContinue={enterPolicy} />
    {:else if phase === 'policy' && policyDone}
      <SolveFirstPause title="The hole you picked decided the outcome." message="Filling the tight hole first (best-fit) kept the large hole whole for the six-byte request. Taking the first hole that fit (first-fit) would have split it and blocked the second request." actionLabel="Recover fragmented space" onContinue={enterCompact} />
    {:else if phase === 'compact' && compactDone}
      <SolveFirstPause title={`One large hole recovered after ${compactCopies} block copies.`} message="No capacity was added. You paid for contiguous space by copying live blocks and rewriting their pointers while the program paused." actionLabel="Try a different design" onContinue={enterPage} />
    {:else if phase === 'page' && pageDone}
      <SolveFirstPause title="The request ran without one contiguous block." message="Paging placed fixed pages in scattered free frames and recorded them in the page table. The half-empty last page is the new cost." actionLabel="Map the whole system" onContinue={beginReveal} />
    {:else if phase === 'compact' && !showHint}
      <button class="hint-button" type="button" on:click={useHint}>Need a nudge?</button>
    {:else if phase === 'compact' && showHint}
      <p class="hint">Tap NAV, then MAP, then each block left to right. Every tap slides that block down against the one below it, and the free space collects at the top.</p>
    {/if}
  {/if}
</div>

<style>
  .alloc-game { width: 100%; max-width: 720px; margin: 0 auto; position: relative; color: var(--qx-text); font-family: var(--qx-font); }
  button { font: inherit; }
  button:focus-visible { outline: 3px solid var(--qx-accent); outline-offset: 2px; }
  code { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: .92em; }
  .exit { position: absolute; top: 0; left: 0; z-index: 5; width: 44px; height: 44px; border: 1.5px solid var(--qx-border); border-radius: 50%; background: var(--qx-surface); color: var(--qx-text); cursor: pointer; font-size: 20px; }
  header { min-height: 46px; padding: 1px 54px 8px; text-align: center; }
  h2, h3, p { margin-top: 0; }
  header h2 { margin-bottom: 0; font-size: 22px; font-weight: 950; }
  .eyebrow, .mission > span { color: var(--qx-accent-text); font-size: 9px; font-weight: 950; letter-spacing: .12em; text-transform: uppercase; }

  .intro, .reveal { display: flex; flex-direction: column; align-items: center; gap: 14px; padding: 8px 2px; text-align: center; }
  .intro h2, .reveal h2 { max-width: 24ch; margin: 0; font-size: clamp(24px, 5vw, 34px); font-weight: 950; line-height: 1.08; }
  .intro p, .intro > strong, .reveal > p { max-width: 56ch; margin: 0; color: var(--qx-text-dim); font-size: 14px; line-height: 1.55; }
  .intro > strong, .reveal strong { color: var(--qx-text); }
  .primary { width: 100%; max-width: 360px; min-height: 48px; border: 0; border-radius: 4px; background: var(--qx-accent); color: var(--qx-bg); cursor: pointer; font-size: 13px; font-weight: 950; }

  .rail { display: flex; justify-content: center; gap: 4px; margin-bottom: 10px; flex-wrap: wrap; }
  .rail span { padding: 4px 7px; border: 1px solid var(--qx-border); border-radius: 999px; background: var(--qx-surface-2); color: var(--qx-text-faint); font-size: 8px; font-weight: 900; text-transform: uppercase; }
  .rail span.current { border-color: var(--qx-accent); background: var(--qx-accent-soft); color: var(--qx-accent-text); }
  .rail span.done { border-color: var(--qx-green); background: var(--qx-green-soft); color: var(--qx-green-text); }

  .mission { padding: 10px 12px; border-left: 4px solid var(--qx-accent); background: var(--qx-surface-2); }
  .mission h3 { margin: 2px 0; font-size: 16px; font-weight: 950; }
  .mission p { margin: 0; color: var(--qx-text-dim); font-size: 12px; line-height: 1.4; }

  .dashboard { display: flex; justify-content: flex-end; gap: 5px; margin: 8px 0; flex-wrap: wrap; }
  .dashboard span { min-width: 74px; padding: 5px 8px; border: 1px solid var(--qx-border); border-radius: 999px; background: var(--qx-surface); text-align: center; }
  .dashboard small { display: block; color: var(--qx-text-faint); font-size: 8px; font-weight: 850; text-transform: uppercase; }
  .dashboard b { font-size: 13px; font-variant-numeric: tabular-nums; }

  .request { display: flex; align-items: center; gap: 8px; margin: 6px 0; padding: 8px 12px; border: 2px solid var(--req, var(--qx-accent)); border-radius: 4px; background: color-mix(in srgb, var(--req, var(--qx-accent)) 12%, var(--qx-surface)); }
  .request .tag { color: var(--qx-text-faint); font-size: 8px; font-weight: 900; letter-spacing: .1em; text-transform: uppercase; }
  .request b { font-size: 13px; font-weight: 950; }
  .request small { margin-left: auto; color: var(--qx-text-dim); font-size: 10px; font-weight: 700; }

  .strip-wrap { margin-top: 2px; }
  .strip { position: relative; display: flex; gap: 3px; width: 100%; height: 68px; padding: 5px; border: 1px solid var(--qx-border-2); border-radius: var(--qx-radius-md); background: var(--qx-surface-3); box-shadow: var(--qx-shadow-card); box-sizing: border-box; }
  .strip.paged { background-image: repeating-linear-gradient(90deg, transparent 0 calc(12.5% - 2px), color-mix(in srgb, var(--qx-text) 22%, transparent) calc(12.5% - 2px) 12.5%); }
  .seg { position: relative; flex-basis: 0; flex-grow: 1; min-width: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; overflow: hidden; border: 0; border-radius: 3px; }
  .seg.block { color: var(--qx-bg); cursor: pointer; box-shadow: inset 0 0 0 2px color-mix(in srgb, #000 16%, transparent); }
  .seg.block::before { content: ''; position: absolute; inset: 3px; border: 1px dashed color-mix(in srgb, #fff 55%, transparent); pointer-events: none; }
  .seg.block b { position: relative; z-index: 1; font-size: 12px; font-weight: 950; line-height: 1; }
  .seg.block small { position: relative; z-index: 1; font-size: 8px; font-weight: 800; opacity: .9; font-variant-numeric: tabular-nums; }
  .seg.block em { position: relative; z-index: 1; margin-top: 1px; font-size: 7px; font-weight: 900; font-style: normal; letter-spacing: .06em; text-transform: uppercase; }
  .seg.block.fixed { cursor: default; }
  .seg.block.exited { animation: pulse 1.15s ease-in-out infinite; }
  .seg .waste { position: absolute; top: 0; right: 0; bottom: 0; z-index: 0; background-image: repeating-linear-gradient(45deg, color-mix(in srgb, #000 26%, transparent) 0 4px, transparent 4px 8px); }
  .seg.hole { background: color-mix(in srgb, var(--qx-surface) 78%, transparent); color: var(--qx-text-faint); cursor: pointer; border: 1.5px dashed var(--qx-border-2); }
  .seg.hole b { font-size: 11px; font-weight: 900; font-variant-numeric: tabular-nums; }
  .seg.hole small { font-size: 7px; font-weight: 800; }
  .seg.hole.fits { border-color: var(--qx-green); background: var(--qx-green-soft); color: var(--qx-green-text); animation: fitpulse 1.2s ease-in-out infinite; }
  .ruler { display: flex; justify-content: space-between; margin-top: 3px; padding: 0 2px; color: var(--qx-text-faint); font-size: 8px; font-weight: 800; font-variant-numeric: tabular-nums; }
  .ruler .end { color: var(--qx-text-dim); }
  .strip.mini { height: 30px; max-width: 300px; box-shadow: var(--qx-shadow-card); }
  .strip.mini .seg { min-width: 0; }

  .clipboard { display: flex; align-items: center; gap: 7px; flex-wrap: wrap; margin-top: 8px; padding: 8px 10px; border: 2px solid var(--qx-green); background: var(--qx-green-soft); }
  .clipboard div { display: grid; margin-right: auto; text-align: left; }
  .clipboard span { color: var(--qx-green-text); font-size: 8px; font-weight: 900; text-transform: uppercase; }
  .clipboard b, .clipboard small { font-size: 10px; }
  .clipboard small { padding: 3px 6px; border: 1px solid var(--qx-green); background: var(--qx-surface); color: var(--qx-green-text); font-variant-numeric: tabular-nums; }

  .wall-tool { width: 100%; min-height: 50px; display: flex; justify-content: space-between; align-items: center; gap: 10px; margin-top: 8px; padding: 8px 12px; border: 2px solid var(--qx-green); border-radius: 3px; background: var(--qx-surface); color: var(--qx-text); cursor: pointer; text-align: left; }
  .wall-tool b { font-size: 11px; }
  .wall-tool span { color: var(--qx-text-dim); font-size: 10px; }

  .load-status { display: flex; gap: 8px; align-items: center; margin-top: 9px; padding: 7px 10px; border: 1px solid var(--qx-border); border-radius: 999px; background: var(--qx-surface-2); }
  .load-status > span { color: var(--qx-text-faint); font-size: 8px; font-weight: 900; text-transform: uppercase; }
  .load-status b { font-size: 12px; }
  .load-status small { margin-left: auto; color: var(--qx-text-dim); font-size: 9px; }

  .feedback { min-height: 30px; margin-top: 8px; padding: 7px 10px; border-left: 4px solid var(--qx-border-2); background: var(--qx-surface-2); color: var(--qx-text-dim); font-size: 11px; font-weight: 700; line-height: 1.4; }
  .feedback.good { border-color: var(--qx-green); background: var(--qx-green-soft); color: var(--qx-green-text); }
  .feedback.bad { border-color: var(--qx-danger); background: var(--qx-danger-soft); color: var(--qx-danger-text); }
  .hint-button { display: block; min-height: 44px; margin: 8px auto 0; border: 0; background: transparent; color: var(--qx-accent-text); cursor: pointer; font-weight: 850; text-decoration: underline; }
  .hint { margin: 8px 0 0; padding: 9px; border: 1px solid var(--qx-accent); background: var(--qx-accent-soft); color: var(--qx-accent-text); font-size: 11px; text-align: center; }

  .metric-replay, .comparison { width: 100%; display: grid; gap: 7px; }
  .metric-replay { grid-template-columns: repeat(3, 1fr); }
  .comparison { grid-template-columns: repeat(2, 1fr); }
  .metric-replay span, .comparison article { display: grid; gap: 3px; padding: 10px; border: 1px solid var(--qx-border); background: var(--qx-surface); text-align: left; }
  .metric-replay span { text-align: center; }
  .metric-replay b { color: var(--qx-accent-text); font-size: 23px; }
  .metric-replay span, .comparison span { color: var(--qx-text-dim); font-size: 10px; }
  .comparison b { font-size: 11px; text-transform: uppercase; letter-spacing: .04em; }
  .copy-counter { display: grid; padding: 12px 28px; border: 2px solid var(--qx-accent); background: var(--qx-accent-soft); }
  .copy-counter b { font-size: 32px; }
  .copy-counter span { color: var(--qx-text-dim); font-size: 10px; }
  .page-table { width: 100%; max-width: 390px; border: 1px solid var(--qx-border-2); background: var(--qx-surface); }
  .page-table > div { display: grid; grid-template-columns: 1fr 1fr; border-bottom: 1px solid var(--qx-border); }
  .page-table .pt-head b { padding: 7px; font-size: 9px; text-transform: uppercase; letter-spacing: .05em; }
  .page-table .pt-row span { padding: 7px; font-size: 11px; font-variant-numeric: tabular-nums; }

  .reward-panel, .complete-panel { width: 100%; box-sizing: border-box; display: flex; align-items: center; justify-content: space-between; padding: 12px 14px; border: 1.5px solid var(--qx-accent); background: var(--qx-accent-soft); text-align: left; }
  .reward-panel span { display: block; color: var(--qx-accent-text); font-size: 9px; font-weight: 900; text-transform: uppercase; }
  .reward-panel > b { color: var(--qx-accent-text); font-size: 19px; }
  .complete-panel { display: grid; border-color: var(--qx-green); background: var(--qx-green-soft); }
  .complete-panel span { color: var(--qx-green-text); font-size: 11px; }

  @keyframes pulse { 50% { filter: brightness(1.14); box-shadow: inset 0 0 0 2px #fff; } }
  @keyframes fitpulse { 50% { border-color: var(--qx-green-text); background: color-mix(in srgb, var(--qx-green) 24%, var(--qx-surface)); } }

  @media (max-width: 600px) {
    .strip { height: 76px; }
    .seg { min-width: 26px; }
    .dashboard { justify-content: stretch; }
    .dashboard span { flex: 1 1 40%; }
  }
  @media (max-width: 420px) {
    .metric-replay, .comparison { grid-template-columns: 1fr; }
    .strip-wrap { overflow-x: auto; }
    .strip { min-width: 360px; }
  }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation: none !important; transition: none !important; }
  }
</style>
