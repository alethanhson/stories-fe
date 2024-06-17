import axios from '@/api/axios'
import type { BookDetailResponse, BookHistoryResponse } from './types'

const BookResource = '/book'

export const fetchBookDetailApi = async (id: number): Promise<BookDetailResponse> => {
  try {
    return await axios.get(`${BookResource}/${id}`)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const fetchReadingHistoryApi = async (): Promise<BookHistoryResponse> => {
  try {
    return await axios.get(`${BookResource}/reading-history`)
  } catch (error) {
    return Promise.reject(error)
  }
}
