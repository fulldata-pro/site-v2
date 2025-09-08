export interface User {
  id: number
  uid: string
  email: string
  firstName: string
  lastName: string
  avatar?: string
  phone?: string
  phonePrefix?: string
  accounts: any[]
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthResponse {
  user: User
  token: string
}