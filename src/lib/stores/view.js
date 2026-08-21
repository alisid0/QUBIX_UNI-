import { writable } from 'svelte/store';

// Which learner surface is showing. The production root stays the Approver by
// founder decision, so this only ever switches between the home page and the
// lesson behind the learner-preview route.
export const view = writable('home');
