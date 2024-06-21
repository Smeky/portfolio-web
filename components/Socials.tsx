'use client'

export default function Socials() {
  return (
    <div className='flex flex-row gap-2 mx-4 w-fit'>
      <a href='' target='_blank' rel='noopener noreferrer'>
        <img src='/icons/github.svg' alt='GitHub' className='w-6 h-6 dark:invert transition-all duration-300 dark:opacity-25 opacity-50 hover:opacity-75' />
      </a>
      <a href='' target='_blank' rel='noopener noreferrer'>
        <img src='/icons/linkedin.svg' alt='LinkedIn' className='w-6 h-6 dark:invert transition-all duration-300 dark:opacity-25 opacity-50 hover:opacity-75' />
      </a>
    </div>
  )
}