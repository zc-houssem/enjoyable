'use client'

import { SidebarInset, SidebarProvider } from '../ui/sidebar'
import { AppSidebar } from './AppSidebar'
import { SiteHeader } from './SiteHeader'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-col flex-1 overflow-hidden container mx-auto">
          <div className="flex flex-1 flex-col overflow-hidden p-4">
            <div className="@container/main flex flex-1 overflow-hidden flex-col gap-2">
              <main className="flex flex-col flex-1 gap-4 overflow-hidden">{children}</main>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
