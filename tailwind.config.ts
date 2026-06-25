import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy:       '#0D1B3E',
        'navy-mid': '#1E2A3A',
        steel:      '#2A4A7F',
        gold:       '#D4A017',
        'gold-warm':'#E8B84B',
        ivory:      '#F8F7F4',
        charcoal:   '#1E2A3A',
        'score-green': '#3DAA6E',
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        body:    ['Inter', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(212, 160, 23, 0)' },
          '50%':      { boxShadow: '0 0 0 8px rgba(212, 160, 23, 0.25)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        }
      },
      animation: {
        'pulse-glow': 'pulse-glow 2.5s ease-in-out infinite',
        'float':      'float 4s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
export default config
