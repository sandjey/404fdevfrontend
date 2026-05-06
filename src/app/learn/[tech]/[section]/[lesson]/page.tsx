import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { api, SITE_URL, type LessonView, type Technology, type Section, type Lesson } from "@/lib/api";
import {
  buildMetadata,
  breadcrumbLD,
  articleLD,
  learningResourceLD,
  learnKeywords,
} from "@/lib/seo";
import { visualForSlug } from "@/lib/learn-catalog";
import LearnSidebar from "@/components/learn/LearnSidebar";
import { ArrowRightIcon } from "@/components/icons";

export const revalidate = 300;

type Params = { tech: string; section: string; lesson: string };

type TreeTech = Technology & { sections: (Section & { lessons: Lesson[] })[] };

type LessonSitemapPath = {
  TechSlug: string;
  SectionSlug: string;
  LessonSlug: string;
  UpdatedAt: string;
};

async function getLesson(p: Params) {
  try {
    return await api.get<LessonView>(`/learn/${p.tech}/${p.section}/${p.lesson}`, {
      next: { revalidate: 300 },
    });
  } catch {
    return null;
  }
}

// Pre-render every published lesson at build time. Backend already exposes
// /learn/sitemap which lists every lesson — perfect SEO source-of-truth.
export async function generateStaticParams(): Promise<Params[]> {
  try {
    const paths = await api.get<LessonSitemapPath[] | null>(`/learn/sitemap`, {
      next: { revalidate: 300 },
    });
    return Array.isArray(paths)
      ? paths.map((p) => ({
          tech: p.TechSlug,
          section: p.SectionSlug,
          lesson: p.LessonSlug,
        }))
      : [];
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const v = await getLesson(params);
  if (!v) return { title: "Mavzu topilmadi" };

  // Title patterned for search-result CTR: lesson > section > tech > brand
  const title =
    v.seo_title ||
    `${v.title} — ${v.section_title} | ${v.technology_name} darslari (o'zbek tilida)`;

  const description =
    v.seo_description ||
    v.excerpt ||
    `${v.technology_name} ${v.section_title} bo'limidagi "${v.title}" mavzusi. O'zbek tilida bepul dars — 404Dev Learn.`;

  return buildMetadata({
    title,
    description,
    path: `/learn/${v.technology_slug}/${v.section_slug}/${v.slug}`,
    locale: "uz",
    type: "article",
    keywords: [
      v.title,
      `${v.title} o'zbek tilida`,
      `${v.title} dars`,
      `${v.technology_name} ${v.title}`,
      ...learnKeywords({ name: v.technology_name, slug: v.technology_slug }),
    ],
  });
}

export default async function LessonPage({ params }: { params: Params }) {
  const v = await getLesson(params);
  if (!v) notFound();

  let tree: TreeTech[] = [];
  try {
    const t = await api.get<TreeTech[] | null>(`/learn/tree`, { next: { revalidate: 300 } });
    tree = Array.isArray(t) ? t : [];
  } catch {}

  const techNode = tree.find((x) => x.slug === v.technology_slug);
  const sectionNode = techNode?.sections?.find((x) => x.slug === v.section_slug);
  const sectionLessons: Lesson[] = Array.isArray(sectionNode?.lessons) ? sectionNode!.lessons : [];

  let prev: Lesson | null = null;
  let next: Lesson | null = null;
  let prevSection: Section | null = null;
  let nextSection: Section | null = null;

  if (techNode && sectionNode) {
    const idx = sectionLessons.findIndex((l) => l.slug === v.slug);
    if (idx > 0) {
      prev = sectionLessons[idx - 1];
      prevSection = sectionNode;
    } else {
      const sIdx = techNode.sections.findIndex((s) => s.slug === v.section_slug);
      if (sIdx > 0) {
        const ps = techNode.sections[sIdx - 1];
        const last = ps.lessons[ps.lessons.length - 1];
        if (last) {
          prev = last;
          prevSection = ps;
        }
      }
    }
    if (idx >= 0 && idx < sectionLessons.length - 1) {
      next = sectionLessons[idx + 1];
      nextSection = sectionNode;
    } else {
      const sIdx = techNode.sections.findIndex((s) => s.slug === v.section_slug);
      if (sIdx >= 0 && sIdx < techNode.sections.length - 1) {
        const ns = techNode.sections[sIdx + 1];
        const first = ns.lessons[0];
        if (first) {
          next = first;
          nextSection = ns;
        }
      }
    }
  }

  const allLessonsFlat = (techNode?.sections ?? []).flatMap((s) =>
    s.lessons.map((l) => ({ sectionSlug: s.slug, lessonSlug: l.slug }))
  );
  const currentIdx = allLessonsFlat.findIndex(
    (x) => x.sectionSlug === v.section_slug && x.lessonSlug === v.slug
  );
  const totalAll = allLessonsFlat.length;
  const progressPct =
    totalAll > 0 && currentIdx >= 0 ? Math.round(((currentIdx + 1) / totalAll) * 100) : 0;

  const visual = visualForSlug(v.technology_slug);

  const sidebarSections = (techNode?.sections ?? []).map((s) => ({
    id: s.id,
    title: s.title,
    slug: s.slug,
    lessons: s.lessons.map((l) => ({ id: l.id, title: l.title, slug: l.slug })),
  }));

  // ============ Structured data ============
  const lessonUrl = `${SITE_URL}/learn/${v.technology_slug}/${v.section_slug}/${v.slug}`;
  const techUrl = `${SITE_URL}/learn/${v.technology_slug}`;
  const lessonDescription =
    v.seo_description ||
    v.excerpt ||
    `${v.technology_name} ${v.section_title} bo'limidagi "${v.title}" mavzusi. O'zbek tilida bepul dars — 404Dev Learn.`;

  const breadcrumb = breadcrumbLD([
    { name: "Bosh sahifa", url: `${SITE_URL}/uz` },
    { name: "Darslar", url: `${SITE_URL}/learn` },
    { name: v.technology_name, url: techUrl },
    { name: v.section_title, url: `${techUrl}/${v.section_slug}` },
    { name: v.title, url: lessonUrl },
  ]);

  const learningResource = learningResourceLD({
    name: v.title,
    description: lessonDescription,
    url: lessonUrl,
    technologyName: v.technology_name,
    technologyUrl: techUrl,
    sectionName: v.section_title,
    publishedAt: v.created_at,
    updatedAt: v.updated_at,
  });

  // Article LD — improves rich result eligibility for "How-to" / tutorial
  // queries; Google often pairs Article cards with the Course carousel.
  const article = articleLD({
    title: v.title,
    description: lessonDescription,
    url: lessonUrl,
    publishedAt: v.created_at,
    updatedAt: v.updated_at,
    author: "404Dev",
    locale: "uz",
    tags: [v.technology_name, v.section_title, v.title, "dasturlash darsi", "o'zbek tilida"],
  });

  return (
    <div className="bg-cream-50 min-h-[60vh]">
      <script
        id="ld-lesson-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        id="ld-lesson-article"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
      />
      <div className="container py-8 md:py-10">
        <div className="flex gap-10">
          <LearnSidebar
            techSlug={v.technology_slug}
            techName={v.technology_name}
            techGlyph={visual.glyph}
            techBg={visual.bg}
            techAccent={visual.accent}
            techRing={visual.ring}
            sections={sidebarSections}
            activeSectionSlug={v.section_slug}
            activeLessonSlug={v.slug}
          />

          <article className="min-w-0 flex-1 max-w-3xl">
            {/* Breadcrumb */}
            <nav className="text-xs md:text-sm text-ink-500 mb-5 flex flex-wrap items-center gap-x-2 font-mono">
              <Link href="/learn" className="hover:text-ink-900 transition">
                LEARN
              </Link>
              <span className="text-ink-300">/</span>
              <Link
                href={`/learn/${v.technology_slug}`}
                className="hover:text-ink-900 transition"
              >
                {v.technology_name}
              </Link>
              <span className="text-ink-300">/</span>
              <span className="text-ink-700 normal-case">{v.section_title}</span>
            </nav>

            {/* Progress */}
            {totalAll > 0 && (
              <div className="flex items-center gap-3 mb-8">
                <div className="flex-1 h-[3px] rounded-full bg-ink-200 overflow-hidden">
                  <div
                    className="h-full bg-ink-900 transition-all"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
                <span className="font-mono text-[11px] text-ink-500 tabular-nums shrink-0 tracking-wider">
                  {String(currentIdx + 1).padStart(2, "0")} / {String(totalAll).padStart(2, "0")}
                </span>
              </div>
            )}

            {/* Header */}
            <header className="mb-10 pb-8 border-b border-ink-200">
              <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-500">
                {v.section_title}
              </span>
              <h1 className="mt-3 text-3xl md:text-5xl font-bold text-ink-900 leading-[1.1] tracking-tight">
                {v.title}
              </h1>
              {v.excerpt && (
                <p className="mt-5 text-lg text-ink-600 leading-relaxed">{v.excerpt}</p>
              )}
            </header>

            <div
              className="prose-content"
              dangerouslySetInnerHTML={{ __html: v.content }}
            />

            {/* Prev / next */}
            {(prev || next) && (
              <nav className="mt-16 grid sm:grid-cols-2 gap-3 pb-24 lg:pb-8 border-t border-ink-200 pt-8">
                {prev && prevSection ? (
                  <Link
                    href={`/learn/${v.technology_slug}/${prevSection.slug}/${prev.slug}`}
                    className="group rounded-lg border border-ink-200 p-4 transition hover:border-ink-900/30 hover:bg-cream-50"
                  >
                    <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.18em] uppercase text-ink-500">
                      <ArrowRightIcon size={11} className="rotate-180" />
                      Oldingi
                    </span>
                    <p className="mt-1.5 font-semibold text-ink-900 group-hover:text-brand-700 transition leading-snug text-[15px]">
                      {prev.title}
                    </p>
                  </Link>
                ) : (
                  <span />
                )}
                {next && nextSection ? (
                  <Link
                    href={`/learn/${v.technology_slug}/${nextSection.slug}/${next.slug}`}
                    className="group rounded-lg border border-ink-200 p-4 text-right transition hover:border-ink-900/30 hover:bg-cream-50"
                  >
                    <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.18em] uppercase text-ink-500 justify-end w-full">
                      Keyingi
                      <ArrowRightIcon size={11} />
                    </span>
                    <p className="mt-1.5 font-semibold text-ink-900 group-hover:text-brand-700 transition leading-snug text-[15px]">
                      {next.title}
                    </p>
                  </Link>
                ) : (
                  <span />
                )}
              </nav>
            )}

            <Script
              id="ld-lesson-resource"
              type="application/ld+json"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResource) }}
            />
          </article>
        </div>
      </div>
    </div>
  );
}
