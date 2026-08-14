<script>
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import { fly, fade } from 'svelte/transition';
  import { initAuth, isAuthenticated, signInWithGoogle } from './lib/stores/auth.js';
  import { profile } from './lib/stores/profile.js';
  import { progress } from './lib/stores/progress.js';
  import { engagement } from './lib/stores/engagement.js';
  import { retryIssueReportQueue } from './lib/stores/issueReports.js';
  import { theme } from './lib/stores/theme.js';
  import { PATHS, PATH_GROUPS } from './lib/content/paths.js';
  import { parseHash, viewToHash } from './lib/appRoute.js';
  import Auth from './views/Auth.svelte';
  import Onboarding from './views/Onboarding.svelte';
  import Home from './views/Home.svelte';
  import Path from './views/Path.svelte';
  import DailyWorkout from './views/DailyWorkout.svelte';
  import PathView from './views/PathView.svelte';
  import SubjectView from './views/SubjectView.svelte';
  import WScore from './views/WScore.svelte';
  import Snippets from './views/Snippets.svelte';
  import Reader from './views/Reader.svelte';
  import Quiz from './views/Quiz.svelte';
  import Author from './views/Author.svelte';
  import BottomNav from './lib/components/qubix/BottomNav.svelte';
  import CommandPalette from './lib/components/qubix/CommandPalette.svelte';
  import SignupPrompt from './lib/components/SignupPrompt.svelte';
  import WToast from './lib/components/qubix/WToast.svelte';
  import { appEnvironment } from './lib/environment.js';

  // loading | auth | onboarding | home | topics | topicDetail | stats | leaderboard | otherUserStats | snippets | reader | quiz | author
  let currentView = 'loading';
  let currentPathId = '';
  let currentSubjectId = 'line'; // gateway id for the Subject hub view
  let workshopTarget = null; // module id, or { moduleId, mode }, opened directly
  let workshopRunning = false; // a selected workshop becomes its own focused screen
  let readerNumbers = [];
  let readerStart = 1;
  let authInitialMode = 'welcome';
  let slideDirection = 1; // 1 = forward (right→left), -1 = backward (left→right)
  let searchOpen = false;
  let workshopComponentPromise;
  let applyingRoute = false; // true while restoring from hash / boot (avoid history churn)

  function loadWorkshopComponent() {
    workshopComponentPromise ||= import('./views/WorkshopLab.svelte').then((module) => module.default);
    return workshopComponentPromise;
  }

  function retryWorkshopComponent() {
    workshopComponentPromise = undefined;
    navigate('home');
    requestAnimationFrame(() => navigate('workshop', workshopTarget));
  }

  const TAB_VIEWS = ['home', 'path', 'workshop', 'wscore'];
  const TAB_ORDER = ['home', 'path', 'workshop', 'wscore'];
  const PUSH_VIEWS = ['topicDetail', 'subject', 'reader', 'quiz', 'author', 'snippetMode', 'workout'];
  // Old view ids still used by callers/deep-links → their streamlined homes.
  const LEGACY_VIEWS = { topics: 'path', stats: 'wscore', map: 'path', snippets: 'snippetMode', leaderboard: 'wscore', otherUserStats: 'wscore' };

  // Honour reduced-motion: Svelte's fly is JS-driven, so the CSS media query
  // can't stop it — zero the distance/duration instead.
  const reduceMotion = typeof matchMedia !== 'undefined'
    && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const easeInOutQuad = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  // Incoming view: slide in from `dir`. Outgoing: slide out the opposite way.
  const flyIn = (dir = 1) => reduceMotion
    ? { duration: 0 }
    : { x: dir * 64, duration: 300, easing: easeInOutQuad };
  const flyOut = (dir = 1) => reduceMotion
    ? { duration: 0 }
    : { x: -dir * 34, duration: 220, easing: easeInOutQuad };

  function syncHash(replace = false) {
    if (typeof history === 'undefined') return;
    const next = viewToHash({
      view: currentView,
      pathId: currentPathId,
      subjectId: currentSubjectId,
      workshopTarget,
      readerStart
    });
    if (!next) return;
    const url = `${location.pathname}${location.search}${next}`;
    if (`${location.pathname}${location.search}${location.hash}` === url) return;
    if (replace) history.replaceState({}, '', url);
    else history.pushState({}, '', url);
  }

  function applyRoute(route, { replaceHash = true } = {}) {
    if (!route?.view) return false;
    applyingRoute = true;
    try {
      navigate(route.view, routeArg(route), { sync: false });
      if (replaceHash) syncHash(true);
    } finally {
      applyingRoute = false;
    }
    return true;
  }

  function routeArg(route) {
    if (route.view === 'topicDetail' || route.view === 'quiz') return route.pathId;
    if (route.view === 'subject') return route.subjectId;
    if (route.view === 'workshop') return route.workshopTarget;
    if (route.view === 'reader') {
      return { numbers: route.numbers, start: route.start, pathId: route.pathId || '' };
    }
    return undefined;
  }

  function restoreFromLocation() {
    const fromHash = parseHash(location.hash, PATHS);
    if (fromHash) {
      if (fromHash.view === 'author' && !appEnvironment.testToolsEnabled) {
        navigate('home', undefined, { sync: true, replace: true });
        return true;
      }
      return applyRoute(fromHash);
    }

    const params = new URLSearchParams(location.search);
    const pathParam = params.get('path');
    if (pathParam && PATHS[pathParam]) {
      const ok = applyRoute({ view: 'topicDetail', pathId: pathParam });
      // Move legacy ?path= into the hash and drop the query param.
      params.delete('path');
      const qs = params.toString();
      history.replaceState({}, '', `${location.pathname}${qs ? `?${qs}` : ''}${location.hash || ''}`);
      return ok;
    }
    return false;
  }

  onMount(() => {
    let mounted = true;
    let stopEngagement = () => {};

    async function boot() {
    try { await initAuth(); } catch (_) {}
    progress.init();
    const profileData = await profile.init();
    stopEngagement = engagement.start(() => currentView);
    retryIssueReportQueue();
    if (!mounted) return;

    // SEO deep-link: ?path=P12 → open that topic directly
    const params = new URLSearchParams(location.search);
    if (params.get('auth') === 'reset') {
      authInitialMode = 'reset-password';
      currentView = 'auth';
      return;
    }
    if (params.get('auth') === 'confirmed' || params.get('auth') === 'oauth') {
      history.replaceState({}, '', `${location.pathname}${location.hash || ''}`);
    }

    // Guest mode: persisted in sessionStorage so page refreshes don't
    // kick unauthenticated users back to the auth screen.
    if (get(isAuthenticated)) {
      // A real session exists — clear any stale guest flag.
      sessionStorage.removeItem('qubix_guest');
      if (!profileData.onboardingCompleted) {
        currentView = 'onboarding';
        return;
      }
    } else {
      // Guest-first: land everyone in the app and let them explore. A sign-up
      // prompt appears after they have engaged (see the reactive block below).
      // The auth screen is still reachable from the menu and the prompt.
      sessionStorage.setItem('qubix_guest', '1');
    }

    if (!restoreFromLocation()) {
      navigate('home', undefined, { sync: true, replace: true });
    }

    }

    function onHashChange() {
      if (applyingRoute) return;
      if (currentView === 'auth' || currentView === 'onboarding' || currentView === 'loading') return;
      restoreFromLocation();
    }

    boot();
    window.addEventListener('hashchange', onHashChange);
    window.addEventListener('popstate', onHashChange);

    return () => {
      mounted = false;
      stopEngagement();
      window.removeEventListener('hashchange', onHashChange);
      window.removeEventListener('popstate', onHashChange);
    };
  });

  function skipAuth() {
    sessionStorage.setItem('qubix_guest', '1');
    navigate('home', undefined, { replace: true });
  }

  // ── Guest sign-up prompt: appears once a guest has explored a little ──
  let showSignupPrompt = false;
  let signupPromptDismissed =
    typeof sessionStorage !== 'undefined' && sessionStorage.getItem('qubix_signup_dismissed') === '1';
  const PROMPT_AT_BOARDS = 2;
  // Only interrupt at a natural pause (browse/dashboard views), never mid-lesson.
  const PROMPT_VIEWS = ['home', 'path', 'subject', 'topicDetail', 'wscore'];

  $: if (
    !$isAuthenticated &&
    !signupPromptDismissed &&
    !showSignupPrompt &&
    Object.keys($progress?.boards || {}).length >= PROMPT_AT_BOARDS &&
    PROMPT_VIEWS.includes(currentView)
  ) {
    showSignupPrompt = true;
  }

  function signupWithEmail() {
    showSignupPrompt = false;
    authInitialMode = 'welcome';
    currentView = 'auth';
  }
  async function signupWithGoogle() {
    showSignupPrompt = false;
    try { await signInWithGoogle(); } catch { currentView = 'auth'; }
  }
  function dismissSignupPrompt() {
    showSignupPrompt = false;
    signupPromptDismissed = true;
    try { sessionStorage.setItem('qubix_signup_dismissed', '1'); } catch {}
  }

  function handleGateway(gateway) {
    const group = PATH_GROUPS[gateway];
    if (group && group.firstTopic) {
      navigate('topicDetail', group.firstTopic);
    } else {
      navigate('path');
    }
  }

  async function handleAuthed(isNewUser) {
    // Clear guest flag — a real session now exists.
    sessionStorage.removeItem('qubix_guest');
    const profileData = await profile.init();
    if (new URLSearchParams(location.search).has('auth')) {
      history.replaceState({}, '', `${location.pathname}${location.hash || ''}`);
    }
    if (isNewUser || !profileData.onboardingCompleted) {
      currentView = 'onboarding';
      return;
    }
    if (!restoreFromLocation()) {
      navigate('home', undefined, { replace: true });
    }
  }

  function navigate(view, arg, opts = {}) {
    const { sync = true, replace = false } = opts;
    view = LEGACY_VIEWS[view] || view;
    if (view === 'author' && !appEnvironment.testToolsEnabled) return;
    if (view !== 'workshop') workshopRunning = false;
    // Slide direction: push views slide in from the right; back-to-tab slides
    // from the left; tab→tab follows the tab order.
    if (PUSH_VIEWS.includes(view)) {
      slideDirection = 1;
    } else if (TAB_VIEWS.includes(view) && PUSH_VIEWS.includes(currentView)) {
      slideDirection = -1;
    } else if (TAB_VIEWS.includes(view) && TAB_VIEWS.includes(currentView)) {
      const fromIdx = TAB_ORDER.indexOf(currentView);
      const toIdx = TAB_ORDER.indexOf(view);
      slideDirection = toIdx > fromIdx ? 1 : -1;
    }

    if (view === 'topicDetail') { currentPathId = arg; currentView = 'topicDetail'; }
    else if (view === 'subject') { currentSubjectId = arg || 'line'; currentView = 'subject'; }
    else if (view === 'workshop') { workshopTarget = arg || null; currentView = 'workshop'; }
    else if (view === 'reader') {
      readerNumbers = arg?.numbers || Array.from({ length: 84 }, (_, i) => i + 1);
      readerStart = arg?.start || readerNumbers[0] || 1;
      if (arg?.pathId) currentPathId = arg.pathId;
      else if (arg?.pathId === '') currentPathId = '';
      currentView = 'reader';
    }
    else if (view === 'quiz') { currentPathId = arg; currentView = 'quiz'; }
    else if (view === 'author') { currentView = 'author'; }
    else { currentView = view; }

    if (sync && !applyingRoute) {
      // Tabs replace; deeper screens push so Back can leave them.
      const useReplace = replace || TAB_VIEWS.includes(view);
      syncHash(useReplace);
    }
  }
