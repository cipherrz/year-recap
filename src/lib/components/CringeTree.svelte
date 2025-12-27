<script lang="ts">
  import Modal from '$lib/ui/Modal.svelte';

  let showModal = false;
  let modalMessage = '';
  
  function toast(msg: string) {
    modalMessage = msg;
    showModal = true;
  }
</script>

<Modal bind:show={showModal} title="TREE_EVENT" message={modalMessage} type="meme" />

<section class="max-w-4xl mx-auto py-20 px-4 text-center">
  <div class="mb-12">
    <h2 class="text-2xl font-mono font-bold text-[rgb(var(--tangerine))] glow-orange">TREE_EMULATOR_V2.0</h2>
  </div>

  <!-- The Tree Structure (CSS + Grid) -->
  <div class="relative inline-flex flex-col items-center gap-4">
    <!-- Star -->
    <button 
      class="w-16 h-16 bg-[rgb(var(--danger))] rounded-full animate-pulse shadow-[0_0_30px_rgb(var(--danger))] text-2xl flex items-center justify-center hover:scale-110 transition-transform cursor-pointer z-10 font-bold"
      on:click={() => toast("2026 АКТИВИРОВАН СЛУЧАЙНО (шутка)")}
    >
      ★
    </button>

    <!-- Layers -->
    <div class="flex gap-4">
       <button on:click={() => toast("Получен: ПАКЕТ С ПАКЕТАМИ")} class="btn-meme w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-[0_0_15px_rgb(var(--tangerine))]">🎁</button>
    </div>

    <div class="flex gap-8">
       <button on:click={() => toast("Вы поскользнулись, но красиво")} class="btn-primary w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-[0_0_15px_rgb(var(--cyan))]">🧊</button>
       <button on:click={() => toast("+1 к радости, -1 к коже")} class="btn-meme w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-[0_0_15px_rgb(var(--tangerine))]">🍊</button>
    </div>

    <div class="flex gap-6">
       <button on:click={() => toast("ПОЛУЧЕН БАН ОТ ЖКХ")} class="btn-danger w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-[0_0_15px_rgb(var(--danger))]">🧨</button>
       <button on:click={() => toast("В носке дырка (классика)")} class="btn-primary w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-[0_0_15px_rgb(var(--primary))]">🧦</button>
       <button on:click={() => toast("Оливье кончился")} class="btn-primary w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-[0_0_15px_rgb(var(--primary))]">🥗</button>
    </div>

    <!-- Trunk -->
    <div class="w-8 h-24 bg-[rgb(var(--bg-card))] border border-[rgb(var(--text-log))]"></div>
    
    <!-- Tree Wireframe Overlay (Visual only) -->
    <div class="absolute inset-0 pointer-events-none border border-[rgb(var(--primary))] opacity-20 -m-8 clip-triangle"></div>
  </div>
</section>

<style>
  .clip-triangle {
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  }
  .glow-orange {
    text-shadow: 0 0 10px rgb(var(--tangerine));
  }
</style>
