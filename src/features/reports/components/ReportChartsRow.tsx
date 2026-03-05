import type { Report } from '../types/report'
import { Card } from '@/components/ui'
import { ReportBarChart } from './ReportBarChart'
import { ReportDonutChart } from './ReportDonutChart'

export interface ReportChartsRowProps {
  report: Report | null
}

export const ReportChartsRow = ({ report }: ReportChartsRowProps) => {
  if (!report) {
    return (
      <Card className="flex items-center justify-center rounded-xl border-border-subtle bg-surface-elevated p-6 text-sm text-muted">
        Select a report to see alert details.
      </Card>
    )
  }

  const { openAlerts, closingRatePct, oldestUnackedDays } = report.kpis

  return (
    <Card className="flex h-full flex-col rounded-xl border-border-subtle bg-surface-elevated p-4 space-y-4">
      <div className="grid gap-3 md:grid-cols-3 text-center text-[11px]">
        <div className="rounded-lg bg-white px-3 py-2 border border-border-subtle">
          <div className="text-black">Number of Open Alerts</div>
          <div className="mt-1 text-sm font-semibold text-primary">{openAlerts}</div>
        </div>
        <div className="rounded-lg bg-white px-3 py-2 border border-border-subtle">
          <div className="text-black">Closing Rate %</div>
          <div className="mt-1 text-sm font-semibold text-primary">
            {closingRatePct.toFixed(1)}%
          </div>
        </div>
        <div className="rounded-lg bg-white px-3 py-2 border border-border-subtle">
          <div className="text-black">Oldest Unacknowledged Alert</div>
          <div className="mt-1 text-sm font-semibold text-primary">
            {oldestUnackedDays} Days
          </div>
        </div>
      </div>

      <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
        <div className="rounded-2xl bg-linear-to-br from-[#f3e8ff] via-[#f8f4ff] to-[#e4d5ff] p-px">
          <div className="h-full rounded-2xl bg-white p-4">
            <ReportBarChart report={report} />
          </div>
        </div>

        <div className="rounded-2xl bg-linear-to-br from-[#f3e8ff] via-[#f8f4ff] to-[#e4d5ff] p-px">
          <div className="h-full rounded-2xl bg-white p-4">
            <ReportDonutChart report={report} />
          </div>
        </div>
      </div>
    </Card>
  )
}

