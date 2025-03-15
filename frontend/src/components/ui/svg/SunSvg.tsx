import { SVGProps } from 'react'

interface SunSvgProps extends SVGProps<SVGSVGElement> {
  size?: number
}

const SunSvg = ({ size = 24, ...props }: SunSvgProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      xmlns='http://www.w3.org/2000/svg'
      {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        strokeWidth={0.5}
        d='M12 1.25a.75.75 0 01.75.75v2a.75.75 0 01-1.5 0V2a.75.75 0 01.75-.75zM3.669 3.716a.75.75 0 011.06-.047L6.95 5.7a.75.75 0 11-1.012 1.107L3.716 4.776a.75.75 0 01-.047-1.06zm16.662 0a.75.75 0 01-.047 1.06l-2.222 2.031A.75.75 0 0117.05 5.7l2.222-2.031a.75.75 0 011.06.047zM12 7.75a4.25 4.25 0 100 8.5 4.25 4.25 0 000-8.5zM6.25 12a5.75 5.75 0 1111.5 0 5.75 5.75 0 01-11.5 0zm-5 0a.75.75 0 01.75-.75h2a.75.75 0 010 1.5H2a.75.75 0 01-.75-.75zm18 0a.75.75 0 01.75-.75h2a.75.75 0 010 1.5h-2a.75.75 0 01-.75-.75zm-2.224 5.025a.75.75 0 011.06 0l2.222 2.223a.75.75 0 01-1.06 1.06l-2.223-2.222a.75.75 0 010-1.06zm-10.051 0a.75.75 0 010 1.061l-2.223 2.222a.75.75 0 01-1.06-1.06l2.222-2.223a.75.75 0 011.06 0zM12 19.25a.75.75 0 01.75.75v2a.75.75 0 01-1.5 0v-2a.75.75 0 01.75-.75z'
        fill='currentColor'
      />
    </svg>
  )
}

export default SunSvg
