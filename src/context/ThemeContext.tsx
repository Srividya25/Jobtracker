import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

export type HeroTheme = 'beige' | 'classic' | 'ocean' | 'forest' | 'sunset'

export const HERO_THEMES: { key: HeroTheme; label: string }[] = [
  { key: 'beige', label: 'Beige' },
  { key: 'classic', label: 'Classic' },
  { key: 'ocean', label: 'Ocean' },
  { key: 'forest', label: 'Forest' },
  { key: 'sunset', label: 'Sunset' },
]

interface ThemeContextType {
  theme: 'light' | 'dark'
  toggle: () => void
  heroTheme: HeroTheme
  setHeroTheme: (t: HeroTheme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

function initialTheme(): 'light' | 'dark' {
  try {
    const stored = localStorage.getItem('jobtracker-theme')
    if (stored === 'light' || stored === 'dark') return stored
    if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) return 'dark'
  } catch (_e) {}
  return 'light'
}

function initialHeroTheme(): HeroTheme {
  try {
    const stored = localStorage.getItem('jobtracker-hero-theme') as HeroTheme | null
    if (stored && HERO_THEMES.some((t) => t.key === stored)) return stored
  } catch (_e) {}
  return 'beige'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>(initialTheme)
  const [heroTheme, setHeroTheme] = useState<HeroTheme>(initialHeroTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('jobtracker-theme', theme)
    } catch (_e) {}
  }, [theme])

  useEffect(() => {
    document.documentElement.dataset.heroTheme = heroTheme
    try {
      localStorage.setItem('jobtracker-hero-theme', heroTheme)
    } catch (_e) {}
  }, [heroTheme])

  const toggle = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'))

  return (
    <ThemeContext.Provider value={{ theme, toggle, heroTheme, setHeroTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
