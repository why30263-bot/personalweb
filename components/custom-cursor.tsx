"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { MOTION } from "@/lib/design-tokens";

type CursorMode = "default" | "link" | "card" | "drag";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<CursorMode>("default");
  const [pressed, setPressed] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, MOTION.cursorRing);
  const ringY = useSpring(y, MOTION.cursorRing);
  const dotX = useSpring(x, MOTION.cursorDot);
  const dotY = useSpring(y, MOTION.cursorDot);
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

    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, [enabled, x, y]);

  const config = useMemo(() => {
    if (mode === "drag") return { ring: 74, border: "rgba(208,255,0,0.9)", fill: "rgba(208,255,0,0.12)", label: "Drag" };
    if (mode === "link") return { ring: 46, border: "rgba(201,106,43,0.88)", fill: "rgba(201,106,43,0.22)", label: "" };
    if (mode === "card") return { ring: 58, border: "rgba(255,255,255,0.62)", fill: "rgba(255,255,255,0.09)", label: "" };
    return { ring: 28, border: "rgba(255,255,255,0.4)", fill: "rgba(255,255,255,0.05)", label: "" };
  }, [mode]);

  if (!enabled || prefersReducedMotion) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[80] hidden md:block"
        style={{ x: ringX, y: ringY }}
        animate={{
          width: config.ring,
          height: config.ring,
          marginLeft: -config.ring / 2,
          marginTop: -config.ring / 2,
          scale: pressed ? 0.9 : 1
        }}
        transition={{ type: "spring", stiffness: 420, damping: 30 }}
      >
        <div
          className="flex h-full w-full items-center justify-center rounded-full border text-[10px] uppercase tracking-[0.2em] text-text"
          style={{ borderColor: config.border, background: config.fill }}
        >
          {config.label}
        </div>
      </motion.div>

      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[81] hidden md:block"
        style={{ x: dotX, y: dotY }}
        animate={{ scale: pressed ? 0.75 : 1 }}
      >
        <span className="block h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-text" />
      </motion.div>
    </>
  );
}
