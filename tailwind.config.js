/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './node_modules/preline/preline.js',
  ],
  theme: {
    extend: {
      colors: {
        'blue': '#1fb6ff',
        'purple': '#7e5bef',
        'pink': '#ff49db',
        'orange': '#ff7849',
        'green': '#13ce66',
        'yellow': '#ffc82c',
        'gray-dark': '#273444',
        'gray': '#8492a6',
        'gray-light': '#d3dce6',
      },
      fontFamily: {
        sans: ['Graphik', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
    },
  },
  plugins: [require('preline/plugin'),],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
}

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}",
    './node_modules/preline/preline.js',
  ],
  theme: {
    fontFamily: {
      sans: ["Open Sans", "sans-serif"],
    },
    extend: {},
  },
  plugins: [
    require("daisyui"),
    require('tailwindcss'),
    require('autoprefixer'),
    require('preline/plugin'),
  ],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
});
