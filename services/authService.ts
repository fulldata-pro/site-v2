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

  async register(userData: {
    firstName: string
    lastName: string
    email: string
    password: string
  }): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error al crear la cuenta')
      }

      return {
        success: true,
        message: data.message || 'Cuenta creada exitosamente'
      }
    } catch (error) {
      console.error('Auth service register error:', error)
      throw error
    }
  }

  async forgotPassword(email: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error al enviar correo de recuperación')
      }

      return {
        success: true,
        message: data.message || 'Correo de recuperación enviado'
      }
    } catch (error) {
      console.error('Auth service forgot password error:', error)
      throw error
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password: newPassword }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error al restablecer contraseña')
      }

      return {
        success: true,
        message: data.message || 'Contraseña restablecida exitosamente'
      }
    } catch (error) {
      console.error('Auth service reset password error:', error)
      throw error
    }
  }

  isAuthenticated(): boolean {
    // Check localStorage first for immediate response
    const token = localStorage.getItem('authToken')
    const user = localStorage.getItem('user')
    
    return !!(token && user)
  }
}

export default new AuthService()