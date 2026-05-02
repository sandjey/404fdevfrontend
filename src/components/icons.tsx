// Premium inline SVG ikonalar — lucide stilida, lekin tashqi paket'siz.
// Har biri 24x24 viewBox, currentColor, default strokeWidth 1.75.

type IconProps = React.SVGProps<SVGSVGElement> & { size?: number };

const baseProps = (props: IconProps) => ({
  width: props.size ?? 20,
  height: props.size ?? 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  ...props,
});

export const PhoneIcon = (p: IconProps) => (
  <svg {...baseProps(p)}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />
  </svg>
);

export const TelegramIcon = (p: IconProps) => (
  <svg {...baseProps(p)} fill="currentColor" stroke="none">
    <path d="M21.94 4.34a1.16 1.16 0 0 0-1.18-.18L3.5 11.04c-.74.3-.78 1.34-.06 1.7l3.94 1.96 2.36 5.86c.18.46.78.55 1.1.16l2.62-3.16 4.28 3.16c.58.42 1.4.1 1.54-.6L22 5.66a1.16 1.16 0 0 0-.06-1.32zm-3.7 4.14-7.66 7.04-.32 3.36-1.7-4.24 9.68-6.16z" />
  </svg>
);

export const MailIcon = (p: IconProps) => (
  <svg {...baseProps(p)}>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

export const ArrowRightIcon = (p: IconProps) => (
  <svg {...baseProps(p)}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

export const ArrowUpRightIcon = (p: IconProps) => (
  <svg {...baseProps(p)}>
    <path d="M7 7h10v10" />
    <path d="M7 17 17 7" />
  </svg>
);

export const CheckIcon = (p: IconProps) => (
  <svg {...baseProps(p)}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export const XIcon = (p: IconProps) => (
  <svg {...baseProps(p)}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

export const MenuIcon = (p: IconProps) => (
  <svg {...baseProps(p)}>
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

export const SparklesIcon = (p: IconProps) => (
  <svg {...baseProps(p)}>
    <path d="M9.94 5 12 2l2.06 3 3 1.06-3 1.06L12 10l-2.06-3L7 6.06 9.94 5z" />
    <path d="M19 13a3 3 0 0 0-2 2 3 3 0 0 0-2-2 3 3 0 0 0 2-2 3 3 0 0 0 2 2zM5 17a3 3 0 0 0-2 2 3 3 0 0 0-2-2 3 3 0 0 0 2-2 3 3 0 0 0 2 2z" />
  </svg>
);

export const RocketIcon = (p: IconProps) => (
  <svg {...baseProps(p)}>
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

export const CodeIcon = (p: IconProps) => (
  <svg {...baseProps(p)}>
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

export const SmartphoneIcon = (p: IconProps) => (
  <svg {...baseProps(p)}>
    <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
    <path d="M12 18h.01" />
  </svg>
);

export const BotIcon = (p: IconProps) => (
  <svg {...baseProps(p)}>
    <path d="M12 8V4H8" />
    <rect width="16" height="12" x="4" y="8" rx="2" />
    <path d="M2 14h2" />
    <path d="M20 14h2" />
    <path d="M15 13v2" />
    <path d="M9 13v2" />
  </svg>
);

export const DatabaseIcon = (p: IconProps) => (
  <svg {...baseProps(p)}>
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
    <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
  </svg>
);

export const ZapIcon = (p: IconProps) => (
  <svg {...baseProps(p)}>
    <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
  </svg>
);

export const PlugIcon = (p: IconProps) => (
  <svg {...baseProps(p)}>
    <path d="M12 22v-5" />
    <path d="M9 8V2" />
    <path d="M15 8V2" />
    <path d="M18 8v3a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8z" />
  </svg>
);

export const ShieldIcon = (p: IconProps) => (
  <svg {...baseProps(p)}>
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
  </svg>
);

export const HeartIcon = (p: IconProps) => (
  <svg {...baseProps(p)}>
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

export const StarIcon = (p: IconProps) => (
  <svg {...baseProps(p)} fill="currentColor" stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export const QuoteIcon = (p: IconProps) => (
  <svg {...baseProps(p)} fill="currentColor" stroke="none">
    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1zM15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.078c.92 0 .922.94.922 1v1c0 1-1.394 2-2.392 2-.998 0-.608.587-.608 1V20c0 1 0 1 1 1z" />
  </svg>
);

export const PlayIcon = (p: IconProps) => (
  <svg {...baseProps(p)} fill="currentColor" stroke="none">
    <polygon points="6 3 20 12 6 21 6 3" />
  </svg>
);

export const ChevronDownIcon = (p: IconProps) => (
  <svg {...baseProps(p)}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const ChevronRightIcon = (p: IconProps) => (
  <svg {...baseProps(p)}>
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export const GlobeIcon = (p: IconProps) => (
  <svg {...baseProps(p)}>
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

export const InstagramIcon = (p: IconProps) => (
  <svg {...baseProps(p)}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const GithubIcon = (p: IconProps) => (
  <svg {...baseProps(p)}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export const ExternalLinkIcon = (p: IconProps) => (
  <svg {...baseProps(p)}>
    <path d="M15 3h6v6" />
    <path d="M10 14 21 3" />
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
  </svg>
);

export const SendIcon = (p: IconProps) => (
  <svg {...baseProps(p)}>
    <path d="m22 2-7 20-4-9-9-4Z" />
    <path d="M22 2 11 13" />
  </svg>
);

export const UserIcon = (p: IconProps) => (
  <svg {...baseProps(p)}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
