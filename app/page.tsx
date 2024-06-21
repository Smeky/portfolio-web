'use client'
import { motion } from 'framer-motion'

export default function Homepage() {
  const duration = 0.7
  const delay = 0.4

  return (
    <main>
      <div className='w-screen h-[80vh] grid place-items-center box-content'>
        <div className='flex flex-col'>
          <motion.img 
            initial={{ opacity: 0, scale: 0.5, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration, delay: delay * 1.0 }}
            src='/images/avatar.svg' 
            alt='Avatar' 
            className='-mb-4 w-40 h-40 self-end pointer-events-none'
          />
          <motion.div
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration, delay: delay * 1.75 }}
          >
            <h1 className='text-5xl font-bold text-primary'>
              Hi! 👋<br/>
              my name is <span className='text-blue-500'>Tom</span>
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration, delay: delay * 2.5 }}
          >
            <p className='mt-1 ml-16 text-2xl text-gray-500'>Senior Front-end developer from Pilsen</p>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
