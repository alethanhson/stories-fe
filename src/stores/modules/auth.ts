import { login as apiLogin, register as registerApi, resendEmail } from '@/api/modules/auth'
import type { FormRegister } from '@/api/modules/auth/types'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    access_token: null as string | null,
    user: null as any | null
  }),
  getters: {
    isLoggedIn: (state) => !!state.access_token,
    currentUser: (state) => state.user
  },
  actions: {
    setUserProfile(user: any) {
      this.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },
    setAccessToken(token: string) {
      this.access_token = token
      localStorage.setItem('access_token', token)
    },
    logout() {
      return new Promise(() => {
        this.access_token = null
        this.user = null
        localStorage.removeItem('access_token')
        localStorage.removeItem('user')
      })
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
