/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#FFF7ED",
          100: "#FFEDD5",
          200: "#FED7AA",
          300: "#FDBA74",
          400: "#FB923C",
          500: "#EA580C",
          600: "#C2410C",
          700: "#9A3412",
          800: "#7C2D12",
          900: "#431407",
        },
        gold: {
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
        },
        ink: {
          700: "#44403C",
          800: "#292524",
          900: "#1C1917",
          950: "#0C0A09",
        },
        sand: {
          50: "#FDFBF7",
          100: "#FAF6EF",
          200: "#F3EAD9",
          300: "#E7D8BE",
        },
      },
      fontFamily: {
        display: ['"Fraunces"', '"Georgia"', "serif"],
        sans: ['"Inter"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(28,25,23,.06), 0 8px 24px -12px rgba(28,25,23,.18)",
        pop: "0 12px 40px -12px rgba(194,65,12,.35)",
        glow: "0 0 0 4px rgba(234,88,12,.12)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        "eq-1": { "0%,100%": { height: "8px" }, "50%": { height: "26px" } },
        "eq-2": { "0%,100%": { height: "20px" }, "50%": { height: "8px" } },
        "eq-3": { "0%,100%": { height: "12px" }, "50%": { height: "30px" } },
        pulseRing: { "0%": { transform: "scale(1)", opacity: ".6" }, "100%": { transform: "scale(1.6)", opacity: "0" } },
        floaty: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } },
      },
      animation: {
        "eq-1": "eq-1 1s ease-in-out infinite",
        "eq-2": "eq-2 1.1s ease-in-out infinite",
        "eq-3": "eq-3 .9s ease-in-out infinite",
        floaty: "floaty 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
