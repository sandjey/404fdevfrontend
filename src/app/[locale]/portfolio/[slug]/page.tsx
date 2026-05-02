import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo";
import { api, type ProjectView } from "@/lib/api";
import CTAButton from "@/components/CTAButton";
import { ArrowUpRightIcon, ExternalLinkIcon, SendIcon } from "@/components/icons";

type Params = { locale: Locale; slug: string };

export const revalidate = 300;

async function getProject(locale: Locale, slug: string): Promise<ProjectView | null> {
  try {
    return await api.get<ProjectView>(`/projects/${slug}?lang=${locale}`, { next: { revalidate: 300 } });
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const p = await getProject(params.locale, params.slug);
  if (!p) return { title: "Not found" };
  return buildMetadata({
    title: p.seo_title || p.title,
    description: p.seo_description || p.excerpt,
    path: `/${params.locale}/portfolio/${p.slug}`,
    locale: params.locale,
    image: p.cover_image,
    type: "article",
  });
}

export default async function ProjectDetail({ params }: { params: Params }) {
  const t = getDictionary(params.locale);
  const p = await getProject(params.locale, params.slug);
  if (!p) notFound();

  return (
    <article>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10 bg-mesh-hero opacity-50" />
        <div aria-hidden className="absolute inset-0 -z-10 grid-bg opacity-30" />
        <div className="container py-16 md:py-20">
          <Link href={`/${params.locale}/portfolio`} className="text-sm text-brand-600 hover:underline">
            ← {t.portfolio.title}
          </Link>
          <div className="mt-6 max-w-4xl">
            {p.category && <span className="eyebrow">{p.category}</span>}
            <h1 className="display-1 mt-4">{p.title}</h1>
            {p.excerpt && <p className="mt-5 text-ink-600 text-lg max-w-2xl">{p.excerpt}</p>}
            {(p.tags || []).length > 0 && (
              <div className="mt-6 flex flex-wrap gap-1.5">
                {(p.tags || []).map((tag) => (
                  <span key={tag} className="rounded-full bg-white/70 ring-1 ring-ink-200 backdrop-blur px-3 py-1 text-xs font-medium text-ink-700">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Cover */}
      {p.cover_image && (
        <div className="container">
          <div className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-ink-100 ring-1 ring-ink-100 shadow-card">
            <Image src={p.cover_image} alt={p.title} fill priority sizes="(min-width: 1280px) 1280px, 100vw" className="object-cover" />
          </div>
        </div>
      )}

      {/* Body */}
      <section className="section-tight">
        <div className="container max-w-3xl">
          {p.content ? (
            <div className="prose-content" dangerouslySetInnerHTML={{ __html: p.content }} />
          ) : (
            <p className="text-ink-500 italic">{t.portfolio.empty}</p>
          )}

          {(p.links || []).length > 0 && (
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {(p.links || []).map((l, i) => (
                <a
                  key={i}
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group card card-hover p-4 flex items-center justify-between gap-3"
                >
                  <span className="flex items-center gap-3 min-w-0">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700">
                      <ExternalLinkIcon size={16} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-ink-900 truncate">{l.title || l.url}</span>
                      <span className="block text-xs text-ink-500 truncate">{l.url}</span>
                    </span>
                  </span>
                  <ArrowUpRightIcon size={16} className="text-ink-400 group-hover:text-brand-600 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition" />
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Gallery */}
      {(p.images || []).length > 0 && (
        <section className="section-tight">
          <div className="container">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {(p.images || []).map((img, i) => (
                <div key={i} className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-ink-100 ring-1 ring-ink-100">
                  <Image src={img.url} alt={img.alt || p.title} fill sizes="(min-width: 1024px) 33vw, 50vw" className="object-cover transition-transform duration-700 hover:scale-105" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div className="card p-8 md:p-12 text-center">
            <h2 className="display-3">
              {params.locale === "ru" ? "Понравился кейс?" : params.locale === "en" ? "Like this case?" : "Bunday yechim sizga ham kerakmi?"}
            </h2>
            <p className="mt-3 text-ink-600">
              {params.locale === "ru" ? "Обсудим вашу задачу — ответим за 1 рабочий день." :
               params.locale === "en" ? "Let's discuss your project — we reply within 1 business day." :
               "Vazifangiz haqida yozing — 1 ish kuni ichida javob beramiz."}
            </p>
            <div className="mt-6 flex justify-center">
              <CTAButton source={`portfolio-detail:${p.slug}`} variant="accent" size="lg">
                <SendIcon size={18} /> {t.cta.sendRequest}
              </CTAButton>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
