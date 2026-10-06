module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        nobel: { gold: '#C5A059', dark: '#1a1a1a', cream: '#F9F8F4' },
      },
      spacing: { '4.5': '1.125rem' },
      borderWidth: { '1.5': '1.5px' },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
