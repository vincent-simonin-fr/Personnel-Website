import { Rock_Salt } from 'next/font/google'
// The animate-* and .graffiti classes below: plain CSS, loaded on the 404 only.
import './Animation404.css'

// The player's greys are fixed, not theme tokens: like the former jazzman's image
// layers, he looks the same in both themes.
const ink = '#141414'
const skin = '#8c8c8c'
const skinShade = '#757575'
const hair = '#262626'
const white = '#efefef'
const kit = '#5c5c5c'
const trim = '#a3a3a3'
const shoe = '#c4c4c4'
// Cel shading: flat translucent shadows and highlights over the base colors.
const shade = 'rgb(0 0 0 / 0.2)'
const light = 'rgb(255 255 255 / 0.35)'

// A limb segment: a thick skin-colored stroke over a slightly thicker outline.
const Limb = ({ d }: { d: string }) => (
  <>
    <path d={d} fill='none' stroke={ink} strokeWidth='19' strokeLinecap='round' />
    <path d={d} fill='none' stroke={skin} strokeWidth='15' strokeLinecap='round' />
  </>
)

// A wristband: a short white stroke over its outline.
const Band = ({ d }: { d: string }) => (
  <>
    <path d={d} fill='none' stroke={ink} strokeWidth='21' />
    <path d={d} fill='none' stroke={white} strokeWidth='17' />
  </>
)

// A cartoon fist at the end of a forearm (local axis: pointing down, wrist above):
// rounded fist with a scalloped edge for the knuckles, three finger creases, the thumb
// on one side (`flip` mirrors it for the other hand), cel shade and highlight.
const Fist = ({
  cx,
  cy,
  flip = false,
}: {
  cx: number
  cy: number
  flip?: boolean
}) => (
  <g transform={`translate(${cx} ${cy})${flip ? ' scale(-1 1)' : ''}`}>
    <path
      d='M-8.5 -5 C -9.5 2, -8 7.5, -5.5 9 C -4 10.6, -2.2 10.4, -1.2 9.6 C 0.2 10.8, 2.4 10.8, 3.4 9.6 C 4.8 10.4, 7 9.8, 7.8 7.6 C 9.4 3, 9.2 -2, 8.4 -5 Z'
      fill={skin}
    />
    <path
      d='M3.6 9.4 C 5 10, 7 9.6, 7.8 7.6 C 9.4 3, 9.2 -2, 8.4 -5 L 5.6 -5 C 6.6 1, 6 6, 3.6 9.4 Z'
      fill={shade}
      stroke='none'
    />
    <path
      d='M-3.4 9.8 V 5.8 M 1.1 10.2 V 6 M 5.4 9.8 V 6.2'
      fill='none'
      strokeWidth='1.3'
      strokeLinecap='round'
    />
    <path
      d='M8 -3 C 12.4 -2, 13 3.4, 10 5.6 C 8.6 6.6, 6.6 5.8, 6.4 4.2'
      fill={skin}
    />
    <circle cx='-4.2' cy='-1' r='2.2' fill={light} stroke='none' />
  </g>
)

// Half of the rim (an ellipse seen from slightly above): fuchsia over its outline.
const Rim = ({ d }: { d: string }) => (
  <>
    <path d={d} fill='none' stroke={ink} strokeWidth='5.5' strokeLinecap='round' />
    <path
      d={d}
      fill='none'
      className='stroke-fuchsia-500'
      strokeWidth='3'
      strokeLinecap='round'
    />
  </>
)

// Net hanging from the rim's front half (rim: center 200,86, radii 23 × 7): cords
// narrowing to a bottom ring, crossed by two rows.
const net =
  'M223 86 L213 118 M218.6 90.1 L210.5 120.4 M207.1 92.7 L204 121.8 M192.9 92.7 L196 121.8 M181.4 90.1 L189.5 120.4 M177 86 L187 118 M180.7 98 A19.3 5.5 0 0 0 219.3 98 M184.2 109 A15.8 4.6 0 0 0 215.8 109 M187 118 A13 4 0 0 0 213 118'

