import Link from "next/link";
import { type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import {
  ArrowUpRightIcon,
  BotIcon,
  CheckIcon,
  CodeIcon,
  DatabaseIcon,
  RocketIcon,
  SparklesIcon,
} from "@/components/icons";

/* ============================================================
   404DEV — EDUCATION MISSION SECTION
   Frames the free school as a brand mission, not just a banner.
   - Eyebrow: "/ education mission"
   - Lead: "Knowledge is the strongest marketing"
   - Mission paragraph: a share of every contract → new lessons
   - Pillars (4 cards): from zero, real projects, structured, practical
   - Tech list: what we teach
   - CTA: /learn
   ============================================================ */

const TECHS = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Go",
  "React",
  "Next.js",
  "Java",
  "SQL",
  "Telegram bot",
  "Docker",
  "Linux",
  "Git",
];

export default function LearnBanner({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  const pillars = [
    {
      Icon: CodeIcon,
      title: locale === "ru" ? "С нуля" : locale === "en" ? "From zero" : "Noldan",
      text:
        locale === "ru"
          ? "Подходит без подготовки. Каждая тема объясняется заново."
          : locale === "en"
          ? "No prep needed. Every topic is explained from first principles."
          : "Hech qanday tayyorgarlik kerak emas. Har bir mavzu noldan tushuntiriladi.",
    },
    {
      Icon: BotIcon,
      title: locale === "ru" ? "Реальные проекты" : locale === "en" ? "Real projects" : "Real loyihalar",
      text:
        locale === "ru"
          ? "Telegram-боты, API, CRM, AI — то, что используется на работе."
          : locale === "en"
          ? "Telegram bots, APIs, CRM, AI — the things used in production."
          : "Telegram-botlar, API, CRM, AI — real ishda qo'llaniladigan loyihalar.",
    },
    {
      Icon: DatabaseIcon,
      title: locale === "ru" ? "Структурировано" : locale === "en" ? "Structured" : "Tartibli",
      text:
        locale === "ru"
          ? "Темы идут логически, без скачков и пропусков."
          : locale === "en"
          ? "Topics flow in a logical order, no skipping, no gaps."
          : "Mavzular mantiqiy ketma-ketlikda, sakrash va bo'shliqlarsiz.",
    },
    {
      Icon: RocketIcon,
      title: locale === "ru" ? "Практика" : locale === "en" ? "Hands-on" : "Amaliy",
      text:
        locale === "ru"
          ? "Каждое объяснение завершается заданием — учишься, применяя."
          : locale === "en"
          ? "Every concept ends in hands-on practice — you learn by doing."
          : "Har bir tushuncha amaliyot bilan tugaydi — bajarib o'rganasiz.",
    },
  ];

  return (
    <section className="section relative bg-cream-100">
      <div className="container">
        <div className="relative overflow-hidden bg-ink-900 px-6 py-12 md:px-14 md:py-20 text-cream-50 brutal-border-thick brutal-shadow-coral">
          {/* Decorative diagonal stripes — top right */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-0 right-0 h-24 w-48 stripes-coral opacity-60"
          />
          <div aria-hidden className="absolute inset-0 grid-bg opacity-15" />

          <div className="relative grid gap-12 lg:grid-cols-[1.1fr_1fr] items-start">
            {/* LEFT — mission narrative */}
            <div>
              <span className="inline-flex items-center gap-2 bg-cream-50 text-ink-900 px-3 py-1.5 text-[11px] font-mono font-bold uppercase tracking-[0.22em] border-2 border-cream-50">
                <SparklesIcon size={13} className="text-brand-500" />
                404Dev Learn
                <span className="ml-1 bg-brand-500 text-ink-900 px-2 py-0.5 text-[10px] font-bold border border-ink-900">
                  {locale === "uz" ? "BEPUL" : locale === "ru" ? "БЕСПЛАТНО" : "FREE"}
                </span>
              </span>

              <h2
                className="mt-6 font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.0]"
                style={{ letterSpacing: "-0.04em" }}
              >
                {t.home.learnTitle}
              </h2>

              <p className="mt-5 max-w-xl text-cream-50 text-lg md:text-xl leading-snug font-medium">
                {t.home.learnLead}
              </p>

              <p className="mt-5 max-w-xl text-cream-50/75 text-base leading-relaxed">
                {t.home.learnMission}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="/learn" className="btn btn-accent btn-lg group">
                  <RocketIcon size={18} /> {t.home.learnCTA}
                  <ArrowUpRightIcon
                    size={14}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition"
                  />
                </Link>
                <Link
                  href="/learn"
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold uppercase tracking-wider bg-cream-50 text-ink-900 border-2 border-cream-50 hover:bg-cream-50/90 transition"
                >
                  {t.home.learnSecondaryCTA}
                  <ArrowUpRightIcon size={14} />
                </Link>
              </div>

              {/* Tech list */}
              <div className="mt-9">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream-50/60 font-bold">
                  {locale === "ru" ? "/ что преподаём" : locale === "en" ? "/ what we teach" : "/ nimani o'rgatamiz"}
                </span>
                <div className="mt-3 flex flex-wrap gap-2">
                  {TECHS.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center bg-cream-50/[.06] text-cream-50/90 px-2.5 py-1 text-xs font-mono border border-cream-50/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mission line — small footer */}
              <div className="mt-9 flex items-start gap-2.5 max-w-md text-xs text-cream-50/60 leading-relaxed">
                <CheckIcon size={14} className="text-brand-500 mt-0.5 shrink-0" />
                <span>
                  {locale === "uz"
                    ? "Har bir kontrakt ulushi — yangi darslar uchun. Bu bizning O'zbekiston kelajagiga investitsiyamiz."
                    : locale === "ru"
                    ? "Часть от каждого контракта идёт на новые уроки. Это наша инвестиция в будущее Узбекистана."
                    : "A share of every contract funds new lessons. This is our investment in the future of Uzbekistan."}
                </span>
              </div>
            </div>

            {/* RIGHT — 4 pillars */}
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {pillars.map((p, i) => (
                <div
                  key={i}
                  className="group relative bg-cream-50/[.04] border-2 border-cream-50/20 p-5 transition hover:bg-cream-50/[.08] hover:border-cream-50/40 hover:-translate-x-0.5 hover:-translate-y-0.5"
                >
                  <span className="grid h-10 w-10 place-items-center bg-brand-500 text-ink-900 border-2 border-cream-50">
                    <p.Icon size={18} />
                  </span>
                  <h3 className="mt-4 font-display text-base font-bold text-cream-50" style={{ letterSpacing: "-0.02em" }}>
                    {p.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-5 text-cream-50/70">{p.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
