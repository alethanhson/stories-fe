export interface Story {
  id: number
  title: string
  id_genre: number
  type: string
  num_reads?: number
  id_author: string
  cover_image?: string
  description: string
}

export interface StoryResponse {
  code: number
  data: Story[]
}

export interface SearchResponse {
  code: number
  data: any[]
}
