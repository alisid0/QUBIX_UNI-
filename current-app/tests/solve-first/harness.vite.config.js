import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';
export default defineConfig({
  plugins: [svelte({ compilerOptions:{ dev:false } })],
  build: { lib: { entry: 'tests/solve-first/harness-entry.js', formats:['iife'], name:'H', fileName: () => 'h.js' },
    outDir: 'tests/solve-first/.out', emptyOutDir: true, minify: false }
});
