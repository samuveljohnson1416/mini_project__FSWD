/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./client/index.html",
    "./client/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#1a1a1a',
        'dark-card': '#242424',
        'warm-orange': '#ff6b35',
        'warm-yellow': '#f7931e',
        'warm-red': '#e63946',
        'dark-text': '#e8e8e8',
      },
    },
  },
  plugins: [],
}
