import { ReactElement } from 'react'
import { Illustration } from 'types'

type ProjectIllustrationProps = { kind: Illustration; className?: string }

// Abstract drawings instead of screenshots (client projects are confidential).
// Neutral strokes use currentColor (set by the parent), the accent is fuchsia.
// Explicit return type: a missing `kind` case fails the type check.
const drawing = (kind: Illustration): ReactElement => {
  switch (kind) {
    case 'floorplan':
      return (
        <g fill='none' strokeWidth={1.5}>
          <rect
            x='40'
            y='40'
            width='320'
            height='220'
            rx='6'
            stroke='currentColor'
          />
          <path
            d='M180 40v90M180 170v90M40 150h90M170 150h190M270 150v110'
            stroke='currentColor'
          />
          <rect
            x='186'
            y='46'
            width='168'
            height='98'
            rx='4'
            className='fill-fuchsia-500/15 stroke-fuchsia-500'
          />
          <rect
            x='276'
            y='156'
            width='78'
            height='98'
            rx='4'
            className='fill-fuchsia-500/10'
          />
          {[60, 90, 120, 150].map((x) => (
            <g key={x} stroke='currentColor'>
              <rect x={x} y='60' width='18' height='12' rx='2' />
              <rect x={x} y='95' width='18' height='12' rx='2' />
            </g>
          ))}
          {[210, 245, 280, 315].map((x) => (
            <rect
              key={x}
              x={x}
              y='75'
              width='22'
              height='14'
              rx='2'
              className='stroke-fuchsia-500'
            />
          ))}
        </g>
      )
    case 'schedule':
      return (
        <g strokeWidth={1.5}>
          {[70, 110, 150, 190, 230].map((y) => (
            <path
              key={y}
              d={`M30 ${y}h340`}
              stroke='currentColor'
              strokeOpacity={0.4}
            />
          ))}
          <rect
            x='50'
            y='58'
            width='110'
            height='24'
            rx='12'
            fill='currentColor'
            fillOpacity={0.35}
          />
          <rect
            x='120'
            y='98'
            width='140'
            height='24'
            rx='12'
            className='fill-fuchsia-500/80'
          />
          <rect
            x='170'
            y='138'
            width='90'
            height='24'
            rx='12'
            fill='currentColor'
            fillOpacity={0.35}
          />
          <rect
            x='230'
            y='178'
            width='120'
            height='24'
            rx='12'
            className='fill-fuchsia-500/40'
          />
          <rect
            x='280'
            y='218'
            width='70'
            height='24'
            rx='12'
            fill='currentColor'
            fillOpacity={0.25}
          />
          <path
            d='M215 40v220'
            strokeDasharray='4 6'
            className='stroke-fuchsia-500'
          />
          <circle cx='215' cy='40' r='5' className='fill-fuchsia-500' />
        </g>
      )
    case 'devices':
      return (
        <g fill='none' strokeWidth={1.5}>
          {[
            [70, 60],
            [200, 40],
            [330, 60],
            [70, 240],
            [200, 260],
            [330, 240],
          ].map(([x, y]) => (
            <g key={`${x}-${y}`}>
              <path
                d={`M200 150L${x} ${y}`}
                stroke='currentColor'
                strokeDasharray='3 5'
              />
              <rect
                x={x - 22}
                y={y - 16}
                width='44'
                height='32'
                rx='8'
                stroke='currentColor'
                className='fill-background'
              />
              <circle cx={x + 12} cy={y - 6} r='3' className='fill-fuchsia-500' />
            </g>
          ))}
          <circle
            cx='200'
            cy='150'
            r='34'
            className='fill-fuchsia-500/15 stroke-fuchsia-500'
          />
          <circle cx='200' cy='150' r='10' className='fill-fuchsia-500' />
        </g>
      )
    case 'roads':
      return (
        <g fill='none' strokeWidth={1.5}>
          <g stroke='currentColor'>
            <path d='M20 250C90 220 110 150 170 140S260 90 380 40' />
            <path d='M40 60C120 90 150 140 170 140' />
            <path d='M170 140C220 180 260 220 360 260' />
            <path d='M90 290C110 220 140 190 170 140' />
            <path d='M260 95C280 150 330 170 390 160' />
          </g>
          <path
            d='M20 250C90 220 110 150 170 140S260 90 380 40'
            strokeWidth={2.5}
            strokeDasharray='6 6'
            className='stroke-fuchsia-500'
          />
          <g strokeWidth={2} className='fill-background stroke-fuchsia-500'>
            <circle cx='170' cy='140' r='7' />
            <circle cx='260' cy='95' r='5' />
            <circle cx='95' cy='205' r='5' />
          </g>
          <g fill='currentColor'>
            <circle cx='40' cy='60' r='4' />
            <circle cx='360' cy='260' r='4' />
            <circle cx='390' cy='160' r='4' />
          </g>
        </g>
      )
    case 'layers':
      return (
        <g strokeWidth={1.5}>
          <polygon
            points='200,260 330,200 200,140 70,200'
            fill='currentColor'
            fillOpacity={0.1}
            stroke='currentColor'
          />
          <polygon
            points='200,220 330,160 200,100 70,160'
            fill='currentColor'
            fillOpacity={0.15}
            stroke='currentColor'
          />
          <polygon
            points='200,180 330,120 200,60 70,120'
            className='fill-fuchsia-500/15 stroke-fuchsia-500'
          />
          <path
            d='M200 124v106'
            strokeDasharray='3 5'
            className='stroke-fuchsia-500'
          />
          <circle cx='200' cy='120' r='4' className='fill-fuchsia-500' />
          <circle cx='250' cy='120' r='3' className='fill-fuchsia-500/60' />
          <circle cx='150' cy='120' r='3' className='fill-fuchsia-500/60' />
        </g>
      )
    case 'interface':
      // A redesigned search screen: search bar, filters column, result rows.
      return (
        <g fill='none' strokeWidth={1.5}>
          <rect
            x='40'
            y='30'
            width='320'
            height='240'
            rx='10'
            stroke='currentColor'
          />
          <path d='M40 58h320' stroke='currentColor' />
          {[56, 70, 84].map((x) => (
            <circle
              key={x}
              cx={x}
              cy='44'
              r='4'
              fill='currentColor'
              fillOpacity={0.4}
            />
          ))}
          <rect
            x='60'
            y='74'
            width='280'
            height='30'
            rx='15'
            className='fill-fuchsia-500/15 stroke-fuchsia-500'
          />
          <circle cx='80' cy='89' r='6' className='stroke-fuchsia-500' />
          <path
            d='M84 93l5 5'
            strokeLinecap='round'
            className='stroke-fuchsia-500'
          />
          {[126, 150, 174, 198].map((y, i) => (
            <g key={y}>
              <rect
                x='60'
                y={y - 6}
                width='12'
                height='12'
                rx='3'
                stroke='currentColor'
                className={i < 2 ? 'fill-fuchsia-500/80 stroke-fuchsia-500' : ''}
              />
              <path
                d={`M80 ${y}h40`}
                stroke='currentColor'
                strokeOpacity={0.5}
                strokeLinecap='round'
              />
            </g>
          ))}
          {[120, 166, 212].map((y, i) => (
            <g key={y}>
              <rect
                x='140'
                y={y}
                width='200'
                height='36'
                rx='6'
                stroke='currentColor'
                className={i === 0 ? 'stroke-fuchsia-500' : ''}
              />
              <path
                d={`M154 ${y + 13}h110M154 ${y + 24}h70`}
                stroke='currentColor'
                strokeOpacity={0.5}
                strokeLinecap='round'
              />
            </g>
          ))}
        </g>
      )
  }
}

const ProjectIllustration = ({ kind, className = '' }: ProjectIllustrationProps) => (
  <svg
    aria-hidden
    focusable='false'
    viewBox='0 0 400 300'
    preserveAspectRatio='xMidYMid meet'
    className={className}>
    {drawing(kind)}
  </svg>
)

export default ProjectIllustration
