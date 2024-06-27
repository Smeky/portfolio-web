'use client'

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Sections from '@/components/Sections'
import AnimatedText from '@/components/AnimatedText'
import ScrollIndicator from '@/components/ScrollIndicator'
import Swiper from '@/components/Swiper'
import { useCallback } from 'react'

export default function Homepage() {
  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <main>
      <Navbar />
      <ScrollIndicator onClick={() => scrollTo('sectionOffers')} className='absolute z-10 bottom-[4rem] left-1/2 -translate-x-1/2' />

      <Swiper className='w-screen h-screen' navigation pagination>
        <Swiper.Slide className='p-8'>
          <div className='grid place-items-center w-full h-full'>
            <div className='flex flex-col w-full max-w-[32rem]'>
              <img
                src='/images/avatar.svg'
                alt='Avatar'
                className='-mb-4 w-40 h-40 self-end pointer-events-none'
              />
              <div>
                <h1 className='text-5xl font-bold text-primary'>
                  Hi! 👋<br />
                  my name is <span className='text-blue-500'>Tom</span>
                </h1>
              </div>
              <div className='relative'>
                <p className='absolute z-0 mt-1 ml-16 text-2xl text-gray-500 whitespace-nowrap'>
                  I'm a&nbsp;
                  <AnimatedText strings={['Senior Front-End Developer', 'Web Developer', 'Game Developer']} pause={2000} delay={2000} />
                </p>
              </div>
            </div>
          </div>
        </Swiper.Slide>
        <Swiper.Slide>
          <p className='text-primary'>Testy test 2222</p>
        </Swiper.Slide>
      </Swiper>
    
      <div id='sectionOffers'><Sections.Offers /></div>
      <div id='sectionSkills'><Sections.Skills /></div>

      <Footer />
    </main>
  )
}
