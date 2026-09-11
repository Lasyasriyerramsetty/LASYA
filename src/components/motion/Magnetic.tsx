"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMotionEnabled } from "@/hooks/useMediaFlags";
import { springSoft } from "@/lib/motion";

type Props = {
  children: React.ReactNode;
  strength?: number;
  className?: string;
  style?: React.CSSProperties;
};

export default function Magnetic({ children, strength = 8, className, style }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { pointerFx } = useMotionEnabled();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, springSoft);
  const sy = useSpring(y, springSoft);

  const onMove = (e: React.MouseEvent) => {
    if (!pointerFx) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    const dist = Math.hypot(dx, dy) || 1;
    const pull = Math.min(strength, strength * (Math.min(dist, 80) / 80));
    x.set((dx / dist) * pull);
    y.set((dy / dist) * pull);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: pointerFx ? sx : 0, y: pointerFx ? sy : 0, display: "inline-flex", ...style }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.div>
  );
}
