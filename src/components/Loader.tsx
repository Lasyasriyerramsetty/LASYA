"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { easeOut } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useMediaFlags";

const LINES = [
  "> INITIALIZING SYSTEM...",
  "> LOADING PROJECTS...",
  "> READY.",
];

export default function Loader({ onDone }: { onDone: () => void }) {
  const reduced = useReducedMotion();
  const [lineIndex, setLineIndex] = useState(0);
  const [exiting, setExiting] = useState(false);

  const finish = () => {
    if (exiting) return;
    setExiting(true);
    window.setTimeout(onDone, reduced ? 80 : 380);
  };

  useEffect(() => {
    if (reduced) {
      const t = setTimeout(finish, 120);
      return () => clearTimeout(t);
    }
    if (lineIndex < LINES.length - 1) {
      const t = setTimeout(() => setLineIndex((i) => i + 1), 180);
      return () => clearTimeout(t);
    }
    const t = setTimeout(finish, 220);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lineIndex, reduced]);

  useEffect(() => {
    const skip = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === "Escape" || e.key === " ") {
        e.preventDefault();
        finish();
      }
    };
    window.addEventListener("keydown", skip);
    return () => window.removeEventListener("keydown", skip);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exiting]);

  const progress = ((lineIndex + 1) / LINES.length) * 100;

  return (
    <motion.div
      key="loader"
      onClick={finish}
      initial={{ opacity: 1 }}
      animate={exiting ? { opacity: 0, scale: 1.015 } : { opacity: 1 }}
      transition={{ duration: 0.38, ease: easeOut }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg)",
        cursor: "pointer",
      }}
    >
      <div className="ambient-wash" aria-hidden style={{ position: "absolute", inset: 0, opacity: 0.7 }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.08, ease: easeOut }}
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: "0.14em",
          color: "rgba(238,242,255,0.55)",
          marginBottom: 36,
        }}
      >
        LASYA<span style={{ color: "var(--blue)" }}>.</span>
      </motion.div>

      <div style={{ width: "min(360px, 90vw)", marginBottom: 28, minHeight: 72 }}>
        {LINES.slice(0, lineIndex + 1).map((line, i) => (
          <motion.p
            key={line}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, ease: easeOut }}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              lineHeight: 2,
              color: i === lineIndex ? "var(--green)" : "rgba(61,214,140,0.38)",
            }}
          >
            {line}
          </motion.p>
        ))}
      </div>

      <div
        style={{
          width: "min(360px, 90vw)",
          height: 2,
          background: "rgba(255,255,255,0.06)",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <motion.div
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          style={{
            height: "100%",
            borderRadius: 2,
            background: "linear-gradient(90deg, var(--blue), var(--green))",
          }}
        />
      </div>
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          color: "var(--text-3)",
          marginTop: 14,
          letterSpacing: "0.12em",
        }}
      >
        SKIP / ENTER
      </p>
    </motion.div>
  );
}
