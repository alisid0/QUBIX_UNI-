<script>
  import { paramsForLocation } from '../lib/routes/clean-paths.js';
  import StudyLobby from './StudyLobby.svelte';
  import StudyRoom from './StudyRoom.svelte';

  const params = paramsForLocation(window.location);
  const code = params.get('room');
  const joinExtras = {
    intent: params.get('intent') || undefined,
    atomId: params.get('atom') || undefined,
    band: params.get('band') || undefined,
    kind: params.get('kind') || undefined
  };
</script>

{#if code}
  <StudyRoom {code} {joinExtras} />
{:else}
  <StudyLobby
    initialAtomId={params.get('atom') || undefined}
    initialIntent={params.get('intent') || undefined}
  />
{/if}
