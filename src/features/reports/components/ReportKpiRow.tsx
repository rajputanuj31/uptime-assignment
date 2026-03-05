import type { Report } from '../types/report'
import { Card } from '@/components/ui'

export interface ReportKpiRowProps {
  report: Report | null
}

export const ReportKpiRow = ({ report }: ReportKpiRowProps) => {
  const rangeLabel = report?.rangeLabel ?? 'Last 7 Days'
  const openAlerts = report?.kpis.openAlerts ?? 0
  const closingRate = report?.kpis.closingRatePct ?? 0
  const oldestDays = report?.kpis.oldestUnackedDays ?? 0

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card className="flex flex-col justify-center rounded-xl border-border-subtle bg-surface-elevated px-4 py-3">
        <div className="text-xs font-medium text-muted">{rangeLabel}</div>
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-surface-elevated-hover">
          <div className="h-full w-2/3 rounded-full bg-primary" />
        </div>
      </Card>

      <Card className="flex flex-col justify-center rounded-xl border-border-subtle bg-surface-elevated px-4 py-3">
        <div className="text-3xl font-semibold leading-none text-foreground">{openAlerts}</div>
        <div className="mt-1 text-xs text-muted">Open Alerts</div>
      </Card>

      <Card className="flex flex-col justify-center rounded-xl border-border-subtle bg-surface-elevated px-4 py-3">
        <div className="text-3xl font-semibold leading-none text-foreground">
          {closingRate.toFixed(1)}%
        </div>
        <div className="mt-1 text-xs text-muted">Closing Rate %</div>
      </Card>

      <Card className="flex flex-col justify-center rounded-xl border-border-subtle bg-surface-elevated px-4 py-3">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-semibold leading-none text-foreground">{oldestDays}</span>
          <span className="text-sm font-medium text-muted">Days</span>
        </div>
        <div className="mt-1 text-xs text-muted">Oldest Unacknowledged Alert</div>
      </Card>
    </div>
  )
}

