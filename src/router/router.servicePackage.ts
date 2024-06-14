import HeaderLayout from '@/layouts/HeaderLayout.vue'
import type { RouteRecordRaw } from 'vue-router'

const servicePackage: Array<RouteRecordRaw> = [
  {
    path: '/service-package',
    name: 'service-package-parent',
    component: HeaderLayout,
    children: [
      {
        path: '',
        name: 'service-package',
        component: () => import('@/views/servicePackage/ServicePackageView.vue')
      }
    ]
  }
]

export default servicePackage
