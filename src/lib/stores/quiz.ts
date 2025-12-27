import { writable } from 'svelte/store';

export const quizCompleted = writable(false);
export const quizResult = writable<string>('');
export const isEasterEgg = writable(false);
