import { LucideIcon } from 'lucide-react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { Badge } from './ui/badge'

interface BadgeIconProps {
  className?: string
  children?: React.ReactNode
  icon: LucideIcon
}

export const BadgeIcon = ({ className, children, icon: Icon }: BadgeIconProps) => {
  return (
    <Button variant="outline" size="icon" className={cn('relative', className)}>
      <Icon className="h-5 w-5" />
      <Badge className="absolute -top-1 -right-1 rounded-full bg-red-500 text-white w-2 p-2 h-3 text-[0.6rem] font-bold">
        {children}
      </Badge>
    </Button>
  )
}
