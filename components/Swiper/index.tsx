'use client'

import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { useMemo, useState } from 'react'
import clsx from 'clsx'

interface SwiperProps {
  className?: string
  children: React.ReactNode
  navigation?: boolean
  pagination?: boolean
}

function SwiperWrapper({ className, children, navigation, pagination }: Readonly<SwiperProps>): JSX.Element {
  const [swiperRef, setSwiperRef] = useState<SwiperClass | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  
  const modules = useMemo(() => {
    const modules = []
    if (navigation) modules.push(Navigation)
    if (pagination) modules.push(Pagination)
    return modules
  }, [navigation, pagination])

  return (
    <div className={className}>
      <Swiper 
        className='w-full h-full'
        modules={modules} 
        pagination={false} 
        navigation={navigation}
        onSwiper={(swiper) => setSwiperRef(swiper)}
        onSlideChange={() => setActiveIndex(swiperRef?.activeIndex ?? 0)}
      >
        { children }
      </Swiper>

      {/* Pagination */}
      { pagination && (
        <div className='absolute z-10 mb-5 bottom-0 left-1/2 -translate-x-1/2 flex flex-row items-end select-none'>
          { Array((children as React.ReactNode[])?.length ?? 0).fill(1).map((_, i) =>
            <div 
              key={i} 
              onClick={() => swiperRef?.slideTo(i)}
              className={clsx(
                'group p-2 content-box cursor-pointer hover:opacity-100 transition-opacity duration-300',
                i === activeIndex ? 'opacity-80' : 'opacity-20'
              )}
            >
              <div className={clsx(
                'overflow-visible rounded-full w-3 h-3 bg-primary group-hover:scale-150 transform-all duration-300',
                i === activeIndex ? 'scale-125' : 'scale-100'
              )}></div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

SwiperWrapper.Slide = SwiperSlide

export default SwiperWrapper
