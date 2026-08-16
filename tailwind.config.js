/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './{App,entry-server,index}.tsx', './{components,pages,context}/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        primary: '#2cd396', // Brilliant, vibrant neon mint from user's image
        primaryDark: '#04a875', // Deeper vibrant mint for hover states
        secondary: '#FFFFFF', // White - Card Backgrounds
        surface: '#F1F5F9', // Slate 100 - Section Backgrounds
        accent: '#1cd194', // Accent color (extra vibrant minty emerald)
        dark: '#0F172A', // Slate 900 - Dark Text
        light: '#F8FAFC', // Slate 50 - Background
        textMain: '#1E293B', // Slate 800
        textSub: '#64748B', // Slate 500
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        bold: '700',
        extrabold: '900',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        float: 'float-slow 4s ease-in-out infinite',
        'pulse-subtle': 'pulse-subtle 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.03)' },
        },
      },
    },
  },
  plugins: [],
};
