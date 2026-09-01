<script>
  import { onMount } from 'svelte';
  import ChangeLab from './views/ChangeLab.svelte';
  import Home from './views/Home.svelte';
  import WikiMode from './views/WikiMode.svelte';
  import { view } from './lib/stores/view.js';
  import { cleanPathForParams, installCleanLinkRewriter, paramsForLocation } from './lib/routes/clean-paths.js';

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
  // The data console: the first surface where a learner's SQL actually runs,
  // against the real 54-table Superstore. Lazy, and opt-in by URL, because it
  // pulls sql.js and an 11 MB database that no reader should ever download.
  let DataConsole = null;
  // One DSA read + do BB for founder review. It is deliberately isolated from
  // the learner mission roster until its teaching pattern and placement pass review.
  let DsaSequencePreview = null;
  let DsaArrayInsertionPreview = null;
  let DsaIntroductionPreview = null;
  let DsaArrayGrowthPreview = null;
  let Showcase = null;
  let ShowcaseDemo = null;

  const params = paramsForLocation(window.location);
  const cleanLocation = cleanPathForParams(params);
  if (cleanLocation && `${window.location.pathname}${window.location.search}` !== cleanLocation) {
    history.replaceState({}, '', cleanLocation);
  }

  onMount(() => {
    return installCleanLinkRewriter(document.getElementById('app'));
  });
  const explicitLearnerPreview = ['variables-and-rates', 'change-lab'].includes(params.get('prototype')) || params.get('mode') === 'learner';
  const explicitReviewMode = params.get('mode') === 'review';
  const showWikiMode = params.get('mode') === 'wiki';
  // The learning floor: what to do next, ahead of the whole curriculum.
  // The bare path is the learning floor, in every environment, so what is
  // tested is what ships. It used to be the foundations landing, which sold the
  // course and then offered nine Superstore rooms as the way in. The rooms were
  // a second navigation competing with the pairs, and the pair is the way to
  // the play. The old landing keeps its own route at /learn/foundations.
  const bareLanding = !params.has('mode') && !params.has('prototype') && !params.has('lab');
  const showLearningFloor = params.get('mode') === 'start' || bareLanding;
  const showDataConsole = params.get('lab') === 'sql';
  // Factory and other authoring tools stay workshop-only. They are drafts, not
  // curriculum, and must not be reachable in a production build.
  const workshop = !import.meta.env.PROD || import.meta.env.VITE_WORKSHOP === '1';
  const showFactoryMode = params.get('mode') === 'factory' && workshop;
  const showStrataMigrationFactory = params.get('mode') === 'strata-factory' && workshop;
  const showPartsSheet = params.get('mode') === 'parts' && workshop;
  const showExerciseFactory = params.get('mode') === 'exercises' && workshop;
  const showAssetShowcase = params.get('mode') === 'assets' && workshop;
  // Founder-approved DSA samples are reachable by URL on the live site. They
  // stay off the learner roster and are not marked RELEASED.
  const showDsaSequencePreview = params.get('mode') === 'dsa-sequence-preview';
  const showDsaArrayInsertionPreview = params.get('mode') === 'dsa-array-insertion-preview';
  const showDsaIntroductionPreview = params.get('mode') === 'dsa-introduction-preview';
  const showDsaArrayGrowthPreview = params.get('mode') === 'dsa-array-growth-preview';
  const showShowcase = params.get('mode') === 'showcase';
  const showShowcaseDemo = params.get('mode') === 'showcase-demo';
  // The academy ships. Factory tools above do not: they are internal
  // workbenches. Approved DSA samples are URL-only and stay unrostered.
  const showGameMission = params.get('mode') === 'game';
  // The Approver is now reached only by asking for it. It used to be what
  // production served by default, from when the deployed site existed to be
  // reviewed rather than used, so anyone opening the site got a review form
  // instead of the course. Founder decision of 2026-08-10 to put the pilot live.
  const showReviewMode = explicitReviewMode;

  let LearningFloor = null;
  if (showLearningFloor) {
    import('./views/LearningFloor.svelte').then(m => { LearningFloor = m.default; });
  }
  if (showFactoryMode) {
    import('./views/FactoryMode.svelte').then(m => { FactoryMode = m.default; });
  }
  if (showDataConsole) {
    import('./views/DataConsole.svelte').then(m => { DataConsole = m.default; });
  }
  if (showDsaSequencePreview) {
    import('./views/DsaSequencePreview.svelte').then(m => { DsaSequencePreview = m.default; });
  }
  if (showDsaArrayInsertionPreview) {
    import('./views/DsaArrayInsertionPreview.svelte').then(m => { DsaArrayInsertionPreview = m.default; });
  }
  if (showDsaIntroductionPreview) {
    import('./views/DsaIntroductionPreview.svelte').then(m => { DsaIntroductionPreview = m.default; });
  }
  if (showDsaArrayGrowthPreview) {
    import('./views/DsaArrayGrowthPreview.svelte').then(m => { DsaArrayGrowthPreview = m.default; });
  }
  if (showShowcase) {
    import('./views/Showcase.svelte').then(m => { Showcase = m.default; });
  }
  if (showShowcaseDemo) {
    import('./views/ShowcaseDemo.svelte').then(m => { ShowcaseDemo = m.default; });
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
    const assetPreview = params.get('asset') === 'computer-screen'
      ? import('./views/MissionOperationsStudio.svelte')
      : params.get('asset') === 'world'
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
    const requestedMission = params.get('mission') || (productionFoundationLanding ? 'foundations' : null);

    async function loadGamePreview() {
      let mission = requestedMission;
      const { MISSIONS, load, missionIsOpen } = await import('./lib/game/progress.js');
      const rostered = MISSIONS.some(item => item.slug === mission);

      // The academy already labels later missions as locked. Apply the same
      // rule to direct URLs instead of letting a copied link bypass the path.
      // Production keeps the learning sequence honest. Local authoring needs
      // every mission directly reachable so layout and interaction QA does not
      // require completing the whole course before each review.
      const showcasePreview = params.get('showcase') === '1'
        && ['read-the-table', 'distribution-desk', 'sql-console', 'data-visualization', 'analyst-desk'].includes(mission);
      if (import.meta.env.PROD && rostered && !showcasePreview && !missionIsOpen(load(), mission)) {
        window.history.replaceState(null, '', `?mode=game&locked=${encodeURIComponent(mission)}`);
        mission = null;
      }

      // Keep each dynamic import in its own branch. A nested conditional caused
      // Vite to preload GameHub.css for every mission, leaving the selected
      // mission's component mounted without its stylesheet in production.
      if (mission === 'store') {
        return import('./views/StoreMap.svelte');
      } else if (mission === 'rate-desk') {
        return import('./views/RateDeskMission.svelte');
      } else if (mission === 'python-trace') {
        return import('./views/PythonTraceMission.svelte');
      } else if (mission === 'data-visualization') {
        return import('./views/DataVisualizationMission.svelte');
      } else if (mission === 'distribution-desk') {
        return import('./views/DistributionDeskMission.svelte');
      } else if (mission === 'sampling-desk') {
        return import('./views/SamplingDeskMission.svelte');
      } else if (mission === 'sql-console') {
        return import('./views/SqlConsoleMission.svelte');
      } else if (mission === 'result-checkpoint') {
        return import('./views/ResultCheckpointMission.svelte');
      } else if (mission === 'analyst-desk') {
        return import('./views/AnalystDeskMission.svelte');
      } else if (mission === 'handover-pack') {
        return import('./views/HandoverPackMission.svelte');
      } else if (mission === 'foundations') {
        return import('./views/RoleFoundations.svelte');
      } else if (mission === 'shared-book') {
        return import('./views/SharedFoundationsBook.svelte');
      } else if (mission === 'role-game') {
        return import('./views/RoleGameHub.svelte');
      } else if (mission === 'campaign') {
        return import('./views/DataQualityCampaign.svelte');
      } else if (mission === 'units-measurement') {
        return import('./views/UnitsMeasurementMission.svelte');
      } else if (mission === 'data-lineage') {
        return import('./views/DataLineageMission.svelte');
      } else if (!mission) {
        return import('./views/GameHub.svelte');
      } else if (mission === 'join-grain') {
        return import('./views/JoinGrainMission.svelte');
      } else if (mission === 'region-grain') {
        return import('./views/RegionGrainMission.svelte');
      } else if (mission === 'zone-price') {
        return import('./views/ZonePriceMission.svelte');
      } else if (mission === 'uom') {
        return import('./views/UomMission.svelte');
      } else if (mission === 'classify-data') {
        return import('./views/DataClassificationMission.svelte');
      } else if (mission === 'read-the-table') {
        return import('./views/ReadTheTableMission.svelte');
      } else if (mission === 'missing-data') {
        return import('./views/MissingDataMission.svelte');
      } else if (mission === 'table-grain') {
        return import('./views/TableGrainMission.svelte');
      } else if (mission === 'duplicate-records') {
        return import('./views/DuplicateRecordsMission.svelte');
      } else if (mission === 'checkout') {
        return import('./views/CheckoutMission.svelte');
      }

      // Anything unrecognised opens the first mission rather than nothing.
      return import('./views/CheckoutMission.svelte');
    }

    loadGamePreview().then(m => { GameMission = m.default; });
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
  {:else if showDataConsole}
    <svelte:component this={DataConsole} />
  {:else if showDsaSequencePreview}
    <svelte:component this={DsaSequencePreview} />
  {:else if showDsaArrayInsertionPreview}
    <svelte:component this={DsaArrayInsertionPreview} />
  {:else if showDsaIntroductionPreview}
    <svelte:component this={DsaIntroductionPreview} />
  {:else if showDsaArrayGrowthPreview}
    <svelte:component this={DsaArrayGrowthPreview} />
  {:else if showShowcase}
    <svelte:component this={Showcase} />
  {:else if showShowcaseDemo}
    <svelte:component this={ShowcaseDemo} />
  {:else if showGameMission}
    <svelte:component this={GameMission} />
  {:else if showReviewMode}
    <svelte:component this={ReviewMode} />
  {:else if showLearningFloor}
    <svelte:component this={LearningFloor} stage={params.get('stage')} />
  {:else if showWikiMode}
    <WikiMode />
  {:else if explicitLearnerPreview || $view === 'lesson'}
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
