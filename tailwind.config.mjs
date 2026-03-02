/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // Dark theme tokens
        'bg': 'var(--bg)',
        'bg2': 'var(--bg2)',
        'surface': 'var(--surface)',
        'surface2': 'var(--surface2)',
        'accent': 'var(--accent)',
        'accent2': 'var(--accent2)',
        'accent3': 'var(--accent3)',
        'gold': 'var(--gold)',
        'text-primary': 'var(--text)',
        'text-secondary': 'var(--text2)',
        'muted': 'var(--muted)',
        // Explicit palette
        'lime': { 400: '#b4ff57', 500: '#9ef030', 600: '#7acc20' },
        'indigo': {
          950: '#030310',
          900: '#07071a',
          800: '#0d0d1f',
          700: '#12122a',
          600: '#1a1a38',
          500: '#4f46e5',
        },
        'aqua': { 400: '#57ffda', 500: '#2de8c0' },
        'coral': { 400: '#ff5788', 500: '#ff2d6a' },
        'amber': { 400: '#ffd700', 500: '#f0c000' },
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'Manrope', 'sans-serif'],
        serif: ['Fraunces', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
        bn: ['Noto Serif Bengali', 'serif'],
      },
      fontSize: {
        'fluid-xs': 'clamp(0.65rem, 0.6rem + 0.25vw, 0.75rem)',
        'fluid-sm': 'clamp(0.75rem, 0.7rem + 0.3vw, 0.875rem)',
        'fluid-base': 'clamp(0.875rem, 0.8rem + 0.4vw, 1rem)',
        'fluid-lg': 'clamp(1rem, 0.9rem + 0.5vw, 1.25rem)',
        'fluid-xl': 'clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)',
        'fluid-2xl': 'clamp(1.5rem, 1.3rem + 1vw, 2rem)',
        'fluid-3xl': 'clamp(2rem, 1.7rem + 1.5vw, 3rem)',
        'fluid-4xl': 'clamp(2.5rem, 2rem + 2.5vw, 4.5rem)',
        'fluid-hero': 'clamp(3rem, 2.5rem + 3.5vw, 7rem)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      backdropBlur: {
        'xl': '28px',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.16,1,0.3,1)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-dot': 'dotPulse 2.5s ease-in-out infinite',
        'gradient': 'gradientShift 8s ease infinite',
        'slide-in': 'slideIn 0.6s cubic-bezier(0.16,1,0.3,1) forwards',
        'blink': 'blink 1s step-end infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        dotPulse: {
          '0%,100%': { opacity: '1', boxShadow: '0 0 12px var(--accent)' },
          '50%': { opacity: '0.5', boxShadow: '0 0 4px var(--accent)' },
        },
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        slideIn: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        blink: {
          '0%,100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      boxShadow: {
        'glow': '0 0 30px var(--accent-glow)',
        'glow-sm': '0 0 12px var(--accent-glow)',
        'card': '0 8px 32px rgba(0,0,0,0.4)',
      },
    },
  },
  plugins: [],
};
