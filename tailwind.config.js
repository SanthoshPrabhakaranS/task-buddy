/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#7B1984',
        lightGray: '#F1F1F1',
        pink: '#FAC3FF',
        blue: '#85D9F1',
        green: '#CEFFCC',
        darkBlue: '#2683B5',
      },
    },
  },
  plugins: [],
};
