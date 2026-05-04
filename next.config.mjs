/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  // ESLint runs in CI; don't fail prod builds on stylistic rules like
  // unescaped apostrophes in Uzbek/English JSX strings.
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    // Tree-shake icon and util packages so we ship less JS.
    optimizePackageImports: ["zustand", "lowlight", "@tiptap/react"],
    scrollRestoration: true,
  },
  // Modular imports — collapses barrel files for icons/util libs into
  // direct ESM, cutting bundle size and TBT a bit.
  modularizeImports: {
    "@/components/icons": {
      transform: "@/components/icons",
      skipDefaultConversion: true,
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 kun — kontent kamdan-kam o'zgaradi
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
  async headers() {
    return [
      // Default security headers — har bir route uchun
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "geolocation=(), microphone=(), camera=()" },
        ],
      },
      // Static immutable assets — Next.js content-hash beradi, shuning uchun
      // 1 yil cache + immutable. CDN da ham, browserda ham mukammal cache hit.
      {
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico|woff|woff2|ttf|otf)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
