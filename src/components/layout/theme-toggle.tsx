'use client'

import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
  const toggle = () => {
    document.documentElement.classList.toggle('dark')
    const next = document.documentElement.classList.contains('dark')
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }
  return (
    <button
      type="button"
      onClick={toggle}
      className="grid size-9 place-items-center rounded-lg border bg-[var(--panel)] text-[var(--muted)] hover:text-[var(--foreground)]"
      aria-label="Toggle color theme"
    >
      <Moon size={16} className="dark:hidden" />
      <Sun size={16} className="hidden dark:block" />
    </button>
  )
}
