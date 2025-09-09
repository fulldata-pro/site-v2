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
  isGoogleUser?: boolean
  createdAt?: number
  updatedAt?: number
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthResponse {
  user: User
  token: string
}