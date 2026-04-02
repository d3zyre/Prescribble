/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navy': '#0B1F33',
        'navy-light': '#132D47',
        'primary': '#1A73E8',
        'primary-dark': '#1557B0',
        'soft-gray': '#E5E7EB',
        'fresh-green': '#34C38F',
        'gradient-end': '#BDFFE6',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 12px rgba(0,0,0,0.08)',
        'popup': '0 8px 32px rgba(0,0,0,0.2)',
      }
    },
  },
  plugins: [],
}
