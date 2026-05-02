import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo";
import ContactForm from "@/components/contact/ContactForm";
import {
  ArrowUpRightIcon,
  BotIcon,
  CheckIcon,
  CodeIcon,
  DatabaseIcon,
  GlobeIcon,
  HeartIcon,
  PhoneIcon,
  PlugIcon,
  RocketIcon,
  ShieldIcon,
  SmartphoneIcon,
  SparklesIcon,
  TelegramIcon,
  ZapIcon,
} from "@/components/icons";
import { SITE } from "@/lib/site";

const VALUE_ICONS = [ZapIcon, ShieldIcon, RocketIcon, HeartIcon];

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const t = getDictionary(params.locale);
  return buildMetadata({
    title: t.about.title,
    description: t.about.subtitle,
    path: `/${params.locale}/about`,
    locale: params.locale,
  });
}

export default function AboutPage({ params }: { params: { locale: Locale } }) {
  const t = getDictionary(params.locale);
  const locale = params.locale;

  // ---------------- Locale-specific copy ----------------
  const copy = {
    uz: {
      eyebrow: "/ biz haqimizda",
      heading: (
        <>
          Biz <span className="text-brand-500">muhandis-jamoamiz</span>{" "}
          — kod orqali biznesga foyda yaratamiz
        </>
      ),
      lede:
        "404Dev — Toshkentda joylashgan outsourcing kompaniya. Biznes jarayonlarini avtomatlashtirish, web va mobil mahsulotlar yaratish bo'yicha ixtisoslashganmiz. 2020-yildan beri 60+ kompaniya bilan ishlaganmiz.",
      missionTitle: t.about.missionTitle,
      mission: t.about.mission,
      teamTitle: "Bizning jamoa",
      teamSubtitle:
        "Frontend, backend, mobile, dizayn va SEO bo'yicha mutaxassislar — har biri kamida 3 yillik real loyiha tajribasi bilan.",
      stackTitle: "Texnologiya stek",
      stackSubtitle:
        "Modaga ergashmaymiz — ishonchli, sinovdan o'tgan vositalardan foydalanamiz.",
      industriesTitle: "Biz ishlagan sohalar",
      industriesSubtitle:
        "Logistika, e-commerce, ta'lim, sog'liqni saqlash, fintech va boshqalar — har soha o'z masalasini o'zicha aytadi.",
      whyTitle: "Nega 404Dev",
      whySubtitle:
        "Outsourcing'da biz ko'pchilikdan ajralib turamiz. Quyida — sabablari.",
      brandbookHeading: "Bizning brendbuk",
      brandbookSub:
        "404Dev to'liq vizual tizimi: logotip, ranglar, tipografiya. Brendbuk — biz qiladigan har bir mahsulotning yuzi.",
      formEyebrow: "/ ish boshlaymiz",
      formHeading: "Loyihangiz haqida gaplashaylik",
      formSub:
        "Formani to'ldiring — 1 ish kuni ichida javob beramiz. Brif va konsultatsiya bepul.",
    },
    ru: {
      eyebrow: "/ о нас",
      heading: (
        <>
          Мы — <span className="text-brand-500">инженерная команда</span>,
          создающая ценность для бизнеса через код
        </>
      ),
      lede:
        "404Dev — outsourcing-компания из Ташкента. Специализируемся на автоматизации бизнес-процессов, веб- и мобильных продуктах. С 2020 года работали с 60+ компаниями.",
      missionTitle: t.about.missionTitle,
      mission: t.about.mission,
      teamTitle: "Наша команда",
      teamSubtitle:
        "Специалисты по frontend, backend, mobile, дизайну и SEO — у каждого минимум 3 года реального опыта.",
      stackTitle: "Технологический стек",
      stackSubtitle:
        "Мы не гонимся за модой — используем надёжные, проверенные инструменты.",
      industriesTitle: "Сферы, в которых мы работали",
      industriesSubtitle:
        "Логистика, e-commerce, образование, healthcare, fintech и другие — каждая отрасль говорит на своём языке.",
      whyTitle: "Почему 404Dev",
      whySubtitle:
        "На рынке outsourcing мы выделяемся. Ниже — почему.",
      brandbookHeading: "Наш брендбук",
      brandbookSub:
        "Полная визуальная система 404Dev: логотип, палитра, типографика. Брендбук — лицо за каждым продуктом, который мы делаем.",
      formEyebrow: "/ начнём",
      formHeading: "Расскажите о вашем проекте",
      formSub:
        "Заполните форму — ответим в течение одного рабочего дня. Бриф и консультация бесплатны.",
    },
    en: {
      eyebrow: "/ about us",
      heading: (
        <>
          We are an <span className="text-brand-500">engineering team</span>{" "}
          building business value through code
        </>
      ),
      lede:
        "404Dev is an outsourcing company based in Tashkent. We specialise in business-process automation, web and mobile products. Since 2020, we've worked with 60+ companies.",
      missionTitle: t.about.missionTitle,
      mission: t.about.mission,
      teamTitle: "Our team",
      teamSubtitle:
        "Specialists in frontend, backend, mobile, design and SEO — each with at least 3 years of real-world project experience.",
      stackTitle: "Tech stack",
      stackSubtitle:
        "We don't chase trends — we use reliable, battle-tested tools.",
      industriesTitle: "Industries we've worked in",
      industriesSubtitle:
        "Logistics, e-commerce, education, healthcare, fintech and more — each one speaks its own language.",
      whyTitle: "Why 404Dev",
      whySubtitle:
        "We stand out in the outsourcing market. Here's why.",
      brandbookHeading: "Our brand book",
      brandbookSub:
        "The full 404Dev visual system: logo, palette, typography. The face behind every product we ship.",
      formEyebrow: "/ let's start",
      formHeading: "Tell us about your project",
      formSub:
        "Fill in the form — we'll reply within one business day. Brief and consultation are free.",
    },
  }[locale];

  // ---------------- Static content tables ----------------
  const TIMELINE = {
    uz: [
      { y: "2020", t: "Boshlanish", d: "Kichik jamoa, birinchi 5 mijoz, web ishlanmalar." },
      { y: "2022", t: "O'sish", d: "Telegram bot va mobil ilovalar yo'nalishi qo'shildi." },
      { y: "2023", t: "CRM/ERP", d: "Korporativ buyurtmalar, ichki dashboard'lar, integratsiyalar." },
      { y: "2024", t: "SEO + Marketing", d: "Mijozlarga qidiruv tizimlarida o'sish ulushi qo'shildi." },
      { y: "2025", t: "Bepul maktab", d: "404Dev Learn — o'zbek tilidagi bepul dasturlash darslari ochildi." },
      { y: "2026", t: "Hozir", d: "60+ mijoz, 80+ relizlar, doimiy support va o'sish." },
    ],
    ru: [
      { y: "2020", t: "Старт", d: "Маленькая команда, первые 5 клиентов, веб-разработка." },
      { y: "2022", t: "Рост", d: "Добавилось направление Telegram-ботов и мобильных приложений." },
      { y: "2023", t: "CRM/ERP", d: "Корпоративные заказы, внутренние дашборды, интеграции." },
      { y: "2024", t: "SEO + Маркетинг", d: "Помогаем клиентам расти в поиске." },
      { y: "2025", t: "Бесплатная школа", d: "404Dev Learn — бесплатные уроки на узбекском." },
      { y: "2026", t: "Сегодня", d: "60+ клиентов, 80+ релизов, постоянный support и рост." },
    ],
    en: [
      { y: "2020", t: "Start", d: "Small team, first 5 clients, web development." },
      { y: "2022", t: "Growth", d: "Added Telegram bots and mobile apps." },
      { y: "2023", t: "CRM/ERP", d: "Corporate clients, internal dashboards, integrations." },
      { y: "2024", t: "SEO + Marketing", d: "Helping clients grow in search." },
      { y: "2025", t: "Free school", d: "404Dev Learn — free coding lessons in Uzbek." },
      { y: "2026", t: "Today", d: "60+ clients, 80+ releases, ongoing support and growth." },
    ],
  }[locale];

  const TEAM_ROLES = {
    uz: [
      { Icon: CodeIcon, role: "Frontend muhandislari", n: "4" },
      { Icon: DatabaseIcon, role: "Backend muhandislari", n: "3" },
      { Icon: SmartphoneIcon, role: "Mobile dasturchilari", n: "2" },
      { Icon: SparklesIcon, role: "UX/UI dizaynerlari", n: "2" },
      { Icon: ZapIcon, role: "SEO mutaxassislari", n: "1" },
      { Icon: ShieldIcon, role: "QA va DevOps", n: "2" },
    ],
    ru: [
      { Icon: CodeIcon, role: "Frontend-инженеры", n: "4" },
      { Icon: DatabaseIcon, role: "Backend-инженеры", n: "3" },
      { Icon: SmartphoneIcon, role: "Mobile-разработчики", n: "2" },
      { Icon: SparklesIcon, role: "UX/UI дизайнеры", n: "2" },
      { Icon: ZapIcon, role: "SEO-специалисты", n: "1" },
      { Icon: ShieldIcon, role: "QA и DevOps", n: "2" },
    ],
    en: [
      { Icon: CodeIcon, role: "Frontend engineers", n: "4" },
      { Icon: DatabaseIcon, role: "Backend engineers", n: "3" },
      { Icon: SmartphoneIcon, role: "Mobile developers", n: "2" },
      { Icon: SparklesIcon, role: "UX/UI designers", n: "2" },
      { Icon: ZapIcon, role: "SEO specialists", n: "1" },
      { Icon: ShieldIcon, role: "QA and DevOps", n: "2" },
    ],
  }[locale];

  const STACK_GROUPS = [
    {
      head: { uz: "Frontend", ru: "Frontend", en: "Frontend" },
      items: ["Next.js", "React", "TypeScript", "Tailwind", "Vite"],
    },
    {
      head: { uz: "Backend", ru: "Backend", en: "Backend" },
      items: ["Go", "Node.js", "Python", "FastAPI", "Gin"],
    },
    {
      head: { uz: "Ma'lumot bazasi", ru: "База данных", en: "Database" },
      items: ["PostgreSQL", "MongoDB", "Redis", "S3"],
    },
    {
      head: { uz: "Mobile", ru: "Mobile", en: "Mobile" },
      items: ["React Native", "Flutter", "Swift", "Kotlin"],
    },
    {
      head: { uz: "DevOps / Cloud", ru: "DevOps / Cloud", en: "DevOps / Cloud" },
      items: ["Docker", "AWS", "GCP", "Vercel", "Cloudflare"],
    },
    {
      head: { uz: "Integratsiyalar", ru: "Интеграции", en: "Integrations" },
      items: ["Click", "Payme", "Uzum", "1C", "Telegram Bot API"],
    },
  ];

  const INDUSTRIES = [
    { Icon: GlobeIcon, label: { uz: "E-commerce", ru: "E-commerce", en: "E-commerce" } },
    { Icon: BotIcon, label: { uz: "Logistika", ru: "Логистика", en: "Logistics" } },
    { Icon: SparklesIcon, label: { uz: "Ta'lim", ru: "Образование", en: "Education" } },
    { Icon: ShieldIcon, label: { uz: "Sog'liqni saqlash", ru: "Healthcare", en: "Healthcare" } },
    { Icon: DatabaseIcon, label: { uz: "Fintech", ru: "Fintech", en: "Fintech" } },
    { Icon: PlugIcon, label: { uz: "Ishlab chiqarish", ru: "Производство", en: "Manufacturing" } },
    { Icon: RocketIcon, label: { uz: "Startaplar", ru: "Стартапы", en: "Startups" } },
    { Icon: HeartIcon, label: { uz: "Xayriya", ru: "Благотворительность", en: "Non-profit" } },
  ];

  const WHY_REASONS = {
    uz: [
      { t: "Brif va baho bepul", d: "30 daqiqalik qo'ng'iroq + 1-2 kun ichida batafsil baho." },
      { t: "Aniq narx, aniq muddat", d: "Hech qanday yashirin to'lov, sprint asosida ishlash." },
      { t: "Toza kod, hujjat, sinov", d: "Loyiha tugaganda hammasi sizga to'liq topshiriladi." },
      { t: "Reliz keyin support", d: "Birinchi 30 kun bepul bug-fix, keyin SLA shartnoma." },
      { t: "NDA imzolaymiz", d: "Sizning g'oyangiz va ma'lumotingiz to'liq himoyada." },
      { t: "O'zbek + rus + ingliz", d: "Mijoz qulay tilda — biz har 3 tilda ishlaymiz." },
    ],
    ru: [
      { t: "Бриф и оценка бесплатны", d: "Звонок 30 минут + детальная оценка за 1-2 дня." },
      { t: "Понятная цена и сроки", d: "Никаких скрытых платежей, работаем спринтами." },
      { t: "Чистый код, документация, тесты", d: "По завершении всё передаётся клиенту." },
      { t: "Поддержка после релиза", d: "Первые 30 дней — бесплатный bug-fix, далее SLA." },
      { t: "Подписываем NDA", d: "Ваша идея и данные полностью защищены." },
      { t: "Узбекский + русский + английский", d: "Клиент на удобном языке — мы работаем на 3 языках." },
    ],
    en: [
      { t: "Free brief and estimate", d: "30-min call + detailed estimate within 1-2 days." },
      { t: "Clear price, clear timeline", d: "No hidden fees, sprint-based delivery." },
      { t: "Clean code, docs, tests", d: "Everything is handed over when the project ends." },
      { t: "Post-launch support", d: "First 30 days bug-fix free, then SLA." },
      { t: "NDA signed", d: "Your idea and data are fully protected." },
      { t: "Uzbek + Russian + English", d: "Client speaks any of three — so do we." },
    ],
  }[locale];

  const VALUES = t.about.values.slice(0, 4);

  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="relative overflow-hidden bg-cream-100">
        <div aria-hidden className="absolute inset-0 -z-10 aurora opacity-50" />
        <div aria-hidden className="absolute inset-0 -z-10 grid-bg opacity-50" />
        <div aria-hidden className="absolute -top-32 -right-24 -z-10 h-[26rem] w-[26rem] rounded-full bg-brand-500/15 blur-3xl animate-blob" />
        <div aria-hidden className="absolute -bottom-32 -left-24 -z-10 h-80 w-80 rounded-full bg-brand-300/25 blur-3xl animate-blob" style={{ animationDelay: "-5s" }} />

        <div className="container py-16 md:py-20">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            <div className="lg:col-span-8">
              <span className="eyebrow">{copy.eyebrow}</span>
              <h1 className="display-1 mt-4">{copy.heading}</h1>
              <p className="mt-6 text-ink-700 text-base md:text-lg max-w-2xl leading-relaxed">{copy.lede}</p>
            </div>

            <div className="lg:col-span-4">
              <div className="grid grid-cols-3 gap-3">
                {[
                  { v: "60+", l: t.home.statsClients },
                  { v: "80+", l: t.home.statsProjects },
                  { v: "5+", l: t.home.statsYears },
                ].map((s) => (
                  <div key={s.v} className="card p-4 text-center">
                    <div className="font-display text-2xl md:text-3xl font-extrabold tracking-tightest text-ink-900 leading-none">
                      {s.v}
                    </div>
                    <div className="mt-1 text-[10px] md:text-[11px] text-ink-600 leading-tight">
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href={`/${locale}/portfolio`}
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-900 hover:text-brand-600 transition"
              >
                {locale === "ru" ? "Наши работы" : locale === "en" ? "Our work" : "Loyihalarimiz"}
                <ArrowUpRightIcon size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== MISSION ===================== */}
      <section className="section-tight">
        <div className="container">
          <div className="rounded-3xl bg-ink-900 px-7 py-10 md:p-14 text-cream-50 relative overflow-hidden">
            <div aria-hidden className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-brand-500/25 blur-3xl" />
            <div aria-hidden className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-brand-700/25 blur-3xl" />
            <div className="relative grid lg:grid-cols-[1fr_2fr] gap-6 items-start">
              <span className="eyebrow-dark">/ {copy.missionTitle}</span>
              <p className="font-display text-2xl md:text-3xl font-semibold leading-snug tracking-tight">
                {copy.mission}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== VALUES (4 cards) ===================== */}
      <section className="section-tight">
        <div className="container">
          <div className="max-w-2xl">
            <span className="eyebrow">/ {t.about.valuesTitle}</span>
            <h2 className="display-2 mt-3">
              {locale === "ru" ? "Что для нас важно" :
               locale === "en" ? "What matters to us" :
               "Bizga nima muhim"}
            </h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => {
              const Icon = VALUE_ICONS[i % VALUE_ICONS.length];
              return (
                <div key={i} className="card card-hover p-6 relative overflow-hidden group">
                  <div aria-hidden className="absolute -top-12 -right-12 h-24 w-24 rounded-full bg-brand-500/0 group-hover:bg-brand-500/15 blur-2xl transition" />
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-500 text-cream-50 ring-1 ring-brand-600 shadow-coral">
                    <Icon size={20} />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-extrabold tracking-tight text-ink-900">
                    {v.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-6 text-ink-700">{v.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================== TIMELINE ===================== */}
      <section className="section-tight bg-cream-100 border-y border-ink-200">
        <div className="container">
          <div className="max-w-2xl">
            <span className="eyebrow">/ {locale === "ru" ? "путь" : locale === "en" ? "journey" : "yo'l"}</span>
            <h2 className="display-2 mt-3">
              {locale === "ru" ? "Как мы росли" :
               locale === "en" ? "How we grew" :
               "Qanday o'sib bordik"}
            </h2>
          </div>

          <ol className="relative mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TIMELINE.map((t, i) => (
              <li
                key={t.y}
                className="relative card p-5 group hover:-translate-y-1 hover:ring-brand-500/40 transition"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-3xl font-extrabold tracking-tightest text-brand-500 leading-none">
                    {t.y}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-base font-extrabold tracking-tight text-ink-900">
                  {t.t}
                </h3>
                <p className="mt-1 text-sm text-ink-700 leading-6">{t.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ===================== TEAM ===================== */}
      <section className="section-tight">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5">
              <span className="eyebrow">/ team</span>
              <h2 className="display-2 mt-3">{copy.teamTitle}</h2>
              <p className="mt-4 text-ink-700 text-base md:text-lg max-w-md">{copy.teamSubtitle}</p>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-cream-50 ring-1 ring-ink-200 px-4 py-2 font-mono text-sm">
                <span className="font-display text-2xl font-extrabold text-brand-500 leading-none">14</span>
                <span className="text-ink-700">
                  {locale === "ru" ? "человек в команде" : locale === "en" ? "people on the team" : "ta jamoa a'zosi"}
                </span>
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {TEAM_ROLES.map((r, i) => (
                  <div key={i} className="card p-4 flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                      <r.Icon size={18} />
                    </span>
                    <div className="min-w-0">
                      <div className="font-display text-lg font-extrabold leading-none text-ink-900">{r.n}</div>
                      <div className="text-[11px] text-ink-600 leading-tight truncate">{r.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== STACK ===================== */}
      <section className="section-tight bg-ink-900 text-cream-50 relative overflow-hidden">
        <div aria-hidden className="absolute -top-32 right-0 h-96 w-96 rounded-full bg-brand-500/20 blur-3xl" />
        <div aria-hidden className="absolute -bottom-32 left-0 h-80 w-80 rounded-full bg-brand-700/15 blur-3xl" />

        <div className="container relative">
          <div className="max-w-2xl">
            <span className="eyebrow-dark">/ stack</span>
            <h2 className="mt-3 font-display text-3xl md:text-5xl font-extrabold tracking-tightest leading-[1.1]">
              {copy.stackTitle}
            </h2>
            <p className="mt-4 text-cream-50/75 text-base md:text-lg">{copy.stackSubtitle}</p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {STACK_GROUPS.map((g, i) => (
              <div
                key={i}
                className="rounded-2xl bg-cream-50/[.04] ring-1 ring-cream-50/10 p-5 backdrop-blur transition hover:bg-cream-50/[.08] hover:ring-brand-500/30"
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream-50/60">
                  /{" "}
                  {g.head[locale]}
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {g.items.map((it) => (
                    <span
                      key={it}
                      className="rounded-full bg-cream-50/10 ring-1 ring-cream-50/15 px-2.5 py-1 font-mono text-[11px] text-cream-50/95"
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== INDUSTRIES ===================== */}
      <section className="section-tight">
        <div className="container">
          <div className="max-w-2xl">
            <span className="eyebrow">/ {locale === "ru" ? "сферы" : locale === "en" ? "industries" : "sohalar"}</span>
            <h2 className="display-2 mt-3">{copy.industriesTitle}</h2>
            <p className="mt-4 text-ink-700 text-base md:text-lg max-w-xl">
              {copy.industriesSubtitle}
            </p>
          </div>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {INDUSTRIES.map((it, i) => (
              <div key={i} className="card p-4 flex items-center gap-3 hover:-translate-y-0.5 hover:ring-brand-500/40 transition">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                  <it.Icon size={18} />
                </span>
                <span className="font-medium text-ink-900 text-sm">{it.label[locale]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== WHY 404DEV ===================== */}
      <section className="section-tight bg-cream-100 border-t border-ink-200">
        <div className="container">
          <div className="max-w-2xl">
            <span className="eyebrow">/ why</span>
            <h2 className="display-2 mt-3">{copy.whyTitle}</h2>
            <p className="mt-4 text-ink-700 text-base md:text-lg max-w-xl">{copy.whySubtitle}</p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_REASONS.map((r, i) => (
              <div key={i} className="card p-6 group hover:-translate-y-1 hover:ring-brand-500/40 transition">
                <div className="flex items-start gap-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-500 text-cream-50">
                    <CheckIcon size={14} />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-extrabold tracking-tight text-ink-900 leading-snug">
                      {r.t}
                    </h3>
                    <p className="mt-1 text-sm text-ink-700 leading-6">{r.d}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== BRANDBOOK SVG (compact) ===================== */}
      <section className="section-tight">
        <div className="container">
          <div className="max-w-2xl">
            <span className="eyebrow">/ brand identity</span>
            <h2 className="display-2 mt-3">{copy.brandbookHeading}</h2>
            <p className="mt-4 text-ink-700 text-base md:text-lg max-w-xl">{copy.brandbookSub}</p>
          </div>

          {/* Quick spec grid */}
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <SpecCard label="primary" value="#0F0F0F" swatch="bg-ink-900" textOnSwatch="text-cream-50" />
            <SpecCard label="accent · coral" value="#FF4D2E" swatch="bg-brand-500" textOnSwatch="text-cream-50" />
            <SpecCard label="surface · cream" value="#F2EEE5" swatch="bg-cream-100 ring-1 ring-ink-200" textOnSwatch="text-ink-900" />
            <SpecCard label="neutral · gray" value="#6B6B6B" swatch="bg-ink-500" textOnSwatch="text-cream-50" />
          </div>

          <div className="mt-8 rounded-3xl bg-cream-50 ring-1 ring-ink-200 shadow-card overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-ink-200 font-mono text-[11px] text-ink-700">
              <span>/ 404devBrandBook.svg</span>
              <a
                href="/brandbook.svg"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-brand-500 transition"
              >
                {locale === "ru" ? "Открыть в новой вкладке" : locale === "en" ? "Open in new tab" : "Yangi sahifada ochish"}
                <ArrowUpRightIcon size={12} />
              </a>
            </div>
            <div className="relative w-full bg-cream-100">
              <object
                data="/brandbook.svg"
                type="image/svg+xml"
                aria-label="404Dev brandbook"
                className="block w-full"
                style={{ height: "min(2700px, 220vh)" }}
              >
                <Image
                  src="/brandbook.svg"
                  alt="404Dev brandbook"
                  width={690}
                  height={2690}
                  className="w-full h-auto"
                  unoptimized
                />
              </object>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== CONTACT FORM (bottom) ===================== */}
      <section className="section bg-cream-100 border-t border-ink-200">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Left — pitch + side info */}
            <div className="lg:col-span-5">
              <span className="eyebrow">{copy.formEyebrow}</span>
              <h2 className="display-2 mt-3">{copy.formHeading}</h2>
              <p className="mt-4 text-ink-700 text-base md:text-lg max-w-md">{copy.formSub}</p>

              <ul className="mt-7 space-y-3">
                <li className="flex items-start gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-500 text-cream-50 ring-1 ring-brand-600 shadow-coral">
                    <CheckIcon size={14} />
                  </span>
                  <span className="text-sm text-ink-800 leading-6 pt-1">
                    {locale === "ru" ? "Бесплатная консультация 30 минут" :
                     locale === "en" ? "Free 30-min consultation" :
                     "Bepul 30-daqiqalik konsultatsiya"}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-500 text-cream-50 ring-1 ring-brand-600 shadow-coral">
                    <CheckIcon size={14} />
                  </span>
                  <span className="text-sm text-ink-800 leading-6 pt-1">
                    {locale === "ru" ? "Оценка проекта в течение 1-2 дней" :
                     locale === "en" ? "Project estimate in 1-2 days" :
                     "1-2 kun ichida loyiha bahosi"}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-500 text-cream-50 ring-1 ring-brand-600 shadow-coral">
                    <CheckIcon size={14} />
                  </span>
                  <span className="text-sm text-ink-800 leading-6 pt-1">
                    {locale === "ru" ? "NDA по запросу" :
                     locale === "en" ? "NDA available on request" :
                     "So'rovga ko'ra NDA imzolaymiz"}
                  </span>
                </li>
              </ul>

              {/* Direct contact buttons */}
              <div className="mt-7 grid grid-cols-2 gap-3">
                <a
                  href={`tel:${SITE.phoneRaw}`}
                  className="card card-hover p-4 flex items-center gap-3"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-ink-900 text-cream-50">
                    <PhoneIcon size={16} />
                  </span>
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-ink-500">
                      {locale === "ru" ? "Звонок" : locale === "en" ? "Call" : "Qo'ng'iroq"}
                    </div>
                    <div className="font-semibold text-ink-900 text-sm truncate">{SITE.phone}</div>
                  </div>
                </a>
                <a
                  href={SITE.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card card-hover p-4 flex items-center gap-3"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand-500 text-cream-50 ring-1 ring-brand-600">
                    <TelegramIcon size={16} />
                  </span>
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-ink-500">
                      Telegram
                    </div>
                    <div className="font-semibold text-ink-900 text-sm truncate">
                      {locale === "ru" ? "Написать" : locale === "en" ? "Message" : "Yozish"}
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Right — form */}
            <div className="lg:col-span-7">
              <div className="card p-6 md:p-8 relative overflow-hidden">
                <div aria-hidden className="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-brand-500/15 blur-3xl" />
                <div className="relative">
                  <ContactForm locale={locale} source="/about-bottom" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function SpecCard({
  label,
  value,
  swatch,
  textOnSwatch,
}: {
  label: string;
  value: string;
  swatch: string;
  textOnSwatch: string;
}) {
  return (
    <div className="rounded-2xl bg-cream-50 ring-1 ring-ink-200 overflow-hidden">
      <div className={`relative h-24 flex items-end p-3 ${swatch}`}>
        <span className={`font-mono text-[10px] uppercase tracking-[0.18em] ${textOnSwatch} opacity-80`}>
          {label}
        </span>
      </div>
      <div className="px-3 py-2 font-mono text-xs text-ink-900">{value}</div>
    </div>
  );
}
