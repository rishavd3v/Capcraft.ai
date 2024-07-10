/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{html,js,ejs}"],
  theme: {
    extend: {
        colors: {
            'main':'#0B1121',
            'secondary':'#0F172A',
            'accent':'#38BDF8',
        },
    }
  },
  plugins: [],
}

