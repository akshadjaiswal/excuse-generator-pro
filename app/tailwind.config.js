/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary Theme: Warm & Approachable
        primary: {
          DEFAULT: '#FF6B6B', // Coral
          50: '#FFF5F5',
          100: '#FFE5E5',
          200: '#FFCCCC',
          300: '#FFB3B3',
          400: '#FF8F8F',
          500: '#FF6B6B',
          600: '#FF4757',
          700: '#E63946',
          800: '#CC2936',
          900: '#B31B28',
        },
        secondary: {
          DEFAULT: '#F4E4C1', // Warm Beige
          50: '#FDFBF7',
          100: '#FAF6ED',
          200: '#F7EED9',
          300: '#F4E4C1',
          400: '#EDD9A8',
          500: '#E6CE8F',
          600: '#D9B965',
          700: '#C99F3C',
        },
        accent: {
          DEFAULT: '#4ECDC4', // Teal
          50: '#F0FFFE',
          100: '#D4F9F6',
          200: '#A9F3ED',
          300: '#7EEDE4',
          400: '#4ECDC4',
          500: '#3DBDB4',
          600: '#2C9D95',
          700: '#1F7D77',
        },
        dark: '#2C3E50', // Charcoal
        success: '#95E1D3', // Soft Green
        warning: '#FFB84D', // Soft Orange
        background: '#FDFBF7', // Off-white
        card: '#FFFFFF', // White
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-poppins)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display': ['48px', { lineHeight: '1.2', fontWeight: '700' }],
        'display-mobile': ['32px', { lineHeight: '1.2', fontWeight: '700' }],
        'h1': ['48px', { lineHeight: '1.2', fontWeight: '700' }],
        'h1-mobile': ['32px', { lineHeight: '1.2', fontWeight: '700' }],
        'h2': ['36px', { lineHeight: '1.3', fontWeight: '700' }],
        'h2-mobile': ['28px', { lineHeight: '1.3', fontWeight: '700' }],
        'h3': ['24px', { lineHeight: '1.4', fontWeight: '600' }],
        'h3-mobile': ['20px', { lineHeight: '1.4', fontWeight: '600' }],
        'body': ['16px', { lineHeight: '1.6' }],
        'small': ['14px', { lineHeight: '1.6' }],
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 24px rgba(0, 0, 0, 0.12)',
        'button': '0 4px 12px rgba(255, 107, 107, 0.2)',
        'button-hover': '0 6px 16px rgba(255, 107, 107, 0.3)',
      },
      borderRadius: {
        'card': '12px',
        'input': '8px',
        'button': '8px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'lift': 'lift 0.3s ease-out',
        'fadeIn': 'fadeIn 0.5s ease-in',
        'slideUp': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        lift: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-4px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
