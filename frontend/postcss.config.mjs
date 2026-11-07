/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    // Tailwind v4 handles imports and vendor prefixes, and Next minifies the CSS:
    // autoprefixer and cssnano are no longer needed (cssnano also fails on v4 calc()).
    '@tailwindcss/postcss': {},
  },
}

export default config
