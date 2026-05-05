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
  ZapIcon,
} from "@/components/icons";

export default function Hero({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  const eyebrow =
    locale === "ru"
      ? "404Dev — цифровое агентство"
      : locale === "en"
      ? "404Dev — digital agency from Uzbekistan"
      : "404Dev — raqamlashtirish agentligi";

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
    <section className="relative overflow-hidden bg-cream-100 h-[calc(100svh-4rem)] md:h-[calc(100svh-4.5rem)] min-h-[640px] flex flex-col">
      {/* ===================================================
           BACKDROP — restrained, single-layer depth
         =================================================== */}
      <div aria-hidden className="absolute inset-0 -z-10 aurora opacity-30" />
      <div aria-hidden className="absolute inset-0 -z-10 grid-bg opacity-50" />

      {/* Subtle 404 watermark — kept much smaller so it's NOT the LCP
          element (Lighthouse was flagging the giant text node as LCP).
          content-visibility lets the browser skip layout work when
          off-screen and keeps it out of the LCP candidate set. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 -z-10 text-center font-display font-extrabold tracking-tightest leading-none text-ink-900/[.025] select-none pointer-events-none text-[7rem] md:text-[9rem] lg:text-[10rem] hidden md:block"
        style={{ contentVisibility: "auto", containIntrinsicSize: "200px" }}
      >
        404
      </div>

      {/* Single subtle coral blob — top-left only */}
      <div
        aria-hidden
        className="absolute -top-32 -left-32 -z-10 h-[24rem] w-[24rem] rounded-full bg-brand-500/12 blur-3xl"
      />

      {/* ===================================================
           Centred content
         =================================================== */}
      <div className="container flex-1 flex items-center py-4 md:py-6 min-h-0">
        <div className="relative w-full grid lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* LEFT 7/12 */}
          <div className="lg:col-span-7 relative">
            <div className="inline-flex items-center gap-2 rounded-full bg-cream-50 px-3 py-1.5 text-[11px] font-mono font-medium text-ink-800 ring-1 ring-ink-200 shadow-soft animate-fade-up">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-500 animate-pulse-soft" />
              {eyebrow}
            </div>

            {/* Headline — tighter scale so it fits comfortably */}
            <AnimatedHeadline locale={locale} />

            <p
              className="mt-3 md:mt-4 max-w-xl text-sm md:text-base text-ink-700 leading-relaxed animate-fade-up"
              style={{ animationDelay: "120ms" }}
            >
              {locale === "uz"
                ? "O'zbekiston va butun dunyo bo'ylab xizmatlarni raqamlashtirishga yordam beramiz — sayt, Telegram bot, mobil ilova, CRM/ERP va biznes avtomatlashtirish. Outsourcing model, aniq narx va muddat."
                : locale === "ru"
                ? "Помогаем цифровизировать услуги в Узбекистане и по всему миру — сайты, Telegram-боты, мобильные приложения, CRM/ERP и автоматизация бизнеса. Outsourcing-модель, понятная цена и сроки."
                : "We help digitalize services in Uzbekistan and around the world — websites, Telegram bots, mobile apps, CRM/ERP and business automation. Outsourcing model, clear price and timeline."}
            </p>

            <ul
              className="mt-3 md:mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-[13px] md:text-sm text-ink-800 animate-fade-up"
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
              className="mt-4 md:mt-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 animate-fade-up"
              style={{ animationDelay: "220ms" }}
            >
              <CTAButton source="hero-primary" variant="accent" size="md" className="group sm:!px-7 sm:!py-3.5 sm:!text-base">
                <SendIcon size={16} />
                {locale === "ru" ? "Заказать услугу" : locale === "en" ? "Order a service" : "Xizmat buyurtma berish"}
                <ArrowUpRightIcon size={14} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </CTAButton>
              <Link href={`/${locale}/services`} className="btn btn-ghost group sm:px-7 sm:py-3.5 sm:text-base">
                {locale === "ru" ? "Все услуги" : locale === "en" ? "All services" : "Barcha xizmatlar"}
                <ArrowRightIcon size={14} className="transition group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* Stats — 3 columns; tighter sizing for compact viewport */}
            <div
              className="mt-4 md:mt-6 grid grid-cols-3 gap-2 sm:gap-4 max-w-md animate-fade-up"
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
                    className="font-display text-2xl sm:text-3xl md:text-[2rem] font-extrabold tracking-tightest text-ink-900 leading-none tabular-nums"
                  />
                  <span className="text-[10px] sm:text-[11px] text-ink-600 leading-tight">
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
           Bottom marquee ticker — slimmer
         =================================================== */}
      <div
        aria-hidden
        className="relative border-t border-ink-200 bg-cream-50/60 backdrop-blur-sm overflow-hidden flex-shrink-0"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="flex w-max gap-7 py-2.5" style={{ animation: "marquee 50s linear infinite" }}>
          {tickerLoop.map((w, i) => (
            <span key={i} className="inline-flex items-center gap-3 font-display font-extrabold tracking-tightest text-lg md:text-xl whitespace-nowrap">
              <span className={i % 4 === 1 ? "text-brand-500" : "text-ink-900"}>{w}</span>
              <span aria-hidden className="text-ink-300 text-lg">✦</span>
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>
    </section>
  );
}

/* ============================================================ */

/* ============================================================
   ANIMATED HEADLINE — 3-line mixed typography
   - Tighter scale to fit in viewport
   - Coral underline kept (brand identity), softer period dot
   ============================================================ */
function AnimatedHeadline({ locale }: { locale: Locale }) {
  const parts =
    locale === "uz"
      ? { lead: "O'zbekiston va dunyo bo'ylab", coral: "raqamlashtirish", end: "xizmati" }
      : locale === "ru"
      ? { lead: "Услуги цифровизации", coral: "в Узбекистане", end: "и по всему миру" }
      : { lead: "Digitalization services", coral: "across Uzbekistan", end: "& the world" };

  // Compressed scale across breakpoints so 3 lines fit in viewport.
  const lineSize = "text-[1.75rem] sm:text-4xl md:text-[2.75rem] lg:text-[3.25rem] xl:text-[3.75rem]";

  return (
    <h1 className="mt-3 md:mt-4 font-display tracking-tightest text-ink-900">
      {/* Line 1 */}
      <span className={"word-mask " + lineSize}>
        <span
          className="font-extrabold text-ink-800"
          style={{ animationDelay: "120ms" }}
        >
          {parts.lead}
        </span>
      </span>

      {/* Line 2 — coral, no underline */}
      <span className={"word-mask mt-2 md:mt-3 " + lineSize}>
        <span
          className="font-extrabold text-brand-500"
          style={{ animationDelay: "260ms" }}
        >
          {parts.coral}
        </span>
      </span>

      {/* Line 3 — ink-900 + softer period dot (no glow) */}
      <span className={"word-mask mt-2 md:mt-3 " + lineSize}>
        <span
          className="font-extrabold text-ink-900 inline-flex items-baseline"
          style={{ animationDelay: "400ms" }}
        >
          {parts.end}
          <span
            aria-hidden
            className="ml-1.5 inline-block h-[0.28em] w-[0.28em] rounded-full bg-brand-500 align-baseline"
            style={{
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
   - Subtler tilts, smaller height to fit viewport
   - Free Lessons card kept (brand identity) but cleaner
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
      tilt: "-rotate-[1.5deg]",
      offset: "translate-x-0",
    },
    {
      Icon: BotIcon,
      label: locale === "ru" ? "Telegram-боты" : locale === "en" ? "Telegram bots" : "Telegram botlar",
      tag: "Click · Payme · CRM",
      meta: locale === "ru" ? "24/7 продажи" : locale === "en" ? "24/7 sales" : "24/7 sotuv",
      tilt: "rotate-[1deg]",
      offset: "translate-x-2",
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
      tilt: "-rotate-[1deg]",
      offset: "-translate-x-1",
    },
    {
      Icon: SmartphoneIcon,
      label: locale === "ru" ? "Мобильные приложения" : locale === "en" ? "Mobile apps" : "Mobil ilovalar",
      tag: "iOS · Android · React Native",
      meta: locale === "ru" ? "App Store + Google Play" : locale === "en" ? "App Store + Google Play" : "App Store + Google Play",
      tilt: "rotate-[1.5deg]",
      offset: "translate-x-1",
    },
  ];

  return (
    <div className="relative h-[460px] xl:h-[500px]">
      {/* Backdrop watermark plate */}
      <div
        className="absolute inset-x-4 top-0 bottom-[160px] rounded-3xl bg-cream-50 ring-1 ring-ink-200 shadow-soft overflow-hidden animate-fade-up"
        style={{ animationDelay: "100ms", animationFillMode: "both" }}
      >
        <div className="flex items-center px-4 py-2.5 border-b border-ink-200">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-brand-500" />
            <span className="h-2 w-2 rounded-full bg-ink-300" />
            <span className="h-2 w-2 rounded-full bg-ink-300" />
          </div>
        </div>
        <div className="absolute inset-0 grid-bg opacity-25" />
        {/* Wordmark watermark */}
        <div className="absolute inset-0 grid place-items-center pt-6">
          <div className="flex items-end">
            <span className="font-display text-[56px] md:text-[72px] font-extrabold leading-none text-ink-900/[0.05] tracking-tightest">
              404
            </span>
            <span
              aria-hidden
              className="inline-block w-[10px] h-[56px] md:h-[72px] rounded-[3px] bg-brand-500/12 mx-1"
              style={{ transform: "rotate(-12deg)" }}
            />
            <span className="font-display text-[56px] md:text-[72px] font-extrabold leading-none text-ink-900/[0.05] tracking-tightest">
              DEV
            </span>
          </div>
        </div>
      </div>

      {/* Stacked product cards */}
      {products.map((p, i) => {
        const top = 36 + i * 68;
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

      {/* ----- FREE LESSONS FEATURE CARD ----- */}
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
        "group border-orbit relative rounded-2xl bg-cream-50 ring-1 ring-ink-200 shadow-soft px-4 py-3 transition-all duration-300 hover:-translate-y-1 hover:rotate-0 hover:shadow-card cursor-default " +
        data.tilt
      }
      style={{ ["--orbit-delay" as never]: `${index * -1.6}s` }}
    >
      {/* coral left-edge accent stripe on hover */}
      <span
        aria-hidden
        className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full bg-brand-500/0 group-hover:bg-brand-500 transition z-10"
      />

      <div className="flex items-start gap-3">
        {/* Icon — solid coral, no animated ring */}
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-500 text-cream-50 ring-1 ring-brand-600">
          <data.Icon size={18} />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <span className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider text-emerald-700">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {ready}
            </span>
          </div>
          <div className="mt-0.5 font-display text-[14px] font-extrabold tracking-tight text-ink-900 leading-tight truncate">
            {data.label}
          </div>
          <div className="mt-0.5 font-mono text-[10px] text-ink-600 leading-tight truncate">
            {data.tag}
          </div>
        </div>
      </div>

      <div className="mt-2.5 pt-2 border-t border-ink-200/80 flex items-center justify-between">
        <span className="text-[10px] font-mono text-ink-600">{data.meta}</span>
        <span className="inline-flex items-center gap-1 rounded-full bg-ink-900 text-cream-50 px-2.5 py-1 text-[10px] font-bold group-hover:bg-brand-500 transition">
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
      className="group absolute left-0 right-0 mx-3 bottom-2 rounded-2xl bg-brand-500 text-cream-50 p-4 md:p-5 ring-1 ring-brand-600 shadow-coral overflow-hidden animate-fade-up transition-all duration-300 hover:-translate-y-1"
      style={{ animationDelay: "850ms", animationFillMode: "both", zIndex: 30 }}
    >
      <div className="relative flex items-start gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-cream-50/15 ring-1 ring-cream-50/25 backdrop-blur">
          <RocketIcon size={20} />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.18em] text-cream-50/85">
            <span className="inline-block h-1 w-1 rounded-full bg-cream-50" />
            404Dev Learn
            <span className="rounded-full bg-cream-50/25 px-2 py-0.5 text-[9px] font-bold">
              {locale === "uz" ? "BEPUL" : locale === "ru" ? "БЕСПЛАТНО" : "FREE"}
            </span>
          </div>
          <h2 className="mt-1 font-display text-lg md:text-xl font-extrabold tracking-tightest leading-tight">
            {headline}
          </h2>
        </div>
      </div>

      <p className="relative mt-2.5 text-[12px] leading-5 text-cream-50/95">
        {desc}
      </p>

      <div className="relative mt-3 inline-flex w-full items-center justify-between rounded-xl bg-cream-50 text-ink-900 px-3.5 py-2 text-sm font-bold group-hover:bg-ink-900 group-hover:text-cream-50 transition">
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
