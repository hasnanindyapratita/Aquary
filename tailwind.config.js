/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        aqua: { 50: '#EFF8FF', 100: '#DBEFFE', 200: '#BFE3FD', 300: '#93D1FB', 400: '#5BB6F6', 500: '#2F97EC', 600: '#1D7AD1', 700: '#1B62A9', 800: '#1C5188', 900: '#1B466F' },
        leaf: { 50: '#F0FBF3', 100: '#DBF5E2', 200: '#B9EAC8', 300: '#88D8A3', 400: '#55C27B', 500: '#32A65D', 600: '#23854A', 700: '#1F6A3D', 800: '#1D5434', 900: '#1A462C' },
        sun: { 50: '#FFFBEB', 100: '#FFF4C6', 200: '#FFE88A', 300: '#FFD84D', 400: '#FFC81F', 500: '#F5AD0B', 600: '#D98606', 700: '#B46309', 800: '#924D0E', 900: '#783F0F' },
        ink: '#17304D',
      },
      fontFamily: {
        sans: ['Nunito', 'ui-rounded', '"Segoe UI"', 'system-ui', 'sans-serif'],
      },
      boxShadow: { soft: '0 8px 24px -8px rgba(29, 122, 209, 0.25)' },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-6px)' } },
        pop: { '0%': { opacity: '0', transform: 'scale(0.92)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
      },
      animation: { float: 'float 3.5s ease-in-out infinite', pop: 'pop 0.35s ease-out' },
    },
  },
  plugins: [],
};
