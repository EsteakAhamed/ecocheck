// client/src/hooks/useTheme.js — Theme toggle with localStorage persistence
import { useState, useEffect } from 'react'

const STORAGE_KEY = 'eco-theme'
const DARK_THEME  = 'forest'
const LIGHT_THEME = 'emerald'

export function useTheme() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem(STORAGE_KEY) || DARK_THEME
  )

  // Sync data-theme attribute and persist on every change
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  const toggleTheme = () =>
    setTheme((prev) => (prev === DARK_THEME ? LIGHT_THEME : DARK_THEME))

  const isDark = theme === DARK_THEME

  return { theme, isDark, toggleTheme }
}
