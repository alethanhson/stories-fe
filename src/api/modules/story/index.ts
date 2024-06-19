import axios from '@/api/axios'
import type { BookDetailResponse, BookHistoryResponse, TopBookResponse } from './types'

const BookResource = '/book'

export const fetchBookDetailApi = async (id: number): Promise<BookDetailResponse> => {
  return await axios.get(`${BookResource}/${id}`)
}

export const fetchReadingHistoryApi = async (): Promise<BookHistoryResponse> => {
  return await axios.get(`${BookResource}/reading-history`)
}

export const fetchTopBookApi = async (days: number): Promise<TopBookResponse> => {
  return await axios.get(`${BookResource}/get-top-book/${days}`)
}

export const followBookApi = async (payload: any): Promise<any> => {
  return await axios.post(`${BookResource}/follow`, payload)
}
