<script lang="ts">
	import HeroSection from '$lib/components/HeroSection.svelte';
	import RecapPanel from '$lib/components/RecapPanel.svelte';
	import CringeTree from '$lib/components/CringeTree.svelte';
	import MemeQuiz from '$lib/components/MemeQuiz.svelte';
	import SantaTerminal from '$lib/components/SantaTerminal.svelte';
	import LiveStats from '$lib/components/LiveStats.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Modal from '$lib/ui/Modal.svelte';
	import { quizCompleted, quizResult, isEasterEgg } from '$lib/stores/quiz';

	let userName = '';
	let showModal = false;
	let showFinalModal = false;

	function downloadCertificate() {
		if (!userName.trim()) {
			showModal = true;
			return;
		}

		// Create canvas for certificate
		const canvas = document.createElement('canvas');
		canvas.width = 1200;
		canvas.height = 800;
		const ctx = canvas.getContext('2d')!;

		// Background gradient
		const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
		bgGradient.addColorStop(0, '#0B1022');
		bgGradient.addColorStop(1, '#1a1a3e');
		ctx.fillStyle = bgGradient;
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		// Draw Christmas tree (simple triangular tree)
		function drawTree(x: number, y: number, size: number) {
			ctx.fillStyle = '#2d5a3d';
			ctx.beginPath();
			ctx.moveTo(x, y - size * 1.5);
			ctx.lineTo(x - size * 0.6, y);
			ctx.lineTo(x + size * 0.6, y);
			ctx.closePath();
			ctx.fill();

			// Trunk
			ctx.fillStyle = '#5a4a3a';
			ctx.fillRect(x - size * 0.15, y, size * 0.3, size * 0.4);

			// Ornaments
			const colors = ['#FF9F1C', '#FF2D55', '#7C4DFF', '#00E5FF'];
			for (let i = 0; i < 5; i++) {
				ctx.fillStyle = colors[i % colors.length];
				ctx.beginPath();
				const ornX = x + (Math.random() - 0.5) * size * 0.8;
				const ornY = y - Math.random() * size * 1.2;
				ctx.arc(ornX, ornY, size * 0.06, 0, Math.PI * 2);
				ctx.fill();
			}
		}

		// Draw trees in corners
		drawTree(120, 750, 80);
		drawTree(1080, 750, 80);

		// Draw snowflakes
		function drawSnowflake(x: number, y: number, size: number) {
			ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
			ctx.lineWidth = 2;
			for (let i = 0; i < 6; i++) {
				ctx.save();
				ctx.translate(x, y);
				ctx.rotate((Math.PI / 3) * i);
				ctx.beginPath();
				ctx.moveTo(0, 0);
				ctx.lineTo(0, -size);
				ctx.stroke();
				ctx.restore();
			}
		}

		// Scatter snowflakes
		for (let i = 0; i < 30; i++) {
			const x = Math.random() * canvas.width;
			const y = Math.random() * canvas.height;
			const size = Math.random() * 8 + 4;
			drawSnowflake(x, y, size);
		}

		// Border glow
		ctx.strokeStyle = '#7C4DFF';
		ctx.lineWidth = 4;
		ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

		// Inner border
		ctx.strokeStyle = '#00E5FF';
		ctx.lineWidth = 2;
		ctx.strokeRect(60, 60, canvas.width - 120, canvas.height - 120);

		// Title
		ctx.fillStyle = $isEasterEgg ? '#FFD700' : '#EAF0FF';
		ctx.font = 'bold 80px monospace';
		ctx.textAlign = 'center';
		ctx.fillText($isEasterEgg ? 'ПАСХАЛКА' : 'СЕРТИФИКАТ', canvas.width / 2, 180);

		// Subtitle
		ctx.font = '32px monospace';
		ctx.fillStyle = '#A9B4D0';
		ctx.fillText(
			$isEasterEgg ? 'Выдан Дедом Морозом за сообразительность' : 'Подтверждает, что пользователь',
			canvas.width / 2,
			280
		);

		// Name
		ctx.font = 'bold 64px monospace';
		ctx.fillStyle = '#00E5FF';
		ctx.fillText(userName.toUpperCase(), canvas.width / 2, 400);

		// Quiz result (personality type)
		if ($quizResult) {
			ctx.font = '28px monospace';
			ctx.fillStyle = $isEasterEgg ? '#FFD700' : '#FF9F1C';
			ctx.fillText(`[ ${$quizResult} ]`, canvas.width / 2, 460);
		}

		// Achievement text
		ctx.font = '36px monospace';
		ctx.fillStyle = '#A9B4D0';
		ctx.fillText('пережил 2025 и готов к 2026', canvas.width / 2, 520);

		// Badge stamp
		ctx.fillStyle = '#FF9F1C';
		ctx.beginPath();
		ctx.arc(canvas.width - 200, canvas.height - 150, 80, 0, Math.PI * 2);
		ctx.fill();

		ctx.fillStyle = '#000000';
		ctx.font = 'bold 24px monospace';
		ctx.fillText('ВЫЖИЛ', canvas.width - 200, canvas.height - 160);
		ctx.fillText('2025', canvas.width - 200, canvas.height - 130);

		// Footer
		ctx.fillStyle = '#6E7AA8';
		ctx.font = '20px monospace';
		ctx.fillText(
			'© 2025-2026, ВСЕ ПРАВА ПРИНАДЛЕЖАТ МАНДАРИНАМ',
			canvas.width / 2,
			canvas.height - 80
		);
		ctx.fillText('build_ver: 2026.0.1-beta (unstable)', canvas.width / 2, canvas.height - 50);

		// Download
		canvas.toBlob((blob) => {
			if (blob) {
				const url = URL.createObjectURL(blob);
				const a = document.createElement('a');
				a.href = url;
				a.download = `certificate_${userName.replace(/\s+/g, '_')}.png`;
				a.click();
				URL.revokeObjectURL(url);
			}
		});
	}

	function shareCertificate() {
		if (!userName.trim()) {
			showModal = true;
			return;
		}

		const text = `${userName} выжил в 2025! 🎉 #НовыйГод2026`;
		if (navigator.share) {
			navigator.share({ text });
		} else {
			navigator.clipboard.writeText(text);
			alert('Текст скопирован в буфер обмена!');
		}
	}
