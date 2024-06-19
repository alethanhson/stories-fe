import axios from '@/api/axios'
import type {
  ChapterResponse,
  DetailAuthorResponse,
  FormAuthorData,
  FormCreateChapter,
  FormCreateStory,
  StoryPostedResponse,
  StoryResponse
} from '@/api/modules/author/types'

const resource = '/authors'
const headers = {
  'Content-Type': 'multipart/form-data'
}

export const authors = {
  create: (data: FormAuthorData): Promise<DetailAuthorResponse> =>
    axios.post(`${resource}/register`, data, { headers }),
  getDataApi: async (): Promise<DetailAuthorResponse> => await axios.get(`${resource}`),
  fetchBookPostedApi: async (): Promise<StoryPostedResponse> =>
    await axios.get(`${resource}/book-posted`),
  createBook: async (data: FormCreateStory): Promise<StoryResponse> => {
    const response: StoryResponse = await axios.post(`${resource}/createBook`, data, { headers })
    return response
  },
  updateBook: (data: FormCreateStory, id: string): Promise<StoryResponse> =>
    axios.put(`${resource}/updateBook/${id}`, data, { headers }),
  createChapter: (data: FormCreateChapter): Promise<ChapterResponse> =>
    axios.post(`${resource}/chapters`, data, { headers }),
  getNumberChapter: async (id: number): Promise<number> => {
    const { data: response } = await axios.get(`${resource}/chapters/getNumber/${id}`)
    return response
  }
}
