import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.ts"],
  theme: {
    extend: {
      colors: {
        void: "#050507",
        coal: "#0b0c10",
        graphite: "#14161c",
        steel: "#22252e",
        silver: "#c9ced8",
        chrome: "#eef1f6",
        volt: "#2d7bff",
        crimson: "#d3213b",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: { wider2: "0.28em" },
    },
  },
  plugins: [],
};
export default config;