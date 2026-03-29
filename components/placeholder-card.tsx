"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MOTION } from "@/lib/design-tokens";

type PlaceholderCard = {
  title: string;
  subtitle: string;
  badge?: string;
};

type PlaceholderCardItemProps = {
  item: PlaceholderCard;
  index?: number;
  compact?: boolean;
  scale?: "sm" | "md" | "lg";
  ctaLabel?: string;
};

const scaleMap = {
  sm: "min-h-[150px]",
  md: "min-h-[200px]",
  lg: "min-h-[245px]"
};

export function PlaceholderCardItem({
  item,
  index = 0,
  compact = false,
  scale = "md",
  ctaLabel = "View"
}: PlaceholderCardItemProps) {
  const prefersReducedMotion = useReducedMotion();
  const heightClass = compact ? "min-h-[150px]" : scaleMap[scale];

  return (
    <motion.article
      data-cursor="card"
      className={`group relative overflow-hidden rounded-[1.2rem] border border-white/12 bg-gradient-to-b from-white/[0.02] to-transparent p-5 backdrop-blur-sm transition-colors duration-300 ${heightClass}`}
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      whileHover={prefersReducedMotion ? undefined : MOTION.cardHover.whileHover}
    >
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_10%_15%,rgba(201,106,43,0.16),transparent_48%)] opacity-0 transition-all duration-500 group-hover:opacity-100" />
      <span className="absolute inset-0 bg-gradient-to-tr from-active/0 via-active/0 to-active/0 transition-all duration-500 group-hover:from-active/10 group-hover:to-transparent" />
      <div className="relative flex h-full flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-text transition-colors group-hover:text-[#fff8ec]">{item.title}</p>
          {item.badge ? (
            <span className="rounded-full border border-white/20 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-muted transition-all group-hover:border-active/70 group-hover:text-active">
              {item.badge}
            </span>
          ) : null}
        </div>
        <p className="text-sm leading-relaxed text-muted transition-colors group-hover:text-[#d8d1c6]">{item.subtitle}</p>
        <div className="mt-auto flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-muted">
          <span>{ctaLabel}</span>
          <motion.span
            className="text-base"
            animate={undefined}
            whileHover={prefersReducedMotion ? undefined : { x: 8, rotate: 6 }}
            transition={MOTION.arrow.transition}
          >
            →
          </motion.span>
        </div>
      </div>
      <span className="pointer-events-none absolute inset-0 rounded-[1.2rem] ring-1 ring-transparent transition-all duration-300 group-hover:ring-active/40 group-hover:shadow-[0_0_0_1px_rgba(208,255,0,0.12),0_18px_40px_rgba(0,0,0,0.45)]" />
    </motion.article>
  );
}
