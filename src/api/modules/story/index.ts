import axios from '@/api/axios'
import type {
  BookDetailResponse,
  BookHistoryResponse,
  TopBookResponse,
  BookChapterResponse,
  SearchResponse,
  StoryResponse
} from './types'

const BookResource = '/book'

export const fetchBookDetailApi = async (id: number, limit?: any): Promise<BookDetailResponse> => {
  const url = limit ? `${BookResource}/${id}/${limit}` : `${BookResource}/${id}`
  return await axios.get(url)
}

export const fetchReadingHistoryApi = async (): Promise<BookHistoryResponse> => {
  return await axios.get(`${BookResource}/reading-history`)
}

export const fetchTopBookApi = async (days: number): Promise<TopBookResponse> => {
  return await axios.get(`${BookResource}/get-top-book/${days}`)
}

export const fetchBookListApi = async (): Promise<any> => {
  try {
    return await axios.get(`${BookResource}`)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const followBookApi = async (payload: any): Promise<any> => {
  return await axios.post(`${BookResource}/follow`, payload)
}

export const getBookByChapter = async (chapterId: number): Promise<BookChapterResponse> => {
  try {
    return await axios.get(`${BookResource}/chapter/${chapterId}`)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const fetchSearchStory = async (keyword: string): Promise<SearchResponse> => {
  try {
    return await axios.get(`/search?keyword=${keyword}`)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const getFilterListStory = async (params): Promise<StoryResponse> => {
  try {
    return await axios.get('/filter', { params })
  } catch (error) {
    return Promise.reject(error)
  }
}