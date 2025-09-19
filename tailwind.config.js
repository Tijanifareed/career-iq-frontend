/** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       fontFamily: {
//         inter: ["Inter", "sans-serif"],
//       },
//       colors: {
//         customBlue: '#5795c2',
//         customOffBlue: '#F4F8FB',
//       }
//     },
//   },
//   plugins: [],
// }

// tailwind.config.js
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
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        slide: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        shimmer: 'shimmer 3s linear infinite',
        slide: 'slide 2s linear infinite',
      },
    },
  },
  plugins: [],
}

