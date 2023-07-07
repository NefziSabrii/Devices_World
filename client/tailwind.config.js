/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:'#4161B0'
    },
  },
  },
  plugins: [],
  corePlugins:{
    preflight: false,
  },
}