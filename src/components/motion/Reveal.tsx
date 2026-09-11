"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useMediaFlags";
import { easeOut } from "@/lib/motion";

type Props = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  blur?: boolean;
  className?: string;
  style?: React.CSSProperties;
  once?: boolean;
};

export default function Reveal({
  children,
  delay = 0,
  y = 18,
  blur: _blur = false,
  className,
  style,
  once = true,
}: Props) {
  const reduced = useReducedMotion();
  if (reduced) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-72px" }}
      transition={{ duration: 0.62, delay, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}

export function RevealHeading({
  text,
  className,
  style,
  letter = false,
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  letter?: boolean;
}) {
  const reduced = useReducedMotion();
  const parts = letter ? text.split("") : text.split(" ");

  if (reduced) {
    return (
      <span className={className} style={style}>
        {text}
      </span>
    );
  }

  return (
    <span className={className} style={{ display: "inline-block", ...style }} aria-label={text}>
      {parts.map((part, i) => (
        <motion.span
          key={`${part}-${i}`}
          aria-hidden
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, delay: i * (letter ? 0.028 : 0.07), ease: easeOut }}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {letter ? part : `${part}${i < parts.length - 1 ? "\u00a0" : ""}`}
        </motion.span>
      ))}
    </span>
  );
}
