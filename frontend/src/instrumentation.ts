import { registerOTel } from '@vercel/otel'

// https://www.npmjs.com/package/@vercel/otel
export function register() {
  registerOTel({ serviceName: 'next-app' })
}
