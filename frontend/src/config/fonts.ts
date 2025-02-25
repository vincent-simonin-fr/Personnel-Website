import { Fira_Code as FontMono, Inter as FontSans } from 'next/font/google'
import localFont from 'next/font/local'

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const fontMono = FontMono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
export const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const soehneLight = localFont({
  src: './fonts/soehne-leicht.woff2',
  variable: '--font-soehne-light',
  weight: '100 900',
})

export const soehneBold = localFont({
  src: './fonts/soehne-fett.woff2',
  variable: '--font-soehne-bold',
  weight: '100 900',
})

export const soehneSemiBold = localFont({
  src: './fonts/soehne-halbfett.woff2',
  variable: '--font-soehne-semibold',
  weight: '100 900',
})

export const soehneKraftig = localFont({
  src: './fonts/soehne-kraftig.woff2',
  variable: '--font-soehne-kraftig',
  weight: '100 900',
})
