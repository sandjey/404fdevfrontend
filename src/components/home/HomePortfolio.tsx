import Link from "next/link";
import Image from "next/image";
import { type Locale } from "@/lib/i18n/config";
import { rawPaged, type ProjectView } from "@/lib/api";
import {
  ArrowUpRightIcon,
  ArrowRightIcon,
  SparklesIcon,
  SendIcon,
} from "@/components/icons";

const FALLBACK = [
  "from-brand-500 to-brand-700",
  "from-ink-800 to-ink-900",
  "from-brand-400 to-brand-600",
  "from-ink-700 to-ink-900",
];

export default async function HomePortfolio({ locale }: { locale: Locale }) {
  let items: ProjectView[] = [];
  try {
    const res = await rawPaged<ProjectView>(
      `/projects?lang=${locale}&page_size=4`,
      { next: { revalidate: 180 } }
    );
    items = Array.isArray(res.data) ? res.data : [];
  } catch {
    items = [];
  }

  const head = {
    uz: {
      eyebrow: "/ portfolio",
      titleA: "Eng so'nggi",
      titleB: "loyihalarimiz",
      subtitle:
        "Real biznes uchun ishlab chiqilgan, biz qo'l qo'ygan mahsulotlar — saytdan tortib CRM gacha.",
      ctaTitle: "G'oyangiz bormi?",
      ctaDesc:
        "Bir suhbat — va sizniki ham shu ro'yxatda bo'ladi. 7 kunda prototip, aniq narx.",
      ctaBtn: "Loyiha boshlash",
      ctaSecondary: "Hammasini ko'rish",
    },
    ru: {
      eyebrow: "/ портфолио",
      titleA: "Наши последние",
      titleB: "работы",
      subtitle:
        "Продукты, сделанные нами для реального бизнеса — от сайтов до CRM.",
      ctaTitle: "Есть идея?",
      ctaDesc:
        "Один разговор — и ваш проект тоже окажется в этом списке. Прототип за 7 дней, прозрачная цена.",
      ctaBtn: "Начать проект",
      ctaSecondary: "Все проекты",
    },
    en: {
      eyebrow: "/ portfolio",
      titleA: "Our latest",
      titleB: "work",
      subtitle:
        "Products we built for real businesses — from websites to CRMs.",
      ctaTitle: "Got an idea?",
      ctaDesc:
        "One conversation — and your project will be on this list too. 7-day prototype, transparent price.",
      ctaBtn: "Start a project",
      ctaSecondary: "View all projects",
    },
  }[locale];

  const more =
    locale === "ru" ? "Подробнее" : locale === "en" ? "Read more" : "Batafsil";

  const placeholders = [
    {
      title:
        locale === "ru"
          ? "Корпоративный сайт"
          : locale === "en"
          ? "Corporate site"
          : "Korporativ sayt",
      category: "Web",
      excerpt:
        locale === "ru"
          ? "Современный лендинг с CMS."
          : locale === "en"
          ? "Modern landing with CMS."
          : "Zamonaviy CMS bilan landing.",
    },
    {
      title:
        locale === "ru"
          ? "CRM для логистики"
          : locale === "en"
          ? "Logistics CRM"
          : "Logistika CRM",
      category: "CRM",
      excerpt:
        locale === "ru"
          ? "Автоматизация заказов и водителей."
          : locale === "en"
          ? "Orders & drivers automation."
          : "Buyurtma va haydovchi avtomatizatsiyasi.",
    },
    {
      title:
        locale === "ru"
          ? "Telegram-бот"
          : locale === "en"
          ? "Telegram bot"
          : "Telegram bot",
      category: "Bot",
      excerpt:
        locale === "ru"
          ? "Приём заявок и оплата."
          : locale === "en"
          ? "Lead intake and payments."
          : "Zayavkalar va to'lovlar.",
    },
    {
      title:
        locale === "ru"
          ? "Мобильное приложение"
          : locale === "en"
          ? "Mobile app"
          : "Mobil ilova",
      category: "Mobile",
      excerpt:
        locale === "ru"
          ? "Доставка для iOS и Android."
          : locale === "en"
          ? "iOS + Android delivery."
          : "iOS + Android yetkazib berish.",
    },
  ];

  const cards = items.length > 0 ? items.slice(0, 4) : null;

  return (
    <section className="relative overflow-hidden bg-ink-900 text-cream-50 py-20 md:py-28">
      {/* ===== Decorative backdrop layers ===== */}
      <div aria-hidden className="absolute inset-0 grid-bg opacity-[0.06]" />
      <div
        aria-hidden
        className="absolute -top-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-brand-500/20 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-brand-500/15 blur-3xl"
      />
      {/* Massive 404 watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-display font-extrabold tracking-tightest leading-none text-cream-50/[0.025] select-none text-[24rem] md:text-[32rem] hidden md:block"
      >
        404
      </div>
      {/* Diagonal coral slash on top-right */}
      <span
        aria-hidden
        className="absolute -right-16 -top-24 hidden lg:block w-[10px] h-[26rem] rounded-full bg-brand-500/80"
        style={{
          transform: "rotate(-14deg)",
          boxShadow: "0 20px 80px -10px rgba(255,77,46,.55)",
        }}
      />
      {/* Top + bottom gradient edges to softly blend with surrounding cream */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-cream-100 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-cream-100 to-transparent"
      />

      <div className="container relative">
        {/* ===== Header ===== */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-cream-50/70">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-500 animate-pulse-soft" />
              {head.eyebrow}
            </span>
            <h2 className="mt-4 font-display font-extrabold tracking-tightest leading-[0.95] text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl">
              {head.titleA}{" "}
              <span className="relative inline-block text-brand-500">
                {head.titleB}
                <span
                  aria-hidden
                  className="absolute left-0 right-0 -bottom-1 h-2 md:h-3 bg-brand-500/30 rounded-sm -z-10"
                />
              </span>
            </h2>
            <p className="mt-5 text-cream-50/70 text-base md:text-lg max-w-xl leading-relaxed">
              {head.subtitle}
            </p>
          </div>
          <Link
            href={`/${locale}/portfolio`}
            className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-cream-50/10 ring-1 ring-cream-50/20 backdrop-blur px-5 py-2.5 text-sm font-semibold text-cream-50 hover:bg-brand-500 hover:ring-brand-500 transition shrink-0"
          >
            {head.ctaSecondary} <ArrowUpRightIcon size={14} />
          </Link>
        </div>

        {/* ===== 2x2 grid ===== */}
        <div className="mt-12 md:mt-16 grid gap-6 md:gap-8 sm:grid-cols-2">
          {cards
            ? cards.map((p, i) => (
                <ProjectCard
                  key={p.id}
                  href={`/${locale}/portfolio/${p.slug}`}
                  index={i}
                  title={p.title}
                  excerpt={p.excerpt ?? ""}
                  category={p.category ?? ""}
                  cover={p.cover_image ?? null}
                  more={more}
                  fallbackClass={FALLBACK[i % FALLBACK.length]}
                />
              ))
            : placeholders.map((p, i) => (
                <ProjectCard
                  key={i}
                  href={`/${locale}/portfolio`}
                  index={i}
                  title={p.title}
                  excerpt={p.excerpt}
                  category={p.category}
                  cover={null}
                  more={more}
                  fallbackClass={FALLBACK[i % FALLBACK.length]}
                />
              ))}
        </div>

        {/* ===== Conversion CTA banner ===== */}
        <div className="mt-12 md:mt-16 relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-500 via-brand-500 to-brand-600 p-7 md:p-10 shadow-coral ring-1 ring-brand-600">
          {/* Decorative orbs */}
          <span
            aria-hidden
            className="absolute -top-16 -right-12 h-56 w-56 rounded-full bg-cream-50/15 blur-3xl"
          />
          <span
            aria-hidden
            className="absolute -bottom-14 -left-8 h-44 w-44 rounded-full bg-ink-900/15 blur-2xl"
          />
          <span
            aria-hidden
            className="absolute top-5 right-5 text-cream-50/30"
          >
            <SparklesIcon size={32} />
          </span>

          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="max-w-2xl">
              <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tightest text-cream-50 leading-tight">
                {head.ctaTitle}
              </h3>
              <p className="mt-2.5 text-cream-50/95 text-sm md:text-base leading-relaxed">
                {head.ctaDesc}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href={`/${locale}/contact`}
                className="group inline-flex items-center gap-2 rounded-full bg-cream-50 text-ink-900 px-6 py-3.5 text-sm md:text-base font-bold shadow-sm hover:bg-ink-900 hover:text-cream-50 transition"
              >
                <SendIcon size={16} />
                {head.ctaBtn}
                <ArrowUpRightIcon
                  size={14}
                  className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
              <Link
                href={`/${locale}/portfolio`}
                className="inline-flex md:hidden items-center gap-1.5 rounded-full bg-cream-50/15 ring-1 ring-cream-50/30 backdrop-blur text-cream-50 px-5 py-3 text-sm font-semibold hover:bg-cream-50/25 transition"
              >
                {head.ctaSecondary} <ArrowRightIcon size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Project card with browser-chrome wrapped screenshot,
   prominent index number, dramatic hover.
   ============================================================ */
function ProjectCard({
  href,
  index,
  title,
  excerpt,
  category,
  cover,
  more,
  fallbackClass,
}: {
  href: string;
  index: number;
  title: string;
  excerpt: string;
  category: string;
  cover: string | null;
  more: string;
  fallbackClass: string;
}) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col rounded-3xl bg-cream-50 overflow-hidden transition-all duration-500 hover:-translate-y-2 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.5)] hover:shadow-[0_30px_80px_-20px_rgba(255,77,46,0.45)]"
    >
      {/* Coral border-glow on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-ink-200/60 group-hover:ring-2 group-hover:ring-brand-500/70 transition"
      />

      {/* ===== Browser chrome bar ===== */}
      <div className="relative flex items-center justify-between gap-3 px-4 py-2.5 bg-ink-900/95 border-b border-ink-800">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-brand-500" />
          <span className="h-2.5 w-2.5 rounded-full bg-cream-50/30" />
          <span className="h-2.5 w-2.5 rounded-full bg-cream-50/30" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="mx-auto max-w-[260px] flex items-center justify-center gap-1.5 rounded-md bg-cream-50/10 px-3 py-1 text-[10px] font-mono text-cream-50/70 truncate">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="truncate">404dev.uz / projects</span>
          </div>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream-50/60 hidden sm:inline">
          {String(index + 1).padStart(2, "0")} / 04
        </span>
      </div>

      {/* ===== Screenshot ===== */}
      <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-ink-100 to-ink-50">
        {cover ? (
          <Image
            src={cover}
            alt={title}
            fill
            sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
            className="object-contain transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div
            className={`absolute inset-0 bg-gradient-to-br ${fallbackClass} transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]`}
          >
            <div aria-hidden className="absolute inset-0 grid-bg opacity-25" />
            <div
              aria-hidden
              className="absolute inset-0 grid place-items-center text-cream-50/25 font-display text-[8rem] md:text-[10rem] font-extrabold tracking-tightest leading-none"
            >
              404
            </div>
          </div>
        )}

        {/* Category pill */}
        {category && (
          <span className="absolute top-4 left-4 inline-flex items-center rounded-full bg-ink-900/90 backdrop-blur-md text-cream-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] font-mono shadow-sm ring-1 ring-cream-50/10">
            {category}
          </span>
        )}

        {/* Hover overlay with action hint */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-ink-900/0 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
        <span
          aria-hidden
          className="absolute bottom-4 right-4 grid h-12 w-12 place-items-center rounded-full bg-brand-500 text-cream-50 shadow-coral opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition duration-500"
        >
          <ArrowUpRightIcon size={20} />
        </span>
      </div>

      {/* ===== Body ===== */}
      <div className="relative p-6 md:p-7 flex flex-col flex-1">
        {/* Ghost index number watermark — bottom-right of body */}
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-4 -right-2 font-display font-extrabold tracking-tightest text-[7rem] md:text-[8rem] leading-none text-ink-900/[0.045] select-none"
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <h3 className="relative text-lg md:text-xl font-bold text-ink-900 tracking-tight line-clamp-2 leading-snug group-hover:text-brand-500 transition-colors">
          {title}
        </h3>
        {excerpt && (
          <p className="relative mt-2.5 text-sm text-ink-600 line-clamp-2 leading-relaxed">
            {excerpt}
          </p>
        )}
        <span className="relative mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-500 group-hover:gap-3 transition-all">
          {more}
          <ArrowUpRightIcon size={14} />
        </span>
      </div>
    </Link>
  );
}
