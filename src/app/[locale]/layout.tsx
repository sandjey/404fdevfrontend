import { notFound } from "next/navigation";
import { LOCALES, isLocale, type Locale } from "@/lib/i18n/config";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContactModal from "@/components/contact/ContactModal";
import { organizationLD, websiteLD, localBusinessLD } from "@/lib/seo";

export const dynamicParams = false;

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;

  return (
    <>
      {/* Global structured data — plain script tags ship in initial SSR HTML
          (vs. next/script which adds runtime overhead) so non-JS crawlers
          like Yandex bot pick the JSON-LD up immediately. */}
      <script
        id="ld-organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLD()) }}
      />
      <script
        id="ld-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessLD()) }}
      />
      <script
        id="ld-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLD(locale)) }}
      />

      <Header locale={locale} />
      <main className="min-h-[60vh]">{children}</main>
      <Footer locale={locale} />
      <ContactModal locale={locale} />
    </>
  );
}
