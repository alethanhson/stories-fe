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
          },
          {
            path: 'create-book',
            name: 'author.book.create',
            component: () => import('@/views/author/my-book/CreateBook.vue')
          },
          {
            path: 'create-chapter',
            name: 'author.chapter.create',
            component: () => import('@/views/author/my-book/AddChapter.vue')
          },
          {
            path: 'update-book/:id',
            name: 'author.book.update',
            component: () => import('@/views/author/my-book/UpdateBook.vue')
          }
        ]
      }
    ]
  }
]

export default authorRouter
