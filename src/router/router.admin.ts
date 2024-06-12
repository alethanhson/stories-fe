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
        path: 'crawl_story',
        name: 'manager_story',
        component: () => import('@/views/admin/manager_story/CrawlStory.vue')
      },
      {
        path: 'list_story',
        name: 'admin_list_story',
        component: () => import('@/views/admin/manager_story/ListStory.vue')
      },
      {
        path: 'edit_story/:id',
        name: 'admin_edit_story',
        component: () => import('@/views/admin/manager_story/EditStory.vue')
      }
    ]
  }
]

export default adminRouter
