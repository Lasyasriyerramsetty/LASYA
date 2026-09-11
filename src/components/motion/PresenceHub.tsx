"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "@/data/portfolio";
import Magnetic from "@/components/motion/Magnetic";
import { CueLink } from "@/components/motion/LinkCue";
import { easeOut } from "@/lib/motion";
import { Mail } from "lucide-react";

const NODES = [
  {
    id: "github",
    label: "GitHub",
    desc: "CODE / PROJECTS / EXPERIMENTS",
    cue: "OPENING CODE SPACE ↗",
    href: profile.github,
    x: 18,
    y: 22,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    desc: "JOURNEY / NETWORK / ACHIEVEMENTS",
    cue: "ENTERING NETWORK ↗",
    href: profile.linkedin,
    x: 82,
    y: 22,
  },
  {
    id: "resume",
    label: "Resume",
    desc: "PROFESSIONAL SNAPSHOT",
    cue: "OPENING SNAPSHOT ↓",
    href: profile.resume,
    x: 18,
    y: 78,
  },
  {
    id: "email",
    label: "Email",
    desc: "START A CONVERSATION",
    cue: "STARTING CONVERSATION ↗",
    href: `mailto:${profile.email}`,
    x: 82,
    y: 78,
    external: false,
  },
];

export default function PresenceHub() {
  const [hover, setHover] = useState<string | null>(null);
  const active = NODES.find((n) => n.id === hover);

  return (
    <div
      style={{
        position: "relative",
        height: 280,
        maxWidth: 520,
        margin: "0 auto 48px",
        borderRadius: 20,
        border: "1px solid var(--border)",
        background: "rgba(13,20,36,0.4)",
        overflow: "hidden",
      }}
    >
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        {NODES.map((n) => (
          <motion.line
            key={n.id}
            x1="50"
            y1="50"
            x2={n.x}
            y2={n.y}
            stroke={hover === n.id ? "rgba(91,141,238,0.55)" : "rgba(91,141,238,0.16)"}
            strokeWidth={0.35}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>

      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          zIndex: 2,
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            border: "1px solid rgba(91,141,238,0.35)",
            background: "rgba(91,141,238,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            letterSpacing: "0.14em",
            color: "var(--text-1)",
            boxShadow: "0 0 28px rgba(91,141,238,0.15)",
          }}
        >
          LASYA
        </div>
        <AnimatePresence mode="wait">
          {active && (
            <motion.p
              key={active.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2, ease: easeOut }}
              style={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                top: 84,
                width: 220,
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: "0.12em",
                color: "var(--blue)",
              }}
            >
              {active.desc}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {NODES.map((n) => (
        <div
          key={n.id}
          style={{
            position: "absolute",
            left: `${n.x}%`,
            top: `${n.y}%`,
            transform: "translate(-50%, -50%)",
            zIndex: 3,
          }}
        >
        <Magnetic strength={6}>
          <CueLink
            href={n.href}
            cue={n.cue}
            external={n.external !== false}
            onMouseEnter={() => setHover(n.id)}
            onMouseLeave={() => setHover(null)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
              textDecoration: "none",
              color: hover === n.id ? "var(--text-1)" : "var(--text-2)",
            }}
          >
            <motion.span
              animate={{ scale: hover === n.id ? 1.12 : 1 }}
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                border: `1px solid ${hover === n.id ? "rgba(91,141,238,0.45)" : "var(--border-md)"}`,
                background: hover === n.id ? "rgba(91,141,238,0.12)" : "rgba(13,20,36,0.8)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: "0.08em",
              }}
            >
              {n.id === "email" ? <Mail size={14} /> : n.label.slice(0, 2).toUpperCase()}
            </motion.span>
            <span style={{ fontSize: 11, fontWeight: 600 }}>{n.label}</span>
          </CueLink>
        </Magnetic>
        </div>
      ))}
    </div>
  );
}
