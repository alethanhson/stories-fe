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

export interface RegisterServiceForm {
  user_id: number
  service_package_id: number
}

export interface RegisterServiceResponse {
  code: number
  message: string
  data: UserServicePackage
}

export interface UserServicePackage {
  user_id: number
  service_package_id: number
  start_date: number
  id: number
}