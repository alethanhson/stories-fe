import authRouter from '@/router/router.auth'
import type { NavigationGuard, RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import homeRouter from './router.home'

const routes: Array<RouteRecordRaw> = [...authRouter, ...homeRouter]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Register global navigation guards to execute the middleware
router.beforeEach((to, from, next) => {
  const middleware = to.meta.middleware as NavigationGuard[]
  if (middleware) {
    middleware.forEach((m) => m(to, from, next))
  } else {
    next()
  }
})

export default router
