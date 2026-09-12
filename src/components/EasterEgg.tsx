"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X, ChevronRight } from "lucide-react";
import { profile } from "@/data/portfolio";

type Line = { type: "input" | "output" | "error"; text: string };

const BOOT = [
  "> INITIALIZING SYSTEM...",
  "> LOADING PROJECTS...",
  "> CONNECTING REPOSITORIES...",
  "> ANALYZING SKILLS...",
  "> SYSTEM READY",
];

const COMMANDS: Record<string, string[]> = {
  help: [
    "  available commands:",
    "  projects   → showcase project list",
    "  skills     → tech stack overview",
    "  github     → open code space",
    "  linkedin   → open professional network",
    "  contact    → show contact info",
    "  about      → who is Lasya",
    "  clear      → clear terminal",
  ],
  projects: [
    "  [ TIER S ]  AdSpark       Multi-Agent AI Marketing Engine",
    "  [ TIER S ]  Bhumitra      AI Landslide Risk Platform",
    "  [ TIER A ]  Fraud SMS     97%+ Accuracy ML + Android",
    "  [ TIER A ]  Prompt Dojo   5-Level LLM Trainer",
    "  [ TIER A ]  CrewHire      Multi-Agent AI Recruitment Pipeline",
  ],
  skills: [
    "  Languages    Python · Java · Kotlin · C · JavaScript",
    "  AI / ML      Multi-Agent AI · Scikit-learn · TF-IDF · NLP",
    "  Frameworks   Flask · Streamlit · CrewAI · REST APIs",
    "  Tools        Git · GitHub · Linux · Tableau",
    "  DSA          550+ LeetCode problems",
  ],
  about: [
    "  Name       Lasya Sri Yerramsetti",
    "  Role       CS Sophomore at BVRIT Hyderabad",
    "  CGPA       9.32",
    "  Tagline    I build AI products with real-world impact.",
    "  Award      HacKOn with Amazon 6.0 Student Builder Challenge Winner",
    "  Award      Unstop Campus Champion 2026",
  ],
  contact: [
    `  Email      ${profile.email}`,
    `  GitHub     github.com/Lasyasriyerramsetty`,
    `  LinkedIn   linkedin.com/in/lasya-sri-yerramsetti`,
  ],
};

