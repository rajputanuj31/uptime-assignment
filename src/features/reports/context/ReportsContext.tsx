import type { ReactNode } from 'react'
import { createContext, useContext, useMemo, useReducer } from 'react'

import type { Report } from '../types/report'
import { mockReports } from '../data/mockReports'

type ReportsState = {
  reports: Report[]
  searchTerm: string
  page: number
  pageSize: number
  selectedReportId: string | null
}

type ReportsAction =
  | { type: 'SET_SEARCH_TERM'; payload: string }
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'SELECT_REPORT'; payload: string | null }
  | { type: 'SET_REPORTS'; payload: Report[] }
  | { type: 'ADD_REPORT'; payload: Report }

type ReportsContextValue = ReportsState & {
  filteredReports: Report[]
  paginatedReports: Report[]
  totalPages: number
  selectedReport: Report | null
  setSearchTerm: (value: string) => void
  setPage: (page: number) => void
  selectReport: (id: string | null) => void
  addReport: (report: Report) => void
}

const STORAGE_KEY = 'uptime-dashboard:reports'

const ReportsContext = createContext<ReportsContextValue | undefined>(undefined)

const initialState: ReportsState = {
  reports: mockReports,
  searchTerm: '',
  page: 1,
  pageSize: 12,
  selectedReportId: mockReports[1]?.id ?? mockReports[0]?.id ?? null,
}

const reportsReducer = (state: ReportsState, action: ReportsAction): ReportsState => {
  switch (action.type) {
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload, page: 1 }
    case 'SET_PAGE':
      return { ...state, page: action.payload }
    case 'SELECT_REPORT':
      return { ...state, selectedReportId: action.payload }
    case 'SET_REPORTS':
      return { ...state, reports: action.payload }
    case 'ADD_REPORT': {
      const reports = [action.payload, ...state.reports]
      return {
        ...state,
        reports,
        selectedReportId: action.payload.id,
        page: 1,
      }
    }
    default:
      return state
  }
}

type StoredReportsState = {
  reports: Report[]
  selectedReportId: string | null
}

const loadReportsFromStorage = (): StoredReportsState | null => {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as unknown

    // Legacy format: plain array of reports.
    if (Array.isArray(parsed)) {
      const reports = parsed as Report[]
      return {
        reports,
        selectedReportId: reports[0]?.id ?? null,
      }
    }

    // Current format: object with reports + selectedReportId.
    if (
      parsed &&
      typeof parsed === 'object' &&
      Array.isArray((parsed as { reports?: unknown }).reports)
    ) {
      const { reports, selectedReportId } = parsed as {
        reports: Report[]
        selectedReportId?: string | null
      }
      return {
        reports,
        selectedReportId: selectedReportId ?? reports[0]?.id ?? null,
      }
    }

    return null
  } catch {
    return null
  }
}

const persistReportsToStorage = (reports: Report[], selectedReportId: string | null): void => {
  if (typeof window === 'undefined') return
  try {
    const payload: StoredReportsState = { reports, selectedReportId }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  } catch {
    // Ignore storage errors; UI should remain functional without persistence.
  }
}

export const ReportsProvider = ({ children }: { children: ReactNode }) => {
  const stored = loadReportsFromStorage()
  const [state, dispatch] = useReducer(
    reportsReducer,
    stored
      ? {
          ...initialState,
          reports: stored.reports.length > 0 ? stored.reports : initialState.reports,
          selectedReportId:
            stored.selectedReportId ??
            stored.reports[0]?.id ??
            initialState.selectedReportId,
        }
      : initialState,
  )

  const { reports, searchTerm, page, pageSize, selectedReportId } = state

  const filteredReports = useMemo(() => {
    if (!searchTerm.trim()) return reports
    const term = searchTerm.toLowerCase()
    return reports.filter((report) => report.title.toLowerCase().includes(term))
  }, [reports, searchTerm])

  const totalPages = useMemo(() => {
    if (filteredReports.length === 0) return 1
    return Math.ceil(filteredReports.length / pageSize)
  }, [filteredReports.length, pageSize])

  const safePage = Math.min(Math.max(page, 1), totalPages)

  const paginatedReports = useMemo(() => {
    const start = (safePage - 1) * pageSize
    const end = start + pageSize
    return filteredReports.slice(start, end)
  }, [filteredReports, pageSize, safePage])

  const selectedReport = useMemo(
    () => reports.find((report) => report.id === selectedReportId) ?? null,
    [reports, selectedReportId],
  )

  const value: ReportsContextValue = {
    ...state,
    filteredReports,
    paginatedReports,
    totalPages,
    selectedReport,
    setSearchTerm: (value) => {
      dispatch({ type: 'SET_SEARCH_TERM', payload: value })
    },
    setPage: (nextPage) => {
      const clamped = Math.min(Math.max(nextPage, 1), totalPages)
      dispatch({ type: 'SET_PAGE', payload: clamped })
    },
    selectReport: (id) => {
      dispatch({ type: 'SELECT_REPORT', payload: id })
      persistReportsToStorage(reports, id)
    },
    addReport: (report) => {
      const nextReports = [report, ...reports]
      dispatch({ type: 'ADD_REPORT', payload: report })
      persistReportsToStorage(nextReports, report.id)
    },
  }

  return <ReportsContext.Provider value={value}>{children}</ReportsContext.Provider>
}

export const useReports = (): ReportsContextValue => {
  const ctx = useContext(ReportsContext)
  if (!ctx) {
    throw new Error('useReports must be used within a ReportsProvider')
  }
  return ctx
}

