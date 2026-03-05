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
  makeReport({
    id: 'report-1-site-a',
    title: 'Report 1 - Site A',
    subtitle: 'Production alerts for last 7 days',
    kpis: {
      openAlerts: 72,
      closingRatePct: 39.2,
      oldestUnackedDays: 98,
    },
  }),
  makeReport({
    id: 'report-2-site-b',
    title: 'Report 2 - Site B',
    subtitle: 'Production alerts for last 7 days',
    kpis: {
      openAlerts: 79,
      closingRatePct: 41.4,
      oldestUnackedDays: 106,
    },
  }),
  makeReport({
    id: 'report-3-site-c',
    title: 'Report 3 - Site C',
    subtitle: 'Production alerts for last 7 days',
    kpis: {
      openAlerts: 66,
      closingRatePct: 46.1,
      oldestUnackedDays: 74,
    },
  }),
  makeReport({
    id: 'report-4-site-d',
    title: 'Report 4 - Site D',
    subtitle: 'Production alerts for last 7 days',
    kpis: {
      openAlerts: 58,
      closingRatePct: 49.9,
      oldestUnackedDays: 62,
    },
  }),
  makeReport({
    id: 'report-5-site-e',
    title: 'Report 5 - Site E',
    subtitle: 'Production alerts for last 7 days',
    kpis: {
      openAlerts: 91,
      closingRatePct: 36.5,
      oldestUnackedDays: 140,
    },
  }),
  makeReport({
    id: 'report-6-site-f',
    title: 'Report 6 - Site F',
    subtitle: 'Production alerts for last 7 days',
    kpis: {
      openAlerts: 44,
      closingRatePct: 55.7,
      oldestUnackedDays: 31,
    },
  }),
  makeReport({
    id: 'report-7-site-a',
    title: 'Report 7 - Site A',
    subtitle: 'Production alerts for last 7 days',
    kpis: {
      openAlerts: 63,
      closingRatePct: 42.8,
      oldestUnackedDays: 88,
    },
  }),
  makeReport({
    id: 'report-8-site-b',
    title: 'Report 8 - Site B',
    subtitle: 'Production alerts for last 7 days',
    kpis: {
      openAlerts: 52,
      closingRatePct: 47.6,
      oldestUnackedDays: 55,
    },
  }),
  makeReport({
    id: 'report-9-site-c',
    title: 'Report 9 - Site C',
    subtitle: 'Production alerts for last 7 days',
    kpis: {
      openAlerts: 38,
      closingRatePct: 60.1,
      oldestUnackedDays: 19,
    },
  }),
  makeReport({
    id: 'report-10-site-d',
    title: 'Report 10 - Site D',
    subtitle: 'Production alerts for last 7 days',
    kpis: {
      openAlerts: 84,
      closingRatePct: 44.5,
      oldestUnackedDays: 128,
    },
  }),
]

