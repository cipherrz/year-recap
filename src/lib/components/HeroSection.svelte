<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import Modal from '$lib/ui/Modal.svelte';
  import { triggerPanic } from '$lib/stores/panic';

  let progress = 0;
  let status = "ПОДОЗРИТЕЛЬНО ПРАЗДНИЧНЫЙ";
  let showPopup = false;
  let showModal = false;
  let modalConfig = { title: '', message: '', type: 'info' as 'info' | 'danger' | 'meme' };

  onMount(() => {
    // Fake progress loading
    const interval = setInterval(() => {
      if (progress < 99) {
        progress += Math.random() * 5;
        if (progress > 99) progress = 99;
      }
    }, 200);

    // Random popup trigger
    setTimeout(() => showPopup = true, 3000);

    return () => clearInterval(interval);
  });

  function handleLaunch() {
    modalConfig = {
      title: 'LAUNCH_FAILED',
      message: 'НЕ УДАЛОСЬ ЗАПУСТИТЬ: ВАС СЛИШКОМ МАЛО КОРМИЛИ МАНДАРИНАМИ',
      type: 'danger'
    };
    showModal = true;
  }

  function handlePostpone(e: MouseEvent) {
    const btn = e.target as HTMLButtonElement;
    const x = Math.random() * 200 - 100;
    const y = Math.random() * 200 - 100;
    btn.style.transform = `translate(${x}px, ${y}px)`;
    setTimeout(() => {
      btn.style.transform = 'translate(0, 0)';
    }, 500);
  }

  function handleAdult() {
    status = "СКУЧНЫЙ РЕЖИМ АКТИВИ... ОШИБКА";
    setTimeout(() => status = "ПОДОЗРИТЕЛЬНО ПРАЗДНИЧНЫЙ", 1500);
  }
</script>

<Modal bind:show={showModal} title={modalConfig.title} message={modalConfig.message} type={modalConfig.type} />

<section class="max-w-4xl mx-auto text-center py-20 relative">
  <div class="inline-block px-4 py-1 rounded border sys-border-cyan bg-[rgba(var(--cyan),0.1)] text-[rgb(var(--cyan))] text-xs font-mono mb-6 tracking-widest animate-pulse">
    STATUS: {status}
  </div>

  <h1 class="text-6xl md:text-8xl font-black mb-2 animate-glitch" data-text="NEW YEAR.exe">
    NEW YEAR.exe
  </h1>
  <div class="text-[rgb(var(--primary))] font-mono text-xl tracking-[0.5em] opacity-80 mb-12">
    // UNSTABLE BUILD
  </div>

  <!-- Progress Bar -->
  <div class="w-full max-w-lg mx-auto mb-16 relative">
    <div class="flex justify-between text-xs font-mono text-[rgb(var(--text-dim))] mb-2">
      <span>INSTALLING_2026...</span>
      <span class="text-[rgb(var(--danger))] fw-bold">99% (STUCK)</span>
    </div>
    <div class="h-4 bg-[rgb(var(--bg-card))] border border-[rgb(var(--text-log))] rounded-none relative overflow-hidden">
      <div 
        class="h-full bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--cyan))]" 
        style="width: {progress}%"
      >
        <div class="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]"></div>
      </div>
    </div>
  </div>

  <!-- Buttons -->
  <div class="flex flex-col md:flex-row gap-6 justify-center items-center flex-wrap">
    <button on:click={handleLaunch} class="btn-primary sys-btn px-8 py-4 text-lg font-bold tracking-wider rounded-none">
      [ ЗАПУСТИТЬ НОВЫЙ ГОД ]
    </button>

    <button on:mousedown={handlePostpone} class="btn-primary sys-btn px-6 py-4 text-sm font-mono opacity-80 rounded-none border-dashed hover:border-solid">
      ОТЛОЖИТЬ НА ЗАВТРА
    </button>

    <button on:click={handleAdult} class="btn-danger sys-btn px-6 py-4 text-sm font-mono rounded-none">
      Я УЖЕ ВЗРОСЛЫЙ
    </button>

    <button on:click={triggerPanic} class="btn-danger sys-btn px-6 py-4 text-sm font-mono rounded-none">
      🚨 СЛИШКОМ ПРАЗДНИЧНО
    </button>
  </div>

  {#if showPopup}
    <div 
      transition:fade
      class="fixed top-1/3 left-1/2 -translate-x-1/2 sys-card p-6 z-50 max-w-sm text-left border sys-border-danger shadow-[0_0_30px_rgba(255,45,85,0.3)]"
    >
      <div class="flex justify-between items-center mb-4 border-b sys-border-danger pb-2">
        <span class="text-[rgb(var(--danger))] font-mono text-xs font-bold">SECURITY ALERT</span>
        <button on:click={() => showPopup = false} class="text-[rgb(var(--text-dim))] hover:text-white">✕</button>
      </div>
      <p class="font-mono text-sm mb-6">
        Приложение "МАНДАРИНЫ" запрашивает доступ к вашему микрофону, чтобы слушать как вы едите.
      </p>
      <div class="flex gap-4 justify-end">
        <button on:click={() => showPopup = false} class="btn-danger px-4 py-2 text-xs font-bold">ЗАПРЕТИТЬ (НЕЛЬЗЯ)</button>
        <button on:click={() => showPopup = false} class="btn-primary px-4 py-2 text-xs font-bold">КОНЕЧНО</button>
      </div>
    </div>
  {/if}
</section>

<style>
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
</style>
