/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        saffron: {
          50: '#fff9eb',
          100: '#fff1c7',
          200: '#ffe28a',
          300: '#ffd04d',
          400: '#ffbf1f',
          500: '#f5a300',
          600: '#d98500',
          700: '#b36404',
          800: '#92500a',
          900: '#78430c',
        },
        plum: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
        },
        ember: {
          50: '#fff4ed',
          100: '#ffe6d5',
          200: '#ffc9aa',
          300: '#ffa571',
          400: '#ff7a37',
          500: '#ff5a1f',
          600: '#f03d0a',
          700: '#c72d0b',
          800: '#9e2612',
          900: '#7f2312',
        },
      },
    },
  },
  plugins: [],
}
