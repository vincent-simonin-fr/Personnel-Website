import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  compiler: {},
  crossOrigin: 'anonymous',
  compress: true,
  devIndicators: false,
  images: {
    // AVIF first (-26 to -35% vs WebP on the contact photo), WebP fallback.
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    // Inline the (small, ~15 KB gzip) CSS into the HTML: no render-blocking stylesheet
    // request before first paint. Production builds only.
    inlineCss: true,
    // app/global-not-found.tsx: the root layout lives in [locale], see that file.
    globalNotFound: true,
  },
}

// https://nextjs.org/docs/app/guides/package-bundling
// For build optimization, produce report when npm run build
// To use change below export default withBundleAnalyzer(nextConfig)
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// })

export default nextConfig
// export default withBundleAnalyzer(nextConfig)
