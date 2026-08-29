import { svelte } from '@sveltejs/vite-plugin-svelte';
export default {
  plugins: [svelte({ compilerOptions: { dev: true } })],
  build: { outDir: 'tests/arcade/.out', emptyOutDir: true, lib: { entry: 'tests/arcade/entry.js', formats: ['iife'], name: 'harness', fileName: () => 'bundle.js' }, minify: false }
};
