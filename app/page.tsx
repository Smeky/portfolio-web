'use client'

import SlideLanding from '@/components/SlideLanding'
import SlideOfferings from '@/components/SlideOfferings'
import Swiper from '@/components/Swiper'
import React from 'react'

export default function Homepage() {
  const [ index, setIndex ] = React.useState(0)

  // On keyboard arrow press
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setIndex((prev) => prev + 1)
      } else if (e.key === 'ArrowLeft') {
        setIndex((prev) => prev - 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Todo: Wait for a brief moment before first slide (maybe loading animation)

  return (
    <main>
      <div className='w-screen h-screen grid place-items-center box-content'>
        <Swiper index={index}>
          <SlideLanding />
          <SlideOfferings />
        </Swiper>
      </div>
    </main>
  )
}
