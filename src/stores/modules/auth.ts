import {
  login as apiLogin,
  register as registerApi,
  logout as apiLogout,
  resendEmail
} from '@/api/modules/auth'
import type { FormRegister } from '@/api/modules/auth/types'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    access_token: localStorage.getItem('access_token') || null,
    user: JSON.parse(localStorage.getItem('user') || 'null')
  }),
  getters: {
    isLoggedIn: (state) => !!state.access_token,
    currentUser: (state) => state.user
  },
  actions: {
    setUserProfile(user: any) {
      this.user = user
      localStorage.setItem('user', JSON.stringify(user))
      return Promise.resolve()
    },
    setAccessToken(token: string) {
      this.access_token = token
      localStorage.setItem('access_token', token)
      return Promise.resolve()
    },
    async logout() {
      try {
        const accessToken: any = this.access_token
        await apiLogout({ access_token: accessToken })
        this.access_token = null
        this.user = null
        localStorage.removeItem('access_token')
        localStorage.removeItem('user')
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async login(credentials: any) {
      try {
        const auth = await apiLogin(credentials)
        this.setUserProfile(auth.user)
        this.setAccessToken(auth.access_token)
        return auth
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async register(payload: FormRegister) {
      return await registerApi(payload)
    },
    async resendEmail(payload: FormRegister) {
      try {
        await resendEmail(payload)
      } catch (error) {
        console.log('error: ', error)
      }
    }
  }
})
