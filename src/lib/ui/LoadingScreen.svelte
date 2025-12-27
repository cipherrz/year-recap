<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  let loading = true;

  onMount(() => {
    // Hide after a short delay
    setTimeout(() => {
      loading = false;
    }, 1500);
  });
</script>

{#if loading}
  <div 
    class="fixed inset-0 z-[10000] bg-[rgb(var(--bg))] flex flex-col items-center justify-center"
    transition:fade={{ duration: 300 }}
  >
    <div class="text-center">
      <!-- Spinner -->
      <div class="inline-block w-16 h-16 border-4 border-[rgb(var(--text-log))] border-t-[rgb(var(--cyan))] rounded-full animate-spin mb-6"></div>
      
      <!-- Text -->
      <div class="font-mono text-[rgb(var(--text-dim))] text-sm animate-pulse">
        LOADING NEW_YEAR.exe...
      </div>
      
      <!-- Progress bar -->
      <div class="w-64 h-1 bg-[rgb(var(--bg-card))] mx-auto mt-4 overflow-hidden">
        <div class="h-full bg-[rgb(var(--cyan))] animate-[loading_1.5s_ease-in-out]"></div>
      </div>
    </div>
  </div>
{/if}

<style>
  @keyframes loading {
    0% { width: 0%; }
    100% { width: 100%; }
  }
</style>
