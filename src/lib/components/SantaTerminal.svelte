<script lang="ts">
	import { afterUpdate } from 'svelte';
	import { base } from '$app/paths';
	import { postWish } from '$lib/utils/api';
	import { quizCompleted, quizResult, isEasterEgg } from '$lib/stores/quiz';

	let messages = [
		{ from: 'sys', text: 'CONNECTION_ESTABLISHED...' },
		{ from: 'santa', text: '🎅 Дед Мороз (бот версия 0.1b) в сети. Че надо?' }
	];
	let input = '';
	let terminal: HTMLDivElement;
	let usedWishes = new Set<number>();

	afterUpdate(() => {
		if (terminal) terminal.scrollTop = terminal.scrollHeight;
	});

	const santaReplies = [
		'Принято. Обрабатывается... (никогда)',
		'Уточни: ты хочешь это реально или как обычно?',
		'Добавлено в список... в чёрный.',
		'Хмм... а ты вел себя как душный тип?',
		'Сервер перегружен оливье. Повторите позже.',
		'Отправлено эльфам. Они ржут.',
		'Могу предложить только носки.'
	];

	const wishTemplates = [
		'Хочу, чтобы дедлайны горели, а не я',
		'Хочу выспаться хотя бы раз в жизни',
		'Хочу найти второй носок из пары',
		"Хочу, чтобы Netflix добавил кнопку 'Я не сплю, продолжай'",
		"Хочу разбогатеть до уровня 'могу позволить себе авокадо'",
		'Хочу, чтобы кофе варился сам по утрам',
		'Хочу телепорт до школы (или от школы)',
		'Хочу, чтобы понедельник был отменён навсегда',
		'Хочу супер-силу: всегда свежий айфон 100%',
		'Хочу, чтобы Wi-Fi работал везде, даже в лифте',
		'Хочу не терять ключи каждые 5 минут',
		'Хочу, чтобы холодильник сам готовил ужин',
		'Хочу машину времени (хотя бы на час вперёд)',
		'Хочу бесконечный отпуск без потери зарплаты',
		"Хочу кнопку 'отмена' для реальной жизни",
		'Хочу, чтобы растения поливали сами себя',
		'Хочу мотивацию делать то, что планирую',
		'Хочу, чтобы уборка делалась сама',
		'Хочу автопилот для скучных дел',
		'Хочу, чтобы книги читались сами и пересказывали мне'
	];

	async function send() {
		if (!input.trim()) return;

		const textToSend = input.trim();
		const userText = textToSend.toLowerCase();
		messages = [...messages, { from: 'user', text: textToSend }];

		let reply = santaReplies[Math.floor(Math.random() * santaReplies.length)];

		// Easter Egg check
		if (userText.includes('сертификат')) {
			reply = 'Лови, заслужил! (наверное)';
			quizCompleted.set(true);
			isEasterEgg.set(true);
			quizResult.set('ПАСХАЛКА');
		}

		setTimeout(
			() => {
				messages = [...messages, { from: 'santa', text: reply }];
			},
			600 + Math.random() * 1000
		);

		input = '';
	}

	function genWish() {
		// Get random wish with deduplication
		let randomIndex: number;
		let attempts = 0;

		do {
			randomIndex = Math.floor(Math.random() * wishTemplates.length);
			attempts++;
			// Reset if all wishes used or too many attempts
			if (usedWishes.size >= wishTemplates.length || attempts > 50) {
				usedWishes.clear();
			}
		} while (usedWishes.has(randomIndex) && attempts < 100);

		usedWishes.add(randomIndex);
		input = wishTemplates[randomIndex];
		send();
	}
</script>

<section class="mx-auto max-w-2xl px-4 py-20">
	<div class="sys-card sys-border-danger border bg-black/80 font-mono text-sm">
		<div
			class="sys-border-danger flex items-center justify-between border-b bg-[rgba(var(--danger),0.1)] p-2"
		>
			<span class="ml-2 font-bold text-[rgb(var(--danger))]">DED_MOROZ_DIRECT_UPLINK</span>
			<div class="mr-2 flex gap-1">
				<div class="h-2 w-2 rounded-full bg-[rgb(var(--danger))]"></div>
				<div class="h-2 w-2 rounded-full bg-[rgb(var(--danger))]"></div>
			</div>
		</div>

		<!-- Terminal Output -->
		<div bind:this={terminal} class="h-64 space-y-3 overflow-y-auto p-4">
			{#each messages as msg}
				<div class="opacity-100">
					{#if msg.from === 'sys'}
						<div class="text-[rgb(var(--text-log))] italic">> {msg.text}</div>
					{:else if msg.from === 'santa'}
						<div class="font-bold text-[rgb(var(--danger))]">
							DED_MOROZ_BOT: <span class="font-normal text-gray-300">{msg.text}</span>
						</div>
					{:else}
						<div class="text-right text-[rgb(var(--cyan))]">{msg.text} &lt;</div>
					{/if}
				</div>
			{/each}
		</div>

		<!-- Input Area -->
		<div class="flex gap-2 border-t border-[rgba(255,45,85,0.3)] p-4">
			<span class="text-[rgb(var(--text-dim))]">></span>
			<input
				bind:value={input}
				on:keydown={(e) => {
					if (e.key === 'Enter') send();
				}}
				class="w-full bg-transparent text-[rgb(var(--text-main))] outline-none"
				placeholder="Напиши Деду..."
			/>
			<button on:click={send} class="text-xs text-[rgb(var(--cyan))] uppercase hover:text-white"
				>[SEND]</button
			>
		</div>
	</div>

	<div class="mt-8 flex flex-col items-center gap-6">
		<a
			href="{base}/wishes"
			class="sys-btn group relative overflow-hidden border-2 border-[rgb(var(--primary))] bg-[rgb(var(--primary))]/10 px-10 py-5 text-xl font-black tracking-tighter text-[rgb(var(--primary))] shadow-[0_0_20px_rgba(124,77,255,0.2)] transition-all hover:scale-105 hover:bg-[rgb(var(--primary))] hover:text-white hover:shadow-[0_0_40px_rgba(124,77,255,0.5)]"
		>
			<span class="relative z-10">ЗАГАДАТЬ ЖЕЛАНИЕ (РЕАЛЬНО)</span>
			<div
				class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full"
			></div>
		</a>

		<button
			on:click={genWish}
			class="pointer-cursor font-mono text-[10px] tracking-widest text-[rgb(var(--text-log))] uppercase underline decoration-dashed opacity-50 transition-opacity hover:opacity-100"
		>
			[ СГЕНЕРИРОВАТЬ МЕМНЫЙ ВАРИАНТ ДЛЯ ЧАТА ]
		</button>
	</div>
</section>
