interface LoginCredentials {
  email: string
  password: string
}

interface User {
  id: string
  email: string
  name: string
  role: string
}

class AuthService {
  private mockUsers = [
    {
      id: '1',
      email: 'admin@fulldata.com',
      password: 'admin123',
      name: 'Admin User',
      role: 'admin',
    },
    {
      id: '2',
      email: 'user@fulldata.com',
      password: 'user123',
      name: 'Regular User',
      role: 'user',
    },
  ]

  async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = this.mockUsers.find(
          u => u.email === credentials.email && u.password === credentials.password
        )

        if (user) {
          const { password, ...userWithoutPassword } = user
          const mockToken = btoa(JSON.stringify({ userId: user.id, timestamp: Date.now() }))
          
          localStorage.setItem('authToken', mockToken)
          localStorage.setItem('user', JSON.stringify(userWithoutPassword))
          
          resolve({
            user: userWithoutPassword,
            token: mockToken,
          })
        } else {
          reject(new Error('Credenciales inválidas'))
        }
      }, 800)
    })
  }

  async logout(): Promise<void> {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
  }

  async validateToken(): Promise<User | null> {
    const token = localStorage.getItem('authToken')
    const userStr = localStorage.getItem('user')
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr)
        return user
      } catch {
        return null
      }
    }
    
    return null
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken')
  }
}

export default new AuthService()