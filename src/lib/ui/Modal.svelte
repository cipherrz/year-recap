<script lang="ts">
  import { fade, scale } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';

  export let show = false;
  export let title = "ALERT";
  export let message = "";
  export let type: 'info' | 'danger' | 'meme' = 'info';
  export let buttons: Array<{text: string, onClick: () => void, variant?: 'primary' | 'danger' | 'meme'}> = [];

  function handleBackdropClick() {
    if (buttons.length === 0) {
      show = false;
    }
  }
</script>

{#if show}
  <div 
    class="fixed inset-0 z-[200] flex items-center justify-center p-4"
    transition:fade={{ duration: 200 }}
  >
    <!-- Backdrop -->
    <div 
      class="absolute inset-0 bg-black/80 backdrop-blur-sm"
      on:click={handleBackdropClick}
      on:keydown={(e) => e.key === 'Escape' && handleBackdropClick()}
      role="button"
      tabindex="-1"
    ></div>

    <!-- Modal -->
    <div 
      class="relative sys-card p-6 max-w-md w-full border-2 {type === 'danger' ? 'sys-border-danger' : type === 'meme' ? 'border-[rgb(var(--tangerine))]' : 'sys-border-cyan'}"
      transition:scale={{ duration: 300, easing: cubicOut, start: 0.8 }}
      style="box-shadow: 0 0 40px {type === 'danger' ? 'rgba(255,45,85,0.5)' : type === 'meme' ? 'rgba(255,159,28,0.5)' : 'rgba(0,229,255,0.5)'};"
    >
      <!-- Header -->
      <div class="flex justify-between items-center mb-4 pb-2 border-b {type === 'danger' ? 'sys-border-danger' : type === 'meme' ? 'border-[rgb(var(--tangerine))]' : 'sys-border-cyan'}">
        <span class="font-mono text-xs font-bold {type === 'danger' ? 'text-[rgb(var(--danger))]' : type === 'meme' ? 'text-[rgb(var(--tangerine))]' : 'text-[rgb(var(--cyan))]'}">
          {title}
        </span>
        <button 
          on:click={() => show = false} 
          class="text-[rgb(var(--text-dim))] hover:text-white text-xl leading-none"
        >
          ✕
        </button>
      </div>

      <!-- Content -->
      <div class="font-mono text-sm mb-6 text-[rgb(var(--text-main))]">
        {message}
      </div>

      <!-- Buttons -->
      {#if buttons.length > 0}
        <div class="flex gap-3 justify-end">
          {#each buttons as btn}
            <button 
              on:click={() => { btn.onClick(); show = false; }}
              class="px-4 py-2 text-xs font-bold {btn.variant === 'danger' ? 'btn-danger' : btn.variant === 'meme' ? 'btn-meme' : 'btn-primary'}"
            >
              {btn.text}
            </button>
          {/each}
        </div>
      {:else}
        <div class="flex justify-end">
          <button on:click={() => show = false} class="btn-primary px-6 py-2 text-xs font-bold">
            OK
          </button>
        </div>
      {/if}
    </div>
  </div>
{/if}
