"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { parseMetric } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useMediaFlags";

export default function CountUp({
  value,
  duration = 900,
  className,
  style,
}: {
  value: string;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const parsed = parseMetric(value);
    if (!inView || !parsed || reduced) {
      setShown(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const decimals = Number.isInteger(parsed.num) ? 0 : 2;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      const current = parsed.num * ease;
      const formatted = decimals ? current.toFixed(decimals) : String(Math.round(current));
      setShown(`${parsed.prefix}${formatted}${parsed.suffix}`);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setShown(value);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, value, duration]);

  return (
    <span ref={ref} className={className} style={style}>
      {shown}
    </span>
  );
}
