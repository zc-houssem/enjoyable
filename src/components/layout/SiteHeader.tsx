'use client'

import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { ModeToggle } from '@/components/layout/ModeToggle'

export function SiteHeader() {
  return (
    <header className="flex h-[var(--header-height)] shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-[var(--header-height)]">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        <div className="ml-auto flex items-center gap-2">
          <ModeToggle className="-mr-1" />
        </div>
      </div>
    </header>
  )
}
