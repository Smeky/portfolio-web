'use client'

import Navbar from '@/components/Navbar'
import SlideLanding from '@/components/SlideLanding'
import SlideOffers from '@/components/SlideOffers'
import Swiper, { SwiperRef } from '@/components/Swiper'
import React from 'react'

export default function Homepage() {
  const swiperRef = React.useRef<SwiperRef>(null)

  // On keyboard arrow press
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        swiperRef.current?.nextSlide()
      } else if (e.key === 'ArrowLeft') {
        swiperRef.current?.prevSlide()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Todo: Wait for a brief moment before first slide (maybe loading animation)

  return (
    <main>
      <Navbar onNavigationClick={(index: number) => swiperRef.current?.setSlide(index)} />

      <div className='w-screen h-screen grid place-items-center box-content'>
        <Swiper ref={swiperRef}>
          <SlideLanding />
          <SlideOffers />
        </Swiper>
      </div>
    </main>
  )
}
