import Link from "next/link";
import Image from "next/image";
import { type Locale } from "@/lib/i18n/config";
import { rawPaged, type BlogPostView } from "@/lib/api";
import { formatDate, readingTime } from "@/lib/utils";
import { ArrowUpRightIcon, ArrowRightIcon } from "@/components/icons";

const FALLBACK = [
  "from-brand-500 to-brand-700",
  "from-ink-900 to-ink-700",
  "from-brand-400 to-brand-600",
  "from-ink-800 to-ink-900",
];

export default async function HomeBlog({ locale }: { locale: Locale }) {
  let posts: BlogPostView[] = [];
  try {
    const res = await rawPaged<BlogPostView>(
      `/blog?lang=${locale}&page_size=4`,
      { next: { revalidate: 180 } }
    );
    posts = Array.isArray(res.data) ? res.data : [];
  } catch {
    posts = [];
  }

  const head = {
    uz: { eyebrow: "/ blog", title: "So'nggi maqolalar", subtitle: "Texnologiyalar, yondashuvlar va biznesni raqamlashtirish bo'yicha bizning fikrlarimiz." },
    ru: { eyebrow: "/ блог", title: "Последние статьи", subtitle: "Наши мысли о технологиях, подходах и цифровизации бизнеса." },
    en: { eyebrow: "/ blog", title: "Latest articles", subtitle: "Our take on technology, approach and digitalising business." },
  }[locale];

  const viewAll =
    locale === "ru" ? "Все статьи" :
    locale === "en" ? "View all articles" :
    "Hammasini ko'rish";

  const more =
    locale === "ru" ? "Подробнее" :
    locale === "en" ? "Read more" :
    "Batafsil";

  const placeholders = [
    { title: locale === "ru" ? "Как мы выбираем стек" : locale === "en" ? "How we pick a stack" : "Texnologiya stekni qanday tanlaymiz", category: "Engineering", excerpt: locale === "ru" ? "Не модно, а надёжно — короткий гайд." : locale === "en" ? "Reliable over hype — short guide." : "Modaga emas, ishonchlilikka tayanamiz." },
    { title: locale === "ru" ? "Telegram-боты для продаж" : locale === "en" ? "Telegram bots for sales" : "Sotuv uchun Telegram-botlar", category: "Bots", excerpt: locale === "ru" ? "Где они окупаются, а где нет." : locale === "en" ? "Where they pay off, and where not." : "Qayerda ish beradi, qayerda yo'q." },
    { title: locale === "ru" ? "CRM с нуля за 6 недель" : locale === "en" ? "CRM from scratch in 6 weeks" : "6 haftada noldan CRM", category: "Case", excerpt: locale === "ru" ? "Реальный опыт запуска." : locale === "en" ? "Real launch story." : "Real ishga tushirish keysi." },
    { title: locale === "ru" ? "Дизайн-система 404Dev" : locale === "en" ? "404Dev design system" : "404Dev dizayn-tizimi", category: "Design", excerpt: locale === "ru" ? "Как родилась coral-палитра." : locale === "en" ? "How the coral palette was born." : "Coral palitra qanday tug'ildi." },
  ];

  const cards = posts.length > 0 ? posts.slice(0, 4) : null;

  return (
    <section className="section-tight relative bg-cream-100">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ink-300/60 to-transparent" />
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
          <div className="max-w-2xl">
            <span className="eyebrow">{head.eyebrow}</span>
            <h2 className="display-2 mt-3">{head.title}</h2>
            <p className="mt-4 text-ink-700 text-base md:text-lg max-w-xl">{head.subtitle}</p>
          </div>
          <Link
            href={`/${locale}/blog`}
            className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-cream-50 ring-1 ring-ink-200 px-4 py-2 text-sm font-semibold text-ink-900 hover:bg-ink-900 hover:text-cream-50 transition shrink-0"
          >
            {viewAll} <ArrowUpRightIcon size={14} />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards
            ? cards.map((p, i) => (
                <Link
                  key={p.id}
                  href={`/${locale}/blog/${p.slug}`}
                  className="group card card-hover overflow-hidden flex flex-col"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-ink-100">
                    {p.cover_image ? (
                      <Image
                        src={p.cover_image}
                        alt={p.title}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className={`absolute inset-0 bg-gradient-to-br ${FALLBACK[i % FALLBACK.length]}`}>
                        <div aria-hidden className="absolute inset-0 grid-bg opacity-25" />
                      </div>
                    )}
                    {p.category && (
                      <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-ink-900/80 backdrop-blur text-cream-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider font-mono">
                        {p.category}
                      </span>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-base font-bold text-ink-900 tracking-tight line-clamp-2 leading-snug">
                      {p.title}
                    </h3>
                    {p.excerpt && (
                      <p className="mt-2 text-xs text-ink-600 line-clamp-2 leading-5">{p.excerpt}</p>
                    )}
                    <div className="mt-auto pt-4 flex items-center justify-between text-[11px] text-ink-500">
                      <time dateTime={p.published_at || p.created_at}>
                        {formatDate(p.published_at || p.created_at, locale)}
                      </time>
                      <span className="inline-flex items-center gap-1 font-semibold text-brand-500 group-hover:gap-2 transition-all">
                        {more}
                        <ArrowUpRightIcon size={11} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            : placeholders.map((p, i) => (
                <Link
                  key={i}
                  href={`/${locale}/blog`}
                  className="group card card-hover overflow-hidden flex flex-col"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${FALLBACK[i % FALLBACK.length]}`}>
                      <div aria-hidden className="absolute inset-0 grid-bg opacity-25" />
                      <div aria-hidden className="absolute inset-0 grid place-items-center text-cream-50/30 font-display text-6xl font-extrabold tracking-tightest">
                        /04
                      </div>
                    </div>
                    <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-ink-900/80 backdrop-blur text-cream-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider font-mono">
                      {p.category}
                    </span>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-base font-bold text-ink-900 tracking-tight line-clamp-2 leading-snug">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-xs text-ink-600 line-clamp-2 leading-5">{p.excerpt}</p>
                    <div className="mt-auto pt-4 flex items-center justify-between text-[11px] text-ink-500">
                      <span>{readingTime("", locale)}</span>
                      <span className="inline-flex items-center gap-1 font-semibold text-brand-500 group-hover:gap-2 transition-all">
                        {more}
                        <ArrowUpRightIcon size={11} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
        </div>

        <div className="md:hidden mt-8 text-center">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-1.5 rounded-full bg-ink-900 text-cream-50 px-5 py-2.5 text-sm font-semibold hover:bg-brand-500 transition"
          >
            {viewAll} <ArrowRightIcon size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
