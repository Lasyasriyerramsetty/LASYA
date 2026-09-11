"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform, type MotionValue } from "framer-motion";
import { profile, education } from "@/data/portfolio";
import { RevealHeading } from "@/components/motion/Reveal";
import CountUp from "@/components/motion/CountUp";
import { easeOut } from "@/lib/motion";

const steps = [
  { n: "01", title: "OBSERVE",    desc: "What problem actually exists in the wild?" },
  { n: "02", title: "UNDERSTAND", desc: "Who is affected and what does it cost them?" },
  { n: "03", title: "DECOMPOSE",  desc: "Break it into solvable sub-problems." },
  { n: "04", title: "EXPERIMENT", desc: "Prototype fast, fail cheap." },
  { n: "05", title: "BUILD",      desc: "Ship something that works." },
  { n: "06", title: "TEST",       desc: "Does it actually solve the original problem?" },
  { n: "07", title: "IMPROVE",    desc: "Iterate until it's worth shipping to the world." },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({
    target: processRef,
    offset: ["start 0.75", "end 0.45"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="about" ref={ref} className="section">
      <div className="container">

        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <p className="section-eyebrow" style={{ marginBottom: 14 }}>05 — ABOUT</p>
          <h2 className="display-lg" style={{ color: "var(--text-1)" }}>
            <RevealHeading text="How I Think" className="display-lg" />
          </h2>
        </motion.div>

        <div className="grid-2col">

          {/* ── process ── */}
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.15 }}
          >
            <p style={{
              fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-3)",
              letterSpacing: "0.16em", marginBottom: 22,
            }}>MY PROCESS</p>

            <div ref={processRef} style={{ position: "relative" }}>
              <motion.div
                style={{
                  position: "absolute",
                  left: 16,
                  top: 18,
                  bottom: 18,
                  width: 1,
                  background: "linear-gradient(to bottom, rgba(91,141,238,0.55), rgba(91,141,238,0.08))",
                  transformOrigin: "top",
                  scaleY: lineScale,
                }}
              />
              {steps.map((s, i) => (
                <ProcessStep key={s.n} s={s} i={i} inView={inView} progress={scrollYProgress} />
              ))}
            </div>
          </motion.div>

          {/* ── profile + education ── */}
          <motion.div
            initial={{ opacity: 0, x: 18 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.22 }}
            style={{ display: "flex", flexDirection: "column", gap: 18 }}
          >
            {/* profile card */}
            <motion.div
              whileHover={{ borderColor: "var(--border-md)" }}
              style={{
                padding: "24px",
                borderRadius: 16,
                border: "1px solid var(--border)",
                background: "rgba(13,20,36,0.52)",
                backdropFilter: "blur(14px)",
                transition: "border-color 0.22s",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                <motion.img
                  src={profile.avatar}
                  alt={profile.name}
                  whileHover={{ scale: 1.04 }}
                  style={{
                    width: 52, height: 52, borderRadius: 12,
                    objectFit: "cover", border: "1px solid var(--border-md)",
                    transition: "transform 0.22s",
                  }}
                />
                <div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: "var(--text-1)", letterSpacing: "-0.01em" }}>
                    {profile.name}
                  </p>
                  <p style={{ fontSize: 12.5, color: "var(--text-3)", marginTop: 2 }}>{profile.location}</p>
                </div>
              </div>
              <p className="body-md" style={{ lineHeight: 1.7 }}>
                I&apos;m a CS sophomore who learns by shipping high-leverage systems. I don&apos;t just
                optimize models or polish interfaces — I connect data, intelligence, and product
                thinking to build solutions that work in the real world. From fraud detection to
                AI-driven marketing and risk intelligence tools, I build what creates measurable value.
              </p>
            </motion.div>

            {/* education */}
            <div>
              <p style={{
                fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-3)",
                letterSpacing: "0.16em", marginBottom: 12,
              }}>EDUCATION</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {education.map((edu, i) => (
                  <motion.div
                    key={edu.institution}
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.42 + i * 0.08, duration: 0.38 }}
                    whileHover={{ borderColor: "var(--border-md)", y: -1 }}
                    style={{
                      padding: "16px 18px", borderRadius: 11,
                      border: "1px solid var(--border)",
                      background: "rgba(255,255,255,0.02)",
                      display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12,
                      transition: "border-color 0.2s, transform 0.2s",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text-1)", lineHeight: 1.4, marginBottom: 3 }}>
                        {edu.institution}
                      </p>
                      <p style={{ fontSize: 11.5, color: "var(--text-3)" }}>{edu.degree}</p>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <p style={{
                        fontFamily: "var(--font-sans)", fontSize: 18, fontWeight: 800,
                        color: "var(--blue)", letterSpacing: "-0.02em",
                      }}>
                        <CountUp value={edu.gpa} />
                      </p>
                      <p style={{ fontSize: 10, color: "var(--text-3)", marginTop: 1, fontFamily: "var(--font-mono)" }}>GPA</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

function ProcessStep({
  s,
  i,
  inView,
  progress,
}: {
  s: (typeof steps)[number];
  i: number;
  inView: boolean;
  progress: MotionValue<number>;
}) {
  const start = i / Math.max(steps.length - 1, 1);
  const opacity = useTransform(progress, [Math.max(0, start - 0.14), start], [0.38, 1]);
  const nodeScale = useTransform(progress, [Math.max(0, start - 0.14), start], [0.9, 1]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.2 + i * 0.05, duration: 0.4, ease: easeOut }}
      style={{ display: "flex", gap: 14, paddingBottom: i < steps.length - 1 ? 10 : 0, position: "relative", zIndex: 1 }}
    >
      <motion.div
        style={{
          width: 34,
          height: 34,
          borderRadius: 9,
          background: "rgba(91,141,238,0.09)",
          border: "1px solid rgba(91,141,238,0.22)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-mono)",
          fontSize: 10.5,
          fontWeight: 700,
          color: "var(--blue)",
          flexShrink: 0,
          opacity,
          scale: nodeScale,
        }}
      >
        {s.n}
      </motion.div>
      <motion.div style={{ paddingTop: 5, opacity }}>
        <p style={{ fontSize: 12.5, fontWeight: 700, color: "var(--text-1)", letterSpacing: "0.04em", marginBottom: 2 }}>
          {s.title}
        </p>
        <p style={{ fontSize: 12.5, color: "var(--text-3)", lineHeight: 1.55 }}>{s.desc}</p>
      </motion.div>
    </motion.div>
  );
}
