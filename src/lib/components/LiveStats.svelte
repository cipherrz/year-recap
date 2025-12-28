<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { fetchStats } from '$lib/utils/api';

	let visitorsTotal = 0;
	let wishesTotal = 0;
	let interval: any;
	let loading = true;

	async function updateStats() {
		try {
			const data = await fetchStats();
			visitorsTotal = data.visitorsTotal;
			wishesTotal = data.wishesTotal;
			loading = false;
		} catch (e) {
			console.error('Failed to fetch stats', e);
		}
	}

	onMount(() => {
		updateStats();
		interval = setInterval(updateStats, 10000); // Update every 10s
	});

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<div class="mx-auto max-w-6xl px-4 py-20">
	<div class="group relative overflow-hidden">
		<!-- Background Glow -->
		<div
			class="absolute inset-0 rounded-full bg-[rgb(var(--cyan))]/5 opacity-50 blur-3xl transition-opacity group-hover:opacity-100"
		></div>

		<div
			class="sys-card relative z-10 flex flex-wrap items-center justify-around gap-8 border-2 border-[rgb(var(--cyan))]/30 bg-black/60 p-10 shadow-[0_0_30px_rgba(0,229,255,0.1)] backdrop-blur-md"
		>
			<div class="text-center">
				<div
					class="mb-2 font-mono text-xs font-bold tracking-widest text-[rgb(var(--text-dim))] uppercase"
				>
					[ SYSTEM_VISITORS ]
				</div>
				<div
					class="text-shadow-glow font-mono text-5xl font-black tracking-tighter text-[rgb(var(--cyan))]"
				>
					{#if loading}
						000000
					{:else}
						{visitorsTotal.toLocaleString().padStart(6, '0')}
					{/if}
				</div>
			</div>

			<div class="hidden h-16 w-px bg-white/10 md:block"></div>

			<div class="text-center">
				<div
					class="mb-2 font-mono text-xs font-bold tracking-widest text-[rgb(var(--text-dim))] uppercase"
				>
					[ ENCODED_WISHES ]
				</div>
				<div
					class="text-shadow-glow-purple font-mono text-5xl font-black tracking-tighter text-[rgb(var(--primary))]"
				>
					{#if loading}
						000000
					{:else}
						{wishesTotal.toLocaleString().padStart(6, '0')}
					{/if}
				</div>
			</div>

			<div class="hidden h-16 w-px bg-white/10 lg:block"></div>

			<div
				class="mt-4 max-w-[250px] text-left font-mono text-[10px] leading-relaxed text-[rgb(var(--text-log))] uppercase opacity-60 md:mt-0"
			>
				<span class="text-xs font-bold text-[rgb(var(--cyan))]">> SYSTEM_ONLINE</span><br />
				> LIVE_UPDATING: ACTIVE<br />
				> DATA_FETCH_INTERVAL: 10s<br />
				> SOURCE: RAILWAY_PRODUCTION_STABLE
			</div>
		</div>
	</div>
</div>

<style>
	.text-shadow-glow {
		text-shadow: 0 0 15px rgba(0, 229, 255, 0.6);
	}
	.text-shadow-glow-purple {
		text-shadow: 0 0 15px rgba(124, 77, 255, 0.6);
	}
</style>
