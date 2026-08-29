import { defineConfig, loadEnv } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { readFileSync } from 'node:fs';

function readProductionSupabaseUrl() {
  try {
    const contents = readFileSync(new URL('./.env.production', import.meta.url), 'utf8');
    const line = contents.split(/\r?\n/).find((entry) => entry.startsWith('VITE_SUPABASE_URL='));
    return line?.slice('VITE_SUPABASE_URL='.length).trim().replace(/^['"]|['"]$/g, '');
  } catch (_) {
    return '';
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const productionSupabaseUrl = readProductionSupabaseUrl();
  const appEnvironment = env.VITE_APP_ENV || mode;
  const supabaseUrl = env.VITE_SUPABASE_URL?.trim();
  const supabaseKey = env.VITE_SUPABASE_ANON_KEY?.trim();

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      `[Qubix environment] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY for "${mode}". ` +
      `Copy .env.${mode}.example to .env.${mode}.local and add that environment's Supabase credentials.`
    );
  }

  if (mode === 'staging' && appEnvironment !== 'staging') {
    throw new Error('[Qubix environment] A staging build must set VITE_APP_ENV=staging.');
  }

  if (
    mode === 'staging' &&
    productionSupabaseUrl &&
    supabaseUrl === productionSupabaseUrl
  ) {
    throw new Error(
      '[Qubix environment] Refusing to build staging with the production Supabase project. ' +
      'Use a separate staging project in .env.staging.local or Vercel Preview variables.'
    );
  }

  const environmentPlugin = {
    name: 'qubix-environment-html',
    transformIndexHtml(html) {
      if (appEnvironment === 'production') return html;
      return html
        .replace('<meta name="robots" content="index, follow">', '<meta name="robots" content="noindex, nofollow">')
        .replace('<title>Qubix', `<title>[${appEnvironment.toUpperCase()}] Qubix`);
    }
  };

  return {
    plugins: [svelte(), environmentPlugin],
    build: {
      outDir: 'dist',
      assetsInlineLimit: 0,
      rollupOptions: {
        output: {
          manualChunks: {
            deck: ['./src/lib/content/deck.js'],
            quiz: ['./src/lib/content/questions.js']
          }
        }
      }
    },
    server: {
      port: 8000
    }
  };
});
