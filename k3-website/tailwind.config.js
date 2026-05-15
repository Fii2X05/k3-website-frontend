/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    {
      pattern: /(bg|text|border)-(navy|gold|sand)-(100|200|300|400|500|600|700|800|900)/,
      variants: ['hover', 'group-hover', 'focus', 'active'],
    }
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        navy: {
          950: '#0B1221',
          900: '#111D36',
          800: '#1A2B4C', // Main Navy
          700: '#243C6A',
          600: '#2E4C87',
          500: '#385DA5',
          100: '#D5E0F2',
        },
        gold: {
          600: '#A98D65',
          500: '#C5A880', // Main Gold/Beige
          400: '#D4BE9F',
          100: '#F3EFE9',
        },
        sand: {
          900: '#4A4641',
          500: '#A39B8F',
          200: '#E8E4DF',
          100: '#F4EFEA', // Light Sand background
          50: '#FAF8F5',
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'scale-up': 'scaleUp 0.4s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleUp: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        }
      }
    }
  },
  plugins: [],
}