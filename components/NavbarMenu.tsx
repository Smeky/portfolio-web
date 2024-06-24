'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { useEffect } from 'react'

interface NavbarMenuProps {
  open: boolean
  onClose: () => void
}

export default function NavbarMenu({ open, onClose }: Readonly<NavbarMenuProps>) {
  useEffect(() => {
    if (open) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape')
          onClose()
      }

      window.addEventListener('keydown', handleKeyDown)

      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  return (
    <AnimatePresence>
      { open && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='absolute z-10 top-0 left-0 min-w-full min-h-screen bg-background flex'
        >
          <div onClick={onClose} className='absolute z-10 p-3 top-0 right-0 cursor-pointer opacity-75 hover:opacity-100 transition-opacity duration-300'>
            <XMarkIcon className='h-8 w-8 invert'/>
          </div>

          <motion.div
            initial={{ transform: 'scale(0.75)' }}
            animate={{ transform: 'scale(1)' }}
            exit={{ transform: 'scale(0.5)' }}
            className='flex flex-col justify-center p-4'
          >
            <div className='flex flex-col justify-center p-4'>
              <a href='#' className='text-3xl font-bold text-primary'>Home</a>
              <a href='#' className='text-3xl font-bold text-primary'>About</a>
              <a href='#' className='text-3xl font-bold text-primary'>Projects</a>
              <a href='#' className='text-3xl font-bold text-primary'>Contact</a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}