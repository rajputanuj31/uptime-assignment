import { useState } from 'react'

import { Button, Card, Input } from '@/components/ui'
import { useReports } from '../context/ReportsContext'
import { ReportListItem } from './ReportListItem'
import { ReportPagination } from './ReportPagination'
import { AddReportModal } from './AddReportModal'

export const ReportSidebar = () => {
  const {
    paginatedReports,
    selectedReportId,
    searchTerm,
    page,
    totalPages,
    setSearchTerm,
    setPage,
    selectReport,
  } = useReports()

  const [isAddOpen, setIsAddOpen] = useState(false)

  return (
    <aside className="h-full">
      <Card className="flex h-full flex-col gap-3 rounded-xl p-4">
        <div className="text-lg font-semibold leading-tight text-foreground">
          Select Report Dashboard
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <Input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search"
              aria-label="Search reports by title"
              className="h-9"
            />
          </div>
          <Button type="button" size="sm" onClick={() => setIsAddOpen(true)} className="h-9 px-4">
            ADD
          </Button>
        </div>

        <div className="flex-1 space-y-1 pr-1">
          {paginatedReports.length === 0 ? (
            <p className="text-xs text-muted">No reports match your search.</p>
          ) : (
            paginatedReports.map((report) => (
              <ReportListItem
                key={report.id}
                report={report}
                selected={report.id === selectedReportId}
                onSelect={() => selectReport(report.id)}
              />
            ))
          )}
        </div>
        <ReportPagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </Card>

      <AddReportModal open={isAddOpen} setOpen={setIsAddOpen} />
    </aside>
  )
}

