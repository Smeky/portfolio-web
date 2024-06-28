'use client'

import { ArrowDownIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'

interface ScrollIndicatorProps {
  className?: string
  onClick?: () => void
}

export default function ScrollIndicator({ className, onClick }: Readonly<ScrollIndicatorProps>): JSX.Element {
  // Todo: Animation, add delay prop
  
  return (
    <div onClick={onClick} className={clsx('group rounded-full border border-primary/20 hover:border-primary p-3 hover:p-4 cursor-pointer select-none transition-all duration-300', className)}>
      <ArrowDownIcon className='w-6 h-6 lg:w-8 lg:h-8 text-primary opacity-70 group-hover:opacity-100 transition-all duration-300' />
    </div>
  )
}
