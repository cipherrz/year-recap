<script lang="ts">
  import { panicMode, panicCountdown } from '$lib/stores/panic';
  import { fade } from 'svelte/transition';
</script>

{#if $panicMode}
  <div 
    class="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center"
    transition:fade={{ duration: 300 }}
  >
    <h1 class="text-6xl font-serif text-black mb-8">
      С новым годом.
    </h1>
    <p class="text-lg text-black opacity-50 font-serif">
      возврат в режим праздника через {$panicCountdown} {$panicCountdown === 1 ? 'секунду' : $panicCountdown < 5 ? 'секунды' : 'секунд'}
    </p>
  </div>
{/if}

<style>
  h1 {
    font-family: 'Times New Roman', Times, serif;
  }
  p {
    font-family: 'Times New Roman', Times, serif;
  }
</style>
