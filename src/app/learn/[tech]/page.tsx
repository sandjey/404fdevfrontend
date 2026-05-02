import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { api, type Technology, type Section, type Lesson } from "@/lib/api";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 300;

type Params = { tech: string };

type TechResponse = {
  technology: Technology;
  sections: Section[];
};

async function getTech(slug: string) {
  try {
    return await api.get<TechResponse>(`/learn/${slug}`, { next: { revalidate: 300 } });
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const data = await getTech(params.tech);
  if (!data) return { title: "Texnologiya topilmadi" };
  const { technology } = data;
  return buildMetadata({
    title: `${technology.name} darslari`,
    description: technology.description || `${technology.name} bo'yicha bepul o'zbek tilidagi darsliklar.`,
    path: `/learn/${technology.slug}`,
    locale: "uz",
  });
}

export default async function TechPage({ params }: { params: Params }) {
  const data = await getTech(params.tech);
  if (!data) notFound();
  const { technology, sections } = data;

  // Server-side, lessons ni alohida olamiz: tree endpointidan
  let lessonsBySection: Record<string, Lesson[]> = {};
  try {
    const tree = await api.get<(Technology & { sections: (Section & { lessons: Lesson[] })[] })[] | null>(
      `/learn/tree`,
      { next: { revalidate: 300 } }
    );
    const safeTree = Array.isArray(tree) ? tree : [];
    const t = safeTree.find((x) => x.slug === technology.slug);
    if (t && Array.isArray(t.sections)) {
      for (const s of t.sections) lessonsBySection[s.id] = Array.isArray(s.lessons) ? s.lessons : [];
    }
  } catch {}

  return (
    <section className="section">
      <div className="container max-w-4xl">
        <nav className="text-sm text-ink-500 mb-6">
          <Link href="/learn" className="hover:text-ink-900">Darslar</Link>
          <span className="mx-2">/</span>
          <span className="text-ink-700">{technology.name}</span>
        </nav>

        <header className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-ink-900">{technology.name}</h1>
          {technology.description && <p className="mt-4 text-ink-600 text-lg">{technology.description}</p>}
        </header>

        {sections.length === 0 ? (
          <p className="text-ink-500">Hozircha bo'limlar yo'q.</p>
        ) : (
          <div className="space-y-8">
            {sections.map((section) => {
              const lessons = lessonsBySection[section.id] || [];
              return (
                <section key={section.id} className="card p-6">
                  <h2 className="text-xl font-bold text-ink-900">{section.title}</h2>
                  {section.description && (
                    <p className="mt-1 text-sm text-ink-600">{section.description}</p>
                  )}
                  {lessons.length > 0 ? (
                    <ol className="mt-4 space-y-1">
                      {lessons.map((l, idx) => (
                        <li key={l.id}>
                          <Link
                            href={`/learn/${technology.slug}/${section.slug}/${l.slug}`}
                            className="flex items-start gap-3 rounded-lg px-3 py-2 hover:bg-ink-50 transition"
                          >
                            <span className="text-xs font-mono text-ink-400 mt-0.5 w-6">
                              {String(idx + 1).padStart(2, "0")}
                            </span>
                            <span className="text-sm text-ink-800 hover:text-brand-700">{l.title}</span>
                          </Link>
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <p className="mt-3 text-sm text-ink-500">Mavzular tez orada qo'shiladi.</p>
                  )}
                </section>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
