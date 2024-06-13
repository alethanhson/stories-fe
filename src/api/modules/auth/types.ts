export interface LoginRequest {
  email: string | undefined
  password: string | undefined
  role?: number
}

export interface LoginResponse {
  code: number
  message: string
  access_token: string
  user: any
}

export interface FormRegister {
  username: string
  email: string
  password: string
  full_name: string
  avatar?: File | null
}

export interface RegisterResponse {
  code: number
  message: string
}

export interface UserDetail {
  status: number
}

export interface LogoutRequest {
  access_token: string
}

export interface LogoutResponse {
  code: number
  message: string
}
