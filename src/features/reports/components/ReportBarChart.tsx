import { Bar } from 'react-chartjs-2'
import type { Report } from '../types/report'

export interface ReportBarChartProps {
  report: Report | null
}

export const ReportBarChart = ({ report }: ReportBarChartProps) => {
  if (!report) {
    return (
      <div className="flex items-center justify-center rounded-xl bg-surface px-4 py-6 text-sm text-muted">
        Select a report to see unit alert distribution.
      </div>
    )
  }

  const labels = report.barChart.points.map((point) => point.unit)

  const data = {
    labels,
    datasets: [
      {
        label: 'In Process',
        data: report.barChart.points.map((point) => point.inProcess),
        backgroundColor: '#5B5FFF',
        borderRadius: 6,
        barThickness: 18,
      },
      {
        label: 'Unacknowledged',
        data: report.barChart.points.map((point) => point.unacknowledged),
        backgroundColor: '#C4C7FF',
        borderRadius: 6,
        barThickness: 18,
      },
      {
        label: 'On Watch',
        data: report.barChart.points.map((point) => point.onWatch),
        backgroundColor: '#FFE3B3',
        borderRadius: 6,
        barThickness: 18,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          boxWidth: 8,
        },
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
      },
      y: {
        stacked: true,
        ticks: {
          precision: 0,
        },
        grid: {
          color: 'rgba(148, 163, 184, 0.15)',
        },
      },
    },
  }

  return (
    <div className="flex flex-col">
      <div className="mb-3 text-sm font-medium text-foreground">
        {report.barChart.title}
      </div>
      <div className="relative h-64">
        <Bar data={data} options={options} />
      </div>
    </div>
  )
}

