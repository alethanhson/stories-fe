import BaseLayout from '@/layouts/BaseLayout.vue'
import { checkLogin } from '@/middleware/checkLogin'
import type { RouteRecordRaw } from 'vue-router'

const homeRouter: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    redirect: '/',
    component: BaseLayout,
    meta: {
      middleware: [checkLogin]
    },
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/home/HomeView.vue')
      }
    ]
  }
]

export default homeRouter
