"use client";

import Link from "next/link";
import { type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { SITE } from "@/lib/site";
import { useContactModal } from "@/lib/modal-store";
import Logo from "@/components/Logo";
import {
  ArrowUpRightIcon,
  GithubIcon,
  InstagramIcon,
  PhoneIcon,
  SendIcon,
  TelegramIcon,
} from "@/components/icons";

export default function Footer({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const year = new Date().getFullYear();
  const openModal = useContactModal((s) => s.openModal);

  return (
    <footer className="relative overflow-hidden mt-24 bg-ink-900 text-cream-50">
      {/* Subtle coral glow */}
      <div aria-hidden className="absolute -top-40 left-1/3 h-80 w-80 rounded-full bg-brand-500/20 blur-3xl" />
      <div aria-hidden className="absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-brand-700/20 blur-3xl" />

      <div className="container relative pt-20 pb-10">
        {/* CTA strip */}
        <div className="mb-16 rounded-3xl bg-cream-50/[.04] ring-1 ring-cream-50/10 p-8 md:p-12 backdrop-blur">
          <div className="grid md:grid-cols-[1fr_auto] gap-8 items-center">
            <div>
              <span className="eyebrow-dark">
                {locale === "ru" ? "/ Готовы начать?" : locale === "en" ? "/ Ready to start?" : "/ Tayyormisiz?"}
              </span>
              <h3 className="mt-3 font-display text-3xl md:text-4xl font-extrabold tracking-tightest text-cream-50 leading-tight">
                {t.home.ctaTitle}
              </h3>
              <p className="mt-3 text-cream-50/70 max-w-xl">{t.home.ctaSubtitle}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => openModal("footer-cta")} className="btn btn-accent btn-lg">
                <SendIcon size={18} /> {t.cta.sendRequest}
              </button>
              <a href={SITE.telegramUrl} target="_blank" rel="noopener noreferrer" className="btn btn-lg bg-cream-50/10 text-cream-50 hover:bg-cream-50/20">
                <TelegramIcon size={18} /> Telegram
              </a>
            </div>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link href={`/${locale}`} className="inline-flex">
              <Logo size="lg" variant="cream" />
            </Link>
            <p className="mt-5 max-w-md text-sm leading-6 text-cream-50/70">
              {t.about.subtitle}
            </p>
            <div className="mt-5 flex items-center gap-2">
              <a
                href={SITE.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-10 w-10 place-items-center rounded-full bg-cream-50/[.07] hover:bg-brand-500 transition"
                aria-label="Telegram"
              >
                <TelegramIcon size={18} />
              </a>
              <a
                href={SITE.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-10 w-10 place-items-center rounded-full bg-cream-50/[.07] hover:bg-brand-500 transition"
                aria-label="Instagram"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href={SITE.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-10 w-10 place-items-center rounded-full bg-cream-50/[.07] hover:bg-brand-500 transition"
                aria-label="GitHub"
              >
                <GithubIcon size={18} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-3">
            <h4 className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-cream-50/60 mb-4">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <FooterLink href={`/${locale}/services`}>{t.nav.services}</FooterLink>
              <FooterLink href={`/${locale}/portfolio`}>{t.nav.portfolio}</FooterLink>
              <FooterLink href={`/${locale}/about`}>{t.nav.about}</FooterLink>
              <FooterLink href={`/${locale}/blog`}>{t.nav.blog}</FooterLink>
              <FooterLink href="/learn" external>{t.nav.learn}</FooterLink>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h4 className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-cream-50/60 mb-4">
              {t.footer.contact}
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href={`tel:${SITE.phoneRaw}`} className="group inline-flex items-center gap-2.5 text-cream-50/85 hover:text-cream-50">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-cream-50/[.06] group-hover:bg-brand-500 transition">
                    <PhoneIcon size={14} />
                  </span>
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a href={SITE.telegramUrl} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2.5 text-cream-50/85 hover:text-cream-50">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-cream-50/[.06] group-hover:bg-brand-500 transition">
                    <TelegramIcon size={14} />
                  </span>
                  Telegram
                </a>
              </li>
              <li className="text-cream-50/50 text-xs pt-2">{SITE.address[locale]}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-cream-50/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream-50/55">
          <span>© {year} 404Dev. {t.footer.rights}</span>
          <span className="font-mono">code · learn · build</span>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children, external }: { href: string; children: React.ReactNode; external?: boolean }) {
  return (
    <li>
      <Link href={href} className="group inline-flex items-center gap-1.5 text-cream-50/75 hover:text-cream-50 transition">
        {children}
        {external && <ArrowUpRightIcon size={12} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" />}
      </Link>
    </li>
  );
}
