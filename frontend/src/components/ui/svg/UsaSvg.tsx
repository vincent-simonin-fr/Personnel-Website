import { SVGProps } from 'react'

interface UsaSvgProps extends SVGProps<SVGSVGElement> {
  size?: number
}

const UsaSvg = ({ size = 24, ...props }: UsaSvgProps) => {
  return (
    <svg
      width={size}
      height={size}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 130 120'
      {...props}>
      <path fill='#D8D8D8' d='M-200 -1350H1980V350H-200z' />
      <path fill='#DC4437' d='M0 0H130V13.3H0z' />
      <path fill='#DC4437' d='M0 26.7H130V40H0z' />
      <path fill='#DC4437' d='M0 80H130V93.3H0z' />
      <path fill='#DC4437' d='M0 106.7H130V120H0z' />
      <path fill='#DC4437' d='M0 53.3H130V66.6H0z' />
      <path fill='#FFF' d='M0 13.3H130V26.6H0z' />
      <path fill='#FFF' d='M0 40H130V53.3H0z' />
      <path fill='#FFF' d='M0 93.3H130V106.6H0z' />
      <path fill='#FFF' d='M0 66.7H130V80H0z' />
      <path fill='#2A66B7' d='M0 0H70V66.7H0z' />
      <path
        fill='#FFF'
        d='M13.5 4L15.8 8.9 21 9.7 17.2 13.6 18.1 19 13.5 16.4 8.9 19 9.8 13.6 6 9.7 11.2 8.9z'
      />
      <path
        fill='#FFF'
        d='M34 4L36.3 8.9 41.5 9.7 37.8 13.6 38.6 19 34 16.4 29.4 19 30.2 13.6 26.5 9.7 31.7 8.9z'
      />
      <path
        fill='#FFF'
        d='M54.5 4L56.8 8.9 62 9.7 58.2 13.6 59.1 19 54.5 16.4 49.9 19 50.8 13.6 47 9.7 52.2 8.9z'
      />
      <path
        fill='#FFF'
        d='M24 24L26.3 28.9 31.5 29.7 27.8 33.6 28.6 39 24 36.4 19.4 39 20.2 33.6 16.5 29.7 21.7 28.9z'
      />
      <path
        fill='#FFF'
        d='M44.5 24L46.8 28.9 52 29.7 48.2 33.6 49.1 39 44.5 36.4 39.9 39 40.8 33.6 37 29.7 42.2 28.9z'
      />
      <path
        fill='#FFF'
        d='M13.5 45.2L15.8 50.1 21 50.9 17.2 54.7 18.1 60.2 13.5 57.6 8.9 60.2 9.8 54.7 6 50.9 11.2 50.1z'
      />
      <path
        fill='#FFF'
        d='M34 45.2L36.3 50.1 41.5 50.9 37.8 54.7 38.6 60.2 34 57.6 29.4 60.2 30.2 54.7 26.5 50.9 31.7 50.1z'
      />
      <path
        fill='#FFF'
        d='M54.5 45.2L56.8 50.1 62 50.9 58.2 54.7 59.1 60.2 54.5 57.6 49.9 60.2 50.8 54.7 47 50.9 52.2 50.1z'
      />
    </svg>
  )
}

export default UsaSvg
