import { SVGProps } from 'react'

interface ArrowUpSvgProps extends SVGProps<SVGSVGElement> {
  size?: number
}

const ArrowUpSvg = ({ size = 24, ...props }: ArrowUpSvgProps) => {
  return (
    <svg
      width={24}
      height={24}
      viewBox='0 0 24 24'
      fill='currentColor'
      stroke='currentColor'
      xmlns='http://www.w3.org/2000/svg'
      {...props}>
      <path
        d='M12 20V4m0 0l6 6m-6-6l-6 6'
        fill='currentColor'
        stroke='currentColor'
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default ArrowUpSvg
