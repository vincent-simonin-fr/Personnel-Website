import { SVGProps } from 'react'

interface GermanySvgProps extends SVGProps<SVGSVGElement> {
  size?: number
}

const GermanySvg = ({ size = 24, ...props }: GermanySvgProps) => {
  return (
    <svg
      width={size}
      height={size}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 130 120'
      {...props}>
      <path fill='#1E1D1D' d='M0 0H130V39H0z' />
      <path fill='#DC4437' d='M0 39H130V81H0z' />
      <path fill='#FCBE1F' d='M0 81H130V120H0z' />
    </svg>
  )
}

export default GermanySvg
