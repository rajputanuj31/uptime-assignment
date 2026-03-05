import type { Report } from '../types/report'

export interface ReportHeaderProps {
  report: Report | null
}

export const ReportHeader = ({ report }: ReportHeaderProps) => {
  return (
    <header className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="text-sm font-semibold text-muted">Take-Home</div>
        <h1 className="text-xl font-semibold text-foreground">
          {report?.title ?? 'Dashboard'}
        </h1>
        {report?.subtitle && (
          <p className="mt-1 text-sm text-muted">{report.subtitle}</p>
        )}
      </div>
      {report && (
        <div className="text-xs text-muted">{report.rangeLabel}</div>
      )}
    </header>
  )
}

