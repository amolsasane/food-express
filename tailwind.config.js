/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        slideInRight: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
        slideOutRight: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        slideInRight: "slideInRight 0.5s ease-in-out forwards",
        slideOutRight: "slideOutRight 0.5s ease-in-out forwards",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-hide": {
          "-ms-overflow-style": "none" /* IE and Edge */,
          "scrollbar-width": "none" /* Firefox */,
          "&::-webkit-scrollbar": {
            display: "none" /* Chrome, Safari, Opera */,
          },
        },
      });
    },
  ],
};
