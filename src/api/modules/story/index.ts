import axios from '@/api/axios'
import type { SearchResponse, StoryResponse } from './types'

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
