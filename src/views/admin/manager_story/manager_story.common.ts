import type { FormGetStories, FormStoryCrawlData, FormUpdateStory } from '@/api/modules/admin/types'

export const formCrawl = reactive<FormStoryCrawlData>({
  url: '',
  author_id: 1,
  genre_id: 1,
  description: '',
  package_type: 1
})

export const formGetStory = reactive<FormGetStories>({
  page: 1,
  page_size: 6
})

export const formUpdateStory = reactive<FormUpdateStory>({
  _method: 'put'
})
