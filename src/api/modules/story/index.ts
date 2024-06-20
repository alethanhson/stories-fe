import axios from '@/api/axios'
import type { BookDetailResponse, BookHistoryResponse, TopBookResponse, BookChapterResponse } from './types'

const BookResource = '/book'

export const fetchBookDetailApi = async (
  id: number,
  limit?: any
): Promise<BookDetailResponse> => {
  const url = limit ? `${BookResource}/${id}/${limit}` : `${BookResource}/${id}`
  return await axios.get(url)
}

export const fetchReadingHistoryApi = async (): Promise<BookHistoryResponse> => {
  return await axios.get(`${BookResource}/reading-history`)
}

export const fetchTopBookApi = async (days: number): Promise<TopBookResponse> => {
  return await axios.get(`${BookResource}/get-top-book/${days}`)
}

export const getBookByChapter = async (chapter_id:number): Promise<BookChapterResponse> => {
    try {
      return await axios.get(`${BookResource}/chapter/${chapter_id}`)
    } catch (error) {
      return Promise.reject(error)
    }
  }
