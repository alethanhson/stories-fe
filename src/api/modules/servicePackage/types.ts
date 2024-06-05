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
