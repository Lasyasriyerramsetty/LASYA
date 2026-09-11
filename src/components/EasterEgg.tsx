"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X } from "lucide-react";
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
    "  ──────────────────────────────────────",
    "  projects   → showcase project list",
    "  skills     → tech stack overview",
    "  github     → open code space ↗",
    "  linkedin   → open professional network ↗",
    "  contact    → show contact info",
    "  about      → who is Lasya",
    "  clear      → clear terminal",
  ],
  projects: [
    "  [ TIER S ]  AdSpark        — Multi-Agent AI Marketing Engine",
    "  [ TIER S ]  Bhumitra       — AI Landslide Risk Platform (ICSMET 2025)",
    "  [ TIER A ]  Fraud SMS      — 97%+ Accuracy ML + Android",
    "  [ TIER A ]  Prompt Dojo    — 5-Level LLM Trainer",
    "  [ TIER A ]  CrewHire       — Multi-Agent AI Recruitment Pipeline",
  ],
  skills: [
    "  Languages ─── Python · Java · Kotlin · C · JavaScript",
    "  AI / ML ───── Multi-Agent AI · Scikit-learn · TF-IDF · NLP",
    "  Frameworks ── Flask · Streamlit · CrewAI · REST APIs",
    "  Tools ──────── Git · GitHub · Linux · Tableau",
    "  DSA ────────── 550+ LeetCode problems",
  ],
  about: [
    "  Name     ── Lasya Sri Yerramsetti",
    "  Role     ── CS Sophomore @ BVRIT Hyderabad",
    "  CGPA     ── 9.32",
    "  Tagline  ── I build systems that think.",
    "  Awards   ── HacKOn with Amazon 6.0 — Student Builder Challenge Winner",
    "             ── ICSMET 2025 Presenter",
    "             ── Unstop Campus Champion",
  ],
  contact: [
    `  Email    ── ${profile.email}`,
    `  GitHub   ── github.com/Lasyasriyerramsetty`,
    `  LinkedIn ── linkedin.com/in/lasya-sri-yerramsetti`,
    `  Phone    ── ${profile.phone}`,
  ],
};

export default function EasterEgg() {
  const [open, setOpen] = useState(false);
  const [booting, setBooting] = useState(true);
  const [bootIndex, setBootIndex] = useState(0);
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  const finishBoot = useCallback(() => {
    setBooting(false);
    setLines([
      { type: "output", text: "> USER: LASYA · MODE: BUILDER" },
      { type: "output", text: "> SYSTEMS: ONLINE" },
      { type: "output", text: "" },
      { type: "output", text: "  Type 'help' to begin." },
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
      }, 220);
      return () => clearTimeout(t);
    }
    const t = setTimeout(finishBoot, 280);
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

  /* auto-scroll */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  /* focus on open */
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 120);
  }, [open]);

  const runCommand = useCallback((raw: string) => {
    const cmd = raw.trim().toLowerCase();
    const next: Line[] = [{ type: "input", text: `$ ${raw}` }];

    if (cmd === "clear") {
      setLines([{ type: "output", text: "> cleared." }, { type: "output", text: "" }]);
      return;
    }
    if (cmd === "github") {
      next.push({ type: "output", text: "  Opening code space ↗" });
      window.open(profile.github, "_blank");
    } else if (cmd === "linkedin") {
      next.push({ type: "output", text: "  Entering professional network ↗" });
      window.open(profile.linkedin, "_blank");
    } else if (COMMANDS[cmd]) {
      COMMANDS[cmd].forEach(l => next.push({ type: "output", text: l }));
    } else if (cmd !== "") {
      next.push({ type: "error", text: `  command not found: '${cmd}' — try 'help'` });
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
      {/* ── trigger button ── */}
      <motion.button
        onClick={() => setOpen(true)}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6 }}
        whileHover={{ borderColor: "rgba(61,214,140,0.35)", color: "var(--green)" }}
        whileTap={{ scale: 0.95 }}
        title="Open terminal (Ctrl+Shift+L)"
        style={{
          position: "fixed", bottom: 24, right: 24, zIndex: 40,
          display: "flex", alignItems: "center", gap: 8,
          padding: "8px 14px", borderRadius: 10,
          background: "rgba(13,20,36,0.75)",
          border: "1px solid var(--border-md)",
          cursor: "pointer", outline: "none",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          transition: "border-color 0.2s, color 0.2s",
          color: "var(--text-3)",
        }}
        aria-label="Open terminal"
      >
        <Terminal size={13} />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.1em" }}>
          CTRL+SHIFT+L
        </span>
      </motion.button>

      {/* ── terminal panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="terminal"
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 28, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed", bottom: 72, right: 24, zIndex: 50,
              width: "min(440px, calc(100vw - 48px)",
              borderRadius: 16,
              overflow: "hidden",
              background: "rgba(6,10,18,0.97)",
              border: "1px solid rgba(61,214,140,0.18)",
              boxShadow: "0 0 0 1px rgba(61,214,140,0.06) inset, 0 32px 64px rgba(0,0,0,0.55)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            {/* title bar */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "10px 16px",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
              background: "rgba(255,255,255,0.02)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {/* traffic lights */}
                <div style={{ display: "flex", gap: 6 }}>
                  {["#f87171","#facc15","#4ade80"].map((c, i) => (
                    <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.7 }} />
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
                  color: "var(--text-3)", display: "flex", padding: 2,
                  transition: "color 0.18s",
                }}
                aria-label="Close terminal"
              >
                <X size={13} />
              </motion.button>
            </div>

            {/* output */}
            <div style={{
              height: 280, overflowY: "auto",
              padding: "14px 18px",
              display: "flex", flexDirection: "column", gap: 1,
            }}>
              {lines.map((line, i) => (
                <p
                  key={i}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    lineHeight: 1.7,
                    whiteSpace: "pre",
                    color:
                      line.type === "input" ? "rgba(238,242,255,0.85)"
                      : line.type === "error" ? "#f87171"
                      : line.text === ""     ? "transparent"
                      : "rgba(61,214,140,0.75)",
                  }}
                >
                  {line.text || "\u00a0"}
                </p>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* input */}
            {booting ? (
              <button
                onClick={finishBoot}
                style={{
                  width: "100%",
                  padding: "10px 18px",
                  border: "none",
                  borderTop: "1px solid rgba(255,255,255,0.05)",
                  background: "rgba(255,255,255,0.015)",
                  color: "var(--text-3)",
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  cursor: "pointer",
                }}
              >
                SKIP / ENTER
              </button>
            ) : (
            <form
              onSubmit={onSubmit}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "10px 18px",
                borderTop: "1px solid rgba(255,255,255,0.05)",
                background: "rgba(255,255,255,0.015)",
              }}
            >
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--green)", userSelect: "none" }}>$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                style={{
                  flex: 1, background: "none", border: "none", outline: "none",
                  fontFamily: "var(--font-mono)", fontSize: 12,
                  color: "rgba(238,242,255,0.88)",
                  caretColor: "var(--green)",
                }}
                placeholder="type a command..."
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
