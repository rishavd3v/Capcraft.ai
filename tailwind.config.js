/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{html,js,ejs}"],
  theme: {
    extend: {
        colors: {
            'secondary':'#f97316',
            'accent':'#3a3a3a',
        },
    }
  },
  plugins: [],
}

