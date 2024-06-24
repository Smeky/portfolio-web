'use client'
import ThemeToggle from '@/components/ThemeToggle'
import NavbarMenu from '@/components/NavbarMenu'
import { useState } from 'react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(true)

  return (
    <div className='sticky z-10 h-0 top-0 select-none'>
      <div className='p-2 flex flex-row justify-between'>
        <ThemeToggle />

        <div className='text-2xl cursor-pointer' onClick={() => setIsMenuOpen(true)}>🍔</div>
        <NavbarMenu open={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      </div>
    </div>
  )
}
