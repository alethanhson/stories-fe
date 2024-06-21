import HeaderLayout from '@/layouts/HeaderLayout.vue'
import type { RouteRecordRaw } from 'vue-router'
import { checkRoleService } from '@/middleware/checkService'

const storyRouter: Array<RouteRecordRaw> = [
  {
    path: '/story',
    component: HeaderLayout,
    children: [
      {
        path: ':id',
        name: 'detail_story',
        component: () => import('@/views/story/StoryDetailView.vue')
      },
      {
        path: 'reading/:id_chapter',
        name: 'reading-story',
        component: () => import('@/views/story/ReadingStoryView.vue'),
        beforeEnter: checkRoleService
      }
    ]
  }
]

export default storyRouter
