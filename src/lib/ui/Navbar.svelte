<script lang="ts">
  import { page } from '$app/stores';
  import { base } from '$app/paths';
</script>

<nav class="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4 bg-black/60 backdrop-blur-md border-b border-white/5">
  <a href="{base}/" class="text-xl font-bold tracking-[0.2em] font-mono text-transparent bg-clip-text bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--cyan))] hover:opacity-80 transition-opacity animate-glitch" data-text="NEW YEAR.exe">
    NEW YEAR.exe
  </a>

  <div class="flex gap-6 font-mono text-sm">
    <a href="{base}/" class="uppercase tracking-widest hover:text-[rgb(var(--cyan))] transition-colors {$page.url.pathname === base || $page.url.pathname === base + '/' ? 'text-[rgb(var(--cyan))] text-shadow-glow' : 'text-slate-400'}">
      [HOME]
    </a>
  </div>
</nav>

<style>
  .text-shadow-glow {
    text-shadow: 0 0 10px rgba(var(--cyan), 0.5);
  }
</style>
