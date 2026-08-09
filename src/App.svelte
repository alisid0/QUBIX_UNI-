<script>
  import ChangeLab from './views/ChangeLab.svelte';
  import Home from './views/Home.svelte';
  import { view } from './lib/stores/view.js';

  // The Factory is loaded on demand. Imported statically it dragged every board
  // of authoring options into the production bundle, where the route cannot even
  // be reached, which made the dev-only gate cosmetic rather than real.
  let FactoryMode = null;
  // The Approver is loaded on demand for the same reason. It is reached only by
  // asking for it, and it carries the source citations and the review wording,
  // none of which belongs in the bundle a learner downloads.
  let ReviewMode = null;

  const params = new URLSearchParams(window.location.search);
  const explicitLearnerPreview = ['variables-and-rates', 'change-lab'].includes(params.get('prototype')) || params.get('mode') === 'learner';
  const explicitReviewMode = params.get('mode') === 'review';
  // Authoring surface. Never reached in production: options are drafts, not curriculum.
  const showFactoryMode = params.get('mode') === 'factory' && !import.meta.env.PROD;
  // The Approver is now reached only by asking for it. It used to be what
  // production served by default, from when the deployed site existed to be
  // reviewed rather than used, so anyone opening the site got a review form
  // instead of the course. Founder decision of 2026-08-10 to put the pilot live.
  const showReviewMode = explicitReviewMode;

  if (showFactoryMode) {
    import('./views/FactoryMode.svelte').then(m => { FactoryMode = m.default; });
  }
  if (showReviewMode) {
    import('./views/ReviewMode.svelte').then(m => { ReviewMode = m.default; });
  }
</script>

<main class="qubix-university">
  {#if showFactoryMode}
    <svelte:component this={FactoryMode} />
  {:else if showReviewMode}
    <svelte:component this={ReviewMode} />
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
