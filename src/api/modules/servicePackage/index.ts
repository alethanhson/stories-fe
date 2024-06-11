import axios from '@/api/axios'
import type {
  ServicePackageResponse,
  RegisterServiceForm,
  RegisterServiceResponse,
  ServicePackage,
  paymentForm,
  PaymentResponse
} from './types'

const serviceResource = '/service-package'
const userServiceResource = '/user-service-packages'
const paymentResource = '/payment'

export const fetchServicePackageApi = async (): Promise<ServicePackageResponse> => {
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

export const findServicePackageApi = async (payload: Number): Promise<ServicePackage> => {
  const serviceResponse = await axios.get(`${serviceResource}/${payload}`)
  return serviceResponse.data
}

export const paymentApi = async (payload: paymentForm): Promise<PaymentResponse> => {
  return await axios.post(paymentResource, payload)
}
