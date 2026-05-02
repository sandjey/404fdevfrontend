import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { type Locale } from "@/lib/i18n/config";
import { buildMetadata } from "@/lib/seo";
import { api, SITE_URL, type Service } from "@/lib/api";

type Params = { locale: Locale; slug: string };

async function getService(locale: Locale, slug: string) {
  try {
    return await api.get<Service>(`/services/${slug}?lang=${locale}`, { next: { revalidate: 300 } });
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const s = await getService(params.locale, params.slug);
  if (!s) return { title: "Service" };
  return buildMetadata({
    title: s.seo_title || s.title,
    description: s.seo_description || s.excerpt,
    path: `/${params.locale}/services/${s.slug}`,
    locale: params.locale,
    image: s.cover_image,
  });
}

export default async function ServiceDetailPage({ params }: { params: Params }) {
  const s = await getService(params.locale, params.slug);
  if (!s) notFound();

  const ld = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    description: s.excerpt,
    provider: { "@type": "Organization", name: "404Dev", url: SITE_URL },
    url: `${SITE_URL}/${params.locale}/services/${s.slug}`,
  };

  return (
    <article className="section">
      <div className="container max-w-4xl">
        <header className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-ink-900">{s.title}</h1>
          {s.excerpt && <p className="mt-4 text-lg text-ink-600">{s.excerpt}</p>}
        </header>
        <div className="prose-content" dangerouslySetInnerHTML={{ __html: s.content }} />
        <Script
          id="ld-service"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
        />
      </div>
    </article>
  );
}
