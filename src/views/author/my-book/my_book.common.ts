import type { FormCreateChapter, FormCreateStory } from '@/api/modules/author/types'

export const formCreate = reactive<FormCreateStory>({
  title: '',
  author_id: null,
  genre_id: 1,
  description: '',
  cover_image: null,
  package_type: 1,
  story_type: 1
})

export const FormCreateChap = reactive<FormCreateChapter>({
  book_id: null,
  chapter_number: null,
  image: []
})
