/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        customBlue: '#5795c2',
        customOffBlue: '#F4F8FB',
      }
    },
  },
  plugins: [],
}

