import axios from '@/api/axios'
import type { ListChapterImageResponse } from './type'

const resource = '/chapter-images'

export const chapter_images = {
  list: async (id: number): Promise<ListChapterImageResponse> => {
    const { data: response } = await axios.get(`${resource}/${id}`)
    return response
  }
}
