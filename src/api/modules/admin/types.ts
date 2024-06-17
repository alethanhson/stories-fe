import type { AuthorData } from '../author/types'

export interface FormStoryCrawlData {
  url: string
  author_id: number | null
  genre_id: number
  package_type: number
  description: string
}

export interface Story {
  id: number
  title: string
  author_name: string
  genre_name: string
  description: string
  status: number
  cover_image: string
  package_type: number
  story_type: number
}

export interface DetailStoryResponse {
  code: number
  data: Story
  message: string
}

export interface Genre {
  id: number
  cover_image: string
  genre_name: string
}

export interface ListAuthorResponse {
  code: number
  data: AuthorData[]
  message: string
}

export interface Story {
  id: number
  title: string
  author_id: string
  genre_id: string
  description: string
  status: number
  cover_image: string
  package_type: number
  story_type: number
}

export interface ListStoryResponse {
  data: Story[]
  meta: {
    current_page: number
    last_page: number
    total: number
  }
}

export interface FormGetStories {
  page_size?: number
  page?: number
}

export interface FormUpdateStory {
  title?: string
  author_id?: number
  genre_id?: number
  description?: string
  status?: number
  cover_image?: File
  package_type?: number
  story_type?: number
  _method: string
}

export interface ListGenreResponse {
  code: number
  data: Genre[]
  message: string
}
