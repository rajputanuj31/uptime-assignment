import { Doughnut } from 'react-chartjs-2'
import type { Report } from '../types/report'

export interface ReportDonutChartProps {
  report: Report | null
}

export const ReportDonutChart = ({ report }: ReportDonutChartProps) => {
  if (!report) {
    return (
      <div className="flex items-center justify-center rounded-xl bg-surface px-4 py-6 text-sm text-muted">
        Select a report to see alert rate distribution.
      </div>
    )
  }

  const labels = report.donutChart.slices.map((slice) => slice.label)
  const values = report.donutChart.slices.map((slice) => slice.value)

  const colors = ['#5B5FFF', '#C4C7FF', '#FFE3B3', '#FFB4E6']

  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: colors.slice(0, values.length),
        borderWidth: 0,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: { label: string; raw: unknown }) => {
            const value = typeof context.raw === 'number' ? context.raw : 0
            return `${context.label}: ${value}%`
          },
        },
      },
    },
    cutout: '72%',
  }

  return (
    <div className="flex flex-col">
      <div className="mb-3 text-sm font-medium text-foreground">
        {report.donutChart.title}
      </div>
      <div className="grid items-center gap-4 md:grid-cols-[minmax(0,1fr),auto]">
        <div className="relative h-44">
          <Doughnut data={data} options={options} />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-xs font-medium text-muted">
            Alert Rates
          </div>
        </div>
        <ul className="space-y-2 text-xs">
          {report.donutChart.slices.map((slice, index) => (
            <li key={slice.label} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span
                  aria-hidden
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: colors[index % colors.length] }}
                />
                <span className="text-muted">{slice.label}</span>
              </div>
              <span className="font-medium text-foreground">{slice.value}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

