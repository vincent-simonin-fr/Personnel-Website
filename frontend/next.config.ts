import type { NextConfig } from 'next'

const cspHeader = `
    default-src 'self';
    connect-src 'self' https://cdn.jsdelivr.net https://unpkg.com;
    frame-src 'self' https://vercel.live;
    style-src 'self';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;`

// CSP can cause without certificate SSL
const securityHeaders: { key: string; value: string }[] = [
  // {
  //   key: 'Content-Security-Policy',
  //   value: cspHeader.replace(/\n/g, ''),
  // },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  {
    key: 'Cross-Origin-Opener-Policy',
    value: 'same-origin-allow-popups',
  },
  {
    key: 'Cross-Origin-Embedder-Policy',
    value: 'require-corp',
  },
]

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  compiler: {},
  crossOrigin: 'anonymous',
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig
