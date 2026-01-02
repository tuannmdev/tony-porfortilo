import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Retro gaming theme colors from design mockups
        primary: "#8c5a3c",
        "primary-hover": "#a06b4a",
        "bg-retro": "#ccb09c",
        "panel-retro": "#fef6e4",
        "border-retro": "#594030",
        "text-main": "#4a3426",
        "text-muted": "#7c6a5a",
        "accent-green": "#7ebc69",
        "accent-blue": "#5fcde4",
        "accent-red": "#d95763",
        "accent-yellow": "#d7b54a",
      },
      fontFamily: {
        display: ["VT323", "monospace"],
        mono: ["VT323", "monospace"],
        sans: ["VT323", "monospace"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        sm: "0.125rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
      boxShadow: {
        retro: "4px 4px 0px 0px rgba(89, 64, 48, 0.2)",
        "retro-card": "4px 4px 0px 0px rgba(89, 64, 48, 0.15)",
        "retro-btn": "3px 3px 0px 0px rgba(60, 40, 30, 1)",
        "retro-btn-hover": "1px 1px 0px 0px rgba(60, 40, 30, 1)",
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(89, 64, 48, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(89, 64, 48, 0.15) 1px, transparent 1px)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.6s ease-out",
        "bounce-gentle": "bounceGentle 2s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        bounceGentle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
