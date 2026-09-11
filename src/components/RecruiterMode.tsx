"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail } from "lucide-react";
import { profile, projects, achievements } from "@/data/portfolio";

/* ── icons ── */
const GithubIcon = ({ size = 14 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);
const LinkedinIcon = ({ size = 14 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const TOP_SKILLS = ["Python", "Multi-Agent AI", "Machine Learning", "Flask", "Kotlin", "Streamlit", "CrewAI"];

/* ── section heading ── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.18em",
      color: "var(--text-3)", textTransform: "uppercase", marginBottom: 16,
    }}>
      {children}
    </p>
  );
}

/* ── thin divider ── */
function Divider() {
  return <div style={{ height: 1, background: "var(--border)", margin: "28px 0" }} />;
}

export default function RecruiterMode({ onClose }: { onClose: () => void }) {
  /* Escape key */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07 } },
  };
  const itemVariants = {
    hidden:  { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        background: "rgba(5,8,15,0.96)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        overflowY: "auto",
      }}
    >
      {/* panel slide up */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        style={{ maxWidth: 720, margin: "0 auto", padding: "48px 40px 80px" }}
      >

        {/* ── top bar ── */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 40 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <div style={{
                width: 6, height: 6, borderRadius: "50%",
                background: "var(--gold)", boxShadow: "0 0 8px var(--gold)",
              }} />
              <span style={{
                fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700,
                letterSpacing: "0.18em", color: "var(--gold)",
              }}>
                RECRUITER MODE
              </span>
            </div>
            <p style={{ fontSize: 13, color: "var(--text-3)", fontFamily: "var(--font-mono)" }}>
              30-second profile view
            </p>
          </div>
          <motion.button
            onClick={onClose}
            whileHover={{ color: "var(--text-1)", borderColor: "var(--border-md)" } as never}
            whileTap={{ scale: 0.93 }}
            style={{
              background: "none", border: "1px solid var(--border)", cursor: "pointer",
              color: "var(--text-3)", display: "flex", alignItems: "center",
              padding: "7px", borderRadius: 8,
              transition: "color 0.18s, border-color 0.18s",
            }}
            aria-label="Close recruiter mode"
          >
            <X size={16} />
          </motion.button>
        </div>

        <motion.div variants={containerVariants} initial="hidden" animate="visible">

          {/* ── WHO I AM ── */}
          <motion.div variants={itemVariants}>
            <SectionLabel>Who I Am</SectionLabel>
            <div style={{
              padding: "22px 24px", borderRadius: 14,
              border: "1px solid var(--border)",
              background: "rgba(255,255,255,0.025)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  style={{ width: 52, height: 52, borderRadius: 11, objectFit: "cover", border: "1px solid var(--border-md)" }}
                />
                <div>
                  <p style={{ fontSize: 17, fontWeight: 700, color: "var(--text-1)", letterSpacing: "-0.01em", marginBottom: 2 }}>
                    {profile.name}
                  </p>
                  <p style={{ fontSize: 13, color: "var(--blue)", fontWeight: 500, marginBottom: 2 }}>
                    {profile.tagline}
                  </p>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-3)" }}>
                    BVRIT Hyderabad CSE · CGPA 9.32 · {profile.location}
                  </p>
                </div>
              </div>
              <p style={{ fontSize: 13.5, color: "var(--text-2)", lineHeight: 1.7 }}>
                CS sophomore building AI agents, ML pipelines, and full-stack systems.
                HacKOn with Amazon 6.0 Student Builder Challenge winner. Presented research at ICSMET 2025. Solved 550+ LeetCode problems.
              </p>
            </div>
          </motion.div>

          <Divider />

          {/* ── TOP SKILLS ── */}
          <motion.div variants={itemVariants}>
            <SectionLabel>Top Skills</SectionLabel>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {TOP_SKILLS.map(s => (
                <span key={s} style={{
                  padding: "7px 14px", borderRadius: 8,
                  fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 500,
                  background: "rgba(91,141,238,0.1)",
                  border: "1px solid rgba(91,141,238,0.24)",
                  color: "var(--blue)",
                }}>
                  {s}
                </span>
              ))}
            </div>
          </motion.div>

          <Divider />

          {/* ── STRONGEST PROJECTS ── */}
          <motion.div variants={itemVariants}>
            <SectionLabel>Strongest Projects</SectionLabel>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {projects.slice(0, 3).map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.28 + i * 0.07, duration: 0.36 }}
                  style={{
                    padding: "16px 18px", borderRadius: 12,
                    border: "1px solid var(--border)",
                    background: "rgba(255,255,255,0.02)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                        <span className={p.tier === "S" ? "tier-s" : "tier-a"}>TIER {p.tier}</span>
                        <span style={{ fontSize: 14, fontWeight: 700, color: "var(--text-1)", letterSpacing: "-0.01em" }}>
                          {p.title}
                        </span>
                      </div>
                      <p style={{ fontSize: 12.5, color: "var(--text-2)", lineHeight: 1.6, marginBottom: 8 }}>
                        {p.solution}
                      </p>
                      {/* metrics */}
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                        {p.metrics.slice(0, 2).map(m => (
                          <span key={m.label} style={{
                            fontFamily: "var(--font-mono)", fontSize: 11,
                            color: p.accentColor,
                            display: "flex", alignItems: "center", gap: 4,
                          }}>
                            <span style={{ fontWeight: 700 }}>{m.value}</span>
                            <span style={{ color: "var(--text-3)" }}>{m.label}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                    <motion.a
                      href={p.github} target="_blank" rel="noopener noreferrer"
                      whileHover={{ color: "var(--text-1)" } as never}
                      style={{
                        color: "var(--text-3)", textDecoration: "none",
                        transition: "color 0.18s", flexShrink: 0, paddingTop: 2,
                      }}
                      aria-label={`${p.title} GitHub`}
                    >
                      <GithubIcon size={15} />
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <Divider />

          {/* ── KEY ACHIEVEMENTS ── */}
          <motion.div variants={itemVariants}>
            <SectionLabel>Key Achievements</SectionLabel>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {achievements.slice(0, 4).map((a, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.38 + i * 0.065, duration: 0.34 }}
                  style={{
                    display: "flex", gap: 16, alignItems: "flex-start",
                    padding: "12px 0",
                    borderBottom: i < achievements.slice(0,4).length - 1 ? "1px solid var(--border)" : "none",
                  }}
                >
                  <span style={{
                    fontFamily: "var(--font-mono)", fontSize: 10.5,
                    color: "var(--blue)", width: 44, flexShrink: 0, paddingTop: 1,
                    letterSpacing: "0.04em",
                  }}>
                    {a.year}
                  </span>
                  <div>
                    <span style={{ fontSize: 13.5, fontWeight: 700, color: "var(--text-1)", letterSpacing: "-0.01em" }}>
                      {a.title}
                    </span>
                    <span style={{ fontSize: 12.5, color: "var(--text-3)", marginLeft: 8 }}>
                      — {a.description}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <Divider />

          {/* ── CONNECT ── */}
          <motion.div variants={itemVariants}>
            <SectionLabel>Connect</SectionLabel>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {/* email */}
              <motion.a
                href={`mailto:${profile.email}`}
                whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(91,141,238,0.2)" }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "10px 18px", borderRadius: 9,
                  background: "var(--blue)", color: "#fff",
                  fontSize: 13, fontWeight: 500, textDecoration: "none",
                  transition: "transform 0.18s, box-shadow 0.18s",
                }}
              >
                <Mail size={13} />
                {profile.email}
              </motion.a>
              {/* linkedin */}
              <motion.a
                href={profile.linkedin} target="_blank" rel="noopener noreferrer"
                whileHover={{ borderColor: "var(--border-hi)", color: "var(--text-1)" } as never}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "10px 16px", borderRadius: 9,
                  border: "1px solid var(--border-md)", color: "var(--text-2)",
                  fontSize: 13, fontWeight: 500, textDecoration: "none",
                  transition: "border-color 0.18s, color 0.18s",
                }}
              >
                <LinkedinIcon size={13} /> LinkedIn
              </motion.a>
              {/* github */}
              <motion.a
                href={profile.github} target="_blank" rel="noopener noreferrer"
                whileHover={{ borderColor: "var(--border-hi)", color: "var(--text-1)" } as never}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "10px 16px", borderRadius: 9,
                  border: "1px solid var(--border-md)", color: "var(--text-2)",
                  fontSize: 13, fontWeight: 500, textDecoration: "none",
                  transition: "border-color 0.18s, color 0.18s",
                }}
              >
                <GithubIcon size={13} /> GitHub
              </motion.a>
              {/* resume */}
              <motion.a
                href={profile.resume} target="_blank" rel="noopener noreferrer"
                whileHover={{ borderColor: "rgba(212,168,71,0.5)", color: "var(--gold)" } as never}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  padding: "10px 16px", borderRadius: 9,
                  border: "1px solid rgba(212,168,71,0.28)", color: "var(--gold)",
                  fontSize: 13, fontWeight: 500, textDecoration: "none",
                  fontFamily: "var(--font-mono)",
                  transition: "border-color 0.18s, color 0.18s",
                }}
              >
                Resume ↓
              </motion.a>
            </div>
          </motion.div>

        </motion.div>
      </motion.div>
    </motion.div>
  );
}
