'use client'
import { cn } from '@/lib/utils'
import { type ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost' | 'outline' | 'danger' | 'success'
  size?: 'sm' | 'md' | 'lg' | 'icon'
}

const variants = {
  default: 'bg-accent hover:bg-accent-dark text-white',
  ghost: 'bg-transparent hover:bg-zinc-800 text-zinc-400 hover:text-bone',
  outline: 'bg-transparent border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-bone',
  danger: 'bg-red-900/30 hover:bg-red-900/50 text-red-400 border border-red-900/50',
  success: 'bg-green-900/30 hover:bg-green-900/50 text-green-400 border border-green-900/50',
}

const sizes = {
  sm: 'px-2.5 py-1 text-xs rounded',
  md: 'px-3.5 py-1.5 text-sm rounded-md',
  lg: 'px-5 py-2.5 text-base rounded-lg',
  icon: 'p-1.5 rounded-md',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', disabled, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center gap-1.5 font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 disabled:opacity-40 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  )
)
Button.displayName = 'Button'
