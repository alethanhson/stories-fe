import axios from '@/api/axios'
import type {
  FormRegister,
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  LogoutResponse,
  RegisterResponse
} from './types'

const headers = {
  'Content-Type': 'multipart/form-data'
}

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  try {
    return await axios.post('auth/login', data)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const register = async (data: FormRegister): Promise<RegisterResponse> => {
  try {
    return await axios.post('/register', data, { headers })
  } catch (error) {
    return Promise.reject(error)
  }
}

export const resendEmail = async (data: FormRegister): Promise<RegisterResponse> => {
  try {
    return await axios.post('/send-email', data, { headers })
  } catch (error) {
    return Promise.reject(error)
  }
}

export const logout = async (data: LogoutRequest): Promise<LogoutResponse> => {
  try {
    return await axios.post('auth/logout', data)
  } catch (error) {
    return Promise.reject(error)
  }
}
