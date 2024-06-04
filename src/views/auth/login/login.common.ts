import type { LoginRequest } from '@/api/modules/auth/types'

export const loginForm = {
    email: undefined,
    password: undefined,
    show_password: false,
    remember_me: false
}

export const messageErrorLogin: LoginRequest = {
    email: '',
    password: ''
}