import { defineStore } from 'pinia'
import { registerServiceApi } from '@/api/modules/servicePackage'
import type { RegisterServiceForm } from '@/api/modules/servicePackage/types'

export const useUserServiceStore = defineStore('service', {
  state: () => ({}),
  getters: {},
  actions: {
    async registerService(payload: RegisterServiceForm) {
      return await registerServiceApi(payload)
    }
  }
})
