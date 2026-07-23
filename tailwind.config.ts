import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#1a3c6e", light: "#2a5298", dark: "#0f2348" },
        gold: { DEFAULT: "#e8a020", light: "#f0b840", dark: "#c8841a" },
      },
      fontFamily: {
        serif: ["'Playfair Display'", "Georgia", "serif"],
        sans:  ["'Inter'", "system-ui", "sans-serif"],
      },
      boxShadow: {
        luxury: "0 2px 20px rgba(26,60,110,0.08)",
        hover:  "0 8px 32px rgba(26,60,110,0.15)",
        gold:   "0 4px 20px rgba(232,160,32,0.30)",
      },
    },
  },
  plugins: [],
};
export default config;
