import BaseLayout from '@/layouts/BaseLayout.vue'
import type { RouteRecordRaw } from 'vue-router'

const homeRouter: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    redirect: '/',
    component: BaseLayout,
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/home/HomeView.vue')
      },
      {
        path: '/search',
        name: 'search',
        component: () => import('@/views/story/StorySearchView.vue')
      }
    ]
  }
]

export default homeRouter
