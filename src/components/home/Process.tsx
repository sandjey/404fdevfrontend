import { type Locale } from "@/lib/i18n/config";

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

const SECTION_TITLE = {
  uz: { eyebrow: "Bizning jarayon", title: "Tartibli, shaffof va natijaga yo'naltirilgan" },
  ru: { eyebrow: "Наш процесс", title: "Структурированный, прозрачный, нацеленный на результат" },
  en: { eyebrow: "Our process", title: "Structured, transparent, results-driven" },
};

export default function Process({ locale }: { locale: Locale }) {
  const steps = STEPS[locale];
  const head = SECTION_TITLE[locale];

  return (
    <section className="section bg-cream-100 relative">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ink-300/60 to-transparent" />
      <div className="container">
        <div className="max-w-2xl">
          <span className="eyebrow">/ {head.eyebrow}</span>
          <h2 className="display-2 mt-3">{head.title}</h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.n} className="relative">
              <div className="card card-hover p-6 h-full">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xl font-extrabold text-brand-500">{s.n}</span>
                  <span className="h-px flex-1 bg-ink-300/60" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-ink-900 tracking-tight">{s.t}</h3>
                <p className="mt-2 text-sm leading-6 text-ink-700">{s.d}</p>
              </div>
              {i < steps.length - 1 && (
                <span className="hidden lg:block absolute top-1/2 -right-3 -translate-y-1/2 text-brand-500 font-bold">
                  →
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
