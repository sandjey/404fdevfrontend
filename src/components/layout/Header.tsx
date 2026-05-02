"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LOCALES, LOCALE_SHORT, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { useContactModal } from "@/lib/modal-store";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";
import Logo from "@/components/Logo";
import {
  ChevronDownIcon,
  GlobeIcon,
  MenuIcon,
  PhoneIcon,
  RocketIcon,
  SendIcon,
  SparklesIcon,
  TelegramIcon,
  XIcon,
} from "@/components/icons";

export default function Header({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const pathname = usePathname() || `/${locale}`;
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const openModal = useContactModal((s) => s.openModal);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setLangOpen(false);
  }, [pathname]);

  const nav = [
    { href: `/${locale}`, label: t.nav.home },
    { href: `/${locale}/services`, label: t.nav.services },
    { href: `/${locale}/portfolio`, label: t.nav.portfolio },
    { href: `/${locale}/about`, label: t.nav.about },
    { href: `/${locale}/blog`, label: t.nav.blog },
  ];

  const stripped = pathname.replace(/^\/(uz|ru|en)/, "") || "";
  const isLearn = pathname.startsWith("/learn");

  return (
    <header
      className="sticky top-0 z-40 pointer-events-none pt-3 md:pt-4"
      aria-label="Site header"
    >
      <div className="container">
        {/* iPhone-notch style island — grows from centre on mount, plavno.
            bg-cream-50 (lightest paper) so the pill is brighter than the
            cream-100 page background and stays visually distinct. */}
        <div
          className={cn(
            "header-island pointer-events-auto relative flex items-center justify-between gap-3 rounded-full bg-cream-50 ring-1 ring-ink-900 backdrop-blur-md shadow-soft px-3 md:px-4 py-1.5 md:py-2 transition-shadow duration-300",
            scrolled ? "shadow-card" : "shadow-soft"
          )}
        >
          {/* Logo — staggered fade-up (after island finishes growing) */}
          <Link
            href={`/${locale}`}
            className="shrink-0 inline-flex items-center pl-1 opacity-0 animate-fade-up"
            style={{ animationDelay: "1700ms", animationDuration: "800ms", animationFillMode: "forwards" }}
          >
            <Logo size="md" variant="ink" />
          </Link>

          {/* Center nav */}
          <nav
            className="hidden lg:flex items-center gap-0.5 rounded-full bg-ink-100/60 ring-1 ring-ink-200/60 backdrop-blur p-1 opacity-0 animate-fade-up"
            style={{ animationDelay: "1850ms", animationDuration: "800ms", animationFillMode: "forwards" }}
          >
            {nav.map((item) => {
              const active = pathname === item.href || (item.href !== `/${locale}` && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-full px-3.5 py-1.5 text-sm font-medium transition",
                    active ? "bg-ink-900 text-cream-50 shadow-sm" : "text-ink-700 hover:text-ink-900"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-1.5 md:gap-2">
            {/* Phone */}
            <a
              href={`tel:${SITE.phoneRaw}`}
              className="hidden md:inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-mono font-medium text-ink-800 hover:bg-ink-100 transition opacity-0 animate-fade-up"
              style={{ animationDelay: "2000ms", animationDuration: "800ms", animationFillMode: "forwards" }}
              aria-label="Call us"
            >
              <PhoneIcon size={14} className="text-brand-500" />
              <span className="tracking-tight">{SITE.phone}</span>
            </a>

            {/* Telegram icon */}
            <a
              href={SITE.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              className="hidden md:grid h-9 w-9 place-items-center rounded-full bg-ink-100 text-ink-800 hover:bg-ink-900 hover:text-cream-50 transition opacity-0 animate-fade-up"
              style={{ animationDelay: "2150ms", animationDuration: "800ms", animationFillMode: "forwards" }}
            >
              <TelegramIcon size={16} />
            </a>

            {/* Vertical divider */}
            <span aria-hidden className="hidden md:block h-6 w-px bg-ink-200 mx-1" />

            {/* Prominent Lessons pill */}
            <Link
              href="/learn"
              className={cn(
                "group relative inline-flex items-center gap-2 rounded-full px-3.5 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-bold transition overflow-hidden opacity-0 animate-fade-up",
                isLearn
                  ? "bg-ink-900 text-cream-50 shadow-card"
                  : "bg-brand-500 text-cream-50 shadow-coral hover:bg-brand-600"
              )}
              style={{ animationDelay: "2300ms", animationDuration: "800ms", animationFillMode: "forwards" }}
            >
              <SparklesIcon size={14} className={isLearn ? "text-brand-300" : "text-cream-50"} />
              <span>{t.nav.learn}</span>
            </Link>

            {/* Language dropdown */}
            <div
              className="relative hidden sm:block opacity-0 animate-fade-up"
              style={{ animationDelay: "2450ms", animationDuration: "800ms", animationFillMode: "forwards" }}
            >
              <button
                type="button"
                onClick={() => setLangOpen((v) => !v)}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-ink-700 hover:bg-ink-100 transition"
              >
                <GlobeIcon size={16} />
                <span className="font-mono text-xs">{LOCALE_SHORT[locale]}</span>
                <ChevronDownIcon size={14} className={cn("transition", langOpen && "rotate-180")} />
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-2 w-44 rounded-2xl glass shadow-card p-1.5 animate-scale-in">
                  {LOCALES.map((l) => (
                    <Link
                      key={l}
                      href={isLearn ? `/${l}` : `/${l}${stripped}`}
                      onClick={() => setLangOpen(false)}
                      className={cn(
                        "flex items-center justify-between rounded-lg px-3 py-2 text-sm transition",
                        l === locale ? "bg-ink-900 text-cream-50" : "text-ink-700 hover:bg-ink-100"
                      )}
                    >
                      <span>
                        {l === "uz" && "O'zbekcha"}
                        {l === "ru" && "Русский"}
                        {l === "en" && "English"}
                      </span>
                      <span className="font-mono text-xs opacity-60">{LOCALE_SHORT[l]}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* CTA — opens modal */}
            <button
              type="button"
              onClick={() => openModal("header")}
              className="btn btn-primary btn-sm hidden sm:inline-flex opacity-0 animate-fade-up"
              style={{ animationDelay: "2600ms", animationDuration: "800ms", animationFillMode: "forwards" }}
            >
              <SendIcon size={14} /> {t.cta.contactUs}
            </button>

            {/* Mobile burger */}
            <button
              type="button"
              aria-label="menu"
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden grid h-9 w-9 place-items-center rounded-full text-ink-900 hover:bg-ink-100 transition"
            >
              {open ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile menu — drops below the island */}
        {open && (
          <div className="lg:hidden mt-2 pointer-events-auto rounded-3xl bg-cream-50/95 backdrop-blur-md ring-1 ring-ink-200 shadow-card animate-fade-in">
            <div className="p-4 flex flex-col gap-1">
              {/* Language switcher — pinned to the very top */}
              <div className="mb-3 pb-3 border-b border-ink-200 flex items-center justify-between gap-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-ink-500">
                  {locale === "ru" ? "Язык" : locale === "en" ? "Language" : "Til"}
                </span>
                <div className="flex items-center gap-1.5">
                  {LOCALES.map((l) => (
                    <Link
                      key={l}
                      href={isLearn ? `/${l}` : `/${l}${stripped}`}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "rounded-full px-3.5 py-1.5 text-xs font-bold transition",
                        l === locale
                          ? "bg-ink-900 text-cream-50 shadow-sm"
                          : "bg-ink-100 text-ink-700 hover:bg-ink-200"
                      )}
                    >
                      {LOCALE_SHORT[l]}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Highlighted Learn block */}
              <Link
                href="/learn"
                className="relative overflow-hidden rounded-2xl px-4 py-4 text-cream-50 bg-brand-500 hover:bg-brand-600 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-cream-50/15 backdrop-blur">
                    <RocketIcon size={20} />
                  </span>
                  <div>
                    <div className="font-bold text-base">{t.nav.learn}</div>
                    <div className="text-xs text-cream-50/85">
                      {locale === "ru" ? "Бесплатные уроки на узбекском" :
                       locale === "en" ? "Free lessons in Uzbek" :
                       "Bepul darslar — o'zbek tilida"}
                    </div>
                  </div>
                </div>
              </Link>

              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-4 py-3 font-medium text-ink-800 hover:bg-ink-100"
                >
                  {item.label}
                </Link>
              ))}
              <Link href={`/${locale}/contact`} className="rounded-xl px-4 py-3 font-medium text-ink-800 hover:bg-ink-100">
                {t.nav.contact}
              </Link>

              <div className="mt-3 pt-3 border-t border-ink-200 flex flex-col gap-2">
                <a href={`tel:${SITE.phoneRaw}`} className="inline-flex items-center gap-2 px-4 py-2 text-sm text-ink-800">
                  <PhoneIcon size={16} className="text-brand-500" /> {SITE.phone}
                </a>
                <a
                  href={SITE.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm text-ink-800"
                >
                  <TelegramIcon size={16} className="text-brand-500" /> Telegram
                </a>
              </div>

              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  openModal("mobile-menu");
                }}
                className="btn btn-accent w-full mt-3"
              >
                <SendIcon size={16} /> {t.cta.contactUs}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
