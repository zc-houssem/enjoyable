import { useAppHeader } from '@/contexts/AppHeaderContext'
import { cn } from '@/lib/utils'

interface AppHeaderProps {
  className?: string
}

export const AppHeader = ({ className }: AppHeaderProps) => {
  const { title, description, sideBlock } = useAppHeader()
  return (
    <div className={cn('flex items-center justify-between', className)}>
      <div>
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="mt-2 text-muted-foreground">{description}</p>
      </div>
      <div>{sideBlock}</div>
    </div>
  )
}
