'use client'

import { useGlobalContext } from 'hooks/useGlobalContext'
import React, { useEffect } from 'react'

// TODO: Handle loading and error states
const Presentation = () => {
  const { dictionary: dict } = useGlobalContext()

  useEffect(() => {}, [dict])

  return (
    <div className='container mx-auto px-4 py-12'>
      <div className='mx-auto grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
        {dict &&
          dict.presentation.services.map((service, index) => (
            <div
              key={index}
              className='duration-800 transform rounded-lg border border-primary p-6 shadow-lg shadow-primary transition-shadow ease-in-out hover:scale-[1.01] hover:shadow-xl hover:shadow-primary'>
              <h2 className='mb-4 text-2xl font-semibold'>{service.title}</h2>
              <div className='text-base'>{service.description}</div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Presentation
