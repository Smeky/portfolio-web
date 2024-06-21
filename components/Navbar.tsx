'use client'
import ThemeToggle from '@/components/ThemeToggle'

export default function Navbar() {
  return (
    <div className='h-0 sticky top-0'>
      <div className='p-2 flex flex-row justify-between'>
        <div className='text-primary'>🍔</div>
        <ThemeToggle />
      </div>
    </div>
  )
}
