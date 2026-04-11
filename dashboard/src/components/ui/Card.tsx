import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  accent?: boolean
}

export function Card({ children, className, onClick, accent = false }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-surface border border-edge rounded-xl p-4',
        accent && 'border-l-2 border-l-accent',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  )
}
