import DefaultLayout from '@/layouts/BaseLayout.vue'
import { checkLogin } from '@/middleware/checkLogin'
import type { RouteRecordRaw } from 'vue-router'

const authorRouter: Array<RouteRecordRaw> = [
  {
    path: '/author',
    component: DefaultLayout,
    meta: {
      middleware: [checkLogin]
    },
    children: [
      {
        path: '/author',
        name: 'dashboard_author',
        component: () => import('@/views/author/dashboard/DashboardView.vue')
      }
    ]
  }
]

export default authorRouter
