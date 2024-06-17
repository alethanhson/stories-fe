import type { ServicePackage } from '@/api/modules/servicePackage/types'

export const servicePackage = ref<ServicePackage>({
  id: 0,
  service_package_name: '',
  price: 0,
  duration: 0,
  type: 0
})
