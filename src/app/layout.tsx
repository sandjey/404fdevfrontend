import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fontDisplay = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const fontSans = Inter({
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "404Dev — Digital Growth & Automation Agency · Tashkent, Uzbekistan",
    template: "%s — 404Dev",
  },
  description:
    "404Dev is a digital growth, marketing & automation agency in Tashkent, Uzbekistan. We help brands in Uzbekistan earn more — SEO, influencer marketing (Instagram, TikTok, Telegram, YouTube creators), lead generation, AI automation, CRM/ERP, branding and conversion-focused websites. Free programming school in Uzbek.",
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
  // Local-SEO geo signals — picked up by Bing Places, Yandex Webmaster,
  // and assorted local-pack indexers. Coordinates: Toshkent markazi.
  other: {
    "geo.region": "UZ-TA",
    "geo.placename": "Tashkent",
    "geo.position": "41.2995;69.2401",
    "ICBM": "41.2995, 69.2401",
    "DC.title": "404Dev — Digital Growth & Automation Agency · Tashkent, Uzbekistan",
    "DC.language": "uz, ru, en",
    "DC.creator": "404Dev",
    "DC.publisher": "404Dev",
    "DC.coverage": "Uzbekistan, Central Asia, Worldwide",
    "rating": "general",
    "distribution": "global",
    "revisit-after": "3 days",
    "yandex-tableau-widget": "logo=/logo.svg, color=#FF4D2E",
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
    <html
      lang="uz"
      suppressHydrationWarning
      className={`${fontDisplay.variable} ${fontSans.variable} ${fontMono.variable}`}
    >
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
