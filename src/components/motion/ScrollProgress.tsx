"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/useMediaFlags";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });
  const reduced = useReducedMotion();

  return (
    <motion.div
      aria-hidden
      className="scroll-progress"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        zIndex: 80,
        transformOrigin: "0% 50%",
        background: "linear-gradient(90deg, var(--blue), #a78bfa)",
        scaleX: reduced ? scrollYProgress : scaleX,
        pointerEvents: "none",
        opacity: 0.85,
      }}
    />
  );
}
