import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0B2D5B",
          light:   "#123B73",
          dark:    "#071D3D",
          50:      "#EEF3FA",
          100:     "#C9D8EF",
        },
        gold: {
          DEFAULT: "#C9982A",
          light:   "#DDB04E",
          dark:    "#A87820",
          50:      "#FDF6E7",
          100:     "#F5E0B0",
        },
        cream: {
          DEFAULT: "#FAFAF7",
          dark:    "#F0EDE4",
        },
      },
      fontFamily: {
        serif: ["'Playfair Display'", "Georgia", "serif"],
        sans:  ["'Inter'", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, #071D3D 0%, #0B2D5B 55%, #0F3468 100%)",
        "gold-gradient": "linear-gradient(135deg, #A87820 0%, #C9982A 100%)",
        "glass-gradient":"linear-gradient(135deg, rgba(11,45,91,0.04) 0%, rgba(201,152,42,0.06) 100%)",
      },
      boxShadow: {
        luxury: "0 4px 28px rgba(11,45,91,0.09)",
        hover:  "0 16px 48px rgba(11,45,91,0.15)",
        gold:   "0 8px 28px rgba(201,152,42,0.28)",
        glow:   "0 0 60px rgba(11,45,91,0.12)",
        inner:  "inset 0 1px 0 rgba(255,255,255,0.8)",
      },
    },
  },
  plugins: [],
};
export default config;
