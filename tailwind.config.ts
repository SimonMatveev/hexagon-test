import { DURATION_ANIMATION_FADE_AWAY } from './src/utils/config';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      'green-cold': '#41e2ba',
      'green-cold-hover': '#39cfcf',
      'green-cold-active': '#188f80',
      white: '#fff',
      black: '#000',
      red: '#f00',
      transparent: 'transparent',
      'grey-dark': '#242424',
      'grey-light': '#a3a3a3',
    },
    screens: {
      sm: '500px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    backgroundSize: {
      '70': '70%',
      contain: 'contain',
    },
    extend: {
      keyframes: {
        'drop-down': {
          '0%': {
            top: '-200%',
          },
          '80%': {
            top: '0%',
          },
          '90%': {
            top: '-3%',
          },
          '100%': {
            top: '0',
          },
        },
        'fade-away': {
          '0%, 50%': {
            opacity: '1',
          },
          '100%': {
            opacity: '0',
          },
        },
      },
      animation: {
        'drop-down': 'drop-down 1s ease-out 1',
        'fade-away': `fade-away ${DURATION_ANIMATION_FADE_AWAY}ms linear 1`,
      },
      backgroundImage: {
        close: 'url("/src/img/close.svg")',
        'triangle-green-r': 'url("/src/img/triangle-filled-r.svg")',
        'triangle-white-r': 'url("/src/img/triangle-white-r.svg")',
        'triangle-white-l': 'url("/src/img/triangle-white-l.svg")',
        spinner: 'url("/src/img/spinner.svg")',
      },
      fontSize: {
        xxs: '10px',
      },
    },
    extends: {},
  },
};
