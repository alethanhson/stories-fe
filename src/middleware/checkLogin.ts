import { USER_ROLE, USER_STATUS } from '@/constants'
import router from '@/router'
import { useAuthStore } from '@/stores/modules/auth'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

const authStore = useAuthStore()
export async function checkLogin(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): Promise<void> {
  const excludedRoutes = [
    'forgot_password',
    'reset_password',
    'reset_password_send_mail',
    'confirm_send',
    'confirm_password',
    'reset_success'
  ]
  //   const redirectAfterLoginRoutes = ['password_setting', 'profile_setting', 'payment_setting']

  if (excludedRoutes.includes(to.name as string)) {
    next()
    return
  }

  const isLoggedIn = authStore.isLoggedIn
  if (isLoggedIn) {
    const auth = await authStore.currentUser

    if (auth.status === USER_STATUS.INACTIVE) {
      authStore.logout().then(() => router.push({ name: 'login' }))
      return
    }

    to.matched.some((record) => {
      if (record.meta.isParent && record.meta.role !== auth.role && to.path !== '/') {
        router.push({ name: 'page_error' })
        return
      }
    })

    // redirect when go to login
    if (to.name === 'login' || to.path === '/') {
      switch (auth.role) {
        case USER_ROLE.ADMIN:
          return next({ name: 'agent.dashboard' })
        case USER_ROLE.AUTHOR:
          return next({ name: 'manager.appointment' })
        case USER_ROLE.USER:
          return next({ name: 'staff.home' })
        default:
          router.push({ name: 'page_error' })
          break
      }
    }

    next()
  } else {
    if (to.name === 'login') {
      return next()
    }

    next({ name: 'login' })
  }
}
