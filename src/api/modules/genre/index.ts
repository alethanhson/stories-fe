import axios from '@/api/axios'
import type { GenreRequest, GenreResponse } from './type'

const headers = {
  'Content-Type': 'multipart/form-data'
}

export const addGenre = async (data: GenreRequest): Promise<GenreResponse> => {
  try {
    return await axios.post('admin/genres', data, { headers })
  } catch (error) {
    return Promise.reject(error)
  }
}

export const getGenre = async (): Promise<GenreResponse> => {
  try {
    return await axios.get('admin/genres')
  } catch (error) {
    return Promise.reject(error)
  }
}

export const updateGenre = async (id: string, data: GenreRequest): Promise<GenreResponse> => {
  try {
    const requestData = { ...data, _method: 'put' }

    return await axios.post(`admin/genres/${id}`, requestData, { headers })
  } catch (error) {
    return Promise.reject(error)
  }
}

export const deleteGenre = async (id: string): Promise<GenreResponse> => {
  try {
    return await axios.delete(`admin/genres/${id}`)
  } catch (error) {
    return Promise.reject(error)
  }
}
