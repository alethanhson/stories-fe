import HeaderLayout from '@/layouts/HeaderLayout.vue'
import type { RouteRecordRaw } from 'vue-router'

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
        component: () => import('@/views/story/ReadStory.vue'),
      }
    ]
  }
]

export default storyRouter
