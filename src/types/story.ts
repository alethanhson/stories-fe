export interface Book {
  id: number
  title: string
  description?: string
  cover_image: string
  author: Author
}

export interface Author {
  id: number
  create_by_user_id: number
  author_name: string
  avatar: string
}
