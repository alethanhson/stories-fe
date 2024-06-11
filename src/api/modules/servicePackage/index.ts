import axios from '@/api/axios'
import type { ServicePackageResponse, RegisterServiceForm, RegisterServiceResponse } from './types'

const serviceResource = '/service-package'
const userServiceResource = '/user-service-packages'

export const fetchServicePackage = async (): Promise<ServicePackageResponse> => {
  try {
    return await axios.get(`${serviceResource}`)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const fetchServicePopular = async (): Promise<ServicePackageResponse> => {
  try {
    return await axios.get(`${serviceResource}/data-popular`)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const registerServiceApi = async (
  payload: RegisterServiceForm
): Promise<RegisterServiceResponse> => {
  return await axios.post(`${userServiceResource}`, payload)
}
