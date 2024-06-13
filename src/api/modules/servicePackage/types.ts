export interface ServicePackageResponse {
  code: number
  data: ServicePackage[]
}

export interface ServicePackage {
  id: number
  service_package_name: string
  price: number
  duration: number
  type: number
}

export interface UserServicePackage {
  user_id: number
  service_package_id: number
  start_date: number
  id: number
}

export interface paymentForm {
  id: number
  amount: number
  gateway: string
  bankCode: string
}

export interface PaymentResponse {
  code?: number
  message?: string
  payment_url: string
}
