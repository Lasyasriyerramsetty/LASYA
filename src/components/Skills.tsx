"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { skills, skillProjectMap, projects } from "@/data/portfolio";
import { RevealHeading } from "@/components/motion/Reveal";
import { useFinePointer } from "@/hooks/useMediaFlags";

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const fine = useFinePointer();
  const focused = hover ?? active;
  const proofIds = focused ? (skillProjectMap[focused] ?? []) : [];

  return (
    <section id="skills" ref={ref} className="section">
      <div className="container">

        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <p className="section-eyebrow" style={{ marginBottom: 14 }}>03 — SKILLS</p>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <h2 className="display-lg" style={{ color: "var(--text-1)" }}>
              <RevealHeading text="Skills → Proof" className="display-lg" />
            </h2>
            <p className="body-md" style={{ maxWidth: 360 }}>
              Every skill is backed by shipped code.{" "}
              <span style={{ color: "var(--blue)" }}>Click a dotted skill</span> to see proof.
            </p>
          </div>
        </motion.div>

        <div className="grid-skills">

          {/* skill cloud */}
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.15 }}
          >
            {skills.map((cat, ci) => (
              <div key={cat.category} style={{ marginBottom: 32 }}>
                <p style={{
                  fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-3)",
                  letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 14,
                }}>
                  {cat.category}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                  {cat.items.map((skill, si) => {
                    const hasProof = !!skillProjectMap[skill];
                    const isActive = focused === skill;
                    return (
                      <motion.button
                        key={skill}
                        initial={{ opacity: 0, scale: 0.86 }}
                        animate={inView ? { opacity: focused && !isActive ? 0.38 : 1, scale: 1 } : {}}
                        transition={{ delay: ci * 0.04 + si * 0.022, duration: 0.35 }}
                        whileHover={hasProof ? { y: -2, borderColor: isActive ? "rgba(91,141,238,0.55)" : "var(--border-hi)" } : {}}
                        whileTap={hasProof ? { scale: 0.95 } : {}}
                        onClick={() => hasProof && setActive(active === skill ? null : skill)}
                        onMouseEnter={() => { if (hasProof && fine) setHover(skill); }}
                        onMouseLeave={() => setHover(null)}
                        style={{
                          padding: "8px 15px", borderRadius: 9,
                          fontSize: 13, fontWeight: 500,
                          cursor: hasProof ? "pointer" : "default",
                          transition: "all 0.18s",
                          background: isActive ? "rgba(91,141,238,0.16)" : "rgba(255,255,255,0.035)",
                          border: isActive ? "1px solid rgba(91,141,238,0.44)" : "1px solid var(--border)",
                          color: isActive ? "var(--blue)" : "var(--text-2)",
                          boxShadow: isActive ? "0 0 18px rgba(91,141,238,0.13)" : "none",
                          outline: "none",
                          display: "inline-flex", alignItems: "center", gap: 0,
                        }}
                      >
                        {skill}
                        {hasProof && (
                          <span style={{
                            display: "inline-block",
                            width: 4, height: 4, borderRadius: "50%",
                            background: isActive ? "var(--blue)" : "var(--text-3)",
                            marginLeft: 7, verticalAlign: "middle",
                            transition: "background 0.18s",
                            flexShrink: 0,
                          }} />
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            ))}
          </motion.div>

          {/* evidence panel */}
          <motion.div
            initial={{ opacity: 0, x: 18 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.22 }}
            style={{
              borderRadius: 18,
              border: "1px solid var(--border)",
              background: "rgba(13,20,36,0.52)",
              padding: "26px",
              minHeight: 260,
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              position: "sticky", top: 90,
            }}
          >
            <AnimatePresence mode="wait">
              {focused ? (
                <motion.div
                  key={focused}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.24 }}
                >
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, color: "var(--text-3)", letterSpacing: "0.14em", marginBottom: 7 }}>SKILL EVIDENCE</p>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: 19, fontWeight: 700, color: "var(--text-1)", marginBottom: 22, letterSpacing: "-0.01em" }}>
                    {focused}
                  </p>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, color: "var(--text-3)", letterSpacing: "0.14em", marginBottom: 12 }}>USED IN</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {proofIds.map((id, i) => {
                      const p = projects.find(pr => pr.id === id);
                      if (!p) return null;
                      return (
                        <motion.div
                          key={id}
                          initial={{ opacity: 0, x: 8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.06, duration: 0.28 }}
                          style={{
                            padding: "12px 14px", borderRadius: 10,
                            background: "rgba(91,141,238,0.06)",
                            border: "1px solid rgba(91,141,238,0.14)",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 3 }}>
                            <span className={p.tier === "S" ? "tier-s" : "tier-a"}>TIER {p.tier}</span>
                            <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-1)" }}>{p.title}</span>
                          </div>
                          <p style={{ fontSize: 11.5, color: "var(--text-3)", lineHeight: 1.5 }}>{p.tagline}</p>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center",
                    minHeight: 200, textAlign: "center", gap: 12,
                  }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.06, 1] }}
                    transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
                    style={{
                      width: 42, height: 42, borderRadius: "50%",
                      background: "rgba(91,141,238,0.07)",
                      border: "1px solid rgba(91,141,238,0.18)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 18, color: "var(--blue)",
                    }}
                  >
                    ↗
                  </motion.div>
                  <p style={{ fontSize: 12.5, color: "var(--text-3)", lineHeight: 1.55, maxWidth: 180 }}>
                    Click a skill with a <span style={{ color: "var(--blue)", fontWeight: 600 }}>·</span> dot to see its project proof
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
