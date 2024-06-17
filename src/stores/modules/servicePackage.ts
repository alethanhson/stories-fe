import { defineStore } from 'pinia'
import { fetchServicePackageApi, findServicePackageApi } from '@/api/modules/servicePackage'
import type { ServicePackage, ServicePackageResponse } from '@/api/modules/servicePackage/types'

export const useUserServiceStore = defineStore('service', {
  state: () => ({
    servicePackage: [] as ServicePackage[]
  }),
  getters: {
    getServicePackage: (state): ServicePackage[] => state.servicePackage
  },
  actions: {
    async fetchServicePackage() {
      const serviceResponse: ServicePackageResponse = await fetchServicePackageApi()
      this.servicePackage = serviceResponse.data
    },
    async findServicePackage(payload: Number) {
      return await findServicePackageApi(payload)
    }
  }
})
