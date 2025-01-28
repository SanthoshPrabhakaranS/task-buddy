/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#7B1984',
        lightGray: '#F1F1F1',
        pink: '#FAC3FF',
        lighPink: '#FAEEFC',
        blue: '#85D9F1',
        green: '#CEFFCC',
        darkGreen: '#A2D6A0',
        darkBlue: '#2683B5',
        red: '#E13838',
      },
    },
  },
  plugins: [],
};
