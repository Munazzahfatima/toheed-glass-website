import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        teal: {
          DEFAULT: "#0e6b6b",
          light:   "#138080",
          dark:    "#0a5050",
        },
        navy: {
          DEFAULT: "#0a2540",
          light:   "#0f3460",
          dark:    "#061828",
        },
        gold: {
          DEFAULT: "#c8963e",
          light:   "#d9ac5a",
          dark:    "#a87830",
        },
        cream: {
          DEFAULT: "#faf8f5",
          dark:    "#f0ece4",
        },
        slate: {
          50:  "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        sans:  ["DM Sans", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, #061828 0%, #0a2540 45%, #0e3d3d 100%)",
        "teal-gradient": "linear-gradient(135deg, #0a5050 0%, #0e6b6b 100%)",
        "gold-gradient": "linear-gradient(135deg, #a87830 0%, #c8963e 100%)",
        "cream-gradient":"linear-gradient(180deg, #faf8f5 0%, #f0ece4 100%)",
      },
      boxShadow: {
        soft:  "0 2px 20px rgba(10,37,64,0.06)",
        lift:  "0 12px 40px rgba(10,37,64,0.12)",
        teal:  "0 8px 24px rgba(14,107,107,0.30)",
        gold:  "0 8px 24px rgba(200,150,62,0.30)",
        glow:  "0 0 40px rgba(14,107,107,0.15)",
      },
      borderRadius: {
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};

export default config;
