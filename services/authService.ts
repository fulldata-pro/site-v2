import { User, LoginCredentials, AuthResponse } from '@/types/auth.types'

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error al iniciar sesión')
      }

      if (data.success) {
        // Store token in localStorage as fallback
        localStorage.setItem('authToken', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        
        return {
          user: data.user,
          token: data.token,
        }
      } else {
        throw new Error(data.error || 'Error al iniciar sesión')
      }
    } catch (error) {
      console.error('Auth service login error:', error)
      throw error
    }
  }

  async logout(): Promise<void> {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      })
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      // Always clear local storage
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')
    }
  }

  async validateToken(): Promise<User | null> {
    try {
      const response = await fetch('/api/auth/me', {
        credentials: 'include'
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          // Update localStorage
          localStorage.setItem('user', JSON.stringify(data.user))
          return data.user
        }
      }
    } catch (error) {
      console.error('Validate token error:', error)
    }

    // Fallback to localStorage
    const userStr = localStorage.getItem('user')
    if (userStr) {
      try {
        return JSON.parse(userStr)
      } catch {
        // Clear invalid data
        localStorage.removeItem('user')
        localStorage.removeItem('authToken')
      }
    }
    
    return null
  }

  isAuthenticated(): boolean {
    // Check localStorage first for immediate response
    const token = localStorage.getItem('authToken')
    const user = localStorage.getItem('user')
    
    return !!(token && user)
  }
}

export default new AuthService()