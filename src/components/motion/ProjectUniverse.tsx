"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { projects } from "@/data/portfolio";
import { easeOut } from "@/lib/motion";
import { useMotionEnabled } from "@/hooks/useMediaFlags";

const POS: Record<string, { x: number; y: number }> = {
  adspark: { x: 18, y: 46 },
  bhumitra: { x: 38, y: 22 },
  "fraud-sms": { x: 62, y: 28 },
  "prompt-dojo": { x: 82, y: 52 },
  crewhire: { x: 50, y: 72 },
};

function sharedSkills(a: string, b: string) {
  const pa = projects.find((p) => p.id === a);
  const pb = projects.find((p) => p.id === b);
  if (!pa || !pb) return [];
  return pa.skills.filter((s) => pb.skills.includes(s));
}

const EDGES: [string, string][] = [
  ["adspark", "prompt-dojo"],
  ["adspark", "crewhire"],
  ["prompt-dojo", "crewhire"],
  ["fraud-sms", "bhumitra"],
  ["adspark", "bhumitra"],
];

export default function ProjectUniverse({
  active,
  onSelect,
}: {
  active: string;
  onSelect: (id: string) => void;
}) {
  const [hover, setHover] = useState<string | null>(null);
  const { pointerFx, reduced } = useMotionEnabled();
  const focus = hover ?? active;

  const relatedTech = useMemo(() => {
    const p = projects.find((x) => x.id === focus);
    return p?.skills.slice(0, 4) ?? [];
  }, [focus]);

  return (
    <div
      className="universe-wrap"
      style={{
        position: "relative",
        height: 220,
        marginBottom: 36,
        borderRadius: 18,
        border: "1px solid var(--border)",
        background: "rgba(13,20,36,0.4)",
        overflow: "hidden",
      }}
    >
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        {EDGES.map(([a, b]) => {
          const pa = POS[a];
          const pb = POS[b];
          const lit = focus === a || focus === b;
          return (
            <motion.line
              key={`${a}-${b}`}
              x1={pa.x}
              y1={pa.y}
              x2={pb.x}
              y2={pb.y}
              stroke={lit ? "rgba(91,141,238,0.55)" : "rgba(91,141,238,0.14)"}
              strokeWidth={lit ? 0.45 : 0.25}
              vectorEffect="non-scaling-stroke"
              initial={false}
              animate={{ opacity: lit ? 1 : 0.55 }}
            />
          );
        })}
      </svg>

      {projects.map((p, i) => {
        const pos = POS[p.id];
        if (!pos) return null;
        const isActive = active === p.id;
        const isHover = hover === p.id;
        const dim = hover && hover !== p.id && active !== p.id;
        const away = isActive && hover && hover !== p.id ? 1.4 : 0;
        const dx = (pos.x - 50) / 50 * away;
        const dy = (pos.y - 50) / 50 * away;

        return (
          <div
            key={p.id}
            style={{
              position: "absolute",
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              transform: "translate(-50%, -50%)",
              zIndex: isActive || isHover ? 2 : 1,
            }}
          >
          <motion.button
            data-cursor="project"
            onClick={() => onSelect(p.id)}
            onMouseEnter={() => pointerFx && setHover(p.id)}
            onMouseLeave={() => setHover(null)}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{
              opacity: dim ? 0.35 : 1,
              scale: isHover || isActive ? 1.08 : 1,
              x: reduced ? 0 : dx,
              y: reduced ? 0 : dy,
            }}
            transition={{ duration: 0.35, delay: i * 0.05, ease: easeOut }}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
            }}
            aria-label={`Open ${p.title}`}
          >
            <span
              className={isActive ? "universe-node active" : "universe-node"}
              style={{
                width: isActive ? 14 : 10,
                height: isActive ? 14 : 10,
                borderRadius: "50%",
                background: isActive || isHover ? p.accentColor : "rgba(91,141,238,0.35)",
                boxShadow: isActive || isHover ? `0 0 16px ${p.accentColor}88` : "0 0 8px rgba(91,141,238,0.25)",
                border: "1px solid rgba(255,255,255,0.2)",
                display: "block",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: "0.08em",
                color: isActive || isHover ? "var(--text-1)" : "var(--text-3)",
                whiteSpace: "nowrap",
              }}
            >
              {p.title}
            </span>
          </motion.button>
          </div>
        );
      })}

      <div
        style={{
          position: "absolute",
          bottom: 10,
          left: 16,
          display: "flex",
          gap: 6,
          flexWrap: "wrap",
          maxWidth: "70%",
        }}
      >
        {relatedTech.map((t) => (
          <motion.span
            key={t}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="tag"
            style={{ fontSize: 9, padding: "2px 7px" }}
          >
            {t}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

export { sharedSkills };
