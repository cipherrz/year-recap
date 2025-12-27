<script lang="ts">
  import { page } from '$app/stores';
</script>

<div class="min-h-screen flex flex-col items-center justify-center px-4 text-center">
  <div class="sys-card p-12 max-w-2xl border-2 sys-border-danger relative">
    <!-- Error indicator -->
    <div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-[rgb(var(--danger))] text-white px-6 py-2 font-mono text-xs font-bold animate-pulse">
      ERROR {$page.status}
    </div>

    <div class="text-[rgb(var(--danger))] text-8xl font-black mb-4 font-mono animate-glitch" data-text="404">
      404
    </div>
    
    <h1 class="text-3xl font-bold text-[rgb(var(--text-main))] mb-4 font-mono">
      СТРАНИЦА НЕ НАЙДЕНА
    </h1>
    
    <p class="text-[rgb(var(--text-dim))] font-mono mb-2">
      > SYSTEM_ERROR: Запрошенный путь не существует
    </p>
    <p class="text-[rgb(var(--text-log))] font-mono text-sm mb-8">
      {$page.url.pathname || '/unknown'}
    </p>

    <div class="space-y-4">
      <a 
        href="/" 
        class="inline-block btn-primary sys-btn px-8 py-4 text-lg font-bold font-mono"
      >
        [ ВЕРНУТЬСЯ НА БАЗУ ]
      </a>
      
      <div class="text-xs text-[rgb(var(--text-log))] font-mono mt-6">
        Возможно, вы искали что-то, чего никогда не существовало...<br/>
        Или это всё сломалось. Как обычно.
      </div>
    </div>
  </div>
</div>