export default function EasterEgg() {
  const [open, setOpen] = useState(false);
  const [booting, setBooting] = useState(true);
  const [bootIndex, setBootIndex] = useState(0);
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const finishBoot = useCallback(() => {
    setBooting(false);
    setLines([
      { type: "output", text: "> USER: LASYA   MODE: BUILDER" },
      { type: "output", text: "> SYSTEMS: ONLINE" },
      { type: "output", text: "" },
      { type: "output", text: "  Type 'help' to see available commands." },
      { type: "output", text: "" },
    ]);
  }, []);

  useEffect(() => {
    if (!open) return;
    setBooting(true);
    setBootIndex(0);
    setLines([]);
  }, [open]);

  useEffect(() => {
    if (!open || !booting) return;
    if (bootIndex < BOOT.length) {
      const t = setTimeout(() => {
        setLines(prev => [...prev, { type: "output", text: BOOT[bootIndex] }]);
        setBootIndex(i => i + 1);
      }, 200);
      return () => clearTimeout(t);
    }
    const t = setTimeout(finishBoot, 260);
    return () => clearTimeout(t);
  }, [open, booting, bootIndex, finishBoot]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "L") {
        e.preventDefault();
        setOpen(o => !o);
      }
      if (e.key === "Escape") setOpen(false);
      if (open && booting && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        finishBoot();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, booting, finishBoot]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 120);
  }, [open]);

  // show tooltip after 3s to hint new visitors
  useEffect(() => {
    const t = setTimeout(() => setShowTooltip(true), 3000);
    return () => clearTimeout(t);
  }, []);

  const runCommand = useCallback((raw: string) => {
    const cmd = raw.trim().toLowerCase();
    const next: Line[] = [{ type: "input", text: `$ ${raw}` }];
    if (cmd === "clear") {
      setLines([{ type: "output", text: "> cleared." }, { type: "output", text: "" }]);
      return;
    }
    if (cmd === "github") {
      next.push({ type: "output", text: "  Opening code space..." });
      window.open(profile.github, "_blank");
    } else if (cmd === "linkedin") {
      next.push({ type: "output", text: "  Entering professional network..." });
      window.open(profile.linkedin, "_blank");
    } else if (COMMANDS[cmd]) {
      COMMANDS[cmd].forEach(l => next.push({ type: "output", text: l }));
    } else if (cmd !== "") {
      next.push({ type: "error", text: `  command not found: '${cmd}'   try 'help'` });
    }
    next.push({ type: "output", text: "" });
    setLines(prev => [...prev, ...next]);
  }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runCommand(input);
    setInput("");
  };

  return (
    <>
      {/* ── floating trigger button ── */}
      <div style={{ position: "fixed", bottom: 28, right: 28, zIndex: 40, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10 }}>

        {/* tooltip — shows after 3s, dismisses on click */}
        <AnimatePresence>
          {showTooltip && !open && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{
                padding: "10px 14px",
                borderRadius: 12,
                background: "rgba(10,16,28,0.95)",
                border: "1px solid rgba(61,214,140,0.25)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                backdropFilter: "blur(14px)",
                maxWidth: 220,
              }}
            >
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--green)", letterSpacing: "0.06em", marginBottom: 4 }}>
                DEVELOPER TERMINAL
              </p>
              <p style={{ fontSize: 12, color: "var(--text-2)", lineHeight: 1.5 }}>
                Click to open an interactive terminal and explore the portfolio via commands.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 8 }}>
                <ChevronRight size={10} style={{ color: "var(--green)" }} />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-3)" }}>or press CTRL+SHIFT+L</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* main button */}
        <motion.button
          onClick={() => { setOpen(true); setShowTooltip(false); }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.06, boxShadow: "0 0 0 1px rgba(61,214,140,0.5), 0 0 28px rgba(61,214,140,0.22)" }}
          whileTap={{ scale: 0.96 }}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          title="Open terminal (Ctrl+Shift+L)"
          aria-label="Open developer terminal"
          style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "12px 20px", borderRadius: 12,
            background: "rgba(10,16,28,0.9)",
            border: "1px solid rgba(61,214,140,0.3)",
            cursor: "pointer", outline: "none",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            boxShadow: "0 0 0 1px rgba(61,214,140,0.1) inset, 0 8px 32px rgba(0,0,0,0.4)",
            color: "var(--green)",
            transition: "all 0.22s",
            // pulse animation via keyframes defined in globals.css
            animation: "terminal-pulse 3s ease-in-out infinite",
          }}
        >
          {/* pulsing dot */}
          <span style={{
            width: 8, height: 8, borderRadius: "50%",
            background: "var(--green)",
            boxShadow: "0 0 8px var(--green)",
            flexShrink: 0,
            animation: "live-pulse 2s ease-in-out infinite",
          }} />
          <Terminal size={15} />
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: 12,
            fontWeight: 600, letterSpacing: "0.08em",
            color: "var(--green)",
          }}>
            TERMINAL
          </span>
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: 10,
            color: "rgba(61,214,140,0.45)",
            letterSpacing: "0.06em",
            borderLeft: "1px solid rgba(61,214,140,0.2)",
            paddingLeft: 10,
          }}>
            CTRL+SHIFT+L
          </span>
        </motion.button>
      </div>

      {/* ── terminal panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="terminal"
            initial={{ opacity: 0, y: 32, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 28, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed", bottom: 100, right: 28, zIndex: 50,
              width: "min(460px, calc(100vw - 48px))",
              borderRadius: 16, overflow: "hidden",
              background: "rgba(5,9,16,0.98)",
              border: "1px solid rgba(61,214,140,0.22)",
              boxShadow: "0 0 0 1px rgba(61,214,140,0.06) inset, 0 40px 80px rgba(0,0,0,0.6), 0 0 60px rgba(61,214,140,0.05)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }}
          >
            {/* title bar */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "10px 16px",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
              background: "rgba(255,255,255,0.018)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ display: "flex", gap: 6 }}>
                  {["#f87171", "#facc15", "#4ade80"].map((c, i) => (
                    <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.75 }} />
                  ))}
                </div>
                <div style={{ width: 1, height: 14, background: "rgba(255,255,255,0.08)" }} />
                <Terminal size={11} style={{ color: "var(--green)" }} />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-3)", letterSpacing: "0.06em" }}>
                  lasya@portfolio:~
                </span>
              </div>
              <motion.button
                onClick={() => setOpen(false)}
                whileHover={{ color: "var(--text-1)" } as never}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: "var(--text-3)", display: "flex", padding: 3,
                  borderRadius: 4, transition: "color 0.18s",
                }}
                aria-label="Close terminal"
              >
                <X size={13} />
              </motion.button>
            </div>

            {/* output */}
            <div style={{
              height: 300, overflowY: "auto",
              padding: "14px 18px",
              display: "flex", flexDirection: "column", gap: 1,
            }}>
              {lines.map((line, i) => (
                <p key={i} style={{
                  fontFamily: "var(--font-mono)", fontSize: 12.5,
                  lineHeight: 1.75, whiteSpace: "pre",
                  color:
                    line.type === "input"  ? "rgba(238,242,255,0.88)"
                    : line.type === "error" ? "#f87171"
                    : line.text === ""      ? "transparent"
                    : "rgba(61,214,140,0.82)",
                }}>
                  {line.text || "\u00a0"}
                </p>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* input */}
            {booting ? (
              <button onClick={finishBoot} style={{
                width: "100%", padding: "11px 18px",
                border: "none", borderTop: "1px solid rgba(255,255,255,0.05)",
                background: "rgba(255,255,255,0.012)",
                color: "var(--text-3)", fontFamily: "var(--font-mono)",
                fontSize: 11, letterSpacing: "0.12em", cursor: "pointer",
              }}>
                PRESS ENTER TO SKIP BOOT
              </button>
            ) : (
              <form onSubmit={onSubmit} style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "11px 18px",
                borderTop: "1px solid rgba(255,255,255,0.05)",
                background: "rgba(255,255,255,0.012)",
              }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--green)", userSelect: "none" }}>$</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  style={{
                    flex: 1, background: "none", border: "none", outline: "none",
                    fontFamily: "var(--font-mono)", fontSize: 12.5,
                    color: "rgba(238,242,255,0.88)",
                    caretColor: "var(--green)",
                  }}
                  placeholder="type 'help' to begin..."
                  autoComplete="off"
                  spellCheck={false}
                  aria-label="Terminal input"
                />
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
