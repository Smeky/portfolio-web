'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { useCallback, useEffect } from 'react'
import { NavItem } from '@/components/Navbar'

interface NavbarMenuProps {
  open: boolean
  items: NavItem[]
  onClick: (item: NavItem) => void
  onClose: () => void
}

export default function NavbarMenu({ open, items, onClick, onClose }: Readonly<NavbarMenuProps>) {

  useEffect(() => {
    if (open) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape')
          onClose()
      }

      window.addEventListener('keydown', handleKeyDown)

      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, onClose])

  const onItemClick = useCallback((item: NavItem): void => {
    onClick(item)
    onClose()
  }, [onClick, onClose])
  
  // Todo: Add animated underline on hover

  return (
    <AnimatePresence>
      { open && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed z-10 top-0 left-0 min-w-full min-h-screen flex'
        >
          <div className='flex-1 bg-background transition-background duration-300'>
            <div onClick={onClose} className='fixed z-10 p-3 top-0 right-0 cursor-pointer opacity-75 hover:opacity-100 transition-opacity duration-300'>
              <XMarkIcon className='h-8 w-8 dark:invert transition-all duration-300'/>
            </div>

            <div className='fixed top-1/3 left-1/4 -translate-y-1/2'>
              <ul className='flex flex-col justify-center p-4'>
                { items.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -200 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ type: 'spring', stiffness: 100, delay: 0.2 + i * 0.2, duration: 0.5 }}
                  >
                    <p onClick={() => onItemClick(item)} className='p-2 text-3xl font-semibold text-primary cursor-pointer opacity-70 hover:opacity-100 transition-all duration-300'>
                      {item.title}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}