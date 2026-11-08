import { Hanken_Grotesk } from 'next/font/google'

// The site font, instantiated ONCE (variable font: every weight in one file). Each
// next/font call emits its own @font-face CSS chunk (render-blocking) and may download
// another font file: use `siteFont` + Tailwind weight classes (`font-semibold`), never a
// new Hanken_Grotesk({ weight }) call. Kept out of config/fonts.ts on purpose: importing
// that module would compile and ship every font it declares.
export const siteFont = Hanken_Grotesk({ subsets: ['latin'] })
