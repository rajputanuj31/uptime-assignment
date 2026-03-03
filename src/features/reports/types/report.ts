export type AlertStatus = 'open' | 'in_process' | 'acknowledged' | 'on_watch'

export interface KpiMetrics {
  /** Total number of currently open alerts in the selected window. */
  openAlerts: number
  /** Percentage of alerts closed in the selected window. */
  closingRatePct: number
  /** Age in days of the oldest unacknowledged alert. */
  oldestUnackedDays: number
}

export interface BarChartPoint {
  unit: string
  inProcess: number
  unacknowledged: number
  onWatch: number
}

export interface DonutSlice {
  status: AlertStatus
  label: string
  /** Percentage share for this status (0–100). */
  value: number
}

export interface Report {
  id: string
  title: string
  subtitle: string
  /** ISO timestamp when the report configuration was created. */
  createdAt: string
  /** Time window the report represents, e.g. "Last 7 Days". */
  rangeLabel: string
  kpis: KpiMetrics
  barChart: {
    title: string
    xAxisLabel: string
    yAxisLabel: string
    points: BarChartPoint[]
  }
  donutChart: {
    title: string
    slices: DonutSlice[]
  }
}

