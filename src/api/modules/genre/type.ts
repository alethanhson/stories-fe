export interface GenreRequest {
  genre_name: string
  cover_image?: string | undefined
  upload_cover_image: File | null
}

export interface GenreResponse {
  code: number
  message: string
  genres: GenreData[]
}

export interface GenreData extends GenreRequest {
  id: number
}
