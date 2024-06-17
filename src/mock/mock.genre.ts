import type { Genre } from '@/types'
import { stories } from './mock.story'

export const genres: Genre[] = [
  { id: 1, name_genre: 'Khoa học' },
  { id: 2, name_genre: 'Lịch sử' },
  { id: 3, name_genre: 'Cổ đại' }
]

export const comicGenres = computed(() =>
  genres.filter((genre) =>
    stories.some((story) => story.id_genre === genre.id && story.type === 'comic')
  )
)

export const novelGenres = computed(() =>
  genres.filter((genre) =>
    stories.some((story) => story.id_genre === genre.id && story.type === 'novel')
  )
)
