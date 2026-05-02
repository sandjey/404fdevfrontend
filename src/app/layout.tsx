import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "404Dev — code · learn · build", template: "%s — 404Dev" },
  description:
    "404Dev — outsourcing studio in Tashkent. Web sites, Telegram bots, mobile apps, CRM/ERP, SEO and business automation. Free programming school in Uzbek.",
  applicationName: "404Dev",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FF4D2E" },
    { media: "(prefers-color-scheme: dark)",  color: "#0F0F0F" },
  ],
  colorScheme: "light",
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const YM_ID = process.env.NEXT_PUBLIC_YM_ID; // Yandex Metrica counter ID

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body>{children}</body>

      {/* ===== Google Analytics 4 (loaded only when env is set) ===== */}
      {GA_ID && (
        <>
          <Script
            id="ga-src"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          />
          <Script id="ga-init" strategy="afterInteractive">{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', { anonymize_ip: true });
          `}</Script>
        </>
      )}

      {/* ===== Yandex Metrica (loaded only when env is set) ===== */}
      {YM_ID && (
        <>
          <Script id="ym-init" strategy="afterInteractive">{`
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

            ym(${YM_ID}, "init", {
              clickmap: true,
              trackLinks: true,
              accurateTrackBounce: true,
              webvisor: true
            });
          `}</Script>
          <noscript>
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`https://mc.yandex.ru/watch/${YM_ID}`} style={{ position: "absolute", left: "-9999px" }} alt="" />
            </div>
          </noscript>
        </>
      )}
    </html>
  );
}
