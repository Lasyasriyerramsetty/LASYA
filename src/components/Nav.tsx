"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "@/data/portfolio";
import { CueLink } from "@/components/motion/LinkCue";

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const NAV = [
  { label: "Work",    href: "#projects" },
  { label: "Skills",  href: "#skills"   },
  { label: "Journey", href: "#journey"  },
  { label: "About",   href: "#about"    },
  { label: "Contact", href: "#contact"  },
];

export default function Nav({ onRecruiterMode }: { onRecruiterMode: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive]     = useState("");
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV.map(n => n.href.slice(1));
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  /* lock body scroll when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <motion.nav
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          padding: scrolled ? "10px 0" : "18px 0",
          transition: "padding 0.35s, background 0.35s, border-color 0.35s",
          background: scrolled ? "rgba(5,8,15,0.90)" : "transparent",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
          backdropFilter: scrolled ? "blur(24px) saturate(1.4)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(24px) saturate(1.4)" : "none",
        }}
      >
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* ── Logo ── */}
          <motion.a
            href="#hero"
            style={{
              fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 600,
              letterSpacing: "0.14em", textDecoration: "none",
              color: "rgba(238,242,255,0.75)",
            }}
            whileHover={{ color: "var(--text-1)" } as never}
          >
            LASYA<span style={{ color: "var(--blue)" }}>.</span>
          </motion.a>

          {/* ── Desktop links ── */}
          <div style={{ display: "flex", alignItems: "center", gap: 32 }} className="hidden md:flex">
            {NAV.map(n => {
              const isActive = active === n.href.slice(1);
              return (
                <a
                  key={n.label}
                  href={n.href}
                  style={{
                    position: "relative",
                    fontSize: 14, fontWeight: 500, textDecoration: "none",
                    color: isActive ? "var(--text-1)" : "var(--text-2)",
                    transition: "color 0.22s, letter-spacing 0.22s",
                    paddingBottom: 4,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    letterSpacing: isActive ? "0.02em" : "0",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--text-1)")}
                  onMouseLeave={e => (e.currentTarget.style.color = isActive ? "var(--text-1)" : "var(--text-2)")}
                >
                  {n.label}
                  <motion.span
                    animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.4 }}
                    style={{
                      width: 5, height: 5, borderRadius: "50%",
                      background: "var(--blue)",
                      boxShadow: "0 0 8px var(--blue)",
                      display: "inline-block",
                    }}
                  />
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      style={{
                        position: "absolute", bottom: 0, left: 0, right: 0,
                        height: 2, borderRadius: 2, background: "var(--blue)",
                      }}
                      transition={{ type: "spring", stiffness: 420, damping: 36 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* ── Right actions ── */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }} className="hidden md:flex">
            <CueLink
              href={profile.resume}
              cue="OPENING SNAPSHOT ↓"
              className="btn-has-arrow"
              style={{
                fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600,
                letterSpacing: "0.09em", padding: "7px 13px",
                borderRadius: 7,
                border: "1px solid var(--border-md)",
                color: "var(--text-2)",
                textDecoration: "none",
                transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--border-hi)"; e.currentTarget.style.color = "var(--text-1)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-md)"; e.currentTarget.style.color = "var(--text-2)"; }}
            >
              RESUME <span className="btn-arrow">↓</span>
            </CueLink>
            <button
              onClick={onRecruiterMode}
              style={{
                fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600,
                letterSpacing: "0.09em", padding: "7px 13px",
                borderRadius: 7,
                border: "1px solid rgba(212,168,71,0.38)",
                color: "var(--gold)",
                background: "transparent", cursor: "pointer",
                transition: "background 0.2s, border-color 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(212,168,71,0.08)"; e.currentTarget.style.borderColor = "rgba(212,168,71,0.58)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(212,168,71,0.38)"; }}
            >
              RECRUITER MODE
            </button>
            <CueLink href={profile.github} cue="OPENING CODE SPACE ↗"
              style={{ color: "var(--text-3)", textDecoration: "none", transition: "color 0.2s", padding: "4px", display: "inline-flex" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--text-1)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-3)")}
            ><GithubIcon /></CueLink>
            <CueLink href={profile.linkedin} cue="ENTERING NETWORK ↗"
              style={{ color: "var(--text-3)", textDecoration: "none", transition: "color 0.2s", padding: "4px", display: "inline-flex" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--text-1)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-3)")}
            ><LinkedinIcon /></CueLink>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            onClick={() => setOpen(o => !o)}
            className="md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: "var(--text-2)", padding: 6, borderRadius: 6,
              transition: "color 0.2s",
            }}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              {open
                ? <><line x1="4" y1="4" x2="18" y2="18" /><line x1="18" y1="4" x2="4" y2="18" /></>
                : <><line x1="3" y1="7"  x2="19" y2="7"  /><line x1="3" y1="15" x2="19" y2="15" /></>}
            </svg>
          </button>
        </div>
      </motion.nav>

      {/* ── Mobile fullscreen menu ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{   opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed", inset: 0, zIndex: 40,
              background: "rgba(5,8,15,0.98)",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              gap: 0,
            }}
          >
            {NAV.map((n, i) => (
              <motion.a
                key={n.label}
                href={n.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 + i * 0.055, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(28px, 8vw, 40px)",
                  fontWeight: 700,
                  letterSpacing: "-0.025em",
                  textDecoration: "none",
                  color: active === n.href.slice(1) ? "var(--text-1)" : "var(--text-2)",
                  padding: "10px 0",
                  width: "100%",
                  textAlign: "center",
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--text-1)")}
                onMouseLeave={e => (e.currentTarget.style.color = active === n.href.slice(1) ? "var(--text-1)" : "var(--text-2)")}
              >
                {n.label}
              </motion.a>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38, duration: 0.3 }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, marginTop: 32 }}
            >
              <button
                onClick={() => { onRecruiterMode(); setOpen(false); }}
                style={{
                  fontFamily: "var(--font-mono)", fontSize: 12,
                  padding: "10px 22px", borderRadius: 8,
                  border: "1px solid rgba(212,168,71,0.4)",
                  color: "var(--gold)", background: "none", cursor: "pointer",
                  letterSpacing: "0.08em",
                }}
              >
                RECRUITER MODE
              </button>
              <a
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                style={{
                  fontFamily: "var(--font-mono)", fontSize: 11,
                  color: "var(--text-3)", textDecoration: "none",
                  letterSpacing: "0.08em",
                }}
              >
                RESUME ↓
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
