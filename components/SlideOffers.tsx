'use client'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import AnimatedText from './AnimatedText'

interface SlideOffersProps {
  isLeaving?: boolean,
  onLeaveEnd?: () => void
}

export default function SlideOffers({ isLeaving, onLeaveEnd }: Readonly<SlideOffersProps>) {
  const onAnimationEnd = React.useCallback((name: string) => name === 'exit' && onLeaveEnd?.(), [isLeaving])
  const [isTyping, setIsTyping] = React.useState(true)

  const variants = [
    {
      from: { opacity: 0, x: -100},
      to: { opacity: 1, x: 0, transition: { duration: 1.0, delay: 0.5, type: 'spring', stiffness: 120 }},
      exit: { opacity: 0, x: 100, transition: { duration: 0.35 }}
    },
    {
      from: { opacity: 0, x: -100},
      to: { opacity: 1, x: 0, transition: { duration: 1.0, delay: 1.0, type: 'spring', stiffness: 120 }},
      exit: { opacity: 0, x: 100, transition: { duration: 0.35 }}
    },
  ]

  return (
    <AnimatePresence>
      {!isLeaving && (
        <div className='flex items-center justify-center relative w-full min-[40rem]:h-1/2'>
          <div className='flex flex-col h-full'>
            <motion.div exit={{ opacity: 0, y: -50 }} transition={{ duration: 0.5 }} className='min-[40rem]:min-w-[32rem] w-full'>
              <AnimatedText
                strings={['How I can help you']}
                delay={500}
                speed={500}
                loop={false}
                onEnd={() => setIsTyping(false)}
                className='text-5xl text-primary opacity-50 select-none'
              />
            </motion.div>

            {!isTyping && (
              <div>
                <motion.div
                  variants={variants[0]}
                  initial='from'
                  animate='to'
                  exit='exit'
                  className='mx-16 mt-16 flex flex-col gap-1'
                >
                  <h3 className='mb-3 text-4xl text-primary'>Web Development</h3>
                  <p className='ml-4 text-xl text-primary font-light'>• Crafting dynamic and responsive websites.</p>
                  <p className='ml-4 text-xl text-primary font-light'>• Seamless integration and user-friendly design.</p>
                </motion.div>
                <motion.div
                  variants={variants[1]}
                  initial='from'
                  animate='to'
                  exit='exit'
                  className='mx-16 mt-16 flex flex-col gap-1'
                  onAnimationComplete={onAnimationEnd}
                >
                  <h3 className='mb-3 text-4xl text-primary'>Front-End Development in Vue and React</h3>
                  <p className='ml-4 text-xl text-primary font-light'>• Building modern, reactive interfaces with Vue and React.</p>
                  <p className='ml-4 text-xl text-primary font-light'>• Optimize performance for smooth user experience.</p>
                  <p className='ml-4 text-xl text-primary font-light'>• Expert in creating SPAs (Single Page Applications).</p>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
