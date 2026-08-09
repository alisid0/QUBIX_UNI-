<script>
  import ChangeLab from './views/ChangeLab.svelte';
  import ReviewMode from './views/ReviewMode.svelte';
  import FactoryMode from './views/FactoryMode.svelte';

  const params = new URLSearchParams(window.location.search);
  const explicitLearnerPreview = ['variables-and-rates', 'change-lab'].includes(params.get('prototype')) || params.get('mode') === 'learner';
  const explicitReviewMode = params.get('mode') === 'review';
  // Authoring surface. Never reached in production: options are drafts, not curriculum.
  const showFactoryMode = params.get('mode') === 'factory' && !import.meta.env.PROD;
  const showReviewMode = explicitReviewMode || (import.meta.env.PROD && !explicitLearnerPreview);
</script>

<main class="qubix-university">
  {#if showFactoryMode}
    <FactoryMode />
  {:else if showReviewMode}
    <ReviewMode />
  {:else}
    <ChangeLab />
  {/if}
</main>

<style>
  .qubix-university {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>
