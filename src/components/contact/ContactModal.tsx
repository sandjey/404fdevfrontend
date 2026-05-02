"use client";

import { useEffect, useState } from "react";
import { type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { API_URL } from "@/lib/api";
import { useContactModal } from "@/lib/modal-store";
import { CheckIcon, PhoneIcon, SendIcon, TelegramIcon, UserIcon, XIcon } from "@/components/icons";

const PHONE_RE = /^\+?[0-9 ()\-]{7,20}$/;
const TG_RE = /^@?[A-Za-z0-9_]{3,32}$/;

export default function ContactModal({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const { open, source, closeModal } = useContactModal();
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [validation, setValidation] = useState<string | null>(null);

  // ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open, closeModal]);

  useEffect(() => {
    if (open) {
      setState("idle");
      setError(null);
      setValidation(null);
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
      const res = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          telegram,
          message,
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

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center p-4 animate-fade-in">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="close"
        onClick={closeModal}
        className="absolute inset-0 bg-ink-950/55 backdrop-blur-sm"
      />

      {/* Dialog */}
      <div className="relative w-full max-w-lg animate-scale-in">
        <div className="rounded-3xl bg-white shadow-card ring-1 ring-ink-100 overflow-hidden">
          {/* Header */}
          <div className="relative bg-gradient-to-br from-brand-500 via-brand-500 to-brand-600 px-6 pt-7 pb-6 text-white">
            <button
              type="button"
              onClick={closeModal}
              aria-label="close"
              className="absolute top-4 right-4 grid h-9 w-9 place-items-center rounded-full bg-white/15 hover:bg-white/25 transition"
            >
              <XIcon size={18} />
            </button>
            <h2 className="text-2xl font-bold tracking-tight">{t.contact.title}</h2>
            <p className="mt-1 text-sm text-white/85">{t.contact.subtitle}</p>
          </div>

          {/* Body */}
          <div className="p-6">
            {state === "success" ? (
              <SuccessState text={t.contact.success} onClose={closeModal} />
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="label">{t.contact.name} *</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400">
                      <UserIcon size={16} />
                    </span>
                    <input
                      name="name"
                      required
                      minLength={2}
                      className="input pl-10"
                      placeholder={locale === "ru" ? "Иван" : locale === "en" ? "John" : "Sanjar"}
                    />
                  </div>
                </div>

                {/* Contact — phone OR telegram */}
                <div>
                  <label className="label">
                    {locale === "ru" ? "Связь" : locale === "en" ? "Contact" : "Aloqa"} *
                  </label>
                  <p className="text-[11px] text-ink-500 -mt-1.5 mb-2">{t.contact.contactHint}</p>
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

                {/* Message */}
                <div>
                  <label className="label">{t.contact.message} *</label>
                  <textarea
                    name="message"
                    required
                    minLength={5}
                    rows={4}
                    maxLength={5000}
                    className="input resize-none"
                    placeholder={locale === "ru" ? "Расскажите о проекте..." : locale === "en" ? "Tell us about your project..." : "Loyihangiz haqida yozib bering..."}
                  />
                </div>

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

                <button type="submit" disabled={state === "loading"} className="btn btn-accent w-full btn-lg">
                  {state === "loading" ? (
                    <span className="inline-flex items-center gap-2">
                      <Spinner /> ...
                    </span>
                  ) : (
                    <>
                      <SendIcon size={18} /> {t.contact.submit}
                    </>
                  )}
                </button>
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
    </div>
  );
}

function SuccessState({ text, onClose }: { text: string; onClose: () => void }) {
  return (
    <div className="text-center py-4">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-100 text-emerald-700 animate-scale-in">
        <CheckIcon size={28} />
      </div>
      <h3 className="mt-4 text-lg font-bold text-ink-900">{text}</h3>
      <p className="mt-1 text-sm text-ink-500">
        Tez orada bog'lanamiz · Скоро свяжемся · We'll be in touch
      </p>
      <button onClick={onClose} className="btn btn-ghost mt-6">Yopish</button>
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
