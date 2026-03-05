import type { Report } from '../types/report'
import { clsx } from '@/components/ui/clsx'

export interface ReportListItemProps {
  report: Report
  selected: boolean
  onSelect: () => void
}

export const ReportListItem = ({ report, selected, onSelect }: ReportListItemProps) => {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={clsx(
        'flex w-full items-center justify-between gap-3 rounded-lg px-2.5 py-2 text-left text-xs transition-colors',
        selected ? 'bg-surface-elevated-hover text-foreground' : 'text-muted hover:bg-surface-elevated-hover',
      )}
    >
      <span className="line-clamp-1">{report.title}</span>
      <span
        aria-hidden
        className={clsx(
          'flex h-4 w-4 items-center justify-center rounded-sm border text-[10px]',
          selected ? 'border-primary bg-primary text-on-primary' : 'border-border-subtle bg-surface-elevated',
        )}
      >
        {selected ? '✓' : ''}
      </span>
    </button>
  )
}

