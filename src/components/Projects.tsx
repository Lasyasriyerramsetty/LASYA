"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { projects } from "@/data/portfolio";
import { ExternalLink } from "lucide-react";
import ProjectUniverse from "@/components/motion/ProjectUniverse";
import DataFlow from "@/components/motion/DataFlow";
import CountUp from "@/components/motion/CountUp";
import { CueLink } from "@/components/motion/LinkCue";
import { RevealHeading } from "@/components/motion/Reveal";
import { easeOut } from "@/lib/motion";

type Project = (typeof projects)[0];

const GithubIcon = ({ size = 14 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

/* ── project list card ── */
function ProjectCard({ p, active, onClick }: { p: Project; active: boolean; onClick: () => void }) {
  return (
    <motion.button
      data-cursor="project"
      onClick={onClick}
      whileHover={{ scale: active ? 1 : 1.015, y: active ? 0 : -2 }}
      whileTap={{ scale: 0.985 }}
      style={{
        width: "100%", textAlign: "left",
        padding: "18px 20px", borderRadius: 14,
        border: `1px solid ${active ? "rgba(91,141,238,0.45)" : "var(--border)"}`,
        background: active ? "rgba(91,141,238,0.07)" : "rgba(13,20,36,0.45)",
        cursor: "pointer",
        transition: "border-color 0.22s, background 0.22s, box-shadow 0.22s",
        boxShadow: active ? "0 0 32px rgba(91,141,238,0.12), inset 0 0 0 1px rgba(91,141,238,0.08)" : "none",
        outline: "none",
        position: "relative", overflow: "hidden",
      }}
    >
      {/* shimmer on active */}
      {active && (
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(105deg, transparent 40%, rgba(91,141,238,0.04) 50%, transparent 60%)",
          backgroundSize: "200% 100%",
          animation: "shimmer-sweep 3s ease-in-out infinite",
          pointerEvents: "none",
        }} />
      )}

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10, position: "relative" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span className={p.tier === "S" ? "tier-s" : "tier-a"}>TIER {p.tier}</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-3)", letterSpacing: "0.1em" }}>
            {p.year}
          </span>
        </div>
        <motion.div
          animate={{ rotate: active ? 90 : 0 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          style={{ color: active ? "var(--blue)" : "var(--text-3)", flexShrink: 0 }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </motion.div>
      </div>

      <h3 style={{
        fontFamily: "var(--font-sans)", fontSize: 17, fontWeight: 700,
        letterSpacing: "-0.02em",
        color: active ? "var(--text-1)" : "rgba(238,242,255,0.78)",
        marginBottom: 3, transition: "color 0.18s", position: "relative",
      }}>
        {p.title}
      </h3>
      <p style={{ fontSize: 12.5, color: "var(--text-3)", marginBottom: 12, lineHeight: 1.5, position: "relative" }}>
        {p.tagline}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, position: "relative" }}>
        {p.skills.slice(0, 3).map(s => <span key={s} className="tag">{s}</span>)}
        {p.skills.length > 3 && <span className="tag">+{p.skills.length - 3}</span>}
      </div>
    </motion.button>
  );
}

