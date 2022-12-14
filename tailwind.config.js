/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{tsx,ts}"],
  theme: {
    screens: {
      'sm': '540px',
      'md': '668px',
      'lg': '824px',
      'xl': '1280px',
      '2xl': '1536px',
    }
  },
  plugins: [],
}
