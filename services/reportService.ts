import { PeopleData } from '@/lib/types/people_types'
import { CompaniesData } from '@/lib/types/companies_types'
import { VehicleData } from '@/lib/types/vehicles_types'
import { PhoneData } from '@/lib/types/phones_types'

const API_BASE_URL = process.env.NEXT_PUBLIC_REQUESTS_API_URL || 'http://localhost:3002/v2' //'https://api.fulldata.pro'
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || 'cly979x1v0000zcdpdobsl4nm'

export interface ReportRequest {
  uid: string
  type?: 'people' | 'company' | 'vehicle' | 'phone' | 'bank'
}

export interface ReportResponse {
  _id: string
  createdAt: Date
  updatedAt: Date
  feature: string
  apiKeyId: string
  status: string
  version: string
  vendorId: string
  people?: PeopleData
  company?: CompaniesData
  vehicle?: VehicleData
  phone?: PhoneData
  bank?: any
  metadata?: any
}

class ReportService {
  private getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken')
    }
    return null
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = this.getAuthToken()
    
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(API_KEY && { 'ApiKey': API_KEY }),
      ...options.headers,
    }

    try {
      console.log(API_BASE_URL, endpoint, options)
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('API request error:', error)
      throw error
    }
  }

  // Get report by UID from API
  async getReport(uid: string): Promise<ReportResponse> {
    try {
      // First try to get from API
      return await this.request<ReportResponse>(`/reports/${uid}`, {
        method: 'GET',
      })
    } catch (error) {
      // If API fails, fallback to mock data
      console.warn('API request failed, using mock data:', error)
      return this.getMockReport(uid)
    }
  }

  // Get mock report for development/fallback
  async getMockReport(_uid: string): Promise<ReportResponse> {
    try {
      const response = await fetch('/Requests.Reports.json')
      const data = await response.json()
      // Return first report from mock data
      return data[0] as ReportResponse
    } catch (error) {
      console.error('Error loading mock data:', error)
      throw error
    }
  }

  // Search reports - used for search functionality
  async searchReport(request: {
    type: 'people' | 'company' | 'vehicle' | 'phone' | 'bank'
    query: string
    urlBack?: string
  }): Promise<{ reportId: string; status: string }> {
    try {
      // API endpoint for search would be different based on type
      const endpoint = `/search/${request.type}`
      
      const response = await this.request<{ reportId: string; status: string }>(
        endpoint,
        {
          method: 'POST',
          body: JSON.stringify({
            query: request.query,
            urlBack: request.urlBack,
          }),
        }
      )

      return response
    } catch (error) {
      // Fallback to mock response
      console.warn('Search API failed, returning mock response:', error)
      return {
        reportId: `mock-${Date.now()}`,
        status: 'processing',
      }
    }
  }

  // Get report status
  async getReportStatus(uid: string): Promise<{ status: string; progress?: number }> {
    try {
      return await this.request<{ status: string; progress?: number }>(
        `/reports/${uid}/status`,
        { method: 'GET' }
      )
    } catch (error) {
      console.warn('Status API failed, returning mock status:', error)
      return { status: 'completed', progress: 100 }
    }
  }

  // Download report as PDF
  async downloadReportPDF(uid: string): Promise<Blob> {
    const token = this.getAuthToken()
    
    try {
      const response = await fetch(`${API_BASE_URL}/reports/${uid}/pdf`, {
        method: 'GET',
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.blob()
    } catch (error) {
      console.error('PDF download error:', error)
      throw error
    }
  }

  // Update report
  async updateReport(uid: string, data: Partial<ReportResponse>): Promise<ReportResponse> {
    return await this.request<ReportResponse>(`/reports/${uid}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  // Delete report
  async deleteReport(uid: string): Promise<void> {
    await this.request<void>(`/reports/${uid}`, {
      method: 'DELETE',
    })
  }

  // Resend webhook
  async resendWebhook(uid: string): Promise<{ success: boolean; message: string }> {
    return await this.request<{ success: boolean; message: string }>(
      `/reports/${uid}/webhook/resend`,
      { method: 'POST' }
    )
  }
}

const reportService = new ReportService()
export default reportService