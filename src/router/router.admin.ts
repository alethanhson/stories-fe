import AdminLayout from '@/layouts/AdminLayout.vue'
import { checkLogin } from '@/middleware/checkLogin'
import type { RouteRecordRaw } from 'vue-router'

const adminRouter: Array<RouteRecordRaw> = [
  {
    path: '/admin',
    component: AdminLayout,
    meta: {
      middleware: [checkLogin]
    },
    children: [
      {
        path: '/admin',
        name: 'dashboard_admin',
        component: () => import('@/views/admin/AdminHomeView.vue')
      }
    ]
  }
]

export default adminRouter
