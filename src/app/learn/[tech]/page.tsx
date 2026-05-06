import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { api, SITE_URL, type Technology, type Section, type Lesson } from "@/lib/api";
import {
  buildMetadata,
  breadcrumbLD,
  webPageLD,
  courseLD,
  learnKeywords,
} from "@/lib/seo";
import { visualForSlug } from "@/lib/learn-catalog";
import LearnSidebar from "@/components/learn/LearnSidebar";
import { ArrowRightIcon, PlayIcon } from "@/components/icons";

export const revalidate = 300;

type Params = { tech: string };

type TechResponse = {
  technology: Technology;
  sections: Section[];
};

type TreeNode = Technology & { sections: (Section & { lessons: Lesson[] })[] };

async function getTech(slug: string) {
  try {
    return await api.get<TechResponse>(`/learn/${slug}`, { next: { revalidate: 300 } });
  } catch {
    return null;
  }
}

// Pre-render every tech at build time so Google + Yandex see fully-rendered
// HTML on first crawl (faster TTFB, better indexability than ISR-only routes).
export async function generateStaticParams(): Promise<Params[]> {
  try {
    const tree = await api.get<TreeNode[] | null>(`/learn/tree`, {
      next: { revalidate: 300 },
    });
    return Array.isArray(tree) ? tree.map((t) => ({ tech: t.slug })) : [];
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const data = await getTech(params.tech);
  if (!data) return { title: "Texnologiya topilmadi" };
  const { technology } = data;

  // SEO-rich title with intent modifiers — covers "{tech} darslari",
  // "{tech} o'zbek tilida", "bepul {tech} kursi" head terms in one tag.
  const title = `${technology.name} darslari o'zbek tilida — bepul ${technology.name} kursi | 404Dev Learn`;
  const description = technology.description
    ? `${technology.description} ${technology.name} ni asoslardan amaliyotgacha o'zbek tilida bepul o'rganing — 404Dev Learn.`
    : `${technology.name} dasturlash tilini o'zbek tilida noldan o'rganish. Asoslardan amaliyotgacha — bepul darsliklar, real misollar va vazifalar bilan. 404Dev Learn.`;

  return buildMetadata({
    title,
    description,
    path: `/learn/${technology.slug}`,
    locale: "uz",
    keywords: learnKeywords({ name: technology.name, slug: technology.slug }),
  });
}

export default async function TechPage({ params }: { params: Params }) {
  const data = await getTech(params.tech);
  if (!data) notFound();
  const { technology, sections } = data;

  const lessonsBySection: Record<string, Lesson[]> = {};
  try {
    const tree = await api.get<(Technology & { sections: (Section & { lessons: Lesson[] })[] })[] | null>(
      `/learn/tree`,
      { next: { revalidate: 300 } }
    );
    const safeTree = Array.isArray(tree) ? tree : [];
    const t = safeTree.find((x) => x.slug === technology.slug);
    if (t && Array.isArray(t.sections)) {
      for (const s of t.sections) {
        lessonsBySection[s.id] = Array.isArray(s.lessons) ? s.lessons : [];
      }
    }
  } catch {}

  const totalLessons = sections.reduce(
    (acc, s) => acc + (lessonsBySection[s.id]?.length ?? 0),
    0
  );

  const visual = visualForSlug(technology.slug);

  const sidebarSections = sections.map((s) => ({
    id: s.id,
    title: s.title,
    slug: s.slug,
    lessons: (lessonsBySection[s.id] ?? []).map((l) => ({
      id: l.id,
      title: l.title,
      slug: l.slug,
    })),
  }));

  const firstSection = sections.find((s) => (lessonsBySection[s.id] ?? []).length > 0);
  const firstLesson = firstSection ? lessonsBySection[firstSection.id]?.[0] : undefined;

  // ============ Structured data ============
  const techUrl = `${SITE_URL}/learn/${technology.slug}`;

  const breadcrumb = breadcrumbLD([
    { name: "Bosh sahifa", url: `${SITE_URL}/uz` },
    { name: "Darslar", url: `${SITE_URL}/learn` },
    { name: technology.name, url: techUrl },
  ]);

  const webPage = webPageLD({
    url: techUrl,
    name: `${technology.name} darslari o'zbek tilida — 404Dev Learn`,
    description:
      technology.description ||
      `${technology.name} bo'yicha bepul o'zbek tilidagi darsliklar. ${sections.length} bo'lim, ${totalLessons} mavzu.`,
    locale: "uz",
  });

  const course = courseLD({
    name: `${technology.name} darslari`,
    description:
      technology.description ||
      `${technology.name} dasturlash tilini o'zbek tilida noldan o'rganish. Asoslardan amaliyotgacha — bepul darsliklar, real misollar va vazifalar bilan.`,
    url: techUrl,
    slug: technology.slug,
    totalLessons,
    sections: sections.map((s) => {
      const ls = lessonsBySection[s.id] ?? [];
      return {
        title: s.title,
        url: `${techUrl}/${s.slug}`,
        lessons: ls.map((l) => ({
          title: l.title,
          url: `${techUrl}/${s.slug}/${l.slug}`,
        })),
      };
    }),
  });

  return (
    <div className="bg-cream-50 min-h-[60vh]">
      <script
        id="ld-tech-webpage"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }}
      />
      <script
        id="ld-tech-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <Script
        id="ld-tech-course"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(course) }}
      />
      <div className="container py-8 md:py-10">
        <div className="flex gap-10">
          <LearnSidebar
            techSlug={technology.slug}
            techName={technology.name}
            techGlyph={technology.icon || visual.glyph}
            techBg={visual.bg}
            techAccent={visual.accent}
            techRing={visual.ring}
            sections={sidebarSections}
          />

          <main className="min-w-0 flex-1 max-w-3xl">
            {/* Breadcrumb */}
            <nav className="text-xs md:text-sm text-ink-500 mb-6 flex flex-wrap items-center gap-x-2 font-mono">
              <Link href="/learn" className="hover:text-ink-900 transition">
                LEARN
              </Link>
              <span className="text-ink-300">/</span>
              <span className="text-ink-700">{technology.name}</span>
            </nav>

            {/* Header — restrained, typographic */}
            <header className="pb-8 mb-10 border-b border-ink-200">
              <span
                className={`inline-flex items-center gap-2 ${visual.accent} font-mono text-[11px] tracking-[0.2em] uppercase`}
              >
                <span className={`h-1.5 w-1.5 rounded-full bg-current opacity-80`} />
                Texnologiya
              </span>
              <h1 className="mt-3 text-4xl md:text-5xl lg:text-6xl font-bold text-ink-900 tracking-tight leading-[1.05]">
                {technology.name}
              </h1>
              {technology.description && (
                <p className="mt-5 text-lg text-ink-600 leading-relaxed max-w-2xl">
                  {technology.description}
                </p>
              )}

              <dl className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm">
                <Stat label="Bo'limlar" value={String(sections.length)} />
                <Stat label="Mavzular" value={String(totalLessons)} />
                <Stat label="Til" value="O'zbek" />
                <Stat label="Narx" value="Bepul" />
              </dl>

              {firstLesson && firstSection && (
                <Link
                  href={`/learn/${technology.slug}/${firstSection.slug}/${firstLesson.slug}`}
                  className="btn btn-primary mt-8"
                >
                  <PlayIcon size={12} />
                  Birinchi darsdan boshlash
                </Link>
              )}
            </header>

            {/* Sections — clean documentation outline */}
            {sections.length === 0 ? (
              <div className="rounded-xl border border-dashed border-ink-200 p-12 text-center">
                <p className="text-ink-500">Hozircha bo'limlar yo'q. Tez orada qo'shiladi.</p>
              </div>
            ) : (
              <div className="space-y-12">
                {sections.map((section, sIdx) => {
                  const lessons = lessonsBySection[section.id] || [];
                  return (
                    <section key={section.id} id={`section-${section.slug}`}>
                      <div className="flex items-baseline gap-4 mb-4">
                        <span className="font-mono text-sm font-bold tabular-nums text-ink-400">
                          {String(sIdx + 1).padStart(2, "0")}
                        </span>
                        <div className="min-w-0 flex-1">
                          <h2 className="text-xl md:text-2xl font-bold text-ink-900 tracking-tight">
                            {section.title}
                          </h2>
                          {section.description && (
                            <p className="mt-1.5 text-sm text-ink-600 leading-relaxed">
                              {section.description}
                            </p>
                          )}
                        </div>
                      </div>

                      {lessons.length > 0 ? (
                        <ol className="ml-0 md:ml-9 divide-y divide-ink-200/70 border-y border-ink-200/70">
                          {lessons.map((l, idx) => (
                            <li key={l.id}>
                              <Link
                                href={`/learn/${technology.slug}/${section.slug}/${l.slug}`}
                                className="group flex items-center gap-4 py-3 transition-colors hover:bg-ink-100/40 -mx-3 px-3 rounded"
                              >
                                <span className="font-mono text-xs text-ink-400 tabular-nums w-8 shrink-0">
                                  {String(idx + 1).padStart(2, "0")}
                                </span>
                                <span className="flex-1 text-[15px] text-ink-800 group-hover:text-brand-700 transition">
                                  {l.title}
                                </span>
                                <ArrowRightIcon
                                  size={14}
                                  className="text-ink-300 group-hover:text-brand-600 group-hover:translate-x-0.5 transition shrink-0"
                                />
                              </Link>
                            </li>
                          ))}
                        </ol>
                      ) : (
                        <p className="ml-0 md:ml-9 text-sm text-ink-500 italic">
                          Mavzular tez orada qo'shiladi.
                        </p>
                      )}
                    </section>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500">{label}</dt>
      <dd className="mt-0.5 text-base font-bold text-ink-900 tabular-nums">{value}</dd>
    </div>
  );
}
