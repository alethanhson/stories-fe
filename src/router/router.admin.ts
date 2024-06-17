import DefaultLayout from '@/layouts/BaseLayout.vue'
import { checkLogin } from '@/middleware/checkLogin'
import type { RouteRecordRaw } from 'vue-router'

const adminRouter: Array<RouteRecordRaw> = [
  {
    path: '/admin',
    component: DefaultLayout,
    meta: {
      middleware: [checkLogin]
    },
    children: [
      {
        path: '/admin',
        name: 'dashboard_admin',
        component: () => import('@/views/admin/AdminHomeView.vue')
      },
      {
        path: 'genres',
        name: 'genre',
        component: () => import('@/views/admin/GenreView.vue')
      }
    ]
  }
]

export default adminRouter
