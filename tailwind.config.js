/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // that is animation class
      animation: {
        fade: 'fadeIn 2s ease-in-out',
      },
      keyframes: theme => ({
        fadeIn: {
          '0%': { color: 'transparent' },
          '100%': { color: theme('colors.white') },
        },
      }),
    },
  },
  plugins: [],
}

