import { defineStore } from 'pinia'
import {
  registerServiceApi,
  fetchServicePackageApi,
  findServicePackageApi
} from '@/api/modules/servicePackage'
import type {
  RegisterServiceForm,
  ServicePackage,
  ServicePackageResponse
} from '@/api/modules/servicePackage/types'

export const useUserServiceStore = defineStore('service', {
  state: () => ({
    servicePackage: [] as ServicePackage[]
  }),
  getters: {
    getServicePackage: (state): ServicePackage[] => state.servicePackage
  },
  actions: {
    async registerService(payload: RegisterServiceForm) {
      return await registerServiceApi(payload)
    },
    async fetchServicePackage() {
      const serviceResponse: ServicePackageResponse = await fetchServicePackageApi()
      this.servicePackage = serviceResponse.data
    },
    async findServicePackage(payload: Number) {
      return await findServicePackageApi(payload)
    }
  }
})
