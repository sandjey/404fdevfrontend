import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx,js,jsx,mdx}",
    "./src/components/**/*.{ts,tsx,js,jsx,mdx}",
    "./src/lib/**/*.{ts,tsx,js,jsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1rem", md: "2rem", lg: "2.5rem" },
      screens: { "2xl": "1320px" },
    },
    extend: {
      colors: {
        // Brand: 404Dev coral accent (#FF4D2E)
        brand: {
          50: "#FFF1ED",
          100: "#FFD9CF",
          200: "#FFB39F",
          300: "#FF8E6F",
          400: "#FF6B47",
          500: "#FF4D2E", // primary brand accent
          600: "#E83A1B",
          700: "#B82C13",
          800: "#8B210E",
          900: "#5C1608",
          950: "#2D0A03",
        },
        // Ink: brandbook off-black (#0F0F0F base) with cream surfaces
        ink: {
          50: "#FAFAF7",  // paper
          100: "#F2EEE5", // cream
          200: "#E0DCD2",
          300: "#C2BEB3",
          400: "#9B978E",
          500: "#6B6B6B", // neutral gray
          600: "#4A4A4A",
          700: "#2C2C2C",
          800: "#1A1A1A", // secondary black
          900: "#0F0F0F", // primary ink
          950: "#080808",
        },
        // Cream alias for surface backgrounds
        cream: {
          50: "#FAFAF7",
          100: "#F2EEE5",
          200: "#E8E2D5",
        },
        accent: {
          DEFAULT: "#FF4D2E",
          glow: "#FF6B47",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        display: [
          "Inter",
          "Helvetica Neue",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "SF Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Consolas",
          "monospace",
        ],
      },
      letterSpacing: {
        tightest: "-0.045em",
        "tighter-2": "-0.025em",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(15,15,15,.04), 0 4px 12px rgba(15,15,15,.05)",
        card: "0 1px 0 rgba(15,15,15,.04), 0 6px 24px -6px rgba(15,15,15,.10), 0 16px 48px -16px rgba(15,15,15,.12)",
        glow: "0 0 0 1px rgba(255,77,46,.2), 0 12px 40px -10px rgba(255,77,46,.45)",
        coral: "0 10px 28px -10px rgba(255,77,46,.55)",
        ring: "inset 0 0 0 1px rgba(15,15,15,.06)",
      },
      backgroundImage: {
        "grid-fade":
          "radial-gradient(closest-side at 50% 30%, rgba(250,250,247,1) 60%, transparent 100%)",
        "mesh-hero":
          "radial-gradient(50% 60% at 18% 12%, rgba(255,77,46,.18) 0%, transparent 60%)," +
          "radial-gradient(50% 50% at 90% 0%, rgba(255,77,46,.10) 0%, transparent 60%)," +
          "radial-gradient(60% 60% at 50% 100%, rgba(15,15,15,.08) 0%, transparent 60%)",
        "noise":
          "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0'/></filter><rect width='200' height='200' filter='url(%23n)'/></svg>\")",
      },
      animation: {
        "fade-in": "fadeIn .6s ease-out forwards",
        "fade-up": "fadeUp .6s cubic-bezier(.2,.7,.2,1) forwards",
        "scale-in": "scaleIn .25s cubic-bezier(.2,.7,.2,1) forwards",
        "shimmer": "shimmer 2.4s linear infinite",
        "blob": "blob 14s ease-in-out infinite",
        "float": "float 8s ease-in-out infinite",
        "pulse-soft": "pulseSoft 2.4s ease-in-out infinite",
        "tilt": "tilt 6s ease-in-out infinite",
        "marquee": "marquee 40s linear infinite",
        "slash-in": "slashIn .9s cubic-bezier(.2,.7,.2,1) forwards",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        blob: {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(30px,-20px) scale(1.05)" },
          "66%": { transform: "translate(-20px,15px) scale(.95)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        tilt: {
          "0%, 100%": { transform: "rotate(-12deg) scale(1)" },
          "50%": { transform: "rotate(-9deg) scale(1.03)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        slashIn: {
          "0%": { opacity: "0", transform: "rotate(-45deg) scaleY(0)" },
          "100%": { opacity: "1", transform: "rotate(-12deg) scaleY(1)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
