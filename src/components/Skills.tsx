"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { skills, skillProjectMap, projects } from "@/data/portfolio";

// Skills with no project proof — shown as "foundational" (known, used in coursework/practice)
const FOUNDATIONAL_LABEL: Record<string, string> = {
  Java:                       "Used in OOP coursework and DSA practice",
  C:                          "Systems programming fundamentals",
  HTML:                       "Frontend markup across all web projects",
  CSS:                        "Styling across web projects",
  NLP:                        "Applied in Fraud SMS text classification pipeline",
  MySQL:                      "DBMS coursework and backend data modelling",
  SQLite:                     "Lightweight DB for local project storage",
  MongoDB:                    "NoSQL fundamentals and schema design",
  Git:                        "Version control across every project",
  GitHub:                     "All repositories hosted and maintained here",
  Linux:                      "Development environment for all projects",
  Tableau:                    "Data visualisation and dashboard creation",
  "VS Code":                  "Primary development IDE",
  "Data Structures & Algorithms": "550+ LeetCode problems solved",
  OOP:                        "Applied in Java, Python, and Kotlin projects",
  DBMS:                       "Coursework: normalization, SQL, transactions",
  "Operating Systems":        "Coursework: scheduling, memory, concurrency",
};

export default function Skills() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState<string | null>(null);

  const hasProof     = (s: string) => !!skillProjectMap[s];
  const isFoundational = (s: string) => !hasProof(s);
  const proofIds     = active ? (skillProjectMap[active] ?? []) : [];
  const foundLabel   = active ? FOUNDATIONAL_LABEL[active] : null;

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
            <h2 className="display-lg" style={{ color: "var(--text-1)" }}>Skills</h2>
            <p className="body-md" style={{ maxWidth: 300 }}>
              Click any skill to see where it was used.<br/>
             
            </p>
          </div>
        </motion.div>

        <div className="grid-skills">

          {/* ── skill cloud ── */}
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
                    const proof   = hasProof(skill);
                    const found   = isFoundational(skill);
                    const isActive = active === skill;

                    return (
                      <motion.button
                        key={skill}
                        initial={{ opacity: 0, scale: 0.86 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: ci * 0.04 + si * 0.022, duration: 0.35 }}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActive(isActive ? null : skill)}
                        style={{
                          padding: "8px 15px", borderRadius: 9,
                          fontSize: 13, fontWeight: 500,
                          cursor: "pointer",
                          outline: "none",
                          display: "inline-flex", alignItems: "center", gap: 0,
                          transition: "all 0.18s",
                          // proof skills: vibrant blue accent
                          // foundational: subtle grey, slightly dimmed
                          background: isActive
                            ? (proof ? "rgba(91,141,238,0.16)" : "rgba(74,88,120,0.18)")
                            : (proof ? "rgba(255,255,255,0.035)" : "rgba(255,255,255,0.02)"),
                          border: isActive
                            ? (proof ? "1px solid rgba(91,141,238,0.44)" : "1px solid rgba(139,158,197,0.3)")
                            : (proof ? "1px solid var(--border)" : "1px solid rgba(255,255,255,0.04)"),
                          color: isActive
                            ? (proof ? "var(--blue)" : "var(--text-2)")
                            : (proof ? "var(--text-2)" : "var(--text-3)"),
                          boxShadow: isActive && proof ? "0 0 18px rgba(91,141,238,0.13)" : "none",
                          opacity: active && !isActive ? 0.4 : 1,
                        }}
                      >
                        {skill}
                        {/* proof dot */}
                        {proof && (
                          <span style={{
                            display: "inline-block",
                            width: 4, height: 4, borderRadius: "50%",
                            background: isActive ? "var(--blue)" : "rgba(91,141,238,0.5)",
                            marginLeft: 7, verticalAlign: "middle",
                            flexShrink: 0,
                            transition: "background 0.18s",
                          }} />
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* legend */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
              style={{
                display: "flex", alignItems: "center", gap: 20,
                padding: "12px 16px", borderRadius: 10,
                border: "1px solid var(--border)",
                background: "rgba(255,255,255,0.015)",
                marginTop: 8,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <span style={{
                  display: "inline-block", width: 4, height: 4,
                  borderRadius: "50%", background: "rgba(91,141,238,0.6)",
                }} />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-3)", letterSpacing: "0.1em" }}>
                  PROJECT SHIPPED
                </span>
              </div>
              <div style={{ width: 1, height: 14, background: "var(--border-md)" }} />
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <span style={{
                  display: "inline-block", width: 10, height: 1,
                  background: "var(--text-3)", borderRadius: 1,
                }} />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-3)", letterSpacing: "0.1em" }}>
                  FOUNDATIONAL
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* ── evidence / info panel ── */}
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
              transition: "border-color 0.3s",
              borderColor: active && hasProof(active) ? "rgba(91,141,238,0.2)" : "var(--border)",
            }}
          >
            <AnimatePresence mode="wait">

              {/* ── PROOF SKILL selected ── */}
              {active && proofIds.length > 0 && (
                <motion.div
                  key={`proof-${active}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.24 }}
                >
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, color: "var(--text-3)", letterSpacing: "0.14em", marginBottom: 7 }}>
                    PROJECT EVIDENCE
                  </p>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: 19, fontWeight: 700, color: "var(--text-1)", marginBottom: 6, letterSpacing: "-0.01em" }}>
                    {active}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 20 }}>
                    <span style={{
                      display: "inline-block", width: 4, height: 4,
                      borderRadius: "50%", background: "var(--blue)",
                    }} />
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--blue)", letterSpacing: "0.1em" }}>
                      SHIPPED IN {proofIds.length} PROJECT{proofIds.length > 1 ? "S" : ""}
                    </span>
                  </div>

                  <p style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, color: "var(--text-3)", letterSpacing: "0.14em", marginBottom: 12 }}>
                    USED IN
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {proofIds.map((id, i) => {
                      const p = projects.find(pr => pr.id === id);
                      if (!p) return null;
                      return (
                        <motion.div
                          key={id}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.07, duration: 0.3 }}
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
              )}

              {/* ── FOUNDATIONAL SKILL selected ── */}
              {active && proofIds.length === 0 && (
                <motion.div
                  key={`found-${active}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.24 }}
                >
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, color: "var(--text-3)", letterSpacing: "0.14em", marginBottom: 7 }}>
                    FOUNDATIONAL SKILL
                  </p>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: 19, fontWeight: 700, color: "var(--text-1)", marginBottom: 6, letterSpacing: "-0.01em" }}>
                    {active}
                  </p>

                  {/* "foundational" badge */}
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    padding: "4px 10px", borderRadius: 6, marginBottom: 20,
                    background: "rgba(74,88,120,0.18)",
                    border: "1px solid rgba(139,158,197,0.2)",
                  }}>
                    <span style={{ fontSize: 12, color: "var(--text-3)" }}>coursework / practice</span>
                  </div>

                  {/* description */}
                  {foundLabel && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.08 }}
                      style={{
                        padding: "16px 18px", borderRadius: 12,
                        border: "1px solid var(--border)",
                        background: "rgba(255,255,255,0.025)",
                      }}
                    >
                      <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.65 }}>
                        {foundLabel}
                      </p>
                    </motion.div>
                  )}

                  <p style={{ fontSize: 12, color: "var(--text-3)", marginTop: 16, fontFamily: "var(--font-mono)", letterSpacing: "0.06em" }}>
                    No shipped project yet — but the skill is real.
                  </p>
                </motion.div>
              )}

              {/* ── nothing selected ── */}
              {!active && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center",
                    minHeight: 220, textAlign: "center", gap: 14,
                  }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.07, 1] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    style={{
                      width: 46, height: 46, borderRadius: "50%",
                      background: "rgba(91,141,238,0.07)",
                      border: "1px solid rgba(91,141,238,0.18)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 20, color: "var(--blue)",
                    }}
                  >
                    ↗
                  </motion.div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <p style={{ fontSize: 13, color: "var(--text-2)", fontWeight: 500 }}>
                      Click any skill
                    </p>
                    <p style={{ fontSize: 12, color: "var(--text-3)", lineHeight: 1.55, maxWidth: 190 }}>
                      Skills with <span style={{ color: "rgba(91,141,238,0.7)", fontWeight: 600 }}>·</span> show shipped projects.
                      Others show context.
                    </p>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
