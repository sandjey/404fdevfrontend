import { notFound } from "next/navigation";
import Script from "next/script";
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
      <Header locale={locale} />
      <main className="min-h-[60vh]">{children}</main>
      <Footer locale={locale} />
      <ContactModal locale={locale} />

      {/* Global structured data — picked up by Google/Yandex/Bing */}
      <Script
        id="ld-organization"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLD()) }}
      />
      <Script
        id="ld-localbusiness"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessLD()) }}
      />
      <Script
        id="ld-website"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLD(locale)) }}
      />
    </>
  );
}
