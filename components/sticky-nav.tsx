"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { NavItem } from "@/data/site";

type StickyNavProps = {
  items: NavItem[];
  activeId: string;
};

export function StickyNav({ items, activeId }: StickyNavProps) {
  const prefersReducedMotion = useReducedMotion();

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-canvas/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-3 md:px-8">
        <button
          className="text-sm font-semibold uppercase tracking-[0.18em] text-muted transition-colors hover:text-active"
          onClick={() => scrollToSection("hero")}
          data-cursor="link"
        >
          Hubery Wu
        </button>
        <ul className="hidden items-center gap-2 lg:flex">
          {items.map((item) => {
            const active = item.id === activeId;
            return (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  data-cursor="link"
                  className="group relative rounded-full px-3 py-1.5 text-xs uppercase tracking-[0.14em] text-muted transition-colors hover:text-text"
                >
                  <span>{item.label}</span>
                  <span
                    className={`absolute left-1/2 top-full mt-1 h-1 w-1 -translate-x-1/2 rounded-full transition-all ${
                      active ? "bg-active opacity-100" : "bg-accent opacity-0 group-hover:opacity-100"
                    }`}
                  />
                  {active ? (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full border border-active/60 bg-active/10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