</script>

<div class="app-shell">
  {#if appEnvironment.isTest}
    <div class="environment-badge" title="This deployment uses test data and services">
      {appEnvironment.name} environment
    </div>
  {/if}

  {#if currentView === 'loading'}
    <div class="view-layer qx-shell loading-screen" in:fade={{ duration: 200 }} out:fade={{ duration: 200 }}>
      <div class="loading-brand">QUBIX</div>
      <div class="loading-dots"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>
    </div>

  {:else if currentView === 'auth'}
    <div class="view-layer scrollable-layer">
      <Auth onSkip={skipAuth} onAuthed={handleAuthed} initialMode={authInitialMode} />
    </div>

  {:else if currentView === 'onboarding'}
    <div class="view-layer">
      <Onboarding onComplete={() => navigate('home', undefined, { replace: true })} />
    </div>

  {:else if TAB_VIEWS.includes(currentView)}
    <div class="view-layer qx-shell tabbed-view" class:workshop-running={workshopRunning} in:fly={flyIn(slideDirection)} out:fly={flyOut(slideDirection)}>
      <div class="tab-content">
        {#if currentView === 'home'}
          <Home onNavigate={navigate} />
        {:else if currentView === 'path'}
          <Path onNavigate={navigate} />
        {:else if currentView === 'workshop'}
          {#await loadWorkshopComponent()}
            <div class="lazy-view-loading" role="status" aria-live="polite">
              <span></span><span></span><span></span>
              <span class="sr-only">Loading workshop</span>
            </div>
          {:then WorkshopLab}
            <svelte:component
              this={WorkshopLab}
              onNavigate={navigate}
              openTarget={workshopTarget}
              onRunningChange={(running) => workshopRunning = running}
            />
          {:catch}
            <div class="lazy-view-error" role="alert">
              <strong>Workshop could not load.</strong>
              <button type="button" on:click={retryWorkshopComponent}>Try again</button>
            </div>
          {/await}
        {:else if currentView === 'wscore'}
          <WScore onNavigate={navigate} />
        {/if}
      </div>
      {#if !workshopRunning}
        <BottomNav active={currentView} onNavigate={navigate} />
      {/if}
    </div>

  {:else if currentView === 'topicDetail'}
    <div class="view-layer" in:fly={flyIn(1)} out:fly={flyOut(1)}>
      <PathView pathId={currentPathId} onNavigate={navigate} />
    </div>

  {:else if currentView === 'subject'}
    <div class="view-layer" in:fly={flyIn(1)} out:fly={flyOut(1)}>
      <SubjectView gid={currentSubjectId} onNavigate={navigate} />
    </div>

  {:else if currentView === 'workout'}
    <div class="view-layer" in:fly={flyIn(1)} out:fly={flyOut(1)}>
      <DailyWorkout onNavigate={navigate} />
    </div>

  {:else if currentView === 'reader'}
    <div class="view-layer" in:fly={flyIn(1)} out:fly={flyOut(1)}>
      <Reader
        numbers={readerNumbers}
        startNumber={readerStart}
        pathId={currentPathId}
        onNavigate={navigate}
        onBack={() => currentPathId ? navigate('topicDetail', currentPathId) : navigate('topics')}
      />
    </div>

  {:else if currentView === 'quiz'}
    <div class="view-layer" in:fly={flyIn(1)} out:fly={flyOut(1)}>
      <Quiz
        pathId={currentPathId}
        onComplete={() => {}}
        onBack={() => navigate('topicDetail', currentPathId)}
      />
    </div>

  {:else if currentView === 'author' && appEnvironment.testToolsEnabled}
    <div class="view-layer" in:fly={flyIn(1)} out:fly={flyOut(1)}>
      <Author onNavigate={navigate} />
    </div>

  {:else if currentView === 'snippetMode'}
    <div class="view-layer" in:fly={flyIn(1)} out:fly={flyOut(1)}>
      <Snippets onClose={() => navigate('home')} />
    </div>
  {/if}

  <CommandPalette open={searchOpen} onClose={() => searchOpen = false} onNavigate={navigate} />
  <WToast />

  {#if showSignupPrompt}
    <SignupPrompt onEmail={signupWithEmail} onGoogle={signupWithGoogle} onDismiss={dismissSignupPrompt} />
  {/if}
</div>

<svelte:window on:keydown={(e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    searchOpen = !searchOpen;
  }
}} />

<style>
  .app-shell {
    height: 100%;
    width: 100%;
    max-width: 1440px;
    margin-inline: auto;
    position: relative;
    overflow: hidden;
    background:
      radial-gradient(ellipse at 50% -18%, var(--qx-bg-radial), transparent 56%),
      var(--qx-bg);
  }

  .lazy-view-loading,
  .lazy-view-error {
    min-height: 55vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .lazy-view-loading { gap: 7px; }
  .lazy-view-loading > span:not(.sr-only) {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--qx-accent);
    animation: lazy-pulse 1.2s ease-in-out infinite;
  }
  .lazy-view-loading > span:nth-child(2) { animation-delay: 120ms; }
  .lazy-view-loading > span:nth-child(3) { animation-delay: 240ms; }

  .lazy-view-error {
    flex-direction: column;
    gap: 14px;
    color: var(--qx-text);
    text-align: center;
  }
  .lazy-view-error button {
    min-height: 44px;
    padding: 0 18px;
    border: 1px solid var(--qx-border);
    border-radius: 12px;
    background: var(--qx-surface);
    color: inherit;
    font: inherit;
    font-weight: 800;
    cursor: pointer;
  }

  @keyframes lazy-pulse {
    0%, 70%, 100% { opacity: .3; transform: translateY(0); }
    35% { opacity: 1; transform: translateY(-4px); }
  }
  .environment-badge {
    position: fixed; top: max(6px, env(safe-area-inset-top)); left: 50%; z-index: 10000;
    transform: translateX(-50%); pointer-events: none;
    padding: 4px 10px; border-radius: 999px;
    background: #F2B84B; color: #231A08; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
    font-size: 10px; font-weight: 900; letter-spacing: 0.08em; text-transform: uppercase;
  }

  /* Every top-level screen is its own absolutely-positioned layer, so during a
     transition the outgoing and incoming views overlap and cross-slide cleanly
     instead of stacking in normal flow. */
  .view-layer { position: absolute; inset: 0; min-width: 0; overflow-x: hidden; }
  .scrollable-layer { overflow-y: auto; overflow-x: hidden; -webkit-overflow-scrolling: touch; }

  .loading-screen {
    display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 20px;
  }
  .loading-brand {
    font-family: var(--qx-font-display);
    font-size: clamp(28px, 6vw, 36px);
    font-weight: 800;
    letter-spacing: -0.02em;
    color: var(--qx-accent-text);
  }
  .loading-dots { display: flex; gap: 8px; }
  .dot { width: 8px; height: 8px; border-radius: 50%; background: var(--qx-accent); opacity: 0.45; animation: bounce 1.4s infinite ease-in-out both; }
  .dot:nth-child(1) { animation-delay: -0.32s; }
  .dot:nth-child(2) { animation-delay: -0.16s; }
  @keyframes bounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); } }

  .tabbed-view { display: flex; flex-direction: column; }
  .tab-content { flex: 1; min-height: 0; min-width: 0; overflow-y: auto; overflow-x: hidden; overscroll-behavior-y: contain; }
  .tabbed-view.workshop-running .tab-content { overscroll-behavior-y: none; }

  /* ── Desktop: sidebar layout ── */
  @media (min-width: 900px) {
    .app-shell {
      display: flex;
      flex-direction: row;
    }
    .tabbed-view {
      flex-direction: row;
      flex: 1;
      min-width: 0;
    }
    .tabbed-view > :global(.bottom-nav) {
      order: -1;
    }
    .tab-content {
      flex: 1;
      padding: 0;
    }
    .view-layer {
      left: 0;
      /* Leave room for the sidebar */
    }
  }
</style>
