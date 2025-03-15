import { SVGProps } from 'react'

interface ChevronDownSvgProps extends SVGProps<SVGSVGElement> {
  size?: number
}

const ChevronDownSvg = ({ size = 24, ...props }: ChevronDownSvgProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      {...props}>
      <path
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M5 8.5L12 15.5 19 8.5'
      />
    </svg>
  )
}

export default ChevronDownSvg
