import type { AuthorData } from '@/api/modules/author/types'

export interface Genre {
  id: number
  genre_name: string
  cover_image: string
}

export interface Chapter {
  id: number
  book_id: number
  chapter_number: number
  chapter_title: string | null
  chapter_content: string
  created_at?: string | null
  updated_at?: string | null
}

export interface BookBase {
  id: number
  title: string
  author_id: number
  genre_id: number
  description: string
  status: string
  cover_image: string
  package_type: string
  story_type: string
}

export interface BookDetail extends BookBase {
  created_at: string | null
  updated_at: string | null
  followers: number
  likes: number
  author: AuthorData
  genre: Genre
  chapters: Chapter[]
  total_chapters: number
}

export interface BookHistory extends BookBase {
  user_chapters: UserChapter
  likes: number
}

export interface UserChapter {
  id: number
  user_id: number
  chapter_id: number
  chapter: Chapter
}

export interface BookDetailResponse {
  code: number
  data: BookDetail
}

export interface BookHistoryResponse {
  code: number
  data: BookHistory[]
}

export interface TopBookResponse {
  code: number
  data: TopBook[]
}

export interface TopBook extends BookBase {
  likes: number
  chapters: Chapter[]
}

export interface BookChapterResponse {
    code: number,
    message: string,
    data: BookChapter
}
export interface BookChapter {
    id: number,
    title: string,
    package_type: number,
    chapters: Chapter[]
}
