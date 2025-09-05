const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

interface SearchRequest {
  type: 'people' | 'company' | 'vehicle' | 'phone' | 'bank'
  query: string
  urlBack?: string
}

interface SearchResponse {
  reportId: string
  status: 'pending' | 'processing' | 'completed'
  syncResponse?: any
}

class ApiService {
  private getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken')
    }
    return null
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const token = this.getAuthToken()
    
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return { success: true, data }
    } catch (error) {
      console.error('API request error:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  // Search endpoints
  async searchPeople(email?: string, cuit?: string) {
    const query = email ? `email:${email}` : `cuit:${cuit}`
    return this.request<SearchResponse>('/api/search/people', {
      method: 'POST',
      body: JSON.stringify({ query }),
    })
  }

  async searchCompany(cuit: string) {
    return this.request<SearchResponse>('/api/search/company', {
      method: 'POST',
      body: JSON.stringify({ cuit }),
    })
  }

  async searchVehicle(licensePlate: string) {
    return this.request<SearchResponse>('/api/search/vehicle', {
      method: 'POST',
      body: JSON.stringify({ licensePlate }),
    })
  }

  async searchPhone(phoneNumber: string) {
    return this.request<SearchResponse>('/api/search/phone', {
      method: 'POST',
      body: JSON.stringify({ phoneNumber }),
    })
  }

  async searchBank(cbu?: string, alias?: string) {
    const body = cbu ? { cbu } : { alias }
    return this.request<SearchResponse>('/api/search/bank', {
      method: 'POST',
      body: JSON.stringify(body),
    })
  }

  // Report endpoints
  async getReport(reportId: string) {
    return this.request<any>(`/api/reports/${reportId}`, {
      method: 'GET',
    })
  }

  async getReportStatus(reportId: string) {
    return this.request<{ status: string; progress: number }>(
      `/api/reports/${reportId}/status`,
      { method: 'GET' }
    )
  }

  async getSearchHistory(limit = 50) {
    return this.request<any[]>(`/api/search/history?limit=${limit}`, {
      method: 'GET',
    })
  }

  // Mock endpoints for demo
  async mockSearch(request: SearchRequest): Promise<ApiResponse<SearchResponse>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            reportId: `report-${Date.now()}`,
            status: 'processing',
          },
        })
      }, 1000)
    })
  }

  async mockGetReport(reportId: string): Promise<ApiResponse<any>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            id: reportId,
            status: 'completed',
            createdAt: new Date(),
            data: {
              // Mock report data
              summary: {
                fullName: 'Mock User',
                documentNumber: '20-12345678-9',
              },
            },
          },
        })
      }, 500)
    })
  }
}

export default new ApiService()