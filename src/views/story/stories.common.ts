import type { BookChapter } from '@/api/modules/story/types'

export const bookChapter = reactive<BookChapter>({
  id: 0,
  title: '...',
  package_type: 0,
  chapters: []
})
