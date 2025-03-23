import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  compiler: {},
  crossOrigin: 'anonymous',
}

// For build optimization, produce report when npm run build
// To use change below export default withBundleAnalyzer(nextConfig)
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// })

export default nextConfig
