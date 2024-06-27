'use client'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

interface SlideSkillsProps {
  isLeaving?: boolean,
  onLeaveEnd?: () => void
}

const Cards = [
  { label: 'Vue', icon: '/icons/vue.svg', href: 'https://vuejs.org/' },
  { label: 'Nuxt.js', icon: '/icons/nuxtjs.svg', href: 'https://nuxt.com/' },
  { label: 'React', icon: '/icons/react.svg', href: 'https://reactjs.org/' },
  { label: 'Next.js', icon: '/icons/nextjs.svg', href: 'https://nextjs.org/' },
  { label: 'Typescript', icon: '/icons/typescript.svg', href: 'https://www.typescriptlang.org/' },
]

export default function SlideSkills({ isLeaving, onLeaveEnd }: Readonly<SlideSkillsProps>) {
  const onAnimationEnd = React.useCallback((name: string) => name === 'exit' && onLeaveEnd?.(), [isLeaving])
  onAnimationEnd('exit')

  const variants = [
    // {
    //   from: { opacity: 0, x: -50},
    //   to: { opacity: 1, x: 0, transition: { duration: 1.0, delay: 0.5, type: 'spring', stiffness: 120 }},
    //   exit: { opacity: 0, x: 50, transition: { duration: 0.35 }}
    // },
  ]

  return (
    <AnimatePresence>
      {!isLeaving && (
        <div>
          <h1 className='text-5xl text-primary opacity-50 mb-16'>My skills</h1>
          
          <div className='grid grid-cols-5 gap-2'>
            {Cards.map((card, i) => (
              <a href={card.href} target='_blank' key={i} className='group aspect-square flex flex-col items-center justify-center border-2 border-primary/20 dark:border-primary/20 rounded-md p-8 opacity-50 hover:opacity-100 transition-all duration-300'>
                 <img 
                  src={card.icon || 'https://via.placeholder.com/150'} 
                  alt='icon' 
                  className={clsx(
                    'w-12 h-12 mb-4 group-hover:scale-125 grayscale-[50%] group-hover:grayscale-0 transition-all duration-300',
                    card.label === 'Next.js' && 'dark:invert'
                  )}
                />
                 <p className='text-primary font-semibold opacity-50 group-hover:opacity-100 transition-opacity duration-300'>{card.label}</p>
              </a> 
            ))}  
          </div>

          <div>
            <h4 className='text-primary text-2xl mb-6 mt-12'>Building Front-End Systems</h4>
            <p className='ml-4 text-xl text-primary font-light'>• Experienced in responsive design and static site generation</p>
            <p className='ml-4 text-xl text-primary font-light'>• Specializing in client-side CMS solutions for efficient content management</p>
            <p className='ml-4 text-xl text-primary font-light'>• Focused on optimizing your website for speed and performance</p>
            <p className='ml-4 text-xl text-primary font-light'>• Implementing robust, scalable front-end architectures.</p>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
