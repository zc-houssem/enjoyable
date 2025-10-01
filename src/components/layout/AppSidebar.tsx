'use client'

import React from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Cog, HelpCircle, LayoutDashboard, Package, Search, Store, Users } from 'lucide-react'
import { NavSecondary } from './NavSecondary'
import { UserNav } from './UserNav'
import { NavMain } from './NavMain'

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'Dashboard',
      url: '/',
      icon: LayoutDashboard,
    },
    {
      title: 'Plans',
      url: '/management/plans',
      icon: Package,
    },
    {
      title: 'Retails Stores',
      url: '/management/stores',
      icon: Store,
    },
    {
      title: 'Users',
      url: '/management/users',
      icon: Users,
    },
  ],
  navSecondary: [
    {
      title: 'Settings',
      url: '#',
      icon: Cog,
    },
    {
      title: 'Help',
      url: '#',
      icon: HelpCircle,
    },
    {
      title: 'Search',
      url: '#',
      icon: Search,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <a href="#">
                {/* <img src="/" alt="Logo" className="h-8 w-auto" /> */}
                <span className="text-base font-semibold">Enjoyable</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <UserNav />
      </SidebarFooter>
    </Sidebar>
  )
}
