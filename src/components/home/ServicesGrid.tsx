import Link from "next/link";
import { type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import {
  ArrowUpRightIcon,
  BotIcon,
  CodeIcon,
  DatabaseIcon,
  PlugIcon,
  SmartphoneIcon,
  SparklesIcon,
  ZapIcon,
} from "@/components/icons";

type ServiceMeta = {
  slug: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  /** kept short — 2-3 lines max in the card */
  badge: { uz: string; ru: string; en: string };
  /** card title (overrides dict for the home grid copy) */
  title: { uz: string; ru: string; en: string };
  desc: { uz: string; ru: string; en: string };
};

const SERVICES: ServiceMeta[] = [
  {
    slug: "websites",
    Icon: CodeIcon,
    badge: { uz: "01 / Web", ru: "01 / Web", en: "01 / Web" },
    title: { uz: "Web saytlar", ru: "Веб-сайты", en: "Websites" },
    desc: {
      uz: "Korporativ sayt, landing, e-commerce — Next.js, tezkor yuklanish, SEO-tayyor.",
      ru: "Корпоративные сайты, лендинги, e-commerce — Next.js, быстрая загрузка, SEO-готово.",
      en: "Corporate sites, landings, e-commerce — Next.js, fast load, SEO-ready.",
    },
  },
  {
    slug: "telegram-bots",
    Icon: BotIcon,
    badge: { uz: "02 / Bot", ru: "02 / Bot", en: "02 / Bot" },
    title: { uz: "Telegram botlar", ru: "Telegram-боты", en: "Telegram bots" },
    desc: {
      uz: "Buyurtma qabul, to'lov, CRM bilan bog'lanish — 24/7 ishlovchi sotuvchi.",
      ru: "Приём заявок, оплата, связь с CRM — продавец, который работает 24/7.",
      en: "Lead intake, payments, CRM sync — a salesperson that works 24/7.",
    },
  },
  {
    slug: "seo",
    Icon: ZapIcon,
    badge: { uz: "03 / SEO", ru: "03 / SEO", en: "03 / SEO" },
    title: { uz: "Google va Yandex SEO", ru: "SEO в Google и Яндекс", en: "Google & Yandex SEO" },
    desc: {
      uz: "Texnik audit, kontent, backlinkalar — qidiruvda 1-sahifada chiqing.",
      ru: "Технический аудит, контент, бэклинки — попадайте на 1 страницу выдачи.",
      en: "Technical audit, content, backlinks — land on page one of search.",
    },
  },
  {
    slug: "mobile-apps",
    Icon: SmartphoneIcon,
    badge: { uz: "04 / Mobile", ru: "04 / Mobile", en: "04 / Mobile" },
    title: { uz: "Mobil ilovalar", ru: "Мобильные приложения", en: "Mobile apps" },
    desc: {
      uz: "iOS + Android — bitta kod bazada, App Store va Google Play'da.",
      ru: "iOS + Android — одна кодовая база, в App Store и Google Play.",
      en: "iOS + Android — one codebase, on App Store and Google Play.",
    },
  },
  {
    slug: "crm-erp",
    Icon: DatabaseIcon,
    badge: { uz: "05 / CRM", ru: "05 / CRM", en: "05 / CRM" },
    title: { uz: "CRM / ERP tizimlar", ru: "CRM / ERP системы", en: "CRM / ERP systems" },
    desc: {
      uz: "Mijoz, omborxona, hisobot — kompaniya jarayonlari bitta panelda.",
      ru: "Клиенты, склад, отчёты — все процессы компании в одной панели.",
      en: "Customers, inventory, reports — all company processes in one place.",
    },
  },
  {
    slug: "integrations",
    Icon: PlugIcon,
    badge: { uz: "06 / API", ru: "06 / API", en: "06 / API" },
    title: { uz: "API integratsiyalar", ru: "API интеграции", en: "API integrations" },
    desc: {
      uz: "Click, Payme, Uzum, 1C, marketplace'lar — tizimlaringiz orasida ko'prik.",
      ru: "Click, Payme, Uzum, 1C, маркетплейсы — мост между вашими системами.",
      en: "Click, Payme, Uzum, 1C, marketplaces — a bridge between your systems.",
    },
  },
  {
    slug: "ai",
    Icon: SparklesIcon,
    badge: { uz: "07 / AI", ru: "07 / AI", en: "07 / AI" },
    title: {
      uz: "AI integratsiya",
      ru: "AI интеграция",
      en: "AI integration",
    },
    desc: {
      uz: "GPT, Gemini va boshqa modellar bilan ishlash — chatbot, kontent, hujjat tahlili va biznes assistentlarini loyihangizga professional integratsiya qilamiz.",
      ru: "Работа с GPT, Gemini и другими моделями — чат-боты, генерация контента, анализ документов и бизнес-ассистенты, профессионально встроенные в ваш проект.",
      en: "GPT, Gemini and other models — chatbots, content, document analysis and business assistants, professionally integrated into your project.",
    },
  },
];

export default function ServicesGrid({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  const headTitle =
    locale === "uz" ? (
      <>G'oyadan <span className="text-brand-500">mahsulotgacha</span> — bir joyda</>
    ) : locale === "ru" ? (
      <>От идеи до <span className="text-brand-500">продукта</span> — в одном месте</>
    ) : (
      <>From idea to <span className="text-brand-500">product</span> — all in one</>
    );

  const more = locale === "ru" ? "Подробнее" : locale === "en" ? "Details" : "Batafsil";

  return (
    <section className="section relative overflow-hidden bg-cream-100">
      {/* Background accents */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ink-300/60 to-transparent" />
      <div aria-hidden className="absolute -top-32 -right-24 h-96 w-96 rounded-full bg-brand-500/10 blur-3xl" />
      <div aria-hidden className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-brand-300/15 blur-3xl" />

      <div className="container relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
          <div className="max-w-2xl">
            <span className="eyebrow">/ {t.home.servicesTitle}</span>
            <h2 className="display-2 mt-3">{headTitle}</h2>
            <p className="mt-4 text-ink-700 text-base md:text-lg max-w-xl">{t.home.servicesSubtitle}</p>
          </div>
          <Link
            href={`/${locale}/services`}
            className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-cream-50 ring-1 ring-ink-200 px-4 py-2 text-sm font-semibold text-ink-900 hover:bg-ink-900 hover:text-cream-50 transition shrink-0"
          >
            {locale === "ru" ? "Все услуги" : locale === "en" ? "View all services" : "Hammasini ko'rish"}
            <ArrowUpRightIcon size={14} />
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => {
            const isAi = s.slug === "ai";
            // Dark cards = visual rhythm (alternate) + the AI showcase row.
            const isFeatured = i === 0 || i === 3 || isAi;
            return (
              <Link
                key={s.slug}
                href={`/${locale}/services#${s.slug}`}
                className={
                  "group relative rounded-2xl p-6 md:p-7 transition-all duration-300 overflow-hidden " +
                  (isAi
                    ? "sm:col-span-2 lg:col-span-3 bg-ink-900 text-cream-50 ring-1 ring-ink-800 hover:-translate-y-1 hover:shadow-card"
                    : isFeatured
                    ? "bg-ink-900 text-cream-50 ring-1 ring-ink-800 hover:-translate-y-1 hover:shadow-card"
                    : "bg-cream-50 text-ink-900 ring-1 ring-ink-200 hover:-translate-y-1 hover:shadow-card hover:ring-brand-500/40")
                }
              >
                {/* Decorative coral chip behind icon */}
                <div
                  aria-hidden
                  className={
                    "absolute -top-10 -right-10 h-32 w-32 rounded-full blur-2xl transition opacity-0 group-hover:opacity-100 " +
                    (isFeatured ? "bg-brand-500/30" : "bg-brand-500/15")
                  }
                />

                {/* Number badge */}
                <span
                  className={
                    "inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] " +
                    (isFeatured ? "text-cream-50/60" : "text-ink-600")
                  }
                >
                  <span className={"inline-block h-1 w-1 rounded-full " + (isFeatured ? "bg-brand-400" : "bg-brand-500")} />
                  {s.badge[locale]}
                </span>

                {/* Icon — coral accent square */}
                <div
                  className={
                    "mt-4 grid h-12 w-12 place-items-center rounded-xl " +
                    (isFeatured
                      ? "bg-brand-500/20 text-brand-400 ring-1 ring-brand-500/30"
                      : "bg-brand-50 text-brand-600 ring-1 ring-brand-100")
                  }
                >
                  <s.Icon size={22} />
                </div>

                <h3
                  className={
                    "mt-5 font-display text-xl md:text-2xl font-extrabold tracking-tightest leading-tight transition " +
                    (isFeatured ? "" : "group-hover:text-brand-600")
                  }
                >
                  {s.title[locale]}
                </h3>
                <p
                  className={
                    "mt-2 text-sm leading-6 " + (isFeatured ? "text-cream-50/75" : "text-ink-600")
                  }
                >
                  {s.desc[locale]}
                </p>

                <span
                  className={
                    "mt-6 inline-flex items-center gap-1 text-sm font-semibold transition " +
                    (isFeatured ? "text-brand-400 group-hover:gap-2" : "text-ink-900 group-hover:text-brand-600 group-hover:gap-2")
                  }
                >
                  {more}
                  <ArrowUpRightIcon size={14} />
                </span>

                {/* Bottom hairline accent */}
                <span
                  aria-hidden
                  className={
                    "absolute left-6 right-6 bottom-0 h-px transition origin-left scale-x-0 group-hover:scale-x-100 " +
                    (isFeatured ? "bg-brand-400/60" : "bg-brand-500/60")
                  }
                />
              </Link>
            );
          })}
        </div>

        {/* Mobile-only "view all" pill */}
        <div className="md:hidden mt-8 text-center">
          <Link
            href={`/${locale}/services`}
            className="inline-flex items-center gap-1.5 rounded-full bg-ink-900 text-cream-50 px-5 py-2.5 text-sm font-semibold hover:bg-brand-500 transition"
          >
            {locale === "ru" ? "Все услуги" : locale === "en" ? "View all services" : "Hammasini ko'rish"}
            <ArrowUpRightIcon size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
