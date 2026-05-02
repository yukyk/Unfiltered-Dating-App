/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink:    '#040302',
        ink2:   '#0c0906',
        ink3:   '#14100c',
        ink4:   '#1c1610',
        ink5:   '#241d15',
        terra:  '#c05a34',
        terra2: '#a04828',
        sand:   '#d4a96a',
        cream:  '#f0e6d4',
        muted:  '#6a5848',
        faint:  'rgba(240,230,212,0.07)',
        faint2: 'rgba(240,230,212,0.04)',
        wound:  '#120e0b',
        'male-accent':   '#3a6a9a',
        'male-bg':       '#080c14',
        'female-accent': '#9a4a5a',
        'female-bg':     '#0e0809',
      },
      fontFamily: {
        cormorant: ['"Cormorant Garamond"', 'serif'],
        josefin:   ['"Josefin Sans"', 'sans-serif'],
        lora:      ['"Lora"', 'serif'],
      },
      transitionTimingFunction: {
        cinematic: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      transitionDuration: {
        '440': '440ms',
      },
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'breathe': {
          '0%, 100%': { opacity: '0.18', transform: 'scale(1)' },
          '50%':      { opacity: '0.35', transform: 'scale(1.15)' },
        },
        'line-grow': {
          '0%':   { height: '0px', opacity: '0' },
          '100%': { height: '44px', opacity: '1' },
        },
        'slide-in-right': {
          '0%':   { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'slide-in-left': {
          '0%':   { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%':      { opacity: '0.5', transform: 'scale(1.4)' },
        },
      },
      animation: {
        'fade-up':        'fade-up 0.6s cubic-bezier(0.22,1,0.36,1) forwards',
        'breathe':        'breathe 7s ease-in-out infinite',
        'line-grow':      'line-grow 0.6s cubic-bezier(0.22,1,0.36,1) forwards',
        'slide-in-right': 'slide-in-right 440ms cubic-bezier(0.22,1,0.36,1) forwards',
        'slide-in-left':  'slide-in-left 440ms cubic-bezier(0.22,1,0.36,1) forwards',
        'pulse-dot':      'pulse-dot 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