</script>

<HeroSection />
<RecapPanel />

<div class="mx-auto grid max-w-6xl grid-cols-1 items-start gap-8 lg:grid-cols-2">
	<CringeTree />
	<MemeQuiz />
</div>

<SantaTerminal />

<Modal
	bind:show={showModal}
	title="INPUT_REQUIRED"
	message="Введите своё имя, чтобы сгенерировать сертификат!"
	type="danger"
/>

<Modal
	bind:show={showFinalModal}
	title="ERROR_404"
	message="2026 ЕЩЕ НЕ ЗАГРУЖЕН. ПОПРОБУЙТЕ ПЕРЕЗАГРУЗИТЬ РЕАЛЬНОСТЬ."
	type="danger"
/>

<div class="relative mx-auto max-w-4xl py-12 text-center">
	<h2 class="mb-6 font-mono text-xl text-[rgb(var(--cyan))]">CERTIFICATE_GENERATOR</h2>

	{#if !$quizCompleted}
		<!-- Locked State -->
		<button
			on:click={() => {
				document
					.getElementById('soul-scanner')
					?.scrollIntoView({ behavior: 'smooth', block: 'center' });
			}}
			class="sys-card relative inline-block rotate-1 transform cursor-pointer border-2 border-[rgb(var(--text-log))] p-8 opacity-50 transition-opacity hover:opacity-70"
		>
			<div
				class="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-black/60 backdrop-blur-sm"
			>
				<div class="p-6 text-center">
					<div class="mb-4 text-6xl">🔒</div>
					<div class="mb-2 font-mono text-xl font-bold text-[rgb(var(--danger))]">
						ДОСТУП ЗАБЛОКИРОВАН
					</div>
					<div class="mb-4 font-mono text-sm text-[rgb(var(--text-dim))]">
						Сначала пройдите SOUL_SCANNER.exe<br />
						чтобы разблокировать сертификат
					</div>
					<div class="animate-pulse font-mono text-lg font-bold text-[rgb(var(--cyan))]">
						[ НАЖМИ ]
					</div>
				</div>
			</div>

			<div class="mb-2 font-mono text-3xl font-bold blur-sm">СЕРТИФИКАТ</div>
			<div class="mb-4 font-mono text-sm text-[rgb(var(--text-dim))] blur-sm">
				Подтверждает, что пользователь пережил 2025
			</div>

			<div class="mb-6 blur-sm">
				<span class="mb-2 block text-left font-mono text-xs text-[rgb(var(--text-dim))]"
					>ВВЕДИТЕ ВАШЕ ИМЯ:</span
				>
				<div class="sys-border-cyan w-full border bg-[rgb(var(--bg-card))] px-4 py-3"></div>
			</div>

			<div class="flex justify-center gap-4 blur-sm">
				<div class="btn-primary sys-btn px-6 py-2 text-xs">[СКАЧАТЬ PNG]</div>
				<div class="btn-primary sys-btn px-6 py-2 text-xs">[ПОДЕЛИТЬСЯ]</div>
			</div>
		</button>
	{:else}
		<!-- Unlocked State -->
		<div
			class="sys-card sys-border-primary relative inline-block rotate-1 transform border-2 p-8 transition-transform duration-300 hover:rotate-0"
		>
			<div
				class="absolute -top-3 -right-3 rotate-12 bg-[rgb(var(--tangerine))] px-3 py-1 text-xs font-bold text-black shadow-lg"
			>
				ВЫЖИЛ
			</div>

			<div class="mb-2 font-mono text-3xl font-bold">СЕРТИФИКАТ</div>
			<div class="mb-4 font-mono text-sm text-[rgb(var(--text-dim))]">
				Подтверждает, что пользователь пережил 2025
			</div>

			<!-- Name Input -->
			<div class="mb-6">
				<label
					for="userName"
					class="mb-2 block text-left font-mono text-xs text-[rgb(var(--text-dim))]"
					>ВВЕДИТЕ ВАШЕ ИМЯ:</label
				>
				<input
					id="userName"
					bind:value={userName}
					type="text"
					placeholder="Иван Иванов"
					class="sys-border-cyan w-full border bg-[rgb(var(--bg-card))] px-4 py-3 font-mono text-[rgb(var(--text-main))] focus:border-[rgb(var(--cyan))] focus:shadow-[0_0_10px_rgba(0,229,255,0.3)] focus:outline-none"
				/>
			</div>

			<div class="flex justify-center gap-4">
				<button on:click={downloadCertificate} class="btn-primary sys-btn px-6 py-2 text-xs">
					[СКАЧАТЬ PNG]
				</button>
				<button on:click={shareCertificate} class="btn-primary sys-btn px-6 py-2 text-xs">
					[ПОДЕЛИТЬСЯ]
				</button>
			</div>
		</div>
	{/if}

	<div class="mt-12">
		<button
			on:click={() => (showFinalModal = true)}
			class="text-[rgb(var(--text-log))] underline decoration-[rgb(var(--danger))] decoration-wavy hover:text-white"
		>
			ВОЙТИ В 2026 ОКОНЧАТЕЛЬНО
		</button>
	</div>
</div>

<LiveStats />
<Footer />
