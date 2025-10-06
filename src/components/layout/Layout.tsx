'use client'

import { cn } from '@/lib/utils'
import { SidebarInset, SidebarProvider } from '../ui/sidebar'
import { AppSidebar } from './AppSidebar'
import { SiteHeader } from './SiteHeader'
import { AppHeaderContext } from '@/contexts/AppHeaderContext'
import React from 'react'
import { AppHeader } from './AppHeader'

interface LayoutProps {
  className?: string
  children: React.ReactNode
}

export default function Layout({ className, children }: LayoutProps) {
  const [title, setTitle] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [sideBlock, setSideBlock] = React.useState<React.ReactNode>()

  const setIntro = (title: string, description: string) => {
    setTitle(title)
    setDescription(description)
  }

  const clear = () => {
    setTitle('')
    setDescription('')
    setSideBlock(undefined)
  }

  return (
    <AppHeaderContext.Provider
      value={{
        title,
        description,
        sideBlock,
        setIntro,
        setSideBlock,
        clear,
      }}
    >
      <SidebarProvider
        style={
          {
            '--sidebar-width': 'calc(var(--spacing) * 72)',
            '--header-height': 'calc(var(--spacing) * 12)',
          } as React.CSSProperties
        }
        className={cn('min-h-screen max-h-screen', className)}
      >
        <AppSidebar variant="inset" />
        <SidebarInset className="flex flex-col flex-1 overflow-hidden">
          <SiteHeader />
          <div className="flex flex-col flex-1 overflow-hidden container mx-auto">
            <div className="@container/main flex flex-col flex-1 overflow-hidden gap-2 pt-8 px-5">
              {(title || description || sideBlock) && <AppHeader />}
              <main className="flex flex-col flex-1 gap-4 overflow-hidden ">{children}</main>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </AppHeaderContext.Provider>
  )
}
