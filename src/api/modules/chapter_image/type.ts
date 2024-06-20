export interface ListChapterImageResponse {
  code: number
  message: string
  data: ChapterImage[]
}

export interface ChapterImage {
  id: number
  url: string
  chapter_id: number
  chapter_number: number
}
