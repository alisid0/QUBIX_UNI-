<script>
  import ChangeLab from './views/ChangeLab.svelte';
  import Home from './views/Home.svelte';
  import WikiMode from './views/WikiMode.svelte';
  import { view } from './lib/stores/view.js';

  // The Factory is loaded on demand. Imported statically it dragged every board
  // of authoring options into the production bundle, where the route cannot even
  // be reached, which made the dev-only gate cosmetic rather than real.
  let FactoryMode = null;
  // A separate, authoring-only surface for reviewing material selected from
  // the former Strata/Qubix repository. It must not become a board in the
  // present Factory or enter the learner bundle.
  let StrataMigrationFactory = null;
  // The Approver is loaded on demand for the same reason. It is reached only by
  // asking for it, and it carries the source citations and the review wording,
  // none of which belongs in the bundle a learner downloads.
  let ReviewMode = null;
  // Cross-board listing of interactions and exercises. Authoring only: it selects
  // nothing and is the only place the no-repeat rule can actually be checked.
  let PartsSheet = null;
  // The exercises factory: questions answered by operating them. Authoring only.
  let ExerciseFactory = null;
  // Local asset workshop. Individual Three.js assets are reviewed here before
  // a lesson is allowed to depend on them.
  let AssetShowcase = null;
  let GameMission = null;

  const params = new URLSearchParams(window.location.search);
  const explicitLearnerPreview = ['variables-and-rates', 'change-lab'].includes(params.get('prototype')) || params.get('mode') === 'learner';
  const explicitReviewMode = params.get('mode') === 'review';
  const showWikiMode = params.get('mode') === 'wiki';
  // Authoring surface. Never reached in production: options are drafts, not curriculum.
  // Dev always, plus any build that asks for the workshop explicitly.
  const workshop = !import.meta.env.PROD || import.meta.env.VITE_WORKSHOP === '1';
  const showFactoryMode = params.get('mode') === 'factory' && workshop;
  const showStrataMigrationFactory = params.get('mode') === 'strata-factory' && workshop;
  const showPartsSheet = params.get('mode') === 'parts' && workshop;
  const showExerciseFactory = params.get('mode') === 'exercises' && workshop;
  const showAssetShowcase = params.get('mode') === 'assets' && workshop;
  const showGameMission = params.get('mode') === 'game' && workshop;
  // The Approver is now reached only by asking for it. It used to be what
  // production served by default, from when the deployed site existed to be
  // reviewed rather than used, so anyone opening the site got a review form
  // instead of the course. Founder decision of 2026-08-10 to put the pilot live.
  const showReviewMode = explicitReviewMode;

  if (showFactoryMode) {
    import('./views/FactoryMode.svelte').then(m => { FactoryMode = m.default; });
  }
  if (showStrataMigrationFactory) {
    import('./views/StrataMigrationFactory.svelte').then(m => { StrataMigrationFactory = m.default; });
  }
  if (showPartsSheet) {
    import('./views/PartsSheet.svelte').then(m => { PartsSheet = m.default; });
  }
  if (showExerciseFactory) {
    import('./views/ExerciseFactory.svelte').then(m => { ExerciseFactory = m.default; });
  }
  if (showAssetShowcase) {
    const assetPreview = params.get('asset') === 'world'
      ? import('./views/WorldAssetShowcase.svelte')
      : params.get('asset') === 'product-package'
      ? import('./views/ProductAssetShowcase.svelte')
      : params.get('asset') === 'data-quality-terminal'
        ? import('./views/DataQualityAssetShowcase.svelte')
        : params.get('asset') === 'relational-workbench'
          ? import('./views/RelationalAssetShowcase.svelte')
          : import('./views/AssetShowcase.svelte');
    assetPreview.then(m => { AssetShowcase = m.default; });
  }
  if (showGameMission) {
    const gamePreview = params.get('mission') === 'join-grain'
      ? import('./views/JoinGrainMission.svelte')
      : params.get('mission') === 'classify-data'
      ? import('./views/DataClassificationMission.svelte')
      : params.get('mission') === 'missing-data'
        ? import('./views/MissingDataMission.svelte')
        : params.get('mission') === 'table-grain'
          ? import('./views/TableGrainMission.svelte')
          : params.get('mission') === 'duplicate-records'
            ? import('./views/DuplicateRecordsMission.svelte')
            : import('./views/CheckoutMission.svelte');
    gamePreview.then(m => { GameMission = m.default; });
  }
  if (showReviewMode) {
    import('./views/ReviewMode.svelte').then(m => { ReviewMode = m.default; });
  }
</script>

<main class="qubix-university">
  {#if showFactoryMode}
    <svelte:component this={FactoryMode} />
  {:else if showStrataMigrationFactory}
    <svelte:component this={StrataMigrationFactory} />
  {:else if showPartsSheet}
    <svelte:component this={PartsSheet} />
  {:else if showExerciseFactory}
    <svelte:component this={ExerciseFactory} />
  {:else if showAssetShowcase}
    <svelte:component this={AssetShowcase} />
  {:else if showGameMission}
    <svelte:component this={GameMission} />
  {:else if showReviewMode}
    <svelte:component this={ReviewMode} />
  {:else if showWikiMode}
    <WikiMode />
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
