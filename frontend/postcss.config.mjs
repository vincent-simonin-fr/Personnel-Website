/** @type {import('postcss-load-config').Config} */

const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {
      flexbox: true,
      grid: true,
    },
  },
}

export default config
