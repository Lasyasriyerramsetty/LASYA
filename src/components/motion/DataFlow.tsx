"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useMediaFlags";

export default function DataFlow({
  steps,
  accent,
  active,
}: {
  steps: { step: string; label: string }[];
  accent: string;
  active: boolean;
}) {
  const reduced = useReducedMotion();
  const shown = steps.slice(0, 6);

  return (
    <div style={{ marginBottom: 22, overflowX: "auto" }}>
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 9.5,
          color: "var(--text-3)",
          letterSpacing: "0.14em",
          marginBottom: 14,
        }}
      >
        SYSTEM FLOW
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 0, minWidth: "max-content" }}>
        {shown.map((s, i) => (
          <div key={s.step} style={{ display: "flex", alignItems: "center" }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={active ? { opacity: 1, scale: 1 } : { opacity: 0.4 }}
              transition={{ delay: i * 0.06, duration: 0.28 }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: 88,
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: accent,
                  boxShadow: `0 0 10px ${accent}66`,
                  marginBottom: 8,
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  color: "var(--text-2)",
                  textAlign: "center",
                  lineHeight: 1.35,
                  letterSpacing: "0.04em",
                }}
              >
                {s.label}
              </span>
            </motion.div>
            {i < shown.length - 1 && (
              <div
                style={{
                  position: "relative",
                  width: 28,
                  height: 2,
                  background: `${accent}28`,
                  marginBottom: 22,
                  overflow: "hidden",
                  borderRadius: 2,
                }}
              >
                {!reduced && (
                  <motion.span
                    animate={{ x: [-12, 28] }}
                    transition={{ repeat: Infinity, duration: 1.4, ease: "linear", delay: i * 0.12 }}
                    style={{
                      position: "absolute",
                      top: -2,
                      left: 0,
                      width: 10,
                      height: 6,
                      borderRadius: 6,
                      background: accent,
                      boxShadow: `0 0 8px ${accent}`,
                    }}
                  />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
