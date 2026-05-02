import Link from "next/link";
import Image from "next/image";
import { type Locale } from "@/lib/i18n/config";
import { rawPaged, type ProjectView } from "@/lib/api";
import { ArrowUpRightIcon, ArrowRightIcon } from "@/components/icons";

const FALLBACK = [
  "from-brand-500 to-brand-700",
  "from-ink-900 to-ink-700",
  "from-brand-400 to-brand-600",
  "from-ink-800 to-ink-900",
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
    uz: { eyebrow: "/ portfolio", title: "Eng so'nggi loyihalarimiz", subtitle: "Real biznes uchun ishlab chiqilgan, biz qo'l qo'ygan mahsulotlar — saytdan tortib CRM gacha." },
    ru: { eyebrow: "/ портфолио", title: "Наши последние работы", subtitle: "Продукты, сделанные нами для реального бизнеса — от сайтов до CRM." },
    en: { eyebrow: "/ portfolio", title: "Our latest work", subtitle: "Products we built for real businesses — from websites to CRMs." },
  }[locale];

  const viewAll =
    locale === "ru" ? "Все проекты" :
    locale === "en" ? "View all projects" :
    "Hammasini ko'rish";

  const more =
    locale === "ru" ? "Подробнее" :
    locale === "en" ? "Read more" :
    "Batafsil";

  // If no real projects yet, show 4 elegant placeholder cards so the section isn't empty
  const placeholders = [
    { title: locale === "ru" ? "Корпоративный сайт" : locale === "en" ? "Corporate site" : "Korporativ sayt", category: "Web", excerpt: locale === "ru" ? "Современный лендинг с CMS." : locale === "en" ? "Modern landing with CMS." : "Zamonaviy CMS bilan landing." },
    { title: locale === "ru" ? "CRM для логистики" : locale === "en" ? "Logistics CRM" : "Logistika CRM", category: "CRM", excerpt: locale === "ru" ? "Автоматизация заказов и водителей." : locale === "en" ? "Orders & drivers automation." : "Buyurtma va haydovchi avtomatizatsiyasi." },
    { title: locale === "ru" ? "Telegram-бот" : locale === "en" ? "Telegram bot" : "Telegram bot", category: "Bot", excerpt: locale === "ru" ? "Приём заявок и оплата." : locale === "en" ? "Lead intake and payments." : "Zayavkalar va to'lovlar." },
    { title: locale === "ru" ? "Мобильное приложение" : locale === "en" ? "Mobile app" : "Mobil ilova", category: "Mobile", excerpt: locale === "ru" ? "Доставка для iOS и Android." : locale === "en" ? "iOS + Android delivery." : "iOS + Android yetkazib berish." },
  ];

  const cards = items.length > 0 ? items.slice(0, 4) : null;

  return (
    <section className="section-tight relative">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ink-300/60 to-transparent" />
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
          <div className="max-w-2xl">
            <span className="eyebrow">{head.eyebrow}</span>
            <h2 className="display-2 mt-3">{head.title}</h2>
            <p className="mt-4 text-ink-700 text-base md:text-lg max-w-xl">{head.subtitle}</p>
          </div>
          <Link
            href={`/${locale}/portfolio`}
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
                  href={`/${locale}/portfolio/${p.slug}`}
                  className="group card card-hover overflow-hidden flex flex-col"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-ink-100">
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
                    <h3 className="text-base font-bold text-ink-900 tracking-tight line-clamp-2">
                      {p.title}
                    </h3>
                    {p.excerpt && (
                      <p className="mt-2 text-xs text-ink-600 line-clamp-2 leading-5">
                        {p.excerpt}
                      </p>
                    )}
                    <span className="mt-auto pt-4 inline-flex items-center gap-1 text-xs font-semibold text-brand-500 group-hover:gap-2 transition-all">
                      {more}
                      <ArrowUpRightIcon size={12} />
                    </span>
                  </div>
                </Link>
              ))
            : placeholders.map((p, i) => (
                <Link
                  key={i}
                  href={`/${locale}/portfolio`}
                  className="group card card-hover overflow-hidden flex flex-col"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${FALLBACK[i % FALLBACK.length]}`}>
                      <div aria-hidden className="absolute inset-0 grid-bg opacity-25" />
                      <div aria-hidden className="absolute inset-0 grid place-items-center text-cream-50/30 font-display text-7xl font-extrabold tracking-tightest">
                        404
                      </div>
                    </div>
                    <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-ink-900/80 backdrop-blur text-cream-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider font-mono">
                      {p.category}
                    </span>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-base font-bold text-ink-900 tracking-tight line-clamp-2">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-xs text-ink-600 line-clamp-2 leading-5">{p.excerpt}</p>
                    <span className="mt-auto pt-4 inline-flex items-center gap-1 text-xs font-semibold text-brand-500 group-hover:gap-2 transition-all">
                      {more}
                      <ArrowUpRightIcon size={12} />
                    </span>
                  </div>
                </Link>
              ))}
        </div>

        {/* Mobile-only "view all" pill */}
        <div className="md:hidden mt-8 text-center">
          <Link
            href={`/${locale}/portfolio`}
            className="inline-flex items-center gap-1.5 rounded-full bg-ink-900 text-cream-50 px-5 py-2.5 text-sm font-semibold hover:bg-brand-500 transition"
          >
            {viewAll} <ArrowRightIcon size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
