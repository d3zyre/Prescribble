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
        'fresh-green-dark': '#2BA87A',
        'gradient-end': '#BDFFE6',
        'warm-teal': '#0D9488',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 8px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
        'popup': '0 8px 32px rgba(0,0,0,0.18)',
        'soft': '0 1px 4px rgba(0,0,0,0.05)',
      },
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
