"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MOTION } from "@/lib/design-tokens";

type HeadingRevealProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  className?: string;
};

export function HeadingReveal({ eyebrow, title, subtitle, className }: HeadingRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const words = title.split(" ");

  return (
    <div className={className}>
      <motion.p
        className="mb-2 text-xs uppercase tracking-[0.22em] text-accent"
        initial={prefersReducedMotion ? undefined : { opacity: 0, y: 10 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ duration: 0.45 }}
      >
        {eyebrow}
      </motion.p>

      <h2 className="text-3xl font-semibold tracking-tight text-text md:text-5xl">
        {words.map((word, index) => (
          <span key={`${word}-${index}`} className="mr-[0.28em] inline-block overflow-hidden">
            <motion.span
              className="inline-block"
              initial={prefersReducedMotion ? undefined : { y: "110%", opacity: 0 }}
              whileInView={prefersReducedMotion ? undefined : { y: "0%", opacity: 1 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 0.66, delay: index * 0.06, ease: [0.18, 0.9, 0.2, 1] }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </h2>

      <motion.p
        className="mt-3 max-w-2xl text-sm leading-relaxed text-muted md:text-base"
        initial={prefersReducedMotion ? undefined : MOTION.subtitle.initial}
        whileInView={prefersReducedMotion ? undefined : MOTION.subtitle.inView}
        viewport={{ once: true, amount: 0.5 }}
        transition={MOTION.subtitle.transition}
      >
        {subtitle}
      </motion.p>
    </div>
  );
}
