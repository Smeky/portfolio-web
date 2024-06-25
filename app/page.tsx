'use client'

import { throttle } from '@/common/throttle'
import Navbar from '@/components/Navbar'
import React from 'react'
import SlideLanding from '@/components/SlideLanding'
import SlideOffers from '@/components/SlideOffers'
import SlideSkills from '@/components/SlideSkills'
import Swiper, { SwiperRef } from '@/components/Swiper'
import SwiperSideNavigation from '@/components/SwiperSideNavigation'

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


  // On scroll
  React.useEffect(() => {
    const handleWheel = throttle((e: WheelEvent) => {
      if (e.deltaY > 0) {
        swiperRef.current?.nextSlide()
      } else {
        swiperRef.current?.prevSlide()
      }
    }, 1000)

    window.addEventListener('wheel', handleWheel)

    return () => window.removeEventListener('wheel', handleWheel)
  }, [])

  // Todo: Wait for a brief moment before first slide (maybe loading animation)
  // Todo: Add swipe gesture

  return (
    <main>
      <Navbar onNavigationClick={(index: number) => swiperRef.current?.setSlide(index)} />

      <div className='w-screen h-screen grid place-items-center box-content'>
        <Swiper ref={swiperRef}>
          <SlideLanding />
          <SlideOffers />
          <SlideSkills />
        </Swiper>

        <SwiperSideNavigation left onClick={() => swiperRef.current?.prevSlide()} />
        <SwiperSideNavigation right onClick={() => swiperRef.current?.nextSlide()} />
      </div>
    </main>
  )
}
