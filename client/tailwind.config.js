/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/*.{html,ts}",
    "./src/app/pages/**/*.{html,ts}",
    "./src/app/pages/**/**/*.{html,ts}",
    "./src/app/pages/**/**/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors:{
        offWhite:'#F1F6F9',
        grey:'#9BA4B5',
        navy:'#394867',
        darkNavy:'#212A3E'
      }
    },
  },
  plugins: [],
}

