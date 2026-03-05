import { AppLayout } from '@/components/layout/AppLayout'
import { ReportChartsRow, ReportKpiRow, ReportSidebar, ReportsProvider, useReports } from '@/features/reports'
import { MessageSquareText } from 'lucide-react'
const App = () => {
  return (
    <ReportsProvider>
      <AppLayout>
        <DashboardShell />
      </AppLayout>
    </ReportsProvider>
  )
}

const DashboardShell = () => {
  const { selectedReport } = useReports()

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-linear-to-br bg-blue-700 text-primary shadow-sm">
          <MessageSquareText className="h-5 w-5 color-white" />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Plant Operations</h1>
      </div>

      <ReportKpiRow report={selectedReport} />

      <div className="flex flex-col md:grid md:h-[560px] md:grid-cols-[260px_minmax(0,1fr)] gap-4 items-stretch">
        <ReportSidebar />
        <ReportChartsRow report={selectedReport} />
      </div>
    </div>
  )
}

export default App
