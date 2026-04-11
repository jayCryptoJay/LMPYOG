import { cn } from '@/lib/utils'
import { type InputHTMLAttributes, forwardRef } from 'react'

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'w-full bg-zinc-800 border border-zinc-700 text-bone text-sm rounded-md px-3 py-2',
        'placeholder:text-zinc-500 focus:outline-none focus:border-accent transition-colors',
        className
      )}
      {...props}
    />
  )
)
Input.displayName = 'Input'
