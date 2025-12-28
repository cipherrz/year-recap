<script lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import { fetchWishes } from '$lib/utils/api';
	import { fade, fly } from 'svelte/transition';

	interface Wish {
		id: number;
		nick: string;
		text: string;
		createdAt: number;
	}

	let wishes: Wish[] = [];
	let loading = true;
	let error = '';

	async function loadWishes() {
		try {
			const data = await fetchWishes(100);
			wishes = data.items;
			loading = false;
		} catch (e: any) {
			error = e.message;
			loading = false;
		}
	}

	function formatDate(unix: number) {
		return new Date(unix * 1000).toLocaleString('ru-RU', {
			day: '2-digit',
			month: '2-digit',
			year: '2-digit',
			hour: '2-digit',
			minute: '2-digit'
		});
	}

	onMount(loadWishes);
</script>

<div class="mx-auto max-w-4xl py-10">
	<div class="mb-10 flex items-center gap-4">
		<a
			href="{base}/"
			class="sys-btn px-4 py-2 font-mono text-xs opacity-60 transition-opacity hover:opacity-100"
		>
			[ НАЗАД ]
		</a>
		<h1 class="font-mono text-3xl font-bold tracking-tighter md:text-5xl">
			WISH_DATABASE<span class="text-[rgb(var(--cyan))]">.log</span>
		</h1>
	</div>

	{#if loading}
		<div class="sys-card p-12 text-center" in:fade>
			<div
				class="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-2 border-[rgb(var(--cyan))] border-t-transparent"
			></div>
			<div class="font-mono text-sm tracking-widest text-[rgb(var(--text-dim))] uppercase">
				ЧТЕНИЕ_ДАННЫХ...
			</div>
		</div>
	{:else if error}
		<div class="sys-card sys-border-danger border p-8 text-center" in:fade>
			<div class="mb-2 font-mono font-bold text-[rgb(var(--danger))] uppercase">
				КРИТИЧЕСКАЯ_ОШИБКА: CONNECTION_FAILED
			</div>
			<div class="mb-6 font-mono text-sm text-[rgb(var(--text-dim))]">{error}</div>
			<button on:click={loadWishes} class="sys-btn px-6 py-2 text-xs">[ ПОВТОРИТЬ_ЗАПРОС ]</button>
		</div>
	{:else if wishes.length === 0}
		<div class="sys-card p-12 text-center" in:fade>
			<div class="mb-4 text-4xl opacity-30">📂</div>
			<div class="font-mono tracking-widest text-[rgb(var(--text-dim))] uppercase">
				ЛОГ_ПУСТ: ЖЕЛАНИЙ_НЕ_ОБНАРУЖЕНО
			</div>
		</div>
	{:else}
		<div class="grid gap-4">
			{#each wishes as wish, i (wish.id)}
				<div
					class="sys-card group relative overflow-hidden border border-white/5 p-4 transition-colors hover:border-[rgb(var(--cyan))]/30"
					in:fly={{ y: 20, delay: i * 30, duration: 400 }}
				>
					<!-- Background decoration -->
					<div
						class="pointer-events-none absolute top-0 right-0 p-2 font-mono text-[80px] leading-none opacity-5 select-none"
					>
						{wish.id.toString().padStart(3, '0')}
					</div>

					<div class="relative z-10 mb-2 flex items-start justify-between">
						<span
							class="font-mono text-xs font-bold tracking-widest text-[rgb(var(--cyan))] uppercase"
						>
							{wish.nick || 'ANONYMOUS_USER'}
						</span>
						<span class="font-mono text-[10px] text-[rgb(var(--text-log))] opacity-60">
							[{formatDate(wish.createdAt)}]
						</span>
					</div>

					<p class="relative z-10 font-mono text-sm leading-relaxed text-[rgb(var(--text-main))]">
						{wish.text}
					</p>

					<div class="mt-3 flex gap-2 opacity-0 transition-opacity group-hover:opacity-40">
						<div class="h-1 w-8 bg-[rgb(var(--primary))]"></div>
						<div class="h-1 w-4 bg-[rgb(var(--cyan))]"></div>
						<div class="h-1 w-2 bg-white"></div>
					</div>
				</div>
			{/each}
		</div>
	{/if}

	<div class="mt-12 text-center">
		<div class="font-mono text-[10px] text-[rgb(var(--text-log))] uppercase opacity-40">
			КОНЕЦ_ЛОГА // ВСЕГО_ЗАПИСЕЙ: {wishes.length}
		</div>
	</div>
</div>

<style>
	.sys-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 2px;
		height: 100%;
		background: rgb(var(--cyan));
		opacity: 0.3;
	}
</style>
