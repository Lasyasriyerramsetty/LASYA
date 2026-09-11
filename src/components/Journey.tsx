"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { timeline, achievements } from "@/data/portfolio";
import { RevealHeading } from "@/components/motion/Reveal";

const colorMap: Record<string, string> = {
  education:   "#60a5fa",
  achievement: "#d4a847",
  project:     "#5b8dee",
  volunteer:   "#3dd68c",
  coding:      "#a78bfa",
  publication: "#f472b6",
  showcase:    "#fb923c",
  recognition: "#d4a847",
};

const iconMap: Record<string, string> = {
  education:   "🎓",
  achievement: "🏆",
  project:     "⚡",
  volunteer:   "🤝",
  coding:      "💻",
  publication: "📄",
  showcase:    "🔬",
  recognition: "⭐",
};

export default function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start 0.8", "end 0.5"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="journey" ref={ref} className="section">
      <div className="container">

        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <p className="section-eyebrow" style={{ marginBottom: 14 }}>04 — JOURNEY</p>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <h2 className="display-lg" style={{ color: "var(--text-1)" }}>
              <RevealHeading text="Milestones" className="display-lg" />
            </h2>
            <p className="body-md" style={{ maxWidth: 340 }}>Every milestone verified. No filler, no noise.</p>
          </div>
        </motion.div>

        <div className="grid-2col">

          {/* ── timeline ── */}
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.15 }}
            style={{
              borderRadius: 18, border: "1px solid var(--border)",
              background: "rgba(13,20,36,0.45)",
              padding: "28px 24px",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
            }}
          >
            <p style={{
              fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-3)",
              letterSpacing: "0.16em", marginBottom: 24,
            }}>CHRONOLOGICAL</p>

            <div ref={lineRef} style={{ position: "relative" }}>
              <div style={{
                position: "absolute", left: 15, top: 6, bottom: 6,
                width: 1, background: "rgba(91,141,238,0.08)",
              }} />
              <motion.div style={{
                position: "absolute", left: 15, top: 6, bottom: 6,
                width: 1,
                background: "linear-gradient(to bottom, rgba(91,141,238,0.55), transparent)",
                transformOrigin: "top",
                scaleY: lineScale,
              }} />

              {timeline.map((item, i) => {
                const color = colorMap[item.type] ?? colorMap.achievement;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -14 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.22 + i * 0.038, duration: 0.4 }}
                    style={{ display: "flex", gap: 14, paddingBottom: 18, position: "relative", zIndex: 1 }}
                  >
                    <div style={{
                      width: 30, height: 30, borderRadius: 8, flexShrink: 0,
                      background: `${color}14`, border: `1px solid ${color}26`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 12,
                    }}>
                      {iconMap[item.type] ?? "⚡"}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{
                        fontFamily: "var(--font-mono)", fontSize: 10,
                        color: "var(--text-3)", letterSpacing: "0.08em", marginBottom: 3,
                      }}>
                        {item.year}
                      </p>
                      <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.5 }}>{item.event}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* ── achievements ── */}
          <motion.div
            initial={{ opacity: 0, x: 18 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.22 }}
            style={{ display: "flex", flexDirection: "column", gap: 0 }}
          >
            <p style={{
              fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-3)",
              letterSpacing: "0.16em", marginBottom: 20,
            }}>HIGHLIGHTS</p>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {achievements.map((a, i) => {
                const color = colorMap[a.type] ?? colorMap.achievement;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 14 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 + i * 0.065, duration: 0.42 }}
                    whileHover={{ y: -2, borderColor: `${color}30` }}
                    style={{
                      padding: "18px 20px", borderRadius: 13,
                      border: `1px solid ${color}16`,
                      background: `${color}05`,
                      transition: "border-color 0.22s, transform 0.22s",
                      cursor: "default",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 13 }}>
                      <div style={{
                        width: 34, height: 34, borderRadius: 9, flexShrink: 0,
                        background: `${color}13`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 15,
                      }}>
                        {iconMap[a.type] ?? "⭐"}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color, letterSpacing: "0.08em" }}>
                            {a.year}
                          </span>
                          <span style={{ fontSize: 13.5, fontWeight: 700, color: "var(--text-1)", letterSpacing: "-0.01em" }}>
                            {a.title}
                          </span>
                        </div>
                        <p style={{ fontSize: 12.5, color: "var(--text-3)", lineHeight: 1.55 }}>{a.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
