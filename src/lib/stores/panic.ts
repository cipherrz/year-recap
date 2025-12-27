import { writable } from 'svelte/store';

export const panicMode = writable(false);
export const panicCountdown = writable(4);

export function triggerPanic() {
    console.log('🚨 PANIC MODE TRIGGERED!');
    panicMode.set(true);
    panicCountdown.set(4);

    // Countdown timer
    const interval = setInterval(() => {
        panicCountdown.update(n => {
            if (n <= 1) {
                clearInterval(interval);
                return 0;
            }
            return n - 1;
        });
    }, 1000);

    // Revert after 4 seconds
    setTimeout(() => {
        console.log('✅ PANIC MODE REVERTED');
        panicMode.set(false);
    }, 4000);
}
