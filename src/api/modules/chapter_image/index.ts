import axios from '@/api/axios'
import type { ListChapterImageResponse } from './type'

const resource = '/chapterImages'

export const chapter_images = {
  list: async (id: number): Promise<ListChapterImageResponse> => {
    const { data: response } = await axios.get(`${resource}/${id}`)
    return response
  }, 
}