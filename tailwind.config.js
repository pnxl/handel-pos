/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    fontFamily: {
      sans: [
        "Inter Variable",
        "ui-sans-serif",
        "system-ui",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji",
      ],
    },
    extend: {
      animation: {
        "pulse-bg": "pulse-bg 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;",
      },
      keyframes: {
        "pulse-bg": {
          "0%, 100%": {
            "background-color": "rgb(239, 68, 68, 100)",
          },
          "50%": {
            "background-color": "rgb(239, 68, 68, .50)",
          },
        },
      },
    },
  },
  plugins: [],
};
