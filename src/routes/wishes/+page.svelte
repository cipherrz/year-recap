<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { base } from '$app/paths';
	import { fetchWishes, postWish } from '$lib/utils/api';
	import { fade, fly, slide } from 'svelte/transition';

	interface Wish {
		id: number;
		nick: string;
		text: string;
		createdAt: number;
	}

	let wishes: Wish[] = [];
	let loading = true;
	let error = '';
	let showForm = false;
	let newWishText = '';
	let newWishNick = '';
	let submitting = false;
	let successMessage = '';
	let turnstileToken = '';
	let turnstileWidgetId: string | null = null;

	async function loadWishes() {
		try {
			const data = await fetchWishes(200);
			wishes = data.items;
			loading = false;
		} catch (e: any) {
			error = e.message;
			loading = false;
		}
	}

	function onTurnstileSuccess(token: string) {
		turnstileToken = token;
	}

	function initTurnstile() {
		if (window.turnstile && !turnstileWidgetId) {
			turnstileWidgetId = window.turnstile.render('#turnstile-widget', {
				sitekey: '0x4AAAAAACJcRwa7FvuTZgZU',
				callback: onTurnstileSuccess,
				theme: 'dark'
			});
		}
	}

	async function submitWish() {
		if (!newWishText.trim() || submitting || !turnstileToken) return;

		submitting = true;
		error = '';

		try {
			await postWish(newWishText, newWishNick || 'Аноним', turnstileToken);
			successMessage = 'ЖЕЛАНИЕ_ПРИНЯТО. ОНО_ПОЯВИТСЯ_В_ЛОГАХ_СЕЙЧАС.';
			newWishText = '';
			newWishNick = '';
			showForm = false;
			turnstileToken = ''; // Reset token
			if (window.turnstile && turnstileWidgetId) {
				window.turnstile.reset(turnstileWidgetId);
			}
			await loadWishes();
			setTimeout(() => (successMessage = ''), 5000);
		} catch (e: any) {
			error = e.message;
			// Reset captcha on error too
			if (window.turnstile && turnstileWidgetId) {
				window.turnstile.reset(turnstileWidgetId);
				turnstileToken = '';
			}
		} finally {
			submitting = false;
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

	onMount(() => {
		loadWishes();

		// Set global callback
		window.onloadTurnstileCallback = initTurnstile;

		// Inject Turnstile script if not present
		if (!document.querySelector('script[src*="turnstile/v0/api.js"]')) {
			const script = document.createElement('script');
			script.src =
				'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback';
			script.async = true;
			script.defer = true;
			document.head.appendChild(script);
		} else if (window.turnstile) {
			// Already loaded, just init
			initTurnstile();
		}
	});

	onDestroy(() => {
		if (window.turnstile && turnstileWidgetId) {
			try {
				window.turnstile.remove(turnstileWidgetId);
			} catch (e) {
				/* ignore */
			}
		}
	});
</script>

<div class="mx-auto max-w-4xl px-4 py-10">
	<div class="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
		<div class="flex items-center gap-4">
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

		<button
			on:click={() => (showForm = !showForm)}
			class="sys-btn border-[rgb(var(--primary))] px-6 py-3 text-sm font-bold text-[rgb(var(--primary))] hover:bg-[rgb(var(--primary))]/10"
		>
			[ ОСТАВИТЬ_СВОЙ_СЛЕД ]
		</button>
	</div>

	{#if showForm}
		<div
			class="sys-card sys-border-primary mb-10 border bg-[rgba(var(--primary),0.05)] p-6"
			transition:slide
		>
			<h3 class="mb-4 font-mono text-sm font-bold text-[rgb(var(--primary))] uppercase">
				> СОЗДАНИЕ_ЗАПИСИ
			</h3>

			<div class="space-y-4">
				<div>
					<label
						for="nickInput"
						class="mb-1 block font-mono text-[10px] text-[rgb(var(--text-dim))] uppercase"
						>НИКНЕЙМ (НЕОБЯЗАТЕЛЬНО):</label
					>
					<input
						id="nickInput"
						bind:value={newWishNick}
						placeholder="Аноним"
						maxlength="24"
						class="w-full border border-white/10 bg-black/40 p-3 font-mono text-sm text-[rgb(var(--cyan))] outline-none focus:border-[rgb(var(--cyan))]"
					/>
				</div>

				<div>
					<label
						for="textInput"
						class="mb-1 block font-mono text-[10px] text-[rgb(var(--text-dim))] uppercase"
						>ТЕКСТ_ЖЕЛАНИЯ:</label
					>
					<textarea
						id="textInput"
						bind:value={newWishText}
						placeholder="То, что действительно важно..."
						rows="3"
						maxlength="200"
						class="w-full border border-white/10 bg-black/40 p-3 font-mono text-sm text-white outline-none focus:border-[rgb(var(--primary))]"
					></textarea>
					<div class="mt-1 text-right font-mono text-[10px] text-[rgb(var(--text-dim))]">
						{newWishText.length}/200
					</div>
				</div>

				<div class="flex flex-col items-center gap-4">
					<div id="turnstile-widget" class="cf-turnstile"></div>

					<div class="flex w-full justify-end gap-3">
						<button on:click={() => (showForm = false)} class="sys-btn px-4 py-2 text-xs opacity-60"
							>ОТМЕНА</button
						>
						<button
							on:click={submitWish}
							disabled={!newWishText.trim() || submitting || !turnstileToken}
							class="sys-btn bg-[rgb(var(--primary))] px-6 py-2 text-xs font-bold text-white disabled:opacity-30"
						>
							{submitting ? 'ОТПРАВКА...' : 'ЗАГРУЗИТЬ_В_ОБЛАКО'}
						</button>
					</div>
				</div>
			</div>
		</div>
	{/if}

	{#if successMessage}
		<div
			class="sys-card mb-6 animate-pulse border border-[rgb(var(--primary))] p-4 text-center font-mono text-xs text-[rgb(var(--primary))]"
			in:fade
		>
			> {successMessage}
		</div>
	{/if}

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
