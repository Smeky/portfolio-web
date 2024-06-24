'use client'

import clsx from 'clsx'
import { useEffect, useState } from 'react'

interface SwiperNavigationProps {
  count: number,
  current: number,
  onClick: (index: number) => void,
}

export default function SwiperNavigation({ count, current, onClick }: SwiperNavigationProps) {
  return (
    <div className='fixed z-10 mb-5 bottom-0 left-1/2 -translate-x-1/2 flex flex-row items-end'>
      { Array(count).fill(1).map((el, i) =>
        <div 
          key={i} 
          className={clsx(
            'group p-2 cursor-pointer hover:opacity-100 transition-opacity duration-300',
            i === current ? 'opacity-80' : 'opacity-20'
          )}
          onClick={() => onClick(i)}
        >
          <div className={clsx(
            'rounded-full w-4 h-4 bg-primary group-hover:scale-150 transform-all duration-300',
            i === current ? 'scale-125' : 'scale-100'
          )}></div>
        </div>
      )}
    </div>
  )
}
6