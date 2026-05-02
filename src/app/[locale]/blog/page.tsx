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

  const featured = posts.length > 0 ? posts[0] : null;
  const rest = posts.length > 1 ? posts.slice(1) : [];

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
            <>
              {/* Featured */}
              {featured && (
                <Link
                  href={`/${params.locale}/blog/${featured.slug}`}
                  className="group block card card-hover overflow-hidden mb-10"
                >
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative aspect-[16/10] bg-ink-100">
                      {featured.cover_image ? (
                        <Image
                          src={featured.cover_image}
                          alt={featured.title}
                          fill
                          sizes="(min-width: 768px) 50vw, 100vw"
                          className="object-cover"
                          priority
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-500 to-cyan-500" />
                      )}
                      <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-black/55 backdrop-blur text-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
                        Featured
                      </span>
                    </div>
                    <div className="p-7 md:p-10 flex flex-col justify-center">
                      {featured.category && (
                        <span className="eyebrow">{featured.category}</span>
                      )}
                      <h2 className="display-3 mt-3 group-hover:text-brand-700 transition">
                        {featured.title}
                      </h2>
                      {featured.excerpt && (
                        <p className="mt-3 text-ink-600 line-clamp-3">{featured.excerpt}</p>
                      )}
                      <div className="mt-5 flex items-center justify-between text-xs text-ink-500">
                        <span>
                          {formatDate(featured.published_at || featured.created_at, params.locale)} · {readingTime(featured.content, params.locale)}
                        </span>
                        <ArrowUpRightIcon size={16} className="text-ink-700 group-hover:text-brand-600 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition" />
                      </div>
                    </div>
                  </div>
                </Link>
              )}

              {/* Grid */}
              {rest.length > 0 && (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {rest.map((p) => (
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
            </>
          )}
        </div>
      </section>
    </>
  );
}