/* ── animated pipeline ── */
function AnimatedPipeline({ steps, accent, isVisible }: { steps: { step: string; label: string }[]; accent: string; isVisible: boolean }) {
  return (
    <div>
      {steps.map((s, i) => (
        <motion.div
          key={s.step}
          initial={{ opacity: 0, x: -10 }}
          animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
          transition={{ delay: i * 0.07, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "flex", alignItems: "flex-start", gap: 12 }}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={isVisible ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: i * 0.07 + 0.05, duration: 0.3, type: "spring", stiffness: 300 }}
              style={{
                width: 32, height: 32, borderRadius: 7,
                background: `${accent}16`, border: `1px solid ${accent}30`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700, color: accent,
                boxShadow: `0 0 12px ${accent}20`,
              }}
            >
              {s.step}
            </motion.div>
            {i < steps.length - 1 && (
              <motion.div
                initial={{ scaleY: 0 }}
                animate={isVisible ? { scaleY: 1 } : {}}
                transition={{ delay: i * 0.07 + 0.12, duration: 0.3 }}
                style={{
                  width: 1, height: 16, background: `${accent}22`,
                  margin: "3px 0", transformOrigin: "top",
                }}
              />
            )}
          </div>
          <div style={{ paddingTop: 7, paddingBottom: i < steps.length - 1 ? 4 : 0 }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: "var(--text-2)" }}>{s.label}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ── detail panel ── */
function DetailPanel({ p }: { p: Project }) {
  return (
    <motion.div
      key={p.id}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.45, ease: easeOut }}
      style={{ overflowY: "auto", maxHeight: "100%", paddingRight: 2 }}
    >
      {/* header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <span className={p.tier === "S" ? "tier-s" : "tier-a"}>TIER {p.tier}</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-3)", letterSpacing: "0.1em" }}>
            {p.year} · {p.category}
          </span>
        </div>
        <h2 className="display-md" style={{ color: "var(--text-1)", marginBottom: 6 }}>{p.title}</h2>
        <p style={{ fontSize: 14, color: p.accentColor, fontWeight: 600, letterSpacing: "-0.01em" }}>{p.tagline}</p>
      </div>

      {/* problem / solution */}
      <div style={{ display: "grid", gap: 10, marginBottom: 22 }}>
        {[
          { label: "THE PROBLEM",  text: p.problem,  bg: "rgba(255,255,255,0.02)", border: "var(--border)",          labelColor: "var(--text-3)" },
          { label: "THE SOLUTION", text: p.solution, bg: `${p.accentColor}07`,     border: `${p.accentColor}22`,    labelColor: p.accentColor },
        ].map(({ label, text, bg, border, labelColor }) => (
          <div key={label} style={{ padding: "14px 16px", borderRadius: 10, background: bg, border: `1px solid ${border}` }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, letterSpacing: "0.14em", color: labelColor, marginBottom: 7 }}>{label}</p>
            <p className="body-md" style={{ lineHeight: 1.65 }}>{text}</p>
          </div>
        ))}
      </div>

      {/* metrics */}
      {p.metrics.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 8, marginBottom: 22 }}>
          {p.metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06, duration: 0.3 }}
              className="metric-card"
            >
              <div className="metric-value" style={{ color: p.accentColor }}>
                <CountUp value={m.value} />
              </div>
              <div className="metric-label">{m.label}</div>
            </motion.div>
          ))}
        </div>
      )}

      <DataFlow steps={p.pipeline} accent={p.accentColor} active={true} />

      {/* pipeline */}
      <div style={{ marginBottom: 22 }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, color: "var(--text-3)", letterSpacing: "0.14em", marginBottom: 14 }}>PIPELINE</p>
        <AnimatedPipeline steps={p.pipeline} accent={p.accentColor} isVisible={true} />
      </div>

      {/* stack */}
      <div style={{ marginBottom: 22 }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, color: "var(--text-3)", letterSpacing: "0.14em", marginBottom: 12 }}>STACK</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          {p.stack.map(s => (
            <div key={s.label} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, color: "var(--text-3)", width: 66, flexShrink: 0, paddingTop: 2 }}>{s.label}</span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {s.items.map((item, ii) => (
                    <motion.span
                      key={item}
                      className="tag"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: ii * 0.04, duration: 0.25 }}
                    >
                      {item}
                    </motion.span>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* links */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <CueLink
          href={p.github}
          cue="OPENING CODE SPACE ↗"
          className="btn-has-arrow"
          style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            padding: "9px 18px", borderRadius: 8,
            background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-md)",
            color: "var(--text-2)", fontSize: 13, fontWeight: 500, textDecoration: "none",
            transition: "border-color 0.18s, color 0.18s",
          }}
        >
          <GithubIcon size={13}/> View Code <span className="btn-arrow out">↗</span>
        </CueLink>
        {p.demo && (
          <motion.a
            href={p.demo} target="_blank" rel="noopener noreferrer"
            whileHover={{ opacity: 0.85, y: -2 }}
            whileTap={{ scale: 0.96 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              padding: "9px 18px", borderRadius: 8,
              background: `${p.accentColor}18`, border: `1px solid ${p.accentColor}38`,
              color: p.accentColor, fontSize: 13, fontWeight: 500, textDecoration: "none",
            }}
          >
            <ExternalLink size={13}/> Live Demo
          </motion.a>
        )}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [active, setActive] = useState(projects[0].id);
  const ref     = useRef<HTMLDivElement>(null);
  const inView  = useInView(ref, { once: true, margin: "-80px" });
  const selected = projects.find(p => p.id === active)!;

  return (
    <section id="projects" ref={ref} className="section">
      <div className="container">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <p className="section-eyebrow" style={{ marginBottom: 14 }}>02 — SELECTED WORK</p>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <h2 className="display-lg" style={{ color: "var(--text-1)" }}>
              <RevealHeading text="Project Universe" className="display-lg" />
            </h2>
            <p className="body-md" style={{ maxWidth: 360 }}>
              Real systems built to solve real problems.<br/>
              Select a project to explore its architecture.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="hidden md:block"
        >
          <ProjectUniverse active={active} onSelect={setActive} />
        </motion.div>

        <div className="grid-projects">
          {/* list */}
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.15 }}
            style={{ display: "flex", flexDirection: "column", gap: 8 }}
          >
            {projects.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProjectCard p={p} active={active === p.id} onClick={() => setActive(p.id)} />
              </motion.div>
            ))}
          </motion.div>

          {/* detail */}
          <motion.div
            initial={{ opacity: 0, x: 18 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.22 }}
            style={{
              borderRadius: 18, border: "1px solid var(--border)",
              background: "rgba(13,20,36,0.52)",
              padding: "28px",
              minHeight: 600,
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              position: "sticky", top: 90,
              transition: "border-color 0.3s, box-shadow 0.3s",
              boxShadow: `0 0 40px ${selected.accentColor}0a`,
              borderColor: `${selected.accentColor}18`,
            }}
          >
            <AnimatePresence mode="wait">
              <DetailPanel p={selected} />
            </AnimatePresence>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
