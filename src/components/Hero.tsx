"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { profile } from "@/data/portfolio";
import Magnetic from "@/components/motion/Magnetic";
import { CueLink } from "@/components/motion/LinkCue";
import CountUp from "@/components/motion/CountUp";
import { easeOut } from "@/lib/motion";
import { useMotionEnabled } from "@/hooks/useMediaFlags";

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

const NODES = [
  { id: "ai",     label: "AI",         x: 50, y: 18, r: 8  },
  { id: "ml",     label: "ML",         x: 80, y: 36, r: 6  },
  { id: "stack",  label: "FULL STACK", x: 18, y: 40, r: 6  },
  { id: "dsa",    label: "DSA",        x: 10, y: 68, r: 5  },
  { id: "data",   label: "DATA",       x: 76, y: 68, r: 5  },
  { id: "agents", label: "AGENTS",     x: 50, y: 54, r: 7  },
  { id: "build",  label: "BUILD",      x: 32, y: 84, r: 5  },
  { id: "solve",  label: "SOLVE",      x: 64, y: 84, r: 5  },
];
const EDGES = [
  ["ai","ml"],["ai","agents"],["ai","stack"],
  ["ml","data"],["ml","agents"],["stack","dsa"],
  ["stack","agents"],["agents","build"],["agents","solve"],
  ["data","solve"],["dsa","build"],
];

