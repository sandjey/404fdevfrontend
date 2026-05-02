"use client";

import { useState } from "react";
import { type Locale } from "@/lib/i18n/config";
import { ChevronDownIcon, SparklesIcon } from "@/components/icons";
import { useContactModal } from "@/lib/modal-store";
import { cn } from "@/lib/utils";

const FAQS: Record<Locale, { q: string; a: string }[]> = {
  uz: [
    { q: "Loyiha qancha vaqtda tayyor bo'ladi?", a: "Mu'rod loyihalar (landing, oddiy bot) — 1-2 hafta. Web saytlar — 3-6 hafta. Murakkab CRM/ERP — 2-4 oy. Aniqroq bahoni shartnomadan oldin beramiz." },
    { q: "Narx qanday hisoblanadi?", a: "Loyiha hajmi va murakkabligiga qarab. Brifdan keyin batafsil bahoni olasiz. To'lov bosqichma-bosqich (50% boshlanishida, qolgani milestonelar bo'yicha)." },
    { q: "Brif yoki konsultatsiya pulli mi?", a: "Yo'q, onlayn brif va birinchi konsultatsiya bepul. Maqsadingizni eshitamiz, mumkin bo'lgan yo'llarni aytib beramiz." },
    { q: "Loyiha tugagandan keyin qo'llab-quvvatlash bormi?", a: "Ha. Birinchi 30 kun bepul (bug-fix). Keyin oylik kelishuv yoki SLA shartnomasi orqali doimiy support taklif qilamiz." },
    { q: "Source kod menga to'liq tegadimi?", a: "Albatta. Hamma kod, ma'lumotlar bazasi, GitHub repo, hujjatlar va admin panel sizniki bo'ladi. Hech narsa biz tomonda saqlanmaydi." },
    { q: "Qaysi texnologiyalardan foydalanasizlar?", a: "Frontend: Next.js, React, TypeScript, Tailwind. Backend: Go, Node.js, Python. DB: PostgreSQL, MongoDB. Mobile: React Native / Flutter. Cloud: AWS, GCP, Vercel." },
    { q: "Sayt SEO uchun tayyor bo'ladimi?", a: "Ha. Schema.org meta, sitemap, OG-image, server-side rendering, Core Web Vitals — barchasi default-da. Google va Yandex'da 1-sahifaga yo'lni boshlaymiz." },
    { q: "Dizayn jarayoni qanday ketadi?", a: "Avval wireframe (struktura), keyin Figma'da to'liq UI dizayn. Siz har qadamda ko'rib, kommentariya berasiz. Yakuniy tasdiqdan keyingina kod yoziladi." },
    { q: "Mavjud saytni / botni yaxshilab berasizmi?", a: "Ha. Audit qilamiz — qaysi qismi qayta yozish kerak, qaysi qismi tezda tuzatiladi. Ko'pincha hammasini noldan qilishdan ko'ra qismlab yangilash arzonroq." },
    { q: "NDA imzolaysizmi?", a: "Albatta. Brifdan oldin NDA imzolashga tayyormiz — sizning g'oya va ma'lumotlaringiz to'liq himoyada bo'ladi." },
    { q: "To'lov qanday qabul qilinadi?", a: "Bank o'tkazma (yur. shaxs) yoki Click / Payme (jismoniy shaxs). Xorijiy mijozlar uchun USD bank o'tkazma yoki crypto (USDT) variantlari ham bor." },
    { q: "Loyiha boshlash uchun nima kerak?", a: "Faqat g'oya va biroz vaqt. Texnik talabnoma kerak emas — biz brifda shu jihatlarni o'zimiz ochamiz va hujjatlashtiramiz." },
  ],
  ru: [
    { q: "Сколько займёт реализация проекта?", a: "Простые (лендинг, бот) — 1-2 недели. Сайты — 3-6 недель. CRM/ERP — 2-4 месяца. Точнее — после брифа." },
    { q: "Как формируется стоимость?", a: "По объёму и сложности. После брифа — детальная оценка. Оплата поэтапная (50% старт + по milestone)." },
    { q: "Бриф или консультация платные?", a: "Нет, онлайн-бриф и первая консультация бесплатные. Услышим вашу цель и предложим варианты." },
    { q: "Есть ли поддержка после релиза?", a: "Да. Первые 30 дней — бесплатные баг-фиксы. Дальше — ежемесячная поддержка или SLA." },
    { q: "Передаётся ли исходный код клиенту?", a: "Да. Весь код, БД, GitHub-репо, документация и админка — ваши. На нашей стороне ничего не остаётся." },
    { q: "Какой стек используете?", a: "Frontend: Next.js, React, TypeScript, Tailwind. Backend: Go, Node, Python. DB: PostgreSQL, MongoDB. Mobile: React Native / Flutter. Cloud: AWS, GCP, Vercel." },
    { q: "Сайт будет SEO-готовым?", a: "Да. Schema.org, sitemap, OG-image, SSR, Core Web Vitals — всё по умолчанию. Запуск пути в топ Google и Яндекса." },
    { q: "Как идёт процесс дизайна?", a: "Сначала wireframe (структура), затем полный UI в Figma. Вы видите и комментируете каждый шаг. Кодим только после финального утверждения." },
    { q: "Доработаете существующий сайт / бота?", a: "Да. Делаем аудит — что переписать, а что починить быстро. Часто частичный апгрейд дешевле, чем переделка с нуля." },
    { q: "Подписываете NDA?", a: "Конечно. Подпишем NDA до брифа — ваши идеи и данные полностью защищены." },
    { q: "Как принимаете оплату?", a: "Банковский перевод (юр. лица) или Click / Payme (физ. лица). Для зарубежных клиентов — USD-перевод или USDT." },
    { q: "Что нужно, чтобы начать?", a: "Только идея и немного времени. Тех-задание не обязательно — мы сами раскроем детали на брифе и задокументируем." },
  ],
  en: [
    { q: "How long will my project take?", a: "Simple (landing, bot) — 1-2 weeks. Sites — 3-6 weeks. CRM/ERP — 2-4 months. Detailed estimate after the brief." },
    { q: "How is pricing calculated?", a: "Based on scope and complexity. Detailed quote after brief. Payment in stages (50% upfront + milestones)." },
    { q: "Is the brief or consultation paid?", a: "No, the online brief and first consultation are free. We'll hear your goal and outline possible paths." },
    { q: "Is there support after launch?", a: "Yes. First 30 days bug-fixes are free. Then monthly support or an SLA." },
    { q: "Do we own the source code?", a: "Absolutely. All code, DB, GitHub repo, docs and admin panel are yours. Nothing stays on our side." },
    { q: "What's your tech stack?", a: "Frontend: Next.js, React, TS, Tailwind. Backend: Go, Node.js, Python. DB: PostgreSQL, MongoDB. Mobile: React Native / Flutter. Cloud: AWS, GCP, Vercel." },
    { q: "Is the site SEO-ready?", a: "Yes. Schema.org, sitemap, OG image, SSR, Core Web Vitals — all by default. Built to climb to page one of Google and Yandex." },
    { q: "How does the design process go?", a: "Wireframe first (structure), then full UI in Figma. You see and comment on every step. We only start coding after final sign-off." },
    { q: "Will you upgrade an existing site / bot?", a: "Yes. We audit — what to rewrite vs. patch quickly. Partial upgrades are usually cheaper than a full rewrite." },
    { q: "Do you sign an NDA?", a: "Of course. We can sign an NDA before the brief — your ideas and data stay fully protected." },
    { q: "How can I pay?", a: "Bank transfer (legal entity) or Click / Payme (individual). For international clients — USD wire or USDT." },
    { q: "What do I need to start?", a: "Just an idea and a bit of time. No spec required — we'll uncover and document the details during the brief." },
  ],
};

