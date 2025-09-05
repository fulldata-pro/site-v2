import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Report {
  id: string
  type: string
  searchId: string
  data: any
  createdAt: Date
  status: 'pending' | 'ready' | 'error'
}

interface ReportState {
  reports: Report[]
  currentReport: Report | null
  loading: boolean
  error: string | null
}

const initialState: ReportState = {
  reports: [],
  currentReport: null,
  loading: false,
  error: null,
}

const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    fetchReportStart: (state) => {
      state.loading = true
      state.error = null
    },
    fetchReportSuccess: (state, action: PayloadAction<Report>) => {
      state.loading = false
      state.currentReport = action.payload
      const existingIndex = state.reports.findIndex(r => r.id === action.payload.id)
      if (existingIndex !== -1) {
        state.reports[existingIndex] = action.payload
      } else {
        state.reports.push(action.payload)
      }
    },
    fetchReportFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    setCurrentReport: (state, action: PayloadAction<string>) => {
      const report = state.reports.find(r => r.id === action.payload)
      if (report) {
        state.currentReport = report
      }
    },
    clearCurrentReport: (state) => {
      state.currentReport = null
    },
    updateReportStatus: (state, action: PayloadAction<{ id: string; status: Report['status'] }>) => {
      const report = state.reports.find(r => r.id === action.payload.id)
      if (report) {
        report.status = action.payload.status
      }
      if (state.currentReport?.id === action.payload.id) {
        state.currentReport.status = action.payload.status
      }
    },
  },
})

export const {
  fetchReportStart,
  fetchReportSuccess,
  fetchReportFailure,
  setCurrentReport,
  clearCurrentReport,
  updateReportStatus,
} = reportSlice.actions

export default reportSlice.reducer