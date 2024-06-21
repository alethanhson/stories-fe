import type { GenreRequest } from '@/api/modules/genre/type'

export const genre: GenreRequest = reactive({
  genre_name: '',
  cover_image: '',
  upload_cover_image: null
})

export const messageErrorGenre: GenreRequest = reactive({
  genre_name: '',
  cover_image: '',
  upload_cover_image: null
})
