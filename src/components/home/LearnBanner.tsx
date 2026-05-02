import Link from "next/link";
import { type Locale } from "@/lib/i18n/config";
import { ArrowUpRightIcon, BotIcon, CodeIcon, DatabaseIcon, RocketIcon, SparklesIcon } from "@/components/icons";

const TECH_PILLS: { label: string; tint: string }[] = [
  { label: "JavaScript", tint: "bg-cream-50/10 text-cream-50 ring-cream-50/20" },
  { label: "Python",     tint: "bg-cream-50/10 text-cream-50 ring-cream-50/20" },
  { label: "Go",         tint: "bg-brand-500/15 text-brand-300 ring-brand-400/30" },
  { label: "React",      tint: "bg-cream-50/10 text-cream-50 ring-cream-50/20" },
  { label: "Java",       tint: "bg-brand-500/15 text-brand-300 ring-brand-400/30" },
  { label: "SQL",        tint: "bg-cream-50/10 text-cream-50 ring-cream-50/20" },
  { label: "Telegram bot", tint: "bg-brand-500/15 text-brand-300 ring-brand-400/30" },
  { label: "Docker",     tint: "bg-cream-50/10 text-cream-50 ring-cream-50/20" },
];

export default function LearnBanner({ locale }: { locale: Locale }) {
  const headline =
    locale === "ru" ? (
      <>Бесплатные уроки <span className="gradient-text-cyan">программирования</span> на узбекском</>
    ) : locale === "en" ? (
      <>Free <span className="gradient-text-cyan">programming lessons</span> in Uzbek</>
    ) : (
      <>Bepul <span className="gradient-text-cyan">dasturlash darslari</span> — o'zbek tilida</>
    );

  const subtitle =
    locale === "ru" ? "Соберите фундамент через структурированные уроки и реальные примеры. Без воды." :
    locale === "en" ? "Build a strong foundation with structured lessons and real-world examples. No fluff." :
    "Tartibli darsliklar va real misollar orqali mustahkam asos quring. Hech qanday suv emas, faqat foyda.";

  const cta1 =
    locale === "ru" ? "Начать учиться" :
    locale === "en" ? "Start learning" :
    "O'qishni boshlash";

  const cta2 =
    locale === "ru" ? "Что внутри" :
    locale === "en" ? "What's inside" :
    "Ichkarida nima bor";

  const features = [
    {
      Icon: CodeIcon,
      title: locale === "ru" ? "От нуля" : locale === "en" ? "From zero" : "Noldan",
      text:
        locale === "ru" ? "Не требует подготовки. Подходит для новичков." :
        locale === "en" ? "No prep required. Beginner-friendly path." :
        "Hech qanday tayyorgarlik kerak emas. Boshlovchi uchun.",
    },
    {
      Icon: BotIcon,
      title: locale === "ru" ? "Реальные проекты" : locale === "en" ? "Real projects" : "Real loyihalar",
      text:
        locale === "ru" ? "Боты, API, веб-приложения, базы." :
        locale === "en" ? "Bots, APIs, web apps, databases." :
        "Botlar, API, web ilovalar va ma'lumotlar bazasi.",
    },
    {
      Icon: DatabaseIcon,
      title: locale === "ru" ? "Структурировано" : locale === "en" ? "Structured" : "Tuzilgan",
      text:
        locale === "ru" ? "Темы идут по логичной последовательности." :
        locale === "en" ? "Topics flow in a logical order." :
        "Mavzular mantiqiy tartibda.",
    },
    {
      Icon: RocketIcon,
      title: locale === "ru" ? "Применимо" : locale === "en" ? "Practical" : "Amaliy",
      text:
        locale === "ru" ? "Каждое объяснение заканчивается практикой." :
        locale === "en" ? "Every concept ends in hands-on practice." :
        "Har bir tushuncha amaliyot bilan tugaydi.",
    },
  ];

  return (
    <section className="section relative">
      <div className="container">
        <div className="relative overflow-hidden rounded-[2rem] bg-ink-900 px-6 py-12 md:px-14 md:py-20 text-cream-50">
          {/* Background fx — coral-only */}
          <div aria-hidden className="absolute -top-32 -left-24 h-96 w-96 rounded-full bg-brand-500/35 blur-3xl animate-blob" />
          <div aria-hidden className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-brand-700/30 blur-3xl animate-blob" style={{ animationDelay: "-7s" }} />
          <div aria-hidden className="absolute inset-0 grid-bg opacity-15" />
          <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cream-50/20 to-transparent" />

          <div className="relative grid gap-12 lg:grid-cols-[1.1fr_1fr] items-center">
            {/* Left */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-cream-50/10 px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.18em] ring-1 ring-cream-50/15 backdrop-blur">
                <SparklesIcon size={13} className="text-brand-400" />
                404Dev Learn
                <span className="ml-1 rounded-full bg-brand-500/20 px-2 py-0.5 text-[10px] font-bold text-brand-400">
                  {locale === "ru" ? "БЕСПЛАТНО" : locale === "en" ? "FREE" : "BEPUL"}
                </span>
              </span>

              <h2 className="mt-5 font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tightest leading-[1.05]">
                {headline}
              </h2>
              <p className="mt-5 max-w-xl text-cream-50/75 text-lg leading-relaxed">{subtitle}</p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="/learn" className="btn btn-accent btn-lg group">
                  <RocketIcon size={18} /> {cta1}
                  <ArrowUpRightIcon size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                </Link>
                <Link href="/learn" className="btn btn-lg bg-cream-50/10 text-cream-50 hover:bg-cream-50/20">
                  {cta2}
                </Link>
              </div>

              {/* Tech pills */}
              <div className="mt-9 flex flex-wrap gap-2">
                {TECH_PILLS.map((p) => (
                  <span key={p.label} className={`inline-flex items-center rounded-full ring-1 ${p.tint} px-3 py-1 text-xs font-medium font-mono`}>
                    {p.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — feature cards */}
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="group rounded-2xl bg-cream-50/[.04] ring-1 ring-cream-50/10 p-5 backdrop-blur transition hover:bg-cream-50/[.08] hover:ring-cream-50/20 hover:-translate-y-0.5"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-500/20 text-brand-400 ring-1 ring-brand-400/30">
                    <f.Icon size={18} />
                  </span>
                  <h3 className="mt-3 text-sm font-bold tracking-tight text-cream-50">{f.title}</h3>
                  <p className="mt-1 text-xs leading-5 text-cream-50/70">{f.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
