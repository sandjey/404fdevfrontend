import type { Metadata } from "next";
import Script from "next/script";
import { api, SITE_URL, type TechnologyTree } from "@/lib/api";
import {
  buildMetadata,
  breadcrumbLD,
  webPageLD,
  courseLD,
  learnKeywords,
} from "@/lib/seo";
import TechExplorer from "@/components/learn/TechExplorer";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title:
      "Bepul dasturlash darslari o'zbek tilida — JavaScript, Python, Go, React | 404Dev Learn",
    description:
      "404Dev Learn — o'zbek tilidagi bepul dasturlash darsliklari platformasi. JavaScript, TypeScript, Python, Go, Java, React, Node.js va boshqa texnologiyalarni asoslardan amaliyotgacha bosqichma-bosqich o'rganing. Real misollar va vazifalar bilan.",
    path: "/learn",
    locale: "uz",
    keywords: learnKeywords(),
  });
}

export default async function LearnIndexPage() {
  let tree: TechnologyTree[] = [];
  try {
    const res = await api.get<TechnologyTree[] | null>(`/learn/tree`, { next: { revalidate: 300 } });
    tree = Array.isArray(res) ? res : [];
  } catch {
    tree = [];
  }

  const available = tree.map((t) => ({
    slug: t.slug,
    name: t.name,
    description: t.description ?? "",
    icon: t.icon,
    sectionsCount: t.sections.length,
    lessonsCount: t.sections.reduce((acc, s) => acc + s.lessons.length, 0),
  }));

  const learnUrl = `${SITE_URL}/learn`;

  // Structured data
  const breadcrumb = breadcrumbLD([
    { name: "Bosh sahifa", url: `${SITE_URL}/uz` },
    { name: "Darslar", url: learnUrl },
  ]);
  const webPage = webPageLD({
    url: learnUrl,
    name: "Bepul dasturlash darslari o'zbek tilida — 404Dev Learn",
    description:
      "JavaScript, Python, Go, React va boshqa texnologiyalar bo'yicha bepul o'zbek tilidagi darsliklar. Asoslardan amaliyotgacha — bosqichma-bosqich.",
    locale: "uz",
  });

  // ItemList — Google rich result eligible "Course" carousel
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${learnUrl}#courses`,
    name: "Dasturlash kurslari — 404Dev Learn",
    numberOfItems: available.length,
    itemListElement: available.map((t, i) => {
      const techUrl = `${SITE_URL}/learn/${t.slug}`;
      return {
        "@type": "ListItem",
        position: i + 1,
        url: techUrl,
        item: {
          "@type": "Course",
          "@id": `${techUrl}#course`,
          name: `${t.name} darslari`,
          description:
            t.description ||
            `${t.name} bo'yicha bepul o'zbek tilidagi darslar. ${t.sectionsCount} bo'lim, ${t.lessonsCount} mavzu.`,
          url: techUrl,
          inLanguage: "uz-UZ",
          isAccessibleForFree: true,
          provider: {
            "@type": "Organization",
            name: "404Dev",
            url: SITE_URL,
            sameAs: [SITE_URL],
          },
          offers: {
            "@type": "Offer",
            category: "Free",
            price: 0,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
          hasCourseInstance: {
            "@type": "CourseInstance",
            courseMode: "online",
            inLanguage: "uz-UZ",
            isAccessibleForFree: true,
            location: { "@type": "VirtualLocation", url: techUrl },
          },
        },
      };
    }),
  };

  return (
    <>
      {/* Plain <script> tags ship in the SSR HTML — important for crawlers
          like Yandex bot that don't always execute JS. */}
      <script
        id="ld-learn-webpage"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }}
      />
      <script
        id="ld-learn-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      {available.length > 0 && (
        <Script
          id="ld-learn-courses"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
        />
      )}

      {/* Hero — exactly ~half viewport, asymmetric editorial layout */}
      <section className="relative overflow-hidden border-b border-ink-200/70 bg-cream-50 min-h-[52vh] flex items-center">
        <div aria-hidden className="absolute inset-0 -z-10 grid-bg opacity-[0.3]" />
        <div
          aria-hidden
          className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-brand-500/10 blur-3xl -z-10"
        />

        <div className="container w-full py-10 md:py-12">
          {/* Top meta row */}
          <div className="flex items-center justify-between gap-4 mb-6 md:mb-8">
            <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] uppercase text-ink-500">
              <span className="text-ink-900 font-bold">404DEV</span>
              <span className="h-px w-6 bg-ink-300" />
              <span>Learn</span>
              <span className="h-1 w-1 rounded-full bg-ink-300" />
              <span>v2025</span>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-emerald-50 ring-1 ring-emerald-200 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse-soft" />
              Bepul
            </span>
          </div>

          {/* Two-column hero body — content on left, side note on right */}
          <div className="grid gap-8 md:gap-10 md:grid-cols-12 items-center">
            <div className="md:col-span-8">
              <h1 className="font-display text-[40px] sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tightest leading-[0.98] text-ink-900">
                Dasturlashni{" "}
                <span className="italic font-serif text-brand-600 [font-feature-settings:'ss01']">
                  o'zbek tilida
                </span>{" "}
                o'rganing.
              </h1>
              <p className="mt-5 text-base md:text-lg text-ink-700 leading-relaxed max-w-xl">
                Asoslardan amaliyotgacha — soddadan murakkabga, real misollar va bepul darsliklar bilan.
              </p>
            </div>

            <aside className="md:col-span-4 md:pl-8 md:border-l md:border-ink-200">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500 mb-3">
                Nima o'rganasiz
              </p>
              <ul className="space-y-1.5 text-sm text-ink-700">
                <li className="flex items-start gap-2">
                  <span className="text-brand-500 mt-1.5">▸</span>
                  Asoslar va sintaksis
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-500 mt-1.5">▸</span>
                  Amaliy loyihalar
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-500 mt-1.5">▸</span>
                  Real misollar va vazifalar
                </li>
              </ul>
            </aside>
          </div>

          {/* Section divider — inside hero, marks where tech grid begins */}
          <div className="mt-8 md:mt-10 flex items-center gap-4">
            <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-500">
              Texnologiyalar
            </span>
            <span className="h-px flex-1 bg-ink-200" />
            <a
              href="#texnologiyalar"
              className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-500 hover:text-ink-900 transition"
            >
              ↓
            </a>
          </div>
        </div>
      </section>

      <div id="texnologiyalar" />
      <TechExplorer available={available} />
    </>
  );
}
