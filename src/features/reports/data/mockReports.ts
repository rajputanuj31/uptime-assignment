import type { AlertStatus, BarChartPoint, DonutSlice, Report } from '../types/report'

const baseSlices: DonutSlice[] = [
  { status: 'open', label: 'Open', value: 32 },
  { status: 'in_process', label: 'In Process', value: 23 },
  { status: 'acknowledged', label: 'Acknowledged', value: 23 },
  { status: 'on_watch', label: 'On Watch', value: 22 },
]

const makeSlices = (overrides: Partial<Record<AlertStatus, number>> = {}): DonutSlice[] => {
  const next = baseSlices.map((slice) => {
    const overrideValue = overrides[slice.status]
    return overrideValue != null ? { ...slice, value: overrideValue } : slice
  })

  const total = next.reduce((sum, slice) => sum + slice.value, 0)

  if (total === 100) return next

  // Normalise to exactly 100 while preserving relative proportions.
  return next.map((slice) => ({
    ...slice,
    value: Math.round((slice.value / total) * 100),
  }))
}

const defaultBarPoints: BarChartPoint[] = [
  { unit: 'Unit 1', inProcess: 6, unacknowledged: 4, onWatch: 2 },
  { unit: 'Unit 2', inProcess: 5, unacknowledged: 3, onWatch: 2 },
  { unit: 'Unit 3', inProcess: 8, unacknowledged: 4, onWatch: 3 },
  { unit: 'Unit 4', inProcess: 7, unacknowledged: 5, onWatch: 2 },
  { unit: 'Unit 5', inProcess: 4, unacknowledged: 3, onWatch: 1 },
  { unit: 'Unit 6', inProcess: 9, unacknowledged: 4, onWatch: 3 },
]

const makeReport = (partial: Partial<Report> & Pick<Report, 'id' | 'title' | 'subtitle'>): Report => {
  const createdAt = partial.createdAt ?? new Date().toISOString()

  return {
    id: partial.id,
    title: partial.title,
    subtitle: partial.subtitle,
    createdAt,
    rangeLabel: partial.rangeLabel ?? 'Last 7 Days',
    kpis: partial.kpis ?? {
      openAlerts: 84,
      closingRatePct: 44.5,
      oldestUnackedDays: 128,
    },
    barChart: partial.barChart ?? {
      title: 'Best Unit Operations with Latest Number of Alerts',
      xAxisLabel: 'Units',
      yAxisLabel: 'Number of Alerts',
      points: defaultBarPoints,
    },
    donutChart: partial.donutChart ?? {
      title: 'Alert Rates Distribution',
      slices: makeSlices(),
    },
  }
}

export const mockReports: Report[] = [
  // Core example dashboards used in the main view.
  makeReport({
    id: 'take-home',
    title: 'Take-Home',
    subtitle: 'Production alerts for last 7 days',
  }),
  makeReport({
    id: 'night-shift',
    title: 'Night Shift',
    subtitle: 'Alerts between 10 PM and 6 AM',
    kpis: {
      openAlerts: 42,
      closingRatePct: 51.2,
      oldestUnackedDays: 64,
    },
    donutChart: {
      title: 'Alert Rates Distribution',
      slices: makeSlices({
        open: 28,
        in_process: 30,
        acknowledged: 24,
        on_watch: 18,
      }),
    },
  }),
  makeReport({
    id: 'weekend-ops',
    title: 'Weekend Operations',
    subtitle: 'Saturday and Sunday alert performance',
    kpis: {
      openAlerts: 21,
      closingRatePct: 63.8,
      oldestUnackedDays: 14,
    },
    barChart: {
      title: 'Weekend Units with Latest Number of Alerts',
      xAxisLabel: 'Units',
      yAxisLabel: 'Number of Alerts',
      points: [
        { unit: 'Unit 1', inProcess: 2, unacknowledged: 1, onWatch: 1 },
        { unit: 'Unit 3', inProcess: 4, unacknowledged: 1, onWatch: 1 },
        { unit: 'Unit 4', inProcess: 3, unacknowledged: 2, onWatch: 1 },
        { unit: 'Unit 6', inProcess: 5, unacknowledged: 2, onWatch: 1 },
      ],
    },
  }),
  makeReport({
    id: 'critical-only',
    title: 'Critical Alerts',
    subtitle: 'High priority incidents across all units',
    kpis: {
      openAlerts: 12,
      closingRatePct: 37.9,
      oldestUnackedDays: 45,
    },
    donutChart: {
      title: 'Critical Alert Distribution',
      slices: makeSlices({
        open: 45,
        in_process: 30,
        acknowledged: 15,
        on_watch: 10,
      }),
    },
  }),
  makeReport({
    id: 'sla-breaches',
    title: 'SLA Breaches',
    subtitle: 'Alerts breaching acknowledgement SLA',
    kpis: {
      openAlerts: 9,
      closingRatePct: 28.3,
      oldestUnackedDays: 180,
    },
  }),
  makeReport({
    id: 'low-volume-sites',
    title: 'Low Volume Sites',
    subtitle: 'Sites with consistently low alert volume',
    kpis: {
      openAlerts: 5,
      closingRatePct: 71.4,
      oldestUnackedDays: 7,
    },
  }),

  // Additional reports to exercise pagination (pageSize = 12).
  makeReport({
    id: 'report-1-site-a',
    title: 'Report 1 - Site A',
    subtitle: 'Site A uptime and alert overview',
  }),
  makeReport({
    id: 'report-2-site-b',
    title: 'Report 2 - Site B',
    subtitle: 'Site B uptime and alert overview',
  }),
  makeReport({
    id: 'report-3-site-c',
    title: 'Report 3 - Site C',
    subtitle: 'Site C uptime and alert overview',
  }),
  makeReport({
    id: 'report-4-site-d',
    title: 'Report 4 - Site D',
    subtitle: 'Site D uptime and alert overview',
  }),
  makeReport({
    id: 'report-5-site-e',
    title: 'Report 5 - Site E',
    subtitle: 'Site E uptime and alert overview',
  }),
  makeReport({
    id: 'report-6-site-f',
    title: 'Report 6 - Site F',
    subtitle: 'Site F uptime and alert overview',
  }),
  makeReport({
    id: 'report-7-site-a',
    title: 'Report 7 - Site A',
    subtitle: 'Additional production slice for Site A',
  }),
  makeReport({
    id: 'report-8-site-b',
    title: 'Report 8 - Site B',
    subtitle: 'Additional production slice for Site B',
  }),
  makeReport({
    id: 'report-9-site-c',
    title: 'Report 9 - Site C',
    subtitle: 'Additional production slice for Site C',
  }),
  makeReport({
    id: 'report-10-site-d',
    title: 'Report 10 - Site D',
    subtitle: 'Additional production slice for Site D',
  }),
  makeReport({
    id: 'report-11-region-north',
    title: 'Region North Overview',
    subtitle: 'Aggregated performance for northern sites',
  }),
  makeReport({
    id: 'report-12-region-south',
    title: 'Region South Overview',
    subtitle: 'Aggregated performance for southern sites',
  }),
  makeReport({
    id: 'report-13-region-east',
    title: 'Region East Overview',
    subtitle: 'Aggregated performance for eastern sites',
  }),
  makeReport({
    id: 'report-14-region-west',
    title: 'Region West Overview',
    subtitle: 'Aggregated performance for western sites',
  }),
]

