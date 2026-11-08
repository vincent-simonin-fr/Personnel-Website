import Image, { type StaticImageData } from 'next/image'
import body from 'assets/jazz/body.png'
import head from 'assets/jazz/head.png'
import hand from 'assets/jazz/hand.png'
import smoke from 'assets/jazz/smoke.png'

// Jazz guitarist: four transparent layers rendered from the Rive file (same crop, so they
// stack exactly; centered on the feet axis) and animated in CSS. Pivots are percentages of that crop: feet for the
// sway, neck for the nod, wrist for the strum, cigar for the smoke.
type LayerProps = { src: StaticImageData; className?: string }

const Layer = ({ src, className = '' }: LayerProps) => (
  <div className={`absolute inset-0 motion-reduce:animate-none ${className}`}>
    <Image
      src={src}
      alt=''
      fill
      sizes='(max-width: 640px) 240px, 578px'
      loading='eager'
      className='object-contain'
    />
  </div>
)

// Stage: "404" is the light source: its fuchsia beam sweeps the stage, then lands on the
// guitarist (CSS keyframes in globals.css). Decorative and transparent so it fits both
// themes; static with reduced motion. Responsive: the stage takes the height left by the
// header, title and link (never wider than the column, never under 14rem), and the digits
// and beam are sized in container units, so the whole scene scales together.
const Animation404 = () => (
  <div
    aria-hidden
    className='@container relative mx-auto aspect-[5/7] w-[min(100%,max(14rem,calc((100svh-16rem)*5/7)))] select-none'>
    <p className='absolute inset-x-0 top-0 z-10 text-center text-[26.8cqw] leading-none font-extrabold tracking-tighter text-fuchsia-600 [text-shadow:0_0_24px_rgb(217_70_239/0.6),0_0_60px_rgb(217_70_239/0.35)]'>
      {/* The 0 is the light source: white like a lit bulb (ink in light theme). */}4
      <span className='text-primary-50'>0</span>4
    </p>

    {/* Beam: a cone clipped from a vertical gradient, coming out of the lower contour of the "0"
        (beam-404 in globals.css, sized in em like the digits, same font size). */}
    <div className='absolute inset-x-0 beam-404 bottom-[2%] animate-spot-sweep bg-[linear-gradient(to_bottom,rgb(217_70_239/0.55),rgb(217_70_239/0.15)_55%,transparent)] text-[26.8cqw] motion-reduce:animate-none' />

    {/* Floor halo */}
    <div className='absolute bottom-[1%] left-1/2 h-[12%] w-[74%] -translate-x-1/2 animate-spot-lit rounded-[50%] bg-[radial-gradient(closest-side,rgb(217_70_239/0.5),transparent)] motion-reduce:animate-none' />

    <div className='absolute bottom-[3%] left-1/2 aspect-[578/970] h-[72%] -translate-x-1/2 animate-spot-lit motion-reduce:animate-none'>
      <div className='absolute inset-0 origin-[49.7%_98.5%] animate-jazz-sway motion-reduce:animate-none'>
        <Layer src={body} />
        <div className='absolute inset-0 origin-[51.7%_47.9%] animate-jazz-bob motion-reduce:animate-none'>
          <Layer src={smoke} className='origin-[67%_44.3%] animate-jazz-smoke' />
          <Layer src={head} />
        </div>
        <Layer src={hand} className='origin-[44.8%_57.2%] animate-jazz-strum' />
      </div>
    </div>
  </div>
)

export default Animation404
