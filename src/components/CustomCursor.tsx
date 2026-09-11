"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useMediaFlags";

type Mode = "default" | "link" | "project" | "external" | "drag";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const cur = useRef({ x: 0, y: 0 });
  const [mode, setMode] = useState<Mode>("default");
  const [on, setOn] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (window.matchMedia("(hover: none)").matches) return;
    setOn(true);
    document.body.classList.add("cursor-on");

    const move = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
    };

    const enter = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      if (t.closest("[data-cursor='project']")) setMode("project");
      else if (t.closest("[data-cursor='external']")) setMode("external");
      else if (t.closest("[data-cursor='drag']")) setMode("drag");
      else if (t.closest("a, button, [data-cursor='link']")) setMode("link");
      else setMode("default");
    };

    let raf = 0;
    const loop = () => {
      cur.current.x += (pos.current.x - cur.current.x) * 0.22;
      cur.current.y += (pos.current.y - cur.current.y) * 0.22;
      const d = dotRef.current;
      const r = ringRef.current;
      if (d) d.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      if (r) r.style.transform = `translate3d(${cur.current.x}px, ${cur.current.y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", enter);
    return () => {
      document.body.classList.remove("cursor-on");
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", enter);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  if (!on) return null;

  const label = mode === "project" ? "VIEW" : mode === "external" ? "↗" : mode === "drag" ? "DRAG" : "";

  return (
    <>
      <div ref={dotRef} className={`cursor-dot ${mode}`} />
      <div ref={ringRef} className={`cursor-ring ${mode}`}>
        <span ref={labelRef} className="cursor-label">
          {label}
        </span>
      </div>
    </>
  );
}
