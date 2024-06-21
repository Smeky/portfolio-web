'use client'
import { useEffect } from 'react'
import { useThemeStore } from '@/stores/theme'

export default function Theme() {
  const loadTheme = useThemeStore(state => state.loadTheme)
  useEffect(loadTheme, [])

  return null
}