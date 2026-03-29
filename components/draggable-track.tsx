"use client";

import { motion, useAnimationFrame, useMotionValue, useReducedMotion } from "framer-motion";
import { Children, type ReactNode, useEffect, useMemo, useRef, useState } from "react";

type DraggableTrackProps = {
  children: ReactNode;
  className?: string;
  hint?: string;
  autoScroll?: boolean;
};

export function DraggableTrack({ children, className = "", hint = "Drag to explore", autoScroll = false }: DraggableTrackProps) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const setRef = useRef<HTMLDivElement | null>(null);
  const hoveredRef = useRef(false);
  const x = useMotionValue(0);
  const [maxDrag, setMaxDrag] = useState(0);
  const [setWidth, setSetWidth] = useState(0);
  const [dragging, setDragging] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const items = useMemo(() => Children.toArray(children), [children]);
  const shouldLoop = autoScroll && !prefersReducedMotion && items.length > 1;

  useEffect(() => {
    const update = () => {
      const viewportWidth = viewportRef.current?.offsetWidth ?? 0;
      const trackWidth = trackRef.current?.scrollWidth ?? 0;
      const singleSetWidth = setRef.current?.scrollWidth ?? 0;
      setMaxDrag(Math.max(0, trackWidth - viewportWidth));
      setSetWidth(singleSetWidth);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [items.length]);

  useEffect(() => {
    if (x.get() < -maxDrag) x.set(-maxDrag);
  }, [maxDrag, x]);

  useAnimationFrame((_, delta) => {
    if (!autoScroll || prefersReducedMotion || dragging || hoveredRef.current || maxDrag <= 0) return;
    const next = x.get() - delta * 0.022;

    if (shouldLoop && setWidth > 0) {
      if (next <= -setWidth) {
        x.set(next + setWidth);
        return;
      }
      if (next >= 0) {
        x.set(next - setWidth);
        return;
      }
    }

    x.set(Math.max(-maxDrag, Math.min(0, next)));
  });

  const onHover = (value: boolean) => {
    hoveredRef.current = value;
  };

  return (
    <div
      ref={viewportRef}
      className={`group relative overflow-hidden rounded-[1.4rem] border border-white/12 bg-surface/75 ${dragging ? "cursor-grabbing" : "cursor-grab"} ${className}`}
      data-cursor="drag"
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-14 bg-gradient-to-r from-[#0b0b0b] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 bg-gradient-to-l from-[#0b0b0b] to-transparent" />

      <motion.p
        className="pointer-events-none absolute right-4 top-4 z-20 rounded-full border border-active/35 bg-[#0f0f0f]/80 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-active"
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: dragging || hoveredRef.current ? 1 : 0.36, y: 0 }}
      >
        {hint}
      </motion.p>

      <motion.div
        ref={trackRef}
        style={{ x }}
        className="flex w-max gap-4 p-4 md:gap-6 md:p-6"
        drag={prefersReducedMotion ? false : "x"}
        dragConstraints={{ left: shouldLoop && setWidth > 0 ? -setWidth : -maxDrag, right: 0 }}
        dragMomentum={!prefersReducedMotion}
        dragElastic={0.08}
        onDragStart={() => setDragging(true)}
        onDragEnd={() => {
          setDragging(false);
          if (shouldLoop && setWidth > 0) {
            const current = x.get();
            if (current <= -setWidth) x.set(current + setWidth);
            if (current > 0) x.set(current - setWidth);
          }
        }}
      >
        <div ref={setRef} className="flex w-max gap-4 md:gap-6">
          {items}
        </div>
        {shouldLoop ? <div className="flex w-max gap-4 md:gap-6">{items}</div> : null}
      </motion.div>
    </div>
  );
}

