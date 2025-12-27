<script>
  import { triggerPanic } from '$lib/stores/panic';
</script>

<div class="fixed bottom-6 right-6 z-[100]">
  <button 
    on:click={triggerPanic}
    class="bg-[rgb(var(--danger))] text-white border-2 border-white px-2 py-12 rounded-lg font-bold shadow-[5px_5px_0_rgba(0,0,0,1)] hover:translate-y-[2px] hover:shadow-[3px_3px_0_rgba(0,0,0,1)] active:translate-y-[5px] active:shadow-none transition-all flex items-center justify-center writing-vertical-lr"
  >
    <span class="rotate-180 writing-mode-vertical text-xs tracking-widest whitespace-nowrap">
      🚨 СЛИШКОМ ПРАЗДНИЧНО
    </span>
  </button>
</div>

<style>
  .writing-vertical-lr {
    writing-mode: vertical-lr;
  }
</style>
