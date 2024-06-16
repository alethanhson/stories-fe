import { USER_ROLE } from '@/constants'
import i18n from '@/i18n'
import router from '@/router'
import { useAuthStore } from '@/stores/modules/auth'
import { ToastType } from '@/types'
import { showToast } from '@/utils'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

const authStore = useAuthStore()
export async function checkLogin(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): Promise<void> {
  const excludedRoutes = [
    'home',
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
    console.log('🚀 ~ auth:', auth)

    if (to.name === 'login' || excludedRoutes.includes(to.name as string)) {
      return next({ name: 'login' })
    }

    to.matched.some((record) => {
      if (record.meta.isParent && record.meta.role !== auth.role && to.path !== '/') {
        router.push({ name: 'page_error' })
        return
      }
    })

    if (to.name === 'dashboard_admin' && auth.role != USER_ROLE.ADMIN) {
      showToast(i18n.global.t('common.unauthorized'), ToastType.ERROR)

      return next({ name: 'page_unauthorized' })
    }

    if (
      to.name === 'dashboard_author' &&
      auth.role != USER_ROLE.AUTHOR &&
      auth.role != USER_ROLE.ADMIN
    ) {
      showToast(i18n.global.t('common.unauthorized'), ToastType.ERROR)

      return next({ name: 'page_unauthorized' })
    }

    next()
  } else {
    if (to.name === 'login') {
      return next()
    }

    next({ name: 'login' })
  }
}
