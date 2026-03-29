"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { MOTION } from "@/lib/design-tokens";

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function SectionReveal({ children, className, delay = 0 }: SectionRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={MOTION.reveal.initial}
      whileInView={MOTION.reveal.inView}
      viewport={{ once: true, amount: 0.24 }}
      transition={{ ...MOTION.reveal.transition, delay }}
    >
      {children}
    </motion.div>
  );
}
