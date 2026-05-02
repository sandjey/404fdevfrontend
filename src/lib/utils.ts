export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatDate(date: string | Date, locale: string = "uz"): string {
  const d = typeof date === "string" ? new Date(date) : date;
  if (Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat(
    locale === "uz" ? "uz-UZ" : locale === "ru" ? "ru-RU" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  ).format(d);
}

export function readingTime(html: string, locale: string = "uz"): string {
  const text = html.replace(/<[^>]+>/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  const suffix = locale === "uz" ? "min o'qish" : locale === "ru" ? "мин чтения" : "min read";
  return `${minutes} ${suffix}`;
}
