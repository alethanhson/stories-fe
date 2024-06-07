import HeaderLayout from '@/layouts/HeaderLayout.vue'
import { checkLogin } from '@/middleware/checkLogin'
import type { RouteRecordRaw } from 'vue-router'

const servicePackage: Array<RouteRecordRaw> = [
  {
    path: '/service-package',
    name: 'service-package-parent',
    component: HeaderLayout,
    meta: {
      middleware: [checkLogin]
    },
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
