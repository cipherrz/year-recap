<script lang="ts">
  import '../app.css';
  import Navbar from '$lib/ui/Navbar.svelte';
  import InteractionHandler from '$lib/ui/InteractionHandler.svelte';
  import SnowCanvas from '$lib/ui/SnowCanvas.svelte';
  import PanicOverlay from '$lib/ui/PanicOverlay.svelte';
  import LoadingScreen from '$lib/ui/LoadingScreen.svelte';
  import { page } from '$app/stores';
  import { base } from '$app/paths';
  import { fly } from 'svelte/transition';
  import { panicMode } from '$lib/stores/panic';
</script>

<svelte:head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  
  <!-- SEO -->
  <title>NEW YEAR.exe — Подозрительно Праздничный Запуск 2026</title>
  <meta name="description" content="Попробуйте запустить Новый 2026 год! Пройдите тест, пообщайтесь с Дедом Морозом и получите сертификат выжившего в 2025. Мемный новогодний сайт с глитчами и кибер-вайбом." />
  <meta name="keywords" content="новый год 2026, мемы, новогодний сайт, тест, дед мороз, сертификат, с новым годом" />
  
  <!-- Favicon -->
  <link rel="icon" type="image/png" href="{base}/favicon.png" />
  <link rel="icon" type="image/svg+xml" href="{base}/favicon.svg" />
  
  <!-- Open Graph / Facebook / VK -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://s1d3.ru/" />
  <meta property="og:title" content="NEW YEAR.exe — Запуск 2026" />
  <meta property="og:description" content="Попробуйте запустить Новый Год! Мемный новогодний сайт с глитчами." />
  <meta property="og:image" content="{base}/favicon.png" />
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="https://s1d3.ru/" />
  <meta property="twitter:title" content="NEW YEAR.exe — Запуск 2026" />
  <meta property="twitter:description" content="Попробуйте запустить Новый Год! Мемный новогодний сайт." />
  <meta property="twitter:image" content="{base}/favicon.png" />
</svelte:head>

<div class="min-h-screen relative overflow-hidden transition-colors duration-200">
  <!-- Global Effects -->
  <div class="scanlines"></div>
  <div class="vignette"></div>
  
  <div class="fixed inset-0 -z-10 pointer-events-none">
    <SnowCanvas />
  </div>

  <Navbar />
  <InteractionHandler />

  <main class="pt-24 px-4 max-w-7xl mx-auto pb-20">
    {#key $page.url.pathname}
      <div
        in:fly={{ y: 10, duration: 300, delay: 100 }}
        out:fly={{ y: -10, duration: 200 }}
      >
        <slot />
      </div>
    {/key}
  </main>
</div>

<LoadingScreen />
<PanicOverlay />
