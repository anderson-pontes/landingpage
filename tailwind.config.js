/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          base: '#0A0A0A',
          1: '#141414',
          2: '#1C1C1C',
          3: '#242424',
          border: '#2E2E2E',
        },
        accent: {
          DEFAULT: '#F59E0B',
          light: '#FCD34D',
        },
        ink: {
          primary: '#F0EFEB',
          secondary: '#9CA3AF',
          muted: '#6B7280',
        },
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      animation: {
        'badge-pulse': 'badgePulse 2.5s ease-in-out infinite',
      },
      keyframes: {
        badgePulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
      },
    },
  },
  plugins: [],
}
