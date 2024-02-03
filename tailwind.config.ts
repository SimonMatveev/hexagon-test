/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      'green-cold': '#41e2ba',
      'green-cold-hover': '#39cfcf',
      white: '#fff',
      black: '#000',
      red: '#f00',
      transparent: 'transparent',
    },
    screens: {
      sm: '320',
      md: '768',
      lg: '1024',
      xl: '1440',
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    extends: {},
  },
};
