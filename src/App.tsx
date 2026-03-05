import { AppLayout } from '@/components/layout/AppLayout'
import { ReportChartsRow, ReportKpiRow, ReportSidebar, ReportsProvider, useReports } from '@/features/reports'

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
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-on-primary shadow-sm" />
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Plant Operations</h1>
      </div>

      <ReportKpiRow report={selectedReport} />

      <div className="grid grid-cols-[260px_minmax(0,1fr)] gap-4 items-start">
        <ReportSidebar />
        <ReportChartsRow report={selectedReport} />
      </div>
    </div>
  )
}

export default App
