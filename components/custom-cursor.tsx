"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type CursorMode = "default" | "link" | "card" | "drag";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<CursorMode>("default");
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const smoothX = useSpring(x, { stiffness: 520, damping: 42, mass: 0.2 });
  const smoothY = useSpring(y, { stiffness: 520, damping: 42, mass: 0.2 });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const media = window.matchMedia("(pointer: fine)");
    const update = () => setEnabled(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      const target = event.target as HTMLElement | null;
      const cursorType = target?.closest("[data-cursor]")?.getAttribute("data-cursor") as CursorMode | null;
      setMode(cursorType ?? "default");
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [enabled, x, y]);

  const config = useMemo(() => {
    if (mode === "drag") return { size: 74, bg: "rgba(208,255,0,0.17)", border: "rgba(208,255,0,0.65)", label: "Drag" };
    if (mode === "link") return { size: 44, bg: "rgba(201,106,43,0.24)", border: "rgba(201,106,43,0.85)", label: "" };
    if (mode === "card") return { size: 56, bg: "rgba(255,255,255,0.08)", border: "rgba(255,255,255,0.55)", label: "" };
    return { size: 24, bg: "rgba(255,255,255,0.06)", border: "rgba(255,255,255,0.35)", label: "" };
  }, [mode]);

  if (!enabled || prefersReducedMotion) {
    return null;
  }

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[80] hidden md:block"
      style={{ x: smoothX, y: smoothY }}
      animate={{ width: config.size, height: config.size, marginLeft: -config.size / 2, marginTop: -config.size / 2 }}
      transition={{ type: "spring", stiffness: 320, damping: 28 }}
    >
      <div
        className="flex h-full w-full items-center justify-center rounded-full border text-[10px] uppercase tracking-[0.2em] text-text"
        style={{ background: config.bg, borderColor: config.border }}
      >
        {config.label}
      </div>
    </motion.div>
  );
}
