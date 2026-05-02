"use client";

import { useEffect, useState } from "react";

type Props = {
  /** Final number to count up to */
  value: number;
  /** Animation length in ms */
  duration?: number;
  /** Delay before starting (ms) */
  delay?: number;
  /** Suffix appended after the number, e.g. "+", "%" */
  suffix?: string;
  /** Optional className for the wrapper span */
  className?: string;
};

/**
 * CountUp — animates a number from 0 to `value` over `duration` ms.
 * Uses requestAnimationFrame + ease-out so the count slows as it nears
 * the end. SSR-safe: the SSR/initial render shows the final value
 * (so SEO crawlers see real numbers); on hydration we reset to 0 and
 * animate up.
 */
export default function CountUp({
  value,
  duration = 1600,
  delay = 0,
  suffix = "",
  className,
}: Props) {
  // Render the final value during SSR / before hydration.
  const [display, setDisplay] = useState<number>(value);

  useEffect(() => {
    // Reset to 0 and animate up. Cleanup cancels in-flight raf/timer
    // so React 18 StrictMode double-mount doesn't strand the animation.
    setDisplay(0);

    let raf = 0;
    let startTs = 0;

    const step = (now: number) => {
      if (!startTs) startTs = now;
      const elapsed = now - startTs;
      const t = Math.min(1, elapsed / duration);
      // easeOutCubic — fast start, soft landing on the target.
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(value * eased));
      if (t < 1) {
        raf = requestAnimationFrame(step);
      } else {
        setDisplay(value);
      }
    };

    const timer = window.setTimeout(() => {
      raf = requestAnimationFrame(step);
    }, delay);

    return () => {
      window.clearTimeout(timer);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [value, duration, delay]);

  return (
    <span className={className}>
      {display}
      {suffix}
    </span>
  );
}
