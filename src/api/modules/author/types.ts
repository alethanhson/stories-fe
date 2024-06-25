export interface FormAuthorData {
  create_by_user_id: number
  author_name: string
  avatar?: File
}

export interface AuthorData extends FormAuthorData {
  id: number
}

export interface DetailAuthorResponse {
  code: number
  message?: string
  data: AuthorData
}

export interface StoryPostedResponse {
  code: number
  data: Story[]
}

export interface Story {
  id: number
  title: string
  author_id: number
  avatar: string
  genre_id: number
  status: number
  description: string
  cover_image: string
  package_type: number
  story_type: number
  chapters: Chapter[]
  followers: number
  book_likes: number
}

export interface Chapter {
  id: number
  chapter_number: number
  book_id: number
  chapter_title: string
  chapter_content?: string
}

export interface BasicStory {
  id: number
  title: string
  author_id: number
  genre_id: number
  description: string
  cover_image: string
  package_type: number
  status: number
  story_type: number
}

export interface FormCreateStory {
  title: string
  author_id: number | null
  genre_id: number
  description: string
  cover_image: File | null
  package_type: number
  story_type: number
}

export interface StoryResponse {
  code: number
  message?: string
  data: BasicStory
}

export interface FormCreateChapter {
  book_id: number | null
  chapter_number: number | null
  chapter_title?: string | null
  image: File[]
}

export interface ChapterResponse {
  code: number
  message?: string
  data: Chapter
}

export interface DeleteResponse {
  code: number
  message: string
}
