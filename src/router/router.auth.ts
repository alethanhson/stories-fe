import { checkLogin } from '@/middleware/checkLogin'
import type { RouteRecordRaw } from 'vue-router'

const authRouter: Array<RouteRecordRaw> = [
  {
    path: '/auth/login',
    name: 'login',
    meta: {
      middleware: [checkLogin]
    },
    component: () => import('@/views/auth/login/LoginView.vue')
  },
  {
    path: '/auth/register',
    name: 'register',
    component: () => import('@/views/auth/register/RegisterView.vue')
  },
  {
    path: '/page-error',
    name: 'page_error',
    component: () => import('@/views/page-error/ErrorView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/page-error'
  }
]

export default authRouter
