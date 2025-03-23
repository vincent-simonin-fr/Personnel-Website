'use client'

import { siteConfig } from 'config/site'

const color = siteConfig.color.hex

// https://www.svgbackgrounds.com/elements/animated-svg-preloaders/
const IsLoadingComponent = () => {
  return (
    <div className='flex min-h-[calc(100vh-60px)] w-full items-center justify-center'>
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 20' width='100%' height='100%'>
        {[...Array(3)].map((_, index) => (
          <circle
            key={index}
            fill={color}
            stroke={color}
            strokeWidth='2'
            r='2'
            cx={90 + index * 10}
            cy='10'>
            <animate
              attributeName='opacity'
              calcMode='spline'
              dur='2s'
              values='1;0;1;'
              keySplines='.5 0 .5 1;.5 0 .5 1'
              repeatCount='indefinite'
              begin={`-${0.4 - index * 0.2}s`}
            />
          </circle>
        ))}
      </svg>
    </div>
  )
}

export default IsLoadingComponent
