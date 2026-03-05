import type { InputHTMLAttributes } from 'react'
import { clsx } from './clsx'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = ({ className, ...props }: InputProps) => {
  return (
    <input
      className={clsx(
        'w-full rounded-lg border border-border-subtle bg-surface-elevated px-3 py-2 text-sm text-foreground placeholder:text-muted outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20',
        className,
      )}
      {...props}
    />
  )
}

