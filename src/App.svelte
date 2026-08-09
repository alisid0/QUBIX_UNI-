<script>
  import ChangeLab from './views/ChangeLab.svelte';
  import ReviewMode from './views/ReviewMode.svelte';
  import Home from './views/Home.svelte';
  import { view } from './lib/stores/view.js';

  // The Factory is loaded on demand. Imported statically it dragged every board
  // of authoring options into the production bundle, where the route cannot even
  // be reached, which made the dev-only gate cosmetic rather than real.
  let FactoryMode = null;

  const params = new URLSearchParams(window.location.search);
  const explicitLearnerPreview = ['variables-and-rates', 'change-lab'].includes(params.get('prototype')) || params.get('mode') === 'learner';
  const explicitReviewMode = params.get('mode') === 'review';
  // Authoring surface. Never reached in production: options are drafts, not curriculum.
  const showFactoryMode = params.get('mode') === 'factory' && !import.meta.env.PROD;
  const showReviewMode = explicitReviewMode || (import.meta.env.PROD && !explicitLearnerPreview);

  if (showFactoryMode) {
    import('./views/FactoryMode.svelte').then(m => { FactoryMode = m.default; });
  }
</script>

<main class="qubix-university">
  {#if showFactoryMode}
    <svelte:component this={FactoryMode} />
  {:else if showReviewMode}
    <ReviewMode />
  {:else if $view === 'lesson'}
    <ChangeLab />
  {:else}
    <Home />
  {/if}
</main>

<style>
  .qubix-university {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>
