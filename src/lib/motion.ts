export const easeOut = [0.22, 1, 0.36, 1] as [number, number, number, number];
export const easeSoft = [0.16, 1, 0.3, 1] as [number, number, number, number];

export const springSoft = { type: "spring" as const, stiffness: 380, damping: 32, mass: 0.7 };
export const springSnap = { type: "spring" as const, stiffness: 520, damping: 28, mass: 0.55 };

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function hasFinePointer(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export function parseMetric(value: string): { num: number; prefix: string; suffix: string } | null {
  if (/[a-zA-Z]/.test(value) && !value.includes("%")) return null;
  const match = value.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);
  if (!match) return null;
  const num = parseFloat(match[2]);
  if (Number.isNaN(num)) return null;
  if (num >= 2000 && num <= 2100 && !value.includes("%") && !value.includes("+")) return null;
  return { num, prefix: match[1], suffix: match[3] };
}
