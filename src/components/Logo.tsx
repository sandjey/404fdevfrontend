import { cn } from "@/lib/utils";

type Props = {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "ink" | "cream" | "coral";
  className?: string;
  withTagline?: boolean;
  animate?: boolean;
};

// Brandbook proportions (font-size 74 reference):
//   - 404 ends ~12px left of slash centre
//   - slash 12px wide, centred at 0
//   - DEV starts ~30px right of slash centre
// We translate that into Tailwind-friendly margins per size.
const SIZE_MAP = {
  sm: { text: "text-base", slashH: "h-3.5", slashW: "w-[3px]", gapL: "ml-[3px]", gapR: "ml-[5px]" },
  md: { text: "text-xl",   slashH: "h-5",   slashW: "w-[4px]", gapL: "ml-[4px]", gapR: "ml-[7px]" },
  lg: { text: "text-3xl",  slashH: "h-7",   slashW: "w-[5px]", gapL: "ml-[5px]", gapR: "ml-[10px]" },
  xl: { text: "text-6xl md:text-7xl lg:text-8xl", slashH: "h-[1.05em]", slashW: "w-[10px] md:w-[12px]", gapL: "ml-[6px] md:ml-[8px]", gapR: "ml-[14px] md:ml-[20px]" },
};

const VARIANT = {
  ink:   { fg: "text-ink-900",  slash: "bg-brand-500" },
  cream: { fg: "text-cream-50", slash: "bg-brand-500" },
  coral: { fg: "text-cream-50", slash: "bg-cream-50" },
};

export default function Logo({
  size = "md",
  variant = "ink",
  className,
  withTagline = false,
  animate = false,
}: Props) {
  const s = SIZE_MAP[size];
  const v = VARIANT[variant];

  return (
    <span className={cn("inline-flex items-center select-none", className)}>
      <span
        className={cn(
          "font-display font-extrabold tracking-tightest leading-none",
          s.text,
          v.fg
        )}
      >
        404
      </span>
      <span
        aria-hidden
        className={cn(
          "inline-block rounded-[2px] origin-center shrink-0",
          s.slashH,
          s.slashW,
          v.slash,
          s.gapL,
          animate ? "animate-tilt" : "",
        )}
        style={{ transform: animate ? undefined : "rotate(-12deg)" }}
      />
      <span
        className={cn(
          "font-display font-extrabold tracking-tightest leading-none",
          s.text,
          v.fg,
          s.gapR
        )}
      >
        DEV
      </span>
      {withTagline && (
        <span className={cn("ml-3 hidden md:inline-block font-mono text-[10px] uppercase tracking-[0.18em]", v.fg, "opacity-60")}>
          code · learn · build
        </span>
      )}
    </span>
  );
}
