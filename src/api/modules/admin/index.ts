import axios from '@/api/axios'
import type {
  DetailStoryResponse,
  FormGetStories,
  FormStoryCrawlData,
  FormUpdateStory,
  ListAuthorResponse,
  ListGenreResponse,
  ListStoryResponse
} from './types'

const resource = '/admin'
const headers = {
  'Content-Type': 'multipart/form-data'
}

export const admin = {
  createStory: (data: FormStoryCrawlData): Promise<DetailStoryResponse> =>
    axios.post(`${resource}/crawl_book`, data, { headers }),
  listMyStory: async (params: FormGetStories): Promise<ListStoryResponse> => {
    const { data: response } = await axios.get(`${resource}/my_books`, { params })
    return response
  },
  deleteStorry: async (id: number): Promise<ListStoryResponse> => {
    const { data: response } = await axios.delete(`${resource}/delete_book/${id}`)
    return response
  },
  updateStory: async (id: number, data: FormUpdateStory): Promise<DetailStoryResponse> => {
    console.log('🚀 ~ updateStory: ~ data:', data)
    const { data: response } = await axios.post(`${resource}/update_book/${id}`, data, { headers })
    return response
  },
  detailStory: async (id: number): Promise<DetailStoryResponse> => {
    const { data: response } = await axios.get(`${resource}/book/${id}`)
    return response
  },
  listAuthor: async (): Promise<ListAuthorResponse> => {
    const { data: response } = await axios.get(`${resource}/list_author`)
    return response
  },
  listGenre: async (): Promise<ListGenreResponse> => {
    const { data: response } = await axios.get(`${resource}/list_genre`)
    return response
  }
}
