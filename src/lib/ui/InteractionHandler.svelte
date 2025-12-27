<script lang="ts">
  import { onMount } from 'svelte';

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let particles: Particle[] = [];

  class Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    color: string;
    size: number;

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 2;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.life = 100;
      this.color = `hsl(${Math.random() * 360}, 100%, 70%)`;
      this.size = Math.random() * 4 + 2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += 0.1; // gravity
      this.life -= 2;
      this.size *= 0.96;
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.globalAlpha = this.life / 100;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function spawnParticles(x: number, y: number) {
    for (let i = 0; i < 15; i++) {
      particles.push(new Particle(x, y));
    }
  }

  function loop() {
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].draw(ctx);
      if (particles[i].life <= 0) {
        particles.splice(i, 1);
      }
    }

    requestAnimationFrame(loop);
  }

  onMount(() => {
    ctx = canvas.getContext('2d')!;
    
    // Resize handler
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();
    loop();

    return () => window.removeEventListener('resize', resize);
  });

  function handleClick(e: MouseEvent) {
    spawnParticles(e.clientX, e.clientY);
  }
</script>

<canvas
  bind:this={canvas}
  class="fixed inset-0 pointer-events-none z-50"
></canvas>

<svelte:window on:click={handleClick} />
