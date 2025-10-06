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
import { Cog, Gem, Heart, HelpCircle, Package, Search, ShoppingCart, Telescope } from 'lucide-react'
import { NavSecondary } from './NavSecondary'
import { NavMain } from './NavMain'

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'Explore',
      url: '/',
      icon: Telescope,
    },
    {
      title: 'Shopping Cart',
      url: '/shopping-cart',
      icon: ShoppingCart,
    },
    {
      title: 'Wishlist',
      url: '/',
      icon: Heart,
    },
    {
      title: 'Orders',
      url: '/',
      icon: Package,
    },
    {
      title: 'Sellers',
      url: '/',
      icon: Gem,
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
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  )
}
