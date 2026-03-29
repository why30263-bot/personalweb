"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

type MagneticButtonProps = {
  href: string;
  label: string;
  variant?: "primary" | "ghost";
};

export function MagneticButton({ href, label, variant = "primary" }: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const onMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
  };

  const onLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0px, 0px)";
  };

  const base =
    "group inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm tracking-wide transition-all duration-300";
  const skin =
    variant === "primary"
      ? "border-accent/70 bg-accent/90 text-base hover:border-active hover:bg-active hover:text-base"
      : "border-white/20 bg-white/5 text-text hover:border-active hover:bg-white/10";

  return (
    <motion.div whileHover={prefersReducedMotion ? undefined : { scale: 1.02, y: -2 }}>
      <Link
        ref={ref}
        href={href}
        className={`${base} ${skin}`}
        data-cursor="link"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        <span>{label}</span>
        <motion.span
          className="text-xs"
          initial={false}
          whileHover={prefersReducedMotion ? undefined : { x: 4, rotate: 3 }}
          transition={{ type: "spring", stiffness: 400, damping: 24 }}
        >
          ↗
        </motion.span>
      </Link>
    </motion.div>
  );
}
