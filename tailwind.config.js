/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        base: "#0b0b0b",
        surface: "#121212",
        surface2: "#171717",
        text: "#f4efe6",
        muted: "#c8c2b8",
        accent: "#c96a2b",
        active: "#d0ff00"
      },
      boxShadow: {
        card: "0 12px 32px rgba(0, 0, 0, 0.35)",
        glow: "0 0 0 1px rgba(208,255,0,0.25), 0 12px 34px rgba(208,255,0,0.12)"
      }
    }
  },
  plugins: []
};
