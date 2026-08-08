# Infrastructure Inheritance

## Vercel

Inherited:

- `vercel.json`
- Vite production build
- Vercel Analytics integration
- PWA assets and service worker

Not inherited:

- `.vercel/project.json`

The omitted file points at the existing Strata Vercel project. Copying it could deploy this new application over the old product. Create and link a new Vercel project to this repository, then add the `qubix.university` domain deliberately.

## Supabase

Inherited for review:

- `supabase/schema.sql`
- `supabase/seed.sql`
- existing migrations

These files are reference infrastructure from Strata. Do not apply them to a new or live database until their tables, policies and storage rules have been audited against the new curriculum model.

The app expects these environment variables when Supabase is activated:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

No service-role key belongs in the app, repository or Vercel client environment.
