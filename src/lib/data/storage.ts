import { browser } from '$app/environment';
import type { RecapData } from './schema';

const KEY = 'year-recap:data:v1';

export function loadRecap(): RecapData | null {
  if (!browser) return null;

  const raw = window.localStorage.getItem(KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as RecapData;
  } catch {
    return null;
  }
}

export function saveRecap(data: RecapData) {
  if (!browser) return;
  window.localStorage.setItem(KEY, JSON.stringify(data));
}

export function clearRecap() {
  if (!browser) return;
  window.localStorage.removeItem(KEY);
}
