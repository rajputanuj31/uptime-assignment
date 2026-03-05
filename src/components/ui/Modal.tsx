import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { clsx } from './clsx'
import { Button } from './Button'

export interface ModalProps {
  open: boolean
  title: string
  children: ReactNode
  primaryActionLabel?: string
  onPrimaryAction?: () => void
  primaryDisabled?: boolean
  onClose: () => void
}

const modalRoot = () => document.getElementById('root') ?? document.body

export const Modal = ({
  open,
  title,
  children,
  primaryActionLabel,
  onPrimaryAction,
  primaryDisabled,
  onClose,
}: ModalProps) => {
  if (!open) return null

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={clsx(
          'w-full max-w-lg rounded-2xl bg-surface-elevated p-6 shadow-xl',
        )}
        onClick={(event) => event.stopPropagation()}
      >
        <header className="mb-4 flex items-center justify-between gap-4">
          <h2 id="modal-title" className="text-base font-semibold text-foreground">
            {title}
          </h2>
          <button
            type="button"
            aria-label="Close"
            className="rounded-full border border-border-subtle bg-surface px-2 py-1 text-sm text-muted hover:bg-surface-elevated-hover"
            onClick={onClose}
          >
            ×
          </button>
        </header>
        <div className="space-y-4">{children}</div>
        {primaryActionLabel && onPrimaryAction && (
          <footer className="mt-6 flex justify-end gap-3">
            <Button variant="ghost" size="sm" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button
              size="sm"
              type="button"
              onClick={onPrimaryAction}
              disabled={primaryDisabled}
            >
              {primaryActionLabel}
            </Button>
          </footer>
        )}
      </div>
    </div>,
    modalRoot(),
  )
}