function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { pointerFx } = useMotionEnabled();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [3, -3]), { stiffness: 200, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-3, 3]), { stiffness: 200, damping: 30 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!pointerFx) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top)  / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX: pointerFx ? rotateX : 0, rotateY: pointerFx ? rotateY : 0, transformStyle: "preserve-3d", perspective: 1000 }}
    >
      {children}
    </motion.div>
  );
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);
  const mouseRef  = useRef({ x: 50, y: 50 });
  const sectionRef = useRef<HTMLElement>(null);
  const { pointerFx, reduced } = useMotionEnabled();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 80, damping: 20 });
  const smy = useSpring(my, { stiffness: 80, damping: 20 });
  const bgX = useTransform(smx, [-1, 1], [-2, 2]);
  const bgY = useTransform(smy, [-1, 1], [-2, 2]);
  const visX = useTransform(smx, [-1, 1], [-5, 5]);
  const visY = useTransform(smy, [-1, 1], [-5, 5]);
  const txtX = useTransform(smx, [-1, 1], [-3, 3]);
  const txtY = useTransform(smy, [-1, 1], [-3, 3]);
  const lightX = useTransform(smx, [-1, 1], [35, 65]);
  const lightY = useTransform(smy, [-1, 1], [30, 55]);

  useEffect(() => {
    if (!pointerFx) return;
    const onMove = (e: MouseEvent) => {
      const el = sectionRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
      const ny = ((e.clientY - r.top) / r.height) * 2 - 1;
      mx.set(Math.max(-1, Math.min(1, nx)));
      my.set(Math.max(-1, Math.min(1, ny)));
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [pointerFx, mx, my]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      canvas.width  = canvas.offsetWidth  * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: ((e.clientX - rect.left) / rect.width)  * 100,
        y: ((e.clientY - rect.top)  / rect.height) * 100,
      };
    };
    window.addEventListener("mousemove", onMouse, { passive: true });

    let t = 0;
    const W = () => canvas.offsetWidth;
    const H = () => canvas.offsetHeight;

    const draw = () => {
      ctx.clearRect(0, 0, W(), H());
      t += reduced ? 0 : 0.006;

      const pos = (px: number, py: number) => ({ x: (px / 100) * W(), y: (py / 100) * H() });
      const anim = NODES.map((n, i) => ({
        ...n,
        ax: n.x + (reduced ? 0 : Math.sin(t + i * 0.8) * 1.8),
        ay: n.y + (reduced ? 0 : Math.cos(t * 0.7 + i * 0.6) * 1.8),
      }));

      EDGES.forEach(([a, b], ei) => {
        const na = anim.find(n => n.id === a)!;
        const nb = anim.find(n => n.id === b)!;
        const pa = pos(na.ax, na.ay);
        const pb = pos(nb.ax, nb.ay);

        const grad = ctx.createLinearGradient(pa.x, pa.y, pb.x, pb.y);
        grad.addColorStop(0, "rgba(91,141,238,0.06)");
        grad.addColorStop(0.5, "rgba(91,141,238,0.14)");
        grad.addColorStop(1, "rgba(91,141,238,0.06)");
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;
        ctx.stroke();

        if (!reduced) {
          const p = ((t * 0.45 + ei * 0.18) % 1);
          const tx = pa.x + (pb.x - pa.x) * p;
          const ty = pa.y + (pb.y - pa.y) * p;
          const pg = ctx.createRadialGradient(tx, ty, 0, tx, ty, 5);
          pg.addColorStop(0, "rgba(91,141,238,0.8)");
          pg.addColorStop(1, "transparent");
          ctx.beginPath();
          ctx.arc(tx, ty, 5, 0, Math.PI * 2);
          ctx.fillStyle = pg;
          ctx.fill();
        }
      });

      anim.forEach(n => {
        const p   = pos(n.ax, n.ay);
        const m   = mouseRef.current;
        const hov = Math.hypot(n.ax - m.x, n.ay - m.y) < 10;
        const r   = n.r + (hov ? 5 : 0);
        const pulse = hov ? 1 + Math.sin(t * 4) * 0.15 : 1;

        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 5);
        g.addColorStop(0, hov ? "rgba(91,141,238,0.35)" : "rgba(91,141,238,0.07)");
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 5, 0, Math.PI * 2);
        ctx.fill();

        if (hov) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, r * 2.2 * pulse, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(91,141,238,0.2)";
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle   = hov ? "rgba(91,141,238,0.55)" : "rgba(91,141,238,0.12)";
        ctx.strokeStyle = hov ? "rgba(91,141,238,0.9)"  : "rgba(91,141,238,0.28)";
        ctx.lineWidth   = hov ? 1.5 : 1;
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle    = hov ? "rgba(240,244,255,0.95)" : "rgba(139,158,197,0.6)";
        ctx.font         = `${hov ? 600 : 400} ${Math.max(8, r * 0.95)}px "JetBrains Mono", monospace`;
        ctx.textAlign    = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(n.label, p.x, p.y + r + 13);
      });

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("mousemove", onMouse);
      ro.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [reduced]);

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay, ease: easeOut },
  });

  return (
    <section id="hero" ref={sectionRef} className="grid-bg grid-shift" style={{
      position: "relative", minHeight: "100svh",
      display: "flex", alignItems: "center", overflow: "hidden",
    }}>
      <motion.div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none", x: bgX, y: bgY,
        background: "radial-gradient(ellipse 80% 55% at 50% 40%, rgba(91,141,238,0.07) 0%, transparent 65%)",
      }} />
      <div className="hero-orb hero-orb-left" aria-hidden />
      <div className="hero-orb hero-orb-right" aria-hidden />
      <HeroLight lightX={lightX} lightY={lightY} />

      <div className="container" style={{ position: "relative", zIndex: 1, width: "100%", paddingTop: 120, paddingBottom: 80 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }} className="hero-grid">
          <motion.div style={{ x: txtX, y: txtY, position: "relative", zIndex: 1 }}>
            <motion.h1 className="display-xl" style={{ marginBottom: 20, position: "relative", zIndex: 1 }}>
              <motion.span
                className="gradient-text-animated"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.16, ease: easeOut }}
                style={{ display: "inline-block" }}
              >
                Lasya Sri
              </motion.span>
              <br />
              <motion.span
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.32, ease: easeOut }}
                style={{ color: "rgba(238,242,255,0.88)", display: "inline-block" }}
              >
                Yerramsetti
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.42, duration: 0.5, ease: easeOut }}
              style={{
                fontSize: "clamp(19px, 2vw, 25px)",
                fontWeight: 400,
                color: "var(--text-2)",
                fontFamily: "var(--font-sans)",
                letterSpacing: "-0.01em",
                marginBottom: 16,
                position: "relative",
                zIndex: 1,
              }}
            >
              AI Builder • Product Engineer • Systems Thinker
            </motion.p>

            <motion.p {...fadeUp(0.5)} className="body-lg" style={{ maxWidth: 440, marginBottom: 36, position: "relative", zIndex: 1 }}>
              I design and ship AI systems that turn real problems into measurable value —
              from ML pipelines and agentic workflows to full-stack products built for users,
              teams, and decision-makers.{" "}
              <strong style={{ color: "var(--gold)", fontWeight: 600 }}>
                HackOn with Amazon 6.0 — Student Builder Challenge winner.
              </strong>
            </motion.p>

            <motion.div {...fadeUp(0.58)} style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 48, position: "relative", zIndex: 1 }}>
              <Magnetic strength={8}>
                <motion.a
                  href="#projects"
                  className="btn-has-arrow hero-primary-btn"
                  whileHover={{ scale: 1.03, boxShadow: "0 12px 32px rgba(91,141,238,0.35)" }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    padding: "12px 26px", borderRadius: 10,
                    color: "#fff",
                    fontSize: 14, fontWeight: 700, letterSpacing: "0.02em",
                    textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8,
                  }}
                >
                  See my builds <span className="btn-arrow">→</span>
                </motion.a>
              </Magnetic>

              <Magnetic strength={6}>
                <CueLink
                  href={profile.github}
                  cue="OPENING CODE SPACE ↗"
                  className="btn-has-arrow"
                  style={{
                    padding: "12px 20px", borderRadius: 10,
                    border: "1px solid var(--border-md)", color: "var(--text-2)",
                    fontSize: 14, fontWeight: 500, textDecoration: "none",
                    display: "inline-flex", alignItems: "center", gap: 7,
                    background: "rgba(8,13,24,0.72)", backdropFilter: "blur(12px)",
                  }}
                >
                  <GithubIcon /> GitHub <span className="btn-arrow out">↗</span>
                </CueLink>
              </Magnetic>

              <Magnetic strength={6}>
                <CueLink
                  href={profile.linkedin}
                  cue="ENTERING NETWORK ↗"
                  className="btn-has-arrow"
                  style={{
                    padding: "12px 20px", borderRadius: 10,
                    border: "1px solid var(--border-md)", color: "var(--text-2)",
                    fontSize: 14, fontWeight: 500, textDecoration: "none",
                    display: "inline-flex", alignItems: "center", gap: 7,
                    background: "rgba(8,13,24,0.72)", backdropFilter: "blur(12px)",
                  }}
                >
                  <LinkedinIcon /> LinkedIn <span className="btn-arrow out">↗</span>
                </CueLink>
              </Magnetic>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.68, duration: 0.4 }}
              style={{ display: "flex", alignItems: "center", position: "relative", zIndex: 1 }}
            >
              {[
                { label: "CGPA",     value: "9.32" },
                { label: "LEETCODE", value: "550+" },
                { label: "PROJECTS", value: "5+"   },
              ].map((s, i) => (
                <div key={s.label} style={{ display: "flex", alignItems: "center" }}>
                  <div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-3)", letterSpacing: "0.14em", marginBottom: 5 }}>
                      {s.label}
                    </div>
                    <div className="counter-text" style={{
                      fontFamily: "var(--font-sans)", fontSize: 30, fontWeight: 800,
                      letterSpacing: "-0.025em", color: "var(--text-1)", lineHeight: 1,
                    }}>
                      <CountUp value={s.value} />
                    </div>
                  </div>
                  {i < 2 && <div style={{ width: 1, height: 36, background: "var(--border-md)", margin: "0 28px" }} />}
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.22, ease: easeOut }}
            className="hidden md:block"
            style={{ x: visX, y: visY }}
          >
            <TiltCard>
              <div className="glow-border-blue shimmer" style={{
                position: "relative", borderRadius: 22,
                overflow: "hidden", height: 460,
                background: "rgba(13,20,36,0.6)",
                border: "1px solid rgba(91,141,238,0.16)",
              }}>
                <div className="scan-line" />
                <div style={{
                  position: "absolute", top: 18, left: 20, zIndex: 2,
                  display: "flex", alignItems: "center", gap: 8,
                }}>
                  <div style={{
                    width: 6, height: 6, borderRadius: "50%",
                    background: "var(--blue)", boxShadow: "0 0 10px var(--blue)",
                    animation: "live-pulse 2s ease-in-out infinite",
                  }} />
                  <span className="section-eyebrow scramble-label">SKILL GRAPH</span>
                </div>
                <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
                <div style={{
                  position: "absolute", bottom: 14, right: 16,
                  fontFamily: "var(--font-mono)", fontSize: 10,
                  color: "var(--text-3)", letterSpacing: "0.1em",
                }}>
                  HOVER TO INTERACT
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.85 }}
        style={{
          position: "absolute", bottom: 32, left: "50%",
          transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        }}
      >
        <span className="section-eyebrow">SCROLL</span>
        <motion.div
          animate={reduced ? undefined : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.1, ease: "easeInOut" }}
          style={{ width: 1, height: 30, background: "linear-gradient(to bottom, var(--text-3), transparent)" }}
        />
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 0 !important; }
        }
      `}</style>
    </section>
  );
}

function HeroLight({
  lightX,
  lightY,
}: {
  lightX: ReturnType<typeof useTransform<number, number>>;
  lightY: ReturnType<typeof useTransform<number, number>>;
}) {
  return (
    <motion.div
      aria-hidden
      style={{
        position: "absolute",
        width: 420,
        height: 320,
        marginLeft: -210,
        marginTop: -160,
        borderRadius: "50%",
        pointerEvents: "none",
        left: useTransform(lightX, (v) => `${v}%`),
        top: useTransform(lightY, (v) => `${v}%`),
        background: "radial-gradient(circle, rgba(91,141,238,0.09) 0%, transparent 70%)",
        filter: "blur(12px)",
      }}
    />
  );
}
