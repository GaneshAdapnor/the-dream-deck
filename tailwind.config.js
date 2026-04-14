/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C9973A',
          light: '#E8C97A',
          pale: 'rgba(201,151,58,0.15)',
          dim: 'rgba(201,151,58,0.4)',
        },
        ink: {
          DEFAULT: '#08090A',
          2: '#0F1012',
          card: '#14161A',
          border: 'rgba(201,151,58,0.18)',
        },
        cream: {
          DEFAULT: '#F0EBE0',
          muted: '#9A9080',
          dim: '#5A5248',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'Helvetica Neue', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.25em',
        widest3: '0.35em',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) forwards',
        'fade-in': 'fadeIn 0.6s ease forwards',
        'ken-burns': 'kenBurns 20s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2.5s linear infinite',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        'scroll-hint': 'scrollHint 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        kenBurns: {
          '0%': { transform: 'scale(1.0) translate(0%, 0%)' },
          '33%': { transform: 'scale(1.08) translate(-1.5%, -1%)' },
          '66%': { transform: 'scale(1.12) translate(1%, -2%)' },
          '100%': { transform: 'scale(1.06) translate(-1%, 1%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(201,151,58,0.4)' },
          '50%': { boxShadow: '0 0 0 8px rgba(201,151,58,0)' },
        },
        scrollHint: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.6' },
          '50%': { transform: 'translateY(8px)', opacity: '1' },
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9973A 0%, #E8C97A 50%, #C9973A 100%)',
        'dark-gradient': 'linear-gradient(180deg, rgba(8,9,10,0) 0%, rgba(8,9,10,0.85) 60%, #08090A 100%)',
      },
    },
  },
  plugins: [],
}
