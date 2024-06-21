'use client'
import { create } from 'zustand'

type Theme = 'light' | 'dark'

interface ThemeStore {
  theme: string,
  setTheme: (theme: Theme) => void
}

function loadInitialTheme(): Theme {
  let theme = window.localStorage.getItem('theme') as Theme | null

  if (theme !== 'dark' && theme !== 'light')
    theme = 'dark'
  
  window.localStorage.setItem('theme', theme)
  document.documentElement.setAttribute('data-theme', theme)

  return theme
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: loadInitialTheme(),

  setTheme: (newTheme: Theme) => {
    set((state) => {
      if (state.theme === newTheme) 
        return {}

      window.localStorage.setItem('theme', newTheme)
      document.documentElement.setAttribute('data-theme', newTheme)

      return { theme: newTheme }
    })
  }
}))
