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

<div class="mt-20 border-t border-white/5 pt-10">
	<div
		class="sys-card sys-border-cyan flex flex-wrap items-center justify-around gap-8 border bg-black/40 p-6 backdrop-blur-sm"
	>
		<div class="text-center">
			<div class="mb-1 font-mono text-xs tracking-widest text-[rgb(var(--text-dim))] uppercase">
				SYSTEM_VISITORS
			</div>
			<div class="font-mono text-4xl font-bold tracking-tighter text-[rgb(var(--cyan))]">
				{#if loading}
					---
				{:else}
					{visitorsTotal.toLocaleString().padStart(6, '0')}
				{/if}
			</div>
		</div>

		<div class="hidden h-12 w-px bg-white/10 md:block"></div>

		<div class="text-center">
			<div class="mb-1 font-mono text-xs tracking-widest text-[rgb(var(--text-dim))] uppercase">
				ENCODED_WISHES
			</div>
			<div class="font-mono text-4xl font-bold tracking-tighter text-[rgb(var(--primary))]">
				{#if loading}
					---
				{:else}
					{wishesTotal.toLocaleString().padStart(6, '0')}
				{/if}
			</div>
		</div>

		<div
			class="mt-4 max-w-[200px] text-left font-mono text-[10px] leading-tight text-[rgb(var(--text-log))] uppercase opacity-50 md:mt-0"
		>
			> LIVE_UPDATING...<br />
			> DATA_FETCH_INTERVAL: 10s<br />
			> SOURCE: RAILWAY_PRODUCTION
		</div>
	</div>
</div>
