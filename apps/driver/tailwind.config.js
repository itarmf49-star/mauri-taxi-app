/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        chinguetti: {
          stone: '#8B7355', terracotta: '#C17F59', ochre: '#D4A574',
          sand: '#E8D5B7', desert: '#F5E6D3', mosque: '#5D4E37',
        },
      },
      fontFamily: { arabic: ['Amiri', 'Noto Kufi Arabic', 'sans-serif'] },
    },
  },
  plugins: [],
};
