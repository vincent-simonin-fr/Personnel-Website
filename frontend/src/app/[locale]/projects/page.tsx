'use client'

import { useAppContext } from 'hooks/useAppContext'
import { useEffect } from 'react'

type ServicesProps = object

const Services = ({}: ServicesProps) => {
  const { dictionary, locale } = useAppContext()

  useEffect(() => {
    if (dictionary?.navigation?.[1]?.title) {
      document.title = dictionary.navigation[1].title
    }
  }, [locale])

  return (
    <div className='flex min-h-[calc(100vh-60px)] w-[84vw] flex-col items-start justify-center py-8'>
      <div className='mb-8 text-start text-2xl'>
        {dictionary && dictionary.presentation.introduction}
      </div>
      <div className='mx-auto grid h-full grid-cols-1 gap-8 md:grid-cols-1 lg:grid-cols-1'>
        <h2 className='mb-4 text-4xl font-semibold'>Mes services</h2>
        {dictionary &&
          dictionary.presentation.services.map((service, index) => (
            <div key={index} className=''>
              <h2 className='mb-4 text-4xl font-semibold'>{service.title}</h2>
              <div className='text-2xl'>{service.description}</div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Services
