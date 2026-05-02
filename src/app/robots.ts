import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/api";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default — barcha qonuniy bot'lar uchun
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",      // admin paneli — indekslanishi mumkin emas
          "/admin/*",
          "/api",
          "/api/*",
          "/_next/",
          "/uploads/",   // shaxsiy fayllar
          "/*?source=*", // tracking parametrlari indekslanmasin
          "/*?utm_*",
        ],
      },
      // Google explicit
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/admin", "/admin/*", "/api", "/api/*"],
      },
      {
        userAgent: "Googlebot-Image",
        allow: ["/", "/uploads/"],
        disallow: ["/admin", "/api"],
      },
      // Yandex explicit (UZ va RU bozori uchun muhim)
      {
        userAgent: "Yandex",
        allow: "/",
        disallow: ["/admin", "/admin/*", "/api", "/api/*"],
      },
      {
        userAgent: "YandexBot",
        allow: "/",
        disallow: ["/admin", "/admin/*", "/api", "/api/*"],
      },
      {
        userAgent: "YandexImages",
        allow: ["/", "/uploads/"],
        disallow: ["/admin", "/api"],
      },
      // Bing
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/admin", "/admin/*", "/api", "/api/*"],
      },
      // DuckDuckGo / boshqa qonuniy bot'lar
      {
        userAgent: "DuckDuckBot",
        allow: "/",
        disallow: ["/admin", "/api"],
      },
      // Resurslarni isrof qiluvchi yoki kontent o'g'irlovchi bot'lar — bloklaymiz.
      // (AI training crawler'lari uchun ehtiyot — sayt eldagi raqamli xizmatlar
      // sotuvchi reklama platforma. Trafik sifatiga ta'sir qilmaydi.)
      { userAgent: "AhrefsBot",       disallow: "/" },
      { userAgent: "SemrushBot",      disallow: "/" },
      { userAgent: "MJ12bot",         disallow: "/" },
      { userAgent: "DotBot",          disallow: "/" },
      { userAgent: "PetalBot",        disallow: "/" },
    ],
    sitemap: [`${SITE_URL}/sitemap.xml`],
    host: SITE_URL,
  };
}
