import globals from 'globals';
import svelte from 'eslint-plugin-svelte';

// The static analysis this repository never had.
//
// Forty guard scripts read the source and check what it says. None of them
// checked that it runs. On 2026-09-01 a commit removed the definition of
// productionFoundationLanding and left one use behind; /academy answered 200,
// painted the shell, threw a ReferenceError and rendered an empty page. It
// stayed broken for two days and every guard passed the whole time.
//
// no-undef is one line of configuration and would have failed that build
// before it ever deployed. The rest of this file exists to make that one rule
// trustworthy: real browser and node globals rather than a hand-kept list,
// because a rule with false positives is a rule people learn to skip.
export default [
  ...svelte.configs['flat/base'],
  {
    files: ['src/**/*.js', 'src/**/*.svelte', 'api/**/*.js', 'scripts/**/*.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node, ...globals.serviceworker }
    },
    rules: {
      'no-undef': 'error',
      // The other two that fail at runtime rather than in review.
      'no-dupe-keys': 'error',
      'no-unreachable': 'error'
    }
  },
  { ignores: ['dist/**', 'current-app/**', 'node_modules/**', 'public/**', 'book/dist/**', 'android/**', 'ios/**'] }
];
