import axios from '@/api/axios'
import type { ServicePackageResponse } from './types'

export const fetchServicePackage = async (): Promise<ServicePackageResponse> => {
  try {
    return await axios.get('/service-package/data')
  } catch (error) {
    return Promise.reject(error)
  }
}
