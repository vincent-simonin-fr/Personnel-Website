import { SVGProps } from 'react'

interface FranceSvgProps extends SVGProps<SVGSVGElement> {
  size?: number
}

const FranceSvg = ({ size = 24, ...props }: FranceSvgProps) => {
  return (
    <svg
      width={size}
      height={size}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 130 120'
      {...props}>
      <path fill='#DB3A49' d='M87 0H130V120H87z' />
      <path fill='#FFF' d='M43 0H87V120H43z' />
      <path fill='#2A66B7' d='M0 0H43V120H0z' />
    </svg>
  )
}

export default FranceSvg
