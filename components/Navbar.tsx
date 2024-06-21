'use client'
import Theme from '@/components/Theme'

export default function Navbar() {
  return (
    <div className="p-2 flex flex-row justify-between">
      <div className='text-primary'>🍔</div>
      <Theme />
    </div>
  )
}
