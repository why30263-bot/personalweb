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
    ref.current.style.transform = `translate(${x * 0.09}px, ${y * 0.09}px)`;
  };

  const onLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0px, 0px)";
  };

  const base =
    "group inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm tracking-wide transition-all duration-300";
  const skin =
    variant === "primary"
      ? "border-accent/80 bg-accent/90 text-[#111] hover:-translate-y-0.5 hover:border-active hover:bg-active hover:shadow-[0_10px_25px_rgba(208,255,0,0.18)]"
      : "border-white/25 bg-white/5 text-text hover:-translate-y-0.5 hover:border-active/70 hover:bg-white/10";

  return (
    <motion.div whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}>
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
          whileHover={prefersReducedMotion ? undefined : { x: 5, rotate: 4 }}
          transition={{ type: "spring", stiffness: 420, damping: 24 }}
        >
          ↗
        </motion.span>
      </Link>
    </motion.div>
  );
}
