'use client'
import ThemeToggle from '@/components/ThemeToggle'
import NavbarMenu from '@/components/NavbarMenu'
import { useEffect, useState } from 'react'
import { Bars3Icon } from '@heroicons/react/24/outline'

interface NavbarProps {
  onNavigationClick: (index: number) => void
}

export interface NavItem {
  id: number,
  title: string
}

export default function Navbar({ onNavigationClick }: Readonly<NavbarProps>) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems: NavItem[] = [
    { id: 0, title: 'Home' },
    { id: 1, title: 'My offers' },
    { id: 2, title: 'My skills' },
    { id: 3, title: 'My Work' },
  ]

  // On 'Q" open menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'q')
        setIsMenuOpen(true)
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  })

  return (
    <div className='sticky z-20 h-0 top-0 select-none'>
      <div className='p-2 flex flex-row justify-between'>
        <ThemeToggle />

        <div className='text-2xl p-1 cursor-pointer' onClick={() => setIsMenuOpen(true)}>
          <Bars3Icon className='w-8 h-8 text-primary' />
        </div>
        <NavbarMenu 
          open={isMenuOpen}
          items={navItems}
          onClick={(item) => onNavigationClick(item.id)}
          onClose={() => setIsMenuOpen(false)} />
      </div>
    </div>
  )
}
