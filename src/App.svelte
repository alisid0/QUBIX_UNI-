<script>
  import ChangeLab from './views/ChangeLab.svelte';
  import ReviewMode from './views/ReviewMode.svelte';

  const params = new URLSearchParams(window.location.search);
  const explicitLearnerPreview = params.get('prototype') === 'change-lab' || params.get('mode') === 'learner';
  const explicitReviewMode = params.get('mode') === 'review';
  const showReviewMode = explicitReviewMode || (import.meta.env.PROD && !explicitLearnerPreview);
</script>

<main class="qubix-university">
  {#if showReviewMode}
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
