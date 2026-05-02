import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { api, SITE_URL, type LessonView, type Technology, type Section, type Lesson } from "@/lib/api";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 300;

type Params = { tech: string; section: string; lesson: string };

async function getLesson(p: Params) {
  try {
    return await api.get<LessonView>(`/learn/${p.tech}/${p.section}/${p.lesson}`, { next: { revalidate: 300 } });
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const v = await getLesson(params);
  if (!v) return { title: "Mavzu topilmadi" };
  return buildMetadata({
    title: v.seo_title || `${v.title} — ${v.technology_name}`,
    description: v.seo_description || v.excerpt || `${v.technology_name} bo'yicha ${v.title} mavzusi.`,
    path: `/learn/${v.technology_slug}/${v.section_slug}/${v.slug}`,
    locale: "uz",
    type: "article",
  });
}

export default async function LessonPage({ params }: { params: Params }) {
  const v = await getLesson(params);
  if (!v) notFound();

  // Sibling lessons — prev/next
  let prev: Lesson | null = null;
  let next: Lesson | null = null;
  try {
    const tree = await api.get<(Technology & { sections: (Section & { lessons: Lesson[] })[] })[] | null>(
      `/learn/tree`,
      { next: { revalidate: 300 } }
    );
    const safeTree = Array.isArray(tree) ? tree : [];
    const t = safeTree.find((x) => x.slug === v.technology_slug);
    const s = t?.sections?.find((x) => x.slug === v.section_slug);
    const lessons = Array.isArray(s?.lessons) ? s!.lessons : [];
    if (lessons.length > 0) {
      const idx = lessons.findIndex((l) => l.slug === v.slug);
      if (idx > 0) prev = lessons[idx - 1];
      if (idx >= 0 && idx < lessons.length - 1) next = lessons[idx + 1];
    }
  } catch {}

  const ld = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: v.title,
    description: v.excerpt || v.seo_description,
    inLanguage: "uz",
    learningResourceType: "Lesson",
    isAccessibleForFree: true,
    url: `${SITE_URL}/learn/${v.technology_slug}/${v.section_slug}/${v.slug}`,
    publisher: { "@type": "Organization", name: "404Dev" },
  };

  return (
    <article className="section">
      <div className="container max-w-3xl">
        <nav className="text-sm text-ink-500 mb-6">
          <Link href="/learn" className="hover:text-ink-900">Darslar</Link>
          <span className="mx-2">/</span>
          <Link href={`/learn/${v.technology_slug}`} className="hover:text-ink-900">{v.technology_name}</Link>
          <span className="mx-2">/</span>
          <span className="text-ink-700">{v.section_title}</span>
        </nav>

        <header className="mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-ink-900 leading-tight">{v.title}</h1>
          {v.excerpt && <p className="mt-3 text-lg text-ink-600">{v.excerpt}</p>}
        </header>

        <div className="prose-content" dangerouslySetInnerHTML={{ __html: v.content }} />

        {(prev || next) && (
          <nav className="mt-12 grid sm:grid-cols-2 gap-4">
            {prev ? (
              <Link
                href={`/learn/${v.technology_slug}/${v.section_slug}/${prev.slug}`}
                className="card p-5 group"
              >
                <span className="text-xs text-ink-500">← Oldingi</span>
                <p className="mt-1 font-semibold text-ink-900 group-hover:text-brand-700">{prev.title}</p>
              </Link>
            ) : <span />}
            {next ? (
              <Link
                href={`/learn/${v.technology_slug}/${v.section_slug}/${next.slug}`}
                className="card p-5 text-right group"
              >
                <span className="text-xs text-ink-500">Keyingi →</span>
                <p className="mt-1 font-semibold text-ink-900 group-hover:text-brand-700">{next.title}</p>
              </Link>
            ) : <span />}
          </nav>
        )}

        <Script
          id="ld-lesson"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
        />
      </div>
    </article>
  );
}
