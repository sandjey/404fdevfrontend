import { type Locale } from "@/lib/i18n/config";
import { QuoteIcon, StarIcon } from "@/components/icons";

/* ============ Process steps (4 stages) ============ */
const STEPS = {
  uz: [
    { n: "01", t: "Tahlil va kelishuv", d: "Sizning biznes maqsadlaringizni o'rganib, texnik talabnoma tuzamiz." },
    { n: "02", t: "Dizayn va prototip", d: "UX/UI dizayn, mock-up va interaktiv prototiplar." },
    { n: "03", t: "Ishlab chiqish", d: "Toza arxitektura, kod-review, sinov va tezkor delivery." },
    { n: "04", t: "Ishga tushirish", d: "Deploy, monitoring va keyingi qo'llab-quvvatlash." },
  ],
  ru: [
    { n: "01", t: "Анализ и согласование", d: "Изучаем ваши цели и составляем техническое задание." },
    { n: "02", t: "Дизайн и прототип", d: "UX/UI дизайн, макеты и интерактивные прототипы." },
    { n: "03", t: "Разработка", d: "Чистая архитектура, код-ревью, тестирование, быстрая поставка." },
    { n: "04", t: "Запуск", d: "Деплой, мониторинг и дальнейшая поддержка." },
  ],
  en: [
    { n: "01", t: "Discovery", d: "We study your business goals and define the spec." },
    { n: "02", t: "Design & Prototype", d: "UX/UI design, mock-ups and interactive prototypes." },
    { n: "03", t: "Development", d: "Clean architecture, code reviews, tests, fast delivery." },
    { n: "04", t: "Launch", d: "Deployment, monitoring and ongoing support." },
  ],
};

/* ============ Testimonials ============ */
type Item = { name: string; role: string; quote: string; avatar: string };

const TESTIMONIALS: Record<Locale, Item[]> = {
  uz: [
    { name: "Bekzod", role: "MChJ direktori", avatar: "B", quote: "Saytni o'z vaqtida, sifatli yetkazib berishdi. Yangi mijozlar kelishidan boshlanib, hozir bizning eng samarali kanal." },
    { name: "Madina", role: "Marketing menejer", avatar: "M", quote: "Telegram bot orqali zayavkalarni avtomatlashtirdik — xodimlarimizning vaqti 3 baravar tejaldi." },
    { name: "Jasur", role: "Online do'kon egasi", avatar: "J", quote: "CRM tizim biznesimizni butunlay o'zgartirdi. Hisobotlar bir tugma bosishda paydo bo'ladi." },
  ],
  ru: [
    { name: "Бекзод", role: "Директор ООО", avatar: "Б", quote: "Сайт сдали в срок и качественно. С момента запуска — наш самый эффективный канал для новых клиентов." },
    { name: "Мадина", role: "Маркетолог", avatar: "М", quote: "Автоматизировали заявки через Telegram-бота — высвободили время команды втрое." },
    { name: "Жасур", role: "Владелец интернет-магазина", avatar: "Ж", quote: "CRM полностью изменил наш бизнес. Отчёты в один клик." },
  ],
  en: [
    { name: "Bekzod", role: "CEO, LLC", avatar: "B", quote: "Delivered the site on time and with quality. It became our most effective channel for new clients." },
    { name: "Madina", role: "Marketing Manager", avatar: "M", quote: "Automating leads via Telegram bot saved our team 3x time." },
    { name: "Jasur", role: "E-commerce Owner", avatar: "J", quote: "The CRM transformed our business. Reports in a single click." },
  ],
};

const HEAD = {
  uz: {
    eyebrow: "process · feedback",
    title: "Qanday ishlaymiz va mijozlar nima deyishadi",
    subtitle: "Tartibli, shaffof, natijaga yo'naltirilgan jarayon — va bizga ishongan jamoalarning haqiqiy fikrlari.",
    procLabel: "/ jarayon",
    feedLabel: "/ fikrlar",
  },
  ru: {
    eyebrow: "процесс · отзывы",
    title: "Как мы работаем и что говорят клиенты",
    subtitle: "Структурированный, прозрачный, ориентированный на результат процесс — и реальные отзывы команд, которые нам доверились.",
    procLabel: "/ процесс",
    feedLabel: "/ отзывы",
  },
  en: {
    eyebrow: "process · feedback",
    title: "How we work and what clients say",
    subtitle: "A structured, transparent, results-driven process — and real feedback from teams who trusted us.",
    procLabel: "/ process",
    feedLabel: "/ feedback",
  },
};

