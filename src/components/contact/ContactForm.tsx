"use client";

import { useState } from "react";
import { type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { API_URL } from "@/lib/api";
import { CheckIcon, PhoneIcon, SendIcon, TelegramIcon, UserIcon } from "@/components/icons";

const PHONE_RE = /^\+?[0-9 ()\-]{7,20}$/;
const TG_RE = /^@?[A-Za-z0-9_]{3,32}$/;

export default function ContactForm({ locale, source }: { locale: Locale; source?: string }) {
  const t = getDictionary(locale);
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [validation, setValidation] = useState<string | null>(null);

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
          source: source || "/contact",
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

  if (state === "success") {
    return (
      <div className="text-center py-10 px-4">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-100 text-emerald-700 animate-scale-in">
          <CheckIcon size={28} />
        </div>
        <h3 className="mt-4 text-xl font-bold text-ink-900">{t.contact.success}</h3>
        <p className="mt-2 text-sm text-ink-500 max-w-xs mx-auto">
          {locale === "ru" ? "Мы свяжемся с вами в ближайшее время." : locale === "en" ? "We'll be in touch shortly." : "Tez orada siz bilan bog'lanamiz."}
        </p>
        <button onClick={() => setState("idle")} className="btn btn-ghost mt-6">
          {locale === "ru" ? "Отправить ещё" : locale === "en" ? "Send another" : "Yana yuborish"}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
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
            className="input input-lg pl-10"
            placeholder={locale === "ru" ? "Иван" : locale === "en" ? "John" : "Sanjar"}
          />
        </div>
      </div>

      {/* Contact: phone OR telegram */}
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
              className="input input-lg pl-10"
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
              className="input input-lg pl-10"
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
          rows={5}
          maxLength={5000}
          className="input resize-none"
          placeholder={locale === "ru" ? "Расскажите о проекте..." : locale === "en" ? "Tell us about your project..." : "Loyihangiz haqida yozib bering..."}
        />
      </div>

      <button type="submit" disabled={state === "loading"} className="btn btn-accent btn-lg w-full">
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
      <p className="text-center text-[11px] text-ink-400">
        {locale === "ru" ? "Отправляя форму, вы соглашаетесь на обработку данных." :
         locale === "en" ? "By submitting, you agree to data processing." :
         "Yuborish orqali ma'lumotlar qayta ishlanishiga rozilik bildirasiz."}
      </p>
    </form>
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
