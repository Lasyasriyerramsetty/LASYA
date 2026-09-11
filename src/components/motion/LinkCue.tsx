"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useMediaFlags";
import { easeOut } from "@/lib/motion";

type Cue = { text: string } | null;

const CueCtx = createContext<(href: string, text: string, target?: string) => void>(() => {});

export function useExternalCue() {
  return useContext(CueCtx);
}

export default function LinkCueProvider({ children }: { children: React.ReactNode }) {
  const [cue, setCue] = useState<Cue>(null);
  const reduced = useReducedMotion();
  const lock = useRef(false);

  const trigger = useCallback(
    (href: string, text: string, target = "_blank") => {
      if (reduced || lock.current) {
        if (target === "_blank") window.open(href, "_blank", "noopener,noreferrer");
        else window.location.href = href;
        return;
      }
      lock.current = true;
      setCue({ text });
      window.setTimeout(() => {
        if (target === "_blank") window.open(href, "_blank", "noopener,noreferrer");
        else window.location.href = href;
        setCue(null);
        lock.current = false;
      }, 260);
    },
    [reduced]
  );

  return (
    <CueCtx.Provider value={trigger}>
      {children}
      <AnimatePresence>
        {cue && (
          <motion.div
            key={cue.text}
            initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: easeOut }}
            style={{
              position: "fixed",
              bottom: 28,
              left: "50%",
              x: "-50%",
              zIndex: 90,
              pointerEvents: "none",
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.16em",
              color: "var(--text-1)",
              padding: "8px 14px",
              borderRadius: 999,
              background: "rgba(13,20,36,0.88)",
              border: "1px solid var(--border-md)",
              backdropFilter: "blur(12px)",
            }}
          >
            {cue.text}
          </motion.div>
        )}
      </AnimatePresence>
    </CueCtx.Provider>
  );
}

export function CueLink({
  href,
  cue,
  children,
  className,
  style,
  external = true,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { cue: string; external?: boolean }) {
  const trigger = useExternalCue();
  return (
    <a
      {...rest}
      href={href}
      className={className}
      style={style}
      data-cursor={external ? "external" : "link"}
      onClick={(e) => {
        rest.onClick?.(e);
        if (e.defaultPrevented) return;
        if (!href) return;
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        trigger(href, cue, external ? "_blank" : "_self");
      }}
    >
      {children}
    </a>
  );
}
