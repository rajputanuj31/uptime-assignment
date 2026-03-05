import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from 'chart.js'

const donutLabelsPlugin = {
  id: 'donutLabels',
  afterDatasetsDraw(chart: any) {
    if (chart.config.type !== 'doughnut') return

    const { ctx } = chart
    const dataset = chart.data.datasets?.[0]
    const meta = chart.getDatasetMeta(0)

    if (!dataset || !Array.isArray(dataset.data) || !meta?.data) return

    const total = dataset.data.reduce((sum: number, value: number) => sum + value, 0)
    if (!total) return

    ctx.save()
    ctx.font = 'bold 12px system-ui, -apple-system, BlinkMacSystemFont, sans-serif'
    ctx.fillStyle = '#000000'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    meta.data.forEach((arc: any, index: number) => {
      const value = dataset.data[index]
      if (typeof value !== 'number' || value <= 0) return

      const percentage = Math.round((value / total) * 100)
      const position = arc.tooltipPosition()

      ctx.fillText(`${percentage}%`, position.x, position.y)
    })

    ctx.restore()
  },
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  donutLabelsPlugin,
)

