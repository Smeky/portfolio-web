'use client'
import clsx from 'clsx'
import { useEffect } from 'react'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import { useThemeStore } from '@/stores/theme'

export default function Theme() {
  const [theme, setTheme] = useThemeStore(state => [state.theme, state.setTheme])
  const swapTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  // This is a fallback when theme store init doesn't work with setting data-theme
  useEffect(() => document.documentElement.setAttribute('data-theme', theme), [])

  return (
    <div className='flex flex-row'>
      <div onClick={swapTheme} className='group p-1 rounded select-none cursor-pointer'>
        <MoonIcon className={clsx(
            'w-6 h-6 text-primary transition-colors transition-opacity duration-300 hover:opacity-100',
            theme === 'dark' ? 'opacity-100' : 'opacity-25',
          )} />
      </div>
      <div onClick={swapTheme} className='group p-1 rounded select-none cursor-pointer'>
        <SunIcon className={clsx(
            'w-6 h-6 text-primary transition-colors transition-opacity duration-300 hover:opacity-100',
            theme === 'light' ? 'opacity-100' : 'opacity-25',
          )} />
      </div>
    </div>
  )
}
