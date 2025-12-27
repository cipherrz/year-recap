<script lang="ts">
  import { quizCompleted, quizResult } from '$lib/stores/quiz';
  
  const questions = [
    {
      q: "Ты уже купил подарки?",
      a: [
        { t: "Да (вру)", score: 1 },
        { t: "Нет", score: 2 },
        { t: "Я сам подарок", score: 3 }
      ]
    },
    {
      q: "Твоя новогодняя фраза:",
      a: [
        { t: "Ну всё, с понедельника", score: 1 },
        { t: "Ща по-быстрому", score: 2 },
        { t: "Я устал", score: 3 }
      ]
    },
    {
      q: "Как планируешь провести 1 января?",
      a: [
        { t: "Выживать", score: 1 },
        { t: "Доедать", score: 2 },
        { t: "Спать до 3-го", score: 3 }
      ]
    },
    {
      q: "Что в бокале?",
      a: [
        { t: "Детское шампанское", score: 1 },
        { t: "Слезы", score: 2 },
        { t: "Мандариновый сок", score: 3 }
      ]
    },
    {
      q: "Главная цель на 2026?",
      a: [
        { t: "Не сойти с ума", score: 1 },
        { t: "Разбогатеть (опять)", score: 2 },
        { t: "Найти второй носок", score: 3 }
      ]
    },
    {
      q: "Тебе дарят носки. Твоя реакция?",
      a: [
        { t: "Спасибо (без эмоций)", score: 1 },
        { t: "ААА ЭТО ЖЕ МЕЧТА!", score: 3 },
        { t: "*внутренний крик*", score: 2 }
      ]
    },
    {
      q: "Любимая ёлочная игрушка:",
      a: [
        { t: "Сломанная гирлянда", score: 2 },
        { t: "Мандарин (свежий)", score: 3 },
        { t: "Пыльная звезда с 2012", score: 1 }
      ]
    },
    {
      q: "Новогодний фильм?",
      a: [
        { t: "Один дома (в 10-й раз)", score: 1 },
        { t: "Иронию судьбы (я традиционалист)", score: 2 },
        { t: "Не смотрю, сплю", score: 3 }
      ]
    },
    {
      q: "Отношение к оливье:",
      a: [
        { t: "Это святое", score: 2 },
        { t: "Ем, потому что традиция", score: 1 },
        { t: "Где мой салат цезарь?", score: 3 }
      ]
    },
    {
      q: "В 00:00 ты:",
      a: [
        { t: "Загадываешь желание классически", score: 2 },
        { t: "Уже спишь", score: 1 },
        { t: "Делаешь мемы в сторис", score: 3 }
      ]
    }
  ];

  let current = 0;
  let scoreTotal = 0;
  let result: string | null = null;

  function answer(score: number) {
    scoreTotal += score;
    if (current < questions.length - 1) {
      current++;
    } else {
      calcResult();
    }
  }

  function calcResult() {
    // 10-30 баллов, 8 категорий
    if (scoreTotal <= 12) result = "СНЕГОВИК НА МИНИМАЛКАХ";
    else if (scoreTotal <= 15) result = "СЛОМАННАЯ ГИРЛЯНДА";
    else if (scoreTotal <= 18) result = "ДЕД МОРОЗ В ОТПУСКЕ";
    else if (scoreTotal <= 21) result = "МАНДАРИНОВЫЙ МАГ";
    else if (scoreTotal <= 24) result = "ЗВЕЗДА С ЁЛКИ (УПАЛА)";
    else if (scoreTotal <= 27) result = "ПРОФЕССИОНАЛЬНЫЙ ОЛИВЬЕ-КРИТИК";
    else if (scoreTotal <= 29) result = "НОВОГОДНЕЕ ЧУДО (БАГ В МАТРИЦЕ)";
    else result = "ERROR_2026: СЛИШКОМ ИДЕАЛЬНЫЙ";
    
    // Mark quiz as completed to unlock certificate
    quizCompleted.set(true);
    quizResult.set(result);
  }

  function reset() {
    current = 0;
    scoreTotal = 0;
    result = null;
  }
</script>

<section id="soul-scanner" class="max-w-xl mx-auto py-20 px-4">
  <div class="sys-card p-8 border sys-border-cyan relative overflow-hidden">
    <div class="absolute top-0 left-0 w-full h-1 bg-[rgb(var(--primary))]"></div>
    
    <div class="flex justify-between items-center mb-8">
      <h2 class="font-mono font-bold text-xl">SOUL_SCANNER.exe</h2>
      <span class="text-xs font-mono text-[rgb(var(--text-log))]">{current + 1}/{questions.length}</span>
    </div>

    {#if !result}
      <div class="min-h-[200px]">
        <h3 class="text-xl font-bold mb-8">{questions[current].q}</h3>
        <div class="grid gap-3">
          {#each questions[current].a as opt}
            <button 
              on:click={() => answer(opt.score)}
              class="text-left px-4 py-3 border border-[rgb(var(--text-dim))] hover:bg-[rgba(var(--cyan),0.1)] hover:border-[rgb(var(--cyan))] hover:text-[rgb(var(--cyan))] transition-colors font-mono text-sm"
            >
              > {opt.t}
            </button>
          {/each}
        </div>
      </div>
    {:else}
      <div class="text-center animate-glitch" data-text={result}>
        <div class="text-xs text-[rgb(var(--text-dim))] mb-2">SCAN COMPLETE. RESULT:</div>
        <h3 class="text-2xl md:text-3xl font-black text-[rgb(var(--tangerine))] mb-8">{result}</h3>
        <button on:click={reset} class="btn-primary sys-btn px-6 py-2">
          ПРОЙТИ ЗАНОВО
        </button>
      </div>
    {/if}
  </div>
</section>
