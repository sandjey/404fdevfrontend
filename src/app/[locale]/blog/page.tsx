import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo";
import { rawPaged, type BlogPostView } from "@/lib/api";
import { formatDate, readingTime } from "@/lib/utils";
import { ArrowUpRightIcon } from "@/components/icons";

export const revalidate = 120;

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const t = getDictionary(params.locale);
  return buildMetadata({
    title: t.blog.title,
    description: t.blog.subtitle,
    path: `/${params.locale}/blog`,
    locale: params.locale,
  });
}

export default async function BlogPage({ params }: { params: { locale: Locale } }) {
  const t = getDictionary(params.locale);

  let posts: BlogPostView[] = [];
  try {
    const res = await rawPaged<BlogPostView>(`/blog?lang=${params.locale}&page_size=24`, { next: { revalidate: 120 } });
    posts = Array.isArray(res.data) ? res.data : [];
  } catch {
    posts = [];
  }

  /* Layout pattern (3-column grid base):
       n === 1               → 1 top katta
       n === 2               → 1 top + 1 bottom katta
       n % 3 === 0           → faqat 3-li grid
       n % 3 === 1           → 1 top katta + grid
       n % 3 === 2           → 1 top katta + grid + 1 bottom katta */
  const n = posts.length;
  let topPost: BlogPostView | null = null;
  let midPosts: BlogPostView[] = [];
  let bottomPost: BlogPostView | null = null;
  if (n === 1) {
    topPost = posts[0];
  } else if (n === 2) {
    topPost = posts[0];
    bottomPost = posts[1];
  } else if (n >= 3) {
    const mod = n % 3;
    if (mod === 0) {
      midPosts = posts;
    } else if (mod === 1) {
      topPost = posts[0];
      midPosts = posts.slice(1);
    } else {
      topPost = posts[0];
      midPosts = posts.slice(1, -1);
      bottomPost = posts[n - 1];
    }
  }

  function FeaturedPostCard({ p, idx, showBadge }: { p: BlogPostView; idx: number; showBadge?: boolean }) {
    return (
      <Link
        href={`/${params.locale}/blog/${p.slug}`}
        className="group block card card-hover overflow-hidden"
      >
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative aspect-[16/10] bg-ink-100">
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
              <div className="absolute inset-0 bg-gradient-to-br from-brand-500 to-cyan-500" />
            )}
            {showBadge && (
              <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-black/55 backdrop-blur text-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
                Featured
              </span>
            )}
          </div>
          <div className="p-7 md:p-10 flex flex-col justify-center">
            {p.category && <span className="eyebrow">{p.category}</span>}
            <h2 className="display-3 mt-3 group-hover:text-brand-700 transition">{p.title}</h2>
            {p.excerpt && <p className="mt-3 text-ink-600 line-clamp-3">{p.excerpt}</p>}
            <div className="mt-5 flex items-center justify-between text-xs text-ink-500">
              <span>
                {formatDate(p.published_at || p.created_at, params.locale)} · {readingTime(p.content, params.locale)}
              </span>
              <ArrowUpRightIcon size={16} className="text-ink-700 group-hover:text-brand-600 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition" />
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
        <div aria-hidden className="absolute inset-0 -z-10 aurora opacity-70" />
        <div aria-hidden className="absolute inset-0 -z-10 grid-bg opacity-40" />
        <div aria-hidden className="absolute -top-32 right-1/4 h-80 w-80 rounded-full bg-brand-300/30 blur-3xl animate-blob" />
        <div className="container py-20 md:py-24">
          <div className="max-w-3xl">
            <span className="eyebrow">{t.blog.title}</span>
            <h1 className="display-1 mt-4">
              {params.locale === "uz" ? (<>Bizning <span className="gradient-text">jurnal</span></>) :
              params.locale === "ru" ? (<>Наш <span className="gradient-text">журнал</span></>) :
              (<>Our <span className="gradient-text">journal</span></>)}
            </h1>
            <p className="mt-6 text-ink-600 text-lg max-w-2xl">{t.blog.subtitle}</p>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container">
          {posts.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-ink-200 bg-ink-50 p-14 text-center">
              <p className="text-ink-500">{t.blog.empty}</p>
            </div>
          ) : (
            <div className="space-y-10">
              {/* Top featured — n % 3 ∈ {1, 2} yoki n ∈ {1, 2} bo'lganda */}
              {topPost && <FeaturedPostCard p={topPost} idx={0} showBadge />}

              {/* O'rtadagi 3-ustunli grid */}
              {midPosts.length > 0 && (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {midPosts.map((p) => (
                    <article key={p.id} className="group card card-hover overflow-hidden flex flex-col">
                      {p.cover_image ? (
                        <Link href={`/${params.locale}/blog/${p.slug}`} className="block aspect-[16/9] relative overflow-hidden bg-ink-100">
                          <Image
                            src={p.cover_image}
                            alt={p.title}
                            fill
                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </Link>
                      ) : (
                        <Link href={`/${params.locale}/blog/${p.slug}`} className="block aspect-[16/9] relative bg-gradient-to-br from-brand-100 to-cyan-100">
                          <div aria-hidden className="absolute inset-0 grid-bg opacity-30" />
                        </Link>
                      )}
                      <div className="p-6 flex flex-col flex-1">
                        {p.category && (
                          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600">{p.category}</span>
                        )}
                        <h2 className="mt-1.5 text-lg font-bold text-ink-900 line-clamp-2 leading-snug">
                          <Link href={`/${params.locale}/blog/${p.slug}`} className="hover:text-brand-700 transition">
                            {p.title}
                          </Link>
                        </h2>
                        {p.excerpt && <p className="mt-2 text-sm text-ink-600 line-clamp-3">{p.excerpt}</p>}
                        <div className="mt-auto pt-4 flex items-center justify-between text-xs text-ink-500">
                          <time dateTime={p.published_at || p.created_at}>
                            {formatDate(p.published_at || p.created_at, params.locale)}
                          </time>
                          <span>{readingTime(p.content, params.locale)}</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {/* Bottom featured — n % 3 === 2 yoki n === 2 bo'lganda */}
              {bottomPost && <FeaturedPostCard p={bottomPost} idx={n - 1} />}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
