/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/ui/**/*.{js,ts,jsx,tsx}",
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: ({ theme }) => ({
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "vc-border-gradient": `radial-gradient(at left top, ${theme(
          "colors.gray.500"
        )}, 50px, ${theme("colors.gray.800")} 50%)`,
      }),
      keyframes: ({ theme }) => ({
        rerender: {
          "0%": {
            ["border-color"]: theme("colors.vercel.pink"),
          },
          "40%": {
            ["border-color"]: theme("colors.vercel.pink"),
          },
        },
        highlight: {
          "0%": {
            background: theme("colors.vercel.pink"),
            color: theme("colors.white"),
          },
          "40%": {
            background: theme("colors.vercel.pink"),
            color: theme("colors.white"),
          },
        },
        loading: {
          "0%": {
            opacity: ".2",
          },
          "20%": {
            opacity: "1",
            transform: "translateX(1px)",
          },
          to: {
            opacity: ".2",
          },
        },
        shimmer: {
          "100%": {
            transform: "translateX(100%)",
          },
        },
        translateXReset: {
          "100%": {
            transform: "translateX(0)",
          },
        },
        fadeToTransparent: {
          "0%": {
            opacity: 1,
          },
          "40%": {
            opacity: 1,
          },
          "100%": {
            opacity: 0,
          },
        },
      }),
    },
  },
  plugins: [],
};
