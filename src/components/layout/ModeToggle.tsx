'use client'

import { cn } from '@/lib/utils'
import { ThemeSwitcher } from '../ThemeSwitcher'
import { useTheme } from 'next-themes'

interface ModeToggleProps {
  className?: string
}

export function ModeToggle({ className }: ModeToggleProps) {
  const { theme, setTheme } = useTheme()
  return (
    <ThemeSwitcher
      className={cn(className)}
      defaultValue="system"
      onChange={setTheme}
      value={(theme as 'light' | 'dark' | 'system') || 'system'}
    />
  )
}
