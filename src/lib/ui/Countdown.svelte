<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  const targetDate = new Date('2026-01-01T00:00:00');
  let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  let interval: ReturnType<typeof setInterval>;

  function updateTimer() {
    const now = new Date();
    const diff = targetDate.getTime() - now.getTime();

    if (diff <= 0) {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
      clearInterval(interval);
      return;
    }

    timeLeft = {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60)
    };
  }

  onMount(() => {
    updateTimer();
    interval = setInterval(updateTimer, 1000);
  });

  onDestroy(() => clearInterval(interval));
</script>

<div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-12 mb-8">
  {#each Object.entries(timeLeft) as [unit, value]}
    <div class="flex flex-col items-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 min-w-[100px] animate-float hover:scale-105 transition-transform duration-300">
      <span class="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 font-mono">
        {value.toString().padStart(2, '0')}
      </span>
      <span class="text-xs md:text-sm uppercase tracking-widest text-cyan-300 mt-2">
        {#if unit === 'days'}Дней
        {:else if unit === 'hours'}Часов
        {:else if unit === 'minutes'}Минут
        {:else}Секунд{/if}
      </span>
    </div>
  {/each}
</div>
