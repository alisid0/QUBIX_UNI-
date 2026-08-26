const options = rows => Object.freeze(rows.map(row => Object.freeze(row)));
const freezeCase = value => Object.freeze({
  ...value,
  facts: options(value.facts),
  riskOptions: options(value.riskOptions),
  repairOptions: options(value.repairOptions),
  readinessOptions: options(value.readinessOptions)
});

export const HANDOVER_PACK_MISSION = Object.freeze({
  id: 'MISSION 108', status: 'AI_DRAFT', role: 'ANALYST', title: 'The Handover Pack',
  competency: 'Audit an analytical handover for identifiable inputs, versioned method, environment, checks and a runnable entry point.',
  summaryKey: 'readiness',
  steps: Object.freeze([
    Object.freeze({ key: 'risk', label: 'Expose', question: 'What breaks an independent rerun?', theory: 'Find the step whose input, method or environment exists only in one person’s memory or machine.' }),
    Object.freeze({ key: 'repair', label: 'Repair', question: 'What makes that step reproducible?', theory: 'Prefer an identifiable input, versioned code, documented environment and automated check over a promise to remember.' }),
    Object.freeze({ key: 'readiness', label: 'Handover', question: 'Is this pack ready for another analyst?', theory: 'Ready means a second person can run and check it. A result that exists today is not automatically a handover.' })
  ]),
  sources: Object.freeze([
    Object.freeze({ label: 'Government Analysis Function — RAP strategy', url: 'https://analysisfunction.civilservice.gov.uk/policy-store/reproducible-analytical-pipelines-strategy/', licence: 'Open Government Licence 3.0' }),
    Object.freeze({ label: 'Government Analysis Function — RAP learning pathway', url: 'https://analysisfunction.civilservice.gov.uk/learning-development/learning-pathways/reproducible-analytical-pipelines-rap-learning-pathway/', licence: 'Open Government Licence 3.0' })
  ]),
  cases: Object.freeze([
    freezeCase({
      id: 'pasted-workbook', title: 'The pasted board workbook',
      brief: 'The visible workbook refreshes, but its headline totals arrive by copy-and-paste from a file that only one analyst holds.',
      facts: [
        ['Deliverable', 'board_sales_pack.xlsx'],
        ['Run instruction', 'Open the workbook and refresh the pivots'],
        ['Hidden step', 'Weekly totals are pasted from an analyst’s local workbook'],
        ['Evidence retained', 'No source snapshot or transformation log']
      ],
      risk: 'hidden-manual',
      riskOptions: [
        ['hidden-manual', 'The decisive transformation is outside the pack', 'the refresh begins after the totals were made'],
        ['font', 'The workbook uses the wrong typeface', 'appearance does not explain reproducibility'],
        ['size', 'The workbook is too small to audit', 'file size is not the missing evidence']
      ],
      riskWhy: 'Another analyst can repeat the pivots but cannot establish how the pasted totals were produced.',
      repair: 'pipeline',
      repairOptions: [
        ['memo', 'Ask the analyst to remember the paste each week', 'memory remains the dependency'],
        ['pipeline', 'Version the source snapshot and encode the transformation before the workbook refresh', 'moves the hidden step into the run'],
        ['protect', 'Password-protect the pasted cells', 'that makes the method less inspectable']
      ],
      repairWhy: 'An identifiable input and versioned transformation make the complete calculation available to the next runner.',
      readiness: 'blocked',
      readinessOptions: [
        ['ready', 'Ready: the workbook opens without an error.', 'opening is not rerunning'],
        ['informal', 'Ready if the original analyst stays available.', 'a person is still the undocumented environment'],
        ['blocked', 'Not ready until the source and transformation enter the pack and pass a control-total check.', 'states the missing contract']
      ],
      readinessWhy: 'The deliverable exists, but the process that produced its most important values cannot be independently run or checked.'
    }),
    freezeCase({
      id: 'local-path', title: 'The script tied to one laptop',
      brief: 'The calculation is coded, but it names an absolute desktop path and depends on whatever package versions happen to be installed.',
      facts: [
        ['Entry point', 'python report.py'],
        ['Input path', 'C:\\Users\\Mina\\Desktop\\final_final.csv'],
        ['Environment', 'No dependency file'],
        ['Code state', 'Attached by email; no commit identifier']
      ],
      risk: 'environment',
      riskOptions: [
        ['syntax', 'Python cannot read CSV files', 'it can; the path and environment are the issue'],
        ['environment', 'The run depends on one filesystem and an unknown environment', 'both differ on a second machine'],
        ['chart', 'The output needs an additional chart', 'that is unrelated to rerunning']
      ],
      riskWhy: 'The code may be visible, but its input location, package behaviour and exact version are not portable or identifiable.',
      repair: 'parameterise',
      repairOptions: [
        ['rename', 'Rename the file final_final_v2.csv', 'a filename is not provenance'],
        ['screenshot', 'Send a screenshot of the installed packages', 'it cannot recreate the environment reliably'],
        ['parameterise', 'Parameterise the input, identify the snapshot, pin dependencies and record the code commit', 'makes each moving part explicit']
      ],
      repairWhy: 'A run command can then point to a shared snapshot under a known code and environment version.',
      readiness: 'conditional',
      readinessOptions: [
        ['conditional', 'Conditionally ready after a peer runs it in a clean environment and the expected checks pass.', 'tests the repair rather than assuming it'],
        ['ready-now', 'Ready now because the author ran it once.', 'that tests only the author’s machine'],
        ['discard', 'Discard all code and rebuild manually.', 'the code is salvageable with a portable contract']
      ],
      readinessWhy: 'The pack becomes credible when a clean-environment run demonstrates that the documented contract is sufficient.'
    }),
    freezeCase({
      id: 'clean-run', title: 'The independently runnable pack',
      brief: 'A repository identifies its input snapshot, commit, dependency lock, one run command and automated row-count and total checks.',
      facts: [
        ['Input', 'sales_2026-07.parquet · SHA256 recorded'],
        ['Method', 'Git commit 8b71c2e · dependency lock committed'],
        ['Run', 'python -m monthly_sales --period 2026-07'],
        ['Checks', '42 branch rows · ledger reconciliation · NULL profile']
      ],
      risk: 'residual',
      riskOptions: [
        ['none-ever', 'No future risk is possible', 'every process still has limits and dependencies'],
        ['manual-paste', 'A hidden manual paste creates the result', 'the stated pipeline contains no such step'],
        ['residual', 'Access to the governed input remains an operational dependency', 'a real limitation can remain even in a strong pack']
      ],
      riskWhy: 'The analytical method is well specified. A future runner still needs authorised access to the identified source snapshot.',
      repair: 'peer-run',
      repairOptions: [
        ['peer-run', 'Have a second analyst run from the README and compare the recorded checks', 'tests the handover contract end to end'],
        ['remove-hash', 'Delete the input hash to simplify the README', 'that weakens input identity'],
        ['copy-result', 'Send only the finished workbook', 'that discards the reproducible pack']
      ],
      repairWhy: 'An independent run is evidence that the documentation, environment and checks work outside the author’s context.',
      readiness: 'ready',
      readinessOptions: [
        ['overdocumented', 'Not ready because it contains too much evidence.', 'evidence is the purpose of the pack'],
        ['ready', 'Ready after the peer run passes; retain the run log and access note.', 'the contract and its test are both present'],
        ['author-only', 'Ready only for the original author.', 'the pack is specifically designed for another runner']
      ],
      readinessWhy: 'The pack identifies inputs, method and environment, supplies one entry point and produces testable expectations.'
    }),
    freezeCase({
      id: 'scheduled-dashboard', title: 'The silent scheduled dashboard',
      brief: 'A scheduled job refreshes every morning, but credentials are renewed manually and failures leave no log or alert.',
      facts: [
        ['Schedule', '06:00 daily refresh'],
        ['Credentials', 'Personal token renewed by one analyst'],
        ['Failure evidence', 'No retained log and no alert'],
        ['Output check', 'Dashboard timestamp only']
      ],
      risk: 'operations',
      riskOptions: [
        ['operations', 'A personal credential and silent failure path make the run person-dependent', 'automation can still hide manual ownership'],
        ['too-fast', 'The schedule runs too early in the morning', 'timing is not the stated failure'],
        ['colour', 'The dashboard colour palette is inaccessible', 'important, but not the handover fault in this case']
      ],
      riskWhy: 'The job can stop when the analyst is absent or the token expires, and nobody has evidence of where or why it failed.',
      repair: 'service-and-log',
      repairOptions: [
        ['refresh-twice', 'Run the same silent job twice each morning', 'duplicates the uncertainty'],
        ['timestamp', 'Make the dashboard timestamp larger', 'it does not identify failed steps'],
        ['service-and-log', 'Use an owned service credential, retain step logs, alert failures and test output invariants', 'turns hidden operation into shared evidence']
      ],
      repairWhy: 'Ownership, logging and alerts make the automated run observable and maintainable beyond one analyst.',
      readiness: 'not-ready',
      readinessOptions: [
        ['ready', 'Ready because the dashboard refreshed today.', 'one success does not remove the hidden dependency'],
        ['not-ready', 'Not ready until credentials, failure handling and output checks have shared ownership.', 'names the operational contract still missing'],
        ['manual', 'Ready if somebody watches the screen at 06:00.', 'that recreates a manual dependency']
      ],
      readinessWhy: 'Reproducibility includes operational inputs and evidence. A schedule alone does not make a pipeline independently maintainable.'
    })
  ])
});
