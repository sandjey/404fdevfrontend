import type { Metadata } from "next";
import { type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo";
import Hero from "@/components/home/Hero";
import HomePortfolio from "@/components/home/HomePortfolio";
import HomeBlog from "@/components/home/HomeBlog";
import ServicesGrid from "@/components/home/ServicesGrid";
import ProcessAndTestimonials from "@/components/home/ProcessAndTestimonials";
import TechMarquee from "@/components/home/TechMarquee";
import FAQ from "@/components/home/FAQ";
import CTAButton from "@/components/CTAButton";
import { SendIcon, TelegramIcon } from "@/components/icons";
import { SITE } from "@/lib/site";

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const t = getDictionary(params.locale);

  // Per-locale keyword-rich title — each one targets the primary search intent.
  const seoTitle =
    params.locale === "ru"
      ? "Цифровизация услуг в Узбекистане и по всему миру | 404Dev Ташкент"
      : params.locale === "en"
      ? "Digitalizing services in Uzbekistan and worldwide | 404Dev Tashkent"
      : "O'zbekiston va dunyo bo'ylab xizmatlarni raqamlashtirish | 404Dev Toshkent";

  const seoDescription =
    params.locale === "ru"
      ? "404Dev — outsourcing-студия в Ташкенте. Помогаем цифровизировать услуги в Узбекистане и по всему миру: сайты, Telegram-боты, мобильные приложения, CRM/ERP, SEO в Google и Яндекс. Прозрачная цена, прототип за 7 дней."
      : params.locale === "en"
      ? "404Dev is an outsourcing studio in Tashkent, Uzbekistan. We help digitalize services in Uzbekistan and around the world: websites, Telegram bots, mobile apps, CRM/ERP, and SEO for Google and Yandex. Transparent pricing, prototype in 7 days."
      : "404Dev — Toshkentdagi outsourcing studiya. O'zbekiston va butun dunyo bo'ylab xizmatlarni raqamlashtirishga yordam beramiz: web sayt, Telegram bot, mobil ilova, CRM/ERP, Google va Yandex SEO. Aniq narx, 7 kunda tayyor prototip.";

  return buildMetadata({
    title: seoTitle,
    description: seoDescription,
    path: `/${params.locale}`,
    locale: params.locale,
  });
}

export default function HomePage({ params }: { params: { locale: Locale } }) {
  const t = getDictionary(params.locale);

  return (
    <>
      <Hero locale={params.locale} />
      <HomePortfolio locale={params.locale} />
      <ServicesGrid locale={params.locale} />
      <ProcessAndTestimonials locale={params.locale} />
      <TechMarquee locale={params.locale} />
      <FAQ locale={params.locale} />
      <HomeBlog locale={params.locale} />

      {/* Final CTA */}
      <section className="section pb-32">
        <div className="container">
          <div className="relative overflow-hidden rounded-[2rem] bg-ink-900 px-8 py-16 md:px-16 md:py-24 text-center text-cream-50">
            {/* coral glow */}
            <div aria-hidden className="absolute -top-32 left-1/2 -translate-x-1/2 h-96 w-[42rem] rounded-full bg-brand-500/35 blur-3xl" />
            <div aria-hidden className="absolute inset-0 grid-bg opacity-15" />

            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full bg-cream-50/10 px-3.5 py-1.5 text-[11px] font-mono uppercase tracking-[0.18em] text-cream-50/85 ring-1 ring-cream-50/15">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-500 animate-pulse-soft" />
                {params.locale === "ru" ? "/ начнём проект" : params.locale === "en" ? "/ start a project" : "/ loyiha boshlaymiz"}
              </span>
              <h2 className="display-1 text-cream-50 mt-6">
                {t.home.ctaTitle}
              </h2>
              <p className="mt-5 text-cream-50/70 text-lg max-w-2xl mx-auto">
                {t.home.ctaSubtitle}
              </p>
              <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
                <CTAButton source="home-final-cta" variant="accent" size="lg">
                  <SendIcon size={18} /> {t.cta.sendRequest}
                </CTAButton>
                <a
                  href={SITE.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-lg bg-cream-50/10 text-cream-50 hover:bg-cream-50/20"
                >
                  <TelegramIcon size={18} /> Telegram
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
