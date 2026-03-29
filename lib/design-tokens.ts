export const MOTION = {
  reveal: {
    initial: { opacity: 0, y: 20 },
    inView: { opacity: 1, y: 0 },
    transition: { duration: 0.75, ease: [0.2, 0.95, 0.2, 1] as [number, number, number, number] }
  },
  subtitle: {
    initial: { opacity: 0, y: 14 },
    inView: { opacity: 1, y: 0 },
    transition: { duration: 0.95, ease: [0.18, 0.9, 0.2, 1] as [number, number, number, number] }
  },
  cardHover: {
    whileHover: { y: -7, scale: 1.02 },
    transition: { type: "spring", stiffness: 280, damping: 24, mass: 0.72 }
  },
  arrow: {
    transition: { type: "spring", stiffness: 420, damping: 24 }
  },
  cursorRing: { stiffness: 980, damping: 54, mass: 0.12 },
  cursorDot: { stiffness: 1400, damping: 64, mass: 0.06 }
};

export const DESIGN = {
  colors: {
    canvas: "#0b0b0b",
    surface: "#121212",
    surface2: "#171717",
    textPrimary: "#f4efe6",
    textSecondary: "#c8c2b8",
    accent: "#c96a2b",
    active: "#d0ff00",
    ink: "#111111"
  }
};

export const CHIP_WIDTHS = [
  "min-w-[130px]",
  "min-w-[152px]",
  "min-w-[185px]",
  "min-w-[118px]",
  "min-w-[170px]",
  "min-w-[140px]"
];

