'use client'

import Presentation from 'components/Presentation'

type ServicesProps = object

const Services = ({}: ServicesProps) => {
  return (
    <div className='flex h-[calc(100vh-60px)] flex-col items-center justify-center'>
      <Presentation />
    </div>
  )
}

export default Services
