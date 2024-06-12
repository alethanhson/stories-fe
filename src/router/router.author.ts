import DefaultLayout from '@/layouts/HeaderLayout.vue'
import { checkLogin } from '@/middleware/checkLogin'
import type { RouteRecordRaw } from 'vue-router'

const authorRouter: Array<RouteRecordRaw> = [
  {
    path: '/author',
    name: 'author',
    component: DefaultLayout,
    meta: {
      middleware: [checkLogin]
    },
    children: [
      {
        path: 'channel',
        name: 'dashboard_author',
        component: () => import('@/views/author/dashboard/DashboardView.vue'),
        children: [
          {
            path: 'profile',
            name: 'author.profile',
            component: () => import('@/views/author/profile/ProfileView.vue')
          },
          {
            path: 'my-book',
            name: 'author.book',
            component: () => import('@/views/author/my-book/BookAuthorView.vue')
          }
        ]
      }
    ]
  }
]

export default authorRouter
