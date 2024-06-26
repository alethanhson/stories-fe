import { useAuthStore } from '@/stores/modules/auth'
import type { RouteRecordRaw } from 'vue-router'

const authRouter: Array<RouteRecordRaw> = [
  {
    path: '/auth/login',
    name: 'login',
    component: () => import('@/views/auth/login/LoginView.vue'),
    beforeEnter(to, from, next) {
      const authStore = useAuthStore()
      if (authStore.isLoggedIn) {
        return next(from)
      }
      next()
    }
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
  },
  {
    path: '/page-unauthorized',
    name: 'page_unauthorized',
    component: () => import('@/views/page-unauthorized/UnauthorizedView.vue')
  }
]

export default authRouter
