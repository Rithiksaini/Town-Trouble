/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          200: "#c5d0e6",
          500: "#0a3875",
          600: "#072e5f",
          700: "#052548",
        },
      },
    },
  },
  plugins: [],
};