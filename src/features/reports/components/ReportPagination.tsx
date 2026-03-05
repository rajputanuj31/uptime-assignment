import { clsx } from '@/components/ui/clsx'

export interface ReportPaginationProps {
  page: number
  totalPages: number
  onPageChange: (nextPage: number) => void
}

export const ReportPagination = ({ page, totalPages, onPageChange }: ReportPaginationProps) => {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

  return (
    <div className="mt-4 flex items-center justify-center gap-2">
      {pages.map((pageNumber) => {
        const isActive = pageNumber === page
        return (
          <button
            key={pageNumber}
            type="button"
            aria-label={`Go to page ${pageNumber}`}
            onClick={() => onPageChange(pageNumber)}
            className={clsx(
              'flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border text-[11px] font-medium transition-colors',
              isActive
                ? 'border-primary-border bg-primary text-on-primary'
                : 'border-border-subtle bg-surface-elevated text-muted hover:bg-surface-elevated-hover',
            )}
          >
            {pageNumber}
          </button>
        )
      })}
    </div>
  )
}

