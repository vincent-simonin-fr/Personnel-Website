'use client'

import { InlineWidget } from 'react-calendly'

type ScheduleCallLinkProps = object

// https://calendly.com/vincent-simonin/15-minute-fr
const ScheduleCallLink = ({}: ScheduleCallLinkProps) => {
  return (
    <div className='relative h-full w-full'>
      <InlineWidget
        url='https://calendly.com/vincent-simonin/15min'
        styles={{
          width: '100%',
          height: '100%',
          colorScheme: 'light',
        }}
        pageSettings={{
          backgroundColor: '171717',
          hideEventTypeDetails: false,
          hideLandingPageDetails: false,
          primaryColor: '00a2ff',
          textColor: 'ffffff',
        }}
      />
    </div>
  )
}

export default ScheduleCallLink
