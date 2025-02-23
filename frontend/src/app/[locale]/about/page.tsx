'use client'

import ScheduleCallLink from 'components/ScheduleCallLink'

type AboutProps = object

const About = ({}: AboutProps) => {
  return (
    <div className='flex h-[calc(100vh-60px)] flex-col items-center justify-center'>
      <ScheduleCallLink />
    </div>
  )
}

export default About
