"use client";

import { useEffect, useRef, useState } from "react";
import { type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { API_URL } from "@/lib/api";
import { useContactModal } from "@/lib/modal-store";
import { SITE } from "@/lib/site";
import {
  ArrowUpRightIcon,
  BotIcon,
  CheckIcon,
  CodeIcon,
  DatabaseIcon,
  PhoneIcon,
  RocketIcon,
  SendIcon,
  SmartphoneIcon,
  SparklesIcon,
  TelegramIcon,
  UserIcon,
  XIcon,
  ZapIcon,
} from "@/components/icons";

const PHONE_RE = /^\+?[0-9 ()\-]{7,20}$/;
const TG_RE = /^@?[A-Za-z0-9_]{3,32}$/;

type ProjectKind = "web" | "bot" | "mobile" | "crm" | "ai" | "other";

const PROJECT_KINDS: {
  id: ProjectKind;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  label: { uz: string; ru: string; en: string };
}[] = [
  { id: "web",    Icon: CodeIcon,       label: { uz: "Web sayt",     ru: "Веб-сайт",       en: "Website" } },
  { id: "bot",    Icon: BotIcon,        label: { uz: "Telegram bot", ru: "Telegram-бот",   en: "Telegram bot" } },
  { id: "mobile", Icon: SmartphoneIcon, label: { uz: "Mobil ilova",  ru: "Моб. приложение", en: "Mobile app" } },
  { id: "crm",    Icon: DatabaseIcon,   label: { uz: "CRM / ERP",    ru: "CRM / ERP",      en: "CRM / ERP" } },
  { id: "ai",     Icon: SparklesIcon,   label: { uz: "AI integratsiya", ru: "AI интеграция", en: "AI integration" } },
  { id: "other",  Icon: ZapIcon,        label: { uz: "Boshqa",       ru: "Другое",         en: "Other" } },
];

export default function ContactModal({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const { open, source, closeModal } = useContactModal();
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [validation, setValidation] = useState<string | null>(null);
  const [kind, setKind] = useState<ProjectKind | null>(null);
  const [msgLen, setMsgLen] = useState(0);
  const firstFieldRef = useRef<HTMLInputElement | null>(null);

  // ESC + scroll lock + autofocus on first input.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    const id = window.setTimeout(() => firstFieldRef.current?.focus(), 80);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      window.clearTimeout(id);
    };
  }, [open, closeModal]);

  useEffect(() => {
    if (open) {
      setState("idle");
      setError(null);
      setValidation(null);
      setKind(null);
      setMsgLen(0);
    }
  }, [open]);

  if (!open) return null;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setValidation(null);
    setError(null);
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const telegram = String(data.get("telegram") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!phone && !telegram) {
      setValidation(t.contact.contactRequired);
      return;
    }
    if (phone && !PHONE_RE.test(phone)) {
      setValidation(
        locale === "ru" ? "Неверный формат телефона" :
        locale === "en" ? "Invalid phone format" :
        "Telefon raqami noto'g'ri formatda"
      );
      return;
    }
    if (telegram && !TG_RE.test(telegram)) {
      setValidation(
        locale === "ru" ? "Неверный Telegram username" :
        locale === "en" ? "Invalid Telegram username" :
        "Telegram username noto'g'ri"
      );
      return;
    }

    setState("loading");
    try {
      const fullMessage = kind
        ? `[${PROJECT_KINDS.find((p) => p.id === kind)?.label[locale]}] ${message}`
        : message;
      const res = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          telegram,
          message: fullMessage,
          source: source || "modal",
          language: locale,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setState("success");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setState("error");
    }
  }

  const tipText = (() => {
    if (locale === "ru") return "Отвечаем в течение одного рабочего дня";
    if (locale === "en") return "We reply within one business day";
    return "1 ish kuni ichida javob beramiz";
  })();

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center p-3 md:p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="close"
        onClick={closeModal}
        className="absolute inset-0 bg-ink-950/60 backdrop-blur-sm"
      />

      {/* Dialog shell — wider, taller animation */}
      <div className="relative w-full max-w-xl animate-scale-in">
        <div className="relative rounded-3xl bg-cream-50 shadow-card ring-1 ring-ink-100 overflow-hidden max-h-[92vh] flex flex-col">
          {/* ===== Header ===== */}
          <div className="relative bg-gradient-to-br from-brand-500 via-brand-500 to-brand-600 px-6 pt-7 pb-7 text-white shrink-0">
            {/* Decorative orbs */}
            <span aria-hidden className="pointer-events-none absolute -top-12 -right-10 h-44 w-44 rounded-full bg-cream-50/15 blur-2xl" />
            <span aria-hidden className="pointer-events-none absolute -bottom-10 -left-8 h-32 w-32 rounded-full bg-cream-50/10 blur-xl" />

            {/* Animated shine */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-50"
              style={{
                backgroundImage:
                  "linear-gradient(110deg, transparent 30%, rgba(255,255,255,.18) 50%, transparent 70%)",
                backgroundSize: "200% 100%",
                animation: "shineModal 3.5s linear infinite",
              }}
            />

            <button
              type="button"
              onClick={closeModal}
              aria-label="close"
              className="absolute top-4 right-4 grid h-9 w-9 place-items-center rounded-full bg-white/15 hover:bg-white/25 transition z-10"
            >
              <XIcon size={18} />
            </button>

            <div className="relative flex items-start gap-3.5">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-cream-50/15 ring-1 ring-cream-50/25 backdrop-blur">
                <RocketIcon size={22} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.18em] text-cream-50/85">
                  <span className="inline-block h-1 w-1 rounded-full bg-cream-50 animate-pulse-soft" />
                  {locale === "ru" ? "новый запрос" : locale === "en" ? "new request" : "yangi so'rov"}
                </div>
                <h2
                  id="contact-modal-title"
                  className="mt-1 font-display text-2xl md:text-[1.7rem] font-extrabold tracking-tightest leading-tight"
                >
                  {t.contact.title}
                  <span aria-hidden className="ml-1.5 inline-block h-[0.32em] w-[0.32em] rounded-full bg-cream-50 align-baseline" />
                </h2>
                <p className="mt-1 text-sm text-cream-50/85">{tipText}</p>
              </div>
            </div>
          </div>

          {/* ===== Body — scrollable ===== */}
          <div className="px-6 py-6 overflow-y-auto pretty-scroll">
            {state === "success" ? (
              <SuccessState locale={locale} text={t.contact.success} onClose={closeModal} />
            ) : (
              <form onSubmit={onSubmit} className="space-y-5">
                {/* Project kind quick-select */}
                <div>
                  <label className="label">
                    {locale === "ru" ? "Тип проекта" : locale === "en" ? "Project type" : "Loyiha turi"}
                    <span className="ml-1 text-ink-400 font-normal normal-case tracking-normal">
                      {locale === "ru" ? "(не обязательно)" : locale === "en" ? "(optional)" : "(majburiy emas)"}
                    </span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {PROJECT_KINDS.map((p) => {
                      const active = kind === p.id;
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setKind(active ? null : p.id)}
                          className={
                            "group relative flex flex-col items-center gap-1.5 rounded-xl px-2 py-3 text-[11px] font-semibold tracking-tight transition-all duration-200 " +
                            (active
                              ? "bg-ink-900 text-cream-50 ring-1 ring-ink-900 shadow-soft"
                              : "bg-cream-50 text-ink-800 ring-1 ring-ink-200 hover:ring-brand-500/60 hover:-translate-y-0.5")
                          }
                        >
                          <span
                            className={
                              "grid h-7 w-7 place-items-center rounded-lg transition " +
                              (active ? "bg-brand-500 text-cream-50" : "bg-brand-50 text-brand-600 group-hover:bg-brand-500/10")
                            }
                          >
                            <p.Icon size={14} />
                          </span>
                          <span className="leading-none text-center">{p.label[locale]}</span>
                          {active && (
                            <span aria-hidden className="absolute top-1 right-1 grid h-3.5 w-3.5 place-items-center rounded-full bg-brand-500 text-cream-50">
                              <CheckIcon size={9} />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="label">{t.contact.name} *</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400 transition group-focus-within:text-brand-500">
                      <UserIcon size={16} />
                    </span>
                    <input
                      ref={firstFieldRef}
                      name="name"
                      required
                      minLength={2}
                      className="input pl-10"
                      placeholder={locale === "ru" ? "Иван" : locale === "en" ? "John" : "Sanjar"}
                    />
                  </div>
                </div>

                {/* Phone OR Telegram */}
                <div>
                  <label className="label">
                    {locale === "ru" ? "Связь" : locale === "en" ? "Contact" : "Aloqa"} *
                  </label>
                  <p className="text-[11px] text-ink-500 -mt-1.5 mb-2">
                    {locale === "ru"
                      ? "Достаточно одного — телефон или Telegram"
                      : locale === "en"
                      ? "One is enough — phone or Telegram"
                      : "Bittasi yetarli — telefon yoki Telegram"}
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400">
                        <PhoneIcon size={15} />
                      </span>
                      <input
                        name="phone"
                        type="tel"
                        pattern="^\+?[0-9 ()\-]{7,20}$"
                        className="input pl-10"
                        placeholder="+998 90 123 45 67"
                        autoComplete="tel"
                      />
                    </div>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400">
                        <TelegramIcon size={15} />
                      </span>
                      <input
                        name="telegram"
                        className="input pl-10"
                        placeholder="@username"
                        autoComplete="off"
                      />
                    </div>
                  </div>
                </div>

                {/* Message with character counter */}
                <div>
                  <div className="flex items-baseline justify-between">
                    <label className="label">{t.contact.message} *</label>
                    <span className={"text-[10px] font-mono " + (msgLen > 4500 ? "text-brand-600" : "text-ink-400")}>
                      {msgLen} / 5000
                    </span>
                  </div>
                  <textarea
                    name="message"
                    required
                    minLength={5}
                    rows={4}
                    maxLength={5000}
                    onChange={(e) => setMsgLen(e.currentTarget.value.length)}
                    className="input resize-none"
                    placeholder={
                      locale === "ru"
                        ? "Расскажите коротко: что нужно сделать, для какой аудитории, есть ли референсы или дедлайн..."
                        : locale === "en"
                        ? "Briefly: what to build, for whom, any references or deadline..."
                        : "Qisqacha: nima qilish kerak, qanday auditoriya, namuna yoki muddat bormi..."
                    }
                  />
                </div>

                {/* Validation / error banners */}
                {validation && (
                  <div className="rounded-xl bg-brand-50 border border-brand-200 px-4 py-3 text-sm text-brand-800">
                    {validation}
                  </div>
                )}
                {state === "error" && (
                  <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800">
                    {t.contact.error}
                    {error && <span className="block opacity-60 text-xs mt-0.5">({error})</span>}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={state === "loading"}
                  className="group btn btn-accent w-full btn-lg relative overflow-hidden"
                >
                  {state === "loading" ? (
                    <span className="inline-flex items-center gap-2">
                      <Spinner />
                      {locale === "ru" ? "Отправляем..." : locale === "en" ? "Sending..." : "Yuborilmoqda..."}
                    </span>
                  ) : (
                    <>
                      <SendIcon size={18} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      {t.contact.submit}
                      <ArrowUpRightIcon size={14} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </>
                  )}
                </button>

                {/* Alternative — Telegram direct */}
                <div className="relative my-1">
                  <span aria-hidden className="absolute inset-x-0 top-1/2 h-px bg-ink-200" />
                  <span className="relative mx-auto block w-fit bg-cream-50 px-2 text-[10px] font-mono uppercase tracking-[0.2em] text-ink-400">
                    {locale === "ru" ? "или" : locale === "en" ? "or" : "yoki"}
                  </span>
                </div>

                <a
                  href={SITE.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink-900 text-cream-50 px-5 py-3 text-sm font-semibold hover:bg-ink-800 transition"
                >
                  <TelegramIcon size={16} />
                  {locale === "ru"
                    ? "Написать в Telegram напрямую"
                    : locale === "en"
                    ? "Message us on Telegram directly"
                    : "Telegram'da to'g'ridan-to'g'ri yozing"}
                  <ArrowUpRightIcon size={13} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <p className="text-center text-[11px] text-ink-400">
                  {locale === "ru"
                    ? "Отправляя форму, вы соглашаетесь на обработку данных."
                    : locale === "en"
                    ? "By submitting, you agree to data processing."
                    : "Yuborish orqali ma'lumotlar qayta ishlanishiga rozilik bildirasiz."}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shineModal {
          0%   { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}

function SuccessState({
  locale,
  text,
  onClose,
}: {
  locale: Locale;
  text: string;
  onClose: () => void;
}) {
  return (
    <div className="text-center py-6 relative">
      {/* Sparkle confetti */}
      <span aria-hidden className="pointer-events-none absolute top-2 left-1/4 text-brand-500/70 animate-pulse-soft">
        <SparklesIcon size={14} />
      </span>
      <span aria-hidden className="pointer-events-none absolute top-6 right-1/4 text-brand-400/70 animate-pulse-soft" style={{ animationDelay: "0.4s" }}>
        <SparklesIcon size={10} />
      </span>
      <span aria-hidden className="pointer-events-none absolute bottom-10 left-1/3 text-emerald-500/60 animate-pulse-soft" style={{ animationDelay: "0.7s" }}>
        <SparklesIcon size={12} />
      </span>

      <div className="relative mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-700 animate-scale-in ring-4 ring-emerald-50">
        <CheckIcon size={32} />
      </div>
      <h3 className="mt-5 text-xl font-display font-extrabold tracking-tightest text-ink-900">
        {text}
      </h3>
      <p className="mt-2 text-sm text-ink-600 max-w-xs mx-auto leading-relaxed">
        {locale === "ru"
          ? "Свяжемся с вами в течение рабочего дня."
          : locale === "en"
          ? "We'll be in touch within one business day."
          : "Bir ish kuni ichida bog'lanamiz."}
      </p>
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2">
        <a
          href={SITE.telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-ink-900 text-cream-50 px-5 py-2.5 text-sm font-semibold hover:bg-ink-800 transition"
        >
          <TelegramIcon size={14} /> Telegram
        </a>
        <button
          onClick={onClose}
          className="btn btn-ghost"
        >
          {locale === "ru" ? "Закрыть" : locale === "en" ? "Close" : "Yopish"}
        </button>
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity=".25" />
      <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
