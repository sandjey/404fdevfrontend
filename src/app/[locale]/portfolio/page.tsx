import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo";
import { rawPaged, type ProjectView } from "@/lib/api";
import CTAButton from "@/components/CTAButton";
import { ArrowUpRightIcon, SendIcon } from "@/components/icons";

export const revalidate = 120;

const FALLBACK_GRADIENT = [
  "from-brand-500 to-cyan-500",
  "from-violet-500 to-pink-500",
  "from-emerald-500 to-cyan-500",
  "from-amber-500 to-rose-500",
  "from-blue-500 to-indigo-500",
  "from-fuchsia-500 to-purple-500",
];

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const t = getDictionary(params.locale);
  return buildMetadata({
    title: t.portfolio.title,
    description: t.portfolio.subtitle,
    path: `/${params.locale}/portfolio`,
    locale: params.locale,
  });
}

export default async function PortfolioPage({ params }: { params: { locale: Locale } }) {
  const t = getDictionary(params.locale);

  let items: ProjectView[] = [];
  try {
    const res = await rawPaged<ProjectView>(
      `/projects?lang=${params.locale}&page_size=48`,
      { next: { revalidate: 120 } }
    );
    items = Array.isArray(res.data) ? res.data : [];
  } catch {
    items = [];
  }

  /* Layout pattern (3-column grid base):
       n === 1                  → 1 top katta
       n === 2                  → 1 top + 1 bottom katta
       n % 3 === 0  (3,6,9…)    → faqat 3-li grid
       n % 3 === 1  (4,7,10…)   → 1 top katta + grid
       n % 3 === 2  (5,8,11…)   → 1 top katta + grid + 1 bottom katta */
  const n = items.length;
  let topItem: ProjectView | null = null;
  let midItems: ProjectView[] = [];
  let bottomItem: ProjectView | null = null;
  if (n === 1) {
    topItem = items[0];
  } else if (n === 2) {
    topItem = items[0];
    bottomItem = items[1];
  } else if (n >= 3) {
    const mod = n % 3;
    if (mod === 0) {
      midItems = items;
    } else if (mod === 1) {
      topItem = items[0];
      midItems = items.slice(1);
    } else {
      topItem = items[0];
      midItems = items.slice(1, -1);
      bottomItem = items[n - 1];
    }
  }
  const featuredLabel =
    params.locale === "ru" ? "Главный кейс" : params.locale === "en" ? "Featured case" : "Asosiy keys";
  const openCase =
    params.locale === "ru" ? "Открыть кейс" : params.locale === "en" ? "Open case" : "Keysni ochish";

  function FeaturedProjectCard({ p, idx, label }: { p: ProjectView; idx: number; label?: string }) {
    return (
      <Link
        href={`/${params.locale}/portfolio/${p.slug}`}
        className="group block card card-hover overflow-hidden"
      >
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative aspect-[16/10] bg-ink-50 overflow-hidden">
            {p.cover_image ? (
              <Image
                src={p.cover_image}
                alt={p.title}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
                priority={idx === 0}
              />
            ) : (
              <div className={`absolute inset-0 bg-gradient-to-br ${FALLBACK_GRADIENT[idx % FALLBACK_GRADIENT.length]}`}>
                <div aria-hidden className="absolute inset-0 grid-bg opacity-20" />
              </div>
            )}
            {label && (
              <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-black/55 backdrop-blur text-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
                {label}
              </span>
            )}
            {p.category && (
              <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-cream-50/90 text-ink-900 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
                {p.category}
              </span>
            )}
          </div>
          <div className="p-7 md:p-10 flex flex-col justify-center">
            <span className="eyebrow">/ {params.locale === "ru" ? "проект" : params.locale === "en" ? "project" : "loyiha"}</span>
            <h2 className="display-3 mt-3 group-hover:text-brand-700 transition">{p.title}</h2>
            {p.excerpt && <p className="mt-3 text-ink-600 line-clamp-3">{p.excerpt}</p>}
            <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-900 group-hover:text-brand-600 transition">
              {openCase}
              <ArrowUpRightIcon size={14} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10 bg-mesh-hero opacity-70" />
        <div aria-hidden className="absolute inset-0 -z-10 grid-bg opacity-40" />
        <div aria-hidden className="absolute -top-32 right-1/4 h-96 w-96 rounded-full bg-violet-300/30 blur-3xl animate-blob" />
        <div className="container py-20 md:py-28">
          <div className="max-w-3xl">
            <span className="eyebrow">{t.portfolio.title}</span>
            <h1 className="display-1 mt-4">
              {params.locale === "uz" ? (<>Biz qurgan <span className="gradient-text">mahsulotlar</span></>) :
              params.locale === "ru" ? (<>Продукты, <span className="gradient-text">которые мы создали</span></>) :
              (<>Products <span className="gradient-text">we shipped</span></>)}
            </h1>
            <p className="mt-6 text-ink-600 text-lg max-w-2xl">{t.portfolio.subtitle}</p>
          </div>
        </div>
      </section>

      <section className="pb-12">
        <div className="container">
          {items.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-ink-200 bg-ink-50 p-14 text-center">
              <p className="text-ink-500">{t.portfolio.empty}</p>
            </div>
          ) : (
            <div className="space-y-10">
              {/* Top featured — n % 3 ∈ {1, 2} yoki n ∈ {1, 2} bo'lganda */}
              {topItem && <FeaturedProjectCard p={topItem} idx={0} label={featuredLabel} />}

              {/* O'rtadagi 3-ustunli grid */}
              {midItems.length > 0 && (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {midItems.map((p, i) => (
                    <Link
                      key={p.id}
                      href={`/${params.locale}/portfolio/${p.slug}`}
                      className="group card card-hover overflow-hidden flex flex-col"
                    >
                      <div className="relative aspect-[4/3] bg-ink-50 overflow-hidden">
                        {p.cover_image ? (
                          <Image
                            src={p.cover_image}
                            alt={p.title}
                            fill
                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                            className="object-contain"
                          />
                        ) : (
                          <div className={`absolute inset-0 bg-gradient-to-br ${FALLBACK_GRADIENT[(i + 1) % FALLBACK_GRADIENT.length]}`}>
                            <div aria-hidden className="absolute inset-0 grid-bg opacity-20" />
                          </div>
                        )}
                        {p.category && (
                          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 backdrop-blur text-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
                            {p.category}
                          </span>
                        )}
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <h3 className="font-bold text-ink-900 leading-snug line-clamp-2 group-hover:text-brand-700 transition">{p.title}</h3>
                        {p.excerpt && <p className="mt-2 text-sm text-ink-600 line-clamp-2">{p.excerpt}</p>}
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* Bottom featured — n % 3 === 2 yoki n === 2 bo'lganda */}
              {bottomItem && <FeaturedProjectCard p={bottomItem} idx={n - 1} />}
            </div>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="card p-8 md:p-12 text-center">
            <h2 className="display-3">
              {params.locale === "ru" ? "Хотите подобный кейс для своего бизнеса?" :
               params.locale === "en" ? "Want a similar case for your business?" :
               "Biznes uchun shunga o'xshash kerakmi?"}
            </h2>
            <p className="mt-3 text-ink-600">
              {params.locale === "ru" ? "Расскажите о задаче — мы предложим решение." :
               params.locale === "en" ? "Tell us about your problem — we'll propose a solution." :
               "Vazifangiz haqida yozing — biz yechim taklif qilamiz."}
            </p>
            <div className="mt-6 flex justify-center">
              <CTAButton source="portfolio-cta" variant="accent" size="lg">
                <SendIcon size={18} /> {t.cta.sendRequest}
              </CTAButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
