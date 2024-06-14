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
        path: '',
        name: 'dashboard_admin',
        component: () => import('@/views/admin/AdminHomeView.vue')
      },
      {
        path: 'genres',
        name: 'genre',
        component: () => import('@/views/admin/AdminHomeView.vue')
      },
      {
        path: 'service-packages',
        name: 'service_package',
        component: () => import('@/views/admin/AdminHomeView.vue')
      },
      {
        path: 'books',
        name: 'book',
        component: () => import('@/views/admin/AdminHomeView.vue')
      },
      {
        path: 'users',
        name: 'user',
        component: () => import('@/views/admin/AdminHomeView.vue')
      }
    ]
  }
]

export default adminRouter
