"use client";

import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode, useEffect, useRef, useState } from "react";

type DraggableTrackProps = {
  children: ReactNode;
  className?: string;
};

export function DraggableTrack({ children, className = "" }: DraggableTrackProps) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [maxDrag, setMaxDrag] = useState(0);
  const [dragging, setDragging] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const update = () => {
      const viewportWidth = viewportRef.current?.offsetWidth ?? 0;
      const trackWidth = trackRef.current?.scrollWidth ?? 0;
      setMaxDrag(Math.max(0, trackWidth - viewportWidth));
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div
      ref={viewportRef}
      className={`overflow-hidden rounded-2xl border border-white/10 bg-surface/70 ${dragging ? "cursor-grabbing" : "cursor-grab"} ${className}`}
      data-cursor="drag"
    >
      <motion.div
        ref={trackRef}
        className="flex w-max gap-4 p-4 md:gap-6 md:p-6"
        drag={prefersReducedMotion ? false : "x"}
        dragConstraints={{ left: -maxDrag, right: 0 }}
        dragMomentum={!prefersReducedMotion}
        onDragStart={() => setDragging(true)}
        onDragEnd={() => setDragging(false)}
      >
        {children}
      </motion.div>
    </div>
  );
}
