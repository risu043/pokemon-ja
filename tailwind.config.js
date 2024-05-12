/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{html,js,jsx}'],
  theme: {
    extend: {},
    fontFamily: {
      zenKaku: ['Zen Kaku Gothic Antique', 'sans-serif'],
      dela: ['Dela Gothic One', 'sans-serif'],
      gill: ['Gill Sans', 'Gill Sans MT', 'Calibri', 'sans-serif'],
    },
    colors: {
      transparent: 'transparent',
      white: '#ffffff',
      glay: '#f5f5f5',
      darkGlay: '#cccccc',
      red: '#f43f5e',
      blue: '#60a5fa',
      black: '#262626',
    },
  },
  plugins: [],
};
