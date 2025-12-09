/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'skora-dark-navy': '#0f0f1a', 
        'skora-neon-orange': '#ff7b00',
        'skora-python-main': '#FACC15', 
        'skora-r-main': '#3B82F6', 
        'skora-sql-main': '#B45309', 
        // Glow colors for hover effects
        'skora-glow-python': '#FDE047',
        'skora-glow-r': '#60A5FA',
        'skora-glow-sql': '#FDBA74',
      },
      fontFamily: {
        'press-start': ['"Press Start 2P"', 'cursive'],
      },
      boxShadow: {
        // Defines the pixel shadow and default glow
        'pixel-glow-yellow': '0 0 5px #FDE047, 0 0 10px #FACC15',
        'pixel-glow-blue': '0 0 5px #60A5FA, 0 0 10px #3B82F6',
        'pixel-glow-brown': '0 0 5px #FDBA74, 0 0 10px #B45309',
        'pixel-shadow': '4px 4px 0 #000', 
      },
    },
  },
  plugins: [],
}