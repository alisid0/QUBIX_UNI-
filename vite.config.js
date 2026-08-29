import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  // The site itself is served from the root. The Pages mirror is served from a
  // repository subpath, so it builds with VITE_BASE set and nothing else moves.
  base: process.env.VITE_BASE || '/',
  plugins: [svelte()],
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0
  },
  server: {
    port: 8000
  }
});
