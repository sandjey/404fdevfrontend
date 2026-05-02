import type { Metadata } from "next";
import { type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo";
import ContactForm from "@/components/contact/ContactForm";
import { SITE } from "@/lib/site";
import { PhoneIcon, TelegramIcon } from "@/components/icons";

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const t = getDictionary(params.locale);
  return buildMetadata({
    title: t.contact.title,
    description: t.contact.subtitle,
    path: `/${params.locale}/contact`,
    locale: params.locale,
  });
}

export default function ContactPage({ params }: { params: { locale: Locale } }) {
  const t = getDictionary(params.locale);
  return (
    <>
      <section className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10 bg-mesh-hero opacity-60" />
        <div aria-hidden className="absolute inset-0 -z-10 grid-bg opacity-40" />
        <div className="container py-16 md:py-20">
          <div className="text-center max-w-2xl mx-auto">
            <span className="eyebrow">/ {t.contact.title}</span>
            <h1 className="display-1 mt-4">
              {params.locale === "uz" ? (<>Birgalikda yangi narsa <span className="text-brand-500">yarataylik</span></>) :
              params.locale === "ru" ? (<>Давайте <span className="text-brand-500">создадим</span> что-то вместе</>) :
              (<>Let's <span className="text-brand-500">build</span> something together</>)}
            </h1>
            <p className="mt-5 text-ink-700 text-lg">{t.contact.subtitle}</p>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr]">
            {/* Channels — phone / telegram + working hours + address */}
            <div className="space-y-3">
              <ContactRow
                icon={<PhoneIcon size={18} />}
                title={params.locale === "ru" ? "Телефон" : params.locale === "en" ? "Phone" : "Telefon"}
                value={SITE.phone}
                href={`tel:${SITE.phoneRaw}`}
              />
              <ContactRow
                icon={<TelegramIcon size={18} />}
                title="Telegram"
                value={SITE.telegram}
                href={SITE.telegramUrl}
                external
              />
              <div className="card p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-ink-500 mb-2 font-mono">
                  {params.locale === "ru" ? "Часы работы" : params.locale === "en" ? "Working hours" : "Ish vaqti"}
                </p>
                <p className="text-sm text-ink-800 font-medium">
                  {params.locale === "ru" ? "Пн — Сб · 9:00 — 19:00" :
                   params.locale === "en" ? "Mon — Sat · 9:00 — 19:00" :
                   "Du-Sha · 9:00 — 19:00"}
                </p>
                <p className="mt-2 text-xs text-ink-600">
                  {params.locale === "ru" ? "Отвечаем в течение 1 рабочего дня." :
                   params.locale === "en" ? "We reply within 1 business day." :
                   "1 ish kuni ichida javob beramiz."}
                </p>
              </div>
              <div className="card p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-ink-500 mb-2 font-mono">
                  {params.locale === "ru" ? "Адрес" : params.locale === "en" ? "Address" : "Manzil"}
                </p>
                <p className="text-sm text-ink-800">{SITE.address[params.locale]}</p>
              </div>
            </div>

            {/* Form */}
            <div className="card p-6 md:p-8">
              <ContactForm locale={params.locale} source="/contact" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactRow({
  icon, title, value, href, external,
}: { icon: React.ReactNode; title: string; value: string; href: string; external?: boolean }) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group card card-hover p-5 flex items-center gap-4 relative overflow-hidden"
    >
      <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-500 text-cream-50 ring-1 ring-brand-600 shadow-coral">
        {icon}
      </span>
      <div>
        <div className="text-xs text-ink-500 font-mono uppercase tracking-wider">{title}</div>
        <div className="font-semibold text-ink-900">{value}</div>
      </div>
    </a>
  );
}
