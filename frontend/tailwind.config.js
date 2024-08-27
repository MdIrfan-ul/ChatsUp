/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './frontend/index.html',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}