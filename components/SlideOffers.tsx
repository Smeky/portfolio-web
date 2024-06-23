'use client'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

interface SlideOffersProps {
  isLeaving?: boolean,
  onLeaveEnd?: () => void
}

export default function SlideOffers({ isLeaving, onLeaveEnd }: Readonly<SlideOffersProps>) {
  const onAnimationEnd = React.useCallback((name: string) => name === 'exit' && onLeaveEnd?.(), [isLeaving])
  const duration = 0.7

  const variants = [
    {
      from: { opacity: 0, scale: 0.5, y: -50, transition: { duration }},
      to: { opacity: 1, scale: 1, y: 0, transition: { duration }},
      exit: { opacity: 0, scale: 0.5, y: -50, transition: { duration: duration * 0.5 }}
    },
    {
      from: { opacity: 0, y: -25, transition: { duration }},
      to: { opacity: 1, y: 0, transition: { duration }},
      exit: { opacity: 0, y: -25, transition: { duration: duration * 0.5 }}
    },
    {
      from: { opacity: 0, x: 25, transition: { duration }},
      to: { opacity: 1, x: 0, transition: { duration, delay: 0.7 }},
      exit: { opacity: 0, x: 25, transition: { duration: duration * 0.5 }}
    }
  ]

  return (
    <AnimatePresence>
      {!isLeaving && (
        <div className='flex flex-col'>
          <motion.div
            variants={variants[1]}
            initial='from'
            animate='to'
            exit='exit'
            onAnimationComplete={onAnimationEnd}
          >
            <h1 className='text-5xl font-bold text-primary'>
              Hi! 👋<br />
              my name is <span className='text-blue-500'>Tom</span>
            </h1>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
