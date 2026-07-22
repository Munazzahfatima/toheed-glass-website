import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0B2D5B",
          light: "#123B73",
          dark: "#081F3E",
        },
        gold: {
          DEFAULT: "#D4A64A",
          light: "#E4C077",
          dark: "#B8873A",
        },
      },
      fontFamily: {
        serif: ["Raleway", "sans-serif"],
        sans: ["Lato", "sans-serif"],
      },
      backgroundImage: {
        "glass-gradient":
          "linear-gradient(135deg, rgba(11,45,91,0.06) 0%, rgba(212,166,74,0.08) 100%)",
        "dark-glass": "linear-gradient(135deg, #081F3E 0%, #0B2D5B 50%, #123B73 100%)",
      },
      boxShadow: {
        luxury: "0 4px 24px rgba(11,45,91,0.08)",
        gold: "0 8px 30px rgba(212,166,74,0.35)",
        card: "0 2px 16px rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
