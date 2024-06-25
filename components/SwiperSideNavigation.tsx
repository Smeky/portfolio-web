'use client'

import { ArrowRightIcon } from '@heroicons/react/24/solid'
import styles from './SwiperSideNavigation.module.css'
import clsx from 'clsx'

interface SwiperSideNavigationProps {
  right?: boolean
  left?: boolean
  onClick: () => void
}

export default function SwiperSideNavigation({ right = true, left = false, onClick }: Readonly<SwiperSideNavigationProps>) {
  left = left ?? !right

  return (
    <div onClick={onClick} className={clsx(
      'group absolute right-0 top-0 h-full grid items-center justify-end cursor-pointer w-32 bg-red/50 select-none',
      styles.swiperSideNavigation,
      left && styles.leftSwiperSideNavigation,
    )}>
      <ArrowRightIcon 
        className={clsx(
          'w-16 h-16 mr-8 text-primary opacity-35 group-hover:opacity-80 transition-opacity duration-300',
          left && 'transform rotate-180'
        )}
      />
    </div>
  )
}
