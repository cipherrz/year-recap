<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let frame: number | undefined;

  const chars = ['*', '+', '.', '0', '1', 'error', '404', '{}', '[]', ';'];
  
  class Flake {
    x: number;
    y: number;
    z: number;
    char: string;
    opacity: number;
    fontSize: number;

    constructor(w: number, h: number) {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.z = Math.random() * 2 + 1; // Speed factor
      this.char = chars[Math.floor(Math.random() * chars.length)];
      this.opacity = Math.random() * 0.5 + 0.1;
      this.fontSize = Math.floor(Math.random() * 10 + 8);
    }

    update(h: number, w: number) {
      this.y += this.z * 0.5;
      if (this.y > h) {
        this.y = -20;
        this.x = Math.random() * w;
      }
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = '#00E5FF'; // Cyan snow
      if (Math.random() > 0.95) ctx.fillStyle = '#FF9F1C'; // Random tangerine snow
      if (Math.random() > 0.98) ctx.fillStyle = '#FF2D55'; // Random error snow
      
      ctx.font = `${this.fontSize}px monospace`;
      ctx.fillText(this.char, this.x, this.y);
    }
  }

  let flakes: Flake[] = [];

  onMount(() => {
    ctx = canvas.getContext('2d')!;
    
    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      flakes = Array.from({ length: 70 }, () => new Flake(canvas.width, canvas.height));
    }

    function loop() {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      flakes.forEach(f => {
        f.update(canvas.height, canvas.width);
        f.draw(ctx);
      });
      frame = requestAnimationFrame(loop);
    }

    resize();
    window.addEventListener('resize', resize);
    loop();

    return () => {
      window.removeEventListener('resize', resize);
      if (frame) cancelAnimationFrame(frame);
    };
  });

</script>

<canvas bind:this={canvas} class="w-full h-full"></canvas>
