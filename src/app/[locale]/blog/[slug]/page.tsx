import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo";
import { api, SITE_URL, type BlogPostView } from "@/lib/api";
import { formatDate, readingTime } from "@/lib/utils";

type Params = { locale: Locale; slug: string };

export const revalidate = 300;

async function getPost(locale: Locale, slug: string): Promise<BlogPostView | null> {
  try {
    return await api.get<BlogPostView>(`/blog/${slug}?lang=${locale}`, { next: { revalidate: 300 } });
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const post = await getPost(params.locale, params.slug);
  if (!post) return { title: "Post not found" };
  return buildMetadata({
    title: post.seo_title || post.title,
    description: post.seo_description || post.excerpt,
    path: `/${params.locale}/blog/${post.slug}`,
    locale: params.locale,
    image: post.cover_image,
    type: "article",
  });
}

export default async function BlogDetailPage({ params }: { params: Params }) {
  const t = getDictionary(params.locale);
  const post = await getPost(params.locale, params.slug);
  if (!post) notFound();

  const articleUrl = `${SITE_URL}/${params.locale}/blog/${post.slug}`;
  const ld = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || post.seo_description,
    image: post.cover_image ? [post.cover_image] : [`${SITE_URL}/og-default.svg`],
    datePublished: post.published_at || post.created_at,
    dateModified: post.updated_at,
    author: { "@type": "Organization", name: "404Dev", url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "404Dev",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.svg`, width: 512, height: 512 },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
    url: articleUrl,
    inLanguage: params.locale === "uz" ? "uz-UZ" : params.locale === "ru" ? "ru-RU" : "en-US",
    keywords: (post.tags ?? []).join(", "),
    articleSection: post.category || undefined,
  };

  const breadcrumbLD = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "404Dev", item: `${SITE_URL}/${params.locale}` },
      { "@type": "ListItem", position: 2, name: t.blog.title, item: `${SITE_URL}/${params.locale}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: articleUrl },
    ],
  };

  return (
    <article className="section">
      <div className="container max-w-3xl">
        <div className="mb-8">
          <Link href={`/${params.locale}/blog`} className="text-sm text-brand-600 hover:underline">
            ← {t.nav.blog}
          </Link>
        </div>

        <header className="mb-8">
          {post.category && (
            <span className="text-xs font-semibold text-brand-600 uppercase tracking-wider">{post.category}</span>
          )}
          <h1 className="mt-3 text-3xl md:text-5xl font-bold text-ink-900 leading-tight">{post.title}</h1>
          <div className="mt-4 flex items-center gap-3 text-sm text-ink-500">
            <time dateTime={post.published_at || post.created_at}>
              {formatDate(post.published_at || post.created_at, params.locale)}
            </time>
            <span aria-hidden>·</span>
            <span>{readingTime(post.content, params.locale)}</span>
          </div>
        </header>

        {post.cover_image && (
          <div className="relative aspect-[16/9] mb-8 overflow-hidden rounded-2xl bg-ink-100">
            <Image
              src={post.cover_image}
              alt={post.title}
              fill
              priority
              sizes="(min-width: 768px) 768px, 100vw"
              className="object-cover"
            />
          </div>
        )}

        <div className="prose-content" dangerouslySetInnerHTML={{ __html: post.content }} />

        {(post.tags || []).length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2">
            {(post.tags || []).map((tag) => (
              <span key={tag} className="rounded-full bg-ink-100 px-3 py-1 text-xs font-medium text-ink-700">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {(post.links || []).length > 0 && (
          <div className="mt-10 rounded-2xl bg-ink-50 p-6">
            <h3 className="text-sm font-semibold text-ink-900 mb-3">
              {params.locale === "ru" ? "Полезные ссылки" : params.locale === "en" ? "Useful links" : "Foydali havolalar"}
            </h3>
            <ul className="space-y-2">
              {(post.links || []).map((link, i) => (
                <li key={i}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm text-brand-600 hover:underline">
                    {link.title || link.url}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <Script
          id="ld-blogpost"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
        />
        <Script
          id="ld-blog-breadcrumb"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }}
        />
      </div>
    </article>
  );
}
