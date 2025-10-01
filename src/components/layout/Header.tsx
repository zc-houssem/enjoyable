'use client'

import { Search } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { MainNav } from './MainNav'
import { UserNav } from './UserNav'

interface HeaderProps {
  className?: string
}

export function Header({ className }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container mx-auto flex h-16 items-center px-4 sm:px-8">
        <MainNav />
        <div className="ml-auto flex items-center space-x-4">
          <div className="relative hidden md:flex">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search courses, tutorials..."
              className="w-[200px] pl-8 md:w-[300px] lg:w-[400px]"
            />
          </div>
          <Button>Create Course</Button>
          <UserNav />
        </div>
      </div>
    </header>
  )
}
