<script>
  import EvidenceWorkflowMission from '../lib/components/game/EvidenceWorkflowMission.svelte';
  import { HANDOVER_PACK_MISSION } from '../lib/game/handover-pack-mission.js';
</script>

<EvidenceWorkflowMission mission={HANDOVER_PACK_MISSION} slug="handover-pack"
  roomId="boardroom" roomName="Boardroom · Handover review" locationLabel="BOARDROOM ASSIGNMENT" chapter="07" />
