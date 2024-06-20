import axios from '@/api/axios'
import type { BookChapterResponse } from './types'

const resource = '/book'

export const getBookByChapter = async (chapter_id:number): Promise<BookChapterResponse> => {
    try {
      return await axios.get(`${resource}/chapter/${chapter_id}`)
    } catch (error) {
      return Promise.reject(error)
    }
  }
