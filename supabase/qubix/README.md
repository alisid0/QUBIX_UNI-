# Qubix Supabase schema

These migrations belong to the dedicated `Qubix Production` project. They are
separate from the inherited Strata reference files one directory above. The
production project already contains the audited `user_*` learning tables; this
folder records only subsequent Qubix-specific additions.

Apply files in numeric order only after reviewing the target project reference.
The production project currently expected by the app is:

- Project name: `Qubix Production`
- Project reference: `wmetdmfsniqrshuaoodc`
- Region: `eu-west-2` (London)

Never put the database password or service-role key in this repository. Client
code may receive only the project URL and public publishable/anonymous key.
