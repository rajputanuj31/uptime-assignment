import type { HTMLAttributes, ReactNode } from 'react'
import { clsx } from './clsx'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export const Card = ({ className, children, ...props }: CardProps) => (
  <section
    className={clsx(
      'rounded-2xl border border-border-subtle bg-surface-elevated shadow-soft',
      className,
    )}
    {...props}
  >
    {children}
  </section>
)

