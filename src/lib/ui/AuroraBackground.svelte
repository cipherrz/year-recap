<script lang="ts">
  import { onMount } from 'svelte';
  
  let mouseX = 0;
  let mouseY = 0;
  
  function handleMouseMove(e: MouseEvent) {
    mouseX = e.clientX / window.innerWidth;
    mouseY = e.clientY / window.innerHeight;
  }

  onMount(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  });
</script>

<div class="absolute inset-0 overflow-hidden pointer-events-none">
  <div class="absolute inset-0 bg-black"></div>

  <div
    class="absolute -top-24 -left-24 w-[520px] h-[520px] rounded-full blur-3xl opacity-30 animate-drift"
    style="
      background: radial-gradient(circle at 30% 30%, rgba(var(--accent),0.55), rgba(0,0,0,0) 62%);
      transform: translate({mouseX * 30}px, {mouseY * 30}px);
    "
  ></div>

  <div
    class="absolute top-12 -right-24 w-[560px] h-[560px] rounded-full blur-3xl opacity-25 animate-drift-slow"
    style="
      background: radial-gradient(circle at 40% 35%, rgba(var(--accent2),0.55), rgba(0,0,0,0) 60%);
      transform: translate({mouseX * -20}px, {mouseY * 20}px);
    "
  ></div>

  <div
    class="absolute -bottom-32 left-1/3 w-[680px] h-[680px] rounded-full blur-3xl opacity-20 animate-drift-slower"
    style="
      background: radial-gradient(circle at 35% 45%, rgba(var(--holiday),0.55), rgba(0,0,0,0) 62%);
      transform: translate({mouseX * 15}px, {mouseY * -25}px);
    "
  ></div>

  <div class="absolute inset-0 opacity-[0.12]"
       style="
        background-image:
          linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
        background-size: 42px 42px;
        mask-image: radial-gradient(circle at 50% 30%, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 55%, rgba(0,0,0,0) 100%);
       "
  ></div>
</div>
