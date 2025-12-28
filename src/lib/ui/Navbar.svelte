<script lang="ts">
	import { page } from '$app/stores';
	import { base } from '$app/paths';
</script>

<nav
	class="fixed top-0 right-0 left-0 z-50 flex items-center justify-between border-b border-white/5 bg-black/60 px-6 py-4 backdrop-blur-md"
>
	<a
		href="{base}/"
		class="animate-glitch bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--cyan))] bg-clip-text font-mono text-xl font-bold tracking-[0.2em] text-transparent transition-opacity hover:opacity-80"
		data-text="NEW YEAR.exe"
	>
		NEW YEAR.exe
	</a>

	<div class="flex gap-6 font-mono text-sm">
		<a
			href="{base}/wishes"
			class="tracking-widest uppercase transition-colors hover:text-[rgb(var(--primary))] {$page.url
				.pathname ===
			base + '/wishes'
				? 'text-shadow-glow-purple text-[rgb(var(--primary))]'
				: 'text-slate-400'}"
		>
			[WISH]
		</a>
		<a
			href="{base}/"
			class="tracking-widest uppercase transition-colors hover:text-[rgb(var(--cyan))] {$page.url
				.pathname === base || $page.url.pathname === base + '/'
				? 'text-shadow-glow text-[rgb(var(--cyan))]'
				: 'text-slate-400'}"
		>
			[HOME]
		</a>
	</div>
</nav>

<style>
	.text-shadow-glow-purple {
		text-shadow: 0 0 10px rgba(124, 77, 255, 0.5);
	}
	.text-shadow-glow {
		text-shadow: 0 0 10px rgba(0, 229, 255, 0.5);
	}
</style>
