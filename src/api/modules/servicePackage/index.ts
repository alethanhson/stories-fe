import axios from '@/api/axios'
import type { ServicePackageResponse, RegisterServiceForm, RegisterServiceResponse } from './types'

export const fetchServicePackage = async (): Promise<ServicePackageResponse> => {
  try {
    return await axios.get('/service-package/data')
  } catch (error) {
    return Promise.reject(error)
  }
}

export const registerServiceApi = async (
  payload: RegisterServiceForm
): Promise<RegisterServiceResponse> => {
  try {
    return await axios.post('/user-service-packages/create', payload)
  } catch (error) {
    return Promise.reject(error)
  }
}
