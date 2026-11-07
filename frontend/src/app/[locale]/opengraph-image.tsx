import { ImageResponse } from 'next/og'
import { getDictionary } from 'i18n/getDictionary'
import { siteConfig } from 'config/site'

// Generated social preview (og:image, also used by Twitter/X), one per locale.
export const alt = siteConfig.name
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

type Props = { params: Promise<{ locale: string }> }

const OpengraphImage = async ({ params }: Props) => {
  const { locale } = await params
  const { homePage } = await getDictionary(locale)

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px',
        background: '#0a0a0a',
        color: '#f6f6f6',
      }}>
      <div style={{ width: 120, height: 8, background: siteConfig.color.hex }} />
      <div style={{ marginTop: 40, fontSize: 84, fontWeight: 700 }}>
        {siteConfig.name}
      </div>
      <div style={{ marginTop: 24, fontSize: 40, color: '#B0B0B0' }}>
        {homePage.firstScreen.firstLine}
      </div>
      <div style={{ marginTop: 'auto', fontSize: 28, color: siteConfig.color.hex }}>
        {siteConfig.url.replace('https://', '')}
      </div>
    </div>,
    size,
  )
}

export default OpengraphImage