// The ball, centered on 0,0: the seams spin (`spin` class), the shade and highlight
// don't. Stroke color comes from the parent group.
const Ball = ({ spin = '' }: { spin?: string }) => (
  <>
    <g className={`origin-center transform-fill ${spin}`}>
      <circle r='17' className='fill-fuchsia-500' strokeWidth='2.4' />
      <path
        d='M-17 0 H17 M0 -17 V17 M-11.5 -12.5 Q-2.5 0 -11.5 12.5 M11.5 -12.5 Q2.5 0 11.5 12.5'
        fill='none'
        strokeWidth='1.8'
      />
    </g>
    <path
      d='M3 15.7 A16 16 0 0 0 15.7 3 A13 13 0 0 1 3 15.7 Z'
      fill={shade}
      stroke='none'
    />
    <ellipse
      cx='-7'
      cy='-8'
      rx='5'
      ry='3'
      transform='rotate(-40)'
      fill={light}
      stroke='none'
    />
  </>
)

// The jersey's "2", 11 × 16, drawn as a stroke (shown at 0.8, centered under the
// V-neck's point, x 99.5).
const two = 'M0.5 4.5 Q0.5 0 5.5 0 Q10.5 0 10.5 4.5 Q10.5 7.5 5.5 11 L0.5 16 H11'

// A chunky "4", 26 × 38, standing on the floor: the ball comes to rest between two of
// them and makes the 0 of "404". Right side of the stem in shadow, like the pole.
const Four = ({ x }: { x: number }) => (
  <g transform={`translate(${x} 212)`}>
    <path
      d='M15 0 H23 V24 H26 V31 H23 V38 H15 V31 H0 V24 Z M9 24 L15 14.4 V24 Z'
      fill={white}
      fillRule='evenodd'
    />
    <path d='M19 0 H23 V38 H19 Z' fill={shade} stroke='none' />
  </g>
)

