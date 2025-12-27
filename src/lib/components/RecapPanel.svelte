<script lang="ts">
  import Modal from '$lib/ui/Modal.svelte';
  
  let showModal = false;
  let modalMessage = '';

  function showReasons() {
    modalMessage = 'ПОТОМУ ЧТО.';
    showModal = true;
  }
</script>

<Modal bind:show={showModal} title="SYSTEM_ANALYSIS" message={modalMessage} type="meme" />

<section class="max-w-6xl mx-auto py-20 px-4">
  <div class="flex items-end gap-4 mb-8 border-b border-[rgba(124,77,255,0.3)] pb-2">
    <h2 class="text-2xl font-mono font-bold text-[rgb(var(--cyan))]">YEAR_LOGS</h2>
    <span class="font-mono text-xs text-[rgb(var(--text-log))] mb-1">/var/log/2025/summary</span>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <!-- Card 1 -->
    <div class="sys-card p-6 hover:translate-y-[-4px] transition-transform duration-300">
      <div class="text-[rgb(var(--text-dim))] text-xs font-mono mb-2">HAPPINESS_LEVEL</div>
      <div class="text-4xl font-bold text-[rgb(var(--primary))] mb-2">12%</div>
      <div class="text-xs text-[rgb(var(--cyan))] font-mono">[STABLE]</div>
    </div>
    
    <!-- Card 2 -->
    <div class="sys-card p-6 hover:translate-y-[-4px] transition-transform duration-300 border-l-2 sys-border-danger">
      <div class="text-[rgb(var(--text-dim))] text-xs font-mono mb-2">DEADLINES</div>
      <div class="text-4xl font-bold text-[rgb(var(--danger))] mb-2">999+</div>
      <div class="text-xs text-[rgb(var(--danger))] font-mono animate-pulse">CRITICAL OVERFLOW</div>
    </div>

    <!-- Card 3 -->
    <div class="sys-card p-6 hover:translate-y-[-4px] transition-transform duration-300">
      <div class="text-[rgb(var(--text-dim))] text-xs font-mono mb-2">TANGERINES_EATEN</div>
      <div class="text-4xl font-bold text-[rgb(var(--tangerine))] mb-2">YES</div>
      <div class="text-xs text-[rgb(var(--tangerine))] font-mono">VITAMIN_C_OVERDOSE</div>
    </div>

    <!-- Card 4 -->
    <div class="sys-card p-6 hover:translate-y-[-4px] transition-transform duration-300 opacity-60">
      <div class="text-[rgb(var(--text-dim))] text-xs font-mono mb-2">SLEEP_SCHEDULE</div>
      <div class="text-4xl font-bold text-[rgb(var(--text-log))] mb-2">404</div>
      <div class="text-xs text-[rgb(var(--text-dim))] font-mono">RESOURCE_NOT_FOUND</div>
    </div>
  </div>

  <div class="mt-8 text-center">
    <button 
      on:click={showReasons}
      class="text-[rgb(var(--text-dim))] hover:text-[rgb(var(--cyan))] text-sm font-mono underline decoration-dotted decoration-[rgb(var(--primary))]"
    >
      >> ПОКАЗАТЬ ПРИЧИНЫ
    </button>
  </div>
</section>
