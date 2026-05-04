import Link from "next/link";
import { type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import CTAButton from "@/components/CTAButton";
import CountUp from "@/components/CountUp";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  BotIcon,
  CheckIcon,
  GlobeIcon,
  RocketIcon,
  SendIcon,
  SmartphoneIcon,
  SparklesIcon,
  ZapIcon,
} from "@/components/icons";

export default function Hero({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  const eyebrow =
    locale === "ru"
      ? "404Dev — цифровое агентство из Ташкента"
      : locale === "en"
      ? "404Dev — digital agency from Tashkent, Uzbekistan"
      : "404Dev — Toshkent raqmlashtirish agentligi";

  const trustList =
    locale === "ru"
      ? ["Прототип за 7 дней", "Прозрачная цена", "Поддержка после релиза"]
      : locale === "en"
      ? ["7-day prototype", "Transparent price", "Post-launch support"]
      : ["7 kunda prototip", "Aniq narx", "Reliz keyin support"];

  // Marquee ticker words
  const ticker = [
    locale === "ru" ? "Узбекистан" : locale === "en" ? "Uzbekistan" : "O'zbekiston",
    locale === "ru" ? "Ташкент" : locale === "en" ? "Tashkent" : "Toshkent",
    locale === "ru" ? "Веб-сайты" : locale === "en" ? "Websites" : "Web saytlar",
    "Telegram",
    locale === "ru" ? "Боты" : locale === "en" ? "Bots" : "Botlar",
    "SEO",
    "Google",
    "Яндекс",
    locale === "ru" ? "Мобильные" : locale === "en" ? "Mobile apps" : "Mobil ilovalar",
    "iOS",
    "Android",
    "CRM",
    "ERP",
    "API",
    "Click",
    "Payme",
    "Uzum",
    locale === "ru" ? "Аутсорсинг" : locale === "en" ? "Outsourcing" : "Outsourcing",
  ];
  const tickerLoop = [...ticker, ...ticker];

  return (
    <section className="relative overflow-hidden bg-cream-100 min-h-[calc(100svh-5rem)] md:min-h-[calc(100svh-4.5rem)] flex flex-col">
      {/* ===================================================
           RICH BACKDROP — multiple layers create depth
         =================================================== */}
      <div aria-hidden className="absolute inset-0 -z-10 aurora opacity-70" />
      <div aria-hidden className="absolute inset-0 -z-10 grid-bg opacity-70" />

      {/* Diagonal coral stripe (extends off-screen, top-left to bottom-right) */}
      <span
        aria-hidden
        className="absolute -left-32 top-1/3 -z-10 hidden lg:block w-[140%] h-px bg-gradient-to-r from-transparent via-brand-500/30 to-transparent"
        style={{ transform: "rotate(-8deg)" }}
      />
      <span
        aria-hidden
        className="absolute -left-32 top-1/2 -z-10 hidden lg:block w-[140%] h-px bg-gradient-to-r from-transparent via-ink-900/15 to-transparent"
        style={{ transform: "rotate(-8deg)" }}
      />

      {/* Massive 404 watermark — kichraytirildi (LCP layout cost optimisation) */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 -z-10 text-center font-display font-extrabold tracking-tightest leading-none text-ink-900/[.04] select-none pointer-events-none text-[14rem] md:text-[18rem] lg:text-[22rem] hidden md:block"
      >
        404
      </div>

      {/* Animated coral blobs */}
      <div
        aria-hidden
        className="absolute -top-40 -left-32 -z-10 h-[28rem] w-[28rem] rounded-full bg-brand-500/25 blur-3xl animate-blob"
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -right-24 -z-10 h-[26rem] w-[26rem] rounded-full bg-brand-300/40 blur-3xl animate-blob"
        style={{ animationDelay: "-6s" }}
      />
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-72 w-72 rounded-full bg-brand-500/10 blur-3xl animate-blob"
        style={{ animationDelay: "-3s" }}
      />

      {/* Mega coral slash (top-right, off-screen) */}
      <span
        aria-hidden
        className="absolute -right-20 -top-32 -z-10 hidden lg:block w-[14px] h-[40rem] rounded-full bg-brand-500 origin-center animate-tilt"
        style={{ transform: "rotate(-12deg)", boxShadow: "0 20px 60px -20px rgba(255,77,46,.55)" }}
      />

      {/* Floating mono micro-labels */}
      <span
        aria-hidden
        className="absolute left-[6%] top-[18%] -z-10 hidden lg:block font-mono text-[11px] text-ink-500/80 select-none"
      >
        {"// since 2020"}
      </span>
      <span
        aria-hidden
        className="absolute right-[10%] top-[60%] -z-10 hidden lg:block font-mono text-[11px] text-ink-500/80 select-none"
      >
        {"// 60+ clients"}
      </span>
      <span
        aria-hidden
        className="absolute left-[42%] bottom-[24%] -z-10 hidden lg:block font-mono text-[11px] text-ink-500/70 select-none"
        style={{ transform: "rotate(-3deg)" }}
      >
        {"~ outsourcing.uz"}
      </span>

      {/* Tiny coral dot constellation */}
      <span aria-hidden className="absolute left-[8%] top-[40%] -z-10 hidden lg:block h-1.5 w-1.5 rounded-full bg-brand-500/70" />
      <span aria-hidden className="absolute left-[12%] top-[46%] -z-10 hidden lg:block h-1 w-1 rounded-full bg-brand-500/40" />
      <span aria-hidden className="absolute right-[18%] top-[24%] -z-10 hidden lg:block h-1.5 w-1.5 rounded-full bg-brand-500/60" />
      <span aria-hidden className="absolute right-[14%] top-[30%] -z-10 hidden lg:block h-1 w-1 rounded-full bg-ink-900/40" />
      <span aria-hidden className="absolute left-[35%] top-[12%] -z-10 hidden lg:block h-1 w-1 rounded-full bg-ink-900/30" />

      {/* Decorative "+" pluses scattered */}
      <span aria-hidden className="absolute left-[5%] bottom-[28%] -z-10 hidden lg:block font-mono text-ink-900/15 text-3xl font-bold select-none">+</span>
      <span aria-hidden className="absolute right-[35%] top-[15%] -z-10 hidden lg:block font-mono text-brand-500/30 text-2xl font-bold select-none">+</span>
      <span aria-hidden className="absolute left-[48%] top-[70%] -z-10 hidden lg:block font-mono text-ink-900/15 text-2xl font-bold select-none">+</span>

      {/* ===================================================
           Centred content
         =================================================== */}
      <div className="container flex-1 flex items-start md:items-center py-6 md:py-8">
        <div className="relative w-full grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* LEFT 7/12 */}
          <div className="lg:col-span-7 relative">
            <div className="inline-flex items-center gap-2 rounded-full bg-cream-50 px-3 py-1.5 text-[11px] font-mono font-medium text-ink-800 ring-1 ring-ink-200 shadow-soft animate-fade-up">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-500 animate-pulse-soft" />
              {eyebrow}
            </div>

            {/* MEGA HEADLINE — mixed typography, word-reveal animation */}
            <AnimatedHeadline locale={locale} />


            <p
              className="mt-5 md:mt-6 max-w-xl text-sm md:text-base lg:text-lg text-ink-700 leading-relaxed animate-fade-up"
              style={{ animationDelay: "120ms" }}
            >
              {locale === "uz"
                ? "O'zbekiston va butun dunyo bo'ylab xizmatlarni raqamlashtirishga yordam beramiz — sayt, Telegram bot, mobil ilova, CRM/ERP va biznes avtomatlashtirish. Outsourcing model, aniq narx va muddat."
                : locale === "ru"
                ? "Помогаем цифровизировать услуги в Узбекистане и по всему миру — сайты, Telegram-боты, мобильные приложения, CRM/ERP и автоматизация бизнеса. Outsourcing-модель, понятная цена и сроки."
                : "We help digitalize services in Uzbekistan and around the world — websites, Telegram bots, mobile apps, CRM/ERP and business automation. Outsourcing model, clear price and timeline."}
            </p>

            <ul
              className="mt-4 md:mt-5 flex flex-wrap gap-x-5 gap-y-1.5 text-[13px] md:text-sm text-ink-800 animate-fade-up"
              style={{ animationDelay: "160ms" }}
            >
              {trustList.map((x) => (
                <li key={x} className="inline-flex items-center gap-1.5">
                  <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-ink-900 text-cream-50">
                    <CheckIcon size={9} />
                  </span>
                  <span className="font-medium">{x}</span>
                </li>
              ))}
            </ul>

            <div
              className="mt-5 md:mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 animate-fade-up"
              style={{ animationDelay: "220ms" }}
            >
              <CTAButton source="hero-primary" variant="accent" size="md" className="group sm:!px-7 sm:!py-4 sm:!text-base">
                <SendIcon size={16} />
                {locale === "ru" ? "Заказать услугу" : locale === "en" ? "Order a service" : "Xizmat buyurtma berish"}
                <ArrowUpRightIcon size={14} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </CTAButton>
              <Link href={`/${locale}/services`} className="btn btn-ghost group sm:px-7 sm:py-4 sm:text-base">
                {locale === "ru" ? "Все услуги" : locale === "en" ? "All services" : "Barcha xizmatlar"}
                <ArrowRightIcon size={14} className="transition group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* Stats — 3 columns; each stat stacks (number on top, label below)
                so labels never wrap mid-row and the whole strip stays on
                one line on every breakpoint. */}
            <div
              className="mt-6 md:mt-9 grid grid-cols-3 gap-2 sm:gap-4 max-w-md animate-fade-up"
              style={{ animationDelay: "280ms" }}
            >
              {[
                { v: 80, suffix: "+", l: t.home.statsProjects, delay: 600 },
                { v: 60, suffix: "+", l: t.home.statsClients,  delay: 750 },
                { v: 5,  suffix: "+", l: t.home.statsYears,    delay: 900 },
              ].map((s, i) => (
                <div
                  key={s.l}
                  className={
                    "flex flex-col items-start gap-0.5 " +
                    (i > 0 ? "sm:pl-4 sm:border-l sm:border-ink-300/70" : "")
                  }
                >
                  <CountUp
                    value={s.v}
                    suffix={s.suffix}
                    duration={1700}
                    delay={s.delay}
                    className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tightest text-ink-900 leading-none tabular-nums"
                  />
                  <span className="text-[10px] sm:text-[11px] md:text-xs text-ink-600 leading-tight">
                    {s.l}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT 5/12 — floating product stack */}
          <div className="lg:col-span-5 relative hidden md:block">
            <FloatingProductStack locale={locale} />
          </div>
        </div>
      </div>

      {/* ===================================================
           Bottom marquee ticker
         =================================================== */}
      <div
        aria-hidden
        className="relative border-t border-ink-200 bg-cream-50/60 backdrop-blur-sm overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="flex w-max gap-8 py-3.5" style={{ animation: "marquee 50s linear infinite" }}>
          {tickerLoop.map((w, i) => (
            <span key={i} className="inline-flex items-center gap-3 font-display font-extrabold tracking-tightest text-2xl md:text-3xl whitespace-nowrap">
              <span className={i % 4 === 1 ? "text-brand-500" : "text-ink-900"}>{w}</span>
              <span aria-hidden className="text-ink-300 text-2xl">✦</span>
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes shine {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </section>
  );
}

/* ============================================================ */

/* ============================================================
   ANIMATED HEADLINE — 3-line mixed typography
   - Line 1: italic medium intro word (smaller, ink-700)
   - Line 2: massive coral extrabold + underline draw
   - Line 3: massive ink-900 extrabold + coral period dot
   - Each line slides up from a mask, staggered.
   ============================================================ */
function AnimatedHeadline({ locale }: { locale: Locale }) {
  const parts =
    locale === "uz"
      ? { lead: "O'zbekiston va dunyo bo'ylab", coral: "raqamlashtirish", end: "xizmati" }
      : locale === "ru"
      ? { lead: "Услуги цифровизации", coral: "в Узбекистане", end: "и по всему миру" }
      : { lead: "Digitalization services", coral: "across Uzbekistan", end: "& the world" };

  // All three lines share one size scale → uniform display rhythm.
  const lineSize = "text-[2rem] sm:text-5xl md:text-6xl lg:text-[4.75rem] xl:text-[5.5rem]";

  return (
    <h1 className="mt-5 md:mt-6 font-display tracking-tightest text-ink-900">
      {/* Line 1 — same size as the others, ink-800 for soft hierarchy */}
      <span className={"word-mask " + lineSize}>
        <span
          className="font-extrabold text-ink-800"
          style={{ animationDelay: "120ms" }}
        >
          {parts.lead}
        </span>
      </span>

      {/* Line 2 — coral with underline that draws in */}
      <span className={"word-mask mt-1 " + lineSize}>
        <span
          className="relative inline-block font-extrabold text-brand-500"
          style={{ animationDelay: "260ms" }}
        >
          {parts.coral}
          <span
            aria-hidden
            className="absolute left-0 right-0 bottom-0 h-2.5 md:h-3 bg-brand-500/40 rounded-sm -z-10 underline-draw"
            style={{ animationDelay: "700ms" }}
          />
        </span>
      </span>

      {/* Line 3 — ink-900 + coral period dot */}
      <span className={"word-mask mt-1 " + lineSize}>
        <span
          className="font-extrabold text-ink-900 inline-flex items-baseline"
          style={{ animationDelay: "400ms" }}
        >
          {parts.end}
          <span
            aria-hidden
            className="ml-2 inline-block h-[0.32em] w-[0.32em] rounded-full bg-brand-500 align-baseline"
            style={{
              boxShadow: "0 0 24px rgba(255,77,46,.7)",
              animation: "scaleIn 0.5s cubic-bezier(.2,.7,.2,1) 1100ms backwards",
            }}
          />
        </span>
      </span>
    </h1>
  );
}

/* ============================================================
   FLOATING PRODUCT STACK — RIGHT COLUMN
   - 4 tilted product cards (richer treatment): number badge,
     coral icon with glow ring, status pill, mini accent stripe.
   - Below: a substantial coral "Free lessons" feature card
     so the secondary track is unmistakable and inviting.
   ============================================================ */

type ProductCardData = {
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  tag: string;
  meta: string;
  tilt: string;
  offset: string;
};

function FloatingProductStack({ locale }: { locale: Locale }) {
  const orderLabel =
    locale === "ru" ? "Заказать" : locale === "en" ? "Order" : "Buyurtma";

  const ready = locale === "ru" ? "доступно" : locale === "en" ? "available" : "mavjud";

  const products: ProductCardData[] = [
    {
      Icon: GlobeIcon,
      label: locale === "ru" ? "Веб-сайты" : locale === "en" ? "Websites" : "Web saytlar",
      tag: "Next.js · TypeScript",
      meta: locale === "ru" ? "от 7 дней" : locale === "en" ? "from 7 days" : "7 kundan",
      tilt: "-rotate-[3deg]",
      offset: "translate-x-0",
    },
    {
      Icon: BotIcon,
      label: locale === "ru" ? "Telegram-боты" : locale === "en" ? "Telegram bots" : "Telegram botlar",
      tag: "Click · Payme · CRM",
      meta: locale === "ru" ? "24/7 продажи" : locale === "en" ? "24/7 sales" : "24/7 sotuv",
      tilt: "rotate-[2deg]",
      offset: "translate-x-3",
    },
    {
      Icon: ZapIcon,
      label:
        locale === "ru"
          ? "SEO в Google и Яндекс"
          : locale === "en"
          ? "SEO for Google & Yandex"
          : "Google va Yandex SEO",
      tag: locale === "ru" ? "Топ-1 страница" : locale === "en" ? "Page-1 ranking" : "1-sahifa reyting",
      meta: locale === "ru" ? "органический рост" : locale === "en" ? "organic growth" : "organik o'sish",
      tilt: "-rotate-[2deg]",
      offset: "-translate-x-2",
    },
    {
      Icon: SmartphoneIcon,
      label: locale === "ru" ? "Мобильные приложения" : locale === "en" ? "Mobile apps" : "Mobil ilovalar",
      tag: "iOS · Android · React Native",
      meta: locale === "ru" ? "App Store + Google Play" : locale === "en" ? "App Store + Google Play" : "App Store + Google Play",
      tilt: "rotate-[3deg]",
      offset: "translate-x-1",
    },
  ];

  return (
    <div className="relative h-[600px] xl:h-[640px]">
      {/* Backdrop watermark plate */}
      <div
        className="absolute inset-x-4 top-0 bottom-[200px] rounded-3xl bg-cream-50 ring-1 ring-ink-200 shadow-card overflow-hidden animate-fade-up"
        style={{ animationDelay: "100ms", animationFillMode: "both" }}
      >
        <div className="flex items-center px-5 py-3 border-b border-ink-200">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-brand-500" />
            <span className="h-2 w-2 rounded-full bg-ink-300" />
            <span className="h-2 w-2 rounded-full bg-ink-300" />
          </div>
        </div>
        <div className="absolute inset-0 grid-bg opacity-30" />
        {/* Wordmark watermark */}
        <div className="absolute inset-0 grid place-items-center pt-8">
          <div className="flex items-end">
            <span className="font-display text-[64px] md:text-[88px] font-extrabold leading-none text-ink-900/[0.06] tracking-tightest">
              404
            </span>
            <span
              aria-hidden
              className="inline-block w-[12px] h-[64px] md:h-[88px] rounded-[3px] bg-brand-500/15 mx-1"
              style={{ transform: "rotate(-12deg)" }}
            />
            <span className="font-display text-[64px] md:text-[88px] font-extrabold leading-none text-ink-900/[0.06] tracking-tightest">
              DEV
            </span>
          </div>
        </div>
      </div>

      {/* Stacked product cards */}
      {products.map((p, i) => {
        const top = 50 + i * 88;
        return (
          <div
            key={p.label}
            className={"absolute left-0 right-0 mx-3 opacity-0 animate-fade-up " + p.offset}
            style={{
              top: `${top}px`,
              animationDelay: `${250 + i * 140}ms`,
              animationFillMode: "forwards",
              zIndex: 10 + i,
            }}
          >
            <ProductCard
              data={p}
              index={i}
              total={products.length}
              orderLabel={orderLabel}
              ready={ready}
            />
          </div>
        );
      })}

      {/* ----- BIG FREE LESSONS FEATURE CARD ----- */}
      <FreeLessonsCard locale={locale} />
    </div>
  );
}

/* ============ Product card ============ */
function ProductCard({
  data,
  index,
  total,
  orderLabel,
  ready,
}: {
  data: ProductCardData;
  index: number;
  total: number;
  orderLabel: string;
  ready: string;
}) {
  return (
    <div
      className={
        "group relative rounded-2xl bg-gradient-to-br from-cream-50 to-cream-50/60 ring-1 ring-ink-200 shadow-card px-5 py-4 transition-all duration-300 hover:-translate-y-1.5 hover:rotate-0 hover:shadow-coral cursor-default overflow-hidden " +
        data.tilt
      }
    >
      {/* coral glow on hover (top-right corner) */}
      <div
        aria-hidden
        className="absolute -top-12 -right-12 h-28 w-28 rounded-full bg-brand-500/0 group-hover:bg-brand-500/25 blur-2xl transition"
      />

      {/* coral left-edge accent stripe */}
      <span
        aria-hidden
        className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full bg-brand-500/0 group-hover:bg-brand-500 transition"
      />

      <div className="flex items-start gap-3">
        {/* Icon with coral glow ring */}
        <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-500 text-cream-50 ring-1 ring-brand-600 shadow-coral">
          {/* outer ring glow */}
          <span aria-hidden className="absolute inset-0 rounded-xl ring-2 ring-brand-500/30 scale-110 opacity-0 group-hover:opacity-100 transition" />
          <data.Icon size={20} />
        </span>

        <div className="min-w-0 flex-1">
          {/* Number badge */}
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            {/* Status pill */}
            <span className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider text-emerald-700">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {ready}
            </span>
          </div>
          {/* Title */}
          <div className="mt-0.5 font-display text-[15px] font-extrabold tracking-tight text-ink-900 leading-tight truncate">
            {data.label}
          </div>
          {/* Tag (mono) */}
          <div className="mt-0.5 font-mono text-[10px] text-ink-600 leading-tight truncate">
            {data.tag}
          </div>
        </div>
      </div>

      {/* Bottom row: meta + order pill */}
      <div className="mt-3 pt-2.5 border-t border-ink-200/80 flex items-center justify-between">
        <span className="text-[10px] font-mono text-ink-600">{data.meta}</span>
        <span className="inline-flex items-center gap-1 rounded-full bg-ink-900 text-cream-50 px-2.5 py-1 text-[10px] font-bold shadow-sm group-hover:bg-brand-500 transition">
          {orderLabel} <ArrowUpRightIcon size={10} />
        </span>
      </div>
    </div>
  );
}

/* ============ Free Lessons feature card ============ */
function FreeLessonsCard({ locale }: { locale: Locale }) {
  const headline =
    locale === "ru" ? "Бесплатная школа" : locale === "en" ? "Free school" : "Bepul maktab";

  const desc =
    locale === "ru"
      ? "Уроки JS, Go, Python, React и Telegram-ботов от практикующих инженеров."
      : locale === "en"
      ? "Lessons in JS, Go, Python, React and Telegram bots from practicing engineers."
      : "JS, Go, Python, React va Telegram-botlar bo'yicha amaliyotchi muhandislardan darslar.";

  const cta =
    locale === "ru" ? "Открыть уроки" : locale === "en" ? "Open lessons" : "Darslarni ochish";

  return (
    <Link
      href="/learn"
      className="group absolute left-0 right-0 mx-3 bottom-2 rounded-3xl bg-gradient-to-br from-brand-500 via-brand-500 to-brand-600 text-cream-50 p-5 md:p-6 shadow-coral ring-1 ring-brand-600 overflow-hidden animate-fade-up transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
      style={{ animationDelay: "850ms", animationFillMode: "both", zIndex: 30 }}
    >
      {/* Decorative orbs */}
      <span aria-hidden className="absolute -top-12 -right-10 h-40 w-40 rounded-full bg-cream-50/15 blur-2xl" />
      <span aria-hidden className="absolute -bottom-8 -left-8 h-28 w-28 rounded-full bg-cream-50/10 blur-xl" />

      {/* Animated shine sweep */}
      <span
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition"
        style={{
          backgroundImage:
            "linear-gradient(110deg, transparent 30%, rgba(255,255,255,.18) 50%, transparent 70%)",
          backgroundSize: "200% 100%",
          animation: "shine 2.4s linear infinite",
        }}
      />

      {/* Decorative big sparkles */}
      <span aria-hidden className="absolute top-3 right-3 text-cream-50/30">
        <SparklesIcon size={28} />
      </span>

      <div className="relative flex items-start gap-3">
        {/* Big square icon */}
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-cream-50/15 ring-1 ring-cream-50/25 backdrop-blur">
          <RocketIcon size={24} />
        </span>

        <div className="min-w-0 flex-1">
          {/* Eyebrow + Free badge */}
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.18em] text-cream-50/85">
            <span className="inline-block h-1 w-1 rounded-full bg-cream-50" />
            404Dev Learn
            <span className="rounded-full bg-cream-50/25 px-2 py-0.5 text-[9px] font-bold">
              {locale === "uz" ? "BEPUL" : locale === "ru" ? "БЕСПЛАТНО" : "FREE"}
            </span>
          </div>
          {/* Headline */}
          <h2 className="mt-1 font-display text-xl md:text-2xl font-extrabold tracking-tightest leading-tight">
            {headline}
          </h2>
        </div>
      </div>

      <p className="relative mt-3 text-[12.5px] leading-5 text-cream-50/95">
        {desc}
      </p>

      {/* CTA bar */}
      <div className="relative mt-4 inline-flex w-full items-center justify-between rounded-xl bg-cream-50 text-ink-900 px-3.5 py-2.5 text-sm font-bold shadow-sm group-hover:bg-ink-900 group-hover:text-cream-50 transition">
        <span className="inline-flex items-center gap-2">
          <RocketIcon size={14} className="text-brand-500 group-hover:text-brand-400 transition" />
          {cta}
        </span>
        <ArrowUpRightIcon
          size={14}
          className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </div>
    </Link>
  );
}
