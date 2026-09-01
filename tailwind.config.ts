import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "#F4F4F0",
          card: "#FFFFFF",
          border: "rgba(28, 29, 32, 0.08)",
          text: "#1C1D20",
          muted: "#71717A",
        },
        obsidian: {
          DEFAULT: "#141416",
          card: "#1C1D20",
          border: "rgba(255, 255, 255, 0.08)",
          text: "#F4F4F6",
          muted: "#8F9098",
        },
        status: {
          live: "#10B981",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Inter", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "marquee": "marquee 28s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
