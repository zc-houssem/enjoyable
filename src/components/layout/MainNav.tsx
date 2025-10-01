'use client'

import Link from 'next/link'
import { BookOpen } from 'lucide-react'

export function MainNav() {
  return (
    <div className="flex items-center gap-6 md:gap-10">
      <Link href="/" className="flex items-center gap-2">
        <BookOpen className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">CourseMarketplace</span>
      </Link>
      <nav className="hidden gap-6 md:flex">
        <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
          Courses
        </Link>
        <Link
          href="/designers"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Instructors
        </Link>
        <Link
          href="/jobs"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Jobs
        </Link>
        <Link
          href="/projects"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Projects
        </Link>
      </nav>
    </div>
  )
}
