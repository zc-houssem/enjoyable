'use client'

import { cn } from '@/lib/utils'
import { SidebarInset, SidebarProvider } from '../ui/sidebar'
import { AppSidebar } from './AppSidebar'
import { SiteHeader } from './SiteHeader'

interface LayoutProps {
  className?: string
  children: React.ReactNode
}

export default function Layout({ className, children }: LayoutProps) {
  return (
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
          <div className="@container/main flex flex-col flex-1 overflow-hidden gap-2">
            <main className="flex flex-col flex-1 gap-4 overflow-hidden px-5">{children}</main>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
