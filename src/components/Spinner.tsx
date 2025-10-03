import { cn } from '@/lib/utils'
import { LoaderPinwheel } from 'lucide-react'

interface SpinnerProps {
  className?: string
}

export const Spinner = ({ className }: SpinnerProps) => {
  return <LoaderPinwheel className={cn('animate-spin', className)} />
}
