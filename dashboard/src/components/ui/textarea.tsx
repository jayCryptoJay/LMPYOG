import { cn } from '@/lib/utils'
import { type TextareaHTMLAttributes, forwardRef } from 'react'

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        'w-full bg-zinc-800 border border-zinc-700 text-bone text-sm rounded-md px-3 py-2',
        'placeholder:text-zinc-500 focus:outline-none focus:border-accent transition-colors',
        'resize-none font-mono leading-relaxed',
        className
      )}
      {...props}
    />
  )
)
Textarea.displayName = 'Textarea'
