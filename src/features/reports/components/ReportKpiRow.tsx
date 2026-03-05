import type { Report } from '../types/report'
import { Bell, CheckCircle2, Clock3 } from 'lucide-react'
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

      <Card className="flex items-center gap-3 rounded-xl border-border-subtle bg-linear-to-br px-4 py-4 shadow-soft">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br text-primary shadow-sm">
          <Bell className="h-5 w-5" />
        </div>
        <div>
          <div className="text-2xl font-semibold leading-none text-foreground">{openAlerts}</div>
          <div className="mt-1 text-xs text-muted">Open Alerts</div>
        </div>
      </Card>

      <Card className="flex items-center gap-3 rounded-xl border-border-subtle bg-linear-to-br px-4 py-4 shadow-soft">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br text-primary shadow-sm">
          <CheckCircle2 className="h-5 w-5" />
        </div>
        <div>
          <div className="text-2xl font-semibold leading-none text-foreground">
            {closingRate.toFixed(1)}%
          </div>
          <div className="mt-1 text-xs text-muted">Closing Rate %</div>
        </div>
      </Card>

      <Card className="flex items-center gap-3 rounded-xl border-border-subtle bg-linear-to-br px-4 py-4 shadow-soft">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br text-primary shadow-sm">
          <Clock3 className="h-5 w-5" />
        </div>
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-semibold leading-none text-foreground">{oldestDays}</span>
            <span className="text-sm font-medium text-muted">Days</span>
          </div>
          <div className="mt-1 text-xs text-muted">Oldest Unacknowledged Alert</div>
        </div>
      </Card>
    </div>
  )
}

