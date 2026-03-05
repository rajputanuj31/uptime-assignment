import type { Dispatch, SetStateAction } from 'react'
import { useState } from 'react'

import { Input, Modal } from '@/components/ui'
import { useReports } from '../context/ReportsContext'
import type { Report } from '../types/report'
import { mockReports } from '../data/mockReports'

export interface AddReportModalProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const AddReportModal = ({ open, setOpen }: AddReportModalProps) => {
  const { addReport } = useReports()
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [titleError, setTitleError] = useState<string | null>(null)
  const [subtitleError, setSubtitleError] = useState<string | null>(null)

  const resetState = () => {
    setTitle('')
    setSubtitle('')
    setTitleError(null)
    setSubtitleError(null)
  }

  const handleClose = () => {
    resetState()
    setOpen(false)
  }

  const createReportFromForm = (nextTitle: string, nextSubtitle: string): Report => {
    const base = mockReports[0]
    const now = new Date().toISOString()

    return {
      id: `custom-${Date.now().toString(36)}`,
      title: nextTitle,
      subtitle: nextSubtitle,
      createdAt: now,
      rangeLabel: base.rangeLabel,
      kpis: base.kpis,
      barChart: base.barChart,
      donutChart: base.donutChart,
    }
  }

  const handleCreate = () => {
    const trimmedTitle = title.trim()
    const trimmedSubtitle = subtitle.trim()

    let valid = true
    if (!trimmedTitle) {
      setTitleError('Title is required.')
      valid = false
    } else {
      setTitleError(null)
    }

    if (!trimmedSubtitle) {
      setSubtitleError('Subtitle is required.')
      valid = false
    } else {
      setSubtitleError(null)
    }

    if (!valid) return

    const report = createReportFromForm(trimmedTitle, trimmedSubtitle)
    addReport(report)
    resetState()
    setOpen(false)
  }

  const isCreateDisabled = !title.trim() || !subtitle.trim()

  return (
    <Modal
      open={open}
      title="Add Dashboard Report"
      onClose={handleClose}
      primaryActionLabel="Create"
      onPrimaryAction={handleCreate}
      primaryDisabled={isCreateDisabled}
    >
      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-xs font-medium text-muted" htmlFor="report-title">
            Title
          </label>
          <Input
            id="report-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="e.g. On-call Overview"
          />
          {titleError && (
            <p className="mt-1 text-xs" style={{ color: '#dc2626' }}>
              {titleError}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-muted" htmlFor="report-subtitle">
            Subtitle
          </label>
          <Input
            id="report-subtitle"
            value={subtitle}
            onChange={(event) => setSubtitle(event.target.value)}
            placeholder="Short description of this report"
          />
          {subtitleError && (
            <p className="mt-1 text-xs" style={{ color: '#dc2626' }}>
              {subtitleError}
            </p>
          )}
        </div>
      </div>
    </Modal>
  )
}

