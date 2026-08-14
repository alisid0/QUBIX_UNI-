# Solve First integration record

Solve First is integrated into the canonical Qubix University application in
this repository. No second checkout or source repository is involved.

## Integrated components

The application includes the Solve First registry, assessment shell, subject
experiences, supporting evidence components, reward state, and Workshop Lab
entry points. The current implementations live under:

- `src/lib/content/solveFirst.js`
- `src/lib/components/assessments/`
- `src/lib/stores/progress.js`
- `src/views/WorkshopLab.svelte`

## Verification commands

From `current-app/`:

```bash
npm run test:solve-first
npm run build
```

Connected staging and production builds additionally require their environment
configuration. The default build uses the credential-free standalone mode.

## Deployment boundary

Only the Qubix University Vercel project may serve `qubix.university`. The
deployment script verifies the linked project before building or aliasing a
deployment. Pushing Git does not deploy production.