const HEAD = {
  uz: { eyebrow: "/ FAQ", title: "Tez-tez beriladigan savollar", subtitle: "Qisqa va aniq javoblar — yana savol bo'lsa, biz bilan bog'laning, 1 ish kuni ichida javob beramiz.", askMore: "Yana savolingiz bormi?", askButton: "Bizga yozing" },
  ru: { eyebrow: "/ FAQ", title: "Часто задаваемые вопросы", subtitle: "Краткие и понятные ответы — есть ещё вопрос? Напишите нам, ответим в течение 1 рабочего дня.", askMore: "Остались вопросы?", askButton: "Напишите нам" },
  en: { eyebrow: "/ FAQ", title: "Frequently asked questions", subtitle: "Short, clear answers — got another question? Reach out and we'll reply within one business day.", askMore: "Still have questions?", askButton: "Get in touch" },
};

export default function FAQ({ locale }: { locale: Locale }) {
  const items = FAQS[locale];
  const head = HEAD[locale];
  const [open, setOpen] = useState<number | null>(0);
  const openModal = useContactModal((s) => s.openModal);

  // Two columns of items on lg
  const half = Math.ceil(items.length / 2);
  const cols = [items.slice(0, half), items.slice(half)];

  // FAQ structured data — gives Google/Yandex an FAQ rich snippet on SERP
  const faqLD = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };

  return (
    <section className="section relative overflow-hidden bg-cream-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLD) }}
      />
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ink-300/60 to-transparent" />
      <div aria-hidden className="absolute -top-40 left-1/3 h-96 w-96 rounded-full bg-brand-500/10 blur-3xl" />
      <div aria-hidden className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-brand-300/10 blur-3xl" />

      <div className="container relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="eyebrow">{head.eyebrow}</span>
          <h2 className="display-2 mt-3">{head.title}</h2>
          <p className="mt-4 text-ink-700 text-base md:text-lg">{head.subtitle}</p>
        </div>

        {/* Two-column FAQ list */}
        <div className="mt-12 grid gap-4 lg:gap-5 lg:grid-cols-2">
          {cols.map((col, ci) => (
            <div key={ci} className="space-y-3">
              {col.map((it, idx) => {
                const i = ci * half + idx;
                const isOpen = open === i;
                return (
                  <div
                    key={i}
                    className={cn(
                      "rounded-2xl ring-1 transition-all duration-300 overflow-hidden",
                      isOpen
                        ? "bg-cream-50 ring-brand-500/40 shadow-card"
                        : "bg-cream-50 ring-ink-200 hover:ring-ink-300"
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="w-full flex items-start justify-between gap-4 px-5 md:px-6 py-4 md:py-5 text-left"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <span
                          className={cn(
                            "shrink-0 mt-0.5 grid h-7 w-7 place-items-center rounded-full font-mono text-[11px] font-bold transition",
                            isOpen
                              ? "bg-brand-500 text-cream-50"
                              : "bg-ink-100 text-ink-700"
                          )}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-semibold text-ink-900 text-[15px] md:text-base leading-snug">
                          {it.q}
                        </span>
                      </div>
                      <ChevronDownIcon
                        size={18}
                        className={cn(
                          "shrink-0 text-ink-500 transition-transform mt-1",
                          isOpen && "rotate-180 text-brand-500"
                        )}
                      />
                    </button>
                    <div
                      className="grid transition-[grid-template-rows] duration-300 ease-out"
                      style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                    >
                      <div className="overflow-hidden">
                        <p className="px-5 md:px-6 pb-5 pl-[60px] md:pl-[72px] text-sm md:text-[15px] text-ink-700 leading-7">
                          {it.a}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* "Still have questions?" CTA */}
        <div className="mt-12 rounded-3xl bg-ink-900 text-cream-50 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-5 relative overflow-hidden">
          <div aria-hidden className="absolute -top-20 -right-12 h-56 w-56 rounded-full bg-brand-500/30 blur-3xl" />
          <div className="relative flex items-center gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-500/20 text-brand-400 ring-1 ring-brand-500/30">
              <SparklesIcon size={20} />
            </span>
            <div>
              <h3 className="font-display text-xl md:text-2xl font-extrabold tracking-tightest text-cream-50">
                {head.askMore}
              </h3>
              <p className="mt-1 text-sm text-cream-50/70">
                {locale === "ru"
                  ? "Ответим в течение одного рабочего дня."
                  : locale === "en"
                  ? "We reply within one business day."
                  : "1 ish kuni ichida javob beramiz."}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => openModal("faq-cta")}
            className="btn btn-accent btn-md shrink-0"
          >
            {head.askButton}
          </button>
        </div>
      </div>
    </section>
  );
}
