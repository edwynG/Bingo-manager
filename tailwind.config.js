/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Kablammo: ["Kablammo", "sans-serif"],
        K2D: ["K2D", "sans-serif"],
      },
      spacing: {
        "calc-vh": "calc(100vh - 56px)",
      },
      screens: {
        "h-sm": { raw: "(min-height: 620px)" },
        "h-md": { raw: "(min-height: 820px)" },
        "h-lg": { raw: "(min-height: 1020px)" },
        "h-xl": { raw: "(min-height: 1220px)" },
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
