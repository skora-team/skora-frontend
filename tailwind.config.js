/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  // 🔥 THIS FIXES YOUR ISSUE
  safelist: [
    "animate-chest-open",
    "animate-bounce-pixel",
    "animate-shake",
  ],

  theme: {
    extend: {
      fontFamily: {
        'press-start': ['"Press Start 2P"', 'cursive'],
      },
      colors: {
        skora: {
          'dark-navy': '#0f0f1a',
          'neon-orange': '#ff7b00',
          'python-main': '#FFD700',
          'r-main': '#3b82f6',
          'sql-main': '#d97706',
        }
      },
      boxShadow: {
        'pixel-shadow': '4px 4px 0px 0px rgba(0,0,0,0.5)',
        'pixel-glow-yellow': '0 0 10px #FFD700',
        'pixel-glow-blue': '0 0 10px #3b82f6',
        'pixel-glow-brown': '0 0 10px #d97706',
      }
    },
  },
  plugins: [],
};
