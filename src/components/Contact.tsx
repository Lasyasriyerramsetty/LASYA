"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { profile } from "@/data/portfolio";
import { Mail, Copy, Check } from "lucide-react";
import PresenceHub from "@/components/motion/PresenceHub";
import Magnetic from "@/components/motion/Magnetic";
import { RevealHeading } from "@/components/motion/Reveal";
import { CueLink } from "@/components/motion/LinkCue";

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);
const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const platforms = [
  { id: "github",   label: "GitHub",   sub: "Code & proof",       icon: <GithubIcon />,    href: profile.github,      color: "#e2e8f0" },
  { id: "linkedin", label: "LinkedIn", sub: "Professional story",  icon: <LinkedinIcon />,  href: profile.linkedin,    color: "#60a5fa" },
  { id: "mail",     label: "Email",    sub: "Let's start talking", icon: <Mail size={22}/>, href: `mailto:${profile.email}`,                              color: "var(--blue)" },
];

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section id="contact" ref={ref} className="section">
      <div className="container">

        {/* cta header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          style={{ textAlign: "center", marginBottom: 64 }}
        >
          <p className="section-eyebrow" style={{ marginBottom: 18 }}>06 — CONTACT</p>
          <h2 style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(36px, 6vw, 68px)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 0.96,
            color: "var(--text-1)",
            marginBottom: 22,
          }}>
            <RevealHeading text="Have a problem" letter={false} />
            <br/>
            <span className="gradient-text">worth building?</span>
          </h2>
          <p className="body-lg" style={{ maxWidth: 420, margin: "0 auto 36px" }}>
            Open to internships, collabs, and interesting problems. I reply fast.
          </p>

          {/* email chip */}
          <Magnetic strength={8}>
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 14,
              padding: "14px 24px",
              borderRadius: 14,
              background: "rgba(91,141,238,0.07)",
              border: "1px solid rgba(91,141,238,0.2)",
            }}
          >
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: "var(--text-1)" }}>
              {profile.email}
            </span>
            <motion.button
              onClick={copy}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              style={{
                background: "none", border: "none", cursor: "pointer",
                color: copied ? "var(--green)" : "var(--text-3)",
                display: "flex", alignItems: "center", gap: 5,
                fontSize: 11.5, fontFamily: "var(--font-mono)",
                transition: "color 0.2s", padding: "4px 6px", borderRadius: 6,
              }}
              aria-label="Copy email"
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.span
                    key="check"
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.6, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <Check size={13}/> Copied
                  </motion.span>
                ) : (
                  <motion.span
                    key="copy"
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.6, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Copy size={14}/>
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
          </Magnetic>
        </motion.div>

        <PresenceHub />

        {/* platform cards */}
        <div className="grid-contact">
          {platforms.map((p, i) => (
            <Magnetic key={p.id} strength={7} style={{ width: "100%", display: "block" }}>
            <CueLink
              href={p.href}
              cue={p.id === "github" ? "OPENING CODE SPACE ↗" : p.id === "linkedin" ? "ENTERING NETWORK ↗" : "STARTING CONVERSATION ↗"}
              external={p.id !== "mail"}
              style={{
                display: "block",
                padding: "28px 22px",
                borderRadius: 16,
                border: "1px solid var(--border)",
                background: "rgba(13,20,36,0.45)",
                textAlign: "center",
                textDecoration: "none",
                backdropFilter: "blur(12px)",
                transition: "border-color 0.22s, box-shadow 0.22s",
                width: "100%",
              }}
            >
              <motion.div
                whileHover={{ scale: 1.08 }}
                style={{
                  width: 48, height: 48, borderRadius: 13,
                  background: `${p.color === "var(--blue)" ? "rgba(91,141,238,0.1)" : `${p.color}12`}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 14px",
                  color: p.color,
                  transition: "transform 0.22s",
                }}
              >
                {p.icon}
              </motion.div>
              <p style={{ fontSize: 14.5, fontWeight: 700, color: "var(--text-1)", marginBottom: 4, letterSpacing: "-0.01em" }}>
                {p.label}
              </p>
              <p style={{ fontSize: 12, color: "var(--text-3)" }}>{p.sub}</p>
            </CueLink>
            </Magnetic>
          ))}
        </div>

      </div>
    </section>
  );
}
