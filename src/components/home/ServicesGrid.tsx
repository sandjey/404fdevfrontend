import Link from "next/link";
import { type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import {
  ArrowUpRightIcon,
  BotIcon,
  CodeIcon,
  DatabaseIcon,
  InstagramIcon,
  PlugIcon,
  RocketIcon,
  SparklesIcon,
  ZapIcon,
} from "@/components/icons";

/* ============================================================
   HOME — 7 GROWTH PRACTICES preview.
   Mirrors src/app/[locale]/services/page.tsx structure but copy
   is shorter. Each card is framed as a business outcome.
   ============================================================ */

type ServiceMeta = {
  slug: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  badge: { uz: string; ru: string; en: string };
  /** short title shown on the card */
  title: { uz: string; ru: string; en: string };
  /** one-line outcome — read first */
  outcome: { uz: string; ru: string; en: string };
  /** longer description */
  desc: { uz: string; ru: string; en: string };
};

const SERVICES: ServiceMeta[] = [
  {
    slug: "seo-growth",
    Icon: ZapIcon,
    badge: { uz: "01 / Growth", ru: "01 / Growth", en: "01 / Growth" },
    title: { uz: "SEO & Growth", ru: "SEO & Growth", en: "SEO & Growth" },
    outcome: {
      uz: "Har oy o'sayotgan organik trafik",
      ru: "Растущий органический трафик каждый месяц",
      en: "Organic traffic that compounds every month",
    },
    desc: {
      uz: "Texnik SEO, programmatic SEO va kontent strategiya — Google va Yandex'da 1-sahifa.",
      ru: "Технический SEO, programmatic SEO и контент-стратегия — 1 страница в Google и Яндекс.",
      en: "Technical SEO, programmatic SEO and content strategy — page-one rankings on Google & Yandex.",
    },
  },
  {
    slug: "lead-generation",
    Icon: RocketIcon,
    badge: { uz: "02 / Leads", ru: "02 / Leads", en: "02 / Leads" },
    title: { uz: "Lead Generation", ru: "Lead Generation", en: "Lead Generation" },
    outcome: {
      uz: "Saytdan haqiqiy mijoz oqimi, trafik emas",
      ru: "Поток клиентов с сайта, а не «трафик»",
      en: "A real customer pipeline, not just traffic",
    },
    desc: {
      uz: "Lid voronkalari, CRO, CRM va analitika — har bir tashrifni mijozga aylantirish tizimi.",
      ru: "Лид-воронки, CRO, CRM и аналитика — система превращения визитов в клиентов.",
      en: "Lead funnels, CRO, CRM and analytics — a system that turns visitors into customers.",
    },
  },
  {
    slug: "influencer-marketing",
    Icon: InstagramIcon,
    badge: { uz: "03 / Influence", ru: "03 / Influence", en: "03 / Influence" },
    title: { uz: "Influencer Marketing", ru: "Influencer Marketing", en: "Influencer Marketing" },
    outcome: {
      uz: "Blogerlar bilan reklama — kampaniyalar siz uchun",
      ru: "Реклама у блогеров — кампании под ключ",
      en: "Creator-led campaigns, fully managed",
    },
    desc: {
      uz: "O'zbekistonning eng kuchli blogerlari — bizga yozasiz, blogerga emas. Bloger tanlash, kelishuv, tekst va publish — biz uchun. To'lov bosqichlarga bo'lingan, ROI shaffof.",
      ru: "Лучшие блогеры Узбекистана — пишете нам, не блогеру. Подбор, согласование, тексты и публикация — на нашей стороне. Оплата делится на этапы, ROI прозрачный.",
      en: "Uzbekistan's strongest creators — you write to us, not the creator. Picks, negotiation, copy and publishing on us. Staged payment, transparent ROI.",
    },
  },
  {
    slug: "ai-automation",
    Icon: SparklesIcon,
    badge: { uz: "04 / AI", ru: "04 / AI", en: "04 / AI" },
    title: { uz: "AI & Automation", ru: "AI & Automation", en: "AI & Automation" },
    outcome: {
      uz: "24/7 ishlovchi raqamli xodim",
      ru: "Цифровой сотрудник, работающий 24/7",
      en: "A digital employee that works 24/7",
    },
    desc: {
      uz: "AI chatbotlar, Telegram avtomatlashtirish, ish jarayonlari va aqlli yordamchilar — biznesga GPT, Gemini va custom LLM darajasida.",
      ru: "AI чат-боты, автоматизация Telegram, рабочие процессы и умные ассистенты — на уровне GPT, Gemini и кастомных LLM.",
      en: "AI chatbots, Telegram automation, workflows and smart assistants — on top of GPT, Gemini and custom LLMs.",
    },
  },
  {
    slug: "web-development",
    Icon: CodeIcon,
    badge: { uz: "05 / Web", ru: "05 / Web", en: "05 / Web" },
    title: { uz: "Web Development", ru: "Web Development", en: "Web Development" },
    outcome: {
      uz: "Yuqori konversiyali sayt va platformalar",
      ru: "Высококонверсионные сайты и платформы",
      en: "High-conversion sites and platforms",
    },
    desc: {
      uz: "Korporativ sayt, landing, e-commerce va SaaS — Next.js, Lighthouse 95+, SEO-tayyor.",
      ru: "Корпоративные сайты, лендинги, e-commerce и SaaS — Next.js, Lighthouse 95+, SEO-готово.",
      en: "Corporate sites, landings, e-commerce and SaaS — Next.js, Lighthouse 95+, SEO-ready.",
    },
  },
  {
    slug: "business-systems",
    Icon: DatabaseIcon,
    badge: { uz: "06 / Systems", ru: "06 / Systems", en: "06 / Systems" },
    title: { uz: "Business Systems", ru: "Business Systems", en: "Business Systems" },
    outcome: {
      uz: "Kompaniyaning butun jarayoni bitta tizimda",
      ru: "Все процессы компании в одной системе",
      en: "Every company process in one system",
    },
    desc: {
      uz: "CRM, ERP, dispatch, logistika va SaaS platformalar — B2B-darajadagi muhandislik bilan.",
      ru: "CRM, ERP, dispatch, логистика и SaaS — на инженерном B2B-уровне.",
      en: "CRM, ERP, dispatch, logistics and SaaS — at engineering-grade B2B quality.",
    },
  },
  {
    slug: "branding-design",
    Icon: BotIcon,
    badge: { uz: "07 / Brand", ru: "07 / Brand", en: "07 / Brand" },
    title: { uz: "Branding & Design", ru: "Branding & Design", en: "Branding & Design" },
    outcome: {
      uz: "Premium, xalqaro his uyg'otadigan brend",
      ru: "Премиальный бренд международного уровня",
      en: "A premium, international-grade brand",
    },
    desc: {
      uz: "Brand identity, logo, brand book, UI/UX va design system — premium narx asoslangan vizual til.",
      ru: "Brand identity, лого, brand book, UI/UX и design system — визуальный язык, оправдывающий премиум-цену.",
      en: "Brand identity, logo, brand book, UI/UX and design system — a visual language that justifies premium pricing.",
    },
  },
  {
    slug: "infrastructure",
    Icon: PlugIcon,
    badge: { uz: "08 / Infra", ru: "08 / Infra", en: "08 / Infra" },
    title: { uz: "Infrastructure", ru: "Infrastructure", en: "Infrastructure" },
    outcome: {
      uz: "Tezkor, barqaror va xavfsiz texnik fundament",
      ru: "Быстрая, стабильная и защищённая основа",
      en: "Fast, stable, secure technical foundation",
    },
    desc: {
      uz: "Cloud, CI/CD, mikrosservislar, API integratsiyalari va xavfsizlik — 99.9% uptime va PCI-DSS / GDPR compliance.",
      ru: "Cloud, CI/CD, микросервисы, API-интеграции и безопасность — 99.9% uptime и PCI-DSS / GDPR compliance.",
      en: "Cloud, CI/CD, microservices, API integrations and security — 99.9% uptime and PCI-DSS / GDPR compliance.",
    },
  },
];

export default function ServicesGrid({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  const headTitle =
    locale === "uz" ? (
      <>
        Bitta agentlik — <span className="text-brand-500">butun o'sish ekosistemasi</span>
      </>
    ) : locale === "ru" ? (
      <>
        Одно агентство — <span className="text-brand-500">вся экосистема роста</span>
      </>
    ) : (
      <>
        One agency — <span className="text-brand-500">your full growth stack</span>
      </>
    );

  const more = locale === "ru" ? "Подробнее" : locale === "en" ? "Details" : "Batafsil";

  return (
    <section className="section relative overflow-hidden bg-cream-100">
      <div className="container relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
          <div className="max-w-2xl">
            <span className="eyebrow">/ {t.home.servicesTitle}</span>
            <h2 className="display-2 mt-4">{headTitle}</h2>
            <p className="mt-4 text-ink-700 text-base md:text-lg max-w-xl">{t.home.servicesSubtitle}</p>
          </div>
          <Link
            href={`/${locale}/services`}
            className="hidden md:inline-flex items-center gap-1.5 bg-ink-900 text-cream-50 px-5 py-2.5 text-xs font-bold uppercase tracking-wider border-2 border-ink-900 brutal-shadow-sm hover:bg-brand-500 hover:text-ink-900 transition shrink-0"
          >
            {locale === "ru" ? "Все услуги" : locale === "en" ? "View all services" : "Hammasini ko'rish"}
            <ArrowUpRightIcon size={14} />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => {
            // 8 cards: zebra rhythm (even = dark, odd = light), and the
            // last card (Infrastructure) spans 2 columns on lg to balance
            // row 3 with the lone preceding card.
            const isFeatured = i % 2 === 0;
            const isFullWidth = i === 7;
            return (
              <Link
                key={s.slug}
                href={`/${locale}/services#${s.slug}`}
                className={
                  "group relative p-6 md:p-7 transition-all duration-150 overflow-hidden border-2 border-ink-900 " +
                  (isFullWidth ? "lg:col-span-2 " : "") +
                  (isFeatured || isFullWidth
                    ? "bg-ink-900 text-cream-50 brutal-shadow hover:-translate-x-1 hover:-translate-y-1 hover:brutal-shadow-lg"
                    : "bg-cream-50 text-ink-900 brutal-shadow-sm hover:-translate-x-1 hover:-translate-y-1 hover:brutal-shadow")
                }
              >
                {/* Number badge */}
                <span
                  className={
                    "inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] font-bold " +
                    (isFeatured || isFullWidth ? "text-cream-50/80" : "text-ink-900")
                  }
                >
                  <span className={"inline-block h-1.5 w-1.5 " + (isFeatured || isFullWidth ? "bg-brand-400" : "bg-brand-500")} />
                  {s.badge[locale]}
                </span>

                {/* Icon — sharp coral square */}
                <div
                  className={
                    "mt-4 grid h-12 w-12 place-items-center bg-brand-500 text-ink-900 border-2 " +
                    (isFeatured || isFullWidth ? "border-brand-500" : "border-ink-900")
                  }
                >
                  <s.Icon size={22} />
                </div>

                {/* Outcome — read first */}
                <p
                  className={
                    "mt-5 font-mono text-[11px] uppercase tracking-[0.22em] font-bold " +
                    (isFeatured || isFullWidth ? "text-brand-400" : "text-brand-600")
                  }
                >
                  → {s.outcome[locale]}
                </p>

                <h3
                  className="mt-2 font-display text-xl md:text-2xl font-bold leading-tight"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  {s.title[locale]}
                </h3>
                <p
                  className={
                    "mt-3 text-sm leading-6 " +
                    (isFeatured || isFullWidth ? "text-cream-50/80" : "text-ink-700") +
                    (isFullWidth ? " max-w-2xl" : "")
                  }
                >
                  {s.desc[locale]}
                </p>

                <span
                  className={
                    "mt-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition " +
                    (isFeatured || isFullWidth ? "text-brand-400 group-hover:gap-3" : "text-ink-900 group-hover:gap-3")
                  }
                >
                  {more}
                  <ArrowUpRightIcon size={14} />
                </span>
              </Link>
            );
          })}
        </div>

        {/* Mobile-only "view all" pill */}
        <div className="md:hidden mt-8 text-center">
          <Link
            href={`/${locale}/services`}
            className="inline-flex items-center gap-1.5 bg-ink-900 text-cream-50 px-6 py-3 text-xs font-bold uppercase tracking-wider border-2 border-ink-900 brutal-shadow-sm"
          >
            {locale === "ru" ? "Все услуги" : locale === "en" ? "View all services" : "Hammasini ko'rish"}
            <ArrowUpRightIcon size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
