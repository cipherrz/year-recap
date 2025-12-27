<script lang="ts">
  import { page } from '$app/stores';
  import { base } from '$app/paths';
</script>

<div class="fixed inset-0 flex items-center justify-center p-4">
  <div class="max-w-lg w-full text-center">
    <h1 class="text-8xl font-black mb-4 animate-glitch text-[rgb(var(--danger))]" data-text="404">
      404
    </h1>
    
    <div class="sys-card p-8 border sys-border-danger">
      <div class="text-xl font-mono mb-6 text-[rgb(var(--danger))]">
        CRITICAL_ERROR: PAGE_NOT_FOUND
      </div>
      
      <p class="text-[rgb(var(--text-dim))] font-mono mb-8">
        Указанный путь <span class="text-white">{$page.url.pathname}</span> не существует в текущей временной линии.
      </p>

      <a 
        href="{base}/" 
        class="inline-block btn-primary sys-btn px-8 py-3 text-sm"
      >
        ВЕРНУТЬСЯ НА БАЗУ
      </a>
    </div>
  </div>
</div>
