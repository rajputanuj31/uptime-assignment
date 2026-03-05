import type { ReactNode } from 'react'
import { clsx } from '../ui/clsx'

export interface AppLayoutProps {
  children: ReactNode
}

export const AppLayout = ({ children }: AppLayoutProps) => (
  <div className="min-h-screen bg-surface-outer text-foreground">
    <header className="border-b border-border-subtle bg-header px-6 py-4">
      <div className="mx-auto flex items-center justify-between gap-4">
        <div className="text-sm font-semibold text-on-primary">Dashboard</div>
        <div className="flex items-center gap-3">
          <HeaderIconButton ariaLabel="Notifications" label="0" />
          <HeaderIconButton ariaLabel="Help" label="?" />
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-on-primary shadow-sm">
            T
          </div>
        </div>
      </div>
    </header>
    <main className="px-6 py-5">
      <div className="mx-auto">{children}</div>
    </main>
  </div>
)

interface HeaderIconButtonProps {
  ariaLabel: string
  label: string
}

const HeaderIconButton = ({ ariaLabel, label }: HeaderIconButtonProps) => (
  <button
    type="button"
    aria-label={ariaLabel}
    className={clsx(
      'flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/10 text-xs font-semibold text-on-primary',
      'hover:bg-white/15',
    )}
  >
    {label}
  </button>
)

