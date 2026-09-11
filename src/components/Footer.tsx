"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/portfolio";
import { CueLink } from "@/components/motion/LinkCue";
import { easeOut } from "@/lib/motion";

const links = [
  { label: "GitHub",   href: profile.github,                    cue: "OPENING CODE SPACE ↗", external: true  },
  { label: "LinkedIn", href: profile.linkedin,                   cue: "ENTERING NETWORK ↗", external: true  },
  { label: "Resume",   href: profile.resume,                     cue: "OPENING SNAPSHOT ↓", external: true  },
  { label: "Email",    href: `mailto:${profile.email}`,          cue: "STARTING CONVERSATION ↗", external: false },
];

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, ease: easeOut }}
      style={{ borderTop: "1px solid var(--border)", padding: "36px 0" }}
    >
      <div className="container" style={{
        display: "flex", alignItems: "center",
        justifyContent: "space-between", flexWrap: "wrap", gap: 20,
      }}>
        <div>
          <p style={{
            fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 600,
            color: "rgba(238,242,255,0.55)", marginBottom: 5, letterSpacing: "0.08em",
          }}>
            LASYA<span style={{ color: "var(--blue)" }}>.</span>
          </p>
          <p style={{
            fontFamily: "var(--font-mono)", fontSize: 9.5,
            color: "var(--text-3)", letterSpacing: "0.18em",
          }}>
            BUILDING · LEARNING · ITERATING
          </p>
        </div>

        <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "center" }}>
          {links.map(l => (
            <CueLink
              key={l.label}
              href={l.href}
              cue={l.cue}
              external={l.external}
              className="btn-has-arrow"
              style={{
                fontFamily: "var(--font-mono)", fontSize: 11,
                color: "var(--text-3)", textDecoration: "none",
                letterSpacing: "0.06em", transition: "color 0.2s",
              }}
            >
              {l.label} <span className={`btn-arrow ${l.label === "Resume" ? "" : "out"}`}>{l.label === "Resume" ? "↓" : "↗"}</span>
            </CueLink>
          ))}
        </div>

        <p style={{
          fontFamily: "var(--font-mono)", fontSize: 10,
          color: "var(--text-3)", letterSpacing: "0.06em",
        }}>
          © 2026 Lasya Sri Yerramsetti
        </p>
      </div>
    </motion.footer>
  );
}
