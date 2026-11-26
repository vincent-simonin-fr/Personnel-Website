import { Geologica } from 'next/font/google'

// The site font, instantiated ONCE (variable font: every weight in one file). Each
// next/font call emits its own @font-face CSS chunk (render-blocking) and may download
// another font file: use `siteFont` + Tailwind weight classes (`font-semibold`), never a
// new Geologica({ weight }) call. The 404's graffiti font (Rock Salt) is declared
// in Animation404, so only that page loads it.
export const siteFont = Geologica({ subsets: ['latin'] })
