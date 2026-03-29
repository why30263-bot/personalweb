"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { PlaceholderCard } from "@/data/site";

type PlaceholderCardItemProps = {
  item: PlaceholderCard;
  index?: number;
  compact?: boolean;
};

export function PlaceholderCardItem({ item, index = 0, compact = false }: PlaceholderCardItemProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.article
      data-cursor="card"
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-surface2/80 p-5 transition-colors duration-300 ${
        compact ? "min-h-[160px]" : "min-h-[220px]"
      }`}
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 18 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      whileHover={prefersReducedMotion ? undefined : { scale: 1.02, y: -6 }}
    >
      <span className="absolute inset-0 bg-gradient-to-br from-active/0 to-active/0 transition-all duration-300 group-hover:from-active/10 group-hover:to-transparent" />
      <div className="relative flex h-full flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-text">{item.title}</p>
          {item.badge ? (
            <span className="rounded-full border border-white/20 px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-muted transition-colors group-hover:border-active/60 group-hover:text-active">
              {item.badge}
            </span>
          ) : null}
        </div>
        <p className="text-sm leading-relaxed text-muted">{item.subtitle}</p>
        <div className="mt-auto flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-muted">
          <span>View</span>
          <motion.span
            transition={{ type: "spring", stiffness: 420, damping: 20 }}
            className="text-base"
            whileHover={prefersReducedMotion ? undefined : { x: 6, rotate: 4 }}
          >
            →
          </motion.span>
        </div>
      </div>
    </motion.article>
  );
}