const AVATAR_BG = ["#FF4D2E", "#0F0F0F", "#FF6B47"];

export default function ProcessAndTestimonials({ locale }: { locale: Locale }) {
  const steps = STEPS[locale];
  const testimonials = TESTIMONIALS[locale];
  const head = HEAD[locale];

  return (
    <section className="section relative overflow-hidden bg-ink-900 text-cream-50">
      {/* Glow accents */}
      <div aria-hidden className="absolute -top-40 left-1/3 h-96 w-96 rounded-full bg-brand-500/30 blur-3xl animate-blob" />
      <div aria-hidden className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-brand-700/30 blur-3xl animate-blob" style={{ animationDelay: "-7s" }} />
      <div aria-hidden className="absolute inset-0 grid-bg opacity-15" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cream-50/20 to-transparent" />

      <div className="container relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-cream-50/60">
            / {head.eyebrow}
          </span>
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-extrabold tracking-tightest leading-[1.1] text-cream-50">
            {head.title}
          </h2>
          <p className="mt-4 text-cream-50/70 text-base md:text-lg">{head.subtitle}</p>
        </div>

        {/* Two-column: process timeline + testimonials wall */}
        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          {/* PROCESS TIMELINE — left, 7/12 */}
          <div className="lg:col-span-7">
            <div className="mb-6 inline-flex items-center gap-1.5 rounded-full bg-cream-50/10 px-3 py-1.5 ring-1 ring-cream-50/15 font-mono text-[10px] uppercase tracking-[0.18em] text-cream-50/85">
              <span className="inline-block h-1 w-1 rounded-full bg-brand-400" />
              {head.procLabel}
            </div>

            <ol className="relative space-y-4">
              {/* Vertical line */}
              <span aria-hidden className="absolute left-5 top-2 bottom-2 w-px bg-gradient-to-b from-brand-500 via-cream-50/15 to-transparent" />

              {steps.map((s, i) => (
                <li key={s.n} className="relative pl-14">
                  {/* Dot */}
                  <span className="absolute left-2 top-3 grid h-7 w-7 place-items-center rounded-full bg-brand-500 text-cream-50 font-mono text-[10px] font-bold ring-4 ring-ink-900">
                    {i + 1}
                  </span>

                  <div className="rounded-2xl bg-cream-50/[.04] ring-1 ring-cream-50/10 px-5 py-4 backdrop-blur transition hover:bg-cream-50/[.08] hover:ring-brand-500/30">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-xs font-bold text-brand-400">{s.n}</span>
                      <h3 className="text-base md:text-lg font-bold text-cream-50 tracking-tight">{s.t}</h3>
                    </div>
                    <p className="mt-1.5 text-sm leading-6 text-cream-50/70">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* TESTIMONIALS — right, 5/12 — stacked feedback cards */}
          <div className="lg:col-span-5">
            <div className="mb-6 inline-flex items-center gap-1.5 rounded-full bg-cream-50/10 px-3 py-1.5 ring-1 ring-cream-50/15 font-mono text-[10px] uppercase tracking-[0.18em] text-cream-50/85">
              <span className="inline-block h-1 w-1 rounded-full bg-brand-400" />
              {head.feedLabel}
            </div>

            <div className="space-y-4">
              {testimonials.map((it, i) => (
                <figure
                  key={i}
                  className="relative rounded-2xl bg-cream-50/[.04] ring-1 ring-cream-50/10 p-5 backdrop-blur transition hover:bg-cream-50/[.08] hover:ring-brand-500/30"
                >
                  <QuoteIcon size={22} className="text-brand-400/60" />
                  <blockquote className="mt-2 text-sm leading-6 text-cream-50/90">
                    {it.quote}
                  </blockquote>
                  <figcaption className="mt-4 flex items-center gap-3 pt-4 border-t border-cream-50/10">
                    <span
                      className="grid h-9 w-9 place-items-center rounded-full text-cream-50 font-bold text-sm shrink-0"
                      style={{ background: AVATAR_BG[i % AVATAR_BG.length] }}
                    >
                      {it.avatar}
                    </span>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-cream-50 truncate">{it.name}</div>
                      <div className="text-[11px] text-cream-50/55 truncate">{it.role}</div>
                    </div>
                    <span className="ml-auto inline-flex items-center gap-0.5 text-brand-400 shrink-0">
                      {Array.from({ length: 5 }).map((_, k) => (
                        <StarIcon key={k} size={11} />
                      ))}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
