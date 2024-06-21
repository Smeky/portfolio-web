'use client'
import { create } from 'zustand'

type Theme = 'light' | 'dark'

interface ThemeStore {
  theme: string,
  loadTheme: () => void,
  setTheme: (theme: Theme) => void,
  swapTheme: () => void
}

export const useThemeStore = create<ThemeStore>((set, get) => ({
  theme: 'dark',

  loadTheme: () => {
    set(() => {
      let theme = window.localStorage.getItem('theme') as Theme | null

      if (theme !== 'dark' && theme !== 'light')
        theme = 'dark'
      
      window.localStorage.setItem('theme', theme)
      document.documentElement.setAttribute('data-theme', theme)
      document.documentElement.classList.add(theme)

      return { theme }
    })
  },
  setTheme: (newTheme: Theme) => {
    set((state) => {
      if (state.theme === newTheme) 
        return {}

      window.localStorage.setItem('theme', newTheme)
      document.documentElement.setAttribute('data-theme', newTheme)
      document.documentElement.classList.remove(state.theme)
      document.documentElement.classList.add(newTheme)

      return { theme: newTheme }
    })
  },
  swapTheme: () => get().setTheme(get().theme === 'dark' ? 'light' : 'dark')
}))
