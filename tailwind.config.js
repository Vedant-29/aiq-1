/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "custom-light":
          "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
        "custom-dark": "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
      },
      colors: {
        "border-gray": "#E0E0E0",
      },
    },
  },
  variants: {
    extend: {
      boxShadow: ["hover"],
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
],
};