// Wall lettering: a marker handstyle font (Rock Salt), loaded by this component only (the 404
// is the only page that imports it: no extra font file anywhere else), styled by
// .graffiti in Animation404.css. Portrait: in the flow, above and below the scene;
// landscape: out of the flow, over the scene's empty top corners (above the player's
// head, above the 404) and beyond its sides, behind the drawing.
const graffitiFont = Rock_Salt({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

const graffitiStyle = `${graffitiFont.className} graffiti text-center text-3xl leading-[1.1] text-balance landscape:absolute landscape:mt-0 landscape:mb-0 landscape:w-[21vw] landscape:text-[clamp(0.9rem,min(2.3vw,4svh),3rem)]`

type Animation404Props = {
  /** The two halves of the quote, one per side of the scene. */
  graffiti: string[]
}

// A chibi basketball player (proportions of the reference drawing: head with hair about
// half the height, thick headband, big wide-set eyes, short thick arms, wide shoes).
// He runs in, waves, takes the ball in both hands and, a second later, takes a free
// throw: one sequence on load, no interaction (keyframes in Animation404.css, CSS only, no
// JS: nothing runs once it's over). Rig:
// each arm = upper arm rotating at the shoulder + forearm rotating at the elbow (base
// rotation = set pose); legs rotate at the hip. The scene is decorative; with reduced
// motion he stands in the set pose and the ball is already in the 404. The ball rolls
// behind the pole into the gap between the two 4s and stays there.
// `graffiti`: two sentences sprayed on the wall behind the scene, one on each side
// (landscape) or above and below it (portrait, no side room).
const Animation404 = ({ graffiti }: Animation404Props) => {
  const [left, right] = graffiti
  return (
    // w-full: the stage's width is a percentage of this box, which must not shrink to
    // fit it. --strides: running strides before the last two, more on wider screens so
    // he comes in from the screen's edge at about the same pace (intro-* in Animation404.css).
    <div className='flex w-full justify-center [--strides:1] min-[2200px]:[--strides:2]'>
      {/* Height = the viewport minus the header, the home link and the padding (14rem),
          and in portrait the two graffiti (10rem); width ≤ 54vw in landscape to leave
          the graffiti room on both sides. */}
      <div className='relative flex w-[min(100%,max(14rem,calc((100svh-24rem)*17/13)))] flex-col landscape:block landscape:w-[min(54vw,max(14rem,calc((100svh-14rem)*17/13)))]'>
        {/* HOOPS across 60% of the screen width, behind everything: the brand fuchsia, very
            faded, answering the white lettering (same idea as the projects page's
            background names). */}
        <span
          aria-hidden
          className={`${graffitiFont.className} pointer-events-none absolute top-1/2 left-1/2 -translate-1/2 text-[12.6vw] leading-none whitespace-nowrap text-fuchsia-500/25 select-none`}>
          HOOPS
        </span>
        <p
          className={`${graffitiStyle} mb-3 -rotate-4 landscape:right-full landscape:bottom-[74%] landscape:mr-[-11%] landscape:-rotate-7`}>
          {left}
        </p>
        <p
          className={`${graffitiStyle} order-last mt-3 rotate-3 landscape:top-[3%] landscape:left-full landscape:ml-[-20%] landscape:rotate-6`}>
          {right}
        </p>
        {/* Court, x 16 to 356 × 260 units, floor at y 250: three stacked layers sharing
            the viewBox (hoop, player, what passes in front of the ball), so the player
            can run in from the screen's edge on his own. */}
        <div aria-hidden className='relative select-none'>
          <svg viewBox='16 0 340 260' className='block h-auto w-full'>
            {/* Hoop, three-quarter view, drawn like the player. Behind the ball: pole and
            base, backboard (face, edge, target square), bracket, back half of the rim. */}
            <g stroke={ink} strokeWidth='2.4' strokeLinejoin='round'>
              <ellipse cx='239.5' cy='249' rx='10' ry='3' fill={kit} />
              <rect x='235' y='62' width='9' height='187' rx='2' fill={kit} />
              <path d='M240 62 V249 H244 V62 Z' fill={shade} stroke='none' />
              <path d='M245 25 L240 22 V95 L245 97 Z' fill={trim} />
              <path d='M220 30 L240 22 V95 L220 101 Z' fill={white} />
              <path d='M231 26 L240 22 V95 L231 98 Z' fill={shade} stroke='none' />
              <path
                d='M224 58 L235 54 V80 L224 84 Z'
                fill='none'
                strokeWidth='1.8'
              />
              <path d='M218 84 L223 83 V91 L218 93 Z' fill={kit} />
              <Rim d='M177 86 A23 7 0 0 1 223 86' />
            </g>
          </svg>

          <svg
            viewBox='16 0 340 260'
            className='animate-intro-run absolute inset-0 size-full overflow-visible'>
            {/* Player, in player coordinates (shifted 12 units left to keep room before
            the hoop): rim at 212,86 here. */}
            <g transform='translate(-12 0)'>
              {/* Floor shadow, pulses with the strides */}
              <g className='animate-intro-shadow origin-[101px_250px]'>
                <ellipse cx='101' cy='250' rx='40' ry='4' fill={shade} />
              </g>

              <g stroke={ink} strokeWidth='2.2' strokeLinejoin='round'>
                {/* Legs (hip pivots), socks, shoes; they compress on the dip */}
                <g className='animate-player-legs origin-[101px_250px]'>
                  <g className='animate-intro-leg-l origin-[87px_214px]'>
                    <rect x='80' y='214' width='14' height='16' fill={skin} />
                    <rect x='77' y='228' width='18' height='11' fill={white} />
                    <path d='M78 231.5 H94' stroke={trim} strokeWidth='2' />
                    <path
                      d='M63.5 249.5 C62 241 70 236.5 80 237 C90 237 97.5 239 97.5 245 V249.5 Z'
                      fill={shoe}
                    />
                    <path d='M65 246.5 H96.5' stroke='#8a8a8a' strokeWidth='2' />
                    <path
                      d='M69 241 Q76 238.5 84 239'
                      stroke={light}
                      strokeWidth='2.5'
                      fill='none'
                      strokeLinecap='round'
                    />
                  </g>
                  <g className='animate-intro-leg-r origin-[114px_214px]'>
                    <rect x='107.5' y='214' width='14' height='16' fill={skin} />
                    <path
                      d='M114.5 214 H121.5 V230 H114.5 Z'
                      fill={shade}
                      stroke='none'
                    />
                    <rect x='106' y='228' width='19' height='11' fill={white} />
                    <path d='M107 231.5 H124' stroke={trim} strokeWidth='2' />
                    <path
                      d='M106.5 249.5 V245 C106.5 239 114 237 124 237 C134 236.5 142 241 140.5 249.5 Z'
                      fill={shoe}
                    />
                    <path d='M107.5 246.5 H139' stroke='#8a8a8a' strokeWidth='2' />
                    <path
                      d='M112 241 Q119 238.5 127 239'
                      stroke={light}
                      strokeWidth='2.5'
                      fill='none'
                      strokeLinecap='round'
                    />
                  </g>
                </g>

                {/* Upper body: shorts, jersey, head */}
                <g className='animate-player-body'>
                  {/* Shorts, waist as wide as the jersey hem: waistband, side stripes, split */}
                  <path
                    d='M81.5 199.5 H123.5 L128.5 224.5 H104 L101.5 217 L98 224.5 H75.5 Z'
                    fill={kit}
                  />
                  <path
                    d='M114 199.5 H123.5 L128.5 224.5 H118 Z'
                    fill={shade}
                    stroke='none'
                  />
                  <path
                    d='M82.5 204 L78.5 223 M122.5 204 L126.5 223'
                    stroke={trim}
                    strokeWidth='3'
                  />
                  <path d='M81.5 203.5 H123.5' fill='none' strokeWidth='1.6' />
                  <path
                    d='M101.5 206 V217'
                    fill='none'
                    stroke={shade}
                    strokeWidth='1.6'
                  />

                  {/* Sleeveless jersey: V-neck and armhole trims, right side in shadow */}
                  <path
                    d='M84 162 L90 161 L99.5 175 L109 161 L115 162 Q116.5 171 123.5 174 V201 H81.5 V174 Q82.5 171 84 162 Z'
                    fill={kit}
                  />
                  <path
                    d='M112 162 L115 162 Q116.5 171 123.5 174 V201 H113 Q116.5 184 112 162 Z'
                    fill={shade}
                    stroke='none'
                  />
                  <path
                    d='M90.5 162 L99.5 175 L108.5 162 M84.5 163 Q83.5 170 82 174 M114.5 163 Q115.5 170 123 174'
                    fill='none'
                    stroke={trim}
                    strokeWidth='2.6'
                  />
                  <ellipse
                    cx='99.5'
                    cy='166'
                    rx='13'
                    ry='3.5'
                    fill={shade}
                    stroke='none'
                  />

                  {/* Number 2 on the chest, outlined like the 404's digits (behind the ball
                    in the set pose, seen while running and after the shot) */}
                  <g
                    transform='translate(94.9 179.6) scale(0.8)'
                    fill='none'
                    strokeLinecap='round'>
                    <path
                      d={two}
                      stroke={ink}
                      strokeWidth='6.4'
                      strokeLinejoin='round'
                    />
                    <path
                      d={two}
                      stroke='#d4d4d4'
                      strokeWidth='3.2'
                      strokeLinejoin='round'
                    />
                  </g>

                  {/* Head: ears, face (shadow under the band and on the right cheek) */}
                  <ellipse cx='56' cy='131.5' rx='6.5' ry='12' fill={skin} />
                  <ellipse cx='143.5' cy='131.5' rx='6.5' ry='12' fill={skin} />
                  <path
                    d='M54 125 Q57 131 54.5 138 M145.5 125 Q142.5 131 145 138'
                    fill='none'
                    stroke={skinShade}
                    strokeWidth='2'
                  />
                  <path
                    d='M61.5 108 C60 140 70 163 99.5 164.5 C129 163 139 140 137.5 108 Z'
                    fill={skin}
                    strokeWidth='2.4'
                  />
                  <path
                    d='M120 117 C132 123 136.5 134 134.5 145 C131 156 122 162 110 164 C123 155 128 138 120 117 Z'
                    fill={shade}
                    stroke='none'
                  />
                  <path
                    d='M61.8 116 Q99.5 110 137.6 116 L137.5 122 Q99.5 116 61.6 122 Z'
                    fill={shade}
                    stroke='none'
                  />

                  {/* Hair in braided rows, highlight on the left */}
                  <path
                    d='M62 100 C61 76 78 64.5 99.5 64.5 C121 64.5 138 76 137.5 100 Z'
                    fill={hair}
                  />
                  <path
                    d='M71 90 Q73 76 86 68 M85 89 Q86 74 94 66 M99.5 88.5 V65 M114 89 Q113 74 105 66 M128 90 Q126 76 113 68'
                    fill='none'
                    stroke='#5a5a5a'
                    strokeWidth='1.8'
                  />
                  <path
                    d='M68 84 Q74 72 86 67'
                    fill='none'
                    stroke='rgb(255 255 255 / 0.25)'
                    strokeWidth='3'
                    strokeLinecap='round'
                  />

                  {/* Thick headband, shaded at the bottom */}
                  <path
                    d='M59 88 Q99.5 82 141 88 L141.5 118 Q99.5 112 58.5 118 Z'
                    fill={white}
                  />
                  <path
                    d='M58.7 110 Q99.5 104 141.4 110 L141.5 118 Q99.5 112 58.5 118 Z'
                    fill='#cfcfcf'
                    stroke='none'
                  />
                  <path
                    d='M59 88 Q99.5 82 141 88 L141.5 118 Q99.5 112 58.5 118 Z'
                    fill='none'
                  />

                  {/* Face: eyebrows, big eyes with highlights, nose, mustache, mouth */}
                  <path
                    d='M77 119 L90 121.5 M109 121.5 L122 119'
                    fill='none'
                    strokeWidth='3'
                    strokeLinecap='round'
                  />
                  <g stroke='none'>
                    <circle cx='84.5' cy='130' r='11.3' fill={ink} />
                    <circle cx='114.5' cy='130' r='11.3' fill={ink} />
                    <circle cx='81.2' cy='125.6' r='3.8' fill='#fff' />
                    <circle cx='111.2' cy='125.6' r='3.8' fill='#fff' />
                    <circle cx='89.6' cy='134.6' r='1.5' fill='#fff' />
                    <circle cx='119.6' cy='134.6' r='1.5' fill='#fff' />
                    <ellipse cx='99.5' cy='139' rx='3.2' ry='2.3' fill={skinShade} />
                    <circle cx='98.3' cy='138.2' r='0.9' fill={light} />
                    <path
                      d='M86.5 151 C88 146 93 144.5 99.5 146.5 C106 144.5 111 146 112.5 151 C108 149.5 104 149.5 99.5 150.5 C95 149.5 91 149.5 86.5 151 Z'
                      fill='#1c1c1c'
                    />
                  </g>
                  <path
                    d='M93.5 152 Q99.5 159 105.5 152 Z'
                    fill='#2a2a2a'
                    strokeWidth='1.4'
                  />
                  <path
                    d='M96 155.5 Q99.5 157.5 103 155.5'
                    fill='none'
                    stroke='#a8a8a8'
                    strokeWidth='1.6'
                  />
                </g>

                {/* Ball: base = set pose (both hands, 103,178). X and Y on two groups make
                the shot's arc; the inner group spins, the highlight doesn't. */}
                <g className='animate-player-ball'>
                  <g className='animate-shot-ball-y'>
                    <g transform='translate(103 178)'>
                      <Ball spin='animate-shot-ball-spin' />
                    </g>
                  </g>
                </g>

                {/* Arms, in front of the ball. Each: upper arm (shoulder pivot) holding the
                forearm (elbow pivot) and the fist; base rotations = set pose. */}
                <g className='animate-player-body'>
                  {/* Left arm: carries the ball in, then guides it */}
                  <g className='animate-player-arm-l-up origin-[80px_167px] transform-[rotate(42deg)]'>
                    <Limb d='M80 167 V186' />
                    <g className='animate-player-arm-l-fore origin-[80px_186px] transform-[rotate(-142.6deg)]'>
                      <Limb d='M80 186 V203' />
                      <Band d='M80 193 V198.5' />
                      <Fist cx={80} cy={203} />
                    </g>
                  </g>
                  {/* Right arm: swings, waves, then shoots */}
                  <g className='animate-player-arm-r-up origin-[121px_167px] transform-[rotate(-32deg)]'>
                    <Limb d='M121 167 V186' />
                    <g className='animate-player-arm-r-fore origin-[121px_186px] transform-[rotate(94.4deg)]'>
                      <Limb d='M121 186 V203' />
                      <Fist cx={121} cy={203} flip />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </svg>

          <svg viewBox='16 0 340 260' className='absolute inset-0 size-full'>
            {/* In front of the ball, so it drops through the net and rolls behind the
              pole and the first 4: lower pole (the back layer's copy shows above it,
              under the backboard) and base, the 404, the net (outlined white cords, front half), the front half of
              the rim. */}
            <g stroke={ink} strokeWidth='2.4' strokeLinejoin='round'>
              <path d='M235 99 H244 V249 H235 Z' fill={kit} stroke='none' />
              <path d='M240 99 V249 H244 V99 Z' fill={shade} stroke='none' />
              <path d='M235 99 V249 M244 99 V249' fill='none' />
              <ellipse cx='239.5' cy='249' rx='10' ry='3' fill={kit} />
              {/* The 4s pop in once the ball has stopped between them (wrappers: a CSS
                  transform would replace the digit's own translate) */}
              <g className='animate-four-in-l origin-[269px_250px]'>
                <Four x={256} />
              </g>
              <g className='animate-four-in-r origin-[335px_250px]'>
                <Four x={322} />
              </g>
            </g>
            <g className='animate-shot-net origin-[200px_86px]'>
              <path
                d={net}
                fill='none'
                stroke={ink}
                strokeWidth='3.6'
                strokeLinecap='round'
              />
              <path
                d={net}
                fill='none'
                stroke={white}
                strokeWidth='1.8'
                strokeLinecap='round'
              />
            </g>
            <Rim d='M177 86 A23 7 0 0 0 223 86' />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default Animation404
