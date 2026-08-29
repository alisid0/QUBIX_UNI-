import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
});

// Removed in migration 0005: fetchCards, fetchProgress, recordBoardProgress,
// and recordQuizResult. All four had zero callers.
//
//  - fetchCards queried the whole `cards` table; dynamicBoards.js now fetches
//    by sort_order on demand.
//  - fetchProgress/recordBoardProgress wrote to public.progress, superseded by
//    user_board_progress/user_path_progress in migration 0004. Its state check
//    constraint no longer matched the six states in PATHS.md.
//  - recordQuizResult wrote to `quiz_results`, a table never defined in any
//    migration. The live equivalent is progress.recordQuizResult() in
//    src/lib/stores/progress.js, which writes to user_quiz_attempts.

/**
 * Permanently delete the signed-in user's account.
 *
 * Removes learning data, issue reports, screenshots, and the profile row via
 * delete_my_user_data(), then deletes the Supabase Auth identity. The identity
 * step needs the service-role key, so it runs in the `delete-account` Edge
 * Function rather than here.
 *
 * @param {string} confirmation must be exactly "DELETE MY ACCOUNT"
 * @returns {Promise<{ok: true}>}
 */
export async function deleteAccount(confirmation) {
  const { data: sessionData } = await supabase.auth.getSession();
  const token = sessionData?.session?.access_token;
  if (!token) throw new Error('You must be signed in to delete your account.');

  const response = await fetch(
    `${SUPABASE_URL}/functions/v1/delete-account`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ confirm: confirmation })
    }
  );

  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(result.error || 'Account deletion failed.');
  }

  await supabase.auth.signOut();
  return result;
}

/**
 * Export everything Qubix holds about the signed-in user as a JSON document.
 * Backs the UK GDPR data-request route.
 */
export async function exportMyData() {
  const { data, error } = await supabase.rpc('export_my_user_data');
  if (error) throw error;
  return data;
}
