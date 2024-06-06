import { defineStore } from 'pinia'
import { registerServiceApi } from '@/api/modules/servicePackage'
import type { RegisterServiceForm } from '@/api/modules/servicePackage/types'

export const useUserServiceStore = defineStore('auth', {
  state: () => ({}),
  getters: {},
  actions: {
    async registerService(payload: RegisterServiceForm) {
      try {
        return await registerServiceApi(payload)
      } catch (error) {
        return Promise.reject(error)
      }
    }
  }
})
