"use client";

import { useEffect, useState } from "react";
import { hasFinePointer, prefersReducedMotion } from "@/lib/motion";

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

export function useFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return fine;
}

export function useMotionEnabled() {
  const reduced = useReducedMotion();
  const fine = useFinePointer();
  return { reduced, fine, motion: !reduced, pointerFx: !reduced && fine };
}

export function getInitialFlags() {
  return { reduced: prefersReducedMotion(), fine: hasFinePointer() };
}
